import { NextResponse } from "next/server";

import { executePlanningRun } from "@/lib/planning/execution-engine";

import { supabase } from "@/lib/supabase";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function POST(
  request: Request,
  { params }: Props
) {
  try {
    const { id } =
      await params;

    const { data: run, error } =
      await supabase
        .from("planning_runs")
        .select("*")
        .eq("id", id)
        .single();

    if (error || !run) {
      throw new Error(
        "Planning Run not found."
      );
    }

    const result =
      await executePlanningRun(
        id,
        Number(
          run.birds_required || 0
        )
      );

    return NextResponse.json(
      result
    );

  } catch (error) {

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Execution failed.",
      },
      {
        status: 500,
      }
    );
  }
}