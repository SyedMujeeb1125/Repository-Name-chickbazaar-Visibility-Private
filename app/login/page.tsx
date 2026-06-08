import type { Metadata } from "next";
import { LoginForm } from "@/components/login-form";
import { Section } from "@/components/section";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to ChickBazaar."
};

export default function LoginPage() {
  return (
    <Section className="bg-slate-50" innerClassName="max-w-xl">
      <LoginForm />
    </Section>
  );
}
