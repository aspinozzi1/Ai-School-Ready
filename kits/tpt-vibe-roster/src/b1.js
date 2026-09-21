const fs=require('fs'),path=require('path');
const APP=fs.readFileSync(path.join(__dirname,'roster.html'),'utf8');
const SQL=fs.readFileSync(path.join(__dirname,'schema.sql'),'utf8');
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const F=path.join(__dirname,'../../tooling/fonts/brand-fonts.css');
const css=`@import url('file://${F}');
:root{--ink:#17293B;--blue:#2D6CB5;--teal:#17BEBB;--sunny:#FFC43D;--tomato:#E4572E;
--cream:#FFFDF8;--leaf:#4CAF6D;--grape:#8367C7;--grey:#7A8B9A;--rule:#E3DCCD}
@page{size:Letter;margin:0}*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Nunito',sans-serif;color:var(--ink);background:#fff;font-size:10.5pt;line-height:1.5}
.sheet{width:8.5in;height:11in;position:relative;overflow:hidden;page-break-after:always;
  background:var(--cream);padding:0.55in 0.6in 0.5in}
.sheet:last-child{page-break-after:auto}
.sheet.stu{background:#fff}
.bar{position:absolute;top:0;left:0;right:0;height:13pt;background:linear-gradient(to right,
  var(--tomato) 0 25%,var(--sunny) 25% 50%,var(--teal) 50% 75%,var(--blue) 75% 100%)}
.barb{position:absolute;bottom:0;left:0;right:0;height:9pt;background:linear-gradient(to right,
  var(--blue) 0 25%,var(--teal) 25% 50%,var(--sunny) 50% 75%,var(--tomato) 75% 100%)}
.kick{font-family:'Fredoka',sans-serif;font-weight:600;font-size:8.5pt;letter-spacing:.13em;
  text-transform:uppercase;color:var(--teal);margin-bottom:4pt}
.kick.stu{color:var(--grape)}
h1{font-family:'Luckiest Guy','Fredoka',sans-serif;font-weight:400;font-size:29pt;line-height:1.05;margin-bottom:9pt}
h2{font-family:'Fredoka',sans-serif;font-weight:700;font-size:16pt;color:var(--blue);margin-bottom:7pt}
h3{font-family:'Fredoka',sans-serif;font-weight:600;font-size:11.5pt;margin-bottom:3pt}
p{margin-bottom:7pt}.lede{font-size:11.5pt;margin-bottom:9pt}.small{font-size:9.5pt}
.card{background:#fff;border:2.5pt solid var(--ink);border-radius:13pt;padding:11pt 14pt;
  margin-bottom:9pt;box-shadow:4pt 4pt 0 var(--sunny)}
.card.t{box-shadow:4pt 4pt 0 var(--teal)}.card.g{box-shadow:4pt 4pt 0 var(--leaf)}
.card.r{box-shadow:4pt 4pt 0 var(--tomato)}.card.p{box-shadow:4pt 4pt 0 var(--grape)}
.note{background:var(--ink);color:#fff;border-radius:13pt;padding:12pt 15pt;margin-bottom:9pt}
.note b{color:var(--sunny)}
.prompt{background:#fff;border:2.5pt dashed var(--blue);border-radius:11pt;padding:11pt 13pt;
  margin-bottom:9pt;font-size:9.5pt}
.prompt .lbl{font-family:'Fredoka',sans-serif;font-weight:700;font-size:8pt;letter-spacing:.1em;
  text-transform:uppercase;color:var(--blue);margin-bottom:5pt}
code{font-family:'DejaVu Sans Mono',monospace;font-size:8.5pt}
table{width:100%;border-collapse:separate;border-spacing:0;margin-bottom:9pt}
th{font-family:'Fredoka',sans-serif;font-weight:700;font-size:9pt;text-align:left;
  background:var(--ink);color:#fff;padding:7pt 9pt}
th:first-child{border-radius:9pt 0 0 0}th:last-child{border-radius:0 9pt 0 0}
td{border-bottom:1.5pt solid var(--rule);padding:8pt 9pt;font-size:9.5pt;vertical-align:top}
tr:nth-child(even) td{background:#FFF8E8}
.foot{position:absolute;bottom:17pt;left:0.6in;right:0.6in;display:flex;
  justify-content:space-between;font-size:8pt;color:var(--grey)}
.row{display:flex;gap:9pt}.row>*{flex:1}
.wl{border-bottom:1.5pt solid var(--rule);height:26pt;margin-bottom:6pt}
.wl.tall{height:38pt}
.box{border:2.5pt solid var(--ink);border-radius:11pt;padding:9pt 11pt;margin-bottom:8pt;background:#fff}
.day{display:flex;gap:9pt;align-items:flex-start;margin-bottom:8pt}
pre{font-family:'DejaVu Sans Mono',monospace;font-size:8pt;line-height:1.45;
  background:var(--ink);color:#F4F1E8;border-radius:9pt;padding:9pt 11pt;margin-bottom:9pt;
  white-space:pre-wrap;word-break:break-word}
pre b{color:var(--sunny);font-weight:400}
pre i{color:#9FB3C6;font-style:normal}
.sql{background:#0E1B27}
.step{display:flex;gap:9pt;align-items:flex-start;margin-bottom:8pt}
.step .n{flex:none;width:26pt;height:26pt;border-radius:50%;background:var(--blue);color:#fff;
  font-family:'Fredoka',sans-serif;font-weight:700;font-size:11pt;text-align:center;
  line-height:26pt}
.day .n{flex:none;width:52pt;border-radius:8pt;background:var(--blue);color:#fff;
  font-family:'Fredoka',sans-serif;font-weight:700;font-size:9pt;text-align:center;padding:5pt 2pt}
`;
const pages=[];
const P=(kick,title,body,stu)=>pages.push(`<div class="sheet${stu?' stu':''}"><div class="bar"></div>
${kick?`<div class="kick${stu?' stu':''}">${kick}</div>`:''}${title}${body}
<div class="foot"><span>${stu?'Class Roster · build it yourself':'Build a Roster That Cannot Store Last Names'}</span><span>Bright Scholar · AI-Ready School</span></div>
<div class="barb"></div></div>`);
module.exports={css,pages,P,esc,APP,SQL};
