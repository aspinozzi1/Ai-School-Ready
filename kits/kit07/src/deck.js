#!/usr/bin/env node
/* Kit 7 Presentation Deck · AI for Workload: Winning Back an Hour a Week
   30 slides, locked AI-Ready School brand, speaker notes on every slide.
   Build: node kits/kit07/src/deck.js  → kits/kit07/Kit07_PresentationDeck.pptx */
const pptxgen = require('pptxgenjs');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const NAVY = '13293D', TEAL = '2A9D8F', AMBER = 'F4A825', PAPER = 'F7F5F0',
      INK = '1B1F24', WHITE = 'FFFFFF', MUTED = '5B6B7A',
      GOOD = '2E7D5B', BAD = 'B4453A';
const FONT = 'Inter';
const W = 13.33, H = 7.5;

(async () => {
  const root = path.resolve(__dirname, '../../..');
  const markSvg = fs.readFileSync(path.join(root, 'public/brand/mark.svg'));
  const markDarkSvg = Buffer.from(markSvg.toString().replace(/#13293D/g, '#FFFFFF'));
  const markPng = 'image/png;base64,' + (await sharp(markSvg, { density: 300 }).resize(256, 236).png().toBuffer()).toString('base64');
  const markDarkPng = 'image/png;base64,' + (await sharp(markDarkSvg, { density: 300 }).resize(256, 236).png().toBuffer()).toString('base64');

  const p = new pptxgen();
  p.defineLayout({ name: 'WIDE', width: W, height: H });
  p.layout = 'WIDE';
  p.author = 'Adam & Katelyn Spinozzi';
  p.company = 'AI-Ready School';
  p.title = 'Kit 7: AI for Workload: Winning Back an Hour a Week';

  const RIVERA = [null,
    "Her week: 54 hours, and the pile that isn't teaching keeps growing.",
    "Her recoverable hours: the drafting share of documentation, planning admin, boilerplate.",
    "Her goal: week audited, two tasks automated, protected list written.",
    "Her sort, question 1: does this task require knowing my kids?",
    "Her sort, question 2: does it repeat? Repeating + generic = automate it.",
    "Her delegate pile: sub plans, reformatting, boilerplate, first drafts.",
    "Her banner: save time ON teaching, not FROM teaching.", null,
    "Her recipe: template any repeating task with [PLACEHOLDERS], build once, reuse forever.",
    "Her batching move: one sitting, five artifacts; plus the staff doc so nobody solves twice.",
    "Her quadrant calls: relational stays, repetitive-generic goes.",
    "Her guardrail: 'AI drafts it' never drifts into 'AI decides it.'",
    "Her protected list: feedback conversations, grading judgment, greeting kids at the door.",
    "Her hour, spent on purpose: planning she enjoys, and leaving at a human time.",
    "Her never list: no delegating the relational, no skipping review, no new busywork.",
    "Her why: the sustainable version of this job is the one she can keep.",
    "Her lab artifact: her own week audit, one sheet worked through all four steps.",
    "Her week audit, step 1: every repeater listed and starred; worst star, the sub plan.",
    "Her week audit, step 2: the worst star, the sub plan, is now template #1, tested twice.",
    "Her week audit, step 3: star #2, exit tickets, is template #2; both go to the staff doc.",
    "Her week audit, step 4: the unstarred column becomes her protected list, in ink.",
    "Her share-out, from the same audit: the sub plan star, and the evenings it frees.",
    "Her inventory: audit done, two templates live, protected list written.",
    "Her honest limits: the tool saves time; it doesn't set boundaries. She does.",
    "Her commitments: two templates in use, review always, the protected list protected.",
    "Her month: template check-ins, a shared library sprint, an hours reckoning.",
    "Her 48 hours: run both templates for real; put the hour somewhere human.",
    "Her exit ticket: her two tasks, her protected list's first line.", null];
  let slideNo = 0;
  function base(dark = false) {
    const s = p.addSlide();
    slideNo++;
    s.background = { color: dark ? NAVY : WHITE };
    if (slideNo > 1) {
      s.addImage({ data: dark ? markDarkPng : markPng, x: 0.45, y: H - 0.42, w: 0.26, h: 0.24 });
      s.addText([
        { text: 'AI-Ready', options: { color: TEAL, bold: true } },
        { text: ' School', options: { color: dark ? WHITE : NAVY, bold: true } },
      ], { x: 0.75, y: H - 0.47, w: 2.2, h: 0.32, fontFace: FONT, fontSize: 10, margin: 0, valign: 'middle' });
      s.addText(`Kit 7 · AI for Workload   |   ${slideNo}`, {
        x: W - 3.9, y: H - 0.47, w: 3.45, h: 0.32, fontFace: FONT, fontSize: 9,
        color: dark ? '9FB2C2' : MUTED, align: 'right', margin: 0, valign: 'middle' });
      if (RIVERA[slideNo - 1]) {
        const rx = 9.55, ry = 0.12, rw = 3.2, rh = 0.98;
        s.addShape('roundRect', { x: rx, y: ry, w: rw, h: rh, rectRadius: 0.07, fill: { color: dark ? '1E3A50' : 'F7F5F0' }, line: { color: dark ? '2A4A63' : 'DCE3EA', width: 1 } });
        s.addShape('roundRect', { x: rx, y: ry, w: rw, h: 0.26, rectRadius: 0.07, fill: { color: '0D1E2E' }, line: { color: '0D1E2E' } });
        ['E8837A', 'F4A825', '2E7D5B'].forEach((c, i) => s.addShape('ellipse', { x: rx + 0.1 + i * 0.16, y: ry + 0.08, w: 0.1, h: 0.1, fill: { color: c }, line: { color: c } }));
        s.addText("MS. RIVERA'S SCREEN · SO FAR", { x: rx + 0.62, y: ry, w: rw - 0.7, h: 0.26, fontFace: FONT, fontSize: 8, bold: true, color: '9FB2C2', charSpacing: 1, margin: 0, valign: 'middle' });
        s.addText(RIVERA[slideNo - 1], { x: rx + 0.14, y: ry + 0.28, w: rw - 0.28, h: rh - 0.36, fontFace: FONT, fontSize: 10, color: dark ? 'C9D4DE' : INK, margin: 0, valign: 'middle' });
      }
    }
    return s;
  }
  function title(s, txt, opts = {}) {
    s.addText(txt, Object.assign({
      x: 0.6, y: 0.42, w: W - 1.2, h: 0.85, fontFace: FONT, fontSize: 32,
      bold: true, color: NAVY, margin: 0, valign: 'middle',
    }, opts));
  }
  function kicker(s, txt, opts = {}) {
    s.addText(txt.toUpperCase(), Object.assign({
      x: 0.62, y: 0.14, w: W - 1.24, h: 0.3, fontFace: FONT, fontSize: 12,
      bold: true, color: TEAL, charSpacing: 2, margin: 0, valign: 'middle',
    }, opts));
  }
  function bullets(s, items, opts = {}) {
    const runs = items.map((it, i) => (typeof it === 'string'
      ? { text: it, options: { bullet: { color: TEAL }, breakLine: i < items.length - 1, paraSpaceAfter: 10 } }
      : { text: it.text, options: Object.assign({ bullet: { color: TEAL }, breakLine: i < items.length - 1, paraSpaceAfter: 10 }, it.options) }));
    s.addText(runs, Object.assign({
      x: 0.7, y: 1.5, w: W - 1.4, h: 4.7, fontFace: FONT, fontSize: 21,
      color: INK, valign: 'top',
    }, opts));
  }
  function card(s, x, y, w, h, fill = PAPER, line) {
    s.addShape('roundRect', { x, y, w, h, rectRadius: 0.09, fill: { color: fill },
      line: line ? { color: line, width: 1 } : { color: fill } });
  }

  // ============================== SLIDE 1 · TITLE ==============================
  {
    const s = base(true);
    s.addImage({ data: markDarkPng, x: 0.85, y: 0.8, w: 1.15, h: 1.06 });
    s.addText([
      { text: 'AI-Ready', options: { color: TEAL, bold: true } },
      { text: ' School', options: { color: WHITE, bold: true } },
    ], { x: 2.15, y: 1.05, w: 4, h: 0.6, fontFace: FONT, fontSize: 26, margin: 0, valign: 'middle' });
    s.addText('TRACK A · AI FOUNDATIONS · KIT 7 OF 20', {
      x: 0.9, y: 3.0, w: 9, h: 0.4, fontFace: FONT, fontSize: 15, bold: true,
      color: AMBER, charSpacing: 3, margin: 0 });
    s.addText('AI for Workload:\nWinning Back an Hour a Week', {
      x: 0.85, y: 3.35, w: 11.8, h: 2.0, fontFace: FONT, fontSize: 40, bold: true,
      color: WHITE, margin: 0, valign: 'middle', lineSpacingMultiple: 1.05 });
    s.addText('A 45–60 minute working session. You leave with your week audited, your two worst repeaters automated, and the human work protected in ink.', {
      x: 0.9, y: 5.45, w: 11.2, h: 0.5, fontFace: FONT, fontSize: 18, color: 'C9D4DE', margin: 0 });
    s.addText('Built by Adam & Katelyn Spinozzi · certified educators · 20+ combined years in the classroom', {
      x: 0.9, y: 6.6, w: 11.5, h: 0.4, fontFace: FONT, fontSize: 12, color: '9FB2C2', margin: 0 });
    s.addNotes('Slide up as people arrive. Start on time. Say: today is about the week itself: the pile handed off, the human parts protected on purpose.');
  }

  // ============================== SLIDE 2 · THE PILE, MEASURED ==============================
  {
    const s = base();
    kicker(s, 'First place, in the wrong race');
    title(s, 'The pile, measured');
    card(s, 0.7, 1.75, 5.75, 3.7, PAPER);
    s.addText('THE WEEK', { x: 0.7, y: 1.95, w: 5.75, h: 0.35, fontFace: FONT, fontSize: 13, bold: true, color: NAVY, align: 'center', charSpacing: 2, margin: 0 });
    s.addText('~54 hrs', { x: 0.7, y: 2.3, w: 5.75, h: 1.05, fontFace: FONT, fontSize: 52, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addText('The teacher work week, less than half of it direct teaching. The rest is the pile. (Merrimack College/EdWeek, 2022)', {
      x: 1.0, y: 3.4, w: 5.15, h: 1.9, fontFace: FONT, fontSize: 16, color: INK, align: 'center', margin: 0 });
    card(s, 6.85, 1.75, 5.75, 3.7, 'FBEFED');
    s.addText('BURNOUT, RANKED BY INDUSTRY', { x: 6.85, y: 1.95, w: 5.75, h: 0.35, fontFace: FONT, fontSize: 13, bold: true, color: BAD, align: 'center', charSpacing: 2, margin: 0 });
    s.addText('#1: K-12', { x: 6.85, y: 2.3, w: 5.75, h: 1.05, fontFace: FONT, fontSize: 52, bold: true, color: BAD, align: 'center', margin: 0 });
    s.addText('44% of K-12 workers, and 52% of teachers, feel burned out "always" or "very often": the highest of any U.S. industry, vs. 30% of all other workers. (Gallup, 2022)', {
      x: 7.15, y: 3.4, w: 5.15, h: 1.9, fontFace: FONT, fontSize: 16, color: INK, align: 'center', margin: 0 });
    s.addText('The pile is not a personal failing. It\'s the job\'s design flaw, and today we go after it.', {
      x: 0.7, y: 5.85, w: 12.0, h: 0.55, fontFace: FONT, fontSize: 20, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('Say the numbers plainly, not performed; the room lives them. Both verified: Merrimack/EdWeek 2022; Gallup Panel Workforce Study 2022.');
  }

  // ============================== SLIDE 3 · THE RECOVERABLE SHARE ==============================
  {
    const s = base();
    kicker(s, 'The hopeful number');
    title(s, 'The recoverable share');
    card(s, 0.7, 1.75, 12.0, 3.3, 'EAF5F3');
    s.addText('~5.9 hrs / week', { x: 0.7, y: 2.15, w: 12.0, h: 1.2, fontFace: FONT, fontSize: 58, bold: true, color: TEAL, align: 'center', margin: 0 });
    s.addText('reported back by teachers who\'ve made AI a weekly habit: roughly six weeks a year, recovered from the drafting share of the pile: documentation, planning admin, reformatting, routine writing. (Gallup & Walton Family Foundation, 2025)', {
      x: 1.4, y: 3.5, w: 10.5, h: 1.4, fontFace: FONT, fontSize: 17, color: INK, align: 'center', margin: 0 });
    s.addText('Every kit so far handed you one piece. Today we audit the whole week at once.', {
      x: 0.7, y: 5.5, w: 12.0, h: 0.55, fontFace: FONT, fontSize: 20, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('Say: not from teaching: from the drafting share. The savings compound when you can see the whole pile in one place.');
  }

  // ============================== SLIDE 4 · AGENDA ==============================
  {
    const s = base();
    kicker(s, 'The hour ahead');
    title(s, 'Agenda, and one promise');
    const rows = [
      ['0:06', 'The two-question sort: what\'s delegable, what never was'],
      ['0:12', 'The automation moves: templates, batching, the library'],
      ['0:21', 'Keeping it honest: the drift, the protected list, the hour'],
      ['0:30', 'Lab: your real week, audited and automated'],
      ['0:53', 'Making it stick + first 48 hours'],
    ];
    rows.forEach(([t, txt], i) => {
      const y = 1.6 + i * 0.8;
      s.addText(t, { x: 0.9, y, w: 1.1, h: 0.6, fontFace: FONT, fontSize: 20, bold: true, color: TEAL, margin: 0, valign: 'middle' });
      s.addText(txt, { x: 2.1, y, w: 7.4, h: 0.6, fontFace: FONT, fontSize: 20, color: INK, margin: 0, valign: 'middle' });
    });
    card(s, 9.9, 2.1, 2.85, 3.2, NAVY);
    s.addText('One promise', { x: 10.15, y: 2.35, w: 2.35, h: 0.4, fontFace: FONT, fontSize: 16, bold: true, color: AMBER, margin: 0 });
    s.addText('You leave with the hour already located: week audited, two templates built and tested, protected list in ink.', {
      x: 10.15, y: 2.8, w: 2.35, h: 2.3, fontFace: FONT, fontSize: 13.5, color: WHITE, margin: 0, valign: 'top' });
    s.addNotes('Say: you leave with the hour located, not with advice about finding one. Keep this quick.');
  }

  // ============================== SLIDE 5 · QUESTION 1 ==============================
  {
    const s = base();
    kicker(s, 'The sort · question 1 of 2');
    title(s, 'Does it require knowing my kids?');
    card(s, 0.7, 1.7, 5.9, 4.3, 'EAF5F3');
    s.addText('YES · STAYS YOURS', { x: 1.05, y: 1.95, w: 5.25, h: 0.4, fontFace: FONT, fontSize: 15, bold: true, color: GOOD, margin: 0 });
    s.addText('Reading the room mid-lesson. Noticing the quiet kid got quieter. Feedback conversations. Which group a struggling reader joins. Judgment about real children.', {
      x: 1.05, y: 2.45, w: 5.25, h: 3.3, fontFace: FONT, fontSize: 17, color: INK, margin: 0, valign: 'top' });
    card(s, 6.85, 1.7, 5.9, 4.3, PAPER);
    s.addText('NO · DRAFTABLE', { x: 7.2, y: 1.95, w: 5.25, h: 0.4, fontFace: FONT, fontSize: 15, bold: true, color: TEAL, margin: 0 });
    s.addText('The weekly newsletter shell. The third sub plan of the semester. Turning your notes into a rubric. Reformatting anything. Tasks that need your time, not your judgment.', {
      x: 7.2, y: 2.45, w: 5.25, h: 3.3, fontFace: FONT, fontSize: 17, color: INK, margin: 0, valign: 'top' });
    s.addText('The pile survives on tasks pretending they need your judgment when they only need your time.', {
      x: 0.7, y: 6.15, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 18, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('Say: be honest and specific per task. The bottom line is the sentence to repeat.');
  }

  // ============================== SLIDE 6 · QUESTION 2 ==============================
  {
    const s = base();
    kicker(s, 'The sort · question 2 of 2');
    title(s, 'Does it repeat?');
    const cells = [
      ['Repeats + doesn\'t need my kids', 'TEMPLATE IT', 'EAF5F3', GOOD, 'Today\'s quadrant: the six weeks a year live here'],
      ['One-off + doesn\'t need my kids', 'Good prompt', PAPER, NAVY, 'Kit 2 style, worth two minutes'],
      ['Repeats + needs my kids', 'Yours, AI-assisted shells', PAPER, NAVY, 'No student info in; personalize everything'],
      ['One-off + needs my kids', 'Yours entirely', PAPER, NAVY, 'That\'s teaching'],
    ];
    cells.forEach(([label, verdict, fill, color, note], i) => {
      const x = 0.7 + (i % 2) * 6.15, y = 1.6 + Math.floor(i / 2) * 2.3;
      card(s, x, y, 5.85, 2.1, fill);
      s.addText(label, { x: x + 0.3, y: y + 0.18, w: 5.25, h: 0.45, fontFace: FONT, fontSize: 15, bold: true, color: MUTED, margin: 0 });
      s.addText(verdict, { x: x + 0.3, y: y + 0.65, w: 5.25, h: 0.55, fontFace: FONT, fontSize: 22, bold: true, color, margin: 0 });
      s.addText(note, { x: x + 0.3, y: y + 1.25, w: 5.25, h: 0.75, fontFace: FONT, fontSize: 14.5, color: INK, margin: 0 });
    });
    s.addNotes('Say: a one-off is worth a good prompt; a repeater is worth a template, because it pays every week. Only the top-left quadrant matters today.');
  }

  // ============================== SLIDE 7 · THE DELEGATE PILE ==============================
  {
    const s = base();
    kicker(s, 'From real classrooms');
    title(s, 'What lands in the delegate pile');
    bullets(s, [
      'Sub plans · station directions · quiz shells and exit tickets',
      'Newsletter frames · materials lists · syllabus updates',
      'Documentation summaries (de-identified) · rubric drafts',
      'Recommendation-letter outlines, personalized after',
    ], { y: 1.55, h: 3.3 });
    card(s, 0.7, 5.0, 12.0, 1.3, 'EAF5F3');
    s.addText('None need your judgment to draft; all need your review to ship. Drafting is delegable. Deciding never is.', {
      x: 1.05, y: 5.15, w: 11.3, h: 1.0, fontFace: FONT, fontSize: 19, bold: true, color: NAVY, margin: 0, valign: 'middle' });
    s.addNotes('The distinction in the callout is the whole game; say it twice.');
  }

  // ============================== SLIDE 8 · THE BANNER ==============================
  {
    const s = base(true);
    s.addText('THE BANNER OVER TODAY', { x: 0.9, y: 1.7, w: 11.5, h: 0.5, fontFace: FONT, fontSize: 15, bold: true, color: AMBER, charSpacing: 3, margin: 0 });
    s.addText('Save time ON teaching,\nnot FROM teaching.', {
      x: 0.9, y: 2.3, w: 11.5, h: 1.9, fontFace: FONT, fontSize: 44, bold: true, color: WHITE, margin: 0, lineSpacingMultiple: 1.1 });
    s.addText('The hour we recover comes out of the pile, never out of the classroom. If a shortcut starts taking time from kids instead of paperwork, it\'s not a shortcut we teach.', {
      x: 0.9, y: 4.5, w: 11.3, h: 1.2, fontFace: FONT, fontSize: 19, color: 'C9D4DE', margin: 0 });
    s.addNotes('Dark slide, said slowly. The protected list later makes this permanent.');
  }

  // ============================== SLIDE 9 · THE RECURRING-TASK TEMPLATE ==============================
  {
    const s = base();
    kicker(s, 'The flagship move · on Ms. Rivera\'s screen');
    title(s, 'The sub plan she never writes again');
    s.addShape('roundRect', { x: 0.7, y: 1.5, w: 12.0, h: 4.3, rectRadius: 0.1, fill: { color: WHITE }, line: { color: 'DCE3EA', width: 1.5 } });
    s.addShape('roundRect', { x: 0.7, y: 1.5, w: 12.0, h: 0.42, rectRadius: 0.1, fill: { color: NAVY }, line: { color: NAVY } });
    ['E8837A', AMBER, GOOD].forEach((c, i) => s.addShape('ellipse', { x: 0.95 + i * 0.27, y: 1.63, w: 0.16, h: 0.16, fill: { color: c }, line: { color: c } }));
    s.addText('AI chat tool (any of them) · Ms. Rivera, our running example teacher (a composite, not a real person)', {
      x: 1.95, y: 1.5, w: 10.6, h: 0.42, fontFace: FONT, fontSize: 11, color: '9FB2C2', margin: 0, valign: 'middle' });
    s.addShape('roundRect', { x: 1.7, y: 2.15, w: 10.55, h: 3.4, rectRadius: 0.12, fill: { color: PAPER }, line: { color: PAPER } });
    s.addText([
      { text: '"You are an experienced teacher writing for a substitute who has never met these students. ', options: { color: TEAL, bold: true } },
      { text: 'Write a one-page sub plan ', options: { color: NAVY, bold: true } },
      { text: 'for a [GRADE] class covering [TOPIC]. Context: the class routine that works is [ROUTINE]. ', options: { color: 'B07914', bold: true } },
      { text: 'Format: a bell-ringer, a main activity with simple numbered directions, an early-finisher task, and management notes."', options: { color: GOOD, bold: true } },
    ], { x: 1.95, y: 2.3, w: 10.05, h: 2.4, fontFace: FONT, fontSize: 16, margin: 0, valign: 'top', lineSpacingMultiple: 1.12 });
    s.addText('The brackets are the template: she fills three and runs it. Ninety seconds, every absence, forever.', {
      x: 1.95, y: 4.95, w: 10.05, h: 0.5, fontFace: FONT, fontSize: 14, italic: true, color: MUTED, margin: 0 });
    const chips = [['ROLE', TEAL], ['TASK', NAVY], ['CONTEXT', 'B07914'], ['FORMAT', GOOD]];
    chips.forEach(([t, c], i) => {
      const x = 0.7 + i * 3.08;
      s.addShape('roundRect', { x, y: 6.05, w: 2.85, h: 0.5, rectRadius: 0.25, fill: { color: c }, line: { color: c } });
      s.addText(t, { x, y: 6.05, w: 2.85, h: 0.5, fontFace: FONT, fontSize: 14, bold: true, color: WHITE, align: 'center', valign: 'middle', margin: 0, charSpacing: 2 });
    });
    s.addNotes('Say: a template is a prompt with the thinking done once. If you\'ve templated a repeater of your own, name it here; the local example lands best. This is the shape to mimic in the lab.');
  }

  // ============================== SLIDE 10 · THE RECIPE ==============================
  {
    const s = base();
    kicker(s, 'Generalize it to any repeater');
    title(s, 'The template recipe');
    const steps = [
      ['1', 'Write it once', 'Four-part prompt for one real instance of the task, Kit 2 style'],
      ['2', 'Bracket the changes', 'Everything that varies week to week becomes [TOPIC], [GRADE], [DATE], [SKILL]'],
      ['3', 'Test it twice', 'Run a second real instance; where it wobbles, add context. Works twice = template. Save it.'],
    ];
    steps.forEach(([n, h, b], i) => {
      const y = 1.6 + i * 1.45;
      s.addShape('ellipse', { x: 0.9, y: y + 0.22, w: 0.8, h: 0.8, fill: { color: TEAL }, line: { color: TEAL } });
      s.addText(n, { x: 0.9, y: y + 0.22, w: 0.8, h: 0.8, fontFace: FONT, fontSize: 26, bold: true, color: WHITE, align: 'center', margin: 0, valign: 'middle' });
      card(s, 1.95, y, 10.7, 1.25, PAPER);
      s.addText(h, { x: 2.3, y: y + 0.12, w: 10.0, h: 0.45, fontFace: FONT, fontSize: 19, bold: true, color: NAVY, margin: 0 });
      s.addText(b, { x: 2.3, y: y + 0.58, w: 10.0, h: 0.6, fontFace: FONT, fontSize: 15.5, color: INK, margin: 0 });
    });
    s.addText('You\'ve just deleted a recurring task from your future.', {
      x: 0.7, y: 6.15, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 20, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('This recipe is the lab\'s engine and it\'s on the handout verbatim.');
  }

  // ============================== SLIDE 11 · BATCHING + LIBRARY ==============================
  {
    const s = base();
    kicker(s, 'Two multipliers');
    title(s, 'Batching, and the library');
    card(s, 0.7, 1.7, 5.9, 4.3, PAPER);
    s.addText('BATCHING', { x: 1.05, y: 1.95, w: 5.25, h: 0.4, fontFace: FONT, fontSize: 15, bold: true, color: TEAL, margin: 0 });
    s.addText('Same-kind tasks, one sitting, one template: five exit-ticket sets in one go instead of five late-night sessions. The setup cost is paid once; the batch rides free.', {
      x: 1.05, y: 2.45, w: 5.25, h: 3.3, fontFace: FONT, fontSize: 17, color: INK, margin: 0, valign: 'top' });
    card(s, 6.85, 1.7, 5.9, 4.3, PAPER);
    s.addText('THE LIBRARY', { x: 7.2, y: 1.95, w: 5.25, h: 0.4, fontFace: FONT, fontSize: 15, bold: true, color: TEAL, margin: 0 });
    s.addText('Every working template goes in the staff doc\'s Workload section, name attached. Thirty teachers, two templates each: sixty deleted repeaters. One person\'s Tuesday night becomes everyone\'s.', {
      x: 7.2, y: 2.45, w: 5.25, h: 3.3, fontFace: FONT, fontSize: 17, color: INK, margin: 0, valign: 'top' });
    s.addNotes('The library is the school-level win; the personal templates are the personal one. Both get built today.');
  }

  // ============================== SLIDE 12 · PRACTICE: SORT ==============================
  {
    const s = base();
    kicker(s, 'Practice · call it out');
    title(s, 'Delegate the draft, or keep it entirely?');
    const rows = [
      ['1', 'The weekly parent newsletter', 'Draft it: template + your voice pass'],
      ['2', 'Deciding which reading group a struggling student joins', 'Keep it: that\'s knowing your kids'],
      ['3', 'Turning gradebook notes into progress-report comments', 'Split it: generic shells drafted, every comment personalized, no student info in'],
      ['4', 'The phone call after a rough day', 'Keep it, always: Kit 6\'s human-only list'],
    ];
    rows.forEach(([n, scenario, answer], i) => {
      const y = 1.55 + i * 1.2;
      s.addText(n, { x: 0.8, y: y + 0.1, w: 0.6, h: 0.9, fontFace: FONT, fontSize: 22, bold: true, color: TEAL, margin: 0, valign: 'middle' });
      s.addText(scenario, { x: 1.5, y: y + 0.05, w: 6.3, h: 1.0, fontFace: FONT, fontSize: 16.5, color: INK, margin: 0, valign: 'middle' });
      s.addText(answer, { x: 8.0, y: y + 0.05, w: 4.7, h: 1.0, fontFace: FONT, fontSize: 14, color: MUTED, margin: 0, valign: 'middle' });
    });
    s.addNotes('Let the room call each one before you confirm with the right column. 45-min cut: rows 1 and 4 only.');
  }

  // ============================== SLIDE 13 · THE DRIFT ==============================
  {
    const s = base();
    kicker(s, 'Efficiency\'s failure mode');
    title(s, 'The drift');
    card(s, 0.7, 1.7, 12.0, 2.2, NAVY);
    s.addText('"AI drafts it" quietly becoming "AI decides it."', {
      x: 1.1, y: 1.95, w: 11.2, h: 1.7, fontFace: FONT, fontSize: 26, bold: true, color: WHITE, margin: 0, valign: 'middle' });
    bullets(s, [
      'It starts innocently: an unreviewed sub plan here, an unread comment there',
      { text: 'The antidote is the rule you\'ve carried since Kit 1: everything reviewed, everything touching a real student personalized. Efficiency never outranks judgment.', options: { bold: true } },
    ], { y: 4.2, h: 1.9, fontSize: 20 });
    s.addNotes('Name the drift plainly; it\'s the one way this session\'s wins turn into losses.');
  }

  // ============================== SLIDE 14 · THE PROTECTED LIST ==============================
  {
    const s = base();
    kicker(s, 'What productivity workshops skip');
    title(s, 'The protected list');
    card(s, 0.7, 1.65, 12.0, 2.5, 'EAF5F3');
    s.addText([
      { text: 'The relational work stays yours by decision, written down, not by accident.\n', options: { bold: true, color: NAVY } },
      { text: 'Ms. Rivera\'s list: feedback conversations with students · grading judgment · greeting kids at the door · the phone calls that matter.', options: { color: INK } },
    ], { x: 1.05, y: 1.9, w: 11.3, h: 2.0, fontFace: FONT, fontSize: 19, margin: 0, valign: 'middle', lineSpacingMultiple: 1.25 });
    bullets(s, [
      'Yours will differ; writing it is the point',
      { text: 'The day you\'re tired and tempted, the list is the line you already drew. In the lab, you\'ll write it in ink.', options: { bold: true } },
    ], { y: 4.45, h: 1.7, fontSize: 20 });
    s.addNotes('This slide is why the session isn\'t a productivity workshop. Never trim it.');
  }

  // ============================== SLIDE 15 · SPENDING THE HOUR ==============================
  {
    const s = base();
    kicker(s, 'Parkinson\'s law runs schools');
    title(s, 'The hour needs a name');
    bullets(s, [
      'Unspent recovered time refills with pile; decide now what your hour is for',
      'Legitimate answers: the planning you enjoy · the student who needs ten minutes · leaving at a human time',
      { text: 'The only wrong answer is "unassigned."', options: { bold: true } },
    ], { y: 1.55, h: 2.9 });
    card(s, 0.7, 4.7, 12.0, 1.5, 'EAF5F3');
    s.addText('This isn\'t about doing more. It\'s about doing the job you signed up for, sustainably.', {
      x: 1.05, y: 4.9, w: 11.3, h: 1.1, fontFace: FONT, fontSize: 21, bold: true, color: NAVY, margin: 0, valign: 'middle' });
    s.addNotes('45-min cut: this is the trimmable slide (0:26). The lab\'s protected-list step keeps the idea alive.');
  }

  // ============================== SLIDE 16 · THE NEVER LIST ==============================
  {
    const s = base(true);
    s.addText('THE NEVER LIST', { x: 0.9, y: 1.3, w: 11.5, h: 0.5, fontFace: FONT, fontSize: 15, bold: true, color: AMBER, charSpacing: 3, margin: 0 });
    const items = [
      'Never delegate the relational: if it requires knowing your kids, it\'s yours',
      'Never skip the review: unread output is the drift, and the drift is how trust dies',
      'Never let the saved hour become new busywork: that defeats the entire point',
    ];
    items.forEach((t, i) => {
      const y = 2.1 + i * 1.15;
      s.addText('✕', { x: 1.0, y, w: 0.5, h: 0.85, fontFace: FONT, fontSize: 24, bold: true, color: 'E8837A', margin: 0, valign: 'middle' });
      s.addText(t, { x: 1.7, y, w: 10.8, h: 0.85, fontFace: FONT, fontSize: 20, color: WHITE, margin: 0, valign: 'middle' });
    });
    s.addText('Leadership: the third line is partly yours to protect, out loud.', {
      x: 0.9, y: 5.9, w: 11.5, h: 0.5, fontFace: FONT, fontSize: 17, color: 'C9D4DE', margin: 0 });
    s.addNotes('Dark slide, read slowly. Never trim. If leadership is in the room, invite them to endorse line three on the spot.');
  }

  // ============================== SLIDE 17 · WHAT THIS PROTECTS ==============================
  {
    const s = base();
    kicker(s, 'The stake, plainly');
    title(s, 'What this protects: careers');
    card(s, 0.7, 1.8, 12.0, 3.6, PAPER);
    s.addText([
      { text: 'The burnout ranking isn\'t a mood; it\'s the profession\'s leading indicator, and workload is the piece a tool can actually touch.\n\n', options: { bold: true, color: NAVY } },
      { text: 'Nobody\'s claiming a chatbot fixes burnout. But six weeks a year, handed back and spent on purpose, is the difference between the version of this job that empties people out and the version a person can keep.', options: { color: INK } },
    ], { x: 1.1, y: 2.1, w: 11.2, h: 3.0, fontFace: FONT, fontSize: 20, margin: 0, valign: 'middle' });
    s.addNotes('One beat, then the lab. The honest framing (workload is one contributor, not the cure) is deliberate; keep it.');
  }

  // ============================== SLIDE 18 · LAB SETUP ==============================
  {
    const s = base(true);
    s.addText('HANDS-ON · ~22 MINUTES', { x: 0.62, y: 0.2, w: 8, h: 0.35, fontFace: FONT, fontSize: 13, bold: true, color: AMBER, charSpacing: 2, margin: 0 });
    s.addText('Lab: your week, taken back.', {
      x: 0.7, y: 1.3, w: 12.0, h: 1.2, fontFace: FONT, fontSize: 44, bold: true, color: WHITE, margin: 0 });
    s.addText('Audit the real week. Pick the two worst repeaters. Build both templates. Write the protected list.', {
      x: 0.72, y: 2.5, w: 11.8, h: 0.9, fontFace: FONT, fontSize: 20, color: 'C9D4DE', margin: 0 });
    const rules = [
      ['1', 'No student information of any kind'],
      ['2', 'Real tasks from your real week, not hypotheticals'],
      ['3', 'A template counts only after it\'s tested on a real instance'],
    ];
    rules.forEach(([n, r], i) => {
      const y = 3.75 + i * 0.9;
      s.addShape('ellipse', { x: 0.95, y: y + 0.06, w: 0.55, h: 0.55, fill: { color: TEAL }, line: { color: TEAL } });
      s.addText(n, { x: 0.95, y: y + 0.06, w: 0.55, h: 0.55, fontFace: FONT, fontSize: 20, bold: true, color: WHITE, align: 'center', margin: 0, valign: 'middle' });
      s.addText(r, { x: 1.75, y, w: 10.8, h: 0.7, fontFace: FONT, fontSize: 21, color: WHITE, margin: 0, valign: 'middle' });
    });
    s.addNotes('Dark slide. Devices out, pairs formed inside two minutes, announce the tool. Say: Ms. Rivera works ONE artifact through all four steps, her own week audit; her exemplar appears large on every step slide, so anyone lost can copy her structure.');
  }

  // ============================== SLIDE 19 · LAB STEP 1 ==============================
  {
    const s = base();
    kicker(s, 'Lab · step 1 of 4 · 5 minutes');
    title(s, 'Audit the week', { w: 8.7 });
    bullets(s, [
      'List every task from last week that you\'ll do again, small ones included',
      'Run the two questions on each: needs my kids? repeats?',
      'Star everything that repeats and doesn\'t need your kids',
      { text: 'Most people find six to ten stars. Each is a candidate.', options: { bold: true } },
    ], { x: 0.7, y: 1.7, w: 5.9, h: 4.4, fontSize: 18 });
    card(s, 6.85, 1.7, 5.9, 4.4, 'EAF5F3');
    s.addText('MS. RIVERA\'S WEEK AUDIT · STEP 1', { x: 7.15, y: 1.9, w: 5.4, h: 0.32, fontFace: FONT, fontSize: 12.5, bold: true, color: TEAL, charSpacing: 1.5, margin: 0 });
    s.addText([
      { text: '★ Sub plans, every absence\n', options: { bold: true, color: NAVY } },
      { text: '★ Exit tickets, weekly\n', options: { bold: true, color: NAVY } },
      { text: '★ Newsletter shell\n', options: { bold: true, color: NAVY } },
      { text: '★ Materials lists\n', options: { bold: true, color: NAVY } },
      { text: 'Reading groups: hers\n', options: { color: INK } },
      { text: 'Feedback chats: hers\n\n', options: { color: INK } },
      { text: 'Worst star: the sub plan.', options: { italic: true, color: MUTED } },
    ], { x: 7.15, y: 2.35, w: 5.35, h: 3.6, fontFace: FONT, fontSize: 19, margin: 0, valign: 'top', lineSpacingMultiple: 1.2 });
    s.addNotes('5 minutes. The handout has the quadrant grid. The common miss is the fifteen-minute repeaters; they\'re where the hours hide. Ms. Rivera\'s finished audit is on screen large: one sheet she carries through all four steps. Stars are her delegable repeaters; the unstarred lines stay hers. Anyone lost copies her format.');
  }

  // ============================== SLIDE 20 · LAB STEP 2 ==============================
  {
    const s = base();
    kicker(s, 'Lab · step 2 of 4 · 6 minutes');
    title(s, 'Build template #1', { w: 8.7 });
    bullets(s, [
      'Take your worst starred task: the one that costs the most evenings',
      'The recipe: write it once (four parts) → bracket the changes → test on a second instance',
      'Mimic Ms. Rivera\'s card: the sub-plan shape from slide 9',
      { text: 'When it works twice, it\'s real. Save it.', options: { bold: true } },
    ], { x: 0.7, y: 1.7, w: 5.9, h: 4.4, fontSize: 17 });
    card(s, 6.85, 1.7, 5.9, 4.4, 'EAF5F3');
    s.addText('MS. RIVERA\'S WEEK AUDIT · STEP 2', { x: 7.15, y: 1.9, w: 5.4, h: 0.32, fontFace: FONT, fontSize: 12.5, bold: true, color: TEAL, charSpacing: 1.5, margin: 0 });
    s.addText([
      { text: 'Worst star → template #1: the sub plan.\n\n', options: { bold: true, color: NAVY } },
      { text: 'Her template: slide 9\'s four-part prompt, with [GRADE], [TOPIC], and [ROUTINE] left as brackets.\n\n', options: { color: INK } },
      { text: 'Tested on a second real absence: works. Saved.', options: { italic: true, color: MUTED } },
    ], { x: 7.15, y: 2.35, w: 5.35, h: 3.6, fontFace: FONT, fontSize: 19, margin: 0, valign: 'top', lineSpacingMultiple: 1.2 });
    s.addNotes('6 minutes. Push for testing on a REAL instance, not admiring the template. Circulate. Ms. Rivera\'s card shows the same audit narrowing: her worst star, the sub plan, is now template #1, built to slide 9\'s shape and tested twice.');
  }

  // ============================== SLIDE 21 · LAB STEP 3 ==============================
  {
    const s = base();
    kicker(s, 'Lab · step 3 of 4 · 6 minutes');
    title(s, 'Build template #2, share both', { w: 8.7 });
    bullets(s, [
      'Same recipe, second-worst repeater',
      'Both templates go to the staff doc\'s Workload section: name attached, one line each',
      { text: 'Sixty deleted repeaters, remember. Your Tuesday night is about to become everyone\'s.', options: { bold: true } },
    ], { x: 0.7, y: 1.7, w: 5.9, h: 4.4, fontSize: 18 });
    card(s, 6.85, 1.7, 5.9, 4.4, 'EAF5F3');
    s.addText('MS. RIVERA\'S WEEK AUDIT · STEP 3', { x: 7.15, y: 1.9, w: 5.4, h: 0.32, fontFace: FONT, fontSize: 12.5, bold: true, color: TEAL, charSpacing: 1.5, margin: 0 });
    s.addText([
      { text: 'Star #2 → template #2: exit tickets.\n\n', options: { bold: true, color: NAVY } },
      { text: '"Write five exit-ticket questions for [OBJECTIVE], mixed recall and reasoning, answer key last."\n\n', options: { color: INK } },
      { text: 'Both templates posted to the staff doc, name attached.', options: { italic: true, color: MUTED } },
    ], { x: 7.15, y: 2.35, w: 5.35, h: 3.6, fontFace: FONT, fontSize: 19, margin: 0, valign: 'top', lineSpacingMultiple: 1.2 });
    s.addNotes('6 minutes. 45-min cut: skip #2 (it moves to the First 48 Hours sheet) and post #1 now. Ms. Rivera\'s card: star #2 off the same audit, exit tickets, templated the same way; both of her templates go to the staff doc.');
  }

  // ============================== SLIDE 22 · LAB STEP 4 ==============================
  {
    const s = base();
    kicker(s, 'Lab · step 4 of 4 · 3 minutes · alone, in ink');
    title(s, 'Write the protected list', { w: 8.7 });
    card(s, 0.7, 1.7, 5.9, 2.9, PAPER);
    s.addText('Three to five pieces of this job you are keeping, by decision, no matter how good the tools get.', {
      x: 1.0, y: 1.95, w: 5.3, h: 2.4, fontFace: FONT, fontSize: 19, color: INK, margin: 0, valign: 'middle', lineSpacingMultiple: 1.25 });
    card(s, 6.85, 1.7, 5.9, 2.9, 'EAF5F3');
    s.addText('MS. RIVERA\'S WEEK AUDIT · STEP 4', { x: 7.15, y: 1.9, w: 5.4, h: 0.32, fontFace: FONT, fontSize: 12.5, bold: true, color: TEAL, charSpacing: 1.5, margin: 0 });
    s.addText([
      { text: 'Feedback conversations.\nGrading judgment.\nGreeting kids at the door.\n', options: { bold: true, color: NAVY } },
      { text: 'Her protected list: the unstarred column of her audit, kept on purpose.', options: { italic: true, color: MUTED, fontSize: 16 } },
    ], { x: 7.15, y: 2.35, w: 5.35, h: 2.1, fontFace: FONT, fontSize: 20, margin: 0, valign: 'top', lineSpacingMultiple: 1.2 });
    s.addText('Put it where you\'ll see it. This list is why the efficiency is safe: you\'ve named what it will never touch.', {
      x: 0.7, y: 4.95, w: 12.0, h: 0.6, fontFace: FONT, fontSize: 21, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('3 minutes, quiet, alone, in ink. This is the step people remember; give it silence. Ms. Rivera\'s card closes the loop: the lines she never starred in step 1 are exactly what her protected list protects.');
  }

  // ============================== SLIDE 23 · SHARE-OUT ==============================
  {
    const s = base();
    kicker(s, 'Lab · share-out · 3 voices, 1 minute each');
    title(s, 'The task you\'re taking back');
    bullets(s, [
      'The task you templated, and the hours it was eating',
      'One line from your protected list, read aloud',
      { text: 'The protected lists are this faculty saying what teaching is for. Let them land.', options: { bold: true } },
    ]);
    s.addNotes('3 voices. 45-min cut: two voices. Prioritize a protected-list line if time is short.');
  }

  // ============================== SLIDE 24 · INVENTORY ==============================
  {
    const s = base();
    kicker(s, 'Twenty-two minutes of work, on the record');
    title(s, 'The inventory');
    card(s, 0.7, 1.8, 12.0, 3.6, PAPER);
    s.addText([
      { text: 'A week audited honestly. Two repeaters templated, tested, and shared. A protected list in ink. And an hour with a name on it.\n\n', options: { color: INK } },
      { text: 'That last one is the difference between this session and a productivity poster.', options: { bold: true, color: NAVY } },
    ], { x: 1.1, y: 2.1, w: 11.2, h: 3.0, fontFace: FONT, fontSize: 20, margin: 0, valign: 'middle' });
    s.addNotes('Let it land, then honest limits.');
  }

  // ============================== SLIDE 25 · HONEST LIMITS ==============================
  {
    const s = base();
    kicker(s, 'This series doesn\'t oversell');
    title(s, 'Honest limits');
    bullets(s, [
      'The tool saves drafting time; it doesn\'t set boundaries, fix schedules, or say no to the fourth new initiative. Humans do those.',
      'The 5.9 hours is the average for weekly users; your number is yours. The audit, not the average, is what\'s real.',
      { text: 'No tool cures burnout; it returns some hours. What the building does with that truth is a leadership question worth asking out loud.', options: { bold: true } },
    ]);
    s.addNotes('Honest framing throughout: workload is one contributor the tool can touch; the rest is human and structural.');
  }

  // ============================== SLIDE 26 · COMMITMENTS ==============================
  {
    const s = base(true);
    s.addText('OUR THREE COMMITMENTS', { x: 0.9, y: 1.1, w: 11.5, h: 0.5, fontFace: FONT, fontSize: 15, bold: true, color: AMBER, charSpacing: 3, margin: 0 });
    const cs = [
      ['1', 'My two templates get used this week, for real'],
      ['2', 'Everything AI drafts gets reviewed; the drift stops with me'],
      ['3', 'My protected list is law: the relational work stays mine on purpose'],
    ];
    cs.forEach(([n, c], i) => {
      const y = 1.95 + i * 1.3;
      s.addShape('ellipse', { x: 0.95, y: y + 0.12, w: 0.7, h: 0.7, fill: { color: TEAL }, line: { color: TEAL } });
      s.addText(n, { x: 0.95, y: y + 0.12, w: 0.7, h: 0.7, fontFace: FONT, fontSize: 24, bold: true, color: WHITE, align: 'center', margin: 0, valign: 'middle' });
      s.addText(c, { x: 1.95, y, w: 10.6, h: 1.0, fontFace: FONT, fontSize: 21, color: WHITE, margin: 0, valign: 'middle' });
    });
    s.addText('Can I get a nod on those three?', {
      x: 0.9, y: 6.1, w: 11.5, h: 0.55, fontFace: FONT, fontSize: 18, italic: true, color: TEAL, margin: 0 });
    s.addNotes('Dark slide. Read all three, ask for the visible nod, same ritual as every kit.');
  }

  // ============================== SLIDE 27 · WHERE THIS GOES ==============================
  {
    const s = base();
    kicker(s, 'The 30-day plan, in one slide');
    title(s, 'Where this goes next');
    const rows = [
      ['This week', 'Both templates run on real tasks; the hour gets spent on purpose'],
      ['Week 2', 'PLC · Template Clinic: fix the wobbles, template one request together'],
      ['Week 3', 'PLC · Library Sprint: every working template into the Workload section'],
      ['Week 4', 'PLC · The Reckoning: where did the recovered time actually go?'],
    ];
    rows.forEach(([t, txt], i) => {
      const y = 1.7 + i * 1.05;
      s.addText(t, { x: 0.9, y, w: 2.2, h: 0.8, fontFace: FONT, fontSize: 19, bold: true, color: TEAL, margin: 0, valign: 'middle' });
      s.addText(txt, { x: 3.2, y, w: 9.4, h: 0.8, fontFace: FONT, fontSize: 18, color: INK, margin: 0, valign: 'middle' });
    });
    s.addText('Then Kit 8 closes the series: everything this built, made culture instead of a season.', {
      x: 0.7, y: 6.1, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 19, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('The hour only stays won if somebody asks; week 4\'s reckoning is that ask.');
  }

  // ============================== SLIDE 28 · FIRST 48 ==============================
  {
    const s = base();
    kicker(s, 'Before Friday');
    title(s, 'First 48 hours: three actions');
    const rows = [
      ['1', 'Run template #1 for real', 'On its actual task; fold any fix back into the template', '~10 min'],
      ['2', 'Run (or build) template #2', 'Then post both to the staff doc\'s Workload section', '~10 min'],
      ['3', 'Spend the first minutes on purpose', 'Where you said they\'d go. Then notice you did.', '~15 min'],
    ];
    rows.forEach(([n, t, d, badge], i) => {
      const y = 1.7 + i * 1.4;
      card(s, 0.7, y, 12.0, 1.2, PAPER);
      s.addText(n, { x: 1.0, y: y + 0.2, w: 0.7, h: 0.8, fontFace: FONT, fontSize: 26, bold: true, color: TEAL, margin: 0, valign: 'middle' });
      s.addText(t, { x: 1.9, y: y + 0.15, w: 7.3, h: 0.5, fontFace: FONT, fontSize: 18, bold: true, color: NAVY, margin: 0 });
      s.addText(d, { x: 1.9, y: y + 0.62, w: 7.3, h: 0.45, fontFace: FONT, fontSize: 14.5, color: MUTED, margin: 0 });
      s.addText(badge, { x: 10.4, y: y + 0.35, w: 1.9, h: 0.5, fontFace: FONT, fontSize: 16, bold: true, color: TEAL, align: 'right', margin: 0 });
    });
    s.addNotes('Hand the sheet out as you talk. The noticing in action 3 is what keeps the hour from evaporating.');
  }

  // ============================== SLIDE 29 · EXIT TICKET ==============================
  {
    const s = base();
    kicker(s, 'Two minutes, at the door');
    title(s, 'Exit ticket');
    bullets(s, [
      'Your two templated tasks',
      'The first line of your protected list',
      { text: 'The task you still want help automating', options: { bold: true } },
      'It doubles as the school\'s PD documentation',
    ]);
    s.addNotes('The "still want help" answers set follow-up #1\'s agenda. Collect at the door.');
  }

  // ============================== SLIDE 30 · CLOSE ==============================
  {
    const s = base(true);
    s.addText('Nobody became a teacher\nto feed the pile.', {
      x: 0.9, y: 1.8, w: 11.5, h: 1.7, fontFace: FONT, fontSize: 38, bold: true, color: WHITE, margin: 0, lineSpacingMultiple: 1.15 });
    s.addText('The pile just got cheaper to feed, and the hours it was eating are on their way back. Spend them like they matter, because they always did.', {
      x: 0.9, y: 3.8, w: 11.3, h: 1.1, fontFace: FONT, fontSize: 21, color: 'C9D4DE', margin: 0 });
    s.addText('Next: Kit 8 · Building Your School\'s AI Culture (the Track A capstone)', {
      x: 0.9, y: 5.6, w: 11.3, h: 0.5, fontFace: FONT, fontSize: 16, bold: true, color: AMBER, margin: 0 });
    s.addText('Thanks for the hour. Go take one back.', {
      x: 0.9, y: 6.15, w: 11.3, h: 0.5, fontFace: FONT, fontSize: 18, color: WHITE, margin: 0 });
    s.addNotes('Close warm. Collect exit tickets at the door.');
  }

  const out = path.resolve(__dirname, '../Kit07_PresentationDeck.pptx');
  await p.writeFile({ fileName: out });
  console.log('wrote', out, '· 30 slides');
})();
