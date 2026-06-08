import {
  BadgeCheck,
  Clock,
  Headphones,
  IndianRupee,
  PackageCheck,
  ShieldCheck,
  Truck,
  Warehouse
} from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { Section } from "@/components/section";

const features = [
  { icon: ShieldCheck, label: "Trusted Farm Network" },
  { icon: Truck, label: "Reliable Delivery" },
  { icon: IndianRupee, label: "Competitive Pricing" },
  { icon: PackageCheck, label: "Easy Ordering" }
];

const steps = [
  ["Step 1", "Place Your Order"],
  ["Step 2", "We Source From Trusted Farms"],
  ["Step 3", "We Deliver To Your Shop"]
];

const reasons = [
  {
    icon: BadgeCheck,
    title: "Verified Poultry Farms",
    text: "Partner farms are screened for dependable supply and live broiler quality."
  },
  {
    icon: Clock,
    title: "Fast Delivery",
    text: "Morning orders move quickly through our sourcing and delivery workflow."
  },
  {
    icon: IndianRupee,
    title: "Transparent Pricing",
    text: "Indicative rates are clearly communicated before final billing by actual weight."
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    text: "Our team coordinates orders, delivery timing, and retailer support."
  }
];

export default function Home() {
  return (
    <>
      <section className="overflow-hidden bg-white px-4 pt-12 sm:px-6 lg:px-8 lg:pt-16">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.04fr_0.96fr]">
          <div className="pb-10 lg:pb-16">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange">
              India&apos;s B2B Poultry Marketplace
            </p>
            <h1 className="mt-5 max-w-3xl text-5xl font-extrabold leading-[1.05] tracking-normal text-navy sm:text-6xl lg:text-7xl">
              Fresh Live Chickens Delivered To Your Shop
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Order live broiler chickens from trusted poultry farms through a single
              platform.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/order-chicken">Order Chicken</ButtonLink>
              <ButtonLink href="/register" variant="ghost">
                Register Your Shop
              </ButtonLink>
            </div>
            <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {features.map(({ icon: Icon, label }) => (
                <div key={label} className="rounded-lg border border-slate-100 bg-white p-4 shadow-sm">
                  <Icon className="text-orange" size={22} />
                  <p className="mt-3 text-sm font-bold leading-5 text-navy">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[430px] overflow-hidden rounded-none bg-navy p-6 text-white sm:p-8 lg:min-h-[560px]">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,107,0,0.18),transparent_42%)]" />
            <div className="relative grid h-full content-between gap-8">
              <div className="rounded-lg bg-white p-5 text-navy shadow-soft">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange">
                  Today&apos;s Indicative Rate
                </p>
                <div className="mt-5 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-lg font-extrabold">Live Broiler Chicken</p>
                    <p className="mt-1 text-sm text-slate-500">Final billing based on actual weight.</p>
                  </div>
                  <p className="text-4xl font-extrabold">₹XX / Kg</p>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="flex items-center gap-4 rounded-lg bg-white/10 p-4">
                  <Warehouse className="text-orange" size={30} />
                  <div>
                    <p className="font-bold">Single procurement point</p>
                    <p className="text-sm text-white/70">No farm browsing, no scattered calls.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-lg bg-white/10 p-4">
                  <Truck className="text-orange" size={30} />
                  <div>
                    <p className="font-bold">Live delivery coordination</p>
                    <p className="text-sm text-white/70">Built for chicken shops and meat retailers.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section className="bg-slate-50">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange">
              Delivery Promise
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-navy sm:text-4xl">
              Order before 10:00 AM and receive same-day delivery.
            </h2>
          </div>
          <div className="rounded-lg border border-slate-100 bg-white p-6 shadow-soft">
            <p className="text-lg font-bold text-navy">
              Orders placed after 10:00 AM will be delivered the next day.
            </p>
            <p className="mt-3 leading-7 text-slate-600">
              ChickBazaar coordinates sourcing and dispatch so retailers can plan shop
              inventory with a clear delivery window.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange">How It Works</p>
          <h2 className="mt-3 text-3xl font-extrabold text-navy sm:text-4xl">
            A simple procurement flow for live broiler supply.
          </h2>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {steps.map(([step, title]) => (
            <div key={title} className="rounded-lg border border-slate-100 bg-white p-6 shadow-sm">
              <p className="text-sm font-bold text-orange">{step}</p>
              <h3 className="mt-3 text-xl font-extrabold text-navy">{title}</h3>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-slate-50">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange">
            Why Choose ChickBazaar
          </p>
          <h2 className="mt-3 text-3xl font-extrabold text-navy sm:text-4xl">
            Built around trust, simplicity, and reliable poultry supply.
          </h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-lg border border-slate-100 bg-white p-6 shadow-sm">
              <Icon className="text-orange" size={28} />
              <h3 className="mt-4 text-lg font-extrabold text-navy">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="flex flex-col items-start justify-between gap-6 rounded-lg bg-navy p-7 text-white sm:p-10 lg:flex-row lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange">Order Today</p>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              Ready To Order Live Chickens?
            </h2>
          </div>
          <ButtonLink href="/order-chicken">Order Now</ButtonLink>
        </div>
      </Section>
    </>
  );
}
