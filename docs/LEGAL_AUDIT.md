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

## Standing rules this audit adds

- Any single-sheet PDF must pass BOTH checks before shipping: text
  extraction finds "not legal advice" AND "local credit" (where
  applicable), and a rendered PNG shows the full legal line above the
  footer. Text can survive in the extraction layer while visually clipped.
- Never remove the legal footer to fix an overflow; trim marketing copy
  (ledes, callouts, citation lists) instead.
