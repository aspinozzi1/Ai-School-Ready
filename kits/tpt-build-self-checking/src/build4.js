const { P, esc, ACT } = require('./build.js');

/* PROMPT APPENDIX */
P('Appendix', '<h2>Every prompt, in one place</h2>', `
<p class="small">Copy from here rather than retyping. Square brackets mean "put your own thing here".</p>
<div class="prompt" style="padding:8pt 11pt"><div class="lbl">1 &middot; first build</div>
<span class="small">Build me a self-checking practice activity as one single HTML file I can save and open in a browser. Students see questions with four clickable choices. A wrong click greys that choice out and invites another try; a right click turns green, locks the others and explains why it is right. A counter shows how many were right on the FIRST try. Show a summary at the end with a start-over button. Everything in one file, no internet, no login, no student name, nothing saved. Put my questions in a clearly marked list at the top with comments explaining how to add one. Big text and big buttons for tablets.</span></div>
<div class="prompt" style="padding:8pt 11pt"><div class="lbl">2 &middot; your content</div>
<span class="small">Replace the example questions with these, keeping everything else exactly as it is. Write each explanation so it teaches the idea rather than restating the answer. [your questions]</span></div>
<div class="prompt" style="padding:8pt 11pt"><div class="lbl">3 &middot; better wrong-answer feedback</div>
<span class="small">Give each wrong choice its own one-sentence message explaining the likely mistake, shown when that specific choice is clicked. Keep it kind.</span></div>
<div class="prompt" style="padding:8pt 11pt"><div class="lbl">4 &middot; appearance</div>
<span class="small">Use [your colors] as the main colors, make the question text larger, and add a title and instruction line at the top. Keep buttons big enough to tap.</span></div>
<div class="prompt" style="padding:8pt 11pt"><div class="lbl">5 &middot; accessibility</div>
<span class="small">Make every choice reachable with Tab and selectable with Enter, with a clearly visible outline on the current one. Do not use color alone to show right and wrong &mdash; include words too.</span></div>
<div class="prompt" style="padding:8pt 11pt"><div class="lbl">6 &middot; change the subject</div>
<span class="small">Keep this working exactly as it does, but replace the content with [subject] questions for [grade], at an appropriate reading level.</span></div>`);

P('Appendix', '<h2>Three more worth keeping</h2>', `
<div class="prompt"><div class="lbl">7 &middot; when it will not behave</div>
<span class="small">Here is what I did and what happened: [what you clicked]. I expected [what should have happened]. Fix it and give me the whole file again.</span></div>
<div class="prompt"><div class="lbl">8 &middot; shuffle the questions</div>
<span class="small">Put the questions in a different random order each time the page is opened, so students sitting together do not see the same sequence. Keep each question's choices with it.</span></div>
<div class="prompt"><div class="lbl">9 &middot; a printable version</div>
<span class="small">Add a print stylesheet so that printing this page gives a clean worksheet: questions and choices only, no buttons, no colors, no score panel, with room to write.</span></div>
<div class="note"><b>Prompt 9 is the one teachers ask for second.</b> The same question bank becomes the
screen activity and the paper version, and no one has to retype anything. It is also the answer to
"what do I do when the laptops do not turn up."</div>
<div class="card g"><h3>A habit worth forming</h3>
<p class="small" style="margin:0">Keep your own prompts in a document as you find ones that work. Within
a term you will have a personal library that fits how you teach, and building the next tool becomes
a matter of pasting rather than thinking.</p></div>`);

/* THE CODE */
const code = ACT.replace(/\r/g,'');
const head = code.split('<style>')[0];
P('The file', '<h2>The finished activity, in full</h2>', `
<p class="small">The complete file is included with this pack as <code>practice-activity.html</code> &mdash;
you do not need to type any of this. It is printed so you can see what you are working with, and so
the pack still makes sense on paper.</p>
<p class="small"><b>This first part is the only bit you edit.</b> Everything after it is machinery.</p>
<div class="code" style="font-size:7.4pt;line-height:1.3">${esc(head.slice(head.indexOf('<!-- ====')))}</div>`);

/* HOW BUILT */
P('For the teacher', '<h2>How this pack is built</h2>', `
<div class="card"><h3>What we are claiming</h3>
<p class="small" style="margin:0">That the prompts in this pack, used with a current AI chat assistant,
produce a working self-checking activity. Every prompt here was run and the resulting activity was
tested before publication &mdash; including clicking wrong answers on purpose, checking the first-try
counter behaves honestly, and confirming the answer key is right.</p></div>
<div class="card r"><h3>What we are not claiming</h3>
<p class="small" style="margin:0">We are not claiming this replaces your district's learning management
system, and we would advise against trying. We are not claiming it is an assessment tool. We are not
claiming any particular learning outcome. And this is not legal advice about student data &mdash; your
district's policy, your state's law, FERPA and COPPA are the authorities.</p></div>
<div class="card t"><h3>An honest limitation</h3>
<p class="small" style="margin:0">AI tools change. A prompt that produces a clean single file today may
produce something slightly different in six months. That is why this pack teaches the <i>loop</i> on
page 5 rather than only the prompts &mdash; the loop survives the tools changing, and the included
working file does not depend on any AI at all.</p></div>
<div class="card g"><h3>Sources</h3>
<p class="small" style="margin:0">Peninsula School District's use of AI-built internal tools, and the
associated cost saving, is as reported in 2026 coverage of the district's technology work.
Student privacy guidance follows the Family Educational Rights and Privacy Act (FERPA) and the
Children's Online Privacy Protection Act (COPPA); the Future of Privacy Forum's <i>Educator's Guide
to Student Privacy</i> is a readable starting point. Neither this pack nor its authors are affiliated
with any AI company or any named district.</p></div>
<div class="note"><b>Built and audited by two certified teachers.</b> Every prompt run, every step
followed start to finish, and the included file tested in a browser before this pack shipped.</div>`);

/* FEEDBACK */
P('One last thing', '<h2>If this was useful</h2>', `
<div class="card g" style="margin-top:14pt"><h3>Leaving feedback earns you credit</h3>
<p style="margin-bottom:6pt">TPT gives you credit toward future purchases every time you review something
you have downloaded. Go to <b>My Purchases</b>, find this pack, and leave a rating and a comment.
It costs a minute and it comes back to you as money off the next thing you buy.</p>
<p class="small" style="margin:0">It also tells us what to build next, which is genuinely how the
decisions get made here.</p></div>
<div class="card t"><h3>If something did not work</h3>
<p style="margin:0">Please tell us through TPT before leaving a rating &mdash; message us and we will fix
it and re-upload the same day, and you keep the updated file free. A prompt that stopped behaving
is something we want to know about, not something to live with.</p></div>
<div class="note" style="margin-top:14pt"><b>What you can do now that you could not this morning:</b><br>
Build a practice activity for any topic you teach, in about ten minutes, that checks itself and
explains its answers &mdash; without a subscription, a login, or anyone's permission. The rounding
example was never the point. The loop on page 5 was.</div>
<div class="card" style="margin-top:14pt"><h3>Built and audited by two certified teachers</h3>
<p class="small" style="margin:0">Bright Scholar &middot; AI-Ready School</p></div>`);

module.exports = {};
