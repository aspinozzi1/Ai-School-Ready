import Link from "next/link";
import { Users, Building2, KeyRound, Mail, ArrowRight } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata = { title: "Owner Admin" };

export default async function OwnerOverview() {
  const supabase = await createSupabaseServerClient();

  const [users, schools, leads, activeLicenses] = supabase
    ? await Promise.all([
        supabase.from("profiles").select("*", { count: "exact", head: true }).then((r) => r.count ?? 0),
        supabase.from("organizations").select("*", { count: "exact", head: true }).then((r) => r.count ?? 0),
        supabase.from("leads").select("*", { count: "exact", head: true }).then((r) => r.count ?? 0),
        supabase
          .from("licenses")
          .select("*", { count: "exact", head: true })
          .eq("status", "active")
          .then((r) => r.count ?? 0),
      ])
    : [0, 0, 0, 0];

  const stats = [
    { label: "Users", value: users, icon: Users, href: "/owner/users" },
    { label: "Schools", value: schools, icon: Building2, href: "/owner/users" },
    { label: "Active licenses", value: activeLicenses, icon: KeyRound, href: "/owner/sales" },
    { label: "Leads", value: leads, icon: Mail, href: "/owner/sales" },
  ];

  return (
    <>
      <DashboardHeader
        title="Owner Admin"
        description="Manage resources, view users and schools, and check your numbers."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent/10 text-accent">
                  <s.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{s.value}</p>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <QuickLink href="/owner/resources" title="Manage resources" body="Add or remove Cookbook recipes and downloadable files." />
        <QuickLink href="/owner/users" title="Users & schools" body="See who's signed up and their license status." />
        <QuickLink href="/owner/sales" title="Sales summary" body="Counts and a link to your Stripe dashboard." />
      </div>
    </>
  );
}

function QuickLink({ href, title, body }: { href: string; title: string; body: string }) {
  return (
    <Card>
      <CardContent className="flex h-full flex-col p-5">
        <h2 className="font-semibold text-primary">{title}</h2>
        <p className="mt-1 flex-1 text-sm text-muted-foreground">{body}</p>
        <Button asChild variant="link" className="mt-2 h-auto justify-start p-0">
          <Link href={href}>
            Open <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
