import Link from "next/link";
import { Download, Users, Lock } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/dashboard-shell";
import { RolloutChecklist } from "@/components/dashboard/rollout-checklist";
import { EmptyState } from "@/components/dashboard/empty-state";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getSessionUser } from "@/lib/auth";
import { getOrganization, getRolloutSteps } from "@/lib/data";

export const metadata = { title: "Rollout" };

export default async function AdminSchoolOverview() {
  const user = await getSessionUser();
  const orgId = user?.profile.org_id ?? null;

  if (!orgId) {
    return (
      <>
        <DashboardHeader title="Rollout" description="Your step-by-step plan to go live." />
        <EmptyState
          icon="Building2"
          title="No school linked to this account"
          body="This portal is scoped to a school. Buy a School License to set one up, or use the Owner Admin if you're the site owner."
          action={
            <Button asChild>
              <Link href="/pricing">See the School License</Link>
            </Button>
          }
        />
      </>
    );
  }

  const [org, steps] = await Promise.all([
    getOrganization(orgId),
    getRolloutSteps(orgId),
  ]);

  return (
    <>
      <DashboardHeader
        title={org ? `${org.name} — rollout` : "Rollout"}
        description="Work down the checklist. You can go from zero to trained staff in a week."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent/10 text-accent">
                <Download className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-foreground">Kit downloads</p>
                <p className="text-sm text-muted-foreground">Policy, PD deck, playbook</p>
              </div>
            </div>
            <Button asChild size="sm" variant="outline">
              <Link href="/admin-school/downloads">Open</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent/10 text-accent">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-foreground">Your staff</p>
                <p className="text-sm text-muted-foreground">Invite & manage teachers</p>
              </div>
            </div>
            <Button asChild size="sm" variant="outline">
              <Link href="/admin-school/staff">Manage</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <h2 className="mb-3 text-lg font-semibold text-primary">Rollout checklist</h2>
        {steps.length === 0 ? (
          <EmptyState
            icon="ListChecks"
            title="Your checklist is being set up"
            body="Your rollout steps appear here once your license is provisioned."
          />
        ) : (
          <RolloutChecklist steps={steps} />
        )}
      </div>

      <Card className="mt-6 border-accent/30 bg-accent/5">
        <CardContent className="flex items-start gap-3 p-5">
          <Lock className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">One hard rule for your staff:</span>{" "}
            never put student personal information into a public AI tool. It&apos;s
            built into every prompt and every policy in your kit.
          </p>
        </CardContent>
      </Card>
    </>
  );
}
