const {P,esc,APP}=require('./b1.js');

P('What to build next','<h2>The same pattern, six more tools</h2>',`
<p class="lede">You now know how to make something remember. That is the hard part, and it is reusable.
Everything below is the same three moves: build the panel, save the data, add the export.</p>
<table>
<tr><th style="width:30%">Build</th><th>What it stores</th><th style="width:14%">Tier</th></tr>
<tr><td><b>Seating chart</b></td><td>Which name sits in which seat. Print it for a substitute.</td><td>3 local</td></tr>
<tr><td><b>Hall pass log</b></td><td>Who left, when, and when they came back.</td><td>3 local</td></tr>
<tr><td><b>Reading log</b></td><td>Minutes read per student per week, and a running total.</td><td>3 local</td></tr>
<tr><td><b>Behavior tally</b></td><td>Counts of a specific behavior across a week.</td><td>3 local</td></tr>
<tr><td><b>Supply or equipment sign-out</b></td><td>Which laptop or calculator went to whom.</td><td>3 local</td></tr>
<tr><td><b>Class agenda page</b></td><td>Today's plan and links. No student data at all.</td><td>1</td></tr>
</table>
<div class="note"><b>Notice the tier column, and notice the word <i>local</i>.</b><br>
Five of those hold names, and all five are fine for the same reason this dashboard is: the data
stays on your device. The tier is not decided by whether names appear. It is decided by <b>where the
data lives and who else can reach it.</b> That is the sentence to remember out of this whole pack.</div>
<div class="card g"><h3>The prompt shape that builds any of them</h3>
<p class="small" style="margin:0">"Build me a [thing] as one single HTML file. It should [what the
teacher does]. Save everything to local storage on my device so it is still there tomorrow, and keep
working with empty data if saving is unavailable. Add a button that copies a version with names
replaced by S1, S2, S3. No account, no login, nothing sent anywhere."</p></div>`);

P('When you want more','<h2>What hosting would cost you</h2>',`
<p class="lede">Sooner or later you will want the dashboard on your phone as well as your laptop, or
a colleague will ask for a copy that stays in sync. Here is what that actually involves, so you can
decide with your eyes open.</p>
<div class="card r"><h3>What changes the moment it goes online</h3>
<p class="small" style="margin:0">&bull; The data stops living on your device and starts living on
someone's server.<br>
&bull; A link exists that could reach it.<br>
&bull; It becomes software holding student records that your district did not review.<br>
&bull; You, personally, become responsible for something that is properly the school's responsibility.</p></div>
<div class="card t"><h3>What to do instead of abandoning the idea</h3>
<p class="small" style="margin:0">Take it to your technology team as a proposal rather than a
surprise. Bring what it does, what data it touches, and where it would live. Districts say yes to
reviewed things far more often than to discovered things &mdash; and a district that has seen it can
host it properly, which is better than you hosting it badly.</p></div>
<div class="card g"><h3>The middle option most teachers actually want</h3>
<p class="small" style="margin:0">Keep it local, and use the export. If you want the same dashboard on
two machines, you do not need syncing &mdash; you need to retype a class list once a year. That is
twenty minutes against a genuine compliance question, and for most people it is not a close call.</p></div>
<div class="note"><b>The honest summary:</b> everything in this pack is yours, private, and needs
nobody's approval. The moment you want it to be in two places at once, it stops being yours alone.
That is not a rule someone invented to slow you down &mdash; it is just what happens when data moves.</div>
<p class="small"><b>Practical guidance, not legal advice.</b> Your district's policy, your state's
student privacy law, FERPA and COPPA are the authorities.</p>`);

P('Appendix','<h2>Every prompt, in one place</h2>',`
<p class="small">Copy from here rather than retyping. Square brackets mean put your own thing in.</p>
<div class="prompt" style="padding:8pt 11pt"><div class="lbl">1 &middot; the shell</div><span class="small">Build me a classroom dashboard as one single HTML file. Six tabs across the top: Class list, Pick a student, Make groups, Timer, Points, Data and reset. Clicking a tab shows that panel and hides the others. Everything in one file, no internet, no login. Big text and big buttons for use on a board. Leave the panels empty for now.</span></div>
<div class="prompt" style="padding:8pt 11pt"><div class="lbl">2 &middot; saving</div><span class="small">Make it remember its data between sessions using the browser's local storage on my device. One saved object holding the class list, points, and pick history. Save automatically whenever anything changes; load on open. If saving or loading fails, keep working with empty data rather than erroring. Show a small Saved confirmation.</span></div>
<div class="prompt" style="padding:8pt 11pt"><div class="lbl">3 &middot; the roster</div><span class="small">Class list tab: a text box and Add button; Enter also adds. Names show as chips with a small x to remove. Saves straight away. Refuse duplicates and say so. Removing a student removes their points and pick history too. Show a running count.</span></div>
<div class="prompt" style="padding:8pt 11pt"><div class="lbl">4 &middot; fair random</div><span class="small">Pick tab: a big Pick button showing one name in large text. A Fair mode checkbox, on by default: remember who has been picked and only choose from those who have not, starting a fresh round when everyone has had a turn. Show how many are left this round. Pick history saves.</span></div>
<div class="prompt" style="padding:8pt 11pt"><div class="lbl">5 &middot; groups</div><span class="small">Groups tab: a group size box and a Make groups button. Shuffle properly and deal into groups of that size, shown as cards. Everyone must be placed; the last group can be smaller. Use a proper shuffle, not sorting by a random number.</span></div>
<div class="prompt" style="padding:8pt 11pt"><div class="lbl">6 &middot; timer</div><span class="small">Timer tab: a big countdown readable from the back of a room. Presets for 1, 3, 5 and 10 minutes, plus Start and Pause. Stops and turns red at zero. Does not need to save.</span></div>`);

P('Appendix','<h2>The rest of the prompts</h2>',`
<div class="prompt" style="padding:8pt 11pt"><div class="lbl">7 &middot; points</div><span class="small">Points tab: a table with one row per student showing name, total, and +1 and +5 buttons. Tapping adds and saves straight away.</span></div>
<div class="prompt" style="padding:8pt 11pt"><div class="lbl">8 &middot; de-identified export</div><span class="small">Data tab: a button that builds a copy of the points with every name replaced by S1, S2, S3, shown in a text box, plus a Copy button. Add a note saying this version is the one to paste into an AI chat and the named version stays on this device. Also add Clear all points and Erase everything, both asking for confirmation.</span></div>
<div class="prompt" style="padding:8pt 11pt"><div class="lbl">9 &middot; appearance</div><span class="small">Restyle with [your colors]. Make the picked name and the timer as large as will fit. Thick outlines and rounded corners so it reads from a distance.</span></div>
<div class="prompt" style="padding:8pt 11pt"><div class="lbl">10 &middot; accessibility</div><span class="small">Everything reachable with Tab and usable with Enter, with a clearly visible outline on the selected item. Do not use color alone to show state. Give every icon-only button a label a screen reader can announce.</span></div>
<div class="prompt" style="padding:8pt 11pt"><div class="lbl">11 &middot; when something breaks</div><span class="small">Here is what I did and what happened: [what you clicked]. I expected [what should have happened]. Fix it and give me the whole file again.</span></div>
<div class="prompt" style="padding:8pt 11pt"><div class="lbl">12 &middot; a printable version</div><span class="small">Add a print stylesheet so printing gives a clean class list and points table with no buttons, no tabs and no colors &mdash; something I can put in a substitute folder.</span></div>
<div class="note"><b>Prompt 12 is the one teachers ask for second</b>, right after they have used the
dashboard for a week: the same data on paper, for the day the laptop does not turn up.</div>`);

const head=APP.replace(/\r/g,'');
const storage=head.slice(head.indexOf('/* ---- storage'), head.indexOf('/* ---- tabs'));
P('The file','<h2>The part that does the remembering</h2>',`
<p class="small">The complete dashboard ships with this pack as <code>classroom-dashboard.html</code> &mdash;
you do not need to type any of this. This is the piece worth actually looking at, because it is the
one you will reuse in everything else you build.</p>
<div class="code" style="font-size:7.6pt;line-height:1.3">${esc(storage.trim())}</div>
<div class="card t"><h3>Reading it without knowing code</h3>
<p class="small" style="margin:0"><code>load</code> tries to read what was saved; if anything at all
goes wrong it hands back empty data instead of failing. <code>save</code> writes the whole object and
shows a confirmation; if the browser refuses, it says so rather than pretending. <b>Both are wrapped
in try and catch</b>, which is the instruction from prompt 2 &mdash; keep working when storage is
unavailable &mdash; showing up in the actual file.</p></div>`);

P('For the teacher','<h2>How this pack is built</h2>',`
<div class="card"><h3>What we are claiming</h3><p class="small" style="margin:0">That these prompts,
used with a current AI chat, produce a working classroom dashboard. Every prompt was run and the
resulting app was tested in a real browser before publication &mdash; including adding students,
closing the tab and reopening to confirm the data survived, checking fair mode does not repeat, that
the group maker places everyone, and that the export contains no names.</p></div>
<div class="card r"><h3>What we are not claiming</h3><p class="small" style="margin:0">Not a
replacement for your district's systems. Not a gradebook of record. Not a substitute for reading your
district's policy. And not legal advice about student data &mdash; FERPA, COPPA, your state law and
your district are the authorities.</p></div>
<div class="card t"><h3>An honest limitation</h3><p class="small" style="margin:0">Local storage is
tied to one browser on one device, and a managed school laptop may restrict it. That is a real
constraint, it is the same constraint that keeps the data private, and page 18 covers what changing it
would cost. AI tools also change; this pack teaches the loop and ships the finished file for exactly
that reason.</p></div>
<div class="card g"><h3>Sources</h3><p class="small" style="margin:0">The tools named on page 17 as
worth building next &mdash; hall passes, seating charts, group makers, behavior trackers, name pickers
&mdash; are drawn from 2026 reporting on what teachers are already building for themselves with AI.
Student privacy guidance follows FERPA and COPPA; the Future of Privacy Forum's <i>Educator's Guide to
Student Privacy</i> is a readable starting point. Not affiliated with any AI company or platform.</p></div>
<div class="note"><b>Built and audited by two certified teachers.</b> Every prompt run, every task
completed in order, and the included app tested in a browser before this pack shipped.</div>`);

P('One last thing','<h2>If this was useful</h2>',`
<div class="card g" style="margin-top:12pt"><h3>Leaving feedback earns you credit</h3>
<p style="margin-bottom:6pt">TPT gives you credit toward future purchases every time you review
something you have downloaded. Go to <b>My Purchases</b>, find this pack, leave a rating and a
comment. It takes a minute and it comes back to you as money off the next thing you buy.</p>
<p class="small" style="margin:0">It also tells us what to build next, which is genuinely how these
decisions get made.</p></div>
<div class="card t"><h3>If something did not work</h3><p style="margin:0">Message us through TPT
before leaving a rating and we will fix it and re-upload the same day, and you keep the updated file
free. A prompt that stopped behaving is something we want to know about.</p></div>
<div class="note" style="margin-top:12pt"><b>What you can do now that you could not this morning:</b><br>
Build software that remembers. Not a page &mdash; an application, holding real information, running on
your own machine, owned by you, costing nothing, and answerable to nobody's subscription. The
dashboard was the example. <b>The saving was the lesson.</b></div>
<div class="card" style="margin-top:12pt"><h3>Built and audited by two certified teachers</h3>
<p class="small" style="margin:0">Bright Scholar &middot; AI-Ready School</p></div>`);

module.exports={};
