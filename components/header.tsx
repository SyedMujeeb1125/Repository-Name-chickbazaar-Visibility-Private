"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

const publicNavItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/order-chicken", label: "Order Chicken" },
  { href: "/farm-partner", label: "Become A Farm Partner" }
];

export function Header() {
  const pathname = usePathname();

  const [loggedIn, setLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          cache: "no-store"
        });

        const data = await res.json();

        setLoggedIn(data.loggedIn);
      } catch {
        setLoggedIn(false);
      }
    };

    checkAuth();

    window.addEventListener("focus", checkAuth);

    return () => {
      window.removeEventListener("focus", checkAuth);
    };
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
        <Link
  href="/"
  aria-label="ChickBazaar home"
>
  <Image
  src="/logo.png"
  alt="ChickBazaar"
  width={420}
  height={95}
  priority
  className="h-auto w-auto max-h-20"
/>
</Link>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Primary navigation"
        >
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

          {loggedIn && (
            <button
              onClick={() => {
                window.location.href = "/api/logout";
              }}
              className="rounded-md px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-red-600"
            >
              Logout
            </button>
          )}
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

      {open && (
        <nav className="border-t border-slate-100 bg-white px-4 py-3 shadow-soft lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-md px-3 py-3 text-sm font-semibold ${
                  pathname === item.href
                    ? "bg-orange/10 text-orange"
                    : "text-slate-700"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {loggedIn && (
              <button
                onClick={() => {
                  setOpen(false);
                  window.location.href = "/api/logout";
                }}
                className="rounded-md px-3 py-3 text-left text-sm font-semibold text-slate-700 hover:text-red-600"
              >
                Logout
              </button>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}