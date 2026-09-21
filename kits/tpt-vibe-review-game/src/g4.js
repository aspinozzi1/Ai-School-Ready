const {P}=require('./g1.js');

P('Task 7','<h2>A wrong answer hits back</h2>',`
<p class="lede">Without stakes there is no game, only a quiz with a health bar on it.</p>
<div class="prompt"><div class="lbl">Prompt 6 &middot; consequences</div>
When a wrong answer is clicked, the class takes 12 to 17 damage and the streak resets to zero.
Mark the clicked button wrong in red and <b>still highlight the right one in green</b>. Say
something plain like "Not that one, look at the highlighted answer". <b>Wait longer before the
next question after a miss than after a hit</b> &mdash; about 1.7 seconds instead of 0.9 &mdash;
so there is time to actually read it.</div>
<div class="card t"><h3>The longer pause is the teaching</h3>
<p class="small" style="margin:0">On a hit the class already knows; move on. On a miss the correct
answer is on screen and every eye in the room is on it. <b>That extra eight-tenths of a second is
the only reteaching this game does, and it is why it is a review game and not a scoreboard.</b>
Ask for it explicitly, because no model will think of it.</p></div>
<div class="card r"><h3>Get the numbers right or the game is not fun</h3>
<p class="small" style="margin:0">Boss 200 and about 15 damage a hit means <b>roughly twelve
correct answers to win</b>. Class 100 and about 14 a miss means <b>about seven misses to lose</b>.
So a class at sixty percent loses and a class at seventy-five percent squeaks through. Losable but
winnable is the whole design. If your class wins every time, raise the boss health.</p></div>
<div class="card g"><h3>Task 7 ends when</h3>
<p class="small" style="margin:0">You can lose. Answer badly on purpose and watch your own bar
empty.</p></div>`);

P('Task 8 &middot; the one that matters','<h2>Make it feel good</h2>',`
<p class="lede">Tasks 1 to 7 made a game. This is the one that makes a class shout at the screen.</p>
<div class="prompt"><div class="lbl">Prompt 7 &middot; juice</div>
Add three things when a hit lands. <b>Screen shake</b>: offset the whole canvas by a small random
amount for a few frames and let it settle. <b>A white flash</b>: draw whoever got hit in solid
white for about eight frames. <b>A floating number</b>: show the damage above them, drifting up
and fading out. Make a critical hit shake harder and show a bigger number in gold. Keep all three
short &mdash; a few frames, not a second.</div>
<div class="card t"><h3>These have a name, and the name is useful</h3>
<p class="small" style="margin:0">Game developers call it <b>juice</b> &mdash; feedback that adds
nothing to the rules and everything to how it feels. Almost none of the fun in an arcade game is
in the rules. It is in the shake, the flash, the little number, the sound. <b>Say the word "juice"
to an AI and it knows exactly what you want.</b></p></div>
<div class="card r"><h3>The trap</h3>
<p class="small" style="margin:0">Left to itself a model will make the shake last half a second
and the flash a quarter of one. It looks broken. <b>Short and sharp.</b> If it feels wrong, ask
for half as long before you ask for anything else.</p></div>
<div class="card"><h3>Test it on somebody</h3>
<p class="small" style="margin:0">Hand your laptop to a colleague without explaining anything and
watch them answer three questions. If nobody reacts to a critical hit, the juice is too
quiet.</p></div>
<div class="card g"><h3>Task 8 ends when</h3>
<p class="small" style="margin:0">A critical hit makes you grin at your own screen, alone, at
night.</p></div>`);

P('Task 9','<h2>Sound, with no sound files</h2>',`
<p class="lede">The browser can make noise on its own. Nothing to download and nothing to lose.</p>
<div class="prompt"><div class="lbl">Prompt 8 &middot; sound</div>
Add sound using <b>the Web Audio API to generate tones &mdash; no audio files at all.</b> Write one
small function that plays a tone at a given pitch for a given length. Then use it for: a hit, a
critical hit as a quick rising run of notes, taking damage as a low buzz, winning as a short
four-note fanfare, and losing as three falling notes. Keep everything quiet and under a quarter of
a second except the endings. <b>Wrap it so the game keeps working if audio is blocked.</b></div>
<div class="card t"><h3>Why no files</h3>
<p class="small" style="margin:0">Audio files mean a folder, and a folder means the game is no
longer one file you can email to the teacher next door. A tone generated in six lines of code
travels with the game forever.</p></div>
<div class="card r"><h3>Browsers will not make noise until somebody clicks</h3>
<p class="small" style="margin:0">This is a rule in every browser, not a bug in your game. Since
your first sound happens after a button press, you will not notice &mdash; but if you ever add
music to the title screen, that is why it is silent.</p></div>
<div class="card"><h3>Test it on the classroom machine</h3>
<p class="small" style="margin:0">School computers have their own opinions about volume. Check
before the lesson, not during it.</p></div>
<div class="card g"><h3>Task 9 ends when</h3>
<p class="small" style="margin:0">A hit makes a noise and a critical hit makes a better one.</p></div>`);

P('Task 10','<h2>Winning and losing</h2>',`
<p class="lede">A game needs to end, and it needs to end differently.</p>
<div class="prompt"><div class="lbl">Prompt 9 &middot; the endings</div>
When the boss reaches zero, show a win screen over the canvas: a headline, <b>how many were right
out of how many, and how long it took</b>. When the class reaches zero, show a different screen
that says so plainly and invites a rematch. Both have a button that starts a fresh fight with the
questions reshuffled. Make Enter work on both.</div>
<div class="card t"><h3>Report the score, not just the result</h3>
<p class="small" style="margin:0"><b>"Eleven right out of thirteen, in four minutes"</b> is a
thing a class argues about and tries to beat. "You win" is a thing they watch. The number is what
turns one fight into three.</p></div>
<div class="card r"><h3>Losing has to be survivable</h3>
<p class="small" style="margin:0">The losing screen says what happened and offers another go. No
scolding, no red X, no sad noise that goes on too long. A class that loses and immediately says
"again" is the best outcome this game has.</p></div>
<div class="card g"><h3>Task 10 ends when</h3>
<p class="small" style="margin:0">You have won once and lost once, and both times wanted to press
the button.</p></div>`);

P('Task 11','<h2>The class record</h2>',`
<p class="lede">One number, saved. It changes the whole week.</p>
<div class="prompt"><div class="lbl">Prompt 10 &middot; the record</div>
Save the fastest winning time to <b>localStorage</b> and show it on the title screen and the win
screen. Only save it on a win. <b>Wrap every read and write in a try and catch so the game still
works if storage is unavailable</b>, and show "No class record yet" when there is not one.</div>
<div class="card t"><h3>What this does to third period</h3>
<p class="small" style="margin:0">First period sets a record. Second period sees it on the title
screen. <b>By fifth period it is a competition between classes that you did not have to
organize.</b> That is one afternoon of storage code doing more work than a display board.</p></div>
<div class="card"><h3>Where the record lives, and what that means</h3>
<p class="small" style="margin:0">In the browser, on that one computer. If you play on the
classroom machine all day the record follows the day correctly. Playing on your laptop at home
gives you a different record, and clearing browsing data resets it. For a bragging number that is
exactly right &mdash; nothing important is lost when it goes.</p></div>
<div class="card r"><h3>Keep it to one number</h3>
<p class="small" style="margin:0">It is tempting to store names against times. Do not. The moment
a child's name is in there you have a student record on a shared classroom computer, and the
bragging is not worth it. A time with no name is a leaderboard everybody can still argue
about.</p></div>
<div class="card g"><h3>Task 11 ends when</h3>
<p class="small" style="margin:0">You win, close the tab, reopen the file, and the record is still
there.</p></div>`);

P('Task 12','<h2>Everyone can play it</h2>',`
<p class="lede">The last task, and the one that decides whether it works in your actual room.</p>
<div class="prompt"><div class="lbl">Prompt 11 &middot; reach</div>
Make sure this works for someone using <b>a keyboard instead of a mouse</b>: every answer reachable
with Tab, usable with Enter, with a clearly visible outline on the selected one, and the first
answer focused when a question appears. <b>Do not use color alone</b> to show right and wrong
&mdash; the highlighted correct answer must be obvious without it. Make the buttons big enough for
a finger, stack them in one column on a narrow screen, and check it fits a Chromebook screen with
nothing cut off.</div>
<div class="card t"><h3>The Chromebook test is the real one</h3>
<p class="small" style="margin:0">Teachers build on a laptop and deploy on a cart of Chromebooks
with smaller screens. Open it on the actual hardware before the actual lesson. Something will be
cut off and it takes two minutes to fix in advance and ruins a period to find out live.</p></div>
<div class="card r"><h3>Color alone is the most common accessibility bug in classroom games</h3>
<p class="small" style="margin:0">Red for wrong and green for right is invisible to a good number
of students. The fix costs nothing: the correct answer also gets a word, a mark, or a border
change.</p></div>
<div class="card g"><h3>Task 12 ends when</h3>
<p class="small" style="margin:0">You have played a whole fight using only the number keys, on the
machine your class will actually use.</p></div>`);

module.exports={};
