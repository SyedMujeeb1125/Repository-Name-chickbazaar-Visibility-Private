import type { Metadata } from "next";
import { FormShell } from "@/components/form-shell";
import {
  TextArea,
  TextInput
} from "@/components/form-fields";
import { Section } from "@/components/section";
import { getLoggedInRetailerMobile } from "@/lib/retailer";
import { readDb, getTodayRate } from "@/lib/storage";
import { DeliveryAddressSelector } from "@/components/delivery-address-selector";
import { OrderConfigurator } from "@/components/order-configurator";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Order Chicken",
  description:
    "Place a live broiler chicken order for your shop."
};

export default async function OrderChickenPage() {
  const mobile = await getLoggedInRetailerMobile();

  const todayRate = await getTodayRate();

  const db = await readDb();

  const retailer = mobile
    ? db.retailers.find(
        (r: any) => r.mobile === mobile
      )
    : null;
    const retailerStatus =
  retailer?.status as
    | "new"
    | "approved"
    | "blocked"
    | "rejected"
    | undefined;

  const tomorrowDate = new Date(
    Date.now() + 24 * 60 * 60 * 1000
  )
    .toISOString()
    .split("T")[0];

  if (
  retailer &&
  retailerStatus === "blocked"
) {
  return (
    <Section
      className="bg-slate-50"
      innerClassName="max-w-3xl"
    >
      <div className="rounded-lg border border-red-300 bg-red-50 p-6">
        <h1 className="text-2xl font-bold text-red-700">
          Account Blocked
        </h1>

        <p className="mt-3 text-red-600">
          Please contact ChickBazaar support.
        </p>
      </div>
    </Section>
  );
}

if (
  retailer &&
  retailerStatus !== "approved"
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
      <div className="mb-6 rounded-xl bg-orange p-5 text-white">
        <p className="text-sm uppercase tracking-wide">
          Today's Live Broiler Rate
        </p>

        <p className="mt-1 text-3xl font-extrabold">
          ₹{todayRate?.rate || 0}/kg
        </p>
      </div>

      <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 p-4">
        <p className="font-bold text-blue-900">
          Delivery Schedule
        </p>

        <p className="mt-1 text-sm text-blue-700">
          Orders placed today will be delivered tomorrow before 8:00 AM.
        </p>
      </div>

      <FormShell
        title="Order Chicken"
        description="Place your requirement today. ChickBazaar will procure birds overnight and deliver before 8:00 AM on the next day."
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
            label="Delivery Date"
            name="deliveryDate"
            type="date"
            defaultValue={tomorrowDate}
            min={tomorrowDate}
          />
        </div>

        <OrderConfigurator
          rate={Number(todayRate?.rate || 0)}
        />

        <DeliveryAddressSelector
  registeredAddress={
    retailer?.address || ""
  }
  shops={
    db.retailerLocations.filter(
      (shop: any) =>
        shop.retailerMobile === mobile
    )
  }
/>

        <TextArea
          label="Additional Notes (Optional)"
          name="notes"
          required={false}
        />
      </FormShell>
    </Section>
  );
}