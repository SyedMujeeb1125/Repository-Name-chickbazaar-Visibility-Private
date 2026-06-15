export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { FormShell } from "@/components/form-shell";
import {
  TextArea,
  TextInput
} from "@/components/form-fields";
import { Section } from "@/components/section";
import { getLoggedInRetailerMobile } from "@/lib/retailer";
import { readDb } from "@/lib/storage";

export default async function ShopsPage() {
  const mobile =
    await getLoggedInRetailerMobile();

  if (!mobile) {
    redirect("/login");
  }

  const db = await readDb();

  const myShops =
    db.retailerLocations.filter(
      (shop: any) =>
        shop.retailerMobile === mobile
    );

  return (
    <Section
      className="bg-slate-50"
      innerClassName="max-w-4xl"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-navy">
          My Shops
        </h1>

        <p className="mt-2 text-slate-600">
          Manage all delivery locations
          for your business.
        </p>
      </div>

      <div className="mb-8 rounded-xl border bg-white p-6">
        <h2 className="text-xl font-bold">
          Saved Shops
        </h2>

        {myShops.length === 0 ? (
          <p className="mt-4 text-slate-500">
            No shops added yet.
          </p>
        ) : (
          <div className="mt-4 space-y-4">
            {myShops.map(
              (shop: any) => (
                <div
                  key={shop.id}
                  className="rounded-lg border p-4"
                >
                  <p className="font-bold text-orange">
                    🏪 {shop.shopName}
                  </p>

                  <p className="mt-1 text-sm text-slate-600">
                    {shop.address}
                  </p>

                  {shop.contactPerson ? (
                    <p className="mt-2 text-sm">
                      Contact:{" "}
                      {shop.contactPerson}
                    </p>
                  ) : null}
                </div>
              )
            )}
          </div>
        )}
      </div>

      <FormShell
        title="Add New Shop"
        description="Save delivery locations for future orders."
        successTitle="Shop Added"
        successMessage="Location saved successfully."
        buttonText="Save Shop"
        endpoint="/api/shops"
      >
        <input
          type="hidden"
          name="retailerMobile"
          value={mobile}
        />

        <TextInput
          label="Shop Name"
          name="shopName"
        />

        <TextInput
          label="Contact Person"
          name="contactPerson"
          required={false}
        />

        <TextInput
          label="Mobile Number"
          name="mobile"
          required={false}
        />

        <TextArea
          label="Address"
          name="address"
          required
        />
      </FormShell>
    </Section>
  );
}