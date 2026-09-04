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
  { file: 'free-ai-vocab',         badge: 'Free',
    kicker: 'Free resource · staff room & PD',
    title: 'AI Vocabulary', accent: 'for Teachers',
    lede: 'Thirty AI terms in plain teacher English — from prompt to FERPA to hallucination. Zero hype included.',
    chips: ['30 terms', 'Plain English', '2 pages', 'Free'] },
  { file: 'free-ai-habit',         badge: 'Free',
    kicker: 'Free resource · teacher time savers',
    title: 'The 10-Minute', accent: 'AI Habit',
    lede: 'One calendar slot, one task a week, one doc of prompts that worked. The whole system on two pages.',
    chips: ['8-week ladder', 'Tracker', 'Print & go', 'Free'] },
  { file: 'free-dont-type-that',   badge: 'Free',
    kicker: 'Free resource · student privacy poster',
    title: "Don't Type That:", accent: '10 Things That Count as PII',
    lede: 'The student-privacy poster for every wall near a device — with the safe-prompt guide on the back.',
    chips: ['Poster + guide', 'FERPA-friendly', 'Print & post', 'Free'] },
  { file: 'free-sub-plans',        badge: 'Free',
    kicker: 'Free resource · for the 5:30 a.m. text',
    title: 'Emergency Sub Plans', accent: 'with AI, in 15 Minutes',
    lede: 'One master prompt drafts the whole sub day. Four gap-fillers and the printed-folder list finish it.',
    chips: ['Master prompt', '15 minutes', 'Print & go', 'Free'] },
  { file: 'free-ai-or-teacher',    badge: 'Free',
    kicker: 'Free resource · classroom decision poster',
    title: 'AI or Teacher?', accent: 'Three Questions Decide',
    lede: 'The delegation poster: what AI drafts, what stays yours, and the two rules that keep every yes safe.',
    chips: ['Poster + guide', 'Decision flow', 'Print & post', 'Free'] },
  { file: 'free-what-is-ai',       badge: 'Free',
    kicker: 'Free resource · homeschool & K–2 · ages 4–8',
    title: 'What Is AI?', accent: 'An Unplugged First Lesson',
    lede: 'Three kitchen-table games that teach what AI really is — no screens, no chatbots, read-aloud script included.',
    chips: ['Ages 4–8', 'No screens', '3 games', 'Free'] },
  { file: 'free-family-ai-rules',  badge: 'Free',
    kicker: 'Free resource · families & homeschool',
    title: 'Our Family AI Rules:', accent: 'Poster + Parent Guide',
    lede: 'Five rules worth signing together — grown-ups hold the keyboard, AI guesses, our names stay ours.',
    chips: ['Poster + guide', 'Sign together', 'All ages', 'Free'] },
  { file: 'free-hs-quickstart',    badge: 'Free',
    kicker: 'Free resource · homeschool parents',
    title: 'AI Quick-Start', accent: 'for Homeschool Parents',
    lede: 'Ten safe, ready-to-run prompts for the planning that eats your evenings — weeks, units, quizzes, co-op classes.',
    chips: ['10 prompts', 'Copy & paste', 'Parent-run', 'Free'] },
  { file: 'free-first-biz-idea',   badge: 'Free',
    kicker: 'Free resource · young entrepreneurs · ages 6–10',
    title: 'My First', accent: 'Business Idea',
    lede: 'A kid worksheet and a grown-up AI-coach page: the first step from "I could sell that" to actually doing it.',
    chips: ['Ages 6–10', 'Kid + parent', 'Print & go', 'Free'] },
  { file: 'free-is-it-true',       badge: 'Free',
    kicker: 'Free resource · media literacy · ages 9–12',
    title: 'Is It True?', accent: 'Teaching Kids to Fact-Check AI',
    lede: 'The three-step check and a game — Two Truths and an AI — that make confident-sounding nonsense easy to catch.',
    chips: ['Ages 9–12', '3-step check', 'Family game', 'Free'] },
  { file: 'hs-planning',           badge: 'Homeschool',
    kicker: 'Homeschool AI · planning',
    title: 'Homeschool AI', accent: 'Planning Pack',
    lede: 'Twenty subject-organized prompts, a unit study builder, and a weekly rhythm planner. AI drafts; you decide.',
    chips: ['20 prompts', 'Unit builder', 'Weekly planner', '4 pages'] },
  { file: 'ye-first-business',     badge: 'Ages 6–10',
    kicker: 'Young entrepreneurs · first venture',
    title: 'My First Business:', accent: 'Young Entrepreneur Workbook',
    lede: 'Idea, costs, the Rule of Three, a sign, sale day, and real profit math — with a grown-up AI coach on every step.',
    chips: ['6 steps', 'Money math', 'Parent coach', '4 pages'] },
  { file: 'ye-launch-it',          badge: 'Ages 9–12',
    kicker: 'Young entrepreneurs · the real thing',
    title: 'Launch It:', accent: 'Plan, Price, Pitch, Profit',
    lede: 'A one-page business plan, market research, pitch practice against an AI customer, a ledger, and the online-safety contract.',
    chips: ['Business plan', 'Pitch practice', 'Ledger', '6 pages'] },
  { file: 'parent-messages',       badge: 'Template pack',
    kicker: 'AI time savers · family communication',
    title: 'Parent Message Makeovers:', accent: '12 Hard Emails, Drafted',
    lede: 'The twelve emails you rewrite four times at 9 p.m. — each with a safe, ready-to-run AI prompt and the tone formula that makes it land.',
    chips: ['12 makeovers', 'Tone formula', 'PII-safe', '7 pages'] },
  { file: 'sub-binder-ai',         badge: 'Binder system',
    kicker: 'AI time savers · substitute planning',
    title: 'Substitute Binder', accent: 'with AI',
    lede: 'Six binder sections, a master AI prompt, and the quarterly refresh checklist — build it once, fill it in fifteen minutes.',
    chips: ['6-tab system', 'Master prompt', '5 fill prompts', '4 pages'] },
  { file: 'parent-comm-log',       badge: 'Log system',
    kicker: 'AI time savers · parent communication',
    title: 'Parent Communication', accent: 'Log',
    lede: 'A contact log, an incident log, and a class quick-tracker — every conversation documented, without a spreadsheet.',
    chips: ['Contact log', 'Incident log', 'Quick-tracker', '3 pages'] },
  { file: 'free-parent-questionnaire', badge: 'Free',
    kicker: 'Free resource · back to school',
    title: 'Back to School', accent: 'Parent Questionnaire',
    lede: 'Send it home the first week — fifteen minutes at the kitchen table beats a cumulative file.',
    chips: ['Get-to-know-you', 'Print & go', '2 pages', 'Free'] },
  { file: 'free-procedures-checklist', badge: 'Free',
    kicker: 'Free resource · routines that stick',
    title: 'Classroom Procedures', accent: 'Checklist',
    lede: 'Twenty small procedures, checked off as you explicitly teach and re-teach each one.',
    chips: ['20 procedures', 'Any grade', 'Print & go', 'Free'] },
  { file: 'free-sub-binder-starter', badge: 'Free',
    kicker: 'Free resource · substitute planning',
    title: 'Sub Binder', accent: 'Starter Pages',
    lede: 'A binder cover, five printable dividers, and the shortlist of what to gather before you print.',
    chips: ['5 dividers', 'Cover page', 'Print & go', 'Free'] },
  { file: 'free-digital-footprint', badge: 'Free',
    kicker: 'Free resource · digital citizenship · grades 3–6',
    title: 'My Digital', accent: 'Footprint',
    lede: 'A ten-minute mini-lesson that makes an invisible idea visible — with a sort-it activity and discussion questions.',
    chips: ['Mini lesson', 'Sort activity', 'Grades 3–6', 'Free'] },
  { file: 'free-internet-safety',  badge: 'Free',
    kicker: 'Free resource · digital citizenship',
    title: 'Internet Safety', accent: 'with AI',
    lede: 'Five rules for any device, any grade — the poster plus talking points for each one.',
    chips: ['5 rules', 'Poster + guide', 'Any grade', 'Free'] },
  { file: 'hs-full-planner',       badge: 'Homeschool',
    kicker: 'Homeschool AI · year planning',
    title: 'Full-Year Homeschool', accent: 'Planner with AI',
    lede: 'A year-at-a-glance grid, monthly planning pages, a weekly rhythm planner, and a subject tracker.',
    chips: ['Year grid', 'Monthly pages', 'Subject tracker', '4 pages'] },
  { file: 'free-hs-schedule-cards', badge: 'Free',
    kicker: 'Free resource · homeschool routines',
    title: 'Homeschool Weekly', accent: 'Schedule Cards',
    lede: 'Cut-apart routine cards for a visual weekly rhythm your kids can see and move themselves.',
    chips: ['12 cards', 'Cut & go', 'Print & go', 'Free'] },
  { file: 'free-hs-planning-prompts', badge: 'Free',
    kicker: 'Free resource · homeschool planning',
    title: 'Homeschool AI', accent: 'Planning Prompts',
    lede: 'Five copy-paste prompts for the planning that eats homeschool evenings.',
    chips: ['5 prompts', 'Copy & paste', 'Parent-run', 'Free'] },
  { file: 'ye-market-day-unit',    badge: 'Ages 8–12',
    kicker: 'Young entrepreneurs · classroom or co-op unit',
    title: 'Start a Business Unit:', accent: 'Five Days, One Market Day',
    lede: 'A grown-up-led group unit: idea brainstorm, Rule-of-Three pricing, sign & pitch, market day logistics, profit math — with an AI helper prompt for every step.',
    chips: ['5-day unit', 'Kid worksheet', 'AI helper prompts', '7 pages'] },
  { file: 'free-pitch-day-kit',    badge: 'Free',
    kicker: 'Free resource · young entrepreneurs · ages 8–12',
    title: 'Shark Tank', accent: 'Pitch Day',
    lede: 'A pitch planner for the kid and a judge’s rubric for the grown-up — thirty seconds, practiced until it feels natural.',
    chips: ['Pitch planner', 'Judge rubric', 'Ages 8–12', 'Free'] },
  { file: 'free-biz-idea-activities', badge: 'Free',
    kicker: 'Free resource · young entrepreneurs · ages 9–12',
    title: 'Business Idea', accent: 'Starter',
    lede: 'Three independent activities — the problem hunt, a community-need checklist, and selling it in one sentence.',
    chips: ['Ages 9–12', 'Work alone', '4 activities', 'Free'] },
  { file: 'dhh-self-advocacy-pack', badge: 'Deaf Education',
    kicker: 'DHH self-advocacy · a scaffold that grows with the student',
    title: 'Self-Advocacy Worksheets:', accent: 'DHH Student Pack',
    lede: '“I need…” sentence starters, a weekly self-check, a new-teacher script builder, and real-situation practice scenarios.',
    chips: ['5 pages', 'Student write-in', 'Any comm. mode', '$6'] },
  { file: 'free-dhh-advocacy-scripts', badge: 'Free',
    kicker: 'Free resource · Deaf Education',
    title: '"I Need..."', accent: 'Self-Advocacy Cards',
    lede: 'Eight cut-apart cards that put a self-advocacy request into a student’s hand for the moment finding the words is the hardest part.',
    chips: ['8 cards', 'Cut & laminate', 'DHH & SPED', 'Free'] },
  { file: 'free-dhh-access-checklist', badge: 'Free',
    kicker: 'Free resource · Deaf Education · gen-ed teachers',
    title: 'Classroom Access', accent: 'Checklist for DHH Students',
    lede: 'The itinerant in-service one-pager, reshaped as a checklist: seating, captions, communication repair, and what to check before day one.',
    chips: ['Before day 1', 'Every day', 'Gen-ed ready', 'Free'] },
  { file: 'free-dhh-exec-functioning', badge: 'Free',
    kicker: 'Free resource · Deaf Education · executive functioning',
    title: 'Executive Functioning', accent: 'Self-Advocacy & Planning',
    lede: 'A task-planning checklist, a materials checklist, and a three-question self-check card for the extra load a missed direction adds.',
    chips: ['Task planner', 'Self-check card', 'Any grade', 'Free'] },
  { file: 'cvc-unit1-short-a',   badge: 'Reading Intervention',
    kicker: 'CVC words worksheets · unit 1 of 5',
    title: 'Short A CVC:', accent: 'Read It, Build It, Write It',
    lede: 'Six no-prep practice pages, a ten-word probe and a data sheet — then an AI Growth Eval that turns the score into next steps.',
    chips: ['12 pages', 'Grades K–2', 'Probe + data', 'Growth Eval'] },
];

/* ---- school-accent layer (owner directive 2026-08-25): every Main Cover
   carries the fun schoolhouse accents — colored line-art doodles, confetti,
   sparkles — in the safe zones only (top-center gap and the right column),
   never over title, lede, chips, badge, intern, or footer. Colors rotate
   per product so the catalog looks lively but consistent. */
const DOODLES = {
  star:  '<path d="M50 15 L61 40 L88 43 L68 62 L74 88 L50 75 L26 88 L32 62 L12 43 L39 40 Z"/>',
  spark: '<path d="M50 12 L58 42 L88 50 L58 58 L50 88 L42 58 L12 50 L42 42 Z"/>',
  bulb:  '<path d="M35 42a15 15 0 1 1 30 0c0 10-8 13-8 22H43c0-9-8-12-8-22Z"/><path d="M43 76h14"/>',
  plane: '<path d="M10 55 L90 20 L55 85 L45 60 Z"/><path d="M45 60 L90 20"/>',
  pencil:'<path d="M22 78 30 56 68 18l14 14-38 38-22 8Z"/><path d="M62 24l14 14"/>',
  apple: '<path d="M50 34c-14-10-32-2-32 16 0 16 12 32 24 32 4 0 6-2 8-2s4 2 8 2c12 0 24-16 24-32 0-18-18-26-32-16Z"/><path d="M50 34c0-8 4-14 10-16"/>',
  ruler: '<rect x="14" y="40" width="72" height="20" rx="4"/><path d="M28 40v8M42 40v10M56 40v8M70 40v10"/>',
  book:  '<path d="M50 25c-10-8-26-8-34-3v55c8-5 24-5 34 3 10-8 26-8 34-3V22c-8-5-24-5-34 3Z"/><path d="M50 25v55"/>',
  note:  '<path d="M38 75V25l34-8v50"/><circle cx="30" cy="75" r="9"/><circle cx="64" cy="67" r="9"/>',
  globe: '<circle cx="50" cy="50" r="34"/><ellipse cx="50" cy="50" rx="14" ry="34"/><path d="M16 50h68M22 32h56M22 68h56"/>',
  atom:  '<ellipse cx="50" cy="50" rx="38" ry="15"/><ellipse cx="50" cy="50" rx="38" ry="15" transform="rotate(60 50 50)"/><ellipse cx="50" cy="50" rx="38" ry="15" transform="rotate(120 50 50)"/><circle cx="50" cy="50" r="5"/>',
  smile: '<circle cx="50" cy="50" r="32"/><circle cx="39" cy="42" r="3"/><circle cx="61" cy="42" r="3"/><path d="M36 58c8 10 20 10 28 0"/>',
};
const ACCENT_COLORS = ['#FFC43D', '#17BEBB', '#E4572E', '#2D6CB5'];
const dood = (x, y, r, size, color, op, shape) =>
  `<svg style="position:absolute;left:${x}px;top:${y}px;transform:rotate(${r}deg);opacity:${op}"
        width="${size}" height="${size}" viewBox="0 0 100 100" fill="none"
        stroke="${color}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">${shape}</svg>`;
function accents(idx) {
  const names = Object.keys(DOODLES);
  const pick = n => DOODLES[names[(idx + n) % names.length]];
  const col = n => ACCENT_COLORS[(idx + n) % 4];
  const dots = [[470, 70, col(0)], [530, 118, col(1)], [945, 252, col(2)],
                [760, 118, col(3)], [944, 618, col(0)], [500, 906, col(1)],
                [700, 912, col(2)], [920, 170, col(3)]]
    .map(([x, y, c]) => `<div style="position:absolute;left:${x}px;top:${y}px;width:13px;height:13px;border-radius:50%;background:${c};opacity:.55"></div>`).join('');
  return `
  ${dood(560, 58, -12 + (idx % 5) * 5, 82, col(0), .5, pick(0))}
  ${dood(660, 96, 10, 62, col(1), .45, pick(1))}
  ${dood(874, 432, 8 - (idx % 4) * 4, 74, col(2), .45, pick(2))}
  ${dood(880, 592, -10, 66, col(3), .4, pick(3))}
  <div style="position:absolute;left:583px;top:902px;font-family:'Fredoka',sans-serif;font-size:34px;color:${col(0)};opacity:.8">\u2726</div>
  ${dots}`;
}

const INTERN = fs.readFileSync(path.join(ROOT, 'public/brand/ai-buddy.svg'), 'utf8');
const internAt = (w, h, stemColor) =>
  INTERN.replace('<svg ', `<svg width="${w}" height="${h}" `)
        .replace('<path d="M100 38V22" />', `<path d="M100 38V22" stroke="${stemColor}"/>`);

const FONTS = process.env.FONTS_CSS
  ? `file://${path.resolve(process.env.FONTS_CSS)}`
  : 'https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600&family=Nunito:wght@400;700;800&display=swap';

function html(p, idx) {
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
  ${accents(idx)}
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
for (const [idx, p] of PRODUCTS.entries()) {
  const page = path.join(tmp, p.file + '.html');
  fs.writeFileSync(page, html(p, idx));
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
