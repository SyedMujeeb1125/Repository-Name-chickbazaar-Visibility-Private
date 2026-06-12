import type { Metadata } from "next";
import { FormShell } from "@/components/form-shell";
import {
  SelectInput,
  TextArea,
  TextInput
} from "@/components/form-fields";
import { Section } from "@/components/section";
import { LocationPicker } from "@/components/location-picker";
import { getLoggedInRetailerMobile } from "@/lib/retailer";
import { readDb } from "@/lib/storage";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Order Chicken",
  description:
    "Place a live broiler chicken order for your shop."
};

export default async function OrderChickenPage() {
  const mobile = await getLoggedInRetailerMobile();

  const db = await readDb();

  const retailer = mobile
    ? db.retailers.find(
        (r: any) => r.mobile === mobile
      )
    : null;

  if (
    retailer &&
    retailer.status !== "confirmed"
  ) {
    return (
      <Section
        className="bg-slate-50"
        innerClassName="max-w-3xl"
      >
        <div className="rounded-lg border border-yellow-300 bg-yellow-50 p-6">
          <h1 className="text-2xl font-bold text-yellow-800">
            Account Under Review
          </h1>

          <p className="mt-3 text-yellow-700">
            Your retailer profile is being verified.
            Ordering will be enabled after approval.
          </p>
        </div>
      </Section>
    );
  }

  return (
    <Section
      className="bg-slate-50"
      innerClassName="max-w-3xl"
    >

      <FormShell
        title="Order Chicken"
        description="Place your requirement for live broiler chickens. ChickBazaar will source from partner farms and coordinate delivery."
        successTitle="Thank you for your order."
        successMessage="Our team will contact you shortly."
        buttonText="Place Order"
        endpoint="/api/orders"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <TextInput
            label="Shop Name"
            name="shopName"
            defaultValue={retailer?.shopName || ""}
            readOnly={!!retailer}
          />

          <TextInput
            label="Owner Name"
            name="ownerName"
            defaultValue={retailer?.ownerName || ""}
            readOnly={!!retailer}
          />

          <TextInput
            label="Mobile Number"
            name="mobile"
            type="tel"
            pattern="[0-9]{10}"
            placeholder="10 digit mobile number"
            defaultValue={retailer?.mobile || ""}
            readOnly={!!retailer}
          />

          <TextInput
            label="Email Address"
            name="email"
            type="email"
            defaultValue={retailer?.email || ""}
            readOnly={!!retailer}
          />

          <TextInput
            label="Number Of Birds Required"
            name="birds"
            type="number"
            min="1"
          />

          <TextInput
            label="Requested Weight (Kg)"
            name="requestedWeight"
            type="number"
            min="1"
          />

          <SelectInput
            label="Payment Type"
            name="paymentType"
            options={[
              "advance",
              "actual_weight"
            ]}
          />

          <SelectInput
            label="Preferred Average Weight"
            name="averageWeight"
            options={[
              "1.5 Kg",
              "1.8 Kg",
              "2.0 Kg",
              "2.2 Kg"
            ]}
          />

          <TextInput
            label="Delivery Date"
            name="deliveryDate"
            type="date"
          />
        </div>

        <TextArea
          label="Delivery Address"
          name="address"
          required
          defaultValue={retailer?.address || ""}
        />

        <LocationPicker />

        <TextArea
          label="Additional Notes"
          name="notes"
        />
      </FormShell>
    </Section>
  );
}