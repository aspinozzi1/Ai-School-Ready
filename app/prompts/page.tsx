import type { Metadata } from "next";
import Link from "next/link";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";
import { ensureStarterPrompts, type SeedTarget } from "@/lib/prompt-seed";
import type { PromptRow } from "@/lib/prompts";
import { PromptForm } from "@/components/prompts/prompt-form";
import {
  PromptList,
  type PromptListItem,
} from "@/components/prompts/prompt-list";

export const metadata: Metadata = {
  title: "Prompt library",
  description:
    "Your school's shared library of AI prompts that work, written by your own staff.",
};

export default async function PromptsPage() {
  const user = isSupabaseConfigured ? await getSessionUser() : null;

  if (!user) {
    return (
      <Gatehouse
        title="Sign in to open your prompt library"
        body="The prompt library is where your staff keeps the prompts that actually work, so nobody solves the same problem twice."
        cta={{ href: "/login?next=/prompts", label: "Sign in" }}
        secondary={{ href: "/pricing", label: "Become a member" }}
      />
    );
  }

  if (!user.hasActiveAccess) {
    return (
      <Gatehouse
        title="Your membership isn't active yet"
        body="Choose a membership to open your library, or ask your school admin for an invite if your building already has a School Membership."
        cta={{ href: "/pricing", label: "See memberships" }}
        secondary={{ href: "/contact", label: "Talk to us" }}
      />
    );
  }

  const orgId = user.profile.org_id;
  const isPersonal = !orgId;
  const target: SeedTarget = orgId ? { orgId } : { authorId: user.id };

  // Plants the founder starter set the first time a library is opened. Runs
  // once per library: schools provisioned before this release get theirs here.
  await ensureStarterPrompts(target);

  const supabase = await createSupabaseServerClient();
  const base = supabase!
    .from("prompts")
    .select("*")
    .order("created_at", { ascending: false });

  const { data: prompts } = await (orgId
    ? base.eq("org_id", orgId)
    : base.is("org_id", null).eq("author_id", user.id)
  ).returns<PromptRow[]>();

  // Attribution: who at this school wrote each prompt.
  const authorIds = Array.from(
    new Set((prompts ?? []).map((p) => p.author_id).filter(Boolean))
  ) as string[];

  const authorNames = new Map<string, string>();
  if (authorIds.length > 0) {
    const { data: authors } = await supabase!
      .from("profiles")
      .select("id, full_name, email")
      .in("id", authorIds)
      .returns<Array<{ id: string; full_name: string | null; email: string }>>();
    for (const a of authors ?? []) {
      authorNames.set(a.id, a.full_name || a.email);
    }
  }

  const canModerate =
    user.profile.role === "school_admin" || user.profile.role === "owner";

  const items: PromptListItem[] = (prompts ?? []).map((p) => ({
    ...p,
    authorName: p.author_id ? (authorNames.get(p.author_id) ?? null) : null,
    canEdit: canModerate || p.author_id === user.id,
  }));

  return (
    <section className="section bg-paper">
      <div className="mx-auto w-full max-w-4xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-teal">
            {isPersonal ? "Your prompts" : "Your school's library"}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-navy">Prompt library</h1>
          <p className="mx-auto mt-3 max-w-2xl text-muted">
            {isPersonal
              ? "The prompts you've saved, plus a starter set from the founders. Copy one, fill the brackets, and keep the ones that earn their place."
              : "Prompts that work, kept where your colleagues can find them. Every library starts with a founder starter set; the good stuff comes from your own staff."}
          </p>
        </div>

        <div className="mt-8">
          <PromptForm isPersonal={isPersonal} />
        </div>

        <div className="mt-6">
          <PromptList prompts={items} />
        </div>

        <p className="mt-8 text-center text-xs text-muted">
          Kit 2 builds this library with your staff in one session.{" "}
          <Link href="/library" className="font-semibold text-teal hover:underline">
            Open the kit library
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

function Gatehouse({
  title,
  body,
  cta,
  secondary,
}: {
  title: string;
  body: string;
  cta: { href: string; label: string };
  secondary: { href: string; label: string };
}) {
  return (
    <section className="section bg-paper">
      <div className="mx-auto w-full max-w-md">
        <div className="rounded-card border border-mist bg-white p-9 text-center">
          <h1 className="text-2xl font-bold text-navy">{title}</h1>
          <p className="mt-3 text-sm text-muted">{body}</p>
          <div className="mt-7 space-y-3">
            <Link
              href={cta.href}
              className="block rounded-btn bg-teal px-5 py-3 font-semibold text-white hover:opacity-90"
            >
              {cta.label}
            </Link>
            <Link
              href={secondary.href}
              className="block rounded-btn bg-paper px-5 py-3 font-semibold text-navy ring-1 ring-mist hover:bg-white"
            >
              {secondary.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
