#!/usr/bin/env node
/* TpT cover generator — Bright Scholar edition. 1000x1000 PNG per product.
   Build: node tpt/make_covers.js   -> tpt/covers/*.png
   Layer 2 of the loudness system (tpt/BRAND_THEME.md): ink ground, Fredoka
   display, sunny badge, rainbow bar, the intern bottom-right. Matches the
   Canva cover templates (tpt/canva/covers.html) pixel for pixel.

   Renders with the preinstalled headless chromium — no npm deps. Fonts come
   from Google Fonts by default; set FONTS_CSS=/path/to/local/fonts.css to
   render offline (URLs inside it must be resolvable from that directory). */
const { execFileSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'tpt/covers');
const CHROME = process.env.CHROME_BIN || '/opt/pw-browsers/chromium';

const PRODUCTS = [
  { file: 'kit1',                  badge: 'Complete PD Session',
    kicker: 'AI professional development · session 1',
    title: 'AI Foundations & Safety:', accent: 'The One Hard Rule',
    lede: 'A ready-to-run 45–60 minute staff training any teacher-leader can present cold. Word-for-word script included.',
    chips: ['34-slide editable deck', 'Full script', 'Handouts', '30-day plan'] },
  { file: 'kit2',                  badge: 'Complete PD Session',
    kicker: 'AI professional development · session 2',
    title: 'Prompting Basics:', accent: 'Useful Results Every Time',
    lede: 'The session every staff asks for. Teachers build a reusable prompt template for a task they do every week.',
    chips: ['33-slide editable deck', 'Full script', 'Handouts', '30-day plan'] },
  { file: 'deid',                  badge: 'Free',
    kicker: 'Free resource · staff / PD',
    title: 'AI Student Privacy Practice:', accent: '20 De-Identification Drills',
    lede: 'Twenty before-and-after prompt makeovers that build the no-student-data habit in ten seconds a drill.',
    chips: ['20 drills', 'Pocket checklist', 'FERPA-friendly', 'Free'] },
  { file: 'bts-setup',             badge: 'Back to school',
    kicker: 'AI time savers · first week of school',
    title: 'Back-to-School AI Setup:', accent: 'One Planning Period, Done',
    lede: 'A first-week checklist, a ready-to-send family letter about AI, and ten safe back-to-school prompts.',
    chips: ['Checklist', 'Family letter', '10 prompts', '5 pages'] },
  { file: 'free-ten-prompts',      badge: 'Free',
    kicker: 'Free resource · grades K–12',
    title: '10 Copy-Paste AI Prompts', accent: 'for Teachers',
    lede: 'Ten prompts that work on the first try, for the tasks that eat your evenings.',
    chips: ['Print & go', 'No signup', '3 pages', 'K–12'] },
  { file: 'free-one-hard-rule',    badge: 'Free',
    kicker: 'Free resource · staff room poster',
    title: 'The One Hard Rule', accent: 'AI & Student Privacy',
    lede: 'The single rule every educator using AI must follow, sized for the copier and the wall.',
    chips: ['1-page poster', 'Print & go', 'Staff room', 'Free'] },
  { file: 'free-tool-safety',      badge: 'Free',
    kicker: 'Free resource · for any AI tool',
    title: 'AI Tool Safety Checklist:', accent: 'Vet Any Tool in 5 Minutes',
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

const INTERN = fs.readFileSync(path.join(ROOT, 'public/brand/ai-buddy.svg'), 'utf8');
const internAt = (w, h, stemColor) =>
  INTERN.replace('<svg ', `<svg width="${w}" height="${h}" `)
        .replace('<path d="M100 38V22" />', `<path d="M100 38V22" stroke="${stemColor}"/>`);

const FONTS = process.env.FONTS_CSS
  ? `file://${path.resolve(process.env.FONTS_CSS)}`
  : 'https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600&family=Nunito:wght@400;700;800&display=swap';

function html(p) {
  return `<!doctype html><html><head><meta charset="utf-8">
<link href="${FONTS}" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: 1000px; height: 1000px; background: #17293B; position: relative;
         overflow: hidden; font-family: 'Nunito', sans-serif; }
  .brand { position: absolute; left: 56px; top: 48px; display: flex; align-items: center; gap: 16px; }
  .brand span { font-family: 'Fredoka', sans-serif; font-weight: 600; font-size: 30px; color: #FFFDF8; }
  .brand span b { color: #17BEBB; font-weight: 600; }
  .badge { position: absolute; right: 56px; top: 48px; background: #FFC43D; color: #17293B;
           font-weight: 800; font-size: 23px; padding: 15px 32px; border-radius: 34px; }
  .body { position: absolute; left: 56px; top: 190px; width: 880px; }
  .kicker { color: #FFC43D; font-weight: 800;
            font-size: 24px; letter-spacing: 2.4px; text-transform: uppercase; }
  h1 { margin-top: 26px; width: 880px; font-family: 'Fredoka', sans-serif;
       font-weight: 600; font-size: 76px; line-height: 1.08; color: #FFFDF8; letter-spacing: -0.5px; }
  h1 em { font-style: normal; color: #17BEBB; display: block; }
  .lede { margin-top: 36px; width: 640px; color: #C9D6E2;
          font-size: 29px; line-height: 1.42; font-weight: 400; }
  .chips { margin-top: 44px; width: 660px; display: flex; gap: 13px; flex-wrap: wrap; }
  .chip { border: 2px solid #3A5878; color: #FFFDF8; font-weight: 700; font-size: 22px;
          padding: 14px 22px; border-radius: 12px; }
  .intern { position: absolute; right: 44px; bottom: 53px; }
  .foot { position: absolute; left: 56px; bottom: 52px; color: #FFFDF8; font-weight: 800; font-size: 25px; }
  .foot span { color: #9FB2C2; font-weight: 700; margin-left: 18px; }
  .bar { position: absolute; left: 0; right: 0; bottom: 0; height: 28px; display: flex; }
  .bar i { flex: 1; }
  .b1 { background: #E4572E; } .b2 { background: #FFC43D; } .b3 { background: #17BEBB; } .b4 { background: #2D6CB5; }
</style></head><body>
  <div class="brand">${internAt(46, 48, '#FFFDF8')}<span><b>AI-Ready</b> School</span></div>
  <div class="badge">${p.badge}</div>
  <div class="body">
    <div class="kicker">${p.kicker}</div>
    <h1>${p.title}<em>${p.accent}</em></h1>
    <div class="lede">${p.lede}</div>
    <div class="chips">${p.chips.map(c => `<div class="chip">${c}</div>`).join('')}</div>
  </div>
  <div class="intern">${internAt(210, 221, '#FFFDF8')}</div>
  <div class="foot">Built by two certified teachers<span>·&nbsp;&nbsp;AI-Ready School</span></div>
  <div class="bar"><i class="b1"></i><i class="b2"></i><i class="b3"></i><i class="b4"></i></div>
</body></html>`;
}

fs.mkdirSync(OUT, { recursive: true });
const tmp = fs.mkdtempSync(path.join(require('os').tmpdir(), 'covers-'));
for (const p of PRODUCTS) {
  const page = path.join(tmp, p.file + '.html');
  fs.writeFileSync(page, html(p));
  const out = path.join(OUT, p.file + '-cover.png');
  execFileSync(CHROME, [
    '--headless=new', '--no-sandbox', '--disable-gpu', '--hide-scrollbars',
    '--force-device-scale-factor=1', '--window-size=1000,1200',
    '--virtual-time-budget=8000', `--screenshot=${out}`, `file://${page}`,
  ], { stdio: 'pipe' });
  execFileSync('python3', ['-c',
    `from PIL import Image; im = Image.open(${JSON.stringify(out)}); im.crop((0, 0, 1000, 1000)).save(${JSON.stringify(out)})`]);
  console.log('built', path.relative(ROOT, out));
}
