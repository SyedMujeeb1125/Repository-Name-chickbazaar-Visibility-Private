import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "ChickBazaar privacy policy."
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero eyebrow="Policy" title="Privacy Policy">
        ChickBazaar collects business contact and order information only to process
        retailer orders, partner applications, and support requests.
      </PageHero>
      <Section innerClassName="max-w-4xl">
        <div className="prose prose-slate max-w-none">
          <p>
            Information submitted on this website may be used by FruitGlobe International
            Private Limited to contact retailers, coordinate poultry sourcing, manage
            delivery, and improve service quality.
          </p>
          <p>
            We do not sell retailer or farm partner information. Operational details may
            be shared with service teams only when required to fulfil a request.
          </p>
        </div>
      </Section>
    </>
  );
}
