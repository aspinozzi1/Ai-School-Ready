# TPT upload package

**Use `drops/` — one zip per listing, in numbered order.** Each drop
contains `LISTING.txt` (every form field, in the order TPT's "Upload New
Product" page presents them), the downloadable product file, the
sneak-peek `5-PREVIEW.pdf`, and the cover/thumbnail images named by form
slot. Unzip a drop, work down LISTING.txt, publish, next drop.

Current state:

- **drops 01–08** — the initial launch (6 frees + Kit 1 + Kit 2).
  Published 2026-08-23; keep for re-upload/reference.
- **drops 09–15** — the Week 1 Monday batch (2026-08-24): Back-to-School
  AI Setup Pack $8 (09), five new frees (10–14: AI Vocabulary · 10-Minute
  AI Habit · Don't Type That poster · Emergency Sub Plans · AI or
  Teacher? poster), and Parent Message Makeovers $12 (15).
- **drops 16–23** — the Homeschool AI + Young Entrepreneurs line
  (2026-08-24): five frees (What Is AI? Unplugged · Family AI Rules
  poster · Homeschool AI Quick-Start · My First Business Idea · Is It
  True?) and three paid (Homeschool AI Planning Pack $8 · My First
  Business $8 · Launch It $10). Two new custom categories to create
  once in the store: "Homeschool AI" and "Young Entrepreneurs".
- **2026-08-24 corrections to the already-published BTS listing (09):**
  the product PDF, preview, and both thumbnails were rebuilt after a
  page-break fix (the family letter no longer splits across pages). On
  the live listing, replace the Downloadable File, the Preview, and both
  Thumbnails from the new drop-09 zip — and change Multiple Licenses
  from $10 to **$4** (a license price must sit below the product price;
  now about half price on every paid listing: $4 on $8, $6 on $12,
  $10 on $24).

The other folders are the raw pieces the drops are built from
(via `node tpt/make_drops.js` reading `tpt/listings.json`):

| Folder | Contents |
|---|---|
| `drops/` | **upload-ready drop zips — start here** |
| `01-free/` | free PDFs (buyer-facing files) |
| `02-paid/` | kit buyer zips + paid pack PDFs |
| `03-covers/` | Main Cover images, 1000×1000 |
| `04-extra-images/` | paid-product thumbnails + whole-staff license image |

Ground rules, the Monday batch cycle, and the Year-1 batch calendar:
`tpt/PLAYBOOK.md`. After both kits are live, build the $39 bundle
(licenses $18) in TPT's bundle tool from the two kit listings.
