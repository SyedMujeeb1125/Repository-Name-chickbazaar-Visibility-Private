import { reserveInventory } from "./reservation";

export type AllocateOrderInput = {
  orderId: string;
  birdsRequired: number;
};

export type AllocateOrderResult = {
  success: boolean;
  farmId?: string;
  message: string;
};

export async function allocateOrder(
  input: AllocateOrderInput
): Promise<AllocateOrderResult> {

  const reservation =
    await reserveInventory({
      birdsRequired:
        input.birdsRequired,
    });

  if (!reservation.success) {
    return {
      success: false,
      message:
        reservation.message,
    };
  }

  // Next sprint we will insert
  // into farm_allocations table.

  return {
    success: true,
    farmId:
      reservation.farmId,
    message:
      "Allocation completed.",
  };
}