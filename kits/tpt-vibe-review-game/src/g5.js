const {P}=require('./g1.js');

P('When it breaks','<h2>The six failures you will actually hit</h2>',`
<p class="lede">In roughly the order they happen.</p>
<table>
<thead><tr><th style="width:36%">What you see</th><th>What it is, and the sentence that fixes it</th></tr></thead>
<tbody>
<tr><td><b>A blank white page</b></td><td>One JavaScript error stops everything. Press F12, read the red line, paste it in with <b>this is the error and this is what I was doing.</b></td></tr>
<tr><td><b>Blurry, soft-edged sprites</b></td><td>Smoothing is on. Say: <b>set imageSmoothingEnabled to false and add image-rendering pixelated to the canvas in CSS.</b></td></tr>
<tr><td><b>The health bar jumps instead of draining</b></td><td>It is drawing the real value. Say: <b>keep a separate shown value per bar and ease it toward the true one each frame.</b></td></tr>
<tr><td><b>Clicking fast answers twice</b></td><td>No lock. Say: <b>ignore clicks until the next question is asked.</b></td></tr>
<tr><td><b>It wants me to run npm install</b></td><td>You got a framework. Say: <b>rewrite this as one HTML file with no frameworks, no libraries and no build step.</b></td></tr>
<tr><td><b>It works, then the third change breaks it</b></td><td>The file has outgrown the chat. Start a fresh chat, paste the whole current file, then ask for the one change.</td></tr>
</tbody></table>
<div class="note"><b>The habit worth more than the table:</b> paste the error <i>with what you were
doing when it happened</i>. "It broke" gets you guesses. "I clicked the second answer and the
screen went white, here is the console" gets you the fix.</div>`);

P('Prompts','<h2>Every prompt, in one place &mdash; 1 to 6</h2>',`
<p class="small">Copy and paste. Square brackets mean put your own words in.</p>
<div class="prompt"><div class="lbl">1 &middot; the stage</div>
Build a single HTML file, no frameworks and no build step, that runs by opening it in a browser.
Put a canvas in it, 640 by 360, scaled to fit, with imageSmoothingEnabled set to false. Set up a
state object, a draw function, and a game loop using requestAnimationFrame, kept separate. Draw a
dark sky, a horizon band and a floor, with stars at fixed positions. Make something move every
frame so I can see the loop is alive.</div>
<div class="prompt"><div class="lbl">2 &middot; sprites</div>
I want pixel sprites written as arrays of text, one character per pixel, a dot for transparent, so
I can edit the art by typing. Write a function that takes one of those arrays, a color map, an x
and y and a pixel size, and draws it. Make a small hero bottom left and a big boss at least
fourteen pixels wide on the right, four or five times the hero. Give the boss a slow bob and a
soft glow behind it.</div>
<div class="prompt"><div class="lbl">3 &middot; health bars</div>
Add health to the state: boss 200, class 100. Draw a bar for each with a label and numbers, boss
at the top under its name, class at the bottom under the hero. The bars must slide toward the real
value rather than jumping: keep a separate shown value per bar and move it twelve percent of the
remaining distance each frame. Yellow below half, red below a quarter.</div>
<div class="prompt"><div class="lbl">4 &middot; questions</div>
Put my questions in a plain array at the very top of the file, above all the game code, with a
comment saying this is the part a teacher edits. Each has a question, four answers, and which is
right counting from zero. Below the canvas show the question and four real HTML buttons, not drawn
on the canvas, numbered 1 to 4 with those number keys working. Shuffle the answers every question
and the questions every fight.</div>
<div class="prompt"><div class="lbl">5 &middot; damage</div>
When the right answer is clicked, take 14 to 18 off the boss with a little randomness. Disable all
four buttons, highlight which was right, wait about a second, ask the next. Track a streak; after
three in a row some hits are critical for roughly double with a different message. Show the streak
once it is above one.</div>
<div class="prompt"><div class="lbl">6 &middot; consequences</div>
When a wrong answer is clicked, the class takes 12 to 17 and the streak resets. Mark the clicked
one red and still highlight the right one green. Say "Not that one, look at the highlighted
answer". Wait about 1.7 seconds before the next question instead of 0.9, so there is time to read
it.</div>`);

P('Prompts','<h2>Every prompt, in one place &mdash; 7 to 12</h2>',`
<div class="prompt"><div class="lbl">7 &middot; juice</div>
Add three things when a hit lands. Screen shake: offset the whole canvas by a small random amount
for a few frames and let it settle. A white flash: draw whoever got hit in solid white for about
eight frames. A floating damage number that drifts up and fades. Criticals shake harder and show a
bigger number in gold. Keep all three to a few frames, not a second.</div>
<div class="prompt"><div class="lbl">8 &middot; sound</div>
Add sound using the Web Audio API to generate tones, no audio files at all. One small function
that plays a tone at a given pitch for a given length. Use it for a hit, a critical as a quick
rising run, taking damage as a low buzz, winning as a four-note fanfare, losing as three falling
notes. Quiet, under a quarter second except the endings. Keep working if audio is blocked.</div>
<div class="prompt"><div class="lbl">9 &middot; the endings</div>
When the boss reaches zero show a win screen over the canvas with a headline, how many were right
out of how many, and how long it took. When the class reaches zero show a different screen that
says so plainly and invites a rematch. Both have a button that starts a fresh fight with questions
reshuffled. Enter works on both.</div>
<div class="prompt"><div class="lbl">10 &middot; the record</div>
Save the fastest winning time to localStorage and show it on the title and win screens. Only save
on a win. Wrap every read and write in try and catch so the game works if storage is unavailable,
and show "No class record yet" when there is not one.</div>
<div class="prompt"><div class="lbl">11 &middot; reach</div>
Make sure this works for someone using a keyboard instead of a mouse: every answer reachable with
Tab, usable with Enter, a clearly visible outline on the selected one, first answer focused when a
question appears. Do not use color alone to show right and wrong. Buttons big enough for a
finger, one column on a narrow screen, and it must fit a Chromebook with nothing cut off.</div>
<div class="prompt"><div class="lbl">12 &middot; when three rounds have not fixed it</div>
[Start a fresh chat.] Here is my whole file. [paste it] Change only this one thing: [the thing].
Do not change anything else, and give me the whole file back.</div>`);

P('The files','<h2>What is in this download</h2>',`
<div class="card t"><h3>boss-battle.html</h3>
<p class="small" style="margin:0">The finished game, built by exactly these twelve tasks and
played in a browser before publication. <b>Open it and play it first.</b> Knowing what the target
feels like makes every prompt land better. It works as-is: change the eight questions at the top
and it is your unit tonight.</p></div>
<div class="card"><h3>Two ways to use this pack, both fine</h3>
<p class="small" style="margin:0"><b>Build it</b> &mdash; work the twelve tasks and end up with
something you understand well enough to change in March. <b>Play it</b> &mdash; swap the questions
at the top and use it tomorrow, then read the tasks when you want to change something. The first
teaches more. The second is a review game before homeroom.</p></div>
<div class="card r"><h3>The eight lines you edit</h3>
<pre>const BOSS_NAME = 'The Water Cycle';
const UNIT_NAME = 'Water Cycle Review';

const QUESTIONS = [
  { q: 'Your question here?',
    a: ['Right one','Wrong','Wrong','Wrong'], ok: 0 },
];</pre>
<p class="small" style="margin:0">Everything else in the file is the game. You never have to touch
it.</p></div>
<div class="note"><b>More questions is better.</b> Eight works. Sixteen means a fight rarely
repeats itself and the same file survives a whole unit.</div>`);

P('The questions','<h2>How to write ones worth fighting over</h2>',`
<p class="lede">This page matters more than any of the code. A game with lazy questions is a
lazy game, however good the explosions are.</p>
<div class="card r"><h3>The rule: wrong answers should be the mistakes your students actually make</h3>
<p class="small" style="margin-bottom:5pt"><b>Weak:</b> "Water turning to vapor is called?"
&mdash; Evaporation / A dog / Tuesday / Purple.</p>
<p class="small" style="margin:0"><b>Strong:</b> Evaporation / Condensation / Precipitation /
Transpiration. Every one is a real term from the unit, so getting it right means knowing the
difference rather than spotting the joke.</p></div>
<div class="card t"><h3>Where to find those wrong answers</h3>
<p class="small" style="margin:0">Your last quiz. The four things students actually put are
better distractors than anything you or an AI will invent, <b>and you already have them.</b>
Grade a stack, write down the four most common wrong answers, and the game writes itself.</p></div>
<div class="card"><h3>Ask an AI for help the right way</h3>
<p class="small" style="margin-bottom:5pt">Bad: "write me eight questions about the water cycle."</p>
<p class="small" style="margin:0">Better: <b>"Here are four questions and the wrong answers my
students actually gave. Write four more in the same shape, where every wrong answer is a real
misconception rather than an obvious joke."</b> Do not send student work or names &mdash; type
the misconceptions in yourself.</p></div>
<div class="card g"><h3>A mix that works</h3>
<p class="small" style="margin:0">Two easy ones to get a streak going, four that are the actual
content, two that are genuinely hard. Front-load an easy one so the first hit lands early and the
room is in it.</p></div>`);

P('In the room','<h2>Five ways to run it</h2>',`
<div class="card t"><h3>1. Whole class, one screen</h3>
<p class="small" style="margin:0">Project it. Cold-call who answers, or take a vote of hands
first. <b>This is the one to start with</b> and the best use of the shared health bar &mdash; one
class, one fate.</p></div>
<div class="card"><h3>2. Two teams, alternating</h3>
<p class="small" style="margin:0">Left side, right side, take turns. The class bar becomes
whichever team is up. Loud, and worth it.</p></div>
<div class="card g"><h3>3. Individually on Chromebooks</h3>
<p class="small" style="margin:0">Send the file or drop it in a shared folder &mdash; they open it
and play alone at their own pace. No logins, nothing to join, works if the wifi is out.</p></div>
<div class="card p"><h3>4. Early finishers</h3>
<p class="small" style="margin:0">Leave it open on a spare machine. Beat the class record.</p></div>
<div class="card r"><h3>5. A substitute can run it</h3>
<p class="small" style="margin:0">"Open this file, project it, let them play." Nothing to log
into and nothing to break. Worth leaving in the sub folder.</p></div>
<div class="note"><b>The thing to say on the first day:</b> "I built this." Then take two minutes
at the end to show them the eight lines with the questions in. Some of them will go home and try
it, which is a better outcome than the review.</div>`);

P('Said plainly','<h2>Building in somebody else&rsquo;s genre without stealing</h2>',`
<p class="lede">The first thing most teachers want to make is a version of a game they love.
Here is where the line actually sits.</p>
<div class="card t"><h3>The distinction that matters</h3>
<p class="small" style="margin:0"><b>Systems are not protected. Expression is.</b> Turn-based
fights, health bars, experience points, type advantages, critical hits, a four-option menu &mdash;
those are rules, and rules are used by hundreds of games. <b>Names, characters, artwork, music,
logos and written lines are protected</b>, and those are the things you must not take.</p></div>
<div class="card g"><h3>So you may freely</h3>
<p class="small" style="margin:0">Build a turn-based fight with a menu of four moves &middot; use
health bars that drain and a critical hit &middot; make a type chart of your own design &middot;
use badges that unlock areas &middot; use the chunky four-shade handheld look, which is a hardware
idiom hundreds of independent games use &middot; write chiptune-style sounds of your own.</p></div>
<div class="card r"><h3>And you must never</h3>
<p class="small" style="margin:0">Use a protected game's names, characters, creatures, places,
items or move names &mdash; anywhere, including in your code and your file names &middot; copy,
trace or recolor its artwork or fonts &middot; use its melodies, even altered &middot; reuse its
lines of dialogue, including the famous short ones. <b>Write your own in your own voice.</b></p></div>
<div class="card"><h3>The checklist, at the end of every session</h3>
<p class="small" style="margin:0">Search your whole file for the protected names &mdash; there
should be none &middot; read every line the player sees out loud, and rewrite any that sounds like
a line you have heard &middot; look at each sprite and ask whether a fan would name it; if so,
redraw it &middot; hum your victory sound, and if it resolves into somebody else's tune, rewrite
it.</p></div>
<div class="note"><b>And the practical point.</b> A classroom game you never publish is a very
different risk from one you sell or put online. Keep it in your room and this is mostly about
teaching students to do it properly. Put it on the internet and the checklist is not optional.
<b>This is not legal advice &mdash; it is the line a careful teacher can hold.</b></div>`);

P('Where the data lives','<h2>The shortest privacy page in this series</h2>',`
<p class="lede">Because the honest answer is: there is almost nothing to say, and that is the
point.</p>
<div class="card g"><h3>What this game knows about your students</h3>
<p class="small" style="margin:0"><b>Nothing.</b> No names, no accounts, no scores against people,
no roster. It cannot know anything, because there is nowhere to type it and nothing to type it
into.</p></div>
<div class="card t"><h3>What leaves the room</h3>
<p class="small" style="margin:0"><b>Nothing.</b> The file is on the computer it is running on.
There is no server, no network call, no analytics and no company behind it. Unplug the internet
and it plays exactly the same.</p></div>
<div class="card"><h3>The one thing it saves</h3>
<p class="small" style="margin:0">A single number &mdash; the fastest winning time &mdash; in that
browser on that machine. No name attached, by design. If somebody clears browsing data it is gone,
and nothing is lost that matters.</p></div>
<div class="card r"><h3>Keep it that way</h3>
<p class="small" style="margin:0">The obvious next feature is storing who got the high score. Do
not. That single change turns a toy with no data into a student record on a shared classroom
computer, and the bragging is not worth the conversation. <b>A time with nobody's name on it is
still something a class will fight over.</b></p></div>
<div class="note"><b>Worth saying to an administrator in one sentence:</b> "It is a file on my
computer that has no student information in it and does not connect to anything." That is the
whole disclosure, and it is true.</div>`);

P('Test it like you mean it','<h2>Eight things to try before a class sees it</h2>',`
<p class="lede">Ten minutes at your desk saves a period.</p>
<table>
<thead><tr><th style="width:50%">Try this</th><th>You want</th></tr></thead>
<tbody>
<tr><td>Answer everything right</td><td>A win in about twelve questions</td></tr>
<tr><td>Answer everything wrong</td><td>A loss in about seven, and a rematch offered</td></tr>
<tr><td>Get three right in a row</td><td>A critical hit, louder and bigger</td></tr>
<tr><td>Click an answer twice, fast</td><td>The second click ignored</td></tr>
<tr><td>Play using only the number keys</td><td>A whole fight, no mouse</td></tr>
<tr><td>Win, close the tab, reopen it</td><td>The class record still there</td></tr>
<tr><td>Start four fights in a row</td><td>A different first question most times</td></tr>
<tr><td>Open it on the classroom machine</td><td>Nothing cut off, sound audible</td></tr>
</tbody></table>
<div class="card r"><h3>The one everybody skips</h3>
<p class="small" style="margin:0"><b>The Chromebook.</b> You built it on a laptop. Your class does
not have your laptop. Two minutes now, or a ruined period later.</p></div>
<div class="card t"><h3>And one worth doing with a person</h3>
<p class="small" style="margin:0">Hand it to a colleague and say nothing at all. If they hesitate
about what to do, your first question or your buttons need work &mdash; not their attention.</p></div>`);

P('Make it yours','<h2>Six changes that take one prompt each</h2>',`
<p class="lede">The game you built is a starting point. Each of these is one sentence to an AI.</p>
<div class="card t"><h3>Re-skin it</h3>
<p class="small" style="margin:0"><b>"Change the palette to these colors and redraw the boss as
[a thing from my unit]."</b> The sprites are text arrays, so a new boss is a few lines.</p></div>
<div class="card"><h3>More than one boss</h3>
<p class="small" style="margin:0"><b>"After the boss dies, a tougher second one appears with more
health."</b> A unit becomes a gauntlet.</p></div>
<div class="card g"><h3>Let them heal</h3>
<p class="small" style="margin:0"><b>"Three right in a row heals the class ten."</b> Rewards a run
and keeps a struggling class alive longer.</p></div>
<div class="card p"><h3>A timer per question</h3>
<p class="small" style="margin:0"><b>"Ten seconds to answer, and running out counts as wrong."</b>
Use carefully &mdash; it raises the stakes and it raises the anxiety.</p></div>
<div class="card r"><h3>Categories as moves</h3>
<p class="small" style="margin:0"><b>"Four buttons for four topics; picking one draws a question
from that topic."</b> Now the class is choosing strategy, not just answering.</p></div>
<div class="card"><h3>Two-player</h3>
<p class="small" style="margin:0"><b>"Two teams alternate turns and each has its own health
bar."</b> The loudest version of this game.</p></div>
<div class="note"><b>Change one thing at a time and play it after each one.</b> Two changes in one
prompt means two things to untangle when it breaks, and it will break.</div>`);

P('For the teacher','<h2>How this pack is built, and what it does not claim</h2>',`
<div class="card t"><h3>Where this comes from</h3>
<p class="small" style="margin:0">Not theory. I build software for my own high school shop course
and run it with real students all year, including a full retro game with its own design document
and a written set of rules about what may and may not be borrowed from the genre it sits in. The
IP page in this pack is that thinking, reduced to the part a teacher needs.</p></div>
<div class="card"><h3>What was tested before this went out</h3>
<p class="small" style="margin:0">The included game was played in a real browser, start to
finish, both ways. A perfect run won in <b>10 answers</b> and the class bar never moved. A run of
deliberate wrong answers lost in <b>8</b>. The number keys answered, the class record survived a
reload, and four fights in a row opened with four different questions. No console errors
anywhere.</p></div>
<div class="card r"><h3>What is NOT claimed</h3>
<p class="small" style="margin-bottom:5pt">&bull; <b>Not a replacement for Blooket or Gimkit.</b>
They are faster to start and more polished. The trade is on page 3, stated in both directions.</p>
<p class="small" style="margin-bottom:5pt">&bull; <b>Not a gradebook.</b> It records no scores
against any student and should not.</p>
<p class="small" style="margin-bottom:5pt">&bull; <b>Not legal advice</b> about copyright. The IP
page is how a careful teacher can hold the line, not a substitute for a lawyer if you intend to
publish.</p>
<p class="small" style="margin:0">&bull; <b>Not guaranteed to come out identical.</b> You are
working with a model; your boss will look different from mine. That is the point.</p></div>
<div class="card g"><h3>Why the prompts spend so much time saying no</h3>
<p class="small" style="margin:0">No frameworks. No build step. No audio files. No color-only
signals. Left alone a model builds what most software looks like, and most software has more parts
than a teacher can maintain. <b>Saying no is the part of prompting nobody teaches, and it is most
of the skill.</b></p></div>`);

P('One last thing','<h2>If this was useful</h2>',`
<div class="card t"><h3>Leaving a review earns you TPT credit</h3>
<p class="small" style="margin:0">TPT gives you credit toward future purchases for every review
you leave, and reviews are how other teachers find work like this. Thirty seconds.</p></div>
<div class="card r"><h3>If it did not work, tell me before you rate it</h3>
<p class="small" style="margin:0">The Q&amp;A on the listing reaches me directly. A game that will
not open is almost always one line, and I would far rather fix it than have you stuck with a file
that does nothing.</p></div>
<div class="card"><h3>The one thing to take away</h3>
<p class="small" style="margin:0"><b>The fun is not in the rules. It is in the shake, the flash,
the number and the sound.</b> That is true of every game you have played, it takes about twenty
lines, and it is the difference between something your class tolerates and something they ask
for.</p></div>
<div class="note"><b>Built and audited by two certified teachers.</b><br>
Every prompt here was run. The game was played through to a win and to a loss before this went
out, on the file that is in this download.</div>`);

module.exports={};
