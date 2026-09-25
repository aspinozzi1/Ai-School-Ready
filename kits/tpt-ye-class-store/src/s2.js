const {P,pages}=require('./s1.js');

/* ---------------------------------------------------------------- 1 cover */
pages.push(`<div class="sheet"><div class="bar"></div><div style="padding-top:22pt">
<div class="kick">Vibe Coding for Kids &middot; build 2</div>
<h1>The Class Store</h1>
<p class="lede">Five days. Your class decides what to sell and what it costs, you build the
storefront live in front of them, they run it for real &mdash; and on the last day
<b>they count the tin against what the software says</b> and find out why the two do not match.</p>
<div class="row" style="margin:12pt 0">
<div class="card t" style="text-align:center"><h3 style="font-size:19pt;color:var(--blue)">5</h3><p class="small" style="margin:0">days, each ending in something real</p></div>
<div class="card" style="text-align:center"><h3 style="font-size:19pt;color:var(--blue)">1</h3><p class="small" style="margin:0">working store app, included and ready</p></div>
<div class="card g" style="text-align:center"><h3 style="font-size:19pt;color:var(--blue)">0</h3><p class="small" style="margin:0">accounts, logins or subscriptions</p></div>
</div>
<div class="note"><b>The lesson that separates this from every other class store.</b><br>
The class works out on paper what a full sell-out should earn <i>before</i> the software does it.
Then they check the software against their own number. <b>You cannot tell whether software is
right unless you already know the answer.</b></div>
<div class="card r"><h3>The students never touch the chatbot. That is the better lesson.</h3>
<p class="small" style="margin:0">Chatbots are 13 and over, and no child's name goes into a prompt.
So students do the research, the pricing, the feature list, the testing and the decisions, and
<b>you do the prompting, on the board, where they can see their own spec becoming software.</b>
Specification and judgment are the actual thinking. Typing prompts is not.</p></div>
<div class="card p" style="margin-top:2pt"><h3>Inside</h3>
<p class="small" style="margin:0">Day-by-day teacher pages &middot; <b>seven student pages worth
printing</b> &middot; the exact prompts written out in full &middot; what to do when the AI breaks
it in front of thirty children &middot; the working store app with a setup screen, so you never
edit code &middot; and the page on what this store deliberately refuses to record.</p></div>
</div>
<div class="foot"><span>Built and audited by two certified teachers</span><span>Bright Scholar &middot; AI-Ready School</span></div>
<div class="barb"></div></div>`);

/* ------------------------------------------------------------- 2 the week */
P('Before you start','<h2>The week at a glance</h2>',`
<table>
<thead><tr><th style="width:52pt">Day</th><th>The class does</th><th>You do</th></tr></thead>
<tbody>
<tr><td><b>1</b><br>What sells</td><td>Survey the room. Rank what people want against what they will actually pay.</td><td>Model a bad survey question, then a good one.</td></tr>
<tr><td><b>2</b><br>Price and stock</td><td>Set prices and opening stock across three tiers. <b>Work out a full sell-out by hand.</b></td><td>Push back on pricing. "Because it is cool" is not a reason.</td></tr>
<tr><td><b>3</b><br>Build it</td><td>Read the spec aloud, watch it become a store, call out what is wrong.</td><td>Prompt on the board. Let it fail and get fixed where they can see.</td></tr>
<tr><td><b>4</b><br>Open</td><td>Run a real selling session. Serve customers. Write down everything that goes wrong.</td><td><b>Say nothing.</b> Write down every workaround you watch them invent.</td></tr>
<tr><td><b>5</b><br>Count up</td><td><b>Count the tin against the ledger.</b> Explain the gap. Decide one change.</td><td>Make that one change live. Ship it.</td></tr>
</tbody></table>
<div class="note"><b>Day 5 is the one that makes this a unit rather than an activity.</b><br>
Every other class store ends at "we had a store." This one ends at <i>the numbers did not match and
we found out why</i>, which is the part that transfers to every job any of them will ever have.</div>
<div class="card t"><h3>How long it really takes</h3>
<p class="small" style="margin:0">Days 1, 2 and 5 are a lesson each. <b>Day 3 is 25 minutes</b> and
can be squeezed into the end of another lesson. <b>Day 4 is as long as your store session is</b> —
twenty minutes is plenty. The days do not have to be consecutive, and it works better spread over
two weeks if your timetable is tight.</p></div>
<div class="card g"><h3>What you need</h3>
<p class="small" style="margin:0">One computer you can project. Any AI chat tool you already use.
A tin, a jar or an envelope. Whatever you use as class money. And the store file in this
download, which opens by double-click and needs nothing installed.</p></div>`);

/* ------------------------------------------------------------ 3 the rules */
P('Before you start','<h2>Two rules, and one of them is not negotiable</h2>',`
<div class="card r"><h3>1 &middot; The grown-up holds the keyboard</h3>
<p class="small" style="margin-bottom:5pt">Every mainstream chatbot requires users to be 13 or
over, and school AI guidance is consistent that a child's name, work or identity should not be
typed into one. So <b>no student sits at the chatbot</b> at any point in this unit.</p>
<p class="small" style="margin:0">This is not a workaround. Students who spend the week deciding
<i>what the software must do</i> and then testing whether it does it are doing the harder and more
transferable half of the work.</p></div>
<div class="card"><h3>2 &middot; The class decides, the AI builds</h3>
<p class="small" style="margin:0">When a student asks for something and the AI does it differently,
<b>the student is right and the AI is wrong</b> — say that out loud on day 3. The specification is
theirs. Your job at the keyboard is to be a fast typist with opinions about what is possible, not
the person who decides what the store should do.</p></div>
<h2 style="margin-top:4pt">And one thing to settle before day 1</h2>
<div class="note"><b>Class money, not real money.</b><br>
This unit is written for whatever token currency your room already uses. <b>If real money is
involved, that is school funds</b> — handling, counting and banking it goes through your office,
under their rules, and nothing in this pack is advice about that. The arithmetic lesson is exactly
the same either way, so use class money if you have the choice.</p></div>
<div class="card p"><h3>The three-tier shelf, and why the store is built around it</h3>
<p class="small" style="margin-bottom:5pt">Classroom-store practice converges on three price
bands, and the app is built to expect all three:</p>
<p class="small" style="margin-bottom:4pt"><b>Tier 1 — free privileges.</b> Sit anywhere for a day,
choose the music, hat for the day. They cost you nothing and they are usually the most wanted
things on the shelf.</p>
<p class="small" style="margin-bottom:4pt"><b>Tier 2 — small things, bought most weeks.</b>
Stickers, pencils, erasers. This is what keeps the store busy.</p>
<p class="small" style="margin:0"><b>Tier 3 — one big thing to save for.</b> Lunch outside with a
friend, the prize box. <b>A store with no tier 3 gets emptied in the first session and stops
motivating anybody by week two.</b> This is the single most common way a class store dies, and it
is worth telling the class so on day 2.</p></div>`);

/* -------------------------------------------------------------- 4 day one */
P('Day 1 &middot; teacher','<h2>What will actually sell</h2>',`
<p class="lede">One lesson. Ends with a ranked list of what this class will really spend on,
built from evidence rather than from the loudest three voices.</p>
<div class="step"><div class="n">1</div><div><h3>Ask the wrong question first (4 minutes)</h3>
<p class="small" style="margin:0">Put this on the board: <b>"Would you like a class store?"</b>
Every hand goes up. Then ask what that told you. Answer: nothing. A question everybody says yes to
has no information in it. <b>This is the whole lesson in one move</b> and it lands better as a
demonstration than as a rule.</p></div></div>
<div class="step"><div class="n">2</div><div><h3>Then the right one (6 minutes)</h3>
<p class="small" style="margin:0">Build a better question together. The test is that a reasonable
person could answer it differently from the person next to them. <b>"Which one of these three
would you spend 20 on?"</b> passes. "Do you like stickers?" does not.</p></div></div>
<div class="step"><div class="n">3</div><div><h3>Run the survey (12 minutes)</h3>
<p class="small" style="margin:0">Student page on the next sheet. Each student asks five people,
inside the class or in another class. <b>Forced choice, not a rating.</b> Ratings make everything
look popular; choosing forces a trade-off, which is what a price is.</p></div></div>
<div class="step"><div class="n">4</div><div><h3>Pool it and rank it (10 minutes)</h3>
<p class="small" style="margin:0">Tally on the board. Now the argument starts, and this is the good
part: <b>the most popular thing is not automatically the thing to stock.</b> Ask what happens if
the most popular item is the one that costs you the most to provide.</p></div></div>
<div class="note"><b>The sentence to end on.</b><br>
"We are not stocking what we like. We are stocking what this room will actually pay for." Write it
up. It is the difference between a business and a wish list, and they will quote it back at each
other on day 2.</div>
<div class="card t"><h3>If it derails</h3>
<p class="small" style="margin:0">Somebody will propose something impossible — a phone, a day off.
<b>Do not rule it out from the front.</b> Ask what it would cost you to actually provide, and let
them work out that it is not on. Killing an idea yourself teaches them to stop proposing; letting
the numbers kill it teaches them the numbers matter.</p></div>`);

/* ------------------------------------------------- 5 day one student page */
P('Day 1 &middot; student page','<h2>What will people really spend on?</h2>',`
<p class="lede">Ask <b>five</b> people. Read them the choice exactly as it is written. Do not
explain it, and do not tell them which one you picked.</p>
<div class="box"><h3>My three things to choose between</h3>
<div class="row"><div><p class="small" style="margin-bottom:3pt"><b>A</b></p><div class="wl"></div></div>
<div><p class="small" style="margin-bottom:3pt"><b>B</b></p><div class="wl"></div></div>
<div><p class="small" style="margin-bottom:3pt"><b>C</b></p><div class="wl"></div></div></div>
<p class="small" style="margin:6pt 0 0"><b>My question, word for word:</b> "If you had 20 to spend,
which one of these three would you buy?"</p></div>
<div class="box"><h3>What they said</h3>
<table><thead><tr><th style="width:34pt">Person</th><th style="width:54pt">Chose</th><th>What they said about why</th></tr></thead>
<tbody>
<tr><td>1</td><td></td><td></td></tr>
<tr><td>2</td><td></td><td></td></tr>
<tr><td>3</td><td></td><td></td></tr>
<tr><td>4</td><td></td><td></td></tr>
<tr><td>5</td><td></td><td></td></tr>
</tbody></table></div>
<div class="box"><h3>The one thing that surprised me</h3>
<div class="wl"></div></div>
<div class="note"><b>Watch out for this.</b> If all five picked the same thing, your three choices
were not close enough. Two bad options and one good one is not a survey, it is a trick.</div>`, true);

/* ------------------------------------------------------------- 6 day two */
P('Day 2 &middot; teacher','<h2>Price it and stock it</h2>',`
<p class="lede">One lesson. Ends with a priced, stocked shelf across three tiers <b>and a number
worked out by hand</b> that the software will later be checked against.</p>
<div class="step"><div class="n">1</div><div><h3>Teach the three tiers (6 minutes)</h3>
<p class="small" style="margin:0">Page 3 has them. Give the class the rule and let them sort their
day 1 list into the bands. <b>Insist on at least one tier 3.</b> If nobody wants to save for
anything, the store is a vending machine and it stops working in a fortnight.</p></div></div>
<div class="step"><div class="n">2</div><div><h3>Price it, and defend it (12 minutes)</h3>
<p class="small" style="margin:0">Every price needs a reason that is not "because it is cool." The
two reasons that count: <b>what it costs us to provide</b>, and <b>what people said they would
spend on day 1.</b> Make groups defend three prices to the room.</p></div></div>
<div class="step"><div class="n">3</div><div><h3>Stock it (5 minutes)</h3>
<p class="small" style="margin:0">Opening stock for each item. Tier 1 privileges can be effectively
unlimited. Tier 3 should be genuinely scarce — <b>one or two</b> — or it is not worth saving for.</p></div></div>
<div class="step"><div class="n">4</div><div><h3>The hand arithmetic (12 minutes) &mdash; do not skip this</h3>
<p class="small" style="margin:0">The sell-out sheet is on page 8. <b>Every group works out
what the shelf earns if every single item sells.</b> Pens and paper. Then collect the numbers and put them on the
board where they will still be on day 5.</p></div></div>
<div class="note"><b>Why the hand arithmetic is the point of day 2.</b><br>
On day 5 the software will tell them a number. If nobody has ever worked one out themselves, that
number is just whatever the computer said. <b>Doing it by hand first is what makes checking
possible</b> — and checking is the skill this unit is actually teaching.</div>
<div class="card r"><h3>The disagreement worth having</h3>
<p class="small" style="margin:0">Two groups will get different sell-out totals. <b>Do not resolve
it.</b> Make them find the difference between their two methods. It is nearly always somebody
forgetting the tier 1 privileges, which is a useful thing to discover before the software does it
for them.</p></div>`);

/* --------------------------------------------- 7 day two student page one */
P('Day 2 &middot; student page','<h2>Our shelf, in three tiers</h2>',`
<p class="lede">Every price needs a reason. <b>"Because it is cool" is not a reason.</b> The two
that count are what it costs us to provide, and what people said on day 1.</p>
<div class="box"><h3>Tier 1 &mdash; free privileges (costs us nothing to give)</h3>
<table><thead><tr><th>What it is</th><th style="width:44pt">Price</th><th style="width:44pt">Stock</th><th style="width:150pt">Why that price</th></tr></thead>
<tbody><tr><td></td><td></td><td></td><td></td></tr>
<tr><td></td><td></td><td></td><td></td></tr>
<tr><td></td><td></td><td></td><td></td></tr></tbody></table></div>
<div class="box"><h3>Tier 2 &mdash; small things, bought most weeks</h3>
<table><thead><tr><th>What it is</th><th style="width:44pt">Price</th><th style="width:44pt">Stock</th><th style="width:150pt">Why that price</th></tr></thead>
<tbody><tr><td></td><td></td><td></td><td></td></tr>
<tr><td></td><td></td><td></td><td></td></tr>
<tr><td></td><td></td><td></td><td></td></tr></tbody></table></div>
<div class="box"><h3>Tier 3 &mdash; the one big thing to save up for</h3>
<table><thead><tr><th>What it is</th><th style="width:44pt">Price</th><th style="width:44pt">Stock</th><th style="width:150pt">Why that price</th></tr></thead>
<tbody><tr><td></td><td></td><td></td><td></td></tr></tbody></table></div>
<div class="note"><b>Check before you hand this in.</b> Is there at least one tier 3? Is the tier 3
price high enough that somebody has to save for more than one week to reach it? If not, put it up.</div>`, true);

/* --------------------------------------------- 8 day two student page two */
P('Day 2 &middot; student page','<h2>What does a full sell-out earn?</h2>',`
<p class="lede">Work this out <b>on paper, before the computer does it.</b> On day 5 we are going to
check the software against your number, and we cannot do that unless you have one.</p>
<div class="box"><h3>Every item on our shelf, if every single one sells</h3>
<table><thead><tr><th>Item</th><th style="width:48pt">Price</th><th style="width:48pt">Stock</th><th style="width:70pt">Price &times; stock</th></tr></thead>
<tbody>
<tr><td></td><td></td><td></td><td></td></tr>
<tr><td></td><td></td><td></td><td></td></tr>
<tr><td></td><td></td><td></td><td></td></tr>
<tr><td></td><td></td><td></td><td></td></tr>
<tr><td></td><td></td><td></td><td></td></tr>
<tr><td></td><td></td><td></td><td></td></tr>
<tr><td></td><td></td><td></td><td></td></tr>
</tbody></table></div>
<div class="row">
<div class="box"><h3>Our sell-out total</h3><div class="wl tall"></div></div>
<div class="box"><h3>Who checked it</h3><div class="wl tall"></div></div></div>
<div class="box"><h3>Two questions to answer underneath</h3>
<p class="small" style="margin-bottom:4pt"><b>Is that a realistic amount for this class to spend in
one term?</b> If it is far more than anybody could earn, the prices are too high or the stock is
too big.</p>
<div class="wl"></div>
<p class="small" style="margin:6pt 0 4pt"><b>Which single item is the biggest share of that
total?</b> If one thing is most of it, the store depends on one thing selling.</p>
<div class="wl"></div></div>`, true);

/* ----------------------------------------------------------- 9 day three */
P('Day 3 &middot; teacher','<h2>Build it live, in twenty-five minutes</h2>',`
<p class="lede">The class watches their own spec become a working store. <b>You are at the keyboard.
They are the ones who say whether it is right.</b></p>
<div class="card t"><h3>Do this before the lesson, not during it</h3>
<p class="small" style="margin:0">Open <code>class-store.html</code> from this download, click
<b>Set up the store</b>, and check it opens. That is all. <b>The store already works</b> — day 3 is
about making it theirs, not about building software from nothing in front of a class, which is how
a live build goes wrong.</p></div>
<div class="step"><div class="n">1</div><div><h3>Put their shelf in, on the board (10 minutes)</h3>
<p class="small" style="margin:0">Open the setup screen and type their day 2 shelf into it —
name, price, stock, tier. <b>No code, no file editing.</b> Let them read the prices out to you and
correct you when you mistype. The correcting is the point: it is their shelf.</p></div></div>
<div class="step"><div class="n">2</div><div><h3>Or let the AI do it, and show them the catch (5 minutes)</h3>
<p class="small" style="margin:0">The setup screen has a prompt that turns their list into a price
list in about thirty seconds. Use it, then <b>read the result against the day 2 sheet in front of
them</b> and find where it changed a price or invented a tier. That is the lesson: fast is not the
same as right, and somebody still has to check.</p></div></div>
<div class="step"><div class="n">3</div><div><h3>Change one real thing by asking (8 minutes)</h3>
<p class="small" style="margin:0">Page 10 has the prompts. Pick <b>one</b>, paste the whole file
into your AI tool, ask for the change, save the result as a new file and open it. One change. Play
with it. If it broke, page 11 is the recovery.</p></div></div>
<div class="step"><div class="n">4</div><div><h3>Save it (2 minutes)</h3>
<p class="small" style="margin:0"><b>Save the store as a file.</b> This is the step people skip and
regret — it hands back one file with their shelf inside it, which is what you open on day 4.</p></div></div>
<div class="note"><b>Say this out loud when the AI does something they did not ask for.</b><br>
"It did not do what we said. We are right and it is wrong." Then fix it in front of them.
<b>A class that watches you correct a computer learns something a class that watches you accept its
output does not.</b></div>`);

/* -------------------------------------------------------- 10 the prompts */
P('Day 3 &middot; the prompts','<h2>Written out in full, to copy</h2>',`
<p class="lede">Paste the whole <code>class-store.html</code> file into whichever AI tool you use,
then one of these. <b>Always save the result as a new file</b> and keep the old one.</p>
<div class="prompt"><div class="lbl">1 &middot; Make it look like our room</div>
Here is a working HTML class store. Change the colors to <b>[our school colors, named]</b> and make
the product names larger so they can be read from the back of a classroom on a projector. Do not
change how anything works. Give me the whole file back.</div>
<div class="prompt"><div class="lbl">2 &middot; A sale limit, which every class asks for by day 4</div>
In this file, stop one customer buying more than <b>three</b> of the same item in a single sale.
Show a clear message saying why rather than just disabling the button. Change nothing else, and
tell me which part you changed so I can change the number myself next time.</div>
<div class="prompt"><div class="lbl">3 &middot; A two-for-one deal on one item</div>
Add an offer to this store: when a customer buys two of <b>[item name]</b> in the same sale, the
second one is half price. It must show up in the cart total and in the ledger, so the numbers still
add up at the end of the day. Give me the whole file back.</div>
<div class="prompt"><div class="lbl">4 &middot; A restock button</div>
Add a way, on the set-up screen only, to add more stock to an item without changing its price or
clearing the ledger. Follow exactly how the existing set-up fields are written.</div>
<div class="note"><b>Three rules that will save you an afternoon.</b><br>
<b>One change per prompt</b>, and open it before you ask for the next. Always say <i>give me the
whole file back</i>, or you get a fragment and nowhere to put it. And <b>always save under a new
name</b> — then a result you dislike costs you nothing at all.</div>
<div class="card g"><h3>What not to ask for, and the reason</h3>
<p class="small" style="margin:0">Do not ask it to add student names, per-student balances, or a
record of who bought what. Page 19 explains why in full, and it is the one request this unit turns
down on purpose.</p></div>`);

/* ------------------------------------------------------- 11 when it fails */
P('Day 3 &middot; teacher','<h2>When it breaks in front of thirty children</h2>',`
<p class="lede">It will, once. Handled well it is the best ninety seconds of the week, because they
watch an adult be wrong in public and fix it calmly.</p>
<table>
<thead><tr><th style="width:142pt">What you see</th><th>What to do, out loud</th></tr></thead>
<tbody>
<tr><td><b>The new file opens blank</b></td><td>"Something in the change broke it." Close it, open the copy you saved, carry on. Thirty seconds. Then paste the broken file back and say: <i>this stopped working after your change, fix only that.</i></td></tr>
<tr><td><b>It changed something you did not ask for</b></td><td>Name it: "We asked for one thing and it did two." Ask again with the extra thing forbidden explicitly. This is the most common failure and the easiest to narrate.</td></tr>
<tr><td><b>It gives you a fragment instead of a file</b></td><td>You forgot <i>give me the whole file back</i>. Ask again with that sentence. Do not try to paste a fragment in.</td></tr>
<tr><td><b>It argues that your idea is bad</b></td><td>Good moment. "It is not the customer. We are." Restate the instruction without justifying it.</td></tr>
<tr><td><b>It is taking too long and the room is going</b></td><td>Stop. "We will finish this at lunch and you will see it tomorrow." <b>A live build has a time box</b> and it is better to end it than to lose the room.</td></tr>
<tr><td><b>The prices come out wrong</b></td><td>Back to the day 2 sheets. The class's paper number is the authority, not the screen. Say that.</td></tr>
</tbody></table>
<div class="note"><b>The one thing not to do.</b><br>
Do not quietly fix it later and show them a working version next lesson. <b>The repair is the
content.</b> A class that only ever sees finished software learns that software arrives finished,
which is the opposite of what this unit is for.</div>`);

/* ------------------------------------------------------------ 12 day four */
P('Day 4 &middot; teacher','<h2>Open the store</h2>',`
<p class="lede">A real selling session. Twenty minutes is plenty. <b>Your job today is to say
nothing and write things down.</b></p>
<div class="step"><div class="n">1</div><div><h3>Set the room up first (5 minutes, before they arrive)</h3>
<p class="small" style="margin:0">The store file open on one machine. The tin. The printed price
list — the Ledger tab prints one. <b>And the paper ledger on page 14</b>, because the paper record
is what makes day 5 possible.</p></div></div>
<div class="step"><div class="n">2</div><div><h3>Give out three jobs</h3>
<p class="small" style="margin:0"><b>The till</b> works the app. <b>The paper ledger</b> writes down
every sale independently. <b>The queue</b> keeps order and watches the clock. Rotate halfway. Everybody
else is a customer, and the customers are the ones being studied.</p></div></div>
<div class="step"><div class="n">3</div><div><h3>Then stop talking (the rest of it)</h3>
<p class="small" style="margin:0">Watch for <b>workarounds</b> — the moments somebody does something
the software did not intend. Writing a total on their hand. Asking a friend to hold their place.
Serving two people at once. <b>Every workaround is a design finding</b> and it is worth more than
anything they will tell you when you ask.</p></div></div>
<div class="note"><b>The rule, and it is hard to keep.</b><br>
<b>If you have to explain how it works, that is a finding, not a customer problem.</b> Write down
what you had to explain instead of explaining it better. The observation sheet opposite is for
exactly this.</div>
<div class="card r"><h3>The thing that will go wrong, and let it</h3>
<p class="small" style="margin:0">Somebody will try to buy the last one of something at the same
moment as somebody else, or the queue will find an item that is sold out and argue about it.
<b>Do not pre-empt this.</b> The app refuses the sale and says so, which is correct, and the
argument about it is day 5's material.</p></div>
<div class="card t"><h3>One laptop, thirty customers</h3>
<p class="small" style="margin:0">Serve in two waves by table rather than a single queue, or let
the queue job hand out numbered slips. Decide it before you start; discovering it live is the one
piece of chaos that is not instructive.</p></div>`);
