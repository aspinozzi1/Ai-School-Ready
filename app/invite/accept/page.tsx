import Link from "next/link";
import { redirect } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import { Container, Section } from "@/components/marketing/section";
import { Button } from "@/components/ui/button";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isSupabaseAdminConfigured } from "@/lib/env";

/**
 * Invited teacher lands here after clicking their magic link. We attach them to
 * the school (sets org_id + teacher role) and mark the invite accepted, then
 * send them to their dashboard (Flow B, step 5).
 */
export default async function AcceptInvitePage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  const user = await getSessionUser();

  if (!user) {
    // Not signed in — the magic link is how they authenticate.
    redirect(`/login?error=${encodeURIComponent("Please use the invite link from your email.")}`);
  }

  if (!token || !isSupabaseAdminConfigured) {
    return <InviteProblem message="This invite link is missing or invalid." />;
  }

  const admin = createSupabaseAdminClient();
  const { data: invite } = await admin
    .from("invites")
    .select("id, org_id, email, status")
    .eq("token", token)
    .maybeSingle<{ id: string; org_id: string; email: string; status: string }>();

  if (!invite) {
    return <InviteProblem message="We couldn't find this invite. It may have been removed." />;
  }
  if (invite.email.toLowerCase() !== user.email.toLowerCase()) {
    return (
      <InviteProblem message="This invite was sent to a different email address. Please log in with the invited address." />
    );
  }

  // Attach to the org, keeping any higher role (never downgrade an owner/admin).
  const keepRole = user.profile.role === "owner" || user.profile.role === "school_admin";
  await admin
    .from("profiles")
    .update({
      org_id: invite.org_id,
      ...(keepRole ? {} : { role: "teacher" }),
    })
    .eq("id", user.id);

  await admin.from("invites").update({ status: "accepted" }).eq("id", invite.id);

  redirect("/dashboard");
}

function InviteProblem({ message }: { message: string }) {
  return (
    <Section>
      <Container>
        <div className="mx-auto max-w-md rounded-2xl border bg-card p-8 text-center shadow-sm">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-destructive/10 text-destructive">
            <AlertTriangle className="h-7 w-7" />
          </div>
          <h1 className="mt-5 text-xl font-bold text-primary">There was a problem</h1>
          <p className="mt-2 text-muted-foreground">{message}</p>
          <div className="mt-6 flex justify-center gap-3">
            <Button asChild>
              <Link href="/login">Log in</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/contact">Contact support</Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
