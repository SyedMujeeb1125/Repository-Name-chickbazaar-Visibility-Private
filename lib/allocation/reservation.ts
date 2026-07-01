import { supabase } from "@/lib/supabase";

export type ReservationRequest = {
  birdsRequired: number;
};

export type ReservationResult = {
  success: boolean;
  farmId?: string;
  reservedBirds?: number;
  remainingInventory?: number;
  message: string;
};

export async function reserveInventory(
  request: ReservationRequest
): Promise<ReservationResult> {

  const { data: farms, error } =
    await supabase
      .from("farm_inventory")
      .select("*")
      .gt("available_birds", 0)
      .order("available_birds", {
        ascending: false,
      });

  if (error) {
    throw new Error(error.message);
  }

  if (!farms || farms.length === 0) {
    return {
      success: false,
      message: "No inventory available.",
    };
  }

  for (const farm of farms) {

    if (
      farm.available_birds >=
      request.birdsRequired
    ) {

      const remaining =
        farm.available_birds -
        request.birdsRequired;

      const { error: updateError } =
        await supabase
          .from("farm_inventory")
          .update({
            available_birds:
              remaining,
          })
          .eq("id", farm.id);

      if (updateError) {
        throw new Error(
          updateError.message
        );
      }

      return {
        success: true,
        farmId: farm.farm_id,
        reservedBirds:
          request.birdsRequired,
        remainingInventory:
          remaining,
        message:
          "Inventory reserved successfully.",
      };
    }
  }

  return {
    success: false,
    message:
      "Insufficient inventory across all farms.",
  };
}