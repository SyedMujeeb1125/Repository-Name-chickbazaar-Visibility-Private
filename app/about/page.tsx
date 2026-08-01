import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";

export const metadata: Metadata = {
  title: "About ChickBazaar",
  description:
    "ChickBazaar is India's technology-enabled B2B poultry marketplace connecting poultry farms, wholesalers, retailers, restaurants, and businesses through a reliable digital procurement platform.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="ABOUT CHICKBAZAAR"
        title="India's Technology-Enabled B2B Poultry Marketplace"
      >
        ChickBazaar connects poultry farms, wholesalers, retailers,
        restaurants, hotels, caterers, and institutional buyers through one
        trusted digital marketplace, making poultry procurement faster,
        transparent, and more efficient.
      </PageHero>

      <Section>
        <div className="space-y-12">

          <div>
            <h2 className="text-4xl font-extrabold text-navy">
              Who We Are
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              ChickBazaar is building a modern procurement platform for India's
              poultry industry. Our technology simplifies ordering, pricing,
              logistics, and supply management while helping retailers and
              businesses procure healthy live broiler chickens directly from
              verified poultry partners.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">

            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange">
                Our Mission
              </p>

              <h3 className="mt-3 text-3xl font-extrabold text-navy">
                Simplifying poultry procurement through technology.
              </h3>

              <p className="mt-4 text-lg leading-8 text-slate-600">
                We aim to make poultry sourcing simple, transparent, and
                dependable by connecting businesses with trusted poultry farms,
                enabling seamless ordering, reliable deliveries, and efficient
                supply chain management.
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
                Our vision is to become India's leading digital poultry
                marketplace, empowering farms and businesses with technology,
                transparency, and efficient nationwide distribution.
              </p>
            </div>

          </div>

        </div>
      </Section>
    </>
  );
}