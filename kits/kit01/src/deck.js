#!/usr/bin/env node
/* Kit 1 Presentation Deck · AI Foundations & Safety: The One Hard Rule
   30 slides, locked AI-Ready School brand, speaker notes on every slide.
   Build: node kits/kit01/src/deck.js  → kits/kit01/Kit01_PresentationDeck.pptx */
const pptxgen = require('pptxgenjs');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const NAVY = '13293D', TEAL = '2A9D8F', AMBER = 'F4A825', PAPER = 'F7F5F0',
      INK = '1B1F24', MIST = 'DCE3EA', WHITE = 'FFFFFF', MUTED = '5B6B7A',
      GOOD = '2E7D5B', BAD = 'B4453A';
const FONT = 'Inter';
const W = 13.33, H = 7.5;

(async () => {
  const root = path.resolve(__dirname, '../../..');
  const markSvg = fs.readFileSync(path.join(root, 'public/brand/mark.svg'));
  // white-page variant of the mark for dark footers
  const markDarkSvg = Buffer.from(
    markSvg.toString().replace(/#13293D/g, '#FFFFFF'));
  const markPng = 'image/png;base64,' + (await sharp(markSvg, { density: 300 }).resize(256, 236).png().toBuffer()).toString('base64');
  const markDarkPng = 'image/png;base64,' + (await sharp(markDarkSvg, { density: 300 }).resize(256, 236).png().toBuffer()).toString('base64');

  const p = new pptxgen();
  p.defineLayout({ name: 'WIDE', width: W, height: H });
  p.layout = 'WIDE';
  p.author = 'Adam & Katelyn Spinozzi';
  p.company = 'AI-Ready School';
  p.title = 'Kit 1: AI Foundations & Safety: The One Hard Rule';

  // ---------- helpers (fresh option objects every call; pptxgenjs mutates) ----------
  const RIVERA = [null, "Meet her: our running example teacher. Same piles on her desk as yours.",
    "She noticed: her students and colleagues are already using these tools.",
    "Her goal this hour: leave with one real task done with AI, safely.",
    "Her mental note: it predicts words. It isn't looking anything up.",
    "Her habit forming: anything factual gets checked before she relies on it.",
    "Her new frame: a fast, eager intern. She stays the professional in charge.",
    "Her shortlist: newsletter drafts, leveled passages, rubrics, reformatting.",
    "Hers alone: knowing her kids, checking facts, caring.",
    "Her line, memorized: no student PII in a public AI tool. Ever.",
    "Her checklist: names, IDs, grades, IEPs, health, family details. All out.",
    "Her test before typing: could anyone who knows our school tell who this is?",
    "Her why: FERPA, plus a text box that makes oversharing effortless.",
    "Her rule of thumb: every tool is public until the district says otherwise.",
    "Her relief: the work she wants help with never needed identities anyway.", null, "Her swap: the reading level and format, never the diagnosis.",
    "Her 3 moves, automatic: strip identity, generalize, describe the need.",
    "Her eye: initials + context still identify. Rare details identify too.",
    "Her lab pick, one artifact all the way through: the family newsletter blurb.",
    "Her newsletter blurb, v1: option A typed, draft back. Beige, sounds like nobody.",
    "Her newsletter blurb, v3: two pushbacks later, hers. One invented detail caught.",
    "Her newsletter blurb's arc: beige v1, two pushbacks, usable. One error caught.",
    "Her rule for what leaves her desk: nothing AI-drafted goes out unread.",
    "Her guardrails: keep her own voice; drafts never become decisions.",
    "Her scope today: adult use only. Student use is Kit 5's hour.",
    "She nodded to all three. Her interim stance until policy exists.",
    "Her next 48 hours: one real task, one de-ID drill, one share.",
    "Her track: Kit 1 done, seven to go, certificate at the end.", null];
  let slideNo = 0;
  let chipOn = false;
  function base(dark = false) {
    const s = p.addSlide();
    slideNo++;
    chipOn = slideNo > 1 && !!RIVERA[slideNo - 1];
    s.background = { color: dark ? NAVY : WHITE };
    if (slideNo > 1) {
      // slim brand footer
      s.addImage({ data: dark ? markDarkPng : markPng, x: 0.45, y: H - 0.42, w: 0.26, h: 0.24 });
      s.addText([
        { text: 'AI-Ready', options: { color: TEAL, bold: true } },
        { text: ' School', options: { color: dark ? WHITE : NAVY, bold: true } },
      ], { x: 0.75, y: H - 0.47, w: 2.2, h: 0.32, fontFace: FONT, fontSize: 10, margin: 0, valign: 'middle' });
      s.addText(`Kit 1 · AI Foundations & Safety   |   ${slideNo}`, {
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
  // Lab exemplar: Ms. Rivera's newsletter blurb at its current stage, shown LARGE as primary content.
  function msgWindow(s, x, y, w, h, label) {
    s.addShape('roundRect', { x, y, w, h, rectRadius: 0.1, fill: { color: WHITE }, line: { color: 'DCE3EA', width: 1.5 } });
    s.addShape('roundRect', { x, y, w, h: 0.42, rectRadius: 0.1, fill: { color: NAVY }, line: { color: NAVY } });
    ['E8837A', AMBER, GOOD].forEach((c, i) => s.addShape('ellipse', { x: x + 0.22 + i * 0.27, y: y + 0.13, w: 0.16, h: 0.16, fill: { color: c }, line: { color: c } }));
    s.addText(label, { x: x + 1.15, y, w: w - 1.3, h: 0.42, fontFace: FONT, fontSize: 11, color: '9FB2C2', margin: 0, valign: 'middle' });
  }
  function statBlock(s, x, w, big, label, color = TEAL) {
    s.addText(big, { x, y: 2.0, w, h: 1.5, fontFace: FONT, fontSize: 64, bold: true, color, align: 'center', margin: 0 });
    s.addText(label, { x, y: 3.55, w, h: 1.7, fontFace: FONT, fontSize: 16, color: INK, align: 'center', valign: 'top', margin: 0 });
  }

  // ============================== SLIDE 1 · TITLE ==============================
  {
    const s = base(true);
    s.addImage({ data: markDarkPng, x: 0.85, y: 0.8, w: 1.15, h: 1.06 });
    s.addText([
      { text: 'AI-Ready', options: { color: TEAL, bold: true } },
      { text: ' School', options: { color: WHITE, bold: true } },
    ], { x: 2.15, y: 1.05, w: 4, h: 0.6, fontFace: FONT, fontSize: 26, margin: 0, valign: 'middle' });
    s.addText('TRACK A · AI FOUNDATIONS · KIT 1 OF 20', {
      x: 0.9, y: 3.0, w: 9, h: 0.4, fontFace: FONT, fontSize: 15, bold: true,
      color: AMBER, charSpacing: 3, margin: 0 });
    s.addText('AI Foundations & Safety:\nThe One Hard Rule', {
      x: 0.85, y: 3.35, w: 11.6, h: 2.0, fontFace: FONT, fontSize: 47, bold: true,
      color: WHITE, margin: 0, valign: 'middle', lineSpacingMultiple: 1.05 });
    s.addText('A 45–60 minute working session for the whole staff, with 15 minutes hands-on.', {
      x: 0.9, y: 5.45, w: 10.5, h: 0.5, fontFace: FONT, fontSize: 18, color: 'C9D4DE', margin: 0 });
    s.addText('Built by Adam & Katelyn Spinozzi · certified educators · 20+ combined years in the classroom', {
      x: 0.9, y: 6.6, w: 11.5, h: 0.4, fontFace: FONT, fontSize: 12, color: '9FB2C2', margin: 0 });
    s.addNotes('Have this slide up as people arrive. Start on time. Script: "Welcome, everyone…". The full word-for-word text is in the Facilitator Script, keyed to every slide number.');
  }

  // ============================== SLIDE 2 · WHAT TODAY IS ==============================
  {
    const s = base();
    kicker(s, 'Two promises');
    title(s, 'What today is (and isn’t)');
    card(s, 0.7, 1.65, 5.9, 4.6, PAPER);
    s.addText('This session is NOT', { x: 1.05, y: 1.95, w: 5.2, h: 0.45, fontFace: FONT, fontSize: 20, bold: true, color: BAD, margin: 0 });
    bullets(s, ['A sales pitch for AI', 'A scare session', 'A prediction that robots replace teachers'],
      { x: 1.05, y: 2.55, w: 5.3, h: 3.4, fontSize: 20 });
    card(s, 6.85, 1.65, 5.9, 4.6, 'EAF5F3');
    s.addText('It IS', { x: 7.2, y: 1.95, w: 5.2, h: 0.45, fontFace: FONT, fontSize: 20, bold: true, color: GOOD, margin: 0 });
    bullets(s, ['A clear picture of what these tools actually are',
      'The one rule that keeps you and your students safe',
      '15 minutes of actually using AI, hands-on'],
      { x: 7.2, y: 2.55, w: 5.3, h: 3.4, fontSize: 20 });
    s.addNotes('Two promises: not a sales pitch (skeptics are important here), not a scare session. Position: AI is a tool: it can take the robotic parts of the job, never the human parts. AI drafts, the teacher decides.');
  }

  // ============================== SLIDE 3 · WHY NOW ==============================
  {
    const s = base();
    kicker(s, 'Why now: three numbers');
    title(s, 'This moved faster than any school technology before it', { w: 8.7, fontSize: 26 });
    card(s, 0.7, 1.75, 3.85, 3.6, PAPER);
    s.addText([
      { text: '25%', options: { color: MUTED } },
      { text: ' → ', options: { color: TEAL } },
      { text: '53%', options: { color: NAVY } },
    ], { x: 0.7, y: 2.0, w: 3.85, h: 1.5, fontFace: FONT, fontSize: 44, bold: true, align: 'center', margin: 0, valign: 'middle' });
    s.addText('Teachers using AI for work,\n2023–24 vs. 2024–25 (RAND)', {
      x: 0.7, y: 3.55, w: 3.85, h: 1.7, fontFace: FONT, fontSize: 16, color: INK, align: 'center', valign: 'top', margin: 0 });
    card(s, 4.75, 1.75, 3.85, 3.6, PAPER);
    statBlock(s, 4.75, 3.85, '60%', 'of teachers used AI during\nthe 2024–25 school year\n(Gallup & Walton Family Fdn.)', TEAL);
    card(s, 8.8, 1.75, 3.85, 3.6, PAPER);
    statBlock(s, 8.8, 3.85, '54%', 'of U.S. teens already use AI\nfor schoolwork (Pew, 2026)', AMBER);
    s.addText('Whatever we decide in this room, AI is already in our building.', {
      x: 0.7, y: 5.75, w: W - 1.4, h: 0.6, fontFace: FONT, fontSize: 20, italic: true, color: MUTED, align: 'center', margin: 0 });
    s.addNotes('Optional show of hands first: who has used ChatGPT or similar at least once? Sources: RAND RR-A134-25 (25% in 2023-24), RAND RR-A4180-1 (53% of ELA/math/science teachers in 2024-25), Gallup-Walton 2025 (60%), Pew 2026 (54% of teens). All in the References file.');
  }

  // ============================== SLIDE 4 · AGENDA ==============================
  {
    const s = base();
    kicker(s, 'The hour ahead');
    title(s, 'Agenda, and one promise');
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
      const y = 1.55 + i * 0.68;
      s.addText(t, { x: 0.9, y, w: 1.1, h: 0.55, fontFace: FONT, fontSize: 20, bold: true, color: TEAL, margin: 0, valign: 'middle' });
      s.addText(txt, { x: 2.1, y, w: 7.6, h: 0.55, fontFace: FONT, fontSize: 20, color: INK, margin: 0, valign: 'middle' });
    });
    card(s, 10.0, 2.3, 2.75, 2.9, NAVY);
    s.addText('One promise', { x: 10.25, y: 2.55, w: 2.25, h: 0.4, fontFace: FONT, fontSize: 16, bold: true, color: AMBER, margin: 0 });
    s.addText('You will actually use an AI tool today, and leave with something for tomorrow morning.', {
      x: 10.25, y: 3.0, w: 2.25, h: 2.0, fontFace: FONT, fontSize: 14, color: WHITE, margin: 0, valign: 'top' });
    s.addNotes('Research point (Darling-Hammond et al., Learning Policy Institute 2017): PD changes practice when it includes active learning and sustained follow-up; hence the lab and the 30-day plan. "This isn’t a one-and-done."');
  }

  // ============================== SLIDE 5 · WHAT A CHATBOT DOES ==============================
  {
    const s = base();
    kicker(s, 'Demystifying the thing');
    title(s, 'What a chatbot actually does');
    card(s, 0.7, 1.7, 12.0, 2.2, PAPER);
    s.addText([
      { text: 'It predicts likely next words.', options: { bold: true, color: NAVY } },
      { text: '  Not a database. Not a search engine. A very sophisticated pattern-continuation machine, trained on enormous amounts of text.', options: { color: INK } },
    ], { x: 1.05, y: 1.95, w: 11.3, h: 1.7, fontFace: FONT, fontSize: 22, margin: 0, valign: 'middle' });
    bullets(s, [
      { text: 'Why the writing sounds so fluent: fluent is what it was trained to produce', options: {} },
      { text: 'Why it can be smoothly, confidently wrong: it continues patterns instead of checking facts', options: {} },
      { text: 'One fact that explains almost everything you’ll ever see AI do', options: { bold: true, color: NAVY } },
    ], { y: 4.25, h: 2.3 });
    s.addNotes('Keep this plain: typing into ChatGPT/Claude/Gemini/Copilot is not looking up facts. The tool predicts likely next words. That one fact explains both the brilliance and the failures.');
  }

  // ============================== SLIDE 6 · CONFIDENTLY WRONG ==============================
  {
    const s = base();
    kicker(s, 'Peer-reviewed evidence, not folklore');
    title(s, 'It can be confidently wrong');
    card(s, 0.7, 1.7, 5.7, 4.5, PAPER);
    s.addText('19.9%', { x: 0.7, y: 2.15, w: 5.7, h: 1.3, fontFace: FONT, fontSize: 66, bold: true, color: BAD, align: 'center', margin: 0 });
    s.addText('of citations produced by a leading AI model in a 2025 test were entirely fabricated. The papers did not exist', {
      x: 1.1, y: 3.55, w: 4.9, h: 2.3, fontFace: FONT, fontSize: 17, color: INK, align: 'center', margin: 0 });
    card(s, 6.65, 1.7, 5.7, 4.5, PAPER);
    s.addText('45.4%', { x: 6.65, y: 2.15, w: 5.7, h: 1.3, fontFace: FONT, fontSize: 66, bold: true, color: AMBER, align: 'center', margin: 0 });
    s.addText('of the real citations still contained errors, and every one of them looked perfect on the page', {
      x: 7.05, y: 3.55, w: 4.9, h: 2.3, fontFace: FONT, fontSize: 17, color: INK, align: 'center', margin: 0 });
    s.addText('The habit that follows: verify anything factual before you rely on it.', {
      x: 0.7, y: 6.35, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 19, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('Source: Linardon et al., JMIR Mental Health (2025), the GPT-4o literature-review test. This is called hallucination and it is a side effect of prediction, not a bug about to be fixed. If asked "why use it at all?": most classroom uses aren’t factual lookup; they’re drafting and reformatting, where you are the fact-checker by definition.');
  }

  // ============================== SLIDE 7 · EAGER INTERN ==============================
  {
    const s = base(true);
    kicker(s, 'The mental model for the whole series', { color: TEAL });
    s.addText('AI is an eager intern.', {
      x: 0.7, y: 1.7, w: 12.0, h: 1.1, fontFace: FONT, fontSize: 45, bold: true, color: WHITE, margin: 0 });
    bullets(s, [
      { text: 'Fast, tireless, surprisingly capable, desperate to please', options: { color: 'C9D4DE' } },
      { text: 'Will make things up rather than admit it doesn’t know', options: { color: 'C9D4DE' } },
      { text: 'Never meets your students unsupervised, never sends unread work home', options: { color: 'C9D4DE' } },
    ], { y: 3.0, h: 2.2, fontSize: 22 });
    s.addText('AI drafts. The teacher decides.', {
      x: 0.7, y: 5.5, w: 12.0, h: 0.9, fontFace: FONT, fontSize: 30, bold: true, color: TEAL, align: 'center', margin: 0 });
    s.addNotes('The intern only works because there is a professional in charge. That’s you. This five-word posture is the spine of the entire curriculum: AI drafts, the teacher decides.');
  }

  // ============================== SLIDE 8 · GOOD AT ==============================
  {
    const s = base();
    kicker(s, 'Where the intern earns its keep');
    title(s, 'What it’s genuinely good at');
    const items = [
      ['First drafts', 'Parent newsletters, routine emails, letters home'],
      ['Differentiation', 'One passage → three reading levels in a minute'],
      ['Assessment scaffolds', 'Your notes → rubrics, word banks, question sets'],
      ['Reformatting', 'Same content as a quiz, a table, station cards'],
    ];
    items.forEach(([h, b], i) => {
      const x = 0.7 + (i % 2) * 6.15, y = 1.6 + Math.floor(i / 2) * 1.95;
      card(s, x, y, 5.85, 1.75, PAPER);
      s.addText(h, { x: x + 0.3, y: y + 0.18, w: 5.25, h: 0.45, fontFace: FONT, fontSize: 20, bold: true, color: NAVY, margin: 0 });
      s.addText(b, { x: x + 0.3, y: y + 0.68, w: 5.25, h: 0.9, fontFace: FONT, fontSize: 16, color: INK, margin: 0 });
    });
    s.addText('Teachers who use AI weekly report saving ~5.9 hours a week: the paperwork part of the job, not the teaching part. (Gallup & Walton Family Foundation, 2025)', {
      x: 0.7, y: 5.65, w: 12.0, h: 0.8, fontFace: FONT, fontSize: 16, italic: true, color: MUTED, align: 'center', margin: 0 });
    s.addNotes('These four categories cover most of what staff will actually do this year. The time-savings stat is Gallup–Walton 2025: weekly users save about 5.9 hours/week, roughly six weeks a year.');
  }

  // ============================== SLIDE 9 · CAN'T DO ==============================
  {
    const s = base();
    kicker(s, 'On purpose, forever');
    title(s, 'What it can’t do, at any price');
    bullets(s, [
      { text: 'Know your students: that this class shuts down after lunch, that this kid needs a win today', options: {} },
      { text: 'Verify its own facts (that’s you)', options: {} },
      { text: 'Care: it produces text, not judgment, and not relationships', options: {} },
    ], { y: 1.6, h: 2.9 });
    card(s, 0.7, 4.6, 12.0, 1.7, 'EAF5F3');
    s.addText('Everything on this slide is your job on purpose. The tool buys back time FOR this list; it never takes this list away.', {
      x: 1.05, y: 4.8, w: 11.3, h: 1.3, fontFace: FONT, fontSize: 21, bold: true, color: NAVY, margin: 0, valign: 'middle' });
    s.addNotes('Say: nothing on this list is under threat, on purpose and forever. AI can\'t know your students, can\'t verify its own facts, and can\'t care. The tool buys back time FOR this list; it never takes this list away. This is the session\'s first explicit "human moment"; land it plainly and move on.');
  }

  // ============================== SLIDE 10 · THE ONE HARD RULE ==============================
  {
    const s = base(true);
    s.addText('THE ONE HARD RULE', {
      x: 0.7, y: 1.35, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 18, bold: true, color: AMBER, charSpacing: 4, align: 'center', margin: 0 });
    s.addText('Never put student personally identifiable information into a public AI tool.', {
      x: 1.0, y: 2.15, w: 11.3, h: 2.3, fontFace: FONT, fontSize: 40, bold: true, color: WHITE, align: 'center', margin: 0, valign: 'middle', lineSpacingMultiple: 1.1 });
    s.addText('Not a name. Not a detail that could identify a child. Ever.', {
      x: 1.0, y: 4.75, w: 11.3, h: 0.7, fontFace: FONT, fontSize: 24, bold: true, color: TEAL, align: 'center', margin: 0 });
    s.addText('Every other AI choice is a judgment call you’re qualified to make. This one isn’t a judgment call. It’s the line.', {
      x: 1.6, y: 5.75, w: 10.1, h: 0.8, fontFace: FONT, fontSize: 16, color: 'C9D4DE', align: 'center', margin: 0 });
    s.addNotes('Slow down. Read the rule off the screen, then pause a full three seconds. This is the most important slide of the session.');
  }

  // ============================== SLIDE 11 · WHAT COUNTS ==============================
  {
    const s = base();
    kicker(s, 'The rule, made concrete');
    title(s, 'What counts as student PII');
    card(s, 0.7, 1.6, 5.9, 4.6, PAPER);
    s.addText('From records', { x: 1.05, y: 1.85, w: 5.2, h: 0.45, fontFace: FONT, fontSize: 20, bold: true, color: NAVY, margin: 0 });
    bullets(s, ['Names, initials, photos', 'Student ID numbers', 'Grades & test scores tied to a student', 'IEP / 504 contents & accommodations'],
      { x: 1.05, y: 2.45, w: 5.3, h: 3.5, fontSize: 19 });
    card(s, 6.85, 1.6, 5.9, 4.6, PAPER);
    s.addText('About a child', { x: 7.2, y: 1.85, w: 5.2, h: 0.45, fontFace: FONT, fontSize: 20, bold: true, color: NAVY, margin: 0 });
    bullets(s, ['Discipline history', 'Health or diagnosis information', 'Family details, addresses', 'Anything about an identifiable student'],
      { x: 7.2, y: 2.45, w: 5.3, h: 3.5, fontSize: 19 });
    s.addNotes('The obvious things first, then widen it: anything from a record or about a specific child stays out of the chat box.');
  }

  // ============================== SLIDE 12 · SNEAKY ONES ==============================
  {
    const s = base();
    kicker(s, 'Where well-meaning people slip');
    title(s, 'The sneaky ones');
    const rows = [
      ['"J.M. in my 3rd period with the anxiety diagnosis"', 'Initials + context = identifiable'],
      ['"The only 7th grader who uses a wheelchair"', 'One-of-a-kind details identify without a name'],
      ['"The new student who just arrived from Ukraine"', 'Rare circumstance = identifiable in your school'],
    ];
    rows.forEach(([q, why], i) => {
      const y = 1.55 + i * 1.35;
      card(s, 0.7, y, 7.4, 1.15, PAPER);
      s.addText(q, { x: 1.0, y: y + 0.12, w: 6.9, h: 0.9, fontFace: FONT, fontSize: 17, italic: true, color: INK, margin: 0, valign: 'middle' });
      s.addText(why, { x: 8.35, y: y + 0.12, w: 4.3, h: 0.9, fontFace: FONT, fontSize: 15, color: BAD, margin: 0, valign: 'middle' });
    });
    card(s, 0.7, 5.75, 12.0, 1.0, NAVY);
    s.addText('The test: could anyone who knows our school figure out who this is?  If yes, it doesn’t go in.', {
      x: 1.05, y: 5.85, w: 11.3, h: 0.8, fontFace: FONT, fontSize: 19, bold: true, color: WHITE, margin: 0, valign: 'middle' });
    s.addNotes('If asked "even in a private chat that I delete?": yes. Deleting your view doesn’t recall what the company received. The rule works because it has no exceptions to remember at 9pm on a Sunday.');
  }

  // ============================== SLIDE 13 · WHY THE RULE EXISTS ==============================
  {
    const s = base();
    kicker(s, 'One legal reason, one practical reason');
    title(s, 'Why the rule exists');
    card(s, 0.7, 1.6, 5.9, 4.5, PAPER);
    s.addText('Legal', { x: 1.05, y: 1.85, w: 5.2, h: 0.45, fontFace: FONT, fontSize: 20, bold: true, color: NAVY, margin: 0 });
    s.addText('FERPA protects student education records, and schools answer for how record information is shared. A public AI tool is a third party with no agreement with our district. Where typed data goes depends on terms of service that change without asking us.', {
      x: 1.05, y: 2.4, w: 5.3, h: 3.4, fontFace: FONT, fontSize: 17, color: INK, margin: 0, valign: 'top' });
    card(s, 6.85, 1.6, 5.9, 4.5, PAPER);
    s.addText('Practical', { x: 7.2, y: 1.85, w: 5.2, h: 0.45, fontFace: FONT, fontSize: 20, bold: true, color: NAVY, margin: 0 });
    s.addText('An open chat box makes oversharing effortless; privacy researchers flag exactly this. And nobody in this room wants to be the example in the district’s cautionary email. One rule, followed always, means that’s never you.', {
      x: 7.2, y: 2.4, w: 5.3, h: 3.4, fontFace: FONT, fontSize: 17, color: INK, margin: 0, valign: 'top' });
    s.addText('Educators sharing safe practice, not legal advice. District-specific questions go to the district office.', {
      x: 0.7, y: 6.25, w: 12.0, h: 0.4, fontFace: FONT, fontSize: 13, italic: true, color: MUTED, align: 'center', margin: 0 });
    s.addNotes('Sources: FERPA (federal law); Future of Privacy Forum vetting guidance (2024) on open-chat-box oversharing. Keep the not-legal-advice line verbatim.');
  }

  // ============================== SLIDE 14 · PUBLIC VS APPROVED ==============================
  {
    const s = base();
    kicker(s, 'So the rule doesn’t overreach');
    title(s, '“Public tool” vs. district-approved tool');
    card(s, 0.7, 1.6, 5.9, 4.3, PAPER);
    s.addText('Public tool', { x: 1.05, y: 1.85, w: 5.2, h: 0.45, fontFace: FONT, fontSize: 20, bold: true, color: BAD, margin: 0 });
    s.addText('Anything you signed up for yourself: free ChatGPT, Claude, Gemini, personal accounts.\n\nThe One Hard Rule applies. Always.', {
      x: 1.05, y: 2.4, w: 5.3, h: 3.2, fontFace: FONT, fontSize: 18, color: INK, margin: 0, valign: 'top' });
    card(s, 6.85, 1.6, 5.9, 4.3, PAPER);
    s.addText('District-approved tool', { x: 7.2, y: 1.85, w: 5.2, h: 0.45, fontFace: FONT, fontSize: 20, bold: true, color: GOOD, margin: 0 });
    s.addText('Vetted by the district, with a signed student-data agreement.\n\nIf we adopt one, you’ll be told explicitly what changes. Until you’re told: every tool is a public tool.', {
      x: 7.2, y: 2.4, w: 5.3, h: 3.2, fontFace: FONT, fontSize: 18, color: INK, margin: 0, valign: 'top' });
    s.addNotes('This distinction keeps the rule accurate without weakening it. If your district has already approved a tool with a data agreement, name it here.');
  }

  // ============================== SLIDE 15 · GOOD NEWS ==============================
  {
    const s = base();
    kicker(s, 'And now the good news');
    title(s, 'The rule barely costs you anything');
    s.addText('Almost everything AI is useful for doesn’t need student identities at all.', {
      x: 0.7, y: 1.8, w: 12.0, h: 0.8, fontFace: FONT, fontSize: 24, color: INK, margin: 0 });
    card(s, 0.7, 2.9, 12.0, 2.4, 'EAF5F3');
    s.addText([
      { text: 'You need:  ', options: { bold: true, color: GOOD } },
      { text: '“a 4th grader reading below grade level”\n', options: { color: INK } },
      { text: 'You never need:  ', options: { bold: true, color: BAD } },
      { text: '“Marcus Chen”', options: { color: INK } },
    ], { x: 1.1, y: 3.2, w: 11.2, h: 1.8, fontFace: FONT, fontSize: 26, margin: 0, valign: 'middle', lineSpacingMultiple: 1.4 });
    s.addText('Which brings us to the ten-second skill that makes this automatic →', {
      x: 0.7, y: 5.7, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 19, italic: true, color: MUTED, margin: 0 });
    s.addNotes('Transition slide; keep it quick. The de-identification skill on the next slides is what makes the rule cost nothing in practice.');
  }

  // ============================== SLIDE 16 · SAFE SWAP 1 ==============================
  {
    const s = base();
    kicker(s, 'Same email, zero risk · on Ms. Rivera\'s screen');
    title(s, 'Safe swap #1: the parent email');
    s.addShape('roundRect', { x: 0.7, y: 1.55, w: 12.0, h: 4.8, rectRadius: 0.1, fill: { color: WHITE }, line: { color: 'DCE3EA', width: 1.5 } });
    s.addShape('roundRect', { x: 0.7, y: 1.55, w: 12.0, h: 0.42, rectRadius: 0.1, fill: { color: NAVY }, line: { color: NAVY } });
    ['E8837A', AMBER, GOOD].forEach((c, i) => s.addShape('ellipse', { x: 0.95 + i * 0.27, y: 1.68, w: 0.16, h: 0.16, fill: { color: c }, line: { color: c } }));
    s.addText('AI chat tool (any of them) · Ms. Rivera, our running example teacher (a composite, not a real person)', {
      x: 1.95, y: 1.55, w: 10.6, h: 0.42, fontFace: FONT, fontSize: 11, color: '9FB2C2', margin: 0, valign: 'middle' });
    s.addShape('roundRect', { x: 1.7, y: 2.2, w: 10.55, h: 1.6, rectRadius: 0.12, fill: { color: 'FBEFED' }, line: { color: 'FBEFED' } });
    s.addText('WHAT SHE ALMOST TYPED · UNSAFE', { x: 1.95, y: 2.32, w: 10, h: 0.3, fontFace: FONT, fontSize: 11.5, bold: true, color: BAD, charSpacing: 1.5, margin: 0 });
    s.addText('“Write an email to Jayden Miller’s mom about his three missing assignments and his outburst in class Tuesday.”', {
      x: 1.95, y: 2.64, w: 10.05, h: 1.1, fontFace: FONT, fontSize: 17, italic: true, color: INK, margin: 0 });
    s.addShape('roundRect', { x: 1.7, y: 4.0, w: 10.55, h: 2.1, rectRadius: 0.12, fill: { color: 'EAF5F3' }, line: { color: 'EAF5F3' } });
    s.addText('WHAT SHE SENT · SAFE', { x: 1.95, y: 4.12, w: 10, h: 0.3, fontFace: FONT, fontSize: 11.5, bold: true, color: GOOD, charSpacing: 1.5, margin: 0 });
    s.addText('“Write a warm, professional email to a parent about a middle schooler with several missing assignments and a recent difficult day in class. Firm but supportive; end by inviting a conversation.”', {
      x: 1.95, y: 4.44, w: 10.05, h: 1.55, fontFace: FONT, fontSize: 17, italic: true, color: INK, margin: 0 });
    s.addText('Same email out the other end. The AI needed the situation, never the child.', {
      x: 0.7, y: 6.45, w: 12.0, h: 0.4, fontFace: FONT, fontSize: 16, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('Say: this is Ms. Rivera, our running example teacher; she\'s a composite, and her screen shows what this looks like on your end. The unsafe version pastes a full student record (name, family, academics, behavior) into a stranger\'s text box. The safe version gets the same email; the AI needed the situation, never the child. She adds the name after it\'s back in her own email account.');
  }

  // ============================== SLIDE 17 · SAFE SWAP 2 ==============================
  {
    const s = base();
    kicker(s, 'Safer is also just a better prompt');
    title(s, 'Safe swap #2: differentiation');
    card(s, 0.7, 1.6, 12.0, 2.0, 'FBEFED');
    s.addText('UNSAFE', { x: 1.0, y: 1.78, w: 2, h: 0.35, fontFace: FONT, fontSize: 14, bold: true, color: BAD, margin: 0 });
    s.addText('“Rewrite this passage for Sofia R., who has a reading IEP with a 2nd-grade fluency goal.”', {
      x: 1.0, y: 2.15, w: 11.4, h: 1.2, fontFace: FONT, fontSize: 19, italic: true, color: INK, margin: 0 });
    card(s, 0.7, 3.85, 12.0, 2.15, 'EAF5F3');
    s.addText('SAFE', { x: 1.0, y: 4.03, w: 2, h: 0.35, fontFace: FONT, fontSize: 14, bold: true, color: GOOD, margin: 0 });
    s.addText('“Rewrite this passage at a 2nd-grade reading level, same key ideas, shorter sentences, and add a five-word picture-supported vocabulary list.”', {
      x: 1.0, y: 4.4, w: 11.4, h: 1.5, fontFace: FONT, fontSize: 19, italic: true, color: INK, margin: 0 });
    s.addText('The AI never needed the diagnosis; it needed the reading level and the format.', {
      x: 0.7, y: 6.25, w: 12.0, h: 0.45, fontFace: FONT, fontSize: 18, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('Notice the safe version is also the better prompt: more specific about what you actually want. Safer and more useful is the usual trade.');
  }

  // ============================== SLIDE 18 · 3 MOVES ==============================
  {
    const s = base();
    kicker(s, 'Ten seconds, then it’s automatic');
    title(s, 'De-identify like a pro: the 3 moves');
    const moves = [
      ['1', 'Strip identity', 'No names, no initials, no one-of-a-kind details'],
      ['2', 'Generalize', '“A 7th grader” · “several students” · “a parent”'],
      ['3', 'Describe the need, not the child', 'Reading level, behavior pattern, scaffold you want'],
    ];
    moves.forEach(([n, h, b], i) => {
      const x = 0.7 + i * 4.12;
      card(s, x, 1.7, 3.85, 3.9, PAPER);
      s.addShape('ellipse', { x: x + 1.42, y: 2.0, w: 1.0, h: 1.0, fill: { color: TEAL }, line: { color: TEAL } });
      s.addText(n, { x: x + 1.42, y: 2.0, w: 1.0, h: 1.0, fontFace: FONT, fontSize: 30, bold: true, color: WHITE, align: 'center', valign: 'middle', margin: 0 });
      s.addText(h, { x: x + 0.25, y: 3.25, w: 3.35, h: 0.95, fontFace: FONT, fontSize: 19, bold: true, color: NAVY, align: 'center', margin: 0, valign: 'top' });
      s.addText(b, { x: x + 0.25, y: 4.2, w: 3.35, h: 1.3, fontFace: FONT, fontSize: 15, color: INK, align: 'center', margin: 0, valign: 'top' });
    });
    s.addText('Every school prompt you ever write passes through these three moves.', {
      x: 0.7, y: 6.0, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 19, italic: true, color: MUTED, align: 'center', margin: 0 });
    s.addNotes('They just watched all three moves in the safe swaps. Ten seconds of habit; automatic within a week.');
  }

  // ============================== SLIDE 19 · YOU TRY ==============================
  {
    const s = base();
    kicker(s, 'Call it out: safe or unsafe?');
    title(s, 'You try: spot the problem');
    const prompts = [
      ['A', '“Write a note home about D.T.’s IEP accommodations for the field trip.”'],
      ['B', '“Create a behavior-reflection sheet for elementary students, friendly tone.”'],
      ['C', '“Help me write a welcome plan for the student who just moved here from Ukraine.”'],
      ['D', '“Summarize strategies for a class where a third of students read below grade level.”'],
    ];
    prompts.forEach(([ltr, txt], i) => {
      const y = 1.55 + i * 1.18;
      s.addShape('roundRect', { x: 0.7, y, w: 0.75, h: 0.95, rectRadius: 0.08, fill: { color: NAVY }, line: { color: NAVY } });
      s.addText(ltr, { x: 0.7, y, w: 0.75, h: 0.95, fontFace: FONT, fontSize: 26, bold: true, color: WHITE, align: 'center', valign: 'middle', margin: 0 });
      card(s, 1.6, y, 11.1, 0.95, PAPER);
      s.addText(txt, { x: 1.9, y: y + 0.06, w: 10.5, h: 0.85, fontFace: FONT, fontSize: 18, italic: true, color: INK, margin: 0, valign: 'middle' });
    });
    s.addText('Answers: A unsafe (initials + IEP details) · B safe · C unsafe (identifiable without a name) · D safe (aggregate, no identities)', {
      x: 0.7, y: 6.35, w: 12.0, h: 0.4, fontFace: FONT, fontSize: 13.5, italic: true, color: MUTED, align: 'center', margin: 0 });
    s.addNotes('Let the room call each one before you confirm with the answer line at the bottom. C is the splitter: no name, but "the student who just moved here from Ukraine" identifies a child; fix: "a student who recently arrived from another country and is learning English." Resolve debates with the slide-12 test. 3 minutes, brisk.');
  }

  // ============================== SLIDE 20 · LAB SETUP ==============================
  {
    const s = base(true);
    kicker(s, 'Hands-on · 15 minutes', { color: AMBER });
    s.addText('Lab time. Devices out.', {
      x: 0.7, y: 1.5, w: 12.0, h: 1.0, fontFace: FONT, fontSize: 44, bold: true, color: WHITE, margin: 0 });
    s.addText('Pair up · one screen per pair · open the tool we’re using today', {
      x: 0.7, y: 2.55, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 20, color: 'C9D4DE', margin: 0 });
    const rules = [
      ['1', 'No student information: we practice like we play'],
      ['2', 'Nothing has to be good; this is a sandbox'],
      ['3', 'When it gives you something mediocre, don’t settle'],
    ];
    rules.forEach(([n, r], i) => {
      const y = 3.4 + i * 0.95;
      s.addShape('ellipse', { x: 0.9, y, w: 0.62, h: 0.62, fill: { color: TEAL }, line: { color: TEAL } });
      s.addText(n, { x: 0.9, y, w: 0.62, h: 0.62, fontFace: FONT, fontSize: 20, bold: true, color: WHITE, align: 'center', valign: 'middle', margin: 0 });
      s.addText(r, { x: 1.75, y: y - 0.05, w: 10.8, h: 0.72, fontFace: FONT, fontSize: 21, color: WHITE, margin: 0, valign: 'middle' });
    });
    s.addNotes('Say: this is the moment the session exists for; everything so far was preparation for you actually typing. Nothing has to be good, it\'s a sandbox, and we practice like we play: zero student information. Ms. Rivera builds ONE artifact all the way through this lab on screen: her family newsletter blurb, option A, from typed prompt to reviewed result. Tell the room: if you ever feel lost, copy her structure. Announce the tool by name. Energy up; pairs formed inside two minutes.');
  }

  // ============================== SLIDE 21 · LAB TASK 1 ==============================
  {
    const s = base();
    kicker(s, 'Lab · task 1 of 2 · 6 minutes');
    title(s, 'Your first useful prompt: pick one', { w: 8.7 });
    const opts = [
      ['A', 'Families', '“Write a warm, professional newsletter blurb for families about [any upcoming school event], under 120 words.”'],
      ['B', 'Assessment', '“Create a five-question review quiz on [any topic you teach], mixed difficulty, with an answer key.”'],
      ['C', 'Differentiation', '“Rewrite this paragraph at three different reading levels.” Then paste any paragraph you already have.'],
      ['D', 'CTE & electives', '“Create a five-question tool safety check for the miter saw station, mixed question formats, with an answer key.” Swap in any station, lab, kitchen, or instrument.'],
    ];
    opts.forEach(([ltr, tag, txt], i) => {
      const y = 1.42 + i * 1.2;
      card(s, 0.7, y, 5.55, 1.12, PAPER);
      s.addShape('ellipse', { x: 0.92, y: y + 0.34, w: 0.44, h: 0.44, fill: { color: TEAL }, line: { color: TEAL } });
      s.addText(ltr, { x: 0.92, y: y + 0.34, w: 0.44, h: 0.44, fontFace: FONT, fontSize: 16, bold: true, color: WHITE, align: 'center', valign: 'middle', margin: 0 });
      s.addText(tag.toUpperCase(), { x: 1.52, y: y + 0.09, w: 4.6, h: 0.26, fontFace: FONT, fontSize: 9.5, bold: true, color: TEAL, charSpacing: 1.5, margin: 0 });
      s.addText(txt, { x: 1.52, y: y + 0.35, w: 4.62, h: 0.72, fontFace: FONT, fontSize: 12, color: INK, margin: 0, valign: 'top' });
    });
    msgWindow(s, 6.45, 1.42, 6.25, 4.72, 'Ms. Rivera’s newsletter blurb · task 1 · option A, typed');
    s.addText('SHE TYPES · OPTION A, FILLED IN', { x: 6.75, y: 1.98, w: 5.65, h: 0.28, fontFace: FONT, fontSize: 10, bold: true, color: TEAL, charSpacing: 1.5, margin: 0 });
    s.addText('“Write a warm, professional newsletter blurb for families about our fall book fair, under 120 words.”', {
      x: 6.75, y: 2.28, w: 5.65, h: 0.85, fontFace: FONT, fontSize: 14.5, italic: true, color: NAVY, margin: 0, valign: 'top', lineSpacingMultiple: 1.12 });
    s.addText('THE FIRST DRAFT COMES BACK', { x: 6.75, y: 3.3, w: 5.65, h: 0.28, fontFace: FONT, fontSize: 10, bold: true, color: MUTED, charSpacing: 1.5, margin: 0 });
    s.addText('“Dear families, we are thrilled to announce our upcoming Book Fair! This wonderful event promises something for every reader. The fair runs all week, 8:00 to 3:00. We sincerely appreciate your continued support!”', {
      x: 6.75, y: 3.6, w: 5.65, h: 1.55, fontFace: FONT, fontSize: 14, color: INK, margin: 0, valign: 'top', lineSpacingMultiple: 1.12 });
    s.addText('Beige, and it sounds like nobody. Keep yours on screen; task 2 works on this exact draft.', {
      x: 6.75, y: 5.4, w: 5.65, h: 0.6, fontFace: FONT, fontSize: 11.5, italic: true, color: MUTED, margin: 0, valign: 'top' });
    s.addText('Pick whichever is closest to your real job. Type it. Read what comes back.', {
      x: 0.7, y: 6.35, w: 12.0, h: 0.45, fontFace: FONT, fontSize: 16, italic: true, color: MUTED, align: 'center', margin: 0 });
    s.addNotes('Say: pick whichever prompt is closest to your real job, type it, and read what comes back. On screen, Ms. Rivera\'s window: option A filled in with her fall book fair, and the first draft back. It\'s beige, and one detail in it will matter in task 2; don\'t spoil it yet. Circulate. Stuck pairs → option A, it works for every role. Deputize power users to float. Option D comes from a real carpentry classroom; invite electives staff to swap in their station or lab.');
  }

  // ============================== SLIDE 22 · LAB TASK 2 ==============================
  {
    const s = base();
    kicker(s, 'Lab · task 2 of 2 · 6 minutes · how Ms. Rivera does it');
    title(s, 'Now push back: twice, minimum', { w: 8.7 });
    s.addText('Don’t accept the first draft. Tell it what’s wrong, like you would an intern:', {
      x: 0.7, y: 1.46, w: 5.55, h: 0.7, fontFace: FONT, fontSize: 15.5, color: INK, margin: 0, valign: 'top' });
    const cmds = ['“Warmer.”', '“Shorter.”', '“A 5th grader wouldn’t know three of these words. Fix that.”', '“Make question four harder and add a diagram question.”'];
    cmds.forEach((c, i) => {
      const y = 2.2 + i * 0.98;
      s.addShape('roundRect', { x: 0.7, y, w: 5.55, h: 0.84, rectRadius: 0.12, fill: { color: 'EAF5F3' }, line: { color: 'EAF5F3' } });
      s.addText(c, { x: 0.98, y: y + 0.05, w: 5.0, h: 0.74, fontFace: FONT, fontSize: 15, bold: true, color: NAVY, margin: 0, valign: 'middle' });
    });
    msgWindow(s, 6.45, 1.42, 6.25, 4.72, 'Ms. Rivera’s newsletter blurb · task 2 · two pushbacks later');
    s.addText('SHE TYPES, ONE AT A TIME', { x: 6.75, y: 1.96, w: 5.65, h: 0.28, fontFace: FONT, fontSize: 10, bold: true, color: TEAL, charSpacing: 1.5, margin: 0 });
    s.addText('“Warmer.”   then   “Shorter.”', { x: 6.75, y: 2.24, w: 5.65, h: 0.34, fontFace: FONT, fontSize: 15.5, bold: true, color: NAVY, margin: 0, valign: 'top' });
    s.addText('THE BLURB, TWO ROUNDS LATER', { x: 6.75, y: 2.7, w: 5.65, h: 0.28, fontFace: FONT, fontSize: 10, bold: true, color: MUTED, charSpacing: 1.5, margin: 0 });
    s.addText('“Families, our fall book fair is almost here! Stop by the library with your reader and help them pick a book they’ll actually love. Happy reading!”', {
      x: 6.75, y: 2.98, w: 5.65, h: 0.95, fontFace: FONT, fontSize: 14, color: INK, margin: 0, valign: 'top', lineSpacingMultiple: 1.12 });
    s.addText('ONE ERROR, CAUGHT ON THE READ-THROUGH', { x: 6.75, y: 4.02, w: 5.65, h: 0.28, fontFace: FONT, fontSize: 10, bold: true, color: BAD, charSpacing: 1.5, margin: 0 });
    s.addText('The draft claimed the fair “runs all week, 8:00 to 3:00.” She never typed a schedule; the intern invented one. She cut it and checked the real flyer.', {
      x: 6.75, y: 4.3, w: 5.65, h: 0.95, fontFace: FONT, fontSize: 12.5, color: INK, margin: 0, valign: 'top', lineSpacingMultiple: 1.1 });
    s.addText('Usable now, with nothing in it she didn’t verify. Copy her arc: draft, push back twice, read it before it goes anywhere.', {
      x: 6.75, y: 5.35, w: 5.65, h: 0.65, fontFace: FONT, fontSize: 11.5, italic: true, color: MUTED, margin: 0, valign: 'top' });
    s.addText('The first draft is the intern’s. The third one is yours.', {
      x: 0.7, y: 6.35, w: 12.0, h: 0.45, fontFace: FONT, fontSize: 19, italic: true, color: MUTED, align: 'center', margin: 0 });
    s.addNotes('Say: don\'t accept the first draft; tell it what\'s wrong, like you would an intern, short and blunt, the tool has no feelings. On screen, Ms. Rivera\'s same newsletter blurb after two pushbacks: it finally sounds like her, and her read-through caught the intern inventing "all week, 8:00 to 3:00"; she never typed a schedule. Push back at least twice on your own draft, the same way. 45-minute version: skip this task, go straight to the debrief. This is the move that separates people who get real value from people who quit in a week.');
  }

  // ============================== SLIDE 23 · DEBRIEF ==============================
  {
    const s = base();
    kicker(s, 'Debrief · 3–4 voices');
    title(s, 'What did you notice?');
    bullets(s, [
      'What surprised you?',
      'What was better than you expected, and what was worse?',
      { text: 'Did anyone catch it being wrong?', options: { bold: true, color: NAVY } },
    ], { y: 1.6, h: 2.4, fontSize: 23 });
    card(s, 0.7, 4.3, 12.0, 2.0, PAPER);
    s.addText([
      { text: 'Two patterns worth naming:  ', options: { bold: true, color: NAVY } },
      { text: 'the first draft is rarely the good draft; the value shows up when you push back. And everything you just made still needs your eyes: it’s fast, it’s fluent, and it’s unsigned until a professional signs it.', options: { color: INK } },
    ], { x: 1.05, y: 4.55, w: 11.3, h: 1.6, fontFace: FONT, fontSize: 19, margin: 0, valign: 'middle' });
    s.addNotes('If the room saw an AI mistake, spotlight it warmly; it’s the best possible outcome of the lab. If nobody caught one, point back at Ms. Rivera’s invented book-fair hours from task 2; the read-through is where errors surface. Take 3–4 voices, a minute each.');
  }

  // ============================== SLIDE 24 · HUMAN IN CHARGE ==============================
  {
    const s = base();
    kicker(s, 'The companion habit');
    title(s, 'The human stays in charge');
    card(s, 0.7, 1.7, 12.0, 1.9, NAVY);
    s.addText('Nothing AI-drafted reaches a student or a parent without a human reading it first.', {
      x: 1.1, y: 1.95, w: 11.2, h: 1.4, fontFace: FONT, fontSize: 25, bold: true, color: WHITE, margin: 0, valign: 'middle' });
    bullets(s, [
      'Not because it’s usually wrong, but because sometimes it is, and your name is on it',
      'Federal guidance says it in three words: keep humans in the loop (U.S. Dept. of Education, 2023)',
      { text: 'In this building: AI drafts, the teacher decides. Always.', options: { bold: true, color: NAVY } },
    ], { y: 3.95, h: 2.4, fontSize: 20 });
    s.addNotes('Rule one governed what goes INTO the tool; this governs what comes OUT. Source: U.S. Dept. of Education OET (2023), "humans in the loop."');
  }

  // ============================== SLIDE 25 · SHADOW SIDE ==============================
  {
    const s = base();
    kicker(s, 'Trust requires honesty');
    title(s, 'Honest limits: the risks are real');
    const risks = [
      ['Over-reliance', 'If the tool writes everything, your writing muscle atrophies; students’ too'],
      ['Sameness', 'AI output has a beige, everyone-sounds-alike quality; your voice is worth protecting'],
      ['Drift', 'It’s easy to slide from “AI drafts it” to “AI decides it” without noticing'],
    ];
    risks.forEach(([h, b], i) => {
      const x = 0.7 + i * 4.12;
      card(s, x, 1.7, 3.85, 3.4, PAPER);
      s.addText(h, { x: x + 0.28, y: 2.0, w: 3.3, h: 0.5, fontFace: FONT, fontSize: 21, bold: true, color: BAD, margin: 0 });
      s.addText(b, { x: x + 0.28, y: 2.6, w: 3.3, h: 2.3, fontFace: FONT, fontSize: 16, color: INK, margin: 0, valign: 'top' });
    });
    s.addText('The guardrails you learned today exist because these are genuine, not theoretical.', {
      x: 0.7, y: 5.5, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 19, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('Nobody selling AI leads with these. Naming them is what earns the room’s trust. If you chose to share the founders’ note, their view that over-reliance is the biggest risk lands well here.');
  }

  // ============================== SLIDE 26 · STUDENTS ==============================
  {
    const s = base();
    kicker(s, 'The question every faculty asks');
    title(s, 'What about students using it?');
    bullets(s, [
      'Major public chatbots require users to be 13+, and minors need parent/guardian permission under the terms of service',
      'So student use is a real policy question, not a free-for-all, and not banned by default',
      { text: 'It deserves its own session: that’s Kit 5, AI & Academic Integrity', options: { bold: true, color: NAVY } },
    ], { y: 1.6, h: 2.9 });
    card(s, 0.7, 4.7, 12.0, 1.5, 'EAF5F3');
    s.addText('Today’s scope is the adults: our use, our privacy practice, our judgment. Get that right and we’re ready to lead students well.', {
      x: 1.05, y: 4.9, w: 11.3, h: 1.1, fontFace: FONT, fontSize: 19, color: NAVY, bold: true, margin: 0, valign: 'middle' });
    s.addNotes('Age facts: OpenAI terms: 13+ minimum, under-18 parental permission. Park student-cheating debates here explicitly: "That’s Kit 5; today is about our use."');
  }

  // ============================== SLIDE 27 · COMMITMENTS ==============================
  {
    const s = base(true);
    kicker(s, 'Starting today', { color: AMBER });
    s.addText('Our three commitments', {
      x: 0.7, y: 0.85, w: 12.0, h: 0.8, fontFace: FONT, fontSize: 36, bold: true, color: WHITE, margin: 0 });
    const cs = [
      'No student personally identifiable information in public AI tools. Ever',
      'A human reviews everything AI-drafted before it reaches a student or family',
      'When we find something that works, we share it',
    ];
    cs.forEach((c, i) => {
      const y = 1.95 + i * 1.45;
      s.addShape('ellipse', { x: 0.95, y: y + 0.15, w: 0.85, h: 0.85, fill: { color: TEAL }, line: { color: TEAL } });
      s.addText(String(i + 1), { x: 0.95, y: y + 0.15, w: 0.85, h: 0.85, fontFace: FONT, fontSize: 28, bold: true, color: WHITE, align: 'center', valign: 'middle', margin: 0 });
      s.addText(c, { x: 2.1, y, w: 10.4, h: 1.15, fontFace: FONT, fontSize: 23, color: WHITE, margin: 0, valign: 'middle' });
    });
    s.addText('Can I get a nod on those three?', {
      x: 0.7, y: 6.35, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 20, italic: true, color: TEAL, margin: 0 });
    s.addNotes('Read all three, then ask for a visible nod or thumbs-up. It matters that this is agreed, not just heard. These commitments are the school’s interim stance until a formal policy exists (Kit 15).');
  }

  // ============================== SLIDE 28 · FIRST 48 ==============================
  {
    const s = base();
    kicker(s, 'Before Friday becomes a memory');
    title(s, 'Your first 48 hours: three small things');
    const acts = [
      ['~10 min', 'Do one real task with AI', 'Something already on your to-do list. Push back twice, review it, use it'],
      ['~5 min', 'Run the de-identification drill', 'One real prompt, written unsafe then safe, on paper; the rep that builds the habit'],
      ['~2 min', 'Share one discovery', 'One colleague, one specific thing: a win or a useful failure'],
    ];
    acts.forEach(([t, h, b], i) => {
      const y = 1.6 + i * 1.55;
      card(s, 0.7, y, 12.0, 1.35, PAPER);
      s.addText(t, { x: 1.0, y: y + 0.42, w: 1.5, h: 0.5, fontFace: FONT, fontSize: 17, bold: true, color: TEAL, margin: 0 });
      s.addText(h, { x: 2.6, y: y + 0.16, w: 9.9, h: 0.5, fontFace: FONT, fontSize: 20, bold: true, color: NAVY, margin: 0 });
      s.addText(b, { x: 2.6, y: y + 0.68, w: 9.9, h: 0.6, fontFace: FONT, fontSize: 16, color: INK, margin: 0 });
    });
    s.addText('PD you don’t use within two days mostly evaporates. The action sheet in your hands is the antidote.', {
      x: 0.7, y: 6.3, w: 12.0, h: 0.45, fontFace: FONT, fontSize: 16, italic: true, color: MUTED, align: 'center', margin: 0 });
    s.addNotes('Hold up the First 48 Hours sheet as you talk. Research basis for follow-through: Darling-Hammond et al. (2017): sustained duration and active use are what make PD stick.');
  }

  // ============================== SLIDE 29 · WHAT'S NEXT ==============================
  {
    const s = base();
    kicker(s, 'Kit 1 of 8 · Track A');
    title(s, 'Where this series goes');
    const kits = ['1 · AI Foundations & Safety  ✔', '2 · Prompting Basics', '3 · Planning & Differentiation', '4 · Assessment', '5 · Academic Integrity', '6 · Communication', '7 · Workload', '8 · Your School’s AI Culture'];
    kits.forEach((k, i) => {
      const x = 0.7 + (i % 4) * 3.1, y = 1.7 + Math.floor(i / 4) * 1.3;
      card(s, x, y, 2.9, 1.1, i === 0 ? 'EAF5F3' : PAPER);
      s.addText(k, { x: x + 0.2, y: y + 0.1, w: 2.5, h: 0.9, fontFace: FONT, fontSize: 14.5, bold: i === 0, color: NAVY, margin: 0, valign: 'middle' });
    });
    card(s, 0.7, 4.6, 12.0, 1.6, NAVY);
    s.addText([
      { text: 'Finish all eight → the AI-Ready Educator Certificate of Completion.', options: { bold: true, color: WHITE } },
      { text: '  Real documentation of real professional learning. Follow-ups run inside existing PLC time; nothing new to schedule.', options: { color: 'C9D4DE' } },
    ], { x: 1.05, y: 4.8, w: 11.3, h: 1.2, fontFace: FONT, fontSize: 18, margin: 0, valign: 'middle' });
    s.addNotes('Next up is Kit 2, Prompting Basics: consistently useful results instead of occasionally lucky ones. Certificate language is exactly "Certificate of Completion"; check with your district whether it qualifies for local credit.');
  }

  // ============================== SLIDE 30 · CLOSE ==============================
  {
    const s = base(true);
    s.addText('Two minutes: the exit ticket.', {
      x: 0.7, y: 1.15, w: 12.0, h: 0.7, fontFace: FONT, fontSize: 32, bold: true, color: WHITE, margin: 0 });
    s.addText('One thing you’re taking · one worry you still have · one thing you’ll try', {
      x: 0.7, y: 1.95, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 19, color: 'C9D4DE', margin: 0 });
    s.addText('AI can write a draft.\nIt cannot greet a kid at the door by name,\nnotice something’s off, and change that kid’s day.\nThat’s you.', {
      x: 0.7, y: 2.9, w: 12.0, h: 2.6, fontFace: FONT, fontSize: 28, bold: true, color: WHITE, align: 'center', margin: 0, lineSpacingMultiple: 1.25, valign: 'middle' });
    s.addText('Use the tool for the paperwork — keep the teaching.', {
      x: 0.7, y: 5.7, w: 12.0, h: 0.6, fontFace: FONT, fontSize: 24, bold: true, color: TEAL, align: 'center', margin: 0 });
    s.addText('Human teaching. Life-changing tools.', {
      x: 0.7, y: 6.5, w: 12.0, h: 0.4, fontFace: FONT, fontSize: 13, color: '9FB2C2', align: 'center', charSpacing: 2, margin: 0 });
    s.addNotes('Distribute exit tickets; collect at the door; they are the school’s PD documentation. Your worries steer what we do next. Thanks, everyone.');
  }

  const out = path.join(root, 'kits/kit01/Kit01_PresentationDeck.pptx');
  await p.writeFile({ fileName: out });
  console.log('wrote', out, '·', slideNo, 'slides');
})();
