# THE ENGINE — what the owner's real classroom software contains

Written 2026-09-21 after a proper read. **Correcting an earlier mistake:** the
09-21 game plan named one repo and drop 56 was built from three files in it.
There are **two** repos, and the one that was missed is the larger and richer
of the pair.

| Repo | Size | What it is | Used so far |
|---|---|---|---|
| `Woodshop-Software` | 69 files, 5 test files | The nine-page portfolio builder | 3 files |
| `Woodshop-Classwork` | 213 files, 25 test files | Adaptive reading and assessment, **plus a full retro RPG** | **nothing** |

Both private, both live, both pushed the same minute on 2026-09-18.

**Attribution rule, unchanged and absolute:** show the code, never name the
school or the district. "My high school woodshop course." The apps are never
sold, given away or linked.

---

## THE SEAMS, RANKED BY WHAT THEY ARE WORTH TO A BUYER

### 1. `journeyman/CLAUDE.md` — how he actually directs the AI

**This is the single best artifact in either repo for teaching vibe coding**,
and it is better than anything used so far, because it is not a product of the
work — it *is* the method.

A teacher's own standing instructions to an AI, covering: non-negotiables the
model may never violate, the stack and why it was chosen, a fixed file layout,
and working rules. It ends with the line that solves the most common complaint
teachers have about coding with AI:

> "When a design question is genuinely open, make the Pokemon Red/Blue choice
> and note it in PROGRESS.md rather than stopping to ask."

That one sentence is a whole product. Every teacher who has tried this has been
interrupted every ninety seconds by a model asking which shade of blue.

Also in there and immediately teachable:
- **"Do not start a stage until the previous one is playable and saved."**
  Arrived at independently, and it is exactly the pedagogy our build-alongs
  already use. That is validation, and it should be said out loud.
- **"No em dashes anywhere in the project."** A house-style rule given to a
  model. Teachers recognise this instantly.
- **"Keep `PROGRESS.md` updated at the end of every session."** How a person
  with a teaching job picks work back up a week later.

### 2. `journeyman/docs/IP_GUARDRAILS.md` — the copyright question, answered

A teacher building a game in the idiom of a famous one, thinking carefully
about where the line is. It states the actual legal distinction correctly —
**systems are not protected, expression is** — then makes it operational: a
banned-words list, what may be borrowed freely, a rule that internal docs may
use comparisons that shipped code may not, a fonts rule, a rule about using
real colleagues' names with their permission, and **a five-step checklist to
run at the end of every stage** including "hum every music track."

Teachers are frightened of this topic and are served almost nothing but vague
warnings. This is a worked, honest, runnable answer from a teacher. It is a
free, a build-along and a PD session.

### 3. Anti-cheating by construction — the same shape as privacy by construction

Every student gets their **own version** of a unit, rebuilt from a random seed:
a different mix of sections, a different draw from each question bank, options
and ordering steps shuffled. Pasting is blocked and counted, leaving the tab is
counted, answers matching the reading word for word or matching a classmate are
flagged and capped, and **every written answer gets a follow-up question so a
vague or copied answer falls apart.**

This is the identical idea as the roster's three layers, in a different domain:
**do not police the bad outcome, make it structurally unavailable.** Naming
that as one idea with two worked examples is what turns a pile of products into
a line with a spine.

### 4. Measured AI cost, not estimated

A button that runs one student's worth of AI through a unit against the live
API and reports exactly what it used at published rates. The README says it
plainly: **"that is a measurement, not an estimate."** Per-class and per-model
totals from the token counts the bill is computed from. Measurement runs are
tagged and excluded from class spending.

**"What does it actually cost to run AI for my class?" is the most common
unanswered question in every AI-for-teachers discussion**, and the honest answer
everywhere else is a shrug. This is a teacher who built the instrument.

### 5. Two models for two jobs, with the reason stated

Sonnet for anything a student reads, Haiku for scoring the teacher can override,
and the reason written down: a student reads this text so it has to be careful;
you read and can override every score. Model choice is configurable by
environment variable without a code change.

Most teachers do not know there is a choice, let alone how to reason about one.

### 6. Reading tiers students never see

Three tiers, same question bank at every tier, key terms identical, auto-nudged
up or down after each unit, lockable per student. And: **"Students never see
their tier. Nothing on the student side names a level, shows a badge, or hints
that passages differ."**

Differentiation that does not label a child. That is a pedagogy argument as much
as a software one.

### 7. The writing coach that never blocks and never costs a mark

Mechanics feedback on written answers, at most three things at a time, the
answer already saved before the coach appears, and mechanics excluded from every
score. Two rules, both about not punishing a student for the tool's opinion.

### 8. `names.ts` + `schema.sql` — privacy by construction

**Already used**, in drop 56. Browser shortens, database refuses, no column to
put one in. Still excellent; it is simply no longer the only thing on the shelf.

### 9. `calc.ts` — computed, never typed

Money in whole cents, shop fractions parsed for board-foot math, and the hook in
the code comment: the course exemplar prints `10 x $8.44 = $80.44`. Partly used.

### 10. Thirty test files across the two repos

`npm test` covering money, fractions, board feet, completion rules, name
shortening, scoring, placement, timing, resume, safety. **"How do you know it
works?"** is the first question a skeptic asks and almost no teacher can answer
it.

---

## WHAT THIS CHANGES

**The line is not "teach teachers to build one-file tools."** It is: *here is a
teacher who built real software for his own classes, and here is every decision
he made and why.* That is a much larger and much less copyable catalogue.

**Three products the engine now obviously supports, none of them built:**

1. **The instructions file.** How to write standing directions to an AI so it
   stops asking and starts building. Drawn from `journeyman/CLAUDE.md`.
2. **Building in someone else's genre without stealing.** Systems versus
   expression, with the checklist. Drawn from `IP_GUARDRAILS.md`.
3. **What AI actually costs in a classroom, measured.** Drawn from the cost
   instrument and the two-model split.

**And one framing that should appear across the whole line:** *build it so the
wrong thing is impossible, not so that you are careful.* Privacy by
construction and anti-cheating by construction are the same move. Every product
should be able to point at the other example.

## Reading order for a factory with twenty minutes

1. `journeyman/CLAUDE.md` — the method itself
2. `journeyman/docs/IP_GUARDRAILS.md` — the hardest question, answered
3. `README.md` (Classwork) — anti-cheating, tiers, cost, the two models
4. `src/lib/names.ts` + `db/schema.sql` (Software) — privacy by construction
5. `src/lib/calc.ts` (Software) — computed, never typed
