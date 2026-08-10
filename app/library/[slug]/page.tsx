import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/env";
import { getKit, getReleasedKits, kitFiles } from "@/lib/kit-files";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const kit = getKit(slug);
  return {
    title: kit ? `Kit ${kit.n}: ${kit.title}` : "Kit",
    description: kit?.summary,
  };
}

export default async function LibraryKitPage({ params }: Props) {
  const { slug } = await params;
  const kit = getKit(slug);
  if (!kit || kit.status !== "released") notFound();

  const user = isSupabaseConfigured ? await getSessionUser() : null;
  if (!user) redirect("/login");
  if (!user.hasActiveAccess) redirect("/pricing");

  const files = kitFiles(kit);
  const released = getReleasedKits();
  const prev = released.filter((k) => k.n === kit.n - 1)[0];
  const next = released.filter((k) => k.n === kit.n + 1)[0];

  return (
    <section className="section bg-paper">
      <div className="mx-auto w-full max-w-3xl">
        <Link href="/library" className="text-sm font-semibold text-teal hover:underline">
          ← Back to library
        </Link>
        <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-teal">
          Kit {kit.n} · 45–60 minutes
        </p>
        <h1 className="mt-1 text-3xl font-bold text-navy">{kit.title}</h1>
        <p className="mt-3 text-muted">{kit.summary}</p>

        {kit.objectives.length > 0 ? (
          <div className="mt-5 rounded-card border border-mist bg-white p-6">
            <h2 className="font-bold text-navy">By the end, your staff can</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
              {kit.objectives.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <h2 className="mt-8 text-xl font-bold text-navy">Everything in this kit</h2>
        <p className="mt-1 text-sm text-muted">
          Run order: skim the Prep Guide, print the handouts, open the deck, and
          read the script. The rest are your follow-ups.
        </p>
        <div className="mt-4 space-y-3">
          {files.map((file) => (
            <div
              key={file.name}
              className="flex flex-col gap-3 rounded-card border border-mist bg-white p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-semibold text-navy">
                  {file.label}{" "}
                  <span className="ml-1 rounded bg-paper px-2 py-0.5 text-xs font-semibold uppercase text-muted">
                    {file.kind}
                  </span>
                </p>
                <p className="mt-1 text-sm text-muted">{file.description}</p>
              </div>
              <a
                href={`/api/download/${kit.slug}/${encodeURIComponent(file.name)}`}
                className="shrink-0 rounded-btn bg-teal px-4 py-2 text-center text-sm font-semibold text-white hover:opacity-90"
              >
                Download
              </a>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
          {prev ? (
            <Link href={`/library/${prev.slug}`} className="text-sm font-semibold text-teal hover:underline">
              ← Kit {prev.n}: {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/library/${next.slug}`} className="text-sm font-semibold text-teal hover:underline">
              Kit {next.n}: {next.title} →
            </Link>
          ) : null}
        </div>

        <p className="mt-8 rounded-card border border-mist bg-white p-5 text-xs text-muted">
          Licensed for use within the purchasing school. Kit content is
          informational, drafted by certified educators, and is not legal
          advice; consult district counsel before adopting policy.
        </p>
      </div>
    </section>
  );
}
