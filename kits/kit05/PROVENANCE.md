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

## Full rebuild from scratch (2026-08-17)

Owner directive 2026-08-15: the topic stays, the execution was rejected.
Verbatim: *"It didn't flow well and the suggested solutions and problem
solving were more confusing than helpful. The exemplar wasn't succinct, but
instead all over the place."* All nine components were rebuilt from
`kits/kit05/REBUILD_SPEC.md`, which is the approved replacement design. The
2026-08-12 two-template ruling is superseded by that spec, at the owner's
own 2026-08-15 direction.

**The session now teaches one move:** *Ask for one thing AI can't hand in.*
Three places to look for it (from this room · from this student · in front of
you) are the only framework in the kit.

**What was cut and not reintroduced**
- The three lanes as a taught framework. A single one-line label survives, and
  wherever level language appears it credits the AI Assessment Scale.
- The teacher-facing AI Box template (six fields).
- The student-facing AI Disclosure block as a separate school-wide template.
- The four assignment upgrades, replaced by the one move.
- The never list as its own slide; the one line that matters (never accuse on
  a detector score alone) now lives inside the conversation segment, slide 25.
- Per-part lane assignments. The exemplar is never split across parts again.
- Two sources that only supported cut slides: ICAI's six values and OpenAI's
  Terms of use age rules. Both remain verified, just unused.

**The exemplar**: one artifact, Ms. Rivera's 7th grade persuasive essay
("Should our school day start later?"), carried from slide 11 to slide 22
without changing topic or splitting. The lab ends by showing her finished
assignment sheet word for word on slide 22, one sentence longer than it was.

**Shape**: deck 30 slides (was 35). Lab is 15 protected minutes of work
(0:28–0:43) inside a 0:27–0:49 lab segment. The room acts twice before the
halfway mark: the vote at 0:01 and guided practice at 0:22. The hinge (the
move) lands at 0:14 and is fully landed by 0:20.

**New citation, verified this pass**: Perkins, M., Furze, L., Roe, J., &
MacVaugh, J. (2024), *The Artificial Intelligence Assessment Scale (AIAS)*,
Journal of University Teaching and Learning Practice, 21(6),
doi:10.53761/q3azde36. The publisher page 503'd through this environment's
proxy, so it was verified against three live sources that did resolve: arXiv
2312.07086 (authors, venue, volume/issue), the James Cook University
repository record 87283 (DOI), and the University of Iowa Center for Teaching
AIAS page (the five level names from Table 1, credited to these authors under
CC BY-NC-SA 4.0). Because the AIAS is CC BY-NC-SA and this is a commercial
kit, it is cited and pointed to but never reproduced or adapted.

**From the founders**: rewritten for the new design (surveillance vs.
assignment design; leave holding paper, not a resolution). Why-only, two
paragraphs, presenter-facing, wrapped so it cannot split. **AI-drafted;
awaits owner review.**

**Build and verification (all run 2026-08-17)**
- `node kits/kit05/src/deck.js` → 30 slides, output confirmed at
  `kits/kit05/Kit05_PresentationDeck.pptx`.
- `check_overlap.py` on the rebuilt deck: **clean** (run from a writable cwd;
  LibreOffice fails to convert from the repo root in this environment).
- All 9 PDFs rebuilt; the script cover rebuilt and re-merged after every
  script rebuild.
- Text layer: every page of every PDF extracts text, minimum 645 characters
  (script p1 cover) and 1,439–2,894 elsewhere. No glyph-less builds.
- Trailing pages: last page of every PDF carries real content.
- Single-sheet legal check: admin one-pager and First 48 Hours both render
  "not legal advice" fully above the footer band; exit ticket renders its
  local-credit line. Verified by text extraction and by rendered PNG.
- Deck converted with LibreOffice and all 30 slides inspected as PNGs; script
  (12 pp), handout (3 pp), prep guide (3 pp), 30-day plan (3 pp), references
  (2 pp) and all three single sheets inspected page by page.
- Chip sync: a script compared the deck's 30-entry RIVERA array against every
  `.rivera-line` in the script. 30/30 match, including the three suppressed
  chips (slides 1, 13, 21, 30 carry no chip; 13 and 21 are her chat window).

**Defects found and fixed in this pass**
1. **Admin one-pager clipped its legal block entirely.** The body overflowed
   the sheet by 75px and `overflow:hidden` swallowed the
   informational-not-legal-advice paragraph, which still extracted as absent.
   Fixed by trimming marketing copy only (lede, why-now paragraph, the
   research list, two bullets); no claim or citation was weakened.
2. **First 48 Hours had no legal block at all** in the old kit, and the
   rebuilt sheet overflowed by 40px once one was added. Legal block added and
   marketing copy trimmed (lede, a "stuck?" line) to make room.
3. **Participant handout stranded a table header.** The conversation table's
   header row printed alone at the bottom of page 2 with its body on page 3.
   Fixed with a local `table tr:first-child { break-after: avoid; }` rule.
4. **Prep guide ran to 4 pages with a near-empty last page,** then to a page
   carrying only the legal block, then to a genuinely blank trailing page.
   Resolved to a clean 3 pages by trimming prose and folding one FAQ into
   another. Legal text untouched throughout.
5. **Deck slide 29 Action 1 text pressed against its card edge**; cards
   deepened and the text shortened.
6. **Deck slide 24's "GATHER PROCESS EVIDENCE" badge** filled its pill
   edge-to-edge; badge widened and letter-spacing reduced.
7. **Deck slide 13's chat window left a large dead band** below the prompt;
   window height reduced and the response card raised.
8. **Deck slides 23 and 27 had a visible gap** between the bullets and the
   closing card; cards raised.
9. **Deck slide 7's two stat captions sat at different heights** because one
   wrapped to two lines; both top-aligned.
10. **Two script chip lines drifted from the deck array** ("one label added"
    vs "one line added"; "This one assignment got harder to fake" vs "This
    one got harder to fake"). Script corrected to the deck.
11. **Seventeen script cue titles did not match the titles projected on
    screen.** All aligned so a presenter can match paper to projector.
12. **The References transparency statement had an extra sentence appended,**
    which broke the "verbatim" rule. The added note about the kit's
    illustrative examples was split out into its own line beneath it.

**Known downstream inconsistency, for the owner, not fixed here:** Kit 8
references Kit 5's "lane labels" in three places (handout, script, deck) and
Kit 4's closing points at "Kit 5, Academic Integrity" generically. The lane
framework no longer exists in Kit 5. Kit 8's references need a pass; that kit
was out of scope for this rebuild.

| Stage | Date | Notes |
|---|---|---|
| Rebuilt from scratch (AI-assisted, per transparency statement) | 2026-08-17 | All 9 components rebuilt to REBUILD_SPEC.md; script written first, deck built against it, seven supporting docs from the finished pair |
| Sources re-verified and log rewritten | 2026-08-17 | RESEARCH_LOG.md rewritten to match what the kit now claims; AIAS added and verified; ICAI and OpenAI Terms retired as unused |
| Founders' note | 2026-08-17 | Rewritten for the new design. **Awaits owner review.** |
| Founder review (humanization pass) | _pending_ | Owners: run kits/tooling/HUMANIZATION_CHECKLIST.md |
| Approved | _pending_ | |
