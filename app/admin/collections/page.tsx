export const dynamic = "force-dynamic";
import Link from "next/link";
import {
  readDb,
  getRetailerLedger,
  getRetailerOutstanding,
} from "@/lib/storage";

export default async function CollectionsPage() {
  const db = await readDb();

  const ledger =
    await getRetailerLedger();

  const retailers = await Promise.all(
    db.retailers.map(
      async (retailer: any) => {
        const entries =
          ledger.filter(
            (l: any) =>
              l.retailer_id ===
              retailer.id
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

        const outstandingData =
          await getRetailerOutstanding(
            retailer.id
          );

        const lastPayment =
          entries
            .filter(
              (e: any) =>
                Number(
                  e.credit || 0
                ) > 0
            )
            .sort(
              (
                a: any,
                b: any
              ) =>
                new Date(
                  b.created_at
                ).getTime() -
                new Date(
                  a.created_at
                ).getTime()
            )[0];

        return {
          ...retailer,

          outstanding:
            outstandingData.outstanding,

          totalCollected:
            credit,

          lastPaymentDate:
            lastPayment
              ?.created_at ||
            null,
        };
      }
    )
  );

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Collections Dashboard
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
                Total Collected
              </th>

              <th className="p-3 text-left">
                Last Payment
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
                  key={r.id}
                  className="border-b"
                >
                  <td className="p-3">
                    {r.shopName}
                  </td>

                  <td className="p-3 font-semibold text-red-600">
                    ₹
                    {r.outstanding}
                  </td>

                  <td className="p-3 text-green-600">
                    ₹
                    {r.totalCollected}
                  </td>

                  <td className="p-3">
                    {r.lastPaymentDate
                      ? new Date(
                          r.lastPaymentDate
                        ).toLocaleDateString()
                      : "-"}
                  </td>

                  <td className="p-3">
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/collections/${r.id}`}
                        className="rounded bg-green-600 px-3 py-2 text-white"
                      >
                        Receive Payment
                      </Link>

                      <Link
                        href={`/admin/statement/${r.id}`}
                        className="rounded bg-blue-600 px-3 py-2 text-white"
                      >
                        Statement
                      </Link>
                    </div>
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