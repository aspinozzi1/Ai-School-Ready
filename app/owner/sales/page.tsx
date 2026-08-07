import { ExternalLink } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { products } from "@/config/site";
import { formatPrice } from "@/lib/utils";

export const metadata = { title: "Sales" };

export default async function OwnerSalesPage() {
  const supabase = await createSupabaseServerClient();

  const licenses = supabase
    ? ((await supabase.from("licenses").select("product, status")).data ?? [])
    : [];
  const leads = supabase
    ? (await supabase.from("leads").select("*", { count: "exact", head: true })).count ?? 0
    : 0;

  const teacherKits = licenses.filter((l) => l.product === "teacher_kit" && l.status === "active").length;
  const schoolLicenses = licenses.filter((l) => l.product === "school_license" && l.status === "active").length;
  const mrrLike = teacherKits * products.teacher_kit.price + schoolLicenses * products.school_license.price;

  const rows = [
    { label: "Active Teacher Kits", value: teacherKits },
    { label: "Active School Licenses", value: schoolLicenses },
    { label: "Free-sample leads", value: leads },
  ];

  return (
    <>
      <DashboardHeader
        title="Sales summary"
        description="A quick snapshot. For payments, refunds, and detailed reporting, use Stripe directly."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {rows.map((r) => (
          <Card key={r.label}>
            <CardContent className="p-5">
              <p className="text-3xl font-bold text-foreground">{r.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{r.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Estimated active value</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-primary">{formatPrice(mrrLike)}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Teacher Kits (one-time) + School Licenses (annual), counting active
            licenses only. This is a rough figure — Stripe is the source of truth.
          </p>
          <Button asChild className="mt-4" variant="outline">
            <a href="https://dashboard.stripe.com" target="_blank" rel="noopener noreferrer">
              <ExternalLink /> Open Stripe dashboard
            </a>
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
