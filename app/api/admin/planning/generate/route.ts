import { NextResponse } from "next/server";
import { buildOperationsPipeline } from "@/lib/operations/pipeline";
import { savePlanningRun } from "@/lib/planning/planning-runs";

export async function POST() {
  try {
    const pipeline =
      await buildOperationsPipeline();
      await savePlanningRun(
  pipeline
);

    return NextResponse.json({
      success: true,
      generatedAt:
        pipeline.generatedAt,
      deliveryDate:
        pipeline.deliveryDate,
      summary: {
        manualOrders:
          pipeline.planning.manualOrders.length,

        repeatOrders:
          pipeline.planning.repeatOrders.length,

        totalOrders:
          pipeline.planning.totalOrders,

        birdsRequired:
          pipeline.planning.demand.totals.birds,

        weightRequired:
          pipeline.planning.demand.totals.weight,
      },
    });

  } catch (error) {

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to generate plan.",
      },
      {
        status: 500,
      }
    );
  }
}