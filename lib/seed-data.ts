/**
 * Seed content for the Cookbook and download center.
 *
 * PRIVACY RULE (non-negotiable): every recipe uses placeholders like [TOPIC],
 * [GRADE], or [Student] — never real student personal information.
 *
 * Loaded by `npm run seed`. Safe to re-run: items are matched by title, so
 * re-running only adds what's missing. Owners can add/edit more from
 * Owner Admin → Manage resources.
 */

type SeedRecipe = {
  title: string;
  subject: string;
  category: string;
  grade_band: string;
  summary: string;
  prompt_text: string;
  min_role: "teacher" | "school_admin" | "owner";
};

export const seedRecipes: readonly SeedRecipe[] = [
  // ---------- Cross-curricular (works in any subject) ----------
  {
    title: "Lesson hook generator",
    subject: "Cross-curricular",
    category: "Planning",
    grade_band: "All grades",
    summary: "Spin up three attention-grabbing openings for any lesson.",
    prompt_text:
      "Give me three different 5-minute lesson hooks for a lesson on [TOPIC] for a [GRADE] class. One should be a question, one a quick activity, and one a surprising fact. Keep them practical for a classroom.",
    min_role: "teacher",
  },
  {
    title: "Differentiate this task (3 levels)",
    subject: "Cross-curricular",
    category: "Differentiation",
    grade_band: "3-5",
    summary: "Turn one activity into support, on-level, and extension versions.",
    prompt_text:
      "Take this activity: [PASTE ACTIVITY]. Create three versions — one with more scaffolding, one on grade level, and one extension — for a mixed 3rd-5th grade class. Do not reference any specific student.",
    min_role: "teacher",
  },
  {
    title: "Rubric builder",
    subject: "Cross-curricular",
    category: "Assessment",
    grade_band: "6-8",
    summary: "A clear 4-level rubric in student-friendly language.",
    prompt_text:
      "Create a 4-level rubric for this assignment: [DESCRIBE ASSIGNMENT]. Use these criteria: [LIST 3-4 CRITERIA]. Write the descriptors so a middle schooler can self-assess.",
    min_role: "teacher",
  },
  {
    title: "Parent email (first draft)",
    subject: "Cross-curricular",
    category: "Communication",
    grade_band: "All grades",
    summary: "A warm, professional draft you personalize before sending.",
    prompt_text:
      "Draft a warm, professional email to a parent about [GENERAL TOPIC, e.g. an upcoming project]. Keep it under 150 words. Use the placeholder [Student] instead of any real name — I'll fill it in myself.",
    min_role: "teacher",
  },
  {
    title: "Exit ticket set",
    subject: "Cross-curricular",
    category: "Assessment",
    grade_band: "All grades",
    summary: "Three quick checks for understanding at three levels.",
    prompt_text:
      "Based on this objective: [PASTE OBJECTIVE], write three exit-ticket questions — one recall, one application, one reflection — each answerable in under two minutes.",
    min_role: "teacher",
  },
  {
    title: "Sub plan in a pinch",
    subject: "Cross-curricular",
    category: "Administrative",
    grade_band: "All grades",
    summary: "A ready-to-leave substitute plan for an unexpected absence.",
    prompt_text:
      "Write a clear one-page substitute plan for a [GRADE] class for a lesson on [TOPIC]. Include a bell-ringer, a main activity with simple directions, an early-finisher task, and classroom management notes. Assume the sub doesn't know the students.",
    min_role: "teacher",
  },
  {
    title: "Feedback sentence starters",
    subject: "Cross-curricular",
    category: "Feedback",
    grade_band: "6-8",
    summary: "Kind, specific, actionable feedback stems you can reuse.",
    prompt_text:
      "Give me 10 feedback sentence starters for middle school work that are kind, specific, and actionable. Group them by 'glow' (strength) and 'grow' (next step). Keep them general so I can apply them to any student's work.",
    min_role: "teacher",
  },

  // ---------- English Language Arts ----------
  {
    title: "Reading passage leveler",
    subject: "English Language Arts",
    category: "Differentiation",
    grade_band: "9-12",
    summary: "Rewrite a text to a target reading level, keeping key ideas.",
    prompt_text:
      "Rewrite the following passage at a [GRADE] reading level while keeping the essential vocabulary I mark: [PASTE PASSAGE]. Then add three comprehension questions.",
    min_role: "teacher",
  },
  {
    title: "Text-dependent question set",
    subject: "English Language Arts",
    category: "Assessment",
    grade_band: "6-8",
    summary: "Layered questions that push students back into the text.",
    prompt_text:
      "For this passage: [PASTE PASSAGE], write six text-dependent questions that build from literal comprehension to inference to author's craft. Mark which standard each targets.",
    min_role: "teacher",
  },
  {
    title: "Mentor-sentence mini-lesson",
    subject: "English Language Arts",
    category: "Planning",
    grade_band: "3-5",
    summary: "A short grammar lesson built around one strong sentence.",
    prompt_text:
      "Build a 10-minute mentor-sentence lesson for [GRADE] using this sentence: [PASTE SENTENCE]. Include what to notice, a guided imitation, and an independent try.",
    min_role: "teacher",
  },

  // ---------- Mathematics ----------
  {
    title: "Word problems in a real context",
    subject: "Mathematics",
    category: "Planning",
    grade_band: "3-5",
    summary: "Fresh word problems tied to a theme students care about.",
    prompt_text:
      "Write five [GRADE] word problems practicing [SKILL, e.g. multi-digit addition] set in the context of [THEME, e.g. a school fundraiser]. Include an answer key with worked steps.",
    min_role: "teacher",
  },
  {
    title: "Error-analysis task",
    subject: "Mathematics",
    category: "Assessment",
    grade_band: "6-8",
    summary: "A worked problem with a mistake for students to catch.",
    prompt_text:
      "Create a worked solution to a [TOPIC] problem that contains one common misconception, then ask students to find and fix the error and explain their reasoning. Give me the intended error and the correct work.",
    min_role: "teacher",
  },
  {
    title: "Three-read math routine",
    subject: "Mathematics",
    category: "Differentiation",
    grade_band: "9-12",
    summary: "Scaffold a dense problem with a structured reading routine.",
    prompt_text:
      "Turn this problem into a 'three-read' routine (what's the situation, what's the question, what information matters): [PASTE PROBLEM]. Provide the prompts I'd ask at each read.",
    min_role: "teacher",
  },

  // ---------- Science ----------
  {
    title: "Phenomenon-based lesson opener",
    subject: "Science",
    category: "Planning",
    grade_band: "6-8",
    summary: "Anchor a unit in a puzzling real-world phenomenon.",
    prompt_text:
      "Suggest three puzzling, observable phenomena that could anchor a [GRADE] unit on [TOPIC]. For each, give a driving question students could investigate.",
    min_role: "teacher",
  },
  {
    title: "Lab safety + procedure rewrite",
    subject: "Science",
    category: "Differentiation",
    grade_band: "9-12",
    summary: "Simplify a lab procedure and surface the safety steps.",
    prompt_text:
      "Rewrite this lab procedure at a [GRADE] reading level with numbered steps, and add a short safety checklist at the top: [PASTE PROCEDURE].",
    min_role: "teacher",
  },

  // ---------- Social Studies ----------
  {
    title: "Primary-source discussion guide",
    subject: "Social Studies",
    category: "Planning",
    grade_band: "9-12",
    summary: "Turn a document into a sourcing-and-discussion activity.",
    prompt_text:
      "For this primary source: [PASTE SOURCE], create a discussion guide with sourcing questions (who, when, why), two points of view to compare, and a closing prompt.",
    min_role: "teacher",
  },
  {
    title: "Debate prep, both sides",
    subject: "Social Studies",
    category: "Planning",
    grade_band: "6-8",
    summary: "Balanced talking points so every student can participate.",
    prompt_text:
      "Give balanced, grade-appropriate talking points for both sides of this question for a [GRADE] class: [QUESTION]. Add three sentence stems for respectful disagreement.",
    min_role: "teacher",
  },

  // ---------- World Languages ----------
  {
    title: "Comprehensible-input story",
    subject: "World Languages",
    category: "Planning",
    grade_band: "9-12",
    summary: "A short leveled story recycling target vocabulary.",
    prompt_text:
      "Write a short story in [LANGUAGE] at a novice-mid level that repeats these target words: [LIST WORDS]. Keep sentences simple and add a 5-question comprehension check.",
    min_role: "teacher",
  },

  // ---------- The Arts ----------
  {
    title: "Choice-board of creative tasks",
    subject: "The Arts",
    category: "Differentiation",
    grade_band: "3-5",
    summary: "A menu of ways to show learning through art.",
    prompt_text:
      "Design a 3x3 choice board where students demonstrate understanding of [TOPIC] through visual, performing, and design tasks. Keep materials low-cost and directions short.",
    min_role: "teacher",
  },

  // ---------- Physical Education & Health ----------
  {
    title: "Station rotation with modifications",
    subject: "PE & Health",
    category: "Planning",
    grade_band: "K-2",
    summary: "Active stations with easier/harder options built in.",
    prompt_text:
      "Plan four movement stations for a [GRADE] class practicing [SKILL]. For each, give an easier and a harder modification and a simple safety cue.",
    min_role: "teacher",
  },

  // ---------- Career & Technical Education ----------
  {
    title: "Shop project spec sheet",
    subject: "Career & Technical Education",
    category: "Planning",
    grade_band: "9-12",
    summary: "A clear build spec with steps, tools, and checkpoints.",
    prompt_text:
      "Write a project spec for a [PROJECT, e.g. small storage box] in a high school woodshop: materials list, cut list, ordered build steps, tools per step, and three quality checkpoints. Add a safety reminder for each power tool used.",
    min_role: "teacher",
  },
  {
    title: "Industry-standard rubric",
    subject: "Career & Technical Education",
    category: "Assessment",
    grade_band: "9-12",
    summary: "Grade craftsmanship the way the trade would.",
    prompt_text:
      "Create a 4-level rubric for a [PROJECT] that assesses craftsmanship, accuracy to spec, safe tool use, and shop cleanup — using language a tradesperson would recognize.",
    min_role: "teacher",
  },

  // ---------- Early Childhood ----------
  {
    title: "Circle-time plan with a book",
    subject: "Early Childhood",
    category: "Planning",
    grade_band: "K-2",
    summary: "A developmentally-appropriate circle time around one theme.",
    prompt_text:
      "Plan a 15-minute circle time for preschoolers on [THEME]. Include a greeting song, a read-aloud with two talking points, a movement break, and a simple closing routine. Keep language concrete and warm.",
    min_role: "teacher",
  },
  {
    title: "Play-based center ideas",
    subject: "Early Childhood",
    category: "Differentiation",
    grade_band: "K-2",
    summary: "Learning centers that build one skill through play.",
    prompt_text:
      "Suggest four play-based learning centers for preschoolers practicing [SKILL, e.g. letter sounds]. For each, list the materials and one open-ended question a teacher could ask.",
    min_role: "teacher",
  },

  // ---------- Accessibility & Equity ----------
  {
    title: "UDL options for one lesson",
    subject: "Accessibility & Equity",
    category: "Differentiation",
    grade_band: "All grades",
    summary: "Multiple means of engagement, representation, and expression.",
    prompt_text:
      "Using Universal Design for Learning, suggest options for this lesson: [PASTE LESSON]. Give me choices for how students engage, how content is represented, and how they can show what they know. Keep suggestions general, not about any specific student.",
    min_role: "teacher",
  },
  {
    title: "Scaffold for multilingual learners",
    subject: "Accessibility & Equity",
    category: "Differentiation",
    grade_band: "6-8",
    summary: "Language supports that keep the content rigorous.",
    prompt_text:
      "Add language scaffolds to this task for multilingual learners at an intermediate proficiency: [PASTE TASK]. Include a word bank, two sentence frames, and a visual suggestion — without lowering the thinking demand.",
    min_role: "teacher",
  },

  // ---------- Teacher productivity ----------
  {
    title: "Turn my notes into a lesson plan",
    subject: "Teacher Productivity",
    category: "Planning",
    grade_band: "All grades",
    summary: "Messy notes in, a clean structured plan out.",
    prompt_text:
      "Turn these rough notes into a structured [GRADE] lesson plan with objective, materials, timed sequence, and a check for understanding: [PASTE NOTES].",
    min_role: "teacher",
  },
  {
    title: "Newsletter blurb from bullet points",
    subject: "Teacher Productivity",
    category: "Communication",
    grade_band: "All grades",
    summary: "A friendly class-newsletter paragraph in seconds.",
    prompt_text:
      "Write a warm 120-word class newsletter blurb from these bullet points: [PASTE BULLETS]. Keep it parent-friendly and use [Student]/[the class] instead of real names.",
    min_role: "teacher",
  },
];

/**
 * Download-center resources. Each carries a real starter `body` — the seed
 * script renders it into a working PDF so downloads function end to end. These
 * are STARTER TEMPLATES: schools should review with their own leadership/legal
 * before adopting. Owners replace them with final files from Owner Admin.
 *
 * file_path is the object path inside the private "resources" storage bucket.
 */
type SeedResource = {
  title: string;
  description: string;
  category: string;
  type: "file" | "link";
  file_path: string;
  min_role: "teacher" | "school_admin" | "owner";
  body: string[];
};

export const seedResources: readonly SeedResource[] = [
  {
    title: "Teacher Quick-Start Handout",
    description: "One page: the golden rules of safe AI use + how to use the Cookbook.",
    category: "Teacher Resources",
    type: "file",
    file_path: "seed/teacher-quickstart.pdf",
    min_role: "teacher",
    body: [
      "AI-READY SCHOOL — TEACHER QUICK-START",
      "",
      "THE THREE GOLDEN RULES",
      "1. Never put student personal information into an AI tool. Use placeholders",
      "   like [Student] and fill in names yourself.",
      "2. You are the professional. AI drafts; you review, edit, and decide.",
      "3. When in doubt, leave it out — and ask your building lead.",
      "",
      "HOW TO USE THE COOKBOOK",
      "- Find a prompt by subject and grade.",
      "- Copy it, paste it into your approved AI tool, and swap the [PLACEHOLDERS].",
      "- Read the output critically before using it with students.",
      "",
      "GOOD FIRST WINS: lesson hooks, exit tickets, rubrics, parent-email drafts.",
    ],
  },
  {
    title: "AI Acceptable-Use Policy (template)",
    description: "Board-ready starter policy for staff and student AI use.",
    category: "Governance",
    type: "file",
    file_path: "seed/ai-acceptable-use-policy.pdf",
    min_role: "school_admin",
    body: [
      "[DISTRICT/SCHOOL NAME] — ARTIFICIAL INTELLIGENCE ACCEPTABLE-USE POLICY",
      "STARTER TEMPLATE — review with district leadership and legal counsel.",
      "",
      "1. PURPOSE. To enable responsible use of AI tools that supports teaching and",
      "   learning while protecting student privacy and academic integrity.",
      "",
      "2. STUDENT DATA. Staff shall not enter personally identifiable student",
      "   information into non-approved AI tools. Use only district-approved tools",
      "   for any task involving student records (see FERPA one-pager).",
      "",
      "3. APPROVED USE. Lesson planning, drafting communications, generating",
      "   practice materials, and differentiating tasks are encouraged, with",
      "   educator review before student-facing use.",
      "",
      "4. PROHIBITED USE. Fully automated grading of record; generating content",
      "   that identifies students; bypassing accessibility or accommodation plans.",
      "",
      "5. ACADEMIC INTEGRITY. Expectations for student AI use are set per course and",
      "   communicated in writing.",
      "",
      "6. REVIEW. This policy is reviewed annually by [COMMITTEE].",
    ],
  },
  {
    title: "FERPA-Safe One-Pager",
    description: "Plain-language guidance on student privacy and AI.",
    category: "Governance",
    type: "file",
    file_path: "seed/ferpa-safe-one-pager.pdf",
    min_role: "school_admin",
    body: [
      "STUDENT PRIVACY & AI — A ONE-PAGE GUIDE",
      "",
      "THE RULE OF THUMB: If it could identify a student, it does not go into a",
      "general-purpose AI tool.",
      "",
      "DON'T ENTER: names, ID numbers, grades tied to a name, IEP/504 details,",
      "photos, addresses, or anything from a student record.",
      "",
      "DO INSTEAD: use placeholders ([Student], [the class]); describe the need",
      "generally; keep record-level work inside district-approved systems.",
      "",
      "WHY: FERPA protects education records. Pasting them into an outside tool can",
      "be an unauthorized disclosure.",
      "",
      "IF YOU'RE UNSURE: ask your building administrator before proceeding.",
    ],
  },
  {
    title: "Family Letter (template)",
    description: "A ready-to-send letter explaining your AI approach to families.",
    category: "Communication",
    type: "file",
    file_path: "seed/family-letter.pdf",
    min_role: "school_admin",
    body: [
      "Dear [Families],",
      "",
      "At [SCHOOL NAME], we are thoughtfully introducing artificial-intelligence",
      "tools to support our teachers — for example, drafting lesson materials and",
      "saving time on routine tasks so they can focus on your children.",
      "",
      "Our commitment to you:",
      "- Student privacy comes first. We do not put personal student information",
      "  into these tools.",
      "- Teachers stay in charge. AI assists; our educators make the decisions.",
      "- We teach responsible use. Students learn to use these tools ethically and",
      "  with good judgment.",
      "",
      "Questions are welcome — please reach out to [CONTACT].",
      "",
      "Warmly,",
      "[PRINCIPAL NAME]",
    ],
  },
  {
    title: "Staff AI Agreement (template)",
    description: "A short acknowledgment staff sign before using AI tools.",
    category: "Governance",
    type: "file",
    file_path: "seed/staff-ai-agreement.pdf",
    min_role: "school_admin",
    body: [
      "STAFF AI-USE ACKNOWLEDGMENT",
      "",
      "I understand and agree that when using AI tools in my role I will:",
      "- Never enter personally identifiable student information into",
      "  non-approved tools.",
      "- Review and edit any AI output before using it with students or families.",
      "- Follow the district AI Acceptable-Use Policy and academic-integrity rules.",
      "- Ask my administrator when a use case is unclear.",
      "",
      "Name: ____________________   Role: ____________________",
      "Signature: ________________   Date: ____________________",
    ],
  },
  {
    title: "Facilitator PD Deck (outline)",
    description: "A 45-minute staff PD outline with talking points and timings.",
    category: "Training",
    type: "file",
    file_path: "seed/facilitator-pd-outline.pdf",
    min_role: "school_admin",
    body: [
      "AI-READY SCHOOL — 45-MINUTE STAFF PD (FACILITATOR OUTLINE)",
      "",
      "0:00 Welcome & why now (5 min): the goal is time saved + students ready.",
      "0:05 The three golden rules (5 min): privacy, educator-in-charge, when in",
      "     doubt leave it out.",
      "0:10 Live demo (10 min): build a lesson hook + an exit ticket from a prompt.",
      "0:20 Hands-on (15 min): staff try two Cookbook prompts for their own class.",
      "0:35 Privacy scenarios (5 min): quick 'would you enter this?' examples.",
      "0:40 Next steps & support (5 min): where the Cookbook lives, who to ask.",
      "",
      "MATERIALS: projector, the Teacher Quick-Start Handout, device per staff.",
    ],
  },
  {
    title: "Rollout Playbook",
    description: "A step-by-step plan to go live across a building in about a week.",
    category: "Governance",
    type: "file",
    file_path: "seed/rollout-playbook.pdf",
    min_role: "school_admin",
    body: [
      "AI-READY SCHOOL — ONE-WEEK ROLLOUT PLAYBOOK",
      "",
      "DAY 1  Adopt the policy. Share the AI Acceptable-Use Policy with leadership;",
      "       set your approved-tools list.",
      "DAY 2  Brief staff. Send the Family Letter home; post the FERPA one-pager.",
      "DAY 3  Run the 45-minute PD. Have staff sign the AI Agreement.",
      "DAY 4  Teachers try 2-3 Cookbook prompts in real planning.",
      "DAY 5  Collect wins and questions; share three 'quick win' examples.",
      "WEEK 2 Set a monthly rhythm: one new prompt pack + one 10-minute share-out.",
      "",
      "SUCCESS LOOKS LIKE: staff saving prep time, privacy rules understood, and a",
      "clear place to ask questions.",
    ],
  },
];
