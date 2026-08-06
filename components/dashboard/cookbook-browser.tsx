"use client";

import { useMemo, useState } from "react";
import { Search, Copy, Check, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Recipe } from "@/lib/types";

export function CookbookBrowser({ recipes }: { recipes: Recipe[] }) {
  const [query, setQuery] = useState("");
  const [subject, setSubject] = useState("All");
  const [category, setCategory] = useState("All");
  const [grade, setGrade] = useState("All");

  const subjects = useMemo(
    () => ["All", ...Array.from(new Set(recipes.map((r) => r.subject))).sort()],
    [recipes]
  );
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
      if (subject !== "All" && r.subject !== subject) return false;
      if (category !== "All" && r.category !== category) return false;
      if (grade !== "All" && r.grade_band !== grade) return false;
      if (!q) return true;
      return (
        r.title.toLowerCase().includes(q) ||
        r.summary.toLowerCase().includes(q) ||
        r.prompt_text.toLowerCase().includes(q) ||
        r.subject.toLowerCase().includes(q)
      );
    });
  }, [recipes, query, subject, category, grade]);

  // Group the visible prompts into "packs" by subject, so the library stays
  // usable as it grows. Packs are sorted alphabetically; prompts within a pack
  // by grade band then title (matching the server order).
  const packs = useMemo(() => {
    const map = new Map<string, Recipe[]>();
    for (const r of filtered) {
      const list = map.get(r.subject) ?? [];
      list.push(r);
      map.set(r.subject, list);
    }
    return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  }, [filtered]);

  const selectCls =
    "h-10 rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

  return (
    <div>
      <div className="flex flex-col gap-3 lg:flex-row">
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
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className={selectCls}
          aria-label="Filter by subject"
        >
          {subjects.map((s) => (
            <option key={s} value={s}>
              {s === "All" ? "All subjects" : s}
            </option>
          ))}
        </select>
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
        {subject === "All" && packs.length > 1 ? ` across ${packs.length} subjects` : ""}
      </p>

      {filtered.length === 0 ? (
        <div className="mt-6 rounded-xl border border-dashed bg-secondary/30 p-10 text-center">
          <BookOpen className="mx-auto h-8 w-8 text-muted-foreground" />
          <p className="mt-3 font-medium text-foreground">No prompts match your filters</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try clearing the search or picking a different subject.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-8">
          {packs.map(([packSubject, packRecipes]) => (
            <section key={packSubject} aria-label={`${packSubject} pack`}>
              <div className="mb-3 flex items-center gap-3">
                <h2 className="font-semibold text-foreground">{packSubject}</h2>
                <span className="h-px flex-1 bg-border" />
                <Badge variant="muted">
                  {packRecipes.length} {packRecipes.length === 1 ? "prompt" : "prompts"}
                </Badge>
              </div>
              <div className="space-y-4">
                {packRecipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            </section>
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
            <Badge variant="secondary">{recipe.subject}</Badge>
            <Badge variant="muted">{recipe.category}</Badge>
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
