const {P,esc,pages}=require('./b1.js');

/* 1 COVER */
pages.push(`<div class="sheet"><div class="bar"></div><div style="padding-top:26pt">
<div class="kick">Vibe Coding for Teachers &middot; Build 3 of the series</div>
<h1>Build a Behavior Tracker<br>That Keeps the History</h1>
<p class="lede">A daily point card for one student that scores three to five expectations across the
day, remembers every day it has ever seen, and turns six weeks of taps into a trend you can actually
read &mdash; not a total that resets and tells you nothing.</p>
<div class="row" style="margin:12pt 0">
<div class="card t" style="text-align:center"><h3 style="font-size:19pt;color:var(--blue)">10</h3><p class="small" style="margin:0">tasks, each one finished before the next</p></div>
<div class="card" style="text-align:center"><h3 style="font-size:19pt;color:var(--blue)">11</h3><p class="small" style="margin:0">prompts, written out in full</p></div>
<div class="card g" style="text-align:center"><h3 style="font-size:19pt;color:var(--blue)">1</h3><p class="small" style="margin:0">finished app, included</p></div>
</div>
<div class="note"><b>Build 2 taught the app to remember a value. This one teaches it to remember a
record.</b><br>
That is a genuinely different, harder idea, and it is the one that separates somebody who can
vibe-code a toy from somebody who can vibe-code a tool.</div>
<div class="card r"><h3>Where your data actually lives</h3>
<p class="small" style="margin:0">On your device, in your browser, and nowhere else. Nothing is
uploaded, synced, or readable by anyone else. Page 5 sets out exactly what that means for a dated
record about a named student &mdash; a stricter question than a class list, answered plainly.</p></div>
</div>
<div class="foot"><span>Built and audited by two certified teachers</span><span>Bright Scholar &middot; AI-Ready School</span></div>
<div class="barb"></div></div>`);

/* 2 WHAT YOU GET */
P('The finished thing, first','<h2>What you will have at the end</h2>',`
<p class="lede">A tool built around the point card most schools already use for a Tier 2 check-in,
check-out routine &mdash; morning check-in, scored through the day, checkout, a copy home. This build
does the recording and the summarizing. It does not decide the intervention; the team does that.</p>
<table>
<tr><th style="width:27%">Tab</th><th>What it does</th></tr>
<tr><td><b>Roster</b></td><td>Students by number or initials. No full-name field anywhere in this build.</td></tr>
<tr><td><b>Expectations</b></td><td>Three to five, in your own words. Edit them any time.</td></tr>
<tr><td><b>Score today</b></td><td>Time blocks down, expectations across. Tap a cell to cycle the score.</td></tr>
<tr><td><b>Week view</b></td><td>Five days per student, against the goal you set &mdash; a trend at a glance.</td></tr>
<tr><td><b>Print a card</b></td><td>One student, one page, ready for a backpack.</td></tr>
<tr><td><b>Data &amp; export</b></td><td>A weekly backup file, and a de-identified copy for asking AI to help spot a pattern.</td></tr>
</table>
<div class="card t"><h3>The real-world shape this fits</h3>
<p class="small" style="margin:0">Check-in, check-out (CICO) is, by the research literature, the most
frequently used Tier 2 behavior support in US schools: a student checks in with an adult, is scored on
a small set of expectations through the day, checks out, and a copy goes home &mdash; typically run for
six to eight weeks and reviewed on the data it produces. This pack does not teach CICO as an
intervention. It builds the card that any team using a structure like it would actually need.</p></div>`);

/* 3 WHY DIFFERENT */
P('Why this build matters','<h2>A tally tells you today. A record tells you the truth.</h2>',`
<p class="lede">Build 2's points tab keeps a running total per student and nothing else &mdash; no
dates, no history, no way to answer "is this better than three weeks ago." That is a tally. This
build is the step up from it.</p>
<div class="row">
<div class="card r"><h3>A tally</h3><p class="small" style="margin:0">One number per student that goes
up. Ask it "how was Tuesday?" and it has no answer &mdash; Tuesday was overwritten the moment Wednesday
happened.</p></div>
<div class="card g"><h3>A record</h3><p class="small" style="margin:0">A list of dated entries: this
student, this day, this time block, this expectation, this score. The day total, the week trend, and
everything else in this pack are <i>computed from that list</i> &mdash; they are never the thing being
saved.</p></div>
</div>
<div class="note"><b>Say this sentence to yourself before you open the chat.</b><br>
"I am not asking it to remember a number. I am asking it to remember a list of dated entries, and
compute the numbers from the list." That one sentence is the entire architectural idea in this pack,
and once you have built it here you can put it in anything: attendance, reading minutes, incident logs.</div>
<div class="card"><h3>Why a tally is the trap, not a shortcut</h3>
<p class="small" style="margin:0">Left to its own judgment, an AI chat will very often build the tally
&mdash; it is simpler and it looks finished sooner. It works fine for a week. Then a colleague asks
"is this better than last month" and there is no way to answer, because last month was never kept.
By the time a teacher notices, they own three weeks of data that cannot answer the one question the
whole tool exists for.</p></div>
<div class="card p"><h3>What this costs you</h3>
<p class="small" style="margin:0">One extra idea to hold in your head at task 4, and slightly more
code than a tally would need. That is the entire price for data that can actually answer a question
about the past. Task 4 walks it through slowly, once, and you will not need to think about it again
after that.</p></div>`);

/* 4 WHAT YOU NEED */
P('Before you start','<h2>What you need</h2>',`
<div class="card g"><h3>1. An AI chat</h3><p class="small" style="margin:0">Written with <b>Claude</b>
on screen. <b>ChatGPT and Gemini both work</b> &mdash; the prompts are plain English. Where a step
depends on the tool, it says so.</p></div>
<div class="card"><h3>2. A plain text editor</h3><p class="small" style="margin:0">Notepad, or TextEdit
set to plain text. Not Word.</p></div>
<div class="card t"><h3>3. A browser, and the same one each time</h3>
<p class="small" style="margin:0">Your saved records belong to the browser you used. Build it in
Chrome and it lives in Chrome. Open the same file in Edge later and it will look empty &mdash; nothing
is lost, you are looking in a different notebook. Page 19 covers this exact failure and what to say
when it happens.</p></div>
<div class="card r"><h3>What you do not need</h3><p class="small" style="margin:0">A server, a host,
a domain, an account, a subscription, a login for students, or anyone's permission for the version
built here.</p></div>
<div class="note"><b>Time:</b> 45&ndash;60 minutes the first time, in pieces if that suits you better
&mdash; the tasks are built to stop cleanly. Under 20 minutes once you have done it here before, because
you already know the one hard idea.</div>`);

/* 5 THE DATA RULE - the big one, stricter for this build */
P('Read this before you type a single score','<h2>The three tiers, made stricter for a behavior record</h2>',`
<p>The tier is decided by <b>where the data lives and who can reach it</b>, not by whether a name
appears &mdash; the same rule as every pack in this series. For this build the answer is stricter,
because <b>a dated behavior record about an identified child is more sensitive than a class roster.</b></p>
<div class="tier ok"><div class="n">1</div><div><h3>The card design</h3>
<p class="small" style="margin:0">The expectations, the goal percentage, the blank printable layout.
All teacher-authored, no student in it. <b>Build freely.</b></p></div></div>
<div class="tier mid"><div class="n">2</div><div><h3>Daily scores, by student number, on this device</h3>
<p class="small" style="margin:0">The app's home. Kept in this browser, on this device, transmitted
nowhere. The app defaults to student numbers rather than initials, and that default is the right
choice, not a setting to change.</p></div></div>
<div class="tier stop"><div class="n">3</div><div><h3>The moment those records leave the device</h3>
<p class="small" style="margin:0">Synced, emailed, dropped in a shared drive, pasted into a chatbot,
or opened on a computer somebody else signs into. <b>Stop and treat it as a conversation with your
district</b>, not a setting you flip.</p></div></div>
<div class="card t"><h3>One more line, specific to this build</h3>
<p class="small" style="margin:0">This tracker is <b>your own working record, not the school's record
of behavior.</b> If your district keeps an official behavior or IEP data system, that system is the
record of record. This tool is the fast, private, day-to-day version that feeds your own thinking
between the meetings where the official record gets updated.</p></div>
<div class="note"><b>So the rule is not "never track behavior on a computer."</b> It is: <b>records may
live locally, by student number, on your own device; they may not be published, synced, or pasted
into a chatbot.</b> The export tab exists so the safe route &mdash; a private backup file on your own
drive &mdash; is also the easy one.</div>
<p class="small"><b>Practical guidance, not legal advice.</b> FERPA, COPPA, your state law and your
district's policy are the authorities. If you are unsure, use a student number instead of initials
&mdash; the tracker works exactly the same either way.</p>`);

module.exports={};
