import { DashboardHeader } from "@/components/dashboard/dashboard-shell";
import { EmptyState } from "@/components/dashboard/empty-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ManageBillingButton } from "./manage-button";
import { getSessionUser } from "@/lib/auth";
import { getOrganization } from "@/lib/data";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { products } from "@/config/site";
import { formatDate, formatPrice } from "@/lib/utils";

export const metadata = { title: "Billing" };

export default async function BillingPage() {
  const user = await getSessionUser();
  const orgId = user?.profile.org_id ?? null;

  if (!orgId) {
    return (
      <>
        <DashboardHeader title="Billing" description="Manage your School License." />
        <EmptyState
          icon="CreditCard"
          title="No school linked to this account"
          body="Billing is available once you have a School License."
        />
      </>
    );
  }

  const org = await getOrganization(orgId);
  const supabase = await createSupabaseServerClient();
  const { data: license } = await supabase!
    .from("licenses")
    .select("current_period_end, status")
    .eq("org_id", orgId)
    .eq("product", "school_license")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle<{ current_period_end: string | null; status: string }>();

  const active = org?.license_status === "active";

  return (
    <>
      <DashboardHeader
        title="Billing"
        description="Your plan status and subscription. Payment details and invoices live in the secure Stripe portal."
      />

      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle>{products.school_license.name}</CardTitle>
          <Badge variant={active ? "success" : "muted"}>
            {active ? "Active" : "Inactive"}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between border-b py-2 text-sm">
            <span className="text-muted-foreground">Plan</span>
            <span className="font-medium">
              {formatPrice(products.school_license.price)} / year
            </span>
          </div>
          <div className="flex items-center justify-between border-b py-2 text-sm">
            <span className="text-muted-foreground">School</span>
            <span className="font-medium">{org?.name ?? "—"}</span>
          </div>
          <div className="flex items-center justify-between py-2 text-sm">
            <span className="text-muted-foreground">
              {active ? "Renews" : "Access through"}
            </span>
            <span className="font-medium">
              {license?.current_period_end
                ? formatDate(license.current_period_end)
                : "—"}
            </span>
          </div>

          {!active && (
            <p className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              Your license isn&apos;t active. Reactivate through the billing portal to
              restore staff access.
            </p>
          )}

          <div className="pt-2">
            <ManageBillingButton />
            <p className="mt-2 text-xs text-muted-foreground">
              Opens Stripe&apos;s secure portal to update payment, view invoices, or
              cancel.
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
