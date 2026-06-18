import { redirect } from "next/navigation";
import { getLoggedInRetailerMobile } from "@/lib/retailer";
import { getInvoices, readDb } from "@/lib/storage";

export default async function RetailerInvoicesPage() {
  const mobile =
    await getLoggedInRetailerMobile();

  if (!mobile) {
    redirect("/login");
  }

  const db = await readDb();

  const retailer =
    db.retailers.find(
      (r: any) =>
        r.mobile === mobile
    );

  const invoices =
    await getInvoices();


  const myInvoices =
  invoices.filter(
    (invoice: any) =>
      invoice.retailer_id ===
      retailer?.id
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">
        My Invoices
      </h1>

      <div className="space-y-4">
        {myInvoices.length === 0 ? (
          <div className="rounded-lg border bg-white p-5">
            No invoices found.
          </div>
        ) : (
          myInvoices.map(
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
                  INR {
                    invoice.amount
                  }
                </p>

                <a
                  href={`/api/invoices/${invoice.id}/pdf`}
                  className="mt-3 inline-block rounded bg-green-600 px-4 py-2 text-white"
                >
                  Download PDF
                </a>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
}