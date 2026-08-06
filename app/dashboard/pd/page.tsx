import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/dashboard-shell";
import { EmptyState } from "@/components/dashboard/empty-state";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/icon";
import { getCourses, getCompletedLessonIds } from "@/lib/data";
import { PILLARS } from "@/config/pillars";

export const metadata = { title: "Professional Development" };

export default async function PdLibraryPage() {
  const [courses, completed] = await Promise.all([
    getCourses(),
    getCompletedLessonIds(),
  ]);

  // Group courses under their pillar, in the canonical pillar order.
  const byPillar = new Map<string, typeof courses>();
  for (const c of courses) {
    const list = byPillar.get(c.pillar) ?? [];
    list.push(c);
    byPillar.set(c.pillar, list);
  }
  const orderedPillars = [
    ...PILLARS.filter((p) => byPillar.has(p.name)),
    // any pillar names not in the config list, appended
    ...[...byPillar.keys()]
      .filter((name) => !PILLARS.some((p) => p.name === name))
      .map((name) => ({ name, blurb: "", icon: "BookOpen" })),
  ];

  return (
    <>
      <DashboardHeader
        title="Professional Development"
        description="Self-paced AI PD, organized into pillars. Work at your own pace — your progress is saved as you go."
      />

      {courses.length === 0 ? (
        <EmptyState
          icon="BookOpen"
          title="Courses are being set up"
          body="Once your PD library is loaded, self-paced courses will appear here, grouped by pillar."
        />
      ) : (
        <div className="space-y-10">
          {orderedPillars.map((pillar) => {
            const pillarCourses = byPillar.get(pillar.name) ?? [];
            return (
              <section key={pillar.name} aria-label={pillar.name}>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                    <Icon name={pillar.icon} className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">{pillar.name}</h2>
                    {pillar.blurb && (
                      <p className="text-sm text-muted-foreground">{pillar.blurb}</p>
                    )}
                  </div>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {pillarCourses.map((course) => (
                    <Link key={course.id} href={`/dashboard/pd/${course.id}`}>
                      <Card className="h-full transition-shadow hover:shadow-md">
                        <CardContent className="flex h-full flex-col p-5">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Badge variant="secondary">{course.audience}</Badge>
                            <span className="inline-flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" /> {course.est_minutes} min
                            </span>
                          </div>
                          <h3 className="mt-2 font-semibold text-primary">{course.title}</h3>
                          {course.summary && (
                            <p className="mt-1 flex-1 text-sm text-muted-foreground">
                              {course.summary}
                            </p>
                          )}
                          <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                            Start course <ArrowRight className="h-4 w-4" />
                          </span>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
          <p className="text-xs text-muted-foreground">
            {completed.size > 0
              ? `You've completed ${completed.size} lesson${completed.size === 1 ? "" : "s"} so far.`
              : "Tip: open a course and mark each lesson complete as you finish it."}
          </p>
        </div>
      )}
    </>
  );
}
