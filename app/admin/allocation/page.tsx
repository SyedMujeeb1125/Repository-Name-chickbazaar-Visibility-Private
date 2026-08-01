import { supabase } from "@/lib/supabase";

export default async function AllocationPage() {
  // -----------------------------------
  // Orders
  // -----------------------------------

  const {
    data: orders,
    error: ordersError,
  } = await supabase
    .from("orders")
    .select(
      `
      id,
      status,
      average_weight,
      birds
      `
    )
    .neq("status", "cancelled");

  if (ordersError) {
    console.error(
      "[ALLOCATION][ORDERS]",
      ordersError
    );
  }

  // -----------------------------------
  // Farm Inventory
  // -----------------------------------

  const {
    data: inventory,
    error: inventoryError,
  } = await supabase
    .from("farm_inventory")
    .select("*");

  if (inventoryError) {
    console.error(
      "[ALLOCATION][INVENTORY]",
      inventoryError
    );
  }

  // -----------------------------------
  // Farm Partners
  // -----------------------------------

  const {
    data: farms,
    error: farmsError,
  } = await supabase
    .from("farm_partners")
    .select("*")
    .eq("status", "approved");

  if (farmsError) {
    console.error(
      "[ALLOCATION][FARMS]",
      farmsError
    );
  }

  // -----------------------------------
  // Allocation History
  // -----------------------------------

  const {
    data: allocations,
    error: allocationsError,
  } = await supabase
    .from("farm_allocations")
    .select("*")
    .order("allocation_date", {
      ascending: false,
    });

  if (allocationsError) {
    console.error(
      "[ALLOCATION][HISTORY]",
      allocationsError
    );
  }

  // -----------------------------------
  // Demand Summary
  // -----------------------------------

  const demandSummary =
    (orders ?? []).reduce(
      (acc: any, order: any) => {

        const weight =
          order.average_weight ??
          "Not Specified";

        acc[weight] =
          (acc[weight] ?? 0) +
          Number(
            order.birds ?? 0
          );

        return acc;

      },
      {}
    );

  // -----------------------------------
  // Inventory Summary
  // -----------------------------------

  const inventorySummary =
    (inventory ?? []).reduce(
      (
        acc: any,
        item: any
      ) => {

        const key =
          item.weight_category;

        acc[key] =
          (acc[key] ?? 0) +
          Number(
            item.available_bird_count ??
            item.bird_count ??
            0
          );

        return acc;

      },
      {}
    );

  const availableInventory =
    (inventory ?? []).filter(
      (item: any) =>
        Number(
          item.available_bird_count ??
          item.bird_count ??
          0
        ) > 0
    );

  return (
    <div>

      <h1 className="mb-6 text-3xl font-bold">
        Farm Allocation
      </h1>

      {/* ------------------------------ */}
      {/* Demand Summary */}
      {/* ------------------------------ */}

      <div className="rounded-xl border bg-white p-6">

        <h2 className="mb-4 text-xl font-bold">
          Demand vs Available Supply
        </h2>

        {Object.keys(
          demandSummary
        ).length === 0 ? (

          <p>
            No demand found.
          </p>

        ) : (

          Object.entries(
            demandSummary
          ).map(
            (
              [weight, demand]
            ) => {

              const available =
                inventorySummary[
                  weight
                ] ?? 0;

              return (
                <div
                  key={
                    String(weight)
                  }
                  className="border-b py-3"
                >
                  <p>
                    <strong>
                      {String(weight)}
                    </strong>
                  </p>

                  <p>
                    Demand:{" "}
                    {String(
                      demand
                    )}
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

      {/* ------------------------------ */}
      {/* Inventory */}
      {/* ------------------------------ */}

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
            (
              stock: any
            ) => {

              const farm =
                (farms ?? []).find(
                  (f: any) =>
                    f.id ===
                    stock.farm_id
                );

              const reserved =
                Number(
                  stock.reserved_bird_count ??
                  0
                );

              const remaining =
                Number(
                  stock.available_bird_count ??
                  stock.bird_count ??
                  0
                );

              return (
                <div
                  key={
                    stock.id
                  }
                  className="border-b py-4"
                >
                  <p className="font-semibold">
                    {farm?.farm_name ??
                      stock.farm_id}
                  </p>

                  <p>
                    Weight:{" "}
                    {
                      stock.weight_category
                    }
                  </p>

                  <p>
                    Total Birds:{" "}
                    {
                      stock.bird_count
                    }
                  </p>

                  <p className="text-orange-600">
                    Reserved:{" "}
                    {reserved}
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
                      stock.procurement_price
                    }
                  </p>

                  {/* ===== CONTINUE WITH PART 2 ===== */}

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
                          stock.farm_id
                        }
                      />

                      <input
                        type="hidden"
                        name="farmName"
                        value={
                          farm?.farm_name ??
                          ""
                        }
                      />

                      <input
                        type="hidden"
                        name="weightCategory"
                        value={
                          stock.weight_category
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

      {/* ------------------------------ */}
      {/* Allocation History */}
      {/* ------------------------------ */}

      <div className="mt-6 rounded-xl border bg-white p-6">

        <h2 className="mb-4 text-xl font-bold">
          Allocation History
        </h2>

        {(allocations ?? []).length === 0 ? (

          <p>
            No allocations yet.
          </p>

        ) : (

          (allocations ?? []).map(
            (
              allocation: any
            ) => (
              <div
                key={
                  allocation.id
                }
                className="border-b py-3"
              >
                <p className="font-semibold">
                  {
                    allocation.farm_name
                  }
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
                  {allocation.allocation_date
                    ? new Date(
                        allocation.allocation_date
                      ).toLocaleDateString(
                        "en-IN"
                      )
                    : "-"}
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