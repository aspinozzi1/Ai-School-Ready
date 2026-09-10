# Friday brief — drop of 2026-09-11

Compiled Thursday 2026-09-10.

**Filename note:** by the standing rule (a Friday shares the ISO week of
the Wednesday *before* it), Friday 09-11 sits in W37 — but
`2026-W37-fri-brief.md` is already taken by the 09-04 drop, which was
misfiled: 09-04's Wednesday was 09-02, so that file should have been
`2026-W36-fri-brief.md`. Rather than overwrite a shipped brief, this one
takes W38. Worth correcting the older filename in a quiet moment; not
worth breaking links today.

## There is no validated build for tomorrow

`lookups-2026-W37-friday.md` went out Wednesday and **has not come
back.** All fifteen phrases are unrun, including every Priority 1 row —
adapted books, errorless learning, heart words, decodable passages,
first then board.

The list carried an explicit decision rule, written precisely so this
case would not require improvisation:

> heart words → else adapted books → else decodable passages → **if none
> are thin, pause the compete lane** and give Friday the top open
> win-lane row instead.

The fallback is also unavailable: `take home folder` (829) and
`happy mail` (816) were measured **2026-08-26**, and the drift rule added
09-05 makes anything older than about three weeks stale before it decides
a build. Both need re-pulling first.

So: **no phrase can validate a Friday product today**, and the binding
rule in `README.md` is that a product with no validated row does not ship.

## What the slot should do instead: fix the seven products we already have

`design-regression-2026-09-10.md` records that all seven products from
the 09-06 and 09-09 drops were built on the old corporate `brand.css`
rather than the approved Bright Scholar design, and that the flowing
layout leaves roughly a third of every page empty.

**Shipping an eighth product before fixing seven would be the wrong use
of a factory slot**, and shipping an eighth *off-brand* product would
make the problem bigger. The rebuild needs no new keyword data, spends
nothing, and touches nothing outside the repo — no listing changes until
the owner uploads.

### The build, in order

1. **Port the templates.** Move the `brand.css` free-resource and paid
   layouts onto the Bright Scholar system — cream ground, rainbow top
   bar, Fredoka / Nunito / Luckiest Guy, thick rounded outlines,
   colour-coded sections — matching
   `kits/bestseller-binder/src/cvc-binder-sample.html`. Do it in the
   shared template so every future build inherits it and no brief has to
   remember to say so.
2. **Re-flow to fill the page.** No page ends with a third of itself
   blank. On anything written on by hand, row height *is* the product:
   the ABC recording form must give a teacher real space per incident,
   not two and a half cramped rows.
3. **Rebuild all seven**, then pinsrc renders, extras, previews, pins
   and drop zips.
4. **Keep every word of the content.** This is a re-skin and a re-flow.
   The confidentiality page, the "read this before you fill in a single
   line" warning, the AI rule that never touches a completed sheet, the
   Gallaudet and NAD sourcing, the provenance line — all of it stays
   exactly as written.
5. **Re-price ABC if the page count moves.** It is $6 at 5 pages today.
   If the re-flow lands it near 10–12, $6 becomes clearly fair rather
   than arguable. Do not pad to reach a number.

### Gates that must pass before it is called done

breaks 0 · US English 0 · fresh 0 · and a **new design gate**: fail any
build whose product PDF does not embed the Bright Scholar fonts. That
gate is the point — it is what stops this recurring silently, which is
how it happened twice.

## Standing rule to add to every brief template

The design rule existed in Sunday's brief and the factory built past it;
then the Wednesday brief omitted it entirely. **Both failure modes are
fixed by putting it in the template rather than in individual briefs**,
and by the font gate above, which catches it even when a human forgets.

## Validation table

| Product | Phrase | Score | Meter | Status |
|---|---|---|---|---|
| *(none — no new product ships)* | — | — | — | rebuild slot |

No unvalidated product ships. Nothing is being smuggled through.

## Carried forward

- **Friday's fifteen phrases stay open.** They decide the *next*
  compete-lane build, not this one.
- **`take home folder` and `happy mail` need re-pulling** before either
  can be built — 08-26 scores are stale under the drift rule.
- **The review-request pass** across all 41 live listings is still
  unstarted and still the cheapest action touching the real constraint
  (zero instances of "feedback" or "credit" in `listings.json`). Good
  candidate for Sunday if the rebuild lands clean.
