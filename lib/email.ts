import { Resend } from "resend";
import { env, isResendConfigured } from "@/lib/env";
import { site } from "@/config/site";

/**
 * Transactional email via Resend. Every sender degrades gracefully: when
 * RESEND_API_KEY isn't set, sends are skipped and the caller falls back to
 * showing the link for manual sharing.
 */

function client(): Resend | null {
  if (!isResendConfigured) return null;
  return new Resend(env.resendApiKey);
}

/** Welcome email after purchase, with a one-click set-up link. */
export async function sendWelcomeEmail(opts: {
  to: string;
  productName: string;
  actionUrl: string;
}): Promise<boolean> {
  const resend = client();
  if (!resend) return false;

  const { error } = await resend.emails.send({
    from: env.emailFrom,
    to: opts.to,
    subject: `Welcome to ${site.name} — your library is open`,
    text: [
      `Welcome!`,
      ``,
      `Your ${opts.productName} is active. Your kit library is open right now:`,
      ``,
      `Sign in with one click (this link also lets you set a password):`,
      opts.actionUrl,
      ``,
      `Start with Kit 1 if your building is running the series in order; the`,
      `facilitator prep guide in each kit takes about 15 minutes.`,
      ``,
      `Questions at any point — just reply. A founder answers.`,
      ``,
      `— ${site.founders.display}, ${site.name}`,
    ].join("\n"),
  });

  return !error;
}

/** Notify the owners' inbox about a new quote / PO request. */
export async function sendQuoteRequestEmail(opts: {
  schoolName: string;
  contactName: string;
  contactEmail: string;
  district?: string;
  poNumber?: string;
  notes?: string;
}): Promise<boolean> {
  const resend = client();
  if (!resend || !env.ownerEmail) return false;

  const { error } = await resend.emails.send({
    from: env.emailFrom,
    to: env.ownerEmail,
    replyTo: opts.contactEmail,
    subject: `Quote request: ${opts.schoolName}`,
    text: [
      `New School Membership quote request from the site.`,
      ``,
      `School: ${opts.schoolName}`,
      `District: ${opts.district || "—"}`,
      `Contact: ${opts.contactName} <${opts.contactEmail}>`,
      `PO number: ${opts.poNumber || "—"}`,
      ``,
      `Notes:`,
      opts.notes || "—",
    ].join("\n"),
  });

  return !error;
}

export async function sendStaffInviteEmail(opts: {
  to: string;
  orgName: string;
  actionUrl: string;
}): Promise<boolean> {
  const resend = client();
  if (!resend) return false;

  const { error } = await resend.emails.send({
    from: env.emailFrom,
    to: opts.to,
    subject: `${opts.orgName} has added you to ${site.name}`,
    text: [
      `Hi,`,
      ``,
      `${opts.orgName} has an ${site.name} membership, and a seat is waiting for you.`,
      `The library holds ready-to-run AI professional development kits built by certified educators.`,
      ``,
      `Accept your seat here (one click):`,
      opts.actionUrl,
      ``,
      `If you weren't expecting this, you can ignore this email.`,
      ``,
      `— ${site.founders.display}, ${site.name}`,
    ].join("\n"),
  });

  return !error;
}
