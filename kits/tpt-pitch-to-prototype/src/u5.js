const {P,esc,APP}=require('./u1.js');

P('The example','<h2>What a finished one looks like</h2>',`
<p class="lede">The pack includes a working app called <code>lost-and-found.html</code>. It is the
example a real class would produce from a real spec &mdash; open it before you teach, so you know
what the target looks like.</p>
<div class="card t"><h3>The spec it was built from</h3>
<p class="small" style="margin-bottom:5pt"><b>Problem:</b> "The office staff need a way to know what
is in the lost property box, because right now they have to tip the whole thing out every time a
parent calls."</p>
<p class="small" style="margin:0"><b>Must-haves:</b> add an item &middot; see the list &middot; mark it
claimed. That is all three, and the app does exactly those three things.</p></div>
<div class="card g"><h3>What it does</h3>
<p class="small" style="margin:0">Add an item with where and when it was found &middot; filter by
waiting, claimed or everything &middot; mark claimed and undo &middot; flags anything sitting over 30
days &middot; counts at the top &middot; prints as a clean list for a clipboard &middot; and it
remembers everything between sessions.</p></div>
<div class="card r"><h3>What it deliberately does not do</h3>
<p class="small" style="margin:0"><b>There is nowhere to write a person's name.</b> When an item is
claimed you mark the item, not the claimer. That was the class rule, and it is the reason this tool
can sit on the office computer without anyone having a conversation about it.</p></div>
<div class="note"><b>Use it as a worked example, not a template to hand out.</b> If you give students
the finished app on day 1 they will build backwards from it. Show it on day 5, after theirs exists,
and ask what theirs does better.</div>`);

P('Prompts','<h2>Every teacher prompt, in one place</h2>',`
<p class="small">You type these, never a student. Square brackets mean put the group's own words in.</p>
<div class="prompt" style="padding:9pt 12pt"><div class="lbl">1 &middot; the build, day 3</div>
<span class="small">Build a single HTML file that runs in a browser with no login and no internet. It is for [who], to help them [do what]. It must do exactly three things: 1. [must-have] 2. [must-have] 3. [must-have]. Save everything to local storage on this device so it is still there tomorrow, and keep working with empty data if saving is unavailable. Big text and big buttons. Do not ask for anyone's name and do not collect any personal information.</span></div>
<div class="prompt" style="padding:9pt 12pt"><div class="lbl">2 &middot; when it does the wrong thing</div>
<span class="small">When I [what you clicked], it [what happened]. It should [what the spec says]. Fix that and give me the whole file again.</span></div>
<div class="prompt" style="padding:9pt 12pt"><div class="lbl">3 &middot; the day-5 change</div>
<span class="small">We tested this with real users and they got stuck on [what happened]. Change [the one thing] so that [what should happen instead]. Do not change anything else.</span></div>
<div class="prompt" style="padding:9pt 12pt"><div class="lbl">4 &middot; make it usable by everyone</div>
<span class="small">Make sure this works for someone using a keyboard instead of a mouse: everything reachable with Tab and usable with Enter, with a clearly visible outline on the selected item. Do not use color alone to show status. Give every icon-only button a label a screen reader can announce.</span></div>
<div class="prompt" style="padding:9pt 12pt"><div class="lbl">5 &middot; make it printable</div>
<span class="small">Add a print stylesheet so printing gives a clean list with no buttons and no colors &mdash; something that works on a clipboard.</span></div>
<div class="prompt" style="padding:9pt 12pt"><div class="lbl">6 &middot; when three rounds have not fixed it</div>
<span class="small">[Start a fresh chat.] Paste prompt 1 again, then add: Also make sure that [the thing that kept going wrong].</span></div>
<div class="note"><b>Prompt 4 is not optional.</b> If the tool goes into the office, someone with a
motor or vision difference may have to use it. Asking costs one prompt.</div>`);

P('Practical','<h2>Saving it, and what happens after the unit</h2>',`
<div class="card"><h3>Getting it out of the chat</h3>
<p class="small" style="margin:0">Copy all the code with the copy button &middot; paste into Notepad or
TextEdit set to plain text, <b>not Word</b> &middot; save as something like <code>lost-and-found.html</code>,
setting "Save as type" to All Files on Windows &middot; double-click to open. If it opens as a page
of code, the <code>.html</code> did not save.</p></div>
<div class="card t"><h3>Where it should live</h3>
<p class="small" style="margin:0">On the computer of whoever has the problem. The data saves in that
browser on that machine &mdash; nothing is uploaded, no account exists. Moving the file to a different
computer gives you a working but empty copy.</p></div>
<div class="card r"><h3>What would change if it went online</h3>
<p class="small" style="margin:0">Hosting it would mean the data lives on someone's server and a link
exists that could reach it. For a list of umbrellas that is not dramatic, but it becomes school
software rather than a classroom tool, and that is a conversation with your technology team rather
than a thing to do quietly. <b>Keeping it local is why this unit needs nobody's permission.</b></p></div>
<div class="card g"><h3>The best outcome</h3>
<p class="small" style="margin:0">Somebody in the building uses it in March without thinking about it,
and a student walks past the office and sees their thing being used. That is worth more than any
grade you could put on this.</p></div>`);

P('For the teacher','<h2>How this unit is built</h2>',`
<div class="card"><h3>What we are claiming</h3>
<p class="small" style="margin:0">That the prompts here, used with a current AI chat, produce working
classroom tools from a class's own specification. The included example app was built this way and
tested in a real browser before publication &mdash; items added, filters checked, claimed and undone,
the page reloaded to confirm the data survived, the over-30-days flag verified against real dates,
and the console checked for errors.</p></div>
<div class="card r"><h3>What we are not claiming</h3>
<p class="small" style="margin:0">Not a computer science curriculum and not aligned to any CS
standards. Not a replacement for your district's systems. Not legal advice about student data &mdash;
your district's policy, your state's law, FERPA and COPPA are the authorities. And the AI tools
change, which is why this unit teaches the loop and the discipline rather than one product's menus.</p></div>
<div class="card t"><h3>An honest limitation</h3>
<p class="small" style="margin:0">Five days is enough to build something real and not enough to build
something polished. Groups will finish with tools that work and look homemade. <b>Resist making them
prettier</b> &mdash; the lesson is that a working ugly thing beats a beautiful idea, and that lesson
is undermined by a teacher tidying it up overnight.</p></div>
<div class="card g"><h3>Where the student-facing design ideas come from</h3>
<p class="small" style="margin:0">The problem-interview arc, the must-have sort and the
watch-without-explaining testing rule are standard practice in design and product work, adapted here
for grades 4&ndash;8. The tools named as worth building are drawn from 2026 reporting on what
teachers already build for themselves with AI.</p></div>
<div class="note"><b>Built and audited by two certified teachers.</b> Every prompt run, the example
app built from the spec printed in this pack and tested in a browser before shipping.</div>`);

P('One last thing','<h2>If this was useful</h2>',`
<div class="card g" style="margin-top:14pt"><h3>Leaving feedback earns you credit</h3>
<p style="margin-bottom:6pt">TPT gives you credit toward future purchases every time you review
something you have downloaded. Go to <b>My Purchases</b>, find this unit, and leave a rating and a
comment.</p>
<p class="small" style="margin:0">It also tells us what to build next, which is genuinely how these
decisions get made.</p></div>
<div class="card t"><h3>If something did not work</h3>
<p style="margin:0">Message us through TPT before leaving a rating and we will fix it and re-upload
the same day, and you keep the updated file free. A prompt that stopped behaving is something we
want to know about.</p></div>
<div class="note" style="margin-top:14pt"><b>What your class will have done by Friday:</b><br>
Asked a real person about a real problem. Written a specification precise enough for someone else to
build from. Watched their own words become software. Handed it to a stranger and watched them
struggle without rescuing them. Changed it because of evidence rather than opinion. <b>The app was
never the point.</b></div>
<div class="card" style="margin-top:14pt"><h3>Built and audited by two certified teachers</h3>
<p class="small" style="margin:0">Bright Scholar &middot; AI-Ready School</p></div>`);

module.exports={};
