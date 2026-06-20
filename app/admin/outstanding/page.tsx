import {
  readDb,
  getRetailerLedger
} from "@/lib/storage";

export default async function OutstandingPage() {
  const db = await readDb();

  const ledger =
    await getRetailerLedger();

  const retailers =
  db.retailers
    .map((retailer: any) => {
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
    })
    .sort(
      (a: any, b: any) =>
        b.outstanding -
        a.outstanding
    );
    const totalDebit =
  retailers.reduce(
    (sum: number, r: any) =>
      sum + r.debit,
    0
  );

const totalCredit =
  retailers.reduce(
    (sum: number, r: any) =>
      sum + r.credit,
    0
  );

const totalOutstanding =
  retailers.reduce(
    (sum: number, r: any) =>
      sum + r.outstanding,
    0
  );

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Outstanding Dashboard
      </h1>
      <div className="mb-6 grid gap-4 md:grid-cols-4">

  <div className="rounded-lg bg-orange p-5 text-white">
    <p>Retailers</p>
    <p className="text-3xl font-bold">
      {retailers.length}
    </p>
  </div>

  <div className="rounded-lg bg-blue-600 p-5 text-white">
    <p>Total Debit</p>
    <p className="text-3xl font-bold">
      ₹{totalDebit}
    </p>
  </div>

  <div className="rounded-lg bg-green-600 p-5 text-white">
    <p>Total Credit</p>
    <p className="text-3xl font-bold">
      ₹{totalCredit}
    </p>
  </div>

  <div className="rounded-lg bg-red-600 p-5 text-white">
    <p>Total Outstanding</p>
    <p className="text-3xl font-bold">
      ₹{totalOutstanding}
    </p>
  </div>

</div>

      <div className="space-y-4">
        {retailers.map(
          ({
            retailer,
            debit,
            credit,
            outstanding,
          }: any) => (
            <div
  key={retailer.id}
  className="rounded-lg border bg-white p-5"
>
  <h3 className="text-lg font-bold">
    {retailer.shopName || "Unknown Shop"}
  </h3>

  <p className="text-sm text-slate-500">
    {retailer.mobile}
  </p>

  <p>
    Debit: ₹{debit}
  </p>

  <p>
    Credit: ₹{credit}
  </p>

  <p
    className={`font-bold ${
      outstanding > 0
        ? "text-red-600"
        : outstanding < 0
        ? "text-blue-600"
        : "text-green-600"
    }`}
  >
    Outstanding: ₹{outstanding}
  </p>
</div>
          )
        )}
      </div>
    </div>
  );
}