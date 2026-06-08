import type { Metadata } from "next";
import { FormShell } from "@/components/form-shell";
import { SelectInput, TextArea, TextInput } from "@/components/form-fields";
import { Section } from "@/components/section";

export const metadata: Metadata = {
  title: "Order Chicken",
  description: "Place a live broiler chicken order for your shop."
};

export default function OrderChickenPage() {
  return (
    <Section className="bg-slate-50" innerClassName="max-w-3xl">
      <FormShell
        title="Order Chicken"
        description="Place your requirement for live broiler chickens. ChickBazaar will source from partner farms and coordinate delivery."
        successTitle="Thank you for your order."
        successMessage="Our team will contact you shortly."
        buttonText="Place Order"
        endpoint="/api/orders"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <TextInput label="Shop Name" name="shopName" />
          <TextInput label="Owner Name" name="ownerName" />
          <TextInput label="Mobile Number" name="mobile" type="tel" pattern="[0-9]{10}" placeholder="10 digit mobile number" />
          <TextInput label="Email Address" name="email" type="email" />
          <TextInput label="Number Of Birds Required" name="birds" type="number" min="1" />
          <SelectInput
            label="Preferred Average Weight"
            name="averageWeight"
            options={["1.5 Kg", "1.8 Kg", "2.0 Kg", "2.2 Kg"]}
          />
          <TextInput label="Delivery Date" name="deliveryDate" type="date" />
        </div>
        <TextArea label="Delivery Address" name="address" required />
        <TextArea label="Additional Notes" name="notes" />
      </FormShell>
    </Section>
  );
}
