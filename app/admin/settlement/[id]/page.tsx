export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default async function SettlementDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const {
    data: order,
    error,
  } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error(
      "[SETTLEMENT DETAIL]",
      error
    );
  }

  if (!order) {
    return notFound();
  }

  const podUrl =
    order.pod_photo_url;

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Order Settlement
      </h1>

      <div className="rounded-lg border bg-white p-6">

        <p>
          <strong>Order:</strong>{" "}
          {order.order_number}
        </p>

        <p>
          <strong>Retailer:</strong>{" "}
          {order.shop_name}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          {order.status}
        </p>

        <p>
          <strong>Delivered At:</strong>{" "}
          {order.delivered_at
            ? new Date(
                order.delivered_at
              ).toLocaleString("en-IN")
            : "-"}
        </p>

        <p>
          <strong>Delivery Notes:</strong>{" "}
          {order.delivery_notes ??
            "-"}
        </p>

        {podUrl && (
          <div className="mt-4">
            <p className="mb-2 font-bold">
              POD Photo
            </p>

            <img
              src={podUrl}
              alt="POD"
              className="max-w-md rounded border"
            />
          </div>
        )}

        {podUrl && (
          <div className="mt-3">
            <a
              href={podUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded bg-blue-600 px-4 py-2 text-white"
            >
              View Delivery Proof
            </a>
          </div>
        )}

        <form
          action="/api/admin/order-settlement"
          method="POST"
          className="mt-6 space-y-4"
        >
          <input
            type="hidden"
            name="orderId"
            value={order.id}
          />

          <div>
            <label className="mb-1 block font-medium">
              Actual Weight (Kg)
            </label>

            <input
              type="number"
              step="0.01"
              name="actualWeight"
              defaultValue={
                order.actual_weight ?? ""
              }
              className="w-full rounded border p-3"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">
              Rate Per Kg
            </label>

            <input
              type="number"
              step="0.01"
              name="ratePerKg"
              defaultValue={
                order.rate_per_kg ?? 0
              }
              className="w-full rounded border p-3"
            />
          </div>

          <button
            type="submit"
            className="rounded bg-green-600 px-5 py-3 text-white"
          >
            Save Settlement
          </button>
        </form>

        <form
          action="/api/admin/status"
          method="POST"
          className="mt-4"
        >
          <input
            type="hidden"
            name="collection"
            value="orders"
          />

          <input
            type="hidden"
            name="id"
            value={order.id}
          />

          <input
            type="hidden"
            name="status"
            value="completed"
          />

          <button
            type="submit"
            className="rounded bg-orange-600 px-5 py-3 font-bold text-white"
          >
            Complete Order
          </button>
        </form>

      </div>
    </div>
  );
}