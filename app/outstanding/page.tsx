import { redirect } from "next/navigation";
import { getLoggedInRetailerMobile } from "@/lib/retailer";
import {
  readDb,
  getRetailerLedger
} from "@/lib/storage";

export default async function OutstandingPage() {
  const mobile =
    await getLoggedInRetailerMobile();

  if (!mobile) {
    redirect("/login");
  }

  const db = await readDb();

  const retailer =
    db.retailers.find(
      (r: any) =>
        r.mobile === mobile
    );

  const ledger =
    await getRetailerLedger();

  const entries =
    ledger.filter(
      (row: any) =>
        row.retailer_id ===
        retailer?.id
    );

  const debit =
    entries.reduce(
      (sum: number, row: any) =>
        sum +
        Number(row.debit || 0),
      0
    );

  const credit =
    entries.reduce(
      (sum: number, row: any) =>
        sum +
        Number(row.credit || 0),
      0
    );

  const outstanding =
    debit - credit;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">
        Outstanding Balance
      </h1>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg bg-orange p-5 text-white">
          <p>Total Purchases</p>
          <p className="text-3xl font-bold">
            INR {debit}
          </p>
        </div>

        <div className="rounded-lg bg-green-600 p-5 text-white">
          <p>Total Payments</p>
          <p className="text-3xl font-bold">
            INR {credit}
          </p>
        </div>

        <div className="rounded-lg bg-navy p-5 text-white">
          <p>Outstanding</p>
          <p className="text-3xl font-bold">
            INR {outstanding}
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-lg border bg-white p-5">
        <h2 className="mb-4 text-xl font-bold">
          Ledger Entries
        </h2>

        <div className="space-y-3">
          {entries.map((entry: any) => (
            <div
              key={entry.id}
              className="rounded border p-3"
            >
              <p>
                {entry.remarks}
              </p>

              <p>
                Debit:
                INR {entry.debit}
              </p>

              <p>
                Credit:
                INR {entry.credit}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}