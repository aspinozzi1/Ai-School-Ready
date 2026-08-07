import { NextResponse, type NextRequest } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { dashboardPathFor } from "@/lib/nav";

/** After sign-in, send each user to the right dashboard for their role. */
export async function GET(request: NextRequest) {
  const user = await getSessionUser();
  const nextParam = request.nextUrl.searchParams.get("next");
  const dest = nextParam || (user ? dashboardPathFor(user) : "/login");
  return NextResponse.redirect(new URL(dest, request.url));
}
