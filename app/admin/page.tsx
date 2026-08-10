import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";
import { site } from "@/config/site";
import type { License, Organization } from "@/lib/types";

export const metadata: Metadata = {
  title: "Owner admin",
  description: "AI-Ready School operations.",
};

interface QuoteRow {
  id: string;
  school_name: string;
  district: string | null;
  contact_name: string;
  contact_email: string;
  po_number: string | null;
  notes: string | null;
  status: string;
  created_at: string;
}

export default async function AdminPage() {
  if (!isSupabaseConfigured) redirect("/login");
  const user = await getSessionUser();
  if (!user) redirect("/login?next=/admin");
  if (user.profile.role !== "owner") redirect("/account");

  const supabase = await createSupabaseServerClient();
  const [
    { data: orgs },
    { count: memberCount },
    { data: individualLicenses },
    { data: quotes },
    { count: leadCount },
  ] = await Promise.all([
    supabase!
      .from("organizations")
      .select("*")
      .order("created_at", { ascending: false })
      .returns<Organization[]>(),
    supabase!.from("profiles").select("*", { count: "exact", head: true }),
    supabase!
      .from("licenses")
      .select("*")
      .eq("product", "individual")
      .eq("status", "active")
      .returns<License[]>(),
    supabase!
      .from("quote_requests")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(25)
      .returns<QuoteRow[]>(),
    supabase!.from("leads").select("*", { count: "exact", head: true }),
  ]);

  const activeSchools = (orgs ?? []).filter((o) => o.license_status === "active");
  const openQuotes = (quotes ?? []).filter((q) => q.status === "new");

  return (
    <section className="section bg-paper">
      <div className="mx-auto w-full max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-teal">
          Owner admin
        </p>
        <h1 className="mt-1 text-3xl font-bold text-navy">Operations</h1>

        <div className="mt-6 grid gap-4 sm:grid-cols-4">
          <Stat label="Active schools" value={activeSchools.length} />
          <Stat label="Individual members" value={individualLicenses?.length ?? 0} />
          <Stat label="Total accounts" value={memberCount ?? 0} />
          <Stat label="Open quotes" value={openQuotes.length} />
        </div>

        <div className="mt-8 rounded-card border border-mist bg-white p-7">
          <h2 className="text-xl font-bold text-navy">
            Schools ({orgs?.length ?? 0})
          </h2>
          {orgs && orgs.length > 0 ? (
            <ul className="mt-3 divide-y divide-mist text-sm">
              {orgs.map((o) => (
                <li key={o.id} className="flex items-center justify-between gap-3 py-3">
                  <div>
                    <p className="font-semibold text-navy">{o.name}</p>
                    <p className="text-xs text-muted">
                      {o.license_status === "active" ? "Active" : "Inactive"} ·{" "}
                      {o.seats_limit ?? site.schoolSeatLimit} seats ·{" "}
                      {new Date(o.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <Link
                    href={`/admin/schools/${o.id}`}
                    className="shrink-0 rounded-btn bg-paper px-4 py-2 text-sm font-semibold text-navy ring-1 ring-mist hover:bg-white"
                  >
                    View as school
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-muted">
              No schools yet. The first purchase or provisioned demo school
              appears here.
            </p>
          )}
        </div>

        <div className="mt-6 rounded-card border border-mist bg-white p-7">
          <h2 className="text-xl font-bold text-navy">
            Quote requests ({quotes?.length ?? 0})
          </h2>
          {quotes && quotes.length > 0 ? (
            <ul className="mt-3 divide-y divide-mist text-sm">
              {quotes.map((q) => (
                <li key={q.id} className="py-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold text-navy">
                      {q.school_name}
                      {q.district ? (
                        <span className="ml-2 font-normal text-muted">{q.district}</span>
                      ) : null}
                    </p>
                    <span
                      className={`rounded-full px-3 py-0.5 text-xs font-semibold uppercase ${
                        q.status === "new"
                          ? "bg-amber/20 text-navy"
                          : "bg-paper text-muted"
                      }`}
                    >
                      {q.status}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted">
                    {q.contact_name} ·{" "}
                    <a
                      href={`mailto:${q.contact_email}?subject=Your%20AI-Ready%20School%20quote`}
                      className="font-semibold text-teal hover:underline"
                    >
                      {q.contact_email}
                    </a>
                    {q.po_number ? ` · PO ${q.po_number}` : ""} ·{" "}
                    {new Date(q.created_at).toLocaleDateString()}
                  </p>
                  {q.notes ? (
                    <p className="mt-1 text-xs text-muted">{q.notes}</p>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-muted">No quote requests yet.</p>
          )}
        </div>

        <p className="mt-6 text-xs text-muted">
          {leadCount ?? 0} newsletter/free-resource leads collected. Provision a
          school manually (PO sale): run the SQL in supabase/seed.sql as a
          template, or ask us for the runbook in HANDOFF.md.
        </p>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-card border border-mist bg-white p-5 text-center">
      <p className="text-3xl font-bold text-navy">{value}</p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-muted">
        {label}
      </p>
    </div>
  );
}
