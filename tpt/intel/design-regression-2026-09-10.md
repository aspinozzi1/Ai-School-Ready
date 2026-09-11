# Design regression across the 09-06 and 09-09 drops (found 2026-09-10)

Found while packaging the Wednesday drop for the owner. **All seven
products from both drops are built on the old corporate `brand.css`
template, not the approved Bright Scholar design.**

| Drop | Product | Pages | Design |
|---|---|---|---|
| Sun 09-06 | IEP at a Glance | 5 | old `brand.css` |
| Sun 09-06 | IEP Goal Tracking | — | old `brand.css` |
| Sun 09-06 | Free Behavior Tracker | — | old `brand.css` |
| Sun 09-06 | Homeschool Attendance Sheet | — | old `brand.css` |
| Sun 09-06 | Progress Monitoring Sheets | — | old `brand.css` |
| Wed 09-09 | Deaf Awareness Month Pack | 4 | old `brand.css` |
| Wed 09-09 | ABC Behavior Data Sheets | 5 | old `brand.css` |

What the approved design is (`kits/bestseller-binder/src/cvc-binder-sample.html`,
as shipped in the CVC binder): cream ground, rainbow top bar,
Fredoka / Nunito / Luckiest Guy, thick rounded outlines, colour-coded
sections. What shipped instead: dark navy header band, white ground,
system-ish sans, thin hairline rules. Competent, corporate, and not what
the owner asked for — his direction on 2026-09-01 was "school like
imagery, playfulness, colors."

## How it happened — two separate failures

1. **The Sunday factory ignored an explicit instruction.**
   `2026-W37-brief.md` line 78 says plainly: "Design matches the approved
   reference (`kits/bestseller-binder/src/cvc-binder-sample.html`) —
   Fredoka/Nunito/Luckiest Guy, rainbow bar, thick rounded outlines,
   cream ground." The build did not follow it.

2. **The Wednesday brief never carried the rule.** I wrote
   `2026-W37-wed-brief.md` and omitted the standing design section that
   Sunday's brief had. So Wednesday's factory was never told. That one
   is mine.

## The second problem: roughly a third of every page is empty

The flowing `table.doc` layout leaves large dead bands at the foot of
most pages — the same fault fixed on the CVC binder cover and dividers
in early September. On the ABC recording form it is worse than cosmetic:
the form gives about **two and a half cramped rows** to write in, with
a third of the sheet blank underneath. An ABC form is written on by
hand under pressure; row height *is* the product.

Knock-on effect: **ABC ships as 5 pages at $6.** TPT buyers see the page
count in the listing and compare it against packs advertising 15–20
pages at $5. The content is all present and correct — every component
the brief called for is there — but it is compressed into a shape that
reads thin on the shelf and is harder to use on a clipboard.

## What is NOT wrong

The content itself is good and should be preserved wholesale:
- The Deaf Awareness pack carries all eight briefed sections, sources
  Gallaudet and the National Association of the Deaf rather than a web
  image search, keeps the speech banana strictly to teaching
  implications, and carries the approved provenance line.
- IEP at a Glance carries the confidentiality page, the "read this
  before you fill in a single line" warning, and the AI page built never
  to touch a completed sheet.
- Gates pass: breaks 0 across 47 PDFs, US English 0.

This is a re-skin and a re-flow, not a rewrite.

## Recommended fix

1. Port `brand.css` free-resource and paid templates onto the Bright
   Scholar system, so every future build inherits it and no factory has
   to be told.
2. Re-flow forms to use the full page — real row heights on anything
   written on by hand.
3. Rebuild all seven products, then previews, pins and drops.
4. Add the standing design rule to **every** brief template, not just
   Sunday's, and add a gate that fails a build whose PDF does not carry
   the Bright Scholar fonts.

## Also found: check_fresh gives false alarms after any git pull

`check_fresh.py` compares filesystem mtimes, and **git does not preserve
mtimes** — a clone or pull stamps every file with checkout time in
write order. After this morning's pull it reported **all 48 drops
stale**, including drop-48, whose mtime was 12 *milliseconds* behind
`listings.json`. Git commit times show the truth: listings.json committed
07:35:55, drop-48 at 07:58:41 — the drop is 23 minutes newer and
correctly built.

This is the opposite failure mode from the old `check_breaks` bug: that
one passed silently when it checked nothing, this one fails everything.
A gate that flags all 48 items is a gate people learn to ignore, which
is arguably worse than one that stays quiet.

Fix: compare **git commit times**, falling back to mtime only for files
not yet committed.

---

# ROOT CAUSE — found 2026-09-11, and it is not what this file said yesterday

Yesterday this file blamed two things: the Sunday factory ignoring an
explicit instruction, and my Wednesday brief omitting the rule. Both are
true. **Neither is the cause.**

**The Bright Scholar design system was never available to any product
except the CVC binder.** Its CSS lived inlined in a `css()` function
inside `build-binder.js`, usable only by that one build. Its fonts lived
in an ephemeral scratchpad, or in a `node_modules` that may or may not
exist in a given container. `brand.css` was the only shared stylesheet
committed to the repo — so every other product used it, necessarily.

**The factories could not have built Bright Scholar even when told to.**
A brief cannot conjure a stylesheet that does not exist.

## The audit that settled it

Reading the embedded fonts out of every shipping PDF. **All 47 failed:**

| PDF | Fonts actually embedded |
|---|---|
| Wednesday 09-09 drop | `LiberationSans` only — no brand face at all |
| Sunday 09-06 drop | `Inter` — that container happened to have node_modules |
| **CVC binder (the approved reference)** | `LuckiestGuy`, but **neither Fredoka nor Nunito** |

Three containers, three different results, none of them the intended
design. Even the product the owner approved as the visual standard has
been rendering its body text in Liberation Sans since the day it shipped.

Chromium substitutes a missing face silently. The build succeeds, the
PDF opens, every gate passes, and the product simply looks wrong. That
is the worst failure shape available: no error to notice.

## What was done about it

1. **`kits/tooling/fonts/`** — Fredoka, Nunito and Luckiest Guy woff2
   files committed to the repo, with `brand-fonts.css` referencing them
   by relative path. No npm, no scratchpad, no network at build time.
2. **`kits/tooling/check_fonts.py`** — fails any PDF embedding a
   substitute face, or embedding no brand face at all. This is the part
   that matters: it converts a silent wrong-looking build into a loud
   failing one.
3. **`kits/tooling/brand-bright-scholar.css`** — the shared stylesheet
   that never existed. Deliberately keeps `brand.css`'s class names
   (`.band`, `.doc-tag`, `.kicker`, `.lede`, `.sect`, `.card`, `.note`)
   so a product adopts the design by changing one `<link>` line, and
   additionally maps the local table/field classes the free-resource
   products define in their own inline styles.

## Proof: ABC Behavior Data Sheets, converted end to end

- Brand faces embed, zero fallbacks (`check_fonts.py`: 0 failures).
- **Header bug found and fixed in the stylesheet:** `.doc-tag` was a flex
  child of a 13pt-tall `.band`, so the document title printed *on top of*
  the rainbow bar and was unreadable. The bar is now drawn by `::before`
  and the tag flows beneath it.
- **The recording form went from two and a half cramped rows to nine
  usable ones** at 46pt each, which also consumed most of the page's dead
  space. On a form filled in by hand under pressure, row height *is* the
  product.
- All four gates pass: breaks 0 · US English 0 · fresh 0 · fonts 0.

## Still to do — six products

IEP at a Glance · IEP Goal Tracking · Free Behavior Tracker · Homeschool
Attendance Sheet · Progress Monitoring Sheets · Deaf Awareness Month Pack.

Each needs its `<link>` swapped and then a visual pass, because each file
defines its own local class vocabulary in an inline `<style>` written
against the old tokens. That is per-file work, not a batch `sed`. The
stylesheet now covers the classes ABC used; the others will surface a few
more, which should be added to the shared sheet rather than patched
locally.

**The catalog's other 40 products also fail the font gate** and will need
the same treatment eventually. Newest and best-selling first, per the
existing retrofit rule.

## Two further fragilities found in passing

- **The build depends on ephemeral npm installs.** Installing the fonts
  removed `playwright` from `node_modules`, which broke `make_pins.js`
  mid-run. Nothing in the repo pins these; whether a build works depends
  on what a container happens to have. Worth a `package.json` with real
  dependencies.
- **`check_fresh` had a dependency-modeling error**, found while clearing
  the last flag: it treated *every* thumbnail as deriving from the product
  PDF, but the `-whats-inside` card is drawn from the listing's own title
  and bullets. It flagged a correct, byte-identical file. Now checked
  against `listings.json` instead.
