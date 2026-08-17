# Kit 6 — Research log

Rewritten 2026-08-17 for the from-scratch rebuild ("The message before the message").
Every source below was confirmed to exist and to support the claim it backs. Where a
number is used in the kit, the exact figure, its verb, and its location are listed here.
The kit uses only these five sources; nothing unverified was added.

| # | Source (APA) | Verified claim used in kit | Where it appears | Link |
|---|---|---|---|---|
| 1 | Kraft, M. A., & Rogers, T. (2015). The underutilized potential of teacher-to-parent communication: Evidence from a field experiment. *Economics of Education Review, 47*, 49–63. | Weekly individualized teacher-to-parent messages cut the share of students failing to earn the course credit from **15.8% to 9.3%** (a **41% reduction**). **Scope, which ships with the figure everywhere:** the experiment ran in a **summer credit-recovery program**, so participants were retaking a course they had already failed; and the study tested a **bundle** (individualized content, weekly frequency, improvement framing), so **no single ingredient is established as the active one**. | Deck slide 4 (the number and the scope sit in two cards side by side, so the scope cannot travel without it) and slide 27 (honest limits); script slides 4 and 27; handout "Why the ordinary note is not soft"; prep guide FAQ; admin one-pager | https://www.sciencedirect.com/science/article/abs/pii/S0272775715000497 |
| 2 | Merrimack College, & EdWeek Research Center. (2022). How teachers spend their time: A breakdown. *Education Week.* | The typical teacher works about **54 hours a week**, about **25** of which is actual teaching time. The survey estimated the work week from **11 task categories**, one of which is **"communication with parents or guardians."** | Deck slide 5; script slide 5; prep guide; admin one-pager | https://www.edweek.org/teaching-learning/how-teachers-spend-their-time-a-breakdown/2022/04 |
| 3 | Gallup, & Walton Family Foundation. (2025). *Teaching for tomorrow.* | Teachers who use AI weekly **reported** saving an **estimated 5.9 hours a week**. Survey self-report, not a measurement. The kit uses "reported" and "estimated" and says on the slide itself that the figure is self-estimated. | Deck slide 5 (card carries "self-estimated by survey respondents, not measured"); script slide 5; references | https://news.gallup.com/poll/691967/three-teachers-weekly-saving-six-weeks-year.aspx |
| 4 | U.S. Department of Justice, Civil Rights Division, & U.S. Department of Education, Office for Civil Rights. (2015). *Dear Colleague Letter: English learner students and limited English proficient parents.* | Schools must communicate meaningfully with limited-English-proficient parents, and machine translation of essential information requires review by a qualified person. **The letter does not itself forbid a teacher from using AI translation.** Used only to (a) support the district-channels clause and (b) mark the boundary between the law and our own stricter classroom rule. | Deck slide 12 (two cards, "our rule" and "what the law actually says," deliberately kept apart); script slide 12; prep guide FAQ; references | https://www.ed.gov/sites/ed/files/about/offices/list/ocr/letters/colleague-el-201501.pdf |
| 5 | U.S. Department of Education, Office of Educational Technology. (2023). *Artificial intelligence and the future of teaching and learning.* | Federal recommendation to keep "humans in the loop": educators inspect, question, and override AI outputs. | Deck slides 11 and 27; script slide 11; prep guide | https://www.ed.gov/sites/ed/files/documents/ai-report/ai-report.pdf |

## Figure deliberately NOT used (2026-08-17)

The rebuild spec's source line describes Merrimack/EdWeek as supporting "~2 hrs/week on
parent communication." **That figure could not be verified and is therefore not in the
kit.** Verification (targeted searches, 2026-08-17) confirmed the 54-hour week, the ~25
hours of teaching time, and the survey's 11 task categories including "communication with
parents or guardians," but no published breakdown reachable from this environment reports
an hours figure for that category; the full report PDF returned HTTP 403 through the
egress proxy. Per KIT_STANDARD ("claims that can't be sourced get softened to professional
judgment or cut"), the kit says instead: *"about 54 hours, about 25 of them actual teaching
time; communicating with families is one of eleven categories competing for the other 29."*
That is fully sourced and makes the same argument. **Owner action: if you hold the full
Merrimack report and it does state an hours figure for parent communication, tell us and
we will restore the sharper line.**

## Claims softened to professional judgment (no source needed)

- The **last-contact test** itself, and the claim that most rooms find "conferences, a long
  time ago, or never." Stated as facilitator experience, never as a finding.
- **The asymmetry**: that contact which is only ever bad news makes every message read as an
  accusation. Argued, not cited.
- **The specific-detail thesis**: that a note which survives the swap test is worth more than
  a warm generic one. This is our stance, stated as ours.
- **The four hard-message rules** (fact first, one ask, no promise you cannot deliver, know
  when to stop typing), and the 24-hour rule for anything written angry.
- **The human-only list** for high-stakes news (safety, discipline, grief, special-education
  decisions: call first).
- **The red line** that teachers never run family messages through public AI translation.
  Explicitly presented as AI-Ready School's own rule, stricter than the ED/DOJ letter.
- **Narrowing AI to a tone second read** on a hard message. Our design decision, supported in
  spirit by source 5 but not a finding from it.

## Claims deliberately avoided (out of scope or unverifiable)

- Any hours figure for parent communication specifically (see above).
- Any accuracy percentage for machine translation in school contexts. Translation is out of
  the kit's scope by owner instruction (2026-08-12); only the red line and the
  district-channels clause remain.
- Any claim that a specific translation tool or messaging platform is approved for school use.
- Any claim that AI-assisted positive notes have been shown to reproduce Kraft & Rogers'
  effect. The kit says the opposite: the study tested a bundle in a specific setting, and
  what we are teaching is the habit, priced differently.

**Environment note:** direct page fetches are blocked by this environment's egress proxy;
verification was done through targeted web searches confirming each source's existence,
publisher, authors, and the specific statistics via multiple independent result snippets.
Owner spot-check of the links above is part of the Batch 3 audit.
