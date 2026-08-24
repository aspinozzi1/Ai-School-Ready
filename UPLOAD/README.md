# TPT upload package

**Use `drops/` — one zip per listing, in numbered order.** Each drop
contains `LISTING.txt` (every form field, in the order TPT's "Upload New
Product" page presents them), the downloadable product file, and the
cover/thumbnail images named by form slot. Unzip a drop, work down
LISTING.txt, publish, next drop.

The other folders are the raw pieces the drops are built from
(via `node tpt/make_drops.js` reading `tpt/listings.json`):

| Folder | Contents |
|---|---|
| `drops/` | **8 upload-ready drop zips — start here** |
| `01-free/` | 6 free PDFs |
| `02-paid/` | Kit 1 / Kit 2 buyer zips (9 files each, editable decks) |
| `03-covers/` | 8 Main Cover images, 1000×1000 |
| `04-extra-images/` | kit thumbnails + whole-staff license image |

Ground rules, weekly production cycle, and the backlog: `tpt/PLAYBOOK.md`.
After both kits are live, build the $39 bundle (licenses $18) in TPT's
bundle tool from the two kit listings.
