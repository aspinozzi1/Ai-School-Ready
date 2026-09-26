const {P}=require('./e1.js');

P('When it breaks','<h2>The six failures you will actually hit</h2>',`
<p class="lede">In roughly the order they arrive.</p>
<table>
<thead><tr><th style="width:36%">What you see</th><th>What it is, and the sentence that fixes it</th></tr></thead>
<tbody>
<tr><td><b>Trees floating over the ridges</b></td><td>Shapes drawn at a fixed height. Say: <b>ask the ridge function for its surface height at that x and stand the shape on it.</b></td></tr>
<tr><td><b>The old question still showing under the new fork</b></td><td>A panel never hidden. Say: <b>hide the question panel whenever the fork appears.</b></td></tr>
<tr><td><b>It gives me lumpy pixel sprites</b></td><td>You asked for art it cannot see. Say: <b>no pixel art, draw everything as solid silhouettes from paths and gradients.</b></td></tr>
<tr><td><b>Every road feels the same</b></td><td>The levels are not really different. This is a content problem, not a code one &mdash; go back and make the level 3 questions genuinely hard.</td></tr>
<tr><td><b>Blocked crossings never appear</b></td><td>Misses are being recorded against the question, not the idea. Say: <b>track missed ideas, not missed questions.</b></td></tr>
<tr><td><b>It wants me to run npm install</b></td><td>You got a framework. Say: <b>rewrite as one HTML file, no frameworks, no libraries, no build step.</b></td></tr>
<tr><td><b>It worked and now the third change broke it</b></td><td>The file has outgrown the chat. Fresh chat, paste the whole file, ask for one change, ask for the whole file back.</td></tr>
</tbody></table>
<div class="note"><b>The habit worth more than the table:</b> paste the error <i>with what you were
doing</i>. "It broke" gets guesses. "I clicked the hard road and the screen froze, here is the
console" gets the fix.</div>`);

P('Prompts','<h2>Every prompt, in one place &mdash; 1 to 4</h2>',`
<p class="small">Copy and paste. Square brackets mean put your own words in.</p>
<div class="prompt"><div class="lbl">1 &middot; the world</div>
Build a single HTML file, no frameworks and no build step, that runs by opening it in a browser.
Canvas 640 by 360, scaled to fit. A state object, a draw function and a game loop using
requestAnimationFrame, kept separate. A dusk sky as a vertical gradient with four stops, deep blue
through violet and warm rose to amber at the horizon. Three ridges from a sine wave, each lower,
flatter, darker and scrolling faster than the one behind it. A low sun with a wide soft radial
glow, and a translucent warm band across the valley for haze. No pixel art anywhere.</div>
<div class="prompt"><div class="lbl">2 &middot; sprites on the land</div>
Draw the traveler, the trees and the destination as solid silhouettes built from paths and simple
shapes, not pixel art and not images. The traveler is a circle head, a tapered body, two legs and a
staff. Trees are tapered triangles at varied heights. Write a function that asks a ridge what its
surface height is at a given x and place everything so it sits exactly on that line. Add a soft
shadow under the traveler and a warm rim light along the edge facing the sun.</div>
<div class="prompt"><div class="lbl">3 &middot; the fork</div>
Below the canvas, before any question is asked, offer two or three roads as buttons, each with a
name, a short description and what it asks and pays. An easy road asking two level-1 questions,
slow, costing no supplies. A steady road asking one level-2. A hard road asking one level-3 that
gains a day and pays a supply. Generate the set fresh at every fork and shuffle the order. Number
the buttons and let those keys choose.</div>
<div class="prompt"><div class="lbl">4 &middot; drawing the question</div>
Put my questions in a plain array at the very top of the file, above all game code, with a comment
saying this is the part a teacher edits. Each has a question, four answers, which is right counting
from zero, an idea, a level from 1 to 3, and a why. When a road is chosen, draw a question matching
that level. Never ask the same idea twice running, and prefer questions seen least. Real HTML
buttons below the canvas, numbered, answers shuffled.</div>`);

P('Prompts','<h2>Every prompt, in one place &mdash; 5 to 8</h2>',`
<div class="prompt"><div class="lbl">5 &middot; supplies</div>
Add supplies starting at six, shown as icons in a status bar with the day count and progress to the
destination. A wrong answer costs one. A clean hard road pays one back. When supplies reach zero
the player does not lose: they fall back to the last camp, lose three days, get half their supplies
back and continue. There is no lose screen anywhere in this game.</div>
<div class="prompt"><div class="lbl">6 &middot; the reason</div>
On a wrong answer mark the clicked one red, highlight the right one green, and show the question's
why underneath in a boxed line. Hold all of it for about 2.6 seconds before moving on, against 1
second after a right answer. Never use color alone: the right answer also gets a label a screen
reader announces.</div>
<div class="prompt"><div class="lbl">7 &middot; blocked crossings</div>
Track which ideas the player has got wrong. Once there is at least one, a washed-out crossing can
appear as one of the roads at a fork, tagged so it is obviously different, saying they turned back
here before, asking a question about that specific idea. Show a count of blocked roads in the
status bar. The crossing is always optional and there is always another road at the same fork.</div>
<div class="prompt"><div class="lbl">8 &middot; the fix</div>
When a washed-out crossing is answered right, remove that idea from missed, add it to mastered, and
show a full-screen celebration, the only one in the game, naming the idea and saying they turned
back here before. Give it the longest sound. Also make fixing a missed idea anywhere else loud: a
big floating FIXED, the same sound, a line saying they have put right what they got wrong. Nothing
else gets a full screen, including arriving.</div>`);

P('Prompts','<h2>Every prompt, in one place &mdash; 9 to 12</h2>',`
<div class="prompt"><div class="lbl">9 &middot; camps</div>
Every four legs, stop at a camp with no question. Offer three pieces of gear from a set of five and
let the player take one. Each is a real trade, not a bonus: a lantern showing what a road will ask,
a mule carrying two more supplies, an old map adding a fourth road at every fork, a charm making the
first wrong answer on each road free, a rope softening the hard roads. Never repeat one.</div>
<div class="prompt"><div class="lbl">10 &middot; arriving</div>
At the end of the last leg show days taken, ideas locked in, how many were fixed after being missed,
and supplies left. Save the best run to localStorage ranked by ideas first and days second, never
speed alone, and show it on the title screen. Wrap storage in try and catch. A button to travel
again with everything reshuffled.</div>
<div class="prompt"><div class="lbl">11 &middot; reach</div>
Make this work for somebody using a keyboard instead of a mouse: every road and answer reachable
with Tab, usable with Enter, number keys working for both, a visible outline on the focused one,
and focus moved to the first option whenever new choices appear. Never use color alone. Buttons big
enough for a finger, one column on a narrow screen, fitting a Chromebook with nothing cut off.</div>
<div class="prompt"><div class="lbl">12 &middot; when three rounds have not fixed it</div>
[Start a fresh chat.] Here is my whole file. [paste it] Change only this one thing: [the thing]. Do
not change anything else, and give me the whole file back.</div>`);

P('The files','<h2>What is in this download</h2>',`
<div class="card t"><h3>long-road.html</h3>
<p class="small" style="margin:0">The finished game, built by exactly these twelve tasks and played
through before publication &mdash; a full journey answering everything right, another answering
everything wrong, and a run that misses on purpose then goes back and clears the crossing.
<b>Open it and play it first.</b> Knowing what the target feels like makes every prompt land
better.</p></div>
<div class="card"><h3>Two ways to use this pack</h3>
<p class="small" style="margin:0"><b>Build it</b> &mdash; work the twelve tasks and end up with
something you understand well enough to change in March. <b>Play it</b> &mdash; swap the questions
at the top and use it this week, then read the tasks when you want to change something.</p></div>
<div class="card r"><h3>The part you edit</h3>
<pre>const DESTINATION = 'Fort Verity';
const QUESTIONS = [
  { q:'...', a:['..','..','..','..'], ok:0,
    idea:'evaporation', level:2,
    why:'One line saying why that is right.' },
];</pre>
<p class="small" style="margin:0">Everything below that is the game and you never have to touch
it.</p></div>
<div class="note"><b>Twelve questions is the floor, twenty is comfortable.</b> The game sorts by
idea and by level, so a thin bank means the hard road runs out of hard questions and starts feeling
like the easy one.</div>`);

P('The questions','<h2>Writing the content this game needs</h2>',`
<p class="lede">This game asks more of your questions than a quiz game does, and it pays you back
for it.</p>
<div class="card t"><h3>Three levels, and they have to be really different</h3>
<p class="small" style="margin-bottom:4pt"><b>Level 1 &mdash; do you know the word?</b> "Water
turning to vapor is called what?"</p>
<p class="small" style="margin-bottom:4pt"><b>Level 2 &mdash; can you spot it happening?</b> "A
puddle disappears on a hot day. Which process did the most work?"</p>
<p class="small" style="margin:0"><b>Level 3 &mdash; can you use it somewhere new?</b> "A town paves
over a wetland. What most likely happens downstream?" <b>If your level 3 is still a definition, the
hard road is a lie.</b></p></div>
<div class="card r"><h3>Wrong answers are the mistakes your students actually make</h3>
<p class="small" style="margin-bottom:5pt"><b>Weak:</b> Evaporation / A dog / Tuesday / Purple.</p>
<p class="small" style="margin:0"><b>Strong:</b> Evaporation / Condensation / Precipitation /
Transpiration. Every one is real, so getting it right means knowing the difference rather than
spotting the joke. <b>Your last quiz already has the four best wrong answers on it.</b></p></div>
<div class="card g"><h3>The reason line is the part people skip</h3>
<p class="small" style="margin:0">It is the only teaching in the whole game. Write it for the
student who picked the wrong one, not for the one who already knew. One sentence, plain, aimed at
the confusion rather than at the definition.</p></div>
<div class="card p"><h3>Ask an AI for help the right way</h3>
<p class="small" style="margin:0"><b>"Here are four of my questions with the wrong answers my
students actually give. Write four more at level 3 &mdash; applying the idea to a situation they
have not seen &mdash; each with a one-line reason aimed at the misconception."</b> Never send
student work or names; type the misconceptions in yourself.</p></div>`);

P('In the room','<h2>Five ways to run it</h2>',`
<div class="card t"><h3>1. Whole class, one screen, a vote at every fork</h3>
<p class="small" style="margin:0"><b>Start here.</b> The vote is the whole point: the argument about
which road to take is students reasoning about their own confidence out loud, and it costs you
nothing to run.</p></div>
<div class="card"><h3>2. Two teams, alternating forks</h3>
<p class="small" style="margin:0">Each team chooses on its turn. Same journey, two strategies, and
the comparison at the end is about decisions rather than about who is smarter.</p></div>
<div class="card g"><h3>3. Individually on Chromebooks</h3>
<p class="small" style="margin:0">Everyone gets their own road and their own blocked crossings. This
is the version where the game is quietly differentiating and nobody in the room can tell.</p></div>
<div class="card p"><h3>4. A station for early finishers</h3>
<p class="small" style="margin:0">Leave it open. The class record is on the title screen and it only
counts ideas.</p></div>
<div class="card r"><h3>5. A substitute can run it</h3>
<p class="small" style="margin:0">"Open this file, project it, let them vote." Nothing to log into,
nothing to break, and no way for it to go wrong while you are out.</p></div>
<div class="note"><b>The two minutes that make it land:</b> at the end, ask the class which fork
they would take differently, and why. That is a conversation about their own understanding, and the
game just gave them the vocabulary for it.</div>`);

P('Said plainly','<h2>Building in somebody else&rsquo;s genre without stealing</h2>',`
<p class="lede">A journey with forks, supplies and a destination is a very old shape, and some
famous games use it. Here is where the line sits.</p>
<div class="card t"><h3>The distinction that matters</h3>
<p class="small" style="margin:0"><b>Systems are not protected. Expression is.</b> Branching routes,
resources, random encounters, a map, upgrade stops &mdash; those are rules, used by hundreds of
games. <b>Names, characters, artwork, music, logos and written lines are protected</b>, and those
are what you must not take.</p></div>
<div class="card g"><h3>So you may freely</h3>
<p class="small" style="margin:0">Build a journey toward a destination &middot; offer branching
routes with different risk &middot; track a resource that runs down &middot; stop at camps for
upgrades &middot; end with a scored arrival &middot; use a chunky limited-palette look, which is a
hardware idiom hundreds of independent games use.</p></div>
<div class="card r"><h3>And you must never</h3>
<p class="small" style="margin:0">Use a protected game's title, characters, place names, item names
or written lines &mdash; anywhere, including in your code and your file names &middot; copy, trace
or recolor its artwork or fonts &middot; use its music &middot; reuse its famous lines, including
the short ones everybody can quote. <b>Write your own, in your own voice.</b></p></div>
<div class="card"><h3>The checklist, at the end of every session</h3>
<p class="small" style="margin:0">Search the whole file for the protected names, and expect none
&middot; read every line a player sees out loud and rewrite any that sounds borrowed &middot; look
at each sprite and ask whether a fan would name it &middot; hum your own victory sound and make sure
it is not somebody else's tune.</p></div>
<div class="note"><b>And the practical point.</b> A game you keep in your classroom is a very
different risk from one you publish or sell. In your room this is mostly about modeling it properly
for students. <b>This is not legal advice &mdash; it is the line a careful teacher can hold.</b></div>`);

P('Where the data lives','<h2>The shortest privacy page in this series</h2>',`
<p class="lede">The honest answer is that there is almost nothing to say, and that is the point.</p>
<div class="card g"><h3>What this game knows about your students</h3>
<p class="small" style="margin:0"><b>Nothing.</b> No names, no accounts, no scores against people.
There is nowhere to type a name and nothing to type it into.</p></div>
<div class="card t"><h3>What leaves the room</h3>
<p class="small" style="margin:0"><b>Nothing.</b> No server, no network call, no analytics, no
company behind it. Unplug the internet and it plays the same.</p></div>
<div class="card"><h3>The one thing it saves</h3>
<p class="small" style="margin:0">A best run &mdash; ideas and days &mdash; in that browser on that
machine, with no name attached by design. Clear browsing data and it is gone, and nothing that
matters is lost.</p></div>
<div class="card r"><h3>The feature to refuse</h3>
<p class="small" style="margin:0">Sooner or later you will want to store who got the best run. Do
not. That one change turns a game with no data into a student record on a shared classroom
computer. <b>A record with nobody's name on it is still something a class will fight over</b>, and
it is the version that cannot hurt anybody.</p></div>
<div class="note"><b>For an administrator, in one sentence:</b> "It is a file on my computer with no
student information in it that does not connect to anything." True, and the whole disclosure.</div>`);

P('Test it like you mean it','<h2>Eight things to try before a class sees it</h2>',`
<table>
<thead><tr><th style="width:52%">Try this</th><th>You want</th></tr></thead>
<tbody>
<tr><td>Reload twice and compare the first fork</td><td>Different roads on offer</td></tr>
<tr><td>Take the hard road three times</td><td>Genuinely harder questions</td></tr>
<tr><td>Answer everything wrong on purpose</td><td>You fall back, you never lose</td></tr>
<tr><td>Miss one, then go back to its crossing</td><td>A full-screen moment when you fix it</td></tr>
<tr><td>Play a run taking only easy roads</td><td>A slower arrival, not a punishment</td></tr>
<tr><td>Reach a camp twice</td><td>Different gear offered</td></tr>
<tr><td>Play the whole thing on number keys</td><td>Never needing the mouse</td></tr>
<tr><td>Open it on the classroom machine</td><td>Nothing cut off, sound audible</td></tr>
</tbody></table>
<div class="card r"><h3>The one that catches the most</h3>
<p class="small" style="margin:0"><b>Missing on purpose and going back.</b> It is the mechanic the
whole design rests on, it is the one most likely to be silently broken, and it is the last thing
anybody thinks to test.</p></div>
<div class="card t"><h3>And one worth doing with a person</h3>
<p class="small" style="margin:0">Hand it to a colleague and say nothing. Watch which road they take
first. If they pick at random rather than reading, your road descriptions are not doing their
job.</p></div>`);

P('For the teacher','<h2>How this pack is built, and what it does not claim</h2>',`
<div class="card t"><h3>Why this shape, and not a quiz with a health bar</h3>
<p class="small" style="margin:0">The first version of this product <i>was</i> a quiz with a health
bar, and it was not good enough. The rebuild is built on three findings: <b>feeling capable is the
strongest driver of motivation</b>, ahead of autonomy and belonging; <b>points and badges lift
enjoyment but do almost nothing for feeling capable</b>; and <b>public ranking actively harms
students who are already struggling</b>. Everything in the design follows from those three.</p></div>
<div class="card"><h3>What was tested before this went out</h3>
<p class="small" style="margin:0">The included game was played in a real browser three ways: a full
journey answering everything correctly, a full journey answering everything wrong, and a run that
missed on purpose then returned to clear the crossing. The wrong-answer run <b>fell back and
continued rather than ending</b>, blocked crossings appeared and tracked the right ideas, the fix
fired its full-screen moment and moved the idea from missed to mastered, and camps offered gear. No
console errors in any run.</p></div>
<div class="card r"><h3>What is NOT claimed</h3>
<p class="small" style="margin-bottom:5pt">&bull; <b>Not a replacement for Blooket or Gimkit</b>, and
not a replacement for the AI game generators either. Those start faster and look more finished. What
this is instead: yours, with no logins, working offline, and changeable.</p>
<p class="small" style="margin-bottom:5pt">&bull; <b>Not a gradebook.</b> It records nothing about
any student and should not.</p>
<p class="small" style="margin-bottom:5pt">&bull; <b>Not research of my own.</b> The findings above
are other people's, summarized honestly; this pack applies them, it does not test them.</p>
<p class="small" style="margin:0">&bull; <b>Not going to come out identical.</b> You are working with
a model. Your country will look different from mine, and that is the point.</p></div>
<div class="card g"><h3>Why the prompts spend so long saying no</h3>
<p class="small" style="margin:0">No frameworks. No color-only signals. No lose screen. No
leaderboard with names. Left alone a model builds the most common version of a thing, and the most
common classroom game is a quiz with points on it. <b>Saying no is the part of prompting nobody
teaches, and it is most of the skill.</b></p></div>`);

P('One last thing','<h2>If this was useful</h2>',`
<div class="card t"><h3>Leaving a review earns you TPT credit</h3>
<p class="small" style="margin:0">TPT gives you credit toward future purchases for every review you
leave, and reviews are how other teachers find work like this. Thirty seconds.</p></div>
<div class="card r"><h3>If it did not work, tell me before you rate it</h3>
<p class="small" style="margin:0">The Q&amp;A on the listing reaches me directly. A game that will
not open is almost always one line, and I would far rather fix it than leave you with a file that
does nothing.</p></div>
<div class="card"><h3>The one thing to take away</h3>
<p class="small" style="margin:0"><b>What a game celebrates is what it teaches students to value.</b>
Celebrate a score and you have told them that being good at it already is the point. Celebrate a fix
and you have told them that getting better is. <b>That is true of your classroom whether or not you
ever build a game.</b></p></div>
<div class="note"><b>Built and audited by two certified teachers.</b><br>
Every prompt here was run. The game was played to the destination three different ways, including
the one where you get everything wrong, before this went out.</div>`);

module.exports={};
