type Props = {
  orders: any[];
};

export default function RepeatOrderSummary({
  orders,
}: Props) {

  const totalKg =
    orders.reduce(
      (sum, order) =>
        sum +
        Number(
          order.requested_weight || 0
        ),
      0
    );

  return (
    <div className="grid gap-5 md:grid-cols-3">

      <div className="rounded-xl bg-navy p-5 text-white">

        <p>Total Repeat Orders</p>

        <h2 className="mt-3 text-3xl font-bold">
          {orders.length}
        </h2>

      </div>

      <div className="rounded-xl bg-orange p-5 text-white">

        <p>Daily Quantity</p>

        <h2 className="mt-3 text-3xl font-bold">
          {totalKg} KG
        </h2>

      </div>

      <div className="rounded-xl bg-green-600 p-5 text-white">

        <p>Estimated Monthly</p>

        <h2 className="mt-3 text-3xl font-bold">

          {totalKg * 30} KG

        </h2>

      </div>

    </div>
  );
}