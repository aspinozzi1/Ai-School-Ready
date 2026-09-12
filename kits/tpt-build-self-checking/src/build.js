/* Build-along: Make a Self-Checking Practice Activity.
   Fixed-height sheets so nothing can split across a page break. */
const fs = require('fs');
const path = require('path');

const ACT = fs.readFileSync(path.join(__dirname, 'practice-activity.html'), 'utf8');

const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

const FONTS = path.join(__dirname, '../../tooling/fonts/brand-fonts.css');

const css = `
@import url('file://${FONTS}');
:root{--ink:#17293B;--blue:#2D6CB5;--teal:#17BEBB;--sunny:#FFC43D;--tomato:#E4572E;
--cream:#FFFDF8;--leaf:#4CAF6D;--grape:#8367C7;--grey:#7A8B9A;--rule:#E3DCCD}
@page{size:Letter;margin:0}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Nunito',sans-serif;color:var(--ink);background:#fff;font-size:10.5pt;line-height:1.5}
.sheet{width:8.5in;height:11in;position:relative;overflow:hidden;
  page-break-after:always;background:var(--cream);padding:0.55in 0.6in 0.5in}
.sheet:last-child{page-break-after:auto}
.bar{position:absolute;top:0;left:0;right:0;height:13pt;
  background:linear-gradient(to right,var(--tomato) 0 25%,var(--sunny) 25% 50%,
  var(--teal) 50% 75%,var(--blue) 75% 100%)}
.barb{position:absolute;bottom:0;left:0;right:0;height:9pt;
  background:linear-gradient(to right,var(--blue) 0 25%,var(--teal) 25% 50%,
  var(--sunny) 50% 75%,var(--tomato) 75% 100%)}
.kick{font-family:'Fredoka',sans-serif;font-weight:600;font-size:8.5pt;letter-spacing:.13em;
  text-transform:uppercase;color:var(--teal);margin-bottom:4pt}
h1{font-family:'Luckiest Guy','Fredoka',sans-serif;font-weight:400;font-size:30pt;line-height:1.05;margin-bottom:9pt}
h2{font-family:'Fredoka',sans-serif;font-weight:700;font-size:16pt;color:var(--blue);margin-bottom:7pt}
h3{font-family:'Fredoka',sans-serif;font-weight:600;font-size:11.5pt;margin-bottom:3pt}
p{margin-bottom:7pt}
.lede{font-size:11.5pt;margin-bottom:9pt}
.small{font-size:9.5pt}
.card{background:#fff;border:2.5pt solid var(--ink);border-radius:13pt;padding:11pt 14pt;
  margin-bottom:9pt;box-shadow:4pt 4pt 0 var(--sunny)}
.card.t{box-shadow:4pt 4pt 0 var(--teal)}
.card.g{box-shadow:4pt 4pt 0 var(--leaf)}
.card.r{box-shadow:4pt 4pt 0 var(--tomato)}
.note{background:var(--ink);color:#fff;border-radius:13pt;padding:12pt 15pt;margin-bottom:9pt}
.note b{color:var(--sunny)}
.prompt{background:#fff;border:2.5pt dashed var(--blue);border-radius:11pt;
  padding:11pt 13pt;margin-bottom:9pt;font-family:'Nunito',sans-serif;font-size:9.5pt}
.prompt .lbl{font-family:'Fredoka',sans-serif;font-weight:700;font-size:8pt;letter-spacing:.1em;
  text-transform:uppercase;color:var(--blue);margin-bottom:5pt}
code,.code{font-family:'DejaVu Sans Mono','Courier New',monospace;font-size:8.5pt}
.code{background:#F4F1E8;border:1.5pt solid var(--rule);border-radius:9pt;
  padding:9pt 11pt;margin-bottom:8pt;white-space:pre-wrap;line-height:1.35}
table{width:100%;border-collapse:separate;border-spacing:0;margin-bottom:9pt}
th{font-family:'Fredoka',sans-serif;font-weight:700;font-size:9pt;text-align:left;
  background:var(--ink);color:#fff;padding:7pt 9pt}
th:first-child{border-radius:9pt 0 0 0}th:last-child{border-radius:0 9pt 0 0}
td{border-bottom:1.5pt solid var(--rule);padding:8pt 9pt;font-size:9.5pt;vertical-align:top}
tr:nth-child(even) td{background:#FFF8E8}
.foot{position:absolute;bottom:17pt;left:0.6in;right:0.6in;display:flex;
  justify-content:space-between;font-size:8pt;color:var(--grey)}
.tier{display:flex;gap:8pt;margin-bottom:9pt}
.tier .n{flex:none;width:26pt;height:26pt;border-radius:50%;background:var(--ink);color:#fff;
  font-family:'Fredoka',sans-serif;font-weight:700;font-size:13pt;display:flex;
  align-items:center;justify-content:center}
.tier.ok .n{background:var(--leaf)}.tier.mid .n{background:var(--sunny);color:var(--ink)}
.tier.stop .n{background:var(--tomato)}
.row{display:flex;gap:9pt}.row>*{flex:1}
`;

const pages = [];
const P = (kick, title, body, foot) => pages.push(
`<div class="sheet"><div class="bar"></div>
${kick ? `<div class="kick">${kick}</div>` : ''}
${title}
${body}
<div class="foot"><span>${foot || 'Build It Yourself · Self-Checking Practice Activity'}</span><span>Bright Scholar · AI-Ready School</span></div>
<div class="barb"></div></div>`);

/* 1 COVER */
pages.push(`<div class="sheet"><div class="bar"></div>
<div style="padding-top:34pt">
<div class="kick">Build It Yourself &middot; No Coding Background Needed</div>
<h1>Make a Self-Checking<br>Practice Activity</h1>
<p class="lede">Use an AI chat to build a practice activity your students click through
&mdash; it tells them right or wrong, explains why, and lets them try again. One file.
No login. No subscription. Works in any browser, on any device, offline.</p>
<div class="row" style="margin:12pt 0">
  <div class="card t" style="text-align:center"><h3 style="font-size:20pt;color:var(--blue)">29</h3><p class="small" style="margin:0">pages, start to finish</p></div>
  <div class="card" style="text-align:center"><h3 style="font-size:20pt;color:var(--blue)">9</h3><p class="small" style="margin:0">prompts, written out in full</p></div>
  <div class="card g" style="text-align:center"><h3 style="font-size:20pt;color:var(--blue)">1</h3><p class="small" style="margin:0">working file included</p></div>
</div>
<div class="note"><b>The finished activity comes with this pack.</b><br>
If you get stuck at any step, you still own a working tool you can use on Monday.
Open it, swap in your own questions, and it is yours.</div>
<div class="card r"><h3>Who this is for</h3>
<p class="small" style="margin:0">Teachers who already use AI for planning and want to go further &mdash;
from asking it to write things, to asking it to build things. You do not need to know
any code. You do need to be willing to read what comes back and say "not quite, try again."</p></div>
</div>
<div class="foot"><span>Built and audited by two certified teachers</span><span>Bright Scholar &middot; AI-Ready School</span></div>
<div class="barb"></div></div>`);

/* 2 WHAT YOU GET */
P('The finished thing, first', '<h1 style="font-size:24pt">What you will have<br>at the end</h1>', `
<p class="lede">Before any instruction, here is the thing you are building, so you know
whether it is worth your evening.</p>
<div class="card t"><h3>A student opens one file and sees:</h3>
<table style="margin-top:6pt">
<tr><th style="width:34%">What they do</th><th>What happens</th></tr>
<tr><td>Read a question</td><td>Plain text, as many questions as you want &mdash; five or fifty.</td></tr>
<tr><td>Click an answer</td><td>Wrong: the choice grays out, and the activity says try again. Nothing is lost.</td></tr>
<tr><td>Click again</td><td>Right: the choice turns green and a sentence explains <i>why</i> it is right.</td></tr>
<tr><td>Keep going</td><td>A counter tracks how many they got on the first try &mdash; not how many guesses they made.</td></tr>
<tr><td>Finish</td><td>A summary panel, and a button to run the whole set again.</td></tr>
</table></div>
<div class="card"><h3>What it does not do, on purpose</h3>
<p class="small" style="margin:0">It does not ask for a name. It does not ask for a login. It does not send
anything anywhere. It does not keep a record after the browser tab closes. Every one of
those is a deliberate choice, and page 4 explains why it matters more than it sounds.</p></div>
<div class="note"><b>Why build it rather than buy it?</b><br>
Because the question bank is yours. The vocabulary list you actually taught, the
misconceptions your class actually has, the four problems that came up on Tuesday.
No purchased activity knows those.</div>`);

/* 3 WHAT YOU NEED */
P('Before you start', '<h2>What you need &mdash; all free</h2>', `
<div class="card g"><h3>1. An AI chat</h3>
<p class="small" style="margin:0">This pack is written with <b>Claude</b> on screen, because it is
reliably good at producing a single working file and showing it to you straight away.
<b>ChatGPT and Gemini both work too</b> &mdash; the prompts are plain English and are not
tied to one product. Where a step depends on the specific tool, it says so.</p></div>
<div class="card"><h3>2. A text editor you already have</h3>
<p class="small" style="margin:0">Notepad on Windows, TextEdit on a Mac (switch it to plain text
under Format), or the free editor of your choice. You are only ever saving text and
double-clicking it. Nothing gets installed.</p></div>
<div class="card t"><h3>3. A browser</h3>
<p class="small" style="margin:0">Chrome, Edge, Safari, Firefox &mdash; any of them. This is where
your activity runs. Not a website, not an account: a file on your computer that the
browser knows how to open.</p></div>
<div class="card r"><h3>What you do <i>not</i> need</h3>
<p class="small" style="margin:0">A coding class. A paid subscription. Permission from anyone,
for the version built in this pack. A web host. A domain name. Any prior experience.</p></div>
<div class="note"><b>Time:</b> about 40 minutes the first time, most of it reading.
Ten minutes the second time. Under five once it is a habit &mdash; that is the real prize here.</div>`);

/* 4 THE DATA RULE */
P('Read this before you build anything', '<h2>The three-tier rule for student data</h2>', `
<p>This page is first because it shapes what you build, not because it is paperwork. The
activity in this pack sits entirely in Tier 1. Knowing the tiers is what lets you build the
next thing safely.</p>
<div class="tier ok"><div class="n">1</div><div>
<h3>Content you wrote yourself</h3>
<p class="small" style="margin:0">Questions, word lists, problems, examples, explanations. No student
appears in it at all. <b>Build freely. Nobody needs to approve this.</b> Everything in this pack is Tier 1.</p></div></div>
<div class="tier mid"><div class="n">2</div><div>
<h3>De-identified student data</h3>
<p class="small" style="margin:0">Scores and patterns with every identifier removed &mdash; "S1, S2, S3",
or "a 3rd grader scored 6 of 10, missed every word with a blend." Useful, and safe
<i>if the identifiers never go in</i>. Keep the roster key on paper or in your district's own
system. The tool only ever sees S1.</p></div></div>
<div class="tier stop"><div class="n">3</div><div>
<h3>Data that can be traced to a child</h3>
<p class="small" style="margin:0">Names, class rosters, grades tied to a person, IEP details,
anything a stranger could match to one student. <b>Stop and ask your district.</b> This is not a
thing to stand up on a personal account, however convenient it would be.</p></div></div>
<div class="note"><b>The moment it goes wrong is almost always the same one.</b><br>
You have a working Tier 2 tool. It shows S1, S2, S3. And you think: "I just need the names
so I can tell who is who." That single step moves you from Tier 2 to Tier 3. Keep the key
somewhere else and the tool stays safe.</div>
<p class="small"><b>This is practical guidance, not legal advice.</b> FERPA, COPPA, your state law
and your district's own policy are the actual authorities. Check your district's policy before
any tool touches real student information.</p>`);

/* 5 THE METHOD */
P('How this actually works', '<h2>The loop</h2>', `
<p class="lede">Building with an AI chat is not one magic instruction. It is a short loop you
run four or five times. Once you see the loop, every other build in the series is the same.</p>
<div class="row">
<div class="card t"><h3>1 &middot; Describe</h3><p class="small" style="margin:0">Say what you want in plain
sentences. Be specific about what the <i>student</i> does, not about how it should be coded.</p></div>
<div class="card"><h3>2 &middot; Look</h3><p class="small" style="margin:0">Open what it made. Click it like a
student would &mdash; including clicking the wrong answer on purpose.</p></div>
</div>
<div class="row">
<div class="card g"><h3>3 &middot; Say what is off</h3><p class="small" style="margin:0">In one sentence.
"When I click a wrong answer it does nothing." You do not need to know why.</p></div>
<div class="card r"><h3>4 &middot; Repeat</h3><p class="small" style="margin:0">Three or four rounds gets you
something genuinely usable. It is a conversation, not a command.</p></div>
</div>
<div class="note"><b>The one habit that separates people who get this working from people who
give up:</b> describe the <i>behavior you saw</i>, not the fix you imagine.
"It says correct even when I pick the wrong one" gets you further than
"change the if statement", especially when you do not know what an if statement is.</div>
<div class="card"><h3>A fair warning</h3>
<p class="small" style="margin:0">The first thing it gives you is rarely the thing you want. That is
normal and it is not you failing. Every build in this series assumes three or four rounds.
Budget for them and the whole process stops being frustrating.</p></div>`);

module.exports = { css, pages, P, esc, ACT };
