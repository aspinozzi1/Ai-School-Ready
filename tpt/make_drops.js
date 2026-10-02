#!/usr/bin/env node
/* Drop packager — one upload-ready zip per TPT listing.
   Build: node tpt/make_drops.js  ->  UPLOAD/drops/drop-NN-<id>.zip

   Reads tpt/listings.json (single source of truth). Each drop mirrors the
   TPT "Upload New Product" form top to bottom:
     LISTING.txt          every field, in form order, paste-ready
     <product file>       Files -> Downloadable File (keeps its buyer-facing name).
                          TPT's Downloadable File box takes ONE file, so a
                          product that ships an app alongside its PDF is zipped
                          into a single <product>.zip here and that zip is what
                          gets uploaded.
     5-PREVIEW.pdf        Files -> Product Previews -> Preview (sneak-peek flipbook)
     2-MAIN-COVER.png     Thumbnails -> Main Cover
     3-THUMBNAIL-1.png    Thumbnails -> Thumbnail (paid kits only)
     4-THUMBNAIL-2.png    Thumbnails -> Thumbnail (paid kits only)
   No npm deps: zips via the system `zip` binary. */
const { execFileSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'UPLOAD/drops');
const { listings } = JSON.parse(fs.readFileSync(path.join(ROOT, 'tpt/listings.json'), 'utf8'));

const thumbSlot = i => (i < 2 ? 3 + i : 4 + i);   // 3, 4, then 6 onward: slot 5 is the preview

/* The one file the buyer downloads. Null when the product already is the whole
   download; otherwise the name of the bundle zip that holds the PDF and every
   extraFiles app together, because TPT's Downloadable File box takes exactly
   one file and a second one simply never reaches the buyer. A product that is
   already a .zip keeps its own name — the extras go inside it rather than into
   a zip of a zip, which nobody can open on a school laptop. */
function bundleName(l) {
  if (!l.product || !(l.extraFiles || []).length) return null;
  const base = path.basename(l.product);
  return base.toLowerCase().endsWith('.zip') ? base : base.replace(/\.[^.]+$/, '') + '.zip';
}

function listingTxt(l) {
  const previewLine = l.product
    ? `Preview ............ 5-PREVIEW.pdf   <- upload in the LEFT "Preview" box (up to 30 MB)
Video Preview ...... skip (the right box)`
    : 'Skip both boxes: a bundle shows its component listings\' previews.';
  /* TPT's Downloadable File box accepts one file. A product that ships an app
     alongside its PDF therefore arrives here as a single bundle zip, and the
     line names that zip and then what is inside it — the earlier version named
     both files and told the uploader to upload both, which the form will not
     let anybody do. */
  const productName = l.product
    ? (bundleName(l)
        ? [`${bundleName(l)}   (in this zip — upload this ONE file and nothing else)`,
           '',
           '   Inside it, for your reference:',
           ...[l.product].concat(l.extraFiles || []).map(f => `     ${path.basename(f)}`)].join('\n')
        : `${path.basename(l.product)}   (in this zip)`)
    : `none — build this in TPT's bundle tool from: ${l.bundleOf.join(' + ')}`;
  /* List every thumbnail the listing actually has. It used to hardcode two,
     so a third would sit unnamed in the zip and never get uploaded. */
  const thumbs = l.thumbnails.length
    ? ['Main Cover ......... 2-MAIN-COVER.png']
        .concat(l.thumbnails.map((_, i) =>
          `Thumbnail ${i + 1} ........ ${thumbSlot(i)}-THUMBNAIL-${i + 1}.png`))
        .join('\n')
    : `Main Cover ......... 2-MAIN-COVER.png
Thumbnails ......... leave empty`;
  const price = l.price === 0
    ? `Tick "Free Resource"`
    : `Price .............. $${l.price}.00
Multiple Licenses .. $${l.licenses}.00   <- change from TPT's default; this makes staff buys happen
Tax Code ........... standard digital download option in the dropdown`;
  return `==================================================================
${l.name.toUpperCase()}
Fields below follow the TPT "Upload New Product" form top to bottom.
==================================================================

--- NAME > TITLE ---

${l.title}

--- FILES > DOWNLOADABLE FILE ---

${productName}

--- FILES > PRODUCT PREVIEWS ---

${previewLine}

--- THUMBNAILS ("Upload thumbnails now") ---

${thumbs}

--- DESCRIPTION (paste as-is) ---

${l.description}

--- PRICE ---

${price}

--- CATEGORIES ---

Grade Level ........ ${l.grades.join(', ')}
Subject Area (max 3) ${l.subjects.join(' · ')}   <- pick closest labels in the dropdown
Tag (max 6) ........ ${l.tags.join(', ')}
Format ............. ${l.formats.join(', ')}
Custom Category .... ${l.customCategory}   <- create once in your store, reuse after

--- EDUCATION STANDARDS ---

Skip.
${l.easelSetup ? `
--- EASEL (after publishing) ---

This product suits a digital Easel version (students type into it
online, and the listing earns the "Easel Activity included" badge).
Once the listing is live, follow 6-EASEL-SETUP.txt in this zip —
about 10 minutes in TPT's own editor, one time.
` : ''}`;
}

fs.mkdirSync(OUT, { recursive: true });
for (const l of [...listings].sort((a, b) => a.order - b.order)) {
  const stage = fs.mkdtempSync(path.join(os.tmpdir(), 'drop-'));
  fs.writeFileSync(path.join(stage, 'LISTING.txt'), listingTxt(l));
  const bundle = bundleName(l);
  if (l.product && !bundle) {
    fs.copyFileSync(path.join(ROOT, l.product), path.join(stage, path.basename(l.product)));
  } else if (bundle) {
    /* One download. The PDF and every app file go into a single zip, flat, so
       the buyer unzips once and has everything. A product that is already a zip
       gets the extras added to a copy of it rather than wrapped again. */
    const bundlePath = path.join(stage, bundle);
    const parts = [l.product].concat(l.extraFiles || []);
    if (path.basename(l.product).toLowerCase().endsWith('.zip')) {
      fs.copyFileSync(path.join(ROOT, l.product), bundlePath);
      execFileSync('zip', ['-qj', bundlePath, ...(l.extraFiles || []).map(f => path.join(ROOT, f))]);
    } else {
      execFileSync('zip', ['-qj', bundlePath, ...parts.map(f => path.join(ROOT, f))]);
    }
  }
  if (l.product) fs.copyFileSync(path.join(ROOT, `tpt/previews/${l.id}-preview.pdf`), path.join(stage, '5-PREVIEW.pdf'));
  if (l.easelSetup) fs.copyFileSync(path.join(ROOT, l.easelSetup), path.join(stage, '6-EASEL-SETUP.txt'));
  fs.copyFileSync(path.join(ROOT, l.cover), path.join(stage, '2-MAIN-COVER.png'));
  l.thumbnails.forEach((t, i) =>
    fs.copyFileSync(path.join(ROOT, t), path.join(stage, `${thumbSlot(i)}-THUMBNAIL-${i + 1}.png`)));
  const zipName = `drop-${String(l.order).padStart(2, '0')}-${l.id}.zip`;
  const zipPath = path.join(OUT, zipName);
  fs.rmSync(zipPath, { force: true });
  execFileSync('zip', ['-qj', zipPath, ...fs.readdirSync(stage).map(f => path.join(stage, f))]);
  console.log('built', path.relative(ROOT, zipPath));
}
