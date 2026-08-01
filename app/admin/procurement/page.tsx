export const dynamic = "force-dynamic";

import { supabase } from "@/lib/supabase";

export default async function ProcurementPage() {
  const tomorrow = new Date(
    Date.now() + 24 * 60 * 60 * 1000
  )
    .toISOString()
    .split("T")[0];

  // ---------------------------------
  // Orders
  // ---------------------------------

  const {
    data: procurementOrders,
    error: ordersError,
  } = await supabase
    .from("orders")
    .select(`
      id,
      status,
      delivery_date,
      birds,
      average_weight,
      assigned_farm
    `)
    .eq("delivery_date", tomorrow)
    .neq("status", "cancelled");

  if (ordersError) {
    console.error(
      "[PROCUREMENT][ORDERS]",
      ordersError
    );
  }

  // ---------------------------------
  // Farm Inventory
  // ---------------------------------

  const {
    data: farmInventory,
    error: inventoryError,
  } = await supabase
    .from("farm_inventory")
    .select(`
      weight_category,
      bird_count,
      procurement_price
    `);

  if (inventoryError) {
    console.error(
      "[PROCUREMENT][INVENTORY]",
      inventoryError
    );
  }

  // ---------------------------------
  // Farm Partners
  // ---------------------------------

  const {
    data: farmPartners,
    error: farmsError,
  } = await supabase
    .from("farm_partners")
    .select(`
      id,
      farm_name,
      status
    `)
    .eq("status", "approved");

  if (farmsError) {
    console.error(
      "[PROCUREMENT][FARMS]",
      farmsError
    );
  }

  // ---------------------------------
  // Farm Allocations
  // ---------------------------------

  const {
    data: allocations,
    error: allocationError,
  } = await supabase
    .from("farm_allocations")
    .select(`
      farm_id,
      allocated_birds
    `);

  if (allocationError) {
    console.error(
      "[PROCUREMENT][ALLOCATIONS]",
      allocationError
    );
  }

  // ---------------------------------
  // Farm Fulfillments
  // ---------------------------------

  const {
    data: fulfillments,
    error: fulfillmentError,
  } = await supabase
    .from("farm_fulfillments")
    .select(`
      farm_id,
      accepted_birds
    `);

  if (fulfillmentError) {
    console.error(
      "[PROCUREMENT][FULFILLMENTS]",
      fulfillmentError
    );
  }

  // ---------------------------------
  // Today's Selling Rate
  // ---------------------------------

  const {
    data: todayRate,
    error: rateError,
  } = await supabase
    .from("daily_rates")
    .select("rate")
    .order("effective_date", {
      ascending: false,
    })
    .limit(1)
    .maybeSingle();

  if (rateError) {
    console.error(
      "[PROCUREMENT][RATE]",
      rateError
    );
  }

  // Remaining calculations continue in Part 1A.2...
    // ---------------------------------
  // Summary
  // ---------------------------------

  const totalOrders =
    (procurementOrders ?? []).length;

  const totalBirds =
    (procurementOrders ?? []).reduce(
      (
        sum: number,
        order: any
      ) =>
        sum +
        Number(
          order.birds ?? 0
        ),
      0
    );

  // ---------------------------------
  // Weight Summary
  // ---------------------------------

  const weightSummary =
    (procurementOrders ?? []).reduce(
      (
        acc: Record<
          string,
          number
        >,
        order: any
      ) => {

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

  // ---------------------------------
  // Inventory Summary
  // ---------------------------------

  const inventorySummary =
    (farmInventory ?? []).reduce(
      (
        acc: Record<
          string,
          number
        >,
        item: any
      ) => {

        const weight =
          item.weight_category ??
          "Not Specified";

        acc[weight] =
          (acc[weight] ?? 0) +
          Number(
            item.bird_count ?? 0
          );

        return acc;

      },
      {}
    );

  // ---------------------------------
  // Cost Summary
  // ---------------------------------

  const costSummary =
    (farmInventory ?? []).reduce(
      (
        acc: Record<
          string,
          {
            totalCost: number;
            count: number;
          }
        >,
        item: any
      ) => {

        const weight =
          item.weight_category ??
          "Not Specified";

        if (!acc[weight]) {

          acc[weight] = {
            totalCost: 0,
            count: 0,
          };

        }

        acc[
          weight
        ].totalCost += Number(
          item.procurement_price ??
            0
        );

        acc[
          weight
        ].count += 1;

        return acc;

      },
      {}
    );

  // ---------------------------------
  // Farm Summary
  // ---------------------------------

  const farmSummary =
    (procurementOrders ?? []).reduce(
      (
        acc: Record<
          string,
          number
        >,
        order: any
      ) => {

        const farm =
          order.assigned_farm ??
          "Unassigned";

        acc[farm] =
          (acc[farm] ?? 0) +
          Number(
            order.birds ?? 0
          );

        return acc;

      },
      {}
    );

  // ---------------------------------
  // Fulfillment Summary
  // ---------------------------------

  const fulfillmentSummary =
    (fulfillments ?? []).reduce(
      (
        acc: Record<
          string,
          number
        >,
        item: any
      ) => {

        acc[item.farm_id] =
          (acc[
            item.farm_id
          ] ?? 0) +
          Number(
            item.accepted_birds ??
              0
          );

        return acc;

      },
      {}
    );

  // ---------------------------------
  // Bird Shortage
  // ---------------------------------

  const shortageBirds =
    Object.entries(
      weightSummary
    ).reduce(
      (
        sum,
        [
          weight,
          demand,
        ]
      ) => {

        const available =
          inventorySummary[
            weight
          ] ?? 0;

        return (
          sum +
          Math.max(
            0,
            Number(
              demand
            ) - available
          )
        );

      },
      0
    );

  // ---------------------------------
  // Allocation Summary
  // ---------------------------------

  const allocatedBirds =
    (allocations ?? []).reduce(
      (
        sum: number,
        allocation: any
      ) =>
        sum +
        Number(
          allocation.allocated_birds ??
            0
        ),
      0
    );

  const acceptedBirds =
    (fulfillments ?? []).reduce(
      (
        sum: number,
        item: any
      ) =>
        sum +
        Number(
          item.accepted_birds ??
            0
        ),
      0
    );

  const sellingRate =
    Number(
      todayRate?.rate ?? 0
    );

  return (
        <div>

      <h1 className="mb-2 text-3xl font-bold">
        Procurement Dashboard
      </h1>

      <p className="mb-6 text-slate-500">
        Delivery Date:{" "}
        {new Date(
          tomorrow
        ).toLocaleDateString(
          "en-IN"
        )}
      </p>

      {/* Summary */}

      <div className="mb-6 grid gap-4 md:grid-cols-5">

        <div className="rounded-xl bg-orange p-5 text-white">

          <p>Total Orders</p>

          <p className="text-3xl font-bold">
            {totalOrders.toLocaleString(
              "en-IN"
            )}
          </p>

        </div>

        <div className="rounded-xl bg-green-600 p-5 text-white">

          <p>Total Birds Required</p>

          <p className="text-3xl font-bold">
            {totalBirds.toLocaleString(
              "en-IN"
            )}
          </p>

        </div>

        <div className="rounded-xl bg-red-600 p-5 text-white">

          <p>Bird Shortage</p>

          <p className="text-3xl font-bold">
            {shortageBirds.toLocaleString(
              "en-IN"
            )}
          </p>

        </div>

        <div className="rounded-xl bg-blue-600 p-5 text-white">

          <p>Allocated Birds</p>

          <p className="text-3xl font-bold">
            {allocatedBirds.toLocaleString(
              "en-IN"
            )}
          </p>

        </div>

        <div className="rounded-xl bg-purple-600 p-5 text-white">

          <p>Accepted Birds</p>

          <p className="text-3xl font-bold">
            {acceptedBirds.toLocaleString(
              "en-IN"
            )}
          </p>

        </div>

      </div>

      {/* Birds Required by Weight */}

      <div className="mb-6 rounded-xl border bg-white p-5">

        <h2 className="mb-4 text-xl font-bold">
          Birds Required by Weight
        </h2>

        {Object.keys(
          weightSummary
        ).length === 0 ? (

          <p className="text-slate-500">
            No orders found.
          </p>

        ) : (

          Object.entries(
            weightSummary
          ).map(
            ([
              weight,
              birds,
            ]) => (

              <div
                key={weight}
                className="flex items-center justify-between border-b py-3 last:border-0"
              >

                <span className="font-medium">
                  {weight}
                </span>

                <span className="font-semibold">
                  {Number(
                    birds
                  ).toLocaleString(
                    "en-IN"
                  )}{" "}
                  Birds
                </span>

              </div>

            )
          )

        )}

      </div>

      {/* Demand vs Available Inventory */}

      <div className="mb-6 rounded-xl border bg-white p-5">

        <h2 className="mb-4 text-xl font-bold">
          Demand vs Available Inventory
        </h2>
                {Object.entries(
          weightSummary
        ).length === 0 ? (

          <p className="text-slate-500">
            No inventory comparison available.
          </p>

        ) : (

          Object.entries(
            weightSummary
          ).map(
            ([
              weight,
              demand,
            ]) => {

              const available =
                inventorySummary[
                  weight
                ] ?? 0;

              const difference =
                available -
                Number(
                  demand
                );

              return (

                <div
                  key={weight}
                  className="border-b py-3 last:border-0"
                >

                  <p>

                    <strong>
                      {weight}
                    </strong>

                  </p>

                  <p>
                    Demand:{" "}
                    {Number(
                      demand
                    ).toLocaleString(
                      "en-IN"
                    )}{" "}
                    Birds
                  </p>

                  <p>
                    Available:{" "}
                    {available.toLocaleString(
                      "en-IN"
                    )}{" "}
                    Birds
                  </p>

                  <p
                    className={
                      difference >= 0
                        ? "font-semibold text-green-600"
                        : "font-semibold text-red-600"
                    }
                  >

                    {difference >= 0
                      ? `Surplus ${difference.toLocaleString(
                          "en-IN"
                        )} Birds`
                      : `Shortage ${Math.abs(
                          difference
                        ).toLocaleString(
                          "en-IN"
                        )} Birds`}

                  </p>

                </div>

              );

            }
          )

        )}

      </div>

      {/* Farm Allocation */}

      <div className="mb-6 rounded-xl border bg-white p-5">

        <h2 className="mb-4 text-xl font-bold">
          Farm Allocation
        </h2>
           
        {Object.keys(
          farmSummary
        ).length === 0 ? (

          <p className="text-slate-500">
            No farm allocations found.
          </p>

        ) : (

          Object.entries(
            farmSummary
          ).map(
            ([
              farm,
              birds,
            ]) => (

              <div
                key={farm}
                className="flex items-center justify-between border-b py-3 last:border-0"
              >

                <span className="font-medium">
                  {farm}
                </span>

                <span className="font-semibold">
                  {Number(
                    birds
                  ).toLocaleString(
                    "en-IN"
                  )}{" "}
                  Birds
                </span>

              </div>

            )
          )

        )}

      </div>

      {/* Procurement Margin Analysis */}

      <div className="rounded-xl border bg-white p-5">

        <h2 className="mb-4 text-xl font-bold">
          Procurement Margin Analysis
        </h2>

                {Object.entries(
          weightSummary
        ).length === 0 ? (

          <p className="text-slate-500">
            No procurement data available.
          </p>

        ) : (

          Object.entries(
            weightSummary
          ).map(
            ([
              weight,
              demand,
            ]) => {

              const cost =
                costSummary[
                  weight
                ];

              const avgCost =
                cost
                  ? Math.round(
                      cost.totalCost /
                        cost.count
                    )
                  : 0;

              const margin =
                sellingRate -
                avgCost;

              return (

                <div
                  key={weight}
                  className="border-b py-3 last:border-0"
                >

                  <p>

                    <strong>
                      {weight}
                    </strong>

                  </p>

                  <p>
                    Demand:{" "}
                    {Number(
                      demand
                    ).toLocaleString(
                      "en-IN"
                    )}{" "}
                    Birds
                  </p>

                  <p>
                    Avg Farm Cost: ₹
                    {avgCost.toLocaleString(
                      "en-IN"
                    )}
                  </p>

                  <p>
                    Selling Rate: ₹
                    {sellingRate.toLocaleString(
                      "en-IN"
                    )}
                  </p>

                  <p
                    className={
                      margin >= 0
                        ? "font-semibold text-green-600"
                        : "font-semibold text-red-600"
                    }
                  >
                    Margin: ₹
                    {margin.toLocaleString(
                      "en-IN"
                    )}
                    /Kg
                  </p>

                </div>

              );

            }
          )

        )}

      </div>

      {/* Farm Fulfillment Status */}

      <div className="mt-6 rounded-xl border bg-white p-5">

        <h2 className="mb-4 text-xl font-bold">
          Farm Fulfillment Status
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
                    {(farmPartners ?? []).length === 0 ? (

            <p className="text-slate-500 col-span-full">
              No approved farms found.
            </p>

          ) : (

            (farmPartners ?? []).map(
              (farm: any) => {

                const allocated =
                  (allocations ?? [])
                    .filter(
                      (allocation: any) =>
                        allocation.farm_id ===
                        farm.id
                    )
                    .reduce(
                      (
                        sum: number,
                        allocation: any
                      ) =>
                        sum +
                        Number(
                          allocation.allocated_birds ??
                            0
                        ),
                      0
                    );

                const accepted =
                  fulfillmentSummary[
                    farm.id
                  ] ?? 0;

                const pending =
                  allocated -
                  accepted;

                return (

                  <div
                    key={farm.id}
                    className="rounded-lg border bg-slate-50 p-4"
                  >

                    <p className="font-semibold">
                      {farm.farm_name}
                    </p>

                    <p>
                      Allocated:{" "}
                      {allocated.toLocaleString(
                        "en-IN"
                      )}
                    </p>

                    <p>
                      Accepted:{" "}
                      {accepted.toLocaleString(
                        "en-IN"
                      )}
                    </p>

                    <p
                      className={
                        pending > 0
                          ? "font-semibold text-red-600"
                          : "font-semibold text-green-600"
                      }
                    >
                      Pending:{" "}
                      {pending.toLocaleString(
                        "en-IN"
                      )}
                    </p>

                  </div>

                );

              }
            )

          )}

        </div>

      </div>

    </div>

  );

}