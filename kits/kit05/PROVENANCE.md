# Kit 5 — Provenance log

Human-authorship chain for "AI & Academic Integrity: Setting Clear Expectations with Students."

| Stage | Date | Notes |
|---|---|---|
| Drafted (AI-assisted, per transparency statement) | 2026-08-08 | Full 9-component draft per approved Kit 1–4 template and KIT_STANDARD (incl. the Why-only founders' note rule and the catch-and-cut voice rule recorded at the Batch 2 gate) |
| Sources verified | 2026-08-08 | 5 new sources confirmed via live web search + 3 reused from Kit 1's verified log; see RESEARCH_LOG.md |
| Founders' note | 2026-08-08 | One Why-only "From the founders" passage at the front of the facilitator script, per the 2026-08-08 owner directive. AI-drafted from the session's stance; **awaits owner review at the Batch 3 gate.** |
| Founder review (humanization pass) | _pending_ | Owners: run kits/tooling/HUMANIZATION_CHECKLIST.md at the Batch 3 audit |
| What the owners changed/added | _pending_ | |
| Approved | _pending_ | Batch 3 sign-off |

**Transparency statement** ships on the References back page, verbatim.
| Owner directive: running exemplar | 2026-08-10 | Ms. Rivera (composite example teacher) added on the kit's flagship worked-example slide(s) in a generic mock chat window with color-coded, labeled prompt parts, per the new KIT_STANDARD exemplar rule. Rebuilt and re-inspected. |
| Owner directive: exemplar in script | 2026-08-10 | "Meet Ms. Rivera" intro callout added to the script's "How to use this script" section (identical across kits). Script rebuilt; pagination verified unchanged. |
| Owner directive: Rivera on every slide | 2026-08-10 | Persistent "Ms. Rivera's screen · so far" tracker chip added to every content slide (per-slide state lines tracking her artifact through the session), per the extended KIT_STANDARD exemplar rule. Long titles narrowed where needed. Rebuilt and re-inspected. |
| Owner directive: tracker in script | 2026-08-10 | Per-slide "Ms. Rivera's screen · so far" lines added under every slide cue in the facilitator script, mirroring the deck chip exactly. Scripts rebuilt; pagination verified (page counts +1 at most, within standard flex). |

## Revision 2026-08-10 (pre-launch legal audit)
The Admin One-Pager had overflowed its single sheet, clipping the legal
footer. Marketing copy was trimmed (lede, callout, citation list; no claims
changed, no citations altered beyond removal of secondary entries) so the
"informational, not legal advice" and local-credit lines render fully.
Rebuilt and re-verified visually. See docs/LEGAL_AUDIT.md.

## Batch 3 owner-audit revision (2026-08-12)

Owner findings applied across all components: (1) the disclosure norm became
the fixed school-wide AI Disclosure block (checkboxes, identical in every
classroom; free-form "two lines" removed per owner: uneven student output);
(2) the AI Box is now introduced with full context on slide 11 as the
teacher's half of one two-template system, both templates copy-ready in the
handout; (3) "design moves" de-jargonized to four plain assignment upgrades;
(4) the lab follows the new exemplar model (KIT_STANDARD 2026-08-12):
Ms. Rivera's one persuasive essay tracked through every step, her artifact
displayed large as primary slide content on steps 1-4. Rebuilt and visually
verified after the pass.

## Exemplar-layout upgrade (2026-08-15)

Applied the owner-approved Kit 3 exemplar pattern to the deck (30 → 35
slides), on the two rulings that teachers need to see a finished prompted
product word for word, and that prompts belong in the full-width chat
window with four-part colour coding and legend chips.

- **New slide 20, her starting artifact in full:** Ms. Rivera's persuasive
  essay assignment ("Should our school day start later?", 7th grade ELA) as
  it stands today, with the strip that names what is missing: not one word
  about AI.
- **New slides 22 and 23, the chat-window treatment:** the prompt she types
  to turn her three AI rules into the Box's Okay / Not okay lines in student
  words (ROLE teal · TASK navy · CONTEXT #B07914 · FORMAT green, four legend
  chips), then her four follow-ups as a labelled thread with what each one
  changed (plain words · gray area · soft landing · loophole test). Chat
  helpers copied verbatim from kits/kit03/src/deck.js, including the paper
  card ending at x 12.25 against prompt text at x 1.95 w 10.05, so no prompt
  prints across the card edge.
- **New slides 26 and 27, the finished product shown, not described:** her
  completed AI Box exactly as it prints on Monday's assignment (lane
  checkboxes per part: research 3, outline 2, final draft 1; her Okay and
  Not okay lines; the disclosure reminder; the conversation-not-accusation
  line; her upgrade printed with it), and the fixed Disclosure block as it
  comes back filled in at the end of a student's essay, beside what she does
  with it in twenty seconds. No student name anywhere; the block travels
  with the work.
- Untouched by design: the three lanes, slide 11's two-template teaching,
  the Disclosure block as a fixed checkbox template, per-part lanes, all
  timings, step names, and teaching content.
- Script kept in sync: cues renumbered 20 → 35, five new cues written with
  stage directions and spoken blocks, segment headings and the 0:54 timing
  checkpoint updated, every `.rivera-line` re-verified against the deck's
  RIVERA array (35/35 match, with no line where the chip is suppressed).
  Prep guide and script cover updated from "30 slides" to "35 slides".
- Defects found and fixed in this pass: the navy assignment header and the
  Box's closing line printed past their card edges on slide 26 (both
  re-fitted); slide 27's footer strip wrapped mid-phrase (set as two
  deliberate lines); slide 20's red strip sat tight against its card (card
  deepened); and the script lacked kit 3's `.rivera-line + .stage` pagination
  rule, which had split slide 19's cue from its first spoken block across a
  page break (rule added, seam re-verified).
- Verified: `check_overlap.py` clean on the rebuilt deck; every rebuilt PDF
  page extracts text (script 13 pp, min 605 chars; prep guide 3 pp, min 1775);
  cover rebuilt and re-merged; slides 18-28 and 29/35 inspected as rendered
  PNGs; script pages 1-13 inspected for split blocks.
