const {P,esc,APP,SQL}=require('./b1.js');

P('When it breaks','<h2>The six failures you will actually hit</h2>',`
<p class="lede">Not generic advice. These are the six that happen, in the order they happen.</p>
<table>
<thead><tr><th style="width:38%">What you see</th><th>What it is, and the sentence that fixes it</th></tr></thead>
<tbody>
<tr><td><b>An empty list and no error at all</b></td><td>Row Level Security is on with no policy, so the anon key can read nothing &mdash; which looks identical to an empty table. Run the policy statements from <code>schema.sql</code>.</td></tr>
<tr><td><b>import statement is not defined</b></td><td>You got <code>supabase-js</code> code. Say: <b>rewrite this with plain fetch against the REST endpoint, no libraries and no build step.</b></td></tr>
<tr><td><b>violates check constraint</b> when adding a real class</td><td>A name got past the shortening &mdash; usually a middle name or a suffix. Say: <b>show me which line of my paste produced that value.</b></td></tr>
<tr><td><b>duplicate key value violates unique constraint</b></td><td>Two students shortened the same way and the numbering only checked within the batch. Task 8's prompt, with the "already in the class" clause.</td></tr>
<tr><td><b>Failed to fetch</b>, nothing else</td><td>Almost always a typo in the project URL, or a trailing slash. Paste it fresh from the Supabase settings page.</td></tr>
<tr><td><b>It worked yesterday and today the page is blank</b></td><td>Browser data was cleared, so the saved URL and key are gone. Paste them again. Your roster is untouched &mdash; that is the whole point of having a database.</td></tr>
</tbody></table>
<div class="note"><b>The habit worth more than this table:</b> paste the error text into the chat
<i>with what you were doing when it happened</i>. "It broke" gets you guesses. "I clicked Add to
class with thirty names pasted and got this" gets you the answer.</div>`);

P('Prompts','<h2>Every prompt, in one place &mdash; 1 to 5</h2>',`
<p class="small">Copy and paste. Square brackets mean put your own words in.</p>
<div class="prompt"><div class="lbl">1 &middot; the tables</div>
Write me a Postgres schema for a class roster, as SQL I can paste into the Supabase SQL editor.
Two tables. classes: id, name, optional period, archived flag, created_at. students: id, class_id
referencing classes with on delete cascade, display_name, sort_order integer, created_at. Use uuid
primary keys with gen_random_uuid(). Make display_name unique within a class. Do not add any other
columns. Add a comment at the top saying why there is no column for a last name.</div>
<div class="prompt"><div class="lbl">2 &middot; the constraint</div>
Add a CHECK constraint to students called display_name_is_shortened. Accept a single first name
like Jo or O'Neal, or a first name followed by a capital letter and a period like Anthony S.,
optionally followed by a number like Anthony S. 2. Reject anything containing a full surname,
including Anthony Spinozzi, Spinozzi, Anthony and Anthony S. Spinozzi. Cap the length at 24
characters. Give me the ALTER TABLE statement and explain the pattern one clause at a time.</div>
<div class="prompt"><div class="lbl">3 &middot; the page</div>
Build a single HTML file, no frameworks and no build step, that runs by opening it in a browser.
Two boxes for a Supabase project URL and anon key, and a Connect button. Save both to localStorage
and keep working if localStorage is unavailable. On connect, read the classes table through the
Supabase REST endpoint using plain fetch, not the supabase-js library, since I am not installing
anything. Send the key in both the apikey and Authorization headers. Show the actual error on the
page if the request fails. Big text, big buttons.</div>
<div class="prompt"><div class="lbl">4 &middot; let the page read and write</div>
Give me the SQL to enable Row Level Security on both tables and add a policy that lets the anon
key select, insert, update and delete on each. Then tell me in plain English who can reach my data
once that policy exists.</div>
<div class="prompt"><div class="lbl">5 &middot; the shortening</div>
Add a function shortenName turning a full name into a first name and last initial. Anthony
Spinozzi becomes Anthony S. Handle Spinozzi, Anthony written last name first and give the same
answer either way round. Leave a single name like Jo alone. A multi-part surname like de la Cruz
or Van Der Berg surrenders only one letter. Add a box I can type into showing a live preview of
what each name becomes before anything is sent.</div>`);

P('Prompts','<h2>Every prompt, in one place &mdash; 6 to 12</h2>',`
<div class="prompt"><div class="lbl">6 &middot; the paste</div>
Add a big text box where I paste a whole class list, one name per line. Shorten every line in the
browser, preview what I typed against what will be stored, and add an Add to class button that
inserts them all in one request with sort order. Ignore blank lines. Clear the box after a
successful add. If the insert fails, tell me nothing was added, because the whole request is one
statement.</div>
<div class="prompt"><div class="lbl">7 &middot; collisions</div>
Two students can shorten to the same name. Number them: the second Anthony S. becomes Anthony S.
2. Check against students already in the class, not only the ones in this paste. Show the
numbering in the preview.</div>
<div class="prompt"><div class="lbl">8 &middot; the proof</div>
Add a panel called Prove it to yourself with a text box defaulting to Anthony Spinozzi and a
button that sends it to the database bypassing the shortening. If the database refuses it, say so
and show the actual error. If it succeeds, say loudly that the check constraint is missing.</div>
<div class="prompt"><div class="lbl">9 &middot; printing</div>
Add a print stylesheet. When I print, hide the connection boxes, the paste area, the proof panel
and every button. Class name and a numbered list of students, black on white, fitting the page
with no print settings changed.</div>
<div class="prompt"><div class="lbl">10 &middot; the export</div>
Add a button copying the class to the clipboard as S1, S2, S3 in roster order with no names. If
the clipboard is blocked, show the text on the page instead.</div>
<div class="prompt"><div class="lbl">11 &middot; the ending</div>
Add an archive control for a class, and a delete that removes the class and every student in it,
confirmed by typing the class name. Then tell me what happens to the student rows on delete, based
on my actual schema.</div>
<div class="prompt"><div class="lbl">12 &middot; when three rounds have not fixed it</div>
[Start a fresh chat.] Paste prompt 3 again, then add: also make sure that [the thing that kept
going wrong].</div>`);

P('The files','<h2>What is in this download, and what to do with it</h2>',`
<div class="card t"><h3>roster.html</h3>
<p class="small" style="margin:0">The finished roster, built by exactly the twelve tasks in this
pack and tested in a browser before publication. <b>Open it and read it</b> before you build your
own &mdash; knowing what the target looks like makes every prompt land better. It works as-is:
put your own URL and key in and it runs.</p></div>
<div class="card"><h3>schema.sql</h3>
<p class="small" style="margin:0">The whole database, commented. Paste it into the Supabase SQL
Editor and press Run, once. If you would rather have the working thing today and understand it
this weekend, this file plus <code>roster.html</code> gets you there in about ten minutes.</p></div>
<div class="card r"><h3>Two ways to use this pack, both fine</h3>
<p class="small" style="margin:0"><b>Build it</b> &mdash; work the twelve tasks, prompt by prompt,
and end up with something you understand well enough to change. <b>Run it</b> &mdash; use the two
files as they are, and read the tasks when something confuses you. The first teaches more. The
second gets a roster printed before homeroom.</p></div>
<div class="note"><b>Keep both files somewhere you control.</b> Your own Drive, your own
Documents. Not a shared staff folder, and not anywhere that publishes to the web &mdash; the next
page explains exactly why.</div>`);

P('Said plainly','<h2>The key in your file, and who can read your roster</h2>',`
<p class="lede">This page exists because every other tutorial about this leaves it out.</p>
<div class="card r"><h3>The honest sentence</h3>
<p class="small" style="margin:0"><b>Anyone who has both your project URL and your anon key can
read and change this roster.</b> The policy you added in prompt 4 is what lets your page work, and
it does not know the difference between your page and somebody else's.</p></div>
<div class="card"><h3>So three things follow, and they are not optional</h3>
<p class="small" style="margin-bottom:5pt"><b>One.</b> The file lives on your computer. Never on a
website, never in a public folder, never pasted into a forum when you are asking for help &mdash;
strip the key first.</p>
<p class="small" style="margin-bottom:5pt"><b>Two.</b> Nothing sensitive goes in this database.
Look at what is actually in there: first names, last initials, and the order they sit in.</p>
<p class="small" style="margin:0"><b>Three.</b> If you ever think the key has got out, Supabase
can issue a new one in a few seconds. Do that, then paste the new one into your file.</p></div>
<div class="note"><b>Now read those two sentences together, because this is the whole argument of
the pack.</b><br>
A leak is possible. What a leak would expose is a list that says "Anthony S." and "Maria C."
<b>You did not make the breach impossible. You made it boring.</b> That is a far more reliable
form of safety than being careful, because it keeps working on the day you are not.</div>
<div class="card g"><h3>What this is not</h3>
<p class="small" style="margin:0">Not a system of record, not a gradebook, and not a replacement
for whatever your district runs. It is a roster you own, for your own classroom, made out of
information you already carry around in your head.</p></div>`);

P('Where the data lives','<h2>The three tiers, for this build specifically</h2>',`
<p class="lede">The tier is decided by <b>where the data lives and who can reach it</b>, not by
whether names appear.</p>
<div class="card g"><h3>Tier 1 &mdash; build freely</h3>
<p class="small" style="margin:0">The class name, the period, the structure of the tool, the
schema, the code. All yours. None of it is about a child.</p></div>
<div class="card t"><h3>Tier 2 &mdash; where this roster lives</h3>
<p class="small" style="margin:0">First names and last initials, in a database only you have the
key to, on a page that never leaves your machine. This is the tier the whole build is designed to
sit in, and the constraint in task 4 is what keeps it there instead of drifting up a tier the
first time somebody pastes a full roster into the wrong box.</p></div>
<div class="card r"><h3>Tier 3 &mdash; stop, and ask the district</h3>
<p class="small" style="margin:0">Anything traceable to a particular child beyond a name: grades,
behavior records, IEP status, attendance, contact details. Also <b>any of this once it is shared
&mdash; a staff folder, an emailed export, a chatbot window, a second teacher's account.</b> The
data did not change. Who can reach it did, and that is what moves the tier.</p></div>
<div class="note"><b>The part people get backwards.</b> Adding a database did not automatically
push this build into tier 3. Sharing it would. A tool on a server that only you can reach is
closer to a notebook in your desk than to a district system, and the difference is who holds the
key.</div>
<div class="card"><h3>Not legal advice</h3>
<p class="small" style="margin:0">Your district's policy, your state's law, FERPA and COPPA are
the authorities. This is a way of thinking that keeps you well inside them, not a substitute for
asking.</p></div>`);

P('Test it like you mean it','<h2>Eight things to try before you trust it</h2>',`
<p class="lede">Ten minutes. Do these with a fake class, not your real one.</p>
<table>
<thead><tr><th style="width:52%">Try this</th><th>You want</th></tr></thead>
<tbody>
<tr><td>Paste <code>Spinozzi, Anthony</code></td><td><code>Anthony S.</code>, not <code>Spinozzi A.</code></td></tr>
<tr><td>Paste a student with one name</td><td>Left alone, not <code>Jo J.</code></td></tr>
<tr><td>Add two students who shorten the same</td><td>Both there, second numbered</td></tr>
<tr><td>Close the tab and reopen it</td><td>The roster is still there</td></tr>
<tr><td>Open the file on a different computer</td><td>Same roster, after pasting the key</td></tr>
<tr><td>Press the proof button</td><td>A refusal, quoting the constraint by name</td></tr>
<tr><td>Print it</td><td>Names and numbers, no buttons, one page</td></tr>
<tr><td>Delete the fake class</td><td>Its students gone too</td></tr>
</tbody></table>
<div class="card t"><h3>The one that catches the most</h3>
<p class="small" style="margin:0"><b>The second computer.</b> It is the only test that proves you
built what you think you built &mdash; a tool whose data is somewhere other than the machine in
front of you. If the second computer shows an empty roster, something is saving locally that
should not be.</p></div>
<div class="card r"><h3>And one you cannot test by looking</h3>
<p class="small" style="margin:0">Whether a surname ever reached the server. Open your browser's
network tab while you add a class and read what was actually sent. It should say
<code>Anthony S.</code> If it says anything longer, the shortening is running in the wrong
place.</p></div>`);

P('Reading the error','<h2>Postgres is blunt, and that is a kindness</h2>',`
<p class="lede">Database errors look frightening and are the most useful text in this whole build.</p>
<pre class="sql">new row for relation "students" violates check
constraint "display_name_is_shortened"</pre>
<div class="card"><h3>Three pieces, left to right</h3>
<p class="small" style="margin-bottom:5pt"><b>new row for relation "students"</b> &mdash; where it
happened. Not classes, not somewhere mysterious. The students table.</p>
<p class="small" style="margin-bottom:5pt"><b>violates check constraint</b> &mdash; what kind of
rule. A CHECK is a rule about the contents of one row, which means the problem is in the value,
not in your connection or your key.</p>
<p class="small" style="margin:0"><b>"display_name_is_shortened"</b> &mdash; which rule, by the
name you gave it in task 4. This is why naming constraints is worth the two extra words.</p></div>
<div class="card t"><h3>The other one you will meet</h3>
<pre class="sql">duplicate key value violates unique constraint
"students_class_id_display_name_key"</pre>
<p class="small" style="margin:0">Same shape. The name tells you the columns involved:
<code>class_id</code> and <code>display_name</code>. Two students in one class shortened the same
way, and the numbering did not catch it.</p></div>
<div class="note"><b>The rule for getting help fast:</b> paste the whole error, not a summary of
it. The constraint name is the single most useful word in the sentence and it is the first thing
people paraphrase away.</div>`);

P('The first day','<h2>What to say to thirty students</h2>',`
<p class="lede">You built a tool that treats them carefully. Tell them.</p>
<div class="card t"><h3>Sixty seconds, roughly like this</h3>
<p class="small" style="margin:0">"This is the roster I use. It has your first name and the first
letter of your last name, and that is all it has &mdash; not your ID, not your grades, not your
birthday. It is set up so it <i>cannot</i> keep your last name, not just so I remember not to type
it. If two of you come out the same it will number you, and that is why one of you is Anthony S.
2."</p></div>
<div class="card"><h3>Why bother</h3>
<p class="small" style="margin:0">Because students are told constantly that software watches them,
and they are mostly right. Showing them one piece that was deliberately built to know less is a
better lesson about technology than any unit on digital citizenship, and it takes a minute.</p></div>
<div class="card r"><h3>If somebody asks a hard question</h3>
<p class="small" style="margin:0">"Could someone else see it?" is a fair question and the answer is
yes, in principle, if they had my key &mdash; and what they would see is a list of first names.
<b>Answer it straight.</b> A student who catches you overselling the safety of a system learns the
wrong lesson very efficiently.</p></div>
<div class="card g"><h3>The ask worth making</h3>
<p class="small" style="margin:0">Ask them what else the school stores about them, and who they
think can see it. You will get a better discussion out of that than out of any prepared
question.</p></div>`);

P('Outgrowing it','<h2>When one file is enough, and when it is not</h2>',`
<p class="lede">Honest answer: most classroom tools should be one file. This is not most tools.</p>
<div class="card g"><h3>Stay with one file when</h3>
<p class="small" style="margin:0">Only you use it &middot; only on one machine &middot; losing the
data would be annoying rather than serious &middot; it is a timer, a picker, a generator, a
checklist &middot; you want it working in four minutes.</p></div>
<div class="card t"><h3>You have outgrown one file when</h3>
<p class="small" style="margin:0">The same information has to be in front of two machines
&middot; losing it would cost you a real afternoon &middot; something else you build needs to
read the same list &middot; it has to survive a browser being cleared by somebody else's IT
policy.</p></div>
<div class="card r"><h3>The trap in between</h3>
<p class="small" style="margin:0"><b>Do not put a database behind something that did not need
one.</b> You will have taken on a key to protect, a service to remember, and a second thing that
can be down, in exchange for nothing. The question is never "is a database better" &mdash; it is
"what does this tool do that one file cannot."</p></div>
<div class="note"><b>The roster is the honest first case</b>, because a class list is the thing
every other classroom tool wants to read. Once it lives somewhere with a key, the next tool you
build can use it instead of asking you to type thirty names again.</div>`);

P('For the teacher','<h2>How this pack is built, and what it does not claim</h2>',`
<div class="card t"><h3>Where this pattern comes from</h3>
<p class="small" style="margin:0">It is not theoretical. The three-layer approach &mdash; shorten
in the browser, refuse in the database, no column to put it in &mdash; is taken from software I
built and run for my own high school woodshop course, which has been in daily use with real
students for a full school year and is still being extended. The roster in this pack is that
design, reduced to the smallest thing that teaches it.</p></div>
<div class="card"><h3>What was actually tested before this went out</h3>
<p class="small" style="margin:0">The constraint pattern was run against accepting and rejecting
inputs &mdash; <code>Jo</code>, <code>O'Neal</code>, <code>Anthony S.</code>,
<code>Anthony S. 2</code> accepted; <code>Anthony Spinozzi</code>,
<code>Spinozzi, Anthony</code>, <code>Maria de la Cruz</code>, <code>Anthony S. Spinozzi</code>
refused. The included <code>roster.html</code> was driven in a real browser against a stand-in
database enforcing that same constraint: connect, create a class, paste five names including a
deliberate collision, confirm the shortened forms are what reach the database, trigger the
refusal on purpose, remove a student, reload, and handle an unreachable database. No unexpected
console errors.</p></div>
<div class="card r"><h3>What is NOT claimed</h3>
<p class="small" style="margin-bottom:5pt">&bull; <b>Not tested against a live Supabase project</b>
&mdash; the browser test used a stand-in that enforces the same rules. Your first real connection
is yours to make, and task 5 tells you what a good one looks like.</p>
<p class="small" style="margin-bottom:5pt">&bull; <b>Not a secure multi-user system.</b> Anyone
with your URL and key can read the roster. That is stated plainly rather than hedged.</p>
<p class="small" style="margin-bottom:5pt">&bull; <b>Not a system of record</b>, not a gradebook,
not an SIS.</p>
<p class="small" style="margin:0">&bull; <b>Not legal advice.</b> Your district's policy, your
state's law, FERPA and COPPA are the authorities.</p></div>
<div class="card g"><h3>Why the AI is told what not to do so often</h3>
<p class="small" style="margin:0">Most of the prompts in this pack spend a clause forbidding
something &mdash; no extra columns, no libraries, no build step. That is not fussiness. Left to
itself a model builds what most software looks like, and most software collects more than it
needs. Saying no is the part of prompting that nobody teaches.</p></div>`);

P('One last thing','<h2>If this was useful</h2>',`
<div class="card t"><h3>Leaving a review earns you TPT credit</h3>
<p class="small" style="margin:0">TPT gives you credit toward future purchases for every review
you leave, and reviews are how other teachers find work like this. It takes about thirty
seconds.</p></div>
<div class="card r"><h3>If something did not work, tell me before you rate it</h3>
<p class="small" style="margin:0">The Q&amp;A on the listing reaches me directly. A database error
you cannot get past is almost always one line, and I would far rather fix it than have you stuck
with a file that does not run.</p></div>
<div class="card"><h3>The one thing to take away if you take nothing else</h3>
<p class="small" style="margin:0"><b>Decide what your tool must never know, then make it
structurally unable to know it.</b> Not a rule you follow. A shape it has. Everything else in this
pack is one worked example of that idea.</p></div>
<div class="note"><b>Built and audited by two certified teachers.</b><br>
Every prompt here was run. The constraint was tested against names designed to break it. The app
was driven in a browser, including the failures.</div>`);

module.exports={};
