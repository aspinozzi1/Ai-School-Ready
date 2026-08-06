import { DashboardHeader } from "@/components/dashboard/dashboard-shell";
import { EmptyState } from "@/components/dashboard/empty-state";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AddRecipeForm, AddResourceForm, DeleteButton } from "./owner-forms";
import { getRecipes, getResources } from "@/lib/data";
import { roleLabel } from "@/lib/nav";

export const metadata = { title: "Manage resources" };

export default async function OwnerResourcesPage() {
  const [recipes, resources] = await Promise.all([getRecipes(), getResources()]);

  return (
    <>
      <DashboardHeader
        title="Manage resources"
        description="Add or remove Cookbook recipes and downloadable files. To edit an item, delete it and add the new version."
      />

      <div className="space-y-8">
        {/* Recipes */}
        <section>
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <Card>
              <CardHeader>
                <CardTitle>Add a Cookbook recipe</CardTitle>
                <CardDescription>Every prompt must be privacy-safe (use placeholders).</CardDescription>
              </CardHeader>
              <CardContent>
                <AddRecipeForm />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex-row items-center justify-between space-y-0">
                <CardTitle>Recipes</CardTitle>
                <Badge variant="muted">{recipes.length}</Badge>
              </CardHeader>
              <CardContent>
                {recipes.length === 0 ? (
                  <EmptyState icon="BookOpen" title="No recipes yet" body="Add your first recipe, or run the seed script." />
                ) : (
                  <ul className="divide-y">
                    {recipes.map((r) => (
                      <li key={r.id} className="flex items-center justify-between gap-2 py-2">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-foreground">{r.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {r.category} · {r.grade_band} · {roleLabel(r.min_role)}
                          </p>
                        </div>
                        <DeleteButton id={r.id} kind="recipe" label={r.title} />
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Resources */}
        <section>
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <Card>
              <CardHeader>
                <CardTitle>Add a download</CardTitle>
                <CardDescription>Upload a file or link out. Set the minimum role who can access it.</CardDescription>
              </CardHeader>
              <CardContent>
                <AddResourceForm />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex-row items-center justify-between space-y-0">
                <CardTitle>Downloads</CardTitle>
                <Badge variant="muted">{resources.length}</Badge>
              </CardHeader>
              <CardContent>
                {resources.length === 0 ? (
                  <EmptyState icon="Download" title="No downloads yet" body="Add your first file, or run the seed script." />
                ) : (
                  <ul className="divide-y">
                    {resources.map((r) => (
                      <li key={r.id} className="flex items-center justify-between gap-2 py-2">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-foreground">{r.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {r.category} · {r.type} · {roleLabel(r.min_role)}
                          </p>
                        </div>
                        <DeleteButton id={r.id} kind="resource" label={r.title} />
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </>
  );
}
