/* Pages 6 onward. */
const { P, esc, ACT } = require('./build.js');

/* 6 STEP 1 */
P('Step 1 of 6', '<h2>Ask for the first version</h2>', `
<p>Open your AI chat and paste this. It is long on purpose &mdash; every sentence in it exists
because leaving it out produces something worse.</p>
<div class="prompt"><div class="lbl">Prompt 1 &middot; the first build</div>
Build me a self-checking practice activity as one single HTML file I can save and open in a browser.<br><br>
How it should work for a student:<br>
&bull; They see a list of questions, each with four answer choices as clickable buttons.<br>
&bull; If they click a wrong answer, that choice is grayed out and disabled, a message tells them to try again, and they can still pick another answer.<br>
&bull; If they click the right answer, it turns green, the other choices lock, and a sentence explains why that answer is correct.<br>
&bull; A counter at the top shows how many they got right <i>on the first try</i> &mdash; a wrong guess first should not count as a first-try correct.<br>
&bull; When every question is answered, show a summary and a button to start over.<br><br>
Requirements:<br>
&bull; Everything in ONE file. No links to outside files, no internet needed, no login.<br>
&bull; Put my questions in a clearly marked list at the very top of the file so I can edit them without touching anything else.<br>
&bull; Add comments above that list telling me how to add or remove a question.<br>
&bull; Nothing is saved anywhere and no student name is ever asked for.<br>
&bull; Big text and big buttons &mdash; this may be used on a tablet.<br><br>
Use five questions about rounding to the nearest ten as the example content so I can see it working.
</div>
<div class="note"><b>Why "one single HTML file" matters.</b> It is the difference between a thing
you own and a thing you rent. One file goes on a shared drive, into your LMS, onto a flash
drive, or into an email. Nothing expires and nothing needs an account.</div>`);

/* 7 WHAT COMES BACK */
P('Step 1, continued', '<h2>What should come back</h2>', `
<p>You should get one long block of code and, depending on the tool, a preview panel you can
click straight away.</p>
<div class="card t"><h3>If you are using Claude</h3>
<p class="small" style="margin:0">It usually opens the result in a panel beside the conversation
and you can click the buttons there. That is the fastest way to check it &mdash; you are testing
before you have saved anything.</p></div>
<div class="card"><h3>If you are using ChatGPT or Gemini</h3>
<p class="small" style="margin:0">You may get the code without a live preview. Skip ahead to
Step 6 on page 13, save the file, and open it &mdash; then come back here. Everything else in
this pack is identical.</p></div>
<div class="card r"><h3>If it gave you several files</h3>
<p class="small" style="margin:0">Say: <i>"Put all of that into one single HTML file &mdash; the styling
and the code included &mdash; so I only have one thing to save."</i> This is the most common thing
to go differently from the prompt, and one sentence fixes it.</p></div>
<div class="note"><b>Do not read the code.</b> Genuinely. You are not checking whether the code
is good, you are checking whether the activity behaves. Click it like a nine-year-old would.</div>`);

/* 8 CHECK IT */
P('Step 2 of 6', '<h2>Four checks before you go further</h2>', `
<p class="lede">Run these in order. If any fails, the sentence beside it is what you paste back.</p>
<table>
<tr><th style="width:40%">Do this</th><th>If it misbehaves, say this</th></tr>
<tr><td><b>Click a wrong answer on purpose.</b> It should gray out and invite another try.</td>
<td>"When I click a wrong answer, nothing happens. It should gray that choice out and let me try another one."</td></tr>
<tr><td><b>Then click the right answer.</b> It should turn green and explain why.</td>
<td>"When I get it right, it does not tell me why. Show the explanation under the question."</td></tr>
<tr><td><b>Check the counter.</b> A question you got wrong first should NOT count as first-try correct.</td>
<td>"The first-try counter is going up even when I guessed wrong first. It should only count questions I got right on my first click."</td></tr>
<tr><td><b>Answer everything.</b> A summary should appear at the end.</td>
<td>"Nothing happened when I finished the last question. Show a summary with how many I got right on the first try."</td></tr>
</table>
<div class="note"><b>The third check is the one that catches people out.</b> It is the most common
thing to come back subtly wrong, and it is the thing that makes the activity honest: a student
who guesses three times and lands on the right answer has not shown you they know it.</div>`);

/* 9 YOUR CONTENT */
P('Step 3 of 6', '<h2>Put your own content in</h2>', `
<p>Now it works, make it yours. You have two ways, and the second one is the one worth learning.</p>
<div class="card g"><h3>The fast way &mdash; ask</h3>
<div class="prompt" style="margin-top:6pt;margin-bottom:0"><div class="lbl">Prompt 2 &middot; your content</div>
Replace the example questions with these, keeping everything else exactly as it is.
For each one, write the explanation so it teaches the idea rather than just restating the answer.<br><br>
[paste your questions and answers here, in any rough format]
</div></div>
<div class="card t"><h3>The way worth learning &mdash; edit it yourself</h3>
<p class="small" style="margin-bottom:0">Open the file in your text editor. Near the top you will
find the question list. Change the words between the quote marks. Save. Refresh the browser.
That is the whole skill, and it means you are never waiting on an AI to fix a typo.</p></div>
<div class="note"><b>Write the explanations as if the student got it wrong.</b> "50, because 47 is
past halfway" teaches. "The answer is 50" does not. This is the single biggest difference
between an activity that drills and an activity that instructs, and no AI will make that
judgment for you &mdash; it is the part that is actually your job.</div>`);

/* 10 THE QUESTION BLOCK */
P('Step 3, continued', '<h2>The part you edit</h2>', `
<p>This is what the question list looks like in the finished file. Four things to notice.</p>
<div class="code">${esc(`{ q: "Round 47 to the nearest ten.",
  choices: ["40", "50", "47", "500"],
  answer: 1,
  why: "47 is past the halfway point (45), so it rounds up to 50." },`)}</div>
<table>
<tr><th style="width:20%">Part</th><th>What it is</th></tr>
<tr><td><code>q</code></td><td>The question the student reads. Change the words, keep the quote marks.</td></tr>
<tr><td><code>choices</code></td><td>The buttons, in the order they appear. Four is a habit, not a rule &mdash; three or five work.</td></tr>
<tr><td><code>answer</code></td><td><b>Counts from zero.</b> The first choice is 0, the second is 1, the third is 2. Here the answer is "50", which sits second, so it is 1.</td></tr>
<tr><td><code>why</code></td><td>What the student sees after answering. This is where the teaching lives.</td></tr>
</table>
<div class="note"><b>Counting from zero is the one thing that trips everybody.</b> If a question
marks the wrong choice as correct, this is almost always why. Count the choices starting at
zero and check the number matches.</div>
<div class="card r"><h3>Always test your own key</h3>
<p class="small" style="margin:0">Click through every question once after you swap the content in.
An activity that confidently marks the wrong answer correct is worse than no activity, and it
takes ninety seconds to rule out.</p></div>`);

/* 11 FEEDBACK QUALITY */
P('Step 4 of 6', '<h2>Make the feedback teach</h2>', `
<p class="lede">A right-or-wrong activity is worth something. A right-or-wrong activity that
explains itself is worth ten times as much, and it costs one more prompt.</p>
<div class="prompt"><div class="lbl">Prompt 3 &middot; better wrong-answer feedback</div>
For each question, give each <i>wrong</i> choice its own short message explaining the likely mistake &mdash;
not just "try again". Keep it to one sentence, keep it kind, and never say the student is wrong
as a person. Show that message when they click that specific choice.
</div>
<div class="card t"><h3>What that turns into</h3>
<p class="small" style="margin-bottom:4pt">A student who clicks "40" on "round 47" sees:</p>
<p class="small" style="margin:0"><i>"Close &mdash; 47 is past the halfway mark, so it goes up rather than down."</i></p>
<p class="small" style="margin:6pt 0 0">Rather than: <i>"Not quite &mdash; try again."</i></p></div>
<div class="note"><b>This is the part where being a teacher beats being a programmer.</b> You know
which wrong answer means "guessed", which means "rounded the wrong way", and which means
"does not know what halfway is." Those are three different students and they need three
different sentences. Write them yourself.</div>
<div class="card"><h3>Worth knowing</h3>
<p class="small" style="margin:0">The included file uses one shared try-again message, to keep the
code simple enough to read. Prompt 3 is how you upgrade it. Both versions are legitimate &mdash;
start where you like.</p></div>`);

/* 12 MAKE IT YOURS */
P('Step 5 of 6', '<h2>Make it look like your room</h2>', `
<div class="prompt"><div class="lbl">Prompt 4 &middot; appearance</div>
Change the look: use [your colors] as the main colors, make the question text larger, and
put the activity title and a short instruction line at the top. Keep the buttons big enough
to tap on a tablet.
</div>
<div class="prompt"><div class="lbl">Prompt 5 &middot; accessibility, and this one matters</div>
Make sure this works for a student using a keyboard instead of a mouse: every choice should be
reachable by pressing Tab and selectable with Enter, with a clearly visible outline on whatever
is currently selected. Do not use color alone to show right and wrong &mdash; include words too.
</div>
<div class="note"><b>Prompt 5 is not optional and it is not decoration.</b> A student using a
keyboard, a screen reader, or with any color vision difference will hit a wall on an activity
that signals "correct" with green alone. Asking for it costs one prompt. Retrofitting it later
costs an afternoon.</div>
<div class="card g"><h3>How to check it worked</h3>
<p class="small" style="margin:0">Put the mouse down. Press Tab repeatedly &mdash; you should see a
clear outline moving between the choices. Press Enter on one &mdash; it should select. If either
fails, say exactly that and ask again.</p></div>`);

/* 13 SAVE IT */
P('Step 6 of 6', '<h2>Get it out of the chat and into a file</h2>', `
<p class="lede">Until you do this, the thing you made lives inside a conversation. This step is
what makes it yours.</p>
<div class="card"><h3>1. Copy all of the code</h3>
<p class="small" style="margin:0">Most tools have a copy button on the code block. Use it &mdash;
selecting by hand usually misses the last line.</p></div>
<div class="card t"><h3>2. Paste it into a plain text editor</h3>
<p class="small" style="margin:0">Notepad, or TextEdit set to plain text. <b>Not Word.</b> Word adds
invisible formatting that stops the file working, and the failure is baffling when it happens.</p></div>
<div class="card g"><h3>3. Save it with .html on the end</h3>
<p class="small" style="margin:0">Name it something you will recognize: <code>rounding-practice.html</code>.
The <code>.html</code> is what tells your computer to open it in a browser. On Windows, set
"Save as type" to All Files so it does not quietly become a .txt.</p></div>
<div class="card r"><h3>4. Double-click it</h3>
<p class="small" style="margin:0">It opens in your browser. No internet needed. That is the whole
thing &mdash; it works the same on a school laptop with the wifi off.</p></div>
<div class="note"><b>If it opens as a page of code instead of an activity</b>, the file extension
did not save. Rename it so it ends in <code>.html</code> and try again. This is the single most
common stumble in this whole pack and it is a thirty-second fix.</div>`);

module.exports = {};
