#!/usr/bin/env node
/* Kit 4 Presentation Deck · AI for Assessment: Rubrics, Feedback, and Question Banks
   30 slides, locked AI-Ready School brand, speaker notes on every slide.
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

  const RIVERA = [null, "Her pile: 5 hours a week of grading and feedback, most after dinner.",
    "Her gap: feedback is her highest-leverage move, and AI never touched it.",
    "Her goal: a rubric and question bank for a real upcoming assessment.",
    "Her formative habit: check understanding, adapt. AI drafts the materials.",
    "Her rubric bar: students can read it. That's what makes the research pay.",
    "Her question bar: quality beats quantity; the misconception does the work.",
    "Her division of labor: AI drafts the materials, she makes every judgment.", null, "Her rubric test: hand it to a student. 'Limited understanding' fails.",
    "Her bank prompt: topic plus the confusion her students actually have.",
    "Her vetting stance: 97% on-topic still isn't 100%. Every key gets checked.",
    "Her read of the evidence: AI feedback is a floor. She is the ceiling.",
    "Her starters: drafted for patterns, personalized before any student sees one.",
    "Her red lines: AI never grades, never sees names, never decides.",
    "Her excerpt rule: anonymous or described, never pasted with identity.",
    "Her red lines, adopted out loud, with the presenter's own.",
    "Her lab pick, one assessment through every step: her persuasive essay.",
    "Her essay rubric, on screen big: messy notes in, four readable levels out.",
    "Her essay bank, on screen: the claim-repeat confusion built into a distractor.",
    "Her essay bank, vetted: question 7 had two fair answers. Caught and cut.",
    "Her essay starters, on screen: three patterns from her essay stacks, drafted once.",
    "Her share-out: the catch from her essay bank goes first.",
    "Her essay inventory: rubric, vetted bank, three starters, one catch.",
    "Her templates: filed in the staff doc's Assessment section.",
    "Her five hours: the drafting share just moved to a faster tool.",
    "Her next kit: the student side. Integrity and clear expectations.",
    "Her 48 hours: rubric out with the assignment, finish vetting, use one starter.",
    "Her exit ticket: what she built, the weak question she caught.", null];
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
  function beforeAfter(s, beforeTxt, afterTxt, afterH = 2.6) {
    card(s, 0.7, 1.55, 12.0, 1.5, 'FBEFED');
    s.addText('BEFORE', { x: 1.0, y: 1.7, w: 2, h: 0.35, fontFace: FONT, fontSize: 14, bold: true, color: BAD, margin: 0 });
    s.addText(beforeTxt, { x: 1.0, y: 2.05, w: 11.4, h: 0.9, fontFace: FONT, fontSize: 18, italic: true, color: INK, margin: 0 });
    card(s, 0.7, 3.3, 12.0, afterH, 'EAF5F3');
    s.addText('AFTER', { x: 1.0, y: 3.45, w: 2, h: 0.35, fontFace: FONT, fontSize: 14, bold: true, color: GOOD, margin: 0 });
    s.addText(afterTxt, { x: 1.0, y: 3.8, w: 11.4, h: afterH - 0.6, fontFace: FONT, fontSize: 15.5, italic: true, color: INK, margin: 0, valign: 'top' });
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
    s.addText('Feedback’s average “effect size” on student achievement: roughly double the impact of the typical educational intervention. (Hattie & Timperley, 2007)', {
      x: 1.0, y: 3.4, w: 5.15, h: 1.9, fontFace: FONT, fontSize: 16, color: INK, align: 'center', margin: 0 });
    card(s, 6.85, 1.75, 5.75, 3.7, PAPER);
    s.addText('HOW MANY TEACHERS TAP IT WITH AI', { x: 6.85, y: 1.95, w: 5.75, h: 0.35, fontFace: FONT, fontSize: 13, bold: true, color: MUTED, align: 'center', charSpacing: 2, margin: 0 });
    s.addText('≤15%', { x: 6.85, y: 2.3, w: 5.75, h: 1.05, fontFace: FONT, fontSize: 52, bold: true, color: MUTED, align: 'center', margin: 0 });
    s.addText('Of teachers who already used AI in 2023–24, 15% or fewer used it for writing assessments: the least-tapped use, sitting under the highest-leverage work. (RAND, 2025)', {
      x: 7.15, y: 3.4, w: 5.15, h: 1.9, fontFace: FONT, fontSize: 16, color: INK, align: 'center', margin: 0 });
    s.addText('Feedback’s power varies with how it’s given. That skill is yours; the drafting is delegable.', {
      x: 0.7, y: 5.85, w: 12.0, h: 0.55, fontFace: FONT, fontSize: 20, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('Hattie & Timperley: 0.79 average, roughly double the typical intervention, but impact swings widely with feedback type and delivery. RAND: assessment writing is the least-tapped use among AI-using teachers. That gap is why this hour exists.');
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
    s.addText([
      { text: 'BEFORE   ', options: { bold: true, color: BAD } },
      { text: '“Make a rubric for my essay assignment.”', options: { italic: true, color: MUTED } },
    ], { x: 0.7, y: 1.42, w: 12.0, h: 0.4, fontFace: FONT, fontSize: 16, margin: 0, valign: 'middle' });
    s.addShape('roundRect', { x: 0.7, y: 1.95, w: 12.0, h: 3.85, rectRadius: 0.1, fill: { color: WHITE }, line: { color: 'DCE3EA', width: 1.5 } });
    s.addShape('roundRect', { x: 0.7, y: 1.95, w: 12.0, h: 0.42, rectRadius: 0.1, fill: { color: NAVY }, line: { color: NAVY } });
    ['E8837A', AMBER, GOOD].forEach((c, i) => s.addShape('ellipse', { x: 0.95 + i * 0.27, y: 2.08, w: 0.16, h: 0.16, fill: { color: c }, line: { color: c } }));
    s.addText('AI chat tool (any of them) · Ms. Rivera, our running example teacher (a composite, not a real person)', {
      x: 1.95, y: 1.95, w: 10.6, h: 0.42, fontFace: FONT, fontSize: 11, color: '9FB2C2', margin: 0, valign: 'middle' });
    s.addShape('roundRect', { x: 1.7, y: 2.6, w: 10.55, h: 2.95, rectRadius: 0.12, fill: { color: PAPER }, line: { color: PAPER } });
    s.addText([
      { text: '“You are an experienced 7th grade ELA teacher. ', options: { color: TEAL, bold: true } },
      { text: 'Turn my notes into a 4-level analytic rubric (Beginning · Developing · Proficient · Advanced) for a persuasive essay. ', options: { color: NAVY, bold: true } },
      { text: 'Criteria: claim, evidence, organization, conventions. Write every descriptor in language a 7th grader can read, and make each level describe what the work does, not what it lacks. ', options: { color: 'B07914', bold: true } },
      { text: 'Format: a table with criteria down the side. Then ask me up to three questions about anything unclear in my notes.”  [paste your notes]', options: { color: GOOD, bold: true } },
    ], { x: 1.95, y: 2.72, w: 10.05, h: 2.75, fontFace: FONT, fontSize: 16, margin: 0, valign: 'top', lineSpacingMultiple: 1.1 });
    const chips = [['ROLE', TEAL], ['TASK', NAVY], ['CONTEXT', 'B07914'], ['FORMAT', GOOD]];
    chips.forEach(([t, c], i) => {
      const x = 0.7 + i * 3.08;
      s.addShape('roundRect', { x, y: 6.05, w: 2.85, h: 0.5, rectRadius: 0.25, fill: { color: c }, line: { color: c } });
      s.addText(t, { x, y: 6.05, w: 2.85, h: 0.5, fontFace: FONT, fontSize: 14, bold: true, color: WHITE, align: 'center', valign: 'middle', margin: 0, charSpacing: 2 });
    });
    s.addNotes('Say: workshop one, on Ms. Rivera\'s screen, our running composite example. Her messy grading notes are the context; that is Kit 2\'s formula doing assessment work: role teal, task navy, context amber, format green. The "ask me up to three questions" line is the escape hatch from Kit 2\'s spice rack. In the lab you\'ll mimic this shape with your own notes.');
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
    beforeAfter(s,
      '“Write ten quiz questions about photosynthesis.”',
      '“You are a middle school science teacher. Build a 10-question bank on photosynthesis for 7th graders who commonly confuse it with respiration. Mix: 6 multiple choice, 2 short answer, 2 extended response. In each multiple-choice question, make one distractor the respiration confusion. Include a full answer key, then explain in one line why each distractor is wrong. Label each question with the skill it checks.”',
      3.1);
    s.addNotes('The special ingredient is the misconception: you know what your students mix up, the model doesn’t until you say so. Feed it the confusion and the distractors start doing diagnostic work.');
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
    kicker(s, 'The workflow: describe the pattern, not the student');
    title(s, 'Feedback starters for common patterns');
    card(s, 0.7, 1.65, 12.0, 2.9, 'EAF5F3');
    s.addText('“Here are the three most common patterns in my students’ persuasive essays: claims with no evidence, evidence with no explanation, conclusions that introduce new arguments. For each, draft a 2–3 sentence feedback comment: name something the writer did well, name the pattern plainly, give one concrete next step. Warm, specific, readable by a 7th grader. I’ll personalize every comment before a student sees it.”', {
      x: 1.05, y: 1.9, w: 11.3, h: 2.4, fontFace: FONT, fontSize: 16.5, italic: true, color: NAVY, margin: 0, valign: 'middle' });
    bullets(s, [
      'No student work needed at all: you already know your patterns by heart',
      { text: 'Starters, not stamps: you add the sentence only you can write, then you deliver it', options: { bold: true, color: NAVY } },
    ], { y: 4.85, h: 1.5, fontSize: 20 });
    s.addNotes('A personal beat fits here if you have one: a piece of feedback that only worked because you knew the kid and what they were attempting.');
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

  // ============================== SLIDE 19 · LAB STEP 1 ==============================
  {
    const s = base();
    kicker(s, 'Lab · step 1 of 3 · 6 minutes');
    title(s, 'Notes → rubric, then iterate', { w: 8.7 });
    bullets(s, [
      'Run the rubric prompt with your grade, subject, criteria, and pasted notes',
      'Content round: are these the right criteria? Is anything you actually grade for missing?',
      'Voice round: the hand-it-to-a-student test, on every descriptor',
      'Details round: table format, level names, point values if you use them',
    ], { x: 0.7, y: 1.7, w: 5.9, h: 3.9, fontSize: 16 });
    card(s, 6.85, 1.7, 5.9, 3.9, 'EAF5F3');
    s.addText('MS. RIVERA\'S ESSAY · STEP 1 · HER RUBRIC', { x: 7.15, y: 1.9, w: 5.4, h: 0.32, fontFace: FONT, fontSize: 12.5, bold: true, color: TEAL, charSpacing: 1.5, margin: 0 });
    s.addText([
      { text: 'Her note: ', options: { bold: true, color: NAVY } },
      { text: '"an A backs every claim and says why the evidence matters."\n', options: { italic: true, color: INK } },
      { text: 'Level 4 · Evidence: ', options: { bold: true, color: NAVY } },
      { text: '"Every claim has a quote or fact behind it, and you explain why it proves your point."\n', options: { color: INK } },
      { text: 'Passed the hand-it-to-a-student test on round two.', options: { italic: true, color: MUTED } },
    ], { x: 7.15, y: 2.35, w: 5.35, h: 3.1, fontFace: FONT, fontSize: 16, margin: 0, valign: 'top', lineSpacingMultiple: 1.2 });
    s.addText('45-min cut: run the voice round only; it’s the one that matters most.', {
      x: 0.7, y: 5.85, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 18, italic: true, color: MUTED, align: 'center', margin: 0 });
    s.addNotes('Circulate. Weak rubrics are usually missing the teacher’s notes; nudge with "what do you actually look for when you grade this? Type that." The big card is Ms. Rivera\'s persuasive-essay rubric mid-build, the same assessment she carries through all three steps: her messy note went in, a readable level-4 descriptor came out. Anyone stuck can copy that shape with their own notes.');
  }

  // ============================== SLIDE 20 · LAB STEP 2 ==============================
  {
    const s = base();
    kicker(s, 'Lab · step 2 of 3 · 5 minutes');
    title(s, 'Build the 10-question bank', { w: 8.7 });
    bullets(s, [
      'Same assessment: 10 questions, mixed format, full answer key, distractor rationale',
      { text: 'First, finish this sentence: “My students keep confusing X with Y.”', options: { bold: true, color: NAVY } },
      'Put that sentence in the prompt and make the misconception a distractor',
    ], { x: 0.7, y: 1.7, w: 5.9, h: 3.9, fontSize: 16 });
    card(s, 6.85, 1.7, 5.9, 3.9, 'EAF5F3');
    s.addText('MS. RIVERA\'S ESSAY · STEP 2 · HER BANK', { x: 7.15, y: 1.9, w: 5.4, h: 0.32, fontFace: FONT, fontSize: 12.5, bold: true, color: TEAL, charSpacing: 1.5, margin: 0 });
    s.addText([
      { text: 'Her sentence: ', options: { bold: true, color: NAVY } },
      { text: '"My students keep confusing restating the claim with giving evidence."\n', options: { italic: true, color: INK } },
      { text: 'Q4: ', options: { bold: true, color: NAVY } },
      { text: '"Which sentence gives evidence for the claim?" Distractor C restates the claim, louder.\n', options: { color: INK } },
      { text: 'That distractor finds exactly who holds the mix-up.', options: { italic: true, color: MUTED } },
    ], { x: 7.15, y: 2.35, w: 5.35, h: 3.1, fontFace: FONT, fontSize: 16, margin: 0, valign: 'top', lineSpacingMultiple: 1.2 });
    card(s, 0.7, 5.75, 12.0, 0.85, 'EAF5F3');
    s.addText('The misconception is the one ingredient only you can supply.', {
      x: 1.05, y: 5.75, w: 11.3, h: 0.85, fontFace: FONT, fontSize: 20, bold: true, color: NAVY, margin: 0, valign: 'middle' });
    s.addNotes('45-min cut: six questions instead of ten. Listen for the misconception sentences; they’re the best writing that happens all day. The big card is Ms. Rivera\'s bank for the same persuasive essay: her misconception sentence went into the prompt, and one distractor now restates the claim, exactly the mix-up her students make. Mimic her sentence with your own X and Y.');
  }

  // ============================== SLIDE 21 · THE VETTING REP ==============================
  {
    const s = base();
    kicker(s, 'Lab · still step 2 · 2 minutes · everyone');
    title(s, 'The vetting rep: find the weak one', { w: 8.7, fontSize: 28 });
    bullets(s, [
      'Answer key checked against your own professional knowledge',
      'Every distractor checked for accidental truth',
      'Reading level right? Exactly one fair answer per question?',
      'Weakest question: fix it by hand, or delete it and write its replacement yourself',
    ], { x: 0.7, y: 1.7, w: 5.9, h: 3.9, fontSize: 16 });
    card(s, 6.85, 1.7, 5.9, 3.9, 'EAF5F3');
    s.addText('MS. RIVERA\'S ESSAY · STEP 2 · HER CATCH', { x: 7.15, y: 1.9, w: 5.4, h: 0.32, fontFace: FONT, fontSize: 12.5, bold: true, color: TEAL, charSpacing: 1.5, margin: 0 });
    s.addText([
      { text: 'The catch: ', options: { bold: true, color: NAVY } },
      { text: 'question 7\'s "wrong" answer was defensible too. Two fair answers, one question.\n', options: { color: INK } },
      { text: 'The fix: ', options: { bold: true, color: NAVY } },
      { text: 'she cut it and wrote the replacement herself.\n', options: { color: INK } },
      { text: '"Got one."', options: { italic: true, bold: true, color: NAVY } },
    ], { x: 7.15, y: 2.35, w: 5.35, h: 3.1, fontFace: FONT, fontSize: 17, margin: 0, valign: 'top', lineSpacingMultiple: 1.25 });
    s.addText('When you find it, say “got one” out loud. Drafts are cheap; vetting is sacred.', {
      x: 0.7, y: 5.85, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 19, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('This rep is a requirement, not a suggestion: it installs the habit that makes the whole workflow safe. The big card shows Ms. Rivera\'s catch in her own essay bank: a question with two defensible answers, cut and rewritten by hand. Celebrate every catch audibly.');
  }

  // ============================== SLIDE 22 · LAB STEP 3 ==============================
  {
    const s = base();
    kicker(s, 'Lab · step 3 of 3 · 3–4 minutes');
    title(s, 'Three reusable feedback starters', { w: 8.7 });
    bullets(s, [
      'Name your three most common student patterns for this kind of work',
      'Run the pattern prompt: strength, pattern, next step, in plain student language',
      'Save all three where you grade; paste your best one into the staff doc’s Assessment section',
    ], { x: 0.7, y: 1.7, w: 5.9, h: 3.9, fontSize: 16 });
    card(s, 6.85, 1.7, 5.9, 3.9, 'EAF5F3');
    s.addText('MS. RIVERA\'S ESSAY · STEP 3 · HER STARTERS', { x: 7.15, y: 1.9, w: 5.4, h: 0.32, fontFace: FONT, fontSize: 12.5, bold: true, color: TEAL, charSpacing: 1.5, margin: 0 });
    s.addText([
      { text: 'Her pattern: ', options: { bold: true, color: NAVY } },
      { text: 'claims with no evidence.\n', options: { color: INK } },
      { text: '"Your claim is clear and confident. Right now the essay repeats it instead of backing it up. Pick your strongest fact and add one sentence on why it proves your point."\n', options: { italic: true, color: INK } },
      { text: 'Personalized before any student sees it.', options: { italic: true, color: MUTED } },
    ], { x: 7.15, y: 2.35, w: 5.35, h: 3.1, fontFace: FONT, fontSize: 15.5, margin: 0, valign: 'top', lineSpacingMultiple: 1.2 });
    card(s, 0.7, 5.75, 12.0, 0.85, 'EAF5F3');
    s.addText('Starters, not stamps: in real grading you’ll personalize every one before it reaches a kid.', {
      x: 1.05, y: 5.75, w: 11.3, h: 0.85, fontFace: FONT, fontSize: 18, bold: true, color: NAVY, margin: 0, valign: 'middle' });
    s.addNotes('If someone starts pasting a student’s work, redirect gently: describe the pattern instead; excerpts only if fully anonymous by Kit 1’s test. The big card is one of Ms. Rivera\'s three starters for the same persuasive essay: strength, pattern, next step, in words a 7th grader can read. Copy its shape for your own patterns.');
  }

  // ============================== SLIDE 23 · SHARE-OUT ==============================
  {
    const s = base();
    kicker(s, 'Share-out · 3–4 voices');
    title(s, 'Catches first');
    bullets(s, [
      { text: 'Who caught a weak question, and what was wrong with it? Those stories go first.', options: { bold: true, color: NAVY } },
      'Read one rubric descriptor that passes the hand-it-to-a-student test',
      'Read one feedback starter you’ll actually use this week',
    ], { y: 1.7, h: 2.8, fontSize: 22 });
    s.addNotes('Celebrate every catch; that’s the habit we’re building. Keep each voice to a minute. 45-min cut: two voices.');
  }

  // ============================== SLIDE 24 · WHAT YOU BUILT ==============================
  {
    const s = base();
    kicker(s, 'Nineteen minutes ago this didn’t exist');
    title(s, 'The inventory');
    card(s, 0.7, 1.8, 12.0, 3.6, PAPER);
    s.addText([
      { text: 'A four-level rubric a student can read. A vetted question bank with a checked answer key. Three feedback starters for the comments you write most. One weak question caught and cut as proof the reflex works.\n\n', options: { color: INK } },
      { text: 'That set used to be a weekend. The judgment in it is all yours; only the typing got faster.', options: { bold: true, color: NAVY } },
    ], { x: 1.1, y: 2.1, w: 11.2, h: 3.0, fontFace: FONT, fontSize: 20, margin: 0, valign: 'middle' });
    s.addNotes('Land this plainly. The asset is materials plus the vetting habit, not speed for its own sake.');
  }

  // ============================== SLIDE 25 · INTO THE STAFF DOC ==============================
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

  // ============================== SLIDE 26 · THE FIVE HOURS ==============================
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

  // ============================== SLIDE 27 · WHAT'S NEXT ==============================
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

  // ============================== SLIDE 28 · FIRST 48 ==============================
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

  // ============================== SLIDE 29 · EXIT TICKET ==============================
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

  // ============================== SLIDE 30 · CLOSE ==============================
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
