import Link from "next/link";

type Props = {
  orders: any[];
};

export default function RecentOrders({
  orders,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow">

      <h2 className="mb-5 text-xl font-bold">
        Recent Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-slate-500">
          No orders yet.
        </p>
      ) : (
        <div className="space-y-3">

          {orders.slice(0, 5).map((order) => (

            <Link
              key={order.id}
              href={`/orders/${order.id}`}
              className="flex items-center justify-between rounded-lg border p-4 hover:bg-slate-50"
            >
              <div>

                <p className="font-bold text-orange">
                  {order.orderNumber}
                </p>

                <p className="text-sm text-slate-500">
                  {order.status}
                </p>

              </div>

              <span>
                →
              </span>

            </Link>

          ))}

        </div>
      )}

    </div>
  );
}