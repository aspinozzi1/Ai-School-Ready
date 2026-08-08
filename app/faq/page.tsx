import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Common questions about AI-Ready School memberships, kits, payment, and student privacy.",
};

const faqs: [string, string][] = [
  [
    "Who actually presents the PD sessions?",
    "Your own people: an instructional coach, teacher-leader, media specialist, or AP. Every kit includes a word-for-word script with stage directions and a running clock, plus a prep guide written for first-time facilitators. If they can read aloud and keep time, they can deliver a great session. No AI expertise required.",
  ],
  [
    "How long does a session take, and what's the format?",
    "Each kit is a 45-to-60-minute session for your whole staff, with at least 15 minutes of hands-on practice. Every kit also ships a 30-day follow-up plan with three 10-minute PLC activities, so the learning survives past Friday.",
  ],
  [
    "Can we pay by purchase order?",
    "Yes, and most schools do. Request an invoice from the pricing page and we'll email your business office a formal quote immediately. We accept POs with Net 30 terms, ACH, check, and card. See our For Business Offices page for vendor details.",
  ],
  [
    "How many staff can use a School Membership?",
    `One School Membership covers one school building with up to ${site.schoolSeatLimit} staff accounts, which is more than nearly any single school needs. Districts and multi-school networks should contact us for a district agreement.`,
  ],
  [
    "Is student data involved anywhere?",
    "No. The platform serves adult educators only: no student accounts, no student information, nothing that touches FERPA records. Beyond that, the very first kit teaches every educator the one hard rule: never put student personally identifiable information into a public AI tool.",
  ],
  [
    "Do the certificates count for license renewal or CEUs?",
    "Certificates are Certificates of Completion: professional documentation of the training completed. They do not by themselves confer CEUs or clock hours. Check with your district or state whether this PD qualifies for local credit; many schools use the exit tickets and certificates as their PD documentation.",
  ],
  [
    "Which AI tools do the kits require?",
    "None in particular. The kits are tool-agnostic and work with any major AI chatbot, including whatever your district has approved. Tools are referenced factually; we have no partnerships and sell no tools.",
  ],
  [
    "What if AI changes six months from now?",
    "It will, and that's the point of a membership: kits are updated as AI changes, and new kits release throughout the year at no extra cost. Your library gets better while your price stays flat.",
  ],
  [
    "Only Track A is out. What am I buying?",
    "Track A is the complete core curriculum: eight full sessions, which is more PD than most schools run in a year. Tracks B through D are in production and release to all members as they finish. We show this honestly on the curriculum page rather than faking availability.",
  ],
  [
    "What's your refund policy?",
    site.pricing.refundPolicy,
  ],
];

export default function FaqPage() {
  return (
    <>
      <section className="bg-navy text-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 md:py-20">
          <h1 className="text-4xl font-bold">Common questions</h1>
          <p className="mt-4 max-w-2xl text-lg text-mist">
            Straight answers, no sales voice. Anything else,{" "}
            <Link href="/contact" className="font-semibold text-teal hover:underline">
              ask us directly
            </Link>
            .
          </p>
        </div>
      </section>
      <section className="section bg-paper">
        <div className="section-inner max-w-3xl space-y-5">
          {faqs.map(([q, a]) => (
            <details
              key={q}
              className="group rounded-card border border-mist bg-white p-6 open:shadow-sm"
            >
              <summary className="cursor-pointer list-none font-semibold text-navy marker:hidden">
                {q}
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted">{a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
