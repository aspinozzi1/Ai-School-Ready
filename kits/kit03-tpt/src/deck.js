#!/usr/bin/env node
/* Kit 3 Presentation Deck · Build Your First Classroom Tool
   34 slides, locked AI-Ready School brand, speaker notes on every slide.
   Build: node kits/kit03-tpt/src/deck.js → kits/kit03-tpt/Kit03_PresentationDeck.pptx */
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
  p.title = 'Kit 3: Build Your First Classroom Tool';

  // Slides whose main content IS her full chat/game window carry no tracker chip
  // (KIT_STANDARD exemption): the four loop-demo screens (10-13) and the two
  // guided-practice prompt screens (19). Title (1) and credits (34) are exempt too.
  const RIVERA = [null,
    "Her mandate: the state just funded this hour. Her building goes first.",
    "Her math: one purchase, the whole staff, half price after the first seat.",
    "Her honest gap: no formal guidance yet, same as most of the room.",
    "Her one rule, before anything opens: no student data in any prompt, ever.",
    "Her definition: describe what you want, in English, and test what comes back.",
    "Her correction: still her content, her questions, her class. The AI types.",
    "Her loop, named: describe, build, test, change one thing.",
    "Her pick for today: a multiplication-facts review game, her own 4th graders.",
    null, null, null, null,
    "Her honest limit: it renamed a button she never asked it to touch.",
    "Her live mistake: a vague ask got a vague fix. Watch her name what was missing.",
    "Her habit now: save a copy before every prompt. Thirty seconds, no exceptions.",
    "Her rule slide, same as Kit 1: no child's name, score, or record in any prompt.",
    "Her hand up first: one change, together, before anyone works alone.",
    null,
    "Her checkpoint: did the room's one change actually show up? Confirmed.",
    "Her lab, same as yours: the starter file, her questions, two real changes.",
    "Her Track 1: open the file, find the block at the top, replace it.",
    "Her question block: eight to ten entries, the same shape every time.",
    "Her two prompts: one cosmetic, one behavioral, both hers to choose.",
    "Her three minutes: four questions, roughed out, good enough to start.",
    "Her Track 2 path: the one she didn't need, but some in her building will.",
    "Her fix for a blank page: read the error out loud to the AI, try again.",
    "Her fix for a wrong change: undo, narrow the ask, try again.",
    "Her honest tally: she changed a working program. She did not write one.",
    "Her transfer: the pattern moves to spreadsheets, forms, anything next.",
    "Her share-out: three screens up, her game one of them.",
    "Her commitment, said out loud: one game, live with her class, by Friday.",
    "Her first 48 hours: play it with students, fix the first real bug live.",
    null];
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
      s.addText(`Kit 3 · Build Your First Classroom Tool   |   ${slideNo}`, {
        x: W - 4.3, y: H - 0.47, w: 3.85, h: 0.32, fontFace: FONT, fontSize: 9,
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
  function riveraScreen(s, runs, opts = {}) {
    const innerH = opts.innerH || 2.35;
    s.addShape('roundRect', { x: 0.7, y: 1.95, w: 12.0, h: 3.85, rectRadius: 0.1, fill: { color: WHITE }, line: { color: 'DCE3EA', width: 1.5 } });
    s.addShape('roundRect', { x: 0.7, y: 1.95, w: 12.0, h: 0.42, rectRadius: 0.1, fill: { color: NAVY }, line: { color: NAVY } });
    ['E8837A', AMBER, GOOD].forEach((c, i) => s.addShape('ellipse', { x: 0.95 + i * 0.27, y: 2.08, w: 0.16, h: 0.16, fill: { color: c }, line: { color: c } }));
    s.addText(opts.header || 'AI chat tool (any of them) · Ms. Rivera, our running example teacher (a composite, not a real person)', {
      x: 1.95, y: 1.95, w: 10.6, h: 0.42, fontFace: FONT, fontSize: 11, color: '9FB2C2', margin: 0, valign: 'middle' });
    s.addShape('roundRect', { x: 1.7, y: 2.6, w: 10.55, h: innerH, rectRadius: 0.12, fill: { color: PAPER }, line: { color: PAPER } });
    s.addText(runs, { x: 1.95, y: 2.75, w: 10.05, h: innerH - 0.3, fontFace: FONT,
      fontSize: opts.fontSize || 16, margin: 0, valign: 'top',
      lineSpacingMultiple: opts.lineSpacingMultiple || 1.12 });
    if (opts.caption) {
      s.addText(opts.caption, { x: 1.7, y: 2.6 + innerH + 0.1, w: 10.55, h: 0.4,
        fontFace: FONT, fontSize: 13, italic: true, color: MUTED, margin: 0 });
    }
  }
  const FOUR_PARTS = [['ROLE', TEAL], ['TASK', NAVY], ['CONTEXT', 'B07914'], ['FORMAT', GOOD]];
  function legendChips(s, chips) {
    const step = 12.32 / chips.length, w = step - 0.23;
    chips.forEach(([t, c], i) => {
      const x = 0.7 + i * step;
      s.addShape('roundRect', { x, y: 6.05, w, h: 0.5, rectRadius: 0.25, fill: { color: c }, line: { color: c } });
      s.addText(t, { x, y: 6.05, w, h: 0.5, fontFace: FONT, fontSize: 14, bold: true, color: WHITE, align: 'center', valign: 'middle', margin: 0, charSpacing: 2 });
    });
  }
  function beforeLine(s, label, txt, labelColor = BAD) {
    s.addText([
      { text: label + '   ', options: { bold: true, color: labelColor } },
      { text: txt, options: { italic: true, color: MUTED } },
    ], { x: 0.7, y: 1.42, w: 12.0, h: 0.4, fontFace: FONT, fontSize: 16, margin: 0, valign: 'middle' });
  }

  // ============================== SLIDE 1 · TITLE ==============================
  {
    const s = base(true);
    s.addImage({ data: markDarkPng, x: 0.85, y: 0.72, w: 1.15, h: 1.06 });
    s.addText([
      { text: 'AI-Ready', options: { color: TEAL, bold: true } },
      { text: ' School', options: { color: WHITE, bold: true } },
    ], { x: 2.15, y: 0.97, w: 4, h: 0.6, fontFace: FONT, fontSize: 26, margin: 0, valign: 'middle' });
    s.addText('TRACK A · AI FOUNDATIONS · KIT 3 OF 20', {
      x: 0.9, y: 2.75, w: 10, h: 0.4, fontFace: FONT, fontSize: 15, bold: true,
      color: AMBER, charSpacing: 3, margin: 0 });
    s.addText('Build Your First\nClassroom Tool', {
      x: 0.85, y: 3.2, w: 11.8, h: 1.9, fontFace: FONT, fontSize: 44, bold: true,
      color: WHITE, margin: 0, valign: 'middle', lineSpacingMultiple: 1.05 });
    s.addText('A 45–60 minute working session. Every teacher in the room leaves holding a review game they built, on their own device, that still runs with the wifi off.', {
      x: 0.9, y: 5.15, w: 11.2, h: 0.85, fontFace: FONT, fontSize: 17, color: 'C9D4DE', margin: 0, lineSpacingMultiple: 1.2 });
    s.addText('Built by Adam & Katelyn Spinozzi · certified educators · 20+ combined years in the classroom', {
      x: 0.9, y: 6.7, w: 11.5, h: 0.4, fontFace: FONT, fontSize: 12, color: '9FB2C2', margin: 0 });
    s.addNotes('Slide up as people arrive. Start on time. This session assumes Kits 1 and 2: the one hard rule on data and the four-part prompt formula are both in force and will be reused, not retaught.');
  }

  // ============================== SLIDE 2 · THE MANDATE ==============================
  {
    const s = base();
    kicker(s, 'Why this room, this year');
    title(s, 'This is not optional anymore');
    card(s, 0.7, 1.7, 12.0, 2.15, PAPER);
    s.addText('Maryland’s AI Ready Schools Act (SB 720) is now law: every local school system trains its teachers on AI, with the state’s own goal of finishing by July 1, 2027. Virginia and Ohio passed their own 2026 laws the same year.', {
      x: 1.05, y: 1.9, w: 11.3, h: 1.8, fontFace: FONT, fontSize: 19, color: INK, margin: 0, valign: 'middle' });
    card(s, 0.7, 4.05, 12.0, 1.75, 'EAF5F3');
    s.addText('77 bills, 27 states', { x: 1.05, y: 4.25, w: 4.6, h: 1.35, fontFace: FONT, fontSize: 32, bold: true, color: TEAL, margin: 0, valign: 'middle' });
    s.addText('That is how many AI-in-education bills moved through state legislatures in the 2026 session alone. This is not one state. It is a direction.', {
      x: 5.8, y: 4.25, w: 6.6, h: 1.35, fontFace: FONT, fontSize: 16, color: INK, margin: 0, valign: 'middle' });
    s.addNotes('Say: Maryland Senate Bill 720, now Chapter 634 of the 2026 Laws of Maryland, requires statewide teacher AI training through a train-the-trainer model, with the law’s own stated intent of finishing by July 1, 2027. It also requires every local school system to name an AI coordinator and requires the state to publish a rubric districts use to evaluate AI tools before buying them. Virginia’s HB 1186 and SB 394, effective July 1, 2026, direct the state to issue AI guidance that includes professional development for educators. Ohio’s HB 96 requires every public district to adopt a formal AI policy by July 1, 2026 (a policy mandate, not a training one; keep those two separate if asked). The 77-bills-27-states figure is FutureEd’s legislative tracker, not an estimate. Full citations in the References file.');
  }

  // ============================== SLIDE 3 · WHO PAYS ==============================
  {
    const s = base();
    kicker(s, 'And this room does not have to fund it');
    title(s, 'The money is already district money');
    bullets(s, [
      { text: 'Maryland’s law is explicit: teachers must be compensated for this training with time, money, or recertification credits, and may not be charged to attend', options: {} },
      { text: 'A district that owes its staff this training can buy it once, for the whole building, on a single purchase order', options: {} },
      { text: 'One session, every license half price after the first: a 40-person staff is one transaction, not 40', options: { bold: true, color: NAVY } },
    ], { y: 1.65, h: 3.3, fontSize: 21 });
    card(s, 0.7, 5.15, 12.0, 1.05, NAVY);
    s.addText('This kit is written for exactly that purchase order.', {
      x: 1.05, y: 5.15, w: 11.3, h: 1.05, fontFace: FONT, fontSize: 21, bold: true, color: WHITE, margin: 0, valign: 'middle' });
    s.addNotes('Say: this is not a sales pitch, it is context for why a principal or PD coordinator is in the room. If the law in your state is different, the shape is the same everywhere: districts are being told to fund this, and a session that ends in a working tool is the easiest line item to defend at a budget meeting.');
  }

  // ============================== SLIDE 4 · MOST STAFF HAVEN'T GOTTEN THIS ==============================
  {
    const s = base();
    kicker(s, 'And most rooms are starting from zero');
    title(s, 'The gap this hour closes');
    card(s, 0.7, 1.7, 5.75, 3.5, PAPER);
    s.addText('82%', { x: 0.7, y: 2.0, w: 5.75, h: 1.2, fontFace: FONT, fontSize: 58, bold: true, color: TEAL, align: 'center', margin: 0 });
    s.addText('of teachers report receiving no formal guidance on using AI in their work (Gallup & Walton Family Fdn., 2026)', {
      x: 1.0, y: 3.25, w: 5.15, h: 1.75, fontFace: FONT, fontSize: 16, color: INK, align: 'center', margin: 0 });
    card(s, 6.85, 1.7, 5.75, 3.5, PAPER);
    s.addText('20%', { x: 6.85, y: 2.0, w: 5.75, h: 1.2, fontFace: FONT, fontSize: 58, bold: true, color: MUTED, align: 'center', margin: 0 });
    s.addText('report receiving extensive AI training; 42% name a lack of training as their top barrier (IBM/Morning Consult, 2026)', {
      x: 7.15, y: 3.25, w: 5.15, h: 1.75, fontFace: FONT, fontSize: 16, color: INK, align: 'center', margin: 0 });
    s.addText('Today this room stops being part of that number.', {
      x: 0.7, y: 5.55, w: 12.0, h: 0.55, fontFace: FONT, fontSize: 21, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('Two different 2026 surveys, two different angles, same finding: almost nobody has gotten real AI training yet. That is not a knock on this staff; it is the honest starting line. Agenda in one breath: the one rule, what vibe coding is, a live demo of the loop, one change together, then a 30-minute protected lab where everyone builds their own game.');
  }

  // ============================== SLIDE 5 · THE ONE HARD RULE ==============================
  {
    const s = base(true);
    kicker(s, 'Before anything opens', { color: TEAL });
    s.addText('The one hard rule', {
      x: 0.7, y: 1.5, w: 12.0, h: 0.9, fontFace: FONT, fontSize: 40, bold: true, color: WHITE, margin: 0 });
    s.addText('No student’s name, score, grade, IEP status, behavior record, or writing sample ever enters a prompt. Not today, not with your own class, not as an example.', {
      x: 0.7, y: 2.6, w: 12.0, h: 1.5, fontFace: FONT, fontSize: 24, color: 'C9D4DE', margin: 0, lineSpacingMultiple: 1.2 });
    s.addText('Everything you build today is questions, answers, and a title. Nothing about a child.', {
      x: 0.7, y: 4.5, w: 12.0, h: 1.0, fontFace: FONT, fontSize: 20, color: TEAL, bold: true, margin: 0 });
    s.addNotes('Same rule as Kit 1, restated because this session is hands-on and hands-on is where rules get forgotten. Today’s tool has nowhere for a child’s data to even go: a review game holds questions, answers, and a title. Say that out loud before a single laptop opens.');
  }

  // ============================== SLIDE 6 · WHAT VIBE CODING IS ==============================
  {
    const s = base();
    kicker(s, 'The word everyone will ask about');
    title(s, 'What “vibe coding” actually means');
    card(s, 0.7, 1.75, 12.0, 2.0, 'EAF5F3');
    s.addText('You describe what you want, in plain English. The AI writes the code. You test what it made, and you keep describing changes until it does what you need.', {
      x: 1.05, y: 1.95, w: 11.3, h: 1.6, fontFace: FONT, fontSize: 21, bold: true, color: NAVY, margin: 0, valign: 'middle' });
    bullets(s, [
      'No programming class, no syntax to memorize, no semicolons to get right',
      { text: 'You already know how to describe what you want. That is the whole skill.', options: {} },
    ], { y: 4.1, h: 1.6, fontSize: 20 });
    s.addNotes('Name the term because the room already has an opinion about it. Vibe coding, coined by Andrej Karpathy in early 2025, describes building software by describing it in natural language and letting an AI model write and revise the code, with the human testing and directing rather than typing syntax.');
  }

  // ============================== SLIDE 7 · WHAT IT IS NOT ==============================
  {
    const s = base();
    kicker(s, 'Because the honest version sells better than the myth');
    title(s, 'What it is not');
    const items = [
      ['Not magic', 'Every good result traces to a clear, specific description. Vague in, broken out, same as any prompt.'],
      ['Not hands-off', 'You read every line it changes, you test every change, and you decide what ships.'],
      ['Not "from scratch"', 'Today you change a working program by describing what you want. That is the real, transferable skill.'],
    ];
    items.forEach(([h, b], i) => {
      const x = 0.7 + i * 4.12;
      card(s, x, 1.7, 3.85, 3.6, PAPER);
      s.addText(h, { x: x + 0.28, y: 2.0, w: 3.3, h: 0.6, fontFace: FONT, fontSize: 19, bold: true, color: BAD, margin: 0 });
      s.addText(b, { x: x + 0.28, y: 2.65, w: 3.3, h: 2.4, fontFace: FONT, fontSize: 16, color: INK, margin: 0, valign: 'top' });
    });
    s.addText('Claiming you wrote this from nothing would be a lie your buyer, or your class, catches in a minute. Say what really happened. It is the better story anyway.', {
      x: 0.7, y: 5.55, w: 12.0, h: 0.6, fontFace: FONT, fontSize: 16, italic: true, color: MUTED, align: 'center', margin: 0 });
    s.addNotes('This slide protects the session’s credibility. Every product in this series says plainly what the teacher did and did not build; today is no exception. Landing this early means nobody feels misled in the debrief.');
  }

  // ============================== SLIDE 8 · THE LOOP, NAMED ==============================
  {
    const s = base(true);
    kicker(s, 'One loop, four words', { color: AMBER });
    s.addText('Describe. Build. Test. Change one thing.', {
      x: 0.7, y: 1.6, w: 12.0, h: 1.3, fontFace: FONT, fontSize: 38, bold: true, color: WHITE, margin: 0, lineSpacingMultiple: 1.1 });
    const steps = [
      ['Describe', 'Tell the AI what you want, specifically. Your questions, your subject, your rule.'],
      ['Build', 'It writes the code. You watch it happen; you do not have to understand every line.'],
      ['Test', 'Play it yourself before anyone else does. Click every button.'],
      ['Change one thing', 'Describe one change. Test again. One change at a time, every time.'],
    ];
    steps.forEach(([h, b], i) => {
      const x = 0.7 + (i % 2) * 6.15, y = 3.2 + Math.floor(i / 2) * 1.85;
      s.addText([{ text: h + '  ', options: { bold: true, color: TEAL } }, { text: b, options: { color: 'C9D4DE' } }],
        { x, y, w: 5.85, h: 1.65, fontFace: FONT, fontSize: 16, margin: 0, valign: 'top', lineSpacingMultiple: 1.2 });
    });
    s.addNotes('This loop is the entire session compressed to four words, and it is what every step from here forward demonstrates, then lets the room practice, then hands off. Point back to this slide anytime someone asks "what do I actually do."');
  }

  // ============================== SLIDE 9 · LOOP DEMO INTRO ==============================
  {
    const s = base();
    kicker(s, 'Watch it happen once, live, before you try it');
    title(s, 'Ms. Rivera builds one game, start to finish');
    bullets(s, [
      'Her pick for today: a multiplication-facts review game for her own 4th graders',
      'One artifact, the whole way through the loop, on her actual screen',
      { text: 'Nothing she does here is faster than what you will do in the lab. Watch the moves, not the speed.', options: { bold: true, color: NAVY } },
    ], { y: 1.7, h: 3.0, fontSize: 21 });
    s.addNotes('Say: before you build your own, watch one built end to end. Ms. Rivera is our running example teacher across this whole series, a composite and not a real person. Her screen is the thing to copy in the lab.');
  }

  // ============================== SLIDE 10 · LOOP: DESCRIBE ==============================
  {
    const s = base();
    kicker(s, 'The loop, step 1 of 4 · on Ms. Rivera’s screen');
    title(s, 'Describe what you want');
    beforeLine(s, 'HER FIRST INSTINCT', '“Make me a review game.”');
    riveraScreen(s, [
      { text: '“I have a starter review game file. Replace the sample questions with these eight multiplication-facts questions ', options: { color: TEAL, bold: true } },
      { text: '[she pastes her eight questions and answers], and change the title to “Multiplication Match-Up.” ', options: { color: NAVY, bold: true } },
      { text: 'Keep everything else in the file exactly the way it works now.”', options: { color: 'B07914', bold: true } },
    ], { header: 'AI coding tool (any of them) · Ms. Rivera, our running example teacher (a composite, not a real person)', fontSize: 17, lineSpacingMultiple: 1.25, caption: 'Specific beats clever: her own questions, pasted in full, one clear title, one clear boundary (don’t touch what already works).' });
    s.addNotes('Point at the parts: her first instinct was too vague to act on, so she rewrote it with her real content pasted in and a boundary telling the tool what NOT to touch. That boundary line is the single most useful sentence in the whole session; it prevents almost every bad edit.');
  }

  // ============================== SLIDE 11 · LOOP: BUILD ==============================
  {
    const s = base();
    kicker(s, 'The loop, step 2 of 4 · on Ms. Rivera’s screen');
    title(s, 'Build: it writes, she watches');
    beforeLine(s, 'WHAT COMES BACK', 'the file, updated, with her eight questions in the block at the top and her new title in the title bar.', MUTED);
    riveraScreen(s, [
      { text: '“Done. I replaced the QUESTIONS block with your eight multiplication questions and updated the title to “Multiplication Match-Up.” Everything else in the file is unchanged. Want to open it and try it?”', options: { color: INK } },
    ], { header: 'AI coding tool (any of them) · responding to Ms. Rivera', fontSize: 17, lineSpacingMultiple: 1.25, caption: 'She does not need to read the code. She needs to open the file and click around, which is the next step.' });
    s.addNotes('Name what just happened plainly: the tool rewrote a block of the file. It did not invent a new program, and it did not touch the parts she told it to leave alone. That is the whole "build" step, every single time.');
  }

  // ============================== SLIDE 12 · LOOP: TEST ==============================
  {
    const s = base();
    kicker(s, 'The loop, step 3 of 4 · on Ms. Rivera’s screen');
    title(s, 'Test: she plays it herself, first');
    bullets(s, [
      'She double-clicks the file. No install, no account, no wifi required',
      'She answers a question wrong on purpose, to see what happens',
      { text: 'She finds it: the game holds the correct answer on screen and says why, exactly like it should', options: { bold: true, color: GOOD } },
      { text: 'She also finds a problem: one of her answer choices is missing a word', options: { bold: true, color: BAD } },
    ], { y: 1.65, h: 3.6, fontSize: 20 });
    card(s, 0.7, 5.5, 12.0, 0.95, 'EAF5F3');
    s.addText('The rule: you play it before anyone else does. Every time.', {
      x: 1.05, y: 5.5, w: 11.3, h: 0.95, fontFace: FONT, fontSize: 19, bold: true, color: NAVY, margin: 0, valign: 'middle' });
    s.addNotes('This is the step people skip when they are in a hurry, and it is the one that catches real problems before forty students see them. Ms. Rivera’s typo is a normal, boring bug, exactly the kind testing is for.');
  }

  // ============================== SLIDE 13 · LOOP: CHANGE ONE THING ==============================
  {
    const s = base();
    kicker(s, 'The loop, step 4 of 4 · on Ms. Rivera’s screen');
    title(s, 'Change one thing, then test again');
    beforeLine(s, 'HER FIX', '“In the second question, the third answer choice is missing the word ‘of.’ Fix that one answer choice and nothing else.”');
    riveraScreen(s, [
      { text: 'She runs it. The typo is fixed. She plays the whole game again, start to finish, before she calls it done.', options: { color: INK } },
    ], { header: 'Ms. Rivera, verifying', fontSize: 17, lineSpacingMultiple: 1.25, caption: 'One change, described precisely, tested again immediately. That is the loop, closed.' });
    s.addNotes('Say: describe, build, test, change one thing, and then you are back at test. That loop is the entire skill. Everything in the lab is this same loop, run by each of you, on your own topic.');
  }

  // ============================== SLIDE 14 · HONEST LIMITS PT 1 ==============================
  {
    const s = base();
    kicker(s, 'Before you try it yourself');
    title(s, 'What it gets wrong, honestly');
    bullets(s, [
      'It can rename or move something you never asked it to touch',
      'It can "fix" the wrong line if your request was ambiguous',
      { text: 'It cannot tell when it has misunderstood you. It will sound confident either way.', options: { bold: true, color: NAVY } },
    ], { y: 1.65, h: 2.8, fontSize: 21 });
    card(s, 0.7, 4.6, 12.0, 1.5, NAVY);
    s.addText('None of this is a reason not to build. It is the reason you always test before you trust.', {
      x: 1.05, y: 4.6, w: 11.3, h: 1.5, fontFace: FONT, fontSize: 20, bold: true, color: WHITE, margin: 0, valign: 'middle' });
    s.addNotes('Set this up honestly before the live mistake on the next slide, so it lands as expected rather than alarming. The Kit 1 rule rides along here too: you verify before you rely on anything it produced.');
  }

  // ============================== SLIDE 15 · THE AI WRONG ON PURPOSE ==============================
  {
    const s = base();
    kicker(s, 'Watch this go wrong, on purpose, right now');
    title(s, 'A vague ask gets a vague fix');
    beforeLine(s, 'THE VAGUE ASK', '“Make my game better.”');
    card(s, 0.7, 2.0, 12.0, 2.0, 'FBEFED');
    s.addText('What comes back: a generic change to something that was already fine, plus a paragraph of suggestions nobody asked for. Nothing is actually broken, but nothing useful happened either.', {
      x: 1.05, y: 2.2, w: 11.3, h: 1.6, fontFace: FONT, fontSize: 18, italic: true, color: INK, margin: 0, valign: 'middle' });
    card(s, 0.7, 4.25, 12.0, 1.8, 'EAF5F3');
    s.addText('What was missing: a specific thing to change. "Better" is not an instruction. Compare it to slide 13: one sentence, one target, one test.', {
      x: 1.05, y: 4.45, w: 11.3, h: 1.4, fontFace: FONT, fontSize: 19, bold: true, color: NAVY, margin: 0, valign: 'middle' });
    s.addNotes('Do this live, on the projector, with your own account. Type "make my game better" and let the room watch the AI respond usefully to nothing in particular. This is scripted because it is the single most valuable ninety seconds in the session: name out loud exactly what was missing from the request, the same way you would coach a colleague. A vague result is not the tool failing; it is a teaching gift. Use the recovery line from the script if the demo produces something odd rather than merely unhelpful: acknowledge it, undo, and move to the next slide.');
  }

  // ============================== SLIDE 16 · THE RECOVERY HABIT ==============================
  {
    const s = base();
    kicker(s, 'One habit that makes every mistake reversible');
    title(s, 'Save a copy before you prompt');
    card(s, 0.7, 1.75, 12.0, 2.1, 'EAF5F3');
    s.addText('Before any change you are not sure about, save a second copy of the file first. Thirty seconds, no exceptions. If a change goes wrong, you close the broken one and reopen the copy.', {
      x: 1.05, y: 1.95, w: 11.3, h: 1.7, fontFace: FONT, fontSize: 20, bold: true, color: NAVY, margin: 0, valign: 'middle' });
    bullets(s, [
      'The single most likely real failure in today’s lab: a change that rewrites the whole file and loses your questions',
      { text: 'A saved copy turns that from a disaster into a thirty-second reset', options: {} },
    ], { y: 4.15, h: 1.6, fontSize: 19 });
    s.addNotes('Teach this as a step, not a tip, exactly like the script says. It is the answer to the most common thing that goes wrong in this lab, and it costs nothing to do every single time.');
  }

  // ============================== SLIDE 17 · RULE SLIDE ==============================
  {
    const s = base(true);
    kicker(s, 'Restated, because the lab starts next', { color: TEAL });
    s.addText('No child’s data. Ever.', {
      x: 0.7, y: 1.9, w: 12.0, h: 1.1, fontFace: FONT, fontSize: 44, bold: true, color: WHITE, margin: 0 });
    s.addText('Not a name, a score, a grade, an IEP note, a behavior record, or a writing sample. Not in your prompts today, and not in your classroom tomorrow. Including yours.', {
      x: 0.7, y: 3.15, w: 12.0, h: 1.5, fontFace: FONT, fontSize: 24, color: 'C9D4DE', margin: 0, lineSpacingMultiple: 1.25 });
    s.addText('This game holds questions, answers, and a title. There is nowhere for a child’s data to go, and that is by design.', {
      x: 0.7, y: 5.0, w: 12.0, h: 0.9, fontFace: FONT, fontSize: 19, italic: true, color: TEAL, margin: 0 });
    s.addNotes('Last word before hands go on keyboards. This game architecturally cannot hold student data: there is no name field, no roster, no login. Say that out loud; it is a selling point, not a limitation.');
  }

  // ============================== SLIDE 18 · GUIDED PRACTICE SETUP ==============================
  {
    const s = base();
    kicker(s, 'One change, together, before anyone works alone');
    title(s, 'Guided practice: everyone makes the same move');
    bullets(s, [
      'Open your starter file. Everyone, right now.',
      'We are going to make one small change together, on the board, projected',
      { text: 'Then you confirm it worked on your own screen before the lab opens up', options: { bold: true, color: NAVY } },
    ], { y: 1.7, h: 3.0, fontSize: 22 });
    s.addNotes('Devices out, files open, six minutes. This is the last checkpoint before independent work, so do not skip it even if the room is eager to jump ahead. Anyone stuck here gets help now, while the whole room is watching the same screen.');
  }

  // ============================== SLIDE 19 · GUIDED PRACTICE: THE PROMPT ==============================
  {
    const s = base();
    kicker(s, 'Guided practice · the group’s one prompt · do this now');
    title(s, 'Change the destination name');
    riveraScreen(s, [
      { text: '“Change the DESTINATION at the top of the file from ‘Fort Verity’ to [your school mascot or a place from your own subject]. Change nothing else.”', options: { color: NAVY, bold: true } },
    ], { header: 'Type this into your AI tool, exactly as written, with your own name in the brackets', fontSize: 19, lineSpacingMultiple: 1.3, caption: 'A small, safe, visible change: everyone in the room can see whether it worked.' });
    s.addNotes('Read the prompt off the slide, word for word, then give the room three minutes to run it. Circulate. This is deliberately small and low-risk: the point is proving the loop works on their machine, not making a meaningful game yet.');
  }

  // ============================== SLIDE 20 · GUIDED PRACTICE: CONFIRM ==============================
  {
    const s = base();
    kicker(s, 'Checkpoint, before the lab opens');
    title(s, 'Raise a hand if it worked');
    bullets(s, [
      'Open your file. Does the new name show up on the title screen?',
      'If yes: you have the whole loop. Everything in the lab is this, repeated.',
      { text: 'If no: hands up, help is coming to you, not the other way around', options: { bold: true, color: BAD } },
    ], { y: 1.7, h: 3.0, fontSize: 22 });
    s.addNotes('This is the moment to catch anyone who is stuck before the room splits up into the 30-minute lab, where a facilitator cannot debug forty screens at once. Do not move to the lab slide until every hand that went up has been resolved.');
  }

  // ============================== SLIDE 21 · LAB SLIDE ==============================
  {
    const s = base(true);
    kicker(s, 'Hands-on · 30 minutes, protected', { color: AMBER });
    s.addText('The lab: build your game.', {
      x: 0.7, y: 1.35, w: 12.0, h: 1.0, fontFace: FONT, fontSize: 42, bold: true, color: WHITE, margin: 0 });
    const rules = [
      ['Track 1 (most of you)', 'Start from the starter file. Swap in your questions, then make two real changes by describing them.'],
      ['Track 2 (a few of you)', 'Start from nothing, with the first prompt on the handout. Raise a hand; this is the normal path for you.'],
      ['The one rule', 'No student information, ever. Save a copy before any change you are unsure about.'],
    ];
    rules.forEach(([h, b], i) => {
      const y = 2.7 + i * 1.4;
      s.addShape('ellipse', { x: 0.85, y: y + 0.05, w: 0.5, h: 0.5, fill: { color: TEAL }, line: { color: TEAL } });
      s.addText(String(i + 1), { x: 0.85, y: y + 0.05, w: 0.5, h: 0.5, fontFace: FONT, fontSize: 18, bold: true, color: WHITE, align: 'center', valign: 'middle', margin: 0 });
      s.addText([{ text: h + '  ', options: { bold: true, color: AMBER } }, { text: b, options: { color: 'C9D4DE' } }],
        { x: 1.55, y, w: 11.0, h: 1.25, fontFace: FONT, fontSize: 17, margin: 0, valign: 'top', lineSpacingMultiple: 1.2 });
    });
    s.addNotes('This slide, and the six support slides after it, stay up as reference for the whole 30-minute lab; you do not need to advance every minute. Track 1 is the default and is presented as the normal path, never the easier one. Circulate; the support slides answer most questions without you saying a word.');
  }

  // ============================== SLIDE 22 · LAB SUPPORT: TRACK 1 STEPS ==============================
  {
    const s = base();
    kicker(s, 'Lab support · Track 1, step by step');
    title(s, 'Your three moves');
    const steps = [
      ['1', 'Open the starter file', 'Double-click it. It opens in your browser. Nothing to install.'],
      ['2', 'Replace the question block', 'Find the block at the very top of the file. Swap in your eight to ten questions.'],
      ['3', 'Make two changes by describing them', 'One cosmetic (how it looks). One behavioral (how it plays). Test after each one.'],
    ];
    steps.forEach(([n, h, b], i) => {
      const y = 1.65 + i * 1.55;
      card(s, 0.7, y, 12.0, 1.35, PAPER);
      s.addShape('ellipse', { x: 1.0, y: y + 0.42, w: 0.55, h: 0.55, fill: { color: TEAL }, line: { color: TEAL } });
      s.addText(n, { x: 1.0, y: y + 0.42, w: 0.55, h: 0.55, fontFace: FONT, fontSize: 20, bold: true, color: WHITE, align: 'center', valign: 'middle', margin: 0 });
      s.addText(h, { x: 1.8, y: y + 0.16, w: 10.6, h: 0.5, fontFace: FONT, fontSize: 19, bold: true, color: NAVY, margin: 0 });
      s.addText(b, { x: 1.8, y: y + 0.68, w: 10.6, h: 0.6, fontFace: FONT, fontSize: 16, color: INK, margin: 0 });
    });
    s.addNotes('This is a leave-up reference slide. Point new arrivals or lost participants back to it rather than re-explaining verbally each time.');
  }

  // ============================== SLIDE 23 · LAB SUPPORT: THE QUESTION BLOCK ==============================
  {
    const s = base();
    kicker(s, 'Lab support · where your content lives');
    title(s, 'The question block, up close');
    card(s, 0.7, 1.7, 12.0, 3.5, NAVY);
    s.addText([
      { text: 'const QUESTIONS = [\n', options: { color: '9FB2C2' } },
      { text: '  { q: ', options: { color: 'C9D4DE' } }, { text: 'your question here', options: { color: AMBER } }, { text: ',\n', options: { color: 'C9D4DE' } },
      { text: '    a: [', options: { color: 'C9D4DE' } }, { text: 'four answer choices', options: { color: AMBER } }, { text: '], ok: 0,\n', options: { color: 'C9D4DE' } },
      { text: '    idea: ', options: { color: 'C9D4DE' } }, { text: 'the concept it tests', options: { color: AMBER } }, { text: ', level: 1,\n', options: { color: 'C9D4DE' } },
      { text: '    why: ', options: { color: 'C9D4DE' } }, { text: 'one line saying why it is right', options: { color: AMBER } }, { text: ' },\n', options: { color: 'C9D4DE' } },
      { text: '  … eight to ten of these', options: { color: '9FB2C2', italic: true } },
    ], { x: 1.05, y: 1.95, w: 11.3, h: 3.0, fontFace: 'Courier New', fontSize: 15, margin: 0, valign: 'top', lineSpacingMultiple: 1.3 });
    s.addText('Same shape, every entry. Type your own questions directly, or describe them to the AI and let it fill the shape in for you.', {
      x: 0.7, y: 5.4, w: 12.0, h: 0.6, fontFace: FONT, fontSize: 16, italic: true, color: MUTED, align: 'center', margin: 0 });
    s.addNotes('This is the exact block from the starter file, shown large so nobody has to hunt for it. The "idea" field is what lets the game bring a missed question back later; the "why" field is what it shows after a wrong answer. Both matter and both are one line each.');
  }

  // ============================== SLIDE 24 · LAB SUPPORT: TWO PROMPTS ==============================
  {
    const s = base();
    kicker(s, 'Lab support · your two required changes');
    title(s, 'One cosmetic. One behavioral.');
    card(s, 0.7, 1.7, 5.85, 3.6, 'EAF5F3');
    s.addText('COSMETIC', { x: 1.0, y: 1.95, w: 5.25, h: 0.4, fontFace: FONT, fontSize: 16, bold: true, color: TEAL, margin: 0 });
    s.addText('“Change the color palette to my school colors, [color] and [color]. Keep everything else the same.”', {
      x: 1.0, y: 2.4, w: 5.25, h: 2.7, fontFace: FONT, fontSize: 17, italic: true, color: INK, margin: 0, valign: 'top', lineSpacingMultiple: 1.25 });
    card(s, 6.85, 1.7, 5.85, 3.6, 'EAF5F3');
    s.addText('BEHAVIORAL', { x: 7.15, y: 1.95, w: 5.25, h: 0.4, fontFace: FONT, fontSize: 16, bold: true, color: TEAL, margin: 0 });
    s.addText('“Give the player one more road to choose from at every fork. Keep the rest of the game exactly the way it works now.”', {
      x: 7.15, y: 2.4, w: 5.25, h: 2.7, fontFace: FONT, fontSize: 17, italic: true, color: INK, margin: 0, valign: 'top', lineSpacingMultiple: 1.25 });
    s.addText('Test after every change, not after both. One at a time, same as the loop.', {
      x: 0.7, y: 5.55, w: 12.0, h: 0.55, fontFace: FONT, fontSize: 17, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('These are starting templates, not the only options; the handout lists three or four of each. The boundary sentence, "keep everything else the same," is doing real work in both examples; say that out loud if you have a spare moment while circulating.');
  }

  // ============================== SLIDE 25 · LAB SUPPORT: THE 3-MINUTE WRITING BEAT ==============================
  {
    const s = base();
    kicker(s, 'Lab support · came empty-handed? start here');
    title(s, 'Three minutes: write four questions now');
    bullets(s, [
      'Pick one thing your students need to know cold, right now, this unit',
      'Write four questions on it. Rough is fine. You will refine them while the game runs.',
      { text: 'That is enough to start Track 1 with real content instead of the sample set', options: { bold: true, color: NAVY } },
    ], { y: 1.7, h: 3.0, fontSize: 21 });
    card(s, 0.7, 5.0, 12.0, 1.05, 'EAF5F3');
    s.addText('The starter file already ships with a working sample game. Nobody is stuck. This just gets you to your own content faster.', {
      x: 1.05, y: 5.0, w: 11.3, h: 1.05, fontFace: FONT, fontSize: 15.5, italic: true, color: INK, margin: 0, valign: 'middle' });
    s.addNotes('Call this out by name at lab start, not as a footnote: "if you did not bring questions, that is normal, take three minutes right now." The prep guide asks for eight to ten in advance; expect a third of the room to arrive without them.');
  }

  // ============================== SLIDE 26 · LAB SUPPORT: TRACK 2 ==============================
  {
    const s = base();
    kicker(s, 'Lab support · Track 2, starting from nothing');
    title(s, 'For the few who want to build from zero');
    card(s, 0.7, 1.75, 12.0, 2.3, PAPER);
    s.addText('“Build me a browser-based review game in one HTML file, no installs, that works offline. It should track which questions I get wrong and bring them back later in the same game, never let one student’s wrong answer end the game for the group, and never show a public list of student names or scores.”', {
      x: 1.05, y: 1.95, w: 11.3, h: 1.9, fontFace: FONT, fontSize: 16.5, italic: true, color: INK, margin: 0, valign: 'middle' });
    bullets(s, [
      'This is the full first prompt from the handout, ready to paste',
      { text: 'The facilitator does not hover here. Ask for help when you want it.', options: {} },
    ], { y: 4.3, h: 1.4, fontSize: 18 });
    s.addNotes('One page in the handout carries this in full. Three or four people in most rooms will want this path; let them take it and check in rather than steering them back to Track 1.');
  }

  // ============================== SLIDE 27 · LAB SUPPORT: WHEN IT BREAKS, PART 1 ==============================
  {
    const s = base();
    kicker(s, 'Lab support · when it breaks (1 of 2)');
    title(s, '"It gave me a blank page."');
    card(s, 0.7, 1.8, 12.0, 1.7, 'FBEFED');
    s.addText('Almost always a small typo in the code the AI just wrote.', {
      x: 1.05, y: 2.0, w: 11.3, h: 1.3, fontFace: FONT, fontSize: 20, bold: true, color: BAD, margin: 0, valign: 'middle' });
    card(s, 0.7, 3.7, 12.0, 1.9, 'EAF5F3');
    s.addText('The fix: copy the exact error message from the browser (or just say "it’s a blank page, nothing shows up") and paste it back to the AI. Say "fix this." It almost always can.', {
      x: 1.05, y: 3.9, w: 11.3, h: 1.5, fontFace: FONT, fontSize: 19, bold: true, color: NAVY, margin: 0, valign: 'middle' });
    s.addText('Under thirty seconds, every time this has happened in testing.', {
      x: 0.7, y: 5.85, w: 12.0, h: 0.45, fontFace: FONT, fontSize: 15, italic: true, color: MUTED, align: 'center', margin: 0 });
    s.addNotes('Say this recovery line out loud the first time it happens in the room, then let the next person self-serve from the slide. A blank page is not a crisis; it is the single most common, single most fixable thing that happens in this lab.');
  }

  // ============================== SLIDE 28 · LAB SUPPORT: WHEN IT BREAKS, PART 2 ==============================
  {
    const s = base();
    kicker(s, 'Lab support · when it breaks (2 of 2)');
    title(s, '"It changed the wrong thing." / "My questions disappeared."');
    card(s, 0.7, 1.85, 12.0, 1.7, 'FBEFED');
    s.addText('The AI rewrote more of the file than you asked for. This is the single most likely real failure in this lab.', {
      x: 1.05, y: 2.05, w: 11.3, h: 1.3, fontFace: FONT, fontSize: 18.5, bold: true, color: BAD, margin: 0, valign: 'middle' });
    card(s, 0.7, 3.75, 12.0, 1.9, 'EAF5F3');
    s.addText('The fix: close the file without saving, reopen your saved copy from before the change (slide 16), and try again with a narrower request: "change only the title text, nothing else in the file."', {
      x: 1.05, y: 3.95, w: 11.3, h: 1.5, fontFace: FONT, fontSize: 17.5, bold: true, color: NAVY, margin: 0, valign: 'middle' });
    s.addText('This is exactly why you saved a copy first. Nothing here is ever unrecoverable.', {
      x: 0.7, y: 5.9, w: 12.0, h: 0.45, fontFace: FONT, fontSize: 15, italic: true, color: MUTED, align: 'center', margin: 0 });
    s.addNotes('This is the failure the whole "save a copy first" habit exists for. If someone did not save a copy, they re-paste their original questions into the current file rather than starting over; either way, stay calm and visible about it, since a live recovery is more reassuring than a clean run.');
  }

  // ============================== SLIDE 29 · WHAT YOU BUILT ==============================
  {
    const s = base();
    kicker(s, 'Thirty minutes ago this file was a stranger’s');
    title(s, 'What you actually built, honestly');
    card(s, 0.7, 1.75, 12.0, 3.4, PAPER);
    s.addText([
      { text: 'You changed a working program by describing what you wanted, tested every change yourself, and ended with your own questions in a game your students can play with the wifi off.\n\n', options: { bold: true, color: NAVY } },
      { text: 'You did not write this program from a blank file, and this kit never claimed you would. What you own now is the loop: describe, build, test, change one thing. That loop works on this game, and it works on the next tool you build.', options: { color: INK } },
    ], { x: 1.05, y: 2.0, w: 11.2, h: 2.9, fontFace: FONT, fontSize: 19, margin: 0, valign: 'middle' });
    s.addNotes('Say this plainly rather than letting the room infer it. Honesty about what happened is worth more here than a bigger claim would be, and it matches what the deck has said since slide 7.');
  }

  // ============================== SLIDE 30 · THE PATTERN TRANSFERS ==============================
  {
    const s = base();
    kicker(s, 'One file today. A habit from now on.');
    title(s, 'Where this pattern goes next');
    bullets(s, [
      'A seating chart. A sign-out log. A reading tracker. Any small tool your room needs',
      'The loop does not change: describe, build, test, change one thing',
      { text: 'Our full build-along sessions in the store teach the pattern on a new tool each time, start to finish', options: { bold: true, color: NAVY } },
    ], { y: 1.7, h: 3.0, fontSize: 21 });
    s.addNotes('This is the honest upsell, stated once: the pattern taught here is the whole product of the Lane A build-along sessions already in the store, applied to a new classroom tool each time. Never promise a specific future session by number or date.');
  }

  // ============================== SLIDE 31 · SHARE-OUT ==============================
  {
    const s = base();
    kicker(s, 'Share-out · 2–3 screens, projected');
    title(s, 'Show us what you made');
    bullets(s, [
      'Who wants their game on the big screen?',
      'What was your one behavioral change, and what did it do?',
      { text: 'Anyone hit the blank-page fix or the wrong-change fix for real? Tell us.', options: { bold: true, color: NAVY } },
    ], { y: 1.7, h: 3.0, fontSize: 22 });
    s.addNotes('Two to three volunteers, a minute each, projected from their own laptop if the room allows it. A real recovery story lands better here than a clean success story; ask for one directly if nobody offers.');
  }

  // ============================== SLIDE 32 · COMMITMENT ==============================
  {
    const s = base(true);
    kicker(s, 'Kits 1 and 2 gave us three; today adds a fourth', { color: AMBER });
    s.addText('Commitment #4', {
      x: 0.7, y: 1.6, w: 12.0, h: 0.8, fontFace: FONT, fontSize: 36, bold: true, color: WHITE, margin: 0 });
    s.addText('This game gets played with real students by Friday, not filed away.', {
      x: 0.7, y: 2.7, w: 12.0, h: 1.6, fontFace: FONT, fontSize: 28, bold: true, color: TEAL, margin: 0, lineSpacingMultiple: 1.2 });
    s.addText('Can I get a nod on that?', {
      x: 0.7, y: 5.3, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 20, italic: true, color: '9FB2C2', margin: 0 });
    s.addNotes('Ask for the visible nod. A tool that never gets used in the room was a demo, not a commitment, and this session is built to avoid that outcome.');
  }

  // ============================== SLIDE 33 · FIRST 48 + EXIT TICKET ==============================
  {
    const s = base();
    kicker(s, 'Two minutes');
    title(s, 'First 48 hours, then the exit ticket', { w: 8.7 });
    const acts = [
      ['~10 min', 'Play your game with one real class', 'Or with a colleague standing in for your students, if timing does not line up'],
      ['~5 min', 'Fix the first real bug that shows up', 'Using slide 27 or 28’s recovery line. There will be one; that is normal.'],
      ['~2 min', 'Complete the exit ticket', 'One technique you are taking, one thing you will try, doubling as this hour’s PD documentation'],
    ];
    acts.forEach(([t, h, b], i) => {
      const y = 1.55 + i * 1.5;
      card(s, 0.7, y, 12.0, 1.3, PAPER);
      s.addText(t, { x: 1.0, y: y + 0.4, w: 1.5, h: 0.5, fontFace: FONT, fontSize: 16, bold: true, color: TEAL, margin: 0 });
      s.addText(h, { x: 2.6, y: y + 0.14, w: 9.9, h: 0.5, fontFace: FONT, fontSize: 19, bold: true, color: NAVY, margin: 0 });
      s.addText(b, { x: 2.6, y: y + 0.64, w: 9.9, h: 0.6, fontFace: FONT, fontSize: 16, color: INK, margin: 0 });
    });
    s.addNotes('Hold up the First 48 Hours sheet. Distribute exit tickets and collect at the door; check with your district or state whether this hour qualifies for local PD credit.');
  }

  // ============================== SLIDE 34 · CREDITS & CLOSE ==============================
  {
    const s = base(true);
    s.addText('You just described software into existence.\nThat is not a small thing.', {
      x: 0.7, y: 2.0, w: 12.0, h: 1.8, fontFace: FONT, fontSize: 34, bold: true, color: WHITE, align: 'center', margin: 0, lineSpacingMultiple: 1.2 });
    s.addText('The pattern is yours now. Use it on the next thing your room needs.', {
      x: 0.7, y: 4.1, w: 12.0, h: 1.0, fontFace: FONT, fontSize: 22, bold: true, color: TEAL, align: 'center', margin: 0, lineSpacingMultiple: 1.25 });
    s.addText('Built by Adam & Katelyn Spinozzi · certified educators · sources in the References file', {
      x: 0.7, y: 5.7, w: 12.0, h: 0.4, fontFace: FONT, fontSize: 13, color: '9FB2C2', align: 'center', margin: 0 });
    s.addText('Human teaching. Life-changing tools.', {
      x: 0.7, y: 6.5, w: 12.0, h: 0.4, fontFace: FONT, fontSize: 13, color: '9FB2C2', align: 'center', charSpacing: 2, margin: 0 });
    s.addNotes('Thanks, everyone. Collect the exit tickets at the door.');
  }

  const out = path.join(root, 'kits/kit03-tpt/Kit03_PresentationDeck.pptx');
  await p.writeFile({ fileName: out });
  console.log('wrote', out, '·', slideNo, 'slides');
})();
