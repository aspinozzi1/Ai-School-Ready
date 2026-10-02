const {P,pages}=require('./s1.js');

/* ------------------------------------ 14 day four student page: the three */
P('Day 4 &middot; student page','<h2>Three fixes, and the evidence for each</h2>',`
<p class="small">You get three. Not four. For each one, write <b>what to change</b> as an instruction
somebody else could follow, then <b>who got stuck</b> and <b>how many out of how many.</b> A fix with
an empty evidence box does not count.</p>
<div class="box"><h3>Fix 1</h3>
<p class="small" style="margin-bottom:3pt"><b>Change this:</b></p><div class="wl"></div>
<p class="small" style="margin-bottom:3pt"><b>Because I watched:</b></p><div class="wl"></div>
<p class="small" style="margin:0"><b>How many testers hit it:</b> ______ out of ______</p></div>
<div class="box"><h3>Fix 2</h3>
<p class="small" style="margin-bottom:3pt"><b>Change this:</b></p><div class="wl"></div>
<p class="small" style="margin-bottom:3pt"><b>Because I watched:</b></p><div class="wl"></div>
<p class="small" style="margin:0"><b>How many testers hit it:</b> ______ out of ______</p></div>
<div class="box"><h3>Fix 3</h3>
<p class="small" style="margin-bottom:3pt"><b>Change this:</b></p><div class="wl"></div>
<p class="small" style="margin-bottom:3pt"><b>Because I watched:</b></p><div class="wl"></div>
<p class="small" style="margin:0"><b>How many testers hit it:</b> ______ out of ______</p></div>
<div class="card t"><h3>Is a fix written well enough?</h3>
<p class="small" style="margin-bottom:4pt"><b>"Make it clearer" is not a fix.</b> "When a booking is
made, show a green message saying Booked, with the day and time in it" is. Could a stranger do what
you wrote without asking you one question?</p>
<p class="small" style="margin-bottom:3pt"><b>The fix I had to give up, and why it lost:</b></p>
<div class="wl"></div></div>`,1);

/* ------------------------------------------------------------ 15 day five */
P('Day 5 &middot; teacher','<h2>Fix one live &mdash; then test it again</h2>',`
<p class="lede">Thirty minutes, split in half. The first half is the fix. <b>The second half is the
part almost nobody does</b>, and it is the reason this unit exists.</p>
<div class="step"><div class="n">1</div><div><h3>Read the fix out, from their sheet (2 minutes)</h3>
<p class="small" style="margin:0">A student reads the chosen fix aloud as written, with the evidence
after it. <b>You type what they wrote</b>, not an improved version of it. If the instruction is too
vague for the AI to act on, that is a finding about the instruction, and the room should see you hit
it.</p></div></div>
<div class="step"><div class="n">2</div><div><h3>Prompt on the board (10 minutes)</h3>
<p class="small" style="margin:0">Prompts are written out in full on the next page. Project the chat.
<b>Let it go wrong where they can see</b> &mdash; the recovery is more useful than a clean first
try, and the class watching you say "no, that is not what we asked for" is the whole lesson about
who is in charge.</p></div></div>
<div class="step"><div class="n">3</div><div><h3>Save the fixed file, before you test it (1 minute)</h3>
<p class="small" style="margin:0">Press <b>Save this booker as a file</b> and keep it somewhere you
will find it. Save the original too, under a different name. <b>You want both</b>, because the
comparison is the evidence.</p></div></div>
<div class="step"><div class="n">4</div><div><h3>Re-test on somebody new (15 minutes)</h3>
<p class="small" style="margin:0">A tester who has never seen either version. Same task that
exposed the problem. Same silence. The student sheet for this is the last student page in the pack, and it
asks one question that matters: <b>did the new person get stuck in the same place?</b></p></div></div>
<div class="note"><b>If the fix made it worse, you have had the best possible lesson.</b><br>
Say that out loud and mean it. A class that watches its own confident, well-evidenced fix confuse a
new person has learned something that cannot be taught any other way: <b>a fix is a hypothesis.</b>
Do not rescue the moment by fixing it again.</div>
<div class="card t"><h3>If you have another twenty minutes</h3>
<p class="small" style="margin:0">Do the second fix and re-test that one too. The second round is
visibly faster and much calmer, and the class notices that themselves, which is worth more than you
pointing it out.</p></div>`);

/* ----------------------------------------------------------- 16 prompts */
P('Day 5 &middot; teacher','<h2>The prompts, written out in full</h2>',`
<p class="lede">You are at the keyboard. Open your AI chat tool, <b>attach or paste the whole
<code>makerspace-booker.html</code> file</b>, and use these in order. The parts in yellow are the
only parts you change.</p>
<div class="prompt"><div class="lbl">Prompt 1 &middot; the fix</div>
<pre>This is a single-file HTML app that books slots in a room.
Make exactly ONE change and nothing else:

<b>&lt;paste the fix, in the class's own words&gt;</b>

Rules:
- It must stay one HTML file that opens by double-click and works offline.
- Do not add any field that asks for a person's name.
- Do not change anything I did not ask you to change.
- Give me back the whole file, not a snippet.</pre></div>
<div class="prompt"><div class="lbl">Prompt 2 &middot; when it did something else as well</div>
<pre>You changed more than I asked. Start again from the file I gave you
and make only this change: <b>&lt;the one fix&gt;</b>
Leave every other button, color and word exactly as it was.</pre></div>
<div class="prompt"><div class="lbl">Prompt 3 &middot; when the new version is broken</div>
<pre>That version does not work. When I <b>&lt;what you did&gt;</b>,
<b>&lt;what happened instead&gt;</b>.
Go back to the version before your last change and fix only that.</pre></div>
<div class="card r"><h3>Worked example, for the fix most classes choose</h3>
<p class="small" style="margin:0">If the class picks the missing confirmation, the middle of prompt
1 reads: <b>"When a booking is made, show a green message under the buttons that says Booked,
followed by the day and the time. Keep showing it until the next thing the user does."</b> That is
what a well-written fix looks like &mdash; a stranger could do it, and you can tell whether it
worked by looking.</p></div>
<div class="note"><b>The sentence to say while it is generating.</b><br>
"If this comes back different from what we asked, <b>we are right and it is wrong.</b>" Children
assume the computer knows better. Day 5 is the only chance all week to say otherwise while they
watch.</div>`);

/* ------------------------------------- 17 day five student page: re-test */
P('Day 5 &middot; student page','<h2>Re-test the fix on somebody new</h2>',`
<p class="small">Find a tester who has <b>never seen this app</b>, in either version. Give them the
task that broke before. Say the sentence, then stop talking.</p>
<div class="card" style="box-shadow:4pt 4pt 0 var(--grape)"><h3>What we changed</h3>
<div class="wl"></div></div>
<p class="small" style="margin-bottom:4pt"><b>The task I gave them:</b></p>
<div class="wl"></div>
<table>
<thead><tr><th>What they did &mdash; like a camera</th><th style="width:76pt">Stuck in the same place?</th></tr></thead>
<tbody>
<tr><td style="height:44pt"></td><td class="small">Yes / No</td></tr>
<tr><td style="height:44pt"></td><td class="small">Yes / No</td></tr>
<tr><td style="height:44pt"></td><td class="small">Yes / No</td></tr>
</tbody></table>
<div class="box"><h3>Did the fix work?</h3>
<p class="small" style="margin-bottom:4pt"><span class="tick"></span>Yes &nbsp;
<span class="tick"></span>No &nbsp; <span class="tick"></span>It fixed that, and broke something else</p>
<p class="small" style="margin-bottom:3pt"><b>How I know:</b></p><div class="wl"></div></div>
<div class="card t"><h3>And the one worth being honest about</h3>
<p class="small" style="margin:0"><b>Did anything get worse?</b> A fix that fixes one thing and
confuses somebody somewhere else is completely normal and is <i>not</i> a failure. Write it down
anyway &mdash; especially if it was your fix.</p>
<div class="wl"></div></div>`,1);

/* -------------------------------------------------- 18 when it goes wrong */
P('Day 5 &middot; teacher','<h2>When the AI breaks it in front of thirty children</h2>',`
<p class="lede">It will happen, probably on the second prompt, and it is the most valuable five
minutes in the unit if you handle it in front of them instead of apologizing for it.</p>
<div class="card r"><h3>It returned a snippet instead of the file</h3>
<p class="small" style="margin:0">Most common by far. Ask again: <b>"Give me the complete file,
starting with the doctype line and ending with the closing html tag."</b> Do not try to paste a
fragment into the file yourself in front of a class.</p></div>
<div class="card"><h3>The new version opens to a blank page</h3>
<p class="small" style="margin:0">Something is unfinished in the code. <b>Close it, reopen the file
you saved before the change</b>, and use prompt 3. This is the reason step 3 of day 5 says to save
first, and the class will understand why instantly.</p></div>
<div class="card t"><h3>It fixed it and redesigned everything else as well</h3>
<p class="small" style="margin:0">Very common and worth naming. Use prompt 2. Then ask the room the
real question: <b>"Did anybody test the things it changed?"</b> No. So those changes are guesses,
and guesses are exactly what the week has been arguing against.</p></div>
<div class="card g"><h3>It argues that your fix is a bad idea</h3>
<p class="small" style="margin:0">Sometimes it is right. Read what it said to the class, let them
decide, and <b>do whatever they decide</b>, including overruling it. The decision belongs to the
people who watched the testers.</p></div>
<div class="note"><b>The one thing not to do.</b><br>
Do not quietly fix it yourself at lunchtime and present a working version. <b>The class's
relationship with the software depends on believing their evidence changed it</b>, and that is worth
more than a tidy demonstration.</div>`);

/* ----------------------------------------------------------- 19 the app */
P('The booker','<h2>Opening it, resetting it, keeping it</h2>',`
<p class="lede">Open <code>makerspace-booker.html</code> by double-clicking it. <b>You never edit
code and you never open it in a text editor.</b> It works with the wifi off and nothing is
transmitted anywhere.</p>
<div class="card t"><h3>What it does</h3>
<p class="small" style="margin:0">Five days, six slots a day. Pick a day, pick a slot, and one of the
two buttons books it. Booked slots show as taken and cannot be booked twice. Canceling needs the
four-character code. <b>Bookings survive closing the browser</b>, which matters because the class
needs the same state on day 2 that it had on day 1.</p></div>
<div class="card r"><h3>Clearing it between testers</h3>
<p class="small" style="margin:0"><b>Clear all bookings</b> is at the bottom and asks before it does
it. Use it between classes. Leave a few slots booked before a tester sits down, though &mdash; an
empty grid makes task 2 impossible and makes task 3 too easy.</p></div>
<div class="card g"><h3>Saving your version</h3>
<p class="small" style="margin:0"><b>Save this booker as a file</b> hands you back a single HTML file
with your bookings inside it. Save the original before day 5 and the fixed one after, under
different names. The two files side by side are the clearest evidence of the week that you will
get.</p></div>
<div class="card p"><h3>What it will never ask for</h3>
<p class="small" style="margin:0"><b>There is no name field anywhere in the app</b> and nowhere to
type one. Bookings are held against a day, a slot and a code. If a class decides on day 4 that it
should record who booked, that is a genuinely good instinct, and the page headed <i>What this unit
refuses to record</i> is the answer to it.</p></div>
<div class="note"><b>Tested before it shipped, and the flaws were tested too.</b><br>
The app was driven start to finish in a browser: booking, the draft button that does not book, every
error message, canceling with a wrong code and then a right one, booking a whole day, reloading,
and saving to a file and reopening it in a clean browser with the bookings intact. <b>All six flaws
were confirmed present and reproducible</b>, which is an unusual thing to test for, and the console
was checked for errors because a crash is not a usability finding.</div>`);

/* --------------------------------------------------- 20 what goes wrong */
P('Straight talking','<h2>The six ways this unit goes wrong</h2>',`
<div class="flaw"><div class="n">1</div><div><h3>Students help the tester</h3>
<p class="small" style="margin:0">The hardest rule in the unit and the one that destroys the data.
Day 1 exists entirely to make the helping instinct visible before it ruins day 2. <b>Expect to
restart at least one pair</b>, and do it without irritation.</p></div></div>
<div class="flaw"><div class="n">2</div><div><h3>"It was fine" findings</h3>
<p class="small" style="margin:0">Not a finding. One question fixes it: <b>what did they do, exactly,
at the moment they paused?</b> It is printed on the student sheet so that they can ask it of
themselves while you are across the room.</p></div></div>
<div class="flaw"><div class="n">3</div><div><h3>The class finds nothing</h3>
<p class="small" style="margin:0">Almost always helping, occasionally testers who already know the
app. <b>You have the list of all six</b>, so add a tester and aim them at a task that walks into one
&mdash; without announcing what they are supposed to find.</p></div></div>
<div class="flaw"><div class="n">4</div><div><h3>The class finds everything and fixes nothing</h3>
<p class="small" style="margin:0">Thirty findings and no decision. Day 4 caps it at three with
evidence required, which is the real-world constraint rather than a classroom one. <b>Do not
negotiate the number.</b></p></div></div>
<div class="flaw"><div class="n">5</div><div><h3>The fix makes it worse</h3>
<p class="small" style="margin:0"><b>This is a success.</b> It is the only way a class learns that a
fix is a hypothesis. Resist every instinct to repair the lesson, and put it on the wall.</p></div></div>
<div class="flaw"><div class="n">6</div><div><h3>Testers are classmates who already know it</h3>
<p class="small" style="margin:0">They will finish every task in forty seconds and find nothing, and
the class will conclude the app is fine. Another class, a sibling, an adult. <b>Failing that, split
your room in half on day 1</b> and keep one half away from the app.</p></div></div>
<div class="note"><b>And one that is not a failure mode, although it feels like one.</b><br>
A tester who gets frustrated and gives up is the best data in the room. Thank them, write down where
they stopped, and make sure the child who tested them knows they did the job right.</div>`);

/* ------------------------------------------------ 21 assessment honestly */
P('Straight talking','<h2>Assessment, honestly</h2>',`
<p class="lede">There is no quiz here and there should not be. What a class produces in this unit is
observable, and these are the four things actually worth looking at.</p>
<table>
<thead><tr><th style="width:33%">What you are looking at</th><th>Not there yet</th><th>Got it</th></tr></thead>
<tbody>
<tr><td><b>Observing</b><br><span class="small">Day 1 and day 2 sheets</span></td>
<td class="small">"They found it confusing." A conclusion with no moment attached.</td>
<td class="small">"They clicked Submit, waited, clicked it again, then looked at me."</td></tr>
<tr><td><b>Not helping</b><br><span class="small">Watched, on day 2</span></td>
<td class="small">Hints, pointing, finishing the tester's sentence.</td>
<td class="small">Silence, and the question written down instead of answered.</td></tr>
<tr><td><b>Arguing from evidence</b><br><span class="small">Day 3 and day 4</span></td>
<td class="small">"Everybody said." "It's annoying."</td>
<td class="small">"Two of my three, and one of them gave up on task 2."</td></tr>
<tr><td><b>Specifying a change</b><br><span class="small">Day 4 sheet</span></td>
<td class="small">"Make it clearer."</td>
<td class="small">An instruction a stranger could follow without asking anything.</td></tr>
</tbody></table>
<div class="card t"><h3>The single best piece of evidence in the week</h3>
<p class="small" style="margin:0">The day 5 re-test sheet, where a student has to write down whether
their own fix worked. <b>A student who writes "no, and it broke something else" has understood more
than one who writes "yes."</b> Mark it that way and say so before they fill it in.</p></div>
<div class="card r"><h3>What not to grade</h3>
<p class="small" style="margin:0">How many findings a student produced. A quiet observer with three
precise observations has done better work than someone with eleven vague ones, and <b>counting
rewards exactly the wrong behavior</b> on the one day of the week where precision matters most.</p></div>
<div class="card g"><h3>If you need a grade in a book</h3>
<p class="small" style="margin:0">Use the day 4 sheet. Three fixes, each with a change written as an
instruction and an evidence line with a fraction in it. <b>Six boxes, each either filled properly or
not</b>, which is defensible to a parent and takes about ninety seconds a child.</p></div>`);

/* --------------------------------------------------- 22 what we refuse */
P('Straight talking','<h2>What this unit refuses to record, and why</h2>',`
<p class="lede">Two decisions were made before anything was built, and both of them are about where
information lives rather than about whether a name appears.</p>
<div class="card g"><h3>Build freely &mdash; none of this is about a child</h3>
<p class="small" style="margin:0">The booking grid, the slots, the room, the three tasks, the
findings sheets with their numbered testers, the three chosen fixes. It is all information about an
app. <b>Prompt with it, print it, put it on the wall.</b></p></div>
<div class="card t"><h3>Your own device &mdash; the saved files</h3>
<p class="small" style="margin:0">The booker you save and the fixed version your class produces live
on the computer you saved them to and are transmitted nowhere. <b>Treat them the way you treat any
classroom file</b>, which for these is not very carefully, because there is nothing in them.</p></div>
<div class="card r"><h3>Stop &mdash; any of it attached to a named child</h3>
<p class="small" style="margin:0">"Tester 2 pressed Submit twice" is a finding. <b>Writing which
child that was, and reading it out, is a different thing entirely</b> &mdash; it is a record of a
named child struggling, produced in public, by their classmates. The student pages say no names
twice, and it is worth saying a third time on day 2.</p></div>
<h2 style="margin-top:4pt">And why the app has no name field</h2>
<div class="note"><b>Build it so that the wrong thing is impossible, rather than so that you are careful.</b><br>
A booking app that records which named child was in which room at which time is a movement record
about identified children. We could have shipped one and written a warning next to it. <b>Instead
there is nowhere to type a name</b>, which is a rule nobody has to remember on a busy Tuesday.</div>
<div class="card p"><h3>If your class decides it should record who booked</h3>
<p class="small" style="margin:0">That is a good instinct and the right answer is not "no." Ask the
two questions that decide it: <b>where would that list live, and who could read it?</b> A class that
works out for itself that a list of who was where is a different kind of thing from a list of free
slots has had a better lesson than any rule you could have given them.</p></div>`);

/* ---------------------------------------------- 23 the honest competition */
P('Straight talking','<h2>What else is out there, and what is different here</h2>',`
<p class="lede">Being straight about this is the fastest way to keep a review. Here is the comparison,
in both directions, including the part that is not flattering.</p>
<div class="card r"><h3>What already exists</h3>
<p class="small" style="margin:0">Design-thinking units, which usually run empathize, define, ideate,
prototype, test &mdash; and in most classrooms the testing step is a single afternoon at the end.
Genius hour and project-based units, which end at a showcase. Plenty of material on gathering peer
feedback. <b>If what you want is a full design-thinking unit, those are broader than this.</b></p></div>
<div class="card t"><h3>What is different about this one</h3>
<p class="small" style="margin-bottom:4pt"><b>It is the testing step, stretched to five days.</b>
That step is the one that gets compressed to nothing everywhere else, and it is where the actual
discipline lives.</p>
<p class="small" style="margin-bottom:4pt"><b>Something is actually wrong with the app.</b> Peer
feedback on each other's good work produces politeness. A flawed app produces findings.</p>
<p class="small" style="margin:0"><b>It ends with a re-test.</b> Almost nothing does, and that is the
difference between a class that has done testing and a class that has understood it.</p></div>
<div class="card"><h3>What this pack is not</h3>
<p class="small" style="margin:0">Not a design-thinking unit &mdash; there is no ideation stage and
no prototyping. Not a course in programming. Not a professional usability method, which involves
sample sizes and protocols this deliberately does not. And <b>not a claim that the booker is good
software</b>, which would be a strange claim to make about an app we broke on purpose.</p></div>
<div class="card p"><h3>On building on somebody else's idea</h3>
<p class="small" style="margin:0">Usability testing, booking grids and sticky-note sorting belong to
nobody and you are welcome to build on all of them. The words, the design and the code in these
files are ours. That distinction is worth teaching the moment a class starts changing software with
AI: <b>how a thing works is free to borrow; the particular way somebody said it and drew it is
not.</b></p></div>`);

/* ------------------------------------------------------------ 24 closing */
P('Yours to use','<h2>License, credit, and one favor</h2>',`
<div class="card g"><h3>What you may do</h3>
<p class="small" style="margin:0">Run this unit with your own classes for as long as you teach. Print
the student pages as many times as you need. Change the booker however you like and save as many
versions as you want. Put the file on the classroom computers or a flash drive. Your one purchase
covers you and your classes.</p></div>
<div class="card r"><h3>What needs another license</h3>
<p class="small" style="margin:0">Sharing it with other teachers, putting it on a shared drive or a
server, or handing it round a department or a building. Additional licenses are half price on the
listing, and a school can buy them on a single purchase order. Please do not post the files publicly
or sell anything made from them.</p></div>
<div class="card t"><h3>What was tested before this shipped</h3>
<p class="small" style="margin:0">The booker was driven start to finish in a browser: a booking made
with the draft button and then with the real one, every error message, a wrong cancellation code and
then a right one, a whole day booked, a reload with the bookings intact, and the file saved and
reopened in a clean browser. <b>All six flaws were confirmed present and reproducible</b>, and the
console was checked for errors, because an app that crashes teaches nothing about usability.</p></div>
<div class="note"><b>If this earned its keep, would you leave a review?</b><br>
TPT gives you credit toward your next purchase for it, and it is the only thing that decides whether
another teacher ever sees this. If something did not work in your room, tell us that instead and we
will fix it.</div>
<div class="card"><h3>Built and audited by two certified teachers</h3>
<p class="small" style="margin:0">Written by classroom teachers, checked by a second teacher before
it shipped, and built on a rule we keep everywhere: the grown-up holds the keyboard, and no child's
name goes into a prompt.</p></div>`);

module.exports={};
