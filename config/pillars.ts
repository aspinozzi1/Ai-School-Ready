/**
 * The PD pillars — the top-level way the self-paced library is organized.
 * Each pillar packages: a scripted PD course (with lessons), a prompt pack
 * (recipes tagged with this pillar), and downloadable templates (resources
 * tagged with this pillar).
 *
 * `name` is the value stored on courses/recipes/resources (free text, so the
 * catalog can grow), and this list drives the UI order + admin dropdowns.
 */
export const PILLARS = [
  {
    name: "AI Safety & Policy",
    blurb: "Board-ready policy, FERPA-safe practice, and a one-week rollout.",
    icon: "ShieldCheck",
  },
  {
    name: "AI in the Classroom by Subject",
    blurb:
      "Practical AI for ELA, math, science, social studies, world languages, arts, PE/health, and CTE.",
    icon: "BookOpen",
  },
  {
    name: "Early Childhood AI",
    blurb: "Developmentally-appropriate AI for the youngest classrooms.",
    icon: "Blocks",
  },
  {
    name: "AI for Accessibility & Equity",
    blurb: "IEP/504 support, multilingual learners, and Universal Design for Learning.",
    icon: "Accessibility",
  },
  {
    name: "Student AI Literacy",
    blurb: "Teaching students responsible, age-appropriate AI use.",
    icon: "GraduationCap",
  },
  {
    name: "Teacher Productivity",
    blurb: "Planning, feedback, and communication — privacy-safe.",
    icon: "Clock",
  },
] as const;

export type PillarName = (typeof PILLARS)[number]["name"];

export const PILLAR_NAMES = PILLARS.map((p) => p.name);

/** Course audiences — the role-based / grade-band tracks a course targets. */
export const COURSE_AUDIENCES = [
  "All staff",
  "Teachers",
  "Early Childhood",
  "Elementary",
  "Middle School",
  "High School",
  "Administrators",
  "Counselors",
  "Instructional Coaches",
] as const;
