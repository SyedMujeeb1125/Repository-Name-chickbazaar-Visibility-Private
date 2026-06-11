"use client";

import Link from "next/link";
import { Menu, ShoppingCart, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const publicNavItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/order-chicken", label: "Order Chicken" },
  { href: "/farm-partner", label: "Become A Farm Partner" }
];

export function Header() {
  const pathname = usePathname();
  const [loggedIn, setLoggedIn] =
  useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
  fetch("/api/auth/me")
    .then((res) => res.json())
    .then((data) =>
      setLoggedIn(data.loggedIn)
    )
    .catch(() => {});
}, []);
  const navItems = loggedIn
  ? [
      ...publicNavItems,
      {
        href: "/dashboard",
        label: "My Dashboard"
      },
      {
        href: "/dashboard/profile",
        label: "My Profile"
      },
      {
        href: "/api/logout",
        label: "Logout"
      }
    ]
  : [
      ...publicNavItems,
      {
        href: "/login",
        label: "Login"
      },
      {
        href: "/register",
        label: "Register"
      }
    ];
  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2" aria-label="ChickBazaar home">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-navy text-white">
            <ShoppingCart size={21} strokeWidth={2.4} />
          </span>
          <span className="leading-tight">
            <span className="block text-lg font-extrabold text-navy">ChickBazaar</span>
            <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-orange">
              B2B Poultry
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-3 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-orange/10 text-orange"
                    : "text-slate-700 hover:bg-slate-50 hover:text-navy"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-md border border-slate-200 text-navy lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open ? (
        <nav className="border-t border-slate-100 bg-white px-4 py-3 shadow-soft lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-md px-3 py-3 text-sm font-semibold ${
                  pathname === item.href ? "bg-orange/10 text-orange" : "text-slate-700"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
