export type Role = "teacher" | "school_admin" | "owner";

export type LicenseStatus = "active" | "inactive";
export type ProductType = "teacher_kit" | "school_license";

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  role: Role;
  org_id: string | null;
  created_at: string;
}

export interface Organization {
  id: string;
  name: string;
  plan: string;
  license_status: LicenseStatus;
  seats_limit: number | null;
  stripe_customer_id: string | null;
  created_at: string;
}

export interface License {
  id: string;
  user_id: string | null;
  org_id: string | null;
  product: ProductType;
  status: LicenseStatus;
  stripe_ref: string | null;
  current_period_end: string | null;
}

export interface Recipe {
  id: string;
  title: string;
  subject: string;
  category: string;
  grade_band: string;
  summary: string;
  prompt_text: string;
  min_role: Role;
}

export interface Resource {
  id: string;
  title: string;
  description: string | null;
  type: "file" | "link";
  file_path: string | null;
  category: string;
  min_role: Role;
  created_at: string;
}

export interface RolloutStep {
  id: string;
  org_id: string;
  step_key: string;
  title: string;
  is_complete: boolean;
}

export interface Invite {
  id: string;
  org_id: string;
  email: string;
  status: "pending" | "accepted";
  token: string;
}

/** The signed-in user, enriched with role + whether they have active access. */
export interface SessionUser {
  id: string;
  email: string;
  profile: Profile;
  /** True when the user has an active license (self or via org). */
  hasActiveAccess: boolean;
}

/** Rank roles so we can do "role >= required" checks. Higher = more access. */
export const roleRank: Record<Role, number> = {
  teacher: 1,
  school_admin: 2,
  owner: 3,
};

export function roleAtLeast(role: Role, required: Role): boolean {
  return roleRank[role] >= roleRank[required];
}
