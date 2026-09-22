const {P}=require('./e1.js');

P('Task 1','<h2>Decide the journey, and tag your ideas</h2>',`
<p class="lede">Ten minutes with a pen. The only task the AI cannot do, and the one that decides
whether the rest works.</p>
<div class="card"><h3>Three decisions</h3>
<p class="small" style="margin-bottom:4pt"><b>Where are they going?</b> Any destination worth
reaching. Fort Verity. The Summit. The Last Library. It does not have to relate to your content
&mdash; the journey is the frame, your questions are the country.</p>
<p class="small" style="margin-bottom:4pt"><b>What are the three or four ideas?</b> Not topics
&mdash; ideas. "Evaporation", "condensation", "runoff". The game tracks mastery by idea, so this
list is the spine of everything.</p>
<p class="small" style="margin:0"><b>How long is the road?</b> Twelve legs is about twenty-five
minutes with a class discussing each fork.</p></div>
<div class="card t"><h3>Write the questions in this shape now</h3>
<pre>{ q:'A puddle disappears on a hot day. Which process did the most work?',
  a:['Condensation','Evaporation','Precipitation','Runoff'], ok:1,
  idea:'evaporation',
  level:2,
  why:'The water did not go anywhere solid or liquid. Heat turned it to vapor.' }</pre>
<p class="small" style="margin:0"><b>Five fields, and the last two are the ones that matter.</b>
<code>idea</code> is what the game tracks and blocks roads with. <code>why</code> is the only
teaching the game does.</p></div>
<div class="card r"><h3>You need real hard ones</h3>
<p class="small" style="margin:0">Level 3 questions are what the hard pass asks. If your hardest
question is still recall of a definition, <b>the choice between roads is a lie</b> and students
will work that out in four minutes. A level 3 should apply the idea to a situation they have not
seen: a town paves a wetland, a forest is cleared, two puddles in different light.</p></div>
<div class="card g"><h3>Task 1 ends when</h3>
<p class="small" style="margin:0">You have a destination and twelve or more questions, each tagged
with an idea, a level and a one-line reason.</p></div>`);

P('Task 2','<h2>The country, and the loop</h2>',`
<p class="lede">A landscape that moves, and proof the game is alive.</p>
<div class="prompt"><div class="lbl">Prompt 1 &middot; the world</div>
Build a single HTML file, no frameworks and no build step, that runs by opening it in a browser.
Put a canvas in it, 640 by 360, scaled to fit, with <b>imageSmoothingEnabled false</b>. Set up
<b>a state object, a draw function and a game loop using requestAnimationFrame</b>, kept separate.
Draw a sky that fades from dark at the top to lighter at the horizon, then <b>three layers of
rolling hills drawn with a sine wave</b>, each scrolling at a different speed. Add a low sun and a
few birds. <b>Give me one palette of sixteen colors as named constants at the top and use nothing
outside it.</b></div>
<div class="card t"><h3>The sixteen-color rule is not decoration</h3>
<p class="small" style="margin:0"><b>A sprite with forty colors turns to noise at thirty pixels
tall</b>, because the eye cannot separate adjacent shades at that size. Fewer colors read better,
always. Ask for the palette as named constants and every later change is one edit in one place.</p></div>
<div class="card"><h3>Three speeds, not one</h3>
<p class="small" style="margin:0">Far hills drift slowly, near hills move fast. That difference is
what makes a flat picture look like distance, and it costs one number per layer.</p></div>
<div class="card g"><h3>Task 2 ends when</h3>
<p class="small" style="margin:0">You have a landscape that scrolls, with the far hills lagging the
near ones.</p></div>`);

P('Task 3','<h2>Things that sit on the ground</h2>',`
<p class="lede">The single fix that separates a real scene from a pasted one.</p>
<div class="prompt"><div class="lbl">Prompt 2 &middot; sprites on the land</div>
Add pixel sprites <b>written as arrays of text</b>, one character per pixel, a dot for transparent,
so I can edit art by typing. Make a traveler, a tree, a mountain peak, a tent and a flag. Then
&mdash; this is the important part &mdash; <b>write a function that asks a hill what its surface
height is at a given x, and place trees and peaks so they sit exactly on that line</b> rather than
at a fixed height. Give the traveler a small bob. <b>Light everything from the top left</b>: a
darker row along the bottom of each sprite.</div>
<div class="card r"><h3>The mistake this prompt exists to prevent</h3>
<p class="small" style="margin:0">Left alone, a model draws hills and then draws trees at a fixed
y. <b>The trees float over the hills or sink into them</b> and the scene reads as flat and wrong
without anybody being able to say why. Asking the hill where its surface is, and standing things on
it, is four lines and it is most of the difference.</p></div>
<div class="card t"><h3>The silhouette test, before you go further</h3>
<p class="small" style="margin:0">Fill each sprite with solid black. <b>Can you still tell what it
is?</b> If not, redraw it. If a shape does not read in silhouette it will not read on a projector
from the back row, and the back row is your hardest audience.</p></div>
<div class="card g"><h3>Task 3 ends when</h3>
<p class="small" style="margin:0">Trees stand on hills, the traveler breathes, and nothing floats.</p></div>`);

P('Task 4 &middot; the one that matters','<h2>The fork: choice before question</h2>',`
<p class="lede">This is the task that makes it a game rather than a quiz. Everything else is
scenery around it.</p>
<div class="prompt"><div class="lbl">Prompt 3 &middot; the fork</div>
Below the canvas, before any question is asked, <b>offer two or three roads as buttons</b>. Each
shows a name, a short description, and what it asks and pays. Build three kinds:
<b>an easy road</b> that asks two level-1 questions, is slow and costs no supplies;
<b>a steady road</b> that asks one level-2 question;
and <b>a hard road</b> that asks one level-3 question, gains a day and pays a supply.
<b>Generate the set fresh at every fork and shuffle the order</b>, so no two journeys are the same.
Number the buttons 1 to 3 and let those keys choose.</div>
<div class="card t"><h3>Why the choice has to come first</h3>
<p class="small" style="margin:0">If the question comes first and the choice is how to spend a
reward, you have a quiz with a shop. <b>The choice has to be made in ignorance of the question</b>
&mdash; that is what turns it into a judgment about risk, and judgment under uncertainty is where
the thinking lives.</p></div>
<div class="card"><h3>The trade has to be real</h3>
<p class="small" style="margin:0">If the hard road is strictly better, everyone takes it and there
is no decision. <b>Each road must be right in some situations and wrong in others</b>: the hard
pass pays when you are healthy and punishes when you are thin. That is the whole design.</p></div>
<div class="card g"><h3>Task 4 ends when</h3>
<p class="small" style="margin:0">You reload twice and get different forks, and you can honestly
say you had to think about which one to take.</p></div>`);

P('Task 5','<h2>The question the road asks</h2>',`
<p class="lede">Now the content arrives, and the road decides which question you get.</p>
<div class="prompt"><div class="lbl">Prompt 4 &middot; drawing the question</div>
Put my questions in <b>a plain array at the very top of the file</b>, above all game code, with a
comment saying this is the part a teacher edits. Each has a question, four answers, which is right
counting from zero, an <b>idea</b>, a <b>level</b> from 1 to 3, and a <b>why</b>. When a road is
chosen, draw a question <b>matching that road's level</b>. Two rules on the draw:
<b>never ask the same idea twice in a row</b>, and <b>prefer questions the player has seen least</b>.
Show it as real HTML buttons below the canvas, not drawn on the canvas, numbered 1 to 4, and
shuffle the answer order every time.</div>
<div class="card t"><h3>Never twice in a row is not fussiness</h3>
<p class="small" style="margin:0">Asking three questions about evaporation back to back teaches a
student to answer without reading, because the pattern is doing the work. <b>Mixing ideas forces
them to work out which idea applies</b>, which is the skill that transfers out of your classroom
and into a test.</p></div>
<div class="card r"><h3>Buttons in HTML, not painted on canvas</h3>
<p class="small" style="margin:0">Canvas text cannot be reached with Tab or read aloud by a screen
reader. Use the canvas for the world and the page for the interface. That is the right call, not a
compromise.</p></div>
<div class="card g"><h3>Task 5 ends when</h3>
<p class="small" style="margin:0">The hard road actually asks you a hard question and the easy road
does not.</p></div>`);

P('Task 6','<h2>Supplies, and what a wrong answer costs</h2>',`
<p class="lede">Stakes, without anybody losing in front of the room.</p>
<div class="prompt"><div class="lbl">Prompt 5 &middot; supplies</div>
Add supplies, starting at six, shown as icons in a status bar along with the day count and progress
toward the destination. A wrong answer <b>costs one supply</b>. A clean hard road <b>pays one
back</b>. <b>When supplies reach zero the player does not lose</b> &mdash; they fall back to the
last camp, lose three days, get half their supplies back, and continue. <b>There is no lose screen
anywhere in this game.</b></div>
<div class="card r"><h3>Read that last line again, because it is the point</h3>
<p class="small" style="margin-bottom:5pt">A shared score that can be lost means one student's
wrong answer visibly costs everybody, and the room always knows whose it was. For a student who is
already struggling, <b>that produces exactly the feeling of not being good enough that you are
trying to fight.</b></p>
<p class="small" style="margin:0">So: no losing. Everybody arrives. <b>Arrival is scored, not
passed or failed</b> &mdash; days taken, supplies left, ideas locked in. A class can want a better
run without anyone having been the reason.</p></div>
<div class="card t"><h3>What replaces the tension you gave up</h3>
<p class="small" style="margin:0">Scarcity. Running low on supplies changes which road you dare
take, and that is a better tension than a fail screen because <b>it makes them think rather than
makes them anxious.</b></p></div>
<div class="card g"><h3>Task 6 ends when</h3>
<p class="small" style="margin:0">You deliberately run yourself out of supplies and the game keeps
going.</p></div>`);

module.exports={};
