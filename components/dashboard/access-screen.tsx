import Link from "next/link";
import { Lock, LogIn, ArrowUpCircle, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/marketing/section";
import type { SessionUser } from "@/lib/types";
import { dashboardPathFor } from "@/lib/nav";

/**
 * Friendly screen shown when a user can't view gated content.
 * Never an error page — always a clear next step (flow-integrity rule #5).
 */
export function AccessScreen({
  reason,
  user,
  area = "this area",
}: {
  reason: "auth" | "access" | "role";
  user: SessionUser | null;
  area?: string;
}) {
  const config = {
    auth: {
      icon: LogIn,
      title: "Please log in",
      body: "Log in to reach your dashboard, Cookbook, and downloads.",
      cta: { href: "/login", label: "Log in" },
      secondary: { href: "/pricing", label: "See pricing" },
    },
    access: {
      icon: ArrowUpCircle,
      title: "Your access isn't active",
      body: "It looks like you don't have an active license yet — or it has expired. Get the kit to unlock the Cookbook and downloads.",
      cta: { href: "/pricing", label: "See pricing" },
      secondary: { href: "/contact", label: "Contact support" },
    },
    role: {
      icon: ShieldAlert,
      title: "This area is for a different role",
      body: `You're signed in, but ${area} is limited to a different role. Head to your own dashboard.`,
      cta: user
        ? { href: dashboardPathFor(user), label: "Go to my dashboard" }
        : { href: "/login", label: "Log in" },
      secondary: { href: "/contact", label: "Contact support" },
    },
  }[reason];

  const IconCmp = config.icon;

  return (
    <Section>
      <Container>
        <div className="mx-auto max-w-md rounded-2xl border bg-card p-8 text-center shadow-sm">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-accent/10 text-accent">
            <IconCmp className="h-7 w-7" />
          </div>
          <h1 className="mt-5 text-2xl font-bold text-primary">{config.title}</h1>
          <p className="mt-2 text-muted-foreground">{config.body}</p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild>
              <Link href={config.cta.href}>{config.cta.label}</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={config.secondary.href}>{config.secondary.label}</Link>
            </Button>
          </div>
          {user && (
            <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <Lock className="h-3 w-3" /> Signed in as {user.email}
            </p>
          )}
        </div>
      </Container>
    </Section>
  );
}
