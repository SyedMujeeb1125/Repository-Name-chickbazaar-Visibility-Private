import Link from "next/link";
import { getPlanningRuns } from "@/lib/planning/planning-runs";

export default async function PlanningHistoryPage() {

  const runs =
    await getPlanningRuns();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-extrabold">
            Planning History
          </h1>

          <p className="mt-2 text-slate-500">
            Previously generated operational plans.
          </p>

        </div>

        <Link
          href="/admin/planning"
          className="rounded-lg bg-orange px-5 py-3 font-bold text-white"
        >
          Back
        </Link>

      </div>

      <div className="mt-8 overflow-hidden rounded-xl border bg-white">

        <table className="min-w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="p-4 text-left">
                Delivery Date
              </th>

              <th className="p-4 text-left">
                Orders
              </th>

              <th className="p-4 text-left">
                Birds
              </th>

              <th className="p-4 text-left">
                Weight
              </th>

              <th className="p-4 text-left">
                Vehicles
              </th>

              <th className="p-4 text-left">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {runs.length === 0 ? (

              <tr>

                <td
                  colSpan={6}
                  className="p-8 text-center text-slate-500"
                >
                  No planning runs found.
                </td>

              </tr>

            ) : (

              runs.map((run: any) => (

                <tr
                  key={run.id}
                  className="border-t"
                >

                  <td className="p-4">

  <Link
    href={`/admin/planning/history/${run.id}`}
    className="font-semibold text-blue-600 hover:underline"
  >
    {run.delivery_date}
  </Link>

</td>

                  <td className="p-4">
                    {run.total_orders}
                  </td>

                  <td className="p-4">
                    {run.birds_required}
                  </td>

                  <td className="p-4">
                    {run.weight_required}
                  </td>

                  <td className="p-4">
                    {run.estimated_vehicles}
                  </td>

                  <td className="p-4">

                    <span className="rounded bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                      {run.status}
                    </span>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}