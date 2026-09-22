# The Long Road — design notes (internal, not shipped)

## The shape, and why

A journey across unknown country. **Every turn the player chooses the route**,
before any question is asked. Choice is the primary verb; answering is how the
choice is resolved. That is the inversion drop 57 got backwards.

## How each rule in GAME-DESIGN-STANDARD.md is met structurally, not bolted on

| Rule | How the shape delivers it |
|---|---|
| A real decision every turn | Two or three routes, always visible, always different in cost and payoff |
| Two students, different runs | The map is generated per run and the route is chosen, so no two paths match |
| Difficulty follows the player | **The player picks the difficulty by picking the road.** The hard pass asks a hard question and pays more; the long detour asks two easy ones. Flow without a hidden algorithm |
| Missed ideas return | A missed idea becomes a **washed-out crossing** on the map later. It is visible, it is in the way, and it is optional |
| Fixing a miss is the loudest moment | Clearing a washed-out crossing **permanently opens the road** and is the only event with a full-screen celebration. The map changing shape *is* the reward |
| No public failure | **There is no losing.** Run out of supplies and you fall back to the last camp, losing days. Everyone arrives; arrival is *scored* — days taken, supplies left, ideas mastered |
| Interleaving | The draw never takes the same idea twice in a row |
| Growth, not points | The tally is **ideas mastered**, and it only ever goes up |
| Relatedness without ranking | The class votes on the route. Nobody's name is on anything |

## The loop

1. **The map.** Two or three routes ahead, each showing what it asks and what
   it pays. Player chooses.
2. **The question**, drawn to match the route's difficulty and the
   interleaving rule.
3. **Right** -> miles gained, supplies sometimes gained, the idea's mastery
   counter rises. **Wrong** -> supplies lost, the correct answer held on screen
   longer with a one-line *why*, and the idea is marked missed.
4. Every few legs, a **camp**: choose one of three pieces of gear. No question,
   pure autonomy, and a moment to breathe.
5. Repeat until the destination. **Arrival is always reached.**

## Gear — the second choice layer

Each is a real decision with a cost, not a bonus:

- **Lantern** — see the idea a route will ask before choosing it
- **Rope** — one retry, once
- **Mule** — carry two more supplies
- **Map** — reveal one extra route option at every fork
- **Charm** — the first wrong answer each leg costs nothing

## What is deliberately absent

No timer. No individual score. No lives. No leaderboard. No death.
