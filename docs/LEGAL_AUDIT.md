# Pre-launch legal-exposure audit — 2026-08-10

Scope: every public page, the purchase flow, and all 8 purchasable kits.
Configured to minimize exposure per the owner's directive. **This is a
layperson's audit by the AI assistant, not legal advice; the flagged items
below need the owner's attorney before or shortly after launch.**

## What was checked and now passes

**Site**
- Terms of service: license scope (one building / 75 seats / no
  redistribution), annual auto-renewal disclosed with a cancellation method
  and end-of-term effect, refund policy consistent with pricing + FAQ,
  acceptable use, as-is warranty disclaimer, liability cap, 30-day change
  notice, governing law (Pennsylvania — attorney to confirm), account
  responsibility clause.
- Auto-renewal disclosure ALSO at point of sale: "Renews yearly; cancel
  anytime before renewal" sits directly under both checkout buttons
  (state auto-renewal statutes want it before purchase, not only in terms).
- Signup clickwrap: "By creating an account you agree to the Terms and
  Privacy Policy" above the create button.
- Privacy policy: matches what the backend actually collects (accounts,
  billing via Stripe, leads, logs); processors named (Supabase, Stripe,
  Resend, Vercel); essential-cookies-only statement; export/delete contact;
  the staff-roster line now matches the shipped dashboard (removal by
  email, not self-serve).
- FERPA page: claims are accurate — no student data is collected by design;
  the page never claims "FERPA certified/compliant," only states facts.
- Disclosures: AI-assisted drafting disclosed; no-affiliate statement;
  independence from tool vendors (no endorsement); certificate scope.
- Certificates: everywhere titled "Certificate of Completion" with the
  local-credit check disclaimer (site + kit files).
- Marketing claims: homepage and pricing carry no guaranteed-outcome or
  uncited statistical claims; kit stats carry citations in-kit.
- Downloads: served only behind server-side access checks; library pages
  restate the license scope.
- W-9: the served file is a self-identifying placeholder; owner must
  replace before launch (in HANDOFF placeholders list).

**Kits (all 8, verified in the built PDFs by text extraction + render)**
- Facilitator scripts and admin one-pagers: "informational, not legal
  advice; consult district counsel" present.
- References: "Licensed for use within the purchasing school" present.
- Exit tickets: certificate naming + local-credit language present.
- No student PII anywhere; unsafe-prompt demos use invented names and are
  labeled as such.
- FIXED THIS AUDIT: Kits 3, 4, and 5 admin one-pagers had overflowed the
  single sheet, clipping the legal footer (Kits 3–4 mid-sentence). Copy
  trimmed, rebuilt, re-verified visually and by text search. Kit 8's
  references and handout had the same class of bug; also fixed.

> **Correction (owner, 2026-08-10): the owners are in NEW JERSEY, not
> Pennsylvania.** The governing-law placeholder in the Terms has been
> switched to New Jersey (still attorney-to-confirm). Item 3's analysis
> below was researched under the PA Ethics Act and must be redone under
> New Jersey law (School Ethics Act / district conflict-of-interest and
> nepotism policies) before any sale to the owners' own district. Item 4's
> auto-renewal check should likewise start from NJ's requirements.

## Items for the owner's attorney (in priority order)

1. **Entity formation.** The site sells as "AI-Ready School · Adam &
   Katelyn Spinozzi." An LLC (or similar) would separate personal assets
   from business liability — the single highest-leverage protection
   available. Update Terms/footer with the entity name once formed.
2. **Governing-law + dispute clause.** Pennsylvania is a placeholder
   choice; attorney should confirm and consider venue/arbitration language.
3. **Selling to the school where the owners teach.** PA Public Official and
   Employee Ethics Act analysis (open-and-public process for $500+
   contracts with one's own governmental body; disclosure + recusal). An
   Ethics Commission advisory opinion is cheap insurance. (Researched
   earlier this project; see session notes.)
4. **Auto-renewal statutes.** Disclosures are in place, but state ARL
   requirements vary (e.g., renewal reminder emails); confirm the Stripe
   subscription emails satisfy the states where schools buy.
5. **Terms as a binding contract for schools.** District purchasing may
   want a countersigned agreement instead of website terms; attorney can
   produce a short standard agreement for PO sales.
6. **Insurance.** General liability + professional (E&O) coverage for a PD
   content business is inexpensive and worth a quote.

## Addendum — 2026-08-11 issue-spotting pass (post member-experience build)

Same caveat as above: layperson's analysis, not legal advice. New facts since
the 2026-08-10 audit: LLC filing in progress (NJ, single member: Adam; EIN
42-4384815 obtained), prompt library + progress tracking + certificate +
Stripe Invoicing shipped, owner targeting private schools then charters.

Ranked by (likelihood × severity) as of today:

1. **Content-reliance claims remain the #1 exposure class.** A school acts
   on kit guidance and something goes wrong; the vendor gets named. All
   disclaimers are in place; the remaining fix is E&O + general liability
   insurance (item 6 above) — elevate it to "before first school sale."
2. **NEW: Terms don't cover the prompt library (user-generated content).**
   Verified today: no UGC clause exists. Needed: a license grant from the
   member to host/display their prompts within their school, the no-PII
   rule stated as a term of use (the UI checkbox already exists and is
   good evidence of reasonable design), our right to remove content, and a
   takedown contact. Consider a DMCA registered agent (~$6). The worst
   scenario is a member pasting student PII into a shared library —
   author + admin delete already exist; terms need to back them.
3. **NEW: progress records are employment-adjacent data about named
   teachers, recorded by their admin.** Privacy policy already discloses
   progress data (verified today). Residual risk is a teacher disputing an
   admin-recorded completion; low severity, no action beyond the existing
   removal-by-email path.
4. **Trademark + name clearance — now URGENT (upgraded 2026-08-12).**
   Verified by direct fetch: aireadyschool.com hosts an ACTIVE India-based
   ed-tech company operating as "AI Ready School" (self-described "India's
   first complete K-12 AI ecosystem," products Cypher/Morpheus/Zion/NEO/
   Matrix, parent company Learnia, 10,000+ claimed users). Same name, same
   sector. The owner purchased ai-readyschool.com (hyphenated) 2026-08-12.
   What this means: (a) attorney knockout search (USPTO + common law)
   BEFORE meaningful marketing spend — if they hold or file a US mark,
   rebranding later is expensive; if they have no US commerce, the owner's
   first-use-in-US position may actually be strong, which cuts the other
   way and is worth establishing early; (b) practical confusion is certain
   regardless of law: brand searches and spoken referrals will leak to
   their site — always print the hyphenated domain, consider defensive
   registrations (aireadyschool.org/.net) if available; (c) this is now
   the top item for the attorney sitting, alongside the copyright-posture
   question (register the compilation disclosing AI-generated material;
   per-kit PROVENANCE.md files are the human-authorship record).
5. **LLC discipline once approved.** Separate bank account, no
   commingling, sign everything "Adam Spinozzi, Member, AI-Ready School
   LLC," and update the Terms entity name, site footer, W-9, and Stripe
   business profile. The LLC only shields what stays separated.
6. **Own-district sales + employment contracts (restates item 3 under NJ
   law).** Do not sell to the owners' own district(s) without counsel;
   check both employment contracts for outside-work and IP clauses; keep
   the business strictly off district time and equipment so no district
   work-product claim can attach.
7. **Auto-renewal statutes (restates item 4).** Note the new invoice/PO
   path is naturally compliant — each year is a fresh invoice, no
   auto-renewal. The card-subscription path still needs the NJ ARL check.
8. **Hygiene items, not attorney-urgent:** sales-tax treatment of digital
   products in NJ and nexus states (accountant question; schools are
   usually exempt — collect exemption certificates in the PO flow);
   website accessibility (ADA) as an education vendor; state student-data
   procurement forms (NY Ed Law 2-d etc.) will be asked for by public
   buyers — the honest answer is "no student data by design," but expect
   the forms as sales friction.

## Standing rules this audit adds

- Any single-sheet PDF must pass BOTH checks before shipping: text
  extraction finds "not legal advice" AND "local credit" (where
  applicable), and a rendered PNG shows the full legal line above the
  footer. Text can survive in the extraction layer while visually clipped.
- Never remove the legal footer to fix an overflow; trim marketing copy
  (ledes, callouts, citation lists) instead.
