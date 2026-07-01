import Link from "next/link";
import { supabase } from "@/lib/supabase";

import ApprovePlanningButton from "@/components/admin/ApprovePlanningButton";
import ExecutePlanningButton from "@/components/admin/ExecutePlanningButton";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PlanningRunPage({
  params,
}: Props) {
  const { id } = await params;

  const { data: run, error } =
    await supabase
      .from("planning_runs")
      .select("*")
      .eq("id", id)
      .single();

  if (error || !run) {
    return (
      <div className="p-10">
        Planning Run not found.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-extrabold">
            Planning Run
          </h1>

          <p className="mt-2 text-slate-500">
            Delivery Date: {run.delivery_date}
          </p>

        </div>

        <Link
          href="/admin/planning/history"
          className="rounded-lg bg-slate-800 px-5 py-3 font-bold text-white"
        >
          Back
        </Link>

      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-4">

        <div className="rounded-xl bg-blue-600 p-6 text-white">
          <p>Orders</p>
          <p className="mt-2 text-4xl font-bold">
            {run.total_orders}
          </p>
        </div>

        <div className="rounded-xl bg-green-600 p-6 text-white">
          <p>Birds</p>
          <p className="mt-2 text-4xl font-bold">
            {run.birds_required}
          </p>
        </div>

        <div className="rounded-xl bg-orange p-6 text-white">
          <p>Weight</p>
          <p className="mt-2 text-4xl font-bold">
            {run.weight_required}
          </p>
        </div>

        <div className="rounded-xl bg-purple-600 p-6 text-white">
          <p>Vehicles</p>
          <p className="mt-2 text-4xl font-bold">
            {run.estimated_vehicles}
          </p>
        </div>

      </div>

      <div className="mt-10 rounded-xl border bg-white p-6">

        <h2 className="text-2xl font-bold">
          Status
        </h2>

        <div className="mt-4">

          <span className="rounded bg-blue-100 px-4 py-2 font-bold text-blue-700">
            {run.status}
          </span>

        </div>

      </div>

      <div className="mt-8 rounded-xl border bg-white p-6">

        <h2 className="text-2xl font-bold">
          Audit Information
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">

          <div>
            <p className="text-sm text-slate-500">
              Generated At
            </p>

            <p className="font-semibold">
              {run.generated_at ?? "-"}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Approved At
            </p>

            <p className="font-semibold">
              {run.approved_at ?? "-"}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Executed At
            </p>

            <p className="font-semibold">
              {run.executed_at ?? "-"}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Approved By
            </p>

            <p className="font-semibold">
              {run.approved_by ?? "-"}
            </p>
          </div>

        </div>

      </div>

      <div className="mt-8 flex gap-4">

        {run.status === "draft" && (
          <ApprovePlanningButton id={run.id} />
        )}

        {run.status === "approved" && (
          <ExecutePlanningButton id={run.id} />
        )}

        {run.status === "executed" && (
          <div className="rounded-lg bg-green-100 px-6 py-3 font-bold text-green-700">
            ✓ Plan Executed
          </div>
        )}

      </div>

    </div>
  );
}