#!/usr/bin/env node
/* Pinterest pin generator — 1000x1500 PNG per listing + PINS.txt captions.
   Build: node tpt/make_pins.js  ->  tpt/pins/<id>-pin.png + tpt/pins/PINS.txt

   Data-driven from tpt/listings.json + the PIN_COPY table below (one entry
   per listing id: headline stack, palette, board, description). Shots are
   real page renders: previewShots from listings.json when present, otherwise
   the first two pages of the product PDF are rendered into tpt/pinsrc/ as
   <id>_pin1/2.png automatically. The mockups are always the real files.

   Aesthetic follows the TpT-Pinterest vernacular: one saturated flat colour
   field, heavy outlined display type, scattered doodle line art, real product
   pages at an angle, a count badge, and a call to action.
   Needs: npm i --no-save playwright @fontsource/luckiest-guy @fontsource/baloo-2 */
const { chromium } = require('playwright');
const { execFileSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'tpt/pins');
const SRC = path.join(ROOT, 'tpt/pinsrc');
const { listings } = JSON.parse(fs.readFileSync(path.join(ROOT, 'tpt/listings.json'), 'utf8'));

const font = (fam, file) =>
  `@font-face{font-family:'${fam}';src:url('file://${path.join(ROOT, 'node_modules/@fontsource', file)}') format('woff2');}`;

const b64 = f => 'data:image/png;base64,' + fs.readFileSync(path.join(SRC, f)).toString('base64');

const P = {
  grass:  { field: '#34A853', deep: '#1E7038', cta: '#FFD43B', ctaInk: '#17293B' },
  turq:   { field: '#17BEBB', deep: '#0E8C8A', cta: '#FFD43B', ctaInk: '#17293B' },
  coral:  { field: '#F2643D', deep: '#C4421F', cta: '#FFE08A', ctaInk: '#17293B' },
  grape:  { field: '#7B5EA7', deep: '#573F7C', cta: '#FFD43B', ctaInk: '#17293B' },
  blue:   { field: '#2D6CB5', deep: '#1D4A80', cta: '#FFD43B', ctaInk: '#17293B' },
};

/* One pin per listing: headline stack (top/mid = setup, big = payoff),
   sub = the concrete promise, board = suggested Pinterest board,
   desc = the pin description (keyword-rich, honest). */
const PIN_COPY = {
  'ten-ai-prompts': { pal: P.turq,
    top: '10 AI prompts', mid: 'that work on the first try', big: 'COPY. PASTE. DONE.',
    sub: 'The tasks that eat your evenings — drafted in minutes. Free.',
    board: 'AI for Teachers',
    desc: 'Free AI prompts for teachers: 10 copy-paste ChatGPT prompts for lesson hooks, sub plans, rubrics, leveled readings, and parent messages. Safe as written — no student data. From two certified teachers.' },
  'one-hard-rule': { pal: P.coral,
    top: 'The one AI rule', mid: 'every educator needs', big: 'ON THE WALL',
    sub: 'Student privacy poster, sized for the copier. Free.',
    board: 'AI for Teachers',
    desc: 'Free AI student privacy poster for the staff room: the one hard rule for teachers using ChatGPT and AI tools, FERPA-friendly, print and post. From two certified teachers.' },
  'tool-safety': { pal: P.grape,
    top: 'A new AI tool', mid: 'lands every week', big: 'VET IT IN 5 MINUTES',
    sub: 'The checklist to run before you or your students touch it. Free.',
    board: 'AI for Teachers',
    desc: 'Free AI tool safety checklist for teachers: vet any classroom AI or edtech tool in 5 minutes — data privacy, student safety, and the questions worth taking to your district.' },
  'parents-ai': { pal: P.blue,
    top: 'When parents ask', mid: 'about AI in your class', big: 'HAVE THE ANSWERS',
    sub: 'Plain-language scripts for the questions families actually ask. Free.',
    board: 'Parent Communication',
    desc: 'Free guide for talking to parents about AI in the classroom: ready-to-send answers to the questions families actually ask teachers. From two certified teachers.' },
  'leader-readiness': { pal: P.grass,
    top: 'Where does your school', mid: 'actually stand on AI?', big: 'ONE HONEST PAGE',
    sub: 'The readiness checklist for principals and teacher-leaders. Free.',
    board: 'AI Staff PD',
    desc: 'Free AI readiness checklist for school leaders: where your building stands on AI policy, staff training, and student privacy — one honest page for principals and instructional coaches.' },
  'deid-drills': { pal: P.turq,
    top: 'No student data', mid: 'in AI tools — ever', big: '20 PRIVACY DRILLS',
    sub: 'Before-and-after prompt makeovers that build the habit. Free.',
    board: 'AI for Teachers',
    desc: 'Free FERPA-friendly AI practice for teachers: 20 de-identification drills that build the no-student-data habit — before-and-after prompt makeovers, ten seconds each.' },
  'kit1': { pal: P.grass,
    top: 'Run AI training', mid: 'for your whole staff', big: 'WITHOUT A CONSULTANT',
    sub: 'Word-for-word script · 34 editable slides · handouts',
    board: 'AI Staff PD',
    desc: 'Complete AI professional development kit for schools: a ready-to-run 45-60 minute staff training on AI foundations and student privacy — word-for-word facilitator script, 34 editable slides, handouts, 30-day plan. Built by two certified teachers.' },
  'kit2': { pal: P.blue,
    top: 'The AI session', mid: 'every staff asks for', big: 'PROMPTING BASICS',
    sub: 'Teachers leave with a reusable template for a real weekly task',
    board: 'AI Staff PD',
    desc: 'ChatGPT prompting PD for teachers: a complete staff training where every teacher builds a reusable AI prompt template — word-for-word script, 33 editable slides, handouts. Built by two certified teachers.' },
  'bts-setup': { pal: P.coral,
    top: 'One planning period', mid: 'and AI is set up', big: 'FOR YOUR WHOLE YEAR',
    sub: 'First-week checklist · family letter · 10 safe prompts · $8',
    board: 'Back to School',
    desc: 'Back to school AI setup for teachers: a first-week checklist, a ready-to-send family letter about AI, and ten safe back-to-school prompts — one planning period, done. From two certified teachers.' },
  'ai-vocab': { pal: P.grape,
    top: '30 AI terms', mid: 'in plain teacher English', big: 'ZERO HYPE INCLUDED',
    sub: 'From prompt to FERPA to hallucination — 2 pages. Free.',
    board: 'AI for Teachers',
    desc: 'Free AI vocabulary cheat sheet for teachers: 30 AI terms explained in plain English — hallucination, FERPA, prompts, AI detectors — for staff meetings and PD folders.' },
  'ai-habit': { pal: P.turq,
    top: 'Learn AI in', mid: '10 minutes a week', big: 'THE HABIT SYSTEM',
    sub: '8-week starter ladder + printable tracker. Free.',
    board: 'AI for Teachers',
    desc: 'Free 10-minute AI habit system for teachers: one calendar slot, one task a week, one doc of prompts that worked — with an 8-week starter ladder and printable tracker.' },
  'dont-type-that': { pal: P.coral,
    top: "Don't type that!", mid: '10 things that count as', big: 'STUDENT PII',
    sub: 'The privacy poster for every wall near a device. Free.',
    board: 'AI for Teachers',
    desc: 'Free student data privacy poster: 10 things teachers should never type into AI tools — FERPA-friendly, with the safe-prompt guide on the back. Print and post.' },
  'sub-plans': { pal: P.grape,
    top: "It's 5:30 a.m.", mid: "and you're sick", big: 'SUB PLANS IN 15 MIN',
    sub: 'One master AI prompt drafts the whole sub day. Free.',
    board: 'Sub Plans & Time Savers',
    desc: 'Free emergency sub plans system with AI: one master prompt drafts a complete substitute day in 15 minutes — bell-ringers, numbered directions, early-finisher tasks. For the morning you hoped would never come.' },
  'ai-or-teacher': { pal: P.blue,
    top: 'AI or teacher?', mid: 'Three questions', big: 'DECIDE IN SECONDS',
    sub: 'The delegation poster: what AI drafts, what stays yours. Free.',
    board: 'AI for Teachers',
    desc: 'Free AI delegation poster for teachers: three questions that sort any task — what AI can draft, what stays yours, and the two rules that keep every yes safe.' },
  'parent-messages': { pal: P.grass,
    top: 'The email you rewrite', mid: 'four times at 9 p.m.', big: 'DRAFTED IN MINUTES',
    sub: '12 hard parent emails · safe AI prompts · the tone formula · $12',
    board: 'Parent Communication',
    desc: 'Parent communication templates with AI: 12 hard email makeovers — missing work, behavior incidents, angry replies, conferences — each with a safe ready-to-run prompt and the 4-part tone formula. PII-safe by design.' },
  'what-is-ai': { pal: P.turq,
    top: 'What is AI?', mid: 'A first lesson for ages 4–8', big: 'NO SCREENS NEEDED',
    sub: '3 kitchen-table games with read-aloud scripts. Free.',
    board: 'Homeschool AI',
    desc: 'Free unplugged AI lesson for kids ages 4-8: three kitchen-table games that teach what AI really is — no screens, no chatbots, read-aloud script included. Perfect for homeschool and K-2.' },
  'family-ai-rules': { pal: P.coral,
    top: 'Five AI rules', mid: 'worth signing together', big: 'FAMILY AI RULES',
    sub: 'Poster + parent guide, for the fridge and the co-op wall. Free.',
    board: 'Homeschool AI',
    desc: 'Free family AI rules poster: five kid-safe AI rules to sign together — grown-ups hold the keyboard, AI guesses, our names stay ours. With a parent guide for the follow-up questions.' },
  'hs-quickstart': { pal: P.grape,
    top: "You're the teacher AND", mid: 'the curriculum department', big: 'AI QUICK-START',
    sub: '10 safe planning prompts for homeschool parents. Free.',
    board: 'Homeschool AI',
    desc: 'Free AI prompts for homeschool parents: 10 ready-to-run planning prompts — weekly plans, unit studies, leveled readings, quizzes, co-op classes. Describe the learner, never the child.' },
  'first-biz-idea': { pal: P.grass,
    top: 'Your kid’s first', mid: 'business starts with', big: 'ONE BIG IDEA',
    sub: 'Kid worksheet + grown-up AI coach page, ages 6–10. Free.',
    board: 'Young Entrepreneurs',
    desc: 'Free entrepreneurship worksheet for kids ages 6-10: capture the first business idea — what to make, who wants it, the sign, the selling sentence — plus a parent AI-coach page. Kids think; grown-ups hold the keyboard.' },
  'is-it-true': { pal: P.blue,
    top: 'AI sounds confident', mid: 'even when it’s wrong', big: 'TEACH THE CHECK',
    sub: 'The 3-step fact-check + a family game, ages 9–12. Free.',
    board: 'Homeschool AI',
    desc: 'Free AI fact-checking lesson for kids 9-12: the three-step check and Two Truths and an AI — the family game that makes confident-sounding nonsense easy to catch. Media literacy that sticks.' },
  'hs-planning': { pal: P.blue,
    top: "You're the whole school.", mid: 'Meet your', big: 'PLANNING DEPARTMENT',
    sub: '20 prompts · unit study builder · weekly rhythm planner · $8',
    board: 'Homeschool AI',
    desc: 'Homeschool AI planning pack: 20 subject-organized prompts, a fill-in unit study builder, and a weekly rhythm planner. AI drafts; the parent-teacher decides. Includes the family data-safety habit.' },
  'ye-first-business': { pal: P.coral,
    top: 'Idea → price → sign', mid: '→ sale day → PROFIT', big: 'MY FIRST BUSINESS',
    sub: 'Young entrepreneur workbook, ages 6–10, parent AI coach · $8',
    board: 'Young Entrepreneurs',
    desc: 'Young entrepreneur workbook for kids ages 6-10: a real kid-sized business from idea to profit — Rule of Three pricing, money math, sale-day tally, and a grown-up AI coach prompt at every step.' },
  'ye-launch-it': { pal: P.grape,
    top: 'Plan it. Price it.', mid: 'Pitch it.', big: 'LAUNCH IT',
    sub: 'Business plan · market research · pitch practice · ages 9–12 · $10',
    board: 'Young Entrepreneurs',
    desc: 'Entrepreneurship kit for kids ages 9-12: a one-page business plan, market research with real humans, Rule of Three pricing, pitch practice against an AI customer, a ledger, and the online-safety contract.' },
  'sub-binder-ai': { pal: P.blue,
    top: 'Build a sub binder', mid: 'any sub can run', big: 'WITH AI, IN 15 MIN',
    sub: '6-tab binder system + master prompt + refresh checklist · $8',
    board: 'Sub Plans & Time Savers',
    desc: 'Substitute binder system for teachers: build a 6-tab sub binder with AI in 15 minutes — the master day-drafter prompt, five section-fill prompts, and a quarterly refresh checklist so it never goes stale.' },
  'parent-comm-log': { pal: P.turq,
    top: 'Did I already', mid: 'tell them about this?', big: 'NOW YOU’LL KNOW',
    sub: 'Contact log · incident log · class quick-tracker · $6',
    board: 'Parent Communication',
    desc: 'Printable parent communication log for teachers: an individual contact log, an incident/behavior documentation log, and a whole-class quick-tracker, plus safe AI prompts for turning entries into family emails.' },
  'parent-questionnaire': { pal: P.coral,
    top: 'Get to know', mid: 'your students in', big: '15 MINUTES',
    sub: 'Back to school parent questionnaire, straight from families. Free.',
    board: 'Back to School',
    desc: 'Free back to school parent questionnaire: a get-to-know-you form families fill out at home, covering how a child learns best, what excites or worries them, and the best way to reach you. Print and send home week one.' },
  'procedures-checklist': { pal: P.grass,
    top: '20 small procedures', mid: 'nobody teaches on', big: 'PURPOSE. THIS YEAR, YOU DO.',
    sub: 'Classroom procedures checklist, any grade. Free.',
    board: 'Classroom Management',
    desc: 'Free classroom procedures checklist: entering, transitions, turning in work, and dismissal routines to explicitly teach and re-teach, plus an AI prompt that turns any row into poster-ready wording.' },
  'sub-binder-starter': { pal: P.grape,
    top: 'The sub binder', mid: 'starts here', big: 'DIVIDERS + COVER, FREE',
    sub: 'A binder cover, 5 dividers, and the emergency-plans checklist. Free.',
    board: 'Sub Plans & Time Savers',
    desc: 'Free substitute binder starter pages: a printable cover, five dividers (schedule, rosters, emergency procedures, backup activity, routines), and the shortlist of what to gather before you print.' },
  'digital-footprint': { pal: P.coral,
    top: 'Every app leaves', mid: 'a footprint', big: 'TEACH IT IN 10 MIN',
    sub: 'Digital citizenship mini-lesson, grades 3-6. Free.',
    board: 'AI for Teachers',
    desc: 'Free digital footprint mini-lesson for grades 3-6: a 10-minute activity that makes digital citizenship visible, with a green light/red light sort and discussion questions — includes the AI-chatbot angle.' },
  'internet-safety': { pal: P.blue,
    top: 'Five AI safety rules', mid: 'for any device,', big: 'ANY GRADE',
    sub: 'Printable poster + talking-points guide. Free.',
    board: 'AI for Teachers',
    desc: 'Free internet safety with AI poster for the classroom: five kid-safe rules — a grown-up in the loop, never type your real info, AI can be wrong, tell a grown-up, strangers stay strangers — plus a talking-points guide.' },
  'hs-full-planner': { pal: P.grass,
    top: "You're the whole school.", mid: 'Meet your', big: 'YEAR PLANNER',
    sub: 'Year grid · monthly pages · weekly rhythm · subject tracker · $8',
    board: 'Homeschool AI',
    desc: 'Full-year homeschool planner with AI: a year-at-a-glance grid, a photocopy-ready monthly planning page, a weekly rhythm planner, a subject tracker, and an AI prompt library for year and monthly planning.' },
  'hs-schedule-cards': { pal: P.coral,
    top: 'A visual schedule', mid: 'your kids can move', big: 'THEMSELVES',
    sub: '12 cut-apart homeschool routine cards. Free.',
    board: 'Homeschool AI',
    desc: 'Free homeschool weekly schedule cards: 12 cut-apart routine cards for a pocket chart or magnet board, plus a fill-in weekly grid — a visual rhythm kids can arrange themselves.' },
  'hs-planning-prompts': { pal: P.grape,
    top: '5 AI prompts for', mid: 'the planning that eats', big: 'YOUR EVENINGS',
    sub: 'Weekly plan · unit starter · leveled reading · more. Free.',
    board: 'Homeschool AI',
    desc: 'Free homeschool AI planning prompts: five copy-paste prompts for the weekly plan, unit study starter, leveled reading passages, sick-parent days, and field trip prep. Describe the learner, never the child.' },
  'ye-market-day-unit': { pal: P.coral,
    top: 'Five days,', mid: 'one market day', big: 'START A BUSINESS UNIT',
    sub: 'Brainstorm · pricing · pitch · logistics · AI helper prompts · $8',
    board: 'Young Entrepreneurs',
    desc: 'Entrepreneurship unit for kids ages 8-12: a five-day classroom or co-op market-day unit — idea brainstorm, Rule of Three pricing, sign & pitch, market day logistics, profit math — with a grown-up AI helper prompt for every step.' },
  'pitch-day-kit': { pal: P.turq,
    top: 'Plan it. Practice it.', mid: 'Pitch it in', big: '30 SECONDS',
    sub: 'Kid pitch planner + judge’s rubric, ages 8–12. Free.',
    board: 'Young Entrepreneurs',
    desc: 'Free Shark Tank pitch day kit for kids: a business pitch planner and a four-category judge’s rubric, plus a grown-up AI coach page for gentle practice questions. Ages 8-12.' },
  'biz-idea-activities': { pal: P.grass,
    top: 'Ages 9–12,', mid: 'work through it', big: 'ON YOUR OWN',
    sub: 'The problem hunt, a need checklist, sell it in one sentence. Free.',
    board: 'Young Entrepreneurs',
    desc: 'Free entrepreneurship activities for kids ages 9-12: the problem hunt, a community-need checklist, rate-your-idea self-check, and selling it in one sentence — independent-work business idea starter.' },
  'dhh-self-advocacy-pack': { pal: P.blue,
    top: 'Self-advocacy', mid: 'a student can', big: 'GROW WITH',
    sub: '"I need..." starters · self-check · scripts · scenarios · $6',
    board: 'Deaf Education',
    desc: 'Self-advocacy worksheets for Deaf and hard of hearing (DHH) students: "I need..." sentence starters, a weekly self-check, a meeting-a-new-teacher script builder, and real-situation practice scenarios. Built and audited by two certified teachers — and the parents of a deaf child.' },
  'dhh-advocacy-scripts': { pal: P.grape,
    top: 'When the words', mid: 'are the hardest part', big: '"I NEED..." CARDS',
    sub: '8 cut-apart self-advocacy cards for DHH & SPED students. Free.',
    board: 'Deaf Education',
    desc: 'Free self-advocacy cards for Deaf and hard of hearing (DHH) students: eight cut-apart "I need..." cards for real classroom moments, plus a teacher quick-reference for how to respond to each one.' },
  'dhh-access-checklist': { pal: P.coral,
    top: 'A DHH student', mid: 'is joining your class', big: 'THE SETUP CHECKLIST',
    sub: 'Before day one + every day, for the gen-ed room. Free.',
    board: 'Deaf Education',
    desc: 'Free classroom access checklist for Deaf and hard of hearing (DHH) students in gen ed: seating, captions, communication repair, and a before-day-one checklist for the itinerant Teacher of the Deaf to hand any gen-ed teacher.' },
  'dhh-exec-functioning': { pal: P.grass,
    mid: 'a direction shouldn’t mean', top: 'Missing', big: 'MISSING THE WORK',
    sub: 'Task-planning checklist + self-check card for DHH students. Free.',
    board: 'Deaf Education',
    desc: 'Free executive functioning checklists for Deaf and hard of hearing (DHH) students: a task-planning checklist, a materials checklist, and a three-question self-check-in card for the planning load a missed direction adds.' },
  'cvc-unit1-short-a': { pal: P.coral,
    top: 'CVC worksheets', mid: 'that tell you what to do next', big: 'SCORE IT. THEN MOVE.',
    sub: 'Six practice pages, a 10-word probe, and an AI Growth Eval.',
    board: 'Reading Intervention',
    desc: 'CVC words worksheets for short A: six no-prep practice pages, a ten-word probe and a four-week data sheet, plus an AI Growth Eval that turns the score into your next three moves. Grades K-2 reading intervention. From two certified teachers.' },
};

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

function shotsFor(l) {
  // Cap at 2 real pages, shown large — a crowded row of 3 small pages reads
  // busy and the page content is unreadable at pin size (owner directive
  // 2026-08-30: cleaner, more fun, actual pages large).
  if (l.previewShots && l.previewShots.length >= 2) return l.previewShots.slice(0, 2);
  // free PDFs: render first two pages once, reuse until the PDF changes
  const pdf = path.join(ROOT, l.product);
  const outs = [1, 2].map(n => `${l.id}_pin${n}.png`);
  const need = outs.some(o =>
    !fs.existsSync(path.join(SRC, o)) ||
    fs.statSync(path.join(SRC, o)).mtimeMs < fs.statSync(pdf).mtimeMs);
  if (need) {
    execFileSync('python3', ['-c', `
import pymupdf
d = pymupdf.open(${JSON.stringify(pdf)})
for i in range(min(2, len(d))):
    d[i].get_pixmap(dpi=110).save(${JSON.stringify(SRC + '/')} + ${JSON.stringify(l.id)} + f'_pin{i+1}.png')
`]);
  }
  return outs.filter(o => fs.existsSync(path.join(SRC, o)));
}

function badgeFor(l) {
  if (l.price === 0) return { b: 'FREE', s: 'download' };
  const m = (l.filesBadge || '').match(/(\d+)\s*(\w+)/);
  if (m) return { b: m[1], s: m[2] };
  return { b: '$' + l.price, s: 'on TpT' };
}

function html(l, c) {
  const shots = shotsFor(l);
  const badge = badgeFor(l);
  // Two shapes only, both large: a single big hero page, or a big hero with
  // a second page peeking out behind it. No more three-across small pages —
  // the point of a pin is a reader can actually make out what's on the page.
  const shotHtml = shots.length >= 2
    ? `<div class="shot h2"><img src="${b64(shots[1])}"></div>
       <div class="shot h1"><img src="${b64(shots[0])}"></div>`
    : `<div class="shot h0"><img src="${b64(shots[0])}"></div>`;
  return `<!doctype html><html><head><meta charset="utf-8"><style>
${font('Luckiest', 'luckiest-guy/files/luckiest-guy-latin-400-normal.woff2')}
${font('Baloo', 'baloo-2/files/baloo-2-latin-700-normal.woff2')}
${font('Baloo8', 'baloo-2/files/baloo-2-latin-800-normal.woff2')}
*{margin:0;padding:0;box-sizing:border-box}
body{width:1000px;height:1500px;background:${c.pal.field};font-family:Baloo,sans-serif;
     position:relative;overflow:hidden}
.doodles{position:absolute;inset:0}
.dot{position:absolute;border-radius:50%}
.head{position:relative;padding:52px 60px 0;text-align:center}
.top{font-family:Baloo8,sans-serif;font-size:46px;color:#fff;line-height:1.05;text-shadow:0 3px 0 rgba(0,0,0,.18)}
.mid{font-family:Baloo8,sans-serif;font-size:46px;color:${c.pal.cta};line-height:1.05;text-shadow:0 3px 0 rgba(0,0,0,.18)}
.big{font-family:Luckiest,cursive;font-size:68px;line-height:.98;color:#fff;margin-top:14px;
     -webkit-text-stroke:8px #17293B;paint-order:stroke fill;letter-spacing:.5px}
.sub{margin:20px auto 0;max-width:800px;background:#fff;border:5px solid #17293B;border-radius:18px;
     padding:13px 22px;font-size:25px;font-weight:700;color:#17293B;line-height:1.3}
.stage{position:absolute;left:0;right:0;top:452px;height:842px}
.shot{position:absolute;border:6px solid #17293B;border-radius:14px;background:#fff;
      box-shadow:0 26px 48px rgba(0,0,0,.35);overflow:hidden}
.shot img{display:block;width:100%}
.h0{width:600px;left:200px;top:40px;transform:rotate(-1.5deg);z-index:3}
.h1{width:560px;left:230px;top:90px;transform:rotate(2deg);z-index:3}
.h2{width:520px;left:40px;top:0px;transform:rotate(-9deg);z-index:2;filter:brightness(.96)}
.badge{position:absolute;right:38px;top:410px;z-index:6;width:150px;height:150px;border-radius:50%;
       background:${c.pal.cta};border:7px solid #17293B;display:flex;flex-direction:column;
       align-items:center;justify-content:center;transform:rotate(11deg);
       box-shadow:0 10px 0 rgba(0,0,0,.15)}
.badge b{font-family:Luckiest,cursive;font-size:${badge.b.length > 3 ? 32 : 41}px;color:#17293B;line-height:.9}
.badge span{font-size:20px;font-weight:800;color:#17293B;margin-top:2px}
.foot{position:absolute;left:0;right:0;bottom:0;padding:0 60px 44px;text-align:center;z-index:20}
.cta{display:inline-block;background:${c.pal.cta};color:${c.pal.ctaInk};border:6px solid #17293B;
     border-radius:52px;padding:19px 60px;font-family:Luckiest,cursive;font-size:40px;
     box-shadow:0 9px 0 #17293B}
.byline{margin-top:24px;font-size:25px;font-weight:800;color:#fff;letter-spacing:.6px}
.store{margin-top:5px;font-size:22px;font-weight:700;color:rgba(255,255,255,.86)}
</style></head><body>
  <div class="doodles">
    ${doodle(-30, 200, -18, 160, SPARK)}
    ${doodle(870, 90, 22, 150, STAR)}
    ${doodle(-25, 1330, 12, 140, BULB)}
    ${doodle(60, 1390, -14, 110, CHAT)}
    ${doodle(895, 1360, -20, 130, PENCIL)}
    ${[[60,340,'#fff',.5,13],[920,300,c.pal.cta,.9,10],[45,1250,c.pal.cta,.85,11],
       [935,1230,'#fff',.45,9],[500,60,'#fff',.35,8],[70,780,'#fff',.3,16],
       [930,900,'#fff',.3,14]].map(([x,y,col,op,r]) =>
      `<div class="dot" style="left:${x}px;top:${y}px;width:${r}px;height:${r}px;background:${col};opacity:${op}"></div>`).join('')}
  </div>
  <div class="head">
    <div class="top">${c.top}</div>
    <div class="mid">${c.mid}</div>
    <div class="big">${c.big}</div>
    <div class="sub">${c.sub}</div>
  </div>
  <div class="stage">${shotHtml}</div>
  <div class="badge"><b>${badge.b}</b><span>${badge.s}</span></div>
  <div class="foot">
    <div class="cta">${l.price === 0 ? 'FREE ON TPT' : 'SEE IT ON TPT'}</div>
    <div class="byline">Built by two certified teachers</div>
    <div class="store">AI-Ready School on Teachers Pay Teachers</div>
  </div>
</body></html>`;
}

function pinsTxt() {
  // Mirrors Pinterest's "Create Pin" form top to bottom (owner screenshot,
  // 2026-08-24): media > Title > Description > Link > Board > Tagged topics >
  // Tag Products > Publish at a later date > Mark as AI-Modified.
  const rows = [...listings].sort((a, b) => a.order - b.order).map(l => {
    const c = PIN_COPY[l.id];
    if (!c) return '';
    return `------------------------------------------------------------------
${l.name.toUpperCase()}
------------------------------------------------------------------

--- UPLOAD YOUR MEDIA ---

${l.id}-pin.png   (in this folder; PNG, well under the 20 MB cap)

--- TITLE ---

${l.title.split('|')[0].trim()} | ${l.price === 0 ? 'Free Teacher Resource' : 'Teachers Pay Teachers'}

--- DESCRIPTION ---

${c.desc}

--- LINK ---

Paste this listing's TPT URL (your store > open the listing > copy the address bar)

--- BOARD ---

${c.board}   <- create once, reuse forever

--- TAGGED TOPICS ---

Try: ${l.tags.slice(0, 3).join(' · ')}   <- pick whatever Pinterest's search suggests closest

--- TAG PRODUCTS ---

Skip.

--- PUBLISH AT A LATER DATE ---

Skip (publish now). Exception: seasonal pins go out 30-45 days before
the season — use this toggle to schedule those.

--- MARK AS AI-MODIFIED ---

Toggle ON (the pin graphic and product were made partly with AI — that's
our honest provenance line everywhere else too). Leave "AI-generated
person" UNCHECKED (there are no people in these pins).
`;
  }).join('\n');
  return `==================================================================
PINTEREST UPLOAD SHEET — one pin per listing
Fields below follow Pinterest's "Create Pin" form top to bottom.
Boards to create once: AI for Teachers · AI Staff PD · Sub Plans &
Time Savers · Parent Communication · Back to School · Homeschool AI ·
Young Entrepreneurs · Deaf Education
Tip: you can select MULTIPLE pin PNGs at once in the uploader and work
through the drafts list on the left, one per listing.
==================================================================

${rows}`;
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const page = await browser.newPage({ viewport: { width: 1000, height: 1500 } });
  for (const l of [...listings].sort((a, b) => a.order - b.order)) {
    const c = PIN_COPY[l.id];
    if (!c || !l.product) continue;
    await page.setContent(html(l, c), { waitUntil: 'networkidle' });
    const out = path.join(OUT, l.id + '-pin.png');
    await page.screenshot({ path: out });
    console.log('built', path.relative(ROOT, out));
  }
  await browser.close();
  fs.writeFileSync(path.join(OUT, 'PINS.txt'), pinsTxt());
  console.log('built tpt/pins/PINS.txt');
})();
