const { P, esc, ACT } = require('./build.js');

/* 14 STUDENTS */
P('Using it', '<h2>Getting it to students</h2>', `
<p class="lede">Four ways, easiest first. All of them keep the file yours.</p>
<table>
<tr><th style="width:26%">How</th><th>What happens</th><th style="width:22%">Worth knowing</th></tr>
<tr><td><b>On the board</b></td><td>Open it yourself and work through it as a class.</td><td>Zero setup. Good for a first run.</td></tr>
<tr><td><b>Shared drive</b></td><td>Drop it in the class folder students already open.</td><td>Uses access your district already granted.</td></tr>
<tr><td><b>Attach in your LMS</b></td><td>Post it as a file in Classroom, Canvas, Schoology.</td><td>Some LMSs preview HTML instead of opening it &mdash; tell students to download first.</td></tr>
<tr><td><b>On the devices</b></td><td>Copy it onto classroom laptops or tablets once.</td><td>Works with the wifi off. Genuinely useful when the network is down.</td></tr>
</table>
<div class="note"><b>Notice what is not on this list:</b> putting it on the public internet. You do not
need to, and not needing to is what keeps this simple. The file works fine sitting on a drive.</div>
<div class="card r"><h3>One thing to check with your district</h3>
<p class="small" style="margin:0">Some districts restrict what file types students can open, or block
local HTML on managed devices. That is a two-minute question to your tech team and it is worth
asking before you plan a lesson around it.</p></div>`);

/* 15-17 TROUBLESHOOTING */
P('When it breaks', '<h2>The six things that actually go wrong</h2>', `
<p class="lede">In order of how often they happen. Each fix is one sentence you paste back into the chat,
or one thing you change yourself.</p>
<div class="card r"><h3>1. It opens as a wall of code</h3>
<p class="small" style="margin:0"><b>Cause:</b> the file did not save with <code>.html</code> on the end.
<b>Fix:</b> rename it so it ends in <code>.html</code>. On Windows you may need to turn on
"file name extensions" in File Explorer's View menu to see what it really saved as.</p></div>
<div class="card"><h3>2. Nothing happens when you click</h3>
<p class="small" style="margin:0"><b>Cause:</b> usually the code was copied incompletely &mdash; the last
lines got missed. <b>Fix:</b> copy it again with the copy button, not by selecting with the mouse.</p></div>
<div class="card t"><h3>3. It marks the wrong answer correct</h3>
<p class="small" style="margin:0"><b>Cause:</b> the <code>answer</code> number counts from zero and it is
off by one. <b>Fix:</b> count the choices starting at 0 and correct the number. This is the most
common error in your <i>own</i> edits, not in the AI's work.</p></div>
<div class="card g"><h3>4. It looks plain and unstyled</h3>
<p class="small" style="margin:0"><b>Cause:</b> the styling came as a separate file.
<b>Fix:</b> "Put the styling inside the same HTML file so I only have one file to save."</p></div>`);

P('When it breaks, continued', '<h2>Two more, and a rule</h2>', `
<div class="card"><h3>5. It asks for a name or a login</h3>
<p class="small" style="margin:0"><b>Cause:</b> the AI added a feature you did not ask for &mdash; it does
this sometimes, trying to be helpful. <b>Fix:</b> "Remove the name field and any login. This must not
collect anything about the student." Say it plainly; it will comply. And notice that this is the
Tier 1 rule from page 4 doing its job.</p></div>
<div class="card r"><h3>6. It worked, then you changed something, and now it does not</h3>
<p class="small" style="margin:0"><b>Cause:</b> a missing quote mark or comma in the question list.
<b>Fix:</b> compare your edit to the pattern on page 10. Every question needs its quote marks closed and
a comma between entries. If you cannot spot it, paste the question list into the chat and say
"something in this list is broken &mdash; find it."</p></div>
<div class="note"><b>The rule that covers everything not on this list:</b><br>
Describe what you saw, in ordinary words, and ask for it to be fixed. You do not need the right
vocabulary. "The green thing does not appear when I get it right" is a completely serviceable
bug report and it will be understood.</div>
<div class="card g"><h3>When to stop fixing and start over</h3>
<p class="small" style="margin:0">If three rounds have not fixed it, the conversation has probably tied
itself in a knot. Start a fresh chat, paste Prompt 1 again, and add the one thing that went wrong.
This is faster than untangling, and it costs you two minutes.</p></div>`);

/* 17 CHANGE IT */
P('Make it a habit', '<h2>Changing it for anything else</h2>', `
<p class="lede">The activity is not about rounding. Rounding was just the example. Here is the same
file doing other jobs &mdash; each of these is one prompt or one edit away.</p>
<table>
<tr><th style="width:30%">Subject</th><th>What the questions become</th></tr>
<tr><td>Vocabulary</td><td>The word, with four meanings. The explanation gives the word in a sentence.</td></tr>
<tr><td>Reading</td><td>A short passage at the top, then comprehension questions about it.</td></tr>
<tr><td>Science</td><td>A diagram described in words, then "which part does X?"</td></tr>
<tr><td>History</td><td>A source quotation, then questions about who wrote it and why.</td></tr>
<tr><td>Grammar</td><td>A sentence with four possible corrections.</td></tr>
<tr><td>Music, art, PE</td><td>Terms, signs, rules &mdash; anything with a right answer and a reason.</td></tr>
</table>
<div class="prompt"><div class="lbl">Prompt 6 &middot; changing the subject entirely</div>
Keep this activity exactly as it works now, but replace the content with [subject] questions for
[grade]. Write the explanations so they teach the idea, and keep the reading level appropriate for
that age.
</div>
<div class="note"><b>The test of whether a topic fits:</b> can a question have one clearly right answer
and a reason you could explain in a sentence? If yes, it works. If the answer is "it depends" or
"there are several good answers", this is the wrong tool &mdash; that is a discussion, not a drill.</div>`);

/* 18 WHAT NOT TO BUILD */
P('Judgment', '<h2>What not to build this way</h2>', `
<p class="lede">Knowing where this stops is as valuable as knowing how to start. Four honest limits.</p>
<div class="card r"><h3>Anything that grades for real</h3>
<p class="small" style="margin:0">This is practice, not assessment. It keeps no record, and it should
not. A score that counts belongs in the system your district already uses, where it is backed up,
auditable and covered by policy.</p></div>
<div class="card"><h3>Anything holding a student's name</h3>
<p class="small" style="margin:0">Page 4, Tier 3. The temptation arrives the moment the tool becomes
genuinely useful. Keep the roster key somewhere else.</p></div>
<div class="card t"><h3>Anything open-ended</h3>
<p class="small" style="margin:0">Essays, opinions, "explain your thinking" &mdash; a click-the-answer
activity cannot judge those, and pretending otherwise teaches students that thinking has four
options. Use this for the recall that frees your time for the open-ended work.</p></div>
<div class="card g"><h3>Anything you would not check yourself</h3>
<p class="small" style="margin:0">If you would not read every question before handing it out on paper,
do not hand it out on a screen either. The medium changed; your responsibility for the content
did not.</p></div>`);

/* 19-20 DATA IN FULL */
P('The data rule in full', '<h2>Tier 2: using real results safely</h2>', `
<p class="lede">The activity in this pack collects nothing. But once you have built one tool, you will
want one that looks at how students actually did. Here is how to do that without crossing a line.</p>
<div class="card g"><h3>What makes data de-identified</h3>
<p class="small" style="margin:0">Not "I removed the last names." De-identified means a person who
found this file could not work out which child it describes &mdash; even knowing your class. Student
numbers, no names, no initials, no "the one with the IEP", no detail that only fits one child.</p></div>
<div class="card t"><h3>A worked example</h3>
<p class="small" style="margin-bottom:5pt"><b>Safe to put in a tool or a prompt:</b></p>
<div class="code" style="margin-bottom:7pt">${esc(`S1: 8/10   S2: 6/10   S3: 9/10   S4: 4/10
Whole group missed Q3 and Q7 (both regrouping)`)}</div>
<p class="small" style="margin-bottom:5pt"><b>Not safe, even though it looks harmless:</b></p>
<div class="code" style="margin-bottom:0">${esc(`Marcus: 4/10 - still struggling since his IEP meeting`)}</div></div>
<div class="note"><b>Keep the key on paper.</b> A sticky note in your planner that says S1 = Marcus does
the whole job, and it never leaves your desk. The tool sees S1 forever.</div>`);

P('The data rule in full', '<h2>Tier 3: when to stop and ask</h2>', `
<p class="lede">Sooner or later you will want to build something that genuinely needs real student
information. That is not a failure of nerve &mdash; it is the point at which this stops being a solo
project.</p>
<div class="card r"><h3>You are in Tier 3 the moment any of these is true</h3>
<p class="small" style="margin:0">&bull; Names, initials or student ID numbers go into the tool.<br>
&bull; It stores anything between sessions &mdash; a database, an account, a saved file of results.<br>
&bull; It lives on the public internet where a link would reach it.<br>
&bull; It holds grades that count, attendance, behavior records or anything from an IEP.<br>
&bull; Somebody other than you would need to log in to it.</p></div>
<div class="card"><h3>What to do instead of abandoning the idea</h3>
<p class="small" style="margin:0">Take it to your district's technology team as a proposal, not a
fait accompli. Districts say yes to things reviewed in advance far more often than to things
discovered in use. Bring what it does, what data it touches, and where it would live.
Peninsula School District in Washington built its own tools this way and reports saving
substantial money doing it &mdash; with the district involved, which is exactly the difference.</p></div>
<div class="note"><b>Why the district cares, in one sentence:</b> student records are covered by
federal and state law, and the school &mdash; not you personally &mdash; carries the obligation. A
tool they reviewed is a tool they can stand behind.</div>
<p class="small"><b>Practical guidance, not legal advice.</b> Your district's policy, your state's
student privacy law, FERPA and COPPA are the authorities. Ask your district before real student
information enters anything you build.</p>`);

module.exports = {};
