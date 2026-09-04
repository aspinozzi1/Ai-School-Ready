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
function whatsInside(kitName, accent, items, badge = '9 files') {
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
  <div class="badge">${badge}</div>
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
function realPages(field, shots, badge = '9 files') {
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
  <div class="badge">${badge}</div>
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
  ['bts-whats-inside', whatsInside('Back-to-School', 'AI Setup Pack', [
    'The First-Week AI Setup Checklist — ten boxes, one planning period',
    'Ready-to-send family letter about how you\u2019ll use AI this year',
    '<b>Ten back-to-school prompts</b>, safe exactly as written',
    'From the welcome letter to your day-one diagnostic',
    'The make-it-safe habit — 3 moves + the ten-second test',
  ], '5 pages')],
  ['bts-real-pages',   realPages('#E4572E', ['bts_p2.png', 'bts_p3.png', 'bts_p4.png'], '5 pages')],
  ['pm-whats-inside', whatsInside('Parent Message', 'Makeovers', [
    '<b>12 ready-to-run email makeovers</b> — everyday, hard, whole-class',
    'The 4-part tone formula: warm open · facts · partnership · next step',
    'Angry-email replies, behavior incidents, the AI-honesty talk',
    'Every prompt PII-safe by design — no student names ever typed',
    'Build-your-own template + the read-aloud test before every send',
  ], '7 pages')],
  ['pm-real-pages',   realPages('#17BEBB', ['pm_p3.png', 'pm_p4.png', 'pm_p6.png'], '7 pages')],
  ['hsp-whats-inside', whatsInside('Homeschool AI', 'Planning Pack', [
    '<b>20 subject-organized prompts</b> — LA, math, science, history',
    'The unit study builder — fill it in, feed the master prompt',
    'Weekly rhythm planner with room for the rabbit holes',
    'The family data-safety habit: describe the learner, never the child',
  ], '4 pages')],
  ['hsp-real-pages',   realPages('#2D6CB5', ['hsp_p2.png', 'hsp_p3.png', 'hsp_p4.png'], '4 pages')],
  ['yfb-whats-inside', whatsInside('My First Business', 'Ages 6–10', [
    '<b>6 steps from idea to profit</b> — kid box + parent AI coach each',
    'The Rule of Three: how real sellers price, at kid scale',
    'Sale-day tally sheet and the subtractions that reveal PROFIT',
    'Grown-ups hold the keyboard and run anything online',
  ], '4 pages')],
  ['yfb-real-pages',   realPages('#FFC43D', ['yfb_p2.png', 'yfb_p3.png', 'yfb_p4.png'], '4 pages')],
  ['yli-whats-inside', whatsInside('Launch It', 'Ages 9–12', [
    '<b>The one-page business plan</b> + mentor-check AI prompt',
    'Market research: 3 sharp questions, 5 real humans',
    'Pitch practice vs. an AI customer with kid-gentle objections',
    'The ledger and the online-safety contract you both sign',
  ], '6 pages')],
  ['yli-real-pages',   realPages('#E4572E', ['yli_p2.png', 'yli_p3.png', 'yli_p5.png'], '6 pages')],
  ['sba-whats-inside', whatsInside('Substitute Binder', 'with AI', [
    '<b>The 6-tab binder system</b> — exactly what goes behind each divider',
    'The master day-drafter prompt — one prompt, a complete sub day',
    'Five section-fill prompts, one per divider',
    'The quarterly refresh checklist — 15 min, 4 times a year',
  ], '4 pages')],
  ['sba-real-pages',   realPages('#2D6CB5', ['sba_p2.png', 'sba_p3.png', 'sba_p4.png'], '4 pages')],
  ['pcl-whats-inside', whatsInside('Parent Communication', 'Log', [
    'The individual contact log — one page per student',
    'The incident/behavior documentation log',
    '<b>The class quick-tracker</b> — whole class, one page, at a glance',
    'The AI safe-prompt companion — never types a student’s name',
  ], '3 pages')],
  ['pcl-real-pages',   realPages('#17BEBB', ['pcl_p1.png', 'pcl_p2.png', 'pcl_p3.png'], '3 pages')],
  ['hfp-whats-inside', whatsInside('Full-Year Homeschool', 'Planner with AI', [
    '<b>Year-at-a-glance grid</b> — twelve months, one page',
    'The monthly planning page — photocopy it for every month',
    'Weekly rhythm planner + subject tracker',
    'The AI planning-prompt library',
  ], '4 pages')],
  ['hfp-real-pages',   realPages('#FFC43D', ['hfp_p2.png', 'hfp_p3.png', 'hfp_p4.png'], '4 pages')],
  ['yeu-whats-inside', whatsInside('Entrepreneurship Unit', 'with AI', [
    '<b>Five days, one market day</b> — idea, pricing, sign & pitch, logistics, profit',
    'A grown-up AI Helper Prompt for every day that needs one',
    'The "My Role & My Price" worksheet every kid fills out by hand',
    'Ready-made roles table and sample day-of timeline for market day',
  ], '7 pages')],
  ['yeu-real-pages',   realPages('#FFC43D', ['yeu_p2.png', 'yeu_p4.png', 'yeu_p7.png'], '7 pages')],
  ['dsa-whats-inside', whatsInside('DHH Self-Advocacy', 'Pack', [
    '<b>Eight "I need..." sentence starters</b> for real classroom moments',
    'A weekly self-check + notes page — not a replacement for the IEP',
    'The "meeting a new teacher" script builder',
    'Four real-situation practice scenarios, ToD- or family-guided',
  ], '3 pages')],
  ['dsa-real-pages',   realPages('#2D6CB5', ['dsa_p1.png', 'dsa_p2.png', 'dsa_p3.png'], '3 pages')],
  ['whole-staff-license', license()],
  ['cvc1-whats-inside', whatsInside('CVC Words ·', 'Short A Unit 1', [
    'Six no-prep practice pages — pictures, sound boxes, word families, sentences',
    'A ten-word probe on its own student page',
    'A four-week data sheet with a notes block',
    'The AI Growth Eval: score bands to next steps',
    'A group snapshot that sorts a small group in one minute',
    'Scope, sequence and citations printed inside',
  ], '12 pages')],
  ['cvc1-real-pages',   realPages('#E4572E', ['cvc1_p2.png', 'cvc1_p6.png', 'cvc1_p10.png'], '12 pages')],
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
