import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard/dashboard-shell";
import { EmptyState } from "@/components/dashboard/empty-state";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AddCourseForm, AddLessonForm, DeleteCourseButton } from "./pd-owner-forms";
import { getCourses } from "@/lib/data";
import { roleLabel } from "@/lib/nav";

export const metadata = { title: "Manage PD" };

export default async function OwnerPdPage() {
  const courses = await getCourses();

  return (
    <>
      <DashboardHeader
        title="Manage PD"
        description="Build the self-paced PD library: add courses to a pillar, then add lessons. To edit an item, delete it and add the new version."
      />

      <div className="space-y-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Add a course</CardTitle>
              <CardDescription>Assign it to a pillar and audience.</CardDescription>
            </CardHeader>
            <CardContent>
              <AddCourseForm />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Add a lesson</CardTitle>
              <CardDescription>Scripted, self-paced content for a course.</CardDescription>
            </CardHeader>
            <CardContent>
              {courses.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Add a course first, then you can add lessons to it.
                </p>
              ) : (
                <AddLessonForm courses={courses.map((c) => ({ id: c.id, title: c.title }))} />
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle>Courses</CardTitle>
            <Badge variant="muted">{courses.length}</Badge>
          </CardHeader>
          <CardContent>
            {courses.length === 0 ? (
              <EmptyState icon="GraduationCap" title="No courses yet" body="Add your first course above, or load the seed content." />
            ) : (
              <ul className="divide-y">
                {courses.map((c) => (
                  <li key={c.id} className="flex items-center justify-between gap-2 py-2">
                    <div className="min-w-0">
                      <Link href={`/dashboard/pd/${c.id}`} className="truncate text-sm font-medium text-foreground hover:underline">
                        {c.title}
                      </Link>
                      <p className="text-xs text-muted-foreground">
                        {c.pillar} · {c.audience} · {c.est_minutes} min · {roleLabel(c.min_role)}
                      </p>
                    </div>
                    <DeleteCourseButton id={c.id} label={c.title} />
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
