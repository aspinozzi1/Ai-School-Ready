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

## The weekly cycle (owner directive, 2026-08-24; expanded same day)

Every **Monday** a production run builds a **collection in two lanes**:

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

**Lane 2 · Homeschool AI + Young Entrepreneurs (owner expansion,
2026-08-24 — line launched same day, see Launch state):**
- **2 free resources** targeting homeschool/family/kid-entrepreneur
  searches, and
- **1 paid product** ($8–12), alternating weekly between the Homeschool
  AI and Young Entrepreneurs categories (or serving both).
- Lane-2 design law, always: **the grown-up holds the keyboard** —
  chatbots are 13+, AI coaches the parent, kids think and decide, child
  identity never enters a prompt, anything online is adult-run.
- Lane-2 backlog to draw from (intel brief refines each week):
  ages-4–5 dedicated unplugged pack · co-op group editions · seasonal
  venture packs (holiday craft fair, spring plant sale) · homeschool
  record-keeping/portfolio pack · AI read-aloud & library companion ·
  family AI literacy night kit · Launch It level 3 (12s nearing 13:
  "almost-your-own-account" readiness) · homeschool co-op teaching packs.

That's ~10–11 upload-ready products per Monday, every one built for
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

### Production steps (run once per product, 7–8× per Monday)

0. **Read the newest brief in `tpt/intel/` first** (see its README). It
   is produced automatically every Sunday and may override the calendar
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
6. **Quality gates (all must pass):**
   - every PDF opens (pypdf) and page counts are recorded;
   - **no section, paragraph, card, or write-in box splits across a page
     break** — run `python3 kits/tooling/check_breaks.py <pdfs>` (owner
     directive 2026-08-24; the checker pair-matches clipped boxes and
     flags orphan headings / split paragraphs — zero flags to ship);
   - no page ends more than ~⅓ empty unless it is a deliberate poster or
     section end — eyeball a contact sheet of every new PDF;
   - any claimed number (slide count, page count, drill count) matches the
     actual file;
   - zips pass integrity check;
   - every non-bundle drop contains `5-PREVIEW.pdf` and it opens (a listing
     without a sneak peek does not ship);
   - covers are 1000×1000 with the rainbow bar present (pixel-check the
     bottom rows — the headless renderer once silently dropped it);
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

1. **Catalog compounding.** At ~7–8 products per Monday batch, the
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

## Year-1 batch calendar (top pending row = next Monday)

Each row is one Monday's **lane-1** collection: **5 frees + 1 mid +
1–2 high**. Every week ALSO ships the lane-2 slice (2 frees + 1 paid
from Homeschool AI / Young Entrepreneurs, alternating categories —
pick from the lane-2 backlog above, seasonally adjusted by the intel
brief: holiday ventures in Oct–Nov, new-semester homeschool planning in
Dec–Jan, spring ventures Mar–May, summer homeschool prep Jun–Aug).
The Theme column drives cross-sell: the week's frees funnel to the
week's paid items. Free ideas are named for the next quarter and
thematic after that — the producing session picks the 5 best-searchable
frees inside the theme on the day, using what's current. PD Shorts =
15-ish slides + script + one handout, $12, kit tooling at smaller scale.
Statuses: pending → shipped YYYY-MM-DD.

| Wk | Monday | Theme | Mid ($8–12) | High ($12+) | Free direction (pick 5) | Status |
|---|---|---|---|---|---|---|
| 1 | Aug 24 | Back to school with AI | BTS AI Setup Pack $8 | Parent Message Makeovers $12 | vocabulary cheat sheet · 10-min habit · PII poster · emergency sub plans · delegate-or-teacher poster | shipped 2026-08-24 |
| 2 | Aug 31 | Routines that stick | Sub-Plan Builder pack $8 | PD Short: "Your First Staff AI Session" $12 | seating/routine prompts · first-quiz generator guide · gradebook-safe comment starters · staff-meeting one-pager · AI myths poster | pending |
| 3 | Sep 07 | Newsletters & families | Newsletter & Family Comms pack $8 | Kit 3 retrofit $24 (`kits/kit03/`) | newsletter prompt sheet · open-house talking points · translation-request guide · family FAQ handout · positive-note generator card | pending |
| 4 | Sep 14 | Assessment, safely | Rubric pack $10 | PD Short: "Grading & Feedback with AI" $12 | rubric starter · exit-ticket prompts · feedback sentence stems · academic-integrity one-pager · quiz-leveling guide | pending |
| 5 | Sep 21 | Time-saver consolidation | Conference-Season Pack $8 (early) | BUNDLE "AI Time-Savers Toolkit" $19 = W1 mid + W2 mid + W5 mid | conference prep checklist · talking-points prompts · de-identified summary guide · scheduling email templates · "what to tell families about AI" card | pending |
| 6 | Sep 28 | Differentiation | Leveled-text prompt pack $10 | Kit 4 retrofit $24 (`kits/kit04/`) | leveling cheat sheet · scaffold/extension prompt card · IEP-safe writing poster · station-directions generator · reading-level guide | pending |
| 7 | Oct 05 | Conferences & report cards | Report Card Comment Helper $10 | PD Short: "De-Identification Deep Dive" $12 | comment-bank starter · strengths-language sheet · conference agenda template · difficult-conversation prompts · progress-update email card | pending |
| 8 | Oct 12 | The skeptic's week | "You Don't Have to Like AI" mini-pack $8 | Kit 5 retrofit $24 (run REBUILD_SPEC first) | skeptic wedge one-pager · "what AI can't do" poster · hallucination-check card · detector-myths sheet · opt-out-friendly staff note | pending |
| 9 | Oct 19 | Grading season lifeline | End-of-quarter comments pack $10 | BUNDLE "AI PD Library 1–5" $79 | comment prompts by subject · grade-drop email template · missing-work tracker · re-take policy language · family-update blurbs | pending |
| 10 | Oct 26 | Winter-ready planning | Sub folder second edition $8 | PD Short: "AI & Academic Integrity" $12 | flu-season sub checklist · review-day generators · quiet-activity prompts · weather-day plan card · make-up-work system sheet | pending |
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
