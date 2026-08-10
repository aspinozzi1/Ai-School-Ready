#!/usr/bin/env node
/* Kit 3 Presentation Deck · AI for Planning & Differentiation
   30 slides, locked AI-Ready School brand, speaker notes on every slide.
   Build: node kits/kit03/src/deck.js  → kits/kit03/Kit03_PresentationDeck.pptx */
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
  p.title = 'Kit 3: AI for Planning & Differentiation';

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
      s.addText(`Kit 3 · Planning & Differentiation   |   ${slideNo}`, {
        x: W - 4.6, y: H - 0.47, w: 4.15, h: 0.32, fontFace: FONT, fontSize: 9,
        color: dark ? '9FB2C2' : MUTED, align: 'right', margin: 0, valign: 'middle' });
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
    s.addText('TRACK A · AI FOUNDATIONS · KIT 3 OF 20', {
      x: 0.9, y: 3.0, w: 9, h: 0.4, fontFace: FONT, fontSize: 15, bold: true,
      color: AMBER, charSpacing: 3, margin: 0 });
    s.addText('AI for Planning\n& Differentiation', {
      x: 0.85, y: 3.35, w: 11.8, h: 2.0, fontFace: FONT, fontSize: 44, bold: true,
      color: WHITE, margin: 0, valign: 'middle', lineSpacingMultiple: 1.05 });
    s.addText('A 45–60 minute working session. You leave with one fully differentiated artifact for a lesson you’re about to teach.', {
      x: 0.9, y: 5.45, w: 11.2, h: 0.5, fontFace: FONT, fontSize: 18, color: 'C9D4DE', margin: 0 });
    s.addText('Built by Adam & Katelyn Spinozzi · certified educators · 20+ combined years in the classroom', {
      x: 0.9, y: 6.6, w: 11.5, h: 0.4, fontFace: FONT, fontSize: 12, color: '9FB2C2', margin: 0 });
    s.addNotes('Slide up as people arrive. Start on time. This session assumes Kits 1 and 2: the permanent rules and the four-part formula. Staff should have brought one upcoming lesson.');
  }

  // ============================== SLIDE 2 · THE DILEMMA ==============================
  {
    const s = base();
    kicker(s, 'Both halves are true');
    title(s, 'The differentiation dilemma');
    card(s, 0.7, 1.75, 5.75, 3.7, 'EAF5F3');
    s.addText('It works', { x: 0.7, y: 2.05, w: 5.75, h: 0.7, fontFace: FONT, fontSize: 30, bold: true, color: GOOD, align: 'center', margin: 0 });
    s.addText('Meta-analysis: small-to-moderate positive effects, strongest when embedded in instruction and supported by technology\n(Deunk et al., 2018)', {
      x: 1.0, y: 2.9, w: 5.15, h: 2.3, fontFace: FONT, fontSize: 15.5, color: INK, align: 'center', margin: 0 });
    card(s, 6.85, 1.75, 5.75, 3.7, PAPER);
    s.addText('It wasn’t sustainable', { x: 6.85, y: 2.05, w: 5.75, h: 0.7, fontFace: FONT, fontSize: 30, bold: true, color: BAD, align: 'center', margin: 0 });
    s.addText('Three versions of every text, practice set, and station, by hand?\nThe plan asked for more hours than the week has.', {
      x: 7.15, y: 2.9, w: 5.15, h: 2.3, fontFace: FONT, fontSize: 15.5, color: INK, align: 'center', margin: 0 });
    s.addText('The gap was never intention. It was time.', {
      x: 0.7, y: 5.85, w: 12.0, h: 0.55, fontFace: FONT, fontSize: 21, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('Deunk et al. 2018, Educational Research Review: grouping alone is not enough; the materials have to actually differ. If you chose to share the founders’ note from the front of the script, their point lands here: when versions are hand-built, the stretch gets triaged.');
  }

  // ============================== SLIDE 3 · WHY NOW ==============================
  {
    const s = base();
    kicker(s, 'Why this session exists now');
    title(s, 'The tool for the time problem arrived');
    card(s, 0.7, 1.75, 5.75, 3.7, PAPER);
    s.addText('61%', { x: 0.7, y: 2.1, w: 5.75, h: 1.2, fontFace: FONT, fontSize: 58, bold: true, color: TEAL, align: 'center', margin: 0 });
    s.addText('of teachers used AI in their work by late 2025, up from 34% in Dec 2023\n(EdWeek Research Center, 2026)', {
      x: 1.0, y: 3.4, w: 5.15, h: 1.8, fontFace: FONT, fontSize: 16, color: INK, align: 'center', margin: 0 });
    card(s, 6.85, 1.75, 5.75, 3.7, PAPER);
    s.addText('60–84%', { x: 6.85, y: 2.1, w: 5.75, h: 1.2, fontFace: FONT, fontSize: 58, bold: true, color: TEAL, align: 'center', margin: 0 });
    s.addText('of teachers using AI for a task, like modifying materials to student levels, say it saves them time\n(Gallup & Walton Family Fdn., 2025)', {
      x: 7.15, y: 3.4, w: 5.15, h: 1.8, fontFace: FONT, fontSize: 16, color: INK, align: 'center', margin: 0 });
    s.addText('Lesson plans and student resources are among the most common uses. Today we aim it at differentiation.', {
      x: 0.7, y: 5.85, w: 12.0, h: 0.55, fontFace: FONT, fontSize: 19, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('Attributions out loud: EdWeek Research Center for the 61% (up from 34%); Gallup-Walton for the time-savings range, with weekly users saving about six hours a week.');
  }

  // ============================== SLIDE 4 · AGENDA ==============================
  {
    const s = base();
    kicker(s, 'The hour ahead');
    title(s, 'Agenda, and one promise');
    const rows = [
      ['0:05', 'The planning workflow: where AI fits'],
      ['0:12', 'The toolkit: four differentiation moves'],
      ['0:24', 'Quality control: the 4-point review'],
      ['0:30', 'Lab: differentiate your real lesson'],
      ['0:50', 'Making it stick + first 48 hours'],
    ];
    rows.forEach(([t, txt], i) => {
      const y = 1.6 + i * 0.8;
      s.addText(t, { x: 0.9, y, w: 1.1, h: 0.6, fontFace: FONT, fontSize: 20, bold: true, color: TEAL, margin: 0, valign: 'middle' });
      s.addText(txt, { x: 2.1, y, w: 7.4, h: 0.6, fontFace: FONT, fontSize: 20, color: INK, margin: 0, valign: 'middle' });
    });
    card(s, 9.9, 2.1, 2.85, 3.2, NAVY);
    s.addText('One promise', { x: 10.15, y: 2.35, w: 2.35, h: 0.4, fontFace: FONT, fontSize: 16, bold: true, color: AMBER, margin: 0 });
    s.addText('You leave with one fully differentiated artifact for an upcoming lesson: core, support, extension. Reviewed. Teachable.', {
      x: 10.15, y: 2.8, w: 2.35, h: 2.3, fontFace: FONT, fontSize: 14, color: WHITE, margin: 0, valign: 'top' });
    s.addNotes('Keep this quick. The promise line matters: not examples, their lesson. Confirm everyone has a lesson in hand; borrowing a partner’s is fine.');
  }

  // ============================== SLIDE 5 · THE STANCE ==============================
  {
    const s = base(true);
    kicker(s, 'The stance for today', { color: TEAL });
    s.addText('Never from scratch again.', {
      x: 0.7, y: 1.4, w: 12.0, h: 0.9, fontFace: FONT, fontSize: 40, bold: true, color: WHITE, margin: 0 });
    s.addText('Not “never plan again.” Never start from a blank page again.\nThe blank page was the most expensive part, and it never needed your expertise.', {
      x: 0.7, y: 2.6, w: 12.0, h: 1.4, fontFace: FONT, fontSize: 24, color: 'C9D4DE', margin: 0, lineSpacingMultiple: 1.2 });
    s.addText('AI drafts the skeleton. You supply the judgment. AI drafts, the teacher decides.', {
      x: 0.7, y: 4.5, w: 12.0, h: 1.2, fontFace: FONT, fontSize: 22, color: TEAL, bold: true, margin: 0 });
    s.addNotes('One breath, then move. The five-word posture appears on screen; say it with the room if the culture is there.');
  }

  // ============================== SLIDE 6 · THE PLOS ONE STUDY ==============================
  {
    const s = base();
    kicker(s, 'The best study we have on exactly this');
    title(s, 'A lesson plan in 30 minutes. And one catch.');
    card(s, 0.7, 1.75, 5.75, 3.7, 'EAF5F3');
    s.addText('~30 min', { x: 0.7, y: 2.1, w: 5.75, h: 1.2, fontFace: FONT, fontSize: 54, bold: true, color: GOOD, align: 'center', margin: 0 });
    s.addText('for ChatGPT to draft and refine a standards-aligned grade 1 science lesson\n(Powell & Courchesne, PLOS ONE, 2024)', {
      x: 1.0, y: 3.35, w: 5.15, h: 1.9, fontFace: FONT, fontSize: 15.5, color: INK, align: 'center', margin: 0 });
    card(s, 6.85, 1.75, 5.75, 3.7, 'FBEFED');
    s.addText('1 fabricated\nresource', { x: 6.85, y: 2.0, w: 5.75, h: 1.4, fontFace: FONT, fontSize: 32, bold: true, color: BAD, align: 'center', margin: 0, lineSpacingMultiple: 1.05 });
    s.addText('plus questionable components and missing details along the way, delivered with total confidence\n(same study)', {
      x: 7.15, y: 3.35, w: 5.15, h: 1.9, fontFace: FONT, fontSize: 15.5, color: INK, align: 'center', margin: 0 });
    s.addNotes('Peer-reviewed, PLOS ONE 2024. The AI recommended a resource that does not exist. Tell it straight: the 30 minutes is real AND the fabrication is real.');
  }

  // ============================== SLIDE 7 · BOTH HALVES ==============================
  {
    const s = base();
    kicker(s, 'What that study means for Monday');
    title(s, 'Review is where your expertise enters');
    card(s, 0.7, 1.7, 12.0, 2.2, NAVY);
    s.addText('Review is not a formality. It’s the step where the teaching expertise enters the document.', {
      x: 1.1, y: 1.95, w: 11.2, h: 1.7, fontFace: FONT, fontSize: 24, bold: true, color: WHITE, margin: 0, valign: 'middle' });
    bullets(s, [
      'Take the 30 minutes; the skeleton is real and it’s useful',
      { text: 'Then review like a professional: the study’s authors and every kit in this series agree it’s non-negotiable', options: { bold: true, color: NAVY } },
    ], { y: 4.2, h: 1.8, fontSize: 20 });
    s.addNotes('Bridge slide; keep it to 40 seconds. The 4-point review checklist arrives on slide 16, before the lab.');
  }

  // ============================== SLIDE 8 · UDL FRAME ==============================
  {
    const s = base();
    kicker(s, 'The frame that makes AI useful, not just fast');
    title(s, 'UDL: generate options, then choose');
    const means = [
      ['Engagement', 'Multiple ways in: choice, relevance, challenge level'],
      ['Representation', 'Multiple ways to meet the content: text, levels, visuals described'],
      ['Action & expression', 'Multiple ways to show it: write, build, discuss, teach back'],
    ];
    means.forEach(([h, b], i) => {
      const x = 0.7 + i * 4.12;
      card(s, x, 1.7, 3.85, 3.0, PAPER);
      s.addText(h, { x: x + 0.28, y: 2.0, w: 3.3, h: 0.8, fontFace: FONT, fontSize: 19, bold: true, color: TEAL, margin: 0 });
      s.addText(b, { x: x + 0.28, y: 2.85, w: 3.3, h: 1.6, fontFace: FONT, fontSize: 15, color: INK, margin: 0, valign: 'top' });
    });
    s.addText('Options were always UDL’s cost problem. Generating options is the thing AI does fastest.\nAI generates the menu; you order for your class. (CAST UDL 3.0; Capp, 2017)', {
      x: 0.7, y: 5.1, w: 12.0, h: 1.0, fontFace: FONT, fontSize: 18, bold: true, color: NAVY, align: 'center', margin: 0, lineSpacingMultiple: 1.15 });
    s.addNotes('CAST’s UDL Guidelines 3.0; Capp’s 2017 meta-analysis found UDL effective for improving learning across the board. If asked “is this learning styles?”: no; UDL builds flexible materials, it does not sort kids into types.');
  }

  // ============================== SLIDE 9 · THE WORKFLOW ==============================
  {
    const s = base();
    kicker(s, 'The whole system');
    title(s, 'The planning workflow');
    const steps = [
      ['1', 'Draft', 'the core artifact with the Kit 2 formula'],
      ['2', 'Options', 'ask AI to vary it: levels, scaffolds, formats'],
      ['3', 'Pick & adapt', 'you know which option fits which kid'],
      ['4', 'Review', 'the 4-point check before it reaches a student'],
    ];
    steps.forEach(([n, h, b], i) => {
      const y = 1.6 + i * 1.15;
      s.addShape('ellipse', { x: 0.9, y: y + 0.12, w: 0.72, h: 0.72, fill: { color: TEAL }, line: { color: TEAL } });
      s.addText(n, { x: 0.9, y: y + 0.12, w: 0.72, h: 0.72, fontFace: FONT, fontSize: 22, bold: true, color: WHITE, align: 'center', valign: 'middle', margin: 0 });
      card(s, 1.95, y, 10.7, 0.95, PAPER);
      s.addText([
        { text: h + ':  ', options: { bold: true, color: NAVY } },
        { text: b, options: { color: INK } },
      ], { x: 2.3, y: y + 0.08, w: 10.0, h: 0.8, fontFace: FONT, fontSize: 18, margin: 0, valign: 'middle' });
    });
    s.addNotes('Draft, options, pick, review. Steps 3 and 4 are the human steps and they are the point. This is the handout’s spine.');
  }

  // ============================== SLIDE 10 · FOUR MOVES ==============================
  {
    const s = base();
    kicker(s, 'The differentiation toolkit');
    title(s, 'Four moves. New price, same pedagogy.');
    const moves = [
      ['Level it', 'One passage, multiple reading levels'],
      ['Scaffold it', 'Starters, word banks, worked examples, organizers'],
      ['Stretch it', 'Depth for early finishers, never more worksheets'],
      ['Reformat it', 'Same content as stations, cards, practice sets'],
    ];
    moves.forEach(([h, b], i) => {
      const x = 0.7 + (i % 2) * 6.15, y = 1.55 + Math.floor(i / 2) * 2.3;
      card(s, x, y, 5.85, 2.1, PAPER);
      s.addText(h, { x: x + 0.3, y: y + 0.22, w: 5.25, h: 0.55, fontFace: FONT, fontSize: 24, bold: true, color: TEAL, margin: 0 });
      s.addText(b, { x: x + 0.3, y: y + 0.9, w: 5.25, h: 1.0, fontFace: FONT, fontSize: 17, color: INK, margin: 0 });
    });
    s.addText('Tomlinson’s frame: readiness (moves 1–3), interest and profile (move 4).', {
      x: 0.7, y: 6.15, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 17, italic: true, color: MUTED, align: 'center', margin: 0 });
    s.addNotes('Nothing here is new pedagogy (Tomlinson et al., 2003: readiness, interest, learning profile). What’s new is the price of the materials.');
  }

  // ============================== SLIDE 11 · MOVE 1: LEVEL IT ==============================
  {
    const s = base();
    kicker(s, 'Move 1 · the workhorse · on Ms. Rivera\'s screen');
    title(s, 'Level it: one passage, three levels');
    s.addText([
      { text: 'BEFORE   ', options: { bold: true, color: BAD } },
      { text: '“Make this easier.”', options: { italic: true, color: MUTED } },
    ], { x: 0.7, y: 1.42, w: 12.0, h: 0.4, fontFace: FONT, fontSize: 16, margin: 0, valign: 'middle' });
    s.addShape('roundRect', { x: 0.7, y: 1.95, w: 12.0, h: 3.85, rectRadius: 0.1, fill: { color: WHITE }, line: { color: 'DCE3EA', width: 1.5 } });
    s.addShape('roundRect', { x: 0.7, y: 1.95, w: 12.0, h: 0.42, rectRadius: 0.1, fill: { color: NAVY }, line: { color: NAVY } });
    ['E8837A', AMBER, GOOD].forEach((c, i) => s.addShape('ellipse', { x: 0.95 + i * 0.27, y: 2.08, w: 0.16, h: 0.16, fill: { color: c }, line: { color: c } }));
    s.addText('AI chat tool (any of them) · Ms. Rivera, our running example teacher (a composite, not a real person)', {
      x: 1.95, y: 1.95, w: 10.6, h: 0.42, fontFace: FONT, fontSize: 11, color: '9FB2C2', margin: 0, valign: 'middle' });
    s.addShape('roundRect', { x: 1.7, y: 2.6, w: 10.55, h: 2.95, rectRadius: 0.12, fill: { color: PAPER }, line: { color: PAPER } });
    s.addText([
      { text: '“You are a reading specialist. ', options: { color: TEAL, bold: true } },
      { text: 'Rewrite the passage below at three levels: on-grade for 6th grade, about two years below, and about two years above. ', options: { color: NAVY, bold: true } },
      { text: 'Keep every key idea, the section headings, and the same core vocabulary. ', options: { color: 'B07914', bold: true } },
      { text: 'Lower level: sentences under 12 words plus a 5-word vocabulary box. Higher level: raise the complexity of the reasoning, not just the vocabulary. Label each version.”  [paste passage]', options: { color: GOOD, bold: true } },
    ], { x: 1.95, y: 2.75, w: 10.05, h: 2.7, fontFace: FONT, fontSize: 16, margin: 0, valign: 'top', lineSpacingMultiple: 1.1 });
    const chips = [['ROLE', TEAL], ['TASK', NAVY], ['CONTEXT', 'B07914'], ['FORMAT', GOOD]];
    chips.forEach(([t, c], i) => {
      const x = 0.7 + i * 3.08;
      s.addShape('roundRect', { x, y: 6.05, w: 2.85, h: 0.5, rectRadius: 0.25, fill: { color: c }, line: { color: c } });
      s.addText(t, { x, y: 6.05, w: 2.85, h: 0.5, fontFace: FONT, fontSize: 14, bold: true, color: WHITE, align: 'center', valign: 'middle', margin: 0, charSpacing: 2 });
    });
    s.addNotes('Say: here\'s the same move on Ms. Rivera\'s screen, our running composite example. It\'s the Kit 2 formula wearing work clothes: role in teal, task in navy, context in amber, format in green. Ninety seconds replaces an evening. In the lab, mimic this shape with your own passage. Next slide is the habit that keeps this honest.');
  }

  // ============================== SLIDE 12 · CHECK THE LEVEL ==============================
  {
    const s = base();
    kicker(s, 'The habit that keeps move 1 honest');
    title(s, 'Check the level. Don’t trust the label.');
    const checks = [
      ['1', 'Read a paragraph aloud: your ear knows your grade level'],
      ['2', 'Eyeball sentence length: 25-word sentences aren’t “easier”'],
      ['3', 'Try it on one student tomorrow and watch where they stumble'],
    ];
    checks.forEach(([n, r], i) => {
      const y = 1.7 + i * 1.0;
      s.addShape('ellipse', { x: 0.9, y, w: 0.62, h: 0.62, fill: { color: TEAL }, line: { color: TEAL } });
      s.addText(n, { x: 0.9, y, w: 0.62, h: 0.62, fontFace: FONT, fontSize: 20, bold: true, color: WHITE, align: 'center', valign: 'middle', margin: 0 });
      s.addText(r, { x: 1.75, y: y - 0.05, w: 10.8, h: 0.72, fontFace: FONT, fontSize: 20, color: INK, margin: 0, valign: 'middle' });
    });
    card(s, 0.7, 4.9, 12.0, 1.35, 'EAF5F3');
    s.addText('Readability is measurable; teacher judgment is the benchmark. That’s the point of the CLEAR corpus research. Verify in two minutes; keep everything the leveling bought you.', {
      x: 1.05, y: 5.05, w: 11.3, h: 1.05, fontFace: FONT, fontSize: 16.5, bold: true, color: NAVY, margin: 0, valign: 'middle' });
    s.addNotes('Crossley et al. 2022: the CommonLit CLEAR corpus grounded readability in teacher judgment; level is a testable property, not a vibe. Teach the three quick checks (read aloud, sentence length, try on one student) and move on.');
  }

  // ============================== SLIDE 13 · MOVE 2: SCAFFOLD IT ==============================
  {
    const s = base();
    kicker(s, 'Move 2 · same target, more handholds');
    title(s, 'Scaffold it');
    const items = [
      ['Sentence starters', 'One per paragraph; gets the stuck writer moving'],
      ['Word bank', '10 words with student-friendly definitions'],
      ['Worked example', 'On a different topic: teaches the shape, not the answer'],
      ['Organizer text', 'The labels and prompts for your graphic organizer'],
    ];
    items.forEach(([h, b], i) => {
      const x = 0.7 + (i % 2) * 6.15, y = 1.6 + Math.floor(i / 2) * 2.15;
      card(s, x, y, 5.85, 1.95, PAPER);
      s.addText(h, { x: x + 0.3, y: y + 0.2, w: 5.25, h: 0.5, fontFace: FONT, fontSize: 20, bold: true, color: NAVY, margin: 0 });
      s.addText(b, { x: x + 0.3, y: y + 0.75, w: 5.25, h: 1.1, fontFace: FONT, fontSize: 15.5, color: INK, margin: 0 });
    });
    s.addNotes('Prompt on the handout: starters + word bank + one worked example on a DIFFERENT topic, so students see the structure without copying content. That clause is the professional touch.');
  }

  // ============================== SLIDE 14 · MOVE 3: STRETCH IT ==============================
  {
    const s = base();
    kicker(s, 'Move 3 · early finishers & advanced learners');
    title(s, 'Stretch it: depth, not more worksheets');
    const rounds = [
      ['Apply', 'Use the concept in an unfamiliar context'],
      ['Critique', 'Find the flaw in a flawed example'],
      ['Teach', 'Explain it to a younger student, own words'],
    ];
    rounds.forEach(([h, b], i) => {
      const x = 0.7 + i * 4.12;
      card(s, x, 1.7, 3.85, 3.2, PAPER);
      s.addShape('ellipse', { x: x + 1.42, y: 2.0, w: 1.0, h: 1.0, fill: { color: TEAL }, line: { color: TEAL } });
      s.addText(String(i + 1), { x: x + 1.42, y: 2.0, w: 1.0, h: 1.0, fontFace: FONT, fontSize: 30, bold: true, color: WHITE, align: 'center', valign: 'middle', margin: 0 });
      s.addText(h, { x: x + 0.25, y: 3.2, w: 3.35, h: 0.5, fontFace: FONT, fontSize: 20, bold: true, color: NAVY, align: 'center', margin: 0 });
      s.addText(b, { x: x + 0.25, y: 3.75, w: 3.35, h: 1.0, fontFace: FONT, fontSize: 15, color: INK, align: 'center', margin: 0 });
    });
    s.addText('A second worksheet is a punishment for being fast. Say “no additional practice problems” in the prompt.', {
      x: 0.7, y: 5.4, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 18, italic: true, color: MUTED, align: 'center', margin: 0 });
    s.addNotes('The quiet rule out loud: early finishers get depth, not volume. Your strongest students stop being your most bored ones, and it cost a minute.');
  }

  // ============================== SLIDE 15 · MOVE 4: REFORMAT IT ==============================
  {
    const s = base();
    kicker(s, 'Move 4 · the UDL move');
    title(s, 'Reformat it: same content, new shape');
    const formats = [
      ['Stations', 'Four activity-direction sets from one lesson'],
      ['Discussion cards', 'Eight cards, one question each'],
      ['Practice set', '10 items ramping recall → application'],
    ];
    formats.forEach(([h, b], i) => {
      const x = 0.7 + i * 4.12;
      card(s, x, 1.7, 3.85, 3.0, PAPER);
      s.addText(h, { x: x + 0.28, y: 2.0, w: 3.3, h: 0.6, fontFace: FONT, fontSize: 19, bold: true, color: TEAL, margin: 0 });
      s.addText(b, { x: x + 0.28, y: 2.7, w: 3.3, h: 1.7, fontFace: FONT, fontSize: 15.5, color: INK, margin: 0, valign: 'top' });
    });
    card(s, 0.7, 5.0, 12.0, 1.2, 'EAF5F3');
    s.addText('One draft becomes a menu: multiple means of engagement and expression, on demand.', {
      x: 1.05, y: 5.15, w: 11.3, h: 0.9, fontFace: FONT, fontSize: 19, bold: true, color: NAVY, margin: 0, valign: 'middle' });
    s.addNotes('Prompt on the handout: “same concepts in all three; label everything.” The version you never had time to make now exists.');
  }

  // ============================== SLIDE 16 · THE 4-POINT REVIEW ==============================
  {
    const s = base();
    kicker(s, 'Before anything reaches a student');
    title(s, 'The 4-point review');
    const points = [
      ['1 · Accurate?', 'Facts, examples, named resources checked. Remember the fabricated resource.'],
      ['2 · At level, actually?', 'Run the quick checks. The label is a guess until you test it.'],
      ['3 · Fits your students?', 'AI wrote for a generic class. Swap examples that won’t land in yours.'],
      ['4 · Sounds like you?', 'If the directions don’t sound like your directions, students notice first.'],
    ];
    points.forEach(([h, b], i) => {
      const x = 0.7 + (i % 2) * 6.15, y = 1.55 + Math.floor(i / 2) * 2.3;
      card(s, x, y, 5.85, 2.1, PAPER);
      s.addText(h, { x: x + 0.3, y: y + 0.2, w: 5.25, h: 0.5, fontFace: FONT, fontSize: 21, bold: true, color: TEAL, margin: 0 });
      s.addText(b, { x: x + 0.3, y: y + 0.78, w: 5.25, h: 1.2, fontFace: FONT, fontSize: 15, color: INK, margin: 0 });
    });
    s.addText('Fail a point, fix it. That’s the review.', {
      x: 0.7, y: 6.15, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 19, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('Accurate, at level, fits, sounds like you. This checklist is on the handout and becomes commitment #5. The lab’s step 3 runs it live.');
  }

  // ============================== SLIDE 17 · HONEST LIMITS ==============================
  {
    const s = base();
    kicker(s, 'So nobody oversells it in the hallway');
    title(s, 'What AI can’t do here');
    const items = [
      ['Doesn’t know your kids', 'It never met the reader who shuts down, or the one who’s two grades ahead.'],
      ['Leveled ≠ verified', 'The label is a guess until you check it.'],
      ['Can invent things', 'Activities that don’t quite work; resources that don’t exist.'],
    ];
    items.forEach(([h, b], i) => {
      const x = 0.7 + i * 4.12;
      card(s, x, 1.7, 3.85, 3.2, PAPER);
      s.addText(h, { x: x + 0.28, y: 2.0, w: 3.3, h: 0.9, fontFace: FONT, fontSize: 19, bold: true, color: BAD, margin: 0 });
      s.addText(b, { x: x + 0.28, y: 3.0, w: 3.3, h: 1.6, fontFace: FONT, fontSize: 16, color: INK, margin: 0, valign: 'top' });
    });
    s.addText('None of that is a reason to skip the tool. All of it is the reason the teacher stays in the loop.', {
      x: 0.7, y: 5.4, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 19, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('The drafting got fast. The deciding is still yours. Steady, honest beat before the equity note.');
  }

  // ============================== SLIDE 18 · THE EQUITY NOTE ==============================
  {
    const s = base();
    kicker(s, 'Bigger than this room');
    title(s, 'Narrow gaps. Don’t widen them.');
    card(s, 0.7, 1.8, 12.0, 3.2, PAPER);
    s.addText('25%', { x: 0.7, y: 2.2, w: 12.0, h: 1.4, fontFace: FONT, fontSize: 72, bold: true, color: TEAL, align: 'center', margin: 0 });
    s.addText('of teachers used AI for planning or teaching in 2023–24, and adoption lagged in higher-poverty schools. (RAND, 2025)', {
      x: 1.4, y: 3.7, w: 10.5, h: 1.1, fontFace: FONT, fontSize: 16, color: INK, align: 'center', margin: 0 });
    s.addText('The fix in this building: everyone learns the moves, everyone shares the prompts, every roster benefits.', {
      x: 0.7, y: 5.5, w: 12.0, h: 0.6, fontFace: FONT, fontSize: 19, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('That’s from RAND (RR-A134-25): the schools whose students most need differentiated materials are least likely to be getting AI’s help making them. Then read the authors’ shared take from the script: in practice, equity tends to favor the struggling child, and the top end of the class gets forgotten; now that extensions cost two minutes, build the stretch on purpose.');
  }

  // ============================== SLIDE 19 · LAB SETUP ==============================
  {
    const s = base(true);
    kicker(s, 'Hands-on · ~20 minutes', { color: AMBER });
    s.addText('Lab: differentiate your real lesson.', {
      x: 0.7, y: 1.5, w: 12.0, h: 1.0, fontFace: FONT, fontSize: 40, bold: true, color: WHITE, margin: 0 });
    s.addText('The lesson you brought. By the end: a core artifact, a support version, and an extension, reviewed and teachable this week.', {
      x: 0.7, y: 2.6, w: 12.0, h: 0.9, fontFace: FONT, fontSize: 20, color: 'C9D4DE', margin: 0 });
    const rules = [
      ['1', 'No student information: describe needs, never names'],
      ['2', 'Draft the core with the four-part formula, then differentiate two directions'],
      ['3', 'Nothing is done until it passes the 4-point review'],
    ];
    rules.forEach(([n, r], i) => {
      const y = 3.8 + i * 0.9;
      s.addShape('ellipse', { x: 0.9, y, w: 0.62, h: 0.62, fill: { color: TEAL }, line: { color: TEAL } });
      s.addText(n, { x: 0.9, y, w: 0.62, h: 0.62, fontFace: FONT, fontSize: 20, bold: true, color: WHITE, align: 'center', valign: 'middle', margin: 0 });
      s.addText(r, { x: 1.75, y: y - 0.05, w: 10.8, h: 0.72, fontFace: FONT, fontSize: 20, color: WHITE, margin: 0, valign: 'middle' });
    });
    s.addNotes('Pairs, devices out inside two minutes, announce the tool. The standard to name here: differentiate until understanding is equal, and let AI do the drafting that used to make that impossible.');
  }

  // ============================== SLIDE 20 · LAB STEP 1 ==============================
  {
    const s = base();
    kicker(s, 'Lab · step 1 of 3 · 5 minutes');
    title(s, 'Draft the core artifact');
    const parts = ['Pick the one artifact your lesson most needs: reading, practice set, directions, exit check', 'Role · task · context · format, and be generous with context', 'What did students just learn? What do they always trip on?', 'Run it. Read like an editor. Get it to 80%, not perfect.'];
    parts.forEach((t, i) => {
      const y = 1.65 + i * 0.95;
      card(s, 0.7, y, 12.0, 0.8, PAPER);
      s.addText(t, { x: 1.05, y: y + 0.06, w: 11.3, h: 0.68, fontFace: FONT, fontSize: 18, color: INK, margin: 0, valign: 'middle' });
    });
    s.addText('Don’t polish. The next step is where today earns its name.', {
      x: 0.7, y: 5.7, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 20, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('Circulate. Weak drafts usually lack context; nudge with “what would a substitute need to know about this lesson?”');
  }

  // ============================== SLIDE 21 · LAB STEP 2 ==============================
  {
    const s = base();
    kicker(s, 'Lab · step 2 of 3 · 7 minutes');
    title(s, 'Differentiate it: two directions');
    card(s, 0.7, 1.7, 5.9, 4.2, 'EAF5F3');
    s.addText('Support', { x: 1.05, y: 2.0, w: 5.2, h: 0.5, fontFace: FONT, fontSize: 22, bold: true, color: GOOD, margin: 0 });
    s.addText('Level it down or scaffold it, your choice. Use the handout prompt as-is; the AI already has your artifact in the chat.', {
      x: 1.05, y: 2.6, w: 5.2, h: 2.9, fontFace: FONT, fontSize: 18, color: INK, margin: 0, valign: 'top' });
    card(s, 6.85, 1.7, 5.9, 4.2, PAPER);
    s.addText('Stretch', { x: 7.2, y: 2.0, w: 5.2, h: 0.5, fontFace: FONT, fontSize: 22, bold: true, color: TEAL, margin: 0 });
    s.addText('Extension prompts: apply, critique, teach back. Depth, not length. Say “no additional practice problems.”', {
      x: 7.2, y: 2.6, w: 5.2, h: 2.9, fontFace: FONT, fontSize: 18, color: INK, margin: 0, valign: 'top' });
    s.addText('You’re building the versions that used to cost an evening, inside seven minutes.', {
      x: 0.7, y: 6.15, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 18, italic: true, color: MUTED, align: 'center', margin: 0 });
    s.addNotes('Two follow-up prompts in the same chat. 45-min cut: one direction instead of two; each teacher picks support or stretch based on their roster.');
  }

  // ============================== SLIDE 22 · LAB STEP 3 ==============================
  {
    const s = base();
    kicker(s, 'Lab · step 3 of 3 · 4 minutes');
    title(s, 'Run the 4-point review. Fix what fails.');
    const checks = ['Accurate? Check facts and any named resources', 'At level, actually? Read the support version aloud to your partner', 'Fits your students? Swap the examples that won’t land', 'Sounds like you? If not: “warmer,” “plainer,” “shorter”'];
    checks.forEach((t, i) => {
      const y = 1.65 + i * 0.95;
      card(s, 0.7, y, 12.0, 0.8, PAPER);
      s.addText(t, { x: 1.05, y: y + 0.06, w: 11.3, h: 0.68, fontFace: FONT, fontSize: 18, color: INK, margin: 0, valign: 'middle' });
    });
    s.addText('An artifact that passes all four is done. Not AI-done. Done done.', {
      x: 0.7, y: 5.7, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 20, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('Insist on this step; skipping review is the failure mode of the whole kit. Pairs swap and check each other’s level labels: a partner’s ear is the first check.');
  }

  // ============================== SLIDE 23 · SHARE-OUT ==============================
  {
    const s = base();
    kicker(s, 'Share-out · 3–4 voices');
    title(s, 'What did you build?');
    bullets(s, [
      'What’s your artifact, and which direction surprised you?',
      'Did the 4-point review catch anything?',
      { text: 'If the AI got a level wrong or invented something, that story goes first.', options: { bold: true, color: NAVY } },
    ], { y: 1.7, h: 2.8, fontSize: 22 });
    s.addNotes('Prioritize anyone whose review caught a real problem; it’s the most useful minute in the room. 45-min cut: two voices. Keep each to a minute.');
  }

  // ============================== SLIDE 24 · WHAT YOU BUILT ==============================
  {
    const s = base();
    kicker(s, 'Nineteen minutes ago this didn’t exist');
    title(s, 'From good intentions to materials');
    card(s, 0.7, 1.8, 12.0, 3.6, PAPER);
    s.addText([
      { text: 'A core artifact. A support version. An extension. All reviewed by the one person qualified to review them.\n\n', options: { bold: true, color: NAVY } },
      { text: 'The research said differentiation works best embedded and technology-supported. That’s not a description of some other school anymore. It’s what’s on your screen.', options: { color: INK } },
    ], { x: 1.1, y: 2.1, w: 11.2, h: 3.0, fontFace: FONT, fontSize: 20, margin: 0, valign: 'middle' });
    s.addNotes('Say: an hour ago, differentiation was a good intention priced at three hand-built versions of everything. You just built core, support, and stretch for a real lesson in twenty minutes, and the research from slide 2 says materials that actually differ are what make it work. Land it plainly and move to the habit.');
  }

  // ============================== SLIDE 25 · ONE ARTIFACT A WEEK ==============================
  {
    const s = base();
    kicker(s, 'The habit that compounds');
    title(s, 'One differentiated artifact per week');
    bullets(s, [
      'Not a differentiated everything; that’s burnout dressed up as ambition',
      'One lesson a week gets the full treatment: core, support, extension, review',
      { text: 'Fifteen weeks in: fifteen lessons deep with materials for every learner on your roster', options: { bold: true, color: NAVY } },
    ], { y: 1.6, h: 2.6 });
    card(s, 0.7, 4.4, 12.0, 1.7, 'EAF5F3');
    s.addText('Small, steady, sustainable. That’s the whole strategy.', {
      x: 1.05, y: 4.6, w: 11.3, h: 1.3, fontFace: FONT, fontSize: 24, bold: true, color: NAVY, margin: 0, valign: 'middle' });
    s.addNotes('Built in the margins of time staff already have. The 30-day plan’s PLC follow-ups reinforce exactly this cadence.');
  }

  // ============================== SLIDE 26 · COMMITMENT #5 ==============================
  {
    const s = base(true);
    kicker(s, 'The list grows by one', { color: AMBER });
    s.addText('Commitment #5', {
      x: 0.7, y: 1.6, w: 12.0, h: 0.8, fontFace: FONT, fontSize: 36, bold: true, color: WHITE, margin: 0 });
    s.addText('Nothing AI-drafted reaches a student until it passes the 4-point review.\nAnd working differentiation prompts go in the staff doc.', {
      x: 0.7, y: 2.7, w: 12.0, h: 1.6, fontFace: FONT, fontSize: 27, bold: true, color: TEAL, margin: 0, lineSpacingMultiple: 1.2 });
    s.addText('Can I get a nod on that?', {
      x: 0.7, y: 5.3, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 20, italic: true, color: '9FB2C2', margin: 0 });
    s.addNotes('Kit 1 gave three commitments; Kit 2 added the staff doc. Ask for the visible nod; agreement out loud is what makes it a norm.');
  }

  // ============================== SLIDE 27 · WHAT'S NEXT ==============================
  {
    const s = base();
    kicker(s, 'Kit 3 of 8 · Track A');
    title(s, 'Where this series goes next');
    const kits = ['1 · Foundations & Safety  ✔', '2 · Prompting Basics  ✔', '3 · Planning & Differentiation  ✔', '4 · Assessment', '5 · Academic Integrity', '6 · Communication', '7 · Workload', '8 · Your School’s AI Culture'];
    kits.forEach((k, i) => {
      const x = 0.7 + (i % 4) * 3.1, y = 1.7 + Math.floor(i / 4) * 1.3;
      card(s, x, y, 2.9, 1.1, i < 3 ? 'EAF5F3' : PAPER);
      s.addText(k, { x: x + 0.2, y: y + 0.1, w: 2.5, h: 0.9, fontFace: FONT, fontSize: 14.5, bold: i < 3, color: NAVY, margin: 0, valign: 'middle' });
    });
    card(s, 0.7, 4.6, 12.0, 1.6, NAVY);
    s.addText([
      { text: 'Next: Kit 4, AI for Assessment. ', options: { bold: true, color: WHITE } },
      { text: 'You built the materials for the range of learners in your room; next we build the ways to find out what they learned: question banks, rubrics, feedback that doesn’t eat your Sunday.', options: { color: 'C9D4DE' } },
    ], { x: 1.05, y: 4.8, w: 11.3, h: 1.2, fontFace: FONT, fontSize: 17, margin: 0, valign: 'middle' });
    s.addNotes('Your differentiated artifact from today comes with you; it’s about to need an exit ticket. Completing all eight kits earns the Certificate of Completion; check with your district or state about local credit.');
  }

  // ============================== SLIDE 28 · FIRST 48 ==============================
  {
    const s = base();
    kicker(s, 'Before Friday becomes a memory');
    title(s, 'Your first 48 hours: three small things');
    const acts = [
      ['~10 min', 'Teach with your lab artifact', 'Then jot one line: what did the support kids and stretch kids actually do?'],
      ['~10 min', 'Level one more text, then check the level', 'Read it aloud, eyeball sentence length, fix what the label got wrong'],
      ['~2 min', 'Post your best prompt to the staff doc', 'Your move, your name, one line about the lesson it fit'],
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
      'The differentiation move you’ll use first',
      'The artifact you built in the lab',
      'One differentiation task you still want help with',
    ], { y: 1.7, h: 2.6, fontSize: 24 });
    s.addText('Your answers steer the PLC follow-ups. Be honest.', {
      x: 0.7, y: 4.7, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 19, italic: true, color: MUTED, margin: 0 });
    s.addNotes('Distribute tickets; collect at the door. They double as the school’s PD documentation.');
  }

  // ============================== SLIDE 30 · CLOSE ==============================
  {
    const s = base(true);
    s.addText('Differentiation was never\na good-intentions problem.\nIt was a time problem.', {
      x: 0.7, y: 1.9, w: 12.0, h: 2.2, fontFace: FONT, fontSize: 34, bold: true, color: WHITE, align: 'center', margin: 0, lineSpacingMultiple: 1.2 });
    s.addText('The time problem just got smaller.\nThe knowing-your-kids part was always yours.', {
      x: 0.7, y: 4.4, w: 12.0, h: 1.2, fontFace: FONT, fontSize: 24, bold: true, color: TEAL, align: 'center', margin: 0, lineSpacingMultiple: 1.25 });
    s.addText('Human teaching. Life-changing tools.', {
      x: 0.7, y: 6.4, w: 12.0, h: 0.4, fontFace: FONT, fontSize: 13, color: '9FB2C2', align: 'center', charSpacing: 2, margin: 0 });
    s.addNotes('Go teach the lesson you just planned. Thanks, everyone. Collect the exit tickets at the door.');
  }

  const out = path.join(root, 'kits/kit03/Kit03_PresentationDeck.pptx');
  await p.writeFile({ fileName: out });
  console.log('wrote', out, '·', slideNo, 'slides');
})();
