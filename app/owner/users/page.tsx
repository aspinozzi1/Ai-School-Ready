import { DashboardHeader } from "@/components/dashboard/dashboard-shell";
import { EmptyState } from "@/components/dashboard/empty-state";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";
import { roleLabel } from "@/lib/nav";
import type { Role } from "@/lib/types";

export const metadata = { title: "Users & schools" };

export default async function OwnerUsersPage() {
  const supabase = await createSupabaseServerClient();

  const [profilesRes, orgsRes, licensesRes] = supabase
    ? await Promise.all([
        supabase.from("profiles").select("*").order("created_at", { ascending: false }),
        supabase.from("organizations").select("*").order("created_at", { ascending: false }),
        supabase.from("licenses").select("*"),
      ])
    : [{ data: [] }, { data: [] }, { data: [] }];

  const profiles = (profilesRes.data ?? []) as {
    id: string; email: string; full_name: string | null; role: Role; org_id: string | null; created_at: string;
  }[];
  const orgs = (orgsRes.data ?? []) as {
    id: string; name: string; license_status: string; created_at: string;
  }[];
  const licenses = (licensesRes.data ?? []) as { status: string; product: string }[];

  const activeCount = licenses.filter((l) => l.status === "active").length;

  return (
    <>
      <DashboardHeader
        title="Users & schools"
        description="Everyone who's signed up, and every school license."
      />

      <div className="space-y-6">
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle>Schools ({orgs.length})</CardTitle>
            <Badge variant="muted">{activeCount} active licenses</Badge>
          </CardHeader>
          <CardContent>
            {orgs.length === 0 ? (
              <EmptyState icon="Building2" title="No schools yet" body="Schools appear here after a School License is purchased." />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-muted-foreground">
                      <th className="py-2 pr-4 font-medium">School</th>
                      <th className="py-2 pr-4 font-medium">Status</th>
                      <th className="py-2 font-medium">Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orgs.map((o) => (
                      <tr key={o.id} className="border-b last:border-0">
                        <td className="py-2 pr-4 font-medium text-foreground">{o.name}</td>
                        <td className="py-2 pr-4">
                          <Badge variant={o.license_status === "active" ? "success" : "muted"}>
                            {o.license_status}
                          </Badge>
                        </td>
                        <td className="py-2 text-muted-foreground">{formatDate(o.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Users ({profiles.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {profiles.length === 0 ? (
              <EmptyState icon="Users" title="No users yet" body="Users appear here after they sign up or are provisioned." />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-muted-foreground">
                      <th className="py-2 pr-4 font-medium">Email</th>
                      <th className="py-2 pr-4 font-medium">Name</th>
                      <th className="py-2 pr-4 font-medium">Role</th>
                      <th className="py-2 font-medium">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profiles.map((p) => (
                      <tr key={p.id} className="border-b last:border-0">
                        <td className="py-2 pr-4 font-medium text-foreground">{p.email}</td>
                        <td className="py-2 pr-4 text-muted-foreground">{p.full_name || "—"}</td>
                        <td className="py-2 pr-4">
                          <Badge variant={p.role === "owner" ? "accent" : "secondary"}>
                            {roleLabel(p.role)}
                          </Badge>
                        </td>
                        <td className="py-2 text-muted-foreground">{formatDate(p.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
