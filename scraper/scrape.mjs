#!/usr/bin/env node
/**
 * Value of Your Life scraper — finds candidate incidents from multiple sources.
 *
 * Sources:
 *   1. Wikipedia — year-wise and topical disaster categories; page summaries
 *      and lead images via the REST API.
 *   2. Google News RSS — keyword sweeps for fresh incidents that don't have a
 *      Wikipedia article yet (no API key needed).
 *
 * Results are filtered to India + mass-casualty relevance, deduped against the
 * curated ledger (data/incidents.js) and previously seen candidates, then
 * written to scraper/candidates.json for HUMAN REVIEW.
 *
 * Nothing enters the ledger automatically: casualty figures, punishment and
 * case-status fields need editorial judgment, so the pipeline is
 * scrape -> review -> hand-edit data/incidents.js.
 *
 * Usage:  node scraper/scrape.mjs [--years-back 20] [--no-news] [--verbose]
 * Requires Node 18+ (native fetch). No dependencies.
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CANDIDATES_PATH = join(ROOT, "scraper", "candidates.json");
const LEDGER_PATH = join(ROOT, "data", "incidents.js");

const args = process.argv.slice(2);
const YEARS_BACK = Number(args[args.indexOf("--years-back") + 1]) || 20;
const VERBOSE = args.includes("--verbose");
const NO_NEWS = args.includes("--no-news");
const THIS_YEAR = new Date().getFullYear();

const API = "https://en.wikipedia.org/w/api.php";
const HEADERS = { "User-Agent": "ValueOfYourLife/0.2 (public-accountability dataset; contact via repo)" };

// Google News RSS keyword sweeps — catches incidents with no Wikipedia article yet.
const NEWS_QUERIES = [
  "stampede dead India",
  "fire kills India building",
  "bridge collapse dead India",
  "train accident dead India",
  "gas leak dead India factory",
  "building collapse dead India",
];

// Year-templated + topical categories to sweep.
const YEAR_CATEGORIES = [
  "Category:%Y disasters in India",
  "Category:%Y fires in India",
  "Category:%Y industrial disasters",
];
const TOPIC_CATEGORIES = [
  "Category:Human stampedes in India",
  "Category:Building collapses in India",
  "Category:Bridge failures in India",
  "Category:Fires in India",
  "Category:Railway accidents and incidents in India",
  "Category:Industrial disasters in India",
  "Category:Landslides in India",
  "Category:Aviation accidents and incidents in India",
];

const log = (...a) => VERBOSE && console.error("[scrape]", ...a);

const sleep = ms => new Promise(r => setTimeout(r, ms));
let lastCall = 0;

async function api(params) {
  const url = API + "?" + new URLSearchParams({ format: "json", origin: "*", ...params });
  for (let attempt = 0; ; attempt++) {
    // Wikipedia rate-limits anonymous clients aggressively; stay under it.
    const wait = lastCall + 600 - Date.now();
    if (wait > 0) await sleep(wait);
    lastCall = Date.now();

    const res = await fetch(url, { headers: HEADERS });
    if (res.status === 429 && attempt < 5) {
      const retryAfter = Number(res.headers.get("retry-after")) || 2 ** attempt * 2;
      log(`429, retrying in ${retryAfter}s`);
      await sleep(retryAfter * 1000);
      continue;
    }
    if (!res.ok) throw new Error(`Wikipedia API ${res.status} for ${url}`);
    return res.json();
  }
}

async function categoryMembers(category) {
  const members = [];
  let cont;
  do {
    const data = await api({
      action: "query", list: "categorymembers", cmtitle: category,
      cmlimit: "500", cmtype: "page", ...(cont ? { cmcontinue: cont } : {}),
    });
    members.push(...(data.query?.categorymembers || []));
    cont = data.continue?.cmcontinue;
  } while (cont);
  log(category, "->", members.length, "pages");
  return members;
}

async function summaries(titles) {
  // Batch page extracts, 20 titles per request.
  const out = new Map();
  for (let i = 0; i < titles.length; i += 20) {
    const batch = titles.slice(i, i + 20);
    const data = await api({
      action: "query", prop: "extracts|info", inprop: "url",
      exintro: "1", explaintext: "1", exlimit: "20",
      titles: batch.join("|"),
    });
    for (const page of Object.values(data.query?.pages || {})) {
      if (page.missing !== undefined) continue;
      out.set(page.title, { extract: page.extract || "", url: page.fullurl });
    }
  }
  return out;
}

async function pageImage(title) {
  try {
    const res = await fetch(
      "https://en.wikipedia.org/api/rest_v1/page/summary/" + encodeURIComponent(title),
      { headers: HEADERS });
    const j = await res.json();
    return j.thumbnail?.source || null;
  } catch { return null; }
}

async function googleNewsCandidates() {
  const items = [];
  for (const q of NEWS_QUERIES) {
    try {
      const url = "https://news.google.com/rss/search?hl=en-IN&gl=IN&ceid=IN:en&q=" +
        encodeURIComponent(q + " when:30d");
      const res = await fetch(url, { headers: HEADERS });
      const xml = await res.text();
      // dependency-free RSS parse: <item><title>…</title><link>…</link><pubDate>…</pubDate>
      for (const m of xml.matchAll(/<item>([\s\S]*?)<\/item>/g)) {
        const item = m[1];
        const title = (item.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/) || [])[1];
        const link = (item.match(/<link>([\s\S]*?)<\/link>/) || [])[1];
        const pub = (item.match(/<pubDate>([\s\S]*?)<\/pubDate>/) || [])[1];
        if (title && link) items.push({ title: title.trim(), url: link.trim(), pubDate: pub || null, query: q });
      }
      await sleep(1000);
    } catch (e) {
      log("news skip", q, String(e));
    }
  }
  return items;
}

function yearOf(title, extract) {
  const m = title.match(/\b(19|20)\d{2}\b/) || extract.match(/\b(19|20)\d{2}\b/);
  return m ? Number(m[0]) : null;
}

function looksRelevant(title, extract) {
  const t = (title + " " + extract).toLowerCase();
  if (!/india|indian/.test(t)) return false;
  // must smell like a mass-casualty incident, not a policy/list article
  if (/^list of|^timeline of/i.test(title)) return false;
  const incident = /(stampede|crush|collaps|fire|blaze|derail|collision|crash|landslide|flood|leak|explosion|capsiz|drown)/;
  const casualties = /(\bdied\b|\bdeaths?\b|\bkilled\b|\bdead\b|casualt)/;
  return incident.test(t) && casualties.test(t);
}

function ledgerTitles() {
  // Evaluate data/incidents.js in a sandboxed "window" to reuse the canonical data.
  const src = readFileSync(LEDGER_PATH, "utf8");
  const window = {};
  new Function("window", src)(window);
  return (window.INCIDENTS || []).flatMap(r => [
    r.name.toLowerCase(),
    ...r.sources.map(s => decodeURIComponent(s.url.split("/wiki/").pop() || "").replace(/_/g, " ").toLowerCase()),
  ]);
}

async function main() {
  const categories = [
    ...TOPIC_CATEGORIES,
    ...YEAR_CATEGORIES.flatMap(tpl =>
      Array.from({ length: YEARS_BACK + 1 }, (_, i) => tpl.replace("%Y", String(THIS_YEAR - i)))),
  ];

  const seenTitles = new Set();
  for (const cat of categories) {
    try {
      for (const m of await categoryMembers(cat)) seenTitles.add(m.title);
    } catch (e) {
      log("skip", cat, String(e));
    }
  }

  const known = ledgerTitles();
  const existing = existsSync(CANDIDATES_PATH)
    ? JSON.parse(readFileSync(CANDIDATES_PATH, "utf8"))
    : { candidates: [] };
  const existingTitles = new Set(existing.candidates.map(c => c.title.toLowerCase()));

  const fresh = [...seenTitles].filter(t => {
    const tl = t.toLowerCase();
    if (existingTitles.has(tl)) return false;
    if (known.some(k => tl.includes(k) || k.includes(tl))) return false;
    return true;
  });
  log(fresh.length, "unseen pages; fetching summaries");

  const sums = await summaries(fresh);
  const cutoff = THIS_YEAR - YEARS_BACK;
  const added = [];

  for (const [title, { extract, url }] of sums) {
    const year = yearOf(title, extract);
    if (!year || year < cutoff) continue;
    if (!looksRelevant(title, extract)) continue;
    added.push({
      title,
      url,
      year,
      extract: extract.slice(0, 600),
      image: await pageImage(title),
      source: "wikipedia",
      status: "needs-review",
      firstSeen: new Date().toISOString().slice(0, 10),
    });
  }

  if (!NO_NEWS) {
    const newsItems = await googleNewsCandidates();
    log(newsItems.length, "news items from Google News RSS");
    const knownAndAdded = [...known, ...added.map(a => a.title.toLowerCase())];
    for (const item of newsItems) {
      const tl = item.title.toLowerCase();
      if (existingTitles.has(tl)) continue;
      if (knownAndAdded.some(k => tl.includes(k) || k.includes(tl))) continue;
      if (!looksRelevant(item.title, "india died")) continue; // title-only relevance check
      existingTitles.add(tl);
      added.push({
        title: item.title,
        url: item.url,
        year: item.pubDate ? new Date(item.pubDate).getFullYear() : THIS_YEAR,
        extract: "",
        image: null,
        source: "google-news",
        status: "needs-review",
        firstSeen: new Date().toISOString().slice(0, 10),
      });
    }
  }

  existing.candidates.push(...added);
  existing.candidates.sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
  existing.lastRun = new Date().toISOString();
  existing.stats = {
    totalCandidates: existing.candidates.length,
    pendingReview: existing.candidates.filter(c => c.status === "needs-review").length,
  };

  writeFileSync(CANDIDATES_PATH, JSON.stringify(existing, null, 2) + "\n");
  console.log(`Added ${added.length} new candidate(s); ${existing.stats.pendingReview} pending review -> ${CANDIDATES_PATH}`);
}

main().catch(e => { console.error(e); process.exit(1); });
