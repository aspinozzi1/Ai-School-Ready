import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DashboardHeader } from "@/components/dashboard/dashboard-shell";
import { PdCourseViewer } from "@/components/dashboard/pd-course-viewer";
import { getCourse, getCompletedLessonIds } from "@/lib/data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ course: string }>;
}) {
  const { course } = await params;
  const result = await getCourse(course);
  return { title: result ? result.course.title : "Course" };
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ course: string }>;
}) {
  const { course: courseId } = await params;
  const [result, completed] = await Promise.all([
    getCourse(courseId),
    getCompletedLessonIds(),
  ]);
  if (!result) notFound();

  const { course, lessons } = result;

  return (
    <>
      <Link
        href="/dashboard/pd"
        className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> All PD
      </Link>

      <div className="mt-3">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <Badge variant="secondary">{course.pillar}</Badge>
          <Badge variant="muted">{course.audience}</Badge>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {course.est_minutes} min
          </span>
        </div>
        <DashboardHeader title={course.title} description={course.summary} />
      </div>

      {lessons.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          This course doesn&apos;t have any lessons yet.
        </p>
      ) : (
        <PdCourseViewer
          lessons={lessons.map((l) => ({ id: l.id, title: l.title, body: l.body }))}
          initialCompleted={lessons
            .filter((l) => completed.has(l.id))
            .map((l) => l.id)}
        />
      )}
    </>
  );
}
