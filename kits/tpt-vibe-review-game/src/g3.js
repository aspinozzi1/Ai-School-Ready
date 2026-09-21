const {P}=require('./g1.js');

P('Task 1','<h2>Pick the fight</h2>',`
<p class="lede">Four minutes with a pen. The only task the AI cannot do for you.</p>
<div class="card"><h3>Three decisions</h3>
<p class="small" style="margin-bottom:4pt"><b>What are they fighting?</b> Name the boss after the
thing they find hard. The Water Cycle. Fraction Island. The Comma Splice. A unit that beats
students becomes a monster that beats students, and that joke does a lot of work.</p>
<p class="small" style="margin-bottom:4pt"><b>Which eight questions?</b> Pull them from something
you already use.</p>
<p class="small" style="margin:0"><b>How long should a fight take?</b> Twelve correct answers is
about ten minutes of class with discussion. That is the default and it is a good one.</p></div>
<div class="card t"><h3>Write the questions in this shape now</h3>
<pre>{ q: 'Water turning from liquid into vapor is called what?',
  a: ['Evaporation','Condensation','Precipitation','Collection'],
  ok: 0 }</pre>
<p class="small" style="margin:0"><code>ok</code> counts from zero, so <code>0</code> is the
first answer. Getting this shape right now means task 5 is a paste rather than a negotiation.</p></div>
<div class="card r"><h3>The mistake that makes a boring game</h3>
<p class="small" style="margin:0"><b>Three obviously wrong answers and one obviously right one.</b>
A class shouts the answer in two seconds and the game is over in ninety. There is a whole page on
this later; for now, make the wrong answers the mistakes your students actually make.</p></div>
<div class="card g"><h3>Task 1 ends when</h3>
<p class="small" style="margin:0">You have a boss name and eight questions written in that
shape.</p></div>`);

P('Task 2','<h2>The stage</h2>',`
<p class="lede">A window to fight in, and proof the loop is running.</p>
<div class="prompt"><div class="lbl">Prompt 1 &middot; the stage</div>
Build a single HTML file, no frameworks and no build step, that runs by opening it in a browser.
Put a canvas in it, 640 by 360, scaled to fit the page, with <b>imageSmoothingEnabled set to
false</b> so pixel art stays sharp. Set up <b>a state object, a draw function, and a game loop
using requestAnimationFrame</b> &mdash; I want those three things separate, not one big function.
Draw a dark sky, a horizon band and a floor. Put a few stars in the sky at fixed positions so
they do not flicker. Make something move every frame so I can see the loop is alive.</div>
<div class="card"><h3>The three phrases doing the work</h3>
<p class="small" style="margin-bottom:4pt"><b>"no frameworks and no build step"</b> &mdash; stops
it reaching for React, which needs a terminal.</p>
<p class="small" style="margin-bottom:4pt"><b>"a state object, a draw function, and a game loop"</b>
&mdash; the architecture from the last page, asked for by name.</p>
<p class="small" style="margin:0"><b>"stars at fixed positions"</b> &mdash; ask for random stars
and they are redrawn in new places sixty times a second, which looks like static.</p></div>
<div class="card t"><h3>Task 2 ends when</h3>
<p class="small" style="margin:0">You open the file and see a sky, a floor, and something
moving.</p></div>`);

P('Task 3','<h2>The two fighters</h2>',`
<p class="lede">Pixel art you can draw in a text editor, with no art program and no image files.</p>
<div class="prompt"><div class="lbl">Prompt 2 &middot; sprites</div>
I want pixel sprites <b>written as arrays of text</b>, one character per pixel, with a dot for
transparent &mdash; so I can edit the art by typing. Write a function that takes one of those
arrays, a color map, an x and y, and a pixel size, and draws it on the canvas. Then make two:
a small hero standing bottom left, and <b>a big boss, at least fourteen pixels wide, on the
right.</b> Give the boss a slow bob up and down so it looks alive. Put a soft colored glow
behind it.</div>
<div class="card t"><h3>What a sprite looks like, so you can change it</h3>
<pre>hero: [
  '...1111...',
  '..111111..',
  '.11222211.',
  '.12211221.'
]</pre>
<p class="small" style="margin:0">Every <code>1</code> is one color, every <code>2</code>
another, every dot is nothing. <b>Change a character, save, reload &mdash; the art changed.</b>
That is the moment most teachers realise they can actually do this.</p></div>
<div class="card r"><h3>Make the boss big</h3>
<p class="small" style="margin:0">Left alone the AI makes both fighters the same modest size and
the screen looks like a chess problem. <b>A boss should be four or five times the hero.</b> Say so
in the prompt, and say it again if it does not listen.</p></div>
<div class="card g"><h3>Task 3 ends when</h3>
<p class="small" style="margin:0">Two characters are on the stage and the big one is breathing.</p></div>`);

P('Task 4','<h2>Health bars that drain</h2>',`
<p class="lede">The single cheapest thing you can do to make software feel like a game.</p>
<div class="prompt"><div class="lbl">Prompt 3 &middot; the bars</div>
Add health to the state: the boss has 200, the class has 100. Draw a bar for each, with a label
and the numbers beside it. Put the boss bar at the top under its name and the class bar at the
bottom under the hero. <b>The bars must slide toward the real value a little each frame rather
than jumping</b> &mdash; keep a separate "shown" number per bar and ease it toward the true one.
Turn the bar yellow below half and red below a quarter.</div>
<div class="card t"><h3>Why the sliding matters more than it sounds</h3>
<p class="small" style="margin:0">A bar that jumps from 200 to 186 is information. A bar that
<i>drains</i> from 200 to 186 over half a second is <b>a hit landing</b>. It is four lines of
code and it is most of the difference between a quiz and a game. Every arcade game you have ever
played does this.</p></div>
<div class="card r"><h3>The bug to watch for</h3>
<p class="small" style="margin:0">If the bar overshoots and jitters at the end, the easing step is
too big. Say: <b>move it twelve percent of the remaining distance each frame.</b></p></div>
<div class="card g"><h3>Task 4 ends when</h3>
<p class="small" style="margin:0">You change a health number by hand in the code, reload, and
watch the bar glide to the new value.</p></div>`);

P('Task 5','<h2>The question, and four answers</h2>',`
<p class="lede">Now the content arrives, and where you put it matters.</p>
<div class="prompt"><div class="lbl">Prompt 4 &middot; questions</div>
Put my questions in <b>a plain array at the very top of the file</b>, above all the game code,
with a comment saying this is the part a teacher edits. Each one has a question, four answers, and
which answer is right counting from zero. Below the canvas, show the current question and four
answer buttons as <b>real HTML buttons, not drawn on the canvas</b>, so they work with a keyboard
and a screen reader. Number them 1 to 4 and let those number keys answer. <b>Shuffle the answer
order every time a question is asked</b>, and shuffle the question order every fight, so the same
set is still usable on Friday.</div>
<div class="card"><h3>Two decisions in that prompt worth understanding</h3>
<p class="small" style="margin-bottom:4pt"><b>Content at the top, above the code.</b> A teacher
editing next month should not have to go hunting past three hundred lines of game. This is the
difference between a thing you use all year and a thing you built once.</p>
<p class="small" style="margin:0"><b>Buttons in HTML, not painted on the canvas.</b> Canvas text
cannot be read by a screen reader or reached with Tab. Use the canvas for the fight and the page
for the interface &mdash; that is not a compromise, it is the right call.</p></div>
<div class="card r"><h3>Shuffle, or it stops working on day two</h3>
<p class="small" style="margin:0">Without it, the third student to play has memorised that the
answer is always the second one. Shuffling answers <i>and</i> questions is what makes eight
questions last a week.</p></div>
<div class="card g"><h3>Task 5 ends when</h3>
<p class="small" style="margin:0">A question from your own unit is on screen with four buttons
under it, in a different order each time you reload.</p></div>`);

P('Task 6','<h2>A right answer lands a hit</h2>',`
<p class="lede">The first moment it is a game.</p>
<div class="prompt"><div class="lbl">Prompt 5 &middot; damage</div>
When the right answer is clicked, take health off the boss &mdash; about 14 to 18, with a little
randomness so no two hits are identical. Then <b>disable all four buttons and highlight which one
was right</b>, wait about a second, and ask the next question. Track a streak of correct answers
in the state. <b>After three in a row, some hits are critical</b> and take roughly double, with a
different message. Show the streak on screen once it is above one.</div>
<div class="card t"><h3>The critical hit is not decoration</h3>
<p class="small" style="margin:0">It is the reason a class that is doing well starts paying
<i>more</i> attention rather than less. A streak that pays off turns "we are winning" into
"do not break the chain", and that is worth writing four lines for.</p></div>
<div class="card"><h3>Randomness, but not too much</h3>
<p class="small" style="margin:0">Identical damage every time feels mechanical. Wildly varying
damage feels unfair. A small spread on a fixed base is the shape almost every game uses.</p></div>
<div class="card g"><h3>Task 6 ends when</h3>
<p class="small" style="margin:0">You answer correctly and watch the boss bar drain.</p></div>`);

module.exports={};
