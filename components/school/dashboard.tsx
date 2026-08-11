import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { site } from "@/config/site";
import type { Invite, Organization, Profile } from "@/lib/types";
import { InviteForm } from "@/components/school/invite-form";
import {
  RolloutChecklist,
  type RolloutStepRow,
} from "@/components/school/rollout-checklist";
import { ProgressRoster } from "@/components/school/progress-roster";
import { recordableKits, type ProgressRow } from "@/lib/progress";

/**
 * The school dashboard body, shared between /school (admins see their own
 * school) and /admin/schools/[id] (owners viewing as any school). RLS lets
 * owners read every org, so the same user-scoped client serves both.
 */
export async function SchoolDashboard({
  orgId,
  viewingAsOwner = false,
}: {
  orgId: string;
  viewingAsOwner?: boolean;
}) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;

  const [{ data: org }, { data: members }, { data: invites }, { data: steps }] =
    await Promise.all([
      supabase.from("organizations").select("*").eq("id", orgId).single<Organization>(),
      supabase
        .from("profiles")
        .select("*")
        .eq("org_id", orgId)
        .order("created_at", { ascending: true })
        .returns<Profile[]>(),
      supabase
        .from("invites")
        .select("*")
        .eq("org_id", orgId)
        .eq("status", "pending")
        .order("created_at", { ascending: false })
        .returns<Invite[]>(),
      supabase
        .from("rollout_steps")
        .select("id, title, is_complete, sort_order")
        .eq("org_id", orgId)
        .order("sort_order", { ascending: true })
        .returns<RolloutStepRow[]>(),
    ]);

  // PD progress for everyone in this building. Read after the member list so
  // the query can be scoped to those profiles.
  const memberIds = (members ?? []).map((m) => m.id);
  const { data: progress } = memberIds.length
    ? await supabase
        .from("pd_progress")
        .select("*")
        .in("profile_id", memberIds)
        .returns<ProgressRow[]>()
    : { data: [] as ProgressRow[] };

  const completedByMember: Record<string, string[]> = {};
  for (const row of progress ?? []) {
    (completedByMember[row.profile_id] ??= []).push(row.kit_slug);
  }

  const certificateCount = (members ?? []).filter((m) =>
    recordableKits.every((k) =>
      (completedByMember[m.id] ?? []).includes(k.slug)
    )
  ).length;

  if (!org) {
    return (
      <p className="rounded-card border border-mist bg-white p-7 text-sm text-muted">
        School not found.
      </p>
    );
  }

  const seatsLimit = org.seats_limit ?? site.schoolSeatLimit;
  const seatsUsed = (members?.length ?? 0) + (invites?.length ?? 0);

  return (
    <>
      {viewingAsOwner ? (
        <p className="mb-4 rounded-btn bg-amber/15 px-4 py-2 text-sm font-semibold text-navy">
          Owner view: you are seeing {org.name}&apos;s dashboard as its admin
          would.
        </p>
      ) : null}

      <p className="text-sm font-semibold uppercase tracking-wide text-teal">
        School dashboard
      </p>
      <h1 className="mt-1 text-3xl font-bold text-navy">{org.name}</h1>
      <p className="mt-2 text-sm text-muted">
        Membership:{" "}
        {org.license_status === "active" ? (
          <span className="font-semibold text-teal">Active</span>
        ) : (
          <span className="font-semibold text-red-600">Inactive</span>
        )}{" "}
        · Seats: {seatsUsed} of {seatsLimit} used ({members?.length ?? 0} joined,{" "}
        {invites?.length ?? 0} invited)
      </p>

      {steps && steps.length > 0 ? (
        <div className="mt-8 rounded-card border border-mist bg-white p-7">
          <h2 className="text-xl font-bold text-navy">Rollout checklist</h2>
          <p className="mb-4 mt-1 text-sm text-muted">
            The launch sequence that gets your building from purchase to Kit 1
            and beyond. Tick steps off as they happen.
          </p>
          <RolloutChecklist steps={steps} />
        </div>
      ) : null}

      {members && members.length > 0 ? (
        <div className="mt-6 rounded-card border border-mist bg-white p-7">
          <h2 className="text-xl font-bold text-navy">PD progress</h2>
          <p className="mb-5 mt-1 text-sm text-muted">
            You record completion for your staff, which is what makes the
            certificate real. {certificateCount} of {members.length}{" "}
            {certificateCount === 1 ? "educator has" : "educators have"} finished
            all {recordableKits.length} core kits.
          </p>
          <ProgressRoster
            members={members.map((m) => ({
              id: m.id,
              name: m.full_name || m.email,
            }))}
            kits={recordableKits.map((k) => ({
              n: k.n,
              slug: k.slug,
              title: k.title,
            }))}
            completed={completedByMember}
            readOnly={viewingAsOwner}
          />
        </div>
      ) : null}

      <div className="mt-6 rounded-card border border-mist bg-white p-7">
        <h2 className="text-xl font-bold text-navy">Invite your staff</h2>
        <p className="mb-5 mt-1 text-sm text-muted">
          Your membership covers one school building, up to {seatsLimit} staff
          accounts.
        </p>
        {viewingAsOwner ? (
          <p className="rounded-btn bg-paper px-4 py-3 text-sm text-muted">
            Invites are sent from the school&apos;s own admin account, so this
            form is disabled in owner view.
          </p>
        ) : (
          <InviteForm />
        )}
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
    </>
  );
}
