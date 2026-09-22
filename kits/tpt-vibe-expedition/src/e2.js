const {P,pages}=require('./e1.js');

pages.push(`<div class="sheet"><div class="bar"></div><div style="padding-top:24pt">
<div class="kick">Vibe Code Your Own Game &middot; build 1</div>
<h1>The Long Road</h1>
<p class="lede">A journey game where <b>every turn is a choice before it is a question</b>. Your
class picks the road &mdash; easy, steady, or the hard pass that pays &mdash; and what they get
wrong blocks the road until they come back and fix it.</p>
<div class="row" style="margin:12pt 0">
<div class="card t" style="text-align:center"><h3 style="font-size:19pt;color:var(--blue)">12</h3><p class="small" style="margin:0">tasks, each ending in something playable</p></div>
<div class="card" style="text-align:center"><h3 style="font-size:19pt;color:var(--blue)">1</h3><p class="small" style="margin:0">finished game included</p></div>
<div class="card g" style="text-align:center"><h3 style="font-size:19pt;color:var(--blue)">0</h3><p class="small" style="margin:0">ways to lose in front of the class</p></div>
</div>
<div class="note"><b>Built on what the research actually says about motivation.</b><br>
Competence is the strongest driver of student motivation &mdash; stronger than autonomy,
stronger than belonging &mdash; and points do not produce it. So the loudest moment in this game
is not a high score. <b>It is the moment a student fixes something they got wrong.</b></div>
<div class="card r"><h3>No coding background. About two hours.</h3>
<p class="small" style="margin:0">One HTML file. Nothing installed, no accounts for anybody, no
subscription, and it runs with the wifi down. Your content goes in one list at the top.</p></div>
<div class="card p" style="margin-top:2pt"><h3>Inside</h3>
<p class="small" style="margin:0">Twelve tasks with the exact prompts written out in full
&middot; the finished game, playable today &middot; why this shape beats a quiz with a health bar
&middot; how to write questions and the one-line reasons that do the teaching &middot; five ways
to run it &middot; and building in a famous genre without stealing from it.</p></div>
</div>
<div class="foot"><span>Built and audited by two certified teachers</span><span>Bright Scholar &middot; AI-Ready School</span></div>
<div class="barb"></div></div>`);

P('Before you begin','<h2>The twelve tasks at a glance</h2>',`
<p class="lede">Every task ends with something on screen you can play. If it does not, stop and
fix it before moving on.</p>
<table>
<thead><tr><th style="width:26pt">#</th><th>Task</th><th>Ends with</th></tr></thead>
<tbody>
<tr><td>1</td><td>Decide the journey and the ideas</td><td>A destination and your content, tagged</td></tr>
<tr><td>2</td><td>The country, and the loop</td><td>A landscape that scrolls</td></tr>
<tr><td>3</td><td>Things that sit on the ground</td><td>Hills with trees actually on them</td></tr>
<tr><td>4</td><td><b>The fork &mdash; choice before question</b></td><td>Three roads you choose between</td></tr>
<tr><td>5</td><td>The question the road asks</td><td>A road that resolves</td></tr>
<tr><td>6</td><td>Supplies, and what a wrong answer costs</td><td>Stakes without a loss screen</td></tr>
<tr><td>7</td><td>The one line that teaches</td><td>A reason shown after every miss</td></tr>
<tr><td>8</td><td><b>Missed ideas block the road</b></td><td>A washed-out crossing on your map</td></tr>
<tr><td>9</td><td><b>Fixing one opens it, loudly</b></td><td>The best moment in the game</td></tr>
<tr><td>10</td><td>Camps, and gear worth choosing</td><td>A second layer of decisions</td></tr>
<tr><td>11</td><td>Arrival, scored without ranking</td><td>An ending everybody reaches</td></tr>
<tr><td>12</td><td>Everyone can play it</td><td>Keyboard, touch, Chromebook</td></tr>
</tbody></table>
<div class="card t"><h3>Stop anywhere after task 6</h3>
<p class="small" style="margin:0">Tasks 1 to 6 give you a real journey game. <b>Tasks 8 and 9 are
the ones that make it teach</b>, and they are the reason this pack exists.</p></div>`);

P('The shape','<h2>Why not a quiz with a health bar</h2>',`
<p class="lede">The obvious classroom game is a quiz with points bolted on. It is obvious because
it is easy, and it is weaker than it looks.</p>
<div class="card r"><h3>What a quiz with points actually does</h3>
<p class="small" style="margin:0">The student has exactly one input: pick the right answer. There
is no plan, no trade, no reason to think past the next box. Two students playing the same set have
the same experience. <b>And bolting a score on top can reduce interest rather than raise it</b>
&mdash; the reward becomes the point, and the content becomes the toll you pay for it.</p></div>
<div class="card t"><h3>What a choice does instead</h3>
<p class="small" style="margin:0">Put a decision <i>before</i> the question and everything changes.
Now the student is weighing: do I take the hard pass because we need the supplies, or the low trail
because we are running thin? <b>The thinking happens before they have even seen the question</b>,
and it continues after, because the outcome changes what they choose next.</p></div>
<div class="card g"><h3>And the difficulty solves itself</h3>
<p class="small" style="margin:0">In this game the <b>player chooses the difficulty by choosing the
road.</b> No hidden algorithm, no labeling anybody. The student who wants the hard pass takes it;
the one who needs a gentler run takes the low trail; both are playing the same game at the same
table and neither has been told which one they are.</p></div>
<div class="note"><b>The test to apply to any game you build:</b> if two students with the same
content would see the same sequence of screens, <b>there is no choice in your game</b> and you have
built a worksheet that beeps.</div>`);

P('The one idea','<h2>The loudest moment belongs to the student who was wrong</h2>',`
<p class="lede">If you take one thing from this pack into your teaching and never build a game at
all, take this.</p>
<div class="card"><h3>What the research says, in one line</h3>
<p class="small" style="margin:0">Of the three things that drive motivation &mdash; feeling
capable, having a say, and belonging &mdash; <b>feeling capable is the strongest</b>. And the
evidence on gamified classrooms is blunt about the rest: points and badges lift interest and
enjoyment but do <b>almost nothing for how capable a student feels.</b></p></div>
<div class="card t"><h3>So the game celebrates the right thing</h3>
<p class="small" style="margin-bottom:5pt">A score says <i>you were already good</i>. That is
news to nobody, least of all the student who was not.</p>
<p class="small" style="margin:0"><b>Fixing something you got wrong says: you are better than you
were twenty minutes ago.</b> That is competence, it is visible, and it is the one thing a
worksheet can never show a child.</p></div>
<div class="card g"><h3>How it is built, mechanically</h3>
<p class="small" style="margin:0">Every question is tagged with an <b>idea</b>. Miss it, and that
idea <b>blocks a road</b> on your map &mdash; you can see it, you can go around it, and it is
waiting. Come back and answer it right and the crossing opens permanently, with the biggest
celebration in the game. <b>The map itself changes shape because the student learned
something.</b></p></div>
<div class="card p"><h3>This is also just good teaching</h3>
<p class="small" style="margin:0">Bringing a missed idea back later rather than immediately is
spacing, and it is one of the best-evidenced things in learning science. You are not decorating a
quiz. You are building the thing the research says works, and making it visible.</p></div>`);

P('What you need','<h2>Before task 1</h2>',`
<div class="card t"><h3>An AI chat you are signed in to</h3>
<p class="small" style="margin:0">Any of them. You paste prompts and read what comes back. You are
at the keyboard throughout.</p></div>
<div class="card"><h3>Twelve to twenty questions, across three or four ideas</h3>
<p class="small" style="margin:0">More than the boss-battle sort of game needs, because this one
sorts by idea and by difficulty. <b>You need some easy, some middling and some genuinely hard</b>
&mdash; the hard road has to actually be hard or the choice is fake.</p></div>
<div class="card g"><h3>A browser and a folder</h3>
<p class="small" style="margin:0">One HTML file you double-click. That is the whole deployment.</p></div>
<div class="card r"><h3>What you do not need</h3>
<p class="small" style="margin:0">Node, npm, a terminal, an account, a server, an art program or
any audio files. The art is text, the sound is generated, and the whole thing is one file.</p></div>
<div class="note"><b>Two hours, not ninety minutes.</b> This is a bigger build than a quiz game and
the pack says so up front. If you have twenty minutes tonight, do tasks 1 to 4 &mdash; a fork in
the road with three real options is the moment this stops being a worksheet.</div>`);

module.exports={};
