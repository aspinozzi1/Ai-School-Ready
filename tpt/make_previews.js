#!/usr/bin/env node
/* Sneak-peek preview PDFs — one per TPT listing, for the form's
   "Product Previews → Preview" slot (the flipbook buyers see pre-purchase).
   Build: node tpt/make_previews.js  ->  tpt/previews/<id>-preview.pdf

   Shape per listing (from tpt/listings.json):
   - paid kit (zip product): sneak cover → 3 real pages with a diagonal
     SNEAK PEEK band → "what's inside" close with the license line.
     Real-page renders come from tpt/pinsrc/ (previewShots).
   - free (pdf product): sneak cover → up to 2 real pages with a quiet
     footer band (it's free; the content can stay readable).

   Zero npm deps: pages are Letter-sized HTML printed with the preinstalled
   chromium (--print-to-pdf honors @page size); free-product pages are
   rendered to PNG with python3/pymupdf. FONTS_CSS env for offline fonts. */
const { execFileSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'tpt/previews');
const SRC = path.join(ROOT, 'tpt/pinsrc');
const CHROME = process.env.CHROME_BIN || '/opt/pw-browsers/chromium';
const { listings } = JSON.parse(fs.readFileSync(path.join(ROOT, 'tpt/listings.json'), 'utf8'));

const FONTS = process.env.FONTS_CSS
  ? `file://${path.resolve(process.env.FONTS_CSS)}`
  : 'https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600&family=Nunito:wght@400;700;800&display=swap';

const INTERN = fs.readFileSync(path.join(ROOT, 'public/brand/ai-buddy.svg'), 'utf8');
const intern = (w, h) => INTERN
  .replace('<svg ', `<svg width="${w}" height="${h}" `)
  .replace('<path d="M100 38V22" />', '<path d="M100 38V22" stroke="#FFFDF8"/>');
const b64 = f => 'data:image/png;base64,' + fs.readFileSync(f).toString('base64');

const CSS = `
  @page { size: letter; margin: 0; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Nunito', sans-serif; }
  .page { width: 8.5in; height: 11in; page-break-after: always; position: relative; overflow: hidden; }
  .page:last-child { page-break-after: auto; }
  .ink { background: #17293B; }
  .brand { position: absolute; left: 0.55in; top: 0.5in; display: flex; align-items: center; gap: 0.16in; }
  .brand span { font-family: 'Fredoka', sans-serif; font-weight: 600; font-size: 21pt; color: #FFFDF8; }
  .brand span b { color: #17BEBB; font-weight: 600; }
  .bar { position: absolute; left: 0; right: 0; bottom: 0; height: 0.24in; display: flex; }
  .bar i { flex: 1; }
  .b1 { background: #E4572E; } .b2 { background: #FFC43D; } .b3 { background: #17BEBB; } .b4 { background: #2D6CB5; }
  .peek-badge { position: absolute; right: 0.55in; top: 0.5in; background: #FFC43D; color: #17293B;
                font-weight: 800; font-size: 15pt; padding: 0.13in 0.3in; border-radius: 0.3in; }
  .cover-body { position: absolute; left: 0.55in; top: 2.5in; width: 7.4in; }
  .kicker { color: #FFC43D; font-weight: 800; font-size: 15pt; letter-spacing: 2.4px; text-transform: uppercase; }
  h1 { margin-top: 0.22in; font-family: 'Fredoka', sans-serif; font-weight: 600; font-size: 40pt;
       line-height: 1.1; color: #FFFDF8; }
  .cover-sub { margin-top: 0.3in; font-size: 17pt; font-weight: 700; color: #C9D6E2; width: 5.6in; line-height: 1.4; }
  .cover-intern { position: absolute; right: 0.5in; bottom: 0.75in; }
  .shot { position: absolute; inset: 0; }
  .shot img { width: 8.5in; height: 11in; object-fit: cover; display: block; }
  .diag { position: absolute; left: -1in; right: -1in; top: 4.7in; transform: rotate(-16deg);
          background: rgba(255, 196, 61, 0.93); text-align: center; padding: 0.16in 0;
          font-family: 'Fredoka', sans-serif; font-weight: 600; font-size: 24pt; color: #17293B; }
  .strip { position: absolute; left: 0; right: 0; bottom: 0; background: #17293B; color: #FFFDF8;
           text-align: center; padding: 0.11in 0; font-weight: 800; font-size: 11.5pt; }
  .strip b { color: #FFC43D; }
  .inside-list { position: absolute; left: 0.55in; top: 2.6in; width: 6.6in; display: grid; gap: 0.19in; }
  .item { display: flex; gap: 0.16in; color: #FFFDF8; font-size: 15.5pt; font-weight: 700; line-height: 1.3; align-items: flex-start; }
  .item i { flex: none; width: 0.32in; height: 0.32in; border-radius: 50%; background: #17BEBB;
            color: #17293B; font-style: normal; font-weight: 800; font-size: 13pt;
            display: flex; align-items: center; justify-content: center; margin-top: 0.02in; }
  .item b { color: #FFC43D; }
  .license { position: absolute; left: 0.55in; bottom: 1.3in; width: 5.9in; background: #FFC43D;
             color: #17293B; border-radius: 0.16in; padding: 0.22in 0.28in; font-weight: 800; font-size: 14pt; line-height: 1.35; }
  .close-intern { position: absolute; right: 0.5in; bottom: 0.65in; }`;

const brand = () => `<div class="brand">${intern(42, 44)}<span><b>AI-Ready</b> School</span></div>`;
const rainbow = () => `<div class="bar"><i class="b1"></i><i class="b2"></i><i class="b3"></i><i class="b4"></i></div>`;

const coverPage = (l, sub) => `<div class="page ink">
  ${brand()}
  <div class="peek-badge">Sneak peek</div>
  <div class="cover-body">
    <div class="kicker">Flip through before you download</div>
    <h1>${l.name}</h1>
    <div class="cover-sub">${sub}</div>
  </div>
  <div class="cover-intern">${intern(200, 210)}</div>
  ${rainbow()}
</div>`;

const kitSample = (png, n, total, unit) => `<div class="page">
  <div class="shot"><img src="${b64(png)}"></div>
  <div class="diag">SNEAK PEEK · ${unit}</div>
  <div class="strip">Real page ${n} of ${total} shown · printed straight from the files you download · <b>AI-Ready School</b></div>
</div>`;

const freeSample = png => `<div class="page">
  <div class="shot"><img src="${b64(png)}"></div>
  <div class="strip">Sneak peek of the free download · <b>AI-Ready School</b></div>
</div>`;

const insidePage = l => `<div class="page ink">
  ${brand()}
  <div class="peek-badge">${l.filesBadge || '9 files'}</div>
  <div class="cover-body" style="top:1.7in"><div class="kicker">${l.insideHeading || "What's inside the full kit"}</div>
    <h1 style="font-size:30pt">${l.name}</h1></div>
  <div class="inside-list" style="top:3.5in">
    ${l.previewInside.map(t => `<div class="item"><i>✓</i><span>${t}</span></div>`).join('')}
  </div>
  <div class="license">Running it with your whole staff? Additional teacher licenses are a flat $10, and we accept purchase orders through TpT for Schools.</div>
  <div class="close-intern">${intern(150, 158)}</div>
  ${rainbow()}
</div>`;

fs.mkdirSync(OUT, { recursive: true });
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'previews-'));
for (const l of [...listings].sort((a, b) => a.order - b.order)) {
  if (!l.product) continue; // bundles: TPT shows component previews
  let pages;
  if (l.previewShots) {
    const unit = l.previewUnit || 'the full kit is 9 files';
    const shots = l.previewShots.map(f => path.join(SRC, f));
    pages = [coverPage(l, 'Three real pages, straight off the shipping files, plus everything the full download includes.'),
      ...shots.map((p, i) => kitSample(p, i + 1, shots.length, unit)), insidePage(l)];
  } else {
    // free pdf: render up to 2 real pages at 2x
    const rendered = execFileSync('python3', ['-c', `
import pymupdf, sys
d = pymupdf.open(${JSON.stringify(path.join(ROOT, l.product))})
for i in range(min(2, len(d))):
    p = ${JSON.stringify(tmp)} + '/${l.id}-p%d.png' % i
    d[i].get_pixmap(matrix=pymupdf.Matrix(2, 2)).save(p)
    print(p)`]).toString().trim().split('\n');
    pages = [coverPage(l, 'The real pages, exactly as you’ll download them. Free, print-ready, no signup.'),
      ...rendered.map(freeSample)];
  }
  const htmlPath = path.join(tmp, l.id + '.html');
  fs.writeFileSync(htmlPath, `<!doctype html><html><head><meta charset="utf-8">
<link href="${FONTS}" rel="stylesheet"><style>${CSS}</style></head><body>${pages.join('\n')}</body></html>`);
  const out = path.join(OUT, l.id + '-preview.pdf');
  execFileSync(CHROME, ['--headless=new', '--no-sandbox', '--disable-gpu', '--no-pdf-header-footer',
    '--virtual-time-budget=10000', `--print-to-pdf=${out}`, `file://${htmlPath}`], { stdio: 'pipe' });
  console.log('built', path.relative(ROOT, out));
}
