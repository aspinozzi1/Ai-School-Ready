import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Container, Section } from "@/components/marketing/section";
import { isSupabaseConfigured } from "@/lib/env";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

/** Centered card layout for /login and /signup. */
export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <Section>
      <Container>
        <div className="mx-auto max-w-md">
          <div className="mb-6 flex justify-center">
            <Logo />
          </div>
          <div className="rounded-2xl border bg-card p-8 shadow-sm">
            <h1 className="text-2xl font-bold text-primary">{title}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>

            {!isSupabaseConfigured && (
              <Alert className="mt-4" variant="info">
                <Info />
                <AlertDescription>
                  Accounts aren&apos;t connected yet. Add your Supabase keys (see the
                  README) to enable sign-in.
                </AlertDescription>
              </Alert>
            )}

            <div className="mt-6">{children}</div>
          </div>
          <p className="mt-6 text-center text-sm text-muted-foreground">{footer}</p>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            <Link href="/" className="hover:underline">
              ← Back to site
            </Link>
          </p>
        </div>
      </Container>
    </Section>
  );
}
