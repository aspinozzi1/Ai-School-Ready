#!/usr/bin/env node
/* Kit 2 Presentation Deck · Prompting Basics: Getting Useful Results Every Time
   30 slides, locked AI-Ready School brand, speaker notes on every slide.
   Build: node kits/kit02-tpt/src/deck.js (TpT edition)  → kits/kit02-tpt/Kit02_PresentationDeck.pptx */
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
  p.title = 'Kit 2: Prompting Basics: Getting Useful Results Every Time';

  const RIVERA = [null, "Her gap: same tools as the weekly savers. The skill is what differs.",
    "Her lesson learned: vague in, beige out. The model only has what she gives it.",
    "Her goal: leave owning one reusable prompt for a weekly task.",
    "Her pre-flight: would a colleague with zero context get it?",
    "Her formula, from now on: Role, Task, Context, Format.",
    "Her expectation, calibrated: structure buys measurably better output.",
    "Her caveat, permanent: no prompt turns off hallucination. She still verifies.", null, "Her note-home prompt: the situation, never the child. Kit 1 rides along.",
    "Her leveling spec: grade level, keep key ideas, sentence limits, vocab box.",
    "Her spice rack: constraints, audience, an example, 'ask me questions first.'",
    "Her diagnosis eye: when output disappoints, context is usually missing.",
    "Her template: blanks for topic, grade, count, format. Twenty seconds to reuse.",
    "Her iteration rounds, in order: content, then voice, then details.",
    "Her judgment call: 80% right, iterate. Wrong thing entirely, fresh prompt.",
    "Her voice check: read it aloud; if it isn't her, she says 'warmer' or 'blunter.'",
    "Her lab pick: the Friday newsletter. Weekly task, real payoff.",
    "On her screen: the four-part draft, run once, read like an editor.",
    "Her three rounds, live: fixed content, warmed the voice, tightened details.",
    "Her template, saved: her name, one line on what it's for, in the staff doc.",
    "Her before and after, read aloud: the delta is the lesson.",
    "Her library: one entry today. It compounds from here.",
    "Her one-slide system: formula, colleague test, three rounds, template it.",
    "Her limits list: can't check facts, know her kids, or pick what matters.",
    "Her new norm: working prompts go in the staff doc. Nobody solves twice.",
    "Her next kit: the formula starts differentiating for her whole roster.",
    "Her 48 hours: run the template for real, one colleague test, one post.",
    "Her exit ticket: one technique taken, one task still wanted.", null];
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
      s.addText(`Kit 2 · Prompting Basics   |   ${slideNo}`, {
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
    s.addText('TRACK A · AI FOUNDATIONS · KIT 2 OF 20', {
      x: 0.9, y: 3.0, w: 9, h: 0.4, fontFace: FONT, fontSize: 15, bold: true,
      color: AMBER, charSpacing: 3, margin: 0 });
    s.addText('Prompting Basics:\nGetting Useful Results Every Time', {
      x: 0.85, y: 3.35, w: 11.8, h: 2.0, fontFace: FONT, fontSize: 44, bold: true,
      color: WHITE, margin: 0, valign: 'middle', lineSpacingMultiple: 1.05 });
    s.addText('A 45–60 minute working session. You leave with a reusable prompt you built yourself.', {
      x: 0.9, y: 5.45, w: 11.2, h: 0.5, fontFace: FONT, fontSize: 18, color: 'C9D4DE', margin: 0 });
    s.addText('Built by Adam & Katelyn Spinozzi · certified educators · 20+ combined years in the classroom', {
      x: 0.9, y: 6.6, w: 11.5, h: 0.4, fontFace: FONT, fontSize: 12, color: '9FB2C2', margin: 0 });
    s.addNotes('Slide up as people arrive. Start on time. This session assumes Kit 1: the One Hard Rule and the review-everything rule are in force.');
  }

  // ============================== SLIDE 2 · THE GAP ==============================
  {
    const s = base();
    kicker(s, 'Why this hour exists');
    title(s, 'Same tools. Very different results.');
    card(s, 0.7, 1.75, 5.75, 3.7, PAPER);
    s.addText('~3 in 10', { x: 0.7, y: 2.1, w: 5.75, h: 1.2, fontFace: FONT, fontSize: 58, bold: true, color: TEAL, align: 'center', margin: 0 });
    s.addText('teachers use AI weekly,\nsaving ~5.9 hours a week\n(Gallup & Walton Family Fdn., 2025)', {
      x: 1.0, y: 3.4, w: 5.15, h: 1.8, fontFace: FONT, fontSize: 16, color: INK, align: 'center', margin: 0 });
    card(s, 6.85, 1.75, 5.75, 3.7, PAPER);
    s.addText('4 in 10', { x: 6.85, y: 2.1, w: 5.75, h: 1.2, fontFace: FONT, fontSize: 58, bold: true, color: MUTED, align: 'center', margin: 0 });
    s.addText('don’t use AI at all,\nsame tools, same access\n(same survey)', {
      x: 7.15, y: 3.4, w: 5.15, h: 1.8, fontFace: FONT, fontSize: 16, color: INK, align: 'center', margin: 0 });
    s.addText('The difference isn’t the technology. It’s a skill: knowing how to ask.', {
      x: 0.7, y: 5.85, w: 12.0, h: 0.55, fontFace: FONT, fontSize: 21, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('Source: Gallup-Walton 2025, 2,232 teachers. The gap between weekly users and non-users is the skill this session teaches.');
  }

  // ============================== SLIDE 3 · WHY "JUST ASK" FAILS ==============================
  {
    const s = base();
    kicker(s, 'Kit 1 flashback: prediction machines');
    title(s, 'Why “just ask” gets beige answers');
    bullets(s, [
      'The model predicts the most likely continuation of your words',
      { text: 'A vague prompt → the most average answer on the internet', options: {} },
      { text: '“Write a lesson on fractions” gets you the world’s most generic fractions lesson. Not wrong. Beige.', options: {} },
    ], { y: 1.6, h: 2.6 });
    card(s, 0.7, 4.4, 12.0, 1.8, 'EAF5F3');
    s.addText('The fix isn’t magic words. The fix is information: the model can only use what you give it.', {
      x: 1.05, y: 4.65, w: 11.3, h: 1.3, fontFace: FONT, fontSize: 22, bold: true, color: NAVY, margin: 0, valign: 'middle' });
    s.addNotes('If asked "is prompting a fad until AI gets smarter?": tools get better at guessing intent, but no tool can guess what only you know: your grade, your students, your constraints, your taste.');
  }

  // ============================== SLIDE 4 · AGENDA ==============================
  {
    const s = base();
    kicker(s, 'The hour ahead');
    title(s, 'Agenda, and one promise');
    const rows = [
      ['0:05', 'Anatomy of a prompt that works'],
      ['0:12', 'Live makeovers: real prompts, fixed'],
      ['0:24', 'Iterate, don’t settle'],
      ['0:30', 'Lab: build your reusable prompt'],
      ['0:49', 'Making it stick + first 48 hours'],
    ];
    rows.forEach(([t, txt], i) => {
      const y = 1.6 + i * 0.8;
      s.addText(t, { x: 0.9, y, w: 1.1, h: 0.6, fontFace: FONT, fontSize: 20, bold: true, color: TEAL, margin: 0, valign: 'middle' });
      s.addText(txt, { x: 2.1, y, w: 7.4, h: 0.6, fontFace: FONT, fontSize: 20, color: INK, margin: 0, valign: 'middle' });
    });
    card(s, 9.9, 2.1, 2.85, 3.2, NAVY);
    s.addText('One promise', { x: 10.15, y: 2.35, w: 2.35, h: 0.4, fontFace: FONT, fontSize: 16, bold: true, color: AMBER, margin: 0 });
    s.addText('You leave owning a reusable prompt for a task you do every week. Not theory. Inventory.', {
      x: 10.15, y: 2.8, w: 2.35, h: 2.3, fontFace: FONT, fontSize: 14, color: WHITE, margin: 0, valign: 'top' });
    s.addNotes('Say: four stops this hour: the anatomy of a prompt that works, live makeovers of real prompts, learning to iterate instead of settling, and a lab where you build a reusable prompt for a task you do every week. The promise line matters: staff leave with a tool, not notes. Keep this quick.');
  }

  // ============================== SLIDE 5 · COLLEAGUE TEST ==============================
  {
    const s = base(true);
    kicker(s, 'One test predicts everything', { color: TEAL });
    s.addText('The colleague test', {
      x: 0.7, y: 1.4, w: 12.0, h: 0.9, fontFace: FONT, fontSize: 40, bold: true, color: WHITE, margin: 0 });
    s.addText('Show your prompt to a colleague with zero context.\nIf they’d be confused, the model will be too.', {
      x: 0.7, y: 2.6, w: 12.0, h: 1.4, fontFace: FONT, fontSize: 26, color: 'C9D4DE', margin: 0, lineSpacingMultiple: 1.2 });
    s.addText('Treat the AI like a brilliant new hire on day one: enormously capable, knows nothing about your classroom. Write for that new hire.', {
      x: 0.7, y: 4.5, w: 12.0, h: 1.2, fontFace: FONT, fontSize: 20, color: TEAL, bold: true, margin: 0 });
    s.addNotes('Straight from Anthropic’s own documentation ("golden rule of clear prompting"). This is the pre-flight check for every prompt staff ever write.');
  }

  // ============================== SLIDE 6 · FOUR PARTS ==============================
  {
    const s = base();
    kicker(s, 'Where every official guide converges');
    title(s, 'Four parts, every time');
    const parts = [
      ['Role', 'Who should the AI be?', '“You are an experienced 4th grade teacher.”'],
      ['Task', 'What exactly do you want? One clear verb.', '“Draft a 45-minute intro lesson…”'],
      ['Context', 'What would a substitute need to know?', '“They confuse numerator and denominator…”'],
      ['Format', 'What should the output look like?', '“A table with timings + 3-question exit check.”'],
    ];
    parts.forEach(([h, q, e], i) => {
      const x = 0.7 + (i % 2) * 6.15, y = 1.55 + Math.floor(i / 2) * 2.3;
      card(s, x, y, 5.85, 2.1, PAPER);
      s.addText(h, { x: x + 0.3, y: y + 0.18, w: 5.25, h: 0.5, fontFace: FONT, fontSize: 22, bold: true, color: TEAL, margin: 0 });
      s.addText(q, { x: x + 0.3, y: y + 0.72, w: 5.25, h: 0.6, fontFace: FONT, fontSize: 16, bold: true, color: NAVY, margin: 0 });
      s.addText(e, { x: x + 0.3, y: y + 1.3, w: 5.25, h: 0.7, fontFace: FONT, fontSize: 14.5, italic: true, color: INK, margin: 0 });
    });
    s.addText('Role · Task · Context · Format. Everything else today is practice.', {
      x: 0.7, y: 6.15, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 19, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('OpenAI, Google, Anthropic, and state DOE frameworks (NC’s CRAFT, AI for Education’s Five-S) converge on these same elements. If asked "all four every time?": no; but when output disappoints, the missing part is almost always context.');
  }

  // ============================== SLIDE 7 · WHY IT WORKS ==============================
  {
    const s = base();
    kicker(s, 'Measured, not folklore');
    title(s, 'Specific in, specific out');
    card(s, 0.7, 1.8, 12.0, 3.2, PAPER);
    s.addText('+50%', { x: 0.7, y: 2.2, w: 12.0, h: 1.4, fontFace: FONT, fontSize: 72, bold: true, color: TEAL, align: 'center', margin: 0 });
    s.addText('Researchers testing structured, principled prompts against casual ones measured response-quality improvements of more than half on the strongest models. (Bsharat et al., 2024, preprint)', {
      x: 1.4, y: 3.7, w: 10.5, h: 1.1, fontFace: FONT, fontSize: 16, color: INK, align: 'center', margin: 0 });
    s.addText('The formula is just a reliable way to be specific.', {
      x: 0.7, y: 5.5, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 20, italic: true, color: MUTED, align: 'center', margin: 0 });
    s.addNotes('Benchmark study: 26 prompt-design principles improved GPT-4 response quality by 57.7% on average (accuracy by 36.4%). Labeled a preprint in the References. Keep it one beat; don’t oversell.');
  }

  // ============================== SLIDE 8 · WHAT PROMPTS CAN'T FIX ==============================
  {
    const s = base();
    kicker(s, 'Honest limits, before the makeovers');
    title(s, 'The one thing prompts can’t fix');
    card(s, 0.7, 1.7, 12.0, 2.2, NAVY);
    s.addText('No prompt turns off hallucination. A beautifully structured prompt can still invent a fact, with total confidence.', {
      x: 1.1, y: 1.95, w: 11.2, h: 1.7, fontFace: FONT, fontSize: 24, bold: true, color: WHITE, margin: 0, valign: 'middle' });
    bullets(s, [
      'Prompting improves quality and fit; it does not replace verification',
      { text: 'The Kit 1 rule rides along forever: anything factual gets checked before you rely on it', options: { bold: true, color: NAVY } },
    ], { y: 4.2, h: 1.8, fontSize: 20 });
    s.addNotes('Land this honestly: even a well-iterated, careful prompt can produce a confident factual error that only subject expertise catches. Expertise is the safety net; never lend yours out.');
  }

  // ============================== SLIDE 9 · MAKEOVER 1 ==============================
  {
    const s = base();
    kicker(s, 'Makeover #1 · planning · on Ms. Rivera\'s screen');
    title(s, 'The lesson plan');
    s.addText([
      { text: 'BEFORE   ', options: { bold: true, color: BAD } },
      { text: '“Write a lesson on fractions.”', options: { italic: true, color: MUTED } },
    ], { x: 0.7, y: 1.42, w: 12.0, h: 0.4, fontFace: FONT, fontSize: 16, margin: 0, valign: 'middle' });
    s.addShape('roundRect', { x: 0.7, y: 1.95, w: 12.0, h: 3.85, rectRadius: 0.1, fill: { color: WHITE }, line: { color: 'DCE3EA', width: 1.5 } });
    s.addShape('roundRect', { x: 0.7, y: 1.95, w: 12.0, h: 0.42, rectRadius: 0.1, fill: { color: NAVY }, line: { color: NAVY } });
    ['E8837A', AMBER, GOOD].forEach((c, i) => s.addShape('ellipse', { x: 0.95 + i * 0.27, y: 2.08, w: 0.16, h: 0.16, fill: { color: c }, line: { color: c } }));
    s.addText('AI chat tool (any of them) · Ms. Rivera, our running example teacher (a composite, not a real person)', {
      x: 1.95, y: 1.95, w: 10.6, h: 0.42, fontFace: FONT, fontSize: 11, color: '9FB2C2', margin: 0, valign: 'middle' });
    s.addShape('roundRect', { x: 1.7, y: 2.6, w: 10.55, h: 2.35, rectRadius: 0.12, fill: { color: PAPER }, line: { color: PAPER } });
    s.addText([
      { text: '“You are an experienced 4th grade teacher. ', options: { color: TEAL, bold: true } },
      { text: 'Draft a 45-minute introductory lesson on equivalent fractions ', options: { color: NAVY, bold: true } },
      { text: 'for a class that has mastered basic fraction notation but confuses numerator and denominator when simplifying. Include a 5-minute warm-up, a hands-on activity using paper folding, and a 3-question exit check. ', options: { color: 'B07914', bold: true } },
      { text: 'Format as a table with timings.”', options: { color: GOOD, bold: true } },
    ], { x: 1.95, y: 2.75, w: 10.05, h: 2.1, fontFace: FONT, fontSize: 16, margin: 0, valign: 'top', lineSpacingMultiple: 1.12 });
    s.addText('AI: drafting the table…', { x: 1.7, y: 5.05, w: 6, h: 0.4, fontFace: FONT, fontSize: 13, italic: true, color: MUTED, margin: 0 });
    const chips = [['ROLE', TEAL], ['TASK', NAVY], ['CONTEXT', 'B07914'], ['FORMAT', GOOD]];
    chips.forEach(([t, c], i) => {
      const x = 0.7 + i * 3.08;
      s.addShape('roundRect', { x, y: 6.05, w: 2.85, h: 0.5, rectRadius: 0.25, fill: { color: c }, line: { color: c } });
      s.addText(t, { x, y: 6.05, w: 2.85, h: 0.5, fontFace: FONT, fontSize: 14, bold: true, color: WHITE, align: 'center', valign: 'middle', margin: 0, charSpacing: 2 });
    });
    s.addNotes('Say: watch the same request go from beige to usable on our example teacher\'s screen. Ms. Rivera appears in every kit; she\'s a composite, not a real teacher, and her screen is the thing to mimic in the lab. Count the four color-coded parts out loud: role in teal, task in navy, context in amber, format in green. Same request, completely different result.');
  }

  // ============================== SLIDE 10 · MAKEOVER 2 ==============================
  {
    const s = base();
    kicker(s, 'Makeover #2 · communication');
    title(s, 'The family note (no names needed)');
    beforeAfter(s,
      '“Write a note to parents about the field trip.”',
      '“You are a warm, organized elementary teacher. Write a note to families about an upcoming museum field trip. Context: departure 8:30 a.m., return by 2 p.m., students need a bagged lunch and a signed permission slip by Friday. Reading level: busy families skimming on a phone. Format: under 150 words, three action items as a bulleted list.”',
      2.9);
    s.addNotes('Point out the Kit 1 rule working alongside the formula: zero student names, and none needed. The situation, not the child.');
  }

  // ============================== SLIDE 11 · MAKEOVER 3 ==============================
  {
    const s = base();
    kicker(s, 'Makeover #3 · differentiation');
    title(s, 'The leveled text');
    beforeAfter(s,
      '“Make this easier.”',
      '“Rewrite this passage at a 3rd grade reading level. Keep every key idea and the section headings. Sentence length under 12 words where possible. Then add a 5-word vocabulary box with student-friendly definitions.”  [paste your passage]',
      2.4);
    s.addText('The difference between “easier” and a specification is the difference between hoping and knowing.', {
      x: 0.7, y: 6.1, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 18, italic: true, color: MUTED, align: 'center', margin: 0 });
    s.addNotes('This one saves the most weekly time. Kit 3 goes deep on differentiation; today it’s a formula demo.');
  }

  // ============================== SLIDE 12 · SPICE RACK ==============================
  {
    const s = base();
    kicker(s, 'Small ingredients, big upgrades');
    title(s, 'The spice rack');
    const items = [
      ['Constraints', '“Under 150 words” · “exactly five questions” · “nothing that needs a copier”'],
      ['Audience', '“For students who’ve never seen this word” · “for families skimming on a phone”'],
      ['An example', 'Paste one sample in the style you want: “match this style”'],
      ['Escape hatch', '“Ask me up to three clarifying questions before you start.”'],
    ];
    items.forEach(([h, b], i) => {
      const x = 0.7 + (i % 2) * 6.15, y = 1.6 + Math.floor(i / 2) * 2.15;
      card(s, x, y, 5.85, 1.95, PAPER);
      s.addText(h, { x: x + 0.3, y: y + 0.2, w: 5.25, h: 0.5, fontFace: FONT, fontSize: 20, bold: true, color: NAVY, margin: 0 });
      s.addText(b, { x: x + 0.3, y: y + 0.75, w: 5.25, h: 1.1, fontFace: FONT, fontSize: 15.5, color: INK, margin: 0 });
    });
    s.addNotes('The escape hatch is the crowd favorite: one line turns a guessing machine into an interviewer. Nothing communicates taste like a pasted example.');
  }

  // ============================== SLIDE 13 · YOU TRY ==============================
  {
    const s = base();
    kicker(s, 'Call it out: what’s missing?');
    title(s, 'Diagnose the prompt');
    const prompts = [
      ['A', '“Write a quiz about the Revolution.”'],
      ['B', '“Help me with my struggling readers.”'],
      ['C', '“Photosynthesis.”'],
      ['D', '“You are a middle school science teacher. Create a 10-question review on photosynthesis for 7th graders who confuse it with respiration. Mix multiple choice and short answer. Include an answer key.”'],
    ];
    prompts.forEach(([ltr, txt], i) => {
      const y = 1.5 + i * 1.22;
      s.addShape('roundRect', { x: 0.7, y, w: 0.75, h: 1.0, rectRadius: 0.08, fill: { color: NAVY }, line: { color: NAVY } });
      s.addText(ltr, { x: 0.7, y, w: 0.75, h: 1.0, fontFace: FONT, fontSize: 26, bold: true, color: WHITE, align: 'center', valign: 'middle', margin: 0 });
      card(s, 1.6, y, 11.1, 1.0, PAPER);
      s.addText(txt, { x: 1.9, y: y + 0.05, w: 10.5, h: 0.9, fontFace: FONT, fontSize: 15.5, italic: true, color: INK, margin: 0, valign: 'middle' });
    });
    s.addText('Answers: A missing context (grade? focus?) · B missing format (what should "help" look like?) · C missing the task itself · D has all four parts', {
      x: 0.7, y: 6.42, w: 12.0, h: 0.4, fontFace: FONT, fontSize: 13.5, italic: true, color: MUTED, align: 'center', margin: 0 });
    s.addNotes('Let the room call each one before you confirm with the answer line at the bottom. Brisk; 3 minutes.');
  }

  // ============================== SLIDE 14 · TEMPLATES ==============================
  {
    const s = base();
    kicker(s, 'Nobody writes from scratch at 7 a.m.');
    title(s, 'Templates beat memory');
    card(s, 0.7, 1.7, 12.0, 2.5, 'EAF5F3');
    s.addText('“You are a [grade/subject] teacher. Create a [number]-question review on [topic] for students who [what they struggle with]. Format: [format]. Include an answer key.”', {
      x: 1.1, y: 2.0, w: 11.2, h: 1.9, fontFace: FONT, fontSize: 21, italic: true, color: NAVY, margin: 0, valign: 'middle' });
    bullets(s, [
      'Four blanks, twenty seconds, done',
      'Today’s lab builds your first one',
      { text: 'The staff prompt doc is where they live: nobody solves the same problem twice', options: { bold: true, color: NAVY } },
    ], { y: 4.5, h: 1.9, fontSize: 20 });
    s.addNotes('Researchers call these "prompt patterns" (White et al., 2023): documented, reusable solutions. We call it the staff prompt doc.');
  }

  // ============================== SLIDE 15 · FIRST DRAFT = PROPOSAL ==============================
  {
    const s = base(true);
    kicker(s, 'The mindset shift', { color: TEAL });
    s.addText('The first response is not the answer.\nIt’s a proposal.', {
      x: 0.7, y: 1.8, w: 12.0, h: 1.7, fontFace: FONT, fontSize: 38, bold: true, color: WHITE, margin: 0, lineSpacingMultiple: 1.15 });
    s.addText('Three rounds, in order:', { x: 0.7, y: 3.8, w: 12, h: 0.4, fontFace: FONT, fontSize: 18, color: '9FB2C2', margin: 0 });
    const rounds = [['1 · Content', '“Question 4 is too hard for the start of the unit.”'],
      ['2 · Voice', '“Warmer. I’d never say ‘furthermore.’”'],
      ['3 · Details', '“Shorten by a third; number the directions.”']];
    rounds.forEach(([h, e], i) => {
      const y = 4.35 + i * 0.78;
      s.addText(h, { x: 0.9, y, w: 2.3, h: 0.6, fontFace: FONT, fontSize: 20, bold: true, color: TEAL, margin: 0, valign: 'middle' });
      s.addText(e, { x: 3.3, y, w: 9.3, h: 0.6, fontFace: FONT, fontSize: 18, italic: true, color: WHITE, margin: 0, valign: 'middle' });
    });
    s.addNotes('This formalizes Kit 1’s "push back twice" into a system. Content, then voice, then details.');
  }

  // ============================== SLIDE 16 · ITERATE VS START OVER ==============================
  {
    const s = base();
    kicker(s, 'One judgment call');
    title(s, 'Iterate, or start over?');
    card(s, 0.7, 1.7, 5.9, 4.2, 'EAF5F3');
    s.addText('Iterate when…', { x: 1.05, y: 2.0, w: 5.2, h: 0.5, fontFace: FONT, fontSize: 21, bold: true, color: GOOD, margin: 0 });
    s.addText('the draft is ~80% right. Fix content, then voice, then details. Two or three rounds, done.', {
      x: 1.05, y: 2.6, w: 5.2, h: 2.9, fontFace: FONT, fontSize: 18, color: INK, margin: 0, valign: 'top' });
    card(s, 6.85, 1.7, 5.9, 4.2, PAPER);
    s.addText('Start over when…', { x: 7.2, y: 2.0, w: 5.2, h: 0.5, fontFace: FONT, fontSize: 21, bold: true, color: BAD, margin: 0 });
    s.addText('it’s fundamentally the wrong thing. Don’t argue with it for ten minutes; open a fresh prompt and fold what you learned into the context.', {
      x: 7.2, y: 2.6, w: 5.2, h: 2.9, fontFace: FONT, fontSize: 18, color: INK, margin: 0, valign: 'top' });
    s.addText('Your time matters more than the tool’s feelings. It doesn’t have any.', {
      x: 0.7, y: 6.15, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 18, italic: true, color: MUTED, align: 'center', margin: 0 });
    s.addNotes('Knowing when to quit a thread is itself a skill: one round of deciding, not five.');
  }

  // ============================== SLIDE 17 · VOICE CHECK ==============================
  {
    const s = base();
    kicker(s, 'The last round is always the voice round');
    title(s, 'Keep your voice');
    bullets(s, [
      'AI output has a house style: smooth, agreeable, a little beige',
      'If everything you send home sounds like everything everyone else sends home, families notice',
      { text: 'Read it aloud. If it doesn’t sound like you, say so: “Blunter.” “Warmer.”', options: {} },
    ], { y: 1.6, h: 2.7 });
    card(s, 0.7, 4.5, 12.0, 1.6, 'EAF5F3');
    s.addText('Your voice is a feature. Keep it.', {
      x: 1.05, y: 4.7, w: 11.3, h: 1.2, fontFace: FONT, fontSize: 26, bold: true, color: NAVY, margin: 0, valign: 'middle' });
    s.addNotes('Read the authors’ shared take from the script: voice matters most in personal communication with parents and students; academic language has its place, but empathetic personal messages should be in the teacher’s own words.');
  }

  // ============================== SLIDE 18 · LAB SETUP ==============================
  {
    const s = base(true);
    kicker(s, 'Hands-on · ~19 minutes', { color: AMBER });
    s.addText('Lab: build a tool, not a toy.', {
      x: 0.7, y: 1.5, w: 12.0, h: 1.0, fontFace: FONT, fontSize: 42, bold: true, color: WHITE, margin: 0 });
    s.addText('Pick one task you do every week: the Friday newsletter, the weekly quiz, leveling a reading, station directions.', {
      x: 0.7, y: 2.6, w: 12.0, h: 0.9, fontFace: FONT, fontSize: 20, color: 'C9D4DE', margin: 0 });
    const rules = [
      ['1', 'No student information; we practice like we play'],
      ['2', 'Draft with all four parts; be generous with context'],
      ['3', 'You’ll iterate three rounds, then save the template'],
    ];
    rules.forEach(([n, r], i) => {
      const y = 3.8 + i * 0.9;
      s.addShape('ellipse', { x: 0.9, y, w: 0.62, h: 0.62, fill: { color: TEAL }, line: { color: TEAL } });
      s.addText(n, { x: 0.9, y, w: 0.62, h: 0.62, fontFace: FONT, fontSize: 20, bold: true, color: WHITE, align: 'center', valign: 'middle', margin: 0 });
      s.addText(r, { x: 1.75, y: y - 0.05, w: 10.8, h: 0.72, fontFace: FONT, fontSize: 20, color: WHITE, margin: 0, valign: 'middle' });
    });
    s.addNotes('Pairs, devices out inside two minutes, announce the tool. The script’s worked example under slide 19 is a real reusable prompt from a working carpentry program.');
  }

  // ============================== SLIDE 19 · LAB STEP 1 ==============================
  {
    const s = base();
    kicker(s, 'Lab · step 1 of 3 · 6 minutes');
    title(s, 'Draft with the formula');
    const parts = ['Role: who should it be?', 'Task: one clear verb', 'Context: what would a substitute need to know?', 'Format: exactly what the output looks like'];
    parts.forEach((t, i) => {
      const y = 1.65 + i * 0.95;
      card(s, 0.7, y, 12.0, 0.8, PAPER);
      s.addText(t, { x: 1.05, y: y + 0.06, w: 11.3, h: 0.68, fontFace: FONT, fontSize: 19, color: INK, margin: 0, valign: 'middle' });
    });
    s.addText('Run it. Then read the draft like an editor, not a fan.', {
      x: 0.7, y: 5.7, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 20, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('Circulate. Weak prompts usually lack context; nudge with "what would a substitute need to know to do this right?" Then read the real carpentry CNC table-leg prompt from the script as the worked example (three stacked roles, one task, SVG-for-CNC format).');
  }

  // ============================== SLIDE 20 · LAB STEP 2 ==============================
  {
    const s = base();
    kicker(s, 'Lab · step 2 of 3 · 6 minutes');
    title(s, 'Three rounds of iteration');
    const rounds = [
      ['Content', 'What’s wrong or missing? Fix it first.'],
      ['Voice', 'Does it sound like you? Read it aloud.'],
      ['Details', 'Length, level, layout: make them exact.'],
    ];
    rounds.forEach(([h, b], i) => {
      const x = 0.7 + i * 4.12;
      card(s, x, 1.7, 3.85, 3.2, PAPER);
      s.addShape('ellipse', { x: x + 1.42, y: 2.0, w: 1.0, h: 1.0, fill: { color: TEAL }, line: { color: TEAL } });
      s.addText(String(i + 1), { x: x + 1.42, y: 2.0, w: 1.0, h: 1.0, fontFace: FONT, fontSize: 30, bold: true, color: WHITE, align: 'center', valign: 'middle', margin: 0 });
      s.addText(h, { x: x + 0.25, y: 3.2, w: 3.35, h: 0.5, fontFace: FONT, fontSize: 20, bold: true, color: NAVY, align: 'center', margin: 0 });
      s.addText(b, { x: x + 0.25, y: 3.75, w: 3.35, h: 1.0, fontFace: FONT, fontSize: 15, color: INK, align: 'center', margin: 0 });
    });
    s.addText('Push back like you would with a capable student teacher: specific, kind, unafraid.', {
      x: 0.7, y: 5.4, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 18, italic: true, color: MUTED, align: 'center', margin: 0 });
    s.addNotes('45-min cut: one round instead of three, then straight to step 3.');
  }

  // ============================== SLIDE 21 · LAB STEP 3 ==============================
  {
    const s = base();
    kicker(s, 'Lab · step 3 of 3 · 5 minutes');
    title(s, 'Template it. Save it. Share it.');
    bullets(s, [
      'Replace the specifics with blanks: [topic], [grade], [number of questions]',
      'Paste the final template into the staff prompt doc',
      'Add your name and one line: what it’s for',
    ], { y: 1.6, h: 2.5 });
    card(s, 0.7, 4.3, 12.0, 1.9, 'EAF5F3');
    s.addText('You just wrote the first entry in your professional prompt library. Kit 18 grows it into a whole collection.', {
      x: 1.05, y: 4.55, w: 11.3, h: 1.4, fontFace: FONT, fontSize: 21, bold: true, color: NAVY, margin: 0, valign: 'middle' });
    s.addNotes('Project the staff prompt doc link. Watching entries appear live is the session’s proudest moment.');
  }

  // ============================== SLIDE 22 · SHARE-OUT ==============================
  {
    const s = base();
    kicker(s, 'Share-out · 3–4 voices');
    title(s, 'Before and after');
    bullets(s, [
      'Read us your before and your after',
      'What one change made the biggest difference?',
      { text: 'Anyone catch the AI being wrong mid-lab? That story goes first.', options: { bold: true, color: NAVY } },
    ], { y: 1.7, h: 2.8, fontSize: 22 });
    s.addNotes('One person reading their before AND after lets the room hear the delta. Keep each voice to a minute.');
  }

  // ============================== SLIDE 23 · WHAT YOU BUILT ==============================
  {
    const s = base();
    kicker(s, 'Fifteen minutes ago this didn’t exist');
    title(s, 'You went from asking to owning');
    card(s, 0.7, 1.8, 12.0, 3.6, PAPER);
    s.addText([
      { text: 'The teachers saving six hours a week were never typing faster.\n\n', options: { bold: true, color: NAVY } },
      { text: 'They own a small library of prompts that fit their classroom, plus the reflex to push back until the output earns their name on it. As of today, so do you.', options: { color: INK } },
    ], { x: 1.1, y: 2.1, w: 11.2, h: 3.0, fontFace: FONT, fontSize: 21, margin: 0, valign: 'middle' });
    s.addNotes('Land this plainly. The asset is the library plus the habit, not speed.');
  }

  // ============================== SLIDE 24 · ONE-SLIDE SUMMARY ==============================
  {
    const s = base(true);
    kicker(s, 'The whole session', { color: AMBER });
    s.addText('The formula on one slide', {
      x: 0.7, y: 0.95, w: 12.0, h: 0.7, fontFace: FONT, fontSize: 34, bold: true, color: WHITE, margin: 0 });
    const lines = [
      ['Before you type', 'Role · Task · Context · Format, then the colleague test'],
      ['After it answers', 'Three rounds: content, voice, details'],
      ['When it works', 'Template it, save it, share it in the staff doc'],
      ['Always', 'No student PII in. Nothing unreviewed out. Verify anything factual.'],
    ];
    lines.forEach(([h, b], i) => {
      const y = 1.95 + i * 1.15;
      s.addText(h, { x: 0.9, y, w: 3.1, h: 0.9, fontFace: FONT, fontSize: 19, bold: true, color: TEAL, margin: 0, valign: 'middle' });
      s.addText(b, { x: 4.2, y, w: 8.4, h: 0.9, fontFace: FONT, fontSize: 19, color: WHITE, margin: 0, valign: 'middle' });
    });
    s.addNotes('This is the handout’s spine too. Read it as a rhythm, not a lecture.');
  }

  // ============================== SLIDE 25 · HONEST LIMITS ==============================
  {
    const s = base();
    kicker(s, 'So nobody oversells it in the hallway');
    title(s, 'What prompting cannot do');
    const items = [
      ['Can’t check facts', 'You still verify. Every time.'],
      ['Can’t know your students', 'Personalizing happens after the draft comes back.'],
      ['Can’t decide what’s worth teaching', 'That was never a formatting problem.'],
    ];
    items.forEach(([h, b], i) => {
      const x = 0.7 + i * 4.12;
      card(s, x, 1.7, 3.85, 3.2, PAPER);
      s.addText(h, { x: x + 0.28, y: 2.0, w: 3.3, h: 0.9, fontFace: FONT, fontSize: 19, bold: true, color: BAD, margin: 0 });
      s.addText(b, { x: x + 0.28, y: 3.0, w: 3.3, h: 1.6, fontFace: FONT, fontSize: 16, color: INK, margin: 0, valign: 'top' });
    });
    s.addText('Better prompts buy you time and quality. Judgment stays yours.', {
      x: 0.7, y: 5.4, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 19, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('Steady, honest close to the teaching. The next two slides are commitments and what’s next.');
  }

  // ============================== SLIDE 26 · COMMITMENT #4 ==============================
  {
    const s = base(true);
    kicker(s, 'Kit 1 gave us three; today adds one', { color: AMBER });
    s.addText('Commitment #4', {
      x: 0.7, y: 1.6, w: 12.0, h: 0.8, fontFace: FONT, fontSize: 36, bold: true, color: WHITE, margin: 0 });
    s.addText('When a prompt works, it goes in the staff doc.\nNobody at this school solves the same problem twice.', {
      x: 0.7, y: 2.7, w: 12.0, h: 1.6, fontFace: FONT, fontSize: 28, bold: true, color: TEAL, margin: 0, lineSpacingMultiple: 1.2 });
    s.addText('Can I get a nod on that?', {
      x: 0.7, y: 5.3, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 20, italic: true, color: '9FB2C2', margin: 0 });
    s.addNotes('Ask for the visible nod, same as Kit 1. Agreement out loud is what makes it a norm.');
  }

  // ============================== SLIDE 27 · WHAT'S NEXT ==============================
  {
    const s = base();
    kicker(s, 'Kit 2 of 8 · Track A');
    title(s, 'Where this series goes next');
    const kits = ['1 · Foundations & Safety  ✔', '2 · Prompting Basics  ✔', '3 · Planning & Differentiation', '4 · Assessment', '5 · Academic Integrity', '6 · Communication', '7 · Workload', '8 · Your School’s AI Culture'];
    kits.forEach((k, i) => {
      const x = 0.7 + (i % 4) * 3.1, y = 1.7 + Math.floor(i / 4) * 1.3;
      card(s, x, y, 2.9, 1.1, i < 2 ? 'EAF5F3' : PAPER);
      s.addText(k, { x: x + 0.2, y: y + 0.1, w: 2.5, h: 0.9, fontFace: FONT, fontSize: 14.5, bold: i < 2, color: NAVY, margin: 0, valign: 'middle' });
    });
    card(s, 0.7, 4.6, 12.0, 1.6, NAVY);
    s.addText([
      { text: 'Next: Kit 3, Planning & Differentiation. ', options: { bold: true, color: WHITE } },
      { text: 'Your reusable prompt comes with you; the formula starts doing heavy lifting: leveled texts, scaffolds, materials for the range of learners actually in your room.', options: { color: 'C9D4DE' } },
    ], { x: 1.05, y: 4.8, w: 11.3, h: 1.2, fontFace: FONT, fontSize: 17, margin: 0, valign: 'middle' });
    s.addNotes('With a school membership at ai-readyschool.com, completing all eight kits earns the AI-Ready Educator Certificate of Completion; check with your district or state whether it qualifies for local credit.');
  }

  // ============================== SLIDE 28 · FIRST 48 ==============================
  {
    const s = base();
    kicker(s, 'Before Friday becomes a memory');
    title(s, 'Your first 48 hours: three small things');
    const acts = [
      ['~10 min', 'Run your reusable prompt for real', 'On the actual task it was built for; iterate once; use the result'],
      ['~3 min', 'Run the colleague test once', 'Catch the missing context before you hit enter'],
      ['~2 min', 'Post to the staff doc', 'Your template, your name, one line about what it’s for'],
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
      'One prompting technique you’re taking',
      'One task you still want prompt help with',
      'One thing you’ll try in the next 48 hours',
    ], { y: 1.7, h: 2.6, fontSize: 24 });
    s.addText('Your answers steer the PLC follow-ups. Be honest.', {
      x: 0.7, y: 4.7, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 19, italic: true, color: MUTED, margin: 0 });
    s.addNotes('Distribute tickets; collect at the door. They double as the school’s PD documentation.');
  }

  // ============================== SLIDE 30 · CLOSE ==============================
  {
    const s = base(true);
    s.addText('A good prompt is just clear thinking,\nwritten down.', {
      x: 0.7, y: 2.2, w: 12.0, h: 1.8, fontFace: FONT, fontSize: 36, bold: true, color: WHITE, align: 'center', margin: 0, lineSpacingMultiple: 1.2 });
    s.addText('You already do the hard part every day.\nKeep the thinking. Delegate the typing.', {
      x: 0.7, y: 4.3, w: 12.0, h: 1.2, fontFace: FONT, fontSize: 24, bold: true, color: TEAL, align: 'center', margin: 0, lineSpacingMultiple: 1.25 });
    s.addText('Human teaching. Life-changing tools.', {
      x: 0.7, y: 6.4, w: 12.0, h: 0.4, fontFace: FONT, fontSize: 13, color: '9FB2C2', align: 'center', charSpacing: 2, margin: 0 });
    s.addNotes('Thanks, everyone. Collect the exit tickets at the door.');
  }

  const out = path.join(root, 'kits/kit02-tpt/Kit02_PresentationDeck.pptx');
  await p.writeFile({ fileName: out });
  console.log('wrote', out, '·', slideNo, 'slides');
})();
