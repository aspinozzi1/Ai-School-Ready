const {P,esc,APP}=require('./b1.js');

P('Tasks 5 and 6','<h2>Groups and the timer</h2>',`
<div class="prompt"><div class="lbl">Prompt 5 &middot; group maker</div>
In the Make groups tab: a number box for group size (default 3) and a Make groups button. It shuffles the whole class properly and deals them into groups of that size, shown as cards side by side.<br><br>
&bull; Everybody must end up in a group. If the class does not divide evenly, the last group is smaller &mdash; never drop anyone.<br>
&bull; Use a proper shuffle, not sorting by a random number.
</div>
<div class="card t"><h3>Why that last line is there</h3>
<p class="small" style="margin:0">The common quick way to shuffle a list produces uneven results &mdash;
some arrangements come up far more often than others. Asking for a proper shuffle costs you nothing
and means your groups really are random. You do not need to know the algorithm; you just need to
have asked for it.</p></div>
<div class="prompt"><div class="lbl">Prompt 6 &middot; timer</div>
In the Timer tab: a big countdown in minutes and seconds, readable from the back of a classroom. Preset buttons for 1, 3, 5 and 10 minutes, plus Start and Pause. When it reaches zero it stops and turns red. It does not need to save between sessions.
</div>
<div class="card g"><h3>Done when</h3><p class="small" style="margin:0">Groups: everyone from your
class appears exactly once across the cards. Timer: it counts down, pauses, and turns red at zero.</p></div>`);

P('Tasks 7 and 8','<h2>Points, and the export that keeps you safe</h2>',`
<div class="prompt"><div class="lbl">Prompt 7 &middot; points</div>
In the Points tab: a table with one row per student showing their name, their total, and +1 and +5 buttons. Tapping a button adds to that student's total and saves straight away.
</div>
<div class="prompt"><div class="lbl">Prompt 8 &middot; the de-identified export</div>
In the Data and reset tab: a button that builds a copy of the points list with <b>every name replaced by S1, S2, S3</b> and so on, shown in a text box, plus a Copy button.<br><br>
Add a clear note on the page saying this de-identified version is the one to paste into an AI chat, and that the version with names should stay on this device.<br><br>
Also add two buttons that ask for confirmation first: Clear all points, and Erase everything.
</div>
<div class="note"><b>Task 8 is the one that makes the rest of it responsible.</b><br>
Without it, the first time you want AI help spotting a pattern you will be tempted to paste the real
list. With it, the safe option is one click and is right there next to the thing you were about to do.
<b>Design the safe path to be the easy path</b> &mdash; that is a principle worth carrying into
everything else you build.</p></div>
<div class="card g"><h3>Done when</h3><p class="small" style="margin:0">The export shows S1, S2, S3
with the right totals and <b>no name appears anywhere in it</b>. Check that by eye before you trust it.</p></div>`);

P('Tasks 9 and 10','<h2>Make it yours, and make it usable by everyone</h2>',`
<div class="prompt"><div class="lbl">Prompt 9 &middot; appearance</div>
Restyle it with [your colors] as the main colors. Make the picked name and the timer as large as will fit. Round the corners and give the panels a thick outline so it reads clearly from a distance.
</div>
<div class="prompt"><div class="lbl">Prompt 10 &middot; accessibility, and this is not optional</div>
Make sure everything works for someone using a keyboard instead of a mouse: every tab and button reachable with Tab, usable with Enter, with a clearly visible outline on whatever is selected. Do not rely on color alone to show state &mdash; include words. Give every icon-only button a label a screen reader can announce.
</div>
<div class="card t"><h3>How to check prompt 10 actually worked</h3>
<p class="small" style="margin:0">Put the mouse down. Press Tab repeatedly &mdash; a clear outline should
move between the tabs and buttons. Press Enter on one &mdash; it should activate. If either fails, say
exactly that and ask again. It takes a minute and it is the difference between a tool everyone in
your building can use and one that quietly excludes a colleague.</p></div>
<div class="card p"><h3>One more worth adding</h3>
<p class="small" style="margin:0">The small x that removes a student is an icon with no words. A
screen reader announces it as "button" unless you ask for a label. Prompt 10's last line is what
turns that into "Remove Ada".</p></div>`);

P('Saving and using it','<h2>Out of the chat, into your room</h2>',`
<div class="card"><h3>1. Copy all of the code</h3><p class="small" style="margin:0">Use the copy button
on the code block. Selecting by hand usually misses the last line.</p></div>
<div class="card t"><h3>2. Paste into a plain text editor</h3><p class="small" style="margin:0">
Notepad, or TextEdit set to plain text. <b>Not Word</b> &mdash; it adds invisible formatting that stops
the file working, and the failure is baffling when it happens.</p></div>
<div class="card g"><h3>3. Save as <code>dashboard.html</code></h3><p class="small" style="margin:0">
On Windows set "Save as type" to All Files so it does not quietly become a .txt.</p></div>
<div class="card r"><h3>4. Put it somewhere you will find it, then leave it there</h3>
<p class="small" style="margin:0"><b>This matters more than in build 1.</b> Your saved class list is
tied to this file in this browser. Pick its home now &mdash; desktop, documents, wherever &mdash; and do
not move it between machines expecting the data to follow.</p></div>
<div class="note"><b>Make a bookmark.</b> Open the file, then bookmark it like any web page. Now it
is one click every morning instead of a hunt through folders, and it will behave like any other tool
on your bar.</div>
<div class="card"><h3>Using it on the board</h3><p class="small" style="margin:0">Open it at the start
of the day and leave the tab open. Press Ctrl and plus (Command and plus on a Mac) a few times to
make everything bigger for the room.</p></div>`);

P('When it breaks','<h2>The seven things that actually go wrong</h2>',`
<div class="card r"><h3>1. It opens as a wall of code</h3><p class="small" style="margin:0">The file did
not save with <code>.html</code> on the end. Rename it. On Windows turn on file name extensions in
File Explorer's View menu so you can see what it really saved as.</p></div>
<div class="card"><h3>2. My class list vanished</h3><p class="small" style="margin:0">Almost always a
different browser, a private window, or a browser set to clear site data on exit. Check you are opening
it the same way you did before. <b>Nothing is lost</b> &mdash; you are looking in a different notebook.</p></div>
<div class="card t"><h3>3. It saves, but not on the school laptop</h3><p class="small" style="margin:0">
Some managed devices block local storage. If the app still works but forgets, that is the cause &mdash;
and it is why prompt 2 asked for it to keep working with empty data rather than crash. Ask your tech
team; it is usually a policy setting.</p></div>
<div class="card g"><h3>4. Fair mode picks someone twice</h3><p class="small" style="margin:0">Say:
<i>"Fair mode picked the same student twice before everyone had a turn. It should only choose from
students not yet picked this round."</i></p></div>
<div class="card"><h3>5. The group maker leaves someone out</h3><p class="small" style="margin:0">Say:
<i>"Three students were missing from the groups. Everyone must be placed, and the last group can be
smaller."</i></p></div>
<div class="card r"><h3>6. The export still shows names</h3><p class="small" style="margin:0"><b>Stop
and fix this before using it.</b> Say: <i>"The export still has real names in it. Every name must be
replaced with S1, S2, S3 before it is shown."</i> Then check by eye again.</p></div>
<div class="card p"><h3>7. It worked, then an edit broke it</h3><p class="small" style="margin:0">
Paste the part you changed into the chat and say "something in this is broken, find it." You do not
need to spot it yourself.</p></div>`);

module.exports={};
