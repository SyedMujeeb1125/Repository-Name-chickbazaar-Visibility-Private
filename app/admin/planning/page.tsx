export const dynamic = "force-dynamic";

import Link from "next/link";

import { buildControlTower } from "@/lib/planning/control-tower";

import GeneratePlanButton from "@/components/admin/GeneratePlanButton";

export default async function PlanningPage() {
  const tower = await buildControlTower();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">

      {/* Header */}

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">

        <div>

          <h1 className="text-4xl font-extrabold text-navy">
            Tomorrow's Planning
          </h1>

          <p className="mt-2 text-slate-500">
            Operational planning for next day's procurement and dispatch.
          </p>

        </div>

        <div className="flex gap-3">

          <GeneratePlanButton />

          <Link
            href="/admin/planning/history"
            className="inline-flex items-center rounded-lg bg-slate-800 px-5 py-3 font-bold text-white transition hover:bg-slate-700"
          >
            View Planning History
          </Link>

        </div>

      </div>

      {/* Summary */}

      <div className="grid gap-6 md:grid-cols-3">

        <div className="rounded-xl bg-blue-600 p-6 text-white">

          <p className="text-sm uppercase">
            Manual Orders
          </p>

          <p className="mt-2 text-4xl font-bold">
            {Number(
              tower.summary.manualOrders ?? 0
            ).toLocaleString("en-IN")}
          </p>

        </div>

        <div className="rounded-xl bg-green-600 p-6 text-white">

          <p className="text-sm uppercase">
            Repeat Orders
          </p>

          <p className="mt-2 text-4xl font-bold">
            {Number(
              tower.summary.repeatOrders ?? 0
            ).toLocaleString("en-IN")}
          </p>

        </div>

        <div className="rounded-xl bg-orange p-6 text-white">

          <p className="text-sm uppercase">
            Total Orders
          </p>

          <p className="mt-2 text-4xl font-bold">
            {Number(
              tower.summary.totalOrders ?? 0
            ).toLocaleString("en-IN")}
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
            {Number(
              tower.summary.birdsRequired ?? 0
            ).toLocaleString("en-IN")}
          </p>

        </div>

        <div className="rounded-xl border bg-white p-6">

          <p className="text-sm uppercase text-slate-500">
            Weight Required
          </p>

          <p className="mt-2 text-4xl font-bold">
            {Number(
              tower.summary.weightRequired ?? 0
            ).toLocaleString("en-IN")}{" "}
            KG
          </p>

        </div>

        <div className="rounded-xl border bg-white p-6">

          <p className="text-sm uppercase text-slate-500">
            Estimated Vehicles
          </p>

          <p className="mt-2 text-4xl font-bold text-blue-600">
            {Number(
              tower.summary.estimatedVehicles ?? 0
            ).toLocaleString("en-IN")}
          </p>

        </div>

        <div className="rounded-xl border bg-white p-6">

          <p className="text-sm uppercase text-slate-500">
            Estimated Drivers
          </p>

          <p className="mt-2 text-4xl font-bold text-green-600">
            {Number(
              tower.summary.estimatedDrivers ?? 0
            ).toLocaleString("en-IN")}
          </p>

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
                      {order.shop_name ??
                        order.shopName ??
                        "-"}
                    </h3>

                    <p className="text-sm text-slate-500">
                      {Number(
                        order.requested_weight ??
                          order.requestedWeight ??
                          0
                      ).toLocaleString("en-IN")}{" "}
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
                      {Number(
                        order.requested_weight ??
                          order.birds ??
                          0
                      ).toLocaleString("en-IN")}{" "}
                      KG
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

      {/* Farm Recommendations */}

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
                      {Number(
                        item.birdsRequired ?? 0
                      ).toLocaleString("en-IN")} Birds
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="font-semibold text-green-700">
                      {item.recommendedFarm}
                    </p>

                    <p className="text-sm text-slate-500">
                      Score: {Number(item.score ?? 0).toFixed(1)}
                    </p>

                  </div>

                </div>

              )
            )

          )}

        </div>

      </div>

      {/* Allocation */}

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
                      {Number(
                        allocation.birdsAllocated ?? 0
                      ).toLocaleString("en-IN")} Birds
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="font-semibold text-green-700">
                      {allocation.farmId}
                    </p>

                    <p className="text-sm text-slate-500">
                      Score: {Number(allocation.score ?? 0).toFixed(1)}
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