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
5. **TPT-native monetization only**: $24 kits, $10 additional licenses,
   $39 bundle, POs through TpT for Schools. All of it runs inside TPT with
   zero owner effort.
6. **W-9 is the owner's SSN** (individual), never the old LLC EIN.

## The brand (unchanged)

`tpt/BRAND_THEME.md` is the visual law: Bright Scholar palette
(ink/school-blue/teal/sunny/tomato/cream), Fredoka + Nunito, the intern
mascot, the three-layer loudness rule, rainbow bar on every cover.
Canva masters live in the "Bright Scholar — TPT Brand" folder
(see `tpt/canva/README.md` for design ids).

## The weekly cycle

Every **Monday** a production run creates ONE item from the **Year-1
calendar** below, finished to the quality gates, packaged as a **drop
zip** the owner can upload in under ten minutes. The calendar encodes the
free/paid mix, seasonality, bundle milestones, and optimize weeks — follow
it in order, with one override: a **seasonal item may jump the queue** if
its buying window would otherwise close (back-to-school, conferences,
report cards, testing, PO season).

Week types:
- **New product** — the normal case; full production steps below.
- **Bundle week** — no new content. Produce the bundle's listing copy,
  cover, and a LISTING.txt-only drop; the owner assembles it in TPT's
  bundle tool from the named existing listings.
- **Optimize week** (quarterly, placed in low-buying weeks) — no new
  content. Refresh the 2–3 best-selling listings: sharpen titles/tags
  against TPT search, re-render covers if the brand evolved, check prices,
  and report what's selling vs. dead. Optimizing winners outearns a weak
  52nd product.
- **Refresh week** — second edition of an existing product (update stats,
  tool names, screenshots). Buyers get it as a free update; TPT surfaces
  updated products and it earns reviews and follower goodwill.

### Production steps

1. Pick this week's item from the **Year-1 production calendar** below
   (top pending row; seasonal items may jump per the override above).
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
   title with pipes, description in plain paragraphs, provenance line at
   the end, no external references, free items may point to "our full PD
   sessions are in the store" (store-internal only).
5. `node tpt/make_drops.js` → builds/refreshes drop zips in `UPLOAD/drops/`.
6. **Quality gates (all must pass):**
   - every PDF opens (pypdf) and page counts are recorded;
   - any claimed number (slide count, page count, drill count) matches the
     actual file;
   - zips pass integrity check;
   - every non-bundle drop contains `5-PREVIEW.pdf` and it opens (a listing
     without a sneak peek does not ship);
   - covers are 1000×1000 with the rainbow bar present (pixel-check the
     bottom rows — the headless renderer once silently dropped it);
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
Education Standards are skipped by policy. Multiple Licenses is always $10
on paid items. Tax Code: the standard digital
download option in TPT's dropdown.

## The economics (why the calendar looks like this)

TPT is a search marketplace: revenue scales with **catalog size × search
visibility × seasonal timing**, concentrated in a few winners plus a long
tail. The plan is built on five levers:

1. **Catalog compounding.** ~50 listings by Week 52 (8 at launch + ~44
   produced). Every listing is a permanent lottery ticket in TPT search.
2. **Price ladder.** Free funnel (grow followers) → $8–12 micro packs
   (volume, impulse) → $24 kits (flagship) → $12 "PD Shorts" (30-minute
   mini-sessions, a repeatable line) → bundles $19–149 (raise average
   order; what schools buy).
3. **Seasonality.** Back-to-school (Jul–Sep) and TPT's sitewide sale weeks
   (typically early Aug + late Feb) are the traffic spikes; **school PO
   season (Apr–Jun)** is when districts spend remaining budget — the big
   bundles exist for exactly that window.
4. **The staff-purchase multiplier.** $10 additional licenses + POs via
   TpT for Schools turn one $24 sale into a $100–300 order with zero
   owner effort. Every paid listing keeps the whole-staff paragraph.
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

## Year-1 production calendar (top = next Monday)

Statuses: pending → shipped YYYY-MM-DD. Seasonal items may jump the queue
if their window is closing. PD Shorts = 15-ish slides + script + one
handout, $12, same kit tooling at smaller scale.

| Wk | Monday | Item | Tier | Status |
|---|---|---|---|---|
| 1 | Aug 24 | Back-to-School AI Setup Pack — first-week checklist, parent letter, 10 BTS prompts | Paid $8 | pending |
| 2 | Aug 31 | Parent Message Makeovers — editable template pack (Kit 6 derivative) | Paid $8 | pending |
| 3 | Sep 07 | The AI Mistake Gallery — failure-first funnel piece | Free | pending |
| 4 | Sep 14 | Kit 3 retrofit (`kits/kit03/`) | Paid $24 | pending |
| 5 | Sep 21 | Sub-Plan Builder pack | Paid $10 | pending |
| 6 | Sep 28 | BUNDLE: "AI Time-Savers Toolkit" = W1 + W2 + W5 | Bundle $19 | pending |
| 7 | Oct 05 | Conference-Season Pack — AI-prepped talking points + de-identified summaries | Paid $8 | pending |
| 8 | Oct 12 | Kit 4 retrofit (`kits/kit04/`) | Paid $24 | pending |
| 9 | Oct 19 | "You Don't Have to Like AI" — skeptic wedge | Free | pending |
| 10 | Oct 26 | Newsletter & Family Communications pack | Paid $8 | pending |
| 11 | Nov 02 | Kit 5 retrofit (`kits/kit05/` — run its REBUILD_SPEC pass first) | Paid $24 | pending |
| 12 | Nov 09 | BUNDLE: "AI PD Library, Sessions 1–5" | Bundle $79 | pending |
| 13 | Nov 16 | Report Card Comment Helper — de-identified comment banks + prompts | Paid $10 | pending |
| 14 | Nov 23 | OPTIMIZE WEEK 1 (Thanksgiving lull) — refresh top 3 listings | Optimize | pending |
| 15 | Nov 30 | PD Short: "Grading & Feedback with AI" | Paid $12 | pending |
| 16 | Dec 07 | Winter family letter + break-time AI guide | Free | pending |
| 17 | Dec 14 | Kit 6 retrofit (`kits/kit06/` — run its REBUILD_SPEC pass first) | Paid $24 | pending |
| 18 | Dec 21 | PD Short: "AI & Academic Integrity" (January demand, listed early) | Paid $12 | pending |
| 19 | Dec 28 | OPTIMIZE WEEK 2 (dead week) — annual audit + Feb-sale prep list | Optimize | pending |
| 20 | Jan 04 | New-Semester AI Reset — fresh-start checklist | Free | pending |
| 21 | Jan 11 | Kit 7 retrofit (`kits/kit07/`) | Paid $24 | pending |
| 22 | Jan 18 | Rubric pack — editable AI-assisted rubric templates | Paid $10 | pending |
| 23 | Jan 25 | PD Short: "De-Identification Deep Dive" (paid sequel to the free drills) | Paid $12 | pending |
| 24 | Feb 01 | BUNDLE refresh for TPT Feb sale: "AI PD Library, Sessions 1–7" | Bundle $99 | pending |
| 25 | Feb 08 | Differentiation with AI — leveled-text prompt template pack | Paid $10 | pending |
| 26 | Feb 15 | Kit 8 retrofit (`kits/kit08/`) — series complete | Paid $24 | pending |
| 27 | Feb 22 | BUNDLE: "Complete AI Staff PD — All 8 Sessions" (the PO flagship) | Bundle $119 | pending |
| 28 | Mar 01 | Multilingual family communications pack | Paid $10 | pending |
| 29 | Mar 08 | Testing-Season Pack — AI-safe review generators + question banks | Paid $10 | pending |
| 30 | Mar 15 | AI for Instructional Coaches — observation & feedback pack | Paid $10 | pending |
| 31 | Mar 22 | Post-testing brain-break prompt pack | Free | pending |
| 32 | Mar 29 | OPTIMIZE WEEK 3 — PO-season storefront prep | Optimize | pending |
| 33 | Apr 05 | Admin Toolkit — AI policy starter + staff-meeting one-pagers | Paid $15 | pending |
| 34 | Apr 12 | PD Short: "Running an AI PLC" | Paid $12 | pending |
| 35 | Apr 19 | IEP-Adjacent Safe Writing pack (de-identification line extension) | Paid $10 | pending |
| 36 | Apr 26 | BUNDLE: "Whole-School AI Launch" = 8 sessions + Admin Toolkit + drills | Bundle $149 | pending |
| 37 | May 03 | End-of-year family letter + summer AI guide | Free | pending |
| 38 | May 10 | End-of-Year Survival pack — comments, awards, newsletters | Paid $10 | pending |
| 39 | May 17 | PD Short: "AI Tool Vetting Workshop" (builds on the free checklist) | Paid $12 | pending |
| 40 | May 24 | "AI-Ready by August" — self-paced 4-week summer PD plan | Paid $12 | pending |
| 41 | May 31 | OPTIMIZE WEEK 4 — year-in-review: reprice, kill/merge dead listings | Optimize | pending |
| 42 | Jun 07 | New-Teacher AI Starter pack (new hires + June grads) | Paid $8 | pending |
| 43 | Jun 14 | Kit 1 second edition — refresh stats/tools, free update to buyers | Refresh | pending |
| 44 | Jun 21 | Kit 2 second edition | Refresh | pending |
| 45 | Jun 28 | "100 Teacher AI Prompts" compendium (aggregates the year's prompts) | Paid $12 | pending |
| 46 | Jul 05 | BTS-2027 poster freebie: "3 AI Rules for the New Year" | Free | pending |
| 47 | Jul 12 | Back-to-School Setup Pack 2.0 (W1 updated for 2027) | Paid $8 | pending |
| 48 | Jul 19 | Classroom AI Stations pack — student-facing, privacy-safe | Paid $10 | pending |
| 49 | Jul 26 | BUNDLE: "First 30 Days AI-Ready" = BTS pack + parent comms + posters | Bundle $24 | pending |
| 50 | Aug 02 | PD Short: "Your First Staff AI Session" quickstart | Paid $12 | pending |
| 51 | Aug 09 | BTS staff-meeting icebreaker freebie | Free | pending |
| 52 | Aug 16 | Year-2 planning — draft next calendar from 12 months of sales data | Planning | pending |

Mix check: 8 new free (14 total with launch), ~26 paid products, 6
bundles, 4 optimize weeks, 2 refreshes, 1 planning week. Paid
micro-products must pass the **Swipe Test**: tangible classroom-usable
documentation (templates, planning tools, lesson materials) — training
info and infographics are free-tier funnel material.

## Launch state

Initial launch (6 free + 2 kits + bundle) is **postponed, drops ready** in
`UPLOAD/drops/`. Ship those first, in numbered order, before the weekly
factory adds anything new.
