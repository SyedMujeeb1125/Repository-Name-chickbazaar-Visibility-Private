import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, MousePointer2 } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/order-chicken", label: "Order Chicken" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" }
];

export function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-navy text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.3fr_1fr_1fr] lg:px-8">
        <div>
          <p className="text-xl font-extrabold">ChickBazaar</p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-white/75">
            India&apos;s B2B Poultry Marketplace, operated by FruitGlobe International
            Private Limited.
          </p>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange">Links</p>
          <div className="mt-4 grid gap-2">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-white/75 hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange">Contact</p>
          <div className="mt-4 grid gap-3 text-sm text-white/75">
            <a href="mailto:info@chickbazaar.com" className="flex items-center gap-2 hover:text-white">
              <Mail size={16} /> info@chickbazaar.com
            </a>
            <a href="https://www.chickbazaar.com" className="flex items-center gap-2 hover:text-white">
              <MousePointer2 size={16} /> www.chickbazaar.com
            </a>
          </div>
          <div className="mt-5 flex gap-3">
            {[
              { icon: Instagram, label: "Instagram" },
              { icon: Facebook, label: "Facebook" },
              { icon: Linkedin, label: "LinkedIn" }
            ].map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-md bg-white/10 text-white transition hover:bg-orange"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-white/60">
        © {new Date().getFullYear()} FruitGlobe International Private Limited. All rights reserved.
      </div>
    </footer>
  );
}
