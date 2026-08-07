import { DashboardHeader } from "@/components/dashboard/dashboard-shell";
import { CookbookBrowser } from "@/components/dashboard/cookbook-browser";
import { EmptyState } from "@/components/dashboard/empty-state";
import { getRecipes } from "@/lib/data";

export const metadata = { title: "Prompt Cookbook" };

export default async function CookbookPage() {
  const recipes = await getRecipes();

  return (
    <>
      <DashboardHeader
        title="Prompt Cookbook"
        description="Search and filter classroom-ready prompts. Every one is privacy-safe — use placeholders, never real student data."
      />
      {recipes.length === 0 ? (
        <EmptyState
          icon="BookOpen"
          title="Your Cookbook is being set up"
          body="Once your account is provisioned (or you run the seed script), your prompts will appear here."
        />
      ) : (
        <CookbookBrowser recipes={recipes} />
      )}
    </>
  );
}
