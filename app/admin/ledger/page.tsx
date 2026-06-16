import {
  readDb,
  getRetailerLedger
} from "@/lib/storage";

export default async function LedgerPage() {
  const db = await readDb();

  const ledger =
    await getRetailerLedger();

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Retailer Ledger
      </h1>

      {db.retailers
        .filter(
          (r: any) =>
            r.status === "approved"
        )
        .map((retailer: any) => {

          const entries =
            ledger.filter(
              (l: any) =>
                l.retailer_id ===
                retailer.id
            );

          const totalDebit =
            entries.reduce(
              (
                sum: number,
                e: any
              ) =>
                sum +
                Number(
                  e.debit || 0
                ),
              0
            );

          const totalCredit =
            entries.reduce(
              (
                sum: number,
                e: any
              ) =>
                sum +
                Number(
                  e.credit || 0
                ),
              0
            );

          const outstanding =
            totalDebit -
            totalCredit;

          return (
            <div
              key={retailer.id}
              className="mb-4 rounded-xl border bg-white p-5"
            >
              <p className="font-bold">
                {retailer.shopName}
              </p>

              <p>
                Debit:
                ₹{totalDebit}
              </p>

              <p>
                Credit:
                ₹{totalCredit}
              </p>

              <p
                className={
                  outstanding > 0
                    ? "font-semibold text-red-600"
                    : "font-semibold text-green-600"
                }
              >
                Outstanding:
                ₹{outstanding}
              </p>
            </div>
          );
        })}
    </div>
  );
}