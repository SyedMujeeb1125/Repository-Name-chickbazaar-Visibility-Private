import {
  readDb,
  getRetailerLedger
} from "@/lib/storage";

import { AdminRetailersList } from "@/components/admin-retailers-list";

export default async function RetailersPage() {
  const db = await readDb();

  const ledger =
    await getRetailerLedger();

  const retailersWithBalance =
    db.retailers.map(
      (retailer: any) => {

        const entries =
          ledger.filter(
            (l: any) =>
              l.retailer_id ===
              retailer.id
          );

        const debit =
          entries.reduce(
            (
              sum: number,
              row: any
            ) =>
              sum +
              Number(
                row.debit || 0
              ),
            0
          );

        const credit =
          entries.reduce(
            (
              sum: number,
              row: any
            ) =>
              sum +
              Number(
                row.credit || 0
              ),
            0
          );

        const outstanding =
          debit - credit;

        return {
          ...retailer,

          outstanding,

          availableCredit:
            Math.max(
              0,
              Number(
                retailer.creditLimit || 0
              ) - outstanding
            )
        };
      }
    );

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Retailers
      </h1>

      <AdminRetailersList
        retailers={
          retailersWithBalance
        }
        retailerLocations={
          db.retailerLocations
        }
      />
    </div>
  );
}