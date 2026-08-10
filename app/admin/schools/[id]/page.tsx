import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/env";
import { SchoolDashboard } from "@/components/school/dashboard";

export const metadata: Metadata = {
  title: "School (owner view)",
  description: "Owner view of a member school's dashboard.",
};

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AdminSchoolPage({ params }: Props) {
  if (!isSupabaseConfigured) redirect("/login");
  const user = await getSessionUser();
  if (!user) redirect("/login?next=/admin");
  if (user.profile.role !== "owner") redirect("/account");

  const { id } = await params;

  return (
    <section className="section bg-paper">
      <div className="mx-auto w-full max-w-3xl">
        <Link href="/admin" className="text-sm font-semibold text-teal hover:underline">
          ← Back to owner admin
        </Link>
        <div className="mt-4">
          <SchoolDashboard orgId={id} viewingAsOwner />
        </div>
      </div>
    </section>
  );
}
