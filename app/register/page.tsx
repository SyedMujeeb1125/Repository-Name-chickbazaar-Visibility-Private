import type { Metadata } from "next";
import { FormShell } from "@/components/form-shell";
import { TextArea, TextInput } from "@/components/form-fields";
import { Section } from "@/components/section";
import { LocationPicker } from "@/components/location-picker";

export const metadata: Metadata = {
  title: "Register Your Shop",
  description: "Register your chicken shop or meat retail business on ChickBazaar."
};

export default function RegisterPage() {
  return (
    <Section className="bg-slate-50" innerClassName="max-w-3xl">
      <FormShell
        title="Retailer Registration"
        description="Create a ChickBazaar retailer account for regular live broiler chicken procurement."
        successTitle="Registration received."
        successMessage="Our team will verify your shop details and contact you shortly."
        buttonText="Register"
        endpoint="/api/retailers"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <TextInput label="Shop Name" name="shopName" />
          <TextInput label="Owner Name" name="ownerName" />
          <TextInput label="Mobile Number" name="mobile" type="tel" pattern="[0-9]{10}" placeholder="10 digit mobile number" />
          <TextInput label="Email" name="email" type="email" />
          <TextInput
            label="GST Number"
            name="gst"
            pattern="[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]"
            placeholder="Example: 27ABCDE1234F1Z5"
            helperText="Enter the 15-character GSTIN registered for your shop."
          />
          <TextInput
            label="Attach GST Certificate"
            name="gstCertificate"
            type="file"
            accept="application/pdf,image/*"
            helperText="Upload a PDF or clear image of the GST certificate."
          />
          <TextInput label="Password" name="password" type="password" />
          <TextInput label="Confirm Password" name="confirmPassword" type="password" />
        </div>
        <TextArea label="Address" name="address" required />

        <LocationPicker />
      </FormShell>
    </Section>
  );
}
