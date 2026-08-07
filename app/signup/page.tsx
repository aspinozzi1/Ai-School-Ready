import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth/auth-shell";
import { SignupForm } from "./signup-form";

export const metadata: Metadata = {
  title: "Create your account",
  description: "Create your AI-Ready School account.",
};

export default function SignupPage() {
  return (
    <AuthShell
      title="Create your account"
      subtitle="Buying a kit? Your account is created automatically at checkout — you can also make one here."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-accent hover:underline">
            Log in
          </Link>
          .
        </>
      }
    >
      <SignupForm />
    </AuthShell>
  );
}
