/**
 * Seed content for the Cookbook and download center.
 * Every recipe is written to use NO student personal information.
 * Loaded by `npm run seed`. Safe to edit — re-running seed only adds
 * items that don't already exist (matched by title).
 */

export const seedRecipes = [
  {
    title: "Lesson hook generator",
    category: "Planning",
    grade_band: "All grades",
    summary: "Spin up three attention-grabbing openings for any lesson.",
    prompt_text:
      "Give me three different 5-minute lesson hooks for a lesson on [TOPIC] for a [GRADE] class. One should be a question, one a quick activity, and one a surprising fact. Keep them practical for a classroom.",
    min_role: "teacher" as const,
  },
  {
    title: "Differentiate this task (3 levels)",
    category: "Differentiation",
    grade_band: "3-5",
    summary: "Turn one activity into support, on-level, and extension versions.",
    prompt_text:
      "Take this activity: [PASTE ACTIVITY]. Create three versions — one with more scaffolding, one on grade level, and one extension — for a mixed 3rd-5th grade class. Do not reference any specific student.",
    min_role: "teacher" as const,
  },
  {
    title: "Rubric builder",
    category: "Assessment",
    grade_band: "6-8",
    summary: "A clear 4-level rubric in student-friendly language.",
    prompt_text:
      "Create a 4-level rubric for this assignment: [DESCRIBE ASSIGNMENT]. Use these criteria: [LIST 3-4 CRITERIA]. Write the descriptors so a middle schooler can self-assess.",
    min_role: "teacher" as const,
  },
  {
    title: "Parent email (first draft)",
    category: "Communication",
    grade_band: "All grades",
    summary: "A warm, professional draft you personalize before sending.",
    prompt_text:
      "Draft a warm, professional email to a parent about [GENERAL TOPIC, e.g. an upcoming project]. Keep it under 150 words. Use the placeholder [Student] instead of any real name — I'll fill it in myself.",
    min_role: "teacher" as const,
  },
  {
    title: "Reading passage leveler",
    category: "Differentiation",
    grade_band: "9-12",
    summary: "Rewrite a text to a target reading level, keeping key ideas.",
    prompt_text:
      "Rewrite the following passage at a [GRADE] reading level while keeping the essential vocabulary I mark: [PASTE PASSAGE]. Then add three comprehension questions.",
    min_role: "teacher" as const,
  },
  {
    title: "Exit ticket set",
    category: "Assessment",
    grade_band: "All grades",
    summary: "Three quick checks for understanding at three levels.",
    prompt_text:
      "Based on this objective: [PASTE OBJECTIVE], write three exit-ticket questions — one recall, one application, one reflection — each answerable in under two minutes.",
    min_role: "teacher" as const,
  },
  {
    title: "Small-group station plan",
    category: "Planning",
    grade_band: "K-2",
    summary: "Four rotation stations for early learners around one skill.",
    prompt_text:
      "Design four 10-minute learning stations for a K-2 class practicing [SKILL]. Include one teacher-led, one hands-on, one independent, and one partner station. Keep directions simple enough to read aloud.",
    min_role: "teacher" as const,
  },
  {
    title: "Feedback sentence starters",
    category: "Feedback",
    grade_band: "6-8",
    summary: "Kind, specific, actionable feedback stems you can reuse.",
    prompt_text:
      "Give me 10 feedback sentence starters for middle school writing that are kind, specific, and actionable. Group them by 'glow' (strength) and 'grow' (next step). Keep them general so I can apply them to any student's work.",
    min_role: "teacher" as const,
  },
  {
    title: "Unit vocabulary pre-teach",
    category: "Planning",
    grade_band: "9-12",
    summary: "Student-friendly definitions plus a quick check.",
    prompt_text:
      "For a high school unit on [TOPIC], give me student-friendly definitions for these key terms: [LIST TERMS]. For each, add one example and one quick check-for-understanding question.",
    min_role: "teacher" as const,
  },
  {
    title: "Sub plan in a pinch",
    category: "Administrative",
    grade_band: "All grades",
    summary: "A ready-to-leave substitute plan for an unexpected absence.",
    prompt_text:
      "Write a clear one-page substitute plan for a [GRADE] class for a lesson on [TOPIC]. Include a bell-ringer, a main activity with simple directions, an early-finisher task, and classroom management notes. Assume the sub doesn't know the students.",
    min_role: "teacher" as const,
  },
] as const;

/**
 * The download center resources. These are PLACEHOLDER files created by the
 * seed script (so downloads work end to end). Replace them with your real
 * documents from the Owner Admin once you're ready.
 * file_path is the object path inside the private "resources" storage bucket.
 */
export const seedResources = [
  {
    title: "Participant Handout",
    description: "The print-and-go handout for staff during training. (Sample placeholder — replace with your final PDF.)",
    category: "Teacher Resources",
    type: "file" as const,
    file_path: "seed/participant-handout.pdf",
    min_role: "teacher" as const,
  },
  {
    title: "Governance Pack",
    description: "AI policy, FERPA-safe one-pager, parent letter, and staff agreement. (Sample placeholder — replace with your final PDF.)",
    category: "Governance",
    type: "file" as const,
    file_path: "seed/governance-pack.pdf",
    min_role: "school_admin" as const,
  },
  {
    title: "Facilitator PD Deck",
    description: "The 45-minute training deck with presenter script. (Sample placeholder — replace with your final file.)",
    category: "Training",
    type: "file" as const,
    file_path: "seed/pd-deck.pdf",
    min_role: "school_admin" as const,
  },
  {
    title: "Rollout Playbook",
    description: "Your step-by-step plan to go live in a week. (Sample placeholder — replace with your final PDF.)",
    category: "Governance",
    type: "file" as const,
    file_path: "seed/rollout-playbook.pdf",
    min_role: "school_admin" as const,
  },
] as const;
