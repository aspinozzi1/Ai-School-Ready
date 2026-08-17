#!/usr/bin/env node
/* Kit 5 Presentation Deck · AI & Academic Integrity: Ask for One Thing AI Can't Hand In
   30 slides, locked AI-Ready School brand, speaker notes on every slide.
   Rebuilt 2026-08-17 from kits/kit05/REBUILD_SPEC.md: one move, one exemplar,
   one protected lab that ends by showing Ms. Rivera's finished assignment sheet.
   Build: node kits/kit05/src/deck.js  → kits/kit05/Kit05_PresentationDeck.pptx */
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
  p.title = 'Kit 5: AI & Academic Integrity: Ask for One Thing AI Can\'t Hand In';

  // Ms. Rivera's tracker chip, one state per slide. Mirrored line for line by the
  // facilitator script's .rivera-line blocks. null = chip suppressed (title slide,
  // closing slide, and the two slides where her chat window IS the content).
  const RIVERA = [null,
    "Her class, on screen: two paragraphs, one bot. She can't tell either.",
    "Her honest answer: she picked wrong. So did most of the room.",
    "Her goal: one assignment leaves today asking for something AI can't hand in.",
    "Her note on detectors: the maker shut its own down. 26% caught.",
    "Her equity read: the misfires land on her multilingual writers.",
    "Her blood pressure, lowered: the rate didn't move. Three schools, self-report.",
    "Her diagnosis: her essay asks for a product. AI is the fastest way to a product.",
    "Her one move, on a sticky note: ask for one thing AI can't hand in.",
    "Her pick of the three places: from this room. Tuesday's debate.",
    "Her assignment as it stands: “Should our school day start later?” Nothing AI can't do.",
    "Her change: one sentence added, one line added. Same essay.",
    null,
    "Her turn to watch: the room adds the one thing to three generic prompts.",
    "Her check: all three answers came from one of the three places.",
    "Her lab pick, one assignment start to finish: next week's persuasive essay.",
    "Step 1 · on her desk: the persuasive essay, five paragraphs, due Friday.",
    "Step 2 · what it's for: build an argument from evidence, answer the strongest objection.",
    "Step 3 · her one thing: two claims from Tuesday's debate, and who made them.",
    "Step 4 · her label: AI-assisted; the debate claims have to be yours.",
    null,
    "Her finished sheet: one sentence longer than it was on Monday.",
    "Her share-out: the sentence she added, read aloud.",
    "Her opener, rehearsed: “walk me through how you made this.”",
    "Her red line, adopted: no accusation on a detector score alone.",
    "Her inventory: one assignment, one sentence, one label. Printed.",
    "Her honesty: some will still hand in AI work. This one got harder to fake.",
    "Her commitments: ask for one thing, label every assignment, never score-only.",
    "Her 48 hours: hand out the sheet, read the label aloud, pick assignment two.",
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
      s.addText(`Kit 5 · Academic Integrity   |   ${slideNo}`, {
        x: W - 3.6, y: H - 0.47, w: 3.15, h: 0.32, fontFace: FONT, fontSize: 9,
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
  function strip(s, y, runs, fill = NAVY, opts = {}) {
    card(s, 0.7, y, 12.0, 0.72, fill);
    s.addText(runs, Object.assign({ x: 1.05, y, w: 11.3, h: 0.72, fontFace: FONT,
      fontSize: 17, align: 'center', margin: 0, valign: 'middle' }, opts));
  }
  // The exemplar layout the owner approved (Kit 3 slides 23-24, Kit 4 slide 9):
  // a full-width generic chat window, navy title bar with three dots, a paper
  // inner card holding Ms. Rivera's actual prompt colour-coded by part, legend
  // chips across the bottom. Copied verbatim from kits/kit03/src/deck.js.
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
  // 0.25 margin on each side. Same geometry as the approved kit03 slide 23.
  function chatPaper(s, y, h, inset = 1.0) {
    s.addShape('roundRect', { x: 0.7 + inset, y: y + 0.65, w: 12.25 - (0.7 + inset), h: h - 0.9, rectRadius: 0.12, fill: { color: PAPER }, line: { color: PAPER } });
  }
  const PART_CHIPS = [['ROLE', TEAL], ['TASK', NAVY], ['CONTEXT', 'B07914'], ['FORMAT', GOOD]];
  function legend(s, y, chips) {
    chips.forEach(([t, c], i) => {
      const x = 0.7 + i * 3.08;
      s.addShape('roundRect', { x, y, w: 2.85, h: 0.5, rectRadius: 0.25, fill: { color: c }, line: { color: c } });
      s.addText(t, { x, y, w: 2.85, h: 0.5, fontFace: FONT, fontSize: 14, bold: true, color: WHITE, align: 'center', valign: 'middle', margin: 0, charSpacing: 2 });
    });
  }

  // The two demonstration paragraphs, written for this session. Neither is real
  // student work; there is no student PII anywhere in this kit.
  const PARA_HUMAN = 'Our bus comes at 6:35 and school starts at 7:20. By third period I am not learning, I am just awake. People say go to bed earlier, but my brain does not shut off at nine. If we started at 8:30 I would still get all seven classes. I would just be in them.';
  const PARA_AI = 'Starting the school day later would provide numerous benefits for students. Research consistently demonstrates that adolescents require additional sleep to perform at their best. A later start time would improve academic achievement, support mental health, and reduce tardiness. While some argue this would disrupt athletics and family schedules, these concerns can be addressed through careful planning. Ultimately, student well-being should guide this important decision.';
  const HER_TASK = 'Write a five-paragraph persuasive essay: an introduction with your claim, three body paragraphs with evidence, and a conclusion.';
  const HER_PURPOSE = 'Whether my students can build an argument from evidence and answer the strongest objection to it.';
  const HER_ONE_THING = '“Use at least two claims from our Tuesday debate and name who made them. Then explain why the strongest counter-argument in the room did not change your mind.”';
  const HER_LABEL = '“AI-assisted. Brainstorming and feedback are fine. The debate claims and your response to them have to be yours.”';

  // ============================== SLIDE 1 · TITLE ==============================
  {
    const s = base(true);
    s.addImage({ data: markDarkPng, x: 0.85, y: 0.8, w: 1.15, h: 1.06 });
    s.addText([
      { text: 'AI-Ready', options: { color: TEAL, bold: true } },
      { text: ' School', options: { color: WHITE, bold: true } },
    ], { x: 2.15, y: 1.05, w: 4, h: 0.6, fontFace: FONT, fontSize: 26, margin: 0, valign: 'middle' });
    s.addText('TRACK A · AI FOUNDATIONS · KIT 5 OF 20', {
      x: 0.9, y: 3.0, w: 9, h: 0.4, fontFace: FONT, fontSize: 15, bold: true,
      color: AMBER, charSpacing: 3, margin: 0 });
    s.addText('AI & Academic Integrity:\nAsk for One Thing AI Can’t Hand In', {
      x: 0.85, y: 3.35, w: 11.8, h: 2.0, fontFace: FONT, fontSize: 40, bold: true,
      color: WHITE, margin: 0, valign: 'middle', lineSpacingMultiple: 1.05 });
    s.addText('A 45–60 minute working session. You leave holding one real assignment that asks for something a chatbot cannot produce.', {
      x: 0.9, y: 5.45, w: 11.2, h: 0.5, fontFace: FONT, fontSize: 18, color: 'C9D4DE', margin: 0 });
    s.addText('Built by Adam & Katelyn Spinozzi · certified educators · 20+ combined years in the classroom', {
      x: 0.9, y: 6.6, w: 11.5, h: 0.4, fontFace: FONT, fontSize: 12, color: '9FB2C2', margin: 0 });
    s.addNotes('Say: welcome back. This is the session every faculty asks for in the hallway. The answer today is one sentence long, and you will make the change to a real assignment before you leave. Slide up as people arrive; start on time. The founders’ note at the front of the script is an optional moment before slide 2 if you want to share their perspective.');
  }

  // ============================== SLIDE 2 · WHICH ONE DID A BOT WRITE ==============================
  {
    const s = base();
    kicker(s, 'Ninety seconds. No statistics yet.');
    title(s, 'Which one did a bot write?');
    card(s, 0.7, 1.45, 5.9, 4.35, PAPER);
    s.addText('PARAGRAPH A', { x: 1.0, y: 1.62, w: 5.3, h: 0.32, fontFace: FONT, fontSize: 13, bold: true, color: NAVY, charSpacing: 2, margin: 0, valign: 'middle' });
    s.addText(PARA_HUMAN, { x: 1.0, y: 2.02, w: 5.3, h: 3.6, fontFace: FONT, fontSize: 16, color: INK, margin: 0, valign: 'top', lineSpacingMultiple: 1.16 });
    card(s, 6.85, 1.45, 5.9, 4.35, PAPER);
    s.addText('PARAGRAPH B', { x: 7.15, y: 1.62, w: 5.3, h: 0.32, fontFace: FONT, fontSize: 13, bold: true, color: NAVY, charSpacing: 2, margin: 0, valign: 'middle' });
    s.addText(PARA_AI, { x: 7.15, y: 2.02, w: 5.3, h: 3.6, fontFace: FONT, fontSize: 16, color: INK, margin: 0, valign: 'top', lineSpacingMultiple: 1.16 });
    strip(s, 5.95, [
      { text: 'Same prompt: should our school day start later.  ', options: { color: 'C9D4DE' } },
      { text: 'One is a seventh grader. One took four seconds. Hands up for A. Now B.', options: { bold: true, color: WHITE } },
    ]);
    s.addNotes('Say: two paragraphs, same prompt. One was written by a seventh grader, one by a chatbot in about four seconds. Read both aloud slowly, then take a show of hands for A and for B and count out loud. Do not comment on the split yet, and do not reveal. Ask what people used to decide; most rooms say too smooth, too balanced, no specifics. Both paragraphs were written for this session; neither is real student work.');
  }

  // ============================== SLIDE 3 · THE REVEAL ==============================
  {
    const s = base();
    kicker(s, 'The answer, and the part that matters more');
    title(s, 'B was the bot');
    card(s, 0.7, 1.45, 5.9, 4.15, 'EAF5F3');
    s.addText('WHAT GAVE IT AWAY, WHEN IT DID', { x: 1.0, y: 1.62, w: 5.3, h: 0.32, fontFace: FONT, fontSize: 13, bold: true, color: TEAL, charSpacing: 1.6, margin: 0, valign: 'middle' });
    s.addText([
      { text: 'Smooth all the way through.\n', options: { color: INK } },
      { text: 'Every objection raised and dismissed in one polite sentence.\n', options: { color: INK } },
      { text: 'Not one specific: no bus time, no third period, no name of anything.\n\n', options: { color: INK } },
      { text: 'Paragraph A has a 6:35 bus in it. That is what a person sounds like.', options: { bold: true, color: NAVY } },
    ], { x: 1.0, y: 2.05, w: 5.3, h: 3.35, fontFace: FONT, fontSize: 16, margin: 0, valign: 'top', lineSpacingMultiple: 1.16 });
    card(s, 6.85, 1.45, 5.9, 4.15, PAPER);
    s.addText('WHY BEING RIGHT DOES NOT HELP YOU', { x: 7.15, y: 1.62, w: 5.3, h: 0.32, fontFace: FONT, fontSize: 13, bold: true, color: MUTED, charSpacing: 1.6, margin: 0, valign: 'middle' });
    s.addText([
      { text: 'You just spent ninety seconds on two paragraphs, with no grades attached and nothing else on your desk.\n\n', options: { color: INK } },
      { text: 'Now do that a hundred and fifty times a week, at 9:40 at night, on writing by students you are still getting to know.', options: { color: INK } },
    ], { x: 7.15, y: 2.05, w: 5.3, h: 3.35, fontFace: FONT, fontSize: 16, margin: 0, valign: 'top', lineSpacingMultiple: 1.16 });
    strip(s, 5.85, [
      { text: 'Reading harder is not the plan. ', options: { bold: true, color: TEAL } },
      { text: 'Neither is buying software to do the reading, which is next.', options: { color: WHITE } },
    ]);
    s.addNotes('Say: B is the bot. If you picked it, good instinct, and hold on to it, because the point is not who was right. Ninety seconds on two paragraphs with nothing else on your desk is not the job; a hundred and fifty pieces a week at 9:40 at night is the job. Do not let the room turn this into a contest about who spotted it. Move straight into the detector evidence.');
  }

  // ============================== SLIDE 4 · AGENDA ==============================
  {
    const s = base();
    kicker(s, 'The hour ahead');
    title(s, 'Agenda and one promise');
    const rows = [
      ['0:06', 'Why catching it fails, and what the evidence says'],
      ['0:14', 'The one move, and the three places to find it'],
      ['0:22', 'Practice out loud on three real assignments'],
      ['0:27', 'Lab: rebuild an assignment you are about to give'],
      ['0:49', 'When it still seems off, and the line that does not move'],
    ];
    rows.forEach(([t, txt], i) => {
      const y = 1.6 + i * 0.8;
      s.addText(t, { x: 0.9, y, w: 1.1, h: 0.6, fontFace: FONT, fontSize: 20, bold: true, color: TEAL, margin: 0, valign: 'middle' });
      s.addText(txt, { x: 2.1, y, w: 7.4, h: 0.6, fontFace: FONT, fontSize: 19, color: INK, margin: 0, valign: 'middle' });
    });
    card(s, 9.9, 2.1, 2.85, 3.2, NAVY);
    s.addText('One promise', { x: 10.15, y: 2.35, w: 2.35, h: 0.4, fontFace: FONT, fontSize: 16, bold: true, color: AMBER, margin: 0 });
    s.addText('You leave holding one assignment sheet that asks for something a chatbot cannot hand in. Ready to photocopy.', {
      x: 10.15, y: 2.8, w: 2.35, h: 2.3, fontFace: FONT, fontSize: 14, color: WHITE, margin: 0, valign: 'top' });
    s.addNotes('Say: ten minutes on why the two obvious answers fail, then the move itself, which takes five minutes to teach because it is one sentence, then practice, then fifteen protected minutes rebuilding a real assignment. Keep this quick. Say the promise out loud: you leave holding a sheet you can photocopy.');
  }

  // ============================== SLIDE 5 · OPENAI SHUT ITS OWN DETECTOR DOWN ==============================
  {
    const s = base();
    kicker(s, 'The company that built the chatbot built the detector');
    title(s, 'Then it shut its own detector down');
    card(s, 0.7, 1.75, 5.9, 3.7, PAPER);
    s.addText('AI TEXT IT CAUGHT', { x: 0.7, y: 1.95, w: 5.9, h: 0.35, fontFace: FONT, fontSize: 13, bold: true, color: MUTED, align: 'center', charSpacing: 2, margin: 0 });
    s.addText('26%', { x: 0.7, y: 2.3, w: 5.9, h: 1.05, fontFace: FONT, fontSize: 52, bold: true, color: BAD, align: 'center', margin: 0 });
    s.addText('of AI-written text was correctly flagged as likely AI-written. About three-quarters of it walked straight past. (OpenAI’s own published evaluation, 2023)', {
      x: 1.05, y: 3.4, w: 5.2, h: 1.9, fontFace: FONT, fontSize: 16, color: INK, align: 'center', margin: 0 });
    card(s, 6.85, 1.75, 5.9, 3.7, PAPER);
    s.addText('HUMAN WRITING IT ACCUSED', { x: 6.85, y: 1.95, w: 5.9, h: 0.35, fontFace: FONT, fontSize: 13, bold: true, color: MUTED, align: 'center', charSpacing: 2, margin: 0 });
    s.addText('9%', { x: 6.85, y: 2.3, w: 5.9, h: 1.05, fontFace: FONT, fontSize: 52, bold: true, color: BAD, align: 'center', margin: 0 });
    s.addText('of human writing was labeled AI. Across two hundred essays, that is eighteen students accused of something they did not do. (Same evaluation)', {
      x: 7.2, y: 3.4, w: 5.2, h: 1.9, fontFace: FONT, fontSize: 16, color: INK, align: 'center', margin: 0 });
    strip(s, 5.7, [
      { text: 'OpenAI withdrew the classifier after about six months, citing ', options: { color: WHITE } },
      { text: '“its low rate of accuracy.”', options: { bold: true, color: TEAL } },
    ]);
    s.addNotes('Say: in early 2023 OpenAI released a classifier meant to tell you whether text was written by AI, and six months later took it down, citing its low rate of accuracy. Its own numbers: 26% of AI text caught, 9% of human writing falsely flagged. Land the second number with the arithmetic: two hundred essays means eighteen students accused wrongly. The company with the most to gain from a working detector pulled it.');
  }

  // ============================== SLIDE 6 · IT DOES NOT MISFIRE AT RANDOM ==============================
  {
    const s = base();
    kicker(s, 'Seven commercial detectors, one Stanford study');
    title(s, 'And it does not misfire at random');
    card(s, 0.7, 1.75, 5.9, 3.7, PAPER);
    s.addText('91 TOEFL ESSAYS, ALL HUMAN-WRITTEN', { x: 0.7, y: 1.95, w: 5.9, h: 0.35, fontFace: FONT, fontSize: 13, bold: true, color: MUTED, align: 'center', charSpacing: 1.4, margin: 0 });
    s.addText('61.3%', { x: 0.7, y: 2.3, w: 5.9, h: 1.05, fontFace: FONT, fontSize: 52, bold: true, color: BAD, align: 'center', margin: 0 });
    s.addText('average false-positive rate. More than half of these real essays by non-native English writers were called AI-generated. (Liang et al., Patterns, 2023)', {
      x: 1.05, y: 3.4, w: 5.2, h: 1.9, fontFace: FONT, fontSize: 16, color: INK, align: 'center', margin: 0 });
    card(s, 6.85, 1.75, 5.9, 3.7, 'EAF5F3');
    s.addText('88 US EIGHTH-GRADE ESSAYS', { x: 6.85, y: 1.95, w: 5.9, h: 0.35, fontFace: FONT, fontSize: 13, bold: true, color: TEAL, align: 'center', charSpacing: 1.4, margin: 0 });
    s.addText('Near-perfect', { x: 6.85, y: 2.3, w: 5.9, h: 1.05, fontFace: FONT, fontSize: 40, bold: true, color: TEAL, align: 'center', margin: 0 });
    s.addText('classified correctly almost every time, by the same seven detectors, in the same study. Plain writing reads as machine writing to these tools. (Same study)', {
      x: 7.2, y: 3.4, w: 5.2, h: 1.9, fontFace: FONT, fontSize: 16, color: INK, align: 'center', margin: 0 });
    strip(s, 5.7, [
      { text: 'Detection is not a plan. ', options: { bold: true, color: TEAL } },
      { text: 'It is a plan that sends the bill to the students with the least protection.', options: { color: WHITE } },
    ]);
    s.addNotes('Say: this is Liang and colleagues at Stanford, published in Patterns in 2023. Ninety-one TOEFL essays written by real non-native English speakers and eighty-eight essays by American eighth graders, run through seven commercial detectors. The American essays came back near-perfectly classified; the TOEFL essays were falsely flagged at an average of 61.3%. Slow down and leave a beat of silence after the number. The mechanism: these tools read surprising, varied writing as human, and a writer working in a second language writes with fewer surprises. So the failures land on multilingual students, students with language-based disabilities, and anyone who writes plainly on purpose.');
  }

  // ============================== SLIDE 7 · THE RELIEF ==============================
  {
    const s = base();
    kicker(s, 'Three high schools, surveyed before and after ChatGPT');
    title(s, 'The rate did not move');
    card(s, 0.7, 1.6, 5.9, 2.5, 'EAF5F3');
    s.addText('BEFORE CHATGPT EXISTED', { x: 0.7, y: 1.75, w: 5.9, h: 0.32, fontFace: FONT, fontSize: 13, bold: true, color: TEAL, align: 'center', charSpacing: 2, margin: 0 });
    s.addText('60–70%', { x: 0.7, y: 2.08, w: 5.9, h: 1.0, fontFace: FONT, fontSize: 46, bold: true, color: TEAL, align: 'center', margin: 0 });
    s.addText('reported at least one dishonest behavior', { x: 0.9, y: 3.1, w: 5.5, h: 0.85, fontFace: FONT, fontSize: 16, color: INK, align: 'center', margin: 0, valign: 'top' });
    card(s, 6.85, 1.6, 5.9, 2.5, 'EAF5F3');
    s.addText('AFTER IT ARRIVED', { x: 6.85, y: 1.75, w: 5.9, h: 0.32, fontFace: FONT, fontSize: 13, bold: true, color: TEAL, align: 'center', charSpacing: 2, margin: 0 });
    s.addText('60–70%', { x: 6.85, y: 2.08, w: 5.9, h: 1.0, fontFace: FONT, fontSize: 46, bold: true, color: TEAL, align: 'center', margin: 0 });
    s.addText('the same schools, the same question, relatively stable', { x: 7.05, y: 3.1, w: 5.5, h: 0.85, fontFace: FONT, fontSize: 16, color: INK, align: 'center', margin: 0, valign: 'top' });
    card(s, 0.7, 4.3, 12.0, 1.6, PAPER);
    s.addText([
      { text: 'Say the scope out loud: ', options: { bold: true, color: NAVY } },
      { text: 'three high schools (one public, one private, one charter), anonymous self-report, before and after. Not national. Not causal proof of anything. It is still enough to put down the idea that a generation went bad in November 2022. (Lee, Pope, Miles & Zárate, 2024)', options: { color: INK } },
    ], { x: 1.05, y: 4.42, w: 11.3, h: 1.36, fontFace: FONT, fontSize: 16, margin: 0, valign: 'middle', lineSpacingMultiple: 1.12 });
    strip(s, 6.05, [
      { text: 'The forms shift. The amount, where anyone has measured it, did not spike.', options: { bold: true, color: WHITE } },
    ]);
    s.addNotes('Say: give the scope before the number, because the scope matters. Lee, Pope and colleagues surveyed students at three high schools anonymously before ChatGPT existed and again after. In both rounds roughly 60 to 70 percent reported at least one dishonest behavior, and prevalence stayed relatively stable. Then state the limits in your own voice: three schools, not a country; self-report, not observation; not causal proof. What it is enough for is putting down the panic.');
  }

  // ============================== SLIDE 8 · WHY THEY HAND IN AI WORK ==============================
  {
    const s = base();
    kicker(s, 'The uncomfortable, useful answer');
    title(s, 'Because it is the fastest path to what you asked for');
    bullets(s, [
      'You asked for a product: five paragraphs, a lab write-up, twenty problems with work shown',
      'A tool that makes products in four seconds is the fastest route to a product',
      'Pope’s research points at pressure, disengagement and workload, not at tool access',
      { text: 'If the product is all you ask for, AI wins. And it will keep winning.', options: { bold: true, color: NAVY } },
    ], { y: 1.6, h: 3.5, fontSize: 20 });
    card(s, 0.7, 4.95, 12.0, 1.25, PAPER);
    s.addText('That is a design result, not a character collapse. You cannot out-run it by grading harder, because every year the products get faster. You can only ask for something else.', {
      x: 1.05, y: 5.05, w: 11.3, h: 1.05, fontFace: FONT, fontSize: 17, color: INK, margin: 0, valign: 'middle' });
    s.addNotes('Say: if it is not a character collapse, what is it? Denise Pope has spent years asking students directly, and the answers point at pressure, disengagement and workload rather than tool access. Then make it concrete: look at the last assignment you gave and name what you actually collected. A product. A tool that makes products in four seconds is the fastest route to the thing you asked for, and a tired kid at eleven at night takes the fastest route. Land the last line hard: it will keep winning.');
  }

  // ============================== SLIDE 9 · THE MOVE ==============================
  {
    const s = base(true);
    s.addText('THE ONE MOVE OF THIS SESSION', { x: 0.9, y: 1.55, w: 8.3, h: 0.5, fontFace: FONT, fontSize: 15, bold: true, color: AMBER, charSpacing: 3, margin: 0 });
    s.addText('Ask for one thing\nAI can’t hand in.', {
      x: 0.9, y: 2.2, w: 11.5, h: 2.1, fontFace: FONT, fontSize: 46, bold: true, color: WHITE, margin: 0, lineSpacingMultiple: 1.1 });
    s.addText('Not “redesign your curriculum.” Not “AI-proof your assessments,” which nobody can do. One thing, on one assignment, that a chatbot is structurally unable to produce.', {
      x: 0.9, y: 4.6, w: 11.3, h: 1.0, fontFace: FONT, fontSize: 19, color: 'C9D4DE', margin: 0 });
    s.addText('Write that sentence down. It rebuilds an assignment on a Sunday night in about four minutes.', {
      x: 0.9, y: 5.75, w: 11.3, h: 0.5, fontFace: FONT, fontSize: 19, bold: true, color: TEAL, margin: 0 });
    s.addNotes('Say: ask for one thing AI can’t hand in. That is the session. Then stop talking for three full seconds and let people write it down. This is the hinge of the hour and it should land at roughly the twenty-minute mark. Do not add a second framework here; the next slide is the only list in the kit.');
  }

  // ============================== SLIDE 10 · THREE PLACES ==============================
  {
    const s = base();
    kicker(s, 'The only list in this kit');
    title(s, 'Three places to find that one thing');
    const places = [
      ['1', 'FROM THIS ROOM', TEAL,
        'Something that happened here. Tuesday’s discussion, the lab we ran, the text we annotated together, the data our own class collected.',
        'A chatbot was never in the room, and it cannot get in.'],
      ['2', 'FROM THIS STUDENT', NAVY,
        'Their own reasoning, choice or experience, pushed specific enough that a generic answer cannot fake it.',
        'Not “how did the ending feel.” Try “which of your two drafts is better, and what did you give up?”'],
      ['3', 'IN FRONT OF YOU', 'B07914',
        'A piece produced live: a five-minute quick-write, the plan before the draft, two minutes of “walk me through it.”',
        'The timing is the security. Nothing else has to change.'],
    ];
    places.forEach(([n, head, c, body, ex], i) => {
      const x = 0.7 + i * 4.07;
      card(s, x, 1.5, 3.86, 4.3, PAPER);
      s.addShape('ellipse', { x: x + 0.28, y: 1.72, w: 0.5, h: 0.5, fill: { color: c }, line: { color: c } });
      s.addText(n, { x: x + 0.28, y: 1.72, w: 0.5, h: 0.5, fontFace: FONT, fontSize: 18, bold: true, color: WHITE, align: 'center', valign: 'middle', margin: 0 });
      s.addText(head, { x: x + 0.9, y: 1.72, w: 2.7, h: 0.5, fontFace: FONT, fontSize: 14, bold: true, color: c, charSpacing: 1.2, margin: 0, valign: 'middle' });
      s.addText(body, { x: x + 0.28, y: 2.4, w: 3.3, h: 1.9, fontFace: FONT, fontSize: 16, color: INK, margin: 0, valign: 'top', lineSpacingMultiple: 1.14 });
      s.addText(ex, { x: x + 0.28, y: 4.3, w: 3.3, h: 1.35, fontFace: FONT, fontSize: 14.5, italic: true, color: MUTED, margin: 0, valign: 'top', lineSpacingMultiple: 1.12 });
    });
    strip(s, 5.98, [
      { text: 'One move. Three places. ', options: { bold: true, color: TEAL } },
      { text: 'There is no fourth thing to remember, and no scale to memorize.', options: { color: WHITE } },
    ]);
    s.addNotes('Say: there are exactly three places to look, and this is the only list in the kit. From this room: something that happened here, and a chatbot was never in the room. From this student: their own reasoning, pushed specific enough that a generic answer cannot fake it. In front of you: something produced live. Read the italic example under each one. If anyone starts building a system with categories and levels, come back to this slide.');
  }

  // ============================== SLIDE 11 · HER ASSIGNMENT AS IT STANDS ==============================
  {
    const s = base();
    kicker(s, 'Ms. Rivera · our running example teacher (a composite)');
    title(s, 'The assignment as it stands today');
    card(s, 0.7, 1.6, 12.0, 3.55, PAPER);
    s.addShape('roundRect', { x: 0.7, y: 1.6, w: 0.12, h: 3.55, rectRadius: 0.05, fill: { color: TEAL }, line: { color: TEAL } });
    s.addText('7TH GRADE ENGLISH · PERSUASIVE ESSAY · DUE FRIDAY', {
      x: 1.1, y: 1.78, w: 11.2, h: 0.3, fontFace: FONT, fontSize: 12, bold: true, color: TEAL, charSpacing: 1.5, margin: 0, valign: 'middle' });
    s.addText('Should our school day start later?', {
      x: 1.1, y: 2.16, w: 11.2, h: 0.6, fontFace: FONT, fontSize: 28, bold: true, color: NAVY, margin: 0, valign: 'middle' });
    s.addText(HER_TASK, {
      x: 1.1, y: 2.85, w: 11.2, h: 0.85, fontFace: FONT, fontSize: 19, color: INK, margin: 0, valign: 'top', lineSpacingMultiple: 1.14 });
    card(s, 1.1, 3.85, 11.2, 1.05, 'FBEDEB');
    s.addText([
      { text: 'What is missing: ', options: { bold: true, color: BAD } },
      { text: 'nothing on this sheet is out of reach for a chatbot. You read its version on slide 2, and it split the room.', options: { color: INK } },
    ], { x: 1.45, y: 3.85, w: 10.5, h: 1.05, fontFace: FONT, fontSize: 17, margin: 0, valign: 'middle', lineSpacingMultiple: 1.1 });
    strip(s, 5.45, [
      { text: 'There is nothing wrong with this assignment. ', options: { bold: true, color: TEAL } },
      { text: 'It is clear, standards-aligned, and half this room gave one like it last month.', options: { color: WHITE } },
    ]);
    s.addNotes('Say: this is the assignment we follow all the way through the hour, and it never changes topic or splits into parts. Ms. Rivera teaches seventh grade English. Next week: should our school day start later, five-paragraph persuasive essay, due Friday. Be generous about it out loud, because half the room has given one like it. Then land the problem: there is not one thing on this sheet a chatbot cannot produce completely, and the room already read the proof on slide 2.');
  }

  // ============================== SLIDE 12 · HER ONE CHANGE ==============================
  {
    const s = base();
    kicker(s, 'One sentence added. One line added. Same essay.');
    title(s, 'What she changed');
    card(s, 0.7, 1.35, 12.0, 1.05, PAPER);
    s.addText('WHAT IT IS ACTUALLY FOR', { x: 1.05, y: 1.43, w: 4.5, h: 0.28, fontFace: FONT, fontSize: 11.5, bold: true, color: MUTED, charSpacing: 1.4, margin: 0, valign: 'middle' });
    s.addText(HER_PURPOSE, { x: 1.05, y: 1.72, w: 11.3, h: 0.55, fontFace: FONT, fontSize: 18, color: INK, margin: 0, valign: 'middle' });
    card(s, 0.7, 2.52, 12.0, 1.45, 'EAF5F3');
    s.addText('THE ONE THING AI CANNOT HAND IN · FROM THIS ROOM', { x: 1.05, y: 2.60, w: 7.0, h: 0.28, fontFace: FONT, fontSize: 11.5, bold: true, color: TEAL, charSpacing: 1.4, margin: 0, valign: 'middle' });
    s.addText(HER_ONE_THING, { x: 1.05, y: 2.90, w: 11.3, h: 0.98, fontFace: FONT, fontSize: 18, bold: true, color: NAVY, margin: 0, valign: 'middle', lineSpacingMultiple: 1.1 });
    card(s, 0.7, 4.09, 12.0, 1.05, PAPER);
    s.addText('THE ONE LINE ABOUT AI', { x: 1.05, y: 4.17, w: 4.5, h: 0.28, fontFace: FONT, fontSize: 11.5, bold: true, color: 'B07914', charSpacing: 1.4, margin: 0, valign: 'middle' });
    s.addText(HER_LABEL, { x: 1.05, y: 4.46, w: 11.3, h: 0.55, fontFace: FONT, fontSize: 18, color: INK, margin: 0, valign: 'middle' });
    strip(s, 5.30, [
      { text: 'A chatbot writes a school-start-time essay in four seconds. ', options: { color: WHITE } },
      { text: 'It cannot know what your third period argued on Tuesday.', options: { bold: true, color: TEAL } },
    ]);
    s.addText('Naming a level of allowed AI use is prior art, not ours: the AI Assessment Scale (Perkins, Furze, Roe & MacVaugh, 2024) is the published five-level version, from “No AI” to “AI Exploration.” We use one line, not a scale, on purpose.', {
      x: 0.7, y: 6.12, w: 12.0, h: 0.62, fontFace: FONT, fontSize: 11.5, color: MUTED, margin: 0, valign: 'top', lineSpacingMultiple: 1.1 });
    s.addNotes('Say: watch what she changes. Same topic, same five paragraphs, same Friday. First she names what it is actually for in one sentence, which is the step people skip. Then she adds one thing from this room: two claims from Tuesday’s debate, named, plus why the strongest counter-argument did not change their minds. Then one line so nobody has to guess where AI stands. Read the bottom strip aloud; it is the test for everything they write in the lab. If someone says this is just levels of AI use, agree and point at the credit line: the AI Assessment Scale is the published five-level version, and we are deliberately using one line instead.');
  }

  // ============================== SLIDE 13 · THE FOUR-SECOND TEST, BEFORE ==============================
  {
    const s = base();
    kicker(s, 'She typed her own assignment into a chat tool, the way a student would');
    title(s, 'The four-second test');
    chatWin(s, 1.35, 2.6, ' · before');
    chatPaper(s, 1.35, 2.6);
    s.addText([
      { text: '“You are a 7th grade student. ', options: { color: TEAL, bold: true } },
      { text: 'Write my persuasive essay for me. ', options: { color: NAVY, bold: true } },
      { text: 'The assignment is: should our school day start later. We have been talking about sleep schedules and bus times. ', options: { color: 'B07914', bold: true } },
      { text: 'Five paragraphs: an introduction with a claim, three body paragraphs with evidence, and a conclusion.”', options: { color: GOOD, bold: true } },
    ], { x: 1.95, y: 2.15, w: 10.05, h: 1.5, fontFace: FONT, fontSize: 16, margin: 0, valign: 'top', lineSpacingMultiple: 1.12 });
    legend(s, 4.25, PART_CHIPS);
    card(s, 0.7, 5.05, 12.0, 1.35, 'FBEDEB');
    s.addText([
      { text: 'FOUR SECONDS LATER   ', options: { bold: true, color: BAD, fontSize: 12, charSpacing: 1.4 } },
      { text: 'a complete, competent five-paragraph essay. Its opening paragraph is Paragraph B from slide 2, the one that split this room.', options: { color: INK, fontSize: 17 } },
    ], { x: 1.05, y: 5.05, w: 11.3, h: 1.35, fontFace: FONT, margin: 0, valign: 'middle', lineSpacingMultiple: 1.1 });
    s.addNotes('Say: before she trusted any of this she did the obvious thing, and you can too. She opened a chat tool and typed her own assignment into it exactly the way a student would at eleven at night. Point at the colours as you name the four parts: role in teal, task in navy, context in amber, format in green. Four seconds later she had a complete five-paragraph essay, and its opening paragraph is the one that split this room. Say plainly that this is a teacher stress-testing her own assignment, not a demonstration for students. It costs four seconds to run on theirs.');
  }

  // ============================== SLIDE 14 · GUIDED PRACTICE ==============================
  {
    const s = base();
    kicker(s, 'Guided practice · sixty seconds each, out loud');
    title(s, 'Add the one thing');
    const prompts = [
      '“Write a paragraph explaining photosynthesis.”',
      '“Summarize chapter four.”',
      '“Solve these twenty problems and show your work.”',
    ];
    prompts.forEach((t, i) => {
      const y = 1.45 + i * 1.35;
      card(s, 0.7, y, 12.0, 1.2, PAPER);
      s.addText(String(i + 1), { x: 1.0, y, w: 0.6, h: 1.2, fontFace: FONT, fontSize: 26, bold: true, color: TEAL, align: 'center', margin: 0, valign: 'middle' });
      s.addText(t, { x: 1.75, y, w: 10.4, h: 1.2, fontFace: FONT, fontSize: 21, color: NAVY, bold: true, margin: 0, valign: 'middle' });
    });
    strip(s, 5.55, [
      { text: 'Do not rewrite the assignment. Add one sentence, and name which of the three places it came from.', options: { bold: true, color: WHITE } },
    ]);
    s.addText('Answers on the next slide: the plant on the window sill · which sentence would you delete · two minutes at the board. Reveal them only after the room has tried all three.', {
      x: 0.7, y: 6.42, w: 12.0, h: 0.4, fontFace: FONT, fontSize: 12, color: MUTED, align: 'center', margin: 0, valign: 'middle' });
    s.addNotes('Say: three real assignments, the kind on a hundred desks in this building tonight. One at a time, sixty seconds each, answers out loud. Take two or three answers per prompt and move. Do not advance until all three have been tried; the small grey line at the bottom is for a reader flipping the file, not for the room. 45-min cut: two prompts instead of three.');
  }

  // ============================== SLIDE 15 · THE ANSWERS ==============================
  {
    const s = base();
    kicker(s, 'One good answer each. Yours were probably better.');
    title(s, 'Three answers, one from each place');
    const answers = [
      ['“Write a paragraph explaining photosynthesis.”', 'FROM THIS ROOM', TEAL,
        '“Use the plant on our window sill. Explain why the leaves facing the glass are green and the ones behind the cabinet are yellow.”'],
      ['“Summarize chapter four.”', 'FROM THIS STUDENT', NAVY,
        '“Summarize it in five sentences. Then tell me which sentence you would delete if you only had four, and why.”'],
      ['“Solve these twenty problems and show your work.”', 'IN FRONT OF YOU', 'B07914',
        '“Pick the one that gave you the most trouble. Take two minutes at the board and walk us through where you got stuck.”'],
    ];
    answers.forEach(([orig, badge, c, add], i) => {
      const y = 1.45 + i * 1.6;
      card(s, 0.7, y, 12.0, 1.45, PAPER);
      s.addText(orig, { x: 1.05, y: y + 0.08, w: 7.6, h: 0.35, fontFace: FONT, fontSize: 13.5, italic: true, color: MUTED, margin: 0, valign: 'middle' });
      s.addShape('roundRect', { x: 9.35, y: y + 0.12, w: 2.85, h: 0.34, rectRadius: 0.17, fill: { color: c }, line: { color: c } });
      s.addText(badge, { x: 9.35, y: y + 0.12, w: 2.85, h: 0.34, fontFace: FONT, fontSize: 11, bold: true, color: WHITE, align: 'center', valign: 'middle', margin: 0, charSpacing: 1 });
      s.addText(add, { x: 1.05, y: y + 0.5, w: 11.15, h: 0.85, fontFace: FONT, fontSize: 17, bold: true, color: NAVY, margin: 0, valign: 'middle', lineSpacingMultiple: 1.1 });
    });
    s.addText('Nobody redesigned a unit. Each one is a sentence, and none of them punishes the honest student who used AI to check their work.', {
      x: 0.7, y: 6.3, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 16, bold: true, color: NAVY, align: 'center', margin: 0, valign: 'middle' });
    s.addNotes('Say: here is one good answer for each, and yours were probably better because you know your content. Read all three aloud. Then point at their size: nobody redesigned a unit, each one is a single sentence. Finish with the fairness point, which matters to skeptics: none of these punishes a student for using AI on the other parts. The honest kid checking their work is fine; the kid outsourcing the whole thing hits a wall.');
  }

  // ============================== SLIDE 16 · LAB SETUP ==============================
  {
    const s = base(true);
    s.addText('THE LAB · 15 MINUTES · PROTECTED', { x: 0.9, y: 1.35, w: 8.3, h: 0.45, fontFace: FONT, fontSize: 15, bold: true, color: AMBER, charSpacing: 3, margin: 0 });
    s.addText('Rebuild one real assignment', {
      x: 0.9, y: 1.85, w: 11.5, h: 0.8, fontFace: FONT, fontSize: 38, bold: true, color: WHITE, margin: 0, valign: 'middle' });
    const steps = [
      ['STEP 1 · 3 min', 'Put your next real assignment on the desk'],
      ['STEP 2 · 3 min', 'Name what it is actually for, in one sentence'],
      ['STEP 3 · 6 min', 'Add the one thing AI can’t hand in'],
      ['STEP 4 · 3 min', 'Write the one line about AI'],
    ];
    steps.forEach(([t, txt], i) => {
      const y = 2.9 + i * 0.72;
      s.addText(t, { x: 0.95, y, w: 2.1, h: 0.6, fontFace: FONT, fontSize: 15, bold: true, color: TEAL, margin: 0, valign: 'middle' });
      s.addText(txt, { x: 3.2, y, w: 6.5, h: 0.6, fontFace: FONT, fontSize: 20, color: WHITE, margin: 0, valign: 'middle' });
    });
    card(s, 9.9, 2.85, 2.85, 3.0, '1E3A50');
    s.addText('Ground rules', { x: 10.15, y: 3.05, w: 2.35, h: 0.4, fontFace: FONT, fontSize: 15, bold: true, color: AMBER, margin: 0 });
    s.addText('The real assignment, not a hypothetical. On paper. Ms. Rivera does every step on screen beside you, so copy her shape if you get stuck.', {
      x: 10.15, y: 3.5, w: 2.35, h: 2.15, fontFace: FONT, fontSize: 13.5, color: 'C9D4DE', margin: 0, valign: 'top' });
    s.addText('You walk out holding a sheet you can photocopy. That is the whole deal.', {
      x: 0.9, y: 6.1, w: 8.6, h: 0.5, fontFace: FONT, fontSize: 18, bold: true, color: TEAL, margin: 0, valign: 'middle' });
    s.addNotes('Say: put the assignment you are actually giving in the next two weeks in front of you. Four steps, fifteen minutes, on paper. Put fifteen minutes on a visible clock. This block does not get cut for anything: circulate, do not present during it. Anyone without a real assignment borrows a neighbour’s; nobody works on a hypothetical.');
  }

  // ============================== LAB STEP HELPER ==============================
  function labStep(s, stepKicker, stepTitle, items, cardLabel, cardRuns, closer) {
    kicker(s, stepKicker);
    title(s, stepTitle);
    bullets(s, items, { x: 0.7, y: 1.7, w: 5.9, h: 4.3, fontSize: 17 });
    card(s, 6.85, 1.7, 5.9, 4.3, 'EAF5F3');
    s.addText(cardLabel, { x: 7.15, y: 1.9, w: 5.4, h: 0.32, fontFace: FONT, fontSize: 12.5, bold: true, color: TEAL, charSpacing: 1.5, margin: 0, valign: 'middle' });
    s.addText(cardRuns, { x: 7.15, y: 2.32, w: 5.35, h: 3.5, fontFace: FONT, fontSize: 16, margin: 0, valign: 'top', lineSpacingMultiple: 1.18 });
    s.addText(closer, { x: 0.7, y: 6.2, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 19, bold: true, color: NAVY, align: 'center', margin: 0, valign: 'middle' });
  }

  // ============================== SLIDE 17 · LAB STEP 1 ==============================
  {
    const s = base();
    labStep(s, 'Lab · step 1 of 4 · 3 minutes', 'Put it on the desk', [
      'The assignment you are actually giving in the next two weeks',
      'Written out the way students will see it',
      'If it lives in your head, write the sentence you say when you assign it',
      { text: 'Do not improve it yet. We need the honest starting version.', options: { bold: true, color: NAVY } },
    ], 'MS. RIVERA’S ASSIGNMENT · STEP 1', [
      { text: 'Should our school day start later?\n', options: { bold: true, color: NAVY, fontSize: 18 } },
      { text: HER_TASK + '\n\n', options: { color: INK } },
      { text: '7th grade English. Due Friday. Exactly as it stands today.\n\n', options: { color: INK } },
      { text: '“The honest starting version. Improving it is step three.”', options: { italic: true, color: MUTED } },
    ], 'Three minutes. The real one, not the one you wish you were giving.');
    s.addNotes('Say: step one, three minutes, and it is the easy one. Put the assignment on the desk written out as students will see it. If it lives in your head, write the sentence you say when you assign it. Circulate. The big card is Ms. Rivera’s step 1: her persuasive essay exactly as it stands, and it is the same assignment on every lab slide from here to the end.');
  }

  // ============================== SLIDE 18 · LAB STEP 2 ==============================
  {
    const s = base();
    labStep(s, 'Lab · step 2 of 4 · 3 minutes', 'Name what it is for', [
      'One sentence. Not the standard code, and not the format.',
      'What do you need to see that you cannot see any other way?',
      'If you cannot finish the sentence, that is the most useful thing you learn today',
      { text: 'The person next to you can help you finish it.', options: { bold: true, color: NAVY } },
    ], 'MS. RIVERA’S ASSIGNMENT · STEP 2', [
      { text: 'What it is actually for:\n', options: { bold: true, color: NAVY } },
      { text: HER_PURPOSE + '\n\n', options: { color: INK } },
      { text: 'What that sentence told her: ', options: { bold: true, color: NAVY } },
      { text: 'the five-paragraph format is not the point. The argument is. So almost everything else can change.', options: { color: INK } },
    ], 'Three minutes. Write the sentence down; do not just think it.');
    s.addNotes('Say: step two, three minutes, and this is the one that does the real work. In one sentence, what is this assignment actually for? Not the standard code. What do you need to see that you cannot see any other way? Read Ms. Rivera’s aloud once as a model, then point out what it bought her: it told her the format is not the point, which frees her to change almost anything else. Make people write it down; this is the step everyone rushes.');
  }

  // ============================== SLIDE 19 · LAB STEP 3 ==============================
  {
    const s = base();
    kicker(s, 'Lab · step 3 of 4 · 6 minutes');
    title(s, 'Add the one thing');
    const mini = [
      ['1', 'FROM THIS ROOM', TEAL, 'Tuesday’s discussion, our lab, our data'],
      ['2', 'FROM THIS STUDENT', NAVY, 'Their reasoning, their choice, their trade-off'],
      ['3', 'IN FRONT OF YOU', 'B07914', 'A quick-write, the plan, two minutes out loud'],
    ];
    mini.forEach(([n, head, c, ex], i) => {
      const y = 1.72 + i * 0.95;
      s.addShape('roundRect', { x: 0.7, y, w: 0.42, h: 0.42, rectRadius: 0.21, fill: { color: c }, line: { color: c } });
      s.addText(n, { x: 0.7, y, w: 0.42, h: 0.42, fontFace: FONT, fontSize: 14, bold: true, color: WHITE, align: 'center', valign: 'middle', margin: 0 });
      s.addText(head, { x: 1.28, y, w: 5.3, h: 0.42, fontFace: FONT, fontSize: 15, bold: true, color: c, charSpacing: 1, margin: 0, valign: 'middle' });
      s.addText(ex, { x: 1.28, y: y + 0.42, w: 5.3, h: 0.4, fontFace: FONT, fontSize: 15, color: INK, margin: 0, valign: 'middle' });
    });
    card(s, 0.7, 4.62, 5.9, 1.35, PAPER);
    s.addText([
      { text: 'The test I will ask as I come around: ', options: { bold: true, color: NAVY } },
      { text: 'could a chatbot fake this?', options: { italic: true, color: INK } },
    ], { x: 1.0, y: 4.62, w: 5.3, h: 1.35, fontFace: FONT, fontSize: 16, margin: 0, valign: 'middle', lineSpacingMultiple: 1.1 });
    card(s, 6.85, 1.7, 5.9, 4.3, 'EAF5F3');
    s.addText('MS. RIVERA’S ASSIGNMENT · STEP 3', { x: 7.15, y: 1.9, w: 5.4, h: 0.32, fontFace: FONT, fontSize: 12.5, bold: true, color: TEAL, charSpacing: 1.5, margin: 0, valign: 'middle' });
    s.addText([
      { text: 'She took door number one, from this room:\n\n', options: { color: INK } },
      { text: HER_ONE_THING + '\n\n', options: { bold: true, color: NAVY } },
      { text: '“If the answer is ‘only if it was in my room,’ you are done.”', options: { italic: true, color: MUTED } },
    ], { x: 7.15, y: 2.32, w: 5.35, h: 3.5, fontFace: FONT, fontSize: 16, margin: 0, valign: 'top', lineSpacingMultiple: 1.18 });
    s.addText('Six minutes, the longest step. One sentence added to your assignment.', {
      x: 0.7, y: 6.2, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 19, bold: true, color: NAVY, align: 'center', margin: 0, valign: 'middle' });
    s.addNotes('Say: step three, six minutes, the longest step and the one that never gets shortened. Add the one thing AI can’t hand in and take it from one of the three places, which stay on screen. One sentence added, not a rewrite. Circulate and ask one question: could a chatbot fake this? If the answer is “maybe, if the student described the class to it,” push one notch more specific. If the answer is “only if it was in my room,” they are done. The big card is Ms. Rivera’s step 3 on the same persuasive essay.');
  }

  // ============================== SLIDE 20 · LAB STEP 4 ==============================
  {
    const s = base();
    labStep(s, 'Lab · step 4 of 4 · 3 minutes', 'Write the one line', [
      'Where AI stands on this assignment, in words a twelve-year-old repeats back',
      '“AI-free, this one is in class on paper” is a complete answer',
      'One line. Not a policy, not a paragraph, not a form.',
      { text: 'The only wrong version is no line at all.', options: { bold: true, color: NAVY } },
    ], 'MS. RIVERA’S ASSIGNMENT · STEP 4', [
      { text: 'Her one line, printed at the bottom of the sheet:\n\n', options: { color: INK } },
      { text: HER_LABEL + '\n\n', options: { bold: true, color: NAVY } },
      { text: '“Thirty students inventing thirty different rules is how honest kids guess wrong.”', options: { italic: true, color: MUTED } },
    ], 'Three minutes. One line, in student words.');
    s.addNotes('Say: step four, three minutes, one line. Tell students where AI stands on this assignment in words a twelve-year-old repeats back correctly. Insist on one line; if someone is drafting a paragraph, say so kindly. “AI-free, this one is in class on paper” is a complete answer. The only wrong version is no line at all, because then thirty students invent thirty different rules and the honest ones guess wrong.');
  }

  // ============================== SLIDE 21 · THE FOUR-SECOND TEST, AFTER ==============================
  {
    const s = base();
    kicker(s, 'Same tool, same four seconds, the rebuilt assignment');
    title(s, 'What came back this time');
    chatWin(s, 1.3, 4.3, ' · after');
    chatPaper(s, 1.3, 4.3);
    s.addText('WHAT THE TOOL SENT BACK · BODY PARAGRAPH 3', {
      x: 1.95, y: 2.05, w: 10.05, h: 0.3, fontFace: FONT, fontSize: 11.5, bold: true, color: MUTED, charSpacing: 1.4, margin: 0, valign: 'middle' });
    s.addText([
      { text: '“Furthermore, as ', options: { color: INK } },
      { text: '[classmate’s name]', options: { bold: true, color: BAD } },
      { text: ' argued in our debate, a later start would let students arrive alert and prepared. Another classmate pointed out that ', options: { color: INK } },
      { text: 'running the buses later would actually reduce district costs', options: { bold: true, color: BAD } },
      { text: ', which strengthens the practical case for the change.”', options: { color: INK } },
    ], { x: 1.95, y: 2.4, w: 10.05, h: 1.5, fontFace: FONT, fontSize: 17, margin: 0, valign: 'top', lineSpacingMultiple: 1.14 });
    s.addText([
      { text: 'It left her a blank, because it was not in the room. ', options: { bold: true, color: BAD } },
      { text: 'Then it guessed, confidently, about the buses. Nobody said that. She was there.', options: { color: INK } },
    ], { x: 1.95, y: 4.0, w: 10.05, h: 0.9, fontFace: FONT, fontSize: 15, margin: 0, valign: 'top', lineSpacingMultiple: 1.1 });
    s.addText('Illustration of a typical response. Your tool’s wording will differ; the failure will not.',
      { x: 1.95, y: 4.95, w: 10.05, h: 0.3, fontFace: FONT, fontSize: 11, italic: true, color: MUTED, margin: 0, valign: 'middle' });
    strip(s, 5.85, [
      { text: 'Notice what this is not: catching anybody. ', options: { bold: true, color: TEAL } },
      { text: 'It is an assignment a machine cannot finish, read the normal way.', options: { color: WHITE } },
    ]);
    s.addNotes('Say: pens down for ninety seconds. She ran the same test on the rebuilt assignment, same tool, same four seconds. Read the paragraph aloud, including the bracket, because the bracket is the whole slide: it left her a blank because it was not in the room. Then it guessed confidently that someone argued the buses would be cheaper, and nobody said that, and she was there. Say the last part plainly: this is not catching anybody. It is an assignment a machine cannot complete, read the normal way she reads everything else.');
  }

  // ============================== SLIDE 22 · HER FINISHED ASSIGNMENT SHEET ==============================
  {
    const s = base();
    kicker(s, 'The finished product · her sheet, word for word');
    title(s, 'What prints Monday morning');
    card(s, 0.7, 1.3, 12.0, 4.55, PAPER);
    s.addShape('roundRect', { x: 0.7, y: 1.3, w: 0.12, h: 4.55, rectRadius: 0.05, fill: { color: TEAL }, line: { color: TEAL } });
    s.addText('MS. RIVERA · 7TH GRADE ENGLISH · PERSUASIVE ESSAY · DUE FRIDAY', {
      x: 1.05, y: 1.46, w: 11.3, h: 0.3, fontFace: FONT, fontSize: 11.5, bold: true, color: TEAL, charSpacing: 1.4, margin: 0, valign: 'middle' });
    s.addText('Should our school day start later?', {
      x: 1.05, y: 1.8, w: 11.3, h: 0.52, fontFace: FONT, fontSize: 26, bold: true, color: NAVY, margin: 0, valign: 'middle' });
    s.addText(HER_TASK, {
      x: 1.05, y: 2.38, w: 11.3, h: 0.8, fontFace: FONT, fontSize: 17, color: INK, margin: 0, valign: 'top', lineSpacingMultiple: 1.14 });
    card(s, 1.05, 3.24, 11.3, 1.2, 'EAF5F3');
    s.addText('ADDED · THE ONE THING AI CANNOT HAND IN', { x: 1.35, y: 3.32, w: 6.5, h: 0.28, fontFace: FONT, fontSize: 11, bold: true, color: TEAL, charSpacing: 1.4, margin: 0, valign: 'middle' });
    s.addText(HER_ONE_THING, { x: 1.35, y: 3.62, w: 10.7, h: 0.74, fontFace: FONT, fontSize: 17, bold: true, color: NAVY, margin: 0, valign: 'middle', lineSpacingMultiple: 1.1 });
    card(s, 1.05, 4.52, 11.3, 1.05, 'FDF6E7');
    s.addText('ADDED · AI ON THIS ASSIGNMENT', { x: 1.35, y: 4.6, w: 6.5, h: 0.28, fontFace: FONT, fontSize: 11, bold: true, color: 'B07914', charSpacing: 1.4, margin: 0, valign: 'middle' });
    s.addText(HER_LABEL, { x: 1.35, y: 4.88, w: 10.7, h: 0.6, fontFace: FONT, fontSize: 17, color: INK, margin: 0, valign: 'middle' });
    strip(s, 6.0, [
      { text: 'Two lines are new. Everything else is the assignment she already had. ', options: { color: WHITE } },
      { text: 'It took about four minutes.', options: { bold: true, color: TEAL } },
    ]);
    s.addNotes('Say: here it is, the whole thing, exactly as it prints Monday morning. Same heading, same topic, same five paragraphs, same Friday. One sentence added under the task, one line about AI at the bottom. Read the added sentence and the added line aloud word for word. Leave this slide up through the share-out; it is the slide people photograph. Tell them plainly: if your sheet looks like this by the end of the share-out, you have done today’s work completely.');
  }

  // ============================== SLIDE 23 · SHARE-OUT ==============================
  {
    const s = base();
    kicker(s, 'Share-out · four voices, one minute each');
    title(s, 'Read us your sentence');
    bullets(s, [
      'The sentence you added, and which of the three places it came from',
      'What you almost wrote first, and why you changed it',
      { text: 'If a chatbot could still fake it, say so. That is the most useful minute in the room.', options: { bold: true, color: NAVY } },
    ], { y: 1.7, h: 3.0, fontSize: 21 });
    card(s, 0.7, 4.3, 12.0, 1.35, PAPER);
    s.addText('Listen for how different this sounds by subject. In a shop class it is “in front of you” almost every time. In history it is usually “from this room.” Same move, completely different sentence, which is how you know it is a move and not a template.', {
      x: 1.05, y: 4.3, w: 11.3, h: 1.35, fontFace: FONT, fontSize: 16, color: INK, margin: 0, valign: 'middle', lineSpacingMultiple: 1.12 });
    s.addText('45-min cut: two voices. Take a math or CTE answer if one is offered.',
      { x: 0.7, y: 5.85, w: 12.0, h: 0.35, fontFace: FONT, fontSize: 12, color: MUTED, align: 'center', margin: 0, valign: 'middle' });
    s.addNotes('Say: four voices, one minute each, and all I want is the sentence you added and which of the three places it came from. Prioritize different subject areas; take a math or CTE answer if one is offered, because the room needs to hear this work outside English. If someone says a chatbot could still fake theirs, that is the most useful minute available, so give it the time.');
  }

  // ============================== SLIDE 24 · WHEN IT STILL SEEMS OFF ==============================
  {
    const s = base();
    kicker(s, 'It will still happen. Here is the move.');
    title(s, 'When it still seems off');
    const moves = [
      ['OPEN WITH CURIOSITY', TEAL, '“Walk me through how you made this. What did you start with?”'],
      ['GET SPECIFIC', NAVY, '“Tell me about this paragraph. Why this claim and not the other one?”'],
      ['GATHER PROCESS EVIDENCE', 'B07914', 'The plan, the quick-write, the two claims from Tuesday, what they can explain out loud. You built this into the assignment an hour ago.'],
      ['LAND IT AS TEACHING', GOOD, 'First offense: name what was allowed on that assignment, reset, move on. A student who learns the rule beats a student who learns to hide.'],
    ];
    moves.forEach(([badge, c, txt], i) => {
      const y = 1.5 + i * 1.15;
      s.addShape('roundRect', { x: 0.7, y: y + 0.2, w: 2.95, h: 0.42, rectRadius: 0.21, fill: { color: c }, line: { color: c } });
      s.addText(badge, { x: 0.7, y: y + 0.2, w: 2.95, h: 0.42, fontFace: FONT, fontSize: 10.5, bold: true, color: WHITE, align: 'center', valign: 'middle', margin: 0, charSpacing: 0.5 });
      s.addText(txt, { x: 3.9, y, w: 8.75, h: 0.85, fontFace: FONT, fontSize: 17, color: INK, margin: 0, valign: 'middle', lineSpacingMultiple: 1.1 });
    });
    s.addText('Rehearse it now, because the version of you who reads that essay at 9:40 at night is not the calm version.', {
      x: 0.7, y: 6.15, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 17, bold: true, color: NAVY, align: 'center', margin: 0, valign: 'middle' });
    s.addNotes('Say: it will still happen. Work will land on your desk and something about it will feel wrong. Open with curiosity in a normal voice: walk me through how you made this. Get specific about the work, not the accusation. Gather process evidence, which they now have because of what they built in the lab. Land it as teaching on a first offense. Say the reason for rehearsing out loud: the tired version of you is the one who will be reading.');
  }

  // ============================== SLIDE 25 · THE LINE THAT DOES NOT MOVE ==============================
  {
    const s = base(true);
    s.addText('THE ONE RULE THIS ROOM ADOPTS TODAY', { x: 0.9, y: 1.6, w: 8.3, h: 0.5, fontFace: FONT, fontSize: 15, bold: true, color: AMBER, charSpacing: 3, margin: 0 });
    s.addText('No accusation ever rests on\na detector score alone.',
      { x: 0.9, y: 2.25, w: 11.5, h: 1.9, fontFace: FONT, fontSize: 40, bold: true, color: WHITE, margin: 0, lineSpacingMultiple: 1.1 });
    s.addText('Not “mostly.” Not “unless the score is really high.” Alone means alone.',
      { x: 0.9, y: 4.35, w: 11.3, h: 0.5, fontFace: FONT, fontSize: 20, bold: true, color: TEAL, margin: 0 });
    s.addText('26% of AI text caught. 9% of honest work flagged. 61% false positives on real essays by non-native English writers. If a score is the only thing you have, what you have is a conversation to go start, not a case.',
      { x: 0.9, y: 5.0, w: 11.3, h: 1.2, fontFace: FONT, fontSize: 18, color: 'C9D4DE', margin: 0 });
    s.addNotes('Say: one hard line, the only rule I am asking this room to adopt today. No accusation ever rests on a detector score alone. Say it once, plainly, and do not soften it with a joke. Then repeat the three numbers from earlier so the rule is attached to evidence rather than to sentiment.');
  }

  // ============================== SLIDE 26 · WHAT YOU JUST BUILT ==============================
  {
    const s = base();
    kicker(s, 'Twenty minutes ago this did not exist');
    title(s, 'What is on your desk now');
    card(s, 0.7, 1.7, 12.0, 3.6, PAPER);
    s.addText([
      { text: 'A real assignment, with a sentence in it that a chatbot cannot answer, and one line telling students exactly where AI stands.\n\n', options: { bold: true, color: NAVY } },
      { text: 'Multiply that by everyone in this room, then by the next assignment, and by December this building has something no subscription sells: work worth handing in, and students who know what is allowed.', options: { color: INK } },
    ], { x: 1.1, y: 2.0, w: 11.2, h: 3.0, fontFace: FONT, fontSize: 20, margin: 0, valign: 'middle', lineSpacingMultiple: 1.15 });
    strip(s, 5.6, [
      { text: 'Nothing was bought. Nothing was installed. One sentence was written.', options: { bold: true, color: WHITE } },
    ]);
    s.addNotes('Say: look at what is on your desk that was not there twenty minutes ago. A real assignment with a sentence in it a chatbot cannot answer, and one line telling students where AI stands. Multiply it by the room, then by the next assignment. Land it plainly and move to the honest limits; do not oversell here.');
  }

  // ============================== SLIDE 27 · HONEST LIMITS ==============================
  {
    const s = base();
    kicker(s, 'This series does not oversell');
    title(s, 'What this does not fix');
    bullets(s, [
      'One sentence does not rescue an assignment that was already thin',
      'It does not touch the pressure and workload the research points at',
      'Some students will still hand in AI work. Some always did the equivalent.',
      'It costs you something: work anchored to your room has to be read by someone who was in it',
    ], { y: 1.6, h: 3.6, fontSize: 19.5 });
    card(s, 0.7, 4.6, 12.0, 1.2, 'EAF5F3');
    s.addText('You cannot do this to every assignment by Friday. Do it to one. Then the next one.', {
      x: 1.05, y: 4.6, w: 11.3, h: 1.2, fontFace: FONT, fontSize: 19, bold: true, color: NAVY, align: 'center', margin: 0, valign: 'middle' });
    s.addNotes('Say: the honest limits, because this series does not oversell. One sentence does not fix a thin assignment and does not touch the pressure and workload the research points at. Some students will still hand in AI work. Name the real cost too: an assignment anchored to your room does not hand off to a substitute cleanly. Then finish with the scale that is actually achievable: one assignment, then the next one.');
  }

  // ============================== SLIDE 28 · THREE COMMITMENTS ==============================
  {
    const s = base(true);
    s.addText('BEFORE YOU LEAVE', { x: 0.9, y: 1.35, w: 8.3, h: 0.45, fontFace: FONT, fontSize: 15, bold: true, color: AMBER, charSpacing: 3, margin: 0 });
    s.addText('Three commitments', { x: 0.9, y: 1.85, w: 11.5, h: 0.8, fontFace: FONT, fontSize: 38, bold: true, color: WHITE, margin: 0, valign: 'middle' });
    const commits = [
      ['1', 'The assignment I just rebuilt goes out this week, sentence included.'],
      ['2', 'Every assignment I give carries one line about AI, in student words.'],
      ['3', 'I never accuse on a detector score alone. My evidence is process and conversation.'],
    ];
    commits.forEach(([n, txt], i) => {
      const y = 2.95 + i * 1.0;
      s.addShape('ellipse', { x: 0.95, y: y + 0.08, w: 0.55, h: 0.55, fill: { color: TEAL }, line: { color: TEAL } });
      s.addText(n, { x: 0.95, y: y + 0.08, w: 0.55, h: 0.55, fontFace: FONT, fontSize: 20, bold: true, color: WHITE, align: 'center', valign: 'middle', margin: 0 });
      s.addText(txt, { x: 1.75, y, w: 7.6, h: 0.72, fontFace: FONT, fontSize: 20, color: WHITE, margin: 0, valign: 'middle', lineSpacingMultiple: 1.05 });
    });
    s.addText('Nothing to buy, nothing to install. Three agreements, which is what integrity always was.', {
      x: 0.9, y: 6.15, w: 11.3, h: 0.5, fontFace: FONT, fontSize: 17, color: 'C9D4DE', margin: 0, valign: 'middle' });
    s.addNotes('Say: three commitments, same drill as every kit. One, the assignment I just rebuilt goes out this week with the sentence in it. Two, every assignment I give carries one line about AI in student words. Three, I never accuse on a detector score alone. Ask for hands or a nod on each; do not rush the third.');
  }

  // ============================== SLIDE 29 · FIRST 48 HOURS AND EXIT TICKET ==============================
  {
    const s = base();
    kicker(s, 'Two sheets on your way out');
    title(s, 'Your first 48 hours');
    const acts = [
      ['ACTION 1 · 10 min', 'Hand out the assignment you just rebuilt, and read the AI line aloud when you assign it. Sixty seconds is the whole rollout.'],
      ['ACTION 2 · 10 min', 'Pick assignment number two and add its one thing. The second one takes half as long as the first.'],
      ['ACTION 3 · 2 min', 'Put the conversation opener where the tired version of you will find it: inside the gradebook, pinned in your notes app.'],
    ];
    acts.forEach(([t, txt], i) => {
      const y = 1.5 + i * 1.42;
      card(s, 0.7, y, 8.55, 1.28, PAPER);
      s.addText(t, { x: 1.0, y: y + 0.08, w: 3.0, h: 0.3, fontFace: FONT, fontSize: 12, bold: true, color: TEAL, charSpacing: 1.4, margin: 0, valign: 'middle' });
      s.addText(txt, { x: 1.0, y: y + 0.4, w: 8.0, h: 0.8, fontFace: FONT, fontSize: 15.5, color: INK, margin: 0, valign: 'middle', lineSpacingMultiple: 1.1 });
    });
    card(s, 9.55, 1.5, 3.2, 4.06, NAVY);
    s.addText('Exit ticket', { x: 9.85, y: 1.7, w: 2.7, h: 0.4, fontFace: FONT, fontSize: 17, bold: true, color: AMBER, margin: 0 });
    s.addText('Your assignment. The sentence you added. Which of the three places it came from. Your one line about AI.\n\nIt doubles as your PD documentation, and it sets the agenda for the follow-ups, so make it real.', {
      x: 9.85, y: 2.15, w: 2.7, h: 3.2, fontFace: FONT, fontSize: 14, color: WHITE, margin: 0, valign: 'top', lineSpacingMultiple: 1.1 });
    strip(s, 5.8, [
      { text: 'Three actions, none over fifteen minutes. ', options: { bold: true, color: TEAL } },
      { text: 'The difference between a PD hour and a changed classroom.', options: { color: WHITE } },
    ]);
    s.addNotes('Say: two sheets on your way out. First 48 Hours, three actions, none over fifteen minutes: hand out the assignment you just rebuilt and read the AI line aloud, pick assignment number two and add its one thing, and put the conversation opener where you will find it in a hard moment. Then the exit ticket: your assignment, your added sentence, which place it came from, and your one line. Collect the tickets at the door; they double as PD documentation.');
  }

  // ============================== SLIDE 30 · CLOSE ==============================
  {
    const s = base(true);
    s.addText('Nobody in this building is going to win\na detection arms race.', {
      x: 0.9, y: 1.6, w: 11.5, h: 1.7, fontFace: FONT, fontSize: 34, bold: true, color: WHITE, margin: 0, lineSpacingMultiple: 1.15 });
    s.addText('What you can do is ask for the one thing that was only ever available in your room, from your students, in front of you. That is not a workaround. That is the reason a class meets in person at all, and you just wrote it onto an assignment.', {
      x: 0.9, y: 3.5, w: 11.3, h: 1.5, fontFace: FONT, fontSize: 20, color: 'C9D4DE', margin: 0 });
    s.addText('Next: Kit 6 · AI for Communication: Parent Messages, Translation, and Tone', {
      x: 0.9, y: 5.6, w: 11.3, h: 0.5, fontFace: FONT, fontSize: 16, bold: true, color: AMBER, margin: 0 });
    s.addText('Thanks for the hour. Go hand out that sheet.', {
      x: 0.9, y: 6.15, w: 11.3, h: 0.5, fontFace: FONT, fontSize: 18, color: WHITE, margin: 0 });
    s.addNotes('Say: nobody in this building is going to win a detection arms race, and I do not want you to spend another evening trying. What you can do is ask for the one thing that was only ever available in your room. Close warm, then point at the sheet in their hands.');
  }

  const out = path.resolve(__dirname, '../Kit05_PresentationDeck.pptx');
  await p.writeFile({ fileName: out });
  console.log('wrote', out, '·', slideNo, 'slides');
})();
