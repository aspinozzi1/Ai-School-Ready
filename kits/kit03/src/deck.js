#!/usr/bin/env node
/* Kit 3 Presentation Deck · AI for Planning & Differentiation
   35 slides, locked AI-Ready School brand, speaker notes on every slide.
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

  const RIVERA = [null, "Her dilemma: differentiation worked when she managed it; the hours didn't exist.",
    "Her time math changed: the drafting help finally arrived.",
    "Her goal: one artifact, three versions, reviewed, teachable this week.",
    "Her stance: never from a blank page again. Skeleton drafted, judgment hers.",
    "Her expectation: a 30-minute draft, and at least one invented thing to catch.",
    "Her review habit: that's where her expertise enters the document.",
    "Her UDL frame: AI generates the menu; she orders for her class.",
    "Her workflow: draft, then options, then pick and adapt, then review.",
    "Her four moves: level it, scaffold it, stretch it, reformat it.", null, "Her level check: read aloud, eyeball sentence length, try on one student.",
    "Her scaffold set: starters, word bank, worked example on a different topic.",
    "Her stretch rule: depth, not more worksheets. Apply, critique, teach.",
    "Her reformat: same lesson as stations, cards, and a ramped practice set.",
    "Her 4-point review: accurate, at level, fits her kids, sounds like her.",
    "Her honesty: the level label is a guess until she checks it.",
    "Her equity move: build the stretch on purpose, not just the support.",
    "Her lab pick, one artifact all the way through: her 6th grade food webs passage.",
    "On her screen big: her food webs passage, drafted to 80%, not polished.",
    "Her starting artifact, in full: the on-grade food webs passage she will differentiate.",
    "Her passage's two follow-ups, same chat: the support version, then the stretch.",
    null, null,
    "Her passage's review, run live: one long sentence split, one example swapped.",
    "Her support version, finished: the same science, sentences a struggling reader can hold.",
    "Her stretch and her stations, finished: depth for some, a new shape for Tuesday.",
    "Her share-out: what the review caught in her food webs passage, told first.",
    "Her twenty minutes: one food webs passage became four teachable versions.",
    "Her habit: one differentiated artifact a week. Small and steady.",
    "Her commitment #5: nothing reaches a student until the review passes.",
    "Her next kit: assessment. Rubrics and question banks from her notes.",
    "Her 48 hours: teach the support version, run one review, post one prompt.",
    "Her exit ticket: the artifact built, the direction that surprised her.", null];
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
      s.addText(`Kit 3 · Planning & Differentiation   |   ${slideNo}`, {
        x: W - 4.6, y: H - 0.47, w: 4.15, h: 0.32, fontFace: FONT, fontSize: 9,
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
  // The exemplar layout the owner approved (Kit 4 slide 9): a full-width generic
  // chat window, navy title bar with three dots, a paper inner card holding Ms.
  // Rivera's actual prompt colour-coded by part, legend chips across the bottom.
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
  // 0.25 margin on each side. Same geometry as the approved kit04 slide 9.
  function chatPaper(s, y, h, inset = 1.0) {
    s.addShape('roundRect', { x: 0.7 + inset, y: y + 0.65, w: 12.25 - (0.7 + inset), h: h - 0.9, rectRadius: 0.12, fill: { color: PAPER }, line: { color: PAPER } });
  }
  const PART_CHIPS = [['ROLE', TEAL], ['TASK', NAVY], ['CONTEXT', 'B07914'], ['FORMAT', GOOD]];
  const MOVE_CHIPS = [['LEVEL IT', TEAL], ['SCAFFOLD IT', NAVY], ['STRETCH IT', 'B07914'], ['REFORMAT IT', GOOD]];
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
    chatWin(s, 1.95, 3.85);
    chatPaper(s, 1.95, 3.85);
    s.addText([
      { text: '“You are a reading specialist. ', options: { color: TEAL, bold: true } },
      { text: 'Rewrite the passage below at three levels: on-grade for 6th grade, about two years below, and about two years above. ', options: { color: NAVY, bold: true } },
      { text: 'Keep every key idea, the section headings, and the same core vocabulary. ', options: { color: 'B07914', bold: true } },
      { text: 'Lower level: sentences under 12 words plus a 5-word vocabulary box. Higher level: raise the complexity of the reasoning, not just the vocabulary. Label each version.”  [paste passage]', options: { color: GOOD, bold: true } },
    ], { x: 1.95, y: 2.75, w: 10.05, h: 2.7, fontFace: FONT, fontSize: 16, margin: 0, valign: 'top', lineSpacingMultiple: 1.1 });
    legend(s, 6.05, PART_CHIPS);
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
    kicker(s, 'Move 2 · same target, more handholds · on her screen');
    title(s, 'Scaffold it');
    card(s, 0.7, 1.34, 12.0, 1.26, PAPER);
    s.addText([
      { text: 'Sentence starters: ', options: { bold: true, color: NAVY } },
      { text: 'one per paragraph; gets the stuck writer moving', options: { color: INK, breakLine: true } },
      { text: 'Word bank: ', options: { bold: true, color: NAVY } },
      { text: '10 words with student-friendly definitions', options: { color: INK, breakLine: true } },
      { text: 'Worked example: ', options: { bold: true, color: NAVY } },
      { text: 'on a different topic, so it teaches the shape, not the answer', options: { color: INK, breakLine: true } },
      { text: 'Organizer text: ', options: { bold: true, color: NAVY } },
      { text: 'the labels and prompts for your graphic organizer', options: { color: INK } },
    ], { x: 1.05, y: 1.42, w: 11.3, h: 1.1, fontFace: FONT, fontSize: 15.5, margin: 0, valign: 'middle', lineSpacingMultiple: 1.08 });
    chatWin(s, 2.70, 3.35);
    chatPaper(s, 2.70, 3.35);
    s.addText([
      { text: '“You are a 6th grade science teacher. ', options: { color: TEAL, bold: true } },
      { text: 'For the food webs passage below, create five sentence starters, a 10-word word bank, and one fully worked example paragraph. ', options: { color: NAVY, bold: true } },
      { text: 'My students can explain a food web out loud and then freeze on the page. Keep the science exactly as the passage has it. ', options: { color: 'B07914', bold: true } },
      { text: 'One starter per paragraph, student-friendly definitions, and the worked example on a different topic, so students see the shape without copying the content.”  [paste passage]', options: { color: GOOD, bold: true } },
    ], { x: 1.95, y: 3.47, w: 10.05, h: 2.2, fontFace: FONT, fontSize: 15.5, margin: 0, valign: 'top', lineSpacingMultiple: 1.1 });
    legend(s, 6.18, PART_CHIPS);
    s.addNotes('Say: move two is scaffolds. Same task, same target, more handholds, and here it is on Ms. Rivera\'s screen, filled in on the food webs passage she is carrying through this session. Role in teal, task in navy, context in amber, format in green; your handout has the same prompt as a blank template. The clause worth pointing at is the worked example on a DIFFERENT topic: that teaches the structure and keeps the thinking with the student.');
  }

  // ============================== SLIDE 14 · MOVE 3: STRETCH IT ==============================
  {
    const s = base();
    kicker(s, 'Move 3 · early finishers & advanced learners · on her screen');
    title(s, 'Stretch it: depth, not more worksheets');
    card(s, 0.7, 1.34, 12.0, 1.26, PAPER);
    s.addText([
      { text: 'Apply: ', options: { bold: true, color: NAVY } },
      { text: 'use the concept in an unfamiliar context', options: { color: INK, breakLine: true } },
      { text: 'Critique: ', options: { bold: true, color: NAVY } },
      { text: 'find the flaw in a flawed example', options: { color: INK, breakLine: true } },
      { text: 'Teach: ', options: { bold: true, color: NAVY } },
      { text: 'explain it to a younger student, in their own words', options: { color: INK, breakLine: true } },
      { text: 'A second worksheet is a punishment for being fast. Say “no additional practice problems.”', options: { italic: true, color: MUTED } },
    ], { x: 1.05, y: 1.42, w: 11.3, h: 1.1, fontFace: FONT, fontSize: 15.5, margin: 0, valign: 'middle', lineSpacingMultiple: 1.08 });
    chatWin(s, 2.70, 3.35);
    chatPaper(s, 2.70, 3.35);
    s.addText([
      { text: '“You are a 6th grade science teacher. ', options: { color: TEAL, bold: true } },
      { text: 'Create three extension prompts for students who have already mastered the food webs passage below. ', options: { color: NAVY, bold: true } },
      { text: 'These are the students who finish in ten minutes. Go deeper, not longer, and no additional practice problems. ', options: { color: 'B07914', bold: true } },
      { text: 'One prompt that applies the idea to an unfamiliar context, one that asks them to critique a flawed example, and one that asks them to teach it to a younger student in their own words.”  [paste passage]', options: { color: GOOD, bold: true } },
    ], { x: 1.95, y: 3.47, w: 10.05, h: 2.2, fontFace: FONT, fontSize: 15.5, margin: 0, valign: 'top', lineSpacingMultiple: 1.1 });
    legend(s, 6.18, PART_CHIPS);
    s.addNotes('Say: move three is extension, and the quiet rule goes out loud: early finishers get depth, not more of the same. Ms. Rivera\'s screen shows the prompt on her food webs passage, colour-coded the same four ways; the handout carries the blank template. Apply, critique, teach: your strongest students stop being your most bored ones, and it cost a minute.');
  }

  // ============================== SLIDE 15 · MOVE 4: REFORMAT IT ==============================
  {
    const s = base();
    kicker(s, 'Move 4 · the UDL move · on her screen');
    title(s, 'Reformat it: same content, new shape');
    card(s, 0.7, 1.34, 12.0, 1.26, PAPER);
    s.addText([
      { text: 'Stations: ', options: { bold: true, color: NAVY } },
      { text: 'four activity-direction sets from one lesson', options: { color: INK, breakLine: true } },
      { text: 'Discussion cards: ', options: { bold: true, color: NAVY } },
      { text: 'eight cards, one question each', options: { color: INK, breakLine: true } },
      { text: 'Practice set: ', options: { bold: true, color: NAVY } },
      { text: '10 items ramping from recall to application', options: { color: INK, breakLine: true } },
      { text: 'One draft becomes a menu: multiple means of engagement and expression, on demand.', options: { italic: true, color: MUTED } },
    ], { x: 1.05, y: 1.42, w: 11.3, h: 1.1, fontFace: FONT, fontSize: 15.5, margin: 0, valign: 'middle', lineSpacingMultiple: 1.08 });
    chatWin(s, 2.70, 3.35);
    chatPaper(s, 2.70, 3.35);
    s.addText([
      { text: '“You are a 6th grade science teacher. ', options: { color: TEAL, bold: true } },
      { text: 'Turn the food webs content below into three formats. ', options: { color: NAVY, bold: true } },
      { text: 'Same concepts and same vocabulary in all three, and label everything, so I can hand them out without re-reading them. ', options: { color: 'B07914', bold: true } },
      { text: 'A set of four station-activity directions. A deck of eight discussion cards, one question per card. A 10-item practice set that ramps from recall to application.”  [paste content]', options: { color: GOOD, bold: true } },
    ], { x: 1.95, y: 3.47, w: 10.05, h: 2.2, fontFace: FONT, fontSize: 15.5, margin: 0, valign: 'top', lineSpacingMultiple: 1.1 });
    legend(s, 6.18, PART_CHIPS);
    s.addNotes('Say: move four is the UDL move, same content in a different shape. On Ms. Rivera\'s screen it runs on the same food webs content, with the four parts colour-coded; the handout has the blank template. Some days you use one format, some days three stations run at once. Either way, the version you never had time to make now exists.');
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
    s.addNotes('Pairs, devices out inside two minutes, announce the tool. The standard to name here: differentiate until understanding is equal, and let AI do the drafting that used to make that impossible. Ms. Rivera builds ONE artifact across all three steps, the reading passage for her 6th grade food webs lesson. You will see it through to completion: the passage she starts with (slide 21), the prompt she types (slide 23), her four follow-ups and what each one changed (slide 24), and the finished set (slide 26). Anyone lost can copy her structure.');
  }

  // ============================== SLIDE 20 · LAB STEP 1 ==============================
  {
    const s = base();
    kicker(s, "Lab · step 1 of 3 · 5 minutes");
    title(s, "Draft the core artifact");
    bullets(s, [
      "Pick the one artifact your lesson most needs: reading, practice set, directions, exit check",
      "Role · task · context · format, and be generous with context",
      "What did students just learn? What do they always trip on?",
      "Run it. Read like an editor. Get it to 80%, not perfect.",
    ], { x: 0.7, y: 1.7, w: 5.9, h: 4.4, fontSize: 16.5 });
    card(s, 6.85, 1.7, 5.9, 4.4, "EAF5F3");
    s.addText("MS. RIVERA'S PASSAGE · STEP 1", { x: 7.15, y: 1.9, w: 5.4, h: 0.32, fontFace: FONT, fontSize: 12.5, bold: true, color: TEAL, charSpacing: 1.5, margin: 0 });
    s.addText([
      { text: "Her pick: ", options: { bold: true, color: NAVY } },
      { text: "the reading passage for her 6th grade food webs lesson.\n\n", options: { color: INK } },
      { text: "“Food Webs: Energy on the Move”\n", options: { bold: true, color: NAVY } },
      { text: "Four sections, drafted with the formula: what a food web shows · producers and consumers · decomposers · when one link breaks.\n\n", options: { color: INK } },
      { text: "“Eighty percent is enough. The polish waits for the review.”", options: { italic: true, color: MUTED } },
    ], { x: 7.15, y: 2.35, w: 5.35, h: 3.6, fontFace: FONT, fontSize: 16.5, margin: 0, valign: "top", lineSpacingMultiple: 1.2 });
    s.addText("Don’t polish. The next step is where today earns its name.", {
      x: 0.7, y: 6.25, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 20, bold: true, color: NAVY, align: "center", margin: 0 });
    s.addNotes("Say: step one, draft the core artifact with the Kit 2 formula, and get it to eighty percent. Circulate. Weak drafts usually lack context; nudge with “what would a substitute need to know about this lesson?” The big card is Ms. Rivera’s step 1: one reading passage for her 6th grade food webs lesson, drafted to 80%. The next slide shows that passage in full.");
  }

  // ============================== SLIDE 21 · HER STARTING ARTIFACT ==============================
  {
    const s = base();
    kicker(s, 'Lab · step 1 · Ms. Rivera’s core artifact');
    title(s, 'The passage she starts with');
    card(s, 0.7, 1.34, 12.0, 4.45, PAPER);
    s.addShape('roundRect', { x: 0.7, y: 1.34, w: 0.12, h: 4.45, rectRadius: 0.05, fill: { color: TEAL }, line: { color: TEAL } });
    s.addText('MS. RIVERA’S CORE ARTIFACT · 6TH GRADE SCIENCE · ON-GRADE DRAFT', {
      x: 1.1, y: 1.5, w: 11.2, h: 0.3, fontFace: FONT, fontSize: 12, bold: true, color: TEAL, charSpacing: 1.5, margin: 0, valign: 'middle' });
    s.addText('“Food Webs: Energy on the Move”', {
      x: 1.1, y: 1.85, w: 11.2, h: 0.5, fontFace: FONT, fontSize: 26, bold: true, color: NAVY, margin: 0, valign: 'middle' });
    s.addText([
      { text: 'Section 1 · What a food web shows\n', options: { bold: true, color: TEAL, fontSize: 14 } },
      { text: 'Every organism in an ecosystem needs energy, and a food web is the map of where that energy goes. Producers, such as grasses and oak trees, capture sunlight and build their own food. Consumers get their energy secondhand: a rabbit eats the grass, a hawk eats the rabbit.\n\n', options: { color: INK, fontSize: 17 } },
      { text: 'Section 4 · When one link breaks\n', options: { bold: true, color: TEAL, fontSize: 14 } },
      { text: 'Remove the hawks from a schoolyard food web and the rabbits are not the only thing that changes. The grasses get grazed to the roots, the soil loses its cover, and the decomposers that live on fallen leaves lose their supply.', options: { color: INK, fontSize: 17 } },
    ], { x: 1.1, y: 2.4, w: 11.2, h: 3.25, fontFace: FONT, margin: 0, valign: 'top', lineSpacingMultiple: 1.14 });
    s.addText('Four sections, drafted with role, task, context, format. Eighty percent, not polished. Every version that follows starts here.', {
      x: 0.7, y: 5.95, w: 12.0, h: 0.6, fontFace: FONT, fontSize: 19, bold: true, color: NAVY, align: 'center', margin: 0, valign: 'middle' });
    s.addNotes('Say: this is the artifact Ms. Rivera is about to differentiate, in full, so nobody has to imagine it. Sections 2 and 3, producers and consumers, then decomposers, run the same way; sections 1 and 4 are on screen. Point out that it is on-grade and unpolished: this is what eighty percent looks like, and it is enough to start differentiating. Keep this up while pairs finish their own step 1 draft.');
  }

  // ============================== SLIDE 22 · LAB STEP 2 ==============================
  {
    const s = base();
    kicker(s, 'Lab · step 2 of 3 · 7 minutes');
    title(s, 'Differentiate it: two directions');
    card(s, 0.7, 1.7, 5.9, 2.05, PAPER);
    s.addText('Support', { x: 1.0, y: 1.88, w: 5.3, h: 0.42, fontFace: FONT, fontSize: 19, bold: true, color: GOOD, margin: 0 });
    s.addText('Level it down or scaffold it, your choice. Use the handout prompt as-is; the AI already has your artifact in the chat.', {
      x: 1.0, y: 2.34, w: 5.3, h: 1.3, fontFace: FONT, fontSize: 14.5, color: INK, margin: 0, valign: 'top' });
    card(s, 0.7, 3.95, 5.9, 2.05, PAPER);
    s.addText('Stretch', { x: 1.0, y: 4.13, w: 5.3, h: 0.42, fontFace: FONT, fontSize: 19, bold: true, color: TEAL, margin: 0 });
    s.addText('Extension prompts: apply, critique, teach back. Depth, not length. Say “no additional practice problems.”', {
      x: 1.0, y: 4.59, w: 5.3, h: 1.3, fontFace: FONT, fontSize: 14.5, color: INK, margin: 0, valign: 'top' });
    card(s, 6.85, 1.7, 5.9, 4.3, 'EAF5F3');
    s.addText('MS. RIVERA\'S PASSAGE · STEP 2', { x: 7.15, y: 1.9, w: 5.4, h: 0.32, fontFace: FONT, fontSize: 12.5, bold: true, color: TEAL, charSpacing: 1.5, margin: 0 });
    s.addText([
      { text: 'Support: ', options: { bold: true, color: GOOD } },
      { text: 'her passage leveled down. Sentences under 12 words, plus a 5-word vocabulary box.\n\n', options: { color: INK } },
      { text: 'Stretch: ', options: { bold: true, color: TEAL } },
      { text: 'three depth prompts: apply it to a desert food web, find the flaw in a broken one, teach it to a 3rd grader.\n\n', options: { color: INK } },
      { text: '"Same chat, no re-pasting. My prompt is on the next slide."', options: { italic: true, color: MUTED } },
    ], { x: 7.15, y: 2.35, w: 5.35, h: 3.5, fontFace: FONT, fontSize: 16, margin: 0, valign: 'top', lineSpacingMultiple: 1.2 });
    s.addText('You’re building the versions that used to cost an evening, inside seven minutes.', {
      x: 0.7, y: 6.25, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 18, italic: true, color: MUTED, align: 'center', margin: 0 });
    s.addNotes('Say: step two, differentiate it in two directions, both as follow-ups in the same chat. The big card is Ms. Rivera\'s step 2 on the same food webs passage: the leveled support version, then three depth prompts. The next two slides show her actual prompt and every follow-up she typed, so mimicking her is possible from the screen alone. 45-min cut: one direction instead of two; each teacher picks support or stretch based on their roster.');
  }

  // ============================== SLIDE 23 · HER PROMPT ON SCREEN ==============================
  {
    const s = base();
    kicker(s, 'Lab · step 2 · the prompt she types into the chat');
    title(s, 'What she actually typed');
    s.addText([
      { text: 'BEFORE   ', options: { bold: true, color: BAD } },
      { text: '“Now make an easier version of that.”', options: { italic: true, color: MUTED } },
    ], { x: 0.7, y: 1.42, w: 12.0, h: 0.4, fontFace: FONT, fontSize: 16, margin: 0, valign: 'middle' });
    chatWin(s, 1.95, 3.85, ' · same chat');
    chatPaper(s, 1.95, 3.85);
    s.addText([
      { text: '“You are a reading specialist who works with 6th graders. ', options: { color: TEAL, bold: true } },
      { text: 'Rewrite the food webs passage you just drafted for students reading about two years below grade level. ', options: { color: NAVY, bold: true } },
      { text: 'Keep all four sections, every key idea, and these words: producer, consumer, decomposer, energy, ecosystem. The science does not get smaller; the sentences do. ', options: { color: 'B07914', bold: true } },
      { text: 'Sentences under 12 words. Add a 5-word vocabulary box with student-friendly definitions. Label it “Support version.”', options: { color: GOOD, bold: true } },
    ], { x: 1.95, y: 2.75, w: 10.05, h: 2.7, fontFace: FONT, fontSize: 16, margin: 0, valign: 'top', lineSpacingMultiple: 1.1 });
    legend(s, 6.05, PART_CHIPS);
    s.addNotes('Say: this is the whole point of the lab on one screen. The same four parts you learned in Kit 2, aimed at the passage from two slides ago: role in teal, task in navy, context in amber, format in green. Notice what the context does, because it is the part people skip: naming the five words that must survive is what keeps the support version real science instead of baby talk. At worst, copy this shape with your own artifact and you will finish the lab.');
  }

  // ============================== SLIDE 24 · HER ITERATIONS ==============================
  {
    const s = base();
    kicker(s, 'Lab · step 2 · her iterations, one chat, four follow-ups');
    title(s, 'What she typed next, and what changed');
    chatWin(s, 1.40, 4.55, ' · follow-ups, no re-pasting');
    chatPaper(s, 1.40, 4.55, 0.3);
    s.addText('SHE TYPED NEXT', { x: 3.75, y: 2.12, w: 4.75, h: 0.24, fontFace: FONT, fontSize: 11, bold: true, color: MUTED, charSpacing: 1.5, margin: 0, valign: 'middle' });
    s.addText('WHAT CHANGED', { x: 8.75, y: 2.12, w: 3.35, h: 0.24, fontFace: FONT, fontSize: 11, bold: true, color: MUTED, charSpacing: 1.5, margin: 0, valign: 'middle' });
    const iters = [
      ['LEVEL IT', TEAL,
        '“Rewrite it two years below grade level. Same four sections, same key words, sentences under 12 words.”',
        'One passage became two. Same science, shorter sentences, plus a 5-word vocabulary box.'],
      ['SCAFFOLD IT', NAVY,
        '“Add five sentence starters, one per paragraph, and one worked example on a different topic.”',
        'The support version can now be written from, not only read.'],
      ['STRETCH IT', 'B07914',
        '“Three extension prompts for the students who finish in ten minutes. Deeper, not longer. No extra practice problems.”',
        'Apply it to a desert web, find the flaw in a broken one, teach it to a 3rd grader.'],
      ['REFORMAT IT', GOOD,
        '“Turn the same content into four station directions and eight discussion cards. Label everything.”',
        'Tuesday can run as stations without a second planning night.'],
    ];
    iters.forEach(([badge, c, typed, changed], i) => {
      const y = 2.40 + i * 0.82;
      s.addShape('roundRect', { x: 1.35, y: y + 0.04, w: 1.72, h: 0.34, rectRadius: 0.17, fill: { color: c }, line: { color: c } });
      s.addText(badge, { x: 1.35, y: y + 0.04, w: 1.72, h: 0.34, fontFace: FONT, fontSize: 11, bold: true, color: WHITE, align: 'center', valign: 'middle', margin: 0, charSpacing: 1 });
      s.addText(typed, { x: 3.35, y, w: 5.0, h: 0.76, fontFace: FONT, fontSize: 14.5, italic: true, color: NAVY, margin: 0, valign: 'middle', lineSpacingMultiple: 1.05 });
      s.addShape('rect', { x: 8.58, y: y + 0.06, w: 0.014, h: 0.64, fill: { color: 'DCE3EA' }, line: { color: 'DCE3EA' } });
      s.addText(changed, { x: 8.75, y, w: 3.35, h: 0.76, fontFace: FONT, fontSize: 14.5, color: INK, margin: 0, valign: 'middle', lineSpacingMultiple: 1.05 });
    });
    legend(s, 6.15, MOVE_CHIPS);
    s.addNotes('Say: iteration is not failure, it is the work. Four follow-ups, one chat, nothing re-pasted, and each one is one of the four moves you learned before the lab. Read the right-hand column out loud: that is what each follow-up bought her. Tell the room the honest timing, that this whole thread ran under seven minutes, and that they are doing the same thing right now with their own artifact.');
  }

  // ============================== SLIDE 25 · LAB STEP 3 ==============================
  {
    const s = base();
    kicker(s, 'Lab · step 3 of 3 · 4 minutes');
    title(s, 'Run the 4-point review. Fix what fails.', { w: 8.7, fontSize: 28 });
    bullets(s, [
      'Accurate? Check facts and any named resources',
      'At level, actually? Read the support version aloud to your partner',
      'Fits your students? Swap the examples that won’t land',
      'Sounds like you? If not: “warmer,” “plainer,” “shorter”',
    ], { x: 0.7, y: 1.7, w: 5.9, h: 4.4, fontSize: 16.5 });
    card(s, 6.85, 1.7, 5.9, 4.4, 'EAF5F3');
    s.addText('MS. RIVERA\'S PASSAGE · STEP 3', { x: 7.15, y: 1.9, w: 5.4, h: 0.32, fontFace: FONT, fontSize: 12.5, bold: true, color: TEAL, charSpacing: 1.5, margin: 0 });
    s.addText([
      { text: 'Accurate: ', options: { bold: true, color: GOOD } },
      { text: 'passes. Every fact and resource checks out.\n', options: { color: INK } },
      { text: 'At level: ', options: { bold: true, color: BAD } },
      { text: 'one 24-word sentence in the support version. Split it in the chat.\n', options: { color: INK } },
      { text: 'Fits her kids: ', options: { bold: true, color: BAD } },
      { text: 'the ocean example swapped for the schoolyard one.\n', options: { color: INK } },
      { text: 'Sounds like her: ', options: { bold: true, color: GOOD } },
      { text: 'passes, after one follow-up: “plainer.”\n\n', options: { color: INK } },
      { text: '"Two fixes, four passes, while the chat was open."', options: { italic: true, color: MUTED } },
    ], { x: 7.15, y: 2.35, w: 5.35, h: 3.6, fontFace: FONT, fontSize: 15.5, margin: 0, valign: 'top', lineSpacingMultiple: 1.2 });
    s.addText('An artifact that passes all four is done. Not AI-done. Done done.', {
      x: 0.7, y: 6.25, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 20, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('Say: step three, run the 4-point review on all three versions and fix what fails while the chat is still open. Insist on this step; skipping review is the failure mode of the whole kit. Pairs swap and check each other’s level labels: a partner’s ear is the first check. The big card is Ms. Rivera\'s review run on the same food webs passage: two points fail, two fixes happen live, and only then is it done. The next slide shows what she ends up holding.');
  }

  // ============================== SLIDE 26 · HER SUPPORT VERSION, IN FULL ==============================
  {
    const s = base();
    kicker(s, 'Lab · the finished product · her support version');
    title(s, 'What actually came out', { w: 8.7 });
    card(s, 0.7, 1.3, 12.0, 4.42, PAPER);
    s.addText('“FOOD WEBS: ENERGY ON THE MOVE (SUPPORT VERSION)”  ·  SENTENCES UNDER 12 WORDS', {
      x: 1.0, y: 1.45, w: 11.4, h: 0.3, fontFace: FONT, fontSize: 11, bold: true, color: GOOD, charSpacing: 1.2, margin: 0, valign: 'middle' });
    s.addText([
      { text: 'Section 1 · What a food web shows\n', options: { bold: true, color: TEAL } },
      { text: 'Every living thing needs energy. A food web maps where that energy goes. Producers make their own food. Grasses and oak trees use sunlight. Consumers cannot make food. They eat other living things. A rabbit eats the grass. A hawk eats the rabbit.\n\n', options: { color: INK } },
      { text: 'Section 4 · When one link breaks\n', options: { bold: true, color: TEAL } },
      { text: 'Take the hawks out of the food web. More than the rabbits will change. The rabbits eat the grasses down to the roots. Bare soil has no cover left. Decomposers live on fallen leaves. Now they lose their supply.', options: { color: INK } },
    ], { x: 1.0, y: 1.85, w: 7.15, h: 3.7, fontFace: FONT, fontSize: 15, margin: 0, valign: 'top', lineSpacingMultiple: 1.12 });
    card(s, 8.45, 1.85, 3.95, 3.5, WHITE);
    s.addText('VOCABULARY BOX · 5 WORDS', { x: 8.7, y: 2.0, w: 3.5, h: 0.26, fontFace: FONT, fontSize: 10, bold: true, color: MUTED, charSpacing: 1.2, margin: 0, valign: 'middle' });
    s.addText([
      { text: 'producer  ', options: { bold: true, color: NAVY } },
      { text: 'makes its own food\n', options: { color: INK } },
      { text: 'consumer  ', options: { bold: true, color: NAVY } },
      { text: 'eats other living things\n', options: { color: INK } },
      { text: 'decomposer  ', options: { bold: true, color: NAVY } },
      { text: 'breaks down dead matter\n', options: { color: INK } },
      { text: 'energy  ', options: { bold: true, color: NAVY } },
      { text: 'what living things need to grow\n', options: { color: INK } },
      { text: 'ecosystem  ', options: { bold: true, color: NAVY } },
      { text: 'the living and nonliving things in one place', options: { color: INK } },
    ], { x: 8.7, y: 2.32, w: 3.5, h: 2.9, fontFace: FONT, fontSize: 12.5, margin: 0, valign: 'top', lineSpacingMultiple: 1.1 });
    s.addText([
      { text: 'On grade it read: ', options: { bold: true, color: MUTED } },
      { text: '“Consumers get their energy secondhand: a rabbit eats the grass, a hawk eats the rabbit.”  Same science. Same key words. Sentences a struggling reader can hold.', options: { italic: true, color: MUTED } },
    ], { x: 0.7, y: 5.9, w: 12.0, h: 0.75, fontFace: FONT, fontSize: 14, align: 'center', margin: 0, valign: 'middle' });
    s.addNotes('Say: this is the thing itself, not a description of it. Read Section 1 aloud, then read the on-grade sentence at the bottom, and let the room hear the difference. Point out what did not change: the four sections, the science, and the five words that are the whole point of the unit. That is what "same content, different door" means. If anyone is still deciding whether this is worth twenty minutes, this slide is the argument.');
  }

  // ============================== SLIDE 27 · HER STRETCH AND STATIONS, IN FULL ==============================
  {
    const s = base();
    kicker(s, 'Lab · the finished product · her stretch and her stations');
    title(s, 'The other two versions, word for word', { w: 8.7 });
    card(s, 0.7, 1.3, 5.85, 3.95, PAPER);
    s.addText('THREE STRETCH PROMPTS · DEPTH, NOT VOLUME', { x: 1.0, y: 1.45, w: 5.25, h: 0.3, fontFace: FONT, fontSize: 11, bold: true, color: 'B07914', charSpacing: 1.2, margin: 0, valign: 'middle' });
    s.addText([
      { text: '1. ', options: { bold: true, color: NAVY } },
      { text: '“A desert food web has no grasses. Draw one and explain where the energy starts.”\n\n', options: { color: INK } },
      { text: '2. ', options: { bold: true, color: NAVY } },
      { text: '“Here is a food web with the arrows pointing from the hawk to the rabbit. Explain what is wrong, then fix it.”\n\n', options: { color: INK } },
      { text: '3. ', options: { bold: true, color: NAVY } },
      { text: '“Explain to a 3rd grader why removing one animal changes the whole web. Use your own words.”', options: { color: INK } },
    ], { x: 1.0, y: 1.85, w: 5.25, h: 3.6, fontFace: FONT, fontSize: 14, margin: 0, valign: 'top', lineSpacingMultiple: 1.12 });
    card(s, 6.85, 1.3, 5.85, 3.95, PAPER);
    s.addText('FOUR STATION DIRECTIONS · A NEW SHAPE', { x: 7.15, y: 1.45, w: 5.25, h: 0.3, fontFace: FONT, fontSize: 11, bold: true, color: NAVY, charSpacing: 1.2, margin: 0, valign: 'middle' });
    s.addText([
      { text: 'Station 1 · Build it   ', options: { bold: true, color: TEAL } },
      { text: '“Use the cards to build a schoolyard food web. Producers go at the bottom.”\n', options: { color: INK } },
      { text: 'Station 2 · Break it   ', options: { bold: true, color: TEAL } },
      { text: '“Take one card out. List three things that change.”\n', options: { color: INK } },
      { text: 'Station 3 · Read it   ', options: { bold: true, color: TEAL } },
      { text: '“Read the passage with a partner. Find all five vocabulary words.”\n', options: { color: INK } },
      { text: 'Station 4 · Explain it   ', options: { bold: true, color: TEAL } },
      { text: '“Teach your web to the next group, in your own words.”', options: { color: INK } },
    ], { x: 7.15, y: 1.85, w: 5.25, h: 3.6, fontFace: FONT, fontSize: 14, margin: 0, valign: 'top', lineSpacingMultiple: 1.12 });
    card(s, 0.7, 5.55, 12.0, 0.72, NAVY);
    s.addText([
      { text: 'Accurate · At level · Fits her students · Sounds like her.  ', options: { bold: true, color: TEAL } },
      { text: 'All four passed, after two fixes. One passage in, four teachable versions out.', options: { color: WHITE } },
    ], { x: 1.05, y: 5.55, w: 11.3, h: 0.72, fontFace: FONT, fontSize: 16, align: 'center', margin: 0, valign: 'middle' });
    s.addNotes('Say: the stretch prompts are the equity half of the hour, and notice not one of them is another worksheet. The stations are the same content in a shape Tuesday can actually run. Read station 2 aloud; it is the whole unit in one line. Then the arithmetic: hand-built this was an evening, on her screen it was under twenty minutes, and all four versions passed her review.');
  }

  // ============================== SLIDE 28 · SHARE-OUT ==============================
  {
    const s = base();
    kicker(s, 'Share-out · 3–4 voices');
    title(s, 'What did you build?');
    bullets(s, [
      'What’s your artifact, and which direction surprised you?',
      'Did the 4-point review catch anything?',
      { text: 'If the AI got a level wrong or invented something, that story goes first.', options: { bold: true, color: NAVY } },
    ], { y: 1.7, h: 2.8, fontSize: 22 });
    s.addNotes('Prioritize anyone whose review caught a real problem; it’s the most useful minute in the room. Ms. Rivera\'s model story is on the chip: what the review caught in her food webs passage goes first. 45-min cut: two voices. Keep each to a minute.');
  }

  // ============================== SLIDE 29 · WHAT YOU BUILT ==============================
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

  // ============================== SLIDE 30 · ONE ARTIFACT A WEEK ==============================
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

  // ============================== SLIDE 31 · COMMITMENT #5 ==============================
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

  // ============================== SLIDE 32 · WHAT'S NEXT ==============================
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

  // ============================== SLIDE 33 · FIRST 48 ==============================
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

  // ============================== SLIDE 34 · EXIT TICKET ==============================
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

  // ============================== SLIDE 35 · CLOSE ==============================
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
