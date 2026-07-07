# Value of Your Life

A state-wise public record of India's mass-casualty, largely preventable tragedies over the last
20 years — what happened, how many died, what price the state announced for each life, and who
(if anyone) actually answered for it.

Two numbers carry the argument: the **median ex-gratia per life (~₹6 lakh)**, which arrives within
hours, and the **running count of criminal convictions (0)**, which never does. Arrests,
suspensions and transfers abound; verdicts do not.

## Run it

No build step, no dependencies. Either open `index.html` directly, or serve the folder:

```sh
python3 -m http.server 8000
# → http://localhost:8000
```

Light and dark themes follow the OS setting. Case files deep-link (`#incident-id`).

## Structure

```
index.html, styles.css, app.js          the app (vanilla JS, static, card grid + case-file dialog)
data/incidents.js                       canonical curated dataset (window.INCIDENTS)
scraper/scrape.mjs                      Wikipedia + Google News sweep → scraper/candidates.json
scraper/research.mjs                    researches one submitted link → drafted candidate
.github/workflows/scrape.yml            weekly scheduled sweep, opens a review PR
.github/workflows/research-submission.yml   researches public submissions, opens a review PR
.github/ISSUE_TEMPLATE/incident-submission.yml   the public submission form
```

## Data model

Each incident records the event (`summary`, `deaths`, `injured`, `tollNote` when the official
count is disputed), the aftermath (`officialResponse`, `blamed`, `compensation`,
`exGratiaPerLife` — the ₹-per-deceased the state announced), accountability (`punished[]` with
per-person outcomes, `convictions`, `caseStatus`), an `image` (Wikimedia Commons photo of the
incident or its site, `null` when none is freely licensed), and `sources[]` — Wikipedia plus
news reporting (Scroll.in, Al Jazeera, LiveLaw, CNN, Business Standard and others), each with a
`publisher` field.

**`convictions` counts only court convictions** — arrests, bail, suspensions and transfers are
recorded in `punished[].outcome` but never counted as accountability.

`caseStatus` values: `trial-ongoing` · `investigation-ongoing` · `convicted` · `acquitted` ·
`closed-no-charges` · `compensation-only`.

## Growing the data

The dataset is deliberately seeded small (~29 incidents) with a pipeline to grow it:

1. **Scrape** — `node scraper/scrape.mjs` (Node 18+) sweeps two source families:
   Wikipedia's year-wise and topical disaster categories (with page summaries and lead images),
   and Google News RSS keyword queries for fresh incidents that have no Wikipedia article yet.
   Results are filtered for India + mass-casualty relevance, deduped against the ledger, and
   appended to `scraper/candidates.json`. Flags: `--years-back N`, `--no-news`, `--verbose`.
2. **Schedule** — the GitHub Action runs the sweep every Monday and opens a PR when new
   candidates appear.
3. **Review** — a human promotes real incidents into `data/incidents.js`, researching the
   accountability fields, and marks the candidate `accepted` or `rejected`. Nothing enters the
   ledger without review, because casualty and punishment figures need editorial judgment.

Case-status fields go stale — trials drag for decades — so periodic re-review of
`trial-ongoing` entries is part of maintenance.

## Public submissions

Anyone can propose an incident from the app: the **Submit an incident** button asks for a news
link (plus optional context) and opens a prefilled GitHub issue. A workflow then runs
`scraper/research.mjs` against the link, which:

1. fetches the article and extracts its metadata (title, publisher, date, image);
2. searches Google News for the same story and counts **independent outlets** carrying it —
   2+ marks the candidate `corroborated`, fewer leaves it `needs-review`;
3. checks Wikipedia for an existing article;
4. dedupes against the ledger, then drafts the candidate into `scraper/candidates.json` and
   opens a PR, commenting the research results back on the issue.

Research is automated; publishing is not. A maintainer verifies the facts — especially casualty
and accountability details — and merging the PR after promotion is what puts the incident on the
page. An accountability record that auto-published unverified claims would defeat its own purpose.

To try it locally: `node scraper/research.mjs "<article-url>" --notes "context"`.

Setup: push this repo to GitHub and set `SUBMIT_REPO` at the top of `app.js` to `"owner/repo"` —
until then the submit dialog shows the local-research fallback.

## Static site or database?

Static is the right call at this scale, and for a while yet. The whole dataset ships as one JS
file; filtering and search run client-side in microseconds, hosting is free (GitHub Pages), and
every edit is a reviewable diff — which doubles as the project's audit trail. A few hundred or
even a few thousand incidents won't change that.

A database earns its keep only when one of these arrives: public submissions or corrections from
users (needs moderation queues), per-case update feeds/notifications, server-side full-text
search across long court documents, or an API for others to build on. The natural first step at
that point is SQLite + a tiny API in front of the same schema — the JSON model migrates directly.

## Caveats

Figures are widely reported counts compiled from public sources, not official certifications;
several tolls are disputed and flagged as such. Images are Wikimedia Commons photographs of the
incident or its site — captions say which. This is a citizen record, not a legal document.
Corrections are the point of a ledger — file them.
