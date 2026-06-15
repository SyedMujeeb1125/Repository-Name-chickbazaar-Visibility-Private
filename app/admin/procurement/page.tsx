import { readDb } from "@/lib/storage";

export default async function ProcurementPage() {
  const db = await readDb();

  const tomorrow = new Date(
    Date.now() + 24 * 60 * 60 * 1000
  )
    .toISOString()
    .split("T")[0];

  const procurementOrders =
    db.orders.filter(
      (order: any) =>
        order.status !== "cancelled" &&
        order.deliveryDate === tomorrow
    );

  const totalOrders =
    procurementOrders.length;

  const totalBirds =
    procurementOrders.reduce(
      (sum: number, order: any) =>
        sum +
        Number(order.birds || 0),
      0
    );

  const weightSummary =
    procurementOrders.reduce(
      (acc: any, order: any) => {
        const weight =
          order.averageWeight ||
          "Not Specified";

        acc[weight] =
          (acc[weight] || 0) +
          Number(order.birds || 0);

        return acc;
      },
      {}
    );

  const farmSummary =
    procurementOrders.reduce(
      (acc: any, order: any) => {
        const farm =
          order.assignedFarm ||
          "Unassigned";

        acc[farm] =
          (acc[farm] || 0) +
          Number(order.birds || 0);

        return acc;
      },
      {}
    );

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold">
        Procurement Dashboard
      </h1>

      <p className="mb-6 text-slate-500">
        Delivery Date: {tomorrow}
      </p>

      <div className="mb-6 grid gap-4 md:grid-cols-2">

        <div className="rounded-xl bg-orange p-5 text-white">
          <p>Total Orders</p>

          <p className="text-3xl font-bold">
            {totalOrders}
          </p>
        </div>

        <div className="rounded-xl bg-green-600 p-5 text-white">
          <p>Total Birds Required</p>

          <p className="text-3xl font-bold">
            {totalBirds}
          </p>
        </div>

      </div>

      <div className="mb-6 rounded-xl border bg-white p-5">
        <h2 className="mb-4 text-xl font-bold">
          Birds Required by Weight
        </h2>

        {Object.entries(weightSummary).length === 0 ? (
          <p>No orders found.</p>
        ) : (
          Object.entries(weightSummary).map(
            ([weight, birds]) => (
              <div
                key={weight}
                className="flex justify-between border-b py-3"
              >
                <span>{weight}</span>

                <span>
                  {String(birds)} Birds
                </span>
              </div>
            )
          )
        )}
      </div>

      <div className="rounded-xl border bg-white p-5">
        <h2 className="mb-4 text-xl font-bold">
          Farm Allocation
        </h2>

        {Object.entries(farmSummary).length === 0 ? (
          <p>No farm allocations found.</p>
        ) : (
          Object.entries(farmSummary).map(
            ([farm, birds]) => (
              <div
                key={farm}
                className="flex justify-between border-b py-3"
              >
                <span>{farm}</span>

                <span>
                  {String(birds)} Birds
                </span>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
}