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
