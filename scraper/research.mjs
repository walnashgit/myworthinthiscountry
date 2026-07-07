#!/usr/bin/env node
/**
 * Value of Your Life — submission research.
 *
 * Takes a link someone submitted, and does the legwork:
 *   1. Fetches the page and extracts metadata (title, publisher, date, image, description).
 *   2. Searches Google News RSS for the same story to find corroborating coverage
 *      from OTHER outlets (independent domains).
 *   3. Checks Wikipedia for an existing article on the incident.
 *   4. Dedupes against the ledger and existing candidates, then appends a drafted
 *      candidate to scraper/candidates.json with its corroboration attached.
 *
 * A submission is marked "corroborated" when at least 2 independent outlets carry
 * the story; otherwise "needs-review". Either way a human promotes it into
 * data/incidents.js — research is automated, publishing is not.
 *
 * Usage:  node scraper/research.mjs <url> [--notes "submitter context"]
 * Requires Node 18+ (native fetch). No dependencies.
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CANDIDATES_PATH = join(ROOT, "scraper", "candidates.json");
const LEDGER_PATH = join(ROOT, "data", "incidents.js");

const HEADERS = {
  "User-Agent": "Mozilla/5.0 (compatible; ValueOfYourLife/0.2; public-accountability dataset)",
  "Accept": "text/html,application/xhtml+xml,*/*",
};

const args = process.argv.slice(2);
const url = args.find(a => /^https?:\/\//.test(a));
const notesIdx = args.indexOf("--notes");
const notes = notesIdx > -1 ? args[notesIdx + 1] : "";

if (!url) {
  console.error("Usage: node scraper/research.mjs <url> [--notes \"...\"]");
  process.exit(1);
}

const sleep = ms => new Promise(r => setTimeout(r, ms));
const domainOf = u => { try { return new URL(u).hostname.replace(/^www\./, ""); } catch { return ""; } };

const STOPWORDS = new Set(("a an the of in on at to for from by with and or as is are was were be been " +
  "after over under near amid says say said live updates news latest breaking watch video photos " +
  "what how why when who top today report reports").split(" "));

function meta(html, prop) {
  const re = new RegExp(
    `<meta[^>]+(?:property|name)=["']${prop}["'][^>]+content=["']([^"']+)["']|` +
    `<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${prop}["']`, "i");
  const m = html.match(re);
  return m ? (m[1] || m[2]).trim() : null;
}

function decodeEntities(s) {
  return s ? s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#0?39;|&apos;/g, "'")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ") : s;
}

async function fetchArticle(u) {
  const res = await fetch(u, { headers: HEADERS, redirect: "follow" });
  if (!res.ok) throw new Error(`Fetch failed: HTTP ${res.status}`);
  const html = (await res.text()).slice(0, 500_000);
  const title = decodeEntities(
    meta(html, "og:title") ||
    (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || "");
  return {
    url: res.url,
    title: title.trim(),
    publisher: decodeEntities(meta(html, "og:site_name")) || domainOf(res.url),
    description: decodeEntities(meta(html, "og:description") || meta(html, "description")) || "",
    published: meta(html, "article:published_time") || meta(html, "datePublished") || null,
    image: meta(html, "og:image") || null,
  };
}

function searchTerms(title, description) {
  const text = (title + " " + description).toLowerCase().replace(/[^a-z0-9\s]/g, " ");
  const seen = new Set();
  const words = [];
  for (const w of text.split(/\s+/)) {
    if (w.length < 3 || STOPWORDS.has(w) || seen.has(w)) continue;
    seen.add(w); words.push(w);
    if (words.length >= 8) break;
  }
  return words.join(" ");
}

async function corroborate(terms, excludeDomain) {
  const u = "https://news.google.com/rss/search?hl=en-IN&gl=IN&ceid=IN:en&q=" + encodeURIComponent(terms);
  const res = await fetch(u, { headers: HEADERS });
  if (!res.ok) return [];
  const xml = await res.text();
  const items = [];
  for (const m of xml.matchAll(/<item>([\s\S]*?)<\/item>/g)) {
    const item = m[1];
    const title = decodeEntities((item.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/) || [])[1] || "");
    const link = (item.match(/<link>([\s\S]*?)<\/link>/) || [])[1] || "";
    const source = decodeEntities((item.match(/<source[^>]*>([\s\S]*?)<\/source>/) || [])[1] || "");
    if (!title || !link) continue;
    // Google News titles end with " - Publisher"; use it when <source> is absent
    const pub = source || (title.match(/ - ([^-]+)$/) || [])[1] || "";
    if (pub && excludeDomain && pub.toLowerCase().includes(excludeDomain.split(".")[0])) continue;
    items.push({ title: title.replace(/ - [^-]+$/, "").trim(), url: link.trim(), publisher: pub.trim() });
    if (items.length >= 10) break;
  }
  // count independent publishers
  const pubs = new Set(items.map(i => i.publisher.toLowerCase()).filter(Boolean));
  return { items, independentOutlets: pubs.size };
}

async function wikipediaMatch(terms) {
  try {
    const u = "https://en.wikipedia.org/w/api.php?format=json&action=query&list=search&srlimit=3&srsearch=" +
      encodeURIComponent(terms);
    const res = await fetch(u, { headers: { "User-Agent": HEADERS["User-Agent"] } });
    const j = await res.json();
    const hit = j.query?.search?.[0];
    return hit ? { title: hit.title, url: "https://en.wikipedia.org/wiki/" + hit.title.replace(/ /g, "_") } : null;
  } catch { return null; }
}

function ledgerTitles() {
  const src = readFileSync(LEDGER_PATH, "utf8");
  const window = {};
  new Function("window", src)(window);
  return (window.INCIDENTS || []).map(r => r.name.toLowerCase());
}

async function main() {
  console.log("Researching:", url);
  const article = await fetchArticle(url);
  if (domainOf(article.url) === "news.google.com") {
    throw new Error("This is a Google News redirect link, which hides the article behind a script. Please submit the publisher's own URL (open the story, copy the address from the news site itself).");
  }
  if (!article.title) throw new Error("Could not extract a title from the page.");
  console.log("  Title:    ", article.title);
  console.log("  Publisher:", article.publisher);

  const terms = searchTerms(article.title, article.description);
  console.log("  Searching corroboration for:", terms);
  await sleep(500);
  const { items: related, independentOutlets } = await corroborate(terms, domainOf(article.url));
  console.log(`  Corroboration: ${related.length} related articles, ${independentOutlets} independent outlets`);

  const wiki = await wikipediaMatch(terms);
  if (wiki) console.log("  Possible Wikipedia article:", wiki.url);

  // dedupe
  const existing = existsSync(CANDIDATES_PATH)
    ? JSON.parse(readFileSync(CANDIDATES_PATH, "utf8"))
    : { candidates: [] };
  const tl = article.title.toLowerCase();
  const dupCandidate = existing.candidates.find(c =>
    c.url === article.url || c.title.toLowerCase() === tl);
  const dupLedger = ledgerTitles().find(k => tl.includes(k) || k.includes(tl));
  if (dupCandidate || dupLedger) {
    console.log("\nAlready on file:", dupLedger ? `ledger entry "${dupLedger}"` : `candidate "${dupCandidate.title}"`);
    console.log("No candidate added.");
    return;
  }

  const status = independentOutlets >= 2 ? "corroborated" : "needs-review";
  const candidate = {
    title: article.title,
    url: article.url,
    year: article.published ? new Date(article.published).getFullYear() : new Date().getFullYear(),
    extract: article.description.slice(0, 600),
    image: article.image,
    source: "submission",
    submitterNotes: notes || undefined,
    corroboration: related.slice(0, 6),
    independentOutlets,
    wikipedia: wiki || undefined,
    status,
    firstSeen: new Date().toISOString().slice(0, 10),
  };

  existing.candidates.unshift(candidate);
  existing.lastRun = new Date().toISOString();
  existing.stats = {
    totalCandidates: existing.candidates.length,
    pendingReview: existing.candidates.filter(c => c.status !== "accepted" && c.status !== "rejected").length,
  };
  writeFileSync(CANDIDATES_PATH, JSON.stringify(existing, null, 2) + "\n");

  console.log(`\nCandidate added to scraper/candidates.json with status "${status}".`);
  console.log(status === "corroborated"
    ? "Story is carried by multiple independent outlets — ready for editorial promotion into data/incidents.js."
    : "Fewer than 2 independent outlets found — verify manually before promoting.");
}

main().catch(e => { console.error("Research failed:", e.message); process.exit(1); });
