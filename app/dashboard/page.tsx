import Link from "next/link";
import { BookOpen, Download, ArrowRight, Lock, GraduationCap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DashboardHeader } from "@/components/dashboard/dashboard-shell";
import { getSessionUser } from "@/lib/auth";
import { getRecipes, getResources } from "@/lib/data";

export const metadata = { title: "Dashboard" };

export default async function DashboardOverview() {
  const [user, recipes, resources] = await Promise.all([
    getSessionUser(),
    getRecipes(),
    getResources(),
  ]);

  const firstName = user?.profile.full_name?.split(" ")[0] ?? "there";
  const teacherDownloads = resources.filter((r) => r.min_role === "teacher");

  return (
    <>
      <DashboardHeader
        title={`Welcome, ${firstName}`}
        description="Your Cookbook and downloads are unlocked. Here's where to start."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent/10 text-accent">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{recipes.length}</p>
                <p className="text-sm text-muted-foreground">prompts in your Cookbook</p>
              </div>
            </div>
            <Button asChild variant="link" className="mt-3 h-auto p-0">
              <Link href="/dashboard/cookbook">
                Open the Cookbook <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent/10 text-accent">
                <Download className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{teacherDownloads.length}</p>
                <p className="text-sm text-muted-foreground">files ready to download</p>
              </div>
            </div>
            <Button asChild variant="link" className="mt-3 h-auto p-0">
              <Link href="/dashboard/downloads">
                Go to downloads <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-4 border-accent/30 bg-accent/5">
        <CardContent className="flex items-start gap-3 p-6">
          <Lock className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
          <div>
            <h2 className="font-semibold text-primary">Remember the one hard rule</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Never put student personal information into a public AI tool. Every
              prompt here is written to keep you safe — use placeholders instead of
              real names.
            </p>
          </div>
        </CardContent>
      </Card>

      {user?.profile.role === "teacher" && (
        <Card className="mt-4">
          <CardContent className="flex flex-col items-start gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <h2 className="font-semibold text-primary">Lead a whole school?</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  The School License adds a board-ready policy, staff training, and
                  seats for your team.
                </p>
              </div>
            </div>
            <Button asChild variant="outline">
              <Link href="/pricing">See the School License</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </>
  );
}
