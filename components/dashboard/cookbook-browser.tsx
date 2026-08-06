"use client";

import { useMemo, useState } from "react";
import { Search, Copy, Check, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Recipe } from "@/lib/types";

export function CookbookBrowser({ recipes }: { recipes: Recipe[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [grade, setGrade] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(recipes.map((r) => r.category))).sort()],
    [recipes]
  );
  const grades = useMemo(
    () => ["All", ...Array.from(new Set(recipes.map((r) => r.grade_band))).sort()],
    [recipes]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return recipes.filter((r) => {
      if (category !== "All" && r.category !== category) return false;
      if (grade !== "All" && r.grade_band !== grade) return false;
      if (!q) return true;
      return (
        r.title.toLowerCase().includes(q) ||
        r.summary.toLowerCase().includes(q) ||
        r.prompt_text.toLowerCase().includes(q)
      );
    });
  }, [recipes, query, category, grade]);

  const selectCls =
    "h-10 rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search prompts…"
            className="pl-9"
            aria-label="Search prompts"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={selectCls}
          aria-label="Filter by category"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c === "All" ? "All categories" : c}
            </option>
          ))}
        </select>
        <select
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          className={selectCls}
          aria-label="Filter by grade band"
        >
          {grades.map((g) => (
            <option key={g} value={g}>
              {g === "All" ? "All grades" : g}
            </option>
          ))}
        </select>
      </div>

      <p className="mt-4 text-sm text-muted-foreground" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "prompt" : "prompts"}
      </p>

      {filtered.length === 0 ? (
        <div className="mt-6 rounded-xl border border-dashed bg-secondary/30 p-10 text-center">
          <BookOpen className="mx-auto h-8 w-8 text-muted-foreground" />
          <p className="mt-3 font-medium text-foreground">No prompts match your filters</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try clearing the search or picking a different category.
          </p>
        </div>
      ) : (
        <div className="mt-4 space-y-4">
          {filtered.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}

function RecipeCard({ recipe }: { recipe: Recipe }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(recipe.prompt_text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked — no-op */
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="font-semibold text-primary">{recipe.title}</h3>
          <div className="mt-1 flex flex-wrap gap-2">
            <Badge variant="secondary">{recipe.category}</Badge>
            <Badge variant="muted">{recipe.grade_band}</Badge>
          </div>
        </div>
        <Button size="sm" variant="outline" onClick={copy} aria-label="Copy prompt">
          {copied ? <><Check className="text-success" /> Copied</> : <><Copy /> Copy</>}
        </Button>
      </div>
      {recipe.summary && (
        <p className="mt-3 text-sm text-muted-foreground">{recipe.summary}</p>
      )}
      <pre className="mt-3 whitespace-pre-wrap rounded-lg bg-secondary/60 p-4 font-sans text-sm text-foreground">
        {recipe.prompt_text}
      </pre>
    </div>
  );
}
