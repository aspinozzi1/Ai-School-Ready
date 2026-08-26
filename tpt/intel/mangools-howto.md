# Mangools MCP — how the research routines call it

Verified working 2026-08-26. Mangools exposes an **MCP endpoint** that
also answers plain JSON-RPC over HTTPS, so no MCP client setup is
needed — curl works in any session, including automated routines.

## Auth

Token lives in the `MANGOOLS_TOKEN` environment variable (owner sets it
in the cloud environment's Environment variables field, `.env` format:
`MANGOOLS_TOKEN=...`). Never commit the token to this repo.

## Call shape (proven)

    curl -sS -X POST https://mcp.mangools.com/mcp \
      -H "x-access-token: $MANGOOLS_TOKEN" \
      -H "Content-Type: application/json" \
      -H "Accept: application/json, text/event-stream" \
      -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{
           "name":"kwfinder_search_related_keywords",
           "arguments":{"kw":"<PHRASE>","limit":15}}}'

`method":"tools/list"` (no params) enumerates every available tool.

## Tools worth using

- `kwfinder_search_related_keywords` — [paid quota] related keywords
  with search_volume, 12-month volume, kd (difficulty, when cached),
  cpc, ppc. The workhorse.
- `kwfinder_get_keyword_details` — [paid quota] fresh difficulty for one
  keyword when `kd` came back null.
- `mangools_search_locations` — free, no auth; returns `location_id`
  values for US-specific lookups (default 0 = Anywhere).
- SERPChecker / SiteProfiler tools also appear in `tools/list` for
  competitor-page analysis.

## Pacing (measured 2026-08-26, not guessed)

The free tier allows roughly **two related-keyword calls per short
window**; the third returns HTTP 429 ("only a few requests per short
period") even with 45 seconds between calls. Measured: 2 succeeded,
2 rate-limited in one session.

**Therefore: budget 1–2 Mangools lookups per daily pulse**, which across
Mon–Sat still validates 8–12 phrases a week — enough for the weekly
product load when combined with the free meters. Never plan a session
around 3+ calls; if a 429 appears, stop calling and finish on TPT
Keywords data and WebSearch rather than retrying.

## Standing finding from the first live lookup (2026-08-26)

Seed "teacher of the deaf resources": related phrases return **~10
monthly Google searches** each ("deaf resources for teachers",
"resources for teachers of deaf students", kd ~30), and the seed itself
has no recorded volume.

Read that correctly — it is not a reason to skip the niche:
- **Google volume is the wrong meter for hyper-niche teacher phrases.**
  These buyers search *inside TPT* and on Pinterest, not Google. Mangools
  measures Google.
- Low Google volume + kd ~30 confirms **almost no competition** for the
  wording; it does not measure TPT demand.
- **Therefore:** use Mangools for broad teacher/parent phrases (sub
  plans, homeschool curriculum, parent communication, entrepreneurship
  for kids) where Google volume is meaningful; use TPT browse-page
  signals and Pinterest search suggestions for niche lines like Deaf
  Education. Record which meter a recommendation came from in every
  brief so titles aren't judged by the wrong yardstick.
