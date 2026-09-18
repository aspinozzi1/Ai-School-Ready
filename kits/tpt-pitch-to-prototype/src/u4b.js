const {P}=require('./u1.js');

P('Student page &middot; Day 2 to 3','<h2>Spec card &mdash; hand this to your teacher</h2>',`
<p class="small">This is what gets built. Whatever is not on this card does not get built, however
much you want it. Print one per group and hand it over on day 3.</p>
<div class="box"><h3>Group</h3><div class="wl"></div></div>
<div class="box"><h3>Who is this for? (their job, not their name)</h3><div class="wl"></div></div>
<div class="box"><h3>The problem, one sentence</h3><div class="wl tall"></div><div class="wl tall"></div></div>
<div class="box" style="border-color:var(--tomato)"><h3 style="color:var(--tomato)">It must do exactly these three things</h3>
<p class="small" style="margin-bottom:5pt">Write them as things the user <i>does</i>, not as features.
"Mark an item claimed", not "a claimed button".</p>
<div class="wl"></div><div class="wl"></div><div class="wl"></div></div>
<div class="box"><h3>Should it remember things after the page closes?  Yes / No</h3>
<p class="small" style="margin:0">If yes, say what: <span style="border-bottom:1.5pt solid var(--rule);display:inline-block;width:56%"></span></p></div>
<div class="card r"><h3>Sign here, both of you</h3>
<p class="small" style="margin:0">Group: <span style="border-bottom:1.5pt solid var(--rule);display:inline-block;width:32%"></span>
&nbsp; Teacher: <span style="border-bottom:1.5pt solid var(--rule);display:inline-block;width:32%"></span><br>
Signing means: we build this, and we do not add to it mid-build.</p></div>`, true);

P('Student page &middot; Day 3','<h2>Watch the build</h2>',`
<p class="small">While your teacher types, you are not a spectator. Write down what actually happened
each round &mdash; this is the record of how your idea became real.</p>
<div class="box"><h3>Round 1 &mdash; what we asked for</h3><div class="wl"></div>
<h3 style="margin-top:6pt">What we got</h3><div class="wl"></div>
<h3 style="margin-top:6pt">What was wrong with it</h3><div class="wl"></div></div>
<div class="box"><h3>Round 2 &mdash; what we said next</h3><div class="wl"></div>
<h3 style="margin-top:6pt">What changed</h3><div class="wl"></div></div>
<div class="box"><h3>Round 3 &mdash; what we said next</h3><div class="wl"></div>
<h3 style="margin-top:6pt">What changed</h3><div class="wl"></div></div>
<div class="card t"><h3>The question to answer at the end of the day</h3>
<p class="small" style="margin-bottom:5pt"><b>Which of our sentences was the vaguest, and how did we
know?</b></p><div class="wl"></div></div>
<div class="card p"><h3>If it broke</h3>
<p class="small" style="margin:0">Write down exactly what you saw, in the fewest words that would let
somebody else picture it.</p></div>`, true);

module.exports={};
