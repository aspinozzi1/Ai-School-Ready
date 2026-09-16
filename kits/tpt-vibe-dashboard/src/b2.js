const {P,esc,pages}=require('./b1.js');

/* 1 COVER */
pages.push(`<div class="sheet"><div class="bar"></div><div style="padding-top:30pt">
<div class="kick">Vibe Coding for Teachers &middot; Build 2 of the series</div>
<h1>Build a Classroom<br>Dashboard That Remembers</h1>
<p class="lede">One file that runs your room: a class list, a fair name picker, a group maker,
a timer and a points tracker &mdash; and it still knows all of it tomorrow morning. No login,
no subscription, no account, nothing uploaded anywhere.</p>
<div class="row" style="margin:12pt 0">
<div class="card t" style="text-align:center"><h3 style="font-size:19pt;color:var(--blue)">10</h3><p class="small" style="margin:0">tasks, each one finished before the next</p></div>
<div class="card" style="text-align:center"><h3 style="font-size:19pt;color:var(--blue)">12</h3><p class="small" style="margin:0">prompts, written out in full</p></div>
<div class="card g" style="text-align:center"><h3 style="font-size:19pt;color:var(--blue)">1</h3><p class="small" style="margin:0">finished app, included</p></div>
</div>
<div class="note"><b>This is the one that turns a page into software.</b><br>
The difference between an activity and an application is that an application <i>remembers</i>.
Task 2 is where that happens, and once you have done it once you can put it in anything you build.</div>
<div class="card r"><h3>Where your data actually lives</h3>
<p class="small" style="margin:0">On your device, in your browser, and nowhere else. It is not
uploaded, not synced, and not readable by us or anyone else. Page 5 explains exactly what that
means for putting student names in &mdash; including the moment it stops being true.</p></div>
</div>
<div class="foot"><span>Built and audited by two certified teachers</span><span>Bright Scholar &middot; AI-Ready School</span></div>
<div class="barb"></div></div>`);

/* 2 WHAT YOU GET */
P('The finished thing, first','<h2>What you will have at the end</h2>',`
<p class="lede">Six tools in one file. Open it on the board in the morning and leave it open all day.</p>
<table>
<tr><th style="width:27%">Tab</th><th>What it does</th></tr>
<tr><td><b>Class list</b></td><td>Type your students once. It is still there next week, next term, until you clear it.</td></tr>
<tr><td><b>Pick a student</b></td><td>Random, but with <b>fair mode</b>: nobody gets picked twice until everybody has had a turn.</td></tr>
<tr><td><b>Make groups</b></td><td>Random groups of any size, properly shuffled, everyone placed.</td></tr>
<tr><td><b>Timer</b></td><td>One, three, five or ten minutes, big enough to read from the back.</td></tr>
<tr><td><b>Points</b></td><td>Tap to add. Totals save as you go.</td></tr>
<tr><td><b>Data and reset</b></td><td>Copy your points with the names stripped out, for when you want AI help spotting a pattern. Plus an end-of-year erase.</td></tr>
</table>
<div class="card t"><h3>The fair picker is worth the build on its own</h3>
<p class="small" style="margin:0">Pure random means the same three children answer everything and
two never get asked. Fair mode keeps a list of who has already been picked and only draws from the
rest &mdash; then starts a fresh round when everyone has had a turn. It is four lines of logic and it
changes who talks in your room.</p></div>`);

/* 3 WHY DIFFERENT */
P('Why this build matters','<h2>The difference between a page and an app</h2>',`
<p class="lede">Build 1 in this series made an activity. This one makes software. One idea
separates them.</p>
<div class="row">
<div class="card r"><h3>A page</h3><p class="small" style="margin:0">Forgets everything the moment
it closes. Fine for a practice activity a student does once. Useless for anything you want to keep
using &mdash; you would type your class list in every single morning.</p></div>
<div class="card g"><h3>An app</h3><p class="small" style="margin:0">Writes what it knows into the
browser's own storage on your device. Close the tab, shut the laptop, come back Thursday: still
there.</p></div>
</div>
<div class="note"><b>The technical name is local storage, and that is nearly all you need to know
about it.</b><br>
It is a small notebook the browser keeps for each file on your own machine. Your app writes to it;
nothing else can read it; it never leaves the device. No server, no account, no internet.</div>
<div class="card"><h3>Why this is the safe option as well as the useful one</h3>
<p class="small" style="margin:0">Every other way of making something remember involves sending data
somewhere &mdash; a database, an account, someone's cloud. Local storage is the one option where the
question "who else can see this?" has the answer "nobody". For a tool holding a class list, that is
not a small detail. It is the whole reason this design is the right one.</p></div>
<div class="card p"><h3>What it cannot do, honestly</h3>
<p class="small" style="margin:0">It is tied to that browser on that device. Open the file on a
different laptop and it starts empty. That is a real limit, and it is the same limit that makes it
private. Page 18 covers what changing it would cost.</p></div>`);

/* 4 WHAT YOU NEED */
P('Before you start','<h2>What you need</h2>',`
<div class="card g"><h3>1. An AI chat</h3><p class="small" style="margin:0">Written with <b>Claude</b>
on screen. <b>ChatGPT and Gemini both work</b> &mdash; the prompts are plain English. Where a step
depends on the tool, it says so.</p></div>
<div class="card"><h3>2. A plain text editor</h3><p class="small" style="margin:0">Notepad, or TextEdit
set to plain text. Not Word.</p></div>
<div class="card t"><h3>3. A browser, and the same one each time</h3>
<p class="small" style="margin:0"><b>This matters more here than in build 1.</b> Your saved data
belongs to the browser you used. Build it in Chrome and it lives in Chrome. Open the same file in
Edge later and it will look empty &mdash; nothing is lost, you are just looking in a different notebook.</p></div>
<div class="card r"><h3>What you do not need</h3><p class="small" style="margin:0">A server, a host,
a domain, an account, a subscription, or anyone's permission for the version built here.</p></div>
<div class="note"><b>Time:</b> about an hour the first time, in ten-minute pieces if that suits you
better &mdash; the tasks are built to stop cleanly. Under twenty minutes once you have done it once.</div>`);

/* 5 THE DATA RULE - the big one */
P('Read this before you type a single name','<h2>The three tiers, and the names question</h2>',`
<p>Build 1 avoided student data entirely. This one cannot &mdash; a name picker needs names. So here is
the honest version, which is more useful than a rule that says never.</p>
<div class="tier ok"><div class="n">1</div><div><h3>Content you wrote</h3>
<p class="small" style="margin:0">Questions, timers, group sizes. No student in it. <b>Build freely.</b></p></div></div>
<div class="tier mid"><div class="n">2</div><div><h3>De-identified student data</h3>
<p class="small" style="margin:0">S1, S2, S3 and their scores. The dashboard's export tab produces
exactly this. <b>Safe to paste into an AI chat</b> because nobody can be identified from it.</p></div></div>
<div class="tier stop"><div class="n">3</div><div><h3>Data traceable to a child</h3>
<p class="small" style="margin:0">Names, and anything attached to them. <b>Whether this is fine or a
problem depends entirely on where it lives.</b> That is the point of this page.</p></div></div>
<div class="card t"><h3>The same names, two completely different situations</h3>
<table style="margin-top:6pt;margin-bottom:0">
<tr><th style="width:50%">This file on your laptop</th><th>The same file hosted online</th></tr>
<tr><td>Saves only to your browser. Nothing transmitted. No account. No link anyone could visit. About as exposed as the class list in your planner.</td>
<td>Now reachable by a URL. Now a record held somewhere, by software your district did not review. <b>Now a conversation with your district, not a setting you flip.</b></td></tr>
</table></div>
<div class="note"><b>So the rule is not "never use names."</b> It is: <b>names may live locally on your
own device; they may not be published, synced, or pasted into a chatbot.</b> The dashboard is built
that way on purpose, and the export tab exists so you never have to break it.</div>
<p class="small"><b>Practical guidance, not legal advice.</b> FERPA, COPPA, your state law and your
district's policy are the authorities. If you are unsure, use student numbers instead of names &mdash;
the dashboard works exactly the same.</p>`);

module.exports={};
