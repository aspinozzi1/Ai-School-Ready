const {P,esc,APP}=require('./u1.js');

P('Day 4','<h2>Test it on real people</h2>',`
<p class="lede">The day most units skip, and the day the actual learning happens.</p>
<div class="card r"><h3>The one rule, and it is hard</h3>
<p style="margin:0"><b>If you have to explain it, that is a finding.</b> Students hand the tool to a
real user, say "can you add a lost umbrella", and then <b>say nothing</b>. Not one word. Watching
someone struggle with something you made, without rescuing them, is genuinely difficult for a
ten-year-old and that is the point.</p></div>
<div class="card t"><h3>Who tests it</h3>
<p class="small" style="margin:0">The people they interviewed on day 1. Not each other &mdash; they
already know how it works, which makes them useless as testers. Three real users is plenty; you
will get every major finding from the first two.</p></div>
<div class="card"><h3>What students record</h3>
<p class="small" style="margin:0">Only what happened: where the user paused, what they clicked first,
what they said out loud, what they got wrong. <b>Not opinions, and not what the student thinks the
user should have done.</b> The observation sheet is deliberately narrow about this.</p></div>
<div class="card p"><h3>The debrief question that does the work</h3>
<p class="small" style="margin:0">"You knew exactly how to use it. They did not. <b>What did you know
that they did not?</b>" That question is the entire discipline of design, and eleven-year-olds get
it immediately once they have watched someone fail in front of them.</p></div>
<div class="card g"><h3>Day 4 ends when</h3><p class="small" style="margin:0">Each group has a list of
things real users got stuck on, written as observations rather than excuses.</p></div>`);

P('Day 5','<h2>Pitch, then change one thing</h2>',`
<p class="lede">The pitch is not the end. Shipping a change based on evidence is the end.</p>
<div class="card"><h3>The pitch, four minutes</h3>
<p class="small" style="margin:0">The problem, in the words of the person who has it &middot; what we
built &middot; <b>what happened when a real person used it</b> &middot; what we are changing because of
that &middot; what we are deliberately not changing, and why.</p></div>
<div class="card t"><h3>The part that separates this from every other pitch</h3>
<p class="small" style="margin:0"><b>"What we are deliberately not changing."</b> A group that says "a
user wanted photos but that is a nice-to-have, so no" has understood something most adults in
meetings have not. Reward it loudly.</p></div>
<div class="card g"><h3>Then make one change, live</h3>
<p class="small" style="margin:0">Pick the highest-impact finding and fix it on the board in front of
them. Five minutes. They watch their evidence become a change in the software, which is the whole
arc of the unit compressed into one moment.</p></div>
<div class="card p"><h3>Then actually give it to the school</h3>
<p class="small" style="margin:0">Save the file, put it on the office computer or the shared drive,
and tell the class it is in use. <b>A tool that gets used is a different experience from a project
that gets graded</b>, and they will remember which one this was.</p></div>
<div class="note"><b>If nothing is good enough to ship, say so honestly</b> and explain what would
need to be true. Pretending a weak tool is in use teaches them that the praise is automatic, which
makes all your other praise worthless.</div>`);

/* ---- STUDENT PAGES ---- */
P('Student page &middot; Day 1','<h2>Problem hunt: interview sheet</h2>',`
<p class="small">Ask about a <b>problem</b>, never about an app. Fill one sheet per person.</p>
<div class="box"><h3>Who I talked to (their job, not their name)</h3><div class="wl"></div></div>
<div class="box"><h3>"Tell me about the last time something at school did not work the way it should."</h3>
<div class="wl tall"></div><div class="wl tall"></div><div class="wl tall"></div></div>
<div class="box"><h3>"What did you do about it?"</h3><div class="wl tall"></div></div>
<div class="box"><h3>"How often does that happen?"</h3><div class="wl"></div></div>
<div class="box"><h3>The exact words they used that stuck with me</h3><div class="wl"></div><div class="wl"></div></div>
<div class="card r" style="margin-top:4pt"><h3>Check yourself before you finish</h3>
<p class="small" style="margin:0">Did I suggest a solution? If yes, cross it out. Today is only for
problems.</p></div>`, true);

P('Student page &middot; Day 2','<h2>Problem statement and feature sort</h2>',`
<div class="box"><h3>Our problem, in one sentence</h3>
<p class="small" style="margin-bottom:5pt">[Who] needs a way to [do what], because [why it is hard now].</p>
<div class="wl tall"></div><div class="wl tall"></div></div>
<div class="row">
<div class="box"><h3 style="color:var(--tomato)">MUST have &mdash; only three</h3>
<div class="wl"></div><div class="wl"></div><div class="wl"></div>
<p class="small" style="margin:5pt 0 0">Test: if we shipped without this, would it still solve the problem? If yes, it goes in the other column.</p></div>
<div class="box"><h3 style="color:var(--grey)">Nice to have &mdash; as many as you like</h3>
<div class="wl"></div><div class="wl"></div><div class="wl"></div><div class="wl"></div><div class="wl"></div></div>
</div>
<div class="card p"><h3>The hardest part of this page</h3>
<p class="small" style="margin:0">Moving something you love into the right-hand column. Professionals
find this hard too. Doing it on purpose is the skill.</p></div>`, true);

module.exports={};
