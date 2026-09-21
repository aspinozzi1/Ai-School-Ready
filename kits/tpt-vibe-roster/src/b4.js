const {P}=require('./b1.js');

P('Task 7','<h2>Paste a whole roster at once</h2>',`
<p class="lede">Nobody types thirty names one at a time twice.</p>
<div class="prompt"><div class="lbl">Prompt 5 &middot; the paste</div>
Add a big text box where I paste a whole class list, one name per line, straight out of whatever
my school system exports. Shorten every line in the browser, show the preview as a list of
<b>what I typed</b> to <b>what will be stored</b>, and add an <b>Add to class</b> button that
inserts them all in one request with their sort order. Ignore blank lines. After a successful add,
clear the box and refresh the list. If the insert fails, say so and <b>tell me nothing was
added</b>, because the whole request is one statement.</div>
<div class="card"><h3>Why one request and not thirty</h3>
<p class="small" style="margin:0">A single insert either takes the whole class or none of it. That
is much easier to reason about than a run that half worked and left you guessing which fourteen
students made it. The phrase "tell me nothing was added" in the prompt is what gets you an honest
message instead of a cheerful one.</p></div>
<div class="card t"><h3>Try it with your real roster</h3>
<p class="small" style="margin:0">Export your actual class list and paste it. This is the first
moment the tool is useful rather than interesting, and it is also the moment you find out what
your school's export format really looks like.</p></div>
<div class="card g"><h3>Task 7 ends when</h3>
<p class="small" style="margin:0">A real class is in the database, in one click, with no surname
anywhere in it.</p></div>`);

P('Task 8','<h2>Two students with the same short name</h2>',`
<p class="lede">You have an Anthony Spinozzi and an Anthony Sanders. Both shorten to
<code>Anthony S.</code> This is not an edge case; it happens in most classes of thirty.</p>
<div class="prompt"><div class="lbl">Prompt 6 &middot; collisions</div>
Two students can shorten to the same name. When that happens, number them: the second
<b>Anthony S.</b> becomes <b>Anthony S. 2</b>, the third becomes <b>Anthony S. 3</b>. It has to
check against students <b>already in the class</b>, not only the ones in this paste, so adding a
second Anthony next week still works. Show the numbering in the preview so I can see which is
which before I commit.</div>
<div class="card r"><h3>The bug this prompt exists to prevent</h3>
<p class="small" style="margin:0">Left alone, the code checks only within the batch you just
pasted. Add Anthony Sanders in September and Anthony Spinozzi in October, and the October insert
fails on the unique constraint with a message that will mean nothing to you at 7am. <b>"Already in
the class, not only in this paste"</b> is the whole fix.</p></div>
<div class="card t"><h3>And now the awkward human bit</h3>
<p class="small" style="margin:0">Somebody is <code>Anthony S. 2</code> and they will notice. Tell
them why on the first day: the tool does not keep last names, so it counts instead. Every student
I have explained that to has thought it was reasonable. It is a better conversation than the one
where a system holds their whole name for no reason.</p></div>
<div class="card g"><h3>Task 8 ends when</h3>
<p class="small" style="margin:0">Two students who shorten the same way are both on the roster,
and you can tell them apart.</p></div>`);

P('Task 9','<h2>Prove it to yourself</h2>',`
<p class="lede">A button whose only job is to fail. It is the most valuable thing on the page.</p>
<div class="prompt"><div class="lbl">Prompt 7 &middot; the proof</div>
Add a panel called <b>Prove it to yourself</b> with a text box defaulting to
<b>Anthony Spinozzi</b> and a button. The button sends that name to the database <b>bypassing the
shortening</b>, and shows what comes back. If the database refuses it, say so clearly and show the
actual error. If it succeeds, say loudly that this is wrong and the check constraint is missing.
Make the failure case the one that looks reassuring.</div>
<div class="card t"><h3>What you should see</h3>
<pre>Refused by the database, which is correct &mdash; new row for
relation "students" violates check constraint
"display_name_is_shortened"</pre></div>
<div class="card"><h3>Why a button and not a note in the documentation</h3>
<p class="small" style="margin:0">Because a claim you can press is different from a claim you can
read. You will press it once a year when you have forgotten how any of this works, and it will
tell you in two seconds whether the thing still holds. So will a principal, if you ever have to
show them.</p></div>
<div class="card r"><h3>If it stores the name</h3>
<p class="small" style="margin:0">Stop. The constraint from task 4 did not apply &mdash; usually
the ALTER ran against a different table, or ran before the table existed. Re-run it, delete the
bad row, and press the button again.</p></div>
<div class="card g"><h3>Task 9 ends when</h3>
<p class="small" style="margin:0">You have triggered the refusal on purpose from inside your own
tool.</p></div>`);

P('Task 10','<h2>Print it</h2>',`
<p class="lede">The roster that matters most is the one on a clipboard when the network is down.</p>
<div class="prompt"><div class="lbl">Prompt 8 &middot; printing</div>
Add a print stylesheet. When I print, hide the connection boxes, the paste area, the proof panel
and every button &mdash; I want the class name and the numbered list of students and nothing else.
Black on white, no background colors, and it must fit a page without me changing any print
settings.</div>
<div class="card"><h3>Test it properly, which means actually printing</h3>
<p class="small" style="margin:0">Print preview is not the test. Send one to the machine in your
building and look at it. This is where you discover that your roster of thirty-one runs onto a
second page with one name on it.</p></div>
<div class="card t"><h3>The detail worth asking for</h3>
<p class="small" style="margin:0">Numbered rows. A printed roster with numbers is countable at a
glance, which is the entire reason you carry one.</p></div>
<div class="card g"><h3>Task 10 ends when</h3>
<p class="small" style="margin:0">A piece of paper exists that you would actually use.</p></div>`);

P('Task 11','<h2>The de-identified copy</h2>',`
<p class="lede">The version you can paste into an AI chat without thinking about it.</p>
<div class="prompt"><div class="lbl">Prompt 9 &middot; the export</div>
Add a button that copies the class to the clipboard as <b>S1, S2, S3</b> in roster order, with no
names at all. If the clipboard is blocked, show the text on the page so I can copy it by hand.</div>
<div class="card"><h3>What this is actually for</h3>
<p class="small" style="margin:0">Group arrangements, seating experiments, rotation schedules,
anything where you want a second opinion from an AI about the <i>shape</i> of your class rather
than about the people in it. You keep the S1-to-name mapping in your head or on paper. The chat
never sees a child.</p></div>
<div class="card r"><h3>A first name is still a name</h3>
<p class="small" style="margin:0">It is tempting to think <code>Anthony S.</code> is de-identified
enough to paste anywhere. In a building where you teach, a first name and an initial identifies a
specific child to anyone who works there. That is why this button exists and why it produces
<code>S1</code> rather than a shorter name.</p></div>
<div class="card g"><h3>Task 11 ends when</h3>
<p class="small" style="margin:0">Your clipboard holds a class with nobody in it.</p></div>`);

P('Task 12','<h2>What happens in June</h2>',`
<p class="lede">The task everybody skips, which is why so much student data outlives the student.</p>
<div class="prompt"><div class="lbl">Prompt 10 &middot; the ending</div>
Add an archive control for a class, and a delete that really deletes &mdash; the class and every
student in it. Make delete ask me to confirm by typing the class name, because it cannot be
undone. Then tell me in one sentence what happens to the student rows when a class is deleted,
based on my actual schema.</div>
<div class="card t"><h3>The answer you want back</h3>
<p class="small" style="margin:0">"The students are deleted too, because
<code>class_id</code> references <code>classes</code> with <code>on delete cascade</code>." If the
AI cannot tell you that from your own schema, ask it to look again &mdash; and if the cascade is
genuinely missing, add it now rather than in June.</p></div>
<div class="card"><h3>Archive and delete are different promises</h3>
<p class="small" style="margin:0"><b>Archive</b> means out of my way. <b>Delete</b> means gone.
Tools that only archive let data quietly accumulate for years, and a list of every child you have
taught since 2026 is a thing you never decided to keep.</p></div>
<div class="card r"><h3>Put a date on it</h3>
<p class="small" style="margin:0">Pick a day &mdash; the last in-service day works &mdash; and
delete last year's classes on it. A retention habit is worth more than a retention policy, and
this one takes four minutes a year.</p></div>
<div class="card g"><h3>Task 12 ends when</h3>
<p class="small" style="margin:0">You have deleted a test class and watched its students go with
it.</p></div>`);

module.exports={};
