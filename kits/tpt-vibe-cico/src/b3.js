const {P,esc}=require('./b1.js');

P('The method','<h2>Ten tasks, and how each one ends</h2>',`
<p class="lede">Every task below finishes with something you can see working. If it does not work,
you do not move on &mdash; you say what went wrong and ask again. That is the whole discipline.</p>
<div class="task"><div class="n">1</div><div><h3>The shell and the roster</h3><p class="small" style="margin:0">Student numbers or initials &mdash; never names. A class that lists but does not survive yet.</p></div></div>
<div class="task"><div class="n">2</div><div><h3>Name the expectations</h3><p class="small" style="margin:0">Three to five, in your own words. Editable later.</p></div></div>
<div class="task"><div class="n">3</div><div><h3>The day grid</h3><p class="small" style="margin:0">Time blocks down, expectations across. A day scored in under a minute.</p></div></div>
<div class="task"><div class="n">4</div><div><h3>Make it remember</h3><p class="small" style="margin:0"><b>The one that matters.</b> A shape, not a number. Close the tab, reopen, today's scores are still there.</p></div></div>
<div class="task"><div class="n">5</div><div><h3>The day roll-up</h3><p class="small" style="margin:0">Points earned over points possible &mdash; against a goal you set.</p></div></div>
<div class="task"><div class="n">6</div><div><h3>The week view</h3><p class="small" style="margin:0">Five days side by side. A trend you can see without doing arithmetic.</p></div></div>
<div class="task"><div class="n">7</div><div><h3>Export and the backup habit</h3><p class="small" style="margin:0">A file on your own drive, and a reason you will actually do it weekly.</p></div></div>
<div class="task"><div class="n">8</div><div><h3>The printable day card</h3><p class="small" style="margin:0">One page, one child, ready for a backpack.</p></div></div>
<div class="task"><div class="n">9</div><div><h3>The de-identified summary</h3><p class="small" style="margin:0">Every identifier replaced, ready to paste into AI.</p></div></div>
<div class="task"><div class="n">10</div><div><h3>Colors, accessibility, and the shared-computer check</h3><p class="small" style="margin:0">A tool that works on the classroom machine, for the person who owns it.</p></div></div>
<div class="note"><b>Stop wherever you like.</b> A tracker with tasks 1 through 5 done is already a
working daily point card. Say so, so you start.</div>`);

P('Task 1','<h2>The shell and the roster</h2>',`
<div class="prompt"><div class="lbl">Prompt 1 &middot; the shell and the roster</div>
Build me a behavior point tracker as one single HTML file I can save and open in a browser.<br><br>
It has six tabs across the top: Roster, Expectations, Score today, Week view, Print a card, and Data
and export. Clicking a tab shows that panel and hides the others.<br><br>
In the Roster tab: a text box and an Add button for adding one student at a time, shown afterward as
a list with a small remove button on each. The box is labeled "Student number or initials" &mdash;
never a full name field.<br><br>
Requirements:<br>
&bull; Everything in ONE file &mdash; styling and code included. No internet, no login, no account.<br>
&bull; Big text and big buttons; a teacher will use this at a desk, not across a room.<br>
&bull; Leave the other five panels empty for now with just their names in them.<br>
&bull; Nothing is sent anywhere and nothing asks for a password.
</div>
<div class="card r"><h3>That "never a full name field" line is not a style choice</h3>
<p class="small" style="margin:0">A dated behavior record is more sensitive than a class list, and
this pack's whole privacy posture depends on the roster never holding one. Say it in the prompt so the
model does not default to "Student name" out of habit.</p></div>
<div class="card g"><h3>Task 1 is done when</h3><p class="small" style="margin:0">You can click all
six tabs and watch the panel change, and you can add a student to the roster and see them appear in a
list. Nothing needs to save yet &mdash; that is task 4.</p></div>`);

P('Task 2','<h2>Name the expectations</h2>',`
<p class="lede">Every point card is scored against a short, specific list &mdash; the same three to
five things, every block, every day. Naming them well is most of the design work.</p>
<div class="prompt"><div class="lbl">Prompt 2 &middot; the expectations</div>
In the Expectations tab: a text box and an Add button for adding one expectation at a time, shown as a
list with a remove button on each. Allow no fewer than one and no more than five. Also add a number box
for "daily goal" as a percentage, defaulting to 80.
</div>
<div class="card t"><h3>Write these in your own words, not a behaviorist's</h3>
<p class="small" style="margin:0">"Followed directions the first time," "kept hands and feet to
self," "used a calm voice" &mdash; short, positive, specific enough that you and a substitute would
score the same moment the same way. Vague expectations ("behaved well") make every score a guess.</p></div>
<div class="card"><h3>Why cap it at five</h3><p class="small" style="margin:0">More than five
expectations turns a thirty-second check-in into a form, and the tool stops getting used by week two
&mdash; the same failure mode as scoring too many blocks, covered on page 19. Five is already generous;
most real point cards use three or four.</p></div>
<div class="card g"><h3>Task 2 is done when</h3><p class="small" style="margin:0">You can add, see, and
remove expectations, a sixth is refused with a message rather than silently accepted, and the goal box
holds a percentage.</p></div>`);

P('Task 3','<h2>The day grid</h2>',`
<div class="prompt"><div class="lbl">Prompt 3 &middot; the scoring grid</div>
In the Score today tab: a dropdown to choose which student you are scoring, and below it a grid with
time blocks as rows and the expectations as columns. Use three time blocks: Morning, Midday, Afternoon.
Each cell is a button. Clicking a cell cycles it through no score, 2, 1, 0, and back to no score, and
shows the current value.
</div>
<div class="card t"><h3>Why a tap-to-cycle button beats a dropdown per cell</h3>
<p class="small" style="margin:0">A teacher scoring a real student mid-lesson has three to five
seconds, not thirty. One tap per cell, repeated until the number they want shows, is the fastest input
shape there is for a small fixed set of values. A dropdown or a typed number is slower for exactly the
same result.</p></div>
<div class="card"><h3>What 2, 1 and 0 mean</h3><p class="small" style="margin:0">This follows the scale
most point cards already use: <b>2</b> met the expectation, <b>1</b> needed a reminder, <b>0</b> did
not meet it this block. You are not required to use this scale &mdash; say so in the prompt if your
school's card uses something else, like a smiley scale or a 1&ndash;5 range.</p></div>
<div class="card g"><h3>Task 3 is done when</h3><p class="small" style="margin:0">With one student
selected, you can tap through a full grid of blocks and expectations and watch each cell's number
change. Nothing needs to survive a reload yet.</p></div>`);

P('Task 4 &mdash; the important one','<h2>Make it remember &mdash; a shape, not a number</h2>',`
<p class="lede">Everything else in this build is ordinary. This is the step that makes it software,
and it is harder than build 2's version of the same idea.</p>
<div class="prompt"><div class="lbl">Prompt 4 &middot; saving a record, not a total</div>
Now make this tracker remember its data between sessions, using the browser's local storage on my own
device. Nothing should be sent to a server and there should be no account.<br><br>
Save the roster, the expectations, the goal, and <b>every scored cell as its own dated entry</b>: which
student, which date, which time block, which expectation, and what score. Do not collapse these into a
running total &mdash; keep every entry, tagged with its own date, so a day two weeks ago can still be
looked up on its own.<br><br>
Important:<br>
&bull; Save whenever anything changes, automatically. I should never press a Save button.<br>
&bull; Load whatever was saved when the page opens.<br>
&bull; If saving or loading fails for any reason, the app must still work with empty data rather than
showing an error or a blank screen.<br>
&bull; Only a scored cell should count in any later total &mdash; an unscored cell must not count as a
zero.
</div>
<div class="card t"><h3>Read that fourth bullet again</h3>
<p class="small" style="margin:0">It is the same idea as build 2's failure-case instruction, and it
matters even more here: a managed school device can restrict local storage, and a private window
blocks it outright. Without this line the app can crash on open. With it, the worst case is a blank
day &mdash; annoying, not broken, and nothing already saved is lost.</p></div>`);

P('Task 4, continued','<h2>The test that proves it kept the shape</h2>',`
<div class="card g"><h3>Do this exactly</h3>
<p class="small" style="margin-bottom:5pt">1. Score two or three cells for one student today.<br>
2. <b>Close the tab completely.</b> Not refresh &mdash; close it.<br>
3. Open the file again and select the same student.</p>
<p class="small" style="margin:0"><b>Today's scores should still be there, exactly as you left them.</b>
If they are, you have built an application that remembers a record. If they are not, task 4 is not
finished and nothing in tasks 5 through 9 will produce a trustworthy number.</p></div>
<div class="prompt"><div class="lbl">If the test fails</div>
I closed the tab and reopened the file, and my scores were gone. Every scored cell should have been
saved as its own dated entry to local storage on this device and loaded again when the page opens. Fix
that and give me the whole file back.
</div>
<div class="prompt"><div class="lbl">A second test worth running, once the first one passes</div>
Score one student for today, then change your computer's clock forward one day and score them again.
Go back to today's date in the app if it lets you, or just check tomorrow. Confirm both days show up
separately in whatever you build in task 6 &mdash; if only the most recent day appears, it is still
keeping a total, not a record, and that is worth catching now rather than in week three.
</div>
<div class="note"><b>Do not move past this page until the first test passes.</b> Every later task reads
from the same saved list. Debugging the week view while also debugging whether entries persist at all
is much harder than confirming persistence on its own, once, here.</div>`);

module.exports={};
