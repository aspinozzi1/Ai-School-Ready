# Kit 5 — Research log

Rewritten 2026-08-17 for the rebuilt kit ("Ask for one thing AI can't hand in").
Sources 1–6 were verified 2026-08-08 and re-confirmed 2026-08-17; source 7 (the AI
Assessment Scale) is new to this rebuild and was verified on 2026-08-17.

Every source below was confirmed to exist and to support the claim it backs. Where a
number is used in the kit, the exact figure, its scope, and its location are listed here.

| # | Source (APA) | Verified claim used in kit, with scope | Where used | Link |
|---|---|---|---|---|
| 1 | OpenAI. (2023). *New AI classifier for indicating AI-written text* (updated July 20, 2023). | OpenAI discontinued its own AI-text classifier "due to its low rate of accuracy": in its own published evaluation the classifier correctly identified **26%** of AI-written text as "likely AI-written" and incorrectly labeled human writing as AI **9%** of the time. Scope: OpenAI's own evaluation of English text; not an independent audit, and not a claim about any other vendor's tool. | Deck slides 5 and 25; script slides 5 and 25; handout ("The numbers, with their scope"); prep guide FAQ; admin one-pager | https://openai.com/index/new-ai-classifier-for-indicating-ai-written-text/ |
| 2 | Liang, W., Yuksekgonul, M., Mao, Y., Wu, E., & Zou, J. (2023). GPT detectors are biased against non-native English writers. *Patterns, 4*(7), 100779. | Seven commercial GPT detectors were run on **91 TOEFL essays** written by non-native English speakers and **88 US eighth-grade essays**. The TOEFL essays drew a **mean false-positive rate of 61.3%**; the US eighth-grade essays were classified near-perfectly. Scope: two small corpora, seven detectors, 2023 detector versions. The kit reports the study's own figures and does not generalize to any named current product. | Deck slides 6 and 25; script slides 6 and 25; handout; prep guide FAQ; admin one-pager | https://www.cell.com/patterns/fulltext/S2666-3899(23)00130-7 |
| 3 | Lee, V. R., Pope, D., Miles, S., & Zárate, R. C. (2024). Cheating in the age of generative AI: A high school survey study of cheating behaviors before and after the release of ChatGPT. *Computers and Education: Artificial Intelligence, 7*, 100253. | Anonymous surveys at **three high schools** (one public, one private, one charter), before and after ChatGPT's release. In both rounds roughly **60–70%** of students reported at least one dishonest behavior, and overall prevalence stayed **relatively stable**. Scope, stated out loud everywhere the figure appears: three schools, self-report, before/after comparison. Not a national sample and not causal proof. | Deck slide 7; script slide 7; handout; prep guide; admin one-pager | https://www.sciencedirect.com/science/article/pii/S2666920X24000560 |
| 4 | Stanford Graduate School of Education. (2023, October 31). *What do AI chatbots really mean for students and cheating?* | Denise Pope's account, from years of student surveys, that cheating tracks with pressure, disengagement, workload and not feeling respected far more than with access to technology. Verb matched to evidence: the kit says her research "points at" these factors; it does not claim a measured effect size. | Deck slide 8; script slide 8; handout; prep guide | https://ed.stanford.edu/news/what-do-ai-chatbots-really-mean-students-and-cheating |
| 5 | Pew Research Center. (2026, February 24). *How teens use and view AI.* | **54%** of U.S. teens say they use AI to help with schoolwork (survey of 1,458 teens, Sept–Oct 2025). Self-report. [Reused from Kit 1's verified log.] | Prep guide; admin one-pager (not used in the deck) | https://www.pewresearch.org/internet/2026/02/24/how-teens-use-and-view-ai/ |
| 6 | Doss, C. J., et al. (2025). *AI use in schools is quickly increasing but guidance lags behind* (RR-A4180-1). RAND Corporation. | In 2024–25, **53%** of ELA/math/science teachers and **54%** of their students used AI for school, while policy and guidance lagged adoption. [Reused from Kit 1's verified log.] | Prep guide; admin one-pager (not used in the deck) | https://www.rand.org/pubs/research_reports/RRA4180-1.html |
| 7 | Perkins, M., Furze, L., Roe, J., & MacVaugh, J. (2024). The Artificial Intelligence Assessment Scale (AIAS): A framework for ethical integration of generative AI in educational assessment. *Journal of University Teaching and Learning Practice, 21*(6). | **Prior-art credit, not a statistic.** A published five-level scale of permitted AI use on an assessment: "No AI," "AI Planning," "AI Collaboration," "Full AI," "AI Exploration." The kit credits the AIAS wherever level language appears and deliberately teaches one plain line instead of a scale. | Deck slide 12; script slide 12 stage direction; handout; prep guide FAQ; references | https://doi.org/10.53761/q3azde36 |

## How source 7 was verified (2026-08-17)

Direct page fetches to the publisher (open-publishing.org) returned HTTP 503 through this
environment's egress proxy, so verification was assembled from three independent live
sources that did resolve:

1. **arXiv record 2312.07086** returned the title, the full author list in order (Mike
   Perkins, Leon Furze, Jasper Roe, Jason MacVaugh) and the journal reference
   *Journal of University Teaching and Learning Practice*, 21(6), 2024.
2. **James Cook University's institutional repository record 87283** returned the same
   citation plus the DOI, **10.53761/q3azde36**.
3. **The University of Iowa Center for Teaching's AIAS page** returned the five level
   names and their one-line definitions as drawn from Table 1 of the article, and
   credited the scale to Perkins, Furze, Roe and MacVaugh (2024) under CC BY-NC-SA 4.0.

Existence, authorship, venue, year, DOI and the five-level structure are therefore
confirmed against live sources. The kit makes no numerical claim from this paper.

**Licence note that shapes how we use it:** the AIAS is published under CC BY-NC-SA 4.0.
This kit is a commercial product, so the scale is **cited and pointed to, never
reproduced**: no AIAS table, no adapted five-level chart, no relabeled derivative. The
References file tells schools that want a full scale to adopt the AIAS from the source.

## Claims softened to professional judgment (no source needed)

- The one move itself ("ask for one thing AI can't hand in") and the three places to
  find it (from this room · from this student · in front of you): practice-derived, and
  presented as our stance rather than as a finding.
- The suspected-use conversation structure (curiosity first, get specific, process
  evidence, teaching on a first offense): practice-derived.
- The four-second test (paste your own assignment into a chat tool and read what comes
  back): practice-derived. The tool response shown on deck slide 21 is labeled on the
  slide as an illustration of a typical response, not a captured transcript.
- The two demonstration paragraphs on deck slide 2 were written for this session. Neither
  is real student work.

## Claims deliberately avoided (could not verify, or contested)

- Any specific false-positive rate for a named commercial detector other than the figures
  Liang et al. published, and any claim about a current version of any detector product.
- Any claim that AI detectors are improving, or any vendor-to-vendor accuracy comparison.
- Any national or causal reading of the Lee/Pope prevalence figures.
- Any claim that the one move prevents AI misuse. The kit's honest-limits slide says the
  opposite: some students will still hand in AI work.

## Sources retired in this rebuild

- **International Center for Academic Integrity (2021), the six values.** The old kit used
  it on a "what integrity protects" slide that the rebuild cut. Nothing in the current kit
  cites it, so it is out of the log.
- **OpenAI Terms of use (13+, parental permission under 18).** The old kit used it inside
  the "pretend ban" trap slide, which the rebuild cut. No current claim depends on it.

Both remain verified and available if a future revision needs them.

**Environment note:** direct page fetches are blocked or rate-limited by this
environment's egress proxy for several publishers. Verification was done through live
web searches and the fetches that did resolve, confirming each source's existence,
publisher, authors, and the specific figures via multiple independent results. Owner
spot-check of the links above remains part of the audit.
