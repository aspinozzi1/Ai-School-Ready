# The Kit Standard — locked design decisions (one page)

Established with the approved Kit 1 exemplar. Every kit after Kit 1 follows this
document exactly. Change it only with the owners' sign-off.

## Voice
A respected, warm colleague. Plain language, zero hype, zero jargon, honest about AI's
limits. Teachers are the experts; AI is the eager intern. The five-word posture appears
in every kit: **AI drafts, the teacher decides.** Skeptics are treated as assets.
Banned cadence: "delve," "furthermore," "moreover," "in today's rapidly evolving
landscape," "it's important to note," "harness the power," "game-changer," hype-"unlock,"
uniform sentence rhythm. Concrete beats abstract.
**Em dashes (owner rule, 2026-08-07): almost never.** The em dash is the most visible AI
tell. Default to periods, colons, commas, semicolons, and parentheses; an em dash is
allowed only where the hard break IS the point (a spoken pushback line, a signature
close), and a document earns at most one or two. Labels and titles use ":" or "·",
never "—". En dashes in numeric ranges (45–60 min, 2023–24) are fine.

## Session shape (45–60 min)
Welcome/why-now (≤4 min) → concept teaching (≤20 min) → guided practice (≈8 min) →
**hands-on lab ≥15 min (protected — cut discussion, never the lab)** → honest limits +
commitments (≈7 min) → First-48-Hours + exit ticket (≈3 min). A running clock in the
script; a printed 45-minute cut. The one-hard-rule privacy stance appears wherever
students or data are discussed.

## Components & lengths (9 files, exactly)
| # | File | Form | Length |
|---|---|---|---|
| 1 | `KitXX_FacilitatorPrepGuide.pdf` | flow doc | 3 pp |
| 2 | `KitXX_PresentationDeck.pptx` | deck | 25–40 slides, notes on every slide |
| 3 | `KitXX_FacilitatorScript.pdf` | cover + flow doc | ~10 pp, keyed to slide numbers, stage directions, running clock |
| 4 | `KitXX_ParticipantHandout.pdf` | flow doc | 2–4 pp |
| 5 | `KitXX_First48Hours.pdf` | single sheet | 1 p, 3 actions × ≤15 min |
| 6 | `KitXX_30DayPlan.pdf` | flow doc | 3 pp, 3 × 10-min PLC follow-ups |
| 7 | `KitXX_ExitTicket.pdf` | single sheet | 1 p, doubles as PD documentation |
| 8 | `KitXX_AdminOnePager.pdf` | single sheet | 1 p |
| 9 | `KitXX_References.pdf` | flow doc | 2 pp, APA + "used for" note per source + 3–5 further reading |

## Pagination (owner rule, 2026-08-07)
No sentence or paragraph is ever split across a page break. Prose blocks, list
items, cards, callouts, and reference entries move to the next page whole; lists
may break between items only; a slide cue, its stage direction, and its first
spoken block stay together; headings never sit alone at a page bottom. Enforced
in `kits/tooling/brand.css` (break-inside/break-after rules); a slightly ragged
page bottom is always preferred over a split. Breathing room is non-negotiable:
~0.5in clear space below the navy band on every page (continuation pages included) and
~0.35in above the footer band; when content and whitespace compete, whitespace wins;
add a page instead of compressing. (Component page counts flex by one page for this.)

## Look (locked brand)
Navy `#13293D` band top of every page with the white/teal logo; navy footer strip with
credit line. Teal `#2A9D8F` accents, amber `#F4A825` sparingly (rule blocks, founder
slots), paper `#F7F5F0` cards, Inter only (Bold heads / Semibold labels / Regular body,
1.6 line height). Rounded corners (10–12px), no gradients, no clip-art, no stock filler.
Slide titles ≥32pt, body ≥20pt (16pt floor inside cards); title/rule/lab/commitment
slides go dark-navy full-bleed. Kit covers: navy, teal spark-circle kit number, amber
track line, title ≤2 lines, founders' credit block. Deck footer: mark + wordmark left,
"Kit X · title | slide #" right.

## Research
Every citation verified against the live source before writing (existence AND claim).
Each kit: 5–10 sources logged in `RESEARCH_LOG.md` with the exact figure used and where.
Numbers appear with plain attributions in speech ("that's from RAND"), full APA in the
References file. Claims that can't be sourced get softened to professional judgment or cut.

## Human co-authorship (per kit, non-negotiable)
≥2 `[FOUNDER STORY]` slots (specific, answerable prompts), ≥1 `[YOUR TAKE]`, ≥1
`[LOCAL EXAMPLE]` (Adam's shop / Katelyn's K-8 room) — placed where a story carries
teaching load (openings, objection-handling, lab/debrief), never as decoration.
`PROVENANCE.md` per kit; `kits/tooling/HUMANIZATION_CHECKLIST.md` accompanies every
draft; owners' edits always win over draft polish. Transparency statement on the
References back page, verbatim.

## Legal fixtures (every kit)
Footer credit: "Built by Adam & Katelyn Spinozzi — certified educators." Legal block on
prep guide, script, 30-day plan, one-pager: informational-not-legal-advice + district
counsel line. Exit ticket carries "check with your district or state whether this PD
qualifies for local credit." Third-party tools referenced factually with no-endorsement
note. Certificates named only "Certificate of Completion." No student PII anywhere —
including in examples, which use invented but realistic names *only inside "unsafe
prompt" demonstrations*.

## Build (mechanical)
HTML sources in `kits/kitXX/src/` + `kits/tooling/brand.css` → `bash kits/tooling/build_kit.sh kits/kitXX`.
Deck via `kits/kitXX/src/deck.js` (pptxgenjs). Every artifact is rendered and visually
inspected before presenting — no exceptions.
