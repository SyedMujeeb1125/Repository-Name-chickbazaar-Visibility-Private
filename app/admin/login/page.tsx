import type { Metadata } from "next";
import { AdminLoginForm } from "@/components/admin-login-form";
import { Section } from "@/components/section";

export const metadata: Metadata = {
  title: "Admin Login",
  description: "ChickBazaar admin login."
};

export default function AdminLoginPage() {
  return (
    <Section className="bg-slate-50" innerClassName="max-w-xl">
      <AdminLoginForm />
    </Section>
  );
}
