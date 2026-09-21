const {P}=require('./b1.js');

P('Task 1','<h2>Decide what this tool will never know</h2>',`
<p class="lede">Before a single prompt. This takes four minutes and it is the only task that
cannot be done by the AI.</p>
<div class="card"><h3>Write down one sentence</h3>
<p class="small" style="margin-bottom:5pt">"This roster knows <i>&lt;what&gt;</i> and never knows
<i>&lt;what else&gt;</i>."</p>
<p class="small" style="margin:0">Mine is: <b>it knows a first name and a last initial, and it
never knows a surname, a student ID, a grade, or a birthday.</b></p></div>
<div class="card t"><h3>Why the sentence comes first</h3>
<p class="small" style="margin:0">If you start prompting without it, the AI will helpfully offer
you an email field, a parent contact field and a notes box, because that is what rosters usually
have. Every one of those is a thing you would then have to protect. The cheapest student data to
keep safe is the kind you never collected.</p></div>
<div class="card r"><h3>The test for whether a field belongs</h3>
<p class="small" style="margin-bottom:5pt">For each thing you are tempted to store, ask:
<b>what does this tool do differently because it knows that?</b></p>
<p class="small" style="margin:0">A roster does nothing differently for knowing a birthday. So it
does not get one. If you cannot answer the question, delete the field.</p></div>
<div class="note"><b>This is also the answer you give an administrator.</b> Not "it is secure" —
that is a claim you would have to defend. "It cannot hold that" is a fact about the thing, and
you can show them the line that makes it true.</div>`);

P('Task 2','<h2>Make the database</h2>',`
<p class="lede">Ends with two strings written down. That is the whole task.</p>
<div class="step"><div class="n">1</div><div><h3>Sign up and make a project</h3>
<p class="small" style="margin:0">supabase.com, new project, any name. Choose a region near you.
It takes a minute or two to finish building &mdash; that wait is normal.</p></div></div>
<div class="step"><div class="n">2</div><div><h3>Set a database password and keep it</h3>
<p class="small" style="margin:0">Put it wherever you keep passwords. You will almost never need
it, and "almost never" is exactly when people lose things.</p></div></div>
<div class="step"><div class="n">3</div><div><h3>Copy two values</h3>
<p class="small" style="margin:0">Settings, then API. You want the <b>Project URL</b> (it looks
like <code>https://abcdefgh.supabase.co</code>) and the <b>anon public</b> key, which is long.
Do not copy the one labeled service role.</p></div></div>
<div class="card r"><h3>Do not copy the service role key. Ever.</h3>
<p class="small" style="margin:0">Same page, different row. The anon key is meant to sit in a
page. The service role key ignores every rule you are about to write, including the one that
refuses surnames. You will not need it and nothing in this pack uses it.</p></div>
<div class="card g"><h3>Task 2 ends when</h3>
<p class="small" style="margin:0">You have a project URL and an anon key in a file you can find
again.</p></div>`);

P('Task 3','<h2>The two tables</h2>',`
<p class="lede">Two tables is the whole database: classes, and the students in them.</p>
<div class="prompt"><div class="lbl">Prompt 1 &middot; the tables</div>
Write me a Postgres schema for a class roster, as SQL I can paste into the Supabase SQL editor.
Two tables. <b>classes</b>: id, name, an optional period, an archived flag, created_at.
<b>students</b>: id, class_id referencing classes with on delete cascade, display_name, a
sort_order integer, created_at. Use uuid primary keys with gen_random_uuid(). Make display_name
unique within a class. <b>Do not add any other columns</b> &mdash; no email, no student number, no
notes. Add a comment at the top saying why there is no column for a last name.</div>
<div class="card"><h3>What you should get back</h3>
<p class="small" style="margin:0">About twenty lines of SQL. Read it before you run it. You are
looking for two things: that <code>students</code> has exactly the columns you asked for, and
that <code>on delete cascade</code> is on the class reference &mdash; that is what makes deleting
a class in June actually delete its students.</p></div>
<div class="card t"><h3>Run it</h3>
<p class="small" style="margin:0">Supabase, SQL Editor, paste, Run. Then Table
Editor, and look at them. Seeing the empty tables is the point of the task.</p></div>
<div class="card r"><h3>If it added columns you did not ask for</h3>
<p class="small" style="margin:0">It will sometimes add <code>email</code> or <code>full_name</code>
anyway, because that is what most rosters look like. <b>Delete those lines yourself before
running it.</b> This is the first place the habit from task 1 earns its keep.</p></div>
<div class="card g"><h3>Task 3 ends when</h3>
<p class="small" style="margin:0">Two tables exist and you have looked at them.</p></div>`);

P('Task 4 &middot; the one that matters','<h2>The line that makes the wrong thing impossible</h2>',`
<p class="lede">Everything else in this build is plumbing. This is the product.</p>
<div class="prompt"><div class="lbl">Prompt 2 &middot; the constraint</div>
Add a CHECK constraint to the students table called <b>display_name_is_shortened</b>. It must
accept a single first name like <b>Jo</b> or <b>O'Neal</b>, or a first name followed by a single
capital letter and a period like <b>Anthony S.</b>, optionally followed by a number like
<b>Anthony S. 2</b>. It must reject anything containing a full surname, including
<b>Anthony Spinozzi</b>, <b>Spinozzi, Anthony</b> and <b>Anthony S. Spinozzi</b>. Also cap the
length at 24 characters. Give me the ALTER TABLE statement and explain the pattern in plain
English, one clause at a time.</div>
<div class="card t"><h3>What it looks like when it is right</h3>
<pre class="sql">constraint display_name_is_shortened check (
  display_name ~ '^[A-Za-z][A-Za-z''-]*( [A-Z]\\.( [0-9]+)?)?$'
  and length(display_name) &lt;= 24
)</pre>
<p class="small" style="margin:0">The doubled quote inside the pattern is how SQL writes a single
apostrophe, and it is what lets <code>O'Neal</code> through. If yours has one quote there, the
statement will not run.</p></div>
<div class="card r"><h3>Now try to break it, in the SQL editor, before you build anything else</h3>
<pre class="sql">insert into students (class_id, display_name)
values ('00000000-0000-0000-0000-000000000000', 'Anthony Spinozzi');</pre>
<p class="small" style="margin:0">You want the error. <b>new row for relation "students" violates
check constraint "display_name_is_shortened"</b>. If it stores instead, the constraint did not
apply &mdash; check you ran the ALTER on the right table.</p></div>
<div class="note"><b>That error message is the thing you are building.</b> Everything from here is
a nicer way to avoid ever seeing it.</div>
<div class="card g"><h3>Task 4 ends when</h3>
<p class="small" style="margin:0">You have made the database say no to you, on purpose.</p></div>`);

P('Task 5','<h2>A page that talks to it</h2>',`
<p class="lede">One HTML file. It asks for your URL and key, then reads the classes table.</p>
<div class="prompt"><div class="lbl">Prompt 3 &middot; the page</div>
Build a single HTML file, no frameworks and no build step, that runs by opening it in a browser.
It has two boxes at the top for a Supabase project URL and an anon key, and a Connect button. It
saves both to localStorage so I do not retype them, and it keeps working if localStorage is
unavailable. On connect it reads the <b>classes</b> table through the Supabase REST endpoint using
plain fetch &mdash; <b>not</b> the supabase-js library, since I am not installing anything &mdash;
and lists the classes in a dropdown. Send the key in both the apikey and Authorization headers.
If the request fails, show me the actual error message on the page rather than logging it to the
console. Big text, big buttons.</div>
<div class="card"><h3>The sentence that saves you twenty minutes</h3>
<p class="small" style="margin:0"><b>"not the supabase-js library, since I am not installing
anything."</b> Left to itself the AI writes <code>import { createClient }</code>, which needs npm,
which needs a terminal, which is the cliff most teachers fall off. Plain <code>fetch</code> against
the REST endpoint does the same job from a file you double-click.</p></div>
<div class="card t"><h3>Make one class so there is something to see</h3>
<p class="small" style="margin:0">Easiest in the Supabase Table Editor: insert a row into
<code>classes</code> with a name. Then reload your page.</p></div>
<div class="card r"><h3>Nothing appears and there is no error</h3>
<p class="small" style="margin:0">Almost always Row Level Security. Supabase turns it on by
default, and with no policy the anon key can read nothing &mdash; which looks exactly like an
empty table. Prompt 4 on the prompts page fixes it, and the data page explains what you are
turning on.</p></div>
<div class="card g"><h3>Task 5 ends when</h3>
<p class="small" style="margin:0">Your class name appears in the dropdown, having come out of a
database.</p></div>`);

P('Task 6','<h2>Shorten in the browser, before it sends</h2>',`
<p class="lede">Layer 1. The one the student's family would care about most.</p>
<div class="prompt"><div class="lbl">Prompt 4 &middot; the shortening</div>
Add a function <b>shortenName</b> that turns a full name into a first name and a last initial.
<b>Anthony Spinozzi</b> becomes <b>Anthony S.</b> It must also handle <b>Spinozzi, Anthony</b>
written last name first, and give the same answer either way round. A single name like <b>Jo</b>
is left alone, not mangled. A multi-part surname like <b>de la Cruz</b> or <b>Van Der Berg</b>
surrenders only one letter. Then add a box I can type names into, showing a live preview of what
each one becomes, so I can see the shortening happen before anything is sent.</div>
<div class="card t"><h3>Test it with the awkward ones yourself</h3>
<table>
<thead><tr><th>You type</th><th>It should show</th></tr></thead>
<tbody>
<tr><td>Anthony Spinozzi</td><td>Anthony S.</td></tr>
<tr><td>Spinozzi, Anthony</td><td>Anthony S.</td></tr>
<tr><td>Maria de la Cruz</td><td>Maria C.</td></tr>
<tr><td>James Van Der Berg</td><td>James B.</td></tr>
<tr><td>Jo</td><td>Jo</td></tr>
<tr><td>jordan LEE</td><td>Jordan L.</td></tr>
</tbody></table></div>
<div class="card r"><h3>The two it gets wrong first time</h3>
<p class="small" style="margin:0"><b>Last-name-first</b> rosters, which is how most school systems
export them &mdash; without it, <code>Spinozzi, Anthony</code> becomes <code>Spinozzi A.</code>
and you have stored the surname. And <b>mononyms</b>: a student with one name gets turned into
<code>Jo J.</code> if nobody thought about it. Both are in the prompt for that reason.</p></div>
<div class="note"><b>Why the live preview matters more than it looks.</b> It is the only moment a
teacher actually sees the privacy decision happen. Without it this is a claim in a README; with
it, it is a thing you watched work.</div>
<div class="card g"><h3>Task 6 ends when</h3>
<p class="small" style="margin:0">You type a full name and watch it become a short one, before
anything has been sent anywhere.</p></div>`);

module.exports={};
