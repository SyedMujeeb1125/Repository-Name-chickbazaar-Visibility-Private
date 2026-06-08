"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole } from "lucide-react";

export function AdminLoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setError("");
    setSubmitting(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        body: new FormData(form)
      });
      const data = (await response.json().catch(() => null)) as { message?: string } | null;

      if (!response.ok) {
        throw new Error(data?.message || "Unable to login.");
      }

      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to login.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-slate-100 bg-white p-5 shadow-soft sm:p-8">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange">Admin Control</p>
        <h1 className="mt-3 text-3xl font-extrabold text-navy">Admin Login</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Sign in to manage ChickBazaar orders, retailer registrations, and farm partners.
        </p>
      </div>

      <div className="mt-8 grid gap-5">
        <label className="grid gap-2 text-sm font-semibold text-navy">
          Email
          <input
            name="email"
            type="email"
            required
            placeholder="admin@chickbazaar.com"
            className="focus-ring min-h-12 rounded-md border border-slate-200 bg-white px-4 text-slate-800"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-navy">
          Password
          <input
            name="password"
            type="password"
            required
            className="focus-ring min-h-12 rounded-md border border-slate-200 bg-white px-4 text-slate-800"
          />
        </label>
      </div>

      {error ? (
        <p className="mt-6 rounded-md bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-orange px-5 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-[#e85f00] focus:outline-none focus:ring-4 focus:ring-orange/25"
      >
        <LockKeyhole size={18} />
        {submitting ? "Signing in..." : "Login"}
      </button>
    </form>
  );
}
