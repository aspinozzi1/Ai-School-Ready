import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/env";
import { SchoolDashboard } from "@/components/school/dashboard";

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
    if (user.profile.role === "owner") redirect("/admin");
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

  return (
    <section className="section bg-paper">
      <div className="mx-auto w-full max-w-3xl">
        <SchoolDashboard orgId={user.profile.org_id} />
      </div>
    </section>
  );
}
