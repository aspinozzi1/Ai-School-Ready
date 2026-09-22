const {P,pages}=require('./s1.js');

pages.push(`<div class="sheet"><div class="bar"></div><div style="padding-top:30pt">
<div class="kick">Free &middot; building things with AI</div>
<h1>The Instructions File</h1>
<p class="lede">The single page that stops an AI asking you a question every ninety seconds
&mdash; and stops your project quietly drifting away from what you asked for.</p>
<div class="note"><b>The complaint every teacher has about building with AI</b> is not that the
code is wrong. It is that you wanted to make something for your class, and instead you spent
forty minutes answering questions about shades of blue.<br><br>
This fixes that, and it takes about fifteen minutes once.</div>
<div class="card t"><h3>What an instructions file is</h3>
<p class="small" style="margin:0">One short document you write before you build anything, and
paste at the start of every chat about that project. It says what the thing is, what it must never
do, and &mdash; the part almost nobody includes &mdash; <b>what the AI should do when it does not
know what you want.</b></p></div>
<div class="card r"><h3>Four pages, one idea, no coding</h3>
<p class="small" style="margin:0">This works whether you are building a classroom game, a
worksheet generator, a tracker, or nothing at all. It is a way of giving instructions, and it
transfers to anything.</p></div>
<div class="card p"><h3>Where this comes from</h3>
<p class="small" style="margin:0">I build software for my own high school shop course and run it
with students all year. The example on page 3 is the real file from one of those projects, with
nothing cleaned up for publication.</p></div>
</div>
<div class="foot"><span>Built and audited by two certified teachers</span><span>Bright Scholar &middot; AI-Ready School</span></div>
<div class="barb"></div></div>`);

P('The problem','<h2>Two ways an AI wastes your evening</h2>',`
<p class="lede">Both are avoidable, and both come from the same missing page.</p>
<div class="card r"><h3>One: it asks instead of deciding</h3>
<p class="small" style="margin-bottom:5pt">"Would you like the buttons rounded or square?" "Should
the timer count up or down?" "Do you want this centered?"</p>
<p class="small" style="margin:0"><b>You do not care.</b> You have no opinion, you have never had
an opinion, and being asked forces you to invent one. Ten of those and the thing you were excited
to build has turned into paperwork.</p></div>
<div class="card t"><h3>Two: it drifts</h3>
<p class="small" style="margin-bottom:5pt">Round one is exactly what you wanted. By round six it
has quietly added a login screen, a settings page and a place to type student names &mdash;
because that is what most software looks like, and nobody told it otherwise.</p>
<p class="small" style="margin:0"><b>Drift is not the model being careless.</b> It is the model
filling silence with the most common answer. The fix is to stop being silent about the things you
actually care about.</p></div>
<div class="card g"><h3>Both are the same missing thing</h3>
<p class="small" style="margin:0">You are holding the whole project in your head, and the AI can
only see this one message. <b>The instructions file is your head, written down</b>, and it is the
cheapest thing you will ever do for a build.</p></div>`);

P('The file','<h2>What goes in it &mdash; a real one, not a template</h2>',`
<p class="small">This is a genuine instructions file from one of my own classroom projects. Five
short sections, and none of them is about code.</p>
<div class="card t"><h3>1. What this is, in one sentence</h3>
<pre>A [kind of thing] for [who uses it]. Read [the other doc]
before doing anything. That doc is the source of truth.</pre>
<p class="small" style="margin:0">One sentence. If you cannot write it, that is worth knowing
before you start building.</p></div>
<div class="card r"><h3>2. Non-negotiables &mdash; the things it may never do</h3>
<pre>- Never use the words battle, fight or enemy in anything
  a player reads.
- No student names anywhere, in code or on screen.
- Every question at real high school level, with a hint.</pre>
<p class="small" style="margin:0"><b>This section is the whole file.</b> Write the rules that
would make you say "no, not like that" &mdash; before you have to say it.</p></div>
<div class="card"><h3>3. The stack, and why</h3>
<pre>Plain JavaScript, no framework, no build step. Serve it
with any static server. It must run on Chromebooks and
phones. Touch controls are required, not optional.</pre>
<p class="small" style="margin:0">"No framework, no build step" is the line that keeps you out of
a terminal. Worth writing every time.</p></div>
<div class="card p"><h3>4. Where things live, and 5. how to behave</h3>
<p class="small" style="margin-bottom:5pt">A short map of the files, so a new chat does not
reorganize your project. Then the working rules:</p>
<pre>- Do not start the next stage until the last one works.
- Keep PROGRESS.md updated at the end of every session.
- Short, warm, dry writing. No em dashes anywhere.</pre></div>`);

P('The line','<h2>The one sentence that saves the evening</h2>',`
<p class="lede">If you put nothing else in the file, put this.</p>
<div class="note" style="font-size:12pt"><b>"When a design question is genuinely open, make the
obvious choice and write it down, rather than stopping to ask."</b></div>
<div class="card t"><h3>What it does</h3>
<p class="small" style="margin:0">It gives the AI permission to decide the hundred small things
you have no opinion about &mdash; and it makes every one of those decisions <b>visible and
reversible</b>, because it has to be written down. You get the speed of not being asked without
losing the ability to say "actually, not that."</p></div>
<div class="card"><h3>The half that makes it safe</h3>
<p class="small" style="margin-bottom:5pt">"Write it down" means a running notes file. Mine is one
page, updated at the end of every session:</p>
<pre>DONE   the map screen, three routes, keyboard controls
NEXT   camps and gear
OPEN   chose three roads not four, felt cluttered
KNOWN  the sound is too quiet on Chromebooks</pre>
<p class="small" style="margin:0"><b>That file is how you pick a project back up after a week of
teaching</b> without rereading everything. It is also how you catch a decision you disagree with,
one line at a time, instead of discovering it in round twelve.</p></div>
<div class="card r"><h3>Where the line does not apply</h3>
<p class="small" style="margin:0">A genuinely open question is a shade of blue. <b>A question about
what your students see, what gets stored about them, or what the thing is for is not open</b>
&mdash; and a good non-negotiables section means it never has to be asked.</p></div>`);

P('Your turn','<h2>Fifteen minutes, and you have one</h2>',`
<p class="lede">Fill this in for whatever you are building next. Paste it at the top of every chat
about that project.</p>
<div class="box"><h3>What this is, in one sentence</h3><div class="wl"></div></div>
<div class="box" style="border-color:var(--tomato)"><h3 style="color:var(--tomato)">It must never</h3>
<p class="small" style="margin-bottom:5pt">The three things that would make you say "no, not like
that."</p>
<div class="wl"></div><div class="wl"></div><div class="wl"></div></div>
<div class="box"><h3>The stack</h3>
<p class="small" style="margin:0">Start with: <b>one HTML file, no frameworks, no build step, runs
by opening it in a browser</b> &mdash; unless you already know you need otherwise.</p></div>
<div class="card p"><h3>And the line, copied as-is</h3>
<p class="small" style="margin:0">"When a design question is genuinely open, make the obvious
choice and write it down in PROGRESS.md, rather than stopping to ask."</p></div>
<div class="card t"><h3>If you want to see one doing real work</h3>
<p class="small" style="margin:0">Every prompt in <b>Vibe Code Your Own Game: The Long Road</b> is
written this way &mdash; twelve prompts that each spend a clause forbidding something, which is why
they produce a game instead of a quiz. It is in this store, with the finished game included.</p></div>
<div class="note"><b>The thing worth remembering.</b> Most of what makes AI useful is not knowing
the right words to ask for. <b>It is deciding in advance what you will not accept</b>, and saying
so once instead of twelve times.<br><br>
If this was useful, leaving feedback costs nothing and earns you TPT credit toward anything in the
store. It also tells me what to make more of.</div>`);

module.exports={};
