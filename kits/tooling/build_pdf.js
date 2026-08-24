#!/usr/bin/env node
/* Render kit HTML sources to Letter-size PDFs with Chromium.
   Usage: node kits/tooling/build_pdf.js <src.html> [more.html ...]
   Output: same basename, .pdf, in the html file's parent's parent (kit dir). */
const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const files = process.argv.slice(2);
  if (!files.length) { console.error('usage: build_pdf.js <src.html> ...'); process.exit(1); }
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const page = await browser.newPage();
  for (const f of files) {
    const abs = path.resolve(f);
    const out = path.join(path.dirname(path.dirname(abs)), path.basename(abs, '.html') + '.pdf');
    await page.goto('file://' + abs, { waitUntil: 'networkidle' });
    await page.pdf({
      path: out,
      width: '8.5in', height: '11in',
      printBackground: true,
      margin: { top: 0, bottom: 0, left: 0, right: 0 },
    });
    console.log('built', path.relative(process.cwd(), out));
  }
  await browser.close();
})();
