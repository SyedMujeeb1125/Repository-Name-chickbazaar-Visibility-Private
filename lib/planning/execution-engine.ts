import { supabase } from "@/lib/supabase";

export async function reserveInventory(
  birdsRequired: number
) {
  const { data: inventories, error } =
    await supabase
      .from("farm_inventory")
      .select("*")
      .gt("available_birds", 0)
      .order("inventory_date", {
        ascending: true,
      });

  if (error) {
    throw new Error(error.message);
  }

  let remaining = birdsRequired;

  const reservations: any[] = [];

  for (const inventory of inventories ?? []) {
    if (remaining <= 0) {
      break;
    }

    const available = Number(
      inventory.available_birds || 0
    );

    const reserve = Math.min(
      available,
      remaining
    );

    reservations.push({
      inventory,
      reserve,
    });

    remaining -= reserve;
  }

  return {
    reservations,
    shortage: remaining,
    reserved:
      birdsRequired - remaining,
  };
  
}
export async function applyReservations(
  reservations: any[]
) {
  for (const item of reservations) {

    const inventory = item.inventory;

    const reserve = Number(item.reserve);

    const available =
      Number(inventory.available_birds || 0);

    const reserved =
      Number(inventory.reserved_birds || 0);

    const { error } = await supabase
      .from("farm_inventory")
      .update({
        available_birds:
          available - reserve,

        reserved_birds:
          reserved + reserve,
      })
      .eq("id", inventory.id);

    if (error) {
      throw new Error(error.message);
    }
  }

  return true;
}
export async function createAllocations(
  reservations: any[]
) {
  for (const item of reservations) {

    const inventory = item.inventory;

    const reserve = Number(item.reserve);

    const { error } = await supabase
      .from("farm_allocations")
      .insert({
        allocation_date:
          new Date()
            .toISOString()
            .split("T")[0],

        farm_id:
          inventory.farm_id,

        farm_name:
          inventory.farm_name ?? "",

        weight_category:
          inventory.weight_category,

        allocated_birds:
          reserve,

        inventory_id:
          inventory.id,

        status:
          "allocated",
      });

    if (error) {
      throw new Error(error.message);
    }
  }

  return true;
}
export async function createFulfillments() {

  const { data: allocations, error } =
    await supabase
      .from("farm_allocations")
      .select("*")
      .eq("status", "allocated");

  if (error) {
    throw new Error(error.message);
  }

  for (const allocation of allocations ?? []) {

    const { error: insertError } =
      await supabase
        .from("farm_fulfillments")
        .insert({

          allocation_id:
            allocation.id,

          farm_id:
            allocation.farm_id,

          accepted_birds:
            allocation.allocated_birds,

          status:
            "accepted",

          remarks:
            "Auto generated from execution engine"

        });

    if (insertError) {
      throw new Error(insertError.message);
    }
  }

  return true;
}
export async function executePlanningRun(
  planningRunId: string,
  birdsRequired: number
) {
  const reservation =
    await reserveInventory(
      birdsRequired
    );

  if (reservation.shortage > 0) {
    throw new Error(
      `Inventory shortage: ${reservation.shortage} birds`
    );
  }

  await applyReservations(
    reservation.reservations
  );

  await createAllocations(
    reservation.reservations
  );

  await createFulfillments();

  return {
    success: true,

    reserved:
      reservation.reserved,

    shortage:
      reservation.shortage,

    planningRunId,
  };
}