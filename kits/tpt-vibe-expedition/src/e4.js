const {P}=require('./e1.js');

P('Task 7','<h2>The one line that teaches</h2>',`
<p class="lede">The only teaching this game does, and it costs one field per question.</p>
<div class="prompt"><div class="lbl">Prompt 6 &middot; the reason</div>
On a wrong answer: mark the clicked one red, <b>highlight the right one in green</b>, and show the
question's <b>why</b> underneath in a boxed line. <b>Hold all of that on screen for about 2.6
seconds before moving on, against 1 second after a right answer.</b> Do not use color alone to show
which was right &mdash; the correct answer also gets a label a screen reader would announce.</div>
<div class="card t"><h3>The long pause is deliberate and it is the whole feature</h3>
<p class="small" style="margin:0">After a right answer the class already knows, so move on. After a
wrong one the right answer is on screen and <b>every eye in the room is on it</b>. That extra
second and a half is the reteaching. Ask for it by name, because no model will think of it.</p></div>
<div class="card"><h3>Why, not what</h3>
<p class="small" style="margin-bottom:5pt"><b>Weak:</b> "The answer is evaporation."</p>
<p class="small" style="margin:0"><b>Strong:</b> "The water did not go anywhere solid or liquid.
Heat turned it to vapor." A student who reads that learns the idea. A student who reads the first
one learns which button to press.</p></div>
<div class="card r"><h3>Write the reason for the student who got it wrong</h3>
<p class="small" style="margin:0">Not a definition. The sentence that fixes the specific confusion
that made them choose the wrong one. You already know what that confusion is &mdash; you have
graded it a hundred times.</p></div>
<div class="card g"><h3>Task 7 ends when</h3>
<p class="small" style="margin:0">You answer wrong on purpose and find yourself reading the reason
before it disappears.</p></div>`);

P('Task 8 &middot; the one that matters','<h2>Missed ideas block the road</h2>',`
<p class="lede">The mechanic that turns a game into a review that actually reviews.</p>
<div class="prompt"><div class="lbl">Prompt 7 &middot; blocked crossings</div>
Track which <b>ideas</b> the player has got wrong in a list. Once there is at least one, <b>a
washed-out crossing can appear as one of the roads at a fork</b>, tagged so it is obviously
different, saying "you turned back here before". It asks a question <b>about that specific idea</b>.
Show a count of blocked roads in the status bar. <b>The crossing is always optional</b> &mdash;
there is always another road at the same fork.</div>
<div class="card t"><h3>Why it must be optional</h3>
<p class="small" style="margin:0">Forcing a student back to the thing they just failed is a
punishment, and it reads as one. <b>Letting them see it, go around it, and come back when they are
ready</b> is the same content with the opposite feeling &mdash; and going back is now their
decision, which is exactly the autonomy the whole design is built on.</p></div>
<div class="card g"><h3>And it is spacing, which is the real reason it works</h3>
<p class="small" style="margin:0">Bringing a missed idea back <b>later</b> rather than immediately
is one of the best-evidenced things in learning science. Immediately is recognition. Later is
retrieval, and retrieval is what lasts. <b>The game is not decorating good practice; it is
enforcing it.</b></p></div>
<div class="card r"><h3>What a student sees</h3>
<p class="small" style="margin:0">A map with a broken bridge on it that has their mistake standing
on the other side. That is a far better way to say "you do not have this yet" than a red X, and
nobody else in the room can see whose it is.</p></div>
<div class="card p"><h3>Task 8 ends when</h3>
<p class="small" style="margin:0">You miss one on purpose and a washed-out crossing turns up a few
forks later with that idea waiting on it.</p></div>`);

P('Task 9 &middot; the one that matters','<h2>Fixing one opens the road, loudly</h2>',`
<p class="lede">The most important twenty lines in this pack.</p>
<div class="prompt"><div class="lbl">Prompt 8 &middot; the fix</div>
When the player answers a washed-out crossing correctly: <b>remove that idea from the missed list,
add it to mastered, and show a full-screen celebration</b> &mdash; the only one in the game. It says
the road is open, names the idea, and says they turned back here before. Give it the longest sound
in the game. <b>Also</b>, when they fix a missed idea anywhere else, make that loud too: a big
floating "FIXED", the same sound, and a line saying they have just put right what they got wrong.
<b>Nothing else in this game gets a full screen. Not arriving, not a good run, nothing.</b></div>
<div class="card t"><h3>Why this and nothing else</h3>
<p class="small" style="margin:0">Because <b>what a game celebrates is what it teaches students to
value.</b> Celebrate speed and they rush. Celebrate a score and they learn that being good at it
already is the thing. <b>Celebrate a fix and you have told every child in the room that getting
better is the point</b> &mdash; and the ones who needed to hear that are the ones who got it wrong
first.</p></div>
<div class="card g"><h3>The measure the game reports</h3>
<p class="small" style="margin:0">Not a score. <b>"Ideas locked in", which only ever goes up</b>,
and at the end, how many of them were put right after getting them wrong. That second number is the
one worth reading out.</p></div>
<div class="card r"><h3>What not to add, however tempting</h3>
<p class="small" style="margin:0">No leaderboard with names. No visible per-student score. Nothing
that lets the room work out who cost them what. <b>Public ranking harms the students you built
this for</b>, and it is the easiest thing in the world to add by accident.</p></div>
<div class="card p"><h3>Task 9 ends when</h3>
<p class="small" style="margin:0">You miss one on purpose, go back, fix it, and the celebration
feels slightly bigger than you expected. That is correct.</p></div>`);

P('Task 10','<h2>Camps, and gear worth choosing</h2>',`
<p class="lede">A second layer of decisions, and a moment to breathe.</p>
<div class="prompt"><div class="lbl">Prompt 9 &middot; camps</div>
Every four legs, stop at a camp. <b>No question.</b> Offer three pieces of gear from a set of five
and let the player take one. Each must be <b>a real trade rather than a straight bonus</b>: a
lantern that shows what a road will ask before choosing it, a mule that carries two more supplies,
an old map that adds a fourth road at every fork, a charm that makes the first wrong answer on each
road free, a rope that softens the hard roads. Never offer one they already have.</div>
<div class="card t"><h3>Why a stop with no question in it</h3>
<p class="small" style="margin:0">Pacing. Twelve questions in a row is a test whatever you draw
around it. A camp every four legs gives the room somewhere to argue about strategy instead of
content, and <b>that argument is the moment the quiet students join in.</b></p></div>
<div class="card"><h3>Gear that changes how you play, not how well you score</h3>
<p class="small" style="margin:0">The lantern does not make questions easier &mdash; it makes the
<i>choice</i> better informed. That is the right kind of power, because it rewards thinking about
the game rather than just knowing more.</p></div>
<div class="card g"><h3>Task 10 ends when</h3>
<p class="small" style="margin:0">You take a lantern on one run and a mule on the next and the two
runs genuinely play differently.</p></div>`);

P('Task 11','<h2>Arrival, scored without ranking</h2>',`
<p class="lede">Everybody gets there. What differs is how.</p>
<div class="prompt"><div class="lbl">Prompt 10 &middot; arriving</div>
When the last leg is done, show an arrival screen with <b>days taken, ideas locked in, how many of
those were fixed after getting them wrong, and supplies left</b>. Save the best run to localStorage
&mdash; ranked by <b>ideas first and days second</b>, never by speed alone &mdash; and show it on the
title screen. Wrap storage in try and catch. Add a button to travel again, with everything
reshuffled.</div>
<div class="card t"><h3>Ideas first, days second, and never speed alone</h3>
<p class="small" style="margin:0">Whatever the record measures is what the class will optimise. Rank
on speed and they will guess fast on the easy road. <b>Rank on ideas and the best strategy is
learning the content</b>, which is the only alignment that matters in a classroom game.</p></div>
<div class="card"><h3>What the class record is, and is not</h3>
<p class="small" style="margin:0">One line, no names on it: "23 ideas in 14 days." Third period can
try to beat second period without any individual child being the reason. That is belonging without
ranking, and it is the version that works in a mixed room.</p></div>
<div class="card g"><h3>Task 11 ends when</h3>
<p class="small" style="margin:0">You arrive twice, and the second run feels different from the
first because you chose differently.</p></div>`);

P('Task 12','<h2>Everyone can play it</h2>',`
<p class="lede">The last task, and the one that decides whether it works in your actual room.</p>
<div class="prompt"><div class="lbl">Prompt 11 &middot; reach</div>
Make this work for somebody using <b>a keyboard instead of a mouse</b>: every road and every answer
reachable with Tab, usable with Enter, number keys 1 to 4 working for both, a clearly visible
outline on the focused one, and focus moved to the first option whenever new choices appear.
<b>Never use color alone</b> to carry meaning. Buttons big enough for a finger, one column on a
narrow screen, and it must fit a Chromebook with nothing cut off.</div>
<div class="card t"><h3>Move the focus, or the keyboard run breaks</h3>
<p class="small" style="margin:0">When a new fork appears, focus has to land on the first road by
itself. Without that, a keyboard player has to Tab from the top of the page every single turn, and
they will give up long before they tell you.</p></div>
<div class="card r"><h3>The Chromebook test is the real test</h3>
<p class="small" style="margin:0">You built it on a laptop and your class has a cart. Open it on
the actual hardware, at the actual resolution, before the actual lesson. Two minutes now or a
ruined period later.</p></div>
<div class="card g"><h3>Task 12 ends when</h3>
<p class="small" style="margin:0">You play a whole journey with your hands on the number keys, on
the machine your class will use.</p></div>`);

module.exports={};
