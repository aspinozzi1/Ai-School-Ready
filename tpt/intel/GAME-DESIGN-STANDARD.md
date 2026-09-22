# THE GAME DESIGN STANDARD — binding for every "Vibe Code Your Own Game" product

> **Owner, 2026-09-22:** "This is not good. Do some research and create
> directions on how to vibe code games that look good, will be highly
> engaging, teachers will enjoy giving and showcasing, that understand student
> behavioral psychology and will motivate them to engage and learn the
> content... The products I create need to truly be life changing for the
> teacher and their classroom."

**No game ships without meeting every rule in this file.** Drop 57 does not
meet it and must be rebuilt.

---

## 1. WHAT WAS WRONG WITH THE FIRST ONE, SPECIFICALLY

Naming it precisely, because "make it better" is not a direction.

| The flaw | Why it matters |
|---|---|
| **Pure recall.** Answer a multiple-choice question, a number goes down. | There is no decision in it. The research on why Blooket's Tower Defense works is explicit: *the adaptation is where real learning happens, not in the recall of the fact, but in the flexible application of knowledge under shifting conditions.* Our game has no shifting conditions. |
| **A shared class health bar punishes the weakest student in public.** | When the class loses because one child missed three, the room knows who. Research on leaderboards is blunt: for students performing poorly they convey negative feedback, generate social pressure and produce **a sense of incompetence and lower intrinsic motivation**. We built that and called it teamwork. |
| **Points bolted on top.** Damage numbers, streaks, a record. | The 2024 meta-analysis: gamification improves intrinsic motivation, autonomy and relatedness but has **minimal impact on perceived competence**. Points do not make a child feel capable. Only visible mastery does. |
| **Missed questions never come back.** | Gimkit's single best feature is that missed questions return. Ours reshuffles at random, so a student can miss the same idea three times and never meet it again. That is a review game that does not review. |
| **Amateur art.** A red blob, three colors, no silhouette test. | A teacher will not project it, will not photograph it, will not show it to the teacher next door. If it does not survive the showcase test it does not sell. |

---

## 2. THE MOTIVATION ARCHITECTURE

Self-determination theory: three needs drive motivation, and the evidence
ranks them. **Competence is the strongest predictor of self-determined
motivation, then autonomy, then relatedness.** Build them in that order.

### COMPETENCE — the one we got most wrong

Competence is not scoring. It is **seeing yourself get better at a specific
thing.**

**Required mechanics, all of them:**

1. **Track mastery per concept, not per question.** Tag every question with an
   idea ("condensation", "two-step equations"). The game knows which ideas the
   player has met, missed, and since fixed.
2. **A missed idea comes back, later in the same session.** Not immediately —
   that is recognition, not retrieval. Three to five questions later, which is
   spacing at the scale a class period allows.
3. **Getting it right the second time is the loudest moment in the game.**
   Bigger than a critical hit. This is the single most important design rule in
   this file: *the game's biggest celebration belongs to the student who was
   wrong and is now right.* Name it on screen — "you missed that one earlier."
4. **Show growth, not total.** "Four ideas locked in" beats "820 points."
   A progress display that only goes up, never resets, and is about
   understanding rather than speed.
5. **Difficulty follows the player.** Two right in a row, draw a harder one.
   Two wrong, drop back. Nobody sits outside their reach for long. This is
   flow, and it is what keeps the strong student and the struggling one in the
   same room on the same game.

### AUTONOMY — the missing half of the game

**A game where the only input is "pick the right answer" has no autonomy in it
at all.** Every turn needs a decision that is not the answer.

**Pick at least two per game:**

- **Choose the approach before the question.** Four routes, moves, tools or
  topics. Picking changes what you face and what it is worth.
- **A resource to spend or save.** Energy, coins, charges. Spending doubles a
  hit; saving buys a shield. Now there is a plan.
- **Risk and reward.** "Double or nothing on a hard one." A real decision with
  a real cost.
- **Order of attack.** Let them choose which part of the boss, which door,
  which territory — anything that makes *their* run different from the run
  beside them.

**The test:** if two students playing the same content would produce the same
sequence of screens, there is no autonomy in your game.

### RELATEDNESS — and the trap inside it

Relatedness is real and worth building. **Public individual ranking is not the
way to get it**, and in a diverse classroom it actively harms the students you
most need to reach.

**Do:** team goals · shared objectives · a class total that only ever goes up ·
roles where different students contribute differently · private personal
progress.

**Never:** a public individual leaderboard · a visible score attached to a
child's name · any mechanic where the room can identify who cost them the win.

**The research line to keep in mind:** *private progress dashboards or
team-based rankings often outperform individual public rankings for diverse
classrooms.*

---

## 3. THE LEARNING ARCHITECTURE

A game that is fun and teaches nothing is a waste of a period, and teachers
know it within one use. Four things, all cheap to build.

**Retrieval practice.** Recalling beats re-reading, and the gap widens with
time. Roediger and Karpicke: re-readers led 83% to 71% after five minutes and
**lost 40% to 61% after a week.** Every question in the game must be recall,
never recognition-with-a-giveaway.

**Spacing.** Distribute practice rather than massing it. In a single session
this means: a missed idea returns three to five questions later, not next.

**Interleaving.** Mix idea types rather than blocking them. Never run five
questions on the same concept back to back; the student learns the pattern
instead of the content.

**Desirable difficulty.** Effortful retrieval is what builds durable memory.
So: no giveaway distractors, a real pause before the answer is revealed, and
difficulty that rises as the player succeeds.

**The one non-negotiable feedback rule:** after a wrong answer the game holds
the correct answer on screen **longer than after a right one**, and says *why*
in one line, not just *what*. This is the only teaching the game does and it
costs nothing.

---

## 4. THE FIVE TRAPS

1. **The overjustification trap.** Bolting points onto something students
   already found interesting can *reduce* intrinsic motivation and shift focus
   from learning to reward. Rewards must be **about the content** — an idea
   mastered, a concept unlocked — not a currency floating above it.
2. **The public-failure trap.** Any mechanic where one student's miss visibly
   costs the group. Individual runs, team totals, or a class bar that only
   rises.
3. **The recall-only trap.** No decision, no adaptation, no transfer.
4. **The difficulty trap.** Fixed difficulty loses the top third to boredom and
   the bottom third to despair, in the same five minutes.
5. **The novelty trap.** It is thrilling in week one and dead by week three,
   because nothing changes. Progression, unlockables or variation must exist.

---

## 5. THE VISUAL STANDARD

A teacher will not showcase something that looks like a school project. These
are rules, not suggestions.

**Palette.** One palette for the whole game, **sixteen colors or fewer**.
Eight to twelve per sprite. *A single sprite with forty colors turns to noise
when it is thirty pixels tall, because the eye cannot tell adjacent shades
apart at that size.* Fewer colors read better, always.

**Silhouette test.** Fill each sprite with solid black. If you cannot tell what
it is, redraw it. *A strong silhouette is recognizable even at a small size* —
and if it is not readable in silhouette it will not read on a projector from
the back row.

**Check at 1x.** *Your pixel art will be viewed at actual size. If it does not
read at 1x it does not work, no matter how pretty it looks zoomed in.*

**One light source, top-left, everywhere.** Highlights on top-left faces,
shadows bottom-right, on every sprite in the game.

**Outlines, consistently or not at all.** A single dark outline on everything,
or none on anything. Half and half looks like two people made it.

**Something is always moving.** An idle bob, a drifting background, a blinking
cursor. A static screen reads as broken software.

**Transitions, never hard cuts.** A quarter-second wipe or fade between states.
This one change does more for perceived quality than any sprite.

**Type.** One display face and one body face. Big enough to read from the back
of a room — nothing under 18px on a projected screen.

---

## 6. THE SHOWCASE TEST

The product does not ship unless a teacher would do all four:

1. **Project it** without apologising for how it looks.
2. **Photograph it** for a colleague, a newsletter or a post.
3. **Say "I made this"** and enjoy saying it.
4. **Use it again in three weeks**, because it still holds up.

If the answer to any of those is no, the game is not finished.

---

## 7. PROMPT PATTERNS THAT PRODUCE THIS

The reason the first game was thin is that the prompts asked for a quiz with
health bars, and that is exactly what came back. Ask for the architecture.

**For competence:**
> Tag each question with the idea it tests. Track which ideas the player has
> missed. **Bring a missed idea back three to five questions later**, and when
> they get it right that time make it the biggest celebration in the game, with
> a line saying they missed it earlier. Show a count of ideas locked in that
> only ever goes up.

**For autonomy:**
> Before each question the player chooses one of four [routes / tools / topics].
> The choice changes what they face and what it is worth. **Two students with
> the same questions should have different runs.**

**For difficulty:**
> Tag questions easy, medium or hard. Two right in a row draws a harder one,
> two wrong drops back a level. Never more than two of the same idea in a row.

**For feedback:**
> On a wrong answer, hold the correct answer on screen longer than on a right
> one and show a one-line reason why it is right, taken from a `why` field on
> the question.

**For the look:**
> Use one palette of at most sixteen colors for the entire game. Every sprite
> gets a single dark outline and a light source from the top left. **Check each
> sprite reads as a solid black silhouette.** Add a quarter-second wipe between
> every screen state. Nothing on screen is ever completely still.

**What to forbid, every time:**
> No public individual leaderboard. No score attached to a student's name. No
> mechanic where one player's wrong answer visibly costs the group.

---

## 8. THE GATE — a game ships only when every line is yes

**Motivation**
- [ ] Mastery per idea is tracked and shown as growth, not as points
- [ ] Missed ideas return later in the same session
- [ ] Fixing a miss is the loudest celebration in the game
- [ ] There is a real decision every turn that is not "pick the right answer"
- [ ] Two students with the same content would have different runs
- [ ] Difficulty moves with the player
- [ ] No public individual ranking, and no way to see whose miss cost the group

**Learning**
- [ ] Every question is retrieval, and every distractor is a real misconception
- [ ] No more than two questions on one idea in a row
- [ ] A wrong answer holds longer and says *why*, in one line

**Look**
- [ ] One palette, sixteen colors or fewer
- [ ] Every sprite passes the black-silhouette test
- [ ] Readable at 1x and from the back of a room
- [ ] One light source, consistent outlines
- [ ] Something always moving; transitions between every state

**Showcase**
- [ ] A teacher would project it, photograph it, claim it, and reuse it in
      three weeks

---

## 9. WHAT THIS MEANS FOR WHAT IS BUILT

**Drop 57 is withdrawn from the drop list and rebuilt to this standard.** It
fails at least six lines of the gate. It is not a bad prototype — it is a good
prototype of the wrong thing, and the parts worth keeping (juice, sound, the
one-file shape, the honest Blooket comparison, the IP page) survive the
rebuild.

**Every product in the series carries a page on this thinking**, because the
teaching is the product. A teacher who learns *the biggest celebration belongs
to the student who was wrong and is now right* has learned something they will
use in their teaching whether or not they ever build another game. **That is
what makes it life changing rather than a novelty**, and it is the difference
between this series and an AI game generator.
