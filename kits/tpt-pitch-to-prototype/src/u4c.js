const {P}=require('./u1.js');

P('Student page &middot; Day 4','<h2>Testing: what I saw</h2>',`
<div class="card r" style="margin-bottom:9pt"><h3>Say nothing</h3>
<p class="small" style="margin:0">Hand it over, give them one task, then be quiet. If you have to
explain it, write that down &mdash; <b>that is a finding, not a failure of the tester.</b></p></div>
<div class="box"><h3>The task I gave them</h3><div class="wl"></div></div>
<div class="box"><h3>What they clicked first</h3><div class="wl"></div></div>
<div class="box"><h3>Where they paused or looked confused</h3><div class="wl tall"></div></div>
<div class="box"><h3>Anything they said out loud</h3><div class="wl tall"></div></div>
<div class="box"><h3>Did they finish the task?  Yes / No &mdash; and what got in the way</h3><div class="wl tall"></div></div>
<div class="card t"><h3>Afterwards, the big question</h3>
<p class="small" style="margin:0"><b>What did I know that they did not?</b></p><div class="wl"></div></div>`, true);

P('Student page &middot; Day 5','<h2>Pitch planner and decision log</h2>',`
<div class="box"><h3>1. The problem, in the words of the person who has it</h3><div class="wl tall"></div></div>
<div class="box"><h3>2. What we built &mdash; the three must-haves</h3><div class="wl"></div><div class="wl"></div></div>
<div class="box"><h3>3. What happened when a real person used it</h3><div class="wl tall"></div><div class="wl tall"></div></div>
<div class="row">
<div class="box"><h3 style="color:var(--leaf)">4. What we are changing, and why</h3>
<div class="wl"></div><div class="wl"></div><div class="wl"></div></div>
<div class="box"><h3 style="color:var(--grey)">5. What we are NOT changing, and why</h3>
<div class="wl"></div><div class="wl"></div><div class="wl"></div></div>
</div>
<div class="card p"><h3>Box 5 is the one that impresses people</h3>
<p class="small" style="margin:0">Deciding not to build something, on purpose, with a reason, is
harder and more valuable than adding one more feature.</p></div>`, true);

module.exports={};
