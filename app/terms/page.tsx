import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "ChickBazaar website terms and conditions."
};

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Terms" title="Terms & Conditions">
        ChickBazaar provides poultry procurement coordination for chicken shops and meat
        retailers.
      </PageHero>
      <Section innerClassName="max-w-4xl">
        <div className="grid gap-5 leading-7 text-slate-600">
          <p>
            Indicative rates shown on the website are for reference. Final billing is
            based on actual weight, agreed delivery terms, and confirmed order details.
          </p>
          <p>
            Same-day delivery is subject to orders placed before 10:00 AM, supply
            availability, operational feasibility, and serviceable delivery locations.
          </p>
          <p>
            Farm partner applications are reviewed by ChickBazaar before onboarding.
          </p>
        </div>
      </Section>
    </>
  );
}
