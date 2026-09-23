const {P,pages}=require('./g1.js');

/* ------------------------------------------------------------------ 1 --- */
pages.push(`<div class="sheet"><div class="bar"></div><div style="padding-top:22pt">
<div class="kick">Vibe Code Your Own Game</div>
<h1>The Long Road</h1>
<p class="lede">A review game for <b>any subject and any grade</b>. Open the file, put your own
questions in, and play it the same day. Your class picks the road at every fork &mdash; the easy one,
the steady one, or the hard pass that pays &mdash; and whatever they get wrong blocks the road later
until somebody comes back and fixes it.</p>
<div class="row" style="margin:13pt 0">
<div class="card t" style="text-align:center"><h3 style="font-size:20pt;color:var(--blue)">10</h3><p class="small" style="margin:0">minutes from opening this to playing your own version</p></div>
<div class="card" style="text-align:center"><h3 style="font-size:20pt;color:var(--blue)">1</h3><p class="small" style="margin:0">file, no installing, no accounts, works offline</p></div>
<div class="card g" style="text-align:center"><h3 style="font-size:20pt;color:var(--blue)">0</h3><p class="small" style="margin:0">ways for a student to lose in front of the class</p></div>
</div>
<div class="note"><b>Your questions go in without touching any code.</b><br>
There is a setup screen built into the game. Type them in, or paste a list, or use the prompt on
page 5 to have AI draft a set in about thirty seconds and then read them over. Press
<b>Save my game as a file</b> and you have your own copy to keep, reuse and hand to the teacher
next door.</div>
<div class="card r"><h3>Why the wrong answers are the point</h3>
<p class="small" style="margin:0">Competence is the strongest driver of student motivation, and
points do not produce it. So the loudest moment in this game is not a high score. It is the moment a
student goes back to something they got wrong, gets it right, and watches the road open.</p></div>
<div class="card p" style="margin-top:2pt"><h3>What is in this pack</h3>
<p class="small" style="margin:0">The finished game &middot; ten minutes to make it yours &middot;
how to write questions worth answering &middot; five ways to run it in class, with timings &middot;
four copy-and-paste prompts that change the game itself &middot; the fixes for what actually goes
wrong &middot; and where your things live.</p></div>
</div>
<div class="foot"><span>Built and audited by two certified teachers</span><span>Bright Scholar &middot; AI-Ready School</span></div>
<div class="barb"></div></div>`);

/* ------------------------------------------------------------------ 2 --- */
P('Start here','<h2>Ten minutes, start to finish</h2>',`
<p class="lede">Do these in order. You are playing your own version by the end of step four.</p>
<div class="step"><div class="n">1</div><div>
<h3>Unzip the folder and double-click <code>long-road.html</code></h3>
<p class="small" style="margin:0">It opens in whatever browser you already use. Nothing installs,
nothing asks you to sign in. The sample round is about the water cycle, so play a fork or two to see
the shape of it before you change anything.</p></div></div>
<div class="step"><div class="n">2</div><div>
<h3>Press <b>Put my own questions in</b></h3>
<p class="small" style="margin:0">It is on the opening screen, under the Set out button. That is the
setup screen, and it is the only place you ever need to go.</p></div></div>
<div class="step"><div class="n">3</div><div>
<h3>Fill in the title, the destination, and what you are reviewing</h3>
<p class="small" style="margin:0">The destination is where the class is traveling to. Name it
something from your unit and the whole round reads as though it was written for that unit, because
it was. <b>Sixth grade fractions</b> and <b>Halfway Camp</b> take nine seconds and do a lot of work.</p></div></div>
<div class="step"><div class="n">4</div><div>
<h3>Get your questions in, by whichever of these suits you</h3>
<p class="small" style="margin:0"><b>Have AI draft them.</b> Copy the prompt the screen gives you,
paste it into whichever AI tool you use, paste the answer back into the box, press Load. About
thirty seconds. <b>Read them before you play them</b> &mdash; AI gets things wrong, and you are the
one who knows your standards. <b>Or type them in</b> on the same screen, one card per question.
<b>Or paste a list you already have</b>, one question per line.</p></div></div>
<div class="step"><div class="n">5</div><div>
<h3>Press <b>Save my game as a file</b></h3>
<p class="small" style="margin:0">This is the step people skip and regret. It hands you back a
single file with your questions already inside it. Put it wherever you keep your own work. It opens
on any computer, it survives clearing your browsing data, and you can email it to a colleague who
can then change it for their own class.</p></div></div>
<div class="note"><b>Keep the original.</b> Save each round as its own file &mdash;
<code>fractions.html</code>, <code>cell-parts.html</code>, <code>chapter-7.html</code> &mdash; and
leave <code>long-road.html</code> as it came. Then a round you want back next year is still there,
and you always have a clean copy to start from.</div>`);

/* ------------------------------------------------------------------ 3 --- */
P('The part that decides everything','<h2>Questions worth answering</h2>',`
<p class="lede">The game is the same whatever you put in it. <b>The questions are the lesson</b>, and
four small decisions on the setup screen are what separate a round students ask to replay from a
quiz with scenery.</p>
<table>
<thead><tr><th style="width:74pt">On the screen</th><th>What it is for</th><th>Getting it right</th></tr></thead>
<tbody>
<tr><td><b>The question</b></td><td>What you are asking</td><td>One idea per question. If a student needs two things to answer it, a miss does not tell you which one they are missing.</td></tr>
<tr><td><b>Idea it tests</b></td><td>The game tracks mastery <b>by idea</b>, never asks two of the same idea in a row, and brings a missed idea back later</td><td><b>Three or four ideas in a round, several questions each.</b> This is the setting most people get wrong. Twelve different ideas gives the game nothing to work with.</td></tr>
<tr><td><b>Level</b></td><td>Students choose their own difficulty by choosing the road, so every level needs questions waiting</td><td>Roughly a third each. Level 1 is recall, level 2 is applying it, level 3 is reasoning about something they have not seen before.</td></tr>
<tr><td><b>Why the answer is right</b></td><td>The one line held on screen after a wrong answer</td><td><b>Write this one properly.</b> It is the only teaching the game does. A student who got it wrong should be able to learn from this sentence alone, with nobody explaining it.</td></tr>
</tbody></table>
<div class="card t"><h3>What a good "why" line sounds like</h3>
<p class="small" style="margin-bottom:5pt"><b>Weak:</b> "Evaporation is the correct answer."
That tells a student who was wrong absolutely nothing.</p>
<p class="small" style="margin:0"><b>Strong:</b> "The water did not go anywhere solid or liquid.
Heat turned it into vapor." Now the miss was worth something.</p></div>
<div class="card r"><h3>Twelve to twenty questions is a round</h3>
<p class="small" style="margin:0">Fewer than six and the game runs out of things to ask. More than
about twenty and a single round stops being a review and starts being a test, which is not what
anybody is here for. You can make as many rounds as you like; each is its own saved file.</p></div>
<div class="note"><b>Wrong answers do real work here.</b> Make the wrong three plausible. The three
students most often confuse with the right one will teach you more, in the room, than any number
they could score.</div>`);

/* ------------------------------------------------------------------ 4 --- */
P('In the room','<h2>Five ways to run it</h2>',`
<p class="lede">Same file every time. Only who holds the mouse changes.</p>
<div class="card"><h3>1 &middot; Whole class, projected &mdash; 15 to 20 minutes</h3>
<p class="small" style="margin:0">The road comes up, the class argues about which one to take, you
click. Answers by hands, by whiteboards, or by calling on somebody. <b>The arguing at the fork is
where the learning is</b>, so do not rush it. Best first outing, because nobody is on the spot alone.</p></div>
<div class="card t"><h3>2 &middot; Pairs on one device &mdash; 20 minutes</h3>
<p class="small" style="margin:0">Two students, one screen, and a rule that they have to agree
before clicking. That rule is the whole activity. You are free to walk and listen, which is the best
data you will get all week.</p></div>
<div class="card g"><h3>3 &middot; A station &mdash; runs itself</h3>
<p class="small" style="margin:0">Leave it open on the one computer in the corner. There is no
timer, no login and no way to lose, so a student arriving mid-round can simply play. Put the file on
a flash drive and it works on a machine with no internet at all.</p></div>
<div class="card r"><h3>4 &middot; The five minutes before the bell</h3>
<p class="small" style="margin:0">One fork, one question, out. Because the game remembers nothing
between openings except the class best, there is no cost to stopping anywhere.</p></div>
<div class="card p"><h3>5 &middot; Students write the questions &mdash; a whole lesson</h3>
<p class="small" style="margin:0">Hand groups the four parts from page 3 and make them write
questions for the round, <b>including the why line</b>. Writing a good wrong answer is harder than
answering one, and it shows you who actually understands the unit. Then play the class's own round.
This is usually the day people tell you about afterwards.</p></div>
<div class="note"><b>Two things not to do.</b> Do not put a student's name on the screen &mdash;
there is nowhere to type one and that is deliberate. And do not tie it to a grade. The moment a
score counts, the fun stops doing the work and the game becomes a test with hills in it.</div>`);

/* ------------------------------------------------------------------ 5 --- */
P('Make it yours','<h2>Four prompts that change the game itself</h2>',`
<p class="lede">Everything so far needed no code. This page is the other half: <b>the game is one
file you own, so you can change how it works</b>, not just what it asks. Open
<code>long-road.html</code> in any AI assistant that accepts a file, paste one of these, and ask for
the whole file back. Save the result as a <b>new</b> file and keep the old one.</p>
<div class="prompt"><div class="lbl">1 &middot; Change the world it happens in</div>
Here is a working HTML game. Change the setting from a road across open country to <b>a voyage
between islands</b>. Keep every rule exactly as it is: the choice at each fork, the question that
resolves it, the blocked crossings, the celebration when one is cleared. Change only the words, the
colors and the shapes that are drawn. Give me the whole file back.</div>
<div class="prompt"><div class="lbl">2 &middot; Make a round shorter or longer</div>
In this file, change the length of a journey so it takes about <b>eight</b> forks instead of the
current number, and tell me which line you changed and what the number means, so I can change it
myself next time.</div>
<div class="prompt"><div class="lbl">3 &middot; Add something the class chooses together</div>
Add one more piece of gear a player can pick at a camp: <b>a spyglass that shows which idea the next
fork will ask about</b>. Follow exactly how the existing gear is written. Do not change anything else.</div>
<div class="prompt"><div class="lbl">4 &middot; Make it easier to read at the back of the room</div>
Increase every font size in this game by about a quarter and raise the contrast of the answer
buttons, keeping the layout intact so nothing overflows on a projector at 1280 by 720. Give me the
whole file back.</div>
<div class="note"><b>Three rules that will save you an afternoon.</b> Change <b>one</b> thing per
prompt, and play it before you ask for the next one. Always say <i>give me the whole file back</i>,
or you will get a fragment and no way to place it. And always save under a new name &mdash; then a
result you dislike costs you nothing at all.</div>`);

/* ------------------------------------------------------------------ 6 --- */
P('When it goes wrong','<h2>The things that actually break</h2>',`
<p class="lede">In order of how often they happen.</p>
<table>
<thead><tr><th style="width:150pt">What you see</th><th>What to do</th></tr></thead>
<tbody>
<tr><td><b>"Not ready to play yet", with a list</b></td><td>Nothing is broken. The game will not start on questions it cannot use, and the list names every one. The usual causes are an empty fourth answer and a missing why line.</td></tr>
<tr><td><b>Pasted questions did not load</b></td><td>Every line needs eight parts separated by the | character. If the AI numbered the lines or added a sentence of its own, delete those lines and press Load again. The message tells you which line numbers it skipped and why.</td></tr>
<tr><td><b>Your questions disappeared</b></td><td>They were kept in the browser and the browsing data was cleared, or you opened the file on a different computer. This is exactly what <b>Save my game as a file</b> prevents, and why page 2 puts it in step five.</td></tr>
<tr><td><b>The same idea keeps coming up</b></td><td>Most of your questions are tagged with one idea. Give the round three or four, several questions each.</td></tr>
<tr><td><b>A fork offers only easy roads</b></td><td>There are no level 2 or level 3 questions left unused. Add a few harder ones.</td></tr>
<tr><td><b>It will not open at all</b></td><td>Right-click the file, choose Open with, and pick a browser. A school laptop sometimes tries to open an HTML file in a text editor.</td></tr>
<tr><td><b>An AI change broke the game</b></td><td>Delete that file and open the copy you kept. This is the whole reason page 5 says to save under a new name.</td></tr>
</tbody></table>
<div class="card t"><h3>If the AI hands you back a file that will not run</h3>
<p class="small" style="margin:0">Give it back the error and one sentence: <i>this stopped working
after your change, here is what the browser says, fix only that.</i> Do not start again from the
beginning &mdash; the second attempt almost always lands.</p></div>`);

/* ------------------------------------------------------------------ 7 --- */
P('The honest page','<h2>What it does not do, and where your things live</h2>',`
<div class="card r"><h3>Blooket, Gimkit and Kahoot exist, and they are good</h3>
<p class="small" style="margin:0">They start faster and look slicker, and a class already knows
them. This is a different trade, and it is worth being plain about it: <b>no logins for anybody,
works with the wifi down, cannot be blocked or switched off, nothing to renew, and every rule in it
is yours to change.</b> There are also AI tools that will generate a classroom game from a sentence.
Those are games on somebody else's platform, behind somebody else's account. This is a file on your
drive. Pick whichever suits the day.</p></div>
<div class="card"><h3>Where your things live, in three lines</h3>
<p class="small" style="margin-bottom:4pt"><b>Your questions.</b> On this page while you type them,
in your browser if you press Keep, and in your own file when you press Save. They are yours, they
are not about any student, and they are transmitted nowhere.</p>
<p class="small" style="margin-bottom:4pt"><b>The class best.</b> Days and ideas only, kept in that
one browser on that one computer. No names, because there is nowhere to put one.</p>
<p class="small" style="margin:0"><b>Anything you paste into an AI tool.</b> That leaves the room,
and it goes to a company. Questions about the water cycle are fine. <b>A student's name, work,
score, or anything about their needs is not</b> &mdash; that is the line, it does not move, and it
applies to every AI tool your building uses.</p></div>
<div class="note"><b>The most-asked feature, refused on purpose.</b> There is no leaderboard with
student names, and there will not be one. It would put children's names and performance into a file
that gets emailed around, and ranking students publicly does the most damage to the ones already
struggling. The score the game keeps is <b>ideas locked in</b>, it only ever goes up, and the
biggest moment in the whole game belongs to the student who was wrong and is now right.</div>
<div class="card p"><h3>What this pack is not</h3>
<p class="small" style="margin:0">It is not a course in programming, and it does not teach you to
build a game from nothing. It hands you a working one, shows you how to fill it with your own
content in ten minutes, and shows you how to change it by asking. That is the whole promise, and it
is the whole of what is in the box.</p></div>`);

/* ------------------------------------------------------------------ 8 --- */
P('Yours to use','<h2>License, credit, and one favor</h2>',`
<div class="card g"><h3>What you may do</h3>
<p class="small" style="margin:0">Use it with your own students for as long as you teach. Change it
however you like. Save as many versions as you want. Put it on the classroom computers, on a flash
drive, on a laptop cart. Your one purchase covers you and your classes.</p></div>
<div class="card r"><h3>What needs another license</h3>
<p class="small" style="margin:0">Sharing it with other teachers, putting it on a shared drive or
server, or handing it round a department or a building. Additional licenses are half price on the
listing, and a school can buy them on a single purchase order. Please do not post the file
publicly or sell anything made from it.</p></div>
<div class="card t"><h3>A note on the shape of the game</h3>
<p class="small" style="margin:0">Journeys, forks and supplies are old ideas that belong to nobody,
and you are welcome to build on them. The words, the art and the code in this file are ours. That
distinction is worth knowing if you start changing games with AI: <b>how a game works is free to
borrow, and the way a particular game says and draws it is not.</b> Build on the idea, write your
own words.</p></div>
<div class="note"><b>If this earned its keep, would you leave a review?</b> TPT gives you credits
toward your next purchase for it, and it is the only thing that decides whether another teacher ever
sees this. If something did not work, tell us that instead and we will fix it.</div>
<div class="card"><h3>Built and audited by two certified teachers</h3>
<p class="small" style="margin:0">Written by classroom teachers, used with real classes, and checked
by a second teacher before it shipped. The game was played start to finish, on a teacher's own set
of questions, before this pack was published.</p></div>`);
