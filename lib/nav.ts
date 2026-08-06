import type { SessionUser } from "@/lib/types";

/** Where a signed-in user's "Dashboard" button should take them. */
export function dashboardPathFor(user: SessionUser): string {
  switch (user.profile.role) {
    case "owner":
      return "/owner";
    case "school_admin":
      return "/admin-school";
    default:
      return "/dashboard";
  }
}

export function roleLabel(role: SessionUser["profile"]["role"]): string {
  switch (role) {
    case "owner":
      return "Owner";
    case "school_admin":
      return "School Admin";
    default:
      return "Teacher";
  }
}
