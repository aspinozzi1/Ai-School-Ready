# The Best-Seller Line — proven TPT formats + the AI Growth Eval
(owner decisions 2026-09-03; all five binding)

## What this line is

Reverse-engineer the product *formats* that demonstrably sell on TPT —
intervention binders, adapted work binders, no-prep practice packs,
visual-support flipbooks, social-skills sets — rebuild them as fully
original Bright Scholar content, and end each one with the thing none of
those sellers have: **an AI Growth Eval page** that turns the results the
teacher just collected into an interpretation and next steps.

Their product ends when the worksheet ends. Ours ends with "here is what
this data says about this student, and here are your next three moves."

**Recreate means the format and the category. Never the content.** No
page, phrase, layout, sequence, or image is taken from another seller.
Original throughout or it does not ship.

## The five binding decisions

1. **The AI Growth Eval ships in two parts.** (a) A **printable decision
   table** — score band → what it means → the next three moves — that
   works with zero technology, for the 55% of teachers currently opposed
   to classroom AI. (b) An **optional copy-paste prompt** the teacher
   runs with **de-identified data only**: "a 2nd grader scored 6/10 on
   short-vowel CVC words, missed all words with blends." Never a name,
   never a child at a keyboard, never a class roster pasted into a
   chatbot.
2. **Depth over breadth.** The first build is ONE format at **40–60
   pages**. These categories are defined by thickness; a thin version
   loses on sight.
3. **We author real academic student-facing content.** Word lists,
   decodable passages, skill ladders, intervention sequences. This is a
   heavier build than our teacher-workflow catalog and a different kind
   of authorship — budget for it.
4. **The AI Growth Eval is a brand signature, on every product.** Every
   Bright Scholar product from here ends with "what your results mean
   and what to do next," scaled to the product's size. Retrofit the
   existing catalog over time, newest and best-selling first.
5. **Price to the format: $15–20** for a 40–60 page build (comparables
   run $21.50 and $42). Underpricing a thick product signals low quality
   in this category. Licenses stay at half price.

## Authoring standard for academic content (new, and non-negotiable)

Writing instructional content raises the bar on accuracy:

- **Publish the scope and sequence.** Any phonics or skills product
  states its sequence explicitly on an early page so a teacher can slot
  it into what they already use. A sequence a buyer can't see is a
  sequence they can't trust.
- **Describe, don't credential-drop.** We say what the material does and
  how it is sequenced. We do NOT claim alignment to a named program, or
  attach "research-based" to anything we have not actually grounded and
  can't point to. Overclaiming is the fastest way to a bad review.
- **Every item is checked against its own rule.** If a page says
  "short-vowel CVC, no blends," every word on it obeys that. Build a
  checker where the rule is mechanical.
- **The eval must be honest about what one worksheet can tell you.** A
  10-item probe is a signal, not a diagnosis, and the page says so.

## First build — format selection (pending the owner's TPT data)

Candidate formats, from the owner's screenshot of proven sellers:
reading intervention binder · adapted/independent work binder ·
no-prep intervention pack (ELA + math) · sight-word practice set ·
first/then visual schedule flipbook · social-skills printable set.

Friday's worksheet leads with these phrase families. The format with the
best **win score** (searches ÷ resource-bucket midpoint × 1000, Strong
or Promising only — see `winnable-niches.md`) becomes the first build.
Nothing is authored before that data comes back.

## Anatomy to match (why these sell)

Observed in the comparables: no-prep and print-ready · reusable
(laminate, dry-erase, velcro) · a data/progress sheet included · covers
and dividers so it *becomes* a binder on the teacher's shelf · clear
skill-by-skill organization · bundle-ability across skills or grades ·
editable where it matters. Our additions: the Growth Eval page, the
brand's visual quality, and honest sequencing.

---

## Friday = the compete lane (owner directive 2026-09-03)

The store now runs three drops:

| Day | Game | Lanes |
|---|---|---|
| **Sunday** | WIN — own the niche | classroom · homeschool · open demand |
| **Wednesday** | WIN — own the niche | Young Entrepreneurs · Deaf Education |
| **Friday** | **COMPETE** — proven formats, AI differentiator | Best-Seller line |

Friday's selection rule is the inverse of the other two days. We do NOT
require a low resource count — these families are crowded by definition.
We require:

1. **Demand** — a large, durable search family (not a seasonal spike).
2. **Price ceiling** — comparables selling at $15+ so the format
   supports our pricing.
3. **A real Growth Eval** — the activity must produce something
   *scoreable*. If a teacher can't get a number or a pattern out of it,
   the eval page is decoration and the product doesn't belong on Friday.
4. **We can author it honestly** — original content, correct content,
   and a citable basis (see the authoring standard above).

### Cadence — the sustainable shape

A 40–60 page academic build every single week is not realistic at our
quality bar. Friday therefore ships **one unit per week (8–14 pages)**
from an in-progress binder, each unit a complete standalone product with
its own probe, data sheet and Growth Eval — then, when the units are
done, a **bundle listing** at the full price. This is TPT-native
(bundles convert well), it de-risks the format (weak seller = stop after
unit 2), and it gives Friday a shippable product every week.

Example, first binder: Unit 1 short a → Unit 2 short i → Unit 3 short o
→ Unit 4 short u → Unit 5 short e → **bundle: Short-Vowel CVC
Intervention Binder, $18** (units $4–5 each, bundle saves ~25%).

---

## Shipped log

- **2026-09-04 — Unit 1: Short A.** 12 pages, $5 / license $2.50.
  Title `CVC Words Worksheets | Short A Intervention Binder with Data &
  AI Growth Eval` (77 chars), lead phrase "cvc words worksheets"
  (7,473 · 40K–75K · Promising, owner-run TPT Keywords 2026-09-03).
  Mechanical check: `kits/tooling/check_cvc.py` — 53 target words, 23
  unique, **0 violations** (every word three letters, middle `a`,
  consonant either side, no blends or digraphs).
  **Next: Unit 2 (short i), Friday 2026-09-11.** Units 3–5 follow, then
  the bundle at $18.

### Gate bug found and fixed during this build

`check_breaks.py` only ever scanned files passed as arguments. Run with
no arguments — which is how the playbook's gate list reads — it scanned
nothing and printed `flags: 0`. **Every "flags: 0" from an argument-less
run was a false all-clear.** It now defaults to every PDF under
`UPLOAD/`, and the repo-wide run reports honestly.

With that fixed, the true result for this unit is **2 flags**, both on
the same pattern (a small teacher-tally box near a page bottom matched
against a similar box near the next page top). Verified visually on the
contact sheet and dismissed: every page is a fixed-height `.sheet` with
`overflow:hidden`, so no content can flow across a page boundary.
