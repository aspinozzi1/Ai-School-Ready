import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Mail, PartyPopper } from "lucide-react";
import { Container, Section } from "@/components/marketing/section";
import { Logo } from "@/components/brand/logo";
import { SetPasswordForm } from "./set-password-form";
import { getSessionUser } from "@/lib/auth";
import { dashboardPathFor } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Welcome",
  description: "Welcome to AI-Ready School — set your password to get started.",
};

export default async function WelcomePage() {
  const user = await getSessionUser();

  return (
    <Section>
      <Container>
        <div className="mx-auto max-w-md">
          <div className="mb-6 flex justify-center">
            <Logo />
          </div>
          <div className="rounded-2xl border bg-card p-8 shadow-sm">
            <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-accent/10 text-accent">
              <PartyPopper className="h-7 w-7" />
            </div>

            {user ? (
              <>
                <h1 className="text-center text-2xl font-bold text-primary">
                  You&apos;re in — welcome!
                </h1>
                <p className="mt-2 text-center text-sm text-muted-foreground">
                  Set a password so you can log back in anytime. Then we&apos;ll take
                  you straight to your dashboard.
                </p>
                <div className="mt-6">
                  <SetPasswordForm />
                </div>
                <p className="mt-4 text-center text-xs text-muted-foreground">
                  Prefer to skip for now?{" "}
                  <Link href={dashboardPathFor(user)} className="font-medium text-accent hover:underline">
                    Go to my dashboard
                  </Link>
                </p>
              </>
            ) : (
              <>
                <h1 className="text-center text-2xl font-bold text-primary">
                  Thank you for your purchase!
                </h1>
                <p className="mt-2 text-center text-sm text-muted-foreground">
                  Your account is being set up. We just emailed you a secure link to
                  set your password and unlock your dashboard.
                </p>
                <div className="mt-6 space-y-3 rounded-lg bg-secondary/60 p-4 text-sm">
                  <p className="flex items-center gap-2 font-medium text-foreground">
                    <Mail className="h-4 w-4 text-accent" /> Check your inbox
                  </p>
                  <p className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-accent" /> Click the link to
                    finish setting up.
                  </p>
                </div>
                <p className="mt-4 text-center text-xs text-muted-foreground">
                  Already set a password?{" "}
                  <Link href="/login" className="font-medium text-accent hover:underline">
                    Log in
                  </Link>
                </p>
              </>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
