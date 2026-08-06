import * as Icons from "lucide-react";

/** Reusable empty state for dashboards. */
export function EmptyState({
  icon = "Inbox",
  title,
  body,
  action,
}: {
  icon?: keyof typeof Icons;
  title: string;
  body: string;
  action?: React.ReactNode;
}) {
  const IconCmp = (Icons[icon] as Icons.LucideIcon) ?? Icons.Inbox;
  return (
    <div className="rounded-xl border border-dashed bg-secondary/30 p-10 text-center">
      <IconCmp className="mx-auto h-8 w-8 text-muted-foreground" />
      <p className="mt-3 font-medium text-foreground">{title}</p>
      <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">{body}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
