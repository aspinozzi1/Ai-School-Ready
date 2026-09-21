const {P,pages}=require('./g1.js');

pages.push(`<div class="sheet"><div class="bar"></div><div style="padding-top:24pt">
<div class="kick">Vibe Code Your Own Game &middot; build 1</div>
<h1>The Boss Battle<br>Review Game</h1>
<p class="lede">Twelve tasks. At the end you have a real game &mdash; health bars, sprites, sound,
screen shake &mdash; where <b>your</b> review questions are the weapon. One file. No student
logins, no subscription, and it runs with the wifi down.</p>
<div class="row" style="margin:12pt 0">
<div class="card t" style="text-align:center"><h3 style="font-size:19pt;color:var(--blue)">12</h3><p class="small" style="margin:0">tasks, each ending in something you can play</p></div>
<div class="card" style="text-align:center"><h3 style="font-size:19pt;color:var(--blue)">1</h3><p class="small" style="margin:0">finished game included</p></div>
<div class="card g" style="text-align:center"><h3 style="font-size:19pt;color:var(--blue)">0</h3><p class="small" style="margin:0">accounts anyone has to make</p></div>
</div>
<div class="note"><b>This is the part of AI nobody shows teachers.</b><br>
Not a faster worksheet. Not a lesson plan in thirty seconds. An actual piece of software, built
by you, in an evening, about the exact thing you taught this week &mdash; and it belongs to you
afterwards.</div>
<div class="card r"><h3>No coding background. About ninety minutes.</h3>
<p class="small" style="margin:0">Nothing installed, nothing to sign up for, no build step.
One file that opens by double-clicking it. Swap in your own questions by editing eight lines at
the top.</p></div>
<div class="card p" style="margin-top:2pt"><h3>Inside</h3>
<p class="small" style="margin:0">Twelve tasks with the exact prompts written out in full
&middot; the finished game, playable today &middot; the six failures you will hit and the
sentence that fixes each &middot; five ways to run it with a class &middot; how to write
questions worth fighting over &middot; and a straight page on building in a famous game's genre
without stealing from it.</p></div>
</div>
<div class="foot"><span>Built and audited by two certified teachers</span><span>Bright Scholar &middot; AI-Ready School</span></div>
<div class="barb"></div></div>`);

P('Before you begin','<h2>The twelve tasks at a glance</h2>',`
<p class="lede">Every task ends with something on screen. If a task does not, stop there and fix
it &mdash; the next one builds on it.</p>
<table>
<thead><tr><th style="width:26pt">#</th><th>Task</th><th>Ends with</th></tr></thead>
<tbody>
<tr><td>1</td><td>Pick the fight</td><td>A boss, a unit, eight questions</td></tr>
<tr><td>2</td><td>The stage</td><td>A window with a floor and a sky</td></tr>
<tr><td>3</td><td>The two fighters</td><td>Pixel art you drew in text</td></tr>
<tr><td>4</td><td>Health bars that drain</td><td>Two bars that slide, not jump</td></tr>
<tr><td>5</td><td>The question and four answers</td><td>Something to click</td></tr>
<tr><td>6</td><td>A right answer lands a hit</td><td>The boss losing health</td></tr>
<tr><td>7</td><td>A wrong answer hits back</td><td>Stakes</td></tr>
<tr><td>8</td><td><b>Make it feel good</b></td><td>Shake, flash, damage numbers</td></tr>
<tr><td>9</td><td>Sound, with no sound files</td><td>A hit you can hear</td></tr>
<tr><td>10</td><td>Winning and losing</td><td>Two endings and a rematch</td></tr>
<tr><td>11</td><td>The class record</td><td>A time that survives the tab closing</td></tr>
<tr><td>12</td><td>Everyone can play it</td><td>Keyboard, touch, Chromebook</td></tr>
</tbody></table>
<div class="card t"><h3>Stop anywhere after task 7</h3>
<p class="small" style="margin:0">Tasks 1 to 7 give you a working game. Tasks 8 and 9 are what
make a class shout at the screen, and they are the ones worth staying up for.</p></div>`);

P('Honestly','<h2>You already have Blooket. Why build one?</h2>',`
<p class="lede">Fair question, asked first, because a teacher who has used Gimkit will ask it
in the first ten seconds.</p>
<table>
<thead><tr><th>&nbsp;</th><th>The ones you know</th><th>The one you build</th></tr></thead>
<tbody>
<tr><td><b>Student logins</b></td><td>Codes, accounts, or both</td><td>None. It is one file on your screen.</td></tr>
<tr><td><b>Needs the internet</b></td><td>Yes</td><td>No. Works with the wifi down.</td></tr>
<tr><td><b>Cost</b></td><td>Free tier, then a yearly fee</td><td>Nothing, forever</td></tr>
<tr><td><b>Blocked by your district?</b></td><td>Sometimes</td><td>It is a local file, so no</td></tr>
<tr><td><b>Student data leaves the room</b></td><td>Yes, to their servers</td><td>Never. There is nothing to send.</td></tr>
<tr><td><b>The game itself</b></td><td>Their template, your questions</td><td>Yours. Change any rule you like.</td></tr>
<tr><td><b>Setup time</b></td><td>Minutes</td><td>An evening, once</td></tr>
</tbody></table>
<div class="note"><b>Be honest about the trade.</b> Their tools are faster to start and have
polish you will not match on a Tuesday. What you get instead is a game that needs nothing from
anyone, costs nothing ever, cannot be taken away when a subscription lapses or a district blocks
a domain, and can be changed on the morning you decide the rules are wrong.</div>
<div class="card g"><h3>The part that surprises people</h3>
<p class="small" style="margin:0">Classes care more about a game their teacher made than a
polished one from a company. Say you built it. They will ask how, and that is a better
conversation than any lesson on digital citizenship.</p></div>`);

P('The one idea','<h2>A game is a machine that remembers what is happening</h2>',`
<p class="lede">This is what separates a game from a worksheet with pictures, and it is the
thing worth actually learning here.</p>
<div class="card"><h3>A worksheet has no state</h3>
<p class="small" style="margin:0">Questions sit there. Answering one changes nothing about the
others. A printable quiz and a fancy digital quiz are the same machine.</p></div>
<div class="card t"><h3>A game has state, and everything reads from it</h3>
<p class="small" style="margin-bottom:5pt">One object holds the whole situation: how much health
each side has, which question is up, how many right in a row, whether the screen is shaking.
<b>Every frame, the game draws that object. Every answer changes it.</b></p>
<p class="small" style="margin:0">That is the entire architecture, and once you have seen it you
can build any game.</p></div>
<div class="card g"><h3>Three parts, and you will build them in this order</h3>
<p class="small" style="margin-bottom:4pt"><b>The state</b> &mdash; one object. Health, question
number, streak.</p>
<p class="small" style="margin-bottom:4pt"><b>The loop</b> &mdash; sixty times a second, nudge
the animations along and draw everything.</p>
<p class="small" style="margin:0"><b>The events</b> &mdash; a click or a key changes the state.
The loop notices on the next frame.</p></div>
<div class="note"><b>Why to say this to the AI out loud.</b> Ask for "a quiz game" and you often
get one giant function that redraws the page on every click, and it becomes unchangeable by task
6. <b>Ask for a state object, a draw function and a game loop</b> and you get something you can
still be editing in March.</div>`);

P('What you need','<h2>Before task 1</h2>',`
<div class="card t"><h3>An AI chat you are signed in to</h3>
<p class="small" style="margin:0">Any of them. You paste prompts and read what comes back. You
are at the keyboard the whole time.</p></div>
<div class="card"><h3>A browser, and a folder</h3>
<p class="small" style="margin:0">The game is one HTML file you save wherever you keep things.
Double-click it and it runs. That is the whole deployment.</p></div>
<div class="card g"><h3>Eight questions you already have</h3>
<p class="small" style="margin:0">Off a quiz, a review sheet, an exit ticket. Four answer choices
each. Do not write new ones tonight &mdash; use something you already trust, so the first version
is about the game rather than about the content.</p></div>
<div class="card r"><h3>What you do not need</h3>
<p class="small" style="margin:0">Node, npm, a terminal, an account, a server, a credit card, an
art program, or any music. The sound in this game is generated by the browser, which is why there
are no audio files to lose.</p></div>
<div class="note"><b>If you only have twenty minutes tonight,</b> do tasks 1 to 4. You will have
a boss, a hero and two health bars on screen, which is the moment this stops feeling
theoretical.</div>`);

module.exports={};
