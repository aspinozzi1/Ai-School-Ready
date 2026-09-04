/* Generates the complete Short-Vowel CVC Intervention Binder (5 units).
   node kits/bestseller-binder/src/build-binder.js > .../cvc-binder.html */
const ICONS = require('./icons.js');
const S = process.env.SCRATCH;

const UNITS = [
  { v:'a', name:'Short a', color:'#E4572E',
    pics:['cat','hat','bag','van','pan','map'],
    plain:['bat','jam','tap','ran','mad','wag'],
    sbox:['can','lap','fan','rat','gas','ham'],
    fams:[['-at',['cat','hat','bat','mat']],['-ap',['map','tap','nap','lap']],['-ag',['bag','rag','tag','wag']]],
    sents:[['The','cat','sat on my','hat'],['Dad had','jam','in a','pan'],['A','rat','ran','to the','van']],
    probe:['cat','map','sad','pan','bag','hat','tap','rag','jam','van'] },
  { v:'i', name:'Short i', color:'#2D6CB5',
    pics:['pig','pin','six','lip','kid','bin'],
    plain:['fit','hit','rib','dig','mix','sit'],
    sbox:['win','tip','fig','him','rip','lit'],
    fams:[['-ig',['big','dig','fig','pig']],['-ip',['dip','lip','rip','tip']],['-in',['bin','fin','pin','win']]],
    sents:[['The','pig','sat in the','bin'],['A','kid','can','dig','in it'],['I','win','if I','hit','six']],
    probe:['pig','six','lip','kid','bin','pin','hit','dig','mix','sit'] },
  { v:'o', name:'Short o', color:'#4CAF6D',
    pics:['dog','box','mop','log','pot','fox'],
    plain:['hop','top','rob','jog','cot','mom'],
    sbox:['hot','dot','sob','rod','job','nod'],
    fams:[['-og',['dog','fog','jog','log']],['-op',['hop','mop','pop','top']],['-ot',['dot','hot','pot','not']]],
    sents:[['The','dog','sat on a','log'],['Mom','put the','mop','in the','box'],['A','fox','can','hop','on','top']],
    probe:['dog','box','mop','log','pot','fox','hop','top','hot','job'] },
  { v:'u', name:'Short u', color:'#8367C7',
    pics:['bug','sun','cup','bus','mug','rug'],
    plain:['run','hug','cut','tub','mud','gum'],
    sbox:['fun','bun','hut','rub','sum','dug'],
    fams:[['-ug',['bug','hug','mug','rug']],['-un',['bun','fun','run','sun']],['-ut',['but','cut','hut','nut']]],
    sents:[['A','bug','sat on the','rug'],['The','sun','is','fun','for us'],['I','run','to the','bus']],
    probe:['bug','sun','cup','bus','mug','rug','run','hug','cut','tub'] },

  { v:'e', name:'Short e', color:'#17BEBB',
    pics:['bed','hen','ten','pen','jet','web'],
    plain:['red','net','leg','wet','hem','peg'],
    sbox:['bet','den','get','led','met','yes'],
    fams:[['-ed',['bed','fed','led','red']],['-en',['den','hen','men','pen']],['-et',['bet','get','net','wet']]],
    sents:[['The','hen','sat on the','bed'],['I','get','a','red','pen'],['Ten','legs on the','web','are','wet']],
    probe:['bed','hen','ten','pen','jet','web','red','leg','wet','get'] },
];

const CSSFILE = require('fs').readFileSync(__dirname + '/cvc-unit1-short-a.html','utf8');
const css = CSSFILE.slice(CSSFILE.indexOf('<style>')+7, CSSFILE.indexOf('</style>'));

const fs_ = require('fs');
const ART = __dirname + '/../art/cut';
const ART_SM = __dirname + '/../art/cut-sm';
const artCache = {};
// One raster per placement size. 470px is 300dpi at the largest use (112pt);
// the 34-52pt uses only need ~190px, and shipping the big one everywhere
// tripled the file size for no visible gain.
const icon = (w, size = 34) => {
  const dir = ART;  // one master: two sets meant 60 embedded images, not 30
  const key = dir + '|' + w;
  const f = `${dir}/${w}.png`;
  if (!(key in artCache)) {
    artCache[key] = fs_.existsSync(f)
      ? 'data:image/png;base64,' + fs_.readFileSync(f).toString('base64') : null;
  }
  // Licensed/commissioned art wins; the SVG set stays as the fallback so a
  // missing file degrades to a drawing rather than a blank cell.
  return artCache[key]
    ? `<img src="${artCache[key]}" width="${size}" height="${size}" style="display:block;margin:0 auto;object-fit:contain">`
    : (ICONS[w] ? `<svg viewBox="0 0 64 64" width="${size}" height="${size}">${ICONS[w]}</svg>` : '');
};
const W = w => `<span class="w">${w}</span>`;

const sheet = (inner, fl, fr) => `<div class="sheet">
  <div class="rainbow top"><i class="r1"></i><i class="r2"></i><i class="r3"></i><i class="r4"></i></div>
  <div class="pad">${inner}</div>
  <div class="foot"><span>${fl}</span><span>${fr}</span></div>
  <div class="rainbow bot"><i class="r1"></i><i class="r2"></i><i class="r3"></i><i class="r4"></i></div>
</div>`;

const wrow = (i,w,withPic) => `<div class="wrow">${withPic
  ? `<div class="pic">${icon(w,38)}</div>` : `<div class="wnum">${i+1}</div>`}
  <div class="word w">${w}</div>
  <div class="boxes"><div class="bx"></div><div class="bx"></div><div class="bx"></div></div>
  <div class="wline"></div></div>`;

const stars = n => Array(n).fill(`<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#FFC43D" stroke-width="2" stroke-linejoin="round"><path d="M12 3l2.4 5.8 6.2.5-4.7 4 1.4 6-5.3-3.2L6.7 19.3l1.4-6-4.7-4 6.2-.5z"/></svg>`).join('');

function unitPages(u, n) {
  const P = [];
  const seqPills = UNITS.map((x,i) => i === n
    ? `<span class="pill t">${i+1} · short ${x.v}</span>`
    : `<span class="pill" style="background:#fff;border:2pt solid #D8E3EC;color:var(--grey)">${i+1} · short ${x.v}</span>`).join('');

  // divider
  P.push(sheet(`
    <div class="eyebrow">Unit ${n+1} of 5 · Tab divider</div>
    <div style="display:flex;align-items:center;gap:20pt;margin-top:6pt">
      <div style="font-family:'Fredoka',sans-serif;font-weight:600;font-size:104pt;color:${u.color};line-height:.92">${u.v}</div>
      <div><h1 style="font-size:31pt">${u.name}</h1>
      <div class="sub" style="font-size:12pt">${u.pics.join(' · ')}<br>One consonant, one short vowel, one consonant.</div></div>
    </div>
    <div style="display:flex;gap:5pt;margin-top:14pt;flex-wrap:wrap">${seqPills}</div>
    <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:8pt;margin-top:14pt">
      ${u.pics.map(w=>`<div class="card" style="text-align:center;padding:11pt 3pt">${icon(w,52)}
        <div style="font-family:'Fredoka',sans-serif;font-weight:600;font-size:14pt;letter-spacing:1.5px;margin-top:4pt" class="w">${w}</div></div>`).join('')}
    </div>
    <div class="card" style="margin-top:14pt">
      <h2 style="font-size:13.5pt;margin-bottom:5pt">This unit at a glance</h2>
      <div style="font-size:10.5pt;line-height:1.6">Six practice pages, a ten-word probe on its own student page, and a four-week data
      sheet. Work the unit until the probe shows 8 of 10 twice, then move to the next tab. The Growth Eval at the back of the binder
      works for every unit.</div>
    </div>
    <div class="card" style="margin-top:11pt">
      <h2 style="font-size:13.5pt;margin-bottom:6pt">If a student is stuck</h2>
      <div style="font-size:10.5pt;line-height:1.5">
        <div style="display:flex;gap:10pt;margin-bottom:6pt"><div style="flex:none;width:2.35in;font-weight:800">Can't say the three sounds in a word</div>
        <div style="flex:1">Do the <b>sound-box page</b> on its own for a few days. It is the most basic task in the unit even though it sits third — segmenting comes before writing.</div></div>
        <div style="display:flex;gap:10pt;margin-bottom:6pt"><div style="flex:none;width:2.35in;font-weight:800">Reads it with the picture, not without</div>
        <div style="flex:1">The picture is doing the decoding. Cover the pictures on the first practice page and read the words again before moving on.</div></div>
        <div style="display:flex;gap:10pt"><div style="flex:none;width:2.35in;font-weight:800">Accurate but slow, sound by sound</div>
        <div style="flex:1">The sound is secure; blending speed is the gap. Re-read the same page daily for a week rather than adding new words.</div></div>
      </div>
    </div>
    <div style="background:var(--sunny);border-radius:15pt;padding:12pt 16pt;margin-top:11pt">
      <div style="font-weight:800;font-size:10.5pt;line-height:1.55">Every word in this unit uses the short <b>${u.v}</b> sound and
      nothing else — no other vowel leaks in — so a miss here means this sound, not a mix-up with the last tab.</div>
    </div>
    <div style="display:flex;gap:9pt;margin-top:11pt">
      <div class="card" style="flex:1;text-align:center;padding:12pt 8pt"><div style="font-family:'Luckiest Guy',cursive;font-size:20pt;color:${u.color};line-height:1.1">6</div><div style="font-size:9pt;font-weight:800;color:var(--grey)">practice pages</div></div>
      <div class="card" style="flex:1;text-align:center;padding:12pt 8pt"><div style="font-family:'Luckiest Guy',cursive;font-size:20pt;color:${u.color};line-height:1.1">10</div><div style="font-size:9pt;font-weight:800;color:var(--grey)">probe words</div></div>
      <div class="card" style="flex:1;text-align:center;padding:12pt 8pt"><div style="font-family:'Luckiest Guy',cursive;font-size:20pt;color:${u.color};line-height:1.1">4</div><div style="font-size:9pt;font-weight:800;color:var(--grey)">weeks of data</div></div>
      <div class="card" style="flex:1;text-align:center;padding:12pt 8pt"><div style="font-family:'Luckiest Guy',cursive;font-size:20pt;color:${u.color};line-height:1.1">8/10</div><div style="font-size:9pt;font-weight:800;color:var(--grey)">to move on</div></div>
    </div>`, `Unit ${n+1} · ${u.name}`, 'Bright Scholar · AI-Ready School'));

  // practice 1 pictures
  P.push(sheet(`
    <div class="eyebrow">${u.name} · practice 1 · with pictures</div>
    <h1 style="margin-top:3pt">Read it. Build it. Write it.</h1>
    <div class="sub">Say the word out loud. Push a letter into each box. Then write it on the line.</div>
    <div class="hdr3" style="margin-top:12pt"><span style="width:91pt">Read</span><span style="width:100pt">Build</span><span>Write</span></div>
    ${u.pics.map((w,i)=>wrow(i,w,true)).join('')}
    <div style="display:flex;gap:11pt;align-items:center;background:var(--teal);border-radius:15pt;padding:11pt 15pt;margin-top:9pt;color:#fff">
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="8.6"/><path d="M8.4 14s1.4 1.8 3.6 1.8S15.6 14 15.6 14"/><path d="M9 9.8h.01M15 9.8h.01"/></svg>
      <div style="font-weight:800;font-size:10.5pt">Challenge: pick two words and say a whole sentence for each, out loud.</div>
    </div>
    <div style="display:flex;gap:9pt;margin-top:9pt">
      <div class="card" style="flex:1;padding:11pt 14pt">
        <div style="font-family:'Fredoka',sans-serif;font-weight:600;font-size:11.5pt;color:var(--blue);margin-bottom:4pt">Color a star for each word you read on your own</div>
        <div style="display:flex;gap:7pt">${stars(6)}</div>
      </div>
      <div class="card" style="flex:none;width:2.05in;padding:11pt 13pt;text-align:center">
        <div style="font-size:9pt;font-weight:800;color:var(--grey)">Teacher tally</div>
        <div style="font-family:'Luckiest Guy',cursive;font-size:26pt;color:var(--blue);line-height:1.15">___ / 6</div>
      </div>
    </div>`, 'Name: ______________________  Date: ____________', `Bright Scholar · Unit ${n+1}`));

  // practice 2 no pictures
  P.push(sheet(`
    <div class="eyebrow">${u.name} · practice 2 · no picture clues</div>
    <h1 style="margin-top:3pt">Read it. Build it. Write it.</h1>
    <div class="sub">No pictures this time. Sound out each letter, then blend the whole word.</div>
    <div class="hdr3" style="margin-top:12pt"><span style="width:91pt">Read</span><span style="width:100pt">Build</span><span>Write</span></div>
    ${u.plain.map((w,i)=>wrow(i,w,false)).join('')}
    <div class="card" style="margin-top:9pt">
      <div style="font-family:'Fredoka',sans-serif;font-weight:600;font-size:12.5pt;color:var(--blue);margin-bottom:5pt">Write your own</div>
      <div style="font-size:10pt;font-weight:700;color:var(--grey)">Think of one more word with the short <b>${u.v}</b> sound. Write it and draw it.</div>
      <div style="display:flex;gap:10pt;margin-top:8pt;align-items:stretch">
        <div style="flex:1;border-bottom:2.5pt dotted #9FB2C2"></div>
        <div style="flex:none;width:1.5in;height:.8in;border:2pt dashed #9FB2C2;border-radius:10pt"></div>
      </div>
    </div>
    <div style="background:var(--sunny);border-radius:15pt;padding:11pt 15pt;margin-top:9pt">
      <div style="font-weight:800;font-size:10.5pt">Teacher note: if a student stalls here but flew through practice 1, the pictures
      were doing the decoding. Worth knowing — mark it on the data sheet.</div>
    </div>`, 'Name: ______________________  Date: ____________', `Bright Scholar · Unit ${n+1}`));

  // sound boxes
  const rows = u.sbox.map((_,i)=>`<div class="mrow"><div class="wnum">${i+1}</div>
    <div class="sbox"><div></div><div></div><div></div></div>
    <div style="flex:1;margin-left:10pt;font-size:10pt;font-weight:700;color:var(--grey)">say the sounds &nbsp;·&nbsp; then write the word &nbsp;
    <span style="display:inline-block;border-bottom:2.5pt dotted #9FB2C2;width:1.5in"></span></div></div>`).join('');
  P.push(sheet(`
    <div class="eyebrow">${u.name} · practice 3 · sound boxes</div>
    <h1 style="margin-top:3pt">Tap the sounds.</h1>
    <div class="sub">Your teacher says a word. Tap one box for each sound you hear, then write the letter in the box.</div>
    <div class="card" style="margin-top:11pt;padding:11pt 14pt">
      <div style="font-size:10pt;font-weight:800;color:var(--grey)">TEACHER — say these in order:</div>
      <div class="bank" style="margin-top:7pt;justify-content:flex-start">${u.sbox.map(W).join('')}</div>
    </div>
    <div style="margin-top:12pt">${rows}</div>
    <div style="display:flex;gap:11pt;align-items:center;background:var(--blue);border-radius:15pt;padding:11pt 15pt;margin-top:6pt;color:#fff">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"><path d="M4 12h4l3-4 3 8 3-4h3"/></svg>
      <div style="font-weight:800;font-size:10.5pt">Three boxes, three sounds. Every word in this binder has exactly three.</div>
    </div>
    <div class="card" style="margin-top:9pt">
      <div style="font-family:'Fredoka',sans-serif;font-weight:600;font-size:12.5pt;color:var(--blue)">Teacher note</div>
      <div style="font-size:10pt;line-height:1.55;margin-top:3pt">Tapping before writing separates two problems. Taps three sounds but
      writes the wrong letter → a <b>letter–sound</b> gap. Cannot tap three sounds at all → a <b>segmenting</b> gap, and the sounds come
      before the spelling. Note which one you saw; the Growth Eval asks.</div>
    </div>`, 'Name: ______________________  Date: ____________', `Bright Scholar · Unit ${n+1}`));

  // picture match
  P.push(sheet(`
    <div class="eyebrow">${u.name} · practice 4 · picture and word</div>
    <h1 style="margin-top:3pt">Which word matches?</h1>
    <div class="sub">Read the word bank. Write the word that matches each picture on the line underneath it.</div>
    <div class="card" style="margin-top:11pt;padding:12pt 14pt">
      <div style="font-size:10pt;font-weight:800;color:var(--grey);margin-bottom:7pt">WORD BANK</div>
      <div class="bank">${[...u.pics].reverse().map(W).join('')}</div>
    </div>
    <div class="grid3" style="margin-top:13pt">
      ${u.pics.map(w=>`<div class="card" style="padding:14pt 9pt;text-align:center">${icon(w,112)}
        <div style="border-bottom:2.5pt dotted #9FB2C2;height:22pt;margin:8pt 8pt 0"></div></div>`).join('')}
    </div>
    <div style="background:var(--sunny);border-radius:15pt;padding:11pt 15pt;margin-top:12pt">
      <div style="font-weight:800;font-size:10.5pt">Finished early? Turn the page over and draw one more short-${u.v} thing. Label it.</div>
    </div>`, 'Name: ______________________  Date: ____________', `Bright Scholar · Unit ${n+1}`));

  // word families
  const bank = u.fams.flatMap(f=>f[1]);
  P.push(sheet(`
    <div class="eyebrow">${u.name} · practice 5 · word families</div>
    <h1 style="margin-top:3pt">Sort by the ending.</h1>
    <div class="sub">Every word below ends in <b>${u.fams[0][0]}</b>, <b>${u.fams[1][0]}</b> or <b>${u.fams[2][0]}</b>. Read each one, then write it in the right column.</div>
    <div class="card" style="margin-top:11pt;padding:12pt 14pt">
      <div style="font-size:10pt;font-weight:800;color:var(--grey);margin-bottom:7pt">WORD BANK</div>
      <div class="bank">${bank.map(W).join('')}</div>
    </div>
    <div style="display:flex;gap:9pt;margin-top:13pt">
      ${u.fams.map(([lab],i)=>`<div class="col"><h3 style="color:${['var(--tomato)','var(--blue)','var(--leaf)'][i]}">${lab}</h3>${'<div class="slot"></div>'.repeat(4)}</div>`).join('')}
    </div>
    <div style="background:var(--teal);color:#fff;border-radius:15pt;padding:11pt 15pt;margin-top:12pt">
      <div style="font-weight:800;font-size:10.5pt">Four words go in each column. If a column has five, read them again — one is in the wrong place.</div>
    </div>
    <div class="card" style="margin-top:9pt">
      <div style="font-family:'Fredoka',sans-serif;font-weight:600;font-size:12.5pt;color:var(--blue)">Pick one word from each column and say it in a sentence.</div>
      <div style="display:flex;gap:9pt;margin-top:9pt">
        <div style="flex:1;border-bottom:2.5pt dotted #9FB2C2;height:24pt"></div>
        <div style="flex:1;border-bottom:2.5pt dotted #9FB2C2;height:24pt"></div>
        <div style="flex:1;border-bottom:2.5pt dotted #9FB2C2;height:24pt"></div>
      </div>
    </div>`, 'Name: ______________________  Date: ____________', `Bright Scholar · Unit ${n+1}`));

  // sentences
  const sentHtml = u.sents.map(parts => `<div class="sent">${parts.map(p =>
      /^[a-z]{3}$/.test(p) && p[1] === u.v ? W(p) : p).join(' ')}.</div>`).join('');
  P.push(sheet(`
    <div class="eyebrow">${u.name} · practice 6 · read a sentence</div>
    <h1 style="margin-top:3pt">Read it, then show it.</h1>
    <div class="sub">Read each sentence out loud. Circle every short-<b>${u.v}</b> word you find. Then draw what it says.</div>
    <div style="margin-top:12pt">${sentHtml}</div>
    <div style="display:flex;gap:9pt;margin-top:6pt">
      ${[1,2,3].map(i=>`<div class="card" style="flex:1;height:3.35in;padding:9pt"><div style="font-size:8.5pt;font-weight:800;color:var(--grey)">DRAW SENTENCE ${i}</div></div>`).join('')}
    </div>
    <div style="background:var(--sunny);border-radius:15pt;padding:11pt 15pt;margin-top:11pt">
      <div style="font-weight:800;font-size:10.5pt">Teacher note: small joining words like "the", "on", "my", "a", "to" are not CVC
      target words — they are there so the sentence works. Only the circled words are the target.</div>
    </div>
    <div class="card" style="margin-top:9pt">
      <div style="font-family:'Fredoka',sans-serif;font-weight:600;font-size:12.5pt;color:var(--blue)">Now write your own sentence with two short-${u.v} words.</div>
      <div style="border-bottom:2.5pt dotted #9FB2C2;height:26pt;margin-top:9pt"></div>
      <div style="border-bottom:2.5pt dotted #9FB2C2;height:26pt"></div>
    </div>`, 'Name: ______________________  Date: ____________', `Bright Scholar · Unit ${n+1}`));

  // probe student page
  P.push(sheet(`
    <div class="eyebrow">Unit ${n+1} probe · student page</div>
    <h1 style="margin-top:3pt">Read these ten words.</h1>
    <div class="sub">Point to each word and read it out loud. Your teacher will listen and mark their own sheet — you just read.</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:13pt;margin-top:14pt">
      ${u.probe.map(w=>`<div class="probeword w">${w}</div>`).join('')}
    </div>
    <div style="background:var(--ink);color:var(--cream);border-radius:15pt;padding:12pt 16pt;margin-top:12pt">
      <div style="font-weight:800;font-size:10.5pt;line-height:1.5">TEACHER: no prompts and no sounding-out help during the probe. Mark a
      word correct only if the student reads it accurately within about three seconds. Record on the data sheet, then use the Growth Eval.</div>
    </div>
    <div style="display:flex;gap:9pt;margin-top:10pt">
      <div class="card" style="flex:1;padding:12pt 14pt"><div style="font-size:9pt;font-weight:800;color:var(--grey)">DATE</div><div style="border-bottom:2.5pt dotted #9FB2C2;height:22pt;margin-top:5pt"></div></div>
      <div class="card" style="flex:1;padding:12pt 14pt"><div style="font-size:9pt;font-weight:800;color:var(--grey)">WEEK</div><div style="border-bottom:2.5pt dotted #9FB2C2;height:22pt;margin-top:5pt"></div></div>
      <div class="card" style="flex:1;padding:12pt 14pt;text-align:center"><div style="font-size:9pt;font-weight:800;color:var(--grey)">SCORE</div><div style="font-family:'Luckiest Guy',cursive;font-size:24pt;color:var(--blue);line-height:1.2">___ / 10</div></div>
    </div>`, 'Student page — hand this side to the child', `Bright Scholar · Unit ${n+1} probe`));

  // data sheet
  P.push(sheet(`
    <div class="eyebrow">${u.name} · progress monitoring</div>
    <h1 style="margin-top:3pt">Unit ${n+1} probe · data sheet</h1>
    <div class="sub">Ten words, read aloud, once a week. Circle each one read correctly. Score out of 10, then take the score to the Growth Eval.</div>
    <table class="dat" style="margin-top:11pt">
      <tr><th style="width:30%">Probe word</th><th>Week 1</th><th>Week 2</th><th>Week 3</th><th>Week 4</th></tr>
      ${u.probe.map(w=>`<tr><td>${w}</td><td class="c">○</td><td class="c">○</td><td class="c">○</td><td class="c">○</td></tr>`).join('')}
      <tr><td style="font-family:'Fredoka',sans-serif;color:var(--blue)">Score / 10</td><td class="c">___</td><td class="c">___</td><td class="c">___</td><td class="c">___</td></tr>
    </table>
    <div class="card" style="margin-top:11pt">
      <h2 style="font-size:13pt;margin-bottom:4pt">What did you notice? (the eval page uses this)</h2>
      <div style="font-size:10pt;color:var(--grey);font-weight:700">Which sound slipped · speed or accuracy · did the miss change week to week · did they self-correct</div>
      <div style="border-bottom:2pt dotted #9FB2C2;height:19pt;margin-top:8pt"></div>
      <div style="border-bottom:2pt dotted #9FB2C2;height:19pt"></div>
    </div>
    <div style="background:var(--sunny);border-radius:15pt;padding:11pt 15pt;margin-top:10pt">
      <div style="font-weight:800;font-size:10.5pt;line-height:1.55">Move-on signal: <b>8 of 10 across two probes in a row.</b> Mastery
      criteria in phonics commonly sit at 80–90% accuracy; we ask for 80% twice rather than 90% once, so a single good day does not look
      like mastery.</div>
    </div>`, 'Student: ______________________', `Bright Scholar · Unit ${n+1}`));
  return P;
}
module.exports = { UNITS, css, sheet, icon, W, stars, unitPages, wrow };
