import {
  readDb,
  getRetailerLedger
} from "@/lib/storage";

export default async function OutstandingPage() {
  const db = await readDb();

  const ledger =
    await getRetailerLedger();

  const retailers =
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

        return {
          retailer,
          debit,
          credit,
          outstanding:
            debit - credit,
        };
      }
    );

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Outstanding Dashboard
      </h1>

      <div className="space-y-4">
        {retailers.map(
          ({
            retailer,
            debit,
            credit,
            outstanding,
          }: any) => (
            <div
              key={
                retailer.id
              }
              className="rounded-lg border bg-white p-5"
            >
              <h3 className="font-bold">
                {
                  retailer.shopName
                }
              </h3>

              <p>
                Debit:
                ₹{debit}
              </p>

              <p>
                Credit:
                ₹{credit}
              </p>

              <p className="font-bold text-red-600">
                Outstanding:
                ₹{
                  outstanding
                }
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}