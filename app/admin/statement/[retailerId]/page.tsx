export const dynamic = "force-dynamic";

import { supabase } from "@/lib/supabase";

export default async function StatementPage({
  params,
}: {
  params: Promise<{
    retailerId: string;
  }>;
}) {
  const { retailerId } = await params;

  const [
    {
      data: retailer,
      error: retailerError,
    },
    {
      data: entries,
      error: ledgerError,
    },
  ] = await Promise.all([
    supabase
      .from("retailers")
      .select("*")
      .eq("id", retailerId)
      .maybeSingle(),

    supabase
      .from("retailer_ledger")
      .select("*")
      .eq("retailer_id", retailerId)
      .order("created_at", {
        ascending: false,
      }),
  ]);

  if (retailerError) {
    console.error(
      "[STATEMENT][RETAILER]",
      retailerError
    );
  }

  if (ledgerError) {
    console.error(
      "[STATEMENT][LEDGER]",
      ledgerError
    );
  }

  if (!retailer) {
    return (
      <div>
        Retailer not found
      </div>
    );
  }

  const totalDebit =
    (entries ?? []).reduce(
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
    (entries ?? []).reduce(
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
    totalDebit - totalCredit;

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Retailer Statement
      </h1>

      <div className="rounded-lg border bg-white p-5">
        <h2 className="text-xl font-bold">
          {retailer.shop_name}
        </h2>

        <p>
          {retailer.mobile}
        </p>

        <p className="mt-3">
          Outstanding: ₹
          {outstanding.toLocaleString(
            "en-IN"
          )}
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">

        <div className="rounded-lg bg-red-600 p-5 text-white">
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

        <div className="rounded-lg bg-blue-600 p-5 text-white">
          <p>Outstanding</p>

          <p className="text-3xl font-bold">
            ₹
            {outstanding.toLocaleString(
              "en-IN"
            )}
          </p>
        </div>

      </div>

      <div className="mt-6 rounded-lg border bg-white p-5">

        <h2 className="mb-4 text-xl font-bold">
          Ledger History
        </h2>

        {(entries ?? []).length === 0 ? (

          <p>
            No transactions found.
          </p>

        ) : (

          (entries ?? []).map(
            (entry: any) => (

              <div
                key={entry.id}
                className="border-b py-3 last:border-0"
              >

                <p>
                  Debit: ₹
                  {Number(
                    entry.debit ?? 0
                  ).toLocaleString(
                    "en-IN"
                  )}
                </p>

                <p>
                  Credit: ₹
                  {Number(
                    entry.credit ?? 0
                  ).toLocaleString(
                    "en-IN"
                  )}
                </p>

                <p>
                  {entry.remarks ?? "-"}
                </p>

                <p className="text-xs text-slate-500">
                  {entry.created_at
                    ? new Date(
                        entry.created_at
                      ).toLocaleString(
                        "en-IN"
                      )
                    : "-"}
                </p>

              </div>

            )
          )

        )}

      </div>
    </div>
  );
}