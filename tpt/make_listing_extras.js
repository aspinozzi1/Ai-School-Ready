#!/usr/bin/env node
/* TpT secondary listing images — Bright Scholar. 1000x1000 PNG each.
   Build: node tpt/make_listing_extras.js  ->  tpt/extras/*.png

   Three shapes: a "what's inside" checklist per kit, a "real pages" collage
   per kit (page renders in tpt/pinsrc/, printed straight off the shipping
   PDFs — the mockups are the real thing, never a stand-in), and one
   whole-staff licensing image shared by both paid listings.

   Same zero-dep chromium pipeline as make_covers.js; FONTS_CSS env for
   offline font rendering. */
const { execFileSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'tpt/extras');
const SRC = path.join(ROOT, 'tpt/pinsrc');
const CHROME = process.env.CHROME_BIN || '/opt/pw-browsers/chromium';

const FONTS = process.env.FONTS_CSS
  ? `file://${path.resolve(process.env.FONTS_CSS)}`
  : 'https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600&family=Nunito:wght@400;700;800&display=swap';

const INTERN = fs.readFileSync(path.join(ROOT, 'public/brand/ai-buddy.svg'), 'utf8');
const intern = (w, h, stem) => INTERN
  .replace('<svg ', `<svg width="${w}" height="${h}" `)
  .replace('<path d="M100 38V22" />', `<path d="M100 38V22" stroke="${stem}"/>`);
const b64 = f => 'data:image/png;base64,' + fs.readFileSync(path.join(SRC, f)).toString('base64');

const BASE = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: 1000px; height: 1000px; position: relative; overflow: hidden;
         font-family: 'Nunito', sans-serif; }
  .brand { position: absolute; left: 56px; top: 48px; display: flex; align-items: center; gap: 16px; }
  .brand span { font-family: 'Fredoka', sans-serif; font-weight: 600; font-size: 30px; color: #FFFDF8; }
  .brand span b { color: #17BEBB; font-weight: 600; }
  .badge { position: absolute; right: 56px; top: 48px; background: #FFC43D; color: #17293B;
           font-weight: 800; font-size: 23px; padding: 15px 32px; border-radius: 34px; }
  .bar { position: absolute; left: 0; right: 0; bottom: 0; height: 28px; display: flex; }
  .bar i { flex: 1; }
  .b1 { background: #E4572E; } .b2 { background: #FFC43D; } .b3 { background: #17BEBB; } .b4 { background: #2D6CB5; }`;

const brandRow = (accent = '#17BEBB') => `<div class="brand">${intern(46, 48, '#FFFDF8')}<span><b style="color:${accent}">AI-Ready</b> School</span></div>`;
const rainbow = () => `<div class="bar"><i class="b1"></i><i class="b2"></i><i class="b3"></i><i class="b4"></i></div>`;

/* ---- shape 1: what's inside ---- */
function whatsInside(kitName, accent, items) {
  return `<!doctype html><html><head><meta charset="utf-8">
<link href="${FONTS}" rel="stylesheet"><style>${BASE}
  body { background: #17293B; }
  .head { position: absolute; left: 56px; top: 170px; width: 880px; }
  .kicker { color: #FFC43D; font-weight: 800; font-size: 24px; letter-spacing: 2.4px; text-transform: uppercase; }
  h1 { margin-top: 18px; font-family: 'Fredoka', sans-serif; font-weight: 600; font-size: 56px;
       line-height: 1.1; color: #FFFDF8; }
  h1 em { font-style: normal; color: #17BEBB; }
  .list { position: absolute; left: 56px; top: 348px; width: 700px; display: grid; gap: 21px; }
  .item { display: flex; gap: 16px; align-items: flex-start; color: #FFFDF8;
          font-size: 27px; font-weight: 700; line-height: 1.25; }
  .item i { flex: none; width: 36px; height: 36px; border-radius: 50%; background: #17BEBB;
            color: #17293B; font-style: normal; font-weight: 800; font-size: 22px;
            display: flex; align-items: center; justify-content: center; margin-top: 1px; }
  .item b { color: #FFC43D; font-weight: 800; }
  .intern { position: absolute; right: 48px; bottom: 56px; }
</style></head><body>
  ${brandRow()}
  <div class="badge">9 files</div>
  <div class="head">
    <div class="kicker">What's inside</div>
    <h1>${kitName} <em>${accent}</em></h1>
  </div>
  <div class="list">${items.map(t => `<div class="item"><i>✓</i><span>${t}</span></div>`).join('')}</div>
  <div class="intern">${intern(190, 200, '#FFFDF8')}</div>
  ${rainbow()}
</body></html>`;
}

/* ---- shape 2: real pages collage ---- */
function realPages(field, shots) {
  return `<!doctype html><html><head><meta charset="utf-8">
<link href="${FONTS}" rel="stylesheet"><style>${BASE}
  body { background: ${field}; }
  h1 { position: absolute; left: 60px; top: 130px; width: 880px; text-align: center;
       font-family: 'Fredoka', sans-serif; font-weight: 600; font-size: 58px; color: #FFFFFF; }
  .sub { position: absolute; left: 150px; top: 216px; width: 700px; text-align: center;
         background: #FFFFFF; border: 5px solid #17293B; border-radius: 18px; padding: 13px 20px;
         font-size: 25px; font-weight: 800; color: #17293B; }
  .shot { position: absolute; border: 5px solid #17293B; border-radius: 10px; background: #fff;
          box-shadow: 0 22px 40px rgba(0,0,0,.32); overflow: hidden; }
  .shot img { display: block; width: 100%; }
  .s1 { width: 290px; left: 62px;  top: 388px; transform: rotate(-8deg); }
  .s2 { width: 330px; left: 335px; top: 344px; z-index: 3; }
  .s3 { width: 290px; left: 648px; top: 388px; transform: rotate(8deg); }
  .byline { position: absolute; left: 60px; bottom: 62px; width: 880px; text-align: center;
            font-size: 25px; font-weight: 800; color: #FFFFFF; }
</style></head><body>
  ${brandRow('#17293B')}
  <div class="badge">9 files</div>
  <h1>Real pages from the kit</h1>
  <div class="sub">Printed straight from the files you download</div>
  <div class="shot s1"><img src="${b64(shots[0])}"></div>
  <div class="shot s2"><img src="${b64(shots[1])}"></div>
  <div class="shot s3"><img src="${b64(shots[2])}"></div>
  <div class="byline">Built by two certified teachers</div>
  ${rainbow()}
</body></html>`;
}

/* ---- shape 3: whole-staff licensing ---- */
function license() {
  return `<!doctype html><html><head><meta charset="utf-8">
<link href="${FONTS}" rel="stylesheet"><style>${BASE}
  body { background: #17293B; }
  .head { position: absolute; left: 56px; top: 180px; width: 880px; }
  .kicker { color: #FFC43D; font-weight: 800; font-size: 24px; letter-spacing: 2.4px; text-transform: uppercase; }
  h1 { margin-top: 18px; font-family: 'Fredoka', sans-serif; font-weight: 600; font-size: 64px;
       line-height: 1.1; color: #FFFDF8; width: 760px; }
  .price { position: absolute; left: 56px; top: 430px; display: flex; align-items: baseline; gap: 22px; }
  .price b { font-family: 'Fredoka', sans-serif; font-weight: 600; font-size: 170px; color: #FFC43D;
             line-height: 1; }
  .price span { font-size: 33px; font-weight: 800; color: #FFFDF8; width: 330px; line-height: 1.25; }
  .list { position: absolute; left: 56px; top: 680px; width: 760px; display: grid; gap: 22px; }
  .item { display: flex; gap: 16px; color: #FFFDF8; font-size: 27px; font-weight: 700; line-height: 1.3; }
  .item i { flex: none; width: 36px; height: 36px; border-radius: 50%; background: #17BEBB;
            color: #17293B; font-style: normal; font-weight: 800; font-size: 22px;
            display: flex; align-items: center; justify-content: center; margin-top: 1px; }
  .intern { position: absolute; right: 48px; bottom: 56px; }
</style></head><body>
  ${brandRow()}
  <div class="badge">Whole staff?</div>
  <div class="head">
    <div class="kicker">For principals &amp; PD leads</div>
    <h1>Running this with your whole staff?</h1>
  </div>
  <div class="price"><b>$10</b><span>per additional teacher license</span></div>
  <div class="list">
    <div class="item"><i>✓</i><span>Buy once at $24, add teacher licenses at a flat $10 each</span></div>
    <div class="item"><i>✓</i><span>Purchase orders accepted through TpT for Schools</span></div>
    <div class="item"><i>✓</i><span>Both sessions together in the $39 AI PD Starter Pack</span></div>
  </div>
  <div class="intern">${intern(190, 200, '#FFFDF8')}</div>
  ${rainbow()}
</body></html>`;
}

const KIT_ITEMS = deck => [
  'Facilitator prep guide — a 15-minute read',
  'Word-for-word facilitator script',
  `<b>${deck}-slide editable PowerPoint</b> with speaker notes`,
  'Participant handout',
  'First-48-hours action sheet',
  '30-day implementation plan with PLC follow-ups',
  'Exit ticket that doubles as PD documentation',
  'Admin one-pager',
  'Full APA references, every statistic verified',
];

const IMAGES = [
  ['kit1-whats-inside', whatsInside('Kit 1 ·', 'AI Foundations & Safety', KIT_ITEMS(34))],
  ['kit1-real-pages',   realPages('#17BEBB', ['k1_script.png', 'k1_handout.png', 'k1_plan.png'])],
  ['kit2-whats-inside', whatsInside('Kit 2 ·', 'Prompting Basics', KIT_ITEMS(33))],
  ['kit2-real-pages',   realPages('#2D6CB5', ['k2_script.png', 'k2_handout.png', 'k2_plan.png'])],
  ['whole-staff-license', license()],
];

fs.mkdirSync(OUT, { recursive: true });
const tmp = fs.mkdtempSync(path.join(require('os').tmpdir(), 'extras-'));
for (const [name, markup] of IMAGES) {
  const page = path.join(tmp, name + '.html');
  fs.writeFileSync(page, markup);
  const out = path.join(OUT, name + '.png');
  execFileSync(CHROME, [
    '--headless=new', '--no-sandbox', '--disable-gpu', '--hide-scrollbars',
    '--force-device-scale-factor=1', '--window-size=1000,1200',
    '--virtual-time-budget=8000', `--screenshot=${out}`, `file://${page}`,
  ], { stdio: 'pipe' });
  execFileSync('python3', ['-c',
    `from PIL import Image; im = Image.open(${JSON.stringify(out)}); im.crop((0, 0, 1000, 1000)).save(${JSON.stringify(out)})`]);
  console.log('built', path.relative(ROOT, out));
}
