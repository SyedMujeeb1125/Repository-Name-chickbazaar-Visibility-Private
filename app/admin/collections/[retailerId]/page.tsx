import {
  readDb,
  getRetailerOutstanding,
  getRetailerPayments
} from "@/lib/storage";

export default async function CollectionEntryPage({
  params,
}: {
  params: Promise<{
    retailerId: string;
  }>;
}) {
  const { retailerId } =
    await params;

  const db = await readDb();

  const retailer =
    db.retailers.find(
      (r: any) =>
        r.id === retailerId
    );

  if (!retailer) {
    return (
      <div>
        Retailer not found
      </div>
    );
  }

  const outstanding =
    await getRetailerOutstanding(
      retailerId
    );
    const payments =
  await getRetailerPayments(
    retailerId
  );

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Receive Payment
      </h1>

      <div className="rounded-lg border bg-white p-5">
        <h2 className="text-xl font-bold">
          {retailer.shopName}
        </h2>

        <p>
          Mobile:
          {" "}
          {retailer.mobile}
        </p>

        <p className="mt-3 font-bold text-red-600">
          Outstanding:
          ₹
          {outstanding.outstanding}
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
    value={retailer.id}
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
      max={outstanding.outstanding}
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
      className="w-full rounded border p-3"
      placeholder="UPI / Bank Transfer / Cash"
    />
  </div>

  <button
    type="submit"
    className="rounded bg-green-600 px-5 py-3 font-semibold text-white"
  >
    Save Collection
  </button>
</form>
<div className="mt-6 rounded-lg border bg-white p-5">
  <h2 className="mb-4 text-xl font-bold">
    Collection History
  </h2>

  {payments.length === 0 ? (
    <p>No collections found.</p>
  ) : (
    payments.map((p: any) => (
      <div
        key={p.id}
        className="border-b py-3"
      >
        <p>
          ₹{p.credit}
        </p>

        <p className="text-sm text-slate-500">
          {p.remarks}
        </p>

        <p className="text-xs text-slate-400">
          {new Date(
            p.created_at
          ).toLocaleString()}
        </p>
      </div>
    ))
  )}
</div>
    </div>
  );
}