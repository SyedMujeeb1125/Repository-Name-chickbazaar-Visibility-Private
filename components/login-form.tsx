"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { CheckCircle2, KeyRound, Mail, Smartphone } from "lucide-react";

export function LoginForm() {
  const [otpSent, setOtpSent] = useState(false);
  const [success, setSuccess] = useState("");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const [devOtp, setDevOtp] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleOtpSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setError("");
    setSubmitting(true);

    try {
      const formData = new FormData(form);

      if (!otpSent) {
        const response = await fetch("/api/auth/request-otp", {
          method: "POST",
          body: formData
        });
        const data = (await response.json().catch(() => null)) as { message?: string; devOtp?: string } | null;

        if (!response.ok) {
          throw new Error(data?.message || "Unable to send OTP.");
        }

        setMobile(String(formData.get("mobile") || ""));
        setDevOtp(data?.devOtp || "");
        setOtpSent(true);
        return;
      }

      formData.set("mobile", mobile);
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        body: formData
      });
      const data = (await response.json().catch(() => null)) as { message?: string } | null;

      if (!response.ok) {
        throw new Error(data?.message || "Unable to verify OTP.");
      }

      setSuccess("You are logged in successfully.");
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleGoogleLogin() {
    window.location.href = "/api/auth/google/start";
  }

  if (success) {
    return (
      <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-6 text-center shadow-soft">
        <CheckCircle2 className="mx-auto text-emerald-600" size={42} />
        <h1 className="mt-4 text-2xl font-extrabold text-navy">Login successful.</h1>
        <p className="mt-2 text-slate-600">{success}</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-slate-100 bg-white p-5 shadow-soft sm:p-8">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange">
          Retailer Access
        </p>
        <h1 className="mt-3 text-3xl font-extrabold text-navy">Login To ChickBazaar</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Use OTP for fast shop access, or continue with Google if your account is
          linked.
        </p>
      </div>

      <button
        type="button"
        onClick={handleGoogleLogin}
        aria-label="Login With Google"
        className="mt-8 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-md border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-navy transition hover:border-orange hover:text-orange focus:outline-none focus:ring-4 focus:ring-orange/20"
      >
        <span
          aria-hidden="true"
          className="grid h-6 w-6 place-items-center rounded-full border border-slate-200 text-sm font-extrabold text-[#4285F4]"
        >
          G
        </span>
        Login With Google
      </button>

      <div className="my-7 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
        <span className="h-px flex-1 bg-slate-200" />
        <span>or</span>
        <span className="h-px flex-1 bg-slate-200" />
      </div>

      <form onSubmit={handleOtpSubmit} className="grid gap-5">
        <label className="grid gap-2 text-sm font-semibold text-navy">
          Mobile Number
          <span className="relative">
            <Smartphone className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              name="mobile"
              type="tel"
              inputMode="numeric"
              pattern="[0-9]{10}"
              placeholder="10 digit mobile number"
              required
              disabled={otpSent}
              defaultValue={mobile}
              className="focus-ring min-h-12 w-full rounded-md border border-slate-200 bg-white px-11 text-slate-800 disabled:bg-slate-50 disabled:text-slate-500"
            />
          </span>
        </label>

        {otpSent ? (
          <label className="grid gap-2 text-sm font-semibold text-navy">
            Enter OTP
            <span className="relative">
              <KeyRound className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                name="otp"
                type="text"
                inputMode="numeric"
                pattern="[0-9]{4,6}"
                placeholder="4 to 6 digit OTP"
                required
                className="focus-ring min-h-12 w-full rounded-md border border-slate-200 bg-white px-11 text-slate-800"
              />
            </span>
          </label>
        ) : null}

        {otpSent ? (
          <p className="rounded-md bg-orange/10 px-4 py-3 text-sm font-semibold text-navy">
            OTP sent to your mobile number. Enter it to continue.
            {devOtp ? <span className="block pt-1">Development OTP: {devOtp}</span> : null}
          </p>
        ) : null}

        {error ? (
          <p className="rounded-md bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-orange px-5 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-[#e85f00] focus:outline-none focus:ring-4 focus:ring-orange/25"
        >
          {otpSent ? <KeyRound size={18} /> : <Mail size={18} />}
          {submitting ? "Please wait..." : otpSent ? "Verify OTP" : "Send OTP"}
        </button>
      </form>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm">
        {otpSent ? (
          <button
            type="button"
            onClick={() => {
              setOtpSent(false);
              setMobile("");
              setDevOtp("");
              setError("");
            }}
            className="font-bold text-orange hover:text-navy"
          >
            Change Mobile Number
          </button>
        ) : (
          <span />
        )}
        <Link href="/register" className="font-bold text-navy hover:text-orange">
          Register Your Shop
        </Link>
      </div>
    </div>
  );
}
