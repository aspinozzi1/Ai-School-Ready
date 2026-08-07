import { requireAccess } from "@/lib/auth";
import { AccessScreen } from "@/components/dashboard/access-screen";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import type { NavItem } from "@/components/dashboard/sidebar-nav";

const adminNav: NavItem[] = [
  { title: "Rollout", href: "/admin-school", icon: "LayoutDashboard" },
  { title: "Downloads", href: "/admin-school/downloads", icon: "Download" },
  { title: "Staff", href: "/admin-school/staff", icon: "Users" },
  { title: "Billing", href: "/admin-school/billing", icon: "CreditCard" },
];

export default async function AdminSchoolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gate = await requireAccess("school_admin");
  if (!gate.ok) {
    return (
      <AccessScreen reason={gate.reason} user={gate.user} area="the administration portal" />
    );
  }

  return (
    <DashboardShell navItems={adminNav} areaLabel="Administration">
      {children}
    </DashboardShell>
  );
}
