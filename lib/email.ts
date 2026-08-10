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
