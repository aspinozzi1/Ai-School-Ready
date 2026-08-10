/** Shared account/access types used across auth, actions, and pages. */

export type Role = "teacher" | "school_admin" | "owner";

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
  license_status: "active" | "inactive";
  seats_limit: number | null;
  stripe_customer_id: string | null;
  created_at: string;
}

export interface License {
  id: string;
  user_id: string | null;
  org_id: string | null;
  product: "individual" | "school";
  status: "active" | "inactive";
  stripe_ref: string | null;
  current_period_end: string | null;
  created_at: string;
}

export interface Invite {
  id: string;
  org_id: string;
  email: string;
  status: "pending" | "accepted";
  token: string;
  created_at: string;
}

export interface SessionUser {
  id: string;
  email: string;
  profile: Profile;
  /** True when this user can open the member library right now. */
  hasActiveAccess: boolean;
}

const roleRank: Record<Role, number> = {
  teacher: 1,
  school_admin: 2,
  owner: 3,
};

export function roleAtLeast(actual: Role, required: Role): boolean {
  return roleRank[actual] >= roleRank[required];
}
