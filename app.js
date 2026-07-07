/* Value of Your Life — card ledger + case-file dialog. No dependencies, no build step. */

(function () {
  "use strict";

  // GitHub repo that receives incident submissions, as "owner/repo".
  // Until it's set, the submit dialog falls back to local instructions.
  const SUBMIT_REPO = "";

  const DATA = (window.INCIDENTS || []).slice().sort((a, b) => b.date.localeCompare(a.date));

  const CATEGORY_LABELS = {
    fire: "Fire",
    stampede: "Stampede",
    collapse: "Collapse",
    rail: "Rail",
    industrial: "Industrial",
    "flood-landslide": "Flood / landslide",
    aviation: "Aviation",
    sabotage: "Sabotage"
  };

  const STATUS_LABELS = {
    "trial-ongoing": "Trial ongoing",
    "investigation-ongoing": "Investigation ongoing",
    convicted: "Convictions secured",
    acquitted: "Acquitted",
    "closed-no-charges": "Closed — no one charged",
    "compensation-only": "Compensation only"
  };

  const state = { search: "", state: "", category: "", status: "", view: "state" };

  const $ = (sel, el) => (el || document).querySelector(sel);
  const $$ = (sel, el) => Array.from((el || document).querySelectorAll(sel));

  const fmt = new Intl.NumberFormat("en-IN");

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, c => (
      { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
    ));
  }

  function rupees(n) {
    if (n == null) return null;
    if (n >= 1e7) return "₹" + (n / 1e7).toFixed(n % 1e7 ? 1 : 0) + " crore";
    if (n >= 1e5) return "₹" + (n / 1e5).toFixed(n % 1e5 ? 1 : 0) + " lakh";
    return "₹" + fmt.format(n);
  }

  function yearsSince(iso) {
    const then = new Date(iso + "T00:00:00");
    return Math.floor((Date.now() - then.getTime()) / (365.25 * 24 * 3600 * 1000));
  }

  function fmtDate(iso) {
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  }

  /* ——— national tally ——— */

  function renderTally(rows) {
    const deaths = rows.reduce((n, r) => n + r.deaths, 0);
    const convictions = rows.reduce((n, r) => n + r.convictions, 0);
    const noAction = rows.filter(r => r.punished.length === 0).length;
    const values = rows.map(r => r.exGratiaPerLife).filter(v => v != null).sort((a, b) => a - b);
    const median = values.length ? values[Math.floor(values.length / 2)] : null;

    const cells = [
      { n: fmt.format(rows.length), l: "incidents on record", cls: "" },
      { n: fmt.format(deaths), l: "lives lost", cls: "" },
      { n: median != null ? rupees(median) : "—", l: "median price of a life", cls: "gap" },
      { n: fmt.format(convictions), l: "criminal convictions", cls: convictions === 0 ? "gap" : "won" },
      { n: fmt.format(noAction), l: "incidents · no one acted against", cls: "gap" }
    ];
    $("#national-tally").innerHTML = cells.map(c =>
      `<div class="kpi"><span class="n ${c.cls}">${c.n}</span><span class="l">${c.l}</span></div>`
    ).join("");
    if (median != null) $("#hero-price").textContent = rupees(median).replace(" lakh", ",00,000");
  }

  /* ——— filters ——— */

  function buildFilterOptions() {
    const states = [...new Set(DATA.map(r => r.state))].sort();
    $("#f-state").insertAdjacentHTML("beforeend",
      states.map(s => `<option value="${esc(s)}">${esc(s)}</option>`).join(""));

    const cats = [...new Set(DATA.map(r => r.category))];
    $("#f-category").insertAdjacentHTML("beforeend",
      cats.map(c => `<option value="${esc(c)}">${esc(CATEGORY_LABELS[c] || c)}</option>`).join(""));

    const statuses = [...new Set(DATA.map(r => r.caseStatus))];
    $("#f-status").insertAdjacentHTML("beforeend",
      statuses.map(s => `<option value="${esc(s)}">${esc(STATUS_LABELS[s] || s)}</option>`).join(""));
  }

  function applyFilters() {
    const q = state.search.trim().toLowerCase();
    return DATA.filter(r => {
      if (state.state && r.state !== state.state) return false;
      if (state.category && r.category !== state.category) return false;
      if (state.status && r.caseStatus !== state.status) return false;
      if (q) {
        const hay = [
          r.name, r.city, r.state, r.summary, r.blamed, r.officialResponse,
          ...r.punished.map(p => p.who + " " + p.outcome)
        ].join(" ").toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }

  /* ——— cards ——— */

  function statusChip(r) {
    if (r.convictions > 0) return `<span class="chip chip-conv">${esc(STATUS_LABELS[r.caseStatus] || r.caseStatus)}</span>`;
    if (["closed-no-charges", "compensation-only", "acquitted"].includes(r.caseStatus))
      return `<span class="chip chip-none">${esc(STATUS_LABELS[r.caseStatus] || r.caseStatus)}</span>`;
    return `<span class="chip chip-ongoing">${esc(STATUS_LABELS[r.caseStatus] || r.caseStatus)}</span>`;
  }

  function cardMedia(r) {
    const badge = `<span class="badge">${esc(CATEGORY_LABELS[r.category] || r.category)}</span>`;
    if (r.image) {
      return `<div class="card-media"><img src="${esc(r.image.src)}" alt="${esc(r.name)}" loading="lazy" />${badge}</div>`;
    }
    const v = rupees(r.exGratiaPerLife);
    return `<div class="card-media"><div class="placeholder">
      <span class="ph-value">${v ? esc(v) + " / life" : "No price set"}</span>
      <span class="ph-label">${v ? "the state's announced value" : "no ex-gratia recorded"}</span>
    </div>${badge}</div>`;
  }

  function renderCard(r) {
    const v = rupees(r.exGratiaPerLife);
    return `
    <button class="card" type="button" data-id="${esc(r.id)}" aria-haspopup="dialog">
      ${cardMedia(r)}
      <span class="card-body">
        <span class="card-date">${fmtDate(r.date)}</span>
        <span class="card-title">${esc(r.name)}</span>
        <span class="card-loc">${esc(r.city)}, ${esc(r.state)}</span>
        ${statusChip(r)}
      </span>
      <span class="card-stats">
        <span class="stat"><span class="sn">${fmt.format(r.deaths)}</span><span class="sl">dead</span></span>
        <span class="stat stat-conv ${r.convictions > 0 ? "has-conv" : ""}"><span class="sn">${fmt.format(r.convictions)}</span><span class="sl">convicted</span></span>
        <span class="stat stat-value"><span class="sn">${v ? esc(v) : "—"}</span><span class="sl">value per life</span></span>
      </span>
    </button>`;
  }

  function groupRows(rows) {
    if (state.view === "toll") {
      return [{ title: "All incidents, heaviest toll first", rows: rows.slice().sort((a, b) => b.deaths - a.deaths) }];
    }
    if (state.view === "time") {
      const byYear = new Map();
      rows.forEach(r => {
        const y = r.date.slice(0, 4);
        if (!byYear.has(y)) byYear.set(y, []);
        byYear.get(y).push(r);
      });
      return [...byYear.entries()]
        .sort((a, b) => b[0].localeCompare(a[0]))
        .map(([y, rs]) => ({ title: y, rows: rs }));
    }
    const byState = new Map();
    rows.forEach(r => {
      if (!byState.has(r.state)) byState.set(r.state, []);
      byState.get(r.state).push(r);
    });
    return [...byState.entries()]
      .sort((a, b) => {
        const da = a[1].reduce((n, r) => n + r.deaths, 0);
        const db = b[1].reduce((n, r) => n + r.deaths, 0);
        return db - da;
      })
      .map(([s, rs]) => ({ title: s, rows: rs }));
  }

  function render() {
    const rows = applyFilters();
    renderTally(rows);

    const ledger = $("#ledger");
    if (!rows.length) {
      ledger.innerHTML = `<div class="empty">Nothing in the record matches. <button type="button" id="clear-filters">Clear filters</button></div>`;
      $("#clear-filters").addEventListener("click", () => {
        state.search = state.state = state.category = state.status = "";
        $("#f-search").value = ""; $("#f-state").value = ""; $("#f-category").value = ""; $("#f-status").value = "";
        render();
      });
      return;
    }

    ledger.innerHTML = groupRows(rows).map(g => {
      const deaths = g.rows.reduce((n, r) => n + r.deaths, 0);
      const conv = g.rows.reduce((n, r) => n + r.convictions, 0);
      return `
      <section class="group">
        <header class="group-head">
          <h2>${esc(g.title)}</h2>
          <span class="group-meta">${g.rows.length} incident${g.rows.length === 1 ? "" : "s"} ·
            <span class="g-deaths">${fmt.format(deaths)} dead</span> · ${fmt.format(conv)} convicted</span>
        </header>
        <div class="grid">${g.rows.map(renderCard).join("")}</div>
      </section>`;
    }).join("");

    $$(".card", ledger).forEach(card =>
      card.addEventListener("click", () => openCase(card.dataset.id)));
  }

  /* ——— case-file dialog ——— */

  function openCase(id) {
    const r = DATA.find(x => x.id === id);
    if (!r) return;

    const dialog = $("#casefile");
    const v = rupees(r.exGratiaPerLife);
    const y = yearsSince(r.date);

    let stamp = "";
    if (r.convictions === 0) {
      if (r.caseStatus === "closed-no-charges" || r.caseStatus === "compensation-only")
        stamp = `<span class="stamp">No one punished</span>`;
      else if (y >= 5)
        stamp = `<span class="stamp">${y} years · no verdict</span>`;
    }

    const punishedHtml = r.punished.length
      ? `<ul class="punished-list">${r.punished.map(p =>
          `<li><span class="who">${esc(p.who)}</span><span class="outcome">${esc(p.outcome)}</span></li>`
        ).join("")}</ul>`
      : `<p class="punished-empty">— No individual or institution was ever acted against. —</p>`;

    const openNote = (r.caseStatus === "trial-ongoing" || r.caseStatus === "investigation-ongoing")
      ? `<p class="years-open">Case open ${y < 1 ? "under a year" : y + " year" + (y === 1 ? "" : "s")} and counting.</p>`
      : "";

    const hero = r.image
      ? `<div class="cf-hero"><img src="${esc(r.image.src)}" alt="${esc(r.name)}" /><span class="credit">${esc(r.image.credit)}</span>
         <button class="cf-close" type="button" aria-label="Close">✕</button></div>`
      : `<button class="cf-close" type="button" aria-label="Close">✕</button>`;

    dialog.classList.toggle("no-image", !r.image);
    $("#casefile-body").innerHTML = `
      ${hero}
      <div class="cf-pad">
        <p class="cf-date">${fmtDate(r.date)} · ${esc(CATEGORY_LABELS[r.category] || r.category)}</p>
        <h2 class="cf-title">${esc(r.name)}</h2>
        <p class="cf-loc">${esc(r.city)}, ${esc(r.state)} ${statusChip(r)}</p>

        <div class="cf-strip">
          <div class="cell"><b>${fmt.format(r.deaths)}</b><span>dead</span></div>
          <div class="cell gap"><b>${fmt.format(r.convictions)}</b><span>convicted by a court</span></div>
          <div class="cell value"><b>${v ? esc(v) : "—"}</b><span>state's value per life</span></div>
        </div>

        <div class="cf-section">
          ${stamp}
          <h3>What happened</h3>
          <p>${esc(r.summary)}</p>
          ${r.tollNote ? `<p class="toll-note">Toll disputed: ${esc(r.tollNote)}</p>` : ""}
        </div>
        <div class="cf-section"><h3>What the government did</h3><p>${esc(r.officialResponse)}</p></div>
        <div class="cf-section"><h3>Who was blamed</h3><p>${esc(r.blamed)}</p></div>
        <div class="cf-section"><h3>Who actually answered for it</h3>${punishedHtml}${openNote}</div>
        <div class="cf-section"><h3>Compensation</h3><p>${esc(r.compensation || "None announced")}${r.injured != null ? ` · ${fmt.format(r.injured)} injured` : ""}</p></div>
        <div class="cf-section">
          <h3>Sources & reporting</h3>
          <ul class="src-list">${r.sources.map(s =>
            `<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.title)}</a><span class="pub">${esc(s.publisher || (s.url.includes("wikipedia.org") ? "Wikipedia" : new URL(s.url).hostname.replace("www.", "")))}</span></li>`
          ).join("")}</ul>
        </div>
      </div>`;

    $(".cf-close", dialog).addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", e => { if (e.target === dialog) dialog.close(); }, { once: true });
    dialog.showModal();
    $(".cf-scroll", dialog).scrollTop = 0;
    history.replaceState(null, "", "#" + r.id);
    dialog.addEventListener("close", () => history.replaceState(null, "", location.pathname + location.search), { once: true });
  }

  /* ——— submissions ——— */

  function initSubmit() {
    const dialog = $("#submit-dialog");
    $("#open-submit").addEventListener("click", () => {
      dialog.showModal();
      $("#sd-url").focus();
    });
    $(".sd-close", dialog).addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", e => { if (e.target === dialog) dialog.close(); });

    $("#submit-form").addEventListener("submit", e => {
      const url = $("#sd-url").value.trim();
      const notes = $("#sd-notes").value.trim();
      if (!url) return;
      e.preventDefault();

      if (SUBMIT_REPO) {
        // GitHub issue forms prefill via query params matching field ids
        const issueUrl = `https://github.com/${SUBMIT_REPO}/issues/new?` + new URLSearchParams({
          template: "incident-submission.yml",
          title: "[Incident] " + url.slice(0, 120),
          url, notes
        });
        window.open(issueUrl, "_blank", "noopener");
        dialog.close();
        return;
      }

      // repo not configured yet: give the maintainer path instead
      const form = $("#submit-form");
      form.innerHTML = `
        <button class="cf-close sd-close" type="button" aria-label="Close">✕</button>
        <h2>Almost there</h2>
        <p class="sd-intro">Public submissions open once this record is on GitHub.
        For now, send the link to the maintainer, or run the research locally:</p>
        <pre class="sd-cmd">node scraper/research.mjs "${esc(url)}"${notes ? ` --notes "${esc(notes).replace(/"/g, "&quot;")}"` : ""}</pre>
        <p class="sd-footnote">This fetches the article, finds corroborating coverage from other
        outlets, and drafts a reviewable candidate in <code>scraper/candidates.json</code>.</p>`;
      $(".sd-close", form).addEventListener("click", () => dialog.close());
    });
  }

  /* ——— init ——— */

  function init() {
    buildFilterOptions();

    $("#f-search").addEventListener("input", e => { state.search = e.target.value; render(); });
    $("#f-state").addEventListener("change", e => { state.state = e.target.value; render(); });
    $("#f-category").addEventListener("change", e => { state.category = e.target.value; render(); });
    $("#f-status").addEventListener("change", e => { state.status = e.target.value; render(); });

    $$(".seg-btn").forEach(b => b.addEventListener("click", () => {
      $$(".seg-btn").forEach(x => x.classList.remove("is-active"));
      b.classList.add("is-active");
      state.view = b.dataset.view;
      render();
    }));

    const dates = DATA.map(r => r.date).sort();
    $("#colophon-meta").textContent =
      `Record spans ${dates[0].slice(0, 4)}–${dates[dates.length - 1].slice(0, 4)} · ` +
      `${DATA.length} incidents seeded · figures are widely-reported counts, not official certifications.`;

    initSubmit();
    render();

    // deep link: #incident-id opens that case file
    const id = location.hash.slice(1);
    if (id && DATA.some(r => r.id === id)) openCase(id);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
