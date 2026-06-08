import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about ChickBazaar."
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="ABOUT CHICKBAZAAR"
        title="India's B2B Poultry Marketplace"
      >
        ChickBazaar is a technology-enabled poultry procurement platform that
        connects retailers, chicken shops, wholesalers, restaurants and poultry
        farms through a single marketplace.
      </PageHero>

      <Section>
        <div className="space-y-12">
          <div>
            <h2 className="text-4xl font-extrabold text-navy">
              Who We Are
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              ChickBazaar was created to simplify the way poultry is sourced and
              supplied across India.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange">
                Our Mission
              </p>

              <h3 className="mt-3 text-3xl font-extrabold text-navy">
                Simplifying poultry procurement.
              </h3>

              <p className="mt-4 text-lg leading-8 text-slate-600">
                We help businesses source fresh live broiler chickens through a
                reliable procurement platform.
              </p>
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange">
                Our Vision
              </p>

              <h3 className="mt-3 text-3xl font-extrabold text-navy">
                Building India's most trusted poultry supply network.
              </h3>

              <p className="mt-4 text-lg leading-8 text-slate-600">
                Creating a nationwide poultry marketplace powered by technology.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}