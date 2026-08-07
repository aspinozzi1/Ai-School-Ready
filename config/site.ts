/**
 * The single source of truth for pricing, product names, and marketing copy
 * used across the site. Owners: edit values here; every page updates.
 */
export const site = {
  name: "AI-Ready School",
  tagline: "Human teaching. Life-changing tools.",
  description:
    "An all-access library of ready-to-run PD kits: facilitator decks, word-for-word scripts, and handouts. Your own coach presents; no consultants, no scheduling, no prep.",
  url: "https://aireadyschool.com", // placeholder; set to the real domain before launch
  contactEmail: "hello@aireadyschool.com", // placeholder; owners' real inbox
  founders: {
    display: "Adam & Katelyn Spinozzi",
    credential:
      "A husband-and-wife team of certified educators with over 20 combined years in the classroom. Adam is a certified CTE Carpentry teacher; Katelyn is a certified K-8 teacher.",
  },

  pricing: {
    school: {
      name: "School Membership",
      priceYearly: 1499,
      blurb:
        "All-access for your whole staff: one school building, up to 75 staff accounts.",
      mostPopular: true,
    },
    individual: {
      name: "Individual Educator",
      priceYearly: 99,
      blurb: "Full library access for one educator.",
      mostPopular: false,
    },
    districtContact:
      "District or multiple schools? Contact us for district pricing.",
    refundPolicy:
      "30-day money-back guarantee. If the first kit you run doesn't land with your staff, email us within 30 days of purchase for a full refund.",
  },

  /** One school building per School Membership; enforced by the invite flow. */
  schoolSeatLimit: 75,

  certificate: {
    name: "AI-Ready Educator Certificate of Completion",
    disclaimer:
      "Check with your district or state whether this PD qualifies for local credit.",
  },

  nav: [
    { label: "Curriculum", href: "/curriculum" },
    { label: "Pricing", href: "/pricing" },
    { label: "Free Resources", href: "/resources" },
    { label: "AI Tool Library", href: "/tools" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
  ],

  legal: {
    notLegalAdvice:
      "This resource is provided for informational purposes by educators, not attorneys, and is not legal advice. Consult your district's legal counsel before adopting any policy.",
    affiliateDisclosure:
      "Some links on this page are affiliate links. If you purchase through them, we may earn a commission at no extra cost to you. We only list tools we believe are genuinely useful to educators.",
    toolsPageNote:
      "We are educators, not lawyers; always follow your district's policies.",
  },
} as const;

export type Site = typeof site;
