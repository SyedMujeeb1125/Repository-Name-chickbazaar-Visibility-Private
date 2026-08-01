import Link from "next/link";

import { supabase } from "@/lib/supabase";

export default async function AgingPage() {
  // ---------------------------------
  // Retailers
  // ---------------------------------

  const {
    data: retailers,
    error: retailerError,
  } = await supabase
    .from("retailers")
    .select("id, shop_name")
    .order("shop_name");

  if (retailerError) {
    console.error(
      "[AGING][RETAILERS]",
      retailerError
    );
  }

  // ---------------------------------
  // Ledger
  // ---------------------------------

  const {
    data: ledger,
    error: ledgerError,
  } = await supabase
    .from("retailer_ledger")
    .select("*");

  if (ledgerError) {
    console.error(
      "[AGING][LEDGER]",
      ledgerError
    );
  }

  const report =
    (retailers ?? [])
      .map((retailer: any) => {

        const entries =
          (ledger ?? []).filter(
            (row: any) =>
              row.retailer_id ===
              retailer.id
          );

        const debit =
          entries.reduce(
            (
              total: number,
              row: any
            ) =>
              total +
              Number(
                row.debit ?? 0
              ),
            0
          );

        const credit =
          entries.reduce(
            (
              total: number,
              row: any
            ) =>
              total +
              Number(
                row.credit ?? 0
              ),
            0
          );

        const outstanding =
          Math.max(
            debit - credit,
            0
          );

        const oldestDebit =
          entries
            .filter(
              (row: any) =>
                Number(
                  row.debit ?? 0
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
                86400000
            );

          if (days > 30) {
            aging =
              "30+ Days";
          } else if (
            days > 15
          ) {
            aging =
              "16-30 Days";
          } else if (
            days > 7
          ) {
            aging =
              "8-15 Days";
          }

        }

        return {

          retailer,

          outstanding,

          aging,

        };

      })
      .filter(
        (row: any) =>
          row.outstanding > 0
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

            {report.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="p-6 text-center text-slate-500"
                >
                  No outstanding collections.
                </td>
              </tr>
            ) : (
              report.map(
                (row: any) => (
                  <tr
                    key={
                      row.retailer.id
                    }
                    className="border-b"
                  >
                    <td className="p-3">
                      {
                        row.retailer
                          .shop_name
                      }
                    </td>

                    <td className="p-3 font-semibold text-red-600">
                      ₹
                      {row.outstanding}
                    </td>

                    <td
                      className={`p-3 font-semibold ${
                        row.aging ===
                        "30+ Days"
                          ? "text-red-600"
                          : row.aging ===
                            "16-30 Days"
                          ? "text-orange-600"
                          : row.aging ===
                            "8-15 Days"
                          ? "text-yellow-600"
                          : "text-green-600"
                      }`}
                    >
                      {row.aging}
                    </td>

                    <td className="p-3">
                      <Link
                        href={`/admin/collections/${row.retailer.id}`}
                        className="rounded bg-green-600 px-3 py-2 text-white"
                      >
                        Collect Now
                      </Link>
                    </td>

                  </tr>
                )
              )
            )}

          </tbody>

        </table>

      </div>
    </div>
  );
}