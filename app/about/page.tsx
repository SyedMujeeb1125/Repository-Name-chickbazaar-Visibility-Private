import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about ChickBazaar and FruitGlobe International Private Limited."
};

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About Us" title="Technology-enabled poultry procurement.">
        ChickBazaar is a technology-enabled poultry procurement platform operated by
        FruitGlobe International Private Limited.
      </PageHero>
      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-slate-100 bg-white p-7 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange">Mission</p>
            <h2 className="mt-3 text-2xl font-extrabold text-navy">
              To simplify poultry procurement for retailers.
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              We help chicken shops and meat retailers place orders through a single
              platform while ChickBazaar manages farm sourcing and delivery coordination.
            </p>
          </div>
          <div className="rounded-lg border border-slate-100 bg-white p-7 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange">Vision</p>
            <h2 className="mt-3 text-2xl font-extrabold text-navy">
              To become India&apos;s most trusted poultry supply network.
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Our goal is to make live broiler procurement more predictable, transparent,
              and dependable for retailers across Indian markets.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
