/**
 * The prompt library: shared types, the tag vocabularies used by the filters
 * and the add form, and the founder starter set every library begins with.
 *
 * Kit 2 teaches staff to save reusable prompts so nobody at a school solves
 * the same problem twice. This is where those prompts live.
 */

export type PromptTaskType =
  | "communication"
  | "planning"
  | "assessment"
  | "other";

export type PromptSource = "staff" | "starter";

export interface PromptRow {
  id: string;
  org_id: string | null;
  author_id: string | null;
  title: string;
  body: string;
  subject: string | null;
  grade_band: string | null;
  task_type: PromptTaskType;
  source: PromptSource;
  created_at: string;
}

export const taskTypes: Array<{ value: PromptTaskType; label: string }> = [
  { value: "planning", label: "Planning" },
  { value: "assessment", label: "Assessment" },
  { value: "communication", label: "Communication" },
  { value: "other", label: "Other" },
];

export const gradeBands = [
  "All grades",
  "K-2",
  "3-5",
  "6-8",
  "9-12",
] as const;

export const subjects = [
  "Any subject",
  "ELA",
  "Math",
  "Science",
  "Social Studies",
  "World Languages",
  "Arts",
  "CTE",
  "Special Education",
  "Specials / Other",
] as const;

export function taskTypeLabel(value: string): string {
  return taskTypes.find((t) => t.value === value)?.label ?? "Other";
}

/**
 * The de-identification rule, shown on every submit. Kit 1's One Hard Rule is
 * the product's core promise, so it is a fixture of this form, not a setting.
 */
export const deIdentificationNudge = {
  heading: "Before you save: no student information",
  body:
    "Prompts here are shared with your colleagues. Describe the need, not the child. Swap any student name or identifying detail for a bracket like [STUDENT] or [GRADE], the same way the starter prompts do.",
} as const;

/**
 * The founder starter set. Every school library (and every Individual
 * member's personal library) begins with these, flagged source = "starter"
 * so staff can tell founder-provided prompts from their colleagues' work.
 *
 * Copy is taken from the free "10 Copy-Paste AI Prompts for Teachers" sheet
 * (kits/free-resources/src/ten-ai-prompts-for-teachers.html) and Kit 2's
 * reusable-template lab, so the library opens with material the owners have
 * already published and stand behind.
 *
 * OWNER GATE: this set is a review item before launch
 * (docs/MEMBER_EXPERIENCE_SPEC.md, "Owner gate items for this release").
 */
export const starterPrompts: Array<{
  title: string;
  body: string;
  subject: string;
  grade_band: string;
  task_type: PromptTaskType;
}> = [
  {
    title: "Three lesson hooks",
    body: "You are an experienced [GRADE/SUBJECT] teacher. Give me three different 5-minute openings for a lesson on [TOPIC]: one a question, one a quick activity, one a surprising fact. Keep each practical for a real classroom.",
    subject: "Any subject",
    grade_band: "All grades",
    task_type: "planning",
  },
  {
    title: "Lesson skeleton from messy notes",
    body: "Turn these rough notes into a [LENGTH]-minute lesson plan for [GRADE/SUBJECT]: [PASTE NOTES]. Format: a table with timings, materials, and teacher moves, plus a 3-question exit check at the end.",
    subject: "Any subject",
    grade_band: "All grades",
    task_type: "planning",
  },
  {
    title: "Substitute plan in a pinch",
    body: "Write a one-page substitute plan for a [GRADE] class covering [TOPIC]. Include a bell-ringer, a main activity with simple numbered directions, an early-finisher task, and management notes. Assume the sub has never met these students.",
    subject: "Any subject",
    grade_band: "All grades",
    task_type: "planning",
  },
  {
    title: "Level a reading passage",
    body: "Rewrite this passage at a [GRADE] reading level, keeping the key vocabulary I've marked: [PASTE PASSAGE]. Then add three comprehension questions that build from literal to inferential.",
    subject: "Any subject",
    grade_band: "All grades",
    task_type: "planning",
  },
  {
    title: "One task, three levels",
    body: "Take this activity: [PASTE ACTIVITY]. Create three versions for [GRADE]: one with more scaffolding, one on grade level, and one extension. Do not reference any specific student; I'll match versions to kids myself.",
    subject: "Any subject",
    grade_band: "All grades",
    task_type: "planning",
  },
  {
    title: "Student-friendly rubric",
    body: "Create a 4-level rubric for this assignment: [DESCRIBE ASSIGNMENT]. Criteria: [LIST 3-4 CRITERIA]. Write the descriptors so a [GRADE] student can self-assess with it.",
    subject: "Any subject",
    grade_band: "All grades",
    task_type: "assessment",
  },
  {
    title: "Exit ticket set",
    body: "Based on this objective: [PASTE OBJECTIVE], write three exit-ticket questions: one recall, one application, one reflection. Each answerable in under two minutes. Include an answer key.",
    subject: "Any subject",
    grade_band: "All grades",
    task_type: "assessment",
  },
  {
    title: "Feedback sentence starters",
    body: "Give me ten feedback sentence starters for [GRADE] work that are kind, specific, and actionable. Group them by strength and next step. Keep them general so I can apply them to any student's work myself.",
    subject: "Any subject",
    grade_band: "All grades",
    task_type: "assessment",
  },
  {
    title: "Family newsletter blurb",
    body: "You are a warm, organized [GRADE] teacher. Write a newsletter blurb for families about [TOPIC/EVENT]. Context: [KEY DETAILS]. Format: under 150 words, skimmable on a phone, action items as a short bulleted list.",
    subject: "Any subject",
    grade_band: "All grades",
    task_type: "communication",
  },
  {
    title: "The reusable template (Kit 2)",
    body: "You are a [GRADE/SUBJECT] teacher. Create a [NUMBER]-question review on [TOPIC] for students who [WHAT THEY STRUGGLE WITH]. Format: [FORMAT]. Include an answer key.",
    subject: "Any subject",
    grade_band: "All grades",
    task_type: "other",
  },
];
