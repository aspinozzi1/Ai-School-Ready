import { DashboardHeader } from "@/components/dashboard/dashboard-shell";
import { DownloadList } from "@/components/dashboard/download-list";
import { EmptyState } from "@/components/dashboard/empty-state";
import { getResources } from "@/lib/data";

export const metadata = { title: "Downloads" };

export default async function DownloadsPage() {
  // RLS returns only resources this user's role is entitled to.
  const resources = await getResources();
  const teacherResources = resources.filter((r) => r.min_role === "teacher");

  return (
    <>
      <DashboardHeader
        title="Downloads"
        description="Your participant handout and teacher files. Files open in a new tab via a secure, expiring link."
      />
      {teacherResources.length === 0 ? (
        <EmptyState
          icon="Download"
          title="No downloads yet"
          body="Your teacher files will appear here once your account is set up (or after you run the seed script)."
        />
      ) : (
        <DownloadList resources={teacherResources} />
      )}
    </>
  );
}
