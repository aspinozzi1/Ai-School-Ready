/**
 * The default 6-step rollout checklist. Used in two places:
 *  - the Stripe webhook seeds these rows for each new school, and
 *  - the seed script / admin portal reference them.
 * Keeping the template here is the single source of truth.
 */
export const defaultRolloutSteps = [
  {
    step_key: "review_policy",
    title: "Review and adopt the AI policy",
    sort_order: 1,
  },
  {
    step_key: "customize_parent_letter",
    title: "Customize the parent letter for your school",
    sort_order: 2,
  },
  {
    step_key: "schedule_pd",
    title: "Schedule the 45-minute staff training",
    sort_order: 3,
  },
  {
    step_key: "run_pd",
    title: "Run the PD session with the included script",
    sort_order: 4,
  },
  {
    step_key: "invite_staff",
    title: "Invite your teachers to their Cookbook seats",
    sort_order: 5,
  },
  {
    step_key: "launch_cookbook",
    title: "Point staff to the Prompt Cookbook — you're live",
    sort_order: 6,
  },
] as const;
