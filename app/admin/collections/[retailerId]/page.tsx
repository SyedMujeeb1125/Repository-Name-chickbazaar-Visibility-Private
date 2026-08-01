import { supabase } from "@/lib/supabase";

export default async function CollectionEntryPage({
  params,
}: {
  params: Promise<{
    retailerId: string;
  }>;
}) {
  const { retailerId } =
    await params;

  // ---------------------------------
  // Retailer
  // ---------------------------------

  const {
    data: retailer,
    error: retailerError,
  } = await supabase
    .from("retailers")
    .select(
      `
      id,
      shop_name,
      mobile
      `
    )
    .eq("id", retailerId)
    .maybeSingle();

  if (retailerError) {
    console.error(
      "[COLLECTION][RETAILER]",
      retailerError
    );
  }

  if (!retailer) {
    return (
      <div>
        Retailer not found
      </div>
    );
  }

  // ---------------------------------
  // Outstanding
  // ---------------------------------

  const {
    data: ledger,
    error: ledgerError,
  } = await supabase
    .from("retailer_ledger")
    .select(
      `
      debit,
      credit
      `
    )
    .eq(
      "retailer_id",
      retailerId
    );

  if (ledgerError) {
    console.error(
      "[COLLECTION][LEDGER]",
      ledgerError
    );
  }

  const outstanding =
    (ledger ?? []).reduce(
      (
        balance,
        row: any
      ) =>
        balance +
        Number(
          row.debit ?? 0
        ) -
        Number(
          row.credit ?? 0
        ),
      0
    );

  // ---------------------------------
  // Payments
  // ---------------------------------

  const {
    data: payments,
    error: paymentsError,
  } = await supabase
    .from(
      "retailer_payments"
    )
    .select("*")
    .eq(
      "retailer_id",
      retailerId
    )
    .order("created_at", {
      ascending: false,
    });

  if (paymentsError) {
    console.error(
      "[COLLECTION][PAYMENTS]",
      paymentsError
    );
  }

  return (
    <div>

      <h1 className="mb-6 text-3xl font-bold">
        Receive Payment
      </h1>

      <div className="rounded-lg border bg-white p-5">

        <h2 className="text-xl font-bold">
          {
            retailer.shop_name
          }
        </h2>

        <p>
          Mobile:{" "}
          {
            retailer.mobile
          }
        </p>

        <p className="mt-3 font-bold text-red-600">
          Outstanding: ₹
          {outstanding}
        </p>

      </div>

      <form
        action="/api/admin/payments"
        method="post"
        className="mt-6 rounded-lg border bg-white p-5"
      >

        <input
          type="hidden"
          name="retailer_id"
          value={
            retailer.id
          }
        />

        <div className="mb-4">

          <label className="mb-2 block font-semibold">
            Amount Received
          </label>

          <input
            type="number"
            name="amount"
            required
            min="1"
            max={
              outstanding
            }
            className="w-full rounded border p-3"
          />

        </div>

        <div className="mb-4">

          <label className="mb-2 block font-semibold">
            Payment Mode
          </label>

          <select
            name="payment_mode"
            required
            className="w-full rounded border p-3"
          >
            <option value="">
              Select Mode
            </option>

            <option value="Cash">
              Cash
            </option>

            <option value="UPI">
              UPI
            </option>

            <option value="Bank Transfer">
              Bank Transfer
            </option>

            <option value="Cheque">
              Cheque
            </option>

          </select>

        </div>

        <div className="mb-4">

          <label className="mb-2 block font-semibold">
            Reference Number
          </label>

          <input
            type="text"
            name="reference_number"
            placeholder="UPI Ref / Bank Ref / Cheque No"
            className="w-full rounded border p-3"
          />

        </div>

        <div className="mb-4">

          <label className="mb-2 block font-semibold">
            Received By
          </label>

          <input
            type="text"
            name="received_by"
            defaultValue="Admin"
            className="w-full rounded border p-3"
          />

        </div>

        <div className="mb-4">

          <label className="mb-2 block font-semibold">
            Remarks
          </label>

          <textarea
            name="remarks"
            rows={3}
            placeholder="UPI / Bank Transfer / Cash"
            className="w-full rounded border p-3"
          />

        </div>

        <button
          type="submit"
          className="rounded bg-green-600 px-5 py-3 font-semibold text-white"
        >
          Save Collection
        </button>

      </form>

      {/* ===== CONTINUE WITH PART 2 ===== */}

            <div className="mt-6 rounded-lg border bg-white p-5">

        <h2 className="mb-4 text-xl font-bold">
          Collection History
        </h2>

        {(payments ?? []).length === 0 ? (

          <p>
            No collections found.
          </p>

        ) : (

          (payments ?? []).map(
            (payment: any) => (
              <div
                key={payment.id}
                className="border-b py-3"
              >
                <div className="flex items-center justify-between">

                  <div>

                    <p className="font-semibold">
                      ₹
                      {Number(
                        payment.amount ??
                        payment.credit ??
                        0
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </p>

                    <p className="text-sm text-slate-600">
                      {payment.payment_mode}
                      {payment.reference_number
                        ? ` • ${payment.reference_number}`
                        : ""}
                    </p>

                    {payment.remarks && (
                      <p className="text-sm text-slate-500">
                        {payment.remarks}
                      </p>
                    )}

                    <p className="text-xs text-slate-400">
                      {payment.created_at
                        ? new Date(
                            payment.created_at
                          ).toLocaleString(
                            "en-IN"
                          )
                        : "-"}
                    </p>

                  </div>

                  <a
                    href={`/api/receipts/${payment.id}/pdf`}
                    className="rounded bg-blue-600 px-3 py-2 text-sm text-white"
                  >
                    Download Receipt
                  </a>

                </div>
              </div>
            )
          )

        )}

      </div>

    </div>
  );
}