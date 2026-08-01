export const dynamic = "force-dynamic";

import { supabase } from "@/lib/supabase";

export default async function OutstandingPage() {
  // ---------------------------------
  // Retailers
  // ---------------------------------

  const {
    data: retailers,
    error: retailersError,
  } = await supabase
    .from("retailers")
    .select(`
      id,
      shop_name,
      mobile
    `)
    .order("shop_name");

  if (retailersError) {
    console.error(
      "[OUTSTANDING][RETAILERS]",
      retailersError
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
      credit
    `);

  if (ledgerError) {
    console.error(
      "[OUTSTANDING][LEDGER]",
      ledgerError
    );
  }

  const report =
    (retailers ?? [])
      .map((retailer: any) => {

        const entries =
          (ledger ?? []).filter(
            (entry: any) =>
              entry.retailer_id ===
              retailer.id
          );

        const debit =
          entries.reduce(
            (
              total: number,
              entry: any
            ) =>
              total +
              Number(
                entry.debit ?? 0
              ),
            0
          );

        const credit =
          entries.reduce(
            (
              total: number,
              entry: any
            ) =>
              total +
              Number(
                entry.credit ?? 0
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
        (
          a: any,
          b: any
        ) =>
          b.outstanding -
          a.outstanding
      );

  const totalDebit =
    report.reduce(
      (
        total: number,
        row: any
      ) =>
        total +
        row.debit,
      0
    );

  const totalCredit =
    report.reduce(
      (
        total: number,
        row: any
      ) =>
        total +
        row.credit,
      0
    );

  const totalOutstanding =
    report.reduce(
      (
        total: number,
        row: any
      ) =>
        total +
        row.outstanding,
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
            {report.length}
          </p>
        </div>

        <div className="rounded-lg bg-blue-600 p-5 text-white">
          <p>Total Debit</p>

          <p className="text-3xl font-bold">
            ₹
            {totalDebit.toLocaleString(
              "en-IN"
            )}
          </p>
        </div>

        <div className="rounded-lg bg-green-600 p-5 text-white">
          <p>Total Credit</p>

          <p className="text-3xl font-bold">
            ₹
            {totalCredit.toLocaleString(
              "en-IN"
            )}
          </p>
        </div>

        <div className="rounded-lg bg-red-600 p-5 text-white">
          <p>Total Outstanding</p>

          <p className="text-3xl font-bold">
            ₹
            {totalOutstanding.toLocaleString(
              "en-IN"
            )}
          </p>
        </div>

      </div>

      <div className="space-y-4">

        {report.length === 0 ? (

          <div className="rounded-lg border bg-white p-5 text-center text-slate-500">
            No retailer data found.
          </div>

        ) : (

          report.map(
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
                  {retailer.shop_name ??
                    "Unknown Shop"}
                </h3>

                <p className="text-sm text-slate-500">
                  {retailer.mobile}
                </p>

                <p>
                  Debit: ₹
                  {debit.toLocaleString(
                    "en-IN"
                  )}
                </p>

                <p>
                  Credit: ₹
                  {credit.toLocaleString(
                    "en-IN"
                  )}
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
                  Outstanding: ₹
                  {outstanding.toLocaleString(
                    "en-IN"
                  )}
                </p>

              </div>
            )
          )

        )}

      </div>

    </div>
  );
}