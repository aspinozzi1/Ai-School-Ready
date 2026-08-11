"use client";

import { useMemo, useState, useTransition } from "react";
import { Check, Copy, Pencil, Trash2 } from "lucide-react";
import {
  gradeBands,
  subjects,
  taskTypeLabel,
  taskTypes,
  type PromptRow,
} from "@/lib/prompts";
import { deletePrompt, updatePrompt } from "@/lib/actions/prompts";
import { PromptFields } from "@/components/prompts/prompt-fields";

export interface PromptListItem extends PromptRow {
  /** Display name for the teacher who wrote it; null for starter prompts. */
  authorName: string | null;
  canEdit: boolean;
}

const selectClass =
  "rounded-btn border border-mist bg-white px-3 py-2 text-sm text-navy outline-none focus:border-teal";

export function PromptList({ prompts }: { prompts: PromptListItem[] }) {
  const [query, setQuery] = useState("");
  const [taskType, setTaskType] = useState("all");
  const [subject, setSubject] = useState("all");
  const [gradeBand, setGradeBand] = useState("all");
  const [editingId, setEditingId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return prompts.filter((p) => {
      if (taskType !== "all" && p.task_type !== taskType) return false;
      if (subject !== "all" && p.subject !== subject) return false;
      if (gradeBand !== "all" && p.grade_band !== gradeBand) return false;
      if (
        q &&
        !p.title.toLowerCase().includes(q) &&
        !p.body.toLowerCase().includes(q)
      ) {
        return false;
      }
      return true;
    });
  }, [prompts, query, taskType, subject, gradeBand]);

  return (
    <div>
      <div className="rounded-card border border-mist bg-white p-5">
        <div className="flex flex-wrap gap-3">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search prompts"
            aria-label="Search prompts"
            className="min-w-50 flex-1 rounded-btn border border-mist bg-white px-4 py-2 text-sm text-navy outline-none focus:border-teal"
          />
          <select
            value={taskType}
            onChange={(e) => setTaskType(e.target.value)}
            aria-label="Filter by task"
            className={selectClass}
          >
            <option value="all">All tasks</option>
            {taskTypes.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            aria-label="Filter by subject"
            className={selectClass}
          >
            <option value="all">All subjects</option>
            {subjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <select
            value={gradeBand}
            onChange={(e) => setGradeBand(e.target.value)}
            aria-label="Filter by grades"
            className={selectClass}
          >
            <option value="all">All grades</option>
            {gradeBands.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>
        <p className="mt-3 text-xs text-muted">
          Showing {filtered.length} of {prompts.length}
        </p>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-6 rounded-card border border-mist bg-white p-7 text-center text-sm text-muted">
          No prompts match those filters yet.
        </p>
      ) : (
        <ul className="mt-6 space-y-4">
          {filtered.map((p) => (
            <li key={p.id}>
              {editingId === p.id ? (
                <EditCard prompt={p} onDone={() => setEditingId(null)} />
              ) : (
                <PromptCard prompt={p} onEdit={() => setEditingId(p.id)} />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function PromptCard({
  prompt,
  onEdit,
}: {
  prompt: PromptListItem;
  onEdit: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const [pending, startTransition] = useTransition();

  async function copy() {
    try {
      await navigator.clipboard.writeText(prompt.body);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked: the prompt text is on screen to select by hand.
    }
  }

  function remove() {
    if (!window.confirm(`Delete "${prompt.title}" from the library?`)) return;
    startTransition(() => {
      void deletePrompt(prompt.id);
    });
  }

  return (
    <div className="rounded-card border border-mist bg-white p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-bold text-navy">{prompt.title}</h3>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted">
            <span className="rounded-full bg-teal/10 px-2.5 py-0.5 font-semibold text-teal">
              {taskTypeLabel(prompt.task_type)}
            </span>
            {prompt.subject ? <span>{prompt.subject}</span> : null}
            {prompt.grade_band ? <span>· {prompt.grade_band}</span> : null}
            {prompt.source === "starter" ? (
              <span className="rounded-full bg-amber/20 px-2.5 py-0.5 font-semibold text-navy">
                Starter
              </span>
            ) : prompt.authorName ? (
              <span>· {prompt.authorName}</span>
            ) : null}
          </div>
        </div>
        <button
          type="button"
          onClick={copy}
          className="flex shrink-0 items-center gap-2 rounded-btn bg-teal px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <pre className="mt-4 whitespace-pre-wrap rounded-btn bg-paper px-4 py-3 font-sans text-sm text-navy">
        {prompt.body}
      </pre>

      {prompt.canEdit ? (
        <div className="mt-4 flex gap-4 text-xs font-semibold">
          <button
            type="button"
            onClick={onEdit}
            className="flex items-center gap-1.5 text-muted hover:text-teal"
          >
            <Pencil className="h-3.5 w-3.5" /> Edit
          </button>
          <button
            type="button"
            onClick={remove}
            disabled={pending}
            className="flex items-center gap-1.5 text-muted hover:text-red-600 disabled:opacity-50"
          >
            <Trash2 className="h-3.5 w-3.5" /> {pending ? "Deleting…" : "Delete"}
          </button>
        </div>
      ) : null}
    </div>
  );
}

function EditCard({
  prompt,
  onDone,
}: {
  prompt: PromptListItem;
  onDone: () => void;
}) {
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function submit(formData: FormData) {
    startTransition(async () => {
      const result = await updatePrompt(prompt.id, formData);
      if (result.ok) {
        onDone();
      } else {
        setError(result.message);
      }
    });
  }

  return (
    <div className="rounded-card border border-teal bg-white p-6">
      <h3 className="font-bold text-navy">Edit prompt</h3>
      <form action={submit} className="mt-4 space-y-4">
        <PromptFields idPrefix={`edit-${prompt.id}`} prompt={prompt} />

        {error ? (
          <p className="rounded-btn bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        ) : null}

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={pending}
            className="rounded-btn bg-teal px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50"
          >
            {pending ? "Saving…" : "Save changes"}
          </button>
          <button
            type="button"
            onClick={onDone}
            className="rounded-btn bg-paper px-5 py-2.5 text-sm font-semibold text-navy ring-1 ring-mist hover:bg-white"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
