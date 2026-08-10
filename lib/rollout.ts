/**
 * The default rollout checklist seeded for every new school membership.
 * The school dashboard shows these; admins tick them off as the building
 * works through the launch sequence.
 */
export const defaultRolloutSteps = [
  {
    step_key: "invite_staff",
    title: "Invite your staff (Dashboard → Invite your staff)",
    sort_order: 1,
  },
  {
    step_key: "schedule_kit1",
    title: "Put Kit 1 on the PD calendar",
    sort_order: 2,
  },
  {
    step_key: "pick_facilitator",
    title: "Pick your facilitator (any confident colleague; the script does the rest)",
    sort_order: 3,
  },
  {
    step_key: "run_kit1",
    title: "Run Kit 1: AI Foundations & Safety",
    sort_order: 4,
  },
  {
    step_key: "start_prompt_doc",
    title: "Start the shared staff prompt doc (Kit 2's lab creates it)",
    sort_order: 5,
  },
  {
    step_key: "calendar_series",
    title: "Calendar the remaining Track A kits (one per week or month)",
    sort_order: 6,
  },
  {
    step_key: "celebrate_certificates",
    title: "Celebrate Track A completion (certificates at Kit 8)",
    sort_order: 7,
  },
] as const;
