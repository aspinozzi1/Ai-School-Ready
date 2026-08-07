import { DashboardHeader } from "@/components/dashboard/dashboard-shell";
import { DownloadList } from "@/components/dashboard/download-list";
import { EmptyState } from "@/components/dashboard/empty-state";
import { getResources } from "@/lib/data";

export const metadata = { title: "Kit downloads" };

export default async function AdminDownloadsPage() {
  // RLS returns everything a school_admin is entitled to: the Governance Pack,
  // PD deck, Rollout Playbook, and the teacher handout.
  const resources = await getResources();

  return (
    <>
      <DashboardHeader
        title="Kit downloads"
        description="Everything in your School License — the Governance Pack, the PD deck, the Rollout Playbook, and teacher files. Links open securely and expire."
      />
      {resources.length === 0 ? (
        <EmptyState
          icon="Download"
          title="No downloads yet"
          body="Your kit assets appear here once your license is provisioned (or after you run the seed script)."
        />
      ) : (
        <DownloadList resources={resources} />
      )}
    </>
  );
}
