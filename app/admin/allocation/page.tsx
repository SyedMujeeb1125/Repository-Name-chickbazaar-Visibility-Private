import {
  readDb,
  getAllocations
} from "@/lib/storage";

export default async function AllocationPage() {
  const db = await readDb();

  const allocations =
    await getAllocations();

  const orders = db.orders.filter(
    (order: any) =>
      order.status !== "cancelled"
  );

  const demandSummary =
    orders.reduce(
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

  const approvedFarms =
    db.farmPartners.filter(
      (farm: any) =>
        farm.status === "approved"
    );

  const availableInventory =
    db.farmInventory.filter(
      (item: any) =>
        Number(item.birdCount) > 0
    );

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Farm Allocation
      </h1>

      <div className="rounded-xl border bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">
          Demand vs Available Supply
        </h2>

        {Object.entries(
          demandSummary
        ).length === 0 ? (
          <p>No demand found.</p>
        ) : (
          Object.entries(
            demandSummary
          ).map(
            ([weight, demand]) => {
              const available =
                inventorySummary[
                  weight
                ] || 0;

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
                </div>
              );
            }
          )
        )}
      </div>

      <div className="mt-6 rounded-xl border bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">
          Available Farm Inventory
        </h2>

        {availableInventory.length === 0 ? (
          <p>
            No inventory available.
          </p>
        ) : (
          availableInventory.map(
            (inventory: any) => {
              const farm =
                approvedFarms.find(
                  (f: any) =>
                    f.id ===
                    inventory.farmId
                );

              const allocated =
  Number(
    inventory.reservedBirdCount ?? 0
  );

const remaining =
  Number(
    inventory.availableBirdCount ??
    inventory.birdCount
  );

              return (
                <div
                  key={inventory.id}
                  className="border-b py-4"
                >
                  <p className="font-semibold">
                    {farm?.farmName ||
                      inventory.farmId}
                  </p>

                  <p>
                    Weight:{" "}
                    {
                      inventory.weightCategory
                    }
                  </p>

                  <p>
  Total Birds:{" "}
  {inventory.birdCount}
</p>

<p className="text-orange-600">
  Reserved:{" "}
  {allocated}
</p>

<p
  className={
    remaining > 0
      ? "text-green-600"
      : "text-red-600"
  }
>
  Available:{" "}
  {remaining}
</p>

                  <p>
                    Cost: ₹
                    {
                      inventory.procurementPrice
                    }
                  </p>

                  {remaining <= 0 ? (
                    <div className="mt-3 rounded bg-green-100 p-2 text-green-700">
                      Fully Allocated
                    </div>
                  ) : (
                    <form
                      action="/api/admin/allocation"
                      method="POST"
                      className="mt-3"
                    >
                      <input
                        type="hidden"
                        name="farmId"
                        value={
                          inventory.farmId
                        }
                      />

                      <input
                        type="hidden"
                        name="farmName"
                        value={
                          farm?.farmName ||
                          ""
                        }
                      />

                      <input
                        type="hidden"
                        name="weightCategory"
                        value={
                          inventory.weightCategory
                        }
                      />

                      <input
                        type="hidden"
                        name="allocatedBirds"
                        value={
                          remaining
                        }
                      />

                      <button
                        type="submit"
                        className="rounded bg-green-600 px-4 py-2 text-white"
                      >
                        Allocate Remaining
                      </button>
                    </form>
                  )}
                </div>
              );
            }
          )
        )}
      </div>

      <div className="mt-6 rounded-xl border bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">
          Allocation History
        </h2>

        {allocations.length === 0 ? (
          <p>No allocations yet.</p>
        ) : (
          allocations.map(
            (allocation: any) => (
              <div
                key={allocation.id}
                className="border-b py-3"
              >
                <p className="font-semibold">
                  {allocation.farm_name}
                </p>

                <p>
                  Weight:{" "}
                  {
                    allocation.weight_category
                  }
                </p>

                <p>
                  Birds:{" "}
                  {
                    allocation.allocated_birds
                  }
                </p>

                <p>
                  Date:{" "}
                  {
                    allocation.allocation_date
                  }
                </p>

                <p className="text-green-600">
                  {
                    allocation.status
                  }
                </p>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
}