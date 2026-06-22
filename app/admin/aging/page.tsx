import Link from "next/link";
import {
  readDb,
  getRetailerLedger
} from "@/lib/storage";

export default async function AgingPage() {
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

        const outstanding =
          debit - credit;

        const oldestDebit =
          entries
            .filter(
              (e: any) =>
                Number(
                  e.debit || 0
                ) > 0
            )
            .sort(
              (
                a: any,
                b: any
              ) =>
                new Date(
                  a.created_at
                ).getTime() -
                new Date(
                  b.created_at
                ).getTime()
            )[0];

        let aging =
          "0-7 Days";

        if (oldestDebit) {
          const days =
            Math.floor(
              (
                Date.now() -
                new Date(
                  oldestDebit.created_at
                ).getTime()
              ) /
                (1000 *
                  60 *
                  60 *
                  24)
            );

          if (days > 30)
            aging =
              "30+ Days";
          else if (
            days > 15
          )
            aging =
              "16-30 Days";
          else if (
            days > 7
          )
            aging =
              "8-15 Days";
        }

        return {
          retailer,
          outstanding,
          aging,
        };
      })
      .filter(
        (r: any) =>
          r.outstanding > 0
      );

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Aging Report
      </h1>

      <div className="overflow-auto rounded-lg border bg-white">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-slate-100">
              <th className="p-3 text-left">
                Retailer
              </th>

              <th className="p-3 text-left">
                Outstanding
              </th>

              <th className="p-3 text-left">
                Aging
              </th>

              <th className="p-3 text-left">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {retailers.map(
              (r: any) => (
                <tr
                  key={
                    r.retailer.id
                  }
                  className="border-b"
                >
                  <td className="p-3">
                    {
                      r.retailer
                        .shopName
                    }
                  </td>

                  <td className="p-3 font-semibold text-red-600">
                    ₹
                    {
                      r.outstanding
                    }
                  </td>

                  <td
                    className={`p-3 font-semibold ${
                      r.aging ===
                      "30+ Days"
                        ? "text-red-600"
                        : r.aging ===
                          "16-30 Days"
                        ? "text-orange-600"
                        : r.aging ===
                          "8-15 Days"
                        ? "text-yellow-600"
                        : "text-green-600"
                    }`}
                  >
                    {r.aging}
                  </td>

                  <td className="p-3">
                    <Link
                      href={`/admin/collections/${r.retailer.id}`}
                      className="rounded bg-green-600 px-3 py-2 text-white"
                    >
                      Collect Now
                    </Link>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}