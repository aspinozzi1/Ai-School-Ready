# TPT Keywords worksheet — the primary meter

TPT's seller dashboard now has a **TPT Keywords** tab
(teacherspayteachers.com/Dashboard/Site-Search-Analytics) showing what
buyers search *inside TPT*: 30-day search count, a **Resources** count
(how many products compete for that phrase), an Opportunity rating
(Challenging / Moderate / Promising / Strong), and a related-keywords
table of phrases educators search in the same sitting.

**There is no API or MCP for this tool.** The owner runs the lookups by
hand and pastes the results (a screenshot is fine) into the session.

## Meter hierarchy (owner directive 2026-08-26)

1. **TPT Keywords — PRIMARY.** It measures the actual marketplace we
   sell in. Its Resources count is the real competition number: the
   "under ~3,000 competitors" rule maps to the **`<1K` and `1K–3K`**
   buckets. Its Opportunity rating is TPT's own verdict.
2. **Mangools/KWFinder — SECONDARY (Google demand).** Useful for broad
   phrases and for Pinterest/Google discovery copy; misleading for
   hyper-niche teacher phrases (see mangools-howto.md).
3. **WebSearch / browse pages — context** (formats, seasonality).

Every validation row records which meter produced it. A phrase that
looks dead on Google can be strong on TPT, and vice versa.

## The weekly loop

- **Saturday pulse** writes `tpt/intel/lookups-YYYY-Www-monday.md` — the
  term list for Monday's planned products — and SENDS it to the owner.
- Owner runs the lookups in the TPT Keywords tab, pastes results back.
- **Sunday deep dive** folds whatever came back into the Monday brief's
  validation table (TPT numbers outrank Google numbers).
- **Monday pulse** writes `lookups-YYYY-Www-wednesday.md` for the
  Wednesday lanes and sends it; **Tuesday compile** folds it in.
- Anything not returned in time: proceed on the other meters and mark
  the row `meter: google/context only` in the brief.

## What to ask for, per term

Search count (30 days) · Resources bucket · Opportunity rating · and the
top few related keywords with their own numbers — the related list is
where the best long-tail titles come from.

## Standing data captured from the owner's dashboard (2026-08-26)

| Phrase | Searches (30d) | Resources | Opportunity |
|---|---|---|---|
| digital citizenship | 2,553 | 3K–8K | **Strong** |
| ai | 848 | 40K–75K | Moderate |
| artificial intelligence | 702 | 3K–8K | **Promising** |
| media literacy | 654 | 20K–40K | Moderate |
| ai ethics | 101 | **1K–3K** | Moderate |
| ai prompts | 101 | 3K–8K | Moderate |
| ai literacy middle school | 8 | 3K–8K | Challenging |
| ai grade 7 | 7 | 3K–8K | Challenging |
| emergency ai sub plans | 5 | **< 1K** | Moderate |
| ai bellringers | 4 | 3K–8K | Challenging |

**Readings that should steer production:**

- **"digital citizenship" (2,553 searches, Strong) is the biggest signal
  in this data.** It is an established, high-traffic TPT category that
  our AI-safety content already belongs to — the privacy posters, the
  one-hard-rule material, "Don't Type That", the fact-checking lesson.
  Retag and retitle toward digital citizenship wording where honest, and
  build for that phrase deliberately. This is likely a bigger door into
  our catalog than "AI" itself.
- **"artificial intelligence" (702, Promising) beats bare "ai"** (848 but
  40K–75K competitors). Spell it out in titles/tags, don't rely on "AI".
- **"ai ethics" sits in the 1K–3K bucket** — genuinely low competition
  with real searches. A strong candidate for a dedicated product.
- **Hyper-specific AI phrases are traps**: "ai bellringers", "ai grade 7",
  "ai literacy middle school" all show single-digit searches against
  3K–8K resources = Challenging. Don't build for them.
- **"emergency ai sub plans": 5 searches but < 1K resources.** Tiny
  demand, near-zero competition — fine as a free funnel item (we have
  one), never as a paid bet.
- Lesson that generalizes: **qualify a big phrase, don't invent a niche
  one.** Ride "digital citizenship" and "artificial intelligence"; skip
  invented compounds nobody types.
