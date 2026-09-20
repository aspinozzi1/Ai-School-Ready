const {P,esc,APP}=require('./b1.js');

P('When it breaks','<h2>The six things that actually go wrong</h2>',`
<div class="card r"><h3>1. A different browser shows an empty tracker</h3><p class="small" style="margin:0">
Almost always a different browser, a private window, or a browser set to clear site data on exit.
Check you are opening the exact same file the exact same way as before. <b>Nothing is lost</b> &mdash;
you are looking in a different notebook. This is why the weekly export in task 7 exists.</p></div>
<div class="card"><h3>2. It saves, but not on the school laptop</h3><p class="small" style="margin:0">
Some managed devices restrict local storage by policy. If the app still works but forgets, that is the
cause, and it is exactly why task 4's prompt asked for it to keep working with empty data rather than
crash. Ask your tech team; it is usually a setting they can adjust.</p></div>
<div class="card t"><h3>3. Scoring every block for every child gets abandoned by week two</h3>
<p class="small" style="margin:0">This tool is built for one child's card at a time, three to five
expectations, a few taps &mdash; not a whole class scored every hour. If it feels slow, you are likely
using it for more students or more blocks than a point card is meant to hold. Say: <i>"Scoring takes
too long. Cut it down to what one adult can realistically do in the moment."</i></p></div>
<div class="card g"><h3>4. A day with fewer blocks scored looks unfairly low</h3><p class="small" style="margin:0">
This is the changing-denominator problem task 5 was built to prevent. If a percentage looks wrong on a
short day, check that "points possible" is counting only scored cells, not every cell on the grid. Say:
<i>"An unscored cell must not count as a zero in the daily percentage."</i></p></div>
<div class="card r"><h3>5. The de-identified summary still shows a real number or initials</h3>
<p class="small" style="margin:0"><b>Stop and fix this before sharing it anywhere.</b> Say: <i>"The
summary still has a real student number in it. Every student must be relabeled S1, S2, S3 before the
text is shown."</i> Then check it again by eye.</p></div>
<div class="card p"><h3>6. It worked, then an edit broke it</h3><p class="small" style="margin:0">
Paste the part you changed into the chat and say "something in this is broken, find it." You do not
need to spot it yourself, and you do not need to re-explain the whole app &mdash; the broken piece is
usually enough.</p></div>`);

P('What to build next','<h2>The same shape, and what going further would cost</h2>',`
<p class="lede">You now know how to make something remember a dated record instead of a total. That is
the hard part in this entire series, and it is reusable in the two builds still ahead.</p>
<table>
<tr><th style="width:30%">Build</th><th>What it stores</th><th style="width:14%">Tier</th></tr>
<tr><td><b>Reading log / fluency tracker</b></td><td>Minutes and levels per student per day, over a term.</td><td>2 local</td></tr>
<tr><td><b>Seating chart builder</b></td><td>Which name sits where, saved layouts over time.</td><td>2 local</td></tr>
<tr><td><b>Parent-facing class page</b></td><td>Agenda and links only. No student data at all.</td><td>1</td></tr>
</table>
<div class="note"><b>Notice the tier column says local, not "no names."</b> A reading log holding names
is fine for the same reason this tracker is: the data stays on your device. The tier is decided by
where the data lives and who else can reach it &mdash; the sentence this whole series keeps coming back
to.</div>
<div class="card r"><h3>What changes the moment any of this goes online</h3>
<p class="small" style="margin:0">The data stops living on your device and starts living on someone's
server. A link exists that could reach it. It becomes a system holding student records that your
district did not review, and you personally become responsible for something that is properly the
school's responsibility. Take it to your technology team as a proposal, with what it does and what data
it touches, rather than a surprise after the fact.</p></div>
<div class="card g"><h3>The middle option most teachers actually want</h3>
<p class="small" style="margin:0">Keep it local, and export weekly. If you want the same tracker on two
machines, you do not need syncing &mdash; you need the export file and five minutes at the start of a
new device. That is a small habit against a real compliance question, and for most people it is not a
close call.</p></div>`);

P('Appendix','<h2>Every prompt, in one place</h2>',`
<p class="small">Copy from here rather than retyping. Square brackets mean put your own thing in.</p>
<div class="prompt" style="padding:8pt 11pt"><div class="lbl">1 &middot; shell and roster</div><span class="small">Build me a behavior point tracker as one single HTML file. Six tabs: Roster, Expectations, Score today, Week view, Print a card, Data and export. Roster tab: add students one at a time by student number or initials &mdash; never a full name field &mdash; shown as a list with a remove button. Everything in one file, no internet, no login. Leave the other panels empty for now.</span></div>
<div class="prompt" style="padding:8pt 11pt"><div class="lbl">2 &middot; expectations</div><span class="small">Expectations tab: add one expectation at a time, shown as a list with a remove button, no fewer than one and no more than five. Add a "daily goal" percentage box, defaulting to 80.</span></div>
<div class="prompt" style="padding:8pt 11pt"><div class="lbl">3 &middot; the day grid</div><span class="small">Score today tab: a dropdown to choose a student, then a grid with three time blocks (Morning, Midday, Afternoon) as rows and the expectations as columns. Each cell is a button that cycles through no score, 2, 1, 0, and back to no score on each click.</span></div>
<div class="prompt" style="padding:8pt 11pt"><div class="lbl">4 &middot; saving a record, not a total</div><span class="small">Make it remember data between sessions using local storage on my device, no server, no account. Save the roster, expectations, goal, and every scored cell as its own dated entry (student, date, block, expectation, score) &mdash; never collapsed into a running total. Save automatically on every change; load on open; keep working with empty data if saving or loading fails; an unscored cell must never count as a zero.</span></div>
<div class="prompt" style="padding:8pt 11pt"><div class="lbl">5 &middot; the day roll-up</div><span class="small">Under the grid, show today's points earned and points possible for the selected student, counting only cells that have been scored (possible = scored cells &times; 2), plus the percentage next to the daily goal.</span></div>
<div class="prompt" style="padding:8pt 11pt"><div class="lbl">6 &middot; the week view</div><span class="small">Week view tab: one row per student, one column per weekday (Monday&ndash;Friday) of the current week, each cell showing that day's percentage or a dash if unscored, colored by whether it met the goal, plus a week average column.</span></div>
</div>`);

P('Appendix','<h2>The rest of the prompts</h2>',`
<div class="prompt" style="padding:8pt 11pt"><div class="lbl">7 &middot; export and the backup reminder</div><span class="small">Data and export tab: a button that downloads the roster, expectations, goal, and every dated entry as one file. Remember the last export date and show a visible reminder if it has been seven or more days, or if none has happened yet.</span></div>
<div class="prompt" style="padding:8pt 11pt"><div class="lbl">8 &middot; the printable card</div><span class="small">Print a card tab: choose a student, then print a single clean page with their number, today's date, today's scoring grid, the day total, and two signature lines (adult, sent home). Hide everything else on the page when printing.</span></div>
<div class="prompt" style="padding:8pt 11pt"><div class="lbl">9 &middot; de-identified summary</div><span class="small">Below the export button, a button that builds a text summary of this week relabeling every student S1, S2, S3 with their daily percentages and a week average, in a text box with a Copy button. Add a note that this version is safe to paste into an AI chat and the real version stays on this device.</span></div>
<div class="prompt" style="padding:8pt 11pt"><div class="lbl">10 &middot; appearance and accessibility</div><span class="small">Restyle with [your colors]. Make sure every tab, button and dropdown is reachable with Tab and usable with Enter, with a visible outline on the selected item. Never rely on color alone to show a score &mdash; keep a number or symbol on every cell too.</span></div>
<div class="prompt" style="padding:8pt 11pt"><div class="lbl">11 &middot; when something breaks</div><span class="small">Here is what I did and what happened: [what you clicked]. I expected [what should have happened]. Fix it and give me the whole file again.</span></div>
<div class="note"><b>Prompt 11 is the one you will use most often</b>, and it works exactly the same way
in every build in this series &mdash; describe the click, describe the expectation, ask for the whole
file back.</div>`);

const head=APP.replace(/\r/g,'');
const storage=head.slice(head.indexOf('/* ---- storage'), head.indexOf('function flash'));
P('The file','<h2>The part that keeps the shape</h2>',`
<p class="small">The complete tracker ships with this pack as <code>behavior-tracker.html</code> &mdash;
you do not need to type any of this. This is the piece worth reading, because the same shape belongs
in anything you build next that needs a history rather than a total.</p>
<div class="code" style="font-size:8pt;line-height:1.32">${esc(storage.trim())}</div>
<div class="card t"><h3>Reading it without knowing code</h3>
<p class="small" style="margin:0">Every entry is stored under a key built from the date, the student,
the block, and the expectation &mdash; so each dated fact gets its own slot instead of overwriting the
one before it. <code>load</code> hands back empty data if anything at all goes wrong reading storage;
<code>save</code> writes the whole object and quietly gives up rather than crashing if the browser
refuses. Both are wrapped in try and catch, which is task 4's instruction &mdash; keep working when
storage is unavailable &mdash; showing up as real code.</p></div>`);

P('For the teacher','<h2>How this pack is built</h2>',`
<div class="card"><h3>What we are claiming</h3><p class="small" style="margin:0">That these eleven
prompts, used with a current AI chat, produce a working behavior point tracker. Every prompt was run
and the resulting app was tested in a real browser before publication, including scoring a day,
closing the tab and reopening to confirm every entry survived, checking that an unscored cell never
counts as a zero, and confirming the de-identified summary contains no real student number.</p></div>
<div class="card r"><h3>What we are not claiming</h3><p class="small" style="margin:0">Not a behavior
intervention, not a replacement for your school's official behavior or IEP data system, and not a
recommendation to run check-in, check-out without your team's training and buy-in &mdash; this pack
builds the recording tool, never the intervention decision. And not legal advice about student data:
FERPA, COPPA, your state law and your district are the authorities.</p></div>
<div class="card t"><h3>An honest limitation</h3><p class="small" style="margin:0">Local storage is
tied to one browser on one device, and a managed school laptop may restrict it. That is a real
constraint, it is the same constraint that keeps the data private, and it is why task 7's weekly export
is not optional. AI tools also change; this pack teaches the loop and ships the finished file for
exactly that reason.</p></div>
<div class="card g"><h3>Sources</h3><p class="small" style="margin:0">Check-in, check-out as the
description of what a daily behavior point card is and how it is typically run draws on the published
Tier 2 behavior-support literature describing it as the most widely used targeted intervention of its
kind in US schools; this pack does not teach or endorse a specific program and never claims to replace
one. The build-your-own-classroom-tools framing continues from 2026 coverage of teachers building
their own hall passes, seating charts, and behavior trackers with AI, cited in builds 1 and 2 of this
series. Student privacy guidance follows FERPA and COPPA; the Future of Privacy Forum's <i>Educator's
Guide to Student Privacy</i> is a readable starting point. Not affiliated with any AI company, platform,
or behavior-support program.</p></div>
<div class="note"><b>Built and audited by two certified teachers.</b> Every prompt run, every task
completed in order, and the included app tested in a browser before this pack shipped.</div>`);

P('One last thing','<h2>If this was useful</h2>',`
<div class="card g" style="margin-top:12pt"><h3>Leaving feedback earns you credit</h3>
<p style="margin-bottom:6pt">TPT gives you credit toward future purchases every time you review
something you have downloaded. Go to <b>My Purchases</b>, find this pack, leave a rating and a
comment. It takes a minute and it comes back to you as money off the next thing you buy.</p>
<p class="small" style="margin:0">It also tells us what to build next, which is genuinely how these
decisions get made.</p></div>
<div class="card t"><h3>If something did not work</h3><p style="margin:0">Message us through TPT
before leaving a rating and we will fix it and re-upload the same day, and you keep the updated file
free. A prompt that stopped behaving is something we want to know about.</p></div>
<div class="note" style="margin-top:12pt"><b>What you can do now that you could not this morning:</b><br>
Build software that remembers a history, not just a moment &mdash; the same shape underneath a reading
log, an attendance record, or anything else that needs to answer "what happened, and when." The
tracker was the example. <b>The shape was the lesson.</b></div>
<div class="card" style="margin-top:12pt"><h3>Built and audited by two certified teachers</h3>
<p class="small" style="margin:0">Bright Scholar &middot; AI-Ready School</p></div>`);

module.exports={};
