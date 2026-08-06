import { Container } from "@/components/marketing/section";
import { SidebarNav, type NavItem } from "@/components/dashboard/sidebar-nav";
import { Badge } from "@/components/ui/badge";

/** Two-column layout (sidebar + content) shared by all gated areas. */
export function DashboardShell({
  navItems,
  areaLabel,
  children,
}: {
  navItems: NavItem[];
  areaLabel: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b bg-secondary/30">
      <Container className="py-8">
        <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Badge variant="muted" className="mb-3">
              {areaLabel}
            </Badge>
            <SidebarNav items={navItems} />
          </aside>
          <div className="min-w-0">{children}</div>
        </div>
      </Container>
    </div>
  );
}

/** Standard heading block for a gated page. */
export function DashboardHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-primary">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
