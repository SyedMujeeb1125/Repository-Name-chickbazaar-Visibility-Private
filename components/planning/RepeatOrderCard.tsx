import Link from "next/link";

type Props = {
  order: any;
};

export default function RepeatOrderCard({
  order,
}: Props) {
  const active =
    order.status === "active";

  return (
    <div className="rounded-2xl border bg-white p-6 shadow">

      <div className="flex items-center justify-between">

        <div>

          <div
            className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
              active
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {active ? "ACTIVE" : "PAUSED"}
          </div>

          <h2 className="mt-4 text-2xl font-bold">

            {order.frequency
              ?.charAt(0)
              .toUpperCase() +
              order.frequency?.slice(1)}

          </h2>

          <p className="mt-2 text-slate-500">

            {order.requested_weight ||
              order.birds}

            {" "}

            {order.order_by === "weight"
              ? "KG"
              : "Birds"}

          </p>

        </div>

        <div className="text-right">

          <p className="text-sm text-slate-500">
            Next Delivery
          </p>

          <p className="font-bold">
            Tomorrow
          </p>

        </div>

      </div>

      <div className="mt-8 flex gap-3">

        <Link
          href={`/repeat-orders/${order.id}/edit`}
          className="rounded-lg bg-orange px-5 py-3 font-bold text-white"
        >
          Edit
        </Link>

        <button
          className={`rounded-lg px-5 py-3 font-bold text-white ${
            active
              ? "bg-red-600"
              : "bg-green-600"
          }`}
        >
          {active
            ? "Pause"
            : "Resume"}
        </button>

      </div>

    </div>
  );
}