import {
  getRetailerLedger,
  readDb
} from "@/lib/storage";

export default async function StatementPage({
  params
}: {
  params: Promise<{
    retailerId: string;
  }>;
}) {
  const { retailerId } =
    await params;

  const db = await readDb();

  const retailer =
    db.retailers.find(
      (r: any) =>
        r.id === retailerId
    );

  if (!retailer) {
    return (
      <div>
        Retailer not found
      </div>
    );
  }

  const ledger =
    await getRetailerLedger();

  const entries =
    ledger.filter(
      (l: any) =>
        l.retailer_id ===
        retailerId
    );

  const totalDebit =
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

  const totalCredit =
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

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Retailer Statement
      </h1>

      <div className="rounded-lg border bg-white p-5">
        <h2 className="text-xl font-bold">
          {retailer.shopName}
        </h2>

        <p>
          {retailer.mobile}
        </p>

        <p className="mt-3">
          Outstanding:
          ₹
          {totalDebit -
            totalCredit}
        </p>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">

  <div className="rounded-lg bg-red-600 p-5 text-white">
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

  <div className="rounded-lg bg-blue-600 p-5 text-white">
    <p>Outstanding</p>

    <p className="text-3xl font-bold">
      ₹{totalDebit - totalCredit}
    </p>
  </div>

</div>
      <div className="mt-6 rounded-lg border bg-white p-5">
  <h2 className="mb-4 text-xl font-bold">
    Ledger History
  </h2>

  {entries.length === 0 ? (
    <p>No transactions found.</p>
  ) : (
    entries.map((entry: any) => (
      <div
        key={entry.id}
        className="border-b py-3"
      >
        <p>
          Debit:
          ₹{entry.debit || 0}
        </p>

        <p>
          Credit:
          ₹{entry.credit || 0}
        </p>

        <p>
          {entry.remarks}
        </p>

        <p className="text-xs text-slate-500">
          {new Date(
            entry.created_at
          ).toLocaleString()}
        </p>
      </div>
    ))
  )}
</div>
    </div>
  );
}