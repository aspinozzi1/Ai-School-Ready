/**
 * The kit catalog: the single source for curriculum pages and (later) seeding.
 * `status` is honest: released kits are downloadable; "production" kits are
 * shown as "In production — included in your membership as they release."
 */
export type KitStatus = "released" | "production";

export interface KitMeta {
  n: number;
  slug: string;
  title: string;
  summary: string;
  objectives: string[];
  status: KitStatus;
}

export interface TrackMeta {
  key: "a" | "b" | "c" | "d";
  title: string;
  blurb: string;
  kits: KitMeta[];
}

export const tracks: TrackMeta[] = [
  {
    key: "a",
    title: "Track A · AI Foundations",
    blurb:
      "The core eight, in order. Completing Track A earns each educator the AI-Ready Educator Certificate of Completion.",
    kits: [
      {
        n: 1,
        slug: "ai-foundations-safety",
        title: "AI Foundations & Safety: The One Hard Rule",
        summary:
          "Your staff's first structured hour with AI: what these tools actually are, what they're genuinely good at, where they fail, and the single privacy rule that keeps every educator safe. Includes a 15-minute hands-on lab and three staff commitments that become your interim stance until formal policy exists.",
        objectives: [
          "State and apply the One Hard Rule: no student PII in public AI tools, ever",
          "De-identify any prompt in about ten seconds",
          "Use AI for one real task, hands-on, during the session",
          "Apply the review rule: nothing AI-drafted reaches a student or family unread",
        ],
        status: "released",
      },
      {
        n: 2,
        slug: "prompting-basics",
        title: "Prompting Basics: Getting Useful Results Every Time",
        summary:
          "The skill that separates teachers saving six hours a week from everyone else. Staff learn the four-part prompt formula, watch three live prompt makeovers, practice deliberate iteration, and build one reusable prompt template for a weekly task. Creates your school's shared prompt library.",
        objectives: [
          "Write four-part prompts: role, task, context, format",
          "Apply the colleague test before submitting any prompt",
          "Iterate in three rounds: content, voice, details",
          "Own one reusable prompt template, saved to the staff prompt doc",
        ],
        status: "released",
      },
      {
        n: 3,
        slug: "planning-differentiation",
        title: "AI for Planning & Differentiation",
        summary:
          "Differentiation was never a good-intentions problem; it was a time problem. Staff learn a planning workflow where AI drafts and the teacher decides, then practice four differentiation moves: leveled texts, scaffolds, extensions, and alternate formats, with a quality-control checklist for everything AI drafts.",
        objectives: [
          "Draft lesson skeletons with AI and keep the judgment calls",
          "Level a real text three ways and verify the level",
          "Generate scaffolds and extensions for the range of learners in the room",
          "Run the four-point review on any AI-drafted material",
        ],
        status: "released",
      },
      {
        n: 4,
        slug: "ai-for-assessment",
        title: "AI for Assessment: Rubrics, Feedback, and Question Banks",
        summary:
          "AI drafts assessment materials; it never grades students. Staff build a four-level rubric and a vetted question bank for a real upcoming assessment, and draft reusable feedback starters for their most common student patterns, with the red lines stated plainly.",
        objectives: [
          "Turn assignment notes into a student-friendly four-level rubric",
          "Generate and hand-vet a mixed-format question bank with answer key",
          "Draft feedback language for common patterns, personalized before delivery",
          "State the red lines: AI never grades, and no student work with names goes in",
        ],
        status: "released",
      },
      {
        n: 5,
        slug: "academic-integrity",
        title: "AI & Academic Integrity: Setting Clear Expectations with Students",
        summary:
          "The session every faculty asks for. Where the line sits between AI-assisted learning and cheating, how to set expectations students actually follow, and how to design assignments that make honest work the easy path.",
        objectives: [
          "Set clear, teachable AI-use expectations for students",
          "Redesign one assignment to be resilient to AI shortcuts",
          "Handle suspected AI use without accusations you can't support",
        ],
        status: "released",
      },
      {
        n: 6,
        slug: "ai-for-communication",
        title: "AI for Communication: Parent Messages, Translation, and Tone",
        summary:
          "Newsletters, difficult emails, translation support, and tone repair, with the review rule and family privacy at the center.",
        objectives: [
          "Draft family communication faster without losing your voice",
          "Use AI translation support responsibly",
          "Keep every message human-reviewed and personal",
        ],
        status: "released",
      },
      {
        n: 7,
        slug: "ai-for-workload",
        title: "AI for Workload: Winning Back an Hour a Week",
        summary:
          "A systematic pass through the paperwork parts of teaching: documentation, planning admin, reformatting, routine writing, to find each educator's best hour of savings per week.",
        objectives: [
          "Audit your week for AI-suitable tasks",
          "Automate two recurring tasks with reusable prompts",
          "Protect the human parts of the job on purpose",
        ],
        status: "released",
      },
      {
        n: 8,
        slug: "school-ai-culture",
        title: "Building Your School's AI Culture",
        summary:
          "Turning eight weeks of sessions into a durable culture: norms, sharing routines, support for skeptics, and the systems that keep good practice alive after the PD ends. Completing Kits 1 through 8 earns the certificate.",
        objectives: [
          "Adopt staff norms for ongoing AI practice",
          "Stand up sharing routines that outlive the training",
          "Plan the next semester of adoption",
        ],
        status: "released",
      },
    ],
  },
  {
    key: "b",
    title: "Track B · Applied Classroom AI",
    blurb:
      "Subject-specific and student-population-specific application, built on the Track A foundation.",
    kits: [
      { n: 9, slug: "ai-ela", title: "AI in the ELA Classroom", summary: "Reading, writing, and discussion workflows for English language arts, from mentor texts to revision conferences.", objectives: [], status: "production" },
      { n: 10, slug: "ai-math", title: "AI in the Math Classroom", summary: "Where AI helps math instruction and where it actively misleads, with verified practice-problem and explanation workflows.", objectives: [], status: "production" },
      { n: 11, slug: "ai-science-social-studies", title: "AI in Science & Social Studies", summary: "Inquiry, sources, labs, and current events, with the verification habits these subjects demand.", objectives: [], status: "production" },
      { n: 12, slug: "ai-early-elementary", title: "AI for Early Elementary (K-2): What's Appropriate and What Works", summary: "The youngest learners never touch the tools; their teachers get the biggest time savings. What's appropriate, what works, and what to skip.", objectives: [], status: "production" },
      { n: 13, slug: "ai-diverse-needs", title: "AI for Students with Diverse Needs: Accessibility, Scaffolding, ELL Support", summary: "Accessibility supports, scaffolding, and multilingual family communication, with privacy rules that matter double here.", objectives: [], status: "production" },
      { n: 14, slug: "teaching-students-about-ai", title: "Teaching Students About AI: Digital Literacy for the AI Era", summary: "Age-appropriate ways to teach students what AI is, what it gets wrong, and how to stay in charge of their own thinking.", objectives: [], status: "production" },
    ],
  },
  {
    key: "c",
    title: "Track C · Leadership & Governance",
    blurb:
      "For principals, district leaders, and the policy work. Informational resources by educators, not legal advice.",
    kits: [
      { n: 15, slug: "acceptable-use-policy", title: "Writing Your School's AI Acceptable-Use Policy", summary: "A working session where leaders leave with a draft policy. Provided for informational purposes by educators, not attorneys; districts finalize with counsel.", objectives: [], status: "production" },
      { n: 16, slug: "leader-readiness", title: "AI Readiness for School Leaders: Liability, Communication, and Rollout", summary: "The leader's view: risk, rollout sequencing, staff communication, and answering the board's questions.", objectives: [], status: "production" },
      { n: 17, slug: "parents-community", title: "Communicating with Parents & Community About AI", summary: "Proactive family communication: what to say, what to promise, and how to answer the hard questions before they're asked angrily.", objectives: [], status: "production" },
    ],
  },
  {
    key: "d",
    title: "Track D · Going Deeper",
    blurb: "Renewal-year content for schools ready to go past the foundations.",
    kits: [
      { n: 18, slug: "advanced-prompting", title: "Advanced Prompting: Building Your Own Reusable Prompt Library", summary: "Grows the staff prompt doc into an organized, school-wide library with advanced techniques worth the name.", objectives: [], status: "production" },
      { n: 19, slug: "data-informed-teaching", title: "AI for Data-Informed Teaching, Without Student Data", summary: "Aggregate and de-identified practice for spotting patterns and planning responses, with the privacy line held absolutely.", objectives: [], status: "production" },
      { n: 20, slug: "year-long-roadmap", title: "The AI-Ready Classroom: A Year-Long Integration Roadmap", summary: "A month-by-month plan that turns everything before it into a sustainable, personal integration practice.", objectives: [], status: "production" },
    ],
  },
];
