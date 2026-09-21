const {P,pages}=require('./b1.js');

/* COVER */
pages.push(`<div class="sheet"><div class="bar"></div><div style="padding-top:26pt">
<div class="kick">Vibe Coding for Teachers &middot; the real-software tier</div>
<h1>Build a Roster That<br>Cannot Store Last Names</h1>
<p class="lede">Twelve tasks. At the end you have a class roster that lives in a real database,
opens on any computer you own, and <b>physically cannot hold a student's surname</b> &mdash;
because the database itself refuses one.</p>
<div class="row" style="margin:12pt 0">
<div class="card t" style="text-align:center"><h3 style="font-size:19pt;color:var(--blue)">12</h3><p class="small" style="margin:0">tasks, each ending in something that works</p></div>
<div class="card" style="text-align:center"><h3 style="font-size:19pt;color:var(--blue)">2</h3><p class="small" style="margin:0">working files included</p></div>
<div class="card g" style="text-align:center"><h3 style="font-size:19pt;color:var(--blue)">$0</h3><p class="small" style="margin:0">to run it, at classroom size</p></div>
</div>
<div class="note"><b>This is the step up from a single file, and it is a real step.</b><br>
Everything in this line so far saves to one computer. This one has a database behind it, so the
same roster is there on your laptop, on the classroom desktop, and on the machine in the back
room. That is the thing a one-file tool cannot do, and it is why a tool that cannot hold a
roster cannot run a course.</div>
<div class="card r"><h3>You do not need a coding background &mdash; you do need ninety minutes</h3>
<p class="small" style="margin:0">Nothing is installed. There is no build step and no npm. You
paste one file into a web page once, and everything after that happens in a browser.</p></div>
<div class="card p" style="margin-top:2pt"><h3>Inside</h3>
<p class="small" style="margin:0">Twelve tasks with the exact prompts written out in full
&middot; the six failures you will actually hit and the sentence that fixes each &middot; the
finished roster app and its database file, both included &middot; an honest page about the key
in your file and who can read your data &middot; and the page that tells you when you have
outgrown a one-file tool.</p></div>
</div>
<div class="foot"><span>Built and audited by two certified teachers</span><span>Bright Scholar &middot; AI-Ready School</span></div>
<div class="barb"></div></div>`);

/* THE ARC */
P('Before you begin','<h2>The twelve tasks at a glance</h2>',`
<p class="lede">Each task ends somewhere you can see. If a task does not reach its end point,
do not move on &mdash; everything after it assumes that one worked.</p>
<table>
<thead><tr><th style="width:26pt">#</th><th>Task</th><th>Ends with</th></tr></thead>
<tbody>
<tr><td>1</td><td>Decide what this tool will never know</td><td>One sentence, written down</td></tr>
<tr><td>2</td><td>Make the database</td><td>A project URL and a key</td></tr>
<tr><td>3</td><td>The two tables</td><td>Tables that exist</td></tr>
<tr><td>4</td><td><b>The line that makes the wrong thing impossible</b></td><td>The database refusing a surname</td></tr>
<tr><td>5</td><td>A page that talks to it</td><td>Your class list on screen</td></tr>
<tr><td>6</td><td>Shorten in the browser, before it sends</td><td>A live preview as you type</td></tr>
<tr><td>7</td><td>Paste a whole roster at once</td><td>A class added in one go</td></tr>
<tr><td>8</td><td>Two students, same short name</td><td>Both of them, kept apart</td></tr>
<tr><td>9</td><td>Prove it to yourself</td><td>A refusal you triggered on purpose</td></tr>
<tr><td>10</td><td>Print it</td><td>A clipboard-ready list</td></tr>
<tr><td>11</td><td>The de-identified copy</td><td>S1, S2, S3 on your clipboard</td></tr>
<tr><td>12</td><td>What happens in June</td><td>A deletion you can actually do</td></tr>
</tbody></table>
<div class="card t"><h3>Stop anywhere after task 6</h3>
<p class="small" style="margin:0">A roster that lists your class and refuses surnames is already
useful. Tasks 7 to 12 make it pleasant. Nobody has to finish a unit to get value out of it.</p></div>`);

/* WHY THIS TIER */
P('Why this one is different','<h2>When one file stops being enough</h2>',`
<p class="lede">Every build in this line so far produces a single page that saves to the computer
it is open on. That is the right shape for most classroom tools, and it is the wrong shape for
this one.</p>
<table>
<thead><tr><th>&nbsp;</th><th>A single file</th><th>What you are building here</th></tr></thead>
<tbody>
<tr><td><b>Where data lives</b></td><td>In one browser, on one machine</td><td>In a database you own</td></tr>
<tr><td><b>Second computer</b></td><td>Starts empty</td><td>Same roster, already there</td></tr>
<tr><td><b>If the browser is cleared</b></td><td>Everything is gone</td><td>Nothing is gone</td></tr>
<tr><td><b>Setup</b></td><td>Open the file</td><td>About ninety minutes, once</td></tr>
<tr><td><b>Cost</b></td><td>Nothing</td><td>Nothing, at classroom size</td></tr>
<tr><td><b>Honest risk</b></td><td>You lose your data</td><td>Somebody else could read it</td></tr>
</tbody></table>
<div class="note"><b>The sentence a one-file tool cannot say:</b> a tool that cannot hold a roster
cannot run a course. The moment you want the same list of students in front of two different
machines &mdash; or want it to still exist after a district IT refresh wipes browser data &mdash;
you have outgrown one file, and no amount of cleverness inside that file fixes it.</div>
<div class="card r"><h3>And the honest cost, on page one rather than buried</h3>
<p class="small" style="margin:0">Putting data on a server means somebody other than you could
reach it. That is a real trade and this pack does not pretend otherwise &mdash; it is the whole
reason the build is shaped the way it is. There is a full page on exactly who can read your
roster and what they would see.</p></div>`);

/* THE ONE IDEA */
P('The one idea','<h2>Three layers, and none of them trusts the others</h2>',`
<p class="lede">Most software protects student data by being careful. Careful software has a bad
day eventually. This one is built so the bad day is boring.</p>
<div class="step"><div class="n">1</div><div><h3>The browser shortens the name</h3>
<p class="small" style="margin:0">You paste <code>Anthony Spinozzi</code>. Before anything is
sent anywhere, the page turns it into <code>Anthony S.</code> The surname never leaves the
computer you typed it on.</p></div></div>
<div class="step"><div class="n">2</div><div><h3>The database refuses the long form</h3>
<p class="small" style="margin:0">One line of the table definition says what a name is allowed to
look like. Send <code>Anthony Spinozzi</code> anyway &mdash; by accident, by a bug, by pasting into
the wrong box &mdash; and the database rejects it. Not a warning. A refusal.</p></div></div>
<div class="step"><div class="n">3</div><div><h3>There is nowhere to put one</h3>
<p class="small" style="margin:0">No column in the whole database is for a last name. Even if
somebody wanted to store one, there is no shelf to put it on.</p></div></div>
<div class="note"><b>Each layer is independent, and that is the entire point.</b><br>
Layer 1 is code you wrote, so it can have a bug. Layer 2 is a rule the database enforces whatever
your code does. Layer 3 is the shape of the thing itself. For a surname to end up stored, all
three have to fail at once &mdash; and they fail in different ways for different reasons.</div>
<div class="card g"><h3>Why this is worth doing properly once</h3>
<p class="small" style="margin:0">You can reuse this pattern in everything you build afterwards.
Decide what the tool must never know, then make it structurally unable to know it. That habit is
worth more than any single tool in this series.</p></div>`);

/* WHAT YOU NEED */
P('What you need','<h2>Before task 1</h2>',`
<div class="card"><h3>A free Supabase account</h3>
<p class="small" style="margin:0">Supabase gives you a Postgres database with a free tier that
is far larger than a roster will ever need. No card. You will make one project and never touch
the billing page. <b>Sign up with your own address, not a school one</b> &mdash; this is your
tool, and a district account can be closed out from under you.</p></div>
<div class="card t"><h3>An AI chat you are signed in to</h3>
<p class="small" style="margin:0">Any of them. You will paste prompts and read what comes back.
You are the one at the keyboard for all of it.</p></div>
<div class="card g"><h3>A browser, and somewhere to keep one file</h3>
<p class="small" style="margin:0">The roster page is a single HTML file that lives in your own
Drive or Documents folder. <b>It is never published to the web</b>, and there is a page later
explaining exactly why that matters.</p></div>
<div class="card r"><h3>What you do not need</h3>
<p class="small" style="margin:0">Node, npm, a terminal, a deploy pipeline, a domain, a credit
card, or permission from anybody &mdash; you are building a tool for your own classroom out of
your own class list, the same as a spreadsheet.</p></div>
<div class="note"><b>One honest warning about time.</b> Task 2 is account setup and it is the
dullest ninety seconds in the pack. Tasks 3 and 4 are where it gets interesting. If you only have
twenty minutes today, do tasks 1 to 4 &mdash; that is the part worth the evening.</div>`);

module.exports={};
