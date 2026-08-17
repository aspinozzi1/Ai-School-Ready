#!/usr/bin/env node
/* Kit 1 Presentation Deck · AI Foundations & Safety: The One Hard Rule
   Built to kits/DECK_DESIGN.md: assertion headlines (Rule 1), six unmistakable slide
   types (Rule 2), DO NOW slides that state task/time/done (Rule 3), a reading budget
   (Rule 4), a persistent progress rail (Rule 5), and Ms. Rivera on the rail instead of
   in a corner chip (Rule 6). This deck is the reference implementation for Kits 2-20:
   the helpers below (rail, base, assertion, typeTag, card, chatWin, legend, doNowBand,
   doNowSpec, keepCard, answerStrip) are meant to be copied verbatim into the other decks.

   40 slides, locked AI-Ready School brand, speaker notes opening with "Say:" on every slide.
   Build: node kits/kit01/src/deck.js  → kits/kit01/Kit01_PresentationDeck.pptx
   Sync check: DECK_MANIFEST=/tmp/kit01.json node kits/kit01/src/deck.js
   writes {slide, type, headline, rivera} per slide for the facilitator-script checker. */
const pptxgen = require('pptxgenjs');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const NAVY = '13293D', TEAL = '2A9D8F', AMBER = 'F4A825', PAPER = 'F7F5F0',
      INK = '1B1F24', MIST = 'DCE3EA', WHITE = 'FFFFFF', MUTED = '5B6B7A',
      GOOD = '2E7D5B', BAD = 'B4453A',
      DARKCARD = '1E3A50', DARKLINE = '2A4A63', DARKTEXT = 'C9D4DE', DARKMUTED = '9FB2C2',
      RAILOFF = '6E8598';
const FONT = 'Inter';
const W = 13.33, H = 7.5;

/* Rule 5: the rail labels are the facilitator script's segment headings, shortened. */
const SEGMENTS = ['Why now', 'What AI is', 'The one rule', 'Safe practice',
                  'The lab', 'Staying human', 'Close'];

/* Rule 6: Ms. Rivera's running state, one quiet line on the rail. Indexed by slide
   number. null = no line: the title slide, the closing slide, and every SCREEN slide,
   where her full window IS the content and a rail line would only repeat it. */
const RIVERA = {
  2: 'our running example teacher',
  3: 'her students already use it',
  4: 'wants one real task done safely',
  5: 'wondering what it actually does',
  6: 'it predicts, it does not look up',
  7: 'checks anything factual now',
  8: 'her frame: an eager intern',
  9: 'her shortlist: drafts and levels',
  10: 'hers alone: knowing her kids',
  11: 'the rule, memorized',
  12: 'names, IDs, grades, IEPs, all out',
  13: 'asking: could anyone tell who?',
  14: 'her why: FERPA and one text box',
  15: 'every tool is public to her',
  16: 'she never needed a name anyway',
  19: 'three moves, automatic now',
  20: 'waiting while you try it',
  21: 'she scored the same four',
  22: 'her artifact: the newsletter blurb',
  23: 'picks option A: her book fair',
  26: 'pushing back on her blurb',
  27: 'her blurb, two rounds in',
  31: 'her blurb: beige to usable',
  32: 'one invented detail caught',
  33: 'nothing goes out unread',
  34: 'guarding her own voice',
  35: 'adult use only today',
  36: 'she nodded to all three',
  37: 'her next 48: task, drill, share',
  38: 'Kit 1 done, seven to go',
  39: 'filling in her exit ticket',
};

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
  p.title = 'Kit 1: AI Foundations & Safety: The One Hard Rule';

  let n = 0;
  const manifest = [];

  // ---------------------------------------------------------------- helpers ----
  // Rule 5: the progress rail. Always present, always answers "where am I".
  // Rule 6: Ms. Rivera's running state rides the rail instead of a corner chip.
  function rail(s, seg, dark, rivera) {
    const y = H - 0.62, x0 = 0.45, wSeg = 1.12, gap = 0.12;
    SEGMENTS.forEach((label, i) => {
      const on = i === seg;
      const x = x0 + i * (wSeg + gap);
      s.addShape('roundRect', { x, y, w: wSeg, h: 0.1, rectRadius: 0.05,
        fill: { color: on ? TEAL : (dark ? DARKLINE : MIST) },
        line: { color: on ? TEAL : (dark ? DARKLINE : MIST) } });
      s.addText(label.toUpperCase(), { x, y: y + 0.13, w: wSeg, h: 0.22, fontFace: FONT,
        fontSize: 7.5, bold: on, color: on ? TEAL : (dark ? RAILOFF : MUTED),
        charSpacing: 0.6, margin: 0, valign: 'middle' });
    });
    if (rivera) {
      s.addText([
        { text: 'MS. RIVERA  ', options: { bold: true, color: dark ? RAILOFF : MUTED, charSpacing: 1 } },
        { text: rivera, options: { color: dark ? DARKMUTED : MUTED } },
      ], { x: 9.15, y: y + 0.06, w: 2.95, h: 0.3, fontFace: FONT, fontSize: 8.5,
        align: 'right', margin: 0, valign: 'middle' });
    }
  }

  // Every slide: background, brand mark, slide number, kit line, rail.
  function base(type, seg, { dark = false } = {}) {
    const s = p.addSlide();
    n++;
    const rivera = RIVERA[n] || null;
    manifest.push({ slide: n, type, segment: SEGMENTS[seg], rivera });
    s.background = { color: dark ? NAVY : WHITE };
    s.addText('KIT 1 · AI FOUNDATIONS & SAFETY', {
      x: 7.5, y: 0.15, w: 5.2, h: 0.26, fontFace: FONT, fontSize: 8.5,
      color: dark ? RAILOFF : MUTED, charSpacing: 1.2, align: 'right', margin: 0, valign: 'middle' });
    s.addImage({ data: dark ? markDarkPng : markPng, x: 12.18, y: H - 0.55, w: 0.24, h: 0.22 });
    s.addText(String(n), { x: 12.5, y: H - 0.58, w: 0.45, h: 0.28, fontFace: FONT, fontSize: 9,
      color: dark ? RAILOFF : MUTED, align: 'right', margin: 0, valign: 'middle' });
    rail(s, seg, dark, rivera);
    return s;
  }

  // Rule 1: the headline is a complete sentence carrying the claim. If the presenter
  // vanished, this still teaches. Budget: 12 words.
  function assertion(s, txt, dark, opts = {}) {
    manifest[manifest.length - 1].headline = txt;
    s.addText(txt, Object.assign({
      x: 0.6, y: 0.46, w: 12.1, h: 1.05, fontFace: FONT, fontSize: 30, bold: true,
      color: dark ? WHITE : NAVY, margin: 0, valign: 'middle',
    }, opts));
  }
  // Rule 2: the type label. Colour and position are identical on every slide of a type.
  function typeTag(s, label, color) {
    s.addText(label.toUpperCase(), { x: 0.62, y: 0.15, w: 6.6, h: 0.28, fontFace: FONT,
      fontSize: 10, bold: true, color, charSpacing: 2.2, margin: 0, valign: 'middle' });
  }
  function card(s, x, y, w, h, fill = PAPER, line) {
    s.addShape('roundRect', { x, y, w, h, rectRadius: 0.1, fill: { color: fill },
      line: line ? { color: line, width: 1 } : { color: fill } });
  }
  function cardLabel(s, x, y, w, txt, color = MUTED) {
    s.addText(txt.toUpperCase(), { x, y, w, h: 0.3, fontFace: FONT, fontSize: 11, bold: true,
      color, charSpacing: 1.6, margin: 0, valign: 'middle' });
  }

  // DO NOW (Rule 2 + Rule 3). The amber band is the type; the three columns below
  // answer what am I doing / how long / how do I know I am done, in that order.
  function doNowBand(s, task) {
    manifest[manifest.length - 1].headline = task;
    card(s, 0, 0, W, 1.35, AMBER);
    s.addText('DO NOW', { x: 0.62, y: 0.16, w: 4, h: 0.36, fontFace: FONT, fontSize: 13,
      bold: true, color: NAVY, charSpacing: 3, margin: 0, valign: 'middle' });
    s.addText(task, { x: 0.62, y: 0.56, w: 12.1, h: 0.62, fontFace: FONT, fontSize: 28,
      bold: true, color: NAVY, margin: 0, valign: 'middle' });
  }
  function doNowSpec(s, y, what, howLong, done) {
    [['What you do', what], ['How long', howLong], ['Done looks like', done]]
      .forEach(([label, body], i) => {
        const x = 0.6 + i * 4.13;
        card(s, x, y, 3.87, 1.2, PAPER);
        cardLabel(s, x + 0.25, y + 0.1, 3.4, label, TEAL);
        s.addText(body, { x: x + 0.25, y: y + 0.44, w: 3.4, h: 0.68, fontFace: FONT,
          fontSize: 16, color: INK, margin: 0, valign: 'top', lineSpacingMultiple: 1.05 });
      });
  }

  // KEEP: a paper card holding one artifact or commitment, with a teal rule down its edge.
  function keepCard(s, y, h, big, small, { dark = false, fontSize = 26 } = {}) {
    card(s, 0.6, y, 12.1, h, PAPER);
    s.addShape('rect', { x: 0.6, y, w: 0.09, h, fill: { color: TEAL }, line: { color: TEAL } });
    const bigH = h - (small ? 1.05 : 0.5);
    s.addText(big, { x: 1.15, y: y + 0.22, w: 11.0, h: bigH,
      fontFace: FONT, fontSize, bold: true, color: NAVY, margin: 0, valign: 'middle',
      lineSpacingMultiple: 1.08 });
    if (small) {
      s.addText(small, { x: 1.15, y: y + 0.27 + bigH, w: 11.0, h: 0.7, fontFace: FONT,
        fontSize: 17, color: INK, margin: 0, valign: 'top' });
    }
  }

  // ANSWER: a muted strip that closes the task above it, so a solo reader still learns.
  function answerStrip(s, y, txt) {
    card(s, 0.6, y, 12.1, 0.62, PAPER);
    s.addText(txt, { x: 0.95, y, w: 11.4, h: 0.62, fontFace: FONT, fontSize: 15,
      italic: true, color: MUTED, align: 'center', margin: 0, valign: 'middle' });
  }

  // The generic chat window (KIT_STANDARD): navy bar, three dots, no vendor trade dress.
  const RIVERA_WINDOW_LABEL = 'AI chat tool (any of them) · Ms. Rivera, our running example teacher (a composite, not a real person)';
  function chatWin(s, x, y, w, h, label = RIVERA_WINDOW_LABEL) {
    s.addShape('roundRect', { x, y, w, h, rectRadius: 0.1, fill: { color: WHITE }, line: { color: MIST, width: 1.5 } });
    s.addShape('roundRect', { x, y, w, h: 0.42, rectRadius: 0.1, fill: { color: NAVY }, line: { color: NAVY } });
    ['E8837A', AMBER, GOOD].forEach((c, i) => s.addShape('ellipse', { x: x + 0.25 + i * 0.27, y: y + 0.13, w: 0.16, h: 0.16, fill: { color: c }, line: { color: c } }));
    s.addText(label, { x: x + 1.25, y, w: w - 1.4, h: 0.42, fontFace: FONT, fontSize: 11, color: DARKMUTED, margin: 0, valign: 'middle' });
  }
  // Prompt-window rule (owner, 2026-08-14): the paper card ends at x 12.25 while the
  // prompt text runs x 1.95 w 10.05, ending at 12.0. Keep that quarter-inch on both sides.
  function chatPaper(s, y, h, fill = PAPER) {
    s.addShape('roundRect', { x: 1.7, y, w: 10.55, h, rectRadius: 0.12, fill: { color: fill }, line: { color: fill } });
  }
  function legend(s, y) {
    [['ROLE', TEAL], ['TASK', NAVY], ['CONTEXT', 'B07914'], ['FORMAT', GOOD]].forEach(([t, c], i) => {
      const x = 0.7 + i * 3.08;
      s.addShape('roundRect', { x, y, w: 2.85, h: 0.5, rectRadius: 0.25, fill: { color: c }, line: { color: c } });
      s.addText(t, { x, y, w: 2.85, h: 0.5, fontFace: FONT, fontSize: 14, bold: true, color: WHITE, align: 'center', valign: 'middle', margin: 0, charSpacing: 2 });
    });
  }
  // Stat blocks: numbers drawn before captions so no caption merges with a neighbouring
  // number in the PDF text stream (that merge tripped the overlap checker in 2026-08-14).
  function statBig(s, x, w, y, big, color = TEAL, size = 60) {
    s.addText(big, { x, y, w, h: 1.15, fontFace: FONT, fontSize: size, bold: true, color, align: 'center', margin: 0 });
  }
  function statLabel(s, x, w, y, label) {
    s.addText(label, { x: x + 0.22, y, w: w - 0.44, h: 1.5, fontFace: FONT, fontSize: 16, color: INK, align: 'center', valign: 'top', margin: 0 });
  }
  function takeaway(s, y, txt, opts = {}) {
    s.addText(txt, Object.assign({ x: 0.6, y, w: 12.1, h: 0.5, fontFace: FONT, fontSize: 18,
      bold: true, color: NAVY, align: 'center', margin: 0, valign: 'middle' }, opts));
  }

  /* ==================== SEGMENT 1 · WELCOME & WHY NOW (rail 0) ==================== */

  // -------------------------------------------------- 1 · ORIENT · title --------
  {
    const s = base('ORIENT', 0, { dark: true });
    manifest[manifest.length - 1].headline = 'AI Foundations & Safety: The One Hard Rule';
    s.addImage({ data: markDarkPng, x: 0.85, y: 0.75, w: 1.15, h: 1.06 });
    s.addText([
      { text: 'AI-Ready', options: { color: TEAL, bold: true } },
      { text: ' School', options: { color: WHITE, bold: true } },
    ], { x: 2.15, y: 1.0, w: 4, h: 0.6, fontFace: FONT, fontSize: 26, margin: 0, valign: 'middle' });
    s.addText('TRACK A · AI FOUNDATIONS · KIT 1 OF 20', {
      x: 0.9, y: 2.85, w: 9, h: 0.4, fontFace: FONT, fontSize: 15, bold: true,
      color: AMBER, charSpacing: 3, margin: 0 });
    s.addText('AI Foundations & Safety:\nThe One Hard Rule', {
      x: 0.85, y: 3.2, w: 11.6, h: 2.0, fontFace: FONT, fontSize: 47, bold: true,
      color: WHITE, margin: 0, valign: 'middle', lineSpacingMultiple: 1.05 });
    s.addText('In the next hour you will use an AI tool with your own hands and learn the one rule that keeps students safe.', {
      x: 0.9, y: 5.3, w: 11.2, h: 0.55, fontFace: FONT, fontSize: 18, color: DARKTEXT, margin: 0 });
    s.addText('A 45–60 minute working session for the whole staff, with 15 minutes hands-on. Built by Adam & Katelyn Spinozzi · certified educators.', {
      x: 0.9, y: 6.05, w: 11.4, h: 0.4, fontFace: FONT, fontSize: 12, color: DARKMUTED, margin: 0 });
    s.addNotes('Say: "Welcome, everyone. Today we are doing something a little different: an hour on AI, what it actually is, what it is genuinely useful for in our jobs, and the one rule every one of us needs to follow to use it safely." Have this slide up as people arrive; start on time. The full word-for-word text is in the Facilitator Script, keyed to every slide number.');
  }

  // ------------------------------------------- 2 · ORIENT · two promises --------
  {
    const s = base('ORIENT', 0, { dark: true });
    typeTag(s, 'Segment 1 of 7  ·  4 minutes', AMBER);
    assertion(s, 'This hour is not a sales pitch and not a scare session', true);
    card(s, 0.6, 2.0, 5.9, 3.9, DARKCARD);
    cardLabel(s, 0.95, 2.25, 5.2, 'This session is NOT', 'E8837A');
    ['A sales pitch for AI', 'A scare session', 'A prediction that robots replace teachers'].forEach((t, i) => {
      s.addText(t, { x: 0.95, y: 2.75 + i * 1.0, w: 5.2, h: 0.9, fontFace: FONT, fontSize: 19,
        color: DARKTEXT, margin: 0, valign: 'top', lineSpacingMultiple: 1.1 });
    });
    card(s, 6.8, 2.0, 5.9, 3.9, DARKCARD);
    cardLabel(s, 7.15, 2.25, 5.2, 'It IS', '7FD1BE');
    ['A clear picture of what these tools are', 'The one rule that keeps everyone safe', 'Fifteen minutes of actually using AI'].forEach((t, i) => {
      s.addText(t, { x: 7.15, y: 2.75 + i * 1.0, w: 5.2, h: 0.9, fontFace: FONT, fontSize: 19,
        color: WHITE, margin: 0, valign: 'top', lineSpacingMultiple: 1.1 });
    });
    s.addText('AI drafts. The teacher decides.', { x: 0.6, y: 6.05, w: 12.1, h: 0.5, fontFace: FONT,
      fontSize: 20, bold: true, color: TEAL, align: 'center', margin: 0, valign: 'middle' });
    s.addNotes('Say: two promises before we start. First, this is not a sales pitch: some of the most important people in this room are the skeptics, and today will give you better reasons for your skepticism, not fewer. Second, this is not a scare session. AI is a tool. It can take over some of the robotic parts of this job, the reformatting, the first drafts, the paperwork. It cannot do the human parts: knowing your kids, building relationships, deciding what good work looks like.');
  }

  // ---------------------------------------------- 3 · CLAIM · why now -----------
  {
    const s = base('CLAIM', 0);
    typeTag(s, 'Claim', TEAL);
    assertion(s, 'Teacher AI use doubled in a single school year');
    [0.6, 4.63, 8.66].forEach((x) => card(s, x, 1.75, 3.87, 3.55, PAPER));
    s.addText([
      { text: '25%', options: { color: MUTED } },
      { text: ' → ', options: { color: TEAL } },
      { text: '53%', options: { color: NAVY } },
    ], { x: 0.6, y: 2.0, w: 3.87, h: 1.15, fontFace: FONT, fontSize: 38, bold: true, align: 'center', margin: 0, valign: 'middle' });
    statBig(s, 4.63, 3.87, 2.0, '60%', TEAL);
    statBig(s, 8.66, 3.87, 2.0, '54%', AMBER);
    statLabel(s, 0.6, 3.87, 3.4, 'of teachers used AI for work,\n2023–24 vs. 2024–25\n(RAND)');
    statLabel(s, 4.63, 3.87, 3.4, 'of teachers used AI during\nthe 2024–25 school year\n(Gallup & Walton Family Fdn.)');
    statLabel(s, 8.66, 3.87, 3.4, 'of U.S. teens already use AI\nfor schoolwork\n(Pew, 2026)');
    takeaway(s, 5.65, 'AI is already in our building, whatever we decide in this room.');
    s.addNotes('Say: three numbers explain why we are spending an hour on this. In 2023–24, about one in four U.S. teachers used AI for their work. One year later RAND and Gallup both found it had roughly doubled. And over half of American teens already use AI for schoolwork. Optional show of hands first: who has used ChatGPT or similar at least once? Sources: RAND RR-A134-25, RAND RR-A4180-1, Gallup-Walton 2025, Pew 2026, all in the References file.');
  }

  // ------------------------------------------------ 4 · ORIENT · agenda ---------
  {
    const s = base('ORIENT', 0, { dark: true });
    typeTag(s, 'The hour ahead', AMBER);
    assertion(s, 'Here is the hour, and the promise it comes with', true);
    const rows = [
      ['0:00', 'Welcome & why now'],
      ['0:04', 'What AI actually is (no jargon)'],
      ['0:12', 'The One Hard Rule: student privacy'],
      ['0:22', 'Safe practice: rewriting risky prompts'],
      ['0:30', 'Hands-on lab: you type, in pairs'],
      ['0:45', 'Staying human · our three commitments'],
      ['0:52', 'First 48 hours & exit ticket'],
    ];
    rows.forEach(([t, txt], i) => {
      const y = 1.75 + i * 0.66;
      s.addText(t, { x: 0.75, y, w: 1.1, h: 0.5, fontFace: FONT, fontSize: 19, bold: true, color: TEAL, margin: 0, valign: 'middle' });
      s.addText(txt, { x: 1.95, y, w: 7.5, h: 0.5, fontFace: FONT, fontSize: 19, color: WHITE, margin: 0, valign: 'middle' });
    });
    card(s, 9.75, 2.4, 2.95, 2.9, DARKCARD);
    cardLabel(s, 10.05, 2.65, 2.4, 'One promise', AMBER);
    s.addText('You will actually use an AI tool today, and leave with something for tomorrow morning.', {
      x: 10.05, y: 3.1, w: 2.4, h: 2.0, fontFace: FONT, fontSize: 15, color: WHITE, margin: 0, valign: 'top', lineSpacingMultiple: 1.1 });
    s.addNotes('Say: here is the hour. What these tools actually are, then the one hard rule about student privacy, then you practice telling safe prompts from unsafe ones, then fifteen minutes hands-on, then what we commit to as a school. Research point (Darling-Hammond et al., Learning Policy Institute 2017): PD changes practice when it includes active learning and sustained follow-up, which is why there is a lab and a 30-day plan. This is not a one-and-done.');
  }

  /* ==================== SEGMENT 2 · WHAT AI ACTUALLY IS (rail 1) ==================== */

  // ------------------------------------- 5 · ORIENT · segment 2 opener ----------
  {
    const s = base('ORIENT', 1, { dark: true });
    typeTag(s, 'Segment 2 of 7  ·  8 minutes', AMBER);
    assertion(s, 'Next: what a chatbot is actually doing when it answers you', true);
    s.addText('You will leave this segment able to say, in one sentence, why a confident answer can still be wrong.', {
      x: 0.6, y: 2.4, w: 9.6, h: 0.9, fontFace: FONT, fontSize: 19, color: DARKMUTED, margin: 0, lineSpacingMultiple: 1.2 });
    [['1', 'What it does'], ['2', 'What it cannot do'], ['3', 'The frame that follows']].forEach(([num, label], i) => {
      const x = 0.6 + i * 4.13;
      card(s, x, 3.85, 3.87, 1.5, DARKCARD);
      s.addText(num, { x: x + 0.3, y: 4.1, w: 0.5, h: 0.5, fontFace: FONT, fontSize: 22, bold: true, color: TEAL, margin: 0 });
      s.addText(label, { x: x + 0.95, y: 4.1, w: 2.7, h: 0.9, fontFace: FONT, fontSize: 17, color: WHITE, margin: 0, valign: 'middle' });
    });
    s.addNotes('Say: let us demystify the thing. Three beats in this segment, and by the end you will be able to state for yourself why a confident answer can still be wrong. Keep the pace up here; the payoff is the eager-intern frame at the end of the segment.');
  }

  // --------------------------------- 6 · CLAIM · it predicts next words ---------
  {
    const s = base('CLAIM', 1);
    typeTag(s, 'Claim', TEAL);
    assertion(s, 'A chatbot predicts words, it does not look anything up');
    card(s, 0.6, 1.85, 12.1, 2.5, PAPER);
    cardLabel(s, 0.95, 2.1, 6.0, 'What it is doing');
    s.addText('It predicts likely next words.', {
      x: 0.95, y: 2.5, w: 11.4, h: 0.65, fontFace: FONT, fontSize: 30, bold: true, color: NAVY, margin: 0, valign: 'middle' });
    s.addText('Not a database. Not a search engine. A pattern-continuation machine, trained on enormous amounts of text.', {
      x: 0.95, y: 3.25, w: 11.4, h: 0.95, fontFace: FONT, fontSize: 20, color: INK, margin: 0, valign: 'top', lineSpacingMultiple: 1.15 });
    card(s, 0.6, 4.7, 12.1, 1.05, NAVY);
    s.addText('That one fact explains both the fluency and the failures.', {
      x: 0.95, y: 4.7, w: 11.4, h: 1.05, fontFace: FONT, fontSize: 22, bold: true, color: WHITE, align: 'center', margin: 0, valign: 'middle' });
    s.addNotes('Say: when you type into ChatGPT, Claude, Gemini or Copilot, you are not searching a database of facts. These tools were built by reading enormous amounts of text, and what they learned is patterns: given these words, what words are likely to come next. That is the whole trick. It is why the writing sounds so fluent, fluent is exactly what it was trained to produce, and it is why it can be confidently, smoothly wrong: it is not checking facts, it is continuing a pattern.');
  }

  // ----------------------------------- 7 · CLAIM · confidently wrong ------------
  {
    const s = base('CLAIM', 1);
    typeTag(s, 'Claim · peer-reviewed evidence', TEAL);
    assertion(s, 'One in five AI citations in a 2025 test did not exist');
    card(s, 0.6, 1.85, 5.95, 3.6, PAPER);
    statBig(s, 0.6, 5.95, 2.15, '19.9%', BAD);
    statLabel(s, 0.6, 5.95, 3.55, 'of citations a leading AI model\nproduced were entirely fabricated.\nThe papers did not exist.');
    card(s, 6.75, 1.85, 5.95, 3.6, PAPER);
    statBig(s, 6.75, 5.95, 2.15, '45.4%', AMBER);
    statLabel(s, 6.75, 5.95, 3.55, 'of the real citations still\ncontained errors. Every one\nlooked perfect on the page.');
    card(s, 0.6, 5.7, 12.1, 0.85, 'FBEFED');
    s.addText('The habit that follows: verify anything factual before you rely on it.', {
      x: 0.95, y: 5.7, w: 11.4, h: 0.85, fontFace: FONT, fontSize: 20, bold: true, color: NAVY, align: 'center', margin: 0, valign: 'middle' });
    s.addNotes('Say: here is how wrong it can be while sounding right. In a peer-reviewed study, researchers asked a leading AI model to write literature reviews with citations. Nearly twenty percent of the citations were completely made up; the papers did not exist. Of the ones that were real, almost half contained errors. Source: Linardon et al., JMIR Mental Health (2025), the GPT-4o literature-review test. This is called hallucination, and it is a side effect of prediction, not a bug about to be fixed. If asked "why use it at all?": most classroom uses are not factual lookup, they are drafting and reformatting, where you are the fact-checker by definition.');
  }

  // -------------------------------------- 8 · KEEP · the eager intern -----------
  {
    const s = base('KEEP', 1);
    typeTag(s, 'Keep this', TEAL);
    assertion(s, 'AI is an eager intern and you are the professional in charge');
    keepCard(s, 1.85, 2.35, 'AI drafts. The teacher decides.',
      'Fast, tireless, desperate to please, and it will make things up rather than admit it does not know.', { fontSize: 34 });
    [['Never', 'meets your students unsupervised'], ['Never', 'sends unread work home'], ['Always', 'works because a professional is in charge']].forEach(([k, v], i) => {
      const x = 0.6 + i * 4.13;
      card(s, x, 4.55, 3.87, 1.55, PAPER);
      cardLabel(s, x + 0.25, 4.68, 3.4, k, k === 'Always' ? GOOD : BAD);
      s.addText(v, { x: x + 0.25, y: 5.02, w: 3.4, h: 0.95, fontFace: FONT, fontSize: 16, color: INK, margin: 0, valign: 'top', lineSpacingMultiple: 1.1 });
    });
    s.addNotes('Say: the most useful way to hold all this in your head is that AI is an eager intern. Fast, tireless, surprisingly capable, desperate to please, and it will absolutely make things up rather than admit it does not know. You would never let an intern send a parent email unread, grade without review, or meet your students unsupervised. Same intern, same rules. And notice what that makes you: the intern only works because there is a professional in charge. That five-word posture is the spine of the whole series.');
  }

  // ------------------------------------ 9 · CLAIM · what it is good at ----------
  {
    const s = base('CLAIM', 1);
    typeTag(s, 'Claim', TEAL);
    assertion(s, 'Four kinds of work are where the intern earns its keep');
    [['First drafts', 'Newsletters, emails, letters home'],
     ['Differentiation', 'One passage, three reading levels'],
     ['Assessment scaffolds', 'Notes into rubrics and word banks'],
     ['Reformatting', 'The same content as a quiz or a table']].forEach(([h, b], i) => {
      const x = 0.6 + (i % 2) * 6.17, y = 1.85 + Math.floor(i / 2) * 1.95;
      card(s, x, y, 5.93, 1.75, PAPER);
      s.addText(h, { x: x + 0.3, y: y + 0.2, w: 5.3, h: 0.45, fontFace: FONT, fontSize: 20, bold: true, color: NAVY, margin: 0, valign: 'middle' });
      s.addText(b, { x: x + 0.3, y: y + 0.75, w: 5.3, h: 0.85, fontFace: FONT, fontSize: 17, color: INK, margin: 0, valign: 'top' });
    });
    card(s, 0.6, 5.75, 12.1, 0.85, 'EAF5F3');
    s.addText('Weekly users report saving about 5.9 hours a week (Gallup & Walton, 2025).', {
      x: 0.95, y: 5.75, w: 11.4, h: 0.85, fontFace: FONT, fontSize: 18, bold: true, color: NAVY, align: 'center', margin: 0, valign: 'middle' });
    s.addNotes('Say: so what is the intern good for? The pattern-matching work. First drafts of parent newsletters and routine emails. One lesson you already like, turned into three reading levels. Your notes, turned into a rubric or a word bank. Reformatting: the same content as a table, a quiz, a station card. In the 2025 Gallup-Walton study, teachers who used AI weekly reported saving nearly six hours a week. That is the paperwork part of the job, not the teaching part.');
  }

  // ------------------------------------ 10 · CLAIM · what it cannot do ----------
  {
    const s = base('CLAIM', 1);
    typeTag(s, 'Claim', TEAL);
    assertion(s, 'Knowing your kids, checking facts and caring stay yours');
    [['Know your students', 'This class shuts down after lunch. This kid needs a win today.'],
     ['Verify its own facts', 'That is you. It has no way to check what it produced.'],
     ['Care', 'It produces text, not judgment, and not relationships.']].forEach(([h, b], i) => {
      const x = 0.6 + i * 4.13;
      card(s, x, 1.85, 3.87, 2.75, PAPER);
      s.addText(h, { x: x + 0.28, y: 2.05, w: 3.35, h: 0.75, fontFace: FONT, fontSize: 20, bold: true, color: NAVY, margin: 0, valign: 'top', lineSpacingMultiple: 1.05 });
      s.addText(b, { x: x + 0.28, y: 2.95, w: 3.35, h: 1.5, fontFace: FONT, fontSize: 16, color: INK, margin: 0, valign: 'top', lineSpacingMultiple: 1.15 });
    });
    card(s, 0.6, 4.95, 12.1, 1.5, 'EAF5F3');
    s.addText('The tool buys back time for this list. It never takes this list away.', {
      x: 0.95, y: 4.95, w: 11.4, h: 1.5, fontFace: FONT, fontSize: 24, bold: true, color: NAVY, align: 'center', margin: 0, valign: 'middle' });
    s.addNotes('Say: here is what the intern cannot do, at any price. It has never met your students. It does not know that this class shuts down after lunch, that this kid just moved here, that this one will rise to a challenge and that one needs a win today. It cannot verify its own facts. And it does not care; it produces text, not judgment, and not relationships. Everything on this slide is your job on purpose. Land it plainly and move on.');
  }

  /* ==================== SEGMENT 3 · THE ONE HARD RULE (rail 2) ==================== */

  // ------------------------------------- 11 · KEEP · the one hard rule ----------
  {
    const s = base('KEEP', 2, { dark: true });
    typeTag(s, 'Keep this  ·  the one hard rule', AMBER);
    assertion(s, 'Never put student personally identifiable information into a public AI tool', true,
      { y: 0.5, h: 1.5, fontSize: 34, w: 12.1 });
    card(s, 0.6, 2.35, 12.1, 2.4, PAPER);
    s.addShape('rect', { x: 0.6, y: 2.35, w: 0.09, h: 2.4, fill: { color: AMBER }, line: { color: AMBER } });
    s.addText('Not a name. Not a detail that could identify a child. Ever.', {
      x: 1.15, y: 2.6, w: 11.0, h: 1.0, fontFace: FONT, fontSize: 30, bold: true, color: NAVY, margin: 0, valign: 'middle' });
    s.addText('If you remember one sentence from this hour, it is the one above.', {
      x: 1.15, y: 3.75, w: 11.0, h: 0.75, fontFace: FONT, fontSize: 19, color: INK, margin: 0, valign: 'top' });
    s.addText('Every other AI choice is a judgment call you are qualified to make. This one is not a judgment call. It is the line.', {
      x: 0.6, y: 5.15, w: 12.1, h: 0.9, fontFace: FONT, fontSize: 18, color: DARKTEXT, align: 'center', margin: 0, valign: 'middle' });
    s.addNotes('Say: everything so far was orientation. This is the part that keeps you safe. "Never put student personally identifiable information into a public AI tool. Not a name. Not a detail that could identify a child. Ever." Read the rule off the screen, then pause a full three seconds. This is the most important slide of the session.');
  }

  // ----------------------------------- 12 · CLAIM · what counts as PII ---------
  {
    const s = base('CLAIM', 2);
    typeTag(s, 'Claim', TEAL);
    assertion(s, 'Anything from a record or about one child counts as PII');
    card(s, 0.6, 1.85, 5.95, 4.05, PAPER);
    cardLabel(s, 0.95, 2.05, 5.2, 'From records', NAVY);
    ['Names, initials, photos', 'Student ID numbers', 'Grades and test scores', 'IEP or 504 contents'].forEach((t, i) => {
      s.addText(t, { x: 0.95, y: 2.6 + i * 0.78, w: 5.2, h: 0.65, fontFace: FONT, fontSize: 19, color: INK, margin: 0, valign: 'middle' });
    });
    card(s, 6.75, 1.85, 5.95, 4.05, PAPER);
    cardLabel(s, 7.1, 2.05, 5.2, 'About a child', NAVY);
    ['Discipline history', 'Health or diagnosis information', 'Family details, addresses', 'Anything about an identifiable student'].forEach((t, i) => {
      s.addText(t, { x: 7.1, y: 2.6 + i * 0.78, w: 5.2, h: 0.65, fontFace: FONT, fontSize: 19, color: INK, margin: 0, valign: 'middle' });
    });
    takeaway(s, 6.1, 'If it is about an identifiable student, it stays out of the chat box.');
    s.addNotes('Say: so what counts? The obvious things: names, photos, student ID numbers, grades, addresses, family information. But also anything from a record or about a specific child: IEP contents, accommodations, discipline history, health information, test scores attached to a kid. If it is about an identifiable student, it stays out of the chat box.');
  }

  // ------------------------------ 13 · CLAIM · initials still identify ---------
  {
    const s = base('CLAIM', 2);
    typeTag(s, 'Claim · where well-meaning people slip', TEAL);
    assertion(s, 'Initials plus context still identify a child');
    [['“J.M. in my 3rd period with the anxiety diagnosis”', 'Initials plus context'],
     ['“The only 7th grader who uses a wheelchair”', 'One-of-a-kind detail'],
     ['“The new student who just arrived from Ukraine”', 'Rare circumstance']].forEach(([q, why], i) => {
      const y = 1.85 + i * 1.28;
      card(s, 0.6, y, 8.4, 1.1, PAPER);
      s.addText(q, { x: 0.95, y, w: 7.8, h: 1.1, fontFace: FONT, fontSize: 18, italic: true, color: INK, margin: 0, valign: 'middle' });
      card(s, 9.25, y, 3.45, 1.1, 'FBEFED');
      s.addText(why, { x: 9.5, y, w: 3.0, h: 1.1, fontFace: FONT, fontSize: 15, bold: true, color: BAD, margin: 0, valign: 'middle' });
    });
    card(s, 0.6, 5.8, 12.1, 0.85, NAVY);
    s.addText('The test: could someone who knows our school work out who this is?',
      { x: 0.95, y: 5.8, w: 11.4, h: 0.85, fontFace: FONT, fontSize: 20, bold: true, color: WHITE, align: 'center', margin: 0, valign: 'middle' });
    s.addNotes('Say: here is where well-meaning people slip. The sneaky ones are not names, they are details that only fit one child. Initials plus context: in a school our size, that is identifiable. Rare details do it too: the only seventh grader who uses a wheelchair, the new student from Ukraine. You did not type a name, but you identified a child. The test is not "did I use a name?" The test is: could anyone who knows our school figure out who this is? If yes, it does not go in. If asked "even in a private chat that I delete?": yes. Deleting your view does not recall what the company received.');
  }

  // ------------------------------------ 14 · CLAIM · why the rule exists -------
  {
    const s = base('CLAIM', 2);
    typeTag(s, 'Claim', TEAL);
    assertion(s, 'FERPA and an easy text box are why this rule exists');
    card(s, 0.6, 1.85, 5.95, 3.7, PAPER);
    cardLabel(s, 0.95, 2.05, 5.2, 'Legal', NAVY);
    s.addText('FERPA protects student education records.', {
      x: 0.95, y: 2.55, w: 5.2, h: 1.0, fontFace: FONT, fontSize: 21, bold: true, color: INK, margin: 0, valign: 'top', lineSpacingMultiple: 1.1 });
    s.addText('A public AI tool is a third party with no agreement with our district.', {
      x: 0.95, y: 3.75, w: 5.2, h: 1.5, fontFace: FONT, fontSize: 17, color: INK, margin: 0, valign: 'top', lineSpacingMultiple: 1.15 });
    card(s, 6.75, 1.85, 5.95, 3.7, PAPER);
    cardLabel(s, 7.1, 2.05, 5.2, 'Practical', NAVY);
    s.addText('An open chat box makes oversharing effortless.', {
      x: 7.1, y: 2.55, w: 5.2, h: 1.0, fontFace: FONT, fontSize: 21, bold: true, color: INK, margin: 0, valign: 'top', lineSpacingMultiple: 1.1 });
    s.addText('Nobody wants to be the example in the district’s cautionary email.', {
      x: 7.1, y: 3.75, w: 5.2, h: 1.5, fontFace: FONT, fontSize: 17, color: INK, margin: 0, valign: 'top', lineSpacingMultiple: 1.15 });
    s.addText('Educators sharing safe practice, not legal advice. District-specific questions go to the district office.', {
      x: 0.6, y: 5.85, w: 12.1, h: 0.8, fontFace: FONT, fontSize: 14, italic: true, color: MUTED, align: 'center', margin: 0, valign: 'middle' });
    s.addNotes('Say: two reasons, one legal and one practical. Legal: federal law, FERPA, protects student education records, and schools are responsible for how information from those records is shared. A public AI tool is a third party with no agreement with our district, and where typed data goes depends on terms of service that change without asking us. Practical: privacy researchers, including the Future of Privacy Forum, flag exactly this, an open chat box makes oversharing effortless. And you personally never want to be the example in the district’s cautionary email. Keep the not-legal-advice line verbatim.');
  }

  // -------------------------- 15 · CLAIM · public vs district-approved ---------
  {
    const s = base('CLAIM', 2);
    typeTag(s, 'Claim · so the rule does not overreach', TEAL);
    assertion(s, 'Every tool is public until the district says otherwise');
    card(s, 0.6, 1.85, 5.95, 3.9, 'FBEFED');
    cardLabel(s, 0.95, 2.05, 5.2, 'Public tool', BAD);
    s.addText('Anything you signed up for yourself: free ChatGPT, Claude, Gemini, personal accounts.', {
      x: 0.95, y: 2.55, w: 5.2, h: 1.8, fontFace: FONT, fontSize: 19, color: INK, margin: 0, valign: 'top', lineSpacingMultiple: 1.15 });
    s.addText('The rule always applies.', {
      x: 0.95, y: 4.6, w: 5.2, h: 0.7, fontFace: FONT, fontSize: 20, bold: true, color: BAD, margin: 0, valign: 'middle' });
    card(s, 6.75, 1.85, 5.95, 3.9, 'EAF5F3');
    cardLabel(s, 7.1, 2.05, 5.2, 'District-approved tool', GOOD);
    s.addText('Vetted by the district, with a signed student-data agreement.', {
      x: 7.1, y: 2.55, w: 5.2, h: 1.8, fontFace: FONT, fontSize: 19, color: INK, margin: 0, valign: 'top', lineSpacingMultiple: 1.15 });
    s.addText('You will be told explicitly when that changes.', {
      x: 7.1, y: 4.6, w: 5.2, h: 0.7, fontFace: FONT, fontSize: 20, bold: true, color: GOOD, margin: 0, valign: 'middle' });
    takeaway(s, 5.95, 'Until you are told otherwise, treat every tool as a public tool.');
    s.addNotes('Say: one distinction, so this rule does not overreach. A public AI tool is anything you signed up for yourself: free ChatGPT, Claude, Gemini, your personal accounts. An approved tool is one our district has vetted and signed a data agreement for. If the district formally adopts an education AI platform with student-data protections, that changes what is allowed on that platform, and you will be told explicitly. Until you are told: every tool is a public tool, and the rule applies. If your district has already approved a tool, name it here.');
  }

  // ------------------------------------- 16 · CLAIM · the good news ------------
  {
    const s = base('CLAIM', 2);
    typeTag(s, 'Claim · and now the good news', TEAL);
    assertion(s, 'AI never needed a student’s identity anyway');
    s.addText('Almost everything AI is useful for needs no student identity at all.', {
      x: 0.6, y: 1.8, w: 12.1, h: 0.7, fontFace: FONT, fontSize: 23, color: INK, margin: 0, valign: 'middle' });
    card(s, 0.6, 2.75, 12.1, 1.4, 'EAF5F3');
    s.addText([
      { text: 'You need:   ', options: { bold: true, color: GOOD } },
      { text: '“a 4th grader reading below grade level”', options: { color: INK } },
    ], { x: 1.0, y: 2.75, w: 11.3, h: 1.4, fontFace: FONT, fontSize: 26, margin: 0, valign: 'middle' });
    card(s, 0.6, 4.35, 12.1, 1.4, 'FBEFED');
    s.addText([
      { text: 'You never need:   ', options: { bold: true, color: BAD } },
      { text: '“Marcus Chen”', options: { color: INK } },
    ], { x: 1.0, y: 4.35, w: 11.3, h: 1.4, fontFace: FONT, fontSize: 26, margin: 0, valign: 'middle' });
    takeaway(s, 6.0, 'Next: the ten-second skill that makes this automatic.', { fontSize: 17, italic: true, bold: false, color: MUTED });
    s.addNotes('Say: now the good news, and it is genuinely good. The rule barely costs you anything, because almost everything AI is useful for does not need student identities at all. You need "a 4th grader reading below grade level," never "Marcus Chen." Which brings us to the skill that makes this easy. Keep this one quick.');
  }

  /* ==================== SEGMENT 4 · SAFE PRACTICE (rail 3) ==================== */

  // ------------------------------- 17 · SCREEN · safe swap 1, the email --------
  {
    const s = base('SCREEN', 3);
    typeTag(s, 'On Ms. Rivera’s screen', 'B07914');
    assertion(s, 'The AI needed the situation, never the child');
    chatWin(s, 0.7, 1.6, 12.0, 4.55);
    chatPaper(s, 2.2, 1.5, 'FBEFED');
    s.addText('WHAT SHE ALMOST TYPED · UNSAFE', { x: 1.95, y: 2.3, w: 10.05, h: 0.3, fontFace: FONT, fontSize: 11.5, bold: true, color: BAD, charSpacing: 1.5, margin: 0 });
    s.addText('“Write an email to Jayden Miller’s mom about his three missing assignments and his outburst in class Tuesday.”', {
      x: 1.95, y: 2.62, w: 10.05, h: 1.0, fontFace: FONT, fontSize: 17, italic: true, color: INK, margin: 0, valign: 'top', lineSpacingMultiple: 1.1 });
    chatPaper(s, 3.9, 2.05, 'EAF5F3');
    s.addText('WHAT SHE SENT · SAFE', { x: 1.95, y: 4.0, w: 10.05, h: 0.3, fontFace: FONT, fontSize: 11.5, bold: true, color: GOOD, charSpacing: 1.5, margin: 0 });
    s.addText('“Write a warm, professional email to a parent about a middle schooler with several missing assignments and a recent difficult day in class. Firm but supportive; end by inviting a conversation.”', {
      x: 1.95, y: 4.32, w: 10.05, h: 1.55, fontFace: FONT, fontSize: 17, italic: true, color: INK, margin: 0, valign: 'top', lineSpacingMultiple: 1.1 });
    takeaway(s, 6.3, 'Same email out the other end. She adds the name back in her own inbox.');
    s.addNotes('Say: this is Ms. Rivera, our running example teacher, a composite, and her screen shows what this looks like on your end. The unsafe version pastes a full student record, name, family, academics, behavior, into a stranger’s text box. The safe version gets the same email; the AI needed the situation, never the child. She adds the name after it is back in her own email account.');
  }

  // ------------------------- 18 · SCREEN · safe swap 2, differentiation --------
  {
    const s = base('SCREEN', 3);
    typeTag(s, 'On Ms. Rivera’s screen', 'B07914');
    assertion(s, 'It never needed the diagnosis, only the reading level');
    chatWin(s, 0.7, 1.6, 12.0, 4.55);
    chatPaper(s, 2.2, 1.45, 'FBEFED');
    s.addText('UNSAFE', { x: 1.95, y: 2.3, w: 10.05, h: 0.3, fontFace: FONT, fontSize: 11.5, bold: true, color: BAD, charSpacing: 1.5, margin: 0 });
    s.addText('“Rewrite this passage for Sofia R., who has a reading IEP with a 2nd-grade fluency goal.”', {
      x: 1.95, y: 2.62, w: 10.05, h: 0.95, fontFace: FONT, fontSize: 18, italic: true, color: INK, margin: 0, valign: 'top', lineSpacingMultiple: 1.1 });
    chatPaper(s, 3.85, 2.1, 'EAF5F3');
    s.addText('SAFE, AND A BETTER PROMPT', { x: 1.95, y: 3.95, w: 10.05, h: 0.3, fontFace: FONT, fontSize: 11.5, bold: true, color: GOOD, charSpacing: 1.5, margin: 0 });
    s.addText('“Rewrite this passage at a 2nd-grade reading level, same key ideas, shorter sentences, and add a five-word picture-supported vocabulary list.”', {
      x: 1.95, y: 4.28, w: 10.05, h: 1.6, fontFace: FONT, fontSize: 18, italic: true, color: INK, margin: 0, valign: 'top', lineSpacingMultiple: 1.1 });
    takeaway(s, 6.3, 'Safer and more useful is the usual trade.');
    s.addNotes('Say: again, with planning. Unsafe: "Rewrite this passage for Sofia R., who has a reading IEP with a 2nd-grade fluency goal." Safe: "Rewrite this passage at a 2nd-grade reading level, same key ideas, shorter sentences, and add a five-word picture-supported vocabulary list." Notice the safe version is also just a better prompt: more specific about what you actually want. The AI never needed the diagnosis, it needed the reading level and the format.');
  }

  // ------------------------------------- 19 · CLAIM · the three moves ----------
  {
    const s = base('CLAIM', 3);
    typeTag(s, 'Claim', TEAL);
    assertion(s, 'Three moves de-identify any school prompt in ten seconds');
    [['1', 'Strip identity', 'No names, no initials, no one-of-a-kind details'],
     ['2', 'Generalize', '“A 7th grader.” “Several students.” “A parent.”'],
     ['3', 'Describe the need', 'Reading level, behavior pattern, the scaffold you want']].forEach(([num, h, b], i) => {
      const x = 0.6 + i * 4.13;
      card(s, x, 1.85, 3.87, 3.85, PAPER);
      s.addShape('ellipse', { x: x + 1.44, y: 2.15, w: 1.0, h: 1.0, fill: { color: TEAL }, line: { color: TEAL } });
      s.addText(num, { x: x + 1.44, y: 2.15, w: 1.0, h: 1.0, fontFace: FONT, fontSize: 30, bold: true, color: WHITE, align: 'center', valign: 'middle', margin: 0 });
      s.addText(h, { x: x + 0.25, y: 3.4, w: 3.4, h: 0.75, fontFace: FONT, fontSize: 19, bold: true, color: NAVY, align: 'center', margin: 0, valign: 'top' });
      s.addText(b, { x: x + 0.25, y: 4.2, w: 3.4, h: 1.35, fontFace: FONT, fontSize: 16, color: INK, align: 'center', margin: 0, valign: 'top', lineSpacingMultiple: 1.15 });
    });
    takeaway(s, 6.0, 'Every school prompt you write passes through these three moves.');
    s.addNotes('Say: the skill has three moves, and you just watched all of them. One, strip identity: no names, no initials, no one-of-a-kind details. Two, generalize: "a 7th grader," "several students," "a parent." Three, describe the need, not the child: reading level, behavior pattern, the scaffold you want. Ten seconds of habit, automatic within a week.');
  }

  // --------------------------------- 20 · DO NOW · spot the problem ------------
  {
    const s = base('DO NOW', 3);
    doNowBand(s, 'Call out each of these four prompts as safe or unsafe');
    [['A', '“Write a note home about D.T.’s IEP accommodations for the field trip.”'],
     ['B', '“Create a behavior-reflection sheet for elementary students, friendly tone.”'],
     ['C', '“Help me write a welcome plan for the student who just moved here from Ukraine.”'],
     ['D', '“Summarize strategies for a class where a third of students read below grade level.”']]
      .forEach(([ltr, txt], i) => {
        const y = 1.7 + i * 0.95;
        s.addShape('roundRect', { x: 0.6, y, w: 0.75, h: 0.8, rectRadius: 0.08, fill: { color: NAVY }, line: { color: NAVY } });
        s.addText(ltr, { x: 0.6, y, w: 0.75, h: 0.8, fontFace: FONT, fontSize: 24, bold: true, color: WHITE, align: 'center', valign: 'middle', margin: 0 });
        card(s, 1.5, y, 11.2, 0.8, PAPER);
        s.addText(txt, { x: 1.8, y, w: 10.6, h: 0.8, fontFace: FONT, fontSize: 18, italic: true, color: INK, margin: 0, valign: 'middle' });
      });
    doNowSpec(s, 5.55,
      'Read each prompt. Call out safe or unsafe as a room.',
      'Three minutes, brisk. No hands needed.',
      'All four called, and you can name the fix for each unsafe one.');
    s.addNotes('Say: four prompts on the screen. For each one, call out safe or unsafe. And if it is unsafe, what is the ten-second fix? Let the room call each one before you confirm on the next slide. Keep the pace brisk: three minutes total. Resolve debates with the test from the initials slide.');
  }

  // ---------------------------------- 21 · ANSWER · the four verdicts ----------
  {
    const s = base('ANSWER', 3);
    typeTag(s, 'Answers to the task above', MUTED);
    assertion(s, 'B and D are safe, A and C name one child');
    [['A', 'UNSAFE', 'Initials plus IEP details identify the student.', BAD],
     ['B', 'SAFE', 'No student, no identity: a generic classroom resource.', GOOD],
     ['C', 'UNSAFE', 'No name, but the circumstance identifies one child.', BAD],
     ['D', 'SAFE', 'Aggregate description of a class, no identities.', GOOD]]
      .forEach(([ltr, verdict, why, color], i) => {
        const y = 1.85 + i * 0.98;
        s.addShape('roundRect', { x: 0.6, y, w: 0.75, h: 0.82, rectRadius: 0.08, fill: { color: NAVY }, line: { color: NAVY } });
        s.addText(ltr, { x: 0.6, y, w: 0.75, h: 0.82, fontFace: FONT, fontSize: 22, bold: true, color: WHITE, align: 'center', valign: 'middle', margin: 0 });
        s.addShape('roundRect', { x: 1.5, y, w: 1.85, h: 0.82, rectRadius: 0.08, fill: { color }, line: { color } });
        s.addText(verdict, { x: 1.5, y, w: 1.85, h: 0.82, fontFace: FONT, fontSize: 14, bold: true, color: WHITE, align: 'center', valign: 'middle', margin: 0, charSpacing: 1.5 });
        card(s, 3.5, y, 9.2, 0.82, PAPER);
        s.addText(why, { x: 3.8, y, w: 8.6, h: 0.82, fontFace: FONT, fontSize: 17, color: INK, margin: 0, valign: 'middle' });
      });
    answerStrip(s, 5.85, 'C is the splitter. The fix: “a student who recently arrived from another country and is learning English.”');
    s.addNotes('Say: read the verdicts off the screen. A is unsafe: initials plus IEP details. B is safe. C is the one that splits the room: no name, but "the student who just moved here from Ukraine" identifies a child in a building our size. D is safe, because it describes a class in aggregate. If debate broke out on C, that is the point landing; the fix is on the bottom strip.');
  }

  /* ==================== SEGMENT 5 · HANDS-ON LAB (rail 4) ==================== */

  // ------------------------------------- 22 · ORIENT · lab setup ---------------
  {
    const s = base('ORIENT', 4, { dark: true });
    typeTag(s, 'Segment 5 of 7  ·  15 minutes hands-on', AMBER);
    assertion(s, 'The next fifteen minutes are what this session exists for', true);
    s.addText('Devices out. Pair up, one screen per pair, and open the tool we are using today.', {
      x: 0.6, y: 1.75, w: 12.1, h: 0.6, fontFace: FONT, fontSize: 20, color: DARKTEXT, margin: 0, valign: 'middle' });
    [['1', 'No student information: we practice like we play'],
     ['2', 'Nothing has to be good; this is a sandbox'],
     ['3', 'When it gives you something mediocre, do not settle']].forEach(([num, r], i) => {
      const y = 2.6 + i * 0.92;
      s.addShape('ellipse', { x: 0.72, y, w: 0.62, h: 0.62, fill: { color: TEAL }, line: { color: TEAL } });
      s.addText(num, { x: 0.72, y, w: 0.62, h: 0.62, fontFace: FONT, fontSize: 20, bold: true, color: WHITE, align: 'center', valign: 'middle', margin: 0 });
      s.addText(r, { x: 1.6, y: y - 0.05, w: 11.1, h: 0.72, fontFace: FONT, fontSize: 21, color: WHITE, margin: 0, valign: 'middle' });
    });
    card(s, 0.6, 5.45, 12.1, 1.05, DARKCARD);
    s.addText('Ms. Rivera runs one artifact through the whole lab: her family newsletter blurb. If you feel lost, copy her structure.', {
      x: 0.95, y: 5.45, w: 11.4, h: 1.05, fontFace: FONT, fontSize: 17, color: DARKTEXT, margin: 0, valign: 'middle' });
    s.addNotes('Say: this is the moment the session exists for; everything so far was preparation for you actually typing. Devices out, pair up, one screen per pair. Three ground rules: no student information, we practice like we play; nothing has to be good, this is a sandbox; and when it gives you something mediocre, do not settle. Announce the tool by name. Ms. Rivera builds ONE artifact all the way through on screen: her family newsletter blurb, option A. The next eight slides are her whole arc, in order. Energy up; pairs formed inside two minutes.');
  }

  // --------------------------------- 23 · DO NOW · lab task 1 ------------------
  {
    const s = base('DO NOW', 4);
    doNowBand(s, 'Pick one prompt, type it, and read what comes back');
    [['A', 'Families', '“Write a warm, professional newsletter blurb for families about [any upcoming school event], under 120 words.”'],
     ['B', 'Assessment', '“Create a five-question review quiz on [any topic you teach], mixed difficulty, with an answer key.”'],
     ['C', 'Differentiation', '“Rewrite this paragraph at three different reading levels.” Then paste any paragraph you already have.'],
     ['D', 'CTE & electives', '“Create a five-question tool safety check for the miter saw station, with an answer key.” Swap in any station, lab, kitchen, or instrument.']]
      .forEach(([ltr, tag, txt], i) => {
        const y = 1.65 + i * 0.97;
        card(s, 0.6, y, 12.1, 0.85, PAPER);
        s.addShape('ellipse', { x: 0.85, y: y + 0.2, w: 0.45, h: 0.45, fill: { color: TEAL }, line: { color: TEAL } });
        s.addText(ltr, { x: 0.85, y: y + 0.2, w: 0.45, h: 0.45, fontFace: FONT, fontSize: 17, bold: true, color: WHITE, align: 'center', valign: 'middle', margin: 0 });
        s.addText(tag.toUpperCase(), { x: 1.5, y: y + 0.06, w: 4.0, h: 0.24, fontFace: FONT, fontSize: 10, bold: true, color: TEAL, charSpacing: 1.5, margin: 0 });
        s.addText(txt, { x: 1.5, y: y + 0.32, w: 10.9, h: 0.5, fontFace: FONT, fontSize: 16, color: INK, margin: 0, valign: 'top' });
      });
    doNowSpec(s, 5.6,
      'Pick the option closest to your real job. Type it. Read the answer.',
      'Six minutes, in pairs, one screen.',
      'A draft on your screen that you did not have when you sat down.');
    s.addNotes('Say: pick whichever prompt is closest to your real job, type it, and read what comes back. Option A works for every role in the building, so point stuck pairs there. Ms. Rivera picks A and fills it in with her fall book fair; her screen is the next two slides, so anyone who feels lost can copy her structure exactly. Circulate. Deputize power users to float. Option D comes from a real carpentry classroom; invite electives staff to swap in their station or lab.');
  }

  // ---------------------------- 24 · SCREEN · her prompt, color-coded ----------
  {
    const s = base('SCREEN', 4);
    typeTag(s, 'On Ms. Rivera’s screen · lab task 1', 'B07914');
    assertion(s, 'Her prompt names a role, a task, context and a format');
    s.addText([
      { text: 'BEFORE   ', options: { bold: true, color: BAD } },
      { text: '“Write something for the book fair.”', options: { italic: true, color: MUTED } },
    ], { x: 0.7, y: 1.55, w: 12.0, h: 0.35, fontFace: FONT, fontSize: 16, margin: 0, valign: 'middle' });
    chatWin(s, 0.7, 2.0, 12.0, 3.15);
    chatPaper(s, 2.55, 2.45);
    s.addText([
      { text: '“You are a warm, experienced 4th grade teacher writing to families. ', options: { color: TEAL, bold: true } },
      { text: 'Write a newsletter blurb about our fall book fair. ', options: { color: NAVY, bold: true } },
      { text: 'It is in the school library, families come with their readers and pick books together, our theme is “find your next favorite,” and our families are busy, so plain and friendly beats fancy. ', options: { color: 'B07914', bold: true } },
      { text: 'Under 120 words, one paragraph, no bullet points, ending with a line that invites families to stop by.”', options: { color: GOOD, bold: true } },
    ], { x: 1.95, y: 2.6, w: 10.05, h: 2.3, fontFace: FONT, fontSize: 16.5, margin: 0, valign: 'middle', lineSpacingMultiple: 1.1 });
    legend(s, 5.35);
    takeaway(s, 6.1, 'The middle two parts are the ones only you can supply.');
    s.addNotes('Say: this is Ms. Rivera’s screen, and this is what she typed instead of "write something for the book fair." Read the colors off the slide: who the AI should be (role, teal), the job (task, navy), everything about her room and her families (context, amber), and the shape she wants back (format, green). Nobody has to memorize that today; Kit 2 turns it into a formula. Today it is just a picture: at worst, copy what is on this screen and swap in your own event, and your task 1 is done.');
  }

  // --------------------------------- 25 · SCREEN · the draft back --------------
  {
    const s = base('SCREEN', 4);
    typeTag(s, 'On Ms. Rivera’s screen · what comes back', 'B07914');
    assertion(s, 'The first draft is polished and sounds like nobody');
    chatWin(s, 0.7, 1.6, 12.0, 3.9);
    s.addText('DRAFT 1, STRAIGHT BACK', { x: 1.7, y: 2.15, w: 10.55, h: 0.28, fontFace: FONT, fontSize: 11, bold: true, color: MUTED, charSpacing: 1.5, margin: 0 });
    chatPaper(s, 2.5, 2.85);
    s.addText('“Dear Families, we are thrilled to announce our upcoming Book Fair! This wonderful event promises something for every reader in our school community. The fair runs all week, 8:00 to 3:00, in the library. We sincerely appreciate your continued support of our reading program!”', {
      x: 1.95, y: 2.6, w: 10.05, h: 2.65, fontFace: FONT, fontSize: 19, color: INK, margin: 0, valign: 'middle', lineSpacingMultiple: 1.15 });
    card(s, 0.6, 5.65, 12.1, 0.95, 'FBEFED');
    s.addText('One detail in this draft came from nowhere. Nobody has spotted it yet.', {
      x: 0.95, y: 5.65, w: 11.4, h: 0.95, fontFace: FONT, fontSize: 19, bold: true, color: NAVY, align: 'center', margin: 0, valign: 'middle' });
    s.addNotes('Say: four seconds later, this comes back. It is polished, it is grammatical, and it sounds like nobody. That beige is what a first draft always sounds like, and it is exactly why task 2 exists. Read the red line out loud and stop there; do not point at the invented hours yet, because catching it is the payoff two slides on. Everyone should have their own draft 1 on screen before you move.');
  }

  // ------------------------------------ 26 · DO NOW · push back ----------------
  {
    const s = base('DO NOW', 4);
    doNowBand(s, 'Push back twice, one instruction at a time');
    s.addText('Tell it what is wrong, the way you would tell an intern:', {
      x: 0.6, y: 1.55, w: 12.1, h: 0.45, fontFace: FONT, fontSize: 19, color: INK, margin: 0, valign: 'middle' });
    ['“Warmer.”', '“Shorter.”',
     '“A 5th grader wouldn’t know three of these words. Fix that.”',
     '“Make question four harder and add a diagram question.”'].forEach((c, i) => {
      const x = 0.6 + (i % 2) * 6.17, y = 2.2 + Math.floor(i / 2) * 1.15;
      card(s, x, y, 5.93, 0.95, 'EAF5F3');
      s.addText(c, { x: x + 0.3, y, w: 5.33, h: 0.95, fontFace: FONT, fontSize: 17, bold: true, color: NAVY, margin: 0, valign: 'middle' });
    });
    doNowSpec(s, 4.7,
      'Push back on your own draft 1. One instruction per round.',
      'Six minutes, in pairs. Two rounds minimum.',
      'A draft you would actually use, not the one it handed you.');
    takeaway(s, 6.1, 'The first draft is the intern’s. The third one is yours.', { fontSize: 17, italic: true, bold: false, color: MUTED });
    s.addNotes('Say: do not accept the first draft. Tell it what is wrong, like you would an intern: short and blunt, one instruction at a time, because the tool has no feelings and vague feedback gets a vague draft. Two rounds minimum on your own draft 1, right now. Ms. Rivera types the first two on this slide; her screen is two slides on. 45-minute version: skip this task and go straight to the debrief. This is the move that separates people who get real value from people who quit in a week.');
  }

  // ------------------------------- 27 · ANSWER · how to push back --------------
  {
    const s = base('ANSWER', 4);
    typeTag(s, 'Answers to the task above', MUTED);
    assertion(s, 'Short and blunt beats polite and vague');
    [['Say this', '“Shorter.”', GOOD], ['Not this', '“Could you possibly make it a bit more concise?”', BAD],
     ['Say this', '“A 5th grader wouldn’t know three of these words.”', GOOD], ['Not this', '“Simplify the language a little.”', BAD]]
      .forEach(([label, txt, color], i) => {
        const y = 1.9 + i * 1.05;
        card(s, 0.6, y, 12.1, 0.9, i % 2 === 0 ? 'EAF5F3' : PAPER);
        s.addText(label.toUpperCase(), { x: 0.95, y, w: 1.7, h: 0.9, fontFace: FONT, fontSize: 11, bold: true, color, charSpacing: 1.4, margin: 0, valign: 'middle' });
        s.addText(txt, { x: 2.85, y, w: 9.5, h: 0.9, fontFace: FONT, fontSize: 18, bold: i % 2 === 0, color: i % 2 === 0 ? NAVY : MUTED, margin: 0, valign: 'middle' });
      });
    answerStrip(s, 6.05, 'The tool has no feelings, and vague feedback gets you a vague draft.');
    s.addNotes('Say: read the left column aloud. Short and blunt is fine, and it works better than polite and vague, because the tool has no feelings and a vague instruction gets a vague draft. One instruction at a time, two rounds minimum. If a pair is still polite-ing at their screen, this is the slide to point at.');
  }

  // ------------------------------ 28 · SCREEN · her two pushbacks --------------
  {
    const s = base('SCREEN', 4);
    typeTag(s, 'On Ms. Rivera’s screen · lab task 2', 'B07914');
    assertion(s, 'Two pushbacks made the blurb sound like her');
    chatWin(s, 0.7, 1.6, 12.0, 4.25);
    s.addText('SHE TYPES, ONE AT A TIME', { x: 1.7, y: 2.1, w: 10.55, h: 0.28, fontFace: FONT, fontSize: 11, bold: true, color: TEAL, charSpacing: 1.5, margin: 0 });
    [['“Warmer.”', 1.7], ['“Shorter.”', 4.6]].forEach(([t, x]) => {
      s.addShape('roundRect', { x, y: 2.44, w: 2.7, h: 0.6, rectRadius: 0.14, fill: { color: 'EAF5F3' }, line: { color: 'EAF5F3' } });
      s.addText(t, { x, y: 2.44, w: 2.7, h: 0.6, fontFace: FONT, fontSize: 17, bold: true, color: NAVY, align: 'center', valign: 'middle', margin: 0 });
    });
    s.addText('THE BLURB, TWO ROUNDS LATER', { x: 1.7, y: 3.2, w: 10.55, h: 0.28, fontFace: FONT, fontSize: 11, bold: true, color: MUTED, charSpacing: 1.5, margin: 0 });
    chatPaper(s, 3.52, 2.1);
    s.addText('“Families, our fall book fair is almost here. Stop by the library with your reader and help them pick a book they’ll actually love. We’re open all week, 8:00 to 3:00. Happy reading!”', {
      x: 1.95, y: 3.6, w: 10.05, h: 1.95, fontFace: FONT, fontSize: 19, color: INK, margin: 0, valign: 'middle', lineSpacingMultiple: 1.15 });
    takeaway(s, 6.05, 'Forty seconds of typing, and she has not fixed a word by hand.');
    s.addNotes('Say: here is the same blurb after two pushbacks. Warmer, then shorter, one word at a time, and it finally sounds like a person who knows these families. That took her about forty seconds. Point out that she changed nothing by hand yet; she only told it what was wrong. Then hold the room here: the sentence that matters is still hiding in this draft, and the next slide is where she finds it.');
  }

  // ------------------------------- 29 · SCREEN · the read-through catch --------
  {
    const s = base('SCREEN', 4);
    typeTag(s, 'On Ms. Rivera’s screen · the read-through', 'B07914');
    assertion(s, 'Her read-through caught hours the tool invented');
    chatWin(s, 0.7, 1.6, 12.0, 2.15);
    s.addText('IN BOTH DRAFTS, IN NEITHER HER PROMPT NOR THE FLYER', { x: 1.7, y: 2.1, w: 10.55, h: 0.28, fontFace: FONT, fontSize: 11, bold: true, color: BAD, charSpacing: 1.5, margin: 0 });
    chatPaper(s, 2.45, 1.15, 'FBEFED');
    s.addText('“We’re open all week, 8:00 to 3:00.”', {
      x: 1.95, y: 2.45, w: 10.05, h: 1.15, fontFace: FONT, fontSize: 24, bold: true, color: BAD, margin: 0, valign: 'middle' });
    card(s, 0.6, 4.05, 5.95, 1.95, PAPER);
    cardLabel(s, 0.95, 4.25, 5.2, 'What the flyer says', NAVY);
    s.addText('Tuesday and Thursday, 3:00 to 6:30, so working families can come after school.', {
      x: 0.95, y: 4.68, w: 5.2, h: 1.15, fontFace: FONT, fontSize: 18, color: INK, margin: 0, valign: 'top', lineSpacingMultiple: 1.15 });
    card(s, 6.75, 4.05, 5.95, 1.95, PAPER);
    cardLabel(s, 7.1, 4.25, 5.2, 'Why it happened', NAVY);
    s.addText('It filled a gap with something plausible, and two rounds of pushback did not catch it.', {
      x: 7.1, y: 4.68, w: 5.2, h: 1.15, fontFace: FONT, fontSize: 18, color: INK, margin: 0, valign: 'top', lineSpacingMultiple: 1.15 });
    takeaway(s, 6.15, 'She checked the flyer before she sent it. That read-through has your name on it.');
    s.addNotes('Say: before she sent it, she read it once, slowly, and found the sentence she never typed: the fair "runs all week, 8:00 to 3:00." That was in neither her prompt nor the real flyer. She checked, and the fair actually runs Tuesday and Thursday, 3:00 to 6:30, so working families can come after school. This is the prediction slide happening in a real classroom task: the tool fills a gap with something plausible, and two rounds of pushback will not catch that for you. Tell the room to read their own draft the same way and say "got one" out loud if they find something.');
  }

  // ------------------------------ 30 · SCREEN · the blurb she sent -------------
  {
    const s = base('SCREEN', 4);
    typeTag(s, 'On Ms. Rivera’s screen · the finished artifact', 'B07914');
    assertion(s, 'This is the blurb she actually sent');
    chatWin(s, 0.7, 1.6, 12.0, 4.05);
    s.addText('WHAT SHE SENT · EVERY DETAIL CHECKED FIRST', { x: 1.7, y: 2.12, w: 10.55, h: 0.28, fontFace: FONT, fontSize: 11, bold: true, color: GOOD, charSpacing: 1.5, margin: 0 });
    chatPaper(s, 2.48, 2.95);
    s.addText('“Families, our fall book fair is almost here. Stop by the library with your reader and help them pick a book they’ll actually love. We’re open Tuesday and Thursday, 3:00 to 6:30, so you can come together after school. Happy reading!”', {
      x: 1.95, y: 2.6, w: 10.05, h: 2.7, fontFace: FONT, fontSize: 20, color: INK, margin: 0, valign: 'middle', lineSpacingMultiple: 1.15 });
    takeaway(s, 5.85, 'Beige v1, two pushbacks, one caught error, and nothing left in it she did not verify.');
    s.addNotes('Say: and this is what actually went home. Read it off the screen, word for word, so everyone sees where the arc lands: a beige first draft, two blunt pushbacks, one invented detail caught on the read-through, and a blurb that sounds like her and is true. That is the whole lab in one paragraph. If a pair is behind, tell them this is what they are working toward.');
  }

  // ----------------------------------- 31 · DO NOW · debrief -------------------
  {
    const s = base('DO NOW', 4);
    doNowBand(s, 'Tell the room what surprised you in the lab');
    ['What surprised you?',
     'What was better than you expected, and what was worse?',
     'Did anyone catch it being wrong?'].forEach((q, i) => {
      const y = 1.7 + i * 1.15;
      card(s, 0.6, y, 12.1, 0.95, i === 2 ? 'EAF5F3' : PAPER);
      s.addText(q, { x: 1.0, y, w: 11.3, h: 0.95, fontFace: FONT, fontSize: 22, bold: i === 2, color: i === 2 ? NAVY : INK, margin: 0, valign: 'middle' });
    });
    doNowSpec(s, 5.4,
      'Answer one of the three questions above, out loud.',
      'Three to four voices, about a minute each.',
      'The room has heard at least one real AI mistake named.');
    s.addNotes('Say: let us hear it. What surprised you? What was better than you expected, and what was worse? Did anyone catch it being wrong? If the room saw an AI mistake, spotlight it warmly; it is the best possible outcome of the lab. If nobody caught one, point back at Ms. Rivera’s invented book-fair hours. Take three to four voices, a minute each.');
  }

  // -------------------------------- 32 · ANSWER · two patterns -----------------
  {
    const s = base('ANSWER', 4);
    typeTag(s, 'Answers to the task above', MUTED);
    assertion(s, 'The first draft is rarely the good draft');
    card(s, 0.6, 1.9, 5.95, 3.5, PAPER);
    cardLabel(s, 0.95, 2.15, 5.2, 'Pattern one', TEAL);
    s.addText('The value shows up when you push back.', {
      x: 0.95, y: 2.6, w: 5.2, h: 1.1, fontFace: FONT, fontSize: 23, bold: true, color: NAVY, margin: 0, valign: 'top', lineSpacingMultiple: 1.1 });
    s.addText('That is why the skill is called prompting and not wishing.', {
      x: 0.95, y: 3.95, w: 5.2, h: 1.2, fontFace: FONT, fontSize: 17, color: INK, margin: 0, valign: 'top', lineSpacingMultiple: 1.15 });
    card(s, 6.75, 1.9, 5.95, 3.5, PAPER);
    cardLabel(s, 7.1, 2.15, 5.2, 'Pattern two', TEAL);
    s.addText('Everything you just made still needs your eyes.', {
      x: 7.1, y: 2.6, w: 5.2, h: 1.1, fontFace: FONT, fontSize: 23, bold: true, color: NAVY, margin: 0, valign: 'top', lineSpacingMultiple: 1.1 });
    s.addText('It is fast, it is fluent, and it is unsigned until a professional signs it.', {
      x: 7.1, y: 3.95, w: 5.2, h: 1.2, fontFace: FONT, fontSize: 17, color: INK, margin: 0, valign: 'top', lineSpacingMultiple: 1.15 });
    answerStrip(s, 5.7, 'Which is the last big idea of the day.');
    s.addNotes('Say: two patterns worth naming out of what you just heard. First, the first draft is rarely the good draft; the value shows up when you push back, which is why the skill is called prompting and not wishing. Second, everything you just made still needs your eyes. It is fast, it is fluent, and it is unsigned until a professional signs it. That is the bridge into the last segment.');
  }

  /* ==================== SEGMENT 6 · STAYING HUMAN (rail 5) ==================== */

  // --------------------------- 33 · KEEP · the human stays in charge -----------
  {
    const s = base('KEEP', 5);
    typeTag(s, 'Keep this', TEAL);
    assertion(s, 'Nothing AI-drafted reaches a student or parent unread');
    keepCard(s, 1.9, 2.3, 'A human reads it before it goes out. Every time.',
      'Not because it is usually wrong, but because sometimes it is, and your name is on it.', { fontSize: 30 });
    card(s, 0.6, 4.5, 5.95, 1.6, PAPER);
    s.addText('Federal guidance says it in three words: keep humans in the loop. (U.S. Dept. of Education, 2023)', {
      x: 0.95, y: 4.5, w: 5.25, h: 1.6, fontFace: FONT, fontSize: 17, color: INK, margin: 0, valign: 'middle', lineSpacingMultiple: 1.15 });
    card(s, 6.75, 4.5, 5.95, 1.6, 'EAF5F3');
    s.addText('In this building: AI drafts, the teacher decides. Always.', {
      x: 7.1, y: 4.5, w: 5.25, h: 1.6, fontFace: FONT, fontSize: 20, bold: true, color: NAVY, margin: 0, valign: 'middle', lineSpacingMultiple: 1.15 });
    s.addNotes('Say: rule one was about what goes into the tool. The companion habit is about what comes out: nothing AI-drafted reaches a student or a parent without a human reading it first. Not because it is usually wrong, but because sometimes it is, and because your name is on it. The U.S. Department of Education’s guidance says it in three words: keep humans in the loop. In this building that means AI drafts, the teacher decides. Always.');
  }

  // ------------------------------------ 34 · CLAIM · honest limits -------------
  {
    const s = base('CLAIM', 5);
    typeTag(s, 'Claim · trust requires honesty', TEAL);
    assertion(s, 'Over-reliance, sameness and drift are real risks');
    [['Over-reliance', 'If the tool writes everything, your writing muscle atrophies. Students’ too.'],
     ['Sameness', 'AI output has a beige, everyone-sounds-alike quality. Your voice is worth protecting.'],
     ['Drift', 'It is easy to slide from “AI drafts it” to “AI decides it” without noticing.']]
      .forEach(([h, b], i) => {
        const x = 0.6 + i * 4.13;
        card(s, x, 1.85, 3.87, 3.6, PAPER);
        s.addText(h, { x: x + 0.28, y: 2.1, w: 3.35, h: 0.55, fontFace: FONT, fontSize: 21, bold: true, color: BAD, margin: 0, valign: 'middle' });
        s.addText(b, { x: x + 0.28, y: 2.8, w: 3.35, h: 2.35, fontFace: FONT, fontSize: 17, color: INK, margin: 0, valign: 'top', lineSpacingMultiple: 1.2 });
      });
    card(s, 0.6, 5.7, 12.1, 0.85, 'EAF5F3');
    s.addText('Today’s guardrails exist because these are genuine, not theoretical.', {
      x: 0.95, y: 5.7, w: 11.4, h: 0.85, fontFace: FONT, fontSize: 19, bold: true, color: NAVY, align: 'center', margin: 0, valign: 'middle' });
    s.addNotes('Say: trust requires honesty, so here are the risks nobody selling AI leads with. Over-reliance is real: if the tool writes everything, your own writing muscle atrophies, and the same goes for our students. Sameness is real: AI output has a beige, everyone-sounds-alike quality, and your voice is worth protecting. And drift is real: it is easy to slide from "AI drafts it" to "AI decides it" without noticing. Naming these is what earns the room’s trust. If you chose to share the founders’ note, their view that over-reliance is the biggest risk lands well here.');
  }

  // ------------------------------ 35 · CLAIM · what about students -------------
  {
    const s = base('CLAIM', 5);
    typeTag(s, 'Claim · the question every faculty asks', TEAL);
    assertion(s, 'Student use is a real policy question, and that is Kit 5');
    card(s, 0.6, 1.9, 12.1, 1.5, PAPER);
    s.addText('Major public chatbots require users to be 13 or older, and minors need parent or guardian permission.', {
      x: 0.95, y: 1.9, w: 11.4, h: 1.5, fontFace: FONT, fontSize: 21, color: INK, margin: 0, valign: 'middle', lineSpacingMultiple: 1.15 });
    card(s, 0.6, 3.6, 12.1, 1.5, PAPER);
    s.addText('So student use is a policy question, not a free-for-all and not banned by default.', {
      x: 0.95, y: 3.6, w: 11.4, h: 1.5, fontFace: FONT, fontSize: 21, color: INK, margin: 0, valign: 'middle', lineSpacingMultiple: 1.15 });
    card(s, 0.6, 5.3, 12.1, 1.25, 'EAF5F3');
    s.addText('Today’s scope is the adults: our use, our privacy practice, our judgment.', {
      x: 0.95, y: 5.3, w: 11.4, h: 1.25, fontFace: FONT, fontSize: 20, bold: true, color: NAVY, align: 'center', margin: 0, valign: 'middle' });
    s.addNotes('Say: the question every faculty asks. Short version for today: the major public chatbots require users to be at least 13, and minors need parent or guardian permission under the terms of service. So student use is a real policy question, not a free-for-all, and not banned by default. It deserves its own session, and that is Kit 5, AI and Academic Integrity. Park student-cheating debates there explicitly. For today, our scope is the adults. Age facts: OpenAI terms, 13+ minimum, under-18 parental permission.');
  }

  // ---------------------------------- 36 · KEEP · three commitments ------------
  {
    const s = base('KEEP', 5, { dark: true });
    typeTag(s, 'Keep this  ·  starting today', AMBER);
    assertion(s, 'Three commitments we make as a staff, starting today', true);
    ['No student personally identifiable information in public AI tools. Ever',
     'A human reviews everything AI-drafted before it reaches a student or family',
     'When we find something that works, we share it'].forEach((c, i) => {
      const y = 2.0 + i * 1.35;
      card(s, 0.6, y, 12.1, 1.15, PAPER);
      s.addShape('ellipse', { x: 0.95, y: y + 0.24, w: 0.68, h: 0.68, fill: { color: TEAL }, line: { color: TEAL } });
      s.addText(String(i + 1), { x: 0.95, y: y + 0.24, w: 0.68, h: 0.68, fontFace: FONT, fontSize: 24, bold: true, color: WHITE, align: 'center', valign: 'middle', margin: 0 });
      s.addText(c, { x: 1.9, y, w: 10.4, h: 1.15, fontFace: FONT, fontSize: 21, bold: true, color: NAVY, margin: 0, valign: 'middle' });
    });
    s.addText('Can I get a nod on those three?', {
      x: 0.6, y: 6.05, w: 12.1, h: 0.5, fontFace: FONT, fontSize: 20, italic: true, color: TEAL, align: 'center', margin: 0, valign: 'middle' });
    s.addNotes('Say: here is what I am asking us to agree to as a staff, starting today. One: no student personally identifiable information in public AI tools. Ever. Two: a human reviews anything AI-drafted before it reaches a student or family. Three: when we find something that works, we share it; a prompt that saved you an hour belongs in the staff room, not a drawer. Then ask for a visible nod or thumbs-up. It matters that this is agreed, not just heard. These are the school’s interim stance until a formal policy exists (Kit 15).');
  }

  /* ==================== SEGMENT 7 · FIRST 48 HOURS & CLOSE (rail 6) ============ */

  // ------------------------------------ 37 · DO NOW · first 48 hours -----------
  {
    const s = base('DO NOW', 6);
    doNowBand(s, 'Do three small things in the next forty-eight hours');
    [['~10 min', 'Do one real task with AI', 'Something already on your to-do list. Push back twice, review it, use it.'],
     ['~5 min', 'Run the de-identification drill', 'One real prompt, written unsafe then safe, on paper.'],
     ['~2 min', 'Share one discovery', 'One colleague, one specific thing: a win or a useful failure.']]
      .forEach(([t, h, b], i) => {
        const y = 1.7 + i * 1.25;
        card(s, 0.6, y, 12.1, 1.1, PAPER);
        s.addText(t, { x: 0.95, y, w: 1.5, h: 1.1, fontFace: FONT, fontSize: 17, bold: true, color: TEAL, margin: 0, valign: 'middle' });
        s.addText(h, { x: 2.55, y: y + 0.12, w: 9.8, h: 0.45, fontFace: FONT, fontSize: 20, bold: true, color: NAVY, margin: 0, valign: 'middle' });
        s.addText(b, { x: 2.55, y: y + 0.58, w: 9.8, h: 0.45, fontFace: FONT, fontSize: 16, color: INK, margin: 0, valign: 'middle' });
      });
    doNowSpec(s, 5.5,
      'Take the First 48 Hours sheet and pick a time for each of the three.',
      'Three sittings, each under fifteen minutes.',
      'All three done before Friday, with one colleague told.');
    s.addNotes('Say: research on PD is blunt: if you do not use this within two days, most of it evaporates. So this sheet asks for three things, each under fifteen minutes, each using something from today: a real task done with AI, a de-identification rep, and one shared discovery. That is the whole assignment. Tomorrow morning, coffee in hand, pick one. Hold up the First 48 Hours sheet as you talk. Research basis: Darling-Hammond et al. (2017), sustained duration and active use are what make PD stick.');
  }

  // -------------------------------- 38 · ORIENT · where this goes --------------
  {
    const s = base('ORIENT', 6, { dark: true });
    typeTag(s, 'Kit 1 of 8  ·  Track A', AMBER);
    assertion(s, 'Seven more kits lead to your certificate of completion', true);
    ['1 · AI Foundations & Safety  ✔', '2 · Prompting Basics', '3 · Planning & Differentiation', '4 · Assessment',
     '5 · Academic Integrity', '6 · Communication', '7 · Workload', '8 · Your School’s AI Culture']
      .forEach((k, i) => {
        const x = 0.6 + (i % 4) * 3.12, y = 1.95 + Math.floor(i / 4) * 1.3;
        card(s, x, y, 2.92, 1.1, i === 0 ? TEAL : DARKCARD);
        s.addText(k, { x: x + 0.22, y, w: 2.5, h: 1.1, fontFace: FONT, fontSize: 14.5, bold: i === 0, color: WHITE, margin: 0, valign: 'middle' });
      });
    card(s, 0.6, 4.75, 12.1, 1.6, DARKCARD);
    s.addText('Finish all eight and you earn the AI-Ready Educator Certificate of Completion.', {
      x: 0.95, y: 4.9, w: 11.4, h: 0.55, fontFace: FONT, fontSize: 20, bold: true, color: WHITE, margin: 0, valign: 'middle' });
    s.addText('Follow-ups run inside existing PLC time; nothing new to schedule.', {
      x: 0.95, y: 5.5, w: 11.4, h: 0.6, fontFace: FONT, fontSize: 17, color: DARKTEXT, margin: 0, valign: 'middle' });
    s.addNotes('Say: this was Kit 1 of eight in the AI Foundations track. Next is Kit 2, Prompting Basics: how to get consistently useful results instead of occasionally lucky ones. Finish all eight and you earn the AI-Ready Educator Certificate of Completion, real documentation of real professional learning. And we keep the momentum in regular PLC time with short follow-ups; nothing new to schedule. Certificate language is exactly "Certificate of Completion"; check with your district whether it qualifies for local credit.');
  }

  // ---------------------------------- 39 · DO NOW · the exit ticket ------------
  {
    const s = base('DO NOW', 6);
    doNowBand(s, 'Take two minutes now and fill in the exit ticket');
    ['One thing you’re taking', 'One worry you still have', 'One thing you’ll try'].forEach((t, i) => {
      const x = 0.6 + i * 4.13;
      card(s, x, 1.75, 3.87, 2.5, PAPER);
      s.addText(String(i + 1), { x: x + 0.3, y: 1.95, w: 0.6, h: 0.6, fontFace: FONT, fontSize: 24, bold: true, color: TEAL, margin: 0, valign: 'middle' });
      s.addText(t, { x: x + 0.3, y: 2.65, w: 3.3, h: 1.35, fontFace: FONT, fontSize: 21, bold: true, color: NAVY, margin: 0, valign: 'top', lineSpacingMultiple: 1.1 });
    });
    doNowSpec(s, 4.55,
      'Fill in all three lines on the exit ticket in your hand.',
      'Two minutes, on your own.',
      'Your ticket handed in at the door on your way out.');
    takeaway(s, 6.0, 'Your worries steer what we do next, so be honest.', { fontSize: 17, italic: true, bold: false, color: MUTED });
    s.addNotes('Say: before you go, two minutes on the exit ticket. One thing you are taking, one worry you still have, one thing you will try. Your worries steer what we do next, so be honest. Distribute the tickets now and collect them at the door; they are the school’s PD documentation, so actually collect them.');
  }

  // -------------------------------------- 40 · KEEP · the close ----------------
  {
    const s = base('KEEP', 6, { dark: true });
    typeTag(s, 'Keep this', AMBER);
    assertion(s, 'AI can write a draft, it cannot change a kid’s day', true);
    card(s, 0.6, 1.9, 12.1, 3.0, PAPER);
    s.addShape('rect', { x: 0.6, y: 1.9, w: 0.09, h: 3.0, fill: { color: TEAL }, line: { color: TEAL } });
    s.addText('It cannot greet a kid at the door by name,\nnotice something is off,\nand change that kid’s day.', {
      x: 1.15, y: 2.15, w: 11.0, h: 1.85, fontFace: FONT, fontSize: 28, bold: true, color: NAVY, margin: 0, valign: 'middle', lineSpacingMultiple: 1.2 });
    s.addText('That’s you.', {
      x: 1.15, y: 4.05, w: 11.0, h: 0.7, fontFace: FONT, fontSize: 30, bold: true, color: TEAL, margin: 0, valign: 'middle' });
    s.addText('Use the tool for the paperwork. Keep the teaching.', {
      x: 0.6, y: 5.15, w: 12.1, h: 0.6, fontFace: FONT, fontSize: 24, bold: true, color: TEAL, align: 'center', margin: 0, valign: 'middle' });
    s.addText('Human teaching. Life-changing tools.  ·  Built by Adam & Katelyn Spinozzi · certified educators', {
      x: 0.6, y: 5.9, w: 12.1, h: 0.4, fontFace: FONT, fontSize: 12, color: DARKMUTED, align: 'center', charSpacing: 1.2, margin: 0, valign: 'middle' });
    s.addNotes('Say: last word. The tool you used today is going to keep getting better, and none of it changes why any of us took this job. AI can write a draft. It cannot greet a kid at the door by name, notice something is off, and change that kid’s day. That is you. Use the tool for the paperwork. Keep the teaching. Thanks, everyone. After the room empties: collect stray exit tickets and take five minutes with the 30-Day Plan.');
  }

  const out = path.join(root, 'kits/kit01/Kit01_PresentationDeck.pptx');
  await p.writeFile({ fileName: out });
  if (process.env.DECK_MANIFEST) {
    fs.writeFileSync(process.env.DECK_MANIFEST, JSON.stringify(manifest, null, 1));
    console.log('manifest', process.env.DECK_MANIFEST);
  }
  const counts = manifest.reduce((a, m) => (a[m.type] = (a[m.type] || 0) + 1, a), {});
  console.log('wrote', out, '·', n, 'slides');
  console.log('types:', Object.entries(counts)
    .map(([t, c]) => `${t} ${c} (${Math.round(c / n * 100)}%)`).join('  ·  '));
})();
