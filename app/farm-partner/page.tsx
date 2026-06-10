import type { Metadata } from "next";
import { FormShell } from "@/components/form-shell";
import { TextArea, TextInput } from "@/components/form-fields";
import { Section } from "@/components/section";

export const metadata: Metadata = {
  title: "Become A Farm Partner",
  description: "Apply to become a ChickBazaar poultry farm partner."
};

export default function FarmPartnerPage() {
  return (
    <Section className="bg-slate-50" innerClassName="max-w-3xl">
      <FormShell
        title="Become A Farm Partner"
        description="Share your farm details with ChickBazaar for partner network evaluation."
        successTitle="Partner request received."
        successMessage="Our team will review your details and contact you shortly."
        buttonText="Become Partner"
        endpoint="/api/farm-partners"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <TextInput label="Farm Name" name="farmName" />
          <TextInput label="Contact Person" name="contactPerson" />
          <TextInput label="Mobile Number" name="mobile" type="tel" pattern="[0-9]{10}" placeholder="10 digit mobile number" />
          <TextInput label="Email" name="email" type="email" />
          <TextInput label="Location" name="location" />
          <TextInput label="Daily Capacity" name="dailyCapacity" type="number" min="1" />
          <TextInput label="Average Bird Weight" name="averageBirdWeight" placeholder="Example: 1.8 Kg" />
        </div>
        <>
  <div className="grid gap-5 sm:grid-cols-2">
    <TextInput
      label="Latitude"
      name="latitude"
      placeholder="12.971599"
    />

    <TextInput
      label="Longitude"
      name="longitude"
      placeholder="77.594566"
    />
  </div>

  <TextArea
    label="Message"
    name="message"
    required
  />
</>
      </FormShell>
    </Section>
  );
}
