import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to your AI-Ready School dashboard.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to reach your dashboard, Cookbook, and downloads."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link href="/pricing" className="font-medium text-accent hover:underline">
            See pricing
          </Link>{" "}
          or{" "}
          <Link href="/signup" className="font-medium text-accent hover:underline">
            create one
          </Link>
          .
        </>
      }
    >
      <LoginForm initialError={error} />
    </AuthShell>
  );
}
