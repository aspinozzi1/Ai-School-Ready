#!/usr/bin/env node
/* Kit 7 Presentation Deck · AI for Workload: Winning Back an Hour a Week
   36 slides, locked AI-Ready School brand, speaker notes on every slide.
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
    "Her week audit in full: four stars, one column that stays hers, one worst offender.",
    "Her week audit, step 2: the worst star, the sub plan, is now template #1, tested twice.",
    null, null,
    "Her week audit, step 3: star #2, exit tickets, is template #2; both go to the staff doc.",
    "Her sub plan template, finished: five blanks, ninety seconds, never written from scratch again.",
    "Her exit ticket template, finished: four blanks, tested on a real week.",
    "Her week audit, step 4: the unstarred column becomes her protected list, in ink.",
    "Her protected list, finished: five lines, in ink, taped inside her planner.",
    "Her share-out, from the same audit: the sub plan star, and the evenings it frees.",
    "Her inventory: audit done, two templates live, protected list written.",
    "Her honest limits: the tool saves time; it doesn't set boundaries. She does.",
    "Her commitments: two templates in use, review always, the protected list protected.",
    "Her month: template check-ins, a shared library sprint, an hours reckoning.",
    "Her 48 hours: run both templates for real; put the hour somewhere human.",
    "Her exit ticket: her two tasks, her protected list's first line.", null];
  let slideNo = 0;
  let chipOn = false;
  function base(dark = false) {
    const s = p.addSlide();
    slideNo++;
    chipOn = slideNo > 1 && !!RIVERA[slideNo - 1];
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
    // Chip-zone rule: Ms. Rivera's tracker chip owns x >= 9.55, so a titled
    // slide that carries a chip stops at 9.3 and long titles step down a size.
    // A title long enough to wrap must also drop clear of the kicker: a
    // middle-aligned two-line block grows upward into it (owner audit,
    // 2026-08-14). Long titles step down a size, start lower, and top-align.
    const longTitle = chipOn && txt.length > 29;
    s.addText(txt, Object.assign({
      x: 0.6, y: longTitle ? 0.50 : 0.42, w: chipOn ? 8.7 : W - 1.2,
      h: longTitle ? 1.0 : 0.85, fontFace: FONT,
      fontSize: longTitle ? 28 : 32,
      bold: true, color: NAVY, margin: 0, valign: longTitle ? 'top' : 'middle',
    }, opts));
  }
  function kicker(s, txt, opts = {}) {
    s.addText(txt.toUpperCase(), Object.assign({
      x: 0.62, y: 0.14, w: chipOn ? 8.7 : W - 1.24, h: 0.3, fontFace: FONT, fontSize: 12,
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
  // The exemplar layout the owner approved: a full-width generic chat window,
  // navy title bar with three dots, a paper inner card holding Ms. Rivera's
  // actual prompt colour-coded by part, legend chips across the bottom.
  const RIVERA_LABEL = 'AI chat tool (any of them) · Ms. Rivera, our running example teacher (a composite, not a real person)';
  function chatWin(s, y, h, extra) {
    s.addShape('roundRect', { x: 0.7, y, w: 12.0, h, rectRadius: 0.1, fill: { color: WHITE }, line: { color: 'DCE3EA', width: 1.5 } });
    s.addShape('roundRect', { x: 0.7, y, w: 12.0, h: 0.42, rectRadius: 0.1, fill: { color: NAVY }, line: { color: NAVY } });
    ['E8837A', AMBER, GOOD].forEach((c, i) => s.addShape('ellipse', { x: 0.95 + i * 0.27, y: y + 0.13, w: 0.16, h: 0.16, fill: { color: c }, line: { color: c } }));
    s.addText(RIVERA_LABEL + (extra || ''), {
      x: 1.95, y, w: 10.6, h: 0.42, fontFace: FONT, fontSize: 11, color: '9FB2C2', margin: 0, valign: 'middle' });
  }
  // The paper card must always be WIDER than the text it holds, or the prompt
  // prints across its edge (owner audit, 2026-08-14). Text sits at x 1.95 and
  // runs 10.05 wide, ending at 12.0; the card runs to 12.25 so there is a real
  // 0.25 margin on each side.
  function chatPaper(s, y, h, inset = 1.0) {
    s.addShape('roundRect', { x: 0.7 + inset, y: y + 0.65, w: 12.25 - (0.7 + inset), h: h - 0.9, rectRadius: 0.12, fill: { color: PAPER }, line: { color: PAPER } });
  }
  const PART_CHIPS = [['ROLE', TEAL], ['TASK', NAVY], ['CONTEXT', 'B07914'], ['FORMAT', GOOD]];
  const RECIPE_CHIPS = [['WRITE IT ONCE', TEAL], ['BRACKET IT', NAVY], ['TEST IT TWICE', 'B07914'], ['SAVE IT', GOOD]];
  function legend(s, y, chips) {
    chips.forEach(([t, c], i) => {
      const x = 0.7 + i * 3.08;
      s.addShape('roundRect', { x, y, w: 2.85, h: 0.5, rectRadius: 0.25, fill: { color: c }, line: { color: c } });
      s.addText(t, { x, y, w: 2.85, h: 0.5, fontFace: FONT, fontSize: 14, bold: true, color: WHITE, align: 'center', valign: 'middle', margin: 0, charSpacing: 2 });
    });
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
    s.addText('In Gallup\'s February 2022 workforce survey, 44% of K-12 workers and 52% of teachers reported feeling burned out "always" or "very often": the highest of the industries measured, against 30% of all other workers. (Gallup, 2022)', {
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
    chatWin(s, 1.5, 4.3);
    chatPaper(s, 1.5, 4.3);
    s.addText([
      { text: '"You are an experienced teacher writing for a substitute who has never met these students. ', options: { color: TEAL, bold: true } },
      { text: 'Write a one-page sub plan ', options: { color: NAVY, bold: true } },
      { text: 'for a [GRADE] class covering [TOPIC]. Context: the class routine that works is [ROUTINE]. ', options: { color: 'B07914', bold: true } },
      { text: 'Format: a bell-ringer, a main activity with simple numbered directions, an early-finisher task, and management notes."', options: { color: GOOD, bold: true } },
    ], { x: 1.95, y: 2.3, w: 10.05, h: 2.4, fontFace: FONT, fontSize: 16, margin: 0, valign: 'top', lineSpacingMultiple: 1.12 });
    s.addText('The brackets are the template: she fills three and runs it. Ninety seconds, every absence, forever.', {
      x: 1.95, y: 4.95, w: 10.05, h: 0.5, fontFace: FONT, fontSize: 14, italic: true, color: MUTED, margin: 0 });
    legend(s, 6.05, PART_CHIPS);
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
    s.addNotes('Say: step one, five minutes, list every task from last week you will do again and run the two questions on each. The handout has the quadrant grid. The common miss is the fifteen-minute repeaters; they\'re where the hours hide. Ms. Rivera\'s audit is summarized here and printed in full on the next slide: one sheet she carries through all four steps. Stars are her delegable repeaters; the unstarred lines stay hers. Anyone lost copies her format.');
  }

  // ============================== SLIDE 20 · HER WEEK AUDIT, IN FULL ==============================
  {
    const s = base();
    kicker(s, 'Lab · step 1 · Ms. Rivera\'s starting artifact');
    title(s, 'The week she starts with', { w: 8.7 });
    card(s, 0.7, 1.34, 12.0, 4.45, PAPER);
    s.addShape('roundRect', { x: 0.7, y: 1.34, w: 0.12, h: 4.45, rectRadius: 0.05, fill: { color: TEAL }, line: { color: TEAL } });
    s.addText('MS. RIVERA\'S WEEK AUDIT · ONE SHEET, WRITTEN BY HAND · 6TH GRADE SCIENCE', {
      x: 1.1, y: 1.5, w: 11.2, h: 0.3, fontFace: FONT, fontSize: 12, bold: true, color: TEAL, charSpacing: 1.5, margin: 0, valign: 'middle' });
    s.addText('"Last week, every task I will do again"', {
      x: 1.1, y: 1.85, w: 11.2, h: 0.5, fontFace: FONT, fontSize: 26, bold: true, color: NAVY, margin: 0, valign: 'middle' });
    s.addText('★  REPEATS · DOES NOT NEED MY KIDS', {
      x: 1.1, y: 2.45, w: 6.5, h: 0.32, fontFace: FONT, fontSize: 13, bold: true, color: TEAL, charSpacing: 1.2, margin: 0, valign: 'middle' });
    s.addText([
      { text: '★ Sub plans, every absence', options: { bold: true, color: NAVY } },
      { text: '   45 min each\n', options: { color: MUTED } },
      { text: '★ Exit tickets, weekly', options: { bold: true, color: NAVY } },
      { text: '   30 min\n', options: { color: MUTED } },
      { text: '★ Newsletter shell, weekly', options: { bold: true, color: NAVY } },
      { text: '   20 min\n', options: { color: MUTED } },
      { text: '★ Materials lists, weekly', options: { bold: true, color: NAVY } },
      { text: '   15 min\n\n', options: { color: MUTED } },
      { text: '65 minutes a week, before a single absence.', options: { color: INK } },
    ], { x: 1.1, y: 2.85, w: 6.5, h: 2.3, fontFace: FONT, fontSize: 16.5, margin: 0, valign: 'top', lineSpacingMultiple: 1.2 });
    s.addText('NEEDS MY KIDS · STAYS MINE', {
      x: 8.0, y: 2.45, w: 4.35, h: 0.32, fontFace: FONT, fontSize: 13, bold: true, color: MUTED, charSpacing: 1.2, margin: 0, valign: 'middle' });
    s.addText([
      { text: 'Reading group calls\nFeedback conversations\nGrading judgment\nThe Tuesday phone call\nGreeting them at the door\n\n', options: { color: INK } },
      { text: 'Never starred. Not once.', options: { italic: true, color: MUTED } },
    ], { x: 8.0, y: 2.85, w: 4.35, h: 2.3, fontFace: FONT, fontSize: 16.5, margin: 0, valign: 'top', lineSpacingMultiple: 1.2 });
    s.addText('"Worst star: the sub plan. Forty-five minutes, and it never starts before nine at night."', {
      x: 1.1, y: 5.15, w: 11.2, h: 0.45, fontFace: FONT, fontSize: 14, italic: true, color: MUTED, margin: 0, valign: 'middle' });
    s.addText('Four stars, one protected column. Every template today starts from this page.', {
      x: 0.7, y: 5.95, w: 12.0, h: 0.55, fontFace: FONT, fontSize: 19, bold: true, color: NAVY, align: 'center', margin: 0, valign: 'middle' });
    s.addNotes('Say: this is Ms. Rivera\'s audit in full, so nobody has to imagine what one looks like. Read the left column with the minutes attached, because the minutes are the argument: sixty-five a week before she is ever absent. Then read the right column and say plainly that none of it is going anywhere. Point at the last line: the worst star is the sub plan, and the whole rest of her lab comes off this page. Keep it up while pairs finish their own audit; the format is copyable as-is.');
  }

  // ============================== SLIDE 21 · LAB STEP 2 ==============================
  {
    const s = base();
    kicker(s, 'Lab · step 2 of 4 · 6 minutes');
    title(s, 'Build template #1', { w: 8.7 });
    bullets(s, [
      'Take your worst starred task: the one that costs the most evenings',
      'The recipe: write it once (four parts) → bracket the changes → test on a second instance',
      'Mimic Ms. Rivera: the prompt she typed is on the next slide, her follow-ups on the one after',
      { text: 'When it works twice, it\'s real. Save it.', options: { bold: true } },
    ], { x: 0.7, y: 1.7, w: 5.9, h: 4.4, fontSize: 17 });
    card(s, 6.85, 1.7, 5.9, 4.4, 'EAF5F3');
    s.addText('MS. RIVERA\'S WEEK AUDIT · STEP 2', { x: 7.15, y: 1.9, w: 5.4, h: 0.32, fontFace: FONT, fontSize: 12.5, bold: true, color: TEAL, charSpacing: 1.5, margin: 0 });
    s.addText([
      { text: 'Worst star → template #1: the sub plan.\n\n', options: { bold: true, color: NAVY } },
      { text: 'She writes it once for one real absence, brackets what changes, then runs it again on a second one.\n\n', options: { color: INK } },
      { text: 'Her prompt: next slide. Her finished template: slide 25.', options: { italic: true, color: MUTED } },
    ], { x: 7.15, y: 2.35, w: 5.35, h: 3.6, fontFace: FONT, fontSize: 19, margin: 0, valign: 'top', lineSpacingMultiple: 1.2 });
    s.addNotes('Say: step two, six minutes, take your worst starred task and build its template with the three-step recipe. Push for testing on a REAL instance, not admiring the template. Circulate. Ms. Rivera\'s card shows the same audit narrowing to her worst star, the sub plan; the next two slides show the exact prompt she typed and every follow-up after it, so mimicking her is possible from the screen alone.');
  }

  // ============================== SLIDE 22 · HER PROMPT ON SCREEN ==============================
  {
    const s = base();
    kicker(s, 'Lab · step 2 · the prompt she types into the chat');
    title(s, 'What she actually typed');
    s.addText([
      { text: 'BEFORE   ', options: { bold: true, color: BAD } },
      { text: '"Write me a sub plan for tomorrow."', options: { italic: true, color: MUTED } },
    ], { x: 0.7, y: 1.42, w: 12.0, h: 0.4, fontFace: FONT, fontSize: 16, margin: 0, valign: 'middle' });
    chatWin(s, 1.95, 3.85, ' · step 1: write it once');
    chatPaper(s, 1.95, 3.85);
    s.addText([
      { text: '"You are an experienced 6th grade science teacher writing for a substitute who has never met this class. ', options: { color: TEAL, bold: true } },
      { text: 'Write the one-page sub plan for tomorrow. ', options: { color: NAVY, bold: true } },
      { text: 'We are three days into food webs: they can name producers and consumers, not decomposers. The routine that works is a bell-ringer on the board, partners for the middle stretch, cleanup with five minutes left. No student names; the sub gets the seating chart from the office. ', options: { color: 'B07914', bold: true } },
      { text: 'One page. A bell-ringer, a main activity with numbered directions a stranger can follow, an early-finisher task, and three management notes. Plain language, no jargon."', options: { color: GOOD, bold: true } },
    ], { x: 1.95, y: 2.75, w: 10.05, h: 2.7, fontFace: FONT, fontSize: 16, margin: 0, valign: 'top', lineSpacingMultiple: 1.1 });
    legend(s, 6.05, PART_CHIPS);
    s.addNotes('Say: this is step one of the recipe, write it once, and it is the same four parts from Kit 2 aimed at one real absence. Role in teal, task in navy, context in dark amber, format in green. Read the before line first, then the real one, and let the room hear the difference. Notice the context is doing the heavy lifting: where the class actually is, the routine that works, and the privacy line, because no student information goes in. There are no brackets yet; brackets are the next step. At worst, copy this shape with your own repeating task and you will finish the lab.');
  }

  // ============================== SLIDE 23 · HER ITERATIONS ==============================
  {
    const s = base();
    kicker(s, 'Lab · step 2 · her follow-ups, one chat, no re-pasting');
    title(s, 'What she typed next, and what changed');
    chatWin(s, 1.40, 4.55, ' · the recipe, running');
    chatPaper(s, 1.40, 4.55, 0.3);
    s.addText('SHE TYPED NEXT', { x: 3.75, y: 2.12, w: 4.75, h: 0.24, fontFace: FONT, fontSize: 11, bold: true, color: MUTED, charSpacing: 1.5, margin: 0, valign: 'middle' });
    s.addText('WHAT CHANGED', { x: 8.75, y: 2.12, w: 3.35, h: 0.24, fontFace: FONT, fontSize: 11, bold: true, color: MUTED, charSpacing: 1.5, margin: 0, valign: 'middle' });
    const iters = [
      ['WRITE IT ONCE', TEAL,
        '(the prompt on the last slide, run for one real absence)',
        'A usable sub plan for one Tuesday. Good, and useless next month.'],
      ['BRACKET IT', NAVY,
        '"Now rewrite that as a reusable template. Bracket the grade, the topic, where we are, and my class routine."',
        'One Tuesday\'s plan became a form: four blanks she fills in.'],
      ['TEST IT TWICE', 'B07914',
        '"Run it again with [GRADE] = 8th and [TOPIC] = simple machines, two days before a quiz."',
        'It held, except the bell-ringer assumed a lab table.'],
      ['SAVE IT', GOOD,
        '"Add a line for when the technology fails, keep it to one page, and give it back as plain text with the brackets in."',
        'Wobble patched, one page, saved and posted to the staff doc.'],
    ];
    iters.forEach(([badge, c, typed, changed], i) => {
      const y = 2.40 + i * 0.82;
      s.addShape('roundRect', { x: 1.35, y: y + 0.04, w: 1.86, h: 0.34, rectRadius: 0.17, fill: { color: c }, line: { color: c } });
      s.addText(badge, { x: 1.35, y: y + 0.04, w: 1.86, h: 0.34, fontFace: FONT, fontSize: 10.5, bold: true, color: WHITE, align: 'center', valign: 'middle', margin: 0, charSpacing: 0.8 });
      s.addText(typed, { x: 3.45, y, w: 4.95, h: 0.76, fontFace: FONT, fontSize: 14, italic: true, color: NAVY, margin: 0, valign: 'middle', lineSpacingMultiple: 1.05 });
      s.addShape('rect', { x: 8.58, y: y + 0.06, w: 0.014, h: 0.64, fill: { color: 'DCE3EA' }, line: { color: 'DCE3EA' } });
      s.addText(changed, { x: 8.75, y, w: 3.35, h: 0.76, fontFace: FONT, fontSize: 14, color: INK, margin: 0, valign: 'middle', lineSpacingMultiple: 1.05 });
    });
    legend(s, 6.15, RECIPE_CHIPS);
    s.addNotes('Say: iteration is not failure, it is the work, and here the recipe you learned on slide 10 is running line by line. Write it once, bracket it, test it twice, save it. Read the right-hand column out loud: that is what each follow-up bought her. The third row is the one to dwell on, because the second test is where the wobble showed up, on her screen instead of on a substitute\'s desk. Tell the room the honest timing: this whole thread ran in about six minutes, which is exactly what they have right now.');
  }

  // ============================== SLIDE 24 · LAB STEP 3 ==============================
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
      { text: 'Same recipe, same four parts, four blanks this time. Tested on a real week before it counted.\n\n', options: { color: INK } },
      { text: 'Both finished templates: slides 25 and 26.', options: { italic: true, color: MUTED } },
    ], { x: 7.15, y: 2.35, w: 5.35, h: 3.6, fontFace: FONT, fontSize: 19, margin: 0, valign: 'top', lineSpacingMultiple: 1.2 });
    s.addNotes('Say: step three, six minutes, same recipe on your second-worst repeater, then both templates go in the staff doc\'s Workload section with your name and one line on what each is for. 45-min cut: skip #2 (it moves to the First 48 Hours sheet) and post #1 now. Ms. Rivera\'s card: star #2 off the same audit, exit tickets, templated the same way. Her two finished templates are printed word for word on the next two slides; tell the room they can copy either one outright.');
  }

  // ============================== SLIDE 25 · TEMPLATE #1, WORD FOR WORD ==============================
  {
    const s = base();
    kicker(s, 'Lab · the finished product · her template #1');
    title(s, 'Template #1, word for word', { w: 8.7 });
    card(s, 0.7, 1.26, 12.0, 4.5, PAPER);
    s.addText('SAVED AS "SUB PLAN TEMPLATE v1"  ·  POSTED TO THE STAFF DOC  ·  FIVE BLANKS, ABOUT NINETY SECONDS', {
      x: 1.0, y: 1.40, w: 11.4, h: 0.3, fontFace: FONT, fontSize: 11, bold: true, color: GOOD, charSpacing: 1.2, margin: 0, valign: 'middle' });
    const t1 = [
      ['ROLE', TEAL, 'You are an experienced [GRADE] teacher writing for a substitute who has never met this class.', 0.58],
      ['TASK', NAVY, 'Write a one-page sub plan for [DATE], covering [TOPIC].', 0.45],
      ['CONTEXT', 'B07914', 'We are [WHERE WE ARE IN THE UNIT]. The routine that works in this room is [ROUTINE]. No student names and nothing identifying; the sub gets the seating chart from the office. If the technology fails, say what to do instead.', 1.02],
      ['FORMAT', GOOD, 'One page. A bell-ringer, a main activity with numbered directions a stranger can follow, an early-finisher task, and three management notes. Plain language, no jargon.', 0.80],
    ];
    let ty = 1.82;
    t1.forEach(([label, c, txt, h]) => {
      s.addText(label, { x: 1.0, y: ty, w: 1.15, h: 0.3, fontFace: FONT, fontSize: 11, bold: true, color: c, charSpacing: 1.2, margin: 0, valign: 'middle' });
      s.addText(txt, { x: 2.25, y: ty - 0.05, w: 10.1, h, fontFace: FONT, fontSize: 15.5, color: INK, margin: 0, valign: 'top', lineSpacingMultiple: 1.14 });
      ty += h + 0.12;
    });
    card(s, 1.0, 5.02, 11.4, 0.6, WHITE);
    s.addText('THE FIVE BLANKS SHE FILLS: [GRADE] · [DATE] · [TOPIC] · [WHERE WE ARE IN THE UNIT] · [ROUTINE]', {
      x: 1.0, y: 5.02, w: 11.4, h: 0.6, fontFace: FONT, fontSize: 12.5, bold: true, color: NAVY, align: 'center', margin: 0, valign: 'middle' });
    s.addText('Written once, bracketed, tested twice. No sub plan written from scratch since.', {
      x: 0.7, y: 5.95, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 19, bold: true, color: NAVY, align: 'center', margin: 0, valign: 'middle' });
    s.addNotes('Say: this is the thing itself, not a description of it, and it is the output of the recipe you can watch on the last two slides. Read it aloud straight down the color code: role, task, context, format, exactly as she saved it. Point at the brackets, because the brackets are the template: everything that changes week to week is a blank, and everything that does not is already written. Then the white strip: five blanks, ninety seconds, every absence, forever. Tell them to copy this structure with their own repeater and change nothing but the nouns.');
  }

  // ============================== SLIDE 26 · TEMPLATE #2, WORD FOR WORD ==============================
  {
    const s = base();
    kicker(s, 'Lab · the finished product · her template #2');
    title(s, 'Template #2, and its output', { w: 8.7 });
    card(s, 0.7, 1.26, 6.35, 4.05, PAPER);
    s.addText('SAVED AS "EXIT TICKET TEMPLATE v1"  ·  FOUR BLANKS', {
      x: 1.0, y: 1.40, w: 5.75, h: 0.3, fontFace: FONT, fontSize: 11, bold: true, color: GOOD, charSpacing: 1.2, margin: 0, valign: 'middle' });
    s.addText([
      { text: 'ROLE   ', options: { bold: true, color: TEAL, fontSize: 11 } },
      { text: 'You are a [GRADE] teacher writing a quick end-of-class check.\n\n', options: { color: INK, fontSize: 14 } },
      { text: 'TASK   ', options: { bold: true, color: NAVY, fontSize: 11 } },
      { text: 'Write five exit-ticket questions for [OBJECTIVE].\n\n', options: { color: INK, fontSize: 14 } },
      { text: 'CONTEXT   ', options: { bold: true, color: 'B07914', fontSize: 11 } },
      { text: 'Students have had [HOW LONG] with this. The thing they usually get wrong is [COMMON MISTAKE]. No student names.\n\n', options: { color: INK, fontSize: 14 } },
      { text: 'FORMAT   ', options: { bold: true, color: GOOD, fontSize: 11 } },
      { text: 'Three recall questions, then two reasoning questions. Numbered, one page, answer key at the end. Plain language.', options: { color: INK, fontSize: 14 } },
    ], { x: 1.0, y: 1.80, w: 5.75, h: 3.3, fontFace: FONT, margin: 0, valign: 'top', lineSpacingMultiple: 1.14 });
    card(s, 7.35, 1.26, 5.35, 4.05, PAPER);
    s.addText('WHAT IT PRODUCED  ·  RUN #2', {
      x: 7.65, y: 1.40, w: 4.75, h: 0.3, fontFace: FONT, fontSize: 11, bold: true, color: NAVY, charSpacing: 1.2, margin: 0, valign: 'middle' });
    s.addText([
      { text: '[GRADE] = 6th · [HOW LONG] = three days\n[OBJECTIVE] = how energy moves through a food web\n[COMMON MISTAKE] = arrows drawn backward\n\n', options: { color: MUTED, fontSize: 12 } },
      { text: '1. ', options: { bold: true, color: NAVY, fontSize: 13 } },
      { text: 'Name one producer and one consumer in our schoolyard web.\n\n', options: { color: INK, fontSize: 13 } },
      { text: '4. ', options: { bold: true, color: NAVY, fontSize: 13 } },
      { text: 'The hawks disappear. Name two things that change, and why.\n\n', options: { color: INK, fontSize: 13 } },
      { text: '5. ', options: { bold: true, color: NAVY, fontSize: 13 } },
      { text: 'A student draws the arrow from hawk to rabbit. What is wrong?\n\n', options: { color: INK, fontSize: 13 } },
      { text: 'Questions 2 and 3 run the same way. The answer key prints last.', options: { italic: true, color: MUTED, fontSize: 12 } },
    ], { x: 7.65, y: 1.80, w: 4.75, h: 3.3, fontFace: FONT, margin: 0, valign: 'top', lineSpacingMultiple: 1.14 });
    card(s, 0.7, 5.55, 12.0, 0.72, NAVY);
    s.addText([
      { text: 'Write it once · bracket the changes · test it twice.  ', options: { bold: true, color: TEAL } },
      { text: 'Two templates saved, both tested on a real week, both in the staff doc with her name on them.', options: { color: WHITE } },
    ], { x: 1.05, y: 5.55, w: 11.3, h: 0.72, fontFace: FONT, fontSize: 16, align: 'center', margin: 0, valign: 'middle' });
    s.addNotes('Say: her second template is shorter, and that is the point; a template is only as long as the thinking it saves. Read the left card as the saved artifact, then the right card as one real run with the blanks filled in. Read question five aloud: it is aimed straight at the mistake she named in the context line, which is what that blank is for. Then the navy strip, which is the recipe stamped on both: written once, bracketed, tested twice. Anyone who finishes early builds template #3 the same way.');
  }

  // ============================== SLIDE 27 · LAB STEP 4 ==============================
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
    s.addNotes('Say: last step, three minutes, alone and in ink: three to five pieces of this job you are keeping by decision. Quiet room; this is the step people remember, so give it silence. Ms. Rivera\'s card closes the loop: the lines she never starred in step 1 are exactly what her protected list protects. Her finished list is on the next slide if anyone stalls on the wording.');
  }

  // ============================== SLIDE 28 · HER PROTECTED LIST, IN FULL ==============================
  {
    const s = base();
    kicker(s, 'Lab · the finished product · her protected list');
    title(s, 'The list she wrote in ink', { w: 8.7 });
    card(s, 0.7, 1.3, 12.0, 4.4, PAPER);
    s.addShape('roundRect', { x: 0.7, y: 1.3, w: 0.12, h: 4.4, rectRadius: 0.05, fill: { color: AMBER }, line: { color: AMBER } });
    s.addText('MS. RIVERA\'S PROTECTED LIST · WRITTEN BY HAND, TAPED INSIDE THE PLANNER', {
      x: 1.25, y: 1.46, w: 11.1, h: 0.3, fontFace: FONT, fontSize: 12, bold: true, color: 'B07914', charSpacing: 1.5, margin: 0, valign: 'middle' });
    const prot = [
      ['1. Feedback conversations.', 'The two minutes at a desk where a kid finds out somebody actually read it.'],
      ['2. Grading judgment.', 'A tool can sort the pile. It cannot decide what this student needed to hear.'],
      ['3. Greeting them at the door.', 'Eight seconds each. It is how I know who is having a bad day before class starts.'],
      ['4. The phone call after a hard day.', 'The one that repairs something. It has to be my voice on the other end.'],
      ['5. Which reading group a struggling reader joins.', 'That call takes a year of knowing the kid, not a week of data.'],
    ];
    prot.forEach(([head, why], i) => {
      const y = 1.88 + i * 0.72;
      s.addText(head, { x: 1.25, y, w: 11.1, h: 0.3, fontFace: FONT, fontSize: 17, bold: true, color: NAVY, margin: 0, valign: 'middle' });
      s.addText(why, { x: 1.25, y: y + 0.30, w: 11.1, h: 0.32, fontFace: FONT, fontSize: 14, italic: true, color: MUTED, margin: 0, valign: 'middle' });
    });
    s.addText('The unstarred column of her audit, now the work efficiency never touches.', {
      x: 0.7, y: 5.9, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 19, bold: true, color: NAVY, align: 'center', margin: 0, valign: 'middle' });
    s.addNotes('Say: her list, word for word, and notice the second line under each one, because the reason is what makes it hold on a tired Thursday. Read line three aloud, the eight seconds at the door, and let it sit. Then say the plain thing: this list is not a mood, it is the same unstarred column from her audit, moved into ink. Templates are how the hour comes back; this page is what the hour is for. Do not rush past this slide even when the clock is tight.');
  }

  // ============================== SLIDE 29 · SHARE-OUT ==============================
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

  // ============================== SLIDE 30 · INVENTORY ==============================
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

  // ============================== SLIDE 31 · HONEST LIMITS ==============================
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

  // ============================== SLIDE 32 · COMMITMENTS ==============================
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

  // ============================== SLIDE 33 · WHERE THIS GOES ==============================
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

  // ============================== SLIDE 34 · FIRST 48 ==============================
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

  // ============================== SLIDE 35 · EXIT TICKET ==============================
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

  // ============================== SLIDE 36 · CLOSE ==============================
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
  console.log('wrote', out, '· 36 slides');
})();
