#!/usr/bin/env node
/* Kit 5 Presentation Deck · AI & Academic Integrity: Setting Clear Expectations with Students
   30 slides, locked AI-Ready School brand, speaker notes on every slide.
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
  p.title = 'Kit 5: AI & Academic Integrity: Setting Clear Expectations with Students';

  const RIVERA = [null, "Her reality check: half her students use AI; nobody told them the rules.",
    "Her blood pressure, lowered: the cheating rate didn't move.",
    "Her goal: her next assignment leaves with its AI rules written on it.",
    "Her lens: kids cheat from pressure and disengagement, not tool access.",
    "Her verdict on bans: honest kids lose, teaching stops. Not her policy.",
    "Her verdict on detectors: the maker shut its own down. Not evidence.",
    "Her red line, adopted: no accusation on a detector score alone.",
    "Her framework: three lanes. AI-free, AI-assisted, AI-included.",
    "Her labels, ready to print: one line per lane, in student words.",
    "Her system: the AI Box on the assignment, the Disclosure block at the end. Fixed, school-wide.",
    "Her calls: quiz lane 1, essay lane 2, research lane 3, homework = the upgrades.",
    "Her upgrades so far: collect the outline, anchor to Tuesday's class.",
    "Her other upgrades: a two-minute live defense; the process in the rubric.",
    "Her opener, rehearsed: 'walk me through how you made this.'",
    "Her never list: no confession-first, no score-only, never public.",
    "Her why: six values a false accusation breaks and clear rules build.",
    "Her lab pick, one assignment all the way through: next week's persuasive essay.",
    "Her essay's lanes, on screen big: research 3, outline 2, final draft 1.", null, "Her essay's upgrade, on screen: outline due Thursday, worth ten points.",
    "Her essay plan's last piece, two sentences: written calm, filed for later.",
    "Her share-out: her essay's AI Box, read aloud, in student words.",
    "Her inventory, one essay: lane, Box, one upgrade, two sentences.",
    "Her honesty: some will still cheat. Honest kids now know the rules.",
    "Her commitments: label, disclose with a soft landing, never score-only.",
    "Her month: box swap, gray-area calibration, a class-written agreement.",
    "Her 48 hours: Box printed, Disclosure block taught once, sentences filed.",
    "Her exit ticket: lane, box line, one gray area for the staff.", null];
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
        s.addText("MS. RIVERA'S SCREEN \u00b7 SO FAR", { x: rx + 0.62, y: ry, w: rw - 0.7, h: 0.26, fontFace: FONT, fontSize: 8, bold: true, color: '9FB2C2', charSpacing: 1, margin: 0, valign: 'middle' });
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
    s.addText('AI & Academic Integrity:\nSetting Clear Expectations with Students', {
      x: 0.85, y: 3.35, w: 11.8, h: 2.0, fontFace: FONT, fontSize: 40, bold: true,
      color: WHITE, margin: 0, valign: 'middle', lineSpacingMultiple: 1.05 });
    s.addText('A 45–60 minute working session. You leave with your next assignment\'s AI rules written, in language students can quote back.', {
      x: 0.9, y: 5.45, w: 11.2, h: 0.5, fontFace: FONT, fontSize: 18, color: 'C9D4DE', margin: 0 });
    s.addText('Built by Adam & Katelyn Spinozzi · certified educators · 20+ combined years in the classroom', {
      x: 0.9, y: 6.6, w: 11.5, h: 0.4, fontFace: FONT, fontSize: 12, color: '9FB2C2', margin: 0 });
    s.addNotes('Slide up as people arrive. Start on time. The founders\' note at the front of the script is an optional moment before slide 2 if you want to share their perspective.');
  }

  // ============================== SLIDE 2 · THE ELEPHANT, MEASURED ==============================
  {
    const s = base();
    kicker(s, 'Most students use AI. Most were never told the rules.');
    title(s, 'The elephant, measured');
    card(s, 0.7, 1.75, 5.75, 3.7, PAPER);
    s.addText('HOW MANY TEENS USE AI FOR SCHOOL', { x: 0.7, y: 1.95, w: 5.75, h: 0.35, fontFace: FONT, fontSize: 13, bold: true, color: NAVY, align: 'center', charSpacing: 2, margin: 0 });
    s.addText('54%', { x: 0.7, y: 2.3, w: 5.75, h: 1.05, fontFace: FONT, fontSize: 52, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addText('of U.S. teens say they use AI to help with schoolwork. (Pew Research Center, 2026)', {
      x: 1.0, y: 3.4, w: 5.15, h: 1.9, fontFace: FONT, fontSize: 16, color: INK, align: 'center', margin: 0 });
    card(s, 6.85, 1.75, 5.75, 3.7, PAPER);
    s.addText('WHAT SCHOOLS HAVE TOLD THEM', { x: 6.85, y: 1.95, w: 5.75, h: 0.35, fontFace: FONT, fontSize: 13, bold: true, color: MUTED, align: 'center', charSpacing: 2, margin: 0 });
    s.addText('Not much', { x: 6.85, y: 2.3, w: 5.75, h: 1.05, fontFace: FONT, fontSize: 44, bold: true, color: MUTED, align: 'center', margin: 0 });
    s.addText('RAND finds student AI use at 54% while school guidance lags far behind adoption. Most students are guessing at the rules. (RAND, 2025)', {
      x: 7.15, y: 3.4, w: 5.15, h: 1.9, fontFace: FONT, fontSize: 16, color: INK, align: 'center', margin: 0 });
    s.addText('The silence is the problem we can fix today.', {
      x: 0.7, y: 5.85, w: 12.0, h: 0.55, fontFace: FONT, fontSize: 21, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('Both numbers verified: Pew (2026) 54% of teens use AI for schoolwork; RAND RR-A4180-1 (2025) 54% of students, guidance lagging. The framing: use is normal, rules are absent.');
  }

  // ============================== SLIDE 3 · THE NUMBER NOBODY EXPECTS ==============================
  {
    const s = base();
    kicker(s, 'Before ChatGPT vs. after: the Stanford surveys');
    title(s, 'The number that should lower your blood pressure', { w: 8.7, fontSize: 28 });
    card(s, 0.7, 1.75, 5.75, 3.7, 'EAF5F3');
    s.addText('CHEATING BEFORE CHATGPT', { x: 0.7, y: 1.95, w: 5.75, h: 0.35, fontFace: FONT, fontSize: 13, bold: true, color: TEAL, align: 'center', charSpacing: 2, margin: 0 });
    s.addText('60–70%', { x: 0.7, y: 2.3, w: 5.75, h: 1.05, fontFace: FONT, fontSize: 52, bold: true, color: TEAL, align: 'center', margin: 0 });
    s.addText('of high schoolers self-reported some cheating behavior in the years before ChatGPT existed. (Lee, Pope et al., 2024)', {
      x: 1.0, y: 3.4, w: 5.15, h: 1.9, fontFace: FONT, fontSize: 16, color: INK, align: 'center', margin: 0 });
    card(s, 6.85, 1.75, 5.75, 3.7, 'EAF5F3');
    s.addText('CHEATING AFTER CHATGPT', { x: 6.85, y: 1.95, w: 5.75, h: 0.35, fontFace: FONT, fontSize: 13, bold: true, color: TEAL, align: 'center', charSpacing: 2, margin: 0 });
    s.addText('60–70%', { x: 6.85, y: 2.3, w: 5.75, h: 1.05, fontFace: FONT, fontSize: 52, bold: true, color: TEAL, align: 'center', margin: 0 });
    s.addText('The same schools, surveyed after: the rate did not move. The forms shift; the amount doesn\'t. (Same study)', {
      x: 7.15, y: 3.4, w: 5.15, h: 1.9, fontFace: FONT, fontSize: 16, color: INK, align: 'center', margin: 0 });
    s.addText('The problem is older than the bot. Panic is not a policy; clarity is.', {
      x: 0.7, y: 5.85, w: 12.0, h: 0.55, fontFace: FONT, fontSize: 21, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('Lee, Pope, Miles & Zárate (2024), Computers and Education: AI. Same-school before/after comparison. The deliberate visual: the two numbers are identical.');
  }

  // ============================== SLIDE 4 · AGENDA ==============================
  {
    const s = base();
    kicker(s, 'The hour ahead');
    title(s, 'Agenda, and one promise');
    const rows = [
      ['0:05', 'What\'s actually happening, and the two traps'],
      ['0:12', 'The three lanes + the two school-wide boxes'],
      ['0:20', 'Assignment upgrades + the hard conversation'],
      ['0:30', 'Lab: the integrity plan for a real assignment'],
      ['0:49', 'Making it stick + first 48 hours'],
    ];
    rows.forEach(([t, txt], i) => {
      const y = 1.6 + i * 0.8;
      s.addText(t, { x: 0.9, y, w: 1.1, h: 0.6, fontFace: FONT, fontSize: 20, bold: true, color: TEAL, margin: 0, valign: 'middle' });
      s.addText(txt, { x: 2.1, y, w: 7.4, h: 0.6, fontFace: FONT, fontSize: 20, color: INK, margin: 0, valign: 'middle' });
    });
    card(s, 9.9, 2.1, 2.85, 3.2, NAVY);
    s.addText('One promise', { x: 10.15, y: 2.35, w: 2.35, h: 0.4, fontFace: FONT, fontSize: 16, bold: true, color: AMBER, margin: 0 });
    s.addText('You leave with your next assignment\'s lane named, its AI Box filled in, and your words for the hard conversation. Ready before you need them.', {
      x: 10.15, y: 2.8, w: 2.35, h: 2.3, fontFace: FONT, fontSize: 13.5, color: WHITE, margin: 0, valign: 'top' });
    s.addNotes('Keep this quick. The promise: a real assignment leaves this room with its AI rules written.');
  }

  // ============================== SLIDE 5 · WHY STUDENTS CHEAT ==============================
  {
    const s = base();
    kicker(s, 'Fifteen years of asking students directly');
    title(s, 'Why students actually cheat');
    bullets(s, [
      { text: 'Disengagement: the work feels like busywork with a due date', options: {} },
      { text: 'Pressure: grades, college, family expectations, not enough sleep', options: {} },
      { text: 'Not feeling respected or connected to the teacher', options: {} },
      { text: 'Almost never: "because a new tool exists"', options: { bold: true } },
    ]);
    card(s, 0.7, 4.9, 12.0, 1.35, 'EAF5F3');
    s.addText('Access changes what a stressed, disengaged kid does at 11 p.m. It doesn\'t create the stress or the disengagement. So the strategy can\'t just be about AI.', {
      x: 1.0, y: 5.05, w: 11.4, h: 1.05, fontFace: FONT, fontSize: 17, color: INK, margin: 0, valign: 'middle' });
    s.addNotes('Stanford GSE / Challenge Success: 15+ years of student surveys. Cheating correlates with disengagement, pressure, stress, feeling disrespected; rarely tool access.');
  }

  // ============================== SLIDE 6 · TRAP 1: THE PRETEND BAN ==============================
  {
    const s = base();
    kicker(s, 'Trap #1');
    title(s, 'The pretend ban');
    bullets(s, [
      '"No AI, ever," announced to a hallway where half the students already use it',
      'Honest kids follow it, and compete against classmates who don\'t',
      'Dishonest use goes underground, where nobody can teach about it',
      'The school\'s official rule becomes one everyone knows is fake',
    ]);
    card(s, 0.7, 4.9, 12.0, 1.35, PAPER);
    s.addText([
      { text: 'Worth knowing: ', options: { bold: true, color: NAVY } },
      { text: 'major chatbots\' own terms require users 13+, with parent permission under 18. Age rules are real and belong in your expectations. "Banned because we said so" is not a strategy.', options: { color: INK } },
    ], { x: 1.0, y: 5.05, w: 11.4, h: 1.05, fontFace: FONT, fontSize: 17, margin: 0, valign: 'middle' });
    s.addNotes('OpenAI Terms of Use: 13+, parental permission under 18. The ban critique is structural, not moral: it punishes honesty and forfeits the teaching opportunity.');
  }

  // ============================== SLIDE 7 · TRAP 2: DETECTOR POLICING ==============================
  {
    const s = base();
    kicker(s, 'Trap #2');
    title(s, 'Detector policing');
    card(s, 0.7, 1.75, 5.75, 3.7, PAPER);
    s.addText('OPENAI\'S OWN DETECTOR', { x: 0.7, y: 1.95, w: 5.75, h: 0.35, fontFace: FONT, fontSize: 13, bold: true, color: MUTED, align: 'center', charSpacing: 2, margin: 0 });
    s.addText('Shut down', { x: 0.7, y: 2.3, w: 5.75, h: 1.05, fontFace: FONT, fontSize: 44, bold: true, color: BAD, align: 'center', margin: 0 });
    s.addText('OpenAI retired its own AI-text detector within six months "due to its low rate of accuracy": it caught 26% of AI text and falsely flagged human writing 9% of the time. (OpenAI, 2023)', {
      x: 1.0, y: 3.4, w: 5.15, h: 1.9, fontFace: FONT, fontSize: 15.5, color: INK, align: 'center', margin: 0 });
    card(s, 6.85, 1.75, 5.75, 3.7, PAPER);
    s.addText('WHO GETS FALSELY FLAGGED', { x: 6.85, y: 1.95, w: 5.75, h: 0.35, fontFace: FONT, fontSize: 13, bold: true, color: MUTED, align: 'center', charSpacing: 2, margin: 0 });
    s.addText('>50%', { x: 6.85, y: 2.3, w: 5.75, h: 1.05, fontFace: FONT, fontSize: 52, bold: true, color: BAD, align: 'center', margin: 0 });
    s.addText('of real essays by non-native English speakers were misclassified as AI by commercial detectors. Native speakers: almost never. (Liang et al., Patterns, 2023)', {
      x: 7.15, y: 3.4, w: 5.15, h: 1.9, fontFace: FONT, fontSize: 15.5, color: INK, align: 'center', margin: 0 });
    s.addText('A detector score is not evidence.', {
      x: 0.7, y: 5.85, w: 12.0, h: 0.55, fontFace: FONT, fontSize: 21, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('Both stats verified. Land the equity point: think about which students get accused under detector policing. This slide sets up the session red line on the next slide.');
  }

  // ============================== SLIDE 8 · WHAT WORKS INSTEAD ==============================
  {
    const s = base(true);
    s.addText('THE RED LINE OF THIS SESSION', { x: 0.9, y: 1.7, w: 11.5, h: 0.5, fontFace: FONT, fontSize: 15, bold: true, color: AMBER, charSpacing: 3, margin: 0 });
    s.addText('No accusation ever rests on\na detector score alone.', {
      x: 0.9, y: 2.3, w: 11.5, h: 1.9, fontFace: FONT, fontSize: 40, bold: true, color: WHITE, margin: 0, lineSpacingMultiple: 1.1 });
    s.addText('What works instead: clear expectations per assignment · assignments where the thinking is visible · a fair conversation when something feels wrong. Nothing to buy. That\'s the rest of this hour.', {
      x: 0.9, y: 4.5, w: 11.3, h: 1.4, fontFace: FONT, fontSize: 19, color: 'C9D4DE', margin: 0 });
    s.addNotes('Dark slide, said slowly. This is the line staff must carry out of the room. Everything after this slide is the constructive alternative.');
  }

  // ============================== SLIDE 9 · THE THREE LANES ==============================
  {
    const s = base();
    kicker(s, 'The framework of the day');
    title(s, 'Three lanes, no fog');
    const lanes = [
      ['1 · AI-FREE', 'The point is your own thinking, from scratch.', 'In-class essays · skills checks · diagnostic drafts', TEAL],
      ['2 · AI-ASSISTED', 'Brainstorm, feedback, polish allowed; thinking stays yours; use is disclosed.', 'Most take-home writing · projects · prep work', NAVY],
      ['3 · AI-INCLUDED', 'Using AI well is part of the task; your judgment is what\'s graded.', 'Research comparisons · prompt-craft tasks · AI critiques', AMBER],
    ];
    lanes.forEach(([label, meaning, examples, color], i) => {
      const x = 0.7 + i * 4.05;
      card(s, x, 1.7, 3.85, 4.3, PAPER);
      s.addText(label, { x: x + 0.25, y: 1.95, w: 3.35, h: 0.4, fontFace: FONT, fontSize: 17, bold: true, color, margin: 0 });
      s.addText(meaning, { x: x + 0.25, y: 2.5, w: 3.35, h: 1.7, fontFace: FONT, fontSize: 16, color: INK, margin: 0, valign: 'top' });
      s.addText(examples, { x: x + 0.25, y: 4.4, w: 3.35, h: 1.3, fontFace: FONT, fontSize: 13.5, color: MUTED, margin: 0, valign: 'top' });
    });
    s.addText('"Is this cheating?" becomes "what lane is this assignment in?"', {
      x: 0.7, y: 6.15, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 20, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('The core framework. Lanes are per assignment, and parts of one assignment can sit in different lanes (that lands on slide 12 and in the lab).');
  }

  // ============================== SLIDE 10 · THE ONE-LINE LABEL ==============================
  {
    const s = base();
    kicker(s, 'The delivery mechanism: one printed line');
    title(s, 'The one-line label');
    const rows = [
      ['Lane 1', '"AI-free. This one is all you; I need to see your own thinking to teach you well."', TEAL],
      ['Lane 2', '"AI-assisted. Brainstorming and feedback are fine; write the final yourself and note what you used."', NAVY],
      ['Lane 3', '"AI-included. Use the tool; show your prompts; your judgment is what\'s being graded."', AMBER],
    ];
    rows.forEach(([lane, label, color], i) => {
      const y = 1.7 + i * 1.35;
      card(s, 0.7, y, 12.0, 1.15, PAPER);
      s.addText(lane, { x: 1.0, y: y + 0.15, w: 1.5, h: 0.85, fontFace: FONT, fontSize: 18, bold: true, color, margin: 0, valign: 'middle' });
      s.addText(label, { x: 2.6, y: y + 0.15, w: 9.8, h: 0.85, fontFace: FONT, fontSize: 17, italic: true, color: INK, margin: 0, valign: 'middle' });
    });
    s.addText('Students can follow rules they can see. They can\'t follow rules that change teacher to teacher.', {
      x: 0.7, y: 6.0, w: 12.0, h: 0.6, fontFace: FONT, fontSize: 19, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('These three labels are on the handout verbatim, ready to copy onto assignments.');
  }

  // ============================== SLIDE 11 · ONE SYSTEM, TWO BOXES ==============================
  {
    const s = base();
    kicker(s, 'Fixed templates, identical in every classroom');
    title(s, 'One system, two boxes', { w: 8.7 });
    card(s, 0.7, 1.6, 5.9, 4.45, PAPER);
    s.addText('THE AI BOX · PRINTS ON THE ASSIGNMENT (TEACHER\'S HALF)', { x: 1.0, y: 1.78, w: 5.4, h: 0.3, fontFace: FONT, fontSize: 11.5, bold: true, color: TEAL, charSpacing: 1.2, margin: 0 });
    s.addText([
      { text: 'Lane: ', options: { bold: true, color: NAVY } },
      { text: '\u25A1 1 AI-free   \u25A1 2 AI-assisted   \u25A1 3 AI-included\n', options: { color: INK } },
      { text: 'Okay: ', options: { bold: true, color: NAVY } },
      { text: '[what\'s allowed, in student words]\n', options: { color: INK } },
      { text: 'Not okay: ', options: { bold: true, color: NAVY } },
      { text: '[what\'s not, in student words]\n', options: { color: INK } },
      { text: 'Disclosure: ', options: { bold: true, color: NAVY } },
      { text: 'fill in the Disclosure block. Every time.\n', options: { color: INK } },
      { text: 'If something seems off: ', options: { bold: true, color: NAVY } },
      { text: 'we walk through the work together.', options: { color: INK } },
    ], { x: 1.0, y: 2.2, w: 5.35, h: 3.6, fontFace: FONT, fontSize: 16, margin: 0, valign: 'top', lineSpacingMultiple: 1.25 });
    card(s, 6.85, 1.6, 5.9, 4.45, 'EAF5F3');
    s.addText('THE AI DISCLOSURE BLOCK · END OF THE WORK (STUDENT\'S HALF)', { x: 7.15, y: 1.78, w: 5.4, h: 0.3, fontFace: FONT, fontSize: 11.5, bold: true, color: TEAL, charSpacing: 1.2, margin: 0 });
    s.addText([
      { text: 'AI DISCLOSURE (check all that apply)\n', options: { bold: true, color: NAVY } },
      { text: '\u25A1 No AI used\n\u25A1 AI helped me brainstorm or outline\n\u25A1 AI gave me feedback on a draft\n\u25A1 AI drafted text that I revised\n', options: { color: INK } },
      { text: 'Tool I used: ', options: { bold: true, color: NAVY } },
      { text: '____________\n', options: { color: INK } },
      { text: 'What I asked it to do: ', options: { bold: true, color: NAVY } },
      { text: '____________', options: { color: INK } },
    ], { x: 7.15, y: 2.2, w: 5.35, h: 3.6, fontFace: FONT, fontSize: 16, margin: 0, valign: 'top', lineSpacingMultiple: 1.25 });
    s.addText('Checkboxes beat "write two honest sentences": ten seconds to fill, identical in every room. And honesty gets a soft landing.', {
      x: 0.7, y: 6.2, w: 12.0, h: 0.55, fontFace: FONT, fontSize: 17, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('Why fixed templates instead of free writing: ask thirty students for two honest sentences and you get thirty different things. Checkboxes make honesty the same size for everyone and identical building-wide. The soft landing is load-bearing: punish disclosure once and the whole class learns to hide. Say that sentence explicitly. Both templates are on the handout, copy-ready.');
  }

  // ============================== SLIDE 12 · PRACTICE: CALL THE LANE ==============================
  {
    const s = base();
    kicker(s, 'Practice · call it out');
    title(s, 'Call the lane');
    const rows = [
      ['1', 'Weekly vocabulary quiz, taken in class', 'Lane 1: the point is what\'s in their heads'],
      ['2', 'Persuasive essay; you care about the argument, not drafting stamina', 'Usually lane 2: assisted, disclosed, final draft theirs'],
      ['3', 'Career-research project comparing AI answers to real sources', 'Lane 3: questioning the tool IS the skill'],
      ['4', 'Math practice problems for tomorrow (the trick one)', 'Lane 1 by intent, unenforceable at home: the upgrades must carry it'],
    ];
    rows.forEach(([n, scenario, answer], i) => {
      const y = 1.6 + i * 1.2;
      s.addText(n, { x: 0.8, y: y + 0.1, w: 0.6, h: 0.9, fontFace: FONT, fontSize: 22, bold: true, color: TEAL, margin: 0, valign: 'middle' });
      s.addText(scenario, { x: 1.5, y: y + 0.05, w: 6.3, h: 1.0, fontFace: FONT, fontSize: 16.5, color: INK, margin: 0, valign: 'middle' });
      s.addText(answer, { x: 8.0, y: y + 0.05, w: 4.7, h: 1.0, fontFace: FONT, fontSize: 14.5, color: MUTED, margin: 0, valign: 'middle' });
    });
    s.addNotes('Reveal answers after the room calls each one. 45-min cut: scenarios 1 and 3 only. Scenario 4 sets up the upgrades segment: when a rule is unenforceable, the upgrade carries the integrity.');
  }

  // ============================== SLIDE 13 · UPGRADES 1-2 ==============================
  {
    const s = base();
    kicker(s, 'Assignment upgrades · honest work as the easy path');
    title(s, 'Upgrade 1: collect the thinking · Upgrade 2: anchor it to your room', { w: 8.7, fontSize: 25 });
    card(s, 0.7, 1.7, 5.75, 4.3, PAPER);
    s.addText('MAKE THE THINKING VISIBLE', { x: 0.95, y: 1.95, w: 5.25, h: 0.4, fontFace: FONT, fontSize: 15, bold: true, color: TEAL, margin: 0 });
    s.addText('Collect the outline, the messy draft, the version history. Grade the journey, not just the destination.\n\nA finished essay is easy to fake. A thinking trail is hard to fake, and better assessment anyway.', {
      x: 0.95, y: 2.45, w: 5.25, h: 3.3, fontFace: FONT, fontSize: 17, color: INK, margin: 0, valign: 'top' });
    card(s, 6.85, 1.7, 5.75, 4.3, PAPER);
    s.addText('ANCHOR IT LOCALLY', { x: 7.1, y: 1.95, w: 5.25, h: 0.4, fontFace: FONT, fontSize: 15, bold: true, color: TEAL, margin: 0 });
    s.addText('Tie the task to Tuesday\'s discussion, the lab you ran, their own experience, the guest speaker.\n\nA chatbot has never been in your classroom. The more the task depends on the room, the less a generic tool can do it.', {
      x: 7.1, y: 2.45, w: 5.25, h: 3.3, fontFace: FONT, fontSize: 17, color: INK, margin: 0, valign: 'top' });
    s.addNotes('Two of four upgrades. Emphasize: these are better teaching regardless of AI; integrity is a side effect of good design. Plain words, no jargon: the room should hear four simple things they could do to any assignment.');
  }

  // ============================== SLIDE 14 · UPGRADES 3-4 ==============================
  {
    const s = base();
    kicker(s, 'Assignment upgrades · honest work as the easy path');
    title(s, 'Upgrade 3: add a live moment · Upgrade 4: grade the process', { w: 8.7, fontSize: 25 });
    card(s, 0.7, 1.7, 5.75, 4.3, PAPER);
    s.addText('MOVE SOME THINKING LIVE', { x: 0.95, y: 1.95, w: 5.25, h: 0.4, fontFace: FONT, fontSize: 15, bold: true, color: TEAL, margin: 0 });
    s.addText('A two-minute "defend your choice," an in-class quick-write, a cold question about their own essay.\n\nNot a gotcha: a normal part of how work gets finished here. Students who did the thinking enjoy it.', {
      x: 0.95, y: 2.45, w: 5.25, h: 3.3, fontFace: FONT, fontSize: 17, color: INK, margin: 0, valign: 'top' });
    card(s, 6.85, 1.7, 5.75, 4.3, PAPER);
    s.addText('ASSESS THE PROCESS', { x: 7.1, y: 1.95, w: 5.25, h: 0.4, fontFace: FONT, fontSize: 15, bold: true, color: TEAL, margin: 0 });
    s.addText('Where AI is allowed, grade the Disclosure block, the prompts, and a short accept/reject reflection.\n\nAI use becomes work you can see and teach, instead of a shortcut you have to suspect.', {
      x: 7.1, y: 2.45, w: 5.25, h: 3.3, fontFace: FONT, fontSize: 17, color: INK, margin: 0, valign: 'top' });
    s.addText('One upgrade per assignment is usually enough to change the honesty math.', {
      x: 0.7, y: 6.15, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 19, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('Warn against overcorrecting: four upgrades on every assignment is burnout. One is enough.');
  }

  // ============================== SLIDE 15 · THE CONVERSATION ==============================
  {
    const s = base();
    kicker(s, 'When something feels wrong');
    title(s, 'The conversation: curiosity first');
    const rows = [
      ['Open', '"Walk me through how you made this. What did you start with? What was the hardest part?"'],
      ['Get specific', '"Tell me more about this paragraph. What does this word mean here?"'],
      ['Gather process evidence', 'Can they explain their choices? Is there a draft? Does in-class writing match?'],
      ['Land it fairly', 'First offense under a new rule: teach the lane, reset. Pattern: your school\'s process, evidence in hand.'],
    ];
    rows.forEach(([move, say], i) => {
      const y = 1.6 + i * 1.15;
      card(s, 0.7, y, 12.0, 1.0, i === 0 ? 'EAF5F3' : PAPER);
      s.addText(move, { x: 1.0, y: y + 0.1, w: 2.9, h: 0.8, fontFace: FONT, fontSize: 16, bold: true, color: NAVY, margin: 0, valign: 'middle' });
      s.addText(say, { x: 4.0, y: y + 0.1, w: 8.4, h: 0.8, fontFace: FONT, fontSize: 15, color: INK, margin: 0, valign: 'middle' });
    });
    s.addText('A student who did the work answers easily. A student who didn\'t will show you, gently.', {
      x: 0.7, y: 6.3, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 18, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('This is the script staff will actually use. Process evidence stands up with parents and admin; vibes and scores don\'t.');
  }

  // ============================== SLIDE 16 · THE NEVER LIST ==============================
  {
    const s = base(true);
    s.addText('THE NEVER LIST', { x: 0.9, y: 1.2, w: 11.5, h: 0.5, fontFace: FONT, fontSize: 15, bold: true, color: AMBER, charSpacing: 3, margin: 0 });
    const nevers = [
      'Never open with "did you use AI?": it asks for a confession before a conversation',
      'Never accuse on a detector score alone: you\'ve seen the accuracy and the bias',
      'Never make it public: integrity conversations happen one-on-one',
      'Never forget: until the lane was labeled, many students were never told the rule',
    ];
    nevers.forEach((n, i) => {
      const y = 1.95 + i * 1.05;
      s.addText('✕', { x: 1.0, y, w: 0.5, h: 0.8, fontFace: FONT, fontSize: 24, bold: true, color: 'E8837A', margin: 0, valign: 'middle' });
      s.addText(n, { x: 1.7, y, w: 10.8, h: 0.8, fontFace: FONT, fontSize: 19, color: WHITE, margin: 0, valign: 'middle' });
    });
    s.addText('The first offense under a brand-new expectation is a teaching moment, almost every time.', {
      x: 0.9, y: 6.25, w: 11.5, h: 0.5, fontFace: FONT, fontSize: 17, color: 'C9D4DE', margin: 0 });
    s.addNotes('Dark slide, read slowly. Never trim this slide.');
  }

  // ============================== SLIDE 17 · WHAT THIS IS FOR ==============================
  {
    const s = base();
    kicker(s, 'Bigger than catching anybody');
    title(s, 'What integrity protects');
    const vals = ['Honesty', 'Trust', 'Fairness', 'Respect', 'Responsibility', 'Courage'];
    vals.forEach((v, i) => {
      const x = 0.7 + (i % 3) * 4.05, y = 1.8 + Math.floor(i / 3) * 1.5;
      card(s, x, y, 3.85, 1.25, 'EAF5F3');
      s.addText(v, { x, y, w: 3.85, h: 1.25, fontFace: FONT, fontSize: 22, bold: true, color: NAVY, align: 'center', margin: 0, valign: 'middle' });
    });
    s.addText('The six fundamental values of academic integrity (International Center for Academic Integrity). Every one is damaged by a false accusation, and strengthened by clear rules fairly applied.', {
      x: 0.7, y: 5.1, w: 12.0, h: 1.1, fontFace: FONT, fontSize: 18, color: INK, align: 'center', margin: 0 });
    s.addNotes('ICAI Fundamental Values (3rd ed., 2021). One minute, then the lab. Frame: we\'re building conditions where honest work is normal, not a surveillance system.');
  }

  // ============================== SLIDE 18 · LAB SETUP ==============================
  {
    const s = base(true);
    s.addText('HANDS-ON · ~19 MINUTES', { x: 0.62, y: 0.2, w: 8, h: 0.35, fontFace: FONT, fontSize: 13, bold: true, color: AMBER, charSpacing: 2, margin: 0 });
    s.addText('Lab: your next real assignment.', {
      x: 0.7, y: 1.3, w: 12.0, h: 1.2, fontFace: FONT, fontSize: 44, bold: true, color: WHITE, margin: 0 });
    s.addText('Pick something you\'ll actually give in the next two weeks: an essay, a project, a problem set, a shop build. Pairs; paper or device both fine.', {
      x: 0.72, y: 2.6, w: 11.8, h: 0.9, fontFace: FONT, fontSize: 20, color: 'C9D4DE', margin: 0 });
    const rules = [
      ['1', 'No student information of any kind'],
      ['2', 'Every plan gets a second set of eyes: work in pairs'],
      ['3', 'Four deliverables: the lane, the filled-in AI Box, one upgrade, your two sentences'],
    ];
    rules.forEach(([n, r], i) => {
      const y = 3.75 + i * 0.9;
      s.addShape('ellipse', { x: 0.95, y: y + 0.06, w: 0.55, h: 0.55, fill: { color: TEAL }, line: { color: TEAL } });
      s.addText(n, { x: 0.95, y: y + 0.06, w: 0.55, h: 0.55, fontFace: FONT, fontSize: 20, bold: true, color: WHITE, align: 'center', margin: 0, valign: 'middle' });
      s.addText(r, { x: 1.75, y, w: 10.8, h: 0.7, fontFace: FONT, fontSize: 21, color: WHITE, margin: 0, valign: 'middle' });
    });
    s.addNotes('Dark slide. Pairs formed inside two minutes. This lab is thinking and writing, not prompting; Wi-Fi optional. Protect every minute. Ms. Rivera builds ONE persuasive essay across all four steps; her exemplar appears large on every step slide, so anyone lost can copy her structure.');
  }

  // ============================== SLIDE 19 · LAB STEP 1 ==============================
  {
    const s = base();
    kicker(s, 'Lab · step 1 of 4 · 3 minutes');
    title(s, 'Name the lane', { w: 8.7 });
    bullets(s, [
      'One lane for the whole assignment, or a lane per part',
      'Say your lane out loud to your partner',
      'Defend it in one sentence',
      { text: 'Can\'t defend it? The assignment might not know what it\'s assessing yet.', options: { bold: true } },
    ], { x: 0.7, y: 1.7, w: 5.9, h: 4.4, fontSize: 18 });
    card(s, 6.85, 1.7, 5.9, 4.4, 'EAF5F3');
    s.addText('MS. RIVERA\'S ESSAY · STEP 1', { x: 7.15, y: 1.9, w: 5.4, h: 0.32, fontFace: FONT, fontSize: 12.5, bold: true, color: TEAL, charSpacing: 1.5, margin: 0 });
    s.addText([
      { text: 'Research', options: { bold: true, color: NAVY } }, { text: '  \u2192  Lane 3\n', options: { color: INK } },
      { text: 'Outline', options: { bold: true, color: NAVY } }, { text: '  \u2192  Lane 2\n', options: { color: INK } },
      { text: 'Final draft', options: { bold: true, color: NAVY } }, { text: '  \u2192  Lane 1\n\n', options: { color: INK } },
      { text: '"I\'m grading the argument, not the typing."', options: { italic: true, color: MUTED } },
    ], { x: 7.15, y: 2.35, w: 5.35, h: 3.5, fontFace: FONT, fontSize: 22, margin: 0, valign: 'top', lineSpacingMultiple: 1.3 });
    s.addNotes('3 minutes. Circulate. Rivera\'s essay is the running exemplar for the whole lab: three parts, three lanes, one defense sentence. The common stall is an assignment with parts in different lanes; the fix is naming a lane per part, exactly as her card shows.');
  }

  // ============================== SLIDE 20 · LAB STEP 2 ==============================
  {
    const s = base();
    kicker(s, 'Lab · step 2 of 4 · 6 minutes · the heart of the lab');
    title(s, 'Fill in the AI Box');
    card(s, 0.7, 1.6, 4.55, 4.05, PAPER);
    s.addText('THE SCHOOL TEMPLATE (SLIDE 11)', { x: 0.95, y: 1.78, w: 4.1, h: 0.3, fontFace: FONT, fontSize: 11, bold: true, color: MUTED, charSpacing: 1.5, margin: 0 });
    s.addText([
      { text: 'Lane: ', options: { bold: true, color: NAVY } },
      { text: '\u25A1 1  \u25A1 2  \u25A1 3\n', options: { color: INK } },
      { text: 'Okay: ', options: { bold: true, color: NAVY } },
      { text: '[student words]\n', options: { color: INK } },
      { text: 'Not okay: ', options: { bold: true, color: NAVY } },
      { text: '[student words]\n', options: { color: INK } },
      { text: 'Disclosure: ', options: { bold: true, color: NAVY } },
      { text: 'the block, every time\n', options: { color: INK } },
      { text: 'If something seems off: ', options: { bold: true, color: NAVY } },
      { text: 'we talk it through.', options: { color: INK } },
    ], { x: 0.95, y: 2.15, w: 4.1, h: 3.3, fontFace: FONT, fontSize: 14, margin: 0, valign: 'top', lineSpacingMultiple: 1.2 });
    card(s, 5.5, 1.6, 7.25, 4.05, 'EAF5F3');
    s.addText('MS. RIVERA\'S ESSAY · STEP 2 · HER BOX, FILLED IN', { x: 5.8, y: 1.78, w: 6.7, h: 0.3, fontFace: FONT, fontSize: 12.5, bold: true, color: TEAL, charSpacing: 1.5, margin: 0 });
    s.addText([
      { text: 'Lane: ', options: { bold: true, color: NAVY } },
      { text: 'by part \u00b7 Research \u2612 3 \u00b7 Outline \u2612 2 \u00b7 Final draft \u2612 1, because I\'m grading your argument, not your typing.\n', options: { color: INK } },
      { text: 'Okay: ', options: { bold: true, color: NAVY } },
      { text: 'AI to compare sources; brainstorming and feedback on your outline.\n', options: { color: INK } },
      { text: 'Not okay: ', options: { bold: true, color: NAVY } },
      { text: 'AI-written sentences in your final draft.\n', options: { color: INK } },
      { text: 'Disclosure: ', options: { bold: true, color: NAVY } },
      { text: 'fill in the Disclosure block at the end. Every time.\n', options: { color: INK } },
      { text: 'If something seems off: ', options: { bold: true, color: NAVY } },
      { text: 'we\'ll talk it through, not write it up.', options: { color: INK } },
    ], { x: 5.8, y: 2.15, w: 6.65, h: 3.4, fontFace: FONT, fontSize: 17.5, margin: 0, valign: 'top', lineSpacingMultiple: 1.25 });
    s.addText('The test: could a ninth grader read your box and know exactly what\'s okay tonight?', {
      x: 0.7, y: 5.85, w: 12.0, h: 0.55, fontFace: FONT, fontSize: 19, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('Say: the school template on the left is the one from slide 11; the big card is Ms. Rivera\'s finished Box for her persuasive essay, the same essay from step 1. Mimic her box with your own assignment: at worst, copy its shape line for line. 6 minutes. Push for student language, not policy language. 45-min cut: check the lane boxes and fill the okay line only.');
  }

  // ============================== SLIDE 21 · LAB STEP 3 ==============================
  {
    const s = base();
    kicker(s, 'Lab · step 3 of 4 · 6 minutes');
    title(s, 'Apply one upgrade', { w: 8.7 });
    bullets(s, [
      'Collect the thinking: an outline or draft checkpoint',
      'Anchor it to something that happened in your room',
      'Add a two-minute live moment as a normal step',
      'Grade the process: Disclosure block + prompts + reflection',
    ], { x: 0.7, y: 1.7, w: 5.9, h: 3.0, fontSize: 17 });
    card(s, 6.85, 1.7, 5.9, 3.0, 'EAF5F3');
    s.addText('MS. RIVERA\'S ESSAY · STEP 3 · HER UPGRADE', { x: 7.15, y: 1.9, w: 5.4, h: 0.32, fontFace: FONT, fontSize: 12.5, bold: true, color: TEAL, charSpacing: 1.5, margin: 0 });
    s.addText('Outline due Thursday.\nTen points.\nBefore drafting begins.', {
      x: 7.15, y: 2.35, w: 5.35, h: 2.2, fontFace: FONT, fontSize: 24, bold: true, color: NAVY, margin: 0, valign: 'top', lineSpacingMultiple: 1.25 });
    card(s, 0.7, 4.95, 12.0, 1.3, PAPER);
    s.addText('Write the actual change: what\'s due, when, worth how much. Then tell your partner why this upgrade makes honest work easier than faking it.', {
      x: 1.0, y: 5.1, w: 11.4, h: 1.0, fontFace: FONT, fontSize: 17, color: INK, margin: 0, valign: 'middle' });
    s.addNotes('6 minutes. One upgrade only. Rivera\'s pick is a visible-thinking checkpoint on the same essay. Weakest results come from bolting on a quiz; strongest from anchoring to the room and collecting the thinking.');
  }

  // ============================== SLIDE 22 · LAB STEP 4 ==============================
  {
    const s = base();
    kicker(s, 'Lab · step 4 of 4 · 4 minutes · alone, quiet');
    title(s, 'Write your two sentences', { w: 8.7 });
    card(s, 0.7, 1.7, 5.9, 2.9, PAPER);
    s.addText('The first two sentences you\'ll say when work feels wrong. In your voice. Starting with curiosity. Written now, calm, instead of improvised upset.', {
      x: 1.0, y: 1.95, w: 5.3, h: 2.4, fontFace: FONT, fontSize: 18, color: INK, margin: 0, valign: 'middle', lineSpacingMultiple: 1.25 });
    card(s, 6.85, 1.7, 5.9, 2.9, 'EAF5F3');
    s.addText('MS. RIVERA\'S ESSAY · STEP 4 · HER TWO SENTENCES', { x: 7.15, y: 1.9, w: 5.4, h: 0.32, fontFace: FONT, fontSize: 12.5, bold: true, color: TEAL, charSpacing: 1.2, margin: 0 });
    s.addText('"Walk me through how you made this. What was the hardest part?"', {
      x: 7.15, y: 2.4, w: 5.35, h: 1.9, fontFace: FONT, fontSize: 22, italic: true, color: NAVY, margin: 0, valign: 'top', lineSpacingMultiple: 1.25 });
    s.addText('Write the sentences you\'d want said to your own child.', {
      x: 0.7, y: 4.95, w: 12.0, h: 0.6, fontFace: FONT, fontSize: 21, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('4 minutes, quiet writing, alone. This is the step people thank you for later. The handout has a box for it. Rivera\'s sentences stay on screen as the model: curiosity first, no accusation anywhere.');
  }

  // ============================== SLIDE 23 · SHARE-OUT ==============================
  {
    const s = base();
    kicker(s, 'Lab · share-out · 4 voices, 1 minute each');
    title(s, 'Read us your AI Box, or your sentences', { w: 8.7, fontSize: 28 });
    bullets(s, [
      'Four voices, one minute each: your AI Box or your two sentences',
      'Listen for how different subjects landed in different lanes',
      { text: 'Different lane mixes across departments isn\'t inconsistency; it\'s the framework working.', options: { bold: true } },
    ]);
    s.addNotes('45-min cut: two voices. If a box is excellent, name it as the staff model on the spot.');
  }

  // ============================== SLIDE 24 · WHAT YOU JUST BUILT ==============================
  {
    const s = base();
    kicker(s, 'Nineteen minutes of work, on the record');
    title(s, 'The inventory');
    card(s, 0.7, 1.8, 12.0, 3.6, PAPER);
    s.addText([
      { text: 'A real assignment with its lane named. A filled-in AI Box in student language. One upgrade that makes thinking visible. And your own two sentences for the hard moment, written calm.\n\n', options: { color: INK } },
      { text: 'Multiply by this room: five teachers, one answer to "what\'s allowed?" That consistency is something no detector subscription sells.', options: { bold: true, color: NAVY } },
    ], { x: 1.1, y: 2.1, w: 11.2, h: 3.0, fontFace: FONT, fontSize: 20, margin: 0, valign: 'middle' });
    s.addNotes('Let the inventory land. The consistency point is the school-level win.');
  }

  // ============================== SLIDE 25 · HONEST LIMITS ==============================
  {
    const s = base();
    kicker(s, 'This series doesn\'t oversell');
    title(s, 'Honest limits');
    bullets(s, [
      'Some students will still cheat; 60–70% did long before the chatbot',
      'You will not catch everything, and that was never the goal',
      'The goal: honest students know the rules, and dishonest work stops paying',
      { text: 'None of this survives without relationships. Lanes and boxes are paper unless students believe you\'d rather teach them than catch them.', options: { bold: true } },
    ]);
    s.addNotes('The honest-limits slide every kit carries. End on the relationships line; it\'s the one they\'ll repeat.');
  }

  // ============================== SLIDE 26 · THREE COMMITMENTS ==============================
  {
    const s = base(true);
    s.addText('OUR THREE COMMITMENTS', { x: 0.9, y: 1.1, w: 11.5, h: 0.5, fontFace: FONT, fontSize: 15, bold: true, color: AMBER, charSpacing: 3, margin: 0 });
    const cs = [
      ['1', 'Every assignment I give names its lane, starting with the one I built today'],
      ['2', 'I teach the Disclosure block, and honesty gets a soft landing, every time'],
      ['3', 'I never accuse on a detector score alone; my evidence is process and conversation'],
    ];
    cs.forEach(([n, c], i) => {
      const y = 1.95 + i * 1.3;
      s.addShape('ellipse', { x: 0.95, y: y + 0.12, w: 0.7, h: 0.7, fill: { color: TEAL }, line: { color: TEAL } });
      s.addText(n, { x: 0.95, y: y + 0.12, w: 0.7, h: 0.7, fontFace: FONT, fontSize: 24, bold: true, color: WHITE, align: 'center', margin: 0, valign: 'middle' });
      s.addText(c, { x: 1.95, y, w: 10.6, h: 1.0, fontFace: FONT, fontSize: 21, color: WHITE, margin: 0, valign: 'middle' });
    });
    s.addText('Nothing to buy. Nothing to install. Just agreements, which is what integrity has always been.', {
      x: 0.9, y: 6.1, w: 11.5, h: 0.55, fontFace: FONT, fontSize: 18, color: 'C9D4DE', margin: 0 });
    s.addNotes('Dark slide. Read all three, then the closing line. These commitments echo Kit 1\'s format on purpose.');
  }

  // ============================== SLIDE 27 · WHERE THIS GOES ==============================
  {
    const s = base();
    kicker(s, 'The 30-day plan, in one slide');
    title(s, 'Where this goes next');
    const rows = [
      ['This week', 'Lane labels and boxes go out on real assignments'],
      ['Week 2', 'PLC · Box Swap: the ninth-grader test on each other\'s boxes'],
      ['Week 3', 'PLC · Gray-Area Calibration: one tricky case, one shared answer'],
      ['Week 4', 'PLC · The Classroom Agreement: students co-write the rules'],
    ];
    rows.forEach(([t, txt], i) => {
      const y = 1.7 + i * 1.05;
      s.addText(t, { x: 0.9, y, w: 2.2, h: 0.8, fontFace: FONT, fontSize: 19, bold: true, color: TEAL, margin: 0, valign: 'middle' });
      s.addText(txt, { x: 3.2, y, w: 9.4, h: 0.8, fontFace: FONT, fontSize: 19, color: INK, margin: 0, valign: 'middle' });
    });
    s.addText('Students follow rules they helped write.', {
      x: 0.7, y: 6.1, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 20, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('The Week 4 classroom agreement is where this takes root; flag it as the destination.');
  }

  // ============================== SLIDE 28 · FIRST 48 HOURS ==============================
  {
    const s = base();
    kicker(s, 'Before Friday');
    title(s, 'First 48 hours: three actions');
    const rows = [
      ['1', 'Hand out the labeled assignment', 'Box printed on it; read it aloud, ~60 seconds', '~10 min'],
      ['2', 'Teach the Disclosure block to one class', 'The checkboxes + the soft-landing rule, said out loud', '~5 min'],
      ['3', 'File your two sentences', 'Where the frustrated version of you will find them', '~2 min'],
    ];
    rows.forEach(([n, t, d, badge], i) => {
      const y = 1.7 + i * 1.4;
      card(s, 0.7, y, 12.0, 1.2, PAPER);
      s.addText(n, { x: 1.0, y: y + 0.2, w: 0.7, h: 0.8, fontFace: FONT, fontSize: 26, bold: true, color: TEAL, margin: 0, valign: 'middle' });
      s.addText(t, { x: 1.9, y: y + 0.15, w: 7.3, h: 0.5, fontFace: FONT, fontSize: 18, bold: true, color: NAVY, margin: 0 });
      s.addText(d, { x: 1.9, y: y + 0.62, w: 7.3, h: 0.45, fontFace: FONT, fontSize: 14.5, color: MUTED, margin: 0 });
      s.addText(badge, { x: 10.4, y: y + 0.35, w: 1.9, h: 0.5, fontFace: FONT, fontSize: 16, bold: true, color: TEAL, align: 'right', margin: 0 });
    });
    s.addNotes('Hand the sheet out as you talk. Small actions; the difference between a PD hour and a changed school.');
  }

  // ============================== SLIDE 29 · EXIT TICKET ==============================
  {
    const s = base();
    kicker(s, 'Two minutes, at the door');
    title(s, 'Exit ticket');
    bullets(s, [
      'The assignment you built for, and the lane it landed in',
      'One line from your AI Box',
      { text: 'A gray-area case you still want the staff to answer together', options: { bold: true } },
      'It doubles as the school\'s PD documentation',
    ]);
    s.addNotes('The gray-area answers set follow-up #2\'s calibration case. Collect at the door.');
  }

  // ============================== SLIDE 30 · CLOSE ==============================
  {
    const s = base(true);
    s.addText('The schools that get this right won\'t be\nthe ones with the best detectors.', {
      x: 0.9, y: 1.6, w: 11.5, h: 1.7, fontFace: FONT, fontSize: 34, bold: true, color: WHITE, margin: 0, lineSpacingMultiple: 1.15 });
    s.addText('They\'ll be the ones where every student can answer three questions: what\'s allowed on this assignment, how do I say what I used, and what happens if I\'m honest?', {
      x: 0.9, y: 3.5, w: 11.3, h: 1.2, fontFace: FONT, fontSize: 20, color: 'C9D4DE', margin: 0 });
    s.addText('Next: Kit 6 · AI for Communication: Parent Messages, Translation, and Tone', {
      x: 0.9, y: 5.6, w: 11.3, h: 0.5, fontFace: FONT, fontSize: 16, bold: true, color: AMBER, margin: 0 });
    s.addText('Thanks for the hour. Go label an assignment.', {
      x: 0.9, y: 6.15, w: 11.3, h: 0.5, fontFace: FONT, fontSize: 18, color: WHITE, margin: 0 });
    s.addNotes('Close warm. You just wrote the answers to those three questions for your classroom.');
  }

  const out = path.resolve(__dirname, '../Kit05_PresentationDeck.pptx');
  await p.writeFile({ fileName: out });
  console.log('wrote', out, '· 30 slides');
})();
