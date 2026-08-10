import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";
import type { Organization } from "@/lib/types";

export const metadata: Metadata = {
  title: "Your account",
  description: "Your AI-Ready School membership.",
};

export default async function AccountPage() {
  if (!isSupabaseConfigured) redirect("/login");
  const user = await getSessionUser();
  if (!user) redirect("/login?next=/account");

  let org: Organization | null = null;
  if (user.profile.org_id) {
    const supabase = await createSupabaseServerClient();
    if (supabase) {
      const { data } = await supabase
        .from("organizations")
        .select("*")
        .eq("id", user.profile.org_id)
        .single<Organization>();
      org = data;
    }
  }

  const roleLabel =
    user.profile.role === "owner"
      ? "Owner"
      : user.profile.role === "school_admin"
        ? "School admin"
        : "Educator";

  return (
    <section className="section bg-paper">
      <div className="mx-auto w-full max-w-lg">
        <div className="rounded-card border border-mist bg-white p-9">
          <h1 className="text-2xl font-bold text-navy">Your account</h1>

          <dl className="mt-6 space-y-4 text-sm">
            <div>
              <dt className="font-semibold text-navy">Signed in as</dt>
              <dd className="text-muted">
                {user.profile.full_name ? `${user.profile.full_name} · ` : ""}
                {user.email}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-navy">Role</dt>
              <dd className="text-muted">{roleLabel}</dd>
            </div>
            {org ? (
              <div>
                <dt className="font-semibold text-navy">School</dt>
                <dd className="text-muted">{org.name}</dd>
              </div>
            ) : null}
            <div>
              <dt className="font-semibold text-navy">Membership</dt>
              <dd className="text-muted">
                {user.hasActiveAccess ? (
                  <span className="font-semibold text-teal">Active</span>
                ) : (
                  <>
                    Not active yet.{" "}
                    <Link href="/pricing" className="font-semibold text-teal hover:underline">
                      See memberships
                    </Link>{" "}
                    or ask your school admin for an invite.
                  </>
                )}
              </dd>
            </div>
          </dl>

          <div className="mt-8 space-y-3">
            {user.hasActiveAccess ? (
              <Link href="/library" className="block rounded-btn bg-teal px-5 py-3 text-center font-semibold text-white hover:opacity-90">
                Open the library
              </Link>
            ) : (
              <Link href="/pricing" className="block rounded-btn bg-teal px-5 py-3 text-center font-semibold text-white hover:opacity-90">
                Choose a membership
              </Link>
            )}
            {user.profile.role === "school_admin" || user.profile.role === "owner" ? (
              <Link href="/school" className="block rounded-btn bg-paper px-5 py-3 text-center font-semibold text-navy ring-1 ring-mist hover:bg-white">
                School dashboard
              </Link>
            ) : null}
            <form action="/auth/signout" method="post">
              <button
                type="submit"
                className="block w-full rounded-btn bg-paper px-5 py-3 font-semibold text-navy ring-1 ring-mist hover:bg-white"
              >
                Sign out
              </button>
            </form>
          </div>

          <p className="mt-6 text-xs text-muted">
            Need help with your account or billing? Email us via the{" "}
            <Link href="/contact" className="font-semibold text-teal hover:underline">
              contact page
            </Link>{" "}
            and a founder answers.
          </p>
        </div>
      </div>
    </section>
  );
}
