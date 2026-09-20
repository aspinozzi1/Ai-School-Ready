const {P,esc}=require('./b1.js');

P('Task 5','<h2>The day roll-up</h2>',`
<p class="lede">One number per student per day, computed from the list task 4 just built &mdash; never
saved on its own.</p>
<div class="prompt"><div class="lbl">Prompt 5 &middot; earned over possible</div>
Add a day summary under the grid in the Score today tab. Count only the cells that have been scored
today for the selected student: add up the scores for "points earned," and multiply the number of
scored cells by 2 for "points possible." Show earned, possible, and the percentage, next to the daily
goal.
</div>
<div class="card t"><h3>Why "possible" is not just "blocks times expectations"</h3>
<p class="small" style="margin:0">A day where only nine of fifteen cells got scored &mdash; a fire
drill ate the afternoon, say &mdash; is not the same shape as a full day, and comparing its raw
percentage to a full day's is comparing two different things. Counting possible points only from cells
that were actually scored keeps the fraction honest on a short day. This is the failure mode on page
19 that this exact design choice prevents.</p></div>
<div class="card g"><h3>Task 5 is done when</h3><p class="small" style="margin:0">Scoring three cells
at level 2 for a student with nothing else scored shows "6 of 6" and 100%, not "6 of 30."</p></div>`);

P('Task 6','<h2>The week view</h2>',`
<div class="prompt"><div class="lbl">Prompt 6 &middot; five days, one table</div>
In the Week view tab: a table with one row per student and one column per weekday, Monday through
Friday, for the current week. Each cell shows that day's percentage from the roll-up in task 5, or a
dash if that day was not scored. Color a cell green if it meets the daily goal and a different color
if it does not. Add a week average column.
</div>
<div class="card t"><h3>What "the current week" should mean</h3>
<p class="small" style="margin:0">Ask for Monday through Friday of the week containing today. On a
weekend, that naturally shows last week's finished data rather than an empty week that has not started
&mdash; useful on a Sunday night, and worth asking for by name if the first version does not do it.</p></div>
<div class="card g"><h3>Task 6 is done when</h3><p class="small" style="margin:0">You can look at the
table and answer "is this student better than three weeks ago" without opening a single day &mdash;
the exact question a tally could never answer, now sitting in one row.</p></div>`);

P('Task 7','<h2>Export, and the habit that protects six weeks of work</h2>',`
<p class="lede">Everything this pack has built lives in one browser on one device. That is also its
only real weakness, and this task is the fix.</p>
<div class="prompt"><div class="lbl">Prompt 7 &middot; export and a weekly reminder</div>
In the Data and export tab: a button that downloads everything &mdash; the roster, expectations, goal,
and every dated entry &mdash; as a single file to my computer. Also: remember the date of the last
export, and show a visible message anywhere in the app if it has been seven days or more since the
last one, or if none has ever been done.
</div>
<div class="card r"><h3>Why this task is not optional</h3>
<p class="small" style="margin:0">A CICO card typically runs six to eight weeks. Clearing browser
data, a laptop replacement, or a school re-image wipes local storage completely and without warning
&mdash; and the whole value of this tool is the trend line across those weeks. <b>Pick a day &mdash; the
brief suggests Friday afternoon &mdash; and export every single week.</b> It takes ten seconds and the
app now tells you when you are overdue.</p></div>
<div class="card g"><h3>Task 7 is done when</h3><p class="small" style="margin:0">Clicking export
downloads a file you can find in your downloads folder, and the reminder message appears the first
time you open the app before ever exporting.</p></div>`);

P('Task 8','<h2>The printable day card</h2>',`
<div class="prompt"><div class="lbl">Prompt 8 &middot; one page, one child</div>
In the Print a card tab: a dropdown to choose a student and a button that opens the print dialog with
a single clean page showing that student's name or number, today's date, the scoring grid with today's
numbers, the day total, and two blank signature lines: one for the adult, one for "sent home." Hide
everything else on the page &mdash; tabs, buttons, colors &mdash; so only that content prints.
</div>
<div class="card t"><h3>Why this needs its own task instead of "just print the screen"</h3>
<p class="small" style="margin:0">A page built for a screen prints badly by default: tabs repeat, colors
waste ink, and buttons appear as dead shapes. A dedicated print view, built and tested separately, is
the difference between a page that looks fine on the laptop and a card that actually works stapled
inside a take-home folder.</p></div>
<div class="card g"><h3>Task 8 is done when</h3><p class="small" style="margin:0">Print preview shows
one page: the grid, the total, and the two signature lines &mdash; nothing else, no colors bleeding the
printer's ink for no reason.</p></div>`);

P('Task 9','<h2>The de-identified summary</h2>',`
<div class="prompt"><div class="lbl">Prompt 9 &middot; a copy safe to paste anywhere</div>
In the Data and export tab, below the export button: a button that builds a text summary of this
week, relabeling every student S1, S2, S3 and so on instead of their real number or initials, showing
each day's percentage and a week average, shown in a text box with a Copy button. Add a note saying
this version is the one to paste into an AI chat, and the version with real student numbers stays on
this device.
</div>
<div class="note"><b>This is the task that makes the rest of the pack responsible.</b><br>
Without it, the first time a teacher wants AI help spotting a pattern across a caseload, the real
roster is one paste away from a chat window. With it, the safe option is one click and sits right next
to the thing they were about to do. <b>Design the safe path to be the easy path</b> &mdash; the same
principle build 2 taught, applied to a record instead of a total.</div>
<div class="card g"><h3>Task 9 is done when</h3><p class="small" style="margin:0">The summary shows
S1, S2, S3 with real percentages, and you have checked by eye that no student number or initials
appears anywhere in the text box.</p></div>`);

P('Task 10','<h2>Colors, accessibility, and the shared-computer check</h2>',`
<div class="prompt"><div class="lbl">Prompt 10 &middot; make it yours, and make it safe on a shared machine</div>
Restyle the tracker with [your colors]. Then make sure everything works for someone using a keyboard
instead of a mouse: every tab, button and dropdown reachable with Tab, usable with Enter, with a
clearly visible outline on whatever is selected. Do not rely on color alone to show a score &mdash;
keep a number or a symbol on every cell as well as its color.
</div>
<div class="card r"><h3>The check this task adds that build 2 did not need</h3>
<p class="small" style="margin:0"><b>Browser storage is per browser profile, not per person.</b> A
substitute, a co-teacher, or a student using the same login on the same classroom machine can open
this tracker and see it. Before you rely on it: confirm the computer you use it on is signed into a
profile only you use, the same way you already treat a locked filing cabinet. This is the single
biggest hazard specific to this build, and it does not apply to a name picker or a class list.</p></div>
<div class="card t"><h3>How to check the keyboard part actually worked</h3>
<p class="small" style="margin:0">Put the mouse down. Press Tab repeatedly &mdash; a clear outline
should move between tabs, the dropdown, and every grid cell. Press Enter on a cell &mdash; it should
cycle its score. If either fails, say exactly that and ask again.</p></div>
<div class="card g"><h3>Task 10 is done when</h3><p class="small" style="margin:0">You can score a full
day using only the keyboard, and you have said out loud which computer this will live on and confirmed
it is not a shared login.</p></div>`);

P('Saving and using it','<h2>Out of the chat, into your room</h2>',`
<div class="card"><h3>1. Copy all of the code</h3><p class="small" style="margin:0">Use the copy button
on the code block. Selecting by hand usually misses the last line.</p></div>
<div class="card t"><h3>2. Paste into a plain text editor</h3><p class="small" style="margin:0">
Notepad, or TextEdit set to plain text. <b>Not Word</b> &mdash; it adds invisible formatting that stops
the file working.</p></div>
<div class="card g"><h3>3. Save as <code>behavior-tracker.html</code></h3><p class="small" style="margin:0">
On Windows set "Save as type" to All Files so it does not quietly become a .txt.</p></div>
<div class="card r"><h3>4. Put it somewhere you will find it, then leave it there</h3>
<p class="small" style="margin:0">Your saved records are tied to this file in this browser, on this
device. Pick its home now and do not move it between machines expecting the history to follow &mdash;
that is exactly what the weekly export from task 7 is for.</p></div>
<div class="note"><b>Make a bookmark.</b> Open the file, then bookmark it like any web page. Now
checking in is one click every morning, the same as any other tool on your bar.</div>`);

module.exports={};
