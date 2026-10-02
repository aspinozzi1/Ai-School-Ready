const {P,pages}=require('./s1.js');

/* ---------------------------------------------------------------- 1 cover */
pages.push(`<div class="sheet"><div class="bar"></div><div style="padding-top:22pt">
<div class="kick">Vibe Coding for Kids &middot; build 3</div>
<h1>Test It Like a User</h1>
<p class="lede">Five days. Your class is handed a working app with <b>six real usability problems
built into it on purpose</b>, they find them by watching other people use it &mdash; and on the last
day you fix one live and <b>make them test it again on somebody new.</b></p>
<div class="row" style="margin:12pt 0">
<div class="card t" style="text-align:center"><h3 style="font-size:19pt;color:var(--blue)">5</h3><p class="small" style="margin:0">days, each ending in written evidence</p></div>
<div class="card r" style="text-align:center"><h3 style="font-size:19pt;color:var(--blue)">6</h3><p class="small" style="margin:0">findable problems, listed for you</p></div>
<div class="card g" style="text-align:center"><h3 style="font-size:19pt;color:var(--blue)">0</h3><p class="small" style="margin:0">accounts, logins or subscriptions</p></div>
</div>
<div class="note"><b>The app is included, and it is deliberately flawed.</b><br>
A class cannot find usability problems in a polished app, and a class that finds nothing concludes
that testing is a formality. So this one ships with six genuine ones, of the kind every first build
has. <b>The teacher's guide lists all six</b>, so you can tell whether your class is finding real
things or guessing.</div>
<div class="card p"><h3>The students never touch the chatbot. That is the better lesson.</h3>
<p class="small" style="margin:0">Chatbots are 13 and over, and no child's name goes into a prompt.
So students do the testing, the observing, the sorting and the deciding, and <b>you do the
prompting, on the board, where they can see their own evidence becoming a change in the
software.</b> Watching a person and arguing from what you saw is the thinking. Typing prompts is
not.</p></div>
<div class="card" style="margin-top:2pt"><h3>Inside</h3>
<p class="small" style="margin:0">Day-by-day teacher pages &middot; <b>six student pages worth
printing</b> &middot; the three tester tasks written word for word &middot; the six flaws with the
sentence a tester is likely to say &middot; the exact prompts for day 5 &middot; what to do when the
AI breaks the app in front of thirty children &middot; and the working app, which has no name field
anywhere.</p></div>
</div>
<div class="foot"><span>Built and audited by two certified teachers</span><span>Bright Scholar &middot; AI-Ready School</span></div>
<div class="barb"></div></div>`);

/* ------------------------------------------------------------- 2 the week */
P('Before you start','<h2>The week at a glance</h2>',`
<table>
<thead><tr><th style="width:52pt">Day</th><th>The class does</th><th>You do</th></tr></thead>
<tbody>
<tr><td><b>1</b><br>Watch</td><td>Give one person a task and watch without helping. Write down what they <i>did</i>, not what they said.</td><td>Model it badly first &mdash; helping, explaining, leading &mdash; then well.</td></tr>
<tr><td><b>2</b><br>Test</td><td>Three testers each, the same three tasks, silence. Findings on paper.</td><td>Enforce the one rule: <b>if you had to explain it, that is a finding.</b></td></tr>
<tr><td><b>3</b><br>Sort</td><td>Group the findings. Decide which are real problems and which are one person's preference.</td><td>Push on "everybody said" when two people said it.</td></tr>
<tr><td><b>4</b><br>Choose</td><td>Pick three fixes out of everything found, and write the evidence for each one.</td><td>Refuse any fix with no observation behind it.</td></tr>
<tr><td><b>5</b><br>Fix and re-test</td><td>Watch the fix happen, then <b>test it again on somebody who has not seen it.</b></td><td>Prompt on the board. Then make them test it again.</td></tr>
</tbody></table>
<div class="note"><b>Day 5 is the one that makes this a unit rather than an activity.</b><br>
Almost nobody re-tests. A class that fixes something and then watches it still confuse somebody has
learned the actual lesson, which is that <i>a fix is a hypothesis</i>, not an ending.</div>
<div class="card t"><h3>How long it really takes</h3>
<p class="small" style="margin:0">Days 1, 3 and 4 are a lesson each, and day 1 can be as short as
twenty minutes. <b>Day 2 is as long as you can give it</b> &mdash; three testers each takes about
twenty-five minutes once the class knows the rules. <b>Day 5 is thirty minutes</b>, split roughly in
half between the fix and the re-test. The days do not have to be consecutive and the unit works
better spread across two weeks.</p></div>
<div class="card g"><h3>What you need</h3>
<p class="small" style="margin:0">One computer you can project. Any AI chat tool you already use, for
day 5 only. Printed findings sheets. A handful of devices for day 2, or one device and a line of
testers. And the app in this download, which opens by double-click and needs nothing
installed.</p></div>`);

/* ------------------------------------------------- 3 the rules, and names */
P('Before you start','<h2>Three rules, and the first one is the whole unit</h2>',`
<div class="card r"><h3>1 &middot; The tester is never helped and never named</h3>
<p class="small" style="margin-bottom:5pt">The observer does not hint, does not point, does not say
"it's the other button," and does not laugh. <b>The moment you help, the data is gone</b> &mdash; you
have measured how good you are at explaining, which nobody needed to know.</p>
<p class="small" style="margin:0">And the findings sheet records <b>what the tester did, never who
they were.</b> "Tester 2 pressed Submit and stopped" is a finding. Naming the child who struggled,
in front of the class, is how this unit goes wrong, and the student pages say so too.</p></div>
<div class="card"><h3>2 &middot; The grown-up holds the keyboard</h3>
<p class="small" style="margin:0">Every mainstream chatbot requires users to be 13 or over, and
school guidance is consistent that a child's name, work or identity should not be typed into one.
So <b>no student sits at the chatbot</b> at any point. Students specify, observe, argue and decide.
That is the harder half and the half that transfers.</p></div>
<div class="card t"><h3>3 &middot; Evidence beats opinion, including yours</h3>
<p class="small" style="margin:0">A fix gets made because somebody was <i>watched</i> getting stuck,
not because it would look nicer. Day 4 enforces this and it is the rule students will fight hardest.
When a student cannot say who got stuck and where, the answer is not "no" &mdash; it is <b>"go and
watch one more person."</b></p></div>
<h2 style="margin-top:4pt">And one thing to settle before day 2</h2>
<div class="note"><b>Testers should be people who have not seen the app.</b><br>
Classmates who have been staring at it all week will sail through and find nothing. Another class,
a sibling, a teaching assistant, the office staff, a parent at pickup. <b>If that is impossible,
split your room in half</b> and keep one half away from the app until day 2.</div>`);

/* ------------------------------------------- 4 the app, and why it is bad */
P('Teacher only','<h2>The app you have been given, and why it is flawed</h2>',`
<p class="lede">The download includes <code>makerspace-booker.html</code>. It books a shared room
&mdash; pick a day, pick a slot, book it, and slots show as free or taken. <b>It works. It does not
crash and it does not lose bookings.</b> It is also quietly bad to use, on purpose.</p>
<div class="card r"><h3>Why we did not ship you a good one</h3>
<p class="small" style="margin-bottom:5pt">Usability testing on a polished app produces a class of
thirty children writing "it was fine." Nothing is found, nothing is argued about, and the unit
teaches that testing is a box to tick. <b>Every problem in this app is a real one</b>, of the kind
that turns up in a genuine first build, and all six are findable by an eleven-year-old inside a
two-minute task.</p>
<p class="small" style="margin:0">It is also the honest version of the lesson. <b>You cannot see
these problems from the inside.</b> The person who built it knows which button books, so the button
seems obvious. That gap is the entire reason user testing exists, and a flawed app teaches it in a
way a perfect one cannot.</p></div>
<div class="card"><h3>Do not fix it before the class tests it</h3>
<p class="small" style="margin:0">The fixed version is what day 5 produces. If you repair the app
over the weekend out of embarrassment, you have removed the unit. <b>The next page lists what is
wrong with it</b> so that you know what your class should be finding &mdash; it is for you, not for
them, and it should not go on the wall.</p></div>
<div class="card g"><h3>What the app deliberately does not have</h3>
<p class="small" style="margin:0"><b>There is no name field anywhere in it</b>, and no record of who
booked what. A booking system that records which named child was in which room, at which time, is a
movement record about identified children, and we would rather not build one and then ask a class
to improve it. Bookings are held against slots and a four-character code, and that is all.</p></div>
<div class="card p"><h3>If you would rather use your own app</h3>
<p class="small" style="margin:0">Everything in this pack works on any app your class has already
built, or on any app at all &mdash; the school website, a lunch ordering system, the library
catalog. <b>The five days do not depend on the booker.</b> It is here so that the unit is complete
on the day you buy it.</p></div>`);

/* ---------------------------------------------------- 5 the six, for you */
P('Teacher only &middot; do not display','<h2>The six flaws, and what a tester will say</h2>',`
<p class="lede">Read this, then put it away. <b>Knowing the answers is what lets you tell whether
your class is finding real things or guessing</b>, and lets you steer a task toward a flaw nobody
has hit yet.</p>
<table>
<thead><tr><th style="width:22pt">#</th><th>What is wrong</th><th style="width:33%">What a tester tends to say</th></tr></thead>
<tbody>
<tr><td><b>1</b></td><td>The big <b>Submit</b> button only saves a draft. A second, smaller button called <b>Confirm booking</b> is the one that actually books.</td><td><i>"I thought I'd booked it."</i></td></tr>
<tr><td><b>2</b></td><td><b>Nothing says it worked.</b> After a real booking the screen looks almost identical &mdash; a four-character code appears in small gray text and that is the whole confirmation.</td><td><i>"Did that work?"</i></td></tr>
<tr><td><b>3</b></td><td>Every error message is the single word <b>Error</b>, whether the slot is taken, the day is missing or the code is wrong.</td><td><i>"It won't let me and it won't say why."</i></td></tr>
<tr><td><b>4</b></td><td><b>The steps only work in one order.</b> Pick the day first, then the slot. Picking a slot and then changing the day silently clears the slot, and nothing says so.</td><td><i>"It keeps clearing what I picked."</i></td></tr>
<tr><td><b>5</b></td><td><b>Book the whole day</b> is the biggest button on the screen and is almost never what anybody wants. <b>Cancel a booking</b> is the smallest thing on the booking screen.</td><td><i>"I nearly booked the whole day by accident."</i></td></tr>
<tr><td><b>6</b></td><td>The confirmation code is shown once, is wiped by the next thing you do, and <b>is required on a different screen</b> in order to cancel.</td><td><i>"Nobody told me to write that down."</i></td></tr>
</tbody></table>
<div class="note"><b>If the class has found four of these by the end of day 2, the testing is working.</b><br>
If they have found one, the problem is almost always that they are helping. Go back to day 1 for
five minutes and model it badly again.</div>
<div class="card t"><h3>Steering without telling</h3>
<p class="small" style="margin:0">Flaws 1, 2 and 4 come out of task one. Flaw 6 and flaw 3 come out
of task two. Flaw 5 comes out of task three, or out of anybody who is in a hurry. <b>If a flaw is
going unfound, add a tester and give them that task</b> rather than announcing it.</p></div>`);

/* -------------------------------------------------------------- 6 day one */
P('Day 1 &middot; teacher','<h2>Watch somebody struggle, and say nothing</h2>',`
<p class="lede">Twenty to thirty minutes. Ends with a room that knows the difference between
watching a person and interviewing one, which is the skill the rest of the week stands on.</p>
<div class="step"><div class="n">1</div><div><h3>Do it badly, at the front (4 minutes)</h3>
<p class="small" style="margin:0">Ask a volunteer to book Thursday afternoon on the projected app.
Then <b>help them relentlessly</b>: point at the screen, say "not that one," explain what the button
does, finish their sentence. Stop and ask the room what you learned about the app. <b>Nothing.</b>
You learned that you can operate it, which was never in doubt.</p></div></div>
<div class="step"><div class="n">2</div><div><h3>Do it properly (4 minutes)</h3>
<p class="small" style="margin:0">Second volunteer, same task, and now you say one sentence at the
start and nothing after it: <b>"I can't help you, and nothing that goes wrong is your fault."</b>
Sit on your hands. Let the silence be uncomfortable. The room will find it almost unbearable, and
that reaction is worth naming out loud.</p></div></div>
<div class="step"><div class="n">3</div><div><h3>What to write down (5 minutes)</h3>
<p class="small" style="margin:0">Model the difference on the board. <b>"They clicked Submit, waited
about three seconds, then clicked it again"</b> is an observation. "They found it confusing" is not
&mdash; it is your conclusion about them. The student sheet has one column for each, on purpose, and
the left column has to be filled in first.</p></div></div>
<div class="step"><div class="n">4</div><div><h3>Everybody watches one person (12 minutes)</h3>
<p class="small" style="margin:0">Pairs. One tester, one observer, one task: <b>book any slot on
Wednesday.</b> Swap. Then collect two or three observations aloud and bin any that are conclusions.
<b>Do not discuss the app yet.</b> Today is about watching, not about the booker.</p></div></div>
<div class="note"><b>The sentence to end on.</b><br>
"If you had to explain it, that is a finding." Write it up and leave it up all week. It converts the
helping instinct, which you cannot switch off, into the data you actually want.</div>
<div class="card r"><h3>If it derails</h3>
<p class="small" style="margin:0">Somebody will tell their tester the answer within ten seconds. Do
not tell them off &mdash; <b>ask the room what that cost.</b> The pair has to start again with a new
task, and the point lands harder from the restart than from a reprimand.</p></div>`);

/* ---------------------------------------------- 7 day one student page */
P('Day 1 &middot; student page','<h2>Watch one person. Help nobody.</h2>',`
<p class="small">Your job is to write down <b>what the person did</b>, like a camera. Not what you
think they felt, and not their name. Fill the left column first. Leave the right column blank if
you are not sure.</p>
<div class="card" style="box-shadow:4pt 4pt 0 var(--grape)"><h3>Say this, then stop talking</h3>
<p class="small" style="margin:0"><b>"I can't help you, and nothing that goes wrong is your
fault."</b> After that: no pointing, no hinting, no faces.</p></div>
<p class="small" style="margin-bottom:4pt"><b>The task I gave them:</b></p>
<div class="wl"></div>
<table>
<thead><tr><th style="width:50%">What they did &mdash; like a camera</th><th>What I think it means</th></tr></thead>
<tbody>
<tr><td style="height:40pt"></td><td></td></tr>
<tr><td style="height:40pt"></td><td></td></tr>
<tr><td style="height:40pt"></td><td></td></tr>
<tr><td style="height:40pt"></td><td></td></tr>
<tr><td style="height:40pt"></td><td></td></tr>
</tbody></table>
<div class="box"><h3>The hardest question, and the one worth answering</h3>
<p class="small" style="margin-bottom:4pt">Where did they <b>pause</b>? Not where they failed
&mdash; where they stopped and looked at the screen for a second.</p>
<div class="wl"></div><div class="wl"></div></div>
<div class="card t"><h3>Did I help?</h3>
<p class="small" style="margin:0"><span class="tick"></span>No, not once &nbsp;
<span class="tick"></span>Yes, a bit &nbsp; <span class="tick"></span>Yes, a lot<br>
If you helped, write what you said. <b>That sentence is a finding</b> &mdash; it is the thing the app
should have said instead of you.</p>
<div class="wl"></div></div>`,1);

/* ------------------------------------------------------------- 8 day two */
P('Day 2 &middot; teacher','<h2>Run real tests on real strangers</h2>',`
<p class="lede">One lesson, twenty-five minutes of it testing. Ends with a stack of findings sheets
that are evidence rather than opinion. This is the day the unit lives or dies.</p>
<div class="step"><div class="n">1</div><div><h3>Set the testers up (3 minutes)</h3>
<p class="small" style="margin:0">Each student needs <b>three testers who have not seen the
app.</b> Another class, older or younger, is ideal and a younger class is better than an older one.
Siblings, adults in the building and the office staff all count. If you must use classmates, use the
half of your room you kept away from it.</p></div></div>
<div class="step"><div class="n">2</div><div><h3>Hand out the three tasks, word for word (2 minutes)</h3>
<p class="small" style="margin:0">They are on the next student page and they are written out exactly
because <b>a vague task produces a vague test.</b> Students read the task aloud, hand over the
device, and stop talking. They do not demonstrate first.</p></div></div>
<div class="step"><div class="n">3</div><div><h3>Test (20 minutes)</h3>
<p class="small" style="margin:0">Three testers, three tasks each, one findings sheet per tester.
Circulate and listen for helping. <b>Say nothing about the app itself all lesson</b>, however much
you want to, and especially do not confirm whether something they found is "right."</p></div></div>
<div class="step"><div class="n">4</div><div><h3>One sentence each, out loud (5 minutes)</h3>
<p class="small" style="margin:0">Go round the room. <b>One observation each, in the form "my tester
did X at Y."</b> Do not sort, do not agree, do not fix. Just hear them. Tomorrow is for arguing.</p></div></div>
<div class="note"><b>The forcing question, for "it was fine."</b><br>
"It was fine" is not a finding, and you will get a lot of it. The question that breaks it every time
is: <b>"What did they do, exactly, at the moment they paused?"</b> It is on the student sheet too,
because it works better when they ask it of themselves.</div>
<div class="card r"><h3>If it derails</h3>
<p class="small" style="margin:0">A tester who gets frustrated and gives up <b>is your best
data</b>, and the room needs to hear you say that. Thank them properly, write down exactly where they
stopped, and make sure the child who tested them knows they did the job right rather than badly.</p></div>`);

/* --------------------------------------- 9 day two student page: tasks */
P('Day 2 &middot; student page','<h2>The three tasks. Read them out exactly.</h2>',`
<p class="small">Read the task aloud, hand over the device, and <b>stop talking.</b> Do not show them
first. Do not explain what the buttons do. One sheet per tester.</p>
<div class="card" style="box-shadow:4pt 4pt 0 var(--grape)"><h3>Task 1</h3>
<p class="lede" style="margin:0">"Book the makerspace for Thursday, first slot after lunch."</p></div>
<div class="card" style="box-shadow:4pt 4pt 0 var(--grape)"><h3>Task 2</h3>
<p class="lede" style="margin:0">"You booked Tuesday by mistake. Cancel it."</p></div>
<div class="card" style="box-shadow:4pt 4pt 0 var(--grape)"><h3>Task 3</h3>
<p class="lede" style="margin:0">"Find the earliest free slot tomorrow and take it."</p></div>
<div class="box"><h3>Before you start, set the app up for task 2</h3>
<p class="small" style="margin:0">Task 2 only works if there <b>is</b> a Tuesday booking. Book one
yourself before the tester sits down, and <b>keep the code</b> &mdash; you may need it, and finding
out why is part of the point.</p></div>
<div class="card t"><h3>The two rules, again</h3>
<p class="small" style="margin:0"><b>You may not help.</b> Not with your hands, not with your face.<br>
<b>You may not write their name.</b> Call them Tester 1, Tester 2, Tester 3.</p></div>
<div class="note"><b>If they ask you a question, write the question down.</b><br>
Then say "I can't help with that, do whatever you think." <b>The question itself is the finding</b>
&mdash; it is the thing the app should have answered without being asked.</div>`,1);

/* ----------------------------------- 10 day two student page: findings */
P('Day 2 &middot; student page','<h2>Findings sheet &mdash; one per tester</h2>',`
<p class="small"><b>Tester:</b> <span class="tick"></span>1 &nbsp; <span class="tick"></span>2 &nbsp;
<span class="tick"></span>3 &nbsp;&nbsp; No names. <b>Roughly how old:</b> ______ &nbsp;&nbsp;
<b>Had they seen the app before?</b> <span class="tick"></span>No <span class="tick"></span>Yes</p>
<table>
<thead><tr><th style="width:38pt">Task</th><th>Where they got stuck, and what they did</th><th style="width:60pt">Finished it?</th></tr></thead>
<tbody>
<tr><td><b>1</b></td><td style="height:52pt"></td><td class="small">Y / N / with help</td></tr>
<tr><td><b>2</b></td><td style="height:52pt"></td><td class="small">Y / N / with help</td></tr>
<tr><td><b>3</b></td><td style="height:52pt"></td><td class="small">Y / N / with help</td></tr>
</tbody></table>
<div class="box"><h3>Anything they said out loud, in their words</h3>
<div class="wl"></div><div class="wl"></div></div>
<div class="box"><h3>Anything they asked me</h3>
<p class="small" style="margin-bottom:4pt">Every question is a finding. Write it exactly.</p>
<div class="wl"></div><div class="wl"></div></div>
<div class="card t"><h3>And the question that beats "it was fine"</h3>
<p class="small" style="margin-bottom:4pt">What did they do, <b>exactly</b>, at the moment they
paused?</p>
<div class="wl"></div></div>`,1);

/* ----------------------------------------------------------- 11 day three */
P('Day 3 &middot; teacher','<h2>Sort the pile, and argue about it</h2>',`
<p class="lede">One lesson. Ends with every finding in one of three groups and a room that can tell
a problem from a preference, which is a distinction most adults cannot make either.</p>
<div class="step"><div class="n">1</div><div><h3>Everything on the wall (8 minutes)</h3>
<p class="small" style="margin:0">One finding per sticky note or per strip of paper, up on the board
in no order. <b>Duplicates stay up</b> &mdash; the duplicates are the whole point, because a finding
three testers hit is a different animal from one that one tester hit.</p></div></div>
<div class="step"><div class="n">2</div><div><h3>Group them, by what went wrong (12 minutes)</h3>
<p class="small" style="margin:0">Not by task, by cause. Students come up and move things. Expect
arguments about whether two notes are the same thing and <b>let them run</b>; working out that
"I didn't know it saved" and "I pressed it twice" are the same underlying problem is the hardest
thinking in the week.</p></div></div>
<div class="step"><div class="n">3</div><div><h3>Three buckets (10 minutes)</h3>
<p class="small" style="margin:0">Label the groups: <b>Real problem</b> (more than one tester, or one
tester who failed the task), <b>Just a preference</b> (somebody would have liked it differently),
<b>Not sure yet</b> (needs one more tester). The third bucket has to exist or everything gets forced
into the first.</p></div></div>
<div class="step"><div class="n">4</div><div><h3>Count, out loud (5 minutes)</h3>
<p class="small" style="margin:0">For each real problem: <b>how many testers hit it, out of how
many?</b> Write the number on the note. From here on, a finding without a number next to it does not
get argued for.</p></div></div>
<div class="note"><b>Push hard on "everybody said."</b><br>
Nobody ever says "two of my three testers." They say "everybody said." <b>Make them count</b>, every
single time, and make them say the fraction aloud. It is the most useful habit in the unit and it
survives long after they have forgotten the app.</div>
<div class="card r"><h3>The one to watch for</h3>
<p class="small" style="margin:0">A student will argue that something is a real problem because
<i>they</i> find it annoying, having used the app all week. <b>That is a preference, and from the
worst possible source</b> &mdash; they are the only people in the building who already know how it
works. Ask who they watched.</p></div>`);

/* ----------------------------------- 12 day three student page: sorting */
P('Day 3 &middot; student page','<h2>Real problem, or just a preference?</h2>',`
<p class="small">Take your findings one at a time. A finding is a <b>real problem</b> if more than one
tester hit it, or if one tester could not finish the task because of it. Everything else goes in one
of the other two columns, and that is fine.</p>
<table>
<thead><tr><th>The finding, in a few words</th><th style="width:48pt">How many testers</th><th style="width:72pt">Which column</th></tr></thead>
<tbody>
<tr><td style="height:33pt"></td><td></td><td class="small">R / P / ?</td></tr>
<tr><td style="height:33pt"></td><td></td><td class="small">R / P / ?</td></tr>
<tr><td style="height:33pt"></td><td></td><td class="small">R / P / ?</td></tr>
<tr><td style="height:33pt"></td><td></td><td class="small">R / P / ?</td></tr>
<tr><td style="height:33pt"></td><td></td><td class="small">R / P / ?</td></tr>
<tr><td style="height:33pt"></td><td></td><td class="small">R / P / ?</td></tr>
</tbody></table>
<p class="small" style="margin-bottom:5pt"><b>R</b> = real problem &nbsp;&middot;&nbsp;
<b>P</b> = just a preference &nbsp;&middot;&nbsp; <b>?</b> = not sure, needs one more tester</p>
<div class="box"><h3>The argument I had, and who won</h3>
<p class="small" style="margin-bottom:4pt">Write down one finding somebody disagreed with you about,
and what settled it.</p>
<div class="wl"></div><div class="wl"></div></div>
<div class="card" style="box-shadow:4pt 4pt 0 var(--grape)"><h3>Say the fraction out loud</h3>
<p class="small" style="margin:0">Not "everybody said." <b>"Two of my three testers."</b> If you
cannot say the fraction, the finding is not ready to argue for yet.</p></div>`,1);

/* ------------------------------------------------------------ 13 day four */
P('Day 4 &middot; teacher','<h2>Pick three, and justify every one</h2>',`
<p class="lede">One lesson. Ends with exactly three fixes, each with a named piece of evidence behind
it, and a room that has had to let go of two things it wanted.</p>
<div class="step"><div class="n">1</div><div><h3>Why three and not everything (4 minutes)</h3>
<p class="small" style="margin:0">Because that is the real constraint. There is always more wrong
than there is time to fix, and <b>choosing is the job.</b> Say the number out loud and do not
negotiate it. A class that is allowed six will fix six badly.</p></div></div>
<div class="step"><div class="n">2</div><div><h3>Nominations, with the fraction (10 minutes)</h3>
<p class="small" style="margin:0">A student nominates a fix and must say: <b>what the fix is, who got
stuck, and how many out of how many.</b> Missing any of the three and the nomination does not go on
the board. This feels harsh for about four minutes and then the room adapts.</p></div></div>
<div class="step"><div class="n">3</div><div><h3>Argue and cut (12 minutes)</h3>
<p class="small" style="margin:0">Push one question: <b>"If we only fix one, which one, and why that
one?"</b> Expect them to pick the thing that annoys them rather than the thing that stopped a tester
finishing. Keep pointing back at the task-completion column on the sheets.</p></div></div>
<div class="step"><div class="n">4</div><div><h3>Write the three as instructions (8 minutes)</h3>
<p class="small" style="margin:0">Not "make it clearer." <b>"When a booking is made, show a green
message that says Booked, with the day and the time in it."</b> A fix you cannot hand to somebody
else is not a fix yet, and tomorrow you have to hand one to a chatbot.</p></div></div>
<div class="note"><b>The two they let go of are worth a minute.</b><br>
Write the rejected two on the board under the heading <b>Next time.</b> Nothing about this unit
promises there will be a next time &mdash; but a class that sees good ideas parked rather than binned
argues better the following week.</div>
<div class="card t"><h3>If they pick a fix nobody was stuck on</h3>
<p class="small" style="margin:0">Do not veto it. <b>Ask who got stuck on it and wait.</b> The silence
does the work. If a student can produce a tester and a moment, it stays in &mdash; even if you think
it is wrong, because the rule has to apply to you too.</p></div>`);

module.exports={};
