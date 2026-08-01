export const dynamic = "force-dynamic";

import { supabase } from "@/lib/supabase";

import { AdminRetailersList } from "@/components/admin-retailers-list";

export default async function RetailersPage() {
  const [
    { data: retailers, error: retailersError },
    { data: retailerLocations, error: locationsError },
    { data: ledger, error: ledgerError },
  ] = await Promise.all([
    supabase.from("retailers").select("*"),
    supabase.from("retailer_locations").select("*"),
    supabase.from("retailer_ledger").select("*"),
  ]);

  if (retailersError) {
    console.error("[RETAILERS]", retailersError);
  }

  if (locationsError) {
    console.error("[RETAILER LOCATIONS]", locationsError);
  }

  if (ledgerError) {
    console.error("[RETAILER LEDGER]", ledgerError);
  }

  const retailersWithBalance = (retailers ?? []).map(
    (retailer: any) => {
      const entries = (ledger ?? []).filter(
        (row: any) =>
          row.retailer_id === retailer.id
      );

      const debit = entries.reduce(
        (sum: number, row: any) =>
          sum + Number(row.debit ?? 0),
        0
      );

      const credit = entries.reduce(
        (sum: number, row: any) =>
          sum + Number(row.credit ?? 0),
        0
      );

      const outstanding =
        debit - credit;

      return {
        ...retailer,
        outstanding,
        availableCredit: Math.max(
          0,
          Number(
            retailer.credit_limit ?? 0
          ) - outstanding
        ),
      };
    }
  );

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Retailers
      </h1>

      <AdminRetailersList
        retailers={retailersWithBalance}
        retailerLocations={
          retailerLocations ?? []
        }
      />
    </div>
  );
}