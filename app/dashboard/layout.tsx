import { requireAccess } from "@/lib/auth";
import { AccessScreen } from "@/components/dashboard/access-screen";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import type { NavItem } from "@/components/dashboard/sidebar-nav";

const teacherNav: NavItem[] = [
  { title: "Overview", href: "/dashboard", icon: "LayoutDashboard" },
  { title: "PD Courses", href: "/dashboard/pd", icon: "GraduationCap" },
  { title: "Cookbook", href: "/dashboard/cookbook", icon: "BookOpen" },
  { title: "Downloads", href: "/dashboard/downloads", icon: "Download" },
  { title: "Account", href: "/dashboard/account", icon: "User" },
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Gate: signed in + active teacher-or-higher access. (flow-integrity rule #5)
  const gate = await requireAccess("teacher");
  if (!gate.ok) {
    return <AccessScreen reason={gate.reason} user={gate.user} area="the teacher dashboard" />;
  }

  return (
    <DashboardShell navItems={teacherNav} areaLabel="Teacher">
      {children}
    </DashboardShell>
  );
}
