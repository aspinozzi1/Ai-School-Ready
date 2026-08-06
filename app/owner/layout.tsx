import { requireAccess } from "@/lib/auth";
import { AccessScreen } from "@/components/dashboard/access-screen";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import type { NavItem } from "@/components/dashboard/sidebar-nav";

const ownerNav: NavItem[] = [
  { title: "Overview", href: "/owner", icon: "LayoutDashboard" },
  { title: "Resources", href: "/owner/resources", icon: "FolderCog" },
  { title: "Users", href: "/owner/users", icon: "Users" },
  { title: "Sales", href: "/owner/sales", icon: "BarChart3" },
];

export default async function OwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gate = await requireAccess("owner");
  if (!gate.ok) {
    return <AccessScreen reason={gate.reason} user={gate.user} area="the Owner Admin" />;
  }

  return (
    <DashboardShell navItems={ownerNav} areaLabel="Owner">
      {children}
    </DashboardShell>
  );
}
