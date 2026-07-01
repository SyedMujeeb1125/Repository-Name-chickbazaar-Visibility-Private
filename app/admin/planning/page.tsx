export const dynamic = "force-dynamic";

import { buildControlTower } from "@/lib/planning/control-tower";

import GeneratePlanButton from "@/components/admin/GeneratePlanButton";

export default async function PlanningPage() {
  const tower = await buildControlTower();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-navy">
            <div className="mt-6">
  <GeneratePlanButton />
</div>
          Tomorrow's Planning
        </h1>
        <div className="mt-4">

  <a
    href="/admin/planning/history"
    className="inline-flex rounded-lg bg-slate-800 px-5 py-3 font-bold text-white"
  >
    View Planning History
  </a>

</div>

        <p className="mt-2 text-slate-500">
          Operational planning for next day's procurement and dispatch.
        </p>
      </div>

      {/* Summary */}

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl bg-blue-600 p-6 text-white">
          <p className="text-sm uppercase">
            Manual Orders
          </p>

          <p className="mt-2 text-4xl font-bold">
            {tower.summary.manualOrders}
          </p>
        </div>

        <div className="rounded-xl bg-green-600 p-6 text-white">
          <p className="text-sm uppercase">
            Repeat Orders
          </p>

          <p className="mt-2 text-4xl font-bold">
            {tower.summary.repeatOrders}
          </p>
        </div>

        <div className="rounded-xl bg-orange p-6 text-white">
          <p className="text-sm uppercase">
            Total Orders
          </p>

          <p className="mt-2 text-4xl font-bold">
            {tower.summary.totalOrders}
          </p>
        </div>
      </div>

      {/* Demand Summary */}

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border bg-white p-6">
          <p className="text-sm uppercase text-slate-500">
            Birds Required
          </p>

          <p className="mt-2 text-4xl font-bold">
            {tower.summary.birdsRequired}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-6">
          <p className="text-sm uppercase text-slate-500">
            Weight Required
          </p>

          <p className="mt-2 text-4xl font-bold">
            {tower.summary.weightRequired} KG
          </p>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2">

  <div className="rounded-xl border bg-white p-6">
    <p className="text-sm uppercase text-slate-500">
      Estimated Vehicles
    </p>

    <p className="mt-2 text-4xl font-bold text-blue-600">
      {tower.summary.estimatedVehicles}
    </p>
  </div>

  <div className="rounded-xl border bg-white p-6">
    <p className="text-sm uppercase text-slate-500">
      Estimated Drivers
    </p>

    <p className="mt-2 text-4xl font-bold text-green-600">
      {tower.summary.estimatedDrivers}
    </p>
  </div>

</div>
      </div>

      {/* Manual Orders */}

      <div className="mt-10 rounded-xl border bg-white p-6">
        <h2 className="text-2xl font-bold">
          Manual Orders
        </h2>

        <div className="mt-5 space-y-4">
          {tower.manualOrders.length === 0 ? (
            <p className="text-slate-500">
              No manual orders for tomorrow.
            </p>
          ) : (
            tower.manualOrders.map((order: any) => (
              <div
                key={order.id}
                className="rounded-lg border p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold">
                      {order.shop_name ||
                        order.shopName}
                    </h3>

                    <p className="text-sm text-slate-500">
                      {order.requested_weight ??
                        order.requestedWeight ??
                        0}{" "}
                      KG
                    </p>
                  </div>

                  <span className="rounded bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
                    NEW
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Repeat Orders */}

      <div className="mt-10 rounded-xl border bg-white p-6">
        <h2 className="text-2xl font-bold">
          Active Repeat Orders
        </h2>

        <div className="mt-5 space-y-4">
          {tower.repeatOrders.length === 0 ? (
            <p className="text-slate-500">
              No active repeat orders.
            </p>
          ) : (
            tower.repeatOrders.map((order: any) => (
              <div
                key={order.id}
                className="rounded-lg border p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold">
                      {order.frequency}
                    </h3>

                    <p className="text-sm text-slate-500">
                      {order.requested_weight ??
                        order.birds}
                    </p>
                  </div>

                  <span className="rounded bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                    ACTIVE
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="mt-10 rounded-xl border bg-white p-6">

  <h2 className="text-2xl font-bold">
    Farm Recommendations
  </h2>

  <div className="mt-6 space-y-4">

    {tower.procurement.recommendations.length === 0 ? (

      <p className="text-slate-500">
        No recommendations available.
      </p>

    ) : (

      tower.procurement.recommendations.map(
        (item: any) => (

          <div
            key={item.zone}
            className="flex items-center justify-between rounded-lg border p-4"
          >

            <div>

              <p className="font-bold">
                {item.zone}
              </p>

              <p className="text-sm text-slate-500">
                {item.birdsRequired} Birds
              </p>

            </div>

            <div className="text-right">

              <p className="font-semibold text-green-700">
                {item.recommendedFarm}
              </p>

              <p className="text-sm text-slate-500">
                Score: {item.score.toFixed(1)}
              </p>

            </div>

          </div>

        )
      )

    )}

  </div>

</div>
<div className="mt-10 rounded-xl border bg-white p-6">

  <h2 className="text-2xl font-bold">
    Allocation Plan
  </h2>

  <div className="mt-6 space-y-4">

    {tower.allocation.allocations.length === 0 ? (

      <p className="text-slate-500">
        No allocations generated.
      </p>

    ) : (

      tower.allocation.allocations.map(
        (allocation: any) => (

          <div
            key={`${allocation.zone}-${allocation.farmId}`}
            className="flex items-center justify-between rounded-lg border p-4"
          >

            <div>

              <p className="font-bold">
                {allocation.zone}
              </p>

              <p className="text-sm text-slate-500">
                {allocation.birdsAllocated} Birds
              </p>

            </div>

            <div className="text-right">

              <p className="font-semibold text-green-700">
                {allocation.farmId}
              </p>

              <p className="text-sm text-slate-500">
                Score: {allocation.score.toFixed(1)}
              </p>

            </div>

          </div>

        )
      )

    )}

  </div>

</div>
    </div>
  );
}