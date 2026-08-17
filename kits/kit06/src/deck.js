#!/usr/bin/env node
/* Kit 6 Presentation Deck · AI for Communication: Parent Messages and Tone
   "The message before the message" · 32 slides, locked AI-Ready School brand,
   speaker notes on every slide.
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
  p.title = 'Kit 6: AI for Communication: Parent Messages and Tone';

  // Ms. Rivera's tracker chip, one line per slide. Index = slide number - 1.
  // null suppresses the chip: the title slide, the closing slide, and the two
  // slides where her full chat window IS the content (18, 19).
  // The facilitator script's .rivera-line under each cue mirrors this array.
  const RIVERA = [null,
    "Her audit: she picked Jalen. Last contact home was a phone call about a shove, nine days ago.",
    "Her asymmetry: four families, and the only voice they know from her is a problem.",
    "Her question about the study: does one sentence a week really do that?",
    "Her time math: 54 hours a week, and the positive note is the first thing cut.",
    "Her stance: the tool takes the volume. She writes the hard message.",
    "Her promise for the hour: four notes sent, one hard message written.",
    "Her test: swap the names. If nobody could tell, the note is not worth sending.",
    "Her source for details: her own week, not her memory of the whole year.",
    "Her hard-message rule: the fact first, one ask, nothing she cannot deliver.",
    "Her one job for the tool: read it back for tone. Never write the words.",
    "Her red line: no public AI translation of a family message. She cannot review what she cannot read.",
    "Her human-only list: safety, discipline, grief, special-education news. She calls.",
    "Her privacy rule, unchanged: the situation goes in the tool, never the child.",
    "Her lab artifact: Friday, 3:00, ten minutes, four families.",
    "Her Friday list: Maya, Devon, Priya, Jalen. Three unheard from since October conferences.",
    "Her Friday prompt: four short notes, and a blank line she fills herself.",
    null, null,
    "Her Friday details: four true sentences from this week, written by her.",
    "Her four sentences, on screen: the part the tool could not write.",
    "Her notes 1 and 2, as the Okonkwo and Pratt families opened them Friday.",
    "Her notes 3 and 4, as the Raman and Brooks families opened them Friday.",
    "Her hard message: Devon's missing work. She wrote every word of it herself.",
    "Her hard message on screen, and the tone read she ran on it after.",
    "Her ten minutes: four families heard from her when nothing was wrong.",
    "Her honest limit: the tool never met her students. The detail is hers.",
    "Her commitments: ten minutes on Friday, the hard message by hand, the red line.",
    "Her next kit: workload. The rest of the week gets audited.",
    "Her 48 hours: send the four, send the hard one, calendar next Friday.",
    "Her exit ticket: four initials, one detail she is proud of, one message dated.",
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
      s.addText(`Kit 6 · Communication   |   ${slideNo}`, {
        x: W - 4.6, y: H - 0.47, w: 4.15, h: 0.32, fontFace: FONT, fontSize: 9,
        color: dark ? '9FB2C2' : MUTED, align: 'right', margin: 0, valign: 'middle' });
      if (RIVERA[slideNo - 1]) {
        const rx = 9.55, ry = 0.12, rw = 3.2, rh = 0.98;
        s.addShape('roundRect', { x: rx, y: ry, w: rw, h: rh, rectRadius: 0.07, fill: { color: dark ? '1E3A50' : 'F7F5F0' }, line: { color: dark ? '2A4A63' : 'DCE3EA', width: 1 } });
        s.addShape('roundRect', { x: rx, y: ry, w: rw, h: 0.26, rectRadius: 0.07, fill: { color: '0D1E2E' }, line: { color: '0D1E2E' } });
        ['E8837A', 'F4A825', '2E7D5B'].forEach((c, i) => s.addShape('ellipse', { x: rx + 0.1 + i * 0.16, y: ry + 0.08, w: 0.1, h: 0.1, fill: { color: c }, line: { color: c } }));
        s.addText("MS. RIVERA'S SCREEN · SO FAR", { x: rx + 0.62, y: ry, w: rw - 0.7, h: 0.26, fontFace: FONT, fontSize: 8, bold: true, color: '9FB2C2', charSpacing: 1, margin: 0, valign: 'middle' });
        s.addText(RIVERA[slideNo - 1], { x: rx + 0.14, y: ry + 0.28, w: rw - 0.28, h: rh - 0.36, fontFace: FONT, fontSize: 9, color: dark ? 'C9D4DE' : INK, margin: 0, valign: 'middle' });
      }
    }
    return s;
  }
  // Chip-zone rule: Ms. Rivera's tracker chip owns x >= 9.55, so a titled slide
  // that carries a chip stops at 8.7 and long titles step down a size and
  // top-align so a wrapped second line cannot grow up into the kicker.
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
  // ONE window primitive for every screen in this deck (kit06's old msgWindow
  // reconciled with the approved kit03 chatWin/chatPaper/legend pattern).
  // msgWindow places the generic window anywhere at any size; chatWin is the
  // full-width variant carrying Ms. Rivera's standing label. Same navy title
  // bar, same three dots, same grey label, same geometry, one helper.
  function msgWindow(s, x, y, w, h, label) {
    s.addShape('roundRect', { x, y, w, h, rectRadius: 0.1, fill: { color: WHITE }, line: { color: 'DCE3EA', width: 1.5 } });
    s.addShape('roundRect', { x, y, w, h: 0.42, rectRadius: 0.1, fill: { color: NAVY }, line: { color: NAVY } });
    ['E8837A', AMBER, GOOD].forEach((c, i) => s.addShape('ellipse', { x: x + 0.25 + i * 0.27, y: y + 0.13, w: 0.16, h: 0.16, fill: { color: c }, line: { color: c } }));
    s.addText(label, { x: x + 1.25, y, w: w - 1.4, h: 0.42, fontFace: FONT, fontSize: 11, color: '9FB2C2', margin: 0, valign: 'middle' });
  }
  const RIVERA_LABEL = 'AI chat tool (any of them) · Ms. Rivera, our running example teacher (a composite, not a real person)';
  function chatWin(s, y, h, extra) {
    msgWindow(s, 0.7, y, 12.0, h, RIVERA_LABEL + (extra || ''));
  }
  // The paper card must always be WIDER than the text it holds, or the prompt
  // prints across its edge (owner audit, 2026-08-14). Text sits at x 1.95 and
  // runs 10.05 wide, ending at 12.0; the card runs to 12.25 so there is a real
  // 0.25 margin on each side. Do not narrow the card without moving the text.
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
  // A family-facing note, as it lands in an inbox. Deliberately NOT the chat
  // window: this surface is the teacher's own email, not the tool.
  function noteCard(s, x, y, w, h, header) {
    s.addShape('roundRect', { x, y, w, h, rectRadius: 0.1, fill: { color: PAPER }, line: { color: 'DCE3EA', width: 1 } });
    s.addShape('roundRect', { x, y, w: 0.11, h, rectRadius: 0.05, fill: { color: TEAL }, line: { color: TEAL } });
    s.addText(header, { x: x + 0.3, y: y + 0.12, w: w - 0.55, h: 0.28, fontFace: FONT, fontSize: 10, bold: true, color: MUTED, charSpacing: 1.1, margin: 0, valign: 'middle' });
  }
  const INVENTED = 'Every family and student name in this kit is invented. No real student appears anywhere.';

  // ============================== SLIDE 1 · TITLE ==============================
  {
    const s = base(true);
    s.addImage({ data: markDarkPng, x: 0.85, y: 0.8, w: 1.15, h: 1.06 });
    s.addText([
      { text: 'AI-Ready', options: { color: TEAL, bold: true } },
      { text: ' School', options: { color: WHITE, bold: true } },
    ], { x: 2.15, y: 1.05, w: 4, h: 0.6, fontFace: FONT, fontSize: 26, margin: 0, valign: 'middle' });
    s.addText('TRACK A · AI FOUNDATIONS · KIT 6 OF 20', {
      x: 0.9, y: 2.85, w: 9, h: 0.4, fontFace: FONT, fontSize: 15, bold: true,
      color: AMBER, charSpacing: 3, margin: 0 });
    s.addText('AI for Communication:\nThe message before the message', {
      x: 0.85, y: 3.2, w: 11.8, h: 2.0, fontFace: FONT, fontSize: 40, bold: true,
      color: WHITE, margin: 0, valign: 'middle', lineSpacingMultiple: 1.05 });
    s.addText('A 45–60 minute working session. You leave with four notes written to four real families, and one hard message drafted in your own words.', {
      x: 0.9, y: 5.4, w: 11.4, h: 0.5, fontFace: FONT, fontSize: 17, color: 'C9D4DE', margin: 0 });
    s.addText('Built by Adam & Katelyn Spinozzi · certified educators · 20+ combined years in the classroom', {
      x: 0.9, y: 6.6, w: 11.5, h: 0.4, fontFace: FONT, fontSize: 12, color: '9FB2C2', margin: 0 });
    s.addNotes('Slide up as people arrive. Start on time. Say: welcome back, and before I tell you anything about this hour I want sixty seconds of your time and I want it quiet. Do NOT preview the agenda here; the silent audit on slide 2 is the opening and a preview spoils it. This session assumes Kits 1 and 2 (the privacy rule and the four-part formula).');
  }

  // ============================== SLIDE 2 · THE LAST-CONTACT TEST ==============================
  {
    const s = base(true);
    kicker(s, 'Sixty seconds · silent · nobody presents', { color: AMBER });
    s.addText('The last-contact test', {
      x: 0.7, y: 1.30, w: 12.0, h: 0.85, fontFace: FONT, fontSize: 40, bold: true, color: WHITE, margin: 0 });
    const lines = [
      ['1', 'Pick one student. Not your favorite. Ideally one you find difficult.'],
      ['2', 'When did that family last hear from you when nothing was wrong?'],
      ['3', 'Not a grade in the portal. Not a mass email. You, about their kid, with no problem attached.'],
    ];
    lines.forEach(([n, t], i) => {
      const y = 2.45 + i * 1.05;
      s.addShape('ellipse', { x: 0.9, y: y + 0.04, w: 0.66, h: 0.66, fill: { color: TEAL }, line: { color: TEAL } });
      s.addText(n, { x: 0.9, y: y + 0.04, w: 0.66, h: 0.66, fontFace: FONT, fontSize: 21, bold: true, color: WHITE, align: 'center', valign: 'middle', margin: 0 });
      s.addText(t, { x: 1.8, y, w: 10.6, h: 0.78, fontFace: FONT, fontSize: 21, color: 'E6ECF2', margin: 0, valign: 'middle' });
    });
    s.addText('Do not write it down. Do not say it out loud. Just find the date.', {
      x: 0.7, y: 5.95, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 22, bold: true, color: TEAL, margin: 0 });
    s.addNotes('Say: pick one student, ideally one you find difficult, and find the date that family last heard from you when nothing was wrong. THEN STOP TALKING. Sixty seconds on your watch. Do not fill the silence, do not pace, do not add a joke; from the front of the room this feels like four minutes and the silence is the whole opening. When it ends, do not ask anyone to share. Go straight to slide 3. The room has now done something before you taught anything, which is the point.');
  }

  // ============================== SLIDE 3 · THE ASYMMETRY ==============================
  {
    const s = base();
    kicker(s, 'What the silence is actually about');
    title(s, 'The asymmetry');
    card(s, 0.7, 1.65, 5.85, 3.35, 'FBEFED');
    s.addText('What this family HAS heard from you', { x: 1.0, y: 1.85, w: 5.25, h: 0.4, fontFace: FONT, fontSize: 16, bold: true, color: BAD, margin: 0 });
    s.addText([
      { text: 'The missing-assignment email\n', options: { color: INK } },
      { text: 'The behavior call\n', options: { color: INK } },
      { text: 'The progress alert\n', options: { color: INK } },
      { text: 'Conferences, in October\n\n', options: { color: INK } },
      { text: 'Every one of them necessary. Every one of them accurate.', options: { italic: true, color: MUTED } },
    ], { x: 1.0, y: 2.35, w: 5.25, h: 2.5, fontFace: FONT, fontSize: 17, margin: 0, valign: 'top', lineSpacingMultiple: 1.15 });
    card(s, 6.85, 1.65, 5.85, 3.35, PAPER);
    s.addText('What they have heard when nothing was wrong', { x: 7.15, y: 1.85, w: 5.25, h: 0.4, fontFace: FONT, fontSize: 16, bold: true, color: NAVY, margin: 0 });
    s.addShape('rect', { x: 7.35, y: 3.25, w: 4.85, h: 0.02, fill: { color: 'C6CFD8' }, line: { color: 'C6CFD8' } });
    s.addText('This is the side the last-contact test just found.', { x: 7.15, y: 3.55, w: 5.25, h: 1.1, fontFace: FONT, fontSize: 17, italic: true, color: MUTED, margin: 0, valign: 'top' });
    card(s, 0.7, 5.2, 12.0, 1.15, NAVY);
    s.addText('If the only contact a family gets is bad news, every message from school arrives as an accusation, and the hard conversation starts from a deficit you created without meaning to.', {
      x: 1.05, y: 5.2, w: 11.3, h: 1.15, fontFace: FONT, fontSize: 17.5, bold: true, color: WHITE, margin: 0, valign: 'middle' });
    s.addNotes('Say: I am not going to ask what you found. Most rooms find one of three things: conferences, a long time ago, or never, and nobody in here is a bad teacher, which is exactly why we did it silently. Then walk the two cards. Land the navy line word for word and do not soften it. One beat, then move. Do not turn this into a discussion; the evidence slide is next and it is what earns the room.');
  }

  // ============================== SLIDE 4 · KRAFT & ROGERS + SCOPE ==============================
  {
    const s = base();
    kicker(s, 'The evidence that this is not soft');
    title(s, 'One sentence a week, and what it did');
    card(s, 0.7, 1.75, 5.85, 3.55, 'EAF5F3');
    s.addText('15.8%  →  9.3%', { x: 0.7, y: 2.0, w: 5.85, h: 0.95, fontFace: FONT, fontSize: 38, bold: true, color: GOOD, align: 'center', margin: 0 });
    s.addText('share of students failing to earn the course credit, after weekly individualized teacher-to-parent messages. A 41% reduction.\n(Kraft & Rogers, 2015)', {
      x: 1.0, y: 3.05, w: 5.25, h: 2.05, fontFace: FONT, fontSize: 16, color: INK, align: 'center', margin: 0, lineSpacingMultiple: 1.15 });
    card(s, 6.85, 1.75, 5.85, 3.55, PAPER);
    s.addShape('roundRect', { x: 6.85, y: 1.75, w: 0.11, h: 3.55, rectRadius: 0.05, fill: { color: AMBER }, line: { color: AMBER } });
    s.addText('SAY THE SCOPE EVERY TIME', { x: 7.2, y: 1.95, w: 5.25, h: 0.32, fontFace: FONT, fontSize: 12, bold: true, color: 'B07914', charSpacing: 1.4, margin: 0, valign: 'middle' });
    s.addText([
      { text: 'The setting: ', options: { bold: true, color: NAVY } },
      { text: 'a summer credit-recovery program. These students were retaking a course they had already failed.\n\n', options: { color: INK } },
      { text: 'The design: ', options: { bold: true, color: NAVY } },
      { text: 'the study tested a bundle. Individualized content, weekly frequency, and improvement framing all moved together, so no single ingredient is proven to be the active one.', options: { color: INK } },
    ], { x: 7.2, y: 2.4, w: 5.2, h: 2.75, fontFace: FONT, fontSize: 15, margin: 0, valign: 'top', lineSpacingMultiple: 1.14 });
    s.addText('Worth doing. Not proof that personalization is the mechanism.', {
      x: 0.7, y: 5.55, w: 12.0, h: 0.55, fontFace: FONT, fontSize: 19, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('Say: Kraft and Rogers, 2015, a field experiment. Weekly short individualized messages home, and failure to earn the course credit fell from 15.8 to 9.3 percent, a 41 percent reduction. Then say the scope out loud, and say it every single time this number leaves your mouth, including in the hallway afterward: a summer credit-recovery program, students retaking a course they had already failed, and a bundle was tested, so we do not get to say personalization is the mechanism. If you say the number without the scope, someone in your building will repeat it to a board member without the scope. 45-min cut: read both cards, drop your own commentary.');
  }

  // ============================== SLIDE 5 · WHY IT DOESN'T HAPPEN ==============================
  {
    const s = base();
    kicker(s, 'Why it does not happen');
    title(s, 'A capacity problem, not a caring problem');
    card(s, 0.7, 1.85, 5.85, 3.3, PAPER);
    s.addText('54', { x: 0.7, y: 2.05, w: 5.85, h: 1.05, fontFace: FONT, fontSize: 54, bold: true, color: TEAL, align: 'center', margin: 0 });
    s.addText('hours in the typical teacher\'s week, about 25 of them actual teaching time. Communicating with families is one of eleven categories competing for the other 29.\n(Merrimack College & EdWeek Research Center, 2022)', {
      x: 1.0, y: 3.15, w: 5.25, h: 1.9, fontFace: FONT, fontSize: 14.5, color: INK, align: 'center', margin: 0, lineSpacingMultiple: 1.14 });
    card(s, 6.85, 1.85, 5.85, 3.3, PAPER);
    s.addText('5.9', { x: 6.85, y: 2.05, w: 5.85, h: 1.05, fontFace: FONT, fontSize: 54, bold: true, color: TEAL, align: 'center', margin: 0 });
    s.addText('hours a week that teachers who use AI weekly reported saving. That figure is self-estimated by survey respondents, not measured.\n(Gallup & Walton Family Foundation, 2025)', {
      x: 7.15, y: 3.15, w: 5.25, h: 1.9, fontFace: FONT, fontSize: 14.5, color: INK, align: 'center', margin: 0, lineSpacingMultiple: 1.14 });
    card(s, 0.7, 5.4, 12.0, 1.0, 'EAF5F3');
    s.addText('When the week gets tight, the note with no deadline is the first thing cut. Capacity is the one thing a tool can actually touch.', {
      x: 1.05, y: 5.4, w: 11.3, h: 1.0, fontFace: FONT, fontSize: 18, bold: true, color: NAVY, align: 'center', margin: 0, valign: 'middle' });
    s.addNotes('Say: Merrimack and the EdWeek Research Center asked teachers to account for their week. About 54 hours, about 25 of it actual teaching. Communicating with families is one of eleven categories fighting for what is left. And you already know what happens when the week gets tight: the routine positive note has no deadline and nobody notices it missing, so it goes first. Match the verb to the evidence on the Gallup number: teachers REPORTED saving an ESTIMATED 5.9 hours a week. Never say "saves." Land the diagnosis: capacity, not caring.');
  }

  // ============================== SLIDE 6 · THE THESIS ==============================
  {
    const s = base(true);
    kicker(s, 'The stance for today', { color: TEAL });
    s.addText('AI handles the volume.\nYou write the hard message.', {
      x: 0.7, y: 1.30, w: 12.0, h: 1.9, fontFace: FONT, fontSize: 38, bold: true, color: WHITE, margin: 0, lineSpacingMultiple: 1.12 });
    s.addText('Most tools sold to teachers this year offer to write the difficult parent email for you. We are deliberately not doing that. We automate the ordinary contact, at a volume nobody sustains by hand, and we protect the difficult conversation on purpose.', {
      x: 0.7, y: 3.5, w: 11.7, h: 1.6, fontFace: FONT, fontSize: 20, color: 'C9D4DE', margin: 0, valign: 'top', lineSpacingMultiple: 1.2 });
    s.addText('The tool takes the volume. The judgment, the specifics, and the hard conversation stay with the professional.\nAI drafts, the teacher decides.', {
      x: 0.7, y: 5.3, w: 12.0, h: 1.1, fontFace: FONT, fontSize: 19, bold: true, color: TEAL, margin: 0, lineSpacingMultiple: 1.2 });
    s.addNotes('Say: here is the whole session in two sentences and they are on the screen. AI handles the ordinary positive contact at a volume nobody sustains by hand. You still write the hard message. Be honest about how unusual that is: the rest of the market automates the difficult conversation, and we are doing the opposite on purpose. By the end of the hour they will know exactly why. Say the five-word posture with the room if the culture is there.');
  }

  // ============================== SLIDE 7 · AGENDA + PROMISE ==============================
  {
    const s = base();
    kicker(s, 'The rest of the hour');
    title(s, 'Where we go, and one promise');
    const rows = [
      ['0:14', 'Generic versus specific: the one true detail'],
      ['0:20', 'The hard message, and who writes it'],
      ['0:25', 'The red lines: translation, human-only, privacy'],
      ['0:30', 'Lab: your Friday ten minutes'],
      ['0:50', 'Commitments and the first 48 hours'],
    ];
    rows.forEach(([t, txt], i) => {
      const y = 1.75 + i * 0.8;
      s.addText(t, { x: 0.9, y, w: 1.1, h: 0.6, fontFace: FONT, fontSize: 20, bold: true, color: TEAL, margin: 0, valign: 'middle' });
      s.addText(txt, { x: 2.1, y, w: 7.4, h: 0.6, fontFace: FONT, fontSize: 19, color: INK, margin: 0, valign: 'middle' });
    });
    card(s, 9.9, 2.2, 2.85, 3.3, NAVY);
    s.addText('One promise', { x: 10.15, y: 2.45, w: 2.35, h: 0.4, fontFace: FONT, fontSize: 16, bold: true, color: AMBER, margin: 0 });
    s.addText('You leave with four notes written to four real families, each carrying one true thing you noticed this week, and one hard message drafted in your own words.', {
      x: 10.15, y: 2.9, w: 2.35, h: 2.4, fontFace: FONT, fontSize: 13.5, color: WHITE, margin: 0, valign: 'top' });
    s.addNotes('Say: twelve minutes on the two kinds of message, three on the lines that never move, then twenty minutes of lab where you do it. Read the promise card out loud: not that you will learn about family communication, but that you leave with four and one. Keep this slide under a minute; the room already did the audit and wants the payoff.');
  }

  // ============================== SLIDE 8 · GENERIC VS SPECIFIC ==============================
  {
    const s = base();
    kicker(s, 'The whole point, in two sentences');
    title(s, 'Swap the name. Does it still work?');
    card(s, 0.7, 1.7, 12.0, 1.85, 'FBEFED');
    s.addText('GENERIC', { x: 1.05, y: 1.85, w: 3, h: 0.35, fontFace: FONT, fontSize: 13, bold: true, color: BAD, charSpacing: 1.4, margin: 0 });
    s.addText('“Maya is doing well and it’s a pleasure to have her in class.”', {
      x: 1.05, y: 2.2, w: 11.3, h: 0.55, fontFace: FONT, fontSize: 22, italic: true, color: INK, margin: 0, valign: 'middle' });
    s.addText('Works with any child’s name in it. A family reads it and knows they got the form.', {
      x: 1.05, y: 2.82, w: 11.3, h: 0.5, fontFace: FONT, fontSize: 15, color: MUTED, margin: 0, valign: 'middle' });
    card(s, 0.7, 3.7, 12.0, 2.05, 'EAF5F3');
    s.addText('SPECIFIC', { x: 1.05, y: 3.85, w: 3, h: 0.35, fontFace: FONT, fontSize: 13, bold: true, color: GOOD, charSpacing: 1.4, margin: 0 });
    s.addText('“Maya found the mistake in my worked example on Tuesday and said so in front of everyone.”', {
      x: 1.05, y: 4.2, w: 11.3, h: 0.75, fontFace: FONT, fontSize: 22, italic: true, color: INK, margin: 0, valign: 'middle' });
    s.addText('Could only be about Maya. Proves something no adjective can prove: somebody was looking at her kid on Tuesday.', {
      x: 1.05, y: 5.0, w: 11.3, h: 0.55, fontFace: FONT, fontSize: 15, color: MUTED, margin: 0, valign: 'middle' });
    s.addText('A tool can write the first one all day. It cannot write the second one, because it was not in the room on Tuesday.', {
      x: 0.7, y: 5.95, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 19, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('Say: read them both, then give the test they keep. Swap the name; if the note still works with a different child in it, it is not a note yet. Then the division of labor, which is the spine of the whole hour: the tool builds the shape, you supply the sentence that could not have come from anywhere else. Do not sneer at the generic sentence; it is warm and correct and it is what most of us send when we are tired. That is the honest version.');
  }

  // ============================== SLIDE 9 · WHERE THE DETAIL COMES FROM ==============================
  {
    const s = base();
    kicker(s, 'Lab step 3 is this slide, live');
    title(s, 'Look at this week. Not the whole year.');
    bullets(s, [
      'Four days, not nine months. Memory of a whole year is a blur.',
      'A moment, a sentence, a choice. Not an achievement.',
      'It does not have to be academic.',
      'True, dated, and specific enough that a family can picture it.',
    ], { x: 0.7, y: 1.8, w: 5.9, h: 3.9, fontSize: 17 });
    card(s, 6.85, 1.75, 5.85, 4.05, 'EAF5F3');
    s.addText('FOUR THAT QUALIFY', { x: 7.15, y: 1.95, w: 5.25, h: 0.32, fontFace: FONT, fontSize: 12.5, bold: true, color: TEAL, charSpacing: 1.5, margin: 0, valign: 'middle' });
    s.addText([
      { text: 'Redid the graph she was not happy with. Nobody asked her to.\n\n', options: { color: INK } },
      { text: 'Read his paragraph out loud. First time all year.\n\n', options: { color: INK } },
      { text: 'Set up the lab station before anyone asked.\n\n', options: { color: INK } },
      { text: 'Found the mistake in my worked example and said so.', options: { color: INK } },
    ], { x: 7.15, y: 2.4, w: 5.25, h: 3.2, fontFace: FONT, fontSize: 16, margin: 0, valign: 'top', lineSpacingMultiple: 1.15 });
    s.addText('If you genuinely have nothing for a child this week, that is information too. It is usually about who you are watching.',
      { x: 0.7, y: 5.95, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 17.5, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('Say: the honest objection is "I do not have a specific detail for every kid," and it is usually wrong in one way: people search their memory of the whole year, which is a blur. Look at this week. Four days. Read the four examples on the right and point out that none of them are awards and two of them are not academic. What they share is that they are true, dated, and picturable. Then land the last line gently, without shaming anyone. 45-min cut: fold this into slide 8 and keep the four examples.');
  }

  // ============================== SLIDE 10 · THE HARD MESSAGE ==============================
  {
    const s = base();
    kicker(s, 'The other half of the job');
    title(s, 'The hard message, which you write');
    const rules = [
      ['1 · Lead with the fact', '“Devon has not turned in three of the last four assignments” opens a conversation. “I’m concerned about his effort” opens an argument, because effort is an opinion.'],
      ['2 · Make one ask', 'One thing you want this family to do, stated plainly, with a date. Not four things.'],
      ['3 · No promises you cannot keep', 'If you do not know whether he can catch up, say you do not know. A promise you break here costs more than the message.'],
      ['4 · Know when to stop typing', 'Third paragraph, explaining your own feelings, or written angry: that is a phone call. Angry drafts wait until morning unless safety cannot.'],
    ];
    rules.forEach(([h, b], i) => {
      const x = 0.7 + (i % 2) * 6.15, y = 1.7 + Math.floor(i / 2) * 2.2;
      card(s, x, y, 5.85, 2.0, PAPER);
      s.addText(h, { x: x + 0.3, y: y + 0.18, w: 5.25, h: 0.45, fontFace: FONT, fontSize: 18, bold: true, color: TEAL, margin: 0 });
      s.addText(b, { x: x + 0.3, y: y + 0.7, w: 5.25, h: 1.15, fontFace: FONT, fontSize: 13.5, color: INK, margin: 0, valign: 'top', lineSpacingMultiple: 1.12 });
    });
    s.addText('You write this one. A message that carries consequences has to be defensible by the person who sent it.', {
      x: 0.7, y: 6.15, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 18, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('Say: the other half of the job is the missing work, the behavior, the grade about to become a problem, and you write this one. Not because a tool could not produce something that reads well, but because a message carrying consequences has to be defensible by the person who sent it, and because your relationship with that family is what does the work, not the prose. Walk all four rules. Rule 1 is the one people remember: fact versus feeling. Rule 4 is the one that saves a relationship at eleven at night.');
  }

  // ============================== SLIDE 11 · THE SECOND READ ==============================
  {
    const s = base();
    kicker(s, 'AI’s one job on a hard message · never the words');
    title(s, 'A second read for tone');
    s.addText([
      { text: 'BEFORE   ', options: { bold: true, color: BAD } },
      { text: '“Rewrite this email to a parent so it sounds better.”', options: { italic: true, color: MUTED } },
    ], { x: 0.7, y: 1.42, w: 12.0, h: 0.4, fontFace: FONT, fontSize: 16, margin: 0, valign: 'middle' });
    chatWin(s, 1.95, 3.85);
    chatPaper(s, 1.95, 3.85);
    s.addText([
      { text: '“You are a careful editor who has never met my students. ', options: { color: TEAL, bold: true } },
      { text: 'Read the message below and tell me only how its tone will land. Do not rewrite it. ', options: { color: NAVY, bold: true } },
      { text: 'It goes to one family about missing work. The facts and the request are already correct and I am not changing them. No names are in it. ', options: { color: 'B07914', bold: true } },
      { text: 'List any sentence that reads as blame, sarcasm, or a promise I did not mean to make. Quote the sentence, name the problem in one phrase, and stop. No replacement wording.”', options: { color: GOOD, bold: true } },
    ], { x: 1.95, y: 2.75, w: 10.05, h: 2.7, fontFace: FONT, fontSize: 16, margin: 0, valign: 'top', lineSpacingMultiple: 1.1 });
    legend(s, 6.05, PART_CHIPS);
    s.addNotes('Say: there is exactly one thing I will let the tool do on a hard message, and this is it. The same four parts from Kit 2: role in teal, task in navy, context in amber, format in green. Point at the last clause, "no replacement wording," because it is doing the real work. You are not asking for a rewrite; you are asking for a mirror at nine at night when you have read your own sentence eleven times and cannot hear it any more. If they take one line home, take this: the tool reads it back, you write it. And note the names are stripped before anything is pasted.');
  }

  // ============================== SLIDE 12 · THE RED LINE ==============================
  {
    const s = base();
    kicker(s, 'The line that does not move');
    title(s, 'Our rule, and the law, kept apart');
    card(s, 0.7, 1.75, 5.85, 3.6, PAPER);
    s.addShape('roundRect', { x: 0.7, y: 1.75, w: 0.11, h: 3.6, rectRadius: 0.05, fill: { color: AMBER }, line: { color: AMBER } });
    s.addText('OUR CLASSROOM RULE, AND IT IS OURS', { x: 1.05, y: 1.95, w: 5.25, h: 0.32, fontFace: FONT, fontSize: 12, bold: true, color: 'B07914', charSpacing: 1.3, margin: 0, valign: 'middle' });
    s.addText([
      { text: 'No public AI translation of family messages.\n', options: { bold: true, color: NAVY, fontSize: 18 } },
      { text: 'You cannot review what you cannot read.\n\n', options: { color: NAVY, fontSize: 17, italic: true } },
      { text: 'Official and legal documents travel your district’s translation channels. That is the district’s obligation and the district’s resource.', options: { color: INK, fontSize: 15 } },
    ], { x: 1.05, y: 2.4, w: 5.2, h: 2.75, fontFace: FONT, margin: 0, valign: 'top', lineSpacingMultiple: 1.15 });
    card(s, 6.85, 1.75, 5.85, 3.6, 'EAF5F3');
    s.addText('WHAT THE LAW ACTUALLY SAYS', { x: 7.15, y: 1.95, w: 5.25, h: 0.32, fontFace: FONT, fontSize: 12, bold: true, color: TEAL, charSpacing: 1.3, margin: 0, valign: 'middle' });
    s.addText([
      { text: 'The 2015 ED/DOJ Dear Colleague Letter requires schools to communicate meaningfully with limited-English-proficient parents, and says machine translation of essential information needs qualified human review.\n\n', options: { color: INK } },
      { text: 'It does not itself forbid a teacher from using AI translation.', options: { bold: true, color: NAVY } },
    ], { x: 7.15, y: 2.4, w: 5.25, h: 2.75, fontFace: FONT, fontSize: 15, margin: 0, valign: 'top', lineSpacingMultiple: 1.15 });
    s.addText('We chose the stricter rule. Say it as ours, not as the law.', {
      x: 0.7, y: 5.6, w: 12.0, h: 0.55, fontFace: FONT, fontSize: 20, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('Say: two things on this slide and they are not the same thing, so keep them apart on purpose. First OUR rule: teachers do not run family messages through a public AI translator, because you cannot review what you cannot read, and every habit in this kit depends on you checking the draft. Official documents travel the district channels, which is the district obligation. Second the LAW, which is separate: the 2015 Dear Colleague Letter requires meaningful communication and qualified review of machine translation for essential information, and it does NOT itself forbid teacher use. Our rule is stricter because we chose it. Never cut this slide, and never present our rule as a legal requirement.');
  }

  // ============================== SLIDE 13 · HUMAN-ONLY LIST ==============================
  {
    const s = base(true);
    kicker(s, 'Four things get a voice, not a message', { color: AMBER });
    s.addText('You call.', {
      x: 0.7, y: 1.30, w: 12.0, h: 0.9, fontFace: FONT, fontSize: 40, bold: true, color: WHITE, margin: 0 });
    const items = ['Safety', 'Serious discipline', 'A family’s grief', 'Special-education news'];
    items.forEach((t, i) => {
      const x = 0.7 + i * 3.08;
      s.addShape('roundRect', { x, y: 2.6, w: 2.85, h: 1.8, rectRadius: 0.1, fill: { color: '1E3A50' }, line: { color: '2A4A63', width: 1 } });
      s.addText(t, { x: x + 0.2, y: 2.6, w: 2.45, h: 1.8, fontFace: FONT, fontSize: 20, bold: true, color: WHITE, align: 'center', valign: 'middle', margin: 0 });
    });
    s.addText('In your own voice, on the phone or face to face. The written follow-up comes after the call, and it comes from you.', {
      x: 0.7, y: 4.75, w: 12.0, h: 0.6, fontFace: FONT, fontSize: 20, bold: true, color: TEAL, margin: 0, valign: 'middle' });
    s.addText('This is older than AI. What changed is that the cost of drafting dropped, so the temptation to type instead of call went up.', {
      x: 0.7, y: 5.6, w: 12.0, h: 0.6, fontFace: FONT, fontSize: 17, color: 'C9D4DE', margin: 0, valign: 'middle' });
    s.addNotes('Say each of the four slowly, one at a time: safety, serious discipline, a family\'s grief, special-education news. For these you call, in your own voice, and the written follow-up comes afterward and comes from you. Then the honest framing: this is not a policy about AI, it is older than AI; what changed is that drafting got cheap, so the temptation to type instead of call went up. Say the line out loud in the room before anyone is tired enough to cross it at eleven at night. Never cut this slide.');
  }

  // ============================== SLIDE 14 · THE PRIVACY RULE ==============================
  {
    const s = base();
    kicker(s, 'Kit 1’s one hard rule, in today’s clothes');
    title(s, 'The situation goes in. The child never does.');
    const rows = [
      [false, 'Pasting a parent’s email in to get help replying', 'That email is full of identity: names, schedule, history.'],
      [true, 'Describing it: “a family upset about a grade”', 'The draft comes back generic, which is exactly right.'],
      [false, 'Student names, family names, or ID numbers', 'Public tools are not a place to put a child’s record.'],
      [true, 'Every specific added by you, in your own inbox', 'Where the names belong, and where you can see them.'],
    ];
    rows.forEach(([ok, h, b], i) => {
      const y = 1.7 + i * 1.13;
      card(s, 0.7, y, 12.0, 1.0, ok ? 'EAF5F3' : 'FBEFED');
      s.addText(ok ? '✓' : '✕', { x: 0.95, y, w: 0.5, h: 1.0, fontFace: FONT, fontSize: 22, bold: true, color: ok ? GOOD : BAD, align: 'center', valign: 'middle', margin: 0 });
      s.addText(h, { x: 1.6, y: y + 0.1, w: 6.6, h: 0.42, fontFace: FONT, fontSize: 16.5, bold: true, color: NAVY, margin: 0, valign: 'middle' });
      s.addText(b, { x: 1.6, y: y + 0.52, w: 10.7, h: 0.38, fontFace: FONT, fontSize: 13.5, color: MUTED, margin: 0, valign: 'middle' });
    });
    s.addText('The tool gets the shape. You keep the people.', {
      x: 0.7, y: 6.3, w: 12.0, h: 0.45, fontFace: FONT, fontSize: 18, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('Say: Kit 1\'s one hard rule wearing today\'s clothes. The situation goes into the tool; the child never does. Spend your time on row one, because pasting a parent email in for help replying is the single most common slip in this kit and it feels harmless. Describe it instead. The draft comes back generic, which is fine, because the specifics get added by you in your own inbox where they belong.');
  }

  // ============================== SLIDE 15 · LAB SETUP ==============================
  {
    const s = base(true);
    kicker(s, 'Hands-on · 20 minutes · protected', { color: AMBER });
    s.addText('Lab: your Friday ten minutes.', {
      x: 0.7, y: 1.30, w: 12.0, h: 0.95, fontFace: FONT, fontSize: 38, bold: true, color: WHITE, margin: 0 });
    s.addText('Four steps. You leave holding four notes ready to send and one hard message drafted. Ms. Rivera runs the same ten minutes on screen beside you, start to finish.', {
      x: 0.7, y: 2.35, w: 11.7, h: 0.95, fontFace: FONT, fontSize: 19, color: 'C9D4DE', margin: 0, valign: 'top' });
    const rules = [
      ['1', 'No student or family names into the tool. Situations only.'],
      ['2', 'The specific detail is written by you, not by the tool. Always.'],
      ['3', 'The hard message in step 4 is yours from the first word.'],
    ];
    rules.forEach(([n, r], i) => {
      const y = 3.65 + i * 0.88;
      s.addShape('ellipse', { x: 0.9, y, w: 0.62, h: 0.62, fill: { color: TEAL }, line: { color: TEAL } });
      s.addText(n, { x: 0.9, y, w: 0.62, h: 0.62, fontFace: FONT, fontSize: 20, bold: true, color: WHITE, align: 'center', valign: 'middle', margin: 0 });
      s.addText(r, { x: 1.75, y: y - 0.05, w: 10.7, h: 0.72, fontFace: FONT, fontSize: 19, color: WHITE, margin: 0, valign: 'middle' });
    });
    s.addText('Step 1 · four families (3 min)   ·   Step 2 · the shape (4 min)   ·   Step 3 · the true detail (6 min)   ·   Step 4 · the hard message (5 min)', {
      x: 0.7, y: 6.35, w: 12.0, h: 0.4, fontFace: FONT, fontSize: 12.5, color: '9FB2C2', margin: 0 });
    s.addNotes('Say: twenty minutes, four steps, and at the end you are holding four notes and one hard message. Pairs, devices out inside two minutes, announce which tool you are using. Read the three ground rules off the slide. Ms. Rivera follows ONE routine all the way through today: her Friday ten minutes, four families. You will see her list (slide 16), the prompt she types (18), what came back (19), the four sentences she wrote herself (21), the finished notes as the families opened them (22 and 23), and the hard message she wrote by hand (25). Anyone lost can copy her structure from the screen and still finish.');
  }

  // ============================== SLIDE 16 · LAB STEP 1 ==============================
  {
    const s = base();
    kicker(s, 'Lab · step 1 of 4 · 3 minutes');
    title(s, 'Name four families');
    bullets(s, [
      'Four families who have not heard from you when nothing was wrong',
      'Initials on your handout. No full names on paper.',
      'Put the student from the silent audit on the list.',
      'That is the one you will be tempted to leave off.',
    ], { x: 0.7, y: 1.75, w: 5.9, h: 4.0, fontSize: 17 });
    card(s, 6.85, 1.7, 5.85, 4.15, 'EAF5F3');
    s.addText('MS. RIVERA’S FRIDAY · STEP 1', { x: 7.15, y: 1.88, w: 5.25, h: 0.3, fontFace: FONT, fontSize: 12.5, bold: true, color: TEAL, charSpacing: 1.5, margin: 0, valign: 'middle' });
    const list = [
      ['Maya', 'Nothing since October conferences'],
      ['Devon', 'Nothing since October conferences'],
      ['Priya', 'Nothing since October conferences'],
      ['Jalen', 'Nine days ago: a phone call about a shove'],
    ];
    list.forEach(([n, t], i) => {
      const y = 2.32 + i * 0.72;
      s.addText(n, { x: 7.15, y, w: 1.3, h: 0.6, fontFace: FONT, fontSize: 17, bold: true, color: NAVY, margin: 0, valign: 'middle' });
      s.addText(t, { x: 8.4, y, w: 4.05, h: 0.6, fontFace: FONT, fontSize: 13.5, color: INK, margin: 0, valign: 'middle' });
    });
    s.addText('Three silent since October, and one whose family has only ever heard bad news.', {
      x: 7.15, y: 5.2, w: 5.25, h: 0.55, fontFace: FONT, fontSize: 13, italic: true, color: MUTED, margin: 0, valign: 'middle' });
    s.addText(INVENTED, { x: 0.7, y: 6.15, w: 12.0, h: 0.4, fontFace: FONT, fontSize: 12, italic: true, color: MUTED, align: 'center', margin: 0 });
    s.addNotes('Say: step one, three minutes, and it is the step people rush. Four families who have not heard from you when nothing was wrong, initials only on the handout, and put the student from the silent audit on the list. Circulate; if someone is stuck on who to pick, ask "who did you think about in the silence at the start?" That is usually the first name on their list. Then read Ms. Rivera\'s list off the card: three silent since October conferences, and Jalen, whose family got a phone call about a shove nine days ago. Point out she is good at her job and this is still her list. 45-min cut: two minutes.');
  }

  // ============================== SLIDE 17 · LAB STEP 2 ==============================
  {
    const s = base();
    kicker(s, 'Lab · step 2 of 4 · 4 minutes');
    title(s, 'Draft the shape');
    bullets(s, [
      'The prompt is on your handout, copy-ready. Do not invent it.',
      'Role, task, context, format: the Kit 2 formula, unchanged.',
      'Ask for four short notes with nothing wrong in them.',
      'And ask for a blank line in each, for the part you will write.',
    ], { x: 0.7, y: 1.75, w: 5.9, h: 4.0, fontSize: 17 });
    card(s, 6.85, 1.7, 5.85, 4.15, 'EAF5F3');
    s.addText('MS. RIVERA’S FRIDAY · STEP 2', { x: 7.15, y: 1.88, w: 5.25, h: 0.3, fontFace: FONT, fontSize: 12.5, bold: true, color: TEAL, charSpacing: 1.5, margin: 0, valign: 'middle' });
    s.addText([
      { text: 'What she asks for: ', options: { bold: true, color: NAVY } },
      { text: 'four notes, under 70 words each, plain language, no exclamation marks, no praise adjectives.\n\n', options: { color: INK } },
      { text: 'What she tells it to leave out: ', options: { bold: true, color: NAVY } },
      { text: 'anything about the students. One blank line per note, for the true thing she saw this week.\n\n', options: { color: INK } },
      { text: '“I am asking the tool to leave a hole in its own work. That is the design, not a workaround.”', options: { italic: true, color: MUTED } },
    ], { x: 7.15, y: 2.32, w: 5.25, h: 3.4, fontFace: FONT, fontSize: 15, margin: 0, valign: 'top', lineSpacingMultiple: 1.18 });
    s.addText('Four minutes. Her actual prompt is on the next slide, word for word.', {
      x: 0.7, y: 6.15, w: 12.0, h: 0.45, fontFace: FONT, fontSize: 17, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('Say: step two, four minutes, draft the shape. The prompt is on the handout word for word so nobody has to invent it: role, task, context, format, exactly the Kit 2 formula. You are asking for four short notes with nothing wrong in them, and a blank line in each where you will write the specific thing. You are deliberately asking the tool for the part it is good at and telling it to leave the part it cannot do. Show slide 18 while they type and slide 19 while they read what came back.');
  }

  // ============================== SLIDE 18 · HER PROMPT ==============================
  {
    const s = base();
    kicker(s, 'Lab · step 2 · the prompt she types into the chat');
    title(s, 'What she actually typed');
    s.addText([
      { text: 'BEFORE   ', options: { bold: true, color: BAD } },
      { text: '“Write four nice notes home to parents.”', options: { italic: true, color: MUTED } },
    ], { x: 0.7, y: 1.42, w: 12.0, h: 0.4, fontFace: FONT, fontSize: 16, margin: 0, valign: 'middle' });
    chatWin(s, 1.95, 3.85);
    chatPaper(s, 1.95, 3.85);
    s.addText([
      { text: '“You are a teacher’s writing assistant. ', options: { color: TEAL, bold: true } },
      { text: 'Write four short positive notes home, one per student, three or four sentences each. ', options: { color: NAVY, bold: true } },
      { text: 'Nothing is wrong. These are 6th graders, and these families mostly hear from school only when there is a problem. Do not invent anything about the students. ', options: { color: 'B07914', bold: true } },
      { text: 'Under 70 words each. Plain language, no exclamation marks, no praise adjectives. Leave one blank line in each note where I will write the specific true thing I saw this week. Label them Note 1 to Note 4.”', options: { color: GOOD, bold: true } },
    ], { x: 1.95, y: 2.75, w: 10.05, h: 2.7, fontFace: FONT, fontSize: 15.5, margin: 0, valign: 'top', lineSpacingMultiple: 1.1 });
    legend(s, 6.05, PART_CHIPS);
    s.addNotes('Say: this is Ms. Rivera\'s screen and it is the shape to mimic. Role in teal, task in navy, context in amber, format in green, the same four parts from Kit 2. Read the context clause out loud, because it is the part people skip: nothing is wrong, and these families mostly hear from school only when there is a problem. Then read the last clause of the format twice: leave one blank line in each note where I will write the specific true thing I saw this week. She is instructing the tool to leave a hole in its own work. That is the design. At worst, copy this shape and you will finish the lab.');
  }

  // ============================== SLIDE 19 · WHAT CAME BACK ==============================
  {
    const s = base();
    kicker(s, 'Lab · step 2 · its reply, unedited');
    title(s, 'Four notes, word for word');
    chatWin(s, 1.28, 4.6, ' · its reply, unedited');
    chatPaper(s, 1.28, 4.6, 0.3);
    const names = ['Maya', 'Devon', 'Priya', 'Jalen'];
    names.forEach((n, i) => {
      const x = 1.15 + (i % 2) * 5.65, y = 2.05 + Math.floor(i / 2) * 1.75;
      s.addText('NOTE ' + (i + 1), { x, y, w: 1.4, h: 0.26, fontFace: FONT, fontSize: 10, bold: true, color: TEAL, charSpacing: 1.2, margin: 0, valign: 'middle' });
      s.addText([
        { text: 'Hello. I wanted to send a short note with nothing wrong attached. ' + n + ' has been a positive part of our class this term. ', options: { color: INK } },
        { text: '________________________________ ', options: { color: BAD, bold: true } },
        { text: 'I wanted you to hear it from me. Ms. Rivera, 6th grade science.', options: { color: INK } },
      ], { x, y: y + 0.3, w: 5.3, h: 1.28, fontFace: FONT, fontSize: 12.5, margin: 0, valign: 'top', lineSpacingMultiple: 1.1 });
    });
    s.addText('The same 41 words four times, with the name changed. That is not the tool failing. That is the tool doing exactly what it can do, and the blank is the part it cannot.', {
      x: 0.7, y: 6.15, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 16, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('Say: here is what came back, word for word, all four. Read one aloud, then say the honest thing: warm, competent, correctly formatted, and completely interchangeable. Swap Maya\'s name for Priya\'s and nothing breaks. Do NOT sneer at the draft; the room needs to respect it to trust the workflow. Every one of those four is a serviceable container, and every one has an empty line in the middle because the thing that makes a note worth opening is not in there and cannot be. If you sent these as they are, four families would know they got a form.');
  }

  // ============================== SLIDE 20 · LAB STEP 3 ==============================
  {
    const s = base();
    kicker(s, 'Lab · step 3 of 4 · 6 minutes · this step is the session');
    title(s, 'Add the one true detail', { fontSize: 32 });
    bullets(s, [
      'One sentence per child, written by you, into the blank',
      'Not typed into the tool. Typed into the note.',
      'This week only. What did you see, and when?',
      'Then the swap test: another child’s name in it. Does it still work?',
    ], { x: 0.7, y: 1.75, w: 5.9, h: 4.0, fontSize: 17 });
    card(s, 6.85, 1.7, 5.85, 4.15, 'EAF5F3');
    s.addText('MS. RIVERA’S FRIDAY · STEP 3', { x: 7.15, y: 1.88, w: 5.25, h: 0.3, fontFace: FONT, fontSize: 12.5, bold: true, color: TEAL, charSpacing: 1.5, margin: 0, valign: 'middle' });
    s.addText([
      { text: 'She fills four blanks by hand. ', options: { bold: true, color: NAVY } },
      { text: 'About ninety seconds, because she is looking at this week and not at the whole year.\n\n', options: { color: INK } },
      { text: 'Two of her four are not academic at all.\n\n', options: { color: INK } },
      { text: '“Steps one and two took four minutes and felt like nothing. This one takes six and feels like teaching, because it is.”', options: { italic: true, color: MUTED } },
    ], { x: 7.15, y: 2.32, w: 5.25, h: 3.4, fontFace: FONT, fontSize: 15, margin: 0, valign: 'top', lineSpacingMultiple: 1.18 });
    s.addText('You are doing the noticing. The tool did the typing.', {
      x: 0.7, y: 6.15, w: 12.0, h: 0.45, fontFace: FONT, fontSize: 18, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('Say: step three, six minutes, and this step is the session. One sentence per child, written by you, into the blank; not typed into the tool, typed into the note. Protect all six minutes. Circulate and read over shoulders, because the failure mode is people writing a SECOND generic sentence. The question to ask at a shoulder: "could that sentence be about anyone else in your class?" Then name what they are feeling: the first two steps felt like nothing, this one feels like teaching, because it is. Her four sentences are on the next slide.');
  }

  // ============================== SLIDE 21 · HER FOUR SENTENCES ==============================
  {
    const s = base();
    kicker(s, 'Lab · step 3 · the part the tool could not write');
    title(s, 'Her four sentences, from her week', { fontSize: 30 });
    card(s, 0.7, 1.55, 12.0, 4.25, PAPER);
    s.addShape('roundRect', { x: 0.7, y: 1.55, w: 0.12, h: 4.25, rectRadius: 0.05, fill: { color: TEAL }, line: { color: TEAL } });
    s.addText('WRITTEN BY MS. RIVERA, BY HAND, IN ABOUT NINETY SECONDS', {
      x: 1.1, y: 1.72, w: 11.1, h: 0.3, fontFace: FONT, fontSize: 11.5, bold: true, color: TEAL, charSpacing: 1.4, margin: 0, valign: 'middle' });
    const details = [
      ['MAYA · TUE', 'Found the mistake in my worked example on Tuesday and said so in front of everyone.'],
      ['DEVON · WED', 'Read his paragraph out loud on Wednesday. First time all year.'],
      ['PRIYA · THU', 'Stayed after on Thursday to redo a graph she was not happy with. Nobody asked her to.'],
      ['JALEN · MON', 'Set up the lab station for his group on Monday before anyone asked, and ran the timer for all three trials.'],
    ];
    details.forEach(([tag, txt], i) => {
      const y = 2.2 + i * 0.86;
      s.addShape('roundRect', { x: 1.1, y: y + 0.08, w: 1.85, h: 0.36, rectRadius: 0.18, fill: { color: NAVY }, line: { color: NAVY } });
      s.addText(tag, { x: 1.1, y: y + 0.08, w: 1.85, h: 0.36, fontFace: FONT, fontSize: 10.5, bold: true, color: WHITE, align: 'center', valign: 'middle', margin: 0, charSpacing: 0.8 });
      s.addText(txt, { x: 3.2, y, w: 9.0, h: 0.72, fontFace: FONT, fontSize: 16, color: INK, margin: 0, valign: 'middle', lineSpacingMultiple: 1.05 });
    });
    s.addText('Nine days ago, Jalen’s family got a phone call about a shove. This Friday they get the lab station. Same teacher, same child, and now they have heard both.', {
      x: 0.7, y: 6.0, w: 12.0, h: 0.55, fontFace: FONT, fontSize: 17, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('Say: here are Ms. Rivera\'s four, and they took her about ninety seconds because she was looking at this week and not at the whole year. Read all four aloud, with the day tags. Then stop on Jalen and land the closing line slowly: nine days ago his family got a phone call about a shove; this Friday they get a sentence about the kid who set up the lab station. Same teacher, same child, and now his family has heard both. That is the entire argument of this session in one line, and it cost her fifteen seconds of remembering.');
  }

  // ============================== SLIDE 22 · FINISHED NOTES 1 AND 2 ==============================
  {
    const s = base();
    kicker(s, 'Lab · the finished product · as the families opened them');
    title(s, 'Note 1 and note 2, word for word', { fontSize: 30 });
    noteCard(s, 0.7, 1.5, 5.85, 4.0, 'TO MAYA’S FAMILY  ·  FRIDAY 3:04 P.M.');
    s.addText([
      { text: 'Hi Ms. Okonkwo. Quick note, and nothing is wrong. ', options: { color: INK } },
      { text: 'On Tuesday I put a worked example on the board and made a mistake in it. Maya found the mistake and said so in front of everyone. That takes more nerve at twelve than most adults have. ', options: { color: TEAL, bold: true } },
      { text: 'I wanted you to hear it from me.\n\nMs. Rivera, 6th grade science', options: { color: INK } },
    ], { x: 1.05, y: 1.95, w: 5.2, h: 3.4, fontFace: FONT, fontSize: 14.5, margin: 0, valign: 'top', lineSpacingMultiple: 1.16 });
    noteCard(s, 6.85, 1.5, 5.85, 4.0, 'TO DEVON’S FAMILY  ·  FRIDAY 3:05 P.M.');
    s.addText([
      { text: 'Hi Mr. Pratt. Quick note, and nothing is wrong. ', options: { color: INK } },
      { text: 'On Wednesday Devon read his paragraph out loud to the class. It is the first time he has done that all year, and he did not need any convincing. ', options: { color: TEAL, bold: true } },
      { text: 'I wanted you to hear it from me.\n\nMs. Rivera, 6th grade science', options: { color: INK } },
    ], { x: 7.2, y: 1.95, w: 5.2, h: 3.4, fontFace: FONT, fontSize: 14.5, margin: 0, valign: 'top', lineSpacingMultiple: 1.16 });
    card(s, 0.7, 5.7, 12.0, 0.72, NAVY);
    s.addText([
      { text: 'The tool wrote the frame. She wrote the sentences in teal.  ', options: { bold: true, color: TEAL } },
      { text: 'Under 70 words each. Sent at 3:04 on a Friday.', options: { color: WHITE } },
    ], { x: 1.05, y: 5.7, w: 11.3, h: 0.72, fontFace: FONT, fontSize: 15.5, align: 'center', margin: 0, valign: 'middle' });
    s.addNotes('Say: these are the finished notes as the families received them, not a description of them. Read note 1 aloud, all of it, at the pace a parent would read it. Then point at the teal: the tool wrote the frame, she wrote the two sentences in the middle, and that is the note a family keeps. Seventy words. Do not summarize these slides; the owner rule is that the room sees the finished product word for word.');
  }

  // ============================== SLIDE 23 · FINISHED NOTES 3 AND 4 ==============================
  {
    const s = base();
    kicker(s, 'Lab · the finished product · the same ten minutes');
    title(s, 'Note 3 and note 4, word for word', { fontSize: 30 });
    noteCard(s, 0.7, 1.5, 5.85, 4.0, 'TO PRIYA’S FAMILY  ·  FRIDAY 3:07 P.M.');
    s.addText([
      { text: 'Hi Mrs. Raman. Quick note, and nothing is wrong. ', options: { color: INK } },
      { text: 'Priya stayed after class on Thursday to redo a graph she was not happy with. Her first one was already fine. She wanted the second one to be right. ', options: { color: TEAL, bold: true } },
      { text: 'I wanted you to hear it from me.\n\nMs. Rivera, 6th grade science', options: { color: INK } },
    ], { x: 1.05, y: 1.95, w: 5.2, h: 3.4, fontFace: FONT, fontSize: 14.5, margin: 0, valign: 'top', lineSpacingMultiple: 1.16 });
    noteCard(s, 6.85, 1.5, 5.85, 4.0, 'TO JALEN’S FAMILY  ·  FRIDAY 3:09 P.M.');
    s.addText([
      { text: 'Hi Ms. Brooks. Quick note, and nothing is wrong. ', options: { color: INK } },
      { text: 'On Monday Jalen had the lab station set up for his whole group before I finished giving directions, and then he ran the timer for all three trials without being asked. His group finished because of him. ', options: { color: TEAL, bold: true } },
      { text: 'I wanted you to hear that from me too.\n\nMs. Rivera, 6th grade science', options: { color: INK } },
    ], { x: 7.2, y: 1.95, w: 5.2, h: 3.4, fontFace: FONT, fontSize: 14.5, margin: 0, valign: 'top', lineSpacingMultiple: 1.16 });
    card(s, 0.7, 5.7, 12.0, 0.72, NAVY);
    s.addText([
      { text: '“Too.”  ', options: { bold: true, color: TEAL } },
      { text: 'Note 4 went to the family whose last contact was a phone call about a shove, nine days earlier.', options: { color: WHITE } },
    ], { x: 1.05, y: 5.7, w: 11.3, h: 0.72, fontFace: FONT, fontSize: 15.5, align: 'center', margin: 0, valign: 'middle' });
    s.addNotes('Say: notes three and four, same Friday, same ten minutes. Read note 4 aloud with the phone call from nine days ago still in your head. Then stop on the word "too," because it is doing a lot of work: it tells that family this teacher has now spoken to them twice, and only one of those times was about a problem. Land the arithmetic plainly: four families, four true sentences, ten minutes. Nothing in there is a technique; it is contact that happened because the typing stopped being the expensive part.');
  }

  // ============================== SLIDE 24 · LAB STEP 4 ==============================
  {
    const s = base();
    kicker(s, 'Lab · step 4 of 4 · 5 minutes');
    title(s, 'The hard message. You write it.');
    bullets(s, [
      'Tool closed. First word to last word, yours.',
      'The fact first. One ask, with a date.',
      'Promise nothing you cannot deliver.',
      'Then, and only then, run the second read for tone.',
    ], { x: 0.7, y: 1.75, w: 5.9, h: 4.0, fontSize: 17 });
    card(s, 6.85, 1.7, 5.85, 4.15, 'EAF5F3');
    s.addText('MS. RIVERA’S FRIDAY · STEP 4', { x: 7.15, y: 1.88, w: 5.25, h: 0.3, fontFace: FONT, fontSize: 12.5, bold: true, color: TEAL, charSpacing: 1.5, margin: 0, valign: 'middle' });
    s.addText([
      { text: 'Her hard message this week: ', options: { bold: true, color: NAVY } },
      { text: 'Devon has missed three of the last four assignments and the quarter closes in two weeks.\n\n', options: { color: INK } },
      { text: 'Same family that got note 2. ', options: { bold: true, color: NAVY } },
      { text: 'Twenty minutes, no tool, written by hand.\n\n', options: { color: INK } },
      { text: '“The tool does not get to write a sentence of it. It gets to read it back once.”', options: { italic: true, color: MUTED } },
    ], { x: 7.15, y: 2.32, w: 5.25, h: 3.4, fontFace: FONT, fontSize: 15, margin: 0, valign: 'top', lineSpacingMultiple: 1.18 });
    s.addText('Strip the names before anything is pasted in. Take what is useful from the tone read and ignore the rest.', {
      x: 0.7, y: 6.15, w: 12.0, h: 0.45, fontFace: FONT, fontSize: 16.5, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('Say: step four, five minutes, and it is the one you have been putting off. Write it yourself, tool closed. The four rules from slide 10: fact first, one ask with a date, promise nothing you cannot deliver, and know when this should have been a phone call. Then, and only then, run the second read for tone from slide 11. Be explicit and be kind: if someone starts by prompting for a draft, stop them and point at slide 10. Her finished message is on the next slide.');
  }

  // ============================== SLIDE 25 · HER HARD MESSAGE ==============================
  {
    const s = base();
    kicker(s, 'Lab · the contrast beat · same teacher, same week');
    title(s, 'The message she wrote herself', { fontSize: 30 });
    card(s, 0.7, 1.45, 3.75, 4.15, PAPER);
    s.addText('THE ROUTINE NOTE', { x: 1.0, y: 1.6, w: 3.2, h: 0.28, fontFace: FONT, fontSize: 10.5, bold: true, color: TEAL, charSpacing: 1.2, margin: 0, valign: 'middle' });
    s.addText('2 minutes · the tool drafted the frame', { x: 1.0, y: 1.88, w: 3.2, h: 0.28, fontFace: FONT, fontSize: 10, italic: true, color: MUTED, margin: 0, valign: 'middle' });
    s.addText('“On Wednesday Devon read his paragraph out loud to the class. It is the first time he has done that all year, and he did not need any convincing.”\n\nSent Friday 3:05 p.m.', {
      x: 1.0, y: 2.3, w: 3.2, h: 3.1, fontFace: FONT, fontSize: 13.5, color: INK, margin: 0, valign: 'top', lineSpacingMultiple: 1.15 });
    card(s, 4.85, 1.45, 7.85, 4.15, 'EAF5F3');
    s.addText('THE HARD MESSAGE', { x: 5.15, y: 1.6, w: 7.2, h: 0.28, fontFace: FONT, fontSize: 10.5, bold: true, color: NAVY, charSpacing: 1.2, margin: 0, valign: 'middle' });
    s.addText('20 minutes · no tool · every word hers · sent the following Wednesday', { x: 5.15, y: 1.88, w: 7.2, h: 0.28, fontFace: FONT, fontSize: 10, italic: true, color: MUTED, margin: 0, valign: 'middle' });
    s.addText([
      { text: 'Mr. Pratt,\n', options: { color: INK } },
      { text: 'Devon has not turned in three of the last four science assignments: the food web diagram, the energy lab write-up, and Tuesday’s reading response. The quarter closes on March 14.\n', options: { color: INK } },
      { text: 'Here is the one thing I am asking. Can he stay this Thursday after school? I will be in room 214 until 4:30, and I will sit with him while he does the lab write-up, which is the one that counts most.\n', options: { color: INK } },
      { text: 'I do not know yet whether he can finish all three by the 14th, and I do not want to promise you that he can. ', options: { color: NAVY, bold: true } },
      { text: 'I do know he will be further along Thursday than he is today.\n', options: { color: INK } },
      { text: 'If it is easier to talk than to type, my number is below and I will call you back the same day.\n', options: { color: INK } },
      { text: 'Ms. Rivera, 6th grade science, room 214', options: { color: INK } },
    ], { x: 5.15, y: 2.3, w: 7.25, h: 3.15, fontFace: FONT, fontSize: 13, margin: 0, valign: 'top', lineSpacingMultiple: 1.12 });
    card(s, 0.7, 5.75, 12.0, 0.72, NAVY);
    s.addText('When the hard message landed, it was not the first thing this family had heard from her. That is what the ordinary contact is for.', {
      x: 1.05, y: 5.75, w: 11.3, h: 0.72, fontFace: FONT, fontSize: 16, bold: true, color: WHITE, align: 'center', margin: 0, valign: 'middle' });
    s.addNotes('Say: same week, same teacher, and the hard message goes to Devon\'s family, the family that got note 2. Walk the structure on the screen: fact first with all three assignments named, one ask with a room and a time, and then the sentence in navy, which is the one to stop on. She refuses to over-promise where over-promising would have been easy and would have felt kind. It closes with a phone offer. Then the contrast: the note on the left took two minutes and a tool; the message on the right took twenty minutes and no tool at all. Land the navy strip word for word. 45-min cut: read the navy sentence and the strip, skip the walk-through.');
  }

  // ============================== SLIDE 26 · WHAT JUST HAPPENED ==============================
  {
    const s = base();
    kicker(s, 'Twenty minutes ago none of this existed');
    title(s, 'Ten minutes. Four families.');
    card(s, 0.7, 1.7, 12.0, 2.5, PAPER);
    s.addText([
      { text: 'Four notes ready to send, each carrying one true thing you noticed this week. One hard message drafted, in your words.\n\n', options: { bold: true, color: NAVY } },
      { text: 'The four families on your list started this hour hearing from you only when something was wrong. That is no longer true, and it took ten minutes.', options: { color: INK } },
    ], { x: 1.1, y: 1.95, w: 11.2, h: 2.0, fontFace: FONT, fontSize: 19, margin: 0, valign: 'middle', lineSpacingMultiple: 1.15 });
    card(s, 0.7, 4.45, 12.0, 1.75, 'EAF5F3');
    s.addText('SHARE-OUT · THREE VOICES · ONE MINUTE EACH', { x: 1.05, y: 4.62, w: 11.3, h: 0.32, fontFace: FONT, fontSize: 12.5, bold: true, color: TEAL, charSpacing: 1.4, margin: 0, valign: 'middle' });
    s.addText('Read me the one true sentence you wrote. Not the whole note. The sentence.', {
      x: 1.05, y: 5.05, w: 11.3, h: 1.0, fontFace: FONT, fontSize: 21, bold: true, color: NAVY, margin: 0, valign: 'middle' });
    s.addNotes('Say: twenty minutes ago you had four families who had not heard from you when nothing was wrong. You now have four notes ready to send and one hard message drafted. Then run the share-out and be strict about the ask: read me the SENTENCE, not the whole note. Prioritize anyone who put their difficult student on the list; that is the most useful minute in the room. 45-min cut: one voice.');
  }

  // ============================== SLIDE 27 · HONEST LIMITS ==============================
  {
    const s = base();
    kicker(s, 'So nobody oversells it in the hallway');
    title(s, 'What AI cannot do here');
    const items = [
      ['It never met your students', 'Every sentence worth sending is still yours to write. The tool was not in the room on Tuesday.'],
      ['Volume is not trust', 'Four notes do not repair a relationship. Forty do not either. Consistency does, and the tool lowers the cost of consistency.'],
      ['The evidence has a boundary', 'Kraft & Rogers ran in a summer credit-recovery program and tested a bundle. Worth doing. Not proof of which ingredient did it.'],
    ];
    items.forEach(([h, b], i) => {
      const x = 0.7 + i * 4.12;
      card(s, x, 1.75, 3.85, 3.5, PAPER);
      s.addText(h, { x: x + 0.28, y: 2.0, w: 3.3, h: 0.85, fontFace: FONT, fontSize: 18, bold: true, color: BAD, margin: 0, valign: 'top' });
      s.addText(b, { x: x + 0.28, y: 2.95, w: 3.3, h: 2.1, fontFace: FONT, fontSize: 14.5, color: INK, margin: 0, valign: 'top', lineSpacingMultiple: 1.14 });
    });
    s.addText('None of that is a reason to skip the tool. All of it is the reason the teacher stays in the loop.', {
      x: 0.7, y: 5.65, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 19, bold: true, color: NAVY, align: 'center', margin: 0 });
    s.addNotes('Say: honest limits, as always, so nobody oversells this in the hallway. The tool never met your students. Volume is not trust; consistency is, and what the tool does is lower the cost of consistency, which is its whole contribution here and is a real one. And the research has a boundary: a summer credit-recovery program, and a bundle, so we can say this is worth doing and we cannot say we know which ingredient did it. The humans-in-the-loop framing is the U.S. Department of Education OET, 2023, if anyone asks.');
  }

  // ============================== SLIDE 28 · COMMITMENTS ==============================
  {
    const s = base(true);
    kicker(s, 'The list grows by three', { color: AMBER });
    s.addText('Our three commitments', {
      x: 0.7, y: 1.30, w: 12.0, h: 0.8, fontFace: FONT, fontSize: 36, bold: true, color: WHITE, margin: 0 });
    const cs = [
      'Ten minutes a week, on a day with a name: four families who hear from me when nothing is wrong.',
      'I write the hard message myself. The tool only ever reads it back.',
      'No family message through a public AI translator, and nothing goes out unread.',
    ];
    cs.forEach((t, i) => {
      const y = 2.4 + i * 1.15;
      s.addShape('ellipse', { x: 0.9, y: y + 0.1, w: 0.6, h: 0.6, fill: { color: TEAL }, line: { color: TEAL } });
      s.addText(String(i + 1), { x: 0.9, y: y + 0.1, w: 0.6, h: 0.6, fontFace: FONT, fontSize: 19, bold: true, color: WHITE, align: 'center', valign: 'middle', margin: 0 });
      s.addText(t, { x: 1.75, y, w: 10.7, h: 0.85, fontFace: FONT, fontSize: 19, bold: true, color: TEAL, margin: 0, valign: 'middle', lineSpacingMultiple: 1.1 });
    });
    s.addText('Can I get a nod on those three?', {
      x: 0.7, y: 6.05, w: 12.0, h: 0.5, fontFace: FONT, fontSize: 20, italic: true, color: '9FB2C2', margin: 0 });
    s.addNotes('Say all three, then ask for the visible nod; agreement out loud is what makes it a norm. Commitment 1 is the one that survives October only if it has a day with a name, so make people say the day. Commitment 2 is the thesis of the kit. Commitment 3 carries both red lines in one line.');
  }

  // ============================== SLIDE 29 · WHAT'S NEXT ==============================
  {
    const s = base();
    kicker(s, 'Kit 6 of 8 · Track A');
    title(s, 'Where this series goes next');
    const kits = ['1 · Foundations & Safety  ✔', '2 · Prompting Basics  ✔', '3 · Planning & Differentiation  ✔', '4 · Assessment  ✔', '5 · Academic Integrity  ✔', '6 · Communication  ✔', '7 · Workload', '8 · Your School’s AI Culture'];
    kits.forEach((k, i) => {
      const x = 0.7 + (i % 4) * 3.1, y = 1.7 + Math.floor(i / 4) * 1.3;
      card(s, x, y, 2.9, 1.1, i < 6 ? 'EAF5F3' : PAPER);
      s.addText(k, { x: x + 0.2, y: y + 0.1, w: 2.5, h: 0.9, fontFace: FONT, fontSize: 13, bold: i < 6, color: NAVY, margin: 0, valign: 'middle' });
    });
    card(s, 0.7, 4.6, 12.0, 1.6, NAVY);
    s.addText([
      { text: 'Next: Kit 7, AI for Workload. ', options: { bold: true, color: WHITE } },
      { text: 'You just bought back ten minutes and spent them on families. Kit 7 audits the rest of the week and finds the other hours. Bring your calendar.', options: { color: 'C9D4DE' } },
    ], { x: 1.05, y: 4.8, w: 11.3, h: 1.2, fontFace: FONT, fontSize: 17, margin: 0, valign: 'middle' });
    s.addNotes('Say: the month ahead runs inside PLC time you already have. Week two, the Friday Ten check: did the ten minutes happen and what came back. Week three, the detail round: everyone reads one true sentence they wrote. Week four, the hard-message read: bring one you wrote and let a partner check it against the four rules. Then Kit 7. Completing all eight kits earns the Certificate of Completion; check with your district or state about local credit.');
  }

  // ============================== SLIDE 30 · FIRST 48 ==============================
  {
    const s = base();
    kicker(s, 'Before Friday becomes a memory');
    title(s, 'Your first 48 hours: three small things');
    const acts = [
      ['~10 min', 'Send the four notes', 'They are written. They need a send button and nothing else.'],
      ['~10 min', 'Send the hard message', 'Read it out loud once first. Your ear catches blame faster than your eye.'],
      ['~2 min', 'Calendar next week’s ten minutes', 'A day with a name, and the next four families written down. The habit dies without a day.'],
    ];
    acts.forEach(([t, h, b], i) => {
      const y = 1.65 + i * 1.55;
      card(s, 0.7, y, 12.0, 1.35, PAPER);
      s.addText(t, { x: 1.0, y: y + 0.42, w: 1.5, h: 0.5, fontFace: FONT, fontSize: 17, bold: true, color: TEAL, margin: 0 });
      s.addText(h, { x: 2.6, y: y + 0.16, w: 9.9, h: 0.5, fontFace: FONT, fontSize: 20, bold: true, color: NAVY, margin: 0 });
      s.addText(b, { x: 2.6, y: y + 0.68, w: 9.9, h: 0.6, fontFace: FONT, fontSize: 15.5, color: INK, margin: 0 });
    });
    s.addNotes('Say: three actions, and the first one is already done except for the send button. Read out loud before the hard message goes; your ear catches blame faster than your eye does. Hold up the First 48 Hours sheet and be blunt about action three: the habit dies without a day on the calendar.');
  }

  // ============================== SLIDE 31 · EXIT TICKET ==============================
  {
    const s = base();
    kicker(s, 'Two minutes');
    title(s, 'Exit ticket');
    bullets(s, [
      'The four families, by initials, and the day your ten minutes lives',
      'The one true detail you are proudest of noticing',
      'The hard message you drafted, and the date it goes out',
    ], { y: 1.8, h: 2.8, fontSize: 22 });
    card(s, 0.7, 4.75, 12.0, 1.35, 'EAF5F3');
    s.addText('Your answers steer the PLC follow-ups, and the ticket doubles as this school’s PD documentation. Be specific.', {
      x: 1.05, y: 4.75, w: 11.3, h: 1.35, fontFace: FONT, fontSize: 18, bold: true, color: NAVY, margin: 0, valign: 'middle' });
    s.addNotes('Say: exit tickets at the door. Three answers, and the third one has a date on it, which is what makes it real. Distribute and collect at the door; they double as the school\'s PD documentation. Check with your district or state whether this PD qualifies for local credit.');
  }

  // ============================== SLIDE 32 · CLOSE ==============================
  {
    const s = base(true);
    s.addText('Nobody remembers a beige note.\nNobody forgets a true sentence\nabout their kid.', {
      x: 0.7, y: 1.7, w: 12.0, h: 2.5, fontFace: FONT, fontSize: 33, bold: true, color: WHITE, align: 'center', margin: 0, lineSpacingMultiple: 1.2 });
    s.addText('The tool bought you the volume.\nThe sentence in the middle is still yours, and so is the hard message.', {
      x: 0.7, y: 4.5, w: 12.0, h: 1.3, fontFace: FONT, fontSize: 22, bold: true, color: TEAL, align: 'center', margin: 0, lineSpacingMultiple: 1.25 });
    s.addText('Human teaching. Life-changing tools.', {
      x: 0.7, y: 6.4, w: 12.0, h: 0.4, fontFace: FONT, fontSize: 13, color: '9FB2C2', align: 'center', charSpacing: 2, margin: 0 });
    s.addNotes('Say: at the start of this hour I asked you to think about one family and when they last heard from you when nothing was wrong, and most of you found a blank. That blank was never about caring; four notes used to cost an evening and they cost ten minutes now. Go send the four. Collect exit tickets at the door.');
  }

  const out = path.resolve(__dirname, '../Kit06_PresentationDeck.pptx');
  await p.writeFile({ fileName: out });
  console.log('wrote', out, '·', slideNo, 'slides');
})();
