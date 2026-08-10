"use client";

import { useActionState } from "react";
import { inviteStaff, type InviteResult } from "@/lib/actions/staff";

export function InviteForm() {
  const [result, formAction, pending] = useActionState<InviteResult | null, FormData>(
    inviteStaff,
    null
  );

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="emails" className="mb-1 block text-sm font-semibold text-navy">
          Staff emails
        </label>
        <textarea
          id="emails"
          name="emails"
          rows={5}
          required
          placeholder={"one@school.org\ntwo@school.org\nthree@school.org"}
          className="w-full rounded-btn border border-mist bg-white px-4 py-3 text-sm text-navy outline-none focus:border-teal"
        />
        <p className="mt-1 text-xs text-muted">
          Paste one per line (commas work too). Each teacher gets a one-click
          link that connects their seat; no payment on their end.
        </p>
      </div>

      {result ? (
        <div
          className={`rounded-btn px-4 py-3 text-sm ${
            result.ok ? "bg-teal/10 text-navy" : "bg-red-50 text-red-700"
          }`}
        >
          <p>{result.message}</p>
          {result.manualLinks ? (
            <ul className="mt-2 space-y-2 break-all text-xs">
              {result.manualLinks.map((l) => (
                <li key={l.email}>
                  <span className="font-semibold">{l.email}:</span> {l.url}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="rounded-btn bg-teal px-5 py-3 font-semibold text-white hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "Sending invites…" : "Send invites"}
      </button>
    </form>
  );
}
