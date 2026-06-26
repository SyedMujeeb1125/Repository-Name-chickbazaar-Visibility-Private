import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

const variants = {
  primary:
    "bg-orange text-white shadow-soft hover:bg-[#e85f00] focus:ring-orange/25",
  secondary:
    "bg-navy text-white shadow-soft hover:bg-[#071a33] focus:ring-navy/20",
  ghost:
    "border border-navy/15 bg-white text-navy hover:border-orange hover:text-orange focus:ring-orange/20"
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = ""
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center rounded-md px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-4 ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
