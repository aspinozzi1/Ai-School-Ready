import { CheckCircle2, Clock, Users } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/dashboard-shell";
import { EmptyState } from "@/components/dashboard/empty-state";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InviteForm } from "./invite-form";
import { getSessionUser } from "@/lib/auth";
import { getPendingInvites } from "@/lib/data";

export const metadata = { title: "Staff" };

type InviteRow = { id: string; email: string; status: string };

export default async function StaffPage() {
  const user = await getSessionUser();
  const orgId = user?.profile.org_id ?? null;

  if (!orgId) {
    return (
      <>
        <DashboardHeader title="Staff" description="Invite and manage your teachers." />
        <EmptyState
          icon="Users"
          title="No school linked to this account"
          body="Staff management is available once you have a School License."
        />
      </>
    );
  }

  const invites = (await getPendingInvites(orgId)) as InviteRow[];
  const joined = invites.filter((i) => i.status === "accepted");
  const pending = invites.filter((i) => i.status === "pending");

  return (
    <>
      <DashboardHeader
        title="Staff"
        description="Invite teachers, then see who's joined. Invited teachers get Cookbook access with no separate payment."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Invite teachers</CardTitle>
          </CardHeader>
          <CardContent>
            <InviteForm />
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle className="flex items-center gap-2 text-base">
                <Users className="h-4 w-4 text-accent" /> Joined
              </CardTitle>
              <Badge variant="success">{joined.length}</Badge>
            </CardHeader>
            <CardContent>
              {joined.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No teachers have accepted yet. Invited teachers move here once they
                  set up their account.
                </p>
              ) : (
                <ul className="space-y-2">
                  {joined.map((i) => (
                    <li key={i.id} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />
                      <span className="truncate">{i.email}</span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle className="flex items-center gap-2 text-base">
                <Clock className="h-4 w-4 text-amber-foreground" /> Pending
              </CardTitle>
              <Badge variant="muted">{pending.length}</Badge>
            </CardHeader>
            <CardContent>
              {pending.length === 0 ? (
                <p className="text-sm text-muted-foreground">No pending invites.</p>
              ) : (
                <ul className="space-y-2">
                  {pending.map((i) => (
                    <li key={i.id} className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 shrink-0 text-muted-foreground" />
                      <span className="truncate">{i.email}</span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
