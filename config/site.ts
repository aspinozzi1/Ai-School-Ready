/**
 * SINGLE SOURCE OF TRUTH for product names, pricing, marketing copy, and nav.
 * Change text here and it updates everywhere. (Flow-integrity rule #2.)
 */

export const site = {
  name: "AI-Ready School",
  tagline: "Your school's AI plan, done.",
  description:
    "A board-ready AI policy, staff training your team runs themselves, and 50 classroom-ready prompts — everything you need to roll out AI safely, without building it from scratch.",
  // Update this to your live domain before launch.
  url: "https://ai-ready-school.example.com",
  supportEmail: "hello@aiready.school",
  ownerName: "Adam",
  launchYear: 2026,
} as const;

/** The three products. Prices live here only. */
export const products = {
  teacher_kit: {
    id: "teacher_kit" as const,
    name: "Teacher Kit",
    price: 49,
    priceLabel: "$49",
    cadence: "one-time",
    audience: "For individual teachers",
    fit: "Right for you if you teach a class and want ready-to-use AI prompts today.",
    features: [
      "The Prompt Cookbook — 50 classroom-ready prompts",
      "Participant handout (print & go)",
      "Every prompt is privacy-safe by design",
      "Lifetime access to your kit",
    ],
    cta: "Get the Teacher Kit",
  },
  school_license: {
    id: "school_license" as const,
    name: "School License",
    price: 999,
    priceLabel: "$999",
    cadence: "per year",
    audience: "For school & district administrators",
    badge: "Most Popular",
    fit: "Right for you if you lead a building or district and need a real, approvable AI rollout.",
    features: [
      "Everything in the Teacher Kit, for your whole staff",
      "Governance Pack — AI policy, FERPA-safe one-pager, parent letter, staff agreement",
      "Facilitator-led PD deck (45-minute training, script included)",
      "The Rollout Playbook",
      "Staff seats + Cookbook access for your team",
      "Quarterly policy updates",
    ],
    cta: "Buy School License",
  },
  cohort_leader: {
    id: "cohort_leader" as const,
    name: "Cohort-Leader License",
    price: null,
    priceLabel: "Contact us",
    cadence: "",
    audience: "For coaches & district leaders",
    fit: "Right for you if you train multiple schools and want to run cohorts.",
    features: [
      "Bring AI-Ready School to multiple schools",
      "Cohort facilitation support",
      "Volume licensing",
    ],
    cta: "Contact us",
  },
} as const;

export type ProductId = keyof typeof products;

/** What's inside the kit — used on Home + How It Works. */
export const kitPillars = [
  {
    title: "Governance Pack",
    description:
      "A board-ready AI policy, a FERPA-safe one-pager, a parent letter, and a staff agreement — district-approvable out of the box.",
    icon: "ShieldCheck",
  },
  {
    title: "Facilitator-Led Training",
    description:
      "A 45-minute PD deck your own coach presents. Script included — no consultants, no recording.",
    icon: "Presentation",
  },
  {
    title: "Prompt Cookbook",
    description:
      "50 classroom-ready prompts across grade bands and subjects — every one privacy-safe by design.",
    icon: "BookOpen",
  },
  {
    title: "Rollout Playbook",
    description:
      "A step-by-step plan to go from zero to trained staff in a single week.",
    icon: "Map",
  },
] as const;

/** The 3-step "How it works" flow. */
export const howItWorks = [
  {
    step: 1,
    title: "Buy your license",
    description:
      "Choose the Teacher Kit or the School License. Instant access — no sales call, no setup call.",
  },
  {
    step: 2,
    title: "Download the kit and run the 45-minute training",
    description:
      "Your own coach presents it — the script is included. No recording, no consultants, no building it yourself.",
  },
  {
    step: 3,
    title: "Staff use the Cookbook the same week",
    description:
      "Teachers open the Prompt Cookbook and start saving hours — safely, with privacy guardrails already in place.",
  },
] as const;

/** Public navigation. Every link routes to a real page. */
export const mainNav = [
  { title: "How it works", href: "/how-it-works" },
  { title: "Pricing", href: "/pricing" },
  { title: "Blog", href: "/blog" },
  { title: "FAQ", href: "/faq" },
  { title: "About", href: "/about" },
] as const;

export const footerNav = {
  Product: [
    { title: "How it works", href: "/how-it-works" },
    { title: "Pricing", href: "/pricing" },
    { title: "Get 5 free prompts", href: "/free" },
    { title: "FAQ", href: "/faq" },
  ],
  Company: [
    { title: "About", href: "/about" },
    { title: "Blog", href: "/blog" },
    { title: "Contact", href: "/contact" },
  ],
  Legal: [
    { title: "Privacy", href: "/privacy" },
    { title: "Terms", href: "/terms" },
    { title: "FERPA & Data Safety", href: "/ferpa" },
  ],
} as const;

/** The one hard rule — repeated across the product. */
export const HARD_RULE =
  "Zero student data. Ever. Never put student personal information into public AI tools.";

/** FAQ content (used on /faq and Home teaser). */
export const faqs = [
  {
    q: "Do I need to be technical to use this?",
    a: "No. If you can open a PDF and run a slide deck, you can run the whole rollout. The training script tells you exactly what to say.",
  },
  {
    q: "Is this safe for student privacy?",
    a: "Yes — and it's the whole point. The product stores zero student data, and every prompt is written so you never put student personal information into a public AI tool. The Governance Pack is designed to be district-approvable.",
  },
  {
    q: "What's the difference between the Teacher Kit and the School License?",
    a: "The Teacher Kit ($49, one-time) is for an individual teacher — the Prompt Cookbook and handout. The School License ($999/year) is for a building or district — it includes everything, plus the Governance Pack, the PD deck, the Rollout Playbook, and Cookbook seats for your whole staff.",
  },
  {
    q: "How long does the training take?",
    a: "45 minutes. One person on your team presents it using the included script. No outside consultant and no recording required.",
  },
  {
    q: "Can I add my teachers to the School License?",
    a: "Yes. From your Administration Dashboard you paste your teachers' emails and each one gets an invite. They set a password and get the Cookbook — no separate payment.",
  },
  {
    q: "What happens when my subscription renews or cancels?",
    a: "The School License renews yearly and includes quarterly policy updates. If you cancel, access ends gracefully at the end of your billing period — nothing is deleted abruptly.",
  },
  {
    q: "Do you offer anything for coaches running multiple schools?",
    a: "Yes — the Cohort-Leader License. It's application-only for now. Reach out through our contact page and we'll be in touch.",
  },
] as const;
