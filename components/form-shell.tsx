"use client";

import type { FormEvent, ReactNode } from "react";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

type FormShellProps = {
  title: string;
  description: string;
  successTitle: string;
  successMessage: string;
  buttonText: string;
  children: ReactNode;
  endpoint?: string;
};

export function FormShell({
  title,
  description,
  successTitle,
  successMessage,
  buttonText,
  children,
  endpoint
}: FormShellProps) {
  const [submitted, setSubmitted] = useState(false);
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
      if (endpoint) {
        const response = await fetch(endpoint, {
          method: "POST",
          body: new FormData(form)
        });

        if (!response.ok) {
          const data = (await response.json().catch(() => null)) as { message?: string } | null;
          throw new Error(data?.message || "Something went wrong. Please try again.");
        }
      }

      setSubmitted(true);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-6 text-center shadow-soft">
        <CheckCircle2 className="mx-auto text-emerald-600" size={42} />
        <h2 className="mt-4 text-2xl font-extrabold text-navy">{successTitle}</h2>
        <p className="mt-2 text-slate-600">{successMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-slate-100 bg-white p-5 shadow-soft sm:p-8">
      <div>
        <h1 className="text-3xl font-extrabold text-navy">{title}</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
      </div>
      <div className="mt-8 grid gap-5">{children}</div>
      {error ? (
        <p className="mt-6 rounded-md bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={submitting}
        className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-orange px-5 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-[#e85f00] focus:outline-none focus:ring-4 focus:ring-orange/25 sm:w-auto"
      >
        {submitting ? "Submitting..." : buttonText}
      </button>
    </form>
  );
}
