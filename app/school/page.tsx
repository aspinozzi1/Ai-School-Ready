import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";
import { site } from "@/config/site";
import type { Invite, Organization, Profile } from "@/lib/types";
import { InviteForm } from "@/components/school/invite-form";

export const metadata: Metadata = {
  title: "School dashboard",
  description: "Manage your school's AI-Ready School membership and seats.",
};

export default async function SchoolPage() {
  if (!isSupabaseConfigured) redirect("/login");
  const user = await getSessionUser();
  if (!user) redirect("/login?next=/school");
  if (user.profile.role !== "school_admin" && user.profile.role !== "owner") {
    redirect("/account");
  }
  if (!user.profile.org_id) {
    return (
      <section className="section bg-paper">
        <div className="mx-auto w-full max-w-lg rounded-card border border-mist bg-white p-9 text-center">
          <h1 className="text-2xl font-bold text-navy">No school connected yet</h1>
          <p className="mt-3 text-sm text-muted">
            Your account isn&apos;t linked to a school membership. If your
            school just purchased, check the welcome email; otherwise contact
            us and we&apos;ll connect you.
          </p>
          <Link href="/contact" className="mt-6 inline-block rounded-btn bg-teal px-5 py-3 font-semibold text-white hover:opacity-90">
            Contact us
          </Link>
        </div>
      </section>
    );
  }

  const supabase = await createSupabaseServerClient();
  const orgId = user.profile.org_id;

  const [{ data: org }, { data: members }, { data: invites }] = await Promise.all([
    supabase!.from("organizations").select("*").eq("id", orgId).single<Organization>(),
    supabase!
      .from("profiles")
      .select("*")
      .eq("org_id", orgId)
      .order("created_at", { ascending: true })
      .returns<Profile[]>(),
    supabase!
      .from("invites")
      .select("*")
      .eq("org_id", orgId)
      .eq("status", "pending")
      .order("created_at", { ascending: false })
      .returns<Invite[]>(),
  ]);

  const seatsLimit = org?.seats_limit ?? site.schoolSeatLimit;
  const seatsUsed = (members?.length ?? 0) + (invites?.length ?? 0);

  return (
    <section className="section bg-paper">
      <div className="mx-auto w-full max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-teal">
          School dashboard
        </p>
        <h1 className="mt-1 text-3xl font-bold text-navy">
          {org?.name ?? "Your school"}
        </h1>
        <p className="mt-2 text-sm text-muted">
          Membership:{" "}
          {org?.license_status === "active" ? (
            <span className="font-semibold text-teal">Active</span>
          ) : (
            <span className="font-semibold text-red-600">Inactive</span>
          )}{" "}
          · Seats: {seatsUsed} of {seatsLimit} used ({members?.length ?? 0}{" "}
          joined, {invites?.length ?? 0} invited)
        </p>

        <div className="mt-8 rounded-card border border-mist bg-white p-7">
          <h2 className="text-xl font-bold text-navy">Invite your staff</h2>
          <p className="mb-5 mt-1 text-sm text-muted">
            Your membership covers one school building, up to {seatsLimit}{" "}
            staff accounts.
          </p>
          <InviteForm />
        </div>

        <div className="mt-6 rounded-card border border-mist bg-white p-7">
          <h2 className="text-xl font-bold text-navy">
            Joined ({members?.length ?? 0})
          </h2>
          {members && members.length > 0 ? (
            <ul className="mt-3 divide-y divide-mist text-sm">
              {members.map((m) => (
                <li key={m.id} className="flex items-center justify-between py-2">
                  <span className="text-navy">
                    {m.full_name || m.email}
                    {m.full_name ? (
                      <span className="ml-2 text-muted">{m.email}</span>
                    ) : null}
                  </span>
                  <span className="text-xs font-semibold uppercase text-muted">
                    {m.role === "school_admin" ? "Admin" : "Educator"}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-muted">Nobody has joined yet.</p>
          )}
        </div>

        {invites && invites.length > 0 ? (
          <div className="mt-6 rounded-card border border-mist bg-white p-7">
            <h2 className="text-xl font-bold text-navy">
              Invited, not yet joined ({invites.length})
            </h2>
            <ul className="mt-3 divide-y divide-mist text-sm">
              {invites.map((i) => (
                <li key={i.id} className="py-2 text-navy">
                  {i.email}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <p className="mt-6 text-xs text-muted">
          Need more seats or another building?{" "}
          <Link href="/contact" className="font-semibold text-teal hover:underline">
            Contact us
          </Link>{" "}
          about district pricing.
        </p>
      </div>
    </section>
  );
}
