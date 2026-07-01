import RepeatOrderCard from "./RepeatOrderCard";

type Props = {
  orders: any[];
};

export default function RepeatOrderList({
  orders,
}: Props) {

  if (!orders.length) {

    return (
      <div className="rounded-2xl border bg-white p-12 text-center">

        <h2 className="text-2xl font-bold">
          No Repeat Orders
        </h2>

        <p className="mt-3 text-slate-500">
          Create your first repeat order to
          automate daily procurement.
        </p>

      </div>
    );

  }

  return (
    <div className="space-y-6">

      {orders.map((order) => (

        <RepeatOrderCard
          key={order.id}
          order={order}
        />

      ))}

    </div>
  );
}