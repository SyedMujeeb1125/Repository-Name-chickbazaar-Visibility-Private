import { supabase } from "@/lib/supabase";
import PaymentCalculator from "@/components/driver/PaymentCalculator";

export default async function DriverOrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: order, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !order) {
    return (
      <div className="p-10 text-center text-xl">
        Order not found.
      </div>
    );
  }

  const mapsUrl = `https://www.google.com/maps?q=${order.latitude},${order.longitude}`;

  return (
    <div className="mx-auto max-w-5xl p-6">

      <h1 className="mb-6 text-3xl font-bold">
        Delivery Details
      </h1>

      <div className="rounded-2xl border bg-white p-6 shadow">

        <div className="grid gap-4 md:grid-cols-2">

          <div>

            <p className="text-sm text-gray-500">
              Order Number
            </p>

            <h2 className="text-xl font-bold">
              {order.order_number}
            </h2>

          </div>

          <div>

            <p className="text-sm text-gray-500">
              Status
            </p>

            <h2 className="font-semibold capitalize">
              {order.status}
            </h2>

          </div>

          <div>

            <p className="text-sm text-gray-500">
              Shop Name
            </p>

            <h2 className="font-semibold">
              {order.shop_name}
            </h2>

          </div>

          <div>

            <p className="text-sm text-gray-500">
              Owner
            </p>

            <h2 className="font-semibold">
              {order.owner_name}
            </h2>

          </div>

          <div>

            <p className="text-sm text-gray-500">
              Mobile
            </p>

            <h2 className="font-semibold">
              {order.mobile}
            </h2>

          </div>

          <div>

            <p className="text-sm text-gray-500">
              Assigned Farm
            </p>

            <h2 className="font-semibold">
              {order.assigned_farm}
            </h2>

          </div>

          <div className="md:col-span-2">

            <p className="text-sm text-gray-500">
              Delivery Address
            </p>

            <h2 className="font-semibold">
              {order.address}
            </h2>

          </div>

        </div>

        <div className="mt-8 flex flex-wrap gap-3">

          <a
            href={`tel:${order.mobile}`}
            className="rounded-lg bg-green-600 px-5 py-3 font-medium text-white hover:bg-green-700"
          >
            📞 Call
          </a>

          <a
            href={`https://wa.me/91${order.mobile}`}
            target="_blank"
            className="rounded-lg bg-green-700 px-5 py-3 font-medium text-white hover:bg-green-800"
          >
            💬 WhatsApp
          </a>

          <a
            href={mapsUrl}
            target="_blank"
            className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
          >
            🧭 Navigate
          </a>

        </div>

      </div>

      <form
        action="/api/driver/deliver"
        method="POST"
        encType="multipart/form-data"
        className="mt-6"
      >

        <input
          type="hidden"
          name="orderId"
          value={order.id}
        />

        <PaymentCalculator
          requestedWeight={Number(order.requested_weight)}
          ratePerKg={Number(order.rate_per_kg)}
          advanceAmount={Number(order.advance_amount)}
          estimatedAmount={Number(order.estimated_amount)}
        />

                <div className="mt-6 rounded-2xl border bg-white p-6 shadow">

          <h2 className="mb-5 text-xl font-bold">
            Proof of Delivery
          </h2>

          <input
            type="file"
            name="podPhoto"
            accept="image/*"
            className="w-full rounded-lg border p-3"
          />

          <textarea
            name="deliveryNotes"
            defaultValue={order.delivery_notes ?? ""}
            rows={4}
            placeholder="Delivery Notes (Optional)"
            className="mt-4 w-full rounded-lg border p-3"
          />

        </div>

        <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-6">

          <h2 className="mb-3 text-lg font-bold text-blue-800">
            Payment Reminder
          </h2>

          <ul className="space-y-2 text-sm leading-6 text-blue-700">

            <li>
              • Collect the remaining payment before completing delivery whenever possible.
            </li>

            <li>
              • Retailers may pay by Cash, UPI or a combination of both.
            </li>

            <li>
              • Any unpaid balance will automatically be carried forward.
            </li>

            <li>
              • Retailers must clear the outstanding balance before placing their next order.
            </li>

          </ul>

        </div>

        <div className="mt-8">

          <button
            type="submit"
            className="w-full rounded-xl bg-orange-500 px-6 py-4 text-lg font-bold text-white transition hover:bg-orange-600"
          >
            Complete Delivery
          </button>

        </div>

      </form>

    </div>
  );
}