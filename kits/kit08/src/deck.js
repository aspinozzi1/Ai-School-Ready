#!/usr/bin/env node
/* Kit 8 Presentation Deck · Building Your School's AI Culture (Track A capstone)
   30 slides, locked AI-Ready School brand, speaker notes on every slide.
   Build: node kits/kit08/src/deck.js  → kits/kit08/Kit08_PresentationDeck.pptx */
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
  p.title = "Kit 8: Building Your School's AI Culture";

  const RIVERA = [null,
    "Her eight weeks: rules, formula, artifacts, boxes, batches, templates. All real.",
    "Her risk, named: PD fades unless it becomes routine. Culture is the fix.",
    "Her goal: norms drafted, a sharing routine calendared, every future hire covered.",
    "Her culture test: would a new hire learn the rules by watching, not by asking?",
    "Her five norms, drafted: privacy, review, honesty, sharing, the protected list.",
    "Her sharing routine: five minutes, every PLC: one win, one fail, one steal.",
    "Her banner: a tool becomes culture when nobody has to remember to use it.", null,
    "Her norms, posted: five lines on one page, signed by the faculty.",
    "Her calendar: monthly refreshers, Kit 1 for every new hire, norms revisited each semester.",
    "Her triage eye: healthy culture shares failures; drifting culture hides use.",
    "Her onboarding plan: every new hire runs Kit 1 in their first month.",
    "Her measures: artifacts, not surveillance. Library growth, stories, exit tickets.",
    "Her tool-churn insurance: habits that survive any vendor: rules, formula, review.",
    "Her never list: no policy lag, no mocked skeptics, no finish line.",
    "Her certificate: all eight kits, lived. The AI-Ready Educator Certificate of Completion.",
    "Her lab: norms, routine, onboarding, calendar. The culture, drafted.",
    "On her screen: the five norms, drafted with her partner.",
    "Her routine, picked and calendared: five minutes, every other PLC.",
    "Her onboarding + skeptic plan: Kit 1 for hires; skeptics recruited as reviewers.",
    "Her semester calendar: one refresher a month, norms revisited in January.",
    "Her share-out: one norm, read aloud.",
    "Her inventory: norms, routine, onboarding plan, calendar. Culture, started.",
    "Her honest limits: a document isn't a culture; consistency is. Leadership carries it.",
    "Her commitments: run the routine, onboard every hire, revisit the norms.",
    "Her next: Tracks B-D as they release; the culture makes them land.",
    "Her 48 hours: norms to the faculty, routine on the calendar, certificate celebrated.",
    "Her exit ticket: her favorite norm, her routine date, one worry.", null];
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
      s.addText(`Kit 8 · AI Culture   |   ${slideNo}`, {
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
    s.addText('TRACK A · AI FOUNDATIONS · KIT 8 OF 20 · THE CAPSTONE', {
      x: 0.9, y: 3.0, w: 10, h: 0.4, fontFace: FONT, fontSize: 15, bold: true,
      color: AMBER, charSpacing: 3, margin: 0 });
    s.addText("Building Your School's\nAI Culture", {
      x: 0.85, y: 3.35, w: 11.8, h: 2.0, fontFace: FONT, fontSize: 44, bold: true,
      color: WHITE, margin: 0, valign: 'middle', lineSpacingMultiple: 1.05 });
    s.addText('The last session of the core eight. You leave with your school\'s norms drafted, the routine calendared, and the certificate earned.', {
      x: 0.9, y: 5.45, w: 11.2, h: 0.5, fontFace: FONT, fontSize: 18, color: 'C9D4DE', margin: 0 });
    s.addText('Built by Adam & Katelyn Spinozzi · certified educators · 20+ combined years in the classroom', {
      x: 0.9, y: 6.6, w: 11.5, h: 0.4, fontFace: FONT, fontSize: 12, color: '9FB2C2', margin: 0 });
    s.addNotes('Slide up as people arrive; this one deserves a little ceremony. Say: today we make eight weeks permanent, and there\'s a certificate involved.');
  }

  // ============================== SLIDE 2 · THE INVENTORY ==============================
  {
    const s = base();
    kicker(s, 'What actually exists now');
    title(s, 'The inventory of eight weeks');
    const items = [
      ['Kit 1–2', 'The One Hard Rule, known cold; a prompt formula and a growing library'],
      ['Kit 3–4', 'Differentiated materials and vetted assessments, built for real lessons'],
      ['Kit 5–6', 'Lane labels on assignments; positive notes landing in family inboxes weekly'],
      ['Kit 7', 'Two deleted repeaters per person, and a protected list in ink'],
    ];
    items.forEach(([h, b], i) => {
      const y = 1.55 + i * 1.15;
      card(s, 0.7, y, 12.0, 1.0, PAPER);
      s.addText(h, { x: 1.0, y: y + 0.1, w: 1.6, h: 0.8, fontFace: FONT, fontSize: 17, bold: true, color: TEAL, margin: 0, valign: 'middle' });
      s.addText(b, { x: 2.75, y: y + 0.1, w: 9.7, h: 0.8, fontFace: FONT, fontSize: 16.5, color: INK, margin: 0, valign: 'middle' });
    });
    s.addText('That\'s not a training record. That\'s a changed building. Today we make sure it stays changed.', {
      x: 0.7, y: 6.25, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 18, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('Say: personalize this with the building\'s real wins from the exit-ticket stack; the slide is the generic version, your stories are the true one.');
  }

  // ============================== SLIDE 3 · THE FADE RISK ==============================
  {
    const s = base();
    kicker(s, 'The honest threat');
    title(s, 'The fade risk');
    card(s, 0.7, 1.75, 5.75, 3.7, PAPER);
    s.addText('WHAT THE PD RESEARCH SAYS', { x: 0.7, y: 1.95, w: 5.75, h: 0.35, fontFace: FONT, fontSize: 13, bold: true, color: MUTED, align: 'center', charSpacing: 2, margin: 0 });
    s.addText('It fades', { x: 0.7, y: 2.3, w: 5.75, h: 1.05, fontFace: FONT, fontSize: 44, bold: true, color: BAD, align: 'center', margin: 0 });
    s.addText('Without sustained routines and collaboration, professional learning evaporates. Not from apathy: from October. (Darling-Hammond et al., 2017)', {
      x: 1.0, y: 3.4, w: 5.15, h: 1.9, fontFace: FONT, fontSize: 16, color: INK, align: 'center', margin: 0 });
    card(s, 6.85, 1.75, 5.75, 3.7, PAPER);
    s.addText('WHAT MOST SCHOOLS HAVE WRITTEN', { x: 6.85, y: 1.95, w: 5.75, h: 0.35, fontFace: FONT, fontSize: 13, bold: true, color: MUTED, align: 'center', charSpacing: 2, margin: 0 });
    s.addText('Not much', { x: 6.85, y: 2.3, w: 5.75, h: 1.05, fontFace: FONT, fontSize: 44, bold: true, color: MUTED, align: 'center', margin: 0 });
    s.addText('Adoption everywhere, guidance lagging; about 28 states have published guidance while most buildings still run on vibes. (RAND, 2025; AI for Education tracker)', {
      x: 7.15, y: 3.4, w: 5.15, h: 1.9, fontFace: FONT, fontSize: 16, color: INK, align: 'center', margin: 0 });
    s.addText('You\'re one faculty meeting away from being the exception. This is that meeting.', {
      x: 0.7, y: 5.85, w: 12.0, h: 0.55, fontFace: FONT, fontSize: 20, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('Both claims verified in earlier logs and reconfirmed. The closing line is the session\'s pitch; land it.');
  }

  // ============================== SLIDE 4 · AGENDA ==============================
  {
    const s = base();
    kicker(s, 'The hour ahead');
    title(s, 'Agenda, and one promise');
    const rows = [
      ['0:06', 'What culture means, in testable terms'],
      ['0:12', 'The artifacts: norms, the routine, the calendar'],
      ['0:21', 'Sustaining it: hires, measurement, tool churn'],
      ['0:30', 'Lab: this faculty drafts its culture'],
      ['0:52', 'The certificate + first 48 hours'],
    ];
    rows.forEach(([t, txt], i) => {
      const y = 1.6 + i * 0.8;
      s.addText(t, { x: 0.9, y, w: 1.1, h: 0.6, fontFace: FONT, fontSize: 20, bold: true, color: TEAL, margin: 0, valign: 'middle' });
      s.addText(txt, { x: 2.1, y, w: 7.4, h: 0.6, fontFace: FONT, fontSize: 20, color: INK, margin: 0, valign: 'middle' });
    });
    card(s, 9.9, 2.1, 2.85, 3.2, NAVY);
    s.addText('One promise', { x: 10.15, y: 2.35, w: 2.35, h: 0.4, fontFace: FONT, fontSize: 16, bold: true, color: AMBER, margin: 0 });
    s.addText('You leave with the culture drafted, not described: norms, routine, onboarding, calendar. And the certificate is real.', {
      x: 10.15, y: 2.8, w: 2.35, h: 2.3, fontFace: FONT, fontSize: 13.5, color: WHITE, margin: 0, valign: 'top' });
    s.addNotes('Keep this quick. Today\'s lab drafts the school, not a classroom artifact.');
  }

  // ============================== SLIDE 5 · THE CULTURE TEST ==============================
  {
    const s = base();
    kicker(s, 'A testable definition');
    title(s, 'The culture test');
    card(s, 0.7, 1.7, 12.0, 2.2, NAVY);
    s.addText('Culture is what a new hire learns by watching, before anyone tells them anything.', {
      x: 1.1, y: 1.95, w: 11.2, h: 1.7, fontFace: FONT, fontSize: 25, bold: true, color: WHITE, margin: 0, valign: 'middle' });
    bullets(s, [
      'They\'d see: prompts shared openly · drafts reviewed before shipping · lanes labeled · no student names near a chatbot',
      { text: 'If they\'d have to be told, you have a policy. Policies inform; cultures train.', options: { bold: true } },
    ], { y: 4.2, h: 1.9, fontSize: 20 });
    s.addNotes('Everything today aims at the watching version. This test returns in the lab and the triage practice.');
  }

  // ============================== SLIDE 6 · THE FIVE NORMS ==============================
  {
    const s = base();
    kicker(s, 'Short enough to live on one page');
    title(s, 'The five norms');
    const norms = [
      ['Privacy', 'No student information in public AI tools, ever', 'Kit 1'],
      ['Review', 'Nothing AI-drafted reaches a student or family unread', 'Kits 1–6'],
      ['Honesty', 'We say what we use; assignments carry lane labels', 'Kit 5'],
      ['Sharing', 'Working prompts go in the library; nobody solves twice', 'Kits 2, 7'],
      ['The protected list', 'The relational work stays human, by decision', 'Kit 7'],
    ];
    norms.forEach(([h, b, src], i) => {
      const y = 1.5 + i * 0.95;
      card(s, 0.7, y, 12.0, 0.82, i === 4 ? 'EAF5F3' : PAPER);
      s.addText(h, { x: 1.0, y: y + 0.06, w: 2.9, h: 0.7, fontFace: FONT, fontSize: 17, bold: true, color: NAVY, margin: 0, valign: 'middle' });
      s.addText(b, { x: 4.0, y: y + 0.06, w: 7.1, h: 0.7, fontFace: FONT, fontSize: 15.5, color: INK, margin: 0, valign: 'middle' });
      s.addText(src, { x: 11.2, y: y + 0.06, w: 1.3, h: 0.7, fontFace: FONT, fontSize: 12, color: MUTED, margin: 0, valign: 'middle', align: 'right' });
    });
    s.addText('The jobs are fixed. The wording, in the lab, becomes yours. One page, posted, signed.', {
      x: 0.7, y: 6.35, w: 12.0, h: 0.45, fontFace: FONT, fontSize: 17, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('Each norm is earned by a kit already run; that\'s why drafting takes seven minutes, not a semester. The constitution framing lands well: say it.');
  }

  // ============================== SLIDE 7 · THE SHARING ROUTINE ==============================
  {
    const s = base();
    kicker(s, 'Norms without rhythm are posters');
    title(s, 'Win · Fail · Steal');
    const beats = [
      ['WIN', 'Something AI-drafted that worked, shown or told', TEAL],
      ['FAIL', 'What it got wrong, shared without embarrassment: failure shared is quality control', BAD],
      ['STEAL', 'One template someone takes from the library this week', AMBER],
    ];
    beats.forEach(([h, b, c], i) => {
      const x = 0.7 + i * 4.12;
      card(s, x, 1.7, 3.85, 3.3, PAPER);
      s.addText(h, { x: x + 0.28, y: 2.0, w: 3.3, h: 0.55, fontFace: FONT, fontSize: 24, bold: true, color: c, margin: 0 });
      s.addText(b, { x: x + 0.28, y: 2.65, w: 3.3, h: 2.2, fontFace: FONT, fontSize: 16, color: INK, margin: 0, valign: 'top' });
    });
    s.addText('Five minutes, inside a meeting that already exists. Eight kits, kept alive by five minutes.', {
      x: 0.7, y: 5.4, w: 12.0, h: 0.55, fontFace: FONT, fontSize: 19, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('The fail beat is the important one: a culture that laughs about hallucinated citations is a culture that catches them.');
  }

  // ============================== SLIDE 8 · THE BANNER ==============================
  {
    const s = base(true);
    s.addText('THE BANNER OVER TODAY', { x: 0.9, y: 1.7, w: 11.5, h: 0.5, fontFace: FONT, fontSize: 15, bold: true, color: AMBER, charSpacing: 3, margin: 0 });
    s.addText('A tool becomes culture when nobody\nhas to remember to use it.', {
      x: 0.9, y: 2.3, w: 11.5, h: 1.9, fontFace: FONT, fontSize: 40, bold: true, color: WHITE, margin: 0, lineSpacingMultiple: 1.1 });
    s.addText('Calendars remember. Routines remember. Posted norms remember. People, in October, do not. The lab moves the remembering out of heads and into systems.', {
      x: 0.9, y: 4.5, w: 11.3, h: 1.2, fontFace: FONT, fontSize: 19, color: 'C9D4DE', margin: 0 });
    s.addNotes('Dark slide, said slowly. This is the capstone\'s one-liner; staff will quote it back.');
  }

  // ============================== SLIDE 9 · THE STAFF DOC ==============================
  {
    const s = base();
    kicker(s, 'The culture artifact that matters most · on Ms. Rivera\'s screen');
    title(s, 'The staff doc, eight weeks in');
    s.addShape('roundRect', { x: 0.7, y: 1.5, w: 12.0, h: 4.35, rectRadius: 0.1, fill: { color: WHITE }, line: { color: 'DCE3EA', width: 1.5 } });
    s.addShape('roundRect', { x: 0.7, y: 1.5, w: 12.0, h: 0.42, rectRadius: 0.1, fill: { color: NAVY }, line: { color: NAVY } });
    ['E8837A', AMBER, GOOD].forEach((c, i) => s.addShape('ellipse', { x: 0.95 + i * 0.27, y: 1.63, w: 0.16, h: 0.16, fill: { color: c }, line: { color: c } }));
    s.addText('The staff prompt doc · Ms. Rivera\'s school (a composite example)', {
      x: 1.95, y: 1.5, w: 10.6, h: 0.42, fontFace: FONT, fontSize: 11, color: '9FB2C2', margin: 0, valign: 'middle' });
    const sections = [
      ['PROMPTING (Kit 2)', '8 templates · newsletter shell, quiz frame, leveling…'],
      ['ASSESSMENT (Kit 4)', '9 templates · rubric builder, question banks, starters…'],
      ['COMMUNICATION (Kit 6)', '7 templates · note batch, difficult email, event reminder…'],
      ['WORKLOAD (Kit 7)', '12 templates · sub plan, stations, documentation shells…'],
    ];
    sections.forEach(([h, b], i) => {
      const y = 2.1 + i * 0.82;
      s.addText(h, { x: 1.3, y, w: 4.6, h: 0.7, fontFace: FONT, fontSize: 15, bold: true, color: TEAL, margin: 0, valign: 'middle' });
      s.addText(b, { x: 6.0, y, w: 6.4, h: 0.7, fontFace: FONT, fontSize: 14.5, color: INK, margin: 0, valign: 'middle' });
    });
    card(s, 1.3, 5.35, 11.1, 0.42, 'EAF5F3');
    s.addText('31 templates · 22 contributors · every entry has a name on it', {
      x: 1.55, y: 5.35, w: 10.6, h: 0.42, fontFace: FONT, fontSize: 15, bold: true, color: NAVY, margin: 0, valign: 'middle' });
    s.addText('Twenty-two people teaching each other. Growing weekly = alive. Stalled a month = your early-warning light.', {
      x: 0.7, y: 6.1, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 17, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('Say YOUR building\'s real numbers here (count them before the session); Ms. Rivera\'s are the pattern, yours are the point. The fix for a stall is one sharing round, not a memo.');
  }

  // ============================== SLIDE 10 · NORMS ON ONE PAGE ==============================
  {
    const s = base();
    kicker(s, 'The format matters');
    title(s, 'Norms on one page');
    bullets(s, [
      'One page. Five lines. Plain words that sound like this building.',
      'Signed by the faculty, the way you sign something you mean; posted in the workroom',
      'Revisited every semester so paper and practice match',
      { text: 'Not a binder. Binders are where norms go to be forgotten.', options: { bold: true } },
    ], { y: 1.55, h: 3.2 });
    card(s, 0.7, 4.9, 12.0, 1.35, 'EAF5F3');
    s.addText('When leadership later builds formal policy (Kit 15 is that working session), this page is its seed. Until then, this IS the school\'s stance, and it\'s a real one.', {
      x: 1.05, y: 5.05, w: 11.3, h: 1.05, fontFace: FONT, fontSize: 17, bold: true, color: NAVY, margin: 0, valign: 'middle' });
    s.addNotes('Interim stance beats no stance, and it beats an unread binder. The signing is a small ceremony worth having.');
  }

  // ============================== SLIDE 11 · THE CALENDAR ==============================
  {
    const s = base();
    kicker(s, 'Culture needs dates, or it needs willpower');
    title(s, 'The calendar');
    const rows = [
      ['Every PLC (or every other)', 'The five-minute sharing round: win · fail · steal'],
      ['Monthly, next semester', 'One 10-minute kit refresher, from the 30-day plans you already own'],
      ['Every new hire, month one', 'Kit 1, run by any confident colleague, plus norms page and library tour'],
      ['Once a semester', 'The norms page revisited; a stance that can\'t be revised becomes a relic'],
    ];
    rows.forEach(([t, txt], i) => {
      const y = 1.6 + i * 1.15;
      card(s, 0.7, y, 12.0, 1.0, PAPER);
      s.addText(t, { x: 1.0, y: y + 0.1, w: 3.6, h: 0.8, fontFace: FONT, fontSize: 15.5, bold: true, color: TEAL, margin: 0, valign: 'middle' });
      s.addText(txt, { x: 4.75, y: y + 0.1, w: 7.7, h: 0.8, fontFace: FONT, fontSize: 15.5, color: INK, margin: 0, valign: 'middle' });
    });
    s.addText('None of it is new meeting time. It\'s minutes inside meetings that already exist.', {
      x: 0.7, y: 6.3, w: 12.0, h: 0.45, fontFace: FONT, fontSize: 17, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('Dates are cheaper than willpower. The lab\'s step 4 writes this calendar for real.');
  }

  // ============================== SLIDE 12 · PRACTICE: TRIAGE ==============================
  {
    const s = base();
    kicker(s, 'Practice · call it out');
    title(s, 'Culture triage: healthy or drifting?');
    const rows = [
      ['1', 'A teacher tells the PLC about the quiz question the AI got confidently wrong; everyone laughs and checks their own', 'Healthy: failure shared is quality control'],
      ['2', 'A teacher quietly stops mentioning AI use after a colleague\'s eye-roll', 'Drifting: use going underground is warning light #1'],
      ['3', 'A new hire asks about the rules and gets three identical confident answers', 'Healthy: the watching test, passed'],
      ['4', 'The staff doc hasn\'t gained an entry since September', 'Drifting: the fix is a sharing round, not a lecture'],
    ];
    rows.forEach(([n, scenario, answer], i) => {
      const y = 1.55 + i * 1.2;
      s.addText(n, { x: 0.8, y: y + 0.1, w: 0.6, h: 0.9, fontFace: FONT, fontSize: 22, bold: true, color: TEAL, margin: 0, valign: 'middle' });
      s.addText(scenario, { x: 1.5, y: y + 0.05, w: 6.5, h: 1.0, fontFace: FONT, fontSize: 15, color: INK, margin: 0, valign: 'middle' });
      s.addText(answer, { x: 8.2, y: y + 0.05, w: 4.5, h: 1.0, fontFace: FONT, fontSize: 13.5, color: MUTED, margin: 0, valign: 'middle' });
    });
    s.addNotes('Let the room call each one before you confirm with the right column. 45-min cut: scenarios 1 and 3 only.');
  }

  // ============================== SLIDE 13 · EVERY NEW HIRE ==============================
  {
    const s = base();
    kicker(s, 'The culture\'s biggest leak');
    title(s, 'Every new hire, covered');
    bullets(s, [
      'The January hire never saw week one; without a plan, the culture dilutes one hire at a time',
      'Kit 1 is self-contained: any confident colleague can run it for one person or five',
      { text: 'The norm: Kit 1 in the first month + the norms page in the welcome folder + a library tour from a colleague', options: { bold: true } },
    ], { y: 1.55, h: 2.9 });
    card(s, 0.7, 4.7, 12.0, 1.5, 'EAF5F3');
    s.addText('Thirty minutes of onboarding, and the culture stops depending on who was here in the fall.', {
      x: 1.05, y: 4.9, w: 11.3, h: 1.1, fontFace: FONT, fontSize: 21, bold: true, color: NAVY, margin: 0, valign: 'middle' });
    s.addNotes('The lab\'s step 3 names the onboarding owner. Never trim this idea; turnover is every culture\'s tax.');
  }

  // ============================== SLIDE 14 · MEASURING ==============================
  {
    const s = base();
    kicker(s, 'How you know, without becoming the AI police');
    title(s, 'Measure the garden, not the gardeners');
    card(s, 0.7, 1.7, 5.9, 4.3, 'EAF5F3');
    s.addText('COUNT: ARTIFACTS', { x: 1.05, y: 1.95, w: 5.25, h: 0.4, fontFace: FONT, fontSize: 15, bold: true, color: GOOD, margin: 0 });
    s.addText('Library growth. Exit tickets you already collect. Sharing-round stories. Lane labels visible on assignments. Signals the whole building can see.', {
      x: 1.05, y: 2.45, w: 5.25, h: 3.3, fontFace: FONT, fontSize: 17, color: INK, margin: 0, valign: 'top' });
    card(s, 6.85, 1.7, 5.9, 4.3, 'FBEFED');
    s.addText('NEVER: PEOPLE', { x: 7.2, y: 1.95, w: 5.25, h: 0.4, fontFace: FONT, fontSize: 15, bold: true, color: BAD, margin: 0 });
    s.addText('No auditing individual teachers\' AI use. Surveillance kills the openness that keeps the culture safe; Kit 5 taught the building what policing does to honesty, and it applies to the adults too.', {
      x: 7.2, y: 2.45, w: 5.25, h: 3.3, fontFace: FONT, fontSize: 17, color: INK, margin: 0, valign: 'top' });
    s.addNotes('Leadership hears this one directly. Never trim this slide.');
  }

  // ============================== SLIDE 15 · WHEN TOOLS CHANGE ==============================
  {
    const s = base();
    kicker(s, 'The reassurance somebody needs');
    title(s, 'When the tools change (they will)');
    bullets(s, [
      'Every tool in every headline will change: interfaces, vendors, capabilities',
      'Notice what this series never depended on: a specific product',
      { text: 'The rules, the formula, the review habit, the lanes, the protected list: all of it transfers to whatever arrives next. That\'s the design.', options: { bold: true } },
    ], { y: 1.55, h: 2.9 });
    card(s, 0.7, 4.7, 12.0, 1.5, 'EAF5F3');
    s.addText('Cultures outlive tools. That\'s the whole reason to build one.', {
      x: 1.05, y: 4.9, w: 11.3, h: 1.1, fontFace: FONT, fontSize: 22, bold: true, color: NAVY, margin: 0, valign: 'middle' });
    s.addNotes('45-min cut: this is the trimmable slide. The idea survives in the close.');
  }

  // ============================== SLIDE 16 · THE NEVER LIST ==============================
  {
    const s = base(true);
    s.addText('THE NEVER LIST · CAPSTONE EDITION', { x: 0.9, y: 1.3, w: 11.5, h: 0.5, fontFace: FONT, fontSize: 15, bold: true, color: AMBER, charSpacing: 3, margin: 0 });
    const items = [
      'Never let the written stance lag what staff actually do: revisit it each semester',
      'Never mock the skeptics: they\'re your drift detectors; recruit them, name their value',
      'Never treat today as a finish line: the certificate marks eight kits lived, not a subject completed',
    ];
    items.forEach((t, i) => {
      const y = 2.1 + i * 1.15;
      s.addText('✕', { x: 1.0, y, w: 0.5, h: 0.85, fontFace: FONT, fontSize: 24, bold: true, color: 'E8837A', margin: 0, valign: 'middle' });
      s.addText(t, { x: 1.7, y, w: 10.8, h: 0.85, fontFace: FONT, fontSize: 19.5, color: WHITE, margin: 0, valign: 'middle' });
    });
    s.addText('The schools that get this right stay students of it.', {
      x: 0.9, y: 5.9, w: 11.5, h: 0.5, fontFace: FONT, fontSize: 17, color: 'C9D4DE', margin: 0 });
    s.addNotes('Dark slide, read slowly. Never trim.');
  }

  // ============================== SLIDE 17 · THE CERTIFICATE ==============================
  {
    const s = base();
    kicker(s, 'The milestone');
    title(s, 'The certificate');
    card(s, 0.7, 1.7, 12.0, 3.4, 'EAF5F3');
    s.addText('THE AI-READY EDUCATOR CERTIFICATE OF COMPLETION', { x: 1.05, y: 2.0, w: 11.3, h: 0.45, fontFace: FONT, fontSize: 17, bold: true, color: TEAL, charSpacing: 1.5, margin: 0 });
    s.addText('Earned by completing all eight Track A sessions. It documents something real: eight hours of hands-on professional learning, artifacts built for real classrooms every week, and commitments made out loud and kept. Your exit tickets are the documentation.', {
      x: 1.05, y: 2.6, w: 11.3, h: 2.3, fontFace: FONT, fontSize: 19, color: INK, margin: 0, valign: 'top' });
    s.addText('Check with your district or state whether this PD qualifies for local credit.', {
      x: 0.7, y: 5.35, w: 12.0, h: 0.4, fontFace: FONT, fontSize: 14, italic: true, color: MUTED, align: 'center', margin: 0 });
    s.addText('Most buildings talked about AI this year. Yours trained.', {
      x: 0.7, y: 5.9, w: 12.0, h: 0.55, fontFace: FONT, fontSize: 21, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('Be proud on the room\'s behalf; some faculties applaud here. The exact certificate name and the local-credit line are deliberate and legally careful: keep both verbatim.');
  }

  // ============================== SLIDE 18 · LAB SETUP ==============================
  {
    const s = base(true);
    s.addText('THE LAST LAB · ~22 MINUTES', { x: 0.62, y: 0.2, w: 8, h: 0.35, fontFace: FONT, fontSize: 13, bold: true, color: AMBER, charSpacing: 2, margin: 0 });
    s.addText('Lab: draft the culture.', {
      x: 0.7, y: 1.3, w: 12.0, h: 1.2, fontFace: FONT, fontSize: 44, bold: true, color: WHITE, margin: 0 });
    s.addText('Today you build the school, not a classroom artifact. What you draft goes to the whole faculty this week: write like it\'s real, because it is.', {
      x: 0.72, y: 2.5, w: 11.8, h: 0.9, fontFace: FONT, fontSize: 20, color: 'C9D4DE', margin: 0 });
    const rules = [
      ['1', 'Groups of 3–4, mixed departments; chart paper or a shared doc'],
      ['2', 'Four deliverables: norms · routine with a date · onboarding + skeptic partners · semester rhythm'],
      ['3', 'The building\'s own words beat policy-speak, every time'],
    ];
    rules.forEach(([n, r], i) => {
      const y = 3.75 + i * 0.9;
      s.addShape('ellipse', { x: 0.95, y: y + 0.06, w: 0.55, h: 0.55, fill: { color: TEAL }, line: { color: TEAL } });
      s.addText(n, { x: 0.95, y: y + 0.06, w: 0.55, h: 0.55, fontFace: FONT, fontSize: 20, bold: true, color: WHITE, align: 'center', margin: 0, valign: 'middle' });
      s.addText(r, { x: 1.75, y, w: 10.8, h: 0.7, fontFace: FONT, fontSize: 19.5, color: WHITE, margin: 0, valign: 'middle' });
    });
    s.addNotes('Dark slide. Groups of 3-4 (not pairs), mixed departments. Devices optional; this lab drafts text.');
  }

  // ============================== SLIDE 19 · LAB STEP 1 ==============================
  {
    const s = base();
    kicker(s, 'Lab · step 1 of 4 · 7 minutes');
    title(s, 'Draft the five norms');
    bullets(s, [
      'The five jobs are fixed: privacy · review · honesty · sharing · the protected list',
      'The wording is yours: "we never put a student into a chatbot" beats any compliance sentence',
      'One line per norm',
      { text: 'Finished early? Argue about the wording. That argument is the culture forming.', options: { bold: true } },
    ]);
    s.addNotes('7 protected minutes. Circulate; push for the building\'s own words, not policy-speak.');
  }

  // ============================== SLIDE 20 · LAB STEP 2 ==============================
  {
    const s = base();
    kicker(s, 'Lab · step 2 of 4 · 4 minutes');
    title(s, 'Calendar the routine');
    bullets(s, [
      'Pick the rhythm this building will actually keep: every PLC, every other, or monthly at staff meetings',
      'Win · fail · steal, five minutes',
      { text: 'It counts when it has a date and an owner: who runs round one, and when. Write both.', options: { bold: true } },
    ]);
    s.addNotes('4 minutes. A routine without a date and an owner is a wish; insist on both.');
  }

  // ============================== SLIDE 21 · LAB STEP 3 ==============================
  {
    const s = base();
    kicker(s, 'Lab · step 3 of 4 · 4 minutes');
    title(s, 'Onboarding + skeptic partners');
    card(s, 0.7, 1.7, 5.9, 4.2, PAPER);
    s.addText('ONBOARDING', { x: 1.05, y: 1.95, w: 5.25, h: 0.4, fontFace: FONT, fontSize: 15, bold: true, color: TEAL, margin: 0 });
    s.addText('Who runs Kit 1 for new hires? What\'s in the welcome folder? (The norms page and a library tour, minimum.) Name the owner.', {
      x: 1.05, y: 2.45, w: 5.25, h: 3.2, fontFace: FONT, fontSize: 17, color: INK, margin: 0, valign: 'top' });
    card(s, 6.85, 1.7, 5.9, 4.2, PAPER);
    s.addText('SKEPTIC PARTNERS', { x: 7.2, y: 1.95, w: 5.25, h: 0.4, fontFace: FONT, fontSize: 15, bold: true, color: TEAL, margin: 0 });
    s.addText('Name the colleagues whose doubts keep us honest, and give them a real role: reviewers, drift-spotters, the first people we ask "what\'s wrong with this?" With respect, out loud.', {
      x: 7.2, y: 2.45, w: 5.25, h: 3.2, fontFace: FONT, fontSize: 17, color: INK, margin: 0, valign: 'top' });
    s.addNotes('4 minutes. 45-min cut: fold into step 4\'s block. Recruiting skeptics respectfully is the culture\'s best quality-control hire.');
  }

  // ============================== SLIDE 22 · LAB STEP 4 ==============================
  {
    const s = base();
    kicker(s, 'Lab · step 4 of 4 · 4 minutes');
    title(s, 'Next semester, one line per month');
    bullets(s, [
      'One 10-minute kit refresher a month, from the 30-day plans you already own',
      'Norms revisited in the first month back',
      'New-hire Kit 1 as needed',
      { text: 'Write the months and the kit numbers. That strip of calendar is what makes today permanent.', options: { bold: true } },
    ]);
    s.addNotes('4 minutes. The 30-day plans are the refresher material; nothing new to write, just dates to claim.');
  }

  // ============================== SLIDE 23 · SHARE-OUT ==============================
  {
    const s = base();
    kicker(s, 'Lab · share-out · 4 voices, 1 minute each');
    title(s, 'One norm, read aloud');
    bullets(s, [
      'Each group: one norm in your own wording',
      'Listen for the lines that sound like this building; those survive the merge',
      { text: 'All drafts to the facilitator at the door. The merged page goes to the faculty this week for signing.', options: { bold: true } },
    ]);
    s.addNotes('4 voices. 45-min cut: two. Collect every draft; the merge is this week\'s 30-minute job with a named owner.');
  }

  // ============================== SLIDE 24 · INVENTORY ==============================
  {
    const s = base();
    kicker(s, 'A different kind of inventory');
    title(s, 'What you just built');
    card(s, 0.7, 1.8, 12.0, 3.6, PAPER);
    s.addText([
      { text: 'Five norms in this faculty\'s own words. A sharing routine with a date and an owner. An onboarding plan covering every future colleague. A semester calendar that costs minutes.\n\n', options: { color: INK } },
      { text: 'Eight weeks ago you built your first prompt. Today you built the thing that keeps all of it alive.', options: { bold: true, color: NAVY } },
    ], { x: 1.1, y: 2.1, w: 11.2, h: 3.0, fontFace: FONT, fontSize: 20, margin: 0, valign: 'middle' });
    s.addNotes('Let it land. This inventory is the school\'s, not any one classroom\'s.');
  }

  // ============================== SLIDE 25 · HONEST LIMITS ==============================
  {
    const s = base();
    kicker(s, 'One last time, honestly');
    title(s, 'Honest limits');
    bullets(s, [
      'A signed page is not a culture; consistency is, and leadership carries a disproportionate share of it',
      'Culture is slow; it wobbles in October and needs the routine most exactly when the routine is easiest to skip',
      { text: 'Nothing here is finished: tools change, students surprise, the stance gets revised. That\'s not failure; that\'s what a living culture does.', options: { bold: true } },
    ]);
    s.addNotes('The series has never oversold; don\'t start at the finish line. The leadership line is said to leadership, warmly and directly.');
  }

  // ============================== SLIDE 26 · COMMITMENTS ==============================
  {
    const s = base(true);
    s.addText('THE FINAL THREE COMMITMENTS', { x: 0.9, y: 1.1, w: 11.5, h: 0.5, fontFace: FONT, fontSize: 15, bold: true, color: AMBER, charSpacing: 3, margin: 0 });
    const cs = [
      ['1', 'The sharing routine runs, starting this month: five minutes, protected'],
      ['2', 'Every new hire gets Kit 1, the norms page, and a library tour in month one'],
      ['3', 'We revisit the norms every semester, so the paper always matches the practice'],
    ];
    cs.forEach(([n, c], i) => {
      const y = 1.95 + i * 1.3;
      s.addShape('ellipse', { x: 0.95, y: y + 0.12, w: 0.7, h: 0.7, fill: { color: TEAL }, line: { color: TEAL } });
      s.addText(n, { x: 0.95, y: y + 0.12, w: 0.7, h: 0.7, fontFace: FONT, fontSize: 24, bold: true, color: WHITE, align: 'center', margin: 0, valign: 'middle' });
      s.addText(c, { x: 1.95, y, w: 10.6, h: 1.0, fontFace: FONT, fontSize: 20, color: WHITE, margin: 0, valign: 'middle' });
    });
    s.addText('One last nod?', {
      x: 0.9, y: 6.1, w: 11.5, h: 0.55, fontFace: FONT, fontSize: 18, italic: true, color: TEAL, margin: 0 });
    s.addNotes('Dark slide. The last nod of the series; let it be a little ceremonial.');
  }

  // ============================== SLIDE 27 · WHERE THIS GOES ==============================
  {
    const s = base();
    kicker(s, 'Track A complete · the library keeps growing');
    title(s, 'Where this goes next');
    const rows = [
      ['Track B', 'Subject by subject: ELA, math, science, early elementary, diverse needs, student AI literacy'],
      ['Track C', 'Leadership & governance: the policy working session, rollout, family communication'],
      ['Track D', 'Going deeper: advanced prompting, data without student data, the year-long roadmap'],
    ];
    rows.forEach(([t, txt], i) => {
      const y = 1.7 + i * 1.3;
      card(s, 0.7, y, 12.0, 1.1, PAPER);
      s.addText(t, { x: 1.0, y: y + 0.12, w: 1.8, h: 0.85, fontFace: FONT, fontSize: 19, bold: true, color: TEAL, margin: 0, valign: 'middle' });
      s.addText(txt, { x: 2.95, y: y + 0.12, w: 9.5, h: 0.85, fontFace: FONT, fontSize: 16.5, color: INK, margin: 0, valign: 'middle' });
    });
    s.addText('Kits release into your membership as they\'re finished. The engine is built; everything after this is fuel.', {
      x: 0.7, y: 5.85, w: 12.0, h: 0.55, fontFace: FONT, fontSize: 18, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('The culture drafted today is what makes each future kit land in a week instead of a semester.');
  }

  // ============================== SLIDE 28 · FIRST 48 ==============================
  {
    const s = base();
    kicker(s, 'Before Friday');
    title(s, 'First 48 hours: make it official');
    const rows = [
      ['1', 'The norms page goes out', 'Merged, sent for signing, posted where you post real things', 'Facilitator'],
      ['2', 'Round one gets its date', 'On the real calendar, with the owner the lab named', 'Leadership'],
      ['3', 'Celebrate the certificate', 'Track A complete: staff meeting, newsletter, board report', 'Everyone'],
    ];
    rows.forEach(([n, t, d, badge], i) => {
      const y = 1.7 + i * 1.4;
      card(s, 0.7, y, 12.0, 1.2, PAPER);
      s.addText(n, { x: 1.0, y: y + 0.2, w: 0.7, h: 0.8, fontFace: FONT, fontSize: 26, bold: true, color: TEAL, margin: 0, valign: 'middle' });
      s.addText(t, { x: 1.9, y: y + 0.15, w: 7.3, h: 0.5, fontFace: FONT, fontSize: 18, bold: true, color: NAVY, margin: 0 });
      s.addText(d, { x: 1.9, y: y + 0.62, w: 7.3, h: 0.45, fontFace: FONT, fontSize: 14.5, color: MUTED, margin: 0 });
      s.addText(badge, { x: 10.2, y: y + 0.35, w: 2.1, h: 0.5, fontFace: FONT, fontSize: 15, bold: true, color: TEAL, align: 'right', margin: 0 });
    });
    s.addNotes('Hand the sheet out as you talk. Eight weeks of work deserves its moment; take it.');
  }

  // ============================== SLIDE 29 · EXIT TICKET ==============================
  {
    const s = base();
    kicker(s, 'The last one of Track A');
    title(s, 'Exit ticket');
    bullets(s, [
      'Your favorite norm from today\'s drafts, in its exact wording',
      'The first sharing round\'s date and owner',
      { text: 'The one thing you\'re still honestly worried about', options: { bold: true } },
      'With the ticket in the box, Track A is documented, complete',
    ]);
    s.addNotes('The worries steer what leadership protects first. Collect at the door; this ticket completes the certificate documentation.');
  }

  // ============================== SLIDE 30 · CLOSE ==============================
  {
    const s = base(true);
    s.addText('Eight weeks ago, AI was a headline\nand a hallway worry.', {
      x: 0.9, y: 1.5, w: 11.5, h: 1.5, fontFace: FONT, fontSize: 32, bold: true, color: WHITE, margin: 0, lineSpacingMultiple: 1.15 });
    s.addText('Today it\'s a set of rules everyone knows, a library everyone feeds, hours coming back every week, and a culture with your faculty\'s own words on the wall.', {
      x: 0.9, y: 3.2, w: 11.3, h: 1.1, fontFace: FONT, fontSize: 20, color: 'C9D4DE', margin: 0 });
    s.addText('Human teaching. Life-changing tools. In that order, permanently.', {
      x: 0.9, y: 4.6, w: 11.3, h: 0.7, fontFace: FONT, fontSize: 24, bold: true, color: TEAL, margin: 0 });
    s.addText('Congratulations: you\'re AI-ready, and it\'s on paper.', {
      x: 0.9, y: 5.6, w: 11.3, h: 0.5, fontFace: FONT, fontSize: 18, bold: true, color: AMBER, margin: 0 });
    s.addText('Thanks for all eight hours. Go sign your norms page.', {
      x: 0.9, y: 6.15, w: 11.3, h: 0.5, fontFace: FONT, fontSize: 18, color: WHITE, margin: 0 });
    s.addNotes('Close with real warmth; this is the series\' last slide. Collect exit tickets and the norm drafts at the door.');
  }

  const out = path.resolve(__dirname, '../Kit08_PresentationDeck.pptx');
  await p.writeFile({ fileName: out });
  console.log('wrote', out, '· 30 slides');
})();
