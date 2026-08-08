import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/marketing/section";

/** Reusable "ready to start" call-to-action band. */
export function CtaBand({
  title = "Ready to make your school AI-ready?",
  subtitle = "Start your membership today, or judge us first with the free sample pack.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <Section className="py-14">
      <Container>
        <div className="rounded-2xl bg-primary px-6 py-12 text-center text-primary-foreground sm:px-12">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">
            {subtitle}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" variant="amber">
              <Link href="/pricing">See Membership Plans</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <Link href="/free">Get the free sample pack</Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
