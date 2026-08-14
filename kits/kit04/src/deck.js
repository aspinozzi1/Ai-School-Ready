#!/usr/bin/env node
/* Kit 4 Presentation Deck · AI for Assessment: Rubrics, Feedback, and Question Banks
   36 slides, locked AI-Ready School brand, speaker notes on every slide.
   Build: node kits/kit04/src/deck.js  → kits/kit04/Kit04_PresentationDeck.pptx */
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
  p.title = 'Kit 4: AI for Assessment: Rubrics, Feedback, and Question Banks';

  // Tracker-chip state, one line per slide. null = no chip: the title slide,
  // the closing slide, and every slide where her full chat window IS the
  // content (slides 9, 14, 20, 23), per the KIT_STANDARD exemption.
  const RIVERA = [null, "Her pile: 5 hours a week of grading and feedback, most after dinner.",
    "Her gap: feedback is her highest-leverage move, and AI never touched it.",
    "Her goal: a rubric and question bank for a real upcoming assessment.",
    "Her formative habit: check understanding, adapt. AI drafts the materials.",
    "Her rubric bar: students can read it. That's what makes the research pay.",
    "Her question bar: quality beats quantity; the misconception does the work.",
    "Her division of labor: AI drafts the materials, she makes every judgment.", null, "Her rubric test: hand it to a student. 'Limited understanding' fails.",
    "Her bank plan: the same four-part shape, aimed at her own students' mix-up.",
    "Her vetting stance: 97% on-topic still isn't 100%. Every key gets checked.",
    "Her read of the evidence: AI feedback is a floor. She is the ceiling.", null,
    "Her red lines: AI never grades, never sees names, never decides.",
    "Her excerpt rule: anonymous or described, never pasted with identity.",
    "Her red lines, adopted out loud, with the presenter's own.",
    "Her lab pick, one assessment through every step: her persuasive essay.",
    "Her step 1: the rubric for that essay. Messy notes in, iteration next.", null,
    "Her essay rubric, finished: four levels a 7th grader can act on.",
    "Her step 2: the question bank for the same persuasive essay unit.", null,
    "Her essay bank, drafted: the claim-repeat mix-up built into a distractor.",
    "Her essay bank, vetted: question 7 had two fair answers. Caught and cut.",
    "Her step 3: three starters for the patterns in her essay stacks.",
    "Her essay starters, finished: strength, pattern, next step, in student words.",
    "Her share-out: the catch from her essay bank goes first.",
    "Her finished assessment: rubric, vetted bank, three starters, one catch.",
    "Her essay inventory, and yours: the materials plus the vetting habit.",
    "Her templates: filed in the staff doc's Assessment section.",
    "Her five hours: the drafting share just moved to a faster tool.",
    "Her next kit: the student side. Integrity and clear expectations.",
    "Her 48 hours: rubric out with the assignment, finish vetting, use one starter.",
    "Her exit ticket: what she built, the weak question she caught.", null];
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
      s.addText(`Kit 4 · AI for Assessment   |   ${slideNo}`, {
        x: W - 3.6, y: H - 0.47, w: 3.15, h: 0.32, fontFace: FONT, fontSize: 9,
        color: dark ? '9FB2C2' : MUTED, align: 'right', margin: 0, valign: 'middle' });
      if (RIVERA[slideNo - 1]) {
        const rx = 9.55, ry = 0.12, rw = 3.2, rh = 0.98;
        s.addShape('roundRect', { x: rx, y: ry, w: rw, h: rh, rectRadius: 0.07, fill: { color: dark ? '1E3A50' : 'F7F5F0' }, line: { color: dark ? '2A4A63' : 'DCE3EA', width: 1 } });
        s.addShape('roundRect', { x: rx, y: ry, w: rw, h: 0.26, rectRadius: 0.07, fill: { color: '0D1E2E' }, line: { color: '0D1E2E' } });
        ['E8837A', 'F4A825', '2E7D5B'].forEach((c, i) => s.addShape('ellipse', { x: rx + 0.1 + i * 0.16, y: ry + 0.08, w: 0.1, h: 0.1, fill: { color: c }, line: { color: c } }));
        s.addText("MS. RIVERA'S SCREEN \u00b7 SO FAR", { x: rx + 0.62, y: ry, w: rw - 0.7, h: 0.26, fontFace: FONT, fontSize: 8, bold: true, color: '9FB2C2', charSpacing: 1, margin: 0, valign: 'middle' });
        s.addText(RIVERA[slideNo - 1], { x: rx + 0.14, y: ry + 0.28, w: rw - 0.28, h: rh - 0.36, fontFace: FONT, fontSize: 10, color: dark ? 'C9D4DE' : INK, margin: 0, valign: 'middle' });
      }
    }
    return s;
  }
  function title(s, txt, opts = {}) {
    // Chip-zone rule: Ms. Rivera's tracker chip owns x >= 9.55, so a titled
    // slide that carries a chip stops at 9.3 and long titles step down a size.
    s.addText(txt, Object.assign({
      x: 0.6, y: 0.42, w: chipOn ? 8.7 : W - 1.2, h: 0.85, fontFace: FONT,
      fontSize: chipOn && txt.length > 34 ? 28 : 32,
      bold: true, color: NAVY, margin: 0, valign: 'middle',
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
  function beforeAfter(s, beforeTxt, afterTxt, afterH = 2.6) {
    card(s, 0.7, 1.55, 12.0, 1.5, 'FBEFED');
    s.addText('BEFORE', { x: 1.0, y: 1.7, w: 2, h: 0.35, fontFace: FONT, fontSize: 14, bold: true, color: BAD, margin: 0 });
    s.addText(beforeTxt, { x: 1.0, y: 2.05, w: 11.4, h: 0.9, fontFace: FONT, fontSize: 18, italic: true, color: INK, margin: 0 });
    card(s, 0.7, 3.3, 12.0, afterH, 'EAF5F3');
    s.addText('AFTER', { x: 1.0, y: 3.45, w: 2, h: 0.35, fontFace: FONT, fontSize: 14, bold: true, color: GOOD, margin: 0 });
    s.addText(afterTxt, { x: 1.0, y: 3.8, w: 11.4, h: afterH - 0.6, fontFace: FONT, fontSize: 15.5, italic: true, color: INK, margin: 0, valign: 'top' });
  }

  // ---------- The exemplar treatment (owner model, taken from slide 9) ----------
  // Every worked prompt in this deck, workshop or lab, gets the same picture:
  // a FULL-WIDTH generic chat window (navy title bar, three dots, no vendor
  // trade dress), a paper inner card holding the real prompt colour-coded by
  // part, and four legend chips across the bottom. Where the exemplar is her
  // OUTPUT instead of a prompt, it gets an artifact card at the same width.
  const CHAT_RIVERA = 'AI chat tool (any of them) · Ms. Rivera, our running example teacher (a composite, not a real person)';
  const CHAT_SCIENCE = 'AI chat tool (any of them) · the same four-part shape, on a middle school science teacher’s screen';
  function chatWindow(s, y, h, caption) {
    s.addShape('roundRect', { x: 0.7, y, w: 12.0, h, rectRadius: 0.1, fill: { color: WHITE }, line: { color: 'DCE3EA', width: 1.5 } });
    s.addShape('roundRect', { x: 0.7, y, w: 12.0, h: 0.42, rectRadius: 0.1, fill: { color: NAVY }, line: { color: NAVY } });
    ['E8837A', AMBER, GOOD].forEach((c, i) => s.addShape('ellipse', { x: 0.95 + i * 0.27, y: y + 0.13, w: 0.16, h: 0.16, fill: { color: c }, line: { color: c } }));
    s.addText(caption, { x: 1.95, y, w: 10.6, h: 0.42, fontFace: FONT, fontSize: 11, color: '9FB2C2', margin: 0, valign: 'middle' });
    s.addShape('roundRect', { x: 1.7, y: y + 0.65, w: 10.55, h: h - 0.9, rectRadius: 0.12, fill: { color: PAPER }, line: { color: PAPER } });
  }
  function promptText(s, y, h, runs, fontSize = 16) {
    s.addText(runs, { x: 1.95, y: y + 0.77, w: 10.05, h: h - 1.1, fontFace: FONT, fontSize,
      margin: 0, valign: 'top', lineSpacingMultiple: 1.1 });
  }
  const role = (t) => ({ text: t, options: { color: TEAL, bold: true } });
  const task = (t) => ({ text: t, options: { color: NAVY, bold: true } });
  const ctxt = (t) => ({ text: t, options: { color: 'B07914', bold: true } });
  const fmt = (t) => ({ text: t, options: { color: GOOD, bold: true } });
  function legendChips(s, y = 6.05) {
    [['ROLE', TEAL], ['TASK', NAVY], ['CONTEXT', 'B07914'], ['FORMAT', GOOD]].forEach(([t, c], i) => {
      const x = 0.7 + i * 3.08;
      s.addShape('roundRect', { x, y, w: 2.85, h: 0.5, rectRadius: 0.25, fill: { color: c }, line: { color: c } });
      s.addText(t, { x, y, w: 2.85, h: 0.5, fontFace: FONT, fontSize: 14, bold: true, color: WHITE,
        align: 'center', valign: 'middle', margin: 0, charSpacing: 2 });
    });
  }
  function labelLine(s, y, label, labelColor, body, bodyOpts = {}) {
    s.addText([
      { text: label + '   ', options: { bold: true, color: labelColor } },
      { text: body, options: Object.assign({ italic: true, color: MUTED }, bodyOpts) },
    ], { x: 0.7, y, w: 12.0, h: 0.4, fontFace: FONT, fontSize: 16, margin: 0, valign: 'middle' });
  }
  // Her finished work, shown at the width of the chat window: a document card
  // with a teal label, so the room reads output the same way it reads input.
  function artifactCard(s, y, h, label) {
    card(s, 0.7, y, 12.0, h, WHITE, 'DCE3EA');
    s.addText(label, { x: 1.05, y: y + 0.14, w: 11.3, h: 0.3, fontFace: FONT, fontSize: 12.5,
      bold: true, color: TEAL, charSpacing: 1.5, margin: 0, valign: 'middle' });
  }

  // ============================== SLIDE 1 · TITLE ==============================
  {
    const s = base(true);
    s.addImage({ data: markDarkPng, x: 0.85, y: 0.8, w: 1.15, h: 1.06 });
    s.addText([
      { text: 'AI-Ready', options: { color: TEAL, bold: true } },
      { text: ' School', options: { color: WHITE, bold: true } },
    ], { x: 2.15, y: 1.05, w: 4, h: 0.6, fontFace: FONT, fontSize: 26, margin: 0, valign: 'middle' });
    s.addText('TRACK A · AI FOUNDATIONS · KIT 4 OF 20', {
      x: 0.9, y: 3.0, w: 9, h: 0.4, fontFace: FONT, fontSize: 15, bold: true,
      color: AMBER, charSpacing: 3, margin: 0 });
    s.addText('AI for Assessment:\nRubrics, Feedback, and Question Banks', {
      x: 0.85, y: 3.35, w: 11.8, h: 2.0, fontFace: FONT, fontSize: 40, bold: true,
      color: WHITE, margin: 0, valign: 'middle', lineSpacingMultiple: 1.05 });
    s.addText('A 45–60 minute working session. You leave with a rubric and a question bank for a real upcoming assessment.', {
      x: 0.9, y: 5.45, w: 11.2, h: 0.5, fontFace: FONT, fontSize: 18, color: 'C9D4DE', margin: 0 });
    s.addText('Built by Adam & Katelyn Spinozzi · certified educators · 20+ combined years in the classroom', {
      x: 0.9, y: 6.6, w: 11.5, h: 0.4, fontFace: FONT, fontSize: 12, color: '9FB2C2', margin: 0 });
    s.addNotes('Slide up as people arrive. Start on time. Open with the bright line: AI never grades your students. It drafts materials; the teacher makes every call about every kid.');
  }

  // ============================== SLIDE 2 · THE GRADING MOUNTAIN ==============================
  {
    const s = base();
    kicker(s, 'How teachers actually spend the week');
    title(s, 'The grading mountain');
    card(s, 0.7, 1.75, 5.75, 3.7, PAPER);
    s.addText('~54 hrs', { x: 0.7, y: 2.1, w: 5.75, h: 1.2, fontFace: FONT, fontSize: 58, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addText('the teacher work week,\nless than half spent teaching\n(Merrimack College/EdWeek, 2022)', {
      x: 1.0, y: 3.4, w: 5.15, h: 1.8, fontFace: FONT, fontSize: 16, color: INK, align: 'center', margin: 0 });
    card(s, 6.85, 1.75, 5.75, 3.7, PAPER);
    s.addText('5 hrs', { x: 6.85, y: 2.1, w: 5.75, h: 1.2, fontFace: FONT, fontSize: 58, bold: true, color: TEAL, align: 'center', margin: 0 });
    s.addText('median weekly time on\ngrading and feedback\n(same survey)', {
      x: 7.15, y: 3.4, w: 5.15, h: 1.8, fontFace: FONT, fontSize: 16, color: INK, align: 'center', margin: 0 });
    s.addText('This session doesn’t grade for you. It makes the materials around grading fast to build.', {
      x: 0.7, y: 5.85, w: 12.0, h: 0.55, fontFace: FONT, fontSize: 21, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('If you have your own grading-night story, sixty seconds on it lands here: what the stack was, how long it took, what it cost.');
  }

  // ============================== SLIDE 3 · THE PARADOX ==============================
  {
    const s = base();
    kicker(s, 'High leverage, barely touched');
    title(s, 'The most powerful lever, the least-tapped use', { w: 8.7, fontSize: 28 });
    card(s, 0.7, 1.75, 5.75, 3.7, 'EAF5F3');
    s.addText('THE POWER OF FEEDBACK', { x: 0.7, y: 1.95, w: 5.75, h: 0.35, fontFace: FONT, fontSize: 13, bold: true, color: TEAL, align: 'center', charSpacing: 2, margin: 0 });
    s.addText('0.79', { x: 0.7, y: 2.3, w: 5.75, h: 1.05, fontFace: FONT, fontSize: 52, bold: true, color: TEAL, align: 'center', margin: 0 });
    s.addText('Feedback’s average effect size on student achievement. (Hattie & Timperley, 2007)', {
      x: 1.0, y: 3.35, w: 5.15, h: 0.75, fontFace: FONT, fontSize: 16, color: INK, align: 'center', margin: 0 });
    s.addText('“Effect size” is how researchers put very different practices on one scale, so they can be compared. Most things schools try land near 0.40. Feedback runs about double that.', {
      x: 1.0, y: 4.15, w: 5.15, h: 1.15, fontFace: FONT, fontSize: 13, color: MUTED, align: 'center', margin: 0 });
    card(s, 6.85, 1.75, 5.75, 3.7, PAPER);
    s.addText('HOW MANY TEACHERS TAP IT WITH AI', { x: 6.85, y: 1.95, w: 5.75, h: 0.35, fontFace: FONT, fontSize: 13, bold: true, color: MUTED, align: 'center', charSpacing: 2, margin: 0 });
    s.addText('≤15%', { x: 6.85, y: 2.3, w: 5.75, h: 1.05, fontFace: FONT, fontSize: 52, bold: true, color: MUTED, align: 'center', margin: 0 });
    s.addText('Of teachers who already used AI in 2023–24, 15% or fewer used it for writing assessments: the least-tapped use, sitting under the highest-leverage work. (RAND, 2025)', {
      x: 7.15, y: 3.4, w: 5.15, h: 1.9, fontFace: FONT, fontSize: 16, color: INK, align: 'center', margin: 0 });
    s.addText('Feedback’s power varies with how it’s given. That skill is yours; the drafting is delegable.', {
      x: 0.7, y: 5.85, w: 12.0, h: 0.55, fontFace: FONT, fontSize: 20, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('Say: define the number before you use it. An effect size is just a way to compare practices that are otherwise hard to compare, on one scale. Across everything schools try, the average is around 0.40. Feedback comes in at 0.79, about double, which puts it among the most powerful things we do. Say the same review is clear the impact swings widely with how feedback is given. RAND: assessment writing is the least-tapped use among AI-using teachers. That gap is why this hour exists.');
  }

  // ============================== SLIDE 4 · AGENDA ==============================
  {
    const s = base();
    kicker(s, 'The hour ahead');
    title(s, 'Agenda, and one promise');
    const rows = [
      ['0:05', 'What makes assessment materials work'],
      ['0:12', 'Three workshops: rubrics, questions, feedback'],
      ['0:24', 'The red lines, in writing'],
      ['0:30', 'Lab: build for a real upcoming assessment'],
      ['0:49', 'Making it stick + first 48 hours'],
    ];
    rows.forEach(([t, txt], i) => {
      const y = 1.6 + i * 0.8;
      s.addText(t, { x: 0.9, y, w: 1.1, h: 0.6, fontFace: FONT, fontSize: 20, bold: true, color: TEAL, margin: 0, valign: 'middle' });
      s.addText(txt, { x: 2.1, y, w: 7.4, h: 0.6, fontFace: FONT, fontSize: 20, color: INK, margin: 0, valign: 'middle' });
    });
    card(s, 9.9, 2.1, 2.85, 3.2, NAVY);
    s.addText('One promise', { x: 10.15, y: 2.35, w: 2.35, h: 0.4, fontFace: FONT, fontSize: 16, bold: true, color: AMBER, margin: 0 });
    s.addText('You leave with a rubric and a question bank for an assessment already on your calendar. Not samples. Inventory.', {
      x: 10.15, y: 2.8, w: 2.35, h: 2.3, fontFace: FONT, fontSize: 14, color: WHITE, margin: 0, valign: 'top' });
    s.addNotes('Say: five stops this hour: what makes assessment materials work, three prompt workshops (rubrics, question banks, feedback starters), the red lines in writing, a lab where you build for an assessment already on your calendar, and how it sticks. The promise line matters: real materials for a real assessment, built today. Keep this quick.');
  }

  // ============================== SLIDE 5 · FORMATIVE ASSESSMENT ==============================
  {
    const s = base();
    kicker(s, 'Evidence piece one');
    title(s, 'Formative assessment works');
    card(s, 0.7, 1.8, 12.0, 2.4, PAPER);
    s.addText('~250 studies', { x: 0.7, y: 2.0, w: 12.0, h: 1.0, fontFace: FONT, fontSize: 48, bold: true, color: TEAL, align: 'center', margin: 0 });
    s.addText('behind Black & Wiliam’s “Inside the Black Box”: checking understanding as you go, and adapting, raises achievement.', {
      x: 1.4, y: 3.1, w: 10.5, h: 0.9, fontFace: FONT, fontSize: 17, color: INK, align: 'center', margin: 0 });
    bullets(s, [
      'The catch for your workload: day-by-day checks need more questions, more often',
      { text: 'Formative assessment is partly a materials problem, and drafting materials is what AI is fast at', options: { bold: true, color: NAVY } },
    ], { y: 4.5, h: 1.8, fontSize: 20 });
    s.addNotes('One of the most solid findings in education research. Frame the workload catch honestly: good formative practice multiplies the materials you need.');
  }

  // ============================== SLIDE 6 · RUBRICS WORK ==============================
  {
    const s = base();
    kicker(s, 'Evidence piece two');
    title(s, 'Rubrics aren’t paperwork');
    bullets(s, [
      '2023 meta-analysis (Panadero et al.): rubric use has a positive, moderate effect on performance',
      'Same finding for self-regulated learning and self-efficacy',
      'When students can see the target, they aim at it, and start coaching themselves toward it',
    ], { y: 1.6, h: 2.7 });
    card(s, 0.7, 4.5, 12.0, 1.6, 'EAF5F3');
    s.addText('A good rubric quietly does some of your teaching for you, if students can read it.', {
      x: 1.05, y: 4.7, w: 11.3, h: 1.2, fontFace: FONT, fontSize: 24, bold: true, color: NAVY, margin: 0, valign: 'middle' });
    s.addNotes('The "if students can read it" clause sets up the hand-it-to-a-student test on slide 10. Writing a readable rubric takes real time: materials problem again.');
  }

  // ============================== SLIDE 7 · QUALITY BEATS QUANTITY ==============================
  {
    const s = base();
    kicker(s, 'Evidence piece three · professional judgment');
    title(s, 'Question quality beats question quantity');
    bullets(s, [
      'A sharp question does diagnostic work',
      'A distractor built from a real misconception tells you exactly who holds it',
      'Five sharp questions beat twenty fillers; we settle for filler because writing sharp is slow',
    ], { y: 1.6, h: 2.7 });
    card(s, 0.7, 4.5, 12.0, 1.6, PAPER);
    s.addText('Drafting speed is what makes quality affordable.', {
      x: 1.05, y: 4.7, w: 11.3, h: 1.2, fontFace: FONT, fontSize: 26, bold: true, color: NAVY, margin: 0, valign: 'middle' });
    s.addNotes('This one is professional judgment, not a citation; say so if asked. The misconception-distractor idea returns in workshop 2 and the lab.');
  }

  // ============================== SLIDE 8 · DIVISION OF LABOR ==============================
  {
    const s = base();
    kicker(s, 'Today’s working agreement');
    title(s, 'The division of labor');
    card(s, 0.7, 1.7, 5.9, 4.2, 'EAF5F3');
    s.addText('AI is fast at…', { x: 1.05, y: 2.0, w: 5.2, h: 0.5, fontFace: FONT, fontSize: 21, bold: true, color: GOOD, margin: 0 });
    s.addText('pattern work: rubric descriptors, question stems, distractors, feedback phrasing. Drafts in seconds.', {
      x: 1.05, y: 2.6, w: 5.2, h: 2.9, fontFace: FONT, fontSize: 18, color: INK, margin: 0, valign: 'top' });
    card(s, 6.85, 1.7, 5.9, 4.2, PAPER);
    s.addText('You are unreplaceable at…', { x: 7.2, y: 2.0, w: 5.2, h: 0.5, fontFace: FONT, fontSize: 21, bold: true, color: NAVY, margin: 0 });
    s.addText('judgment: what proficient means in your room, whether a question is fair to your kids, what this student needs to hear next.', {
      x: 7.2, y: 2.6, w: 5.2, h: 2.9, fontFace: FONT, fontSize: 18, color: INK, margin: 0, valign: 'top' });
    s.addText('AI drafts, the teacher decides. In assessment, those five words carry the most weight they’ll ever carry.', {
      x: 0.7, y: 6.15, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 18, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('Every minute AI saves on drafting can move to judgment. This is the frame for all three workshops.');
  }

  // ============================== SLIDE 9 · WORKSHOP 1: RUBRIC ==============================
  {
    const s = base();
    kicker(s, 'Workshop #1 · rubrics · on Ms. Rivera\'s screen');
    title(s, 'Notes → rubric');
    labelLine(s, 1.42, 'BEFORE', BAD, '“Make a rubric for my essay assignment.”');
    chatWindow(s, 1.95, 3.85, CHAT_RIVERA);
    promptText(s, 1.95, 3.85, [
      role('“You are an experienced 7th grade ELA teacher. '),
      task('Turn my notes into a 4-level analytic rubric (Beginning · Developing · Proficient · Advanced) for a persuasive essay. '),
      ctxt('Criteria: claim, evidence, organization, conventions. Write every descriptor in language a 7th grader can read, and make each level describe what the work does, not what it lacks. '),
      fmt('Format: a table with criteria down the side. Then ask me up to three questions about anything unclear in my notes.”  [paste your notes]'),
    ]);
    legendChips(s);
    s.addNotes('Say: workshop one, on Ms. Rivera\'s screen, our running composite example. Her messy grading notes are the context; that is Kit 2\'s formula doing assessment work: role teal, task navy, context amber, format green. The "ask me up to three questions" line is the escape hatch from Kit 2\'s spice rack. This is the assessment she carries all the way through the lab, and the picture repeats every time a prompt or a finished piece of it is on screen. In the lab you\'ll mimic this shape with your own notes.');
  }

  // ============================== SLIDE 10 · HAND IT TO A STUDENT ==============================
  {
    const s = base(true);
    kicker(s, 'The quality bar for every rubric', { color: TEAL });
    s.addText('The hand-it-to-a-student test', {
      x: 0.7, y: 1.4, w: 12.0, h: 0.9, fontFace: FONT, fontSize: 40, bold: true, color: WHITE, margin: 0 });
    s.addText('Read one descriptor aloud. Could a student tell you\nexactly what to do to move up one level?', {
      x: 0.7, y: 2.6, w: 12.0, h: 1.4, fontFace: FONT, fontSize: 26, color: 'C9D4DE', margin: 0, lineSpacingMultiple: 1.2 });
    s.addText('“Demonstrates limited understanding” fails: no ten-year-old ever revised an essay off the word “limited.” When it fails, iterate: “Rewrite level 2 so a student knows exactly what moving to level 3 requires.”', {
      x: 0.7, y: 4.5, w: 12.0, h: 1.4, fontFace: FONT, fontSize: 20, color: TEAL, bold: true, margin: 0 });
    s.addNotes('The rubric research only pays off if students can read the thing. This test is the voice round of Kit 2’s iteration system, aimed at rubrics.');
  }

  // ============================== SLIDE 11 · WORKSHOP 2: QUESTION BANK ==============================
  {
    const s = base();
    kicker(s, 'Workshop #2 · question banks');
    title(s, 'Topic + misconception → bank');
    labelLine(s, 1.42, 'BEFORE', BAD, '“Write ten quiz questions about photosynthesis.”');
    chatWindow(s, 1.95, 3.85, CHAT_SCIENCE);
    promptText(s, 1.95, 3.85, [
      role('“You are a middle school science teacher. '),
      task('Build a 10-question bank on photosynthesis for my 7th graders: 6 multiple choice, 2 short answer, 2 extended response. '),
      ctxt('My students commonly confuse photosynthesis with respiration. In each multiple-choice question, make one distractor that exact confusion, so the question shows me who is holding it. '),
      fmt('Include a full answer key, then explain in one line why each distractor is wrong. Label each question with the skill it checks.”'),
    ]);
    legendChips(s);
    s.addNotes('Say: same window, same four parts, a different subject, because this shape travels. The special ingredient is the misconception: you know what your students mix up, the model doesn’t until you say so. Feed it the confusion and the distractors start doing diagnostic work. Ms. Rivera runs this exact shape on her persuasive essay unit in the lab, which is what her chip is promising.');
  }

  // ============================== SLIDE 12 · VET EVERYTHING ==============================
  {
    const s = base();
    kicker(s, 'How good are the drafts? Honest answer');
    title(s, 'Good, and not good enough to skip you');
    card(s, 0.7, 1.75, 5.75, 3.2, 'EAF5F3');
    s.addText('HOW OFTEN DRAFTS ARE ON-TOPIC', { x: 0.7, y: 1.9, w: 5.75, h: 0.32, fontFace: FONT, fontSize: 13, bold: true, color: TEAL, align: 'center', charSpacing: 2, margin: 0 });
    s.addText('97%', { x: 0.7, y: 2.22, w: 5.75, h: 0.95, fontFace: FONT, fontSize: 48, bold: true, color: TEAL, align: 'center', margin: 0 });
    s.addText('When teachers rated quiz questions drafted by AI, 97 in 100 were judged relevant to the topic they asked for. (Elkins et al., 2023)', {
      x: 1.0, y: 3.25, w: 5.15, h: 1.6, fontFace: FONT, fontSize: 16, color: INK, align: 'center', margin: 0 });
    card(s, 6.85, 1.75, 5.75, 3.2, 'EAF5F3');
    s.addText('HOW USEFUL TEACHERS FOUND THEM', { x: 6.85, y: 1.9, w: 5.75, h: 0.32, fontFace: FONT, fontSize: 13, bold: true, color: TEAL, align: 'center', charSpacing: 2, margin: 0 });
    s.addText('3.6 / 4', { x: 6.85, y: 2.22, w: 5.75, h: 0.95, fontFace: FONT, fontSize: 48, bold: true, color: TEAL, align: 'center', margin: 0 });
    s.addText('The same teachers scored the questions’ usefulness 3.6 out of 4, and the study treats teacher vetting as integral, not optional. (same study)', {
      x: 7.15, y: 3.25, w: 5.15, h: 1.6, fontFace: FONT, fontSize: 16, color: INK, align: 'center', margin: 0 });
    s.addText('Those numbers are why drafting works. The gap is why vetting isn’t optional. Every bank gets a vetting pass; every answer key gets checked.', {
      x: 0.7, y: 5.35, w: 12.0, h: 0.9, fontFace: FONT, fontSize: 19, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('In the lab, everyone will catch and fix or delete at least one weak question by hand, on purpose. That rep is the habit.');
  }

  // ============================== SLIDE 13 · HONEST EVIDENCE ON FEEDBACK ==============================
  {
    const s = base();
    kicker(s, 'Workshop #3 · feedback · both halves of the evidence');
    title(s, 'The honest evidence on AI feedback');
    card(s, 0.7, 1.7, 5.9, 3.6, PAPER);
    s.addText('Trained humans win', { x: 1.05, y: 2.0, w: 5.2, h: 0.5, fontFace: FONT, fontSize: 20, bold: true, color: NAVY, margin: 0 });
    s.addText('Well-trained humans beat ChatGPT on nearly every dimension of feedback quality on student writing. (Steiss et al., 2024)', {
      x: 1.05, y: 2.6, w: 5.2, h: 2.4, fontFace: FONT, fontSize: 16.5, color: INK, margin: 0, valign: 'top' });
    card(s, 6.85, 1.7, 5.9, 3.6, PAPER);
    s.addText('Outcomes look similar', { x: 7.2, y: 2.0, w: 5.2, h: 0.5, fontFace: FONT, fontSize: 20, bold: true, color: NAVY, margin: 0 });
    s.addText('Across 41 studies (4,813 students), no statistically significant difference in learning between AI and human feedback. (Kaliisa et al., 2025)', {
      x: 7.2, y: 2.6, w: 5.2, h: 2.4, fontFace: FONT, fontSize: 16.5, color: INK, margin: 0, valign: 'top' });
    s.addText('Both are true. AI feedback language is a floor and a fast draft. You are the ceiling.', {
      x: 0.7, y: 5.6, w: 12.0, h: 0.55, fontFace: FONT, fontSize: 20, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('If asked "doesn’t the no-difference finding mean AI could just do it?": the meta-analysis measured pooled learning outcomes, not trust or relationships, and the red line hangs on responsibility for students, which isn’t delegable.');
  }

  // ============================== SLIDE 14 · FEEDBACK STARTERS ==============================
  {
    const s = base();
    kicker(s, 'Workshop #3 · feedback · on Ms. Rivera’s screen');
    title(s, 'Feedback starters for common patterns');
    labelLine(s, 1.30, 'THE MOVE', TEAL, 'Describe the pattern, never the student. No student work goes in, ever.', { italic: false, color: INK });
    labelLine(s, 1.66, 'STARTERS, NOT STAMPS', TEAL, 'You add the sentence only you can write, then you deliver it.', { italic: false, color: INK });
    chatWindow(s, 2.08, 3.72, CHAT_RIVERA);
    promptText(s, 2.08, 3.72, [
      role('“You are an experienced 7th grade ELA teacher. '),
      task('Draft a 2–3 sentence feedback comment for each of the three most common patterns in my students’ persuasive essays: claims with no evidence, evidence with no explanation, conclusions that introduce new arguments. '),
      ctxt('For each one, name something the writer did well, name the pattern plainly, and give one concrete next step. Warm, specific, readable by a 7th grader. No student work is going in here: these are patterns I see in every stack. '),
      fmt('Three comments, labeled by pattern. I’ll personalize every one before a student sees it.”'),
    ]);
    legendChips(s);
    s.addNotes('Say: her screen again, same four parts, and notice this prompt never needs a single piece of student work. She already knows her three patterns by heart. The last line is the contract: AI drafts the starter, she writes the sentence only she can write, then she delivers it. A personal beat fits here if you have one: a piece of feedback that only worked because you knew the kid and what they were attempting.');
  }

  // ============================== SLIDE 15 · THE RED LINES ==============================
  {
    const s = base(true);
    kicker(s, 'In writing, so nobody guesses', { color: AMBER });
    s.addText('The red lines', {
      x: 0.7, y: 1.2, w: 12.0, h: 0.8, fontFace: FONT, fontSize: 40, bold: true, color: WHITE, margin: 0 });
    const rules = [
      ['1', 'AI never grades. No score or decision about a student ever comes from a machine.'],
      ['2', 'No student names, and no identifying student work, in public AI tools. Ever.'],
      ['3', 'Feedback that reaches a student always passes through you. Your eyes, your edits, then delivery.'],
    ];
    rules.forEach(([n, r], i) => {
      const y = 2.4 + i * 1.15;
      s.addShape('ellipse', { x: 0.9, y, w: 0.72, h: 0.72, fill: { color: AMBER }, line: { color: AMBER } });
      s.addText(n, { x: 0.9, y, w: 0.72, h: 0.72, fontFace: FONT, fontSize: 24, bold: true, color: NAVY, align: 'center', valign: 'middle', margin: 0 });
      s.addText(r, { x: 1.85, y: y - 0.12, w: 10.7, h: 0.96, fontFace: FONT, fontSize: 20, color: WHITE, margin: 0, valign: 'middle' });
    });
    s.addText('Not opinions about the technology. Promises about our students.', {
      x: 0.7, y: 6.15, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 19, italic: true, color: '9FB2C2', margin: 0 });
    s.addNotes('Slow down here; this is the one slide nobody may leave without. If a parent asks "is AI grading my kid?", everyone in the room can now say no, and say what we do instead.');
  }

  // ============================== SLIDE 16 · ANONYMOUS-EXCERPT RULE ==============================
  {
    const s = base();
    kicker(s, 'The question you’re already forming');
    title(s, 'Can I ever paste student work in?');
    card(s, 0.7, 1.7, 5.9, 3.6, PAPER);
    s.addText('Only an anonymous excerpt', { x: 1.05, y: 2.0, w: 5.2, h: 0.5, fontFace: FONT, fontSize: 19, bold: true, color: NAVY, margin: 0 });
    s.addText('Zero identifying details, judged by Kit 1’s test: no names, no classmates, no teacher names, no story a neighbor could recognize.', {
      x: 1.05, y: 2.6, w: 5.2, h: 2.4, fontFace: FONT, fontSize: 16.5, color: INK, margin: 0, valign: 'top' });
    card(s, 6.85, 1.7, 5.9, 3.6, 'EAF5F3');
    s.addText('When unsure: describe the pattern', { x: 7.2, y: 2.0, w: 5.2, h: 0.5, fontFace: FONT, fontSize: 19, bold: true, color: GOOD, margin: 0 });
    s.addText('“Students keep confusing X with Y.” “This writer repeats the claim instead of explaining the evidence.” Always safe, and it usually works as well.', {
      x: 7.2, y: 2.6, w: 5.2, h: 2.4, fontFace: FONT, fontSize: 16.5, color: INK, margin: 0, valign: 'top' });
    s.addText('When in doubt: describe, don’t paste.', {
      x: 0.7, y: 5.6, w: 12.0, h: 0.55, fontFace: FONT, fontSize: 22, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('The comment you need is about the pattern anyway, which is why describing usually works as well as pasting. This rule gets policed gently in the lab.');
  }

  // ============================== SLIDE 17 · HONEST LIMITS ==============================
  {
    const s = base();
    kicker(s, 'Before we build');
    title(s, 'Three honest limits');
    const items = [
      ['Can’t know intent', 'It sees the page. You saw the six weeks. Half of good feedback speaks to the attempt.'],
      ['Goes generic', 'Rubric language drifts to fog. Fix: your assignment’s specifics, by name.'],
      ['Contains errors', '57% of AI-using teachers say AI improves their grading and feedback quality (Gallup, 2025). The ones it helps are the ones who verify.'],
    ];
    items.forEach(([h, b], i) => {
      const x = 0.7 + i * 4.12;
      card(s, x, 1.7, 3.85, 3.6, PAPER);
      s.addText(h, { x: x + 0.28, y: 2.0, w: 3.3, h: 0.9, fontFace: FONT, fontSize: 19, bold: true, color: BAD, margin: 0 });
      s.addText(b, { x: x + 0.28, y: 2.9, w: 3.3, h: 2.2, fontFace: FONT, fontSize: 15, color: INK, margin: 0, valign: 'top' });
    });
    s.addText('The tool improves the work of people who check it. It embarrasses the people who don’t.', {
      x: 0.7, y: 5.65, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 18, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('If you chose to share the founders’ note, their personal line on AI and assessment lands well here. Your own line lands even better; staff trust red lines more when the presenter shows theirs.');
  }

  // ============================== SLIDE 18 · LAB SETUP ==============================
  {
    const s = base(true);
    kicker(s, 'Hands-on · ~19 minutes', { color: AMBER });
    s.addText('Lab: your next real assessment.', {
      x: 0.7, y: 1.5, w: 12.0, h: 1.0, fontFace: FONT, fontSize: 42, bold: true, color: WHITE, margin: 0 });
    s.addText('Pick something actually coming in the next month: a unit test, an essay, a project, a shop practical. Grab your notes on what good work looks like.', {
      x: 0.7, y: 2.6, w: 12.0, h: 0.9, fontFace: FONT, fontSize: 20, color: 'C9D4DE', margin: 0 });
    const rules = [
      ['1', 'No student information of any kind; we draft materials only'],
      ['2', 'Rubric first, then questions, then feedback starters'],
      ['3', 'You catch and cut at least one weak question before the lab ends'],
    ];
    rules.forEach(([n, r], i) => {
      const y = 3.8 + i * 0.9;
      s.addShape('ellipse', { x: 0.9, y, w: 0.62, h: 0.62, fill: { color: TEAL }, line: { color: TEAL } });
      s.addText(n, { x: 0.9, y, w: 0.62, h: 0.62, fontFace: FONT, fontSize: 20, bold: true, color: WHITE, align: 'center', valign: 'middle', margin: 0 });
      s.addText(r, { x: 1.75, y: y - 0.05, w: 10.8, h: 0.72, fontFace: FONT, fontSize: 20, color: WHITE, margin: 0, valign: 'middle' });
    });
    s.addNotes('Pairs, devices out inside two minutes, announce the tool. Ms. Rivera builds for ONE assessment across all three steps: her 7th grade persuasive essay, the same one from workshop 1. Her exemplar appears large on every step slide; anyone lost can copy her structure. If you grade with a rubric of your own, show it here; one real rubric from a real room tells the lab what "done" looks like.');
  }

  // ============================== SLIDE 19 · LAB STEP 1: WHAT YOU DO ==============================
  {
    const s = base();
    kicker(s, 'Lab · step 1 of 3 · 6 minutes');
    title(s, 'Notes → rubric, then iterate');
    bullets(s, [
      'Run the rubric prompt with your grade, subject, criteria, and your notes pasted in',
      'Content round: are these the right criteria? Is anything you grade for missing?',
      'Voice round: the hand-it-to-a-student test, on every descriptor',
      'Details round: table format, level names, point values if you use them',
    ], { x: 0.7, y: 1.75, w: 12.0, h: 2.9, fontSize: 19, lineSpacingMultiple: 1.7 });
    card(s, 0.7, 4.75, 12.0, 1.3, 'EAF5F3');
    s.addText([
      { text: 'Ground rule: no student information of any kind goes in. ', options: { bold: true, color: NAVY } },
      { text: '45-min cut: run the voice round only; it is the one that matters most.', options: { color: INK } },
    ], { x: 1.05, y: 4.75, w: 11.3, h: 1.3, fontFace: FONT, fontSize: 18, margin: 0, valign: 'middle' });
    s.addNotes('Say: six minutes, notes to rubric, then the three iteration rounds from Kit 2. Circulate. Weak rubrics are usually missing the teacher’s notes; nudge with "what do you actually look for when you grade this? Type that." The next two slides are Ms. Rivera doing this step on her persuasive essay: her follow-up prompt, then the rubric it produced. Anyone stuck can copy her shape with their own notes.');
  }

  // ============================== SLIDE 20 · LAB STEP 1: HER PROMPT ==============================
  {
    const s = base();
    kicker(s, 'Lab · step 1 · on Ms. Rivera’s screen');
    title(s, 'Her voice round, word for word');
    labelLine(s, 1.42, 'WHAT FAILED THE TEST', BAD, '“Demonstrates limited understanding of evidence.” Her level 2, first draft.');
    chatWindow(s, 1.95, 3.85, CHAT_RIVERA);
    promptText(s, 1.95, 3.85, [
      role('“Stay in the role of my 7th grade ELA colleague. '),
      task('Rewrite the Evidence descriptors for levels 2, 3, and 4 of the rubric you just built. '),
      ctxt('A student reading level 3 has to be able to tell me exactly what moving to level 4 requires. “Demonstrates limited understanding” tells a 12 year old nothing. Describe what the work does, not what it lacks, and use words my students actually use. '),
      fmt('One sentence per level, same table, nothing else changed.”'),
    ]);
    legendChips(s);
    s.addNotes('Say: this is the round that matters, and here is exactly how she asked for it. Same four parts, same colours, now aimed at a rubric she already has. Point out that the context part is doing the work: she tells it what a student has to be able to do with the words. Tell the room they can retype this line for line, swapping their own level names in.');
  }

  // ============================== SLIDE 21 · LAB STEP 1: HER FINISHED RUBRIC ==============================
  {
    const s = base();
    kicker(s, 'Lab · step 1 · her finished artifact');
    title(s, 'Her rubric, after two rounds');
    card(s, 0.7, 1.45, 12.0, 0.7, PAPER);
    s.addText([
      { text: 'HER NOTE, PASTED IN   ', options: { bold: true, color: TEAL, charSpacing: 1 } },
      { text: '“an A backs every claim and says why the evidence matters.”', options: { italic: true, color: INK } },
    ], { x: 1.05, y: 1.45, w: 11.3, h: 0.7, fontFace: FONT, fontSize: 16, margin: 0, valign: 'middle' });
    artifactCard(s, 2.35, 3.05, 'HER PERSUASIVE ESSAY RUBRIC · CRITERION: EVIDENCE');
    [[NAVY, 'LEVEL 3 · PROFICIENT', 'Most of your claims have a quote or a fact behind them, and you explain why that evidence matters for at least some of them.'],
     [TEAL, 'LEVEL 4 · ADVANCED', 'Every claim has a quote or a fact behind it, and you explain why it proves your point.']]
      .forEach(([c, lab, txt], i) => {
        const y = 2.95 + i * 1.25;
        s.addShape('roundRect', { x: 1.05, y, w: 2.5, h: 0.5, rectRadius: 0.1, fill: { color: c }, line: { color: c } });
        s.addText(lab, { x: 1.05, y, w: 2.5, h: 0.5, fontFace: FONT, fontSize: 12.5, bold: true, color: WHITE, align: 'center', valign: 'middle', margin: 0, charSpacing: 1 });
        s.addText(txt, { x: 3.75, y: y - 0.14, w: 8.6, h: 0.95, fontFace: FONT, fontSize: 18, color: INK, margin: 0, valign: 'middle' });
      });
    s.addText('Passed the hand-it-to-a-student test on round two. Real rubric, real essay, next week.', {
      x: 0.7, y: 5.65, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 17, italic: true, color: MUTED, align: 'center', margin: 0 });
    s.addNotes('Say: this is what she ended up with, and it is worth reading level 4 aloud. Three messy words of her own went in; a descriptor a 7th grader can act on came out. Ask the room to test it: could a student reading level 3 tell you what to do to reach level 4? That is the bar for the thing on their own screen right now.');
  }

  // ============================== SLIDE 22 · LAB STEP 2: WHAT YOU DO ==============================
  {
    const s = base();
    kicker(s, 'Lab · step 2 of 3 · 5 minutes');
    title(s, 'Build the 10-question bank');
    bullets(s, [
      'Same assessment: 10 questions, mixed format, full answer key, distractor rationale',
      { text: 'First, finish this sentence: “My students keep confusing X with Y.”', options: { bold: true, color: NAVY } },
      'Put that sentence in the prompt and make the misconception a distractor',
    ], { x: 0.7, y: 1.75, w: 12.0, h: 2.4, fontSize: 19, lineSpacingMultiple: 1.7 });
    card(s, 0.7, 4.4, 12.0, 1.3, 'EAF5F3');
    s.addText('The misconception is the one ingredient only you can supply.', {
      x: 1.05, y: 4.4, w: 11.3, h: 1.3, fontFace: FONT, fontSize: 21, bold: true, color: NAVY, margin: 0, valign: 'middle' });
    s.addText('45-min cut: six questions instead of ten.', {
      x: 0.7, y: 5.95, w: 12.0, h: 0.45, fontFace: FONT, fontSize: 17, italic: true, color: MUTED, align: 'center', margin: 0 });
    s.addNotes('Say: five minutes, same assessment, ten questions. Listen for the misconception sentences as you circulate; they are the best writing that happens all day. The next two slides show Ms. Rivera doing exactly this: her sentence going into her prompt, then the question it produced.');
  }

  // ============================== SLIDE 23 · LAB STEP 2: HER PROMPT ==============================
  {
    const s = base();
    kicker(s, 'Lab · step 2 · on Ms. Rivera’s screen');
    title(s, 'Her bank prompt, her students’ mix-up');
    labelLine(s, 1.42, 'BEFORE', BAD, '“Write ten questions about my essay unit.”');
    chatWindow(s, 1.95, 3.85, CHAT_RIVERA);
    promptText(s, 1.95, 3.85, [
      role('“You are an experienced 7th grade ELA teacher. '),
      task('Build a 10-question bank on my persuasive essay unit: 6 multiple choice, 2 short answer, 2 extended response. '),
      ctxt('My students keep confusing restating the claim with giving evidence. In every multiple-choice question, make one distractor a confident restatement of the claim, so the question catches exactly the students who hold that mix-up. '),
      fmt('Full answer key, then one line on why each distractor is wrong. Label every question with the skill it checks.”'),
    ]);
    legendChips(s);
    s.addNotes('Say: this is workshop two’s shape with her own subject and her own students in it. Read the amber part aloud: that sentence is the one thing the model could never have supplied. Everything else on this screen is scaffolding. Tell the room to write their own amber sentence first, then build the rest of the prompt around it.');
  }

  // ============================== SLIDE 24 · LAB STEP 2: HER FINISHED QUESTION ==============================
  {
    const s = base();
    kicker(s, 'Lab · step 2 · her finished artifact');
    title(s, 'Her question 4, doing real work');
    artifactCard(s, 1.5, 4.15, 'HER ESSAY BANK · QUESTION 4 OF 10 · SKILL: USING EVIDENCE');
    s.addText('“Which sentence gives evidence for the claim that the school day should start later?”', {
      x: 1.05, y: 1.95, w: 11.3, h: 0.6, fontFace: FONT, fontSize: 18, bold: true, color: NAVY, margin: 0, valign: 'middle' });
    [['A', '“Starting the day later is clearly the right choice for students.”', 'restates the claim', 'B07914'],
     ['B', '“A district study found attendance rose 12 percent after the bell moved to 8:40.”', 'the key', GOOD],
     ['C', '“Most people agree that teenagers need more sleep.”', 'opinion, not evidence', MUTED],
     ['D', '“Teachers would like a later start too.”', 'off the claim', MUTED]]
      .forEach(([letter, txt, note, c], i) => {
        s.addText([
          { text: letter + '   ', options: { bold: true, color: NAVY } },
          { text: txt + '   ', options: { color: INK } },
          { text: note, options: { italic: true, bold: true, color: c } },
        ], { x: 1.05, y: 2.65 + i * 0.44, w: 11.3, h: 0.4, fontFace: FONT, fontSize: 16, margin: 0, valign: 'middle' });
      });
    s.addText([
      { text: 'ANSWER KEY   ', options: { bold: true, color: TEAL, charSpacing: 1 } },
      { text: 'B. Distractor A is her students’ mix-up said louder: it restates the claim instead of supporting it.', options: { color: INK } },
    ], { x: 1.05, y: 4.65, w: 11.3, h: 0.85, fontFace: FONT, fontSize: 17, margin: 0, valign: 'middle' });
    s.addText('Whoever picks A has just told her what to reteach. That is a question doing diagnostic work.', {
      x: 0.7, y: 5.85, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 17, italic: true, color: MUTED, align: 'center', margin: 0 });
    s.addNotes('Say: this is one item out of her ten, printed the way her students will see it. Walk the options: A is the mix-up she named in her prompt, wearing confident language, so the students who hold it will pick it. That is the whole point of naming your misconception. Ask the room to look at one of their own items and find the distractor that does this job.');
  }

  // ============================== SLIDE 25 · THE VETTING REP ==============================
  {
    const s = base();
    kicker(s, 'Lab · still step 2 · 2 minutes · everyone');
    title(s, 'The vetting rep: find the weak one', { fontSize: 28 });
    bullets(s, [
      'Answer key checked against your own professional knowledge',
      'Every distractor checked for accidental truth',
      'Reading level right? Exactly one fair answer per question?',
      'Weakest question: fix it by hand, or cut it and write the replacement yourself',
    ], { x: 0.7, y: 1.6, w: 12.0, h: 2.0, fontSize: 18 });
    artifactCard(s, 3.55, 1.95, 'MS. RIVERA’S CATCH · QUESTION 7 OF HER ESSAY BANK');
    s.addText([
      { text: 'The problem: ', options: { bold: true, color: NAVY } },
      { text: 'the answer marked wrong was defensible too. Two fair answers in one question, and no student could have known which one she wanted.\n', options: { color: INK } },
      { text: 'The fix: ', options: { bold: true, color: NAVY } },
      { text: 'she cut question 7 and wrote its replacement herself. “Got one.”', options: { color: INK } },
    ], { x: 1.05, y: 4.0, w: 11.3, h: 1.4, fontFace: FONT, fontSize: 18, margin: 0, valign: 'top', lineSpacingMultiple: 1.2 });
    s.addText('When you find it, say “got one” out loud. Drafts are cheap; vetting is sacred.', {
      x: 0.7, y: 5.8, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 19, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('Say: two minutes, everyone, read your bank like a hostile editor. This rep is a requirement, not a suggestion: it installs the habit that makes the whole workflow safe. The card is Ms. Rivera’s actual catch in the bank you just saw: a question with two defensible answers, cut and rewritten by hand. Celebrate every catch in the room audibly.');
  }

  // ============================== SLIDE 26 · LAB STEP 3: WHAT YOU DO ==============================
  {
    const s = base();
    kicker(s, 'Lab · step 3 of 3 · 3–4 minutes');
    title(s, 'Three reusable feedback starters');
    bullets(s, [
      'Name your three most common student patterns for this kind of work',
      'Run the pattern prompt: strength, pattern, next step, in plain student language',
      'Save all three where you grade; paste your best one into the staff doc',
    ], { x: 0.7, y: 1.75, w: 12.0, h: 2.4, fontSize: 19, lineSpacingMultiple: 1.7 });
    card(s, 0.7, 4.4, 12.0, 1.3, 'EAF5F3');
    s.addText('Starters, not stamps: you personalize every one before it reaches a kid.', {
      x: 1.05, y: 4.4, w: 11.3, h: 1.3, fontFace: FONT, fontSize: 21, bold: true, color: NAVY, margin: 0, valign: 'middle' });
    s.addText('No student work goes in. You already know your patterns by heart.', {
      x: 0.7, y: 5.95, w: 12.0, h: 0.45, fontFace: FONT, fontSize: 17, italic: true, color: MUTED, align: 'center', margin: 0 });
    s.addNotes('Say: three or four minutes, and the prompt is workshop three’s, unchanged. If someone starts pasting a student’s work, redirect gently: describe the pattern instead; excerpts only if fully anonymous by Kit 1’s test. The next slide is what Ms. Rivera got back, all three of them, so anyone still typing can see where this lands.');
  }

  // ============================== SLIDE 27 · LAB STEP 3: HER FINISHED STARTERS ==============================
  {
    const s = base();
    kicker(s, 'Lab · step 3 · her finished artifact');
    title(s, 'Her three starters, ready to use');
    [['PATTERN 1 · CLAIM WITH NO EVIDENCE', '“Your claim is clear and confident, and I knew exactly what you were arguing from the first line. Right now the essay repeats that claim instead of backing it up. Pick your strongest fact and add one sentence on why it proves your point.”'],
     ['PATTERN 2 · EVIDENCE WITH NO EXPLANATION', '“You found strong evidence, and the quote you picked is the right one for this argument. What is missing is you: the reader needs a sentence in your voice saying what that quote proves. Add it right after the quote.”'],
     ['PATTERN 3 · NEW ARGUMENT IN THE CONCLUSION', '“Your ending has real energy and the last line lands. The new argument you bring in there deserves its own paragraph in the middle. Move it up, and close by telling the reader why your strongest point matters.”']]
      .forEach(([lab, txt], i) => {
        const y = 1.5 + i * 1.55;
        card(s, 0.7, y, 12.0, 1.45, WHITE, 'DCE3EA');
        s.addText(lab, { x: 1.05, y: y + 0.12, w: 11.3, h: 0.3, fontFace: FONT, fontSize: 12.5, bold: true, color: TEAL, charSpacing: 1.5, margin: 0, valign: 'middle' });
        s.addText(txt, { x: 1.05, y: y + 0.45, w: 11.3, h: 0.92, fontFace: FONT, fontSize: 16, italic: true, color: INK, margin: 0, valign: 'top' });
      });
    s.addText('Drafted in one run, for the stacks she grades every year. She personalizes every one before delivery.', {
      x: 0.7, y: 6.15, w: 12.0, h: 0.45, fontFace: FONT, fontSize: 16, italic: true, color: MUTED, align: 'center', margin: 0 });
    s.addNotes('Say: three patterns, three starters, one run. Read the first one aloud and point at the shape: something the writer did well, the pattern named plainly, one concrete next step, all in words a 7th grader can read. That shape is what participants should be checking their own three against right now.');
  }

  // ============================== SLIDE 28 · SHARE-OUT ==============================
  {
    const s = base();
    kicker(s, 'Share-out · 3–4 voices');
    title(s, 'Catches first');
    bullets(s, [
      { text: 'Who caught a weak question, and what was wrong with it? Those stories go first.', options: { bold: true, color: NAVY } },
      'Read one rubric descriptor that passes the hand-it-to-a-student test',
      'Read one feedback starter you’ll actually use this week',
    ], { y: 1.7, h: 2.8, fontSize: 22 });
    s.addNotes('Say: let’s hear it, and the weak-question stories go first. Celebrate every catch; that’s the habit we’re building. Keep each voice to a minute. 45-min cut: two voices.');
  }

  // ============================== SLIDE 29 · HER FINISHED ASSESSMENT ==============================
  {
    const s = base();
    kicker(s, 'Where the lab lands · one assessment, complete');
    title(s, 'The finished assessment');
    [['THE RUBRIC · 4 LEVELS', '“Every claim has a quote or a fact behind it, and you explain why it proves your point.”', 'Two rounds to get there.'],
     ['THE BANK · 10 QUESTIONS', '“Which sentence gives evidence for the claim that the school day should start later?”', 'Question 7 caught and cut.'],
     ['THE STARTERS · 3 PATTERNS', '“Pick your strongest fact and add one sentence on why it proves your point.”', 'Personalized before delivery.']]
      .forEach(([lab, quote, note], i) => {
        const x = 0.7 + i * 4.12;
        card(s, x, 1.55, 3.85, 3.5, PAPER);
        s.addText(lab, { x: x + 0.28, y: 1.72, w: 3.3, h: 0.32, fontFace: FONT, fontSize: 12.5, bold: true, color: TEAL, charSpacing: 1.2, margin: 0, valign: 'middle' });
        s.addText(quote, { x: x + 0.28, y: 2.15, w: 3.3, h: 1.95, fontFace: FONT, fontSize: 16, italic: true, color: INK, margin: 0, valign: 'top' });
        s.addText(note, { x: x + 0.28, y: 4.2, w: 3.3, h: 0.55, fontFace: FONT, fontSize: 14, bold: true, color: NAVY, margin: 0, valign: 'top' });
      });
    card(s, 0.7, 5.3, 12.0, 1.15, NAVY);
    s.addText('One assessment, finished: the materials her class meets next week, and a teacher’s judgment on every line of them.', {
      x: 1.05, y: 5.3, w: 11.3, h: 1.15, fontFace: FONT, fontSize: 19, bold: true, color: WHITE, margin: 0, valign: 'middle' });
    s.addNotes('Say: that is Ms. Rivera’s whole assessment, done, and this is the point of the hour. Not three demos: one real assessment with a rubric, a vetted bank, and three starters, built in the same nineteen minutes you just had. Then turn it to the room: yours is at the same stage, so let’s name what you built.');
  }

  // ============================== SLIDE 30 · WHAT YOU BUILT ==============================
  {
    const s = base();
    kicker(s, 'Nineteen minutes ago this didn’t exist');
    title(s, 'The inventory');
    card(s, 0.7, 1.8, 12.0, 3.6, PAPER);
    s.addText([
      { text: 'A four-level rubric a student can read. A vetted question bank with a checked answer key. Three feedback starters for the comments you write most. One weak question caught and cut as proof the reflex works.\n\n', options: { color: INK } },
      { text: 'That set used to be a weekend. The judgment in it is all yours; only the typing got faster.', options: { bold: true, color: NAVY } },
    ], { x: 1.1, y: 2.1, w: 11.2, h: 3.0, fontFace: FONT, fontSize: 20, margin: 0, valign: 'middle' });
    s.addNotes('Say: the same four things Ms. Rivera has, in your subject, for your calendar. Land it plainly. The asset is materials plus the vetting habit, not speed for its own sake.');
  }

  // ============================== SLIDE 31 · INTO THE STAFF DOC ==============================
  {
    const s = base();
    kicker(s, 'Making it stick · part one');
    title(s, 'The staff doc grows an Assessment section');
    bullets(s, [
      'Rubric prompt, question-bank prompt, starter prompt: templated, with blanks',
      'ELA’s rubric template travels to science; the shop’s safety-quiz prompt travels to health',
      { text: 'Same commitment as Kit 2: when a prompt works, it goes in the doc. Nobody solves the same problem twice.', options: { bold: true, color: NAVY } },
    ], { y: 1.6, h: 2.8 });
    card(s, 0.7, 4.6, 12.0, 1.5, 'EAF5F3');
    s.addText('Templates are the compounding asset. The doc gets smarter every week you use it.', {
      x: 1.05, y: 4.8, w: 11.3, h: 1.1, fontFace: FONT, fontSize: 21, bold: true, color: NAVY, margin: 0, valign: 'middle' });
    s.addNotes('Project the staff doc’s new Assessment section; watching entries appear live is the proof.');
  }

  // ============================== SLIDE 32 · THE FIVE HOURS ==============================
  {
    const s = base(true);
    kicker(s, 'The vision, stated carefully', { color: AMBER });
    s.addText('Five hours a week on grading and feedback.', {
      x: 0.7, y: 1.7, w: 12.0, h: 0.9, fontFace: FONT, fontSize: 34, bold: true, color: WHITE, margin: 0 });
    s.addText('We’re not promising them all back. Grading still means reading real work and making real calls, and it should.', {
      x: 0.7, y: 2.8, w: 12.0, h: 0.9, fontFace: FONT, fontSize: 21, color: 'C9D4DE', margin: 0 });
    s.addText('But a real share of those hours was never judgment. It was drafting: the rubric at 9 p.m., the quiz typed from scratch, the same comment keyed forty times. That share moves to a machine that drafts and a teacher who decides.', {
      x: 0.7, y: 3.9, w: 12.0, h: 1.5, fontFace: FONT, fontSize: 21, bold: true, color: TEAL, margin: 0 });
    s.addText('Spend what comes back on the part only you can do, or on your own life. Both are wins.', {
      x: 0.7, y: 5.7, w: 12.0, h: 0.6, fontFace: FONT, fontSize: 19, italic: true, color: '9FB2C2', margin: 0 });
    s.addNotes('Median 5 hrs/week is Merrimack/EdWeek 2022. Keep the framing honest: no promised hour counts, just the drafting share moving to a faster tool.');
  }

  // ============================== SLIDE 33 · WHAT'S NEXT ==============================
  {
    const s = base();
    kicker(s, 'Kit 4 of 8 · Track A');
    title(s, 'Where this series goes next');
    const kits = ['1 · Foundations & Safety  ✔', '2 · Prompting Basics  ✔', '3 · Planning & Differentiation  ✔', '4 · Assessment  ✔', '5 · Academic Integrity', '6 · Communication', '7 · Workload', '8 · Your School’s AI Culture'];
    kits.forEach((k, i) => {
      const x = 0.7 + (i % 4) * 3.1, y = 1.7 + Math.floor(i / 4) * 1.3;
      card(s, x, y, 2.9, 1.1, i < 4 ? 'EAF5F3' : PAPER);
      s.addText(k, { x: x + 0.2, y: y + 0.1, w: 2.5, h: 0.9, fontFace: FONT, fontSize: 14.5, bold: i < 4, color: NAVY, margin: 0, valign: 'middle' });
    });
    card(s, 0.7, 4.6, 12.0, 1.6, NAVY);
    s.addText([
      { text: 'Next: Kit 5, Academic Integrity. ', options: { bold: true, color: WHITE } },
      { text: 'The student side of assessment: what honesty and original work look like when every student has these tools too. Your rubric from today comes along; clear success criteria are one of the best integrity tools we have.', options: { color: 'C9D4DE' } },
    ], { x: 1.05, y: 4.8, w: 11.3, h: 1.2, fontFace: FONT, fontSize: 16.5, margin: 0, valign: 'middle' });
    s.addNotes('Completing all eight kits earns the AI-Ready Educator Certificate of Completion; check with your district or state whether it qualifies for local credit.');
  }

  // ============================== SLIDE 34 · FIRST 48 ==============================
  {
    const s = base();
    kicker(s, 'Before Friday becomes a memory');
    title(s, 'Your first 48 hours: three small things');
    const acts = [
      ['~15 min', 'Hand the rubric to students', 'One last student-test pass, then out with the real assignment'],
      ['~10 min', 'Finish the vetting pass', 'Every question against the key; fix or delete; file the bank'],
      ['~15 min', 'Use one starter for real', 'On your next stack, personalized every time; post your best to the staff doc'],
    ];
    acts.forEach(([t, h, b], i) => {
      const y = 1.6 + i * 1.55;
      card(s, 0.7, y, 12.0, 1.35, PAPER);
      s.addText(t, { x: 1.0, y: y + 0.42, w: 1.5, h: 0.5, fontFace: FONT, fontSize: 17, bold: true, color: TEAL, margin: 0 });
      s.addText(h, { x: 2.6, y: y + 0.16, w: 9.9, h: 0.5, fontFace: FONT, fontSize: 20, bold: true, color: NAVY, margin: 0 });
      s.addText(b, { x: 2.6, y: y + 0.68, w: 9.9, h: 0.6, fontFace: FONT, fontSize: 16, color: INK, margin: 0 });
    });
    s.addNotes('Hold up the First 48 Hours sheet. Tomorrow morning, coffee in hand, pick one.');
  }

  // ============================== SLIDE 35 · EXIT TICKET ==============================
  {
    const s = base();
    kicker(s, 'Two minutes');
    title(s, 'Exit ticket');
    bullets(s, [
      'The assessment you built for, and what you’ll actually use',
      'The weak question you caught, and what was wrong with it',
      'One assessment task you still want help with',
    ], { y: 1.7, h: 2.6, fontSize: 24 });
    s.addText('Yes, we’re asking about the catch. It’s the answer we’re proudest of.', {
      x: 0.7, y: 4.7, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 19, italic: true, color: MUTED, margin: 0 });
    s.addNotes('Distribute tickets; collect at the door. They double as the school’s PD documentation.');
  }

  // ============================== SLIDE 36 · CLOSE ==============================
  {
    const s = base(true);
    s.addText('The rubric is paper.\nThe questions are paper.', {
      x: 0.7, y: 2.0, w: 12.0, h: 1.8, fontFace: FONT, fontSize: 36, bold: true, color: WHITE, align: 'center', margin: 0, lineSpacingMultiple: 1.2 });
    s.addText('Knowing what a ten-year-old meant to say, and what\nthey need to hear next: that was never paper. That’s you.', {
      x: 0.7, y: 4.2, w: 12.0, h: 1.3, fontFace: FONT, fontSize: 24, bold: true, color: TEAL, align: 'center', margin: 0, lineSpacingMultiple: 1.25 });
    s.addText('Human teaching. Life-changing tools.', {
      x: 0.7, y: 6.4, w: 12.0, h: 0.4, fontFace: FONT, fontSize: 13, color: '9FB2C2', align: 'center', charSpacing: 2, margin: 0 });
    s.addNotes('Thanks, everyone. Collect the exit tickets at the door.');
  }

  const out = path.join(root, 'kits/kit04/Kit04_PresentationDeck.pptx');
  await p.writeFile({ fileName: out });
  console.log('wrote', out, '·', slideNo, 'slides');
})();
