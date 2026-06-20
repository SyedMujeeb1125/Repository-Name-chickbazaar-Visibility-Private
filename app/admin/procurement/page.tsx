import {
  readDb,
  getTodayRate,
  getAllocations,
  getFulfillments
} from "@/lib/storage";

export default async function ProcurementPage() {
  const db = await readDb();

  const allocations =
  await getAllocations();

const fulfillments =
  await getFulfillments();

  const todayRate =
    await getTodayRate();

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

  const inventorySummary =
    db.farmInventory.reduce(
      (acc: any, item: any) => {
        acc[item.weightCategory] =
          (acc[item.weightCategory] || 0) +
          Number(item.birdCount || 0);

        return acc;
      },
      {}
    );

  const costSummary =
    db.farmInventory.reduce(
      (acc: any, item: any) => {
        if (
          !acc[item.weightCategory]
        ) {
          acc[item.weightCategory] = {
            totalCost: 0,
            count: 0
          };
        }

        acc[item.weightCategory]
          .totalCost +=
          Number(
            item.procurementPrice || 0
          );

        acc[item.weightCategory]
          .count += 1;

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

    const fulfillmentSummary =
  fulfillments.reduce(
    (acc: any, item: any) => {
      acc[item.farm_id] =
        (acc[item.farm_id] || 0) +
        Number(
          item.accepted_birds || 0
        );

      return acc;
    },
    {}
  );
  const shortageBirds =
  Object.entries(weightSummary)
    .reduce(
      (
        sum: number,
        [weight, demand]
      ) => {
        const available =
          inventorySummary[
            weight
          ] || 0;

        return (
          sum +
          Math.max(
            0,
            Number(demand) -
              available
          )
        );
      },
      0
    );

const allocatedBirds =
  allocations.reduce(
    (sum: number, a: any) =>
      sum +
      Number(
        a.allocated_birds || 0
      ),
    0
  );

const acceptedBirds =
  fulfillments.reduce(
    (sum: number, f: any) =>
      sum +
      Number(
        f.accepted_birds || 0
      ),
    0
  );

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold">
        Procurement Dashboard
      </h1>

      <p className="mb-6 text-slate-500">
        Delivery Date: {tomorrow}
      </p>

      <div className="mb-6 grid gap-4 md:grid-cols-5">
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
      
      <div className="rounded-xl bg-red-600 p-5 text-white">
  <p>Bird Shortage</p>

  <p className="text-3xl font-bold">
    {shortageBirds}
  </p>
</div>

<div className="rounded-xl bg-blue-600 p-5 text-white">
  <p>Allocated Birds</p>

  <p className="text-3xl font-bold">
    {allocatedBirds}
  </p>
</div>

<div className="rounded-xl bg-purple-600 p-5 text-white">
  <p>Accepted Birds</p>

  <p className="text-3xl font-bold">
    {acceptedBirds}
  </p>
</div>
</div>

      <div className="mb-6 rounded-xl border bg-white p-5">
        <h2 className="mb-4 text-xl font-bold">
          Birds Required by Weight
        </h2>

        {Object.entries(weightSummary)
          .length === 0 ? (
          <p>No orders found.</p>
        ) : (
          Object.entries(
            weightSummary
          ).map(
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

      <div className="mb-6 rounded-xl border bg-white p-5">
        <h2 className="mb-4 text-xl font-bold">
          Demand vs Available Inventory
        </h2>

        {Object.entries(
          weightSummary
        ).map(
          ([weight, demand]) => {
            const available =
              inventorySummary[
                weight
              ] || 0;

            const difference =
              available -
              Number(demand);

            return (
              <div
                key={weight}
                className="border-b py-3"
              >
                <p>
                  <strong>
                    {weight}
                  </strong>
                </p>

                <p>
                  Demand:{" "}
                  {String(demand)}
                </p>

                <p>
                  Available:{" "}
                  {available}
                </p>

                <p
                  className={
                    difference >= 0
                      ? "font-semibold text-green-600"
                      : "font-semibold text-red-600"
                  }
                >
                  {difference >= 0
                    ? `Surplus ${difference}`
                    : `Shortage ${Math.abs(
                        difference
                      )}`}
                </p>
              </div>
            );
          }
        )}
      </div>

      <div className="mb-6 rounded-xl border bg-white p-5">
        <h2 className="mb-4 text-xl font-bold">
          Farm Allocation
        </h2>

        {Object.entries(farmSummary)
          .length === 0 ? (
          <p>
            No farm allocations
            found.
          </p>
        ) : (
          Object.entries(
            farmSummary
          ).map(
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

      <div className="rounded-xl border bg-white p-5">
        <h2 className="mb-4 text-xl font-bold">
          Procurement Margin Analysis
        </h2>

        {Object.entries(
          weightSummary
        ).map(
          ([weight, demand]) => {
            const avgCost =
              costSummary[
                weight
              ]
                ? Math.round(
                    costSummary[
                      weight
                    ].totalCost /
                      costSummary[
                        weight
                      ].count
                  )
                : 0;

            const sellRate =
              Number(
                todayRate?.rate || 0
              );

            const margin =
              sellRate -
              avgCost;

            return (
              <div
                key={weight}
                className="border-b py-3"
              >
                <p>
                  <strong>
                    {weight}
                  </strong>
                </p>

                <p>
                  Demand:{" "}
                  {String(demand)} Birds
                </p>

                <p>
                  Avg Farm Cost:
                  ₹{avgCost}
                </p>

                <p>
                  Selling Rate:
                  ₹{sellRate}
                </p>

                <p
                  className={
                    margin >= 0
                      ? "font-semibold text-green-600"
                      : "font-semibold text-red-600"
                  }
                >
                  Margin:
                  ₹{margin}/Kg
                </p>
                
              </div>
            );
          }
        )}
      </div>
      <div className="mt-6 rounded-xl border bg-white p-5">
  <h2 className="mb-4 text-xl font-bold">
    Farm Fulfillment Status
  </h2>

  <div className="grid gap-4 md:grid-cols-3">

  {db.farmPartners
    .filter(
      (farm: any) =>
        farm.status === "approved"
    )
    .map((farm: any) => {

      const allocated =
        allocations
          .filter(
            (a: any) =>
              a.farm_id ===
              farm.id
          )
          .reduce(
            (
              sum: number,
              a: any
            ) =>
              sum +
              Number(
                a.allocated_birds || 0
              ),
            0
          );

      const accepted =
        fulfillmentSummary[
          farm.id
        ] || 0;

      const pending =
        allocated -
        accepted;

      return (
        <div
          key={farm.id}
          className="rounded-lg border bg-slate-50 p-4"
        >
          <p className="font-semibold">
            {farm.farmName}
          </p>

          <p>
            Allocated: {allocated}
          </p>

          <p>
            Accepted: {accepted}
          </p>

          <p
            className={
              pending > 0
                ? "font-semibold text-red-600"
                : "font-semibold text-green-600"
            }
          >
            Pending: {pending}
          </p>
        </div>
            );
    })}

  </div>

</div>
    </div>
  );
}