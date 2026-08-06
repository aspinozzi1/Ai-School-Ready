import { Container } from "@/components/marketing/section";

/** Standard hero band for interior pages (title + optional lead). */
export function PageHero({
  eyebrow,
  title,
  lead,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
}) {
  return (
    <div className="border-b bg-secondary/40">
      <Container className="py-14 sm:py-16">
        <div className="mx-auto max-w-3xl text-center">
          {eyebrow && (
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-accent">
              {eyebrow}
            </p>
          )}
          <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">
            {title}
          </h1>
          {lead && (
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              {lead}
            </p>
          )}
        </div>
      </Container>
    </div>
  );
}
