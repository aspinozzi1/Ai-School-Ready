#!/usr/bin/env node
/* Pinterest pin generator — 1000x1500 PNG per pin.
   Build: node tpt/make_pins.js  ->  tpt/pins/*.png

   Aesthetic follows the TpT-Pinterest vernacular: one saturated flat colour
   field, heavy outlined display type, scattered doodle line art, real product
   pages shown at an angle so a buyer can see what they actually get, a page
   count badge, and a call to action. Page images come from tpt/pinsrc/, which
   is rendered straight off the shipping PDFs — the mockups are the real thing,
   never a stand-in. */
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'tpt/pins');
const SRC = path.join(ROOT, 'tpt/pinsrc');

const font = (fam, file) =>
  `@font-face{font-family:'${fam}';src:url('file://${path.join(ROOT, 'node_modules/@fontsource', file)}') format('woff2');}`;

const b64 = f => 'data:image/png;base64,' + fs.readFileSync(path.join(SRC, f)).toString('base64');

/* Palettes lifted from what performs in this niche: one loud field colour,
   near-black ink for the outline, cream for paper. */
const P = {
  grass:  { field: '#34A853', deep: '#1E7038', cta: '#FFD43B', ctaInk: '#17293B' },
  turq:   { field: '#17BEBB', deep: '#0E8C8A', cta: '#FFD43B', ctaInk: '#17293B' },
  coral:  { field: '#F2643D', deep: '#C4421F', cta: '#FFE08A', ctaInk: '#17293B' },
  grape:  { field: '#7B5EA7', deep: '#573F7C', cta: '#FFD43B', ctaInk: '#17293B' },
};

const PINS = [
  { file: 'kit1-pin-a', pal: P.grass,
    top: 'Run AI training', mid: 'for your whole staff', big: 'WITHOUT A CONSULTANT',
    sub: 'Word-for-word script · 34 editable slides · handouts',
    pages: '9 files', cta: 'SEE IT ON TPT',
    shots: ['k1_cover.png', 'k1_handout.png', 'k1_script.png'] },
  { file: 'kit1-pin-b', pal: P.turq,
    top: 'The one AI rule', mid: 'every teacher needs', big: 'STUDENT PRIVACY PD',
    sub: 'A complete 45-60 minute staff session you can present cold',
    pages: '9 files', cta: 'SEE IT ON TPT',
    shots: ['k1_handout.png', 'k1_cover.png', 'k1_plan.png'] },
  { file: 'kit1-pin-c', pal: P.coral,
    top: 'Staff meeting', mid: 'is on Thursday', big: 'AND YOU HAVE NOTHING',
    sub: 'Open the script. Read it out loud. That is the whole prep.',
    pages: '9 files', cta: 'SEE IT ON TPT',
    shots: ['k1_script.png', 'k1_cover.png', 'k1_handout.png'] },
];

/* Hand-drawn-feel doodles, scattered low-contrast on the field. Line art only:
   filled shapes fight the product photos for attention. */
const doodle = (x, y, r, s, d) =>
  `<svg style="position:absolute;left:${x}px;top:${y}px;transform:rotate(${r}deg);opacity:.22"
        width="${s}" height="${s}" viewBox="0 0 100 100" fill="none"
        stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;

const SPARK = '<path d="M50 12 L58 42 L88 50 L58 58 L50 88 L42 58 L12 50 L42 42 Z"/>';
const STAR  = '<path d="M50 15 L61 40 L88 43 L68 62 L74 88 L50 75 L26 88 L32 62 L12 43 L39 40 Z"/>';
const BULB  = '<path d="M35 42a15 15 0 1 1 30 0c0 10-8 13-8 22H43c0-9-8-12-8-22Z"/><path d="M43 76h14"/>';
const CHAT  = '<path d="M18 30h64v40H52L34 84V70H18Z"/>';
const CHECK = '<path d="M22 52 42 72 80 28"/>';
const PENCIL= '<path d="M22 78 30 56 68 18l14 14-38 38-22 8Z"/><path d="M62 24l14 14"/>';

function html(p) {
  const shots = p.shots;
  return `<!doctype html><html><head><meta charset="utf-8"><style>
${font('Luckiest', 'luckiest-guy/files/luckiest-guy-latin-400-normal.woff2')}
${font('Baloo', 'baloo-2/files/baloo-2-latin-700-normal.woff2')}
${font('Baloo8', 'baloo-2/files/baloo-2-latin-800-normal.woff2')}
*{margin:0;padding:0;box-sizing:border-box}
body{width:1000px;height:1500px;background:${p.pal.field};font-family:Baloo,sans-serif;
     position:relative;overflow:hidden}
.doodles{position:absolute;inset:0}
.head{position:relative;padding:66px 60px 0;text-align:center}
.top{font-family:Baloo8,sans-serif;font-size:52px;color:#fff;line-height:1.06;text-shadow:0 3px 0 rgba(0,0,0,.18)}
.mid{font-family:Baloo8,sans-serif;font-size:52px;color:${p.pal.cta};line-height:1.06;text-shadow:0 3px 0 rgba(0,0,0,.18)}
.big{font-family:Luckiest,cursive;font-size:82px;line-height:.98;color:#fff;margin-top:18px;
     -webkit-text-stroke:9px #17293B;paint-order:stroke fill;letter-spacing:.5px}
.sub{margin:26px auto 0;max-width:770px;background:#fff;border:5px solid #17293B;border-radius:20px;
     padding:16px 24px;font-size:29px;font-weight:700;color:#17293B;line-height:1.3}
/* real pages, fanned. The middle one sits forward so the eye lands on it. */
.stage{position:absolute;left:0;right:0;top:600px;height:600px}
.shot{position:absolute;border:5px solid #17293B;border-radius:10px;background:#fff;
      box-shadow:0 22px 40px rgba(0,0,0,.32);overflow:hidden}
.shot img{display:block;width:100%}
.s1{width:300px;left:78px;top:52px;transform:rotate(-8deg)}
.s2{width:340px;left:330px;top:8px;z-index:3}
.s3{width:300px;left:622px;top:52px;transform:rotate(8deg)}
.badge{position:absolute;right:56px;top:566px;z-index:6;width:132px;height:132px;border-radius:50%;
       background:${p.pal.cta};border:6px solid #17293B;display:flex;flex-direction:column;
       align-items:center;justify-content:center;transform:rotate(11deg)}
.badge b{font-family:Luckiest,cursive;font-size:38px;color:#17293B;line-height:.9}
.badge span{font-size:20px;font-weight:800;color:#17293B;margin-top:2px}
.foot{position:absolute;left:0;right:0;bottom:0;padding:0 60px 46px;text-align:center}
.cta{display:inline-block;background:${p.pal.cta};color:${p.pal.ctaInk};border:6px solid #17293B;
     border-radius:52px;padding:20px 62px;font-family:Luckiest,cursive;font-size:42px;
     box-shadow:0 9px 0 #17293B}
.byline{margin-top:26px;font-size:26px;font-weight:800;color:#fff;letter-spacing:.6px}
.store{margin-top:6px;font-size:23px;font-weight:700;color:rgba(255,255,255,.86)}
</style></head><body>
  <div class="doodles">
    ${doodle(-30, 250, -18, 190, SPARK)}
    ${doodle(880, 120, 22, 170, STAR)}
    ${doodle(60, 1120, 12, 150, BULB)}
    ${doodle(830, 1180, -14, 165, CHAT)}
    ${doodle(430, 1290, 8, 140, CHECK)}
    ${doodle(-20, 620, 26, 150, PENCIL)}
    ${doodle(890, 700, -20, 140, SPARK)}
  </div>
  <div class="head">
    <div class="top">${p.top}</div>
    <div class="mid">${p.mid}</div>
    <div class="big">${p.big}</div>
    <div class="sub">${p.sub}</div>
  </div>
  <div class="badge"><b>9</b><span>files</span></div>
  <div class="stage">
    <div class="shot s1"><img src="${b64(shots[0])}"></div>
    <div class="shot s2"><img src="${b64(shots[1])}"></div>
    <div class="shot s3"><img src="${b64(shots[2])}"></div>
  </div>
  <div class="foot">
    <div class="cta">${p.cta}</div>
    <div class="byline">Built by two certified teachers</div>
    <div class="store">AI-Ready School on Teachers Pay Teachers</div>
  </div>
</body></html>`;
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const page = await browser.newPage({ viewport: { width: 1000, height: 1500 } });
  for (const p of PINS) {
    await page.setContent(html(p), { waitUntil: 'networkidle' });
    const out = path.join(OUT, p.file + '.png');
    await page.screenshot({ path: out });
    console.log('built', path.relative(ROOT, out));
  }
  await browser.close();
})();
