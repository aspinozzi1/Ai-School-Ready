import { DashboardHeader } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NameForm, PasswordForm } from "./account-forms";
import { getSessionUser } from "@/lib/auth";
import { roleLabel } from "@/lib/nav";

export const metadata = { title: "Account" };

export default async function AccountPage() {
  const user = await getSessionUser();
  if (!user) return null; // layout already gates; belt-and-suspenders.

  return (
    <>
      <DashboardHeader title="Account" description="Manage your name, password, and account details." />

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Account details</CardTitle>
            <CardDescription>Your role and email.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-center justify-between border-b py-2">
              <span className="text-muted-foreground">Email</span>
              <span className="font-medium">{user.email}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-muted-foreground">Role</span>
              <Badge variant="accent">{roleLabel(user.profile.role)}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your name</CardTitle>
          </CardHeader>
          <CardContent>
            <NameForm defaultName={user.profile.full_name ?? ""} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>Set or change your password.</CardDescription>
          </CardHeader>
          <CardContent>
            <PasswordForm />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
