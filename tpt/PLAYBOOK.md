# The Bright Scholar playbook — weekly TPT factory

Single source of truth for how content is made, packaged, and shipped.
Read this top to bottom before producing anything.

## Ground rules (set by the owner, 2026-08-24)

1. **This is not a business.** "AI-Ready School" is kept purely as a brand
   aesthetic — the owner likes it. There is no company, no website, no
   funnel, no membership, no certificate program. Nothing we ship may
   reference or depend on anything outside TeachersPayTeachers.
2. **The goal is highly profitable side income** for one teacher uploading
   content weekly. Optimize for revenue per hour of the owner's time: the
   owner's job on upload day is drag, paste, publish — nothing else.
3. **Never promise future content** (no "session N of 8", no "coming soon").
   A series label is fine when the other items already exist in the store.
4. **Provenance line stays**: "Built and audited by two certified teachers."
   It is true, and it is the trust signal that sells on TPT.
5. **TPT-native monetization only**: $24 kits, discounted additional
   licenses, bundles, POs through TpT for Schools. All of it runs inside
   TPT with zero owner effort.
6. **W-9 is the owner's SSN** (individual), never the old LLC EIN.

## The brand (unchanged)

`tpt/BRAND_THEME.md` is the visual law: Bright Scholar palette
(ink/school-blue/teal/sunny/tomato/cream), Fredoka + Nunito, the intern
mascot, the three-layer loudness rule, rainbow bar on every cover.
Canva masters live in the "Bright Scholar — TPT Brand" folder
(see `tpt/canva/README.md` for design ids).

## The weekly cycle (owner directives 2026-08-24; two drop days 2026-08-26;
## drop days moved to Sunday + Wednesday 2026-08-28)

The week has **two drops** and a research rhythm that feeds them
(see "Research cadence" below):

- **Sunday drop — AI for schools & homeschool**: classroom lane +
  homeschool lane + open-demand lane.
- **Wednesday drop — Young Entrepreneurs & Deaf Education**: the YE
  lane + the Deaf Ed lane (`tpt/intel/deaf-ed-niche.md` holds that
  line's binding design laws — accuracy and respect, pedagogy never
  audiology, doubled privacy, the owner's family never referenced).

### Sunday drop lanes

**Lane 1 · Classroom (teachers & staff):**
- **5 free resources** — the traffic engine. Each targets a real search
  teachers type, is genuinely useful on its own (print-and-go, 1–3
  pages), and funnels to the store's paid items with one store-internal
  callout. Free downloads earn followers, reviews, and search rank.
- **1 mid-priced product** ($8–12) — a tangible classroom time-saver
  that passes the Swipe Test (templates, planning tools, letters,
  prompts — never just information).
- **1–2 higher-priced products** ($12–24+) — the revenue engine: PD
  Shorts, full kits/kit retrofits, deep template packs, or a bundle
  assembled from existing listings.

**Lane 5 · Best-Sellers + Open Demand (owner directives 2026-09-01,
2026-09-03):**
- Primary job now: the **Best-Seller line** — proven TPT formats rebuilt
  as original Bright Scholar content, each ending in the **AI Growth
  Eval** page. Binding spec and the five owner decisions:
  `tpt/intel/bestseller-formats.md`. First build is ONE format at 40–60
  pages, priced **$15–20**, and it may author real academic
  student-facing content (see that file's authoring standard).
- When no best-seller build is in flight, the lane falls back to the
  highest open **win score** row in `tpt/intel/winnable-niches.md`
  (currently: take home folder 829, happy mail 816).

**Lane 2 · Homeschool AI:**
- **2 free resources** targeting homeschool/family searches, and
- **1 paid product** ($8–12) in the Homeschool AI category.
- Design law, always: **the grown-up holds the keyboard** — chatbots
  are 13+, AI coaches the parent, kids think and decide, child identity
  never enters a prompt, anything online is adult-run.
- Homeschool backlog: ages-4–5 dedicated unplugged pack · co-op group
  editions · record-keeping/portfolio pack · AI read-aloud & library
  companion · family AI literacy night kit · co-op teaching packs.

### Wednesday drop lanes (owner directive 2026-08-26)

**Lane 3 · Young Entrepreneurs:**
- **2 free + 1 paid** ($8–12). Same grown-up-holds-the-keyboard law.
- YE backlog: seasonal venture packs (holiday craft fair, spring plant
  sale) · Launch It level 3 (12s nearing 13: "almost-your-own-account"
  readiness) · service-business edition (pet care, yard help) ·
  co-op/classroom market-day kit.

**Lane 4 · Deaf Education** (ToDs, itinerants, and gen-ed teachers of
DHH students):
- **2–3 free + up to 1 paid** ($8–12) — free-heavy early while the
  audience builds; the paid slot fills as the line matures rather than
  weekly filler. AI can feature but doesn't have to.
- Design laws and first-wave backlog: `tpt/intel/deaf-ed-niche.md`
  (binding). Seasonal peak: Aug–Sep in-service season, spring IEP
  season.

That's ~8 products Sunday + ~6 Wednesday, every one built for
maximum TPT SEO and sellability, every one through the full quality
gates so the owner uploads with **zero editing**. More uploads is fine
(owner, 2026-08-24); thin quality is not — if a week can't fill both
lanes at standard, ship lane 1 complete and say so in the summary
rather than shipping filler. Content is chosen by
two filters: (a) what the audience needs *right now* on the school-year
calendar, and (b) trailblazer-niche positioning — AI angles nobody
else covers yet, phrased in the search terms buyers already use
(sub plans, parent communication, homeschool curriculum, kids business —
plus "with AI").

Weekly batches are themed so the frees cross-sell that week's paid items.
Recurring batch ingredients (fold into the weekly 5+1+2 rather than
taking a week off): **bundle assembly** when 3+ related listings exist,
**quarterly optimize passes** on the top sellers, and **second editions**
of aging winners — each of these can stand in for a higher-priced slot in
a slow season, never for the frees.

### Research cadence (owner directive 2026-08-26)

Research is spread across the week so limited daily API allotments
(Mangools KWFinder free tier, Semrush units when available) compound
instead of bottlenecking one session:

- **Daily pulse (Mon–Fri, ~15 min, silent)**: a short automated check
  appending to `tpt/intel/pulse-YYYY-Www.md` — each weekday focuses on
  one lane's keywords/competitors/pricing, spending that day's free
  Mangools lookups (token in the `MANGOOLS_TOKEN` env var; note it and
  continue on other meters when unset — verified unset in fresh
  containers as of 2026-08-28).
- **List days (the pulse messages the owner):**
  - **FRIDAY** → `lookups-YYYY-Www-sunday.md`, the TPT Keywords
    worksheet for **Sunday's** lanes 1–2.
  - **MONDAY** → `lookups-YYYY-Www-wednesday.md`, for **Wednesday's**
    lanes 3–4.
- **Tuesday pulse additionally compiles the Wednesday brief**
  (`tpt/intel/YYYY-Www-wed-brief.md`, same owner analysis spec) for
  lanes 3–4 from the week's pulses so far.
- **Saturday deep dive** compiles everything into the Sunday brief
  (`tpt/intel/YYYY-Www-brief.md`) for lanes 1–2.

**File-week convention:** intel files are keyed to the ISO week of the
**Wednesday** drop; the Sunday drop that precedes that Wednesday shares
the same file (so Sun 2026-08-30 and Wed 2026-09-02 are both W36).

The factories read their day's brief before building; briefs may
override the calendar row per the standing rules.

### The AI Growth Eval — brand signature on EVERY product (2026-09-03)

Every product ends with a Growth Eval, scaled to its size: a printable
**score band → what it means → next three moves** table, plus an
optional copy-paste prompt using **de-identified data only** (never a
name, never a child at a keyboard, never a roster in a chatbot). On a
one-page free this is a short footer block; on a paid kit it is a full
page. Existing catalog gets retrofitted over time, newest first.

### Production steps (run once per product, each drop day)

0. **Read the newest brief in `tpt/intel/` first** (see its README). It
   is produced automatically every Saturday (Sunday drop) or Tuesday
   (Wednesday drop) and may override the calendar
   row: chase live demand, retitle toward proven search phrases, swap a
   planned free for one the data supports. A brief older than 14 days is
   stale — proceed on the calendar and say so in the ship summary.
1. Pick this week's batch from the **Year-1 batch calendar** below
   (top pending row; a seasonal batch may jump the queue if its buying
   window would otherwise close), adjusted by the intel brief.
2. Author or retrofit the content:
   - **Micro-products** (free PDFs, drill packs, template packs): write
     src HTML in the Bright Scholar layer-3 interior style
     (`kits/tooling/brand-v3.css` is the reference), render to PDF with
     headless chromium `--print-to-pdf` (no npm deps; see existing
     `kits/*/src` for structure).
   - **Kit retrofits** (kits 03–08 already exist in `kits/kitNN/` in v1
     style): follow the retrofit rule in BRAND_THEME — dry-run first,
     verify page counts and extracted text match v1 before shipping.
3. Add a `PRODUCTS` entry to `tpt/make_covers.js` and render the cover.
   Paid products also get what's-inside + real-pages images via
   `tpt/make_listing_extras.js` (put page renders in `tpt/pinsrc/`).
   Then build the sneak-peek preview with `node tpt/make_previews.js`
   (paid listings need `previewShots` + `previewInside` in listings.json;
   free PDFs are sampled automatically).
4. Add the listing to `tpt/listings.json`: title, description, price,
   licenses, grades, subjects, ≤6 tags, formats. Copy rules: keyword-rich
   title with pipes, **≤80 characters — TPT cuts longer titles**
   (owner-verified 2026-08-24), most-searched keywords first; description
   in plain paragraphs, provenance line at
   the end, no external references, free items may point to "our full PD
   sessions are in the store" (store-internal only).
5. `node tpt/make_drops.js` → builds/refreshes drop zips in `UPLOAD/drops/`.
5a. **Easel (owner directive, 2026-08-24)**: student-facing products
   (kid workbooks, worksheets, exit tickets) are designed Easel-ready —
   clear write-in lines and boxes on clean Letter pages — and ship with a
   `6-EASEL-SETUP.txt` build script in the drop (see `tpt/easel/`;
   listings gain an `easelSetup` path and make_drops packages it). The
   Easel activity itself is built by the owner in TPT's editor after
   publishing; the "includes digital Easel version" description line is
   added only once it's live. Teacher/parent-facing products skip Easel.
5b. **Pinterest pins (owner directive, 2026-08-24; pin design rebuilt
   2026-08-30 — binding)**: add a `PIN_COPY` entry for every new listing
   in `tpt/make_pins.js` (headline stack, palette, board, keyword-rich
   description), then `node tpt/make_pins.js` → one 1000×1500 pin per
   listing in `tpt/pins/` plus `PINS.txt` (the upload sheet: board,
   title, description per pin; owner pastes the listing URL). Needs
   `npm i --no-save playwright @fontsource/luckiest-guy @fontsource/baloo-2`
   in a fresh session.
   **Ship only the week's new (or content-fixed) pins** + `PINS.txt` as
   a `PINS-*.zip` alongside the drops (owner correction 2026-08-30 — a
   design-only change is not a reason to make the owner re-post pins
   already live on Pinterest boards). Footgun: `make_pins.js` regenerates
   *every* listing's PNG on each run, not just the new ones, because
   `shotsFor()`'s freshness check only looks at each product's own PDF
   mtime — so after running it, `git status` will show all 33 changed
   even though only the week's products actually changed content. Before
   staging: `git diff --stat tpt/pins/` and `git checkout -- ` (or
   `git restore --source <prior commit> --`) any `*-pin.png` whose
   listing isn't part of this week's batch and didn't get a real content
   fix, so only the intended pins actually change in git and in the
   zip. A listing whose *product PDF* changed for a real reason (a
   content bug fix, not just this template) still needs a fresh pin —
   don't revert those, the stale old pin would show outdated content.
   **Pin design law (owner correction 2026-08-30 — "cleaner, more fun,
   actual pages large"): at most 2 real-page shots per pin, shown big
   (own `shotsFor()` caps at 2 and sizes them ~520–600px wide on the
   1000px canvas) — never the old 3-small-pages-in-a-row layout, which
   read cluttered and made the page content unreadable at pin size.**
   This design applies to every pin built from now on (new listings,
   and any existing listing whose pin gets regenerated for a real
   reason) — it is not itself a reason to touch pins that aren't
   otherwise changing. Any layout change to the shot/foot/badge zones
   must re-verify the footer CTA button is never covered by a page
   image (`.foot` needs `z-index` above the shot images, or shot
   heights tuned so their bottom edge clears the footer zone) — check a
   rendered sample before shipping. Pin copy rules: real pages only in
   mockups, honest badges, seasonal pins 30–45 days early, frees pinned
   hardest (they are the click engine).
6. **Quality gates (all must pass):**
   - every PDF opens (pypdf) and page counts are recorded;
   - **no section, paragraph, card, or write-in box splits across a page
     break** — run `python3 kits/tooling/check_breaks.py <pdfs>` (owner
     directive 2026-08-24; the checker pair-matches clipped boxes, flags
     orphan headings / split paragraphs, an "ORPHAN SECTION" — a heading
     stranded with its one-line description while the table/card it
     introduces starts fresh on the next page — and a `.sheet poster`
     page is excluded from that check since it's deliberately one fixed
     page by design; zero flags to ship). **Binding authoring pattern
     (owner correction 2026-08-30, after two real ships — a table split
     mid-row with no repeated header, and a heading orphaned from its
     content two pages running):** wrap every "heading + description +
     table/card" section in `<div class="sect">…</div>` with
     `.sect { break-inside: avoid }` in the doc's own `<style>` block —
     the whole section moves to the next page as one unit rather than
     splitting. Give every multi-row `<table>` a real `<thead>` (not a
     bare first `<tr>`) so a header still repeats on the rare case a
     table is too tall for the wrapping to help (a year-long grid, a
     log). After wrapping, always re-render and eyeball every page — a
     `.sect` block that doesn't fit remaining space jumps whole to the
     next page, which can strand a wasteful blank gap on the page above
     it; rebalance (tighten table row padding, not just row height,
     which does nothing once padding+line-height already exceeds it) so
     pages land full, not just non-splitting;
   - no page ends more than ~⅓ empty unless it is a deliberate poster or
     section end — eyeball a contact sheet of every new PDF;
   - any claimed number (slide count, page count, drill count) matches the
     actual file;
   - zips pass integrity check;
   - every non-bundle drop contains `5-PREVIEW.pdf` and it opens (a listing
     without a sneak peek does not ship);
   - covers are 1000×1000 with the rainbow bar present (pixel-check the
     bottom rows — the headless renderer once silently dropped it) AND
     carry the school-accent layer (owner directive 2026-08-25: colored
     doodles/confetti/sparkle, built into make_covers.js — accents live in
     the safe zones only, never over title, lede, chips, badge, intern, or
     footer; eyeball any cover whose title runs unusually long);
   - listing titles are ≤80 characters;
   - **no stale derived assets** — run `python3 kits/tooling/check_fresh.py`
     from the repo root: every pinsrc render, preview PDF, thumbnail, and
     drop zip must be newer than the product PDF it was made from (owner
     caught a live listing showing a pre-fix preview, 2026-08-24 — fixing a
     product PDF means rebuilding pinsrc renders → extras → previews →
     drops, in that order, every time);
   - additional-license price is about half the product price and never at
     or above it;
   - no external URLs outside the References PDFs' citations.
7. Mark the backlog item shipped (date), commit, push, and send the owner
   the drop zip with a two-line summary.

### Working branch

The factory works on `claude/bright-scholar-canva-kit-bjc0ev` until this
line says otherwise. A fresh session must
`git fetch origin claude/bright-scholar-canva-kit-bjc0ev && git checkout`
it before reading anything else.

## The drop format (what the owner receives)

One zip per listing: `drop-NN-<id>.zip`. Contents mirror the TPT "Upload
New Product" form top to bottom, so the owner never thinks:

| File in the drop | TPT form slot |
|---|---|
| `LISTING.txt` | every field, in the form's order, paste-ready |
| product file (original buyer-facing name) | Files → Downloadable File |
| `5-PREVIEW.pdf` | Files → Product Previews → Preview (the sneak-peek flipbook buyers browse) |
| `2-MAIN-COVER.png` | Thumbnails → Main Cover |
| `3-THUMBNAIL-1.png` (paid only) | Thumbnails → Thumbnail (Optional) |
| `4-THUMBNAIL-2.png` (paid only) | Thumbnails → Thumbnail (Optional) |

Every listing ships a sneak-peek preview (owner directive, 2026-08-24):
`node tpt/make_previews.js` builds it — paid kits get a branded cover, three
real pages behind a SNEAK PEEK band, and a what's-inside close with the
license line; free items get the cover plus up to two real pages; bundles
skip it (TPT shows the component previews). The Video Preview slot and
Education Standards are skipped by policy. **Multiple Licenses is about
half the product price, never at or above it** (owner correction
2026-08-24: $10 on a $24 kit, $6 on $12, $4 on $8 — TPT rejects a license
price above the product's). Tax Code: the standard digital download
option in TPT's dropdown.

## The economics (why the calendar looks like this)

TPT is a search marketplace: revenue scales with **catalog size × search
visibility × seasonal timing**, concentrated in a few winners plus a long
tail. The plan is built on five levers:

1. **Catalog compounding.** At ~7–8 products per Sunday batch, the
   catalog reaches ~100 listings by Thanksgiving and 300+ by Week 52 —
   roughly ⅔ free (the follower/search engine) and ⅓ paid. Every listing
   is a permanent lottery ticket in TPT search, and free downloads are
   how a new store earns followers, reviews, and rank fastest.
2. **Price ladder.** Free funnel (grow followers) → $8–12 micro packs
   (volume, impulse) → $24 kits (flagship) → $12 "PD Shorts" (30-minute
   mini-sessions, a repeatable line) → bundles $19–149 (raise average
   order; what schools buy).
3. **Seasonality.** Back-to-school (Jul–Sep) and TPT's sitewide sale weeks
   (typically early Aug + late Feb) are the traffic spikes; **school PO
   season (Apr–Jun)** is when districts spend remaining budget — the big
   bundles exist for exactly that window.
4. **The staff-purchase multiplier.** Half-price additional licenses +
   POs via TpT for Schools turn one $24 sale into a $100–300 order with
   zero owner effort. Every paid listing keeps the whole-staff paragraph.
5. **Optimize the winners.** Quarterly optimize weeks push the top sellers
   harder instead of diluting effort across weak new listings.

**Honest revenue outlook at Premium's 80% royalty** (net per sale: micro
≈ $6.50–9.50, kit ≈ $19, bundles ≈ $31–119). Twelve months in, with ~35
paid listings live:

| Scenario | Assumes | ≈ Monthly net |
|---|---|---|
| Conservative | 0.5 sales/paid listing/mo, no PO orders | $200–300 |
| Base | 1.5 sales/listing/mo + 1–2 small POs | $600–900 |
| Strong | one kit ranks for "AI PD", PO season lands | $1,500–3,000+ |

The spread is real: outcomes hinge on whether one flagship ranks. The
calendar maximizes at-bats in the highest-value niche (staff PD, weak
competition, school budgets) rather than betting on any single item.

## Year-1 batch calendar (top pending row = next Sunday)

Each row is one Sunday's **lane-1** collection: **5 frees + 1 mid +
1–2 high**. Every Sunday ALSO ships the homeschool slice (lane 2), and every
**Wednesday** ships lanes 3–4 (Young Entrepreneurs + Deaf Education)
from their backlogs, steered by the Tuesday brief. Seasonal logic:
holiday ventures Oct–Nov, new-semester homeschool planning Dec–Jan,
spring ventures Mar–May, summer homeschool prep Jun–Aug, deaf-ed
in-service season Aug–Sep and IEP season in spring.
The Theme column drives cross-sell: the week's frees funnel to the
week's paid items. Free ideas are named for the next quarter and
thematic after that — the producing session picks the 5 best-searchable
frees inside the theme on the day, using what's current. PD Shorts =
15-ish slides + script + one handout, $12, kit tooling at smaller scale.
Statuses: pending → shipped YYYY-MM-DD.

| Wk | Sunday | Theme | Mid ($8–12) | High ($12+) | Free direction (pick 5) | Status |
|---|---|---|---|---|---|---|
| 1 | Aug 24 | Back to school with AI | BTS AI Setup Pack $8 | Parent Message Makeovers $12 | vocabulary cheat sheet · 10-min habit · PII poster · emergency sub plans · delegate-or-teacher poster | shipped 2026-08-24 |
| 2 | Aug 30 | Binders, routines & parent contact (brief override, see 2026-W36 brief) | Substitute Binder with AI $8 | Parent Communication Log $6 | back to school parent questionnaire · classroom procedures checklist · sub binder starter pages · my digital footprint · internet safety with AI | shipped 2026-08-30 |
| 3 | Sep 6 | Newsletters & families | Newsletter & Family Comms pack $8 | Kit 3 retrofit $24 (`kits/kit03/`) | newsletter prompt sheet · open-house talking points · translation-request guide · family FAQ handout · positive-note generator card | pending |
| 4 | Sep 13 | Assessment, safely | Rubric pack $10 | PD Short: "Grading & Feedback with AI" $12 | rubric starter · exit-ticket prompts · feedback sentence stems · academic-integrity one-pager · quiz-leveling guide | pending |
| 5 | Sep 20 | Time-saver consolidation | Conference-Season Pack $8 (early) | BUNDLE "AI Time-Savers Toolkit" $19 = W1 mid + W2 mid + W5 mid | conference prep checklist · talking-points prompts · de-identified summary guide · scheduling email templates · "what to tell families about AI" card | pending |
| 6 | Sep 27 | Differentiation | Leveled-text prompt pack $10 | Kit 4 retrofit $24 (`kits/kit04/`) | leveling cheat sheet · scaffold/extension prompt card · IEP-safe writing poster · station-directions generator · reading-level guide | pending |
| 7 | Oct 4 | Conferences & report cards | Report Card Comment Helper $10 | PD Short: "De-Identification Deep Dive" $12 | comment-bank starter · strengths-language sheet · conference agenda template · difficult-conversation prompts · progress-update email card | pending |
| 8 | Oct 11 | The skeptic's week | "You Don't Have to Like AI" mini-pack $8 | Kit 5 retrofit $24 (run REBUILD_SPEC first) | skeptic wedge one-pager · "what AI can't do" poster · hallucination-check card · detector-myths sheet · opt-out-friendly staff note | pending |
| 9 | Oct 18 | Grading season lifeline | End-of-quarter comments pack $10 | BUNDLE "AI PD Library 1–5" $79 | comment prompts by subject · grade-drop email template · missing-work tracker · re-take policy language · family-update blurbs | pending |
| 10 | Oct 25 | Winter-ready planning | Sub folder second edition $8 | PD Short: "AI & Academic Integrity" $12 | flu-season sub checklist · review-day generators · quiet-activity prompts · weather-day plan card · make-up-work system sheet | pending |
| 11–13 | Nov | Thanksgiving lull + report cards | seasonal micro $8–10 | Kit 6 retrofit $24 · optimize pass on top sellers | gratitude/family notes · comment banks · break-packet prompts · reflection prompts · planning-reset sheets | pending |
| 14–18 | Dec–Jan | New semester reset | reset/rubric/plc micros | Kit 7–8 retrofits $24 · "AI PD Library 1–7" bundle $99 for Feb sale | fresh-start checklists · semester-goal prompts · new-tool vetting refresh · PLC starter agendas · midyear family letters | pending |
| 19–26 | Feb–Mar | Testing season + Feb sitewide sale | testing-safe review packs $10 | "Complete AI Staff PD — All 8" bundle $119 · coach/admin packs | review generators · question banks · brain-break prompts · testing-week family notes · data-safe analysis guides | pending |
| 27–35 | Apr–Jun | **PO season** (district budget window) | end-of-year survival micros | "Whole-School AI Launch" bundle $149 · Admin Toolkit $15 · PD Shorts | EOY comments · awards text · summer AI guides · new-teacher starters · PLC plans | pending |
| 36–44 | Jun–Jul | Summer PD + refresh season | summer self-paced micros $8–12 | Kit 1–2 second editions (free updates) · "100 Teacher AI Prompts" $12 | summer-learning prompts · curriculum-planning guides · AI-ready-by-August checklists · new-year posters | pending |
| 45–52 | Jul–Aug | Back-to-school 2027 | BTS Setup 2.0 $8 | "First 30 Days AI-Ready" bundle $24 · BTS PD Short $12 | refreshed BTS frees (this week's Week-1 set, 2.0) · icebreakers · new-year rules posters | pending |

Standing rules for every batch: paid items must pass the **Swipe Test**
(tangible classroom-usable documentation — training info and
infographics are free-tier funnel material); every free names one paid
item in its store-internal callout; seasonal windows beat the row order.

**Pricing doctrine (owner directive, 2026-08-24): when in doubt, price
lower.** Overpricing relative to content is the one pricing mistake that
kills a listing — it draws refunds, bad reviews, and dead rank. Before
setting any price: check the intel brief's niche pricing scan, compare
page count and editability against what competitors charge, and ask "would
a teacher who just downloaded this feel they got more than they paid
for?" If the honest answer is "about even," drop a tier ($12 → $10 → $8).
Under-priced listings earn reviews and followers that raise the whole
store; overpriced ones cost more than they earn. Kits stay $24 only
because they are 9-file, script-included sessions — if a kit ever feels
thin against that bar, fix the kit, not the price.

## Launch state

- **2026-08-23**: initial launch live (6 frees + Kit 1 + Kit 2 published
  by the owner; bundle pending in TPT's bundle tool).
- **2026-08-24 (Week 1 batch)**: shipped — 5 new frees (AI Vocabulary ·
  10-Minute AI Habit · Don't Type That poster · Emergency Sub Plans ·
  AI or Teacher? poster), Back-to-School AI Setup Pack $8, Parent
  Message Makeovers $12. Drops 09–15 in `UPLOAD/drops/`.
- **2026-08-24 (line launch)**: **Homeschool AI + Young Entrepreneurs**
  line shipped (owner directive; niche analysis in
  `tpt/intel/homeschool-entrepreneur-niche.md`) — 5 frees (What Is AI?
  Unplugged 4–8 · Family AI Rules poster · Homeschool AI Quick-Start ·
  My First Business Idea 6–10 · Is It True? 9–12) + 3 paid (Homeschool
  AI Planning Pack $8 · My First Business workbook $8, ages 6–10 ·
  Launch It $10, ages 9–12). Drops 16–23. New custom categories:
  "Homeschool AI", "Young Entrepreneurs". **The line's design law:
  the grown-up holds the keyboard** — chatbots are 13+, AI coaches the
  parent, kids think and decide, child identity never enters a prompt,
  anything online is adult-run. Weekly batches may now draw from this
  line (seasonal venture packs, co-op editions, age-4–5 unplugged pack)
  when the intel brief supports it.
- **2026-08-30 (Week 2 Sunday drop)**: shipped — every product traces to
  the 2026-W36 brief's validation table (TPT Keywords primary meter).
  **Lane 1**: 5 frees (Back to School Parent Questionnaire · Classroom
  Procedures Checklist · Sub Binder Starter Pages · My Digital Footprint
  · Internet Safety with AI) + Substitute Binder with AI $8 (mid) +
  Parent Communication Log $6 (high — the brief's validated price,
  raised from the calendar's placeholder). **Lane 2 (Homeschool AI)**:
  2 frees (Homeschool Weekly Schedule Cards · Homeschool AI Planning
  Prompts) + Full-Year Homeschool Planner with AI $8. Retagged per the
  brief: Parent Message Makeovers onto the parent-communication-log
  family; Don't Type That / Is It True? / Tool Safety / Family AI Rules
  into the digital-citizenship family. Drops 24–33 in `UPLOAD/drops/`.
  The brief overrode the calendar's "Routines that stick" theme (see
  `tpt/intel/2026-W36-brief.md`) — the Week-2 PD Short slides to Week 3.
- **2026-08-30 (post-ship corrections, same day)**: the owner caught a
  table splitting mid-row with no repeated header (Parent Communication
  Log), a parent-facing form sharing a page with teacher-only notes
  (Parent Questionnaire), and — on a deeper pass after the pattern
  repeated — a heading orphaned from its own content across a page
  break (Full-Year Homeschool Planner) that also affected an
  **already-live Week-1 listing, Back-to-School AI Setup Pack**
  (drop-09; its checklist heading was stranded with an empty page below
  it — this is a re-upload of the Downloadable File on an existing
  listing, not a new product). Root-caused, fixed, and turned into the
  standing `.sect` pagination rule and repeating-`<thead>` rule now in
  quality gate 6 and `brand.css` (see `check_breaks.py`'s ORPHAN SECTION
  check). Also rebuilt the Pinterest pin template per owner correction:
  at most 2 real-page shots per pin, shown large, not 3 small ones (see
  step 5b) — regenerated all 33 existing pins, not just the week's new
  ones.
- **2026-09-02 (Week 2 Wednesday drop — first Deaf Education wave)**:
  shipped — every product traces to the 2026-W36 Wednesday brief's
  validation table (TPT Keywords primary meter). **Lane 3 (Young
  Entrepreneurs)**: Entrepreneurship Unit with AI $8 (a new 5-day
  classroom/co-op market-day unit, distinct from the existing solo
  workbooks — brainstorm, Rule-of-Three pricing, sign & pitch, market
  day logistics, profit math, one grown-up AI Helper Prompt per day)
  + 2 frees (Shark Tank Pitch Day · Business Idea Starter, ages 9–12).
  **Lane 4 (Deaf Education, first wave — new custom category
  "Deaf Education")**: DHH Self-Advocacy Pack $6 (license $3, per the
  brief's low-entry-price call) + 3 frees (Self-Advocacy Scripts "I
  Need..." Cards · Classroom Access Checklist · Executive Functioning
  Checklists). Every lane-4 product and listing carries the
  owner-approved provenance line verbatim ("Built and audited by two
  certified teachers — and the parents of a deaf child.") and the
  pedagogy-not-audiology legal note; diversity language (ASL/spoken
  language/bimodal/devices-or-none) runs through every product; no
  age, school, device, or communication mode of the owner's own child
  appears anywhere. Easel setup added for the two kid-facing paid
  items (the Entrepreneurship Unit's "My Role & My Price" worksheet
  page and the full DHH Self-Advocacy Pack). New Pinterest board
  "Deaf Education" for lane-4 pins. Drops 34–40 in `UPLOAD/drops/`;
  `PINS-2026-09-02.zip` ships only this week's 7 new pins (the
  `make_pins.js` full-regen footgun reverted 22 unrelated pins whose
  byte-diff was render-noise, not content). Two numeric-claim
  mismatches caught on the pre-ship contact-sheet eyeball and fixed
  before drops were built: the DHH Self-Advocacy Pack's lede claimed
  "five pages" (product is 3 physical pages, 4 worksheets — reworded
  to "four reusable worksheets"), and the Executive Functioning
  Checklists' lede claimed "three pages" (product is 2 pages, 3
  checklists — reworded to "three reusable checklists"); the Business
  Idea Starter free was also under-filled on both pages at first pass
  (~40–45% empty) and gained a fourth activity ("Rate your idea") to
  meet the ⅓-empty quality gate. All check_breaks.py flags: 0;
  check_fresh.py stale/missing: 0.
