/**
 * The 5 free sample prompts delivered on /free (and emailed to leads).
 * Every prompt is written to use NO student personal information —
 * placeholders only. This is the free taste of the 50-prompt Cookbook.
 */
export const samplePrompts = [
  {
    title: "The differentiator",
    grade: "All grades",
    text: "Take this learning objective: [PASTE OBJECTIVE]. Give me three versions of a practice activity for it — one for students who need more support, one on grade level, and one for an extension. Keep each to 5 questions. Do not reference any specific student.",
  },
  {
    title: "The parent email (first draft)",
    grade: "All grades",
    text: "Draft a warm, professional email to a parent about a general classroom update on [TOPIC, e.g. an upcoming project]. Keep it under 150 words, plain language, no jargon. Use a placeholder like [Student] instead of any real name — I'll fill that in myself.",
  },
  {
    title: "The rubric builder",
    grade: "Grades 3-12",
    text: "Create a 4-level rubric for this assignment: [DESCRIBE ASSIGNMENT]. Use the criteria [LIST 3-4 CRITERIA]. Write the level descriptors in student-friendly language so learners can self-assess.",
  },
  {
    title: "The reading leveler",
    grade: "Grades 2-10",
    text: "Rewrite the following passage at a [GRADE] reading level while keeping the key ideas and vocabulary I mark as essential: [PASTE PASSAGE]. Then list 3 comprehension questions.",
  },
  {
    title: "The exit-ticket generator",
    grade: "All grades",
    text: "Based on this lesson objective: [PASTE OBJECTIVE], write 3 quick exit-ticket questions — one recall, one application, one reflection. Keep them answerable in under two minutes.",
  },
] as const;
