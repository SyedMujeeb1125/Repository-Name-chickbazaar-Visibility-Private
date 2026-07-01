import { notFound } from "next/navigation";
import { readDb } from "@/lib/storage";

import { InfoCard } from "@/components/info-card";
import { StatusBadge } from "@/components/status-badge";
import { OrderProgress } from "@/components/order-progress";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function OrderStatusPage({
  params,
}: Props) {
  const { id } = await params;

  const db = await readDb();

  const order = db.orders.find(
    (o: any) => o.id === id
  );

  if (!order) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl p-6">

      {/* Header */}

      <div className="mb-6 rounded-xl bg-green-600 p-6 text-white shadow">

        <h1 className="text-3xl font-bold">
          ✅ Order Confirmed
        </h1>

        <p className="mt-2 text-green-100">
          Your order has been received successfully.
          We are now preparing your order.
        </p>

      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        {/* Order Summary */}

        <InfoCard title="Order Summary">

          <div className="space-y-4">

            <div className="flex justify-between">
              <span>Order Number</span>

              <strong>{order.orderNumber}</strong>
            </div>

            <div className="flex justify-between">
              <span>Status</span>

              <StatusBadge status={order.status} />
            </div>

            <div className="flex justify-between">
              <span>Payment</span>

              <StatusBadge
  status={order.paymentStatus || "pending"}
/>
            </div>

            <div className="flex justify-between">
              <span>Estimated Amount</span>

              <strong>
                ₹{order.estimatedAmount}
              </strong>
            </div>

            <div className="flex justify-between">
              <span>Advance Paid</span>

              <strong>
                ₹{order.paymentAmount}
              </strong>
            </div>

            <div className="flex justify-between">
              <span>Delivery Date</span>

              <strong>
                {order.deliveryDate}
              </strong>
            </div>

          </div>

        </InfoCard>

        {/* Progress */}

        <InfoCard title="Order Progress">

          <OrderProgress
            status={order.status}
          />

        </InfoCard>

        {/* Farm */}

        <InfoCard title="Farm Details">

          <div className="space-y-4">

            <div className="flex justify-between">

              <span>Assigned Farm</span>

              <strong>
                {order.assignedFarm ||
                  "Will be assigned shortly"}
              </strong>

            </div>

            <div className="flex justify-between">

              <span>Zone</span>

              <strong>
                {order.zone}
              </strong>

            </div>

          </div>

        </InfoCard>

        {/* Driver */}

        <InfoCard title="Delivery Details">

          <div className="space-y-4">

            <div className="flex justify-between">

              <span>Driver</span>

              <strong>
                {order.assignedDriver ||
                  "Pending Assignment"}
              </strong>

            </div>

            <div className="flex justify-between">

              <span>Vehicle</span>

              <strong>
                {order.assignedVehicle ||
                  "Pending Assignment"}
              </strong>

            </div>

          </div>

        </InfoCard>

      </div>

    </div>
  );
}