const B = require('./build-binder.js');
const fs = require('fs');
const S = process.env.SCRATCH;
const { UNITS, css, sheet, icon, W, unitPages } = B;

const head = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">
<title>Short-Vowel CVC Intervention Binder</title>
<link href="file://${S}/fonts/fonts.css" rel="stylesheet">
<style>${css}
.tight .card{padding:9pt 14pt}
.tight h1{font-size:26pt}
.tight .sub{margin-top:3pt;font-size:10pt}
.tight .ref{font-size:8pt;line-height:1.42}
.tight h2{font-size:12.5pt !important;margin-bottom:4pt !important}
.tight .card div{font-size:10pt !important;line-height:1.5 !important}
</style></head><body>\n`;

const pages = [];

// COVER
pages.push(`<div class="sheet">
  <div class="rainbow top"><i class="r1"></i><i class="r2"></i><i class="r3"></i><i class="r4"></i></div>
  <div style="position:absolute;left:.6in;top:.95in"><div class="eyebrow">Bright Scholar · Reading Intervention</div></div>
  <div class="badge" style="position:absolute;right:.6in;top:.82in;background:var(--tomato);color:#fff;font-family:'Fredoka',sans-serif;font-weight:600;font-size:12pt;padding:7pt 16pt;border-radius:24pt;transform:rotate(-3deg);white-space:nowrap">All 5 short vowels</div>
  <div style="position:absolute;left:.6in;right:.6in;top:1.75in">
    <div style="background:#fff;border:3pt solid var(--ink);border-radius:20pt;padding:22pt 26pt;box-shadow:9pt 9pt 0 var(--sunny)">
      <h1 style="font-size:40pt">Short-Vowel<br>CVC Binder</h1>
      <div class="sub" style="font-size:13pt;margin-top:10pt">Read it · Build it · Write it — the complete no-prep intervention binder<br>for beginning and struggling readers.</div>
      <div style="margin-top:11pt"><span class="pill">Grades K–2</span><span class="pill t">No prep</span><span class="pill b">Print &amp; reuse</span><span class="pill g">Probes + data</span></div>
    </div>
    <div style="display:flex;gap:8pt;margin-top:12pt">
      ${UNITS.map(u=>`<div style="flex:1;background:#fff;border:2.5pt solid var(--ink);border-radius:14pt;padding:9pt 4pt;text-align:center">
        <div style="font-family:'Fredoka',sans-serif;font-weight:600;font-size:28pt;color:${u.colour};line-height:1">${u.v}</div>
        <div style="font-size:8.5pt;font-weight:800;color:var(--grey)">${u.name.replace('Short ','short ')}</div></div>`).join('')}
    </div>
    <div style="display:flex;gap:9pt;margin-top:11pt">
      <div class="card" style="flex:1;text-align:center;padding:11pt 6pt"><div style="font-family:'Luckiest Guy',cursive;font-size:23pt;color:var(--blue);line-height:1">52</div><div style="font-size:9pt;font-weight:800;color:var(--grey);margin-top:2pt">pages</div></div>
      <div class="card" style="flex:1;text-align:center;padding:11pt 6pt"><div style="font-family:'Luckiest Guy',cursive;font-size:23pt;color:var(--blue);line-height:1">30</div><div style="font-size:9pt;font-weight:800;color:var(--grey);margin-top:2pt">practice pages</div></div>
      <div class="card" style="flex:1;text-align:center;padding:11pt 6pt"><div style="font-family:'Luckiest Guy',cursive;font-size:23pt;color:var(--blue);line-height:1">6</div><div style="font-size:9pt;font-weight:800;color:var(--grey);margin-top:2pt">probes + data</div></div>
      <div class="card" style="flex:1;text-align:center;padding:11pt 6pt"><div style="font-family:'Luckiest Guy',cursive;font-size:23pt;color:var(--blue);line-height:1">2</div><div style="font-size:9pt;font-weight:800;color:var(--grey);margin-top:2pt">AI Growth Eval</div></div>
    </div>
    <div style="background:var(--ink);color:var(--cream);border-radius:16pt;padding:13pt 18pt;margin-top:11pt;display:flex;align-items:center;gap:13pt">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFC43D" stroke-width="2.2" stroke-linecap="round"><path d="M3 17l5-5 4 3 8-8"/><path d="M15 7h5v5"/></svg>
      <div style="font-family:'Fredoka',sans-serif;font-weight:600;font-size:12.5pt;line-height:1.35">Ends with an <b style="color:var(--sunny)">AI Growth Eval</b> — turn the scores<br>you collected into this week's next three moves.</div>
    </div>
  </div>
  <div style="position:absolute;left:.6in;right:.6in;bottom:.85in;display:flex;gap:9pt">
    <div class="card" style="flex:1;padding:12pt 13pt">
      <svg width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="#17BEBB" stroke-width="2.1" stroke-linejoin="round"><path d="M4 4.6h16v14.8H4z"/><path d="M4 9.2h16M9.2 4.6v14.8"/></svg>
      <div style="font-family:'Fredoka',sans-serif;font-weight:600;font-size:11.5pt;margin-top:4pt">Print once, reuse</div>
      <div style="font-size:9pt;font-weight:700;color:var(--grey);line-height:1.4">Sleeve it, hand out a dry-erase marker, use it all year.</div>
    </div>
    <div class="card" style="flex:1;padding:12pt 13pt">
      <svg width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="#2D6CB5" stroke-width="2.1" stroke-linecap="round"><path d="M4 6.5h16M4 12h16M4 17.5h9"/></svg>
      <div style="font-family:'Fredoka',sans-serif;font-weight:600;font-size:11.5pt;margin-top:4pt">Sequence printed inside</div>
      <div style="font-size:9pt;font-weight:700;color:var(--grey);line-height:1.4">Slot it into the programme you already teach.</div>
    </div>
    <div class="card" style="flex:1;padding:12pt 13pt">
      <svg width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="#4CAF6D" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>
      <div style="font-family:'Fredoka',sans-serif;font-weight:600;font-size:11.5pt;margin-top:4pt">Cited, not guessed</div>
      <div style="font-size:9pt;font-weight:700;color:var(--grey);line-height:1.4">The research behind it is named on the last page.</div>
    </div>
  </div>
  <div class="foot"><span>Built and audited by two certified teachers</span><span>AI-Ready School</span></div>
  <div class="rainbow bot"><i class="r1"></i><i class="r2"></i><i class="r3"></i><i class="r4"></i></div>
</div>`);

// HOW TO USE + SEQUENCE
pages.push(sheet(`
  <div class="eyebrow">Start here</div>
  <h1 style="margin-top:3pt">How to use this binder</h1>
  <div class="sub">Five units, one short vowel each, in the order that keeps the two confusable vowels apart.</div>
  <div style="display:flex;gap:9pt;margin-top:13pt">
    ${UNITS.map((u,i)=>`<div class="card" style="flex:1;text-align:center;padding:12pt 6pt">
      <div style="font-family:'Fredoka',sans-serif;font-weight:600;font-size:36pt;color:${u.colour};line-height:1">${u.v}</div>
      <div style="font-size:9.5pt;font-weight:800;color:var(--grey);margin-top:3pt">Unit ${i+1}</div></div>`).join('')}
  </div>
  <div class="card" style="margin-top:13pt">
    <h2 style="font-size:13.5pt;margin-bottom:5pt">The weekly loop</h2>
    <div style="font-size:10.5pt;line-height:1.65"><b>1.</b> Print the practice pages once and sleeve them — students write with a
    dry-erase marker and the binder lasts all year. &nbsp;<b>2.</b> Work one unit: six practice pages, in order, a few minutes a day.
    &nbsp;<b>3.</b> Give the ten-word probe once a week and record it on that unit's data sheet. &nbsp;<b>4.</b> Take the score to the
    AI Growth Eval at the back. &nbsp;<b>5.</b> Move on at 8 of 10, twice in a row.</div>
  </div>
  <div class="card" style="margin-top:10pt">
    <h2 style="font-size:13.5pt;margin-bottom:5pt">Why this sequence</h2>
    <div style="font-size:10.5pt;line-height:1.65">The units run <b>a, i, o, u, e</b> rather than alphabetically. Short
    <b>e</b> and short <b>i</b> are the two short vowels beginning readers most often confuse, and published phonics
    scope-and-sequences commonly separate them as far apart in the order as possible for exactly that reason — so short
    <b>e</b> comes last, four units away from short <b>i</b>. Short <b>a</b> comes first because it appears in more early
    decodable words than any other short vowel.<br><br>
    The sequence is printed here so you can slot this into whatever phonics programme you already teach instead of guessing
    what it assumes. The units are independent — if your programme introduces the vowels in a different order, teach the
    tabs in that order and the probes still work.</div>
  </div>
  <div class="card" style="margin-top:10pt">
    <h2 style="font-size:13.5pt;margin-bottom:5pt">What is in every unit</h2>
    <div style="font-size:10.5pt;line-height:1.65">A tab divider with the unit's picture words · read-it/build-it/write-it with pictures ·
    the same without pictures · sound boxes · picture-and-word match · word-family sorting · sentence reading · a ten-word probe on its own
    student-facing page · a four-week data sheet.</div>
  </div>
  <div style="background:var(--sunny);border-radius:15pt;padding:12pt 16pt;margin-top:10pt">
    <div style="font-weight:800;font-size:10.5pt;line-height:1.55">Every target word in this binder is a true CVC word — one consonant,
    one short vowel, one consonant, no blends and no digraphs — verified by an automated check before publication.</div>
  </div>`, 'How to use this binder', 'Bright Scholar · AI-Ready School'));

// 5 UNITS
UNITS.forEach((u,i)=>pages.push(...unitPages(u,i)));

// MIXED REVIEW probe + data
const mixed = ['cat','pig','dog','bug','bed','map','six','box','sun','ten'];
pages.push(sheet(`
  <div class="eyebrow">Mixed review · student page</div>
  <h1 style="margin-top:3pt">All five vowels.</h1>
  <div class="sub">Ten words, one from each unit and then some. Read them out loud in order.</div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:13pt;margin-top:14pt">
    ${mixed.map(w=>`<div class="probeword w">${w}</div>`).join('')}
  </div>
  <div style="background:var(--ink);color:var(--cream);border-radius:15pt;padding:12pt 16pt;margin-top:12pt">
    <div style="font-weight:800;font-size:10.5pt;line-height:1.5">Give this after unit 5, then again a month later. A student who holds
    8 of 10 here has the whole short-vowel set, not just the last unit you taught.</div>
  </div>
  <div style="display:flex;gap:9pt;margin-top:10pt">
    <div class="card" style="flex:1;padding:12pt 14pt"><div style="font-size:9pt;font-weight:800;color:var(--grey)">DATE</div><div style="border-bottom:2.5pt dotted #9FB2C2;height:22pt;margin-top:5pt"></div></div>
    <div class="card" style="flex:1;padding:12pt 14pt"><div style="font-size:9pt;font-weight:800;color:var(--grey)">SCORE</div><div style="font-family:'Luckiest Guy',cursive;font-size:24pt;color:var(--blue);line-height:1.2">___ / 10</div></div>
  </div>`, 'Student page — hand this side to the child', 'Bright Scholar · mixed review'));

pages.push(sheet(`
  <div class="eyebrow">Mixed review · progress monitoring</div>
  <h1 style="margin-top:3pt">Mixed review · data sheet</h1>
  <div class="sub">Which vowel slipped tells you which tab to go back to. That is the whole point of a mixed probe.</div>
  <table class="dat" style="margin-top:11pt">
    <tr><th style="width:30%">Probe word</th><th>Vowel</th><th>First try</th><th>One month later</th></tr>
    ${mixed.map(w=>`<tr><td>${w}</td><td class="c">${w[1]}</td><td class="c">○</td><td class="c">○</td></tr>`).join('')}
    <tr><td style="font-family:'Fredoka',sans-serif;color:var(--blue)">Score / 10</td><td class="c">—</td><td class="c">___</td><td class="c">___</td></tr>
  </table>
  <div class="card" style="margin-top:12pt">
    <h2 style="font-size:13pt;margin-bottom:4pt">Which vowel needs another pass?</h2>
    <div style="border-bottom:2pt dotted #9FB2C2;height:20pt;margin-top:8pt"></div>
    <div style="border-bottom:2pt dotted #9FB2C2;height:20pt"></div>
  </div>
  <div style="background:var(--sunny);border-radius:15pt;padding:11pt 15pt;margin-top:11pt">
    <div style="font-weight:800;font-size:10.5pt;line-height:1.55">If two misses share a vowel, reopen that tab for a week rather than
    re-teaching the whole binder. If the misses are scattered across vowels, the gap is blending speed, not any one sound.</div>
  </div>`, 'Student: ______________________', 'Bright Scholar · mixed review'));

// GROWTH EVAL + GROUP SNAPSHOT + CITATIONS (from the approved sample)
const SAMPLE = fs.readFileSync(__dirname + '/cvc-unit1-short-a.html','utf8');
const blocks = SAMPLE.split('<div class="sheet">').slice(1)
  .map(b => '<div class="sheet">' + b.slice(0, b.lastIndexOf('</div>') + 6));
const grab = marker => {
  const hit = blocks.find(b => b.includes(marker));
  if (!hit) throw new Error('page not found in sample: ' + marker);
  return hit;
};
pages.push(grab('AI Growth Eval · one student'));
pages.push(grab('Group snapshot · who needs what'));
pages.push(grab('How this unit is built')
  .replace(/How this unit is built/g, 'How this binder is built')
  .replace('Unit 2 (short i) follows.', 'The mixed-review probe at the back checks all five vowels together.')
  .replace('Each unit links', 'Each of the five units links')
  .replace('Every target word in this\n      unit is a true short-<b>a</b> CVC word', 'Every target word in this binder is a true CVC word')
  .replace('true short-<b>a</b> CVC word', 'true CVC word')
  .replace('This unit is not aligned', 'This binder is not aligned')
  .replace('<div class="pad">', '<div class="pad tight">')
  // add the scope-and-sequence citation the binder's vowel order rests on
  .replace('Phonics Hero. <i>Mastery in phonics learning.</i>',
    'NJTSS / Reading Rockets. <i>Sample phonics scope and sequence.</i> — one of several published sequences that order '
  + 'the short vowels a, i, o, u, e so the easily confused short /i/ and short /e/ are kept apart. A widely used '
  + 'practitioner convention, not a claim of experimental evidence.<br><br>Phonics Hero. <i>Mastery in phonics learning.</i>')
  // the extra reference pushes the closing note into the footer — tighten it
  .replace('padding:12pt 16pt;margin-top:10pt', 'padding:10pt 15pt;margin-top:5pt')
  .replace('class="card" style="margin-top:9pt"', 'class="card" style="margin-top:7pt"')
  .replace('Built and audited by two certified teachers. The mixed-review probe at the back checks all five\n      vowels together. If you find an error in any word\n      list or probe, message us through TPT and we will fix it and re-upload the same day \u2014 you keep the\n      updated file free.',
           'Built and audited by two certified teachers. Find an error in any word list or probe? Message us through TPT \u2014 we fix it and re-upload the same day, and you keep the updated file free.')
  .replace('margin-top:9pt">\n      <h2 style="font-size:13.5pt;margin-bottom:6pt">References</h2>',
           'margin-top:8pt">\n      <h2 style="font-size:13pt;margin-bottom:5pt">References</h2>'));

fs.writeFileSync(process.argv[2], head + pages.join('\n') + '\n</body></html>');
console.log('pages emitted:', pages.length);
