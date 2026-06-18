import { getInvoices } from "@/lib/storage";

export default async function InvoicesPage() {
  const invoices = await getInvoices();

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
  Invoice Management
</h1>

      <div className="space-y-4">
        {invoices.length === 0 ? (
          <div className="rounded-lg border bg-white p-5">
            No invoices found.
          </div>
        ) : (
          invoices.map((invoice: any) => (
            <div
              key={invoice.id}
              className="rounded-lg border bg-white p-5"
            >
              <p>
                <strong>Invoice:</strong>{" "}
                {invoice.invoice_number}
              </p>

              <p>
                <strong>Retailer:</strong>{" "}
                {invoice.retailer_name}
              </p>

              <p>
                <strong>Order:</strong>{" "}
                {invoice.order_number}
              </p>

              <p>
                <strong>Amount:</strong>{" "}
                ₹{invoice.amount}
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {new Date(
                  invoice.created_at
                ).toLocaleDateString()}
              </p>
              <a
  href={`/api/invoices/${invoice.id}`}
  className="mt-3 inline-block rounded bg-orange px-4 py-2 text-white"
>
  Download Invoice
</a>
<a
  href={`/api/invoices/${invoice.id}/pdf`}
  className="ml-3 inline-block rounded bg-green-600 px-4 py-2 text-white"
>
  Download PDF
</a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}