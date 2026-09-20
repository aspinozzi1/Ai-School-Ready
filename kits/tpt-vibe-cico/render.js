#!/usr/bin/env node
/* Render build-cico.html to a page-perfect PDF, one .sheet at a time.

   Why not kits/tooling/build_pdf.js: rendering all 25 .sheet pages in a
   single Chromium print job sometimes makes the print engine emit a
   stray blank trailing page -- a sub-pixel content-height rounding
   artifact, not a real overflow (every .sheet reports 0 scrollHeight
   overflow in the live DOM). When that stray page appears, its footer
   text gets misattributed onto page 1 of that same print job, which is
   a real visual duplicate-footer defect (caught by check_overlap.py).
   Rendering each .sheet as its own single-page PDF avoids the
   misattribution -- a stray blank page can still appear per file, but
   it renders genuinely empty and this script drops it before merging.

   Usage: node kits/tpt-vibe-cico/render.js
   Output: kits/tpt-vibe-cico/build-cico.pdf */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const DIR = __dirname;
const SRC = path.join(DIR, 'src');
const OUT_HTML = path.join(SRC, 'build-cico.html');
const OUT_PDF = path.join(DIR, 'build-cico.pdf');
const TMP = fs.mkdtempSync('/tmp/cico-render-');

(async () => {
  execFileSync('node', [path.join(SRC, 'emit.js'), OUT_HTML]);

  const fs2 = require('fs');
  const B2 = require(path.join(SRC, 'b1.js'));
  require(path.join(SRC, 'b2.js'));
  require(path.join(SRC, 'b3.js'));
  require(path.join(SRC, 'b4.js'));
  require(path.join(SRC, 'b5.js'));

  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const page = await browser.newPage();
  const pdfFiles = [];
  for (let i = 0; i < B2.pages.length; i++) {
    const n = String(i + 1).padStart(2, '0');
    const htmlPath = path.join(TMP, `p${n}.html`);
    const pdfPath = path.join(TMP, `p${n}.pdf`);
    fs2.writeFileSync(htmlPath, `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>p</title><style>${B2.css}</style></head><body>${B2.pages[i]}</body></html>`);
    await page.goto('file://' + htmlPath, { waitUntil: 'networkidle' });
    await page.pdf({ path: pdfPath, width: '8.5in', height: '11in', printBackground: true, margin: { top: 0, bottom: 0, left: 0, right: 0 } });
    pdfFiles.push(pdfPath);
  }
  await browser.close();

  execFileSync('python3', ['-c', `
import pypdf, sys
w = pypdf.PdfWriter()
for f in sys.argv[1:]:
    r = pypdf.PdfReader(f)
    w.add_page(r.pages[0])
with open(${JSON.stringify(OUT_PDF)}, 'wb') as fh:
    w.write(fh)
print('merged', len(w.pages), 'pages ->', ${JSON.stringify(OUT_PDF)})
`, ...pdfFiles], { stdio: 'inherit' });

  fs.rmSync(TMP, { recursive: true, force: true });
})();
