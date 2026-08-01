import { supabase } from "@/lib/supabase";

export default async function InvoicesPage() {
  const {
    data: invoices,
    error,
  } = await supabase
    .from("invoices")
    .select(`
      id,
      invoice_number,
      retailer_name,
      order_number,
      amount,
      created_at
    `)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error(
      "[ADMIN_INVOICES]",
      error
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Invoice Management
      </h1>

      <div className="space-y-4">

        {(invoices ?? []).length === 0 ? (

          <div className="rounded-lg border bg-white p-5">
            No invoices found.
          </div>

        ) : (

          (invoices ?? []).map(
            (invoice: any) => (
              <div
                key={invoice.id}
                className="rounded-lg border bg-white p-5"
              >
                <p>
                  <strong>
                    Invoice:
                  </strong>{" "}
                  {
                    invoice.invoice_number
                  }
                </p>

                <p>
                  <strong>
                    Retailer:
                  </strong>{" "}
                  {
                    invoice.retailer_name
                  }
                </p>

                <p>
                  <strong>
                    Order:
                  </strong>{" "}
                  {
                    invoice.order_number
                  }
                </p>

                <p>
                  <strong>
                    Amount:
                  </strong>{" "}
                  ₹
                  {Number(
                    invoice.amount ?? 0
                  ).toLocaleString(
                    "en-IN"
                  )}
                </p>

                <p>
                  <strong>
                    Date:
                  </strong>{" "}
                  {invoice.created_at
                    ? new Date(
                        invoice.created_at
                      ).toLocaleDateString(
                        "en-IN"
                      )
                    : "-"}
                </p>

                <div className="mt-3 flex gap-3">

                  <a
                    href={`/api/invoices/${invoice.id}`}
                    className="inline-block rounded bg-orange px-4 py-2 text-white"
                  >
                    Download Invoice
                  </a>

                  <a
                    href={`/api/invoices/${invoice.id}/pdf`}
                    className="inline-block rounded bg-green-600 px-4 py-2 text-white"
                  >
                    Download PDF
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