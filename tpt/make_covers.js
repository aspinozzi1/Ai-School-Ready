#!/usr/bin/env node
/* TpT cover generator. 1000x1000 PNG per product, locked brand.
   Build: node tpt/make_covers.js   -> tpt/covers/*.png
   Matches the hand-built kit1/kit2/deid covers so the store reads as one set. */
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'tpt/covers');

const PRODUCTS = [
  { file: 'free-ten-prompts',      badge: 'Free',
    kicker: 'Free resource · grades K-12',
    title: '10 Copy-Paste AI Prompts', accent: 'for Teachers',
    lede: 'Ten prompts that work on the first try, for the tasks that eat your evenings.',
    chips: ['Print & go', 'No signup', '3 pages', 'K-12'] },
  { file: 'free-one-hard-rule',    badge: 'Free',
    kicker: 'Free resource · staff room poster',
    title: 'The One Hard Rule', accent: 'AI & Student Privacy',
    lede: 'The single rule every educator using AI must follow, sized for the copier and the wall.',
    chips: ['1-page poster', 'Print & go', 'Staff room', 'Free'] },
  { file: 'free-tool-safety',      badge: 'Free',
    kicker: 'Free resource · for any AI tool',
    title: 'AI Tool Safety Checklist', accent: 'Vet Any Tool in 5 Minutes',
    lede: 'What to check before you or your students touch a new AI tool.',
    chips: ['Checklist', 'Privacy', '5 minutes', 'Free'] },
  { file: 'free-parents-ai',       badge: 'Free',
    kicker: 'Free resource · family communication',
    title: 'Talking to Parents', accent: 'About AI',
    lede: 'Plain answers to the questions families actually ask, ready to send.',
    chips: ['Family comms', 'Print & go', 'Scripts', 'Free'] },
  { file: 'free-leader-readiness', badge: 'Free',
    kicker: 'Free resource · school leaders',
    title: 'AI Readiness Checklist', accent: 'for School Leaders',
    lede: 'Where your building actually stands, in one honest page.',
    chips: ['Leadership', 'Planning', '1 page', 'Free'] },
];

const NAVY = '#13293D', TEAL = '#2A9D8F', AMBER = '#F4A825', MIST = '#9FB2C2';

function html(p, logo) {
  return `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:1000px;height:1000px;background:${NAVY};font-family:Inter,sans-serif;position:relative;overflow:hidden}
  .top{display:flex;align-items:center;justify-content:space-between;padding:52px 56px 0}
  .brand{display:flex;align-items:center;gap:14px}
  .brand img{width:44px;height:40px}
  .brand span{font-size:26px;font-weight:700;color:#fff}
  .brand span b{color:${TEAL};font-weight:700}
  .badge{background:${AMBER};color:${NAVY};font-weight:700;font-size:23px;padding:14px 30px;border-radius:34px}
  .body{padding:78px 56px 0}
  .kicker{color:${AMBER};font-weight:700;font-size:25px;letter-spacing:2.4px;text-transform:uppercase;line-height:1.35}
  h1{font-size:78px;line-height:1.06;font-weight:800;color:#fff;margin-top:22px;letter-spacing:-1.5px}
  h1 em{font-style:normal;color:${TEAL};display:block}
  .lede{color:${MIST};font-size:31px;line-height:1.42;margin-top:30px;max-width:880px}
  .chips{display:flex;gap:13px;flex-wrap:wrap;margin-top:40px}
  .chip{border:2px solid #2A4A63;color:#fff;font-weight:600;font-size:22px;padding:14px 22px;border-radius:12px}
  .foot{position:absolute;bottom:0;left:0;right:0;background:${TEAL};padding:30px 56px;display:flex;
        align-items:center;justify-content:space-between}
  .foot b{color:#fff;font-size:26px;font-weight:700}
  .foot span{color:#EAF5F3;font-size:25px}
</style></head><body>
  <div class="top">
    <div class="brand"><img src="${logo}"><span><b>AI-Ready</b> School</span></div>
    <div class="badge">${p.badge}</div>
  </div>
  <div class="body">
    <div class="kicker">${p.kicker}</div>
    <h1>${p.title}<em>${p.accent}</em></h1>
    <div class="lede">${p.lede}</div>
    <div class="chips">${p.chips.map(c => `<div class="chip">${c}</div>`).join('')}</div>
  </div>
  <div class="foot"><b>Built by two certified teachers</b><span>AI-Ready School</span></div>
</body></html>`;
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const markPath = path.join(ROOT, 'public/brand/mark.svg');
  const mark = fs.readFileSync(markPath).toString().replace(/#13293D/g, '#FFFFFF');
  const logo = 'data:image/svg+xml;base64,' + Buffer.from(mark).toString('base64');

  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const page = await browser.newPage({ viewport: { width: 1000, height: 1000 } });
  for (const p of PRODUCTS) {
    await page.setContent(html(p, logo), { waitUntil: 'networkidle' });
    const out = path.join(OUT, p.file + '-cover.png');
    await page.screenshot({ path: out });
    console.log('built', path.relative(ROOT, out));
  }
  await browser.close();
})();
