import { buildOperationsPipeline } from "@/lib/operations/pipeline";

export async function buildControlTower() {

  const pipeline =
    await buildOperationsPipeline();

  return {

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

      estimatedVehicles:
        pipeline.planning.demand.estimatedVehicles,

      estimatedDrivers:
        pipeline.planning.demand.estimatedDrivers,

    },

    demand:
      pipeline.planning.demand,

    procurement:
      pipeline.procurement,

    allocation:
      pipeline.allocation,

    manualOrders:
      pipeline.planning.manualOrders,

    repeatOrders:
      pipeline.planning.repeatOrders,

    generatedAt:
      pipeline.generatedAt,

    deliveryDate:
      pipeline.deliveryDate,

  };
}