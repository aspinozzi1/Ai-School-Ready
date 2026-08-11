"use client";

import { gradeBands, subjects, taskTypes, type PromptRow } from "@/lib/prompts";

const inputClass =
  "w-full rounded-btn border border-mist bg-white px-4 py-3 text-sm text-navy outline-none focus:border-teal";

/**
 * The prompt fields, shared by the add form and the inline edit form so the
 * two never drift apart.
 */
export function PromptFields({
  idPrefix,
  prompt,
}: {
  idPrefix: string;
  prompt?: PromptRow;
}) {
  return (
    <>
      <div>
        <label
          htmlFor={`${idPrefix}-title`}
          className="mb-1 block text-sm font-semibold text-navy"
        >
          Title
        </label>
        <input
          id={`${idPrefix}-title`}
          name="title"
          required
          maxLength={120}
          defaultValue={prompt?.title}
          placeholder="Weekly review questions"
          className={inputClass}
        />
      </div>

      <div>
        <label
          htmlFor={`${idPrefix}-body`}
          className="mb-1 block text-sm font-semibold text-navy"
        >
          The prompt
        </label>
        <textarea
          id={`${idPrefix}-body`}
          name="body"
          rows={6}
          required
          maxLength={4000}
          defaultValue={prompt?.body}
          placeholder="You are a [GRADE/SUBJECT] teacher. Create a [NUMBER]-question review on [TOPIC]…"
          className={inputClass}
        />
        <p className="mt-1 text-xs text-muted">
          Paste it exactly as you use it. Brackets mark what the next teacher
          fills in.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label
            htmlFor={`${idPrefix}-taskType`}
            className="mb-1 block text-sm font-semibold text-navy"
          >
            Task
          </label>
          <select
            id={`${idPrefix}-taskType`}
            name="taskType"
            defaultValue={prompt?.task_type ?? "planning"}
            className={inputClass}
          >
            {taskTypes.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor={`${idPrefix}-subject`}
            className="mb-1 block text-sm font-semibold text-navy"
          >
            Subject
          </label>
          <select
            id={`${idPrefix}-subject`}
            name="subject"
            defaultValue={prompt?.subject ?? "Any subject"}
            className={inputClass}
          >
            {subjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor={`${idPrefix}-gradeBand`}
            className="mb-1 block text-sm font-semibold text-navy"
          >
            Grades
          </label>
          <select
            id={`${idPrefix}-gradeBand`}
            name="gradeBand"
            defaultValue={prompt?.grade_band ?? "All grades"}
            className={inputClass}
          >
            {gradeBands.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}
