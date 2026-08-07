"use client";

import { useState, useTransition } from "react";
import { CircleCheck, CircleDashed, Loader2, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toggleLessonComplete } from "@/lib/actions/pd";

type Lesson = { id: string; title: string; body: string };

export function PdCourseViewer({
  lessons,
  initialCompleted,
}: {
  lessons: Lesson[];
  initialCompleted: string[];
}) {
  const [completed, setCompleted] = useState<Set<string>>(
    new Set(initialCompleted)
  );
  const [active, setActive] = useState(0);
  const [pending, startTransition] = useTransition();

  const lesson = lessons[active];
  const doneCount = completed.size;
  const pct = Math.round((doneCount / lessons.length) * 100);
  const allDone = doneCount === lessons.length;

  function toggle(id: string) {
    const next = new Set(completed);
    const willComplete = !next.has(id);
    if (willComplete) next.add(id);
    else next.delete(id);
    setCompleted(next);
    startTransition(async () => {
      await toggleLessonComplete(id, willComplete);
    });
  }

  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-[260px_1fr]">
      {/* Lesson list + progress */}
      <aside>
        <div className="rounded-xl border bg-card p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-foreground">Progress</span>
            <span className="text-muted-foreground">
              {doneCount}/{lessons.length}
            </span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-accent transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
          {allDone && (
            <div className="mt-3 flex items-center gap-2 rounded-lg bg-success/10 p-2 text-xs font-medium text-success">
              <Award className="h-4 w-4" /> Course complete!
            </div>
          )}
        </div>

        <ol className="mt-3 space-y-1">
          {lessons.map((l, i) => {
            const done = completed.has(l.id);
            return (
              <li key={l.id}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm ${
                    i === active
                      ? "bg-secondary font-medium text-foreground"
                      : "text-muted-foreground hover:bg-secondary/60"
                  }`}
                >
                  {done ? (
                    <CircleCheck className="h-4 w-4 shrink-0 text-success" />
                  ) : (
                    <CircleDashed className="h-4 w-4 shrink-0 text-muted-foreground" />
                  )}
                  <span className="truncate">
                    {i + 1}. {l.title}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </aside>

      {/* Active lesson */}
      <section className="rounded-xl border bg-card p-6">
        <h2 className="text-xl font-semibold text-primary">{lesson.title}</h2>
        <div className="prose-content mt-4 whitespace-pre-wrap text-sm leading-relaxed text-foreground">
          {lesson.body}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3 border-t pt-4">
          <Button
            variant={completed.has(lesson.id) ? "outline" : "default"}
            onClick={() => toggle(lesson.id)}
            disabled={pending}
          >
            {pending ? (
              <><Loader2 className="animate-spin" /> Saving…</>
            ) : completed.has(lesson.id) ? (
              <><CircleCheck className="text-success" /> Completed</>
            ) : (
              <><CircleDashed /> Mark complete</>
            )}
          </Button>

          {active < lessons.length - 1 && (
            <Button variant="ghost" onClick={() => setActive((a) => a + 1)}>
              Next lesson →
            </Button>
          )}
        </div>
      </section>
    </div>
  );
}
