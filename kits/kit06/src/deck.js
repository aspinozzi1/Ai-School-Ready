#!/usr/bin/env node
/* Kit 6 Presentation Deck · AI for Communication: Parent Messages, Translation, and Tone
   30 slides, locked AI-Ready School brand, speaker notes on every slide.
   Build: node kits/kit06/src/deck.js  → kits/kit06/Kit06_PresentationDeck.pptx */
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
  p.title = 'Kit 6: AI for Communication: Parent Messages, Translation, and Tone';

  const RIVERA = [null,
    "Her math: one wave of messages a week, drafted in the margins after dinner.",
    "Her lever: one sentence home per week moved real outcomes. She wants that at scale.",
    "Her goal: next week's real message drafted, a positive-note batch, a translation plan.",
    "Her shortlist: newsletters, updates, tone repair, reading level, reformatting.",
    "Her worry, named: if every note sounds like every other note, families notice.",
    "Her two rules, still on: the situation, never the child; nothing goes out unread.",
    "Her banner: families hear HER, not the tool.", null,
    "Her difficult email: vent draft deleted, professional draft sent, relationship intact.",
    "Her batch: three one-sentence positive notes, each personalized before sending.",
    "Her diagnosis eye: no audience, no action item, buried lede. Now she can fix all three.",
    "Her roster: several families who read other languages. Access is the assignment.",
    "Her translation plan: plain language first, district channel for official, human check.",
    "Her tone kit: 'warmer, shorter, plainer,' the read-aloud test, the 24-hour rule.",
    "Her human-only list: safety, discipline, grief, IEP news. She calls first.",
    "Her trust ledger: every reviewed, personal message is a deposit.",
    "Her lab plan: one real message, one note batch, one translation plan.",
    "On her screen: next week's message, drafted with all four parts.",
    "Her passes: tone (sounds like her) and reading level (skimmable on a phone).",
    "Her batch, live: three improvement-focused notes, names added only in her own email.",
    "Her access plan: which languages, which channel, who gives the human check.",
    "Her share-out: the before and after, read aloud.",
    "Her inventory: message ready, batch started, translation plan written.",
    "Her honest limits: AI can't know the family or repair trust it didn't build.",
    "Her commitments: review and personalize everything; call first on hard news; one batch a week.",
    "Her month: batch habit, translation audit, comms templates in the staff doc.",
    "Her 48 hours: send the message, send the batch, start the access plan.",
    "Her exit ticket: what she drafted, her note-batch plan, one worry.", null];
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
      s.addText(`Kit 6 · AI for Communication   |   ${slideNo}`, {
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

  // ============================== SLIDE 1 · TITLE ==============================
  {
    const s = base(true);
    s.addImage({ data: markDarkPng, x: 0.85, y: 0.8, w: 1.15, h: 1.06 });
    s.addText([
      { text: 'AI-Ready', options: { color: TEAL, bold: true } },
      { text: ' School', options: { color: WHITE, bold: true } },
    ], { x: 2.15, y: 1.05, w: 4, h: 0.6, fontFace: FONT, fontSize: 26, margin: 0, valign: 'middle' });
    s.addText('TRACK A · AI FOUNDATIONS · KIT 6 OF 20', {
      x: 0.9, y: 3.0, w: 9, h: 0.4, fontFace: FONT, fontSize: 15, bold: true,
      color: AMBER, charSpacing: 3, margin: 0 });
    s.addText('AI for Communication:\nParent Messages, Translation, and Tone', {
      x: 0.85, y: 3.35, w: 11.8, h: 2.0, fontFace: FONT, fontSize: 40, bold: true,
      color: WHITE, margin: 0, valign: 'middle', lineSpacingMultiple: 1.05 });
    s.addText('A 45–60 minute working session. You leave with next week\'s real family message written, voiced, and ready to send.', {
      x: 0.9, y: 5.45, w: 11.2, h: 0.5, fontFace: FONT, fontSize: 18, color: 'C9D4DE', margin: 0 });
    s.addText('Built by Adam & Katelyn Spinozzi · certified educators · 20+ combined years in the classroom', {
      x: 0.9, y: 6.6, w: 11.5, h: 0.4, fontFace: FONT, fontSize: 12, color: '9FB2C2', margin: 0 });
    s.addNotes('Slide up as people arrive. Start on time. Say: today is about what goes home, and by the end next week\'s real message is written and sounding like you.');
  }

  // ============================== SLIDE 2 · THE MARGIN PROBLEM ==============================
  {
    const s = base();
    kicker(s, 'Where communication actually lives');
    title(s, 'The margin problem');
    card(s, 0.7, 1.75, 5.75, 3.7, PAPER);
    s.addText('THE WEEK', { x: 0.7, y: 1.95, w: 5.75, h: 0.35, fontFace: FONT, fontSize: 13, bold: true, color: NAVY, align: 'center', charSpacing: 2, margin: 0 });
    s.addText('~54 hrs', { x: 0.7, y: 2.3, w: 5.75, h: 1.05, fontFace: FONT, fontSize: 52, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addText('The teacher work week, with less than half spent directly teaching. Family communication lives in the rest: the after-dinner margins. (Merrimack College/EdWeek, 2022)', {
      x: 1.0, y: 3.4, w: 5.15, h: 1.9, fontFace: FONT, fontSize: 16, color: INK, align: 'center', margin: 0 });
    card(s, 6.85, 1.75, 5.75, 3.7, 'EAF5F3');
    s.addText('THE RECOVERABLE PART', { x: 6.85, y: 1.95, w: 5.75, h: 0.35, fontFace: FONT, fontSize: 13, bold: true, color: TEAL, align: 'center', charSpacing: 2, margin: 0 });
    s.addText('~5.9 hrs', { x: 6.85, y: 2.3, w: 5.75, h: 1.05, fontFace: FONT, fontSize: 52, bold: true, color: TEAL, align: 'center', margin: 0 });
    s.addText('Weekly time saved by teachers who\'ve made AI a habit, with communication drafting among the most common uses. (Gallup & Walton Family Foundation, 2025)', {
      x: 7.15, y: 3.4, w: 5.15, h: 1.9, fontFace: FONT, fontSize: 16, color: INK, align: 'center', margin: 0 });
    s.addText('The question of this hour: recover the time without families noticing a robot moved in.', {
      x: 0.7, y: 5.85, w: 12.0, h: 0.55, fontFace: FONT, fontSize: 20, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('Say: the time is real and recoverable; the risk is your voice. Both stats verified: Merrimack/EdWeek 2022; Gallup-Walton 2025.');
  }

  // ============================== SLIDE 3 · ONE SENTENCE ==============================
  {
    const s = base();
    kicker(s, 'The best evidence in family communication');
    title(s, 'One sentence moves the needle', { w: 8.7 });
    card(s, 0.7, 1.75, 5.75, 3.7, 'EAF5F3');
    s.addText('COURSE FAILURE, BEFORE', { x: 0.7, y: 1.95, w: 5.75, h: 0.35, fontFace: FONT, fontSize: 13, bold: true, color: MUTED, align: 'center', charSpacing: 2, margin: 0 });
    s.addText('15.8%', { x: 0.7, y: 2.3, w: 5.75, h: 1.05, fontFace: FONT, fontSize: 52, bold: true, color: MUTED, align: 'center', margin: 0 });
    s.addText('of credit-recovery students failed to earn course credit with no weekly message home. (Kraft & Rogers, 2015)', {
      x: 1.0, y: 3.4, w: 5.15, h: 1.9, fontFace: FONT, fontSize: 16, color: INK, align: 'center', margin: 0 });
    card(s, 6.85, 1.75, 5.75, 3.7, 'EAF5F3');
    s.addText('WITH ONE SENTENCE A WEEK', { x: 6.85, y: 1.95, w: 5.75, h: 0.35, fontFace: FONT, fontSize: 13, bold: true, color: TEAL, align: 'center', charSpacing: 2, margin: 0 });
    s.addText('9.3%', { x: 6.85, y: 2.3, w: 5.75, h: 1.05, fontFace: FONT, fontSize: 52, bold: true, color: TEAL, align: 'center', margin: 0 });
    s.addText('failed when teachers sent one individualized sentence home weekly: a 41% reduction, strongest for improvement-focused messages. (Same study)', {
      x: 7.15, y: 3.4, w: 5.15, h: 1.9, fontFace: FONT, fontSize: 16, color: INK, align: 'center', margin: 0 });
    s.addText('Personal-at-scale used to cost hours nobody had. That cost just changed.', {
      x: 0.7, y: 5.85, w: 12.0, h: 0.55, fontFace: FONT, fontSize: 20, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('Kraft & Rogers 2015, Economics of Education Review: one individualized sentence per week, 41% failure reduction, improvement-focused messages strongest. This study powers the positive-note batch on slide 11.');
  }

  // ============================== SLIDE 4 · AGENDA ==============================
  {
    const s = base();
    kicker(s, 'The hour ahead');
    title(s, 'Agenda, and one promise');
    const rows = [
      ['0:05', 'What AI does well here, and the voice it threatens'],
      ['0:12', 'Three makeovers: newsletter, hard email, note batch'],
      ['0:24', 'Reaching every family: translation, tone, the human-only list'],
      ['0:30', 'Lab: real messages, really sent'],
      ['0:52', 'Making it stick + first 48 hours'],
    ];
    rows.forEach(([t, txt], i) => {
      const y = 1.6 + i * 0.8;
      s.addText(t, { x: 0.9, y, w: 1.1, h: 0.6, fontFace: FONT, fontSize: 20, bold: true, color: TEAL, margin: 0, valign: 'middle' });
      s.addText(txt, { x: 2.1, y, w: 7.4, h: 0.6, fontFace: FONT, fontSize: 20, color: INK, margin: 0, valign: 'middle' });
    });
    card(s, 9.9, 2.1, 2.85, 3.2, NAVY);
    s.addText('One promise', { x: 10.15, y: 2.35, w: 2.35, h: 0.4, fontFace: FONT, fontSize: 16, bold: true, color: AMBER, margin: 0 });
    s.addText('You leave with next week\'s real message written and voiced, a positive-note batch started, and a translation plan for your roster.', {
      x: 10.15, y: 2.8, w: 2.35, h: 2.3, fontFace: FONT, fontSize: 13.5, color: WHITE, margin: 0, valign: 'top' });
    s.addNotes('Say: real messages ready to send, not notes about messages. Keep this quick.');
  }

  // ============================== SLIDE 5 · GOOD AT ==============================
  {
    const s = base();
    kicker(s, 'Where the intern earns its keep');
    title(s, 'What it\'s genuinely good at here');
    const items = [
      ['First drafts', 'Newsletters, updates, reminders: the routine wave'],
      ['Tone repair', 'When you\'re too tired or too angry to find the words'],
      ['Reading level', 'Plain, skimmable messages that land for every family'],
      ['Reformatting', 'One update as an email, a text blurb, and a flyer'],
    ];
    items.forEach(([h, b], i) => {
      const x = 0.7 + (i % 2) * 6.15, y = 1.6 + Math.floor(i / 2) * 1.95;
      card(s, x, y, 5.85, 1.75, PAPER);
      s.addText(h, { x: x + 0.3, y: y + 0.18, w: 5.25, h: 0.45, fontFace: FONT, fontSize: 20, bold: true, color: NAVY, margin: 0 });
      s.addText(b, { x: x + 0.3, y: y + 0.68, w: 5.25, h: 0.9, fontFace: FONT, fontSize: 16, color: INK, margin: 0 });
    });
    s.addText('Not on the list: anything that requires knowing the family. That was never draftable.', {
      x: 0.7, y: 5.65, w: 12.0, h: 0.6, fontFace: FONT, fontSize: 18, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('Say: four jobs the tool does well, and the one it can\'t: knowing the family. That line sets up the whole session.');
  }

  // ============================== SLIDE 6 · THE VOICE PROBLEM ==============================
  {
    const s = base();
    kicker(s, 'The one thing it threatens');
    title(s, 'The voice problem');
    bullets(s, [
      'AI output has a house style: smooth, pleasant, beige',
      'In a lesson plan, beige is fine. In a message to a family who knows you, beige is noticeable',
      { text: 'Across a school it compounds: if every newsletter sounds like the same cheerful robot, families stop reading all of them', options: {} },
    ], { y: 1.55, h: 2.9 });
    card(s, 0.7, 4.7, 12.0, 1.5, 'EAF5F3');
    s.addText('Your slightly imperfect, recognizable, human voice is not a flaw to polish out. It\'s the asset.', {
      x: 1.05, y: 4.9, w: 11.3, h: 1.1, fontFace: FONT, fontSize: 21, bold: true, color: NAVY, margin: 0, valign: 'middle' });
    s.addNotes('Say: Kit 2\'s voice round is about to become the most important skill in this session. The beige risk is real and families are the first to notice.');
  }

  // ============================== SLIDE 7 · TWO RULES RIDE ALONG ==============================
  {
    const s = base();
    kicker(s, 'Kit 1, pointed at the inbox');
    title(s, 'The two rules ride along');
    card(s, 0.7, 1.7, 5.9, 4.3, PAPER);
    s.addText('THE SITUATION, NEVER THE CHILD', { x: 1.05, y: 1.95, w: 5.25, h: 0.4, fontFace: FONT, fontSize: 15, bold: true, color: TEAL, margin: 0 });
    s.addText('Family messages are about specific kids, so the temptation is strongest here. Describe the situation to the tool ("a middle schooler with several missing assignments"); add the name after the draft is back in your own email.', {
      x: 1.05, y: 2.45, w: 5.25, h: 3.3, fontFace: FONT, fontSize: 17, color: INK, margin: 0, valign: 'top' });
    card(s, 6.85, 1.7, 5.9, 4.3, PAPER);
    s.addText('NOTHING GOES OUT UNREAD', { x: 7.2, y: 1.95, w: 5.25, h: 0.4, fontFace: FONT, fontSize: 15, bold: true, color: TEAL, margin: 0 });
    s.addText('Your name is on it. A family can\'t tell what you wrote from what you approved, and they shouldn\'t have to. Review, personalize, then send: the humans-in-the-loop habit, applied to the send button.', {
      x: 7.2, y: 2.45, w: 5.25, h: 3.3, fontFace: FONT, fontSize: 17, color: INK, margin: 0, valign: 'top' });
    s.addNotes('Both rules are Kit 1 carryovers: no student PII in public tools; nothing AI-drafted reaches a family unread (U.S. DoE humans-in-the-loop, 2023).');
  }

  // ============================== SLIDE 8 · THE BANNER ==============================
  {
    const s = base(true);
    s.addText('THE BANNER OVER EVERYTHING TODAY', { x: 0.9, y: 1.7, w: 11.5, h: 0.5, fontFace: FONT, fontSize: 15, bold: true, color: AMBER, charSpacing: 3, margin: 0 });
    s.addText('Families hear you,\nnot the tool.', {
      x: 0.9, y: 2.3, w: 11.5, h: 1.9, fontFace: FONT, fontSize: 44, bold: true, color: WHITE, margin: 0, lineSpacingMultiple: 1.1 });
    s.addText('AI drafts; you review, personalize, and send. If a message wouldn\'t survive you reading it aloud in your own voice at a conference, it isn\'t done.', {
      x: 0.9, y: 4.5, w: 11.3, h: 1.2, fontFace: FONT, fontSize: 19, color: 'C9D4DE', margin: 0 });
    s.addNotes('Dark slide, said slowly. Every technique in the next twenty minutes serves this banner.');
  }

  // ============================== SLIDE 9 · MAKEOVER 1: NEWSLETTER ==============================
  {
    const s = base();
    kicker(s, 'Makeover #1 · the newsletter · on Ms. Rivera\'s screen');
    title(s, 'The weekly newsletter');
    s.addText([
      { text: 'BEFORE   ', options: { bold: true, color: BAD } },
      { text: '"Write my newsletter."', options: { italic: true, color: MUTED } },
    ], { x: 0.7, y: 1.42, w: 12.0, h: 0.4, fontFace: FONT, fontSize: 16, margin: 0, valign: 'middle' });
    s.addShape('roundRect', { x: 0.7, y: 1.95, w: 12.0, h: 3.85, rectRadius: 0.1, fill: { color: WHITE }, line: { color: 'DCE3EA', width: 1.5 } });
    s.addShape('roundRect', { x: 0.7, y: 1.95, w: 12.0, h: 0.42, rectRadius: 0.1, fill: { color: NAVY }, line: { color: NAVY } });
    ['E8837A', AMBER, GOOD].forEach((c, i) => s.addShape('ellipse', { x: 0.95 + i * 0.27, y: 2.08, w: 0.16, h: 0.16, fill: { color: c }, line: { color: c } }));
    s.addText('AI chat tool (any of them) · Ms. Rivera, our running example teacher (a composite, not a real person)', {
      x: 1.95, y: 1.95, w: 10.6, h: 0.42, fontFace: FONT, fontSize: 11, color: '9FB2C2', margin: 0, valign: 'middle' });
    s.addShape('roundRect', { x: 1.7, y: 2.6, w: 10.55, h: 2.95, rectRadius: 0.12, fill: { color: PAPER }, line: { color: PAPER } });
    s.addText([
      { text: '"You are a warm, organized teacher. ', options: { color: TEAL, bold: true } },
      { text: 'Draft this week\'s family newsletter for my class. ', options: { color: NAVY, bold: true } },
      { text: 'Context: we finished our fractions unit, the science fair is Thursday at 6 p.m. in the gym, picture day is Friday, and the blue permission slip is due Wednesday. ', options: { color: 'B07914', bold: true } },
      { text: 'Format: under 150 words, warm but skimmable on a phone, action items as a short bulleted list, one positive line about the class\'s week."', options: { color: GOOD, bold: true } },
    ], { x: 1.95, y: 2.75, w: 10.05, h: 2.7, fontFace: FONT, fontSize: 16, margin: 0, valign: 'top', lineSpacingMultiple: 1.1 });
    const chips = [['ROLE', TEAL], ['TASK', NAVY], ['CONTEXT', 'B07914'], ['FORMAT', GOOD]];
    chips.forEach(([t, c], i) => {
      const x = 0.7 + i * 3.08;
      s.addShape('roundRect', { x, y: 6.05, w: 2.85, h: 0.5, rectRadius: 0.25, fill: { color: c }, line: { color: c } });
      s.addText(t, { x, y: 6.05, w: 2.85, h: 0.5, fontFace: FONT, fontSize: 14, bold: true, color: WHITE, align: 'center', valign: 'middle', margin: 0, charSpacing: 2 });
    });
    s.addNotes('Say: count the four color-coded parts with me: role in teal, task in navy, context in amber (look how much she gives it), format in green. Ninety seconds of typing; the draft comes back needing only her voice pass. This is the shape to mimic in lab step 1.');
  }

  // ============================== SLIDE 10 · MAKEOVER 2: THE DIFFICULT EMAIL ==============================
  {
    const s = base();
    kicker(s, 'Makeover #2 · the email you shouldn\'t send');
    title(s, 'The difficult email');
    card(s, 0.7, 1.6, 12.0, 1.5, 'FBEFED');
    s.addText('WHAT SHE WANTED TO WRITE, 9 P.M.', { x: 1.0, y: 1.75, w: 8, h: 0.35, fontFace: FONT, fontSize: 11.5, bold: true, color: BAD, charSpacing: 1.5, margin: 0 });
    s.addText('Honest in exactly the way careers end. The vent draft gets deleted, never sent.', {
      x: 1.0, y: 2.12, w: 11.4, h: 0.85, fontFace: FONT, fontSize: 17, italic: true, color: INK, margin: 0 });
    card(s, 0.7, 3.35, 12.0, 2.3, 'EAF5F3');
    s.addText('WHAT SHE ASKED THE TOOL INSTEAD (NO NAMES)', { x: 1.0, y: 3.5, w: 9, h: 0.35, fontFace: FONT, fontSize: 11.5, bold: true, color: GOOD, charSpacing: 1.5, margin: 0 });
    s.addText('"Draft a calm, professional reply to a frustrated parent who believes their child\'s grade is unfair. Acknowledge the frustration, explain that specifics belong in a conversation, offer two meeting times, under 120 words, firm and warm."', {
      x: 1.0, y: 3.9, w: 11.4, h: 1.65, fontFace: FONT, fontSize: 17, italic: true, color: INK, margin: 0 });
    s.addText('The tool absorbs the heat. The 24-hour rule handles the rest: written angry waits a day.', {
      x: 0.7, y: 5.95, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 19, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('Say: let the tool absorb the heat; the emotion comes out, the relationship stays intact. Specifics and names get added in her own email. The 24-hour rule needs no AI: it\'s wisdom with a timestamp.');
  }

  // ============================== SLIDE 11 · MAKEOVER 3: THE NOTE BATCH ==============================
  {
    const s = base();
    kicker(s, 'Makeover #3 · the research, turned into a habit');
    title(s, 'The positive-note batch');
    const steps = [
      ['1', 'Once a week, ask for a page of one-sentence note starters: warm, improvement-focused, grouped by situation. No names near the tool.'],
      ['2', 'Pick three. Match each to a real student in your head.'],
      ['3', 'Personalize each in your own words, in your own email, and send. Five minutes, three families.'],
    ];
    steps.forEach(([n, t], i) => {
      const y = 1.6 + i * 1.25;
      s.addShape('ellipse', { x: 0.9, y: y + 0.15, w: 0.7, h: 0.7, fill: { color: TEAL }, line: { color: TEAL } });
      s.addText(n, { x: 0.9, y: y + 0.15, w: 0.7, h: 0.7, fontFace: FONT, fontSize: 24, bold: true, color: WHITE, align: 'center', margin: 0, valign: 'middle' });
      card(s, 1.85, y, 10.8, 1.05, PAPER);
      s.addText(t, { x: 2.15, y: y + 0.08, w: 10.2, h: 0.9, fontFace: FONT, fontSize: 16.5, color: INK, margin: 0, valign: 'middle' });
    });
    card(s, 0.7, 5.5, 12.0, 1.0, 'EAF5F3');
    s.addText('The tool made the blank page cheap. The sentence that lands is still yours: that\'s the mechanism the research measured.', {
      x: 1.05, y: 5.62, w: 11.3, h: 0.8, fontFace: FONT, fontSize: 17, bold: true, color: NAVY, margin: 0, valign: 'middle' });
    s.addNotes('Say: this is Kraft & Rogers turned into five minutes a week: improvement-focused, individualized, personalized by you. The personalizing step is not optional; it\'s the mechanism.');
  }

  // ============================== SLIDE 12 · PRACTICE: DIAGNOSE ==============================
  {
    const s = base();
    kicker(s, 'Practice · call out the problem');
    title(s, 'Diagnose the message');
    const rows = [
      ['1', 'A 400-word newsletter; the permission slip is in the last paragraph', 'Buried lede: the action item leads'],
      ['2', '"Formative assessment data indicates…" to families', 'Audience miss: plain words, phone-skimmable'],
      ['3', 'Three updates, nothing for families to do', 'No action item: end with what to do, by when'],
      ['4', 'Polished, but it sounds like a bank wrote it', 'Voice: warm it up before it goes out'],
    ];
    rows.forEach(([n, scenario, answer], i) => {
      const y = 1.55 + i * 1.2;
      s.addText(n, { x: 0.8, y: y + 0.1, w: 0.6, h: 0.9, fontFace: FONT, fontSize: 22, bold: true, color: TEAL, margin: 0, valign: 'middle' });
      s.addText(scenario, { x: 1.5, y: y + 0.05, w: 6.3, h: 1.0, fontFace: FONT, fontSize: 16.5, color: INK, margin: 0, valign: 'middle' });
      s.addText(answer, { x: 8.0, y: y + 0.05, w: 4.7, h: 1.0, fontFace: FONT, fontSize: 14.5, color: MUTED, margin: 0, valign: 'middle' });
    });
    s.addText('The fix kit is four prompts: shorter · plainer · lead with the action · sound like me.', {
      x: 0.7, y: 6.35, w: 12.0, h: 0.45, fontFace: FONT, fontSize: 16, italic: true, color: MUTED, align: 'center', margin: 0 });
    s.addNotes('Let the room call each problem before you confirm with the right column. 45-min cut: rows 1 and 3 only.');
  }

  // ============================== SLIDE 13 · THE ACCESS GAP ==============================
  {
    const s = base();
    kicker(s, 'The families our messages never reach');
    title(s, 'The access gap');
    card(s, 0.7, 1.75, 5.75, 3.7, PAPER);
    s.addText('ENGLISH LEARNERS, U.S. SCHOOLS', { x: 0.7, y: 1.95, w: 5.75, h: 0.35, fontFace: FONT, fontSize: 13, bold: true, color: NAVY, align: 'center', charSpacing: 2, margin: 0 });
    s.addText('5.3M', { x: 0.7, y: 2.3, w: 5.75, h: 1.05, fontFace: FONT, fontSize: 52, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addText('students, 10.6% of U.S. public school enrollment, are English learners; behind many is a family that reads another language. (NCES, 2024)', {
      x: 1.0, y: 3.4, w: 5.15, h: 1.9, fontFace: FONT, fontSize: 16, color: INK, align: 'center', margin: 0 });
    card(s, 6.85, 1.75, 5.75, 3.7, 'EAF5F3');
    s.addText('WHAT FEDERAL GUIDANCE REQUIRES', { x: 6.85, y: 1.95, w: 5.75, h: 0.35, fontFace: FONT, fontSize: 13, bold: true, color: TEAL, align: 'center', charSpacing: 2, margin: 0 });
    s.addText('A language they\ncan understand', { x: 6.85, y: 2.32, w: 5.75, h: 1.15, fontFace: FONT, fontSize: 26, bold: true, color: TEAL, align: 'center', margin: 0, lineSpacingMultiple: 1.05 });
    s.addText('Schools must communicate with limited-English-proficient parents in a language they can understand: the same information other families get. (ED/DOJ, 2015)', {
      x: 7.15, y: 3.5, w: 5.15, h: 1.8, fontFace: FONT, fontSize: 16, color: INK, align: 'center', margin: 0 });
    s.addText('Every English-only newsletter quietly leaves families out of the conversation that changes outcomes.', {
      x: 0.7, y: 5.85, w: 12.0, h: 0.55, fontFace: FONT, fontSize: 19, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('Both verified: NCES Condition of Education (fall 2021 data); ED/DOJ 2015 Dear Colleague Letter (Title VI). Frame as obligation AND opportunity: the one-sentence research from slide 3 applies to every family.');
  }

  // ============================== SLIDE 14 · TRANSLATION, RESPONSIBLY ==============================
  {
    const s = base();
    kicker(s, 'The four rules');
    title(s, 'Translation, responsibly');
    const rules = [
      ['1 · Plain language first', 'Short sentences, no idioms. Plain English translates well; clever English translates badly.'],
      ['2 · Official docs go district', 'Rights, discipline, special education travel your district\'s translation channel, not a chatbot.'],
      ['3 · Human check when stakes rise', 'A bilingual colleague, aide, or liaison reviews. Machine translation is helpful and imperfect.'],
      ['4 · Privacy speaks every language', 'No student details in a public tool, in any language. The rule doesn\'t take a language off.'],
    ];
    rules.forEach(([h, b], i) => {
      const x = 0.7 + (i % 2) * 6.15, y = 1.55 + Math.floor(i / 2) * 2.3;
      card(s, x, y, 5.85, 2.1, PAPER);
      s.addText(h, { x: x + 0.3, y: y + 0.2, w: 5.25, h: 0.5, fontFace: FONT, fontSize: 19, bold: true, color: TEAL, margin: 0 });
      s.addText(b, { x: x + 0.3, y: y + 0.78, w: 5.25, h: 1.2, fontFace: FONT, fontSize: 15.5, color: INK, margin: 0 });
    });
    s.addText('Do these four, and your reach just grew by every family on your roster.', {
      x: 0.7, y: 6.15, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 19, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('Name your district\'s translation office/channel here if you know it. Never trim this slide. If asked "is AI translation good enough?": for routine messages with these rules, it beats sending nothing a family can read; official documents always go district.');
  }

  // ============================== SLIDE 15 · TONE-REPAIR KIT ==============================
  {
    const s = base();
    kicker(s, 'Small enough to memorize');
    title(s, 'The tone-repair kit');
    const items = [
      ['Three commands', '"Warmer." "Shorter." "Plainer." Ninety percent of drafts need exactly one.'],
      ['One test', 'Read it aloud. Your ear knows your voice better than your eyes do.'],
      ['One rule', 'The 24-hour rule: written angry waits a day, unless safety can\'t wait.'],
    ];
    items.forEach(([h, b], i) => {
      const x = 0.7 + i * 4.12;
      card(s, x, 1.7, 3.85, 3.4, PAPER);
      s.addText(h, { x: x + 0.28, y: 2.0, w: 3.3, h: 0.5, fontFace: FONT, fontSize: 20, bold: true, color: TEAL, margin: 0 });
      s.addText(b, { x: x + 0.28, y: 2.6, w: 3.3, h: 2.3, fontFace: FONT, fontSize: 16, color: INK, margin: 0, valign: 'top' });
    });
    s.addText('It fits on the handout\'s back pocket, and it saves a hundred small regrets a year.', {
      x: 0.7, y: 5.4, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 19, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('Expect real feeling on the 24-hour rule; someone in the room has sent the email they regret. Give it a beat.');
  }

  // ============================== SLIDE 16 · THE HUMAN-ONLY LIST ==============================
  {
    const s = base(true);
    s.addText('THE HUMAN-ONLY LIST', { x: 0.9, y: 1.2, w: 11.5, h: 0.5, fontFace: FONT, fontSize: 15, bold: true, color: AMBER, charSpacing: 3, margin: 0 });
    const items = [
      'Anything touching a child\'s safety',
      'Serious discipline situations',
      'A family\'s grief',
      'Special-education decisions and eligibility news',
    ];
    items.forEach((t, i) => {
      const y = 1.95 + i * 0.95;
      s.addText('✕', { x: 1.0, y, w: 0.5, h: 0.75, fontFace: FONT, fontSize: 24, bold: true, color: 'E8837A', margin: 0, valign: 'middle' });
      s.addText(t, { x: 1.7, y, w: 10.8, h: 0.75, fontFace: FONT, fontSize: 20, color: WHITE, margin: 0, valign: 'middle' });
    });
    s.addText('Never delivered by a draft. The technology is a telephone; the script is your own heart, first. If a message would change how a family sees their child, it deserves a human voice.', {
      x: 0.9, y: 5.9, w: 11.5, h: 0.9, fontFace: FONT, fontSize: 17, color: 'C9D4DE', margin: 0 });
    s.addNotes('Dark slide, read slowly. This is the line that makes all the efficiency defensible; say so out loud. Never trim this slide.');
  }

  // ============================== SLIDE 17 · WHAT THIS BUILDS ==============================
  {
    const s = base();
    kicker(s, 'The account that matters when something goes wrong');
    title(s, 'What this builds: trust');
    card(s, 0.7, 1.8, 12.0, 3.6, PAPER);
    s.addText([
      { text: 'Every message home is a deposit in, or a withdrawal from, a family\'s trust.\n\n', options: { bold: true, color: NAVY } },
      { text: 'Reviewed, personal, on-time messages in a language the family reads: deposits. Late, generic, robotic ones: withdrawals. AI just made deposits cheap.', options: { color: INK } },
    ], { x: 1.1, y: 2.1, w: 11.2, h: 3.0, fontFace: FONT, fontSize: 21, margin: 0, valign: 'middle' });
    s.addNotes('One beat, then the lab. Say: AI made deposits cheap. The lab starts now.');
  }

  // ============================== SLIDE 18 · LAB SETUP ==============================
  {
    const s = base(true);
    s.addText('HANDS-ON · ~21 MINUTES', { x: 0.62, y: 0.2, w: 8, h: 0.35, fontFace: FONT, fontSize: 13, bold: true, color: AMBER, charSpacing: 2, margin: 0 });
    s.addText('Lab: real messages, really sent.', {
      x: 0.7, y: 1.3, w: 12.0, h: 1.2, fontFace: FONT, fontSize: 42, bold: true, color: WHITE, margin: 0 });
    s.addText('The message you owe families this week, your first note batch, and a translation plan for your actual roster.', {
      x: 0.72, y: 2.5, w: 11.8, h: 0.9, fontFace: FONT, fontSize: 20, color: 'C9D4DE', margin: 0 });
    const rules = [
      ['1', 'No student information, no family names: situations, never people'],
      ['2', 'Pairs: every message gets a second set of ears before it\'s done'],
      ['3', 'Three deliverables: the message, the batch, the access plan'],
    ];
    rules.forEach(([n, r], i) => {
      const y = 3.75 + i * 0.9;
      s.addShape('ellipse', { x: 0.95, y: y + 0.06, w: 0.55, h: 0.55, fill: { color: TEAL }, line: { color: TEAL } });
      s.addText(n, { x: 0.95, y: y + 0.06, w: 0.55, h: 0.55, fontFace: FONT, fontSize: 20, bold: true, color: WHITE, align: 'center', margin: 0, valign: 'middle' });
      s.addText(r, { x: 1.75, y, w: 10.8, h: 0.7, fontFace: FONT, fontSize: 21, color: WHITE, margin: 0, valign: 'middle' });
    });
    s.addNotes('Dark slide. Pairs formed inside two minutes; announce the tool. Everything built today actually sends this week.');
  }

  // ============================== SLIDE 19 · LAB STEP 1 ==============================
  {
    const s = base();
    kicker(s, 'Lab · step 1 of 4 · 6 minutes');
    title(s, 'Draft the real message');
    bullets(s, [
      'The message you actually owe families: newsletter, unit update, event reminder',
      'All four parts; be generous with context: what happened, what\'s coming, what to do and by when',
      'Mimic the shape on Ms. Rivera\'s screen from slide 9',
      { text: 'Then read it as a tired parent on a phone at 9 p.m., because that\'s who\'s reading it.', options: { bold: true } },
    ]);
    s.addNotes('6 minutes. Circulate. Weak drafts lack context; nudge with "what does a family actually need to know and do this week?"');
  }

  // ============================== SLIDE 20 · LAB STEP 2 ==============================
  {
    const s = base();
    kicker(s, 'Lab · step 2 of 4 · 5 minutes');
    title(s, 'The two passes');
    card(s, 0.7, 1.7, 5.9, 4.2, 'EAF5F3');
    s.addText('THE VOICE PASS', { x: 1.05, y: 2.0, w: 5.2, h: 0.5, fontFace: FONT, fontSize: 18, bold: true, color: GOOD, margin: 0 });
    s.addText('Read your draft ALOUD to your partner. If it doesn\'t sound like you, fix it: warmer, shorter, plainer, or retype the sentence the way you\'d say it.', {
      x: 1.05, y: 2.6, w: 5.2, h: 2.9, fontFace: FONT, fontSize: 17, color: INK, margin: 0, valign: 'top' });
    card(s, 6.85, 1.7, 5.9, 4.2, PAPER);
    s.addText('THE ACCESS PASS', { x: 7.2, y: 2.0, w: 5.2, h: 0.5, fontFace: FONT, fontSize: 18, bold: true, color: TEAL, margin: 0 });
    s.addText('Skimmable? Plain words? Action item up top with a date? A message that fails the access pass fails the families who skim, and that\'s most of them.', {
      x: 7.2, y: 2.6, w: 5.2, h: 2.9, fontFace: FONT, fontSize: 17, color: INK, margin: 0, valign: 'top' });
    s.addText('Both passes pass: the message is done, and it really goes out this week.', {
      x: 0.7, y: 6.15, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 19, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('5 minutes. Pairs read ALOUD; the partner\'s ear is the voice test. Done means send-ready.');
  }

  // ============================== SLIDE 21 · LAB STEP 3 ==============================
  {
    const s = base();
    kicker(s, 'Lab · step 3 of 4 · 5 minutes');
    title(s, 'Start the batch');
    bullets(s, [
      'Ask for one-sentence positive-note starters: warm, improvement-focused, by situation, no names',
      'Pick three; match each to a real student in your head',
      { text: 'Personalize later today in your own email, where names belong', options: {} },
      { text: 'Three families get the sentence the research says matters. Cost: five minutes.', options: { bold: true } },
    ]);
    s.addNotes('5 minutes. 45-min cut: skip; the batch moves to the First 48 Hours sheet. The prompt is on the handout.');
  }

  // ============================== SLIDE 22 · LAB STEP 4 ==============================
  {
    const s = base();
    kicker(s, 'Lab · step 4 of 4 · 3 minutes · alone, quiet');
    title(s, 'Write your access plan');
    card(s, 0.7, 1.7, 12.0, 3.3, PAPER);
    s.addText([
      { text: 'Line 1: ', options: { bold: true, color: NAVY } },
      { text: 'Which languages do my families read? (If unknown: finding out is this week\'s step.)\n', options: { color: INK } },
      { text: 'Line 2: ', options: { bold: true, color: NAVY } },
      { text: 'Official documents travel via: [your district\'s translation channel]\n', options: { color: INK } },
      { text: 'Line 3: ', options: { bold: true, color: NAVY } },
      { text: 'My human check for translated messages: [bilingual colleague, aide, or liaison]', options: { color: INK } },
    ], { x: 1.05, y: 2.0, w: 11.3, h: 2.7, fontFace: FONT, fontSize: 19, margin: 0, valign: 'middle', lineSpacingMultiple: 1.35 });
    s.addText('Three lines, and families who never could read your messages start to.', {
      x: 0.7, y: 5.4, w: 12.0, h: 0.55, fontFace: FONT, fontSize: 20, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('3 minutes, quiet writing; the template is on the handout. Gaps teachers can\'t close (no liaison, no channel) get routed to leadership in the 30-day plan; that\'s their job to close.');
  }

  // ============================== SLIDE 23 · SHARE-OUT ==============================
  {
    const s = base();
    kicker(s, 'Lab · share-out · 3 voices, 1 minute each');
    title(s, 'Read us a before and after');
    bullets(s, [
      'Your message\'s before and after, read aloud, or your favorite note starter',
      'Listen for how different the voices sound',
      { text: 'Same tool, thirty teachers, thirty recognizable humans. That\'s the point.', options: { bold: true } },
    ]);
    s.addNotes('3 voices, one minute each. 45-min cut: two voices. The voice diversity IS the lesson; name it.');
  }

  // ============================== SLIDE 24 · WHAT YOU JUST BUILT ==============================
  {
    const s = base();
    kicker(s, 'Twenty-one minutes of work, on the record');
    title(s, 'The inventory');
    card(s, 0.7, 1.8, 12.0, 3.6, PAPER);
    s.addText([
      { text: 'A real message to families, voiced and ready for this week. A positive-note batch with three families\' sentences chosen. An access plan that starts reaching the families English-only messages missed.\n\n', options: { color: INK } },
      { text: 'That last one might matter most, and it took three minutes.', options: { bold: true, color: NAVY } },
    ], { x: 1.1, y: 2.1, w: 11.2, h: 3.0, fontFace: FONT, fontSize: 20, margin: 0, valign: 'middle' });
    s.addNotes('Let the inventory land. Everything on it sends this week; that\'s what separates this from PD that evaporates.');
  }

  // ============================== SLIDE 25 · HONEST LIMITS ==============================
  {
    const s = base();
    kicker(s, 'This series doesn\'t oversell');
    title(s, 'Honest limits');
    bullets(s, [
      'The tool doesn\'t know your families, their histories, or what last year did to their trust; personalizing is where your knowledge enters',
      'Machine translation is helpful and imperfect; that\'s why the human check exists',
      { text: 'No tool repairs trust. Only consistency does. AI lowers the cost of consistency; that\'s its whole contribution, and it\'s a big one.', options: { bold: true } },
    ]);
    s.addNotes('The honest-limits slide every kit carries. End on the consistency line.');
  }

  // ============================== SLIDE 26 · THREE COMMITMENTS ==============================
  {
    const s = base(true);
    s.addText('OUR THREE COMMITMENTS', { x: 0.9, y: 1.1, w: 11.5, h: 0.5, fontFace: FONT, fontSize: 15, bold: true, color: AMBER, charSpacing: 3, margin: 0 });
    const cs = [
      ['1', 'Every AI-drafted message is reviewed and personalized before it sends; families hear me, not the tool'],
      ['2', 'Hard news travels by voice first, mine, every time'],
      ['3', 'One positive-note batch a week: the one-sentence habit the research validated'],
    ];
    cs.forEach(([n, c], i) => {
      const y = 1.95 + i * 1.3;
      s.addShape('ellipse', { x: 0.95, y: y + 0.12, w: 0.7, h: 0.7, fill: { color: TEAL }, line: { color: TEAL } });
      s.addText(n, { x: 0.95, y: y + 0.12, w: 0.7, h: 0.7, fontFace: FONT, fontSize: 24, bold: true, color: WHITE, align: 'center', margin: 0, valign: 'middle' });
      s.addText(c, { x: 1.95, y, w: 10.6, h: 1.0, fontFace: FONT, fontSize: 20, color: WHITE, margin: 0, valign: 'middle' });
    });
    s.addText('Can I get a nod on those three?', {
      x: 0.9, y: 6.1, w: 11.5, h: 0.55, fontFace: FONT, fontSize: 18, italic: true, color: TEAL, margin: 0 });
    s.addNotes('Dark slide. Read all three, ask for the visible nod, same ritual as every kit.');
  }

  // ============================== SLIDE 27 · WHERE THIS GOES ==============================
  {
    const s = base();
    kicker(s, 'The 30-day plan, in one slide');
    title(s, 'Where this goes next');
    const rows = [
      ['This week', 'The lab message and three positive notes actually send'],
      ['Week 2', 'PLC · Batch Check: did week two\'s notes go out, and what came back?'],
      ['Week 3', 'PLC · Translation Audit: every team knows its languages, channels, checks'],
      ['Week 4', 'PLC · Template Harvest: best messages into the staff doc\'s Communication section'],
    ];
    rows.forEach(([t, txt], i) => {
      const y = 1.7 + i * 1.05;
      s.addText(t, { x: 0.9, y, w: 2.2, h: 0.8, fontFace: FONT, fontSize: 19, bold: true, color: TEAL, margin: 0, valign: 'middle' });
      s.addText(txt, { x: 3.2, y, w: 9.4, h: 0.8, fontFace: FONT, fontSize: 18, color: INK, margin: 0, valign: 'middle' });
    });
    s.addText('Nobody at this school writes the field-trip reminder from scratch again.', {
      x: 0.7, y: 6.1, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 20, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('All inside existing PLC time. The translation audit routes leadership-level gaps up, where they belong.');
  }

  // ============================== SLIDE 28 · FIRST 48 HOURS ==============================
  {
    const s = base();
    kicker(s, 'Before Friday');
    title(s, 'First 48 hours: three sends');
    const rows = [
      ['1', 'Send the message you drafted', 'It passed both passes; it\'s done. Send it on schedule', '~5 min'],
      ['2', 'Send three positive notes', 'Personalized in your own email, improvement-focused and warm', '~10 min'],
      ['3', 'Start the access plan', 'Learn your roster\'s languages; send one translated message', '~10 min'],
    ];
    rows.forEach(([n, t, d, badge], i) => {
      const y = 1.7 + i * 1.4;
      card(s, 0.7, y, 12.0, 1.2, PAPER);
      s.addText(n, { x: 1.0, y: y + 0.2, w: 0.7, h: 0.8, fontFace: FONT, fontSize: 26, bold: true, color: TEAL, margin: 0, valign: 'middle' });
      s.addText(t, { x: 1.9, y: y + 0.15, w: 7.3, h: 0.5, fontFace: FONT, fontSize: 18, bold: true, color: NAVY, margin: 0 });
      s.addText(d, { x: 1.9, y: y + 0.62, w: 7.3, h: 0.45, fontFace: FONT, fontSize: 14.5, color: MUTED, margin: 0 });
      s.addText(badge, { x: 10.4, y: y + 0.35, w: 1.9, h: 0.5, fontFace: FONT, fontSize: 16, bold: true, color: TEAL, align: 'right', margin: 0 });
    });
    s.addNotes('Hand the sheet out as you talk. Three sends, and families actually feel this PD.');
  }

  // ============================== SLIDE 29 · EXIT TICKET ==============================
  {
    const s = base();
    kicker(s, 'Two minutes, at the door');
    title(s, 'Exit ticket');
    bullets(s, [
      'The message you drafted, and when it goes out',
      'Your positive-note plan: batch day and how you\'ll personalize',
      { text: 'The communication situation you still want help with', options: { bold: true } },
      'It doubles as the school\'s PD documentation',
    ]);
    s.addNotes('The "still want help with" answers set the follow-ups\' agenda. Collect at the door.');
  }

  // ============================== SLIDE 30 · CLOSE ==============================
  {
    const s = base(true);
    s.addText('Nobody remembers a beige newsletter.\nNobody forgets the teacher who sent home\none true sentence about their kid.', {
      x: 0.9, y: 1.8, w: 11.5, h: 2.3, fontFace: FONT, fontSize: 32, bold: true, color: WHITE, margin: 0, lineSpacingMultiple: 1.2 });
    s.addText('The tool writes drafts now. The sentences families keep are still yours.', {
      x: 0.9, y: 4.4, w: 11.3, h: 0.7, fontFace: FONT, fontSize: 22, bold: true, color: TEAL, margin: 0 });
    s.addText('Next: Kit 7 · AI for Workload: Winning Back an Hour a Week', {
      x: 0.9, y: 5.6, w: 11.3, h: 0.5, fontFace: FONT, fontSize: 16, bold: true, color: AMBER, margin: 0 });
    s.addText('Thanks for the hour. Go send something worth keeping.', {
      x: 0.9, y: 6.15, w: 11.3, h: 0.5, fontFace: FONT, fontSize: 18, color: WHITE, margin: 0 });
    s.addNotes('Close warm. Collect exit tickets at the door.');
  }

  const out = path.resolve(__dirname, '../Kit06_PresentationDeck.pptx');
  await p.writeFile({ fileName: out });
  console.log('wrote', out, '· 30 slides');
})();
