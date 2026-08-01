import { supabase } from "@/lib/supabase";

export default async function LedgerPage() {
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
      status
    `)
    .eq("status", "approved")
    .order("shop_name");

  if (retailersError) {
    console.error(
      "[LEDGER][RETAILERS]",
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
      "[LEDGER]",
      ledgerError
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Retailer Ledger
      </h1>

      {(retailers ?? []).length === 0 ? (

        <div className="rounded-xl border bg-white p-5 text-center text-slate-500">
          No approved retailers found.
        </div>

      ) : (

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
                  total: number,
                  entry: any
                ) =>
                  total +
                  Number(
                    entry.debit ?? 0
                  ),
                0
              );

            const totalCredit =
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

            const outstanding =
              Math.max(
                totalDebit -
                  totalCredit,
                0
              );

            return (
              <div
                key={retailer.id}
                className="mb-4 rounded-xl border bg-white p-5"
              >
                <p className="font-bold">
                  {retailer.shop_name}
                </p>

                <p>
                  Debit: ₹
                  {totalDebit.toLocaleString(
                    "en-IN"
                  )}
                </p>

                <p>
                  Credit: ₹
                  {totalCredit.toLocaleString(
                    "en-IN"
                  )}
                </p>

                <p
                  className={
                    outstanding > 0
                      ? "font-semibold text-red-600"
                      : "font-semibold text-green-600"
                  }
                >
                  Outstanding: ₹
                  {outstanding.toLocaleString(
                    "en-IN"
                  )}
                </p>
              </div>
            );

          }
        )

      )}
    </div>
  );
}