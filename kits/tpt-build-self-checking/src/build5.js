const { P, esc, ACT } = require('./build.js');

/* QUICK START */
P('If you have ten minutes', '<h2>The short version</h2>', `
<p class="lede">The rest of this pack explains why. This page is what to do. Come back for the
reasoning once it is working.</p>
<div class="card t"><h3>1 &middot; Open the file that came with this pack</h3>
<p class="small" style="margin:0"><code>practice-activity.html</code>. Double-click it. It opens in your
browser and works immediately. You now have a working activity and you have written nothing.</p></div>
<div class="card"><h3>2 &middot; Open it again in a text editor</h3>
<p class="small" style="margin:0">Right-click &gt; Open with &gt; Notepad or TextEdit. Near the top is a
block marked YOUR QUESTIONS GO HERE.</p></div>
<div class="card g"><h3>3 &middot; Change the words between the quote marks</h3>
<p class="small" style="margin:0">Your question, your four choices, your explanation. Remember
<code>answer</code> counts from zero. Save the file.</p></div>
<div class="card r"><h3>4 &middot; Refresh the browser</h3>
<p class="small" style="margin:0">Your activity. Ten minutes, no AI needed at all for this route.</p></div>
<div class="note"><b>Then, when you want a different <i>kind</i> of activity</b> rather than different
questions &mdash; that is when the prompts on page 6 onward earn their keep. The AI is for changing what
the thing does. Editing the list is for changing what it asks.</div>`);

/* PLANNING PAGE */
P('Before you build', '<h2>Plan it first &mdash; five minutes with a pen</h2>', `
<p class="lede">The teachers who get a genuinely useful tool are the ones who decided what it was for
before they opened the chat. Fill this in.</p>
<div class="card"><h3>What skill is this practicing?</h3>
<div style="border-bottom:1.5pt solid var(--rule);height:24pt"></div>
<p class="small" style="margin:5pt 0 0">One skill. Not a unit. "Rounding to the nearest ten", not "place value".</p></div>
<div class="card t"><h3>What are the three wrong answers your students actually give?</h3>
<div style="border-bottom:1.5pt solid var(--rule);height:22pt"></div>
<div style="border-bottom:1.5pt solid var(--rule);height:22pt"></div>
<div style="border-bottom:1.5pt solid var(--rule);height:22pt"></div>
<p class="small" style="margin:5pt 0 0">These become your distractors. Invented wrong answers teach
nothing; the ones your class really produces teach a great deal.</p></div>
<div class="card g"><h3>For each one &mdash; what is the misconception behind it?</h3>
<div style="border-bottom:1.5pt solid var(--rule);height:22pt"></div>
<div style="border-bottom:1.5pt solid var(--rule);height:22pt"></div>
<p class="small" style="margin:5pt 0 0">This is what you write in the feedback. It is the part no AI can
do for you, and the part that makes the activity worth more than a worksheet.</p></div>
<div class="note"><b>Ten questions is plenty.</b> A student who does ten with real feedback learns more
than one who clicks through forty. Resist the urge to generate a hundred just because you can.</div>`);

/* SECOND WORKED EXAMPLE */
P('A second example', '<h2>The same file, doing a different job</h2>', `
<p class="lede">To show this is not really about rounding &mdash; here is the identical structure holding
a vocabulary question, written the way this pack argues for.</p>
<div class="code">${esc(`{ q: "In the sentence 'the path was treacherous after the rain',
       what does TREACHEROUS mean?",
  choices: ["Very muddy", "Dangerous and unstable", "Long and winding", "Steep"],
  answer: 1,
  why: "Treacherous means dangerous, especially in a hidden way - the rain made the
        path unsafe, not just messy." },`)}</div>
<div class="card t"><h3>Why each wrong choice is there</h3>
<table style="margin-top:6pt;margin-bottom:0">
<tr><th style="width:32%">Choice</th><th>The student who picks it</th></tr>
<tr><td>Very muddy</td><td>Took the context clue (rain) but not the word. Very common, and worth a specific message.</td></tr>
<tr><td>Long and winding</td><td>Guessed from "path" rather than from the word at all.</td></tr>
<tr><td>Steep</td><td>Knows it is something about difficulty, has not pinned down which.</td></tr>
</table></div>
<div class="note"><b>That table is the actual work.</b> Writing four plausible choices is easy. Knowing
which wrong answer means which misunderstanding is teaching, and it is why your version of this
activity will beat a generated one.</div>`);

/* WHAT ELSE */
P('Where this goes', '<h2>What else the same loop builds</h2>', `
<p class="lede">You now know a method, not a product. The loop on page 5 is identical for all of these &mdash;
describe, look, say what is off, repeat.</p>
<table>
<tr><th style="width:34%">Build</th><th>Tier</th><th>What changes</th></tr>
<tr><td><b>Flashcard drill</b></td><td>1</td><td>One thing at a time, flip to check, shuffle each run.</td></tr>
<tr><td><b>Sorting activity</b></td><td>1</td><td>Drag items into categories. Ask for click-to-select if dragging proves fiddly on tablets.</td></tr>
<tr><td><b>Timed fluency practice</b></td><td>1</td><td>A countdown and a running count. Good for math facts.</td></tr>
<tr><td><b>Class hub page</b></td><td>1</td><td>Today's agenda, links, due dates. You edit it; nobody logs in.</td></tr>
<tr><td><b>Parent explainer</b></td><td>1</td><td>What we are learning and how to help at home, in one page you can send.</td></tr>
<tr><td><b>Score pattern viewer</b></td><td><b>2</b></td><td>Paste de-identified scores, see which questions the group missed. Read page 19 first.</td></tr>
</table>
<div class="note"><b>Notice the Tier column.</b> Five of those six need nobody's permission. The sixth
touches real results and so it follows the Tier 2 rules &mdash; student numbers, no names, key on paper.
Knowing which column you are in is the whole discipline.</div>
<div class="card g"><h3>The honest summary of what you have learned</h3>
<p class="small" style="margin:0">Not how to code. How to describe a thing precisely enough that a
machine can build it, and how to tell whether what came back is right. Those are teaching skills. You
already had them; this pack pointed them at a new object.</p></div>`);

module.exports = {};
