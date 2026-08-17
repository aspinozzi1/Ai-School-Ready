# Deck design standard — decks that stand alone

Owner directive, 2026-08-17: *"the powerpoints should be able to stand on their own."*
A facilitator holding the script can follow our current decks. A teacher looking at the
screen, or a principal flipping the file afterward, cannot. This document replaces how
slides are built. It governs every kit.

## The measured defect

67% of our slide headlines are **labels**, not claims: "The sneaky ones," "The spice
rack," "The leveled text," "Safe swap #2: differentiation." A label names a topic and
leaves the point in the presenter's mouth. Nothing on the slide tells a reader what to
conclude.

This is the documented losing pattern. Alley and colleagues compared topic-headline
slides with bulleted lists against **assertion-evidence** slides, whose headline is a
complete sentence stating the claim and whose body is evidence for it. The
assertion-evidence group showed better comprehension, stronger recall on a delayed
post-test, lower perceived cognitive load, and far fewer misconceptions.

## Rule 1: the headline is the teaching

**Every content slide's headline is a complete sentence that states the claim.**
If the presenter vanished, the headline still teaches.

| Don't | Do |
|---|---|
| The sneaky ones | Initials plus context still identify a child |
| The spice rack | Four add-ons fix most weak prompts |
| The leveled text | One passage can serve three reading levels |
| Rubrics aren't paperwork | Rubrics raise performance when students can read them |
| The fade risk | PD sticks when it becomes a routine with a date and an owner |

Headline budget: **≤ 12 words**, one sentence, no colon-label constructions
("Safe swap #2: the parent email" is a label wearing a sentence's clothes).

## Rule 2: six slide types, each unmistakable at a glance

A reader must know within three seconds what kind of slide this is and whether they are
supposed to do something. Today every slide looks the same, which is why participants
sit through instruction slides.

| Type | Looks like | Job |
|---|---|---|
| **ORIENT** | navy full-bleed, progress rail lit | Where we are and what happens next. Opens each segment. |
| **CLAIM** | white, sentence headline, ONE piece of evidence | Teach one idea. Never a bullet list alone. |
| **SCREEN** | white, full-width chat window | Show Ms. Rivera's actual work. Headline says what to notice. |
| **DO NOW** | amber band, oversized task, timer, done-condition | Tell the room to act. Impossible to mistake for teaching. |
| **ANSWER** | white, muted reveal strip under the task | Give the answers, so a solo reader still learns them. |
| **KEEP** | paper card, one artifact or commitment | What you take away. Closes each segment. |

A deck that is all CLAIM slides has failed. Aim for roughly: 30% CLAIM, 20% SCREEN,
15% DO NOW, 10% ANSWER, 15% ORIENT, 10% KEEP.

## Rule 3: every DO NOW answers three questions on the slide

What am I doing · how long · how do I know I'm done. In that order, in type large
enough to read from the back. No participant should ever have to ask "wait, are we
doing something?"

## Rule 4: a reading budget

- Headline: ≤ 12 words.
- Body on a CLAIM slide: ≤ 40 words total.
- No card holds a paragraph. If prose is needed, it belongs in the speaker notes (which
  the presenter reads) or the handout (which the teacher keeps).
- Numbers get their context on the slide, always. A statistic with no context is a
  label.

## Rule 5: orientation is persistent

A thin progress rail across the bottom shows the session's segments with the current one
lit. A reader can always answer "where am I and how much is left." This replaces the
guesswork of a bare slide number.

## Rule 6: Ms. Rivera moves out of the corner

The tracker chip currently occupies the top-right of every slide, competes with the
headline for space, and has caused repeated collisions. Under this standard she appears
**large on SCREEN slides**, where her work is the content, and her running state moves
to a single quiet line on the progress rail. **This modifies the 2026-08-10 owner rule
that she appears on every slide**; the intent of that rule, that the room never loses
her thread, is better served by a rail line than by a chip fighting the title.

## Rule 7: the three-second test, run on every slide

Look at the rendered slide for three seconds, then look away and answer:
1. What is this slide claiming?
2. Am I supposed to do something right now?

If either answer is unavailable, the slide fails and gets rebuilt. This test is run on
rendered PNGs, not on source, and it is part of the build checklist alongside
`check_overlap.py`.

## What does not change

Brand fixtures, the locked palette and type, the 45-60 minute session shape, the
protected lab, the lab exemplar model, "show the finished product," the prompt window
and its card geometry, every legal fixture, and the research-language rules. This
standard governs how a slide communicates, not what the kit teaches.
