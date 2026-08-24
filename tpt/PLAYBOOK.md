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

Every **Monday** a production run creates ONE new product, finished to the
quality gates, packaged as a **drop zip** the owner can upload in under ten
minutes. Cadence: alternate **free funnel piece** and **paid product** —
free pieces grow followers; paid pieces convert them. Never ship two paid
weeks in a row while the store is young.

### Production steps

1. Pick the top unshipped item from the **Backlog** below (respect the
   free/paid alternation against what shipped last).
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
| `2-MAIN-COVER.png` | Thumbnails → Main Cover |
| `3-THUMBNAIL-1.png` (paid only) | Thumbnails → Thumbnail (Optional) |
| `4-THUMBNAIL-2.png` (paid only) | Thumbnails → Thumbnail (Optional) |

Product Previews and Education Standards are skipped by policy. Multiple
Licenses is always $10 on paid items. Tax Code: the standard digital
download option in TPT's dropdown.

## Backlog (top = next Monday)

| # | Item | Tier | Source | Status |
|---|---|---|---|---|
| 1 | Parent Message Makeovers — template pack (Kit 6 derivative, swipe-test: tangible classroom documentation) | Paid $8–12 | new src | pending |
| 2 | "The AI Mistake Gallery" — failure-first free piece | Free | new src | pending |
| 3 | Kit 3 retrofit → TPT kit + listing | Paid $24 | `kits/kit03/` | pending |
| 4 | Sub-plan builder pack | Paid $8–12 | new src | pending |
| 5 | "You Don't Have to Like AI" — skeptic wedge | Free | new src | pending |
| 6 | Kit 4 retrofit → TPT kit + listing | Paid $24 | `kits/kit04/` | pending |
| 7 | Rubric pack (AI-assisted rubric templates) | Paid $8–12 | new src | pending |
| 8 | Kit 5 retrofit (needs `REBUILD_SPEC.md` pass) | Paid $24 | `kits/kit05/` | pending |
| 9–12 | Kits 6–8 retrofits, then seasonal freebies | mixed | `kits/kit0N/` | pending |

Paid micro-products must pass the **Swipe Test**: tangible classroom-usable
documentation (templates, planning tools, lesson materials) — training
info and infographics are free-tier funnel material.

## Launch state

Initial launch (6 free + 2 kits + bundle) is **postponed, drops ready** in
`UPLOAD/drops/`. Ship those first, in numbered order, before the weekly
factory adds anything new.
