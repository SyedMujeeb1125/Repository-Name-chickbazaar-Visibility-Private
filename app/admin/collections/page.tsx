export const dynamic = "force-dynamic";

import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function CollectionsPage() {
  // ---------------------------------
  // Retailers
  // ---------------------------------

  const {
    data: retailers,
    error: retailerError,
  } = await supabase
    .from("retailers")
    .select(`
      id,
      shop_name,
      mobile
    `)
    .order("shop_name");

  if (retailerError) {
    console.error(
      "[COLLECTIONS][RETAILERS]",
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
    .select(`
      retailer_id,
      debit,
      credit,
      created_at
    `);

  if (ledgerError) {
    console.error(
      "[COLLECTIONS][LEDGER]",
      ledgerError
    );
  }

  const rows =
    (retailers ?? []).map(
      (retailer: any) => {
        const entries =
          (ledger ?? []).filter(
            (entry: any) =>
              entry.retailer_id ===
              retailer.id
          );

        const totalDebit =
          entries.reduce(
            (
              sum: number,
              row: any
            ) =>
              sum +
              Number(
                row.debit ?? 0
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
                row.credit ?? 0
              ),
            0
          );

        const outstanding =
          Math.max(
            totalDebit -
              totalCredit,
            0
          );

        const lastPayment =
          entries
            .filter(
              (row: any) =>
                Number(
                  row.credit ?? 0
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
          id: retailer.id,
          shopName:
            retailer.shop_name,
          mobile:
            retailer.mobile,
          outstanding,
          totalCollected:
            totalCredit,
          lastPaymentDate:
            lastPayment
              ?.created_at ??
            null,
        };
      }
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

            {/* ===== CONTINUE WITH PART 2 ===== */}

                        {rows.length === 0 ? (

              <tr>
                <td
                  colSpan={5}
                  className="p-6 text-center text-slate-500"
                >
                  No retailers found.
                </td>
              </tr>

            ) : (

              rows.map(
                (row: any) => (
                  <tr
                    key={row.id}
                    className="border-b"
                  >
                    <td className="p-3">
                      {row.shopName}
                    </td>

                    <td className="p-3 font-semibold text-red-600">
                      ₹
                      {row.outstanding.toLocaleString(
                        "en-IN"
                      )}
                    </td>

                    <td className="p-3 font-semibold text-green-600">
                      ₹
                      {row.totalCollected.toLocaleString(
                        "en-IN"
                      )}
                    </td>

                    <td className="p-3">
                      {row.lastPaymentDate
                        ? new Date(
                            row.lastPaymentDate
                          ).toLocaleDateString(
                            "en-IN"
                          )
                        : "-"}
                    </td>

                    <td className="p-3">
                      <div className="flex gap-2">

                        <Link
                          href={`/admin/collections/${row.id}`}
                          className="rounded bg-green-600 px-3 py-2 text-white"
                        >
                          Receive Payment
                        </Link>

                        <Link
                          href={`/admin/statement/${row.id}`}
                          className="rounded bg-blue-600 px-3 py-2 text-white"
                        >
                          Statement
                        </Link>

                      </div>
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