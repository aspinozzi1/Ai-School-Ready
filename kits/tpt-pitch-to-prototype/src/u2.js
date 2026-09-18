const {P,esc,pages}=require('./u1.js');

/* COVER */
pages.push(`<div class="sheet"><div class="bar"></div><div style="padding-top:30pt">
<div class="kick">Vibe Coding for Kids &middot; Young Entrepreneurs</div>
<h1>Pitch to Prototype</h1>
<p class="lede">A five-day unit where your class finds a real problem in your building, writes the
spec for an app that fixes it, and watches you build it live on the board. The deliverable is
working software, not a poster.</p>
<div class="row" style="margin:12pt 0">
<div class="card t" style="text-align:center"><h3 style="font-size:19pt;color:var(--blue)">5</h3><p class="small" style="margin:0">days, each with a clear end point</p></div>
<div class="card" style="text-align:center"><h3 style="font-size:19pt;color:var(--blue)">6</h3><p class="small" style="margin:0">student pages worth printing</p></div>
<div class="card g" style="text-align:center"><h3 style="font-size:19pt;color:var(--blue)">1</h3><p class="small" style="margin:0">finished example app included</p></div>
</div>
<div class="note"><b>The grown-up holds the keyboard, and that is the point.</b><br>
Students do the interviews, the problem statement, the feature list, the testing and the pitch.
You do the prompting, projected, so they watch their own words become software. Specification and
testing are the actual thinking &mdash; typing prompts is not.</div>
<div class="card r"><h3>Grades 4&ndash;8 &middot; no coding background needed</h3>
<p class="small" style="margin:0">You do not need to know how to code. You need to be willing to
read what the AI produces, say "not quite", and ask again &mdash; in front of the class, which turns
out to be the most valuable part.</p></div>
<div class="row" style="margin-top:10pt">
<div class="card p"><h3>What you need</h3>
<p class="small" style="margin:0">A projector, a browser, and one AI chat account that <i>you</i> sign
in to. Nothing is installed. Nothing is bought. Students never touch the chat &mdash; chatbots are
13 and up, and no child&rsquo;s name goes into a prompt at any point in this unit.</p></div>
<div class="card t"><h3>What comes out of it</h3>
<p class="small" style="margin:0">A single web page that your school can actually use, saved as one
file in your own Drive. It keeps its data in the browser: nothing is sent anywhere, there is no
account, and there is no server to pay for or shut off in June.</p></div>
</div>
<div class="card" style="margin-top:2pt"><h3>Inside</h3>
<p class="small" style="margin:0">Five teacher day-plans with scripts and the exact prompts &middot;
a rescue page for when the build breaks in front of the class &middot; six printable student pages
&middot; every prompt collected on one page &middot; and <b>Lost and Found</b>, a finished example
app built by exactly this process, included as a file you can open today.</p></div>
</div>
<div class="foot"><span>Built and audited by two certified teachers</span><span>Bright Scholar &middot; AI-Ready School</span></div>
<div class="barb"></div></div>`);

/* THE ARC */
P('Before you begin','<h2>The five days at a glance</h2>',`
<p class="lede">Each day ends somewhere definite. If a day does not reach its end point, do not
move on &mdash; the next day depends on it.</p>
<div class="day"><div class="n">DAY 1</div><div><h3>Find a real problem</h3>
<p class="small" style="margin:0"><b>Students:</b> interview three people in the building about
something that annoys them. Not "an app idea" &mdash; a problem.<br>
<b>You:</b> model one interview badly, then well. The difference is the lesson.<br>
<b>Ends with:</b> every group holding three interview sheets.</p></div></div>
<div class="day"><div class="n">DAY 2</div><div><h3>Define it</h3>
<p class="small" style="margin:0"><b>Students:</b> turn the interviews into one problem statement and
sort features into must-have and nice-to-have.<br>
<b>You:</b> push back hard on the must-have list. Three items, not eleven.<br>
<b>Ends with:</b> one page per group that you could hand to a stranger.</p></div></div>
<div class="day"><div class="n">DAY 3</div><div><h3>Build it live</h3>
<p class="small" style="margin:0"><b>Students:</b> read the spec aloud, watch it become software, call
out what is wrong.<br>
<b>You:</b> prompt on the board. Let them see it fail and get fixed.<br>
<b>Ends with:</b> something that runs, even if it is ugly.</p></div></div>
<div class="day"><div class="n">DAY 4</div><div><h3>Test it on real people</h3>
<p class="small" style="margin:0"><b>Students:</b> watch someone use it without explaining anything.<br>
<b>You:</b> teach the one rule &mdash; if you have to explain it, that is a finding.<br>
<b>Ends with:</b> a list of things real users got stuck on.</p></div></div>
<div class="day"><div class="n">DAY 5</div><div><h3>Pitch and change one thing</h3>
<p class="small" style="margin:0"><b>Students:</b> pitch with evidence from testing; decide what to
change and what to leave.<br>
<b>You:</b> make one live change from their decision.<br>
<b>Ends with:</b> a shipped tool the school can actually use.</p></div></div>
<div class="card t"><h3>Shorter on time?</h3><p class="small" style="margin:0">Days 1 and 2 can be
one long session. Day 4 cannot be skipped &mdash; it is where the learning is, and it is the day
most units leave out.</p></div>`);

/* WHY THIS UNIT */
P('Why this unit works','<h2>What students are actually practicing</h2>',`
<p class="lede">If you have run a business unit before, this one will feel different. Here is what
changed and why it matters.</p>
<table>
<tr><th style="width:44%">The usual business unit</th><th>This one</th></tr>
<tr><td>Students invent a product nobody asked for.</td><td>Students find a problem somebody actually has, by asking.</td></tr>
<tr><td>The deliverable is a poster or a slide deck.</td><td>The deliverable runs, and the school keeps using it.</td></tr>
<tr><td>Success is measured by the pitch.</td><td>Success is measured by whether a stranger can use the thing.</td></tr>
<tr><td>Feedback is the teacher's opinion.</td><td>Feedback is watching a real user get stuck.</td></tr>
</table>
<div class="note"><b>The single biggest shift is day 4.</b><br>
Most units end at the pitch, which teaches students that a good presentation is the goal. Testing
on a real user teaches them that the goal is the thing working &mdash; and that their own opinion of
their design is not evidence.</div>
<div class="card g"><h3>What the students take away that lasts</h3>
<p class="small" style="margin:0">How to ask about a problem without leading the answer. How to tell
a must-have from a want. How to watch someone struggle without rescuing them. How to change your
mind because of evidence. None of those are about apps.</p></div>`);

/* KEYBOARD RULE */
P('The one rule','<h2>Why you do the typing</h2>',`
<div class="card r"><h3>The rule</h3>
<p style="margin:0"><b>The adult holds the keyboard. Always.</b> Students never type into the AI
chat, and nothing about a student &mdash; no name, no work, no photo, no description that could
identify one &mdash; goes into a prompt.</p></div>
<div class="card"><h3>The practical reason</h3>
<p class="small" style="margin:0">The main AI chat tools require users to be 13 or older, and most
of them are not designed for a class account. Putting a nine-year-old at that keyboard is a
problem whatever your intentions.</p></div>
<div class="card t"><h3>The better reason</h3>
<p class="small" style="margin:0">Prompting is the easy part and it is not the thinking. Deciding
what to build, saying it precisely enough that someone else could build it, and judging whether
what came back is right &mdash; that is the work, and it is all on the students. <b>Handing them the
keyboard would mean handing them the shallow half.</b></p></div>
<div class="card g"><h3>How it looks in the room</h3>
<p class="small" style="margin:0">Your screen is projected. A student reads their spec aloud. You
type what they said &mdash; not what you think they meant. When it comes back wrong, you ask them
what is wrong, and you type their correction. <b>You are their hands, not their brain.</b></p></div>
<div class="note"><b>Say the rule out loud on day 1 and give the reason.</b> Students accept a
boundary far better when it comes with an explanation, and "prompting is the easy part, I am not
letting you skip the hard part" is an explanation they respect.</div>`);

module.exports={};
