const {P,esc}=require('./u1.js');

P('Day 1','<h2>Find a real problem</h2>',`
<p class="lede">The whole unit stands or falls here. A weak problem produces a pointless app and
five days of going through the motions.</p>
<div class="card r"><h3>Start by banning the good idea</h3>
<p class="small" style="margin:0">Tell them: <b>nobody pitches an idea today.</b> Today you only
collect complaints. Ideas come from problems, and a problem you invented at your desk is not a
problem &mdash; it is a guess.</p></div>
<div class="card"><h3>Model it badly first &mdash; this is worth the five minutes</h3>
<p class="small" style="margin-bottom:5pt">Interview a volunteer in front of the class, doing it
wrong on purpose:</p>
<p class="small" style="margin-bottom:4pt"><i>"Wouldn't it be good if there was an app for the lost
property box?"</i> &mdash; leading. They will agree with anything.</p>
<p class="small" style="margin:0">Then do it right: <i>"Tell me about the last time you lost
something at school. What happened? What did you do? How did that go?"</i> Ask them which version
told you more.</p></div>
<div class="card t"><h3>Who they interview</h3>
<p class="small" style="margin:0">Three people, and <b>at least one adult who is not a teacher</b> &mdash;
the office staff, a custodian, a lunch supervisor. Those three know more about what does not work
in a building than anyone, and they are almost never asked.</p></div>
<div class="card g"><h3>Day 1 ends when</h3><p class="small" style="margin:0">Every group has three
completed interview sheets and has not yet suggested a single solution. If a group has already
designed an app, send them back out &mdash; kindly, but send them.</p></div>`);

P('Day 2','<h2>Define it</h2>',`
<p class="lede">Turning three messy conversations into one sentence a stranger could act on.</p>
<div class="card"><h3>The problem statement frame</h3>
<p class="small" style="margin:0">Students fill in: <b>"[Who] needs a way to [do what], because
[why it is hard now]."</b> One sentence. If it needs an "and", it is two problems and they must
pick one.</p></div>
<div class="card t"><h3>Then the sort, and this is where you push</h3>
<p class="small" style="margin-bottom:5pt">Every group will produce eleven must-haves. Your job is
to get them to three.</p>
<p class="small" style="margin:0">Ask of each one: <b>"If we shipped without this, would it still
solve the problem?"</b> If yes, it is a nice-to-have. Say out loud that this is the hardest thing
professionals do and most of them are bad at it too.</p></div>
<div class="card p"><h3>What a good one looks like</h3>
<p class="small" style="margin-bottom:4pt"><b>Problem:</b> "The office staff need a way to know what
is in the lost property box, because right now they have to tip the whole thing out every time a
parent calls."</p>
<p class="small" style="margin:0"><b>Must-have:</b> add an item · see the list · mark it claimed.
<b>Nice-to-have:</b> photos, categories, dates, email alerts, a search box.</p></div>
<div class="card g"><h3>Day 2 ends when</h3><p class="small" style="margin:0">Each group has one page:
a problem statement, three must-haves, and everything else parked in a nice-to-have column. That
page is the spec. Tomorrow you build from it, word for word.</p></div>
<div class="note"><b>Do not let them add features tomorrow.</b> The discipline of shipping what was
specced is half the lesson, and it is the half adults find hardest.</div>`);

P('Day 3','<h2>Build it live</h2>',`
<p class="lede">The day they see their own sentences turn into software. Protect it &mdash; do not
let it become a lecture about AI.</p>
<div class="card"><h3>How to run the room</h3>
<p class="small" style="margin:0">Project your screen. A student from the group reads the spec aloud.
<b>You type what they said, not what you think they meant.</b> If the spec is vague, the result will
be wrong, and that is a better lesson than you quietly fixing it.</p></div>
<div class="prompt"><div class="lbl">The teacher prompt &middot; use this shape every time</div>
Build a single HTML file that runs in a browser with no login and no internet. It is for [who], to help them [do what].<br><br>
It must do exactly three things:<br>
1. [must-have one]<br>
2. [must-have two]<br>
3. [must-have three]<br><br>
Save everything to local storage on this device so it is still there tomorrow, and keep working with empty data if saving is unavailable. Big text and big buttons. Do not ask for anyone's name and do not collect any personal information.
</div>
<div class="card t"><h3>Why that last sentence is in the prompt every single time</h3>
<p class="small" style="margin:0">Left to itself the AI will helpfully add a "your name" field to
almost anything. Saying no up front is easier than noticing it later &mdash; and doing it in front of
the class, out loud, teaches them that this is a thing you decide on purpose.</p></div>
<div class="card g"><h3>Day 3 ends when</h3><p class="small" style="margin:0">Something runs. It can be
ugly. It can be missing a must-have. It has to run.</p></div>`);

P('Day 3, the page you will actually need','<h2>When it breaks in front of everyone</h2>',`
<p class="lede">It will. The AI will produce something that does not work, mid-lesson, with thirty
children watching. <b>This is the most valuable ten minutes in the unit</b> and it only works if you
do not panic.</p>
<div class="card r"><h3>What not to do</h3>
<p class="small" style="margin:0">Do not apologize for the technology. Do not switch to a backup
slide deck. Do not say "let me fix this at lunch." All three teach the class that broken things are
shameful and should be hidden.</p></div>
<div class="card g"><h3>What to do instead &mdash; three moves</h3>
<p class="small" style="margin-bottom:5pt"><b>1. Name it out loud.</b> "That is not what we asked for.
Look &mdash; we said mark it claimed, and it deleted the whole row."</p>
<p class="small" style="margin-bottom:5pt"><b>2. Ask them what they saw.</b> Not what to do about it &mdash;
what they <i>saw</i>. Getting a class to describe a bug precisely is a genuine skill and they are
better at it than you expect.</p>
<p class="small" style="margin:0"><b>3. Fix it in front of them.</b> Type their description back:
<i>"When I click mark claimed it deletes the item. It should keep the item and show it as claimed."</i>
Watch it come back right.</p></div>
<div class="note"><b>What they learn from those ten minutes:</b> that adults do not actually know
how everything works, that being stuck is ordinary rather than embarrassing, and that describing a
problem clearly is most of solving it. <b>You cannot teach that from a slide.</b></div>
<div class="card"><h3>If three rounds have not fixed it</h3>
<p class="small" style="margin:0">Start a fresh chat and paste the original prompt with the one thing
that went wrong added. Say to the class why you are doing it: the conversation got tangled and
starting clean is faster than untangling. That is also a real professional habit.</p></div>`);

module.exports={};
