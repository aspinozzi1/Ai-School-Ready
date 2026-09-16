const {P,esc}=require('./b1.js');

P('The method','<h2>Ten tasks, and how each one ends</h2>',`
<p class="lede">Every task below finishes with something you can see working. If it does not work,
you do not move on &mdash; you say what went wrong and ask again. That is the whole discipline.</p>
<div class="task"><div class="n">1</div><div><h3>Build the shell</h3><p class="small" style="margin:0">Six tabs that switch. Nothing in them yet.</p></div></div>
<div class="task"><div class="n">2</div><div><h3>Make it remember</h3><p class="small" style="margin:0"><b>The one that matters.</b> Close the tab, reopen, data still there.</p></div></div>
<div class="task"><div class="n">3</div><div><h3>The class list</h3><p class="small" style="margin:0">Add and remove students. Survives a reload.</p></div></div>
<div class="task"><div class="n">4</div><div><h3>The fair picker</h3><p class="small" style="margin:0">Random, but nobody twice until everyone has had a turn.</p></div></div>
<div class="task"><div class="n">5</div><div><h3>Groups</h3><p class="small" style="margin:0">Properly shuffled, everybody placed, no leftovers dropped.</p></div></div>
<div class="task"><div class="n">6</div><div><h3>Timer</h3><p class="small" style="margin:0">Readable from the back of the room.</p></div></div>
<div class="task"><div class="n">7</div><div><h3>Points</h3><p class="small" style="margin:0">Tap to add; totals save as you go.</p></div></div>
<div class="task"><div class="n">8</div><div><h3>The de-identified export</h3><p class="small" style="margin:0">The safety feature, and the bridge to asking AI for help.</p></div></div>
<div class="task"><div class="n">9</div><div><h3>Make it yours</h3><p class="small" style="margin:0">Your colors, your wording.</p></div></div>
<div class="task"><div class="n">10</div><div><h3>Make it usable by everyone</h3><p class="small" style="margin:0">Keyboard, contrast, screen readers.</p></div></div>
<div class="note"><b>Stop wherever you like.</b> A dashboard with tasks 1 to 4 done is already
better than most of what is installed on your school laptop. The rest can wait for next weekend.</div>`);

P('Task 1','<h2>Build the shell</h2>',`
<div class="prompt"><div class="lbl">Prompt 1 &middot; the shell</div>
Build me a classroom dashboard as one single HTML file I can save and open in a browser.<br><br>
It has six tabs across the top: Class list, Pick a student, Make groups, Timer, Points, and Data and reset. Clicking a tab shows that panel and hides the others.<br><br>
Requirements:<br>
&bull; Everything in ONE file &mdash; styling and code included. No internet, no login, no account.<br>
&bull; Big text and big buttons; this gets used on a board at the front of a room.<br>
&bull; Leave each panel empty for now with just its name in it. I am going to fill them in one at a time.<br>
&bull; Nothing is sent anywhere and nothing asks for a password.
</div>
<div class="card g"><h3>Task 1 is done when</h3><p class="small" style="margin:0">You can click all
six tabs and watch the panel underneath change. That is all. Do not add anything else yet &mdash;
building one piece at a time is what stops the conversation tying itself in knots later.</p></div>
<div class="card r"><h3>If it gave you several files</h3><p class="small" style="margin:0">Say:
<i>"Put all of that into one single HTML file so I only have one thing to save."</i></p></div>`);

P('Task 2 &mdash; the important one','<h2>Make it remember</h2>',`
<p class="lede">Everything else in this build is ordinary. This is the step that makes it software.</p>
<div class="prompt"><div class="lbl">Prompt 2 &middot; saving</div>
Now make this dashboard remember its data between sessions, using the browser's local storage on my own device. Nothing should be sent to a server and there should be no account.<br><br>
Keep everything in one saved object: the class list, the points for each student, and which students have already been picked.<br><br>
Important:<br>
&bull; Save whenever anything changes, automatically. I should never press a Save button.<br>
&bull; Load whatever was saved when the page opens.<br>
&bull; If saving or loading fails for any reason, the app must still work with empty data rather than showing an error or a blank screen.<br>
&bull; Show a small "Saved" confirmation so I can see it happening.
</div>
<div class="card t"><h3>Why that fourth bullet is in there</h3>
<p class="small" style="margin:0">Local storage can be switched off. A private window blocks it, some
managed school devices restrict it, and a browser set to clear site data will wipe it. Without that
instruction the app can crash on open. With it, the worst case is an empty class list &mdash; annoying,
not broken. <b>Asking for the failure case is the single most useful habit in this whole series.</b></p></div>`);

P('Task 2, continued','<h2>The test that proves it</h2>',`
<div class="card g"><h3>Do this exactly</h3>
<p class="small" style="margin-bottom:5pt">1. Type a name into the class list. Any name.<br>
2. <b>Close the tab completely.</b> Not refresh &mdash; close it.<br>
3. Open the file again.</p>
<p class="small" style="margin:0"><b>The name should still be there.</b> If it is, you have built an
application. If it is not, task 2 is not finished and nothing after this point will work properly.</p></div>
<div class="prompt"><div class="lbl">If the test fails</div>
I closed the tab and reopened the file, and my data was gone. It should have been saved to local storage on this device and loaded again when the page opens. Fix that and give me the whole file back.
</div>
<div class="note"><b>Do not move past this page until the test passes.</b> Every later task saves
something, and debugging saving while also debugging a points tracker is much harder than debugging
saving on its own. This is the one place in the build where patience genuinely pays.</div>
<div class="card"><h3>A thing worth knowing</h3>
<p class="small" style="margin:0">Your data belongs to <i>that file in that browser</i>. Move the file
to a different folder and it usually still works; open it in a different browser and it starts fresh.
Nothing is lost &mdash; you are looking in a different notebook.</p></div>`);

P('Task 3','<h2>The class list</h2>',`
<div class="prompt"><div class="lbl">Prompt 3 &middot; the roster</div>
In the Class list tab: a text box and an Add button. Typing a name and pressing Add, or pressing Enter, adds that student to a list shown as rounded chips underneath, each with a small x to remove it.<br><br>
&bull; Adding or removing saves straight away.<br>
&bull; Refuse duplicates and say so, rather than adding the same name twice.<br>
&bull; Removing a student also removes their points and their pick history.<br>
&bull; Show a running count underneath: "24 students".
</div>
<div class="card t"><h3>That third bullet is not fussiness</h3>
<p class="small" style="margin:0">When a child moves away mid-year and you delete them, their points
should go too. Without that instruction their total sits in storage forever and shows up in your
export months later. <b>Say what should happen to the data when something is deleted</b> &mdash; it is
the kind of thing an AI will not decide sensibly on its own.</p></div>
<div class="card g"><h3>Task 3 is done when</h3><p class="small" style="margin:0">You can add your
real class, reload the page, and they are all still there. At this point the thing is genuinely
useful even with four tabs still empty.</p></div>`);

P('Task 4','<h2>The fair picker</h2>',`
<p class="lede">The one feature here that most bought tools get wrong.</p>
<div class="prompt"><div class="lbl">Prompt 4 &middot; fair random</div>
In the Pick a student tab: a big Pick button that shows one student's name in large text.<br><br>
Add a checkbox called "Fair mode", on by default. When fair mode is on, remember who has already been picked and only choose from students who have not been picked yet. When everyone has had a turn, start a fresh round automatically.<br><br>
Underneath, show how many students are still to be picked this round. The pick history saves with everything else.
</div>
<div class="card t"><h3>Why this matters more than it sounds</h3>
<p class="small" style="margin:0">Truly random means the same three children answer everything while
two are never asked all week &mdash; and you will not notice, because each individual pick looked fair.
Fair mode makes participation even by design instead of by your memory. <b>It is the single most
defensible thing in this dashboard if a colleague asks why you built your own.</b></p></div>
<div class="card g"><h3>Task 4 is done when</h3><p class="small" style="margin:0">With three names on
the list, three picks give you three different students, and the counter goes 2, then 1, then 0 &mdash;
and the fourth pick starts a new round.</p></div>`);

module.exports={};
