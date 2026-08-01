export const dynamic = "force-dynamic";

import { supabase } from "@/lib/supabase";

export default async function FleetPage() {
  const [
    { data: vehicles, error: vehiclesError },
    { data: orders, error: ordersError },
    { data: retailers, error: retailersError },
  ] = await Promise.all([
    supabase.from("vehicles").select("*"),
    supabase.from("orders").select("*"),
    supabase.from("retailers").select("*"),
  ]);

  if (vehiclesError) {
    console.error("[FLEET][VEHICLES]", vehiclesError);
  }

  if (ordersError) {
    console.error("[FLEET][ORDERS]", ordersError);
  }

  if (retailersError) {
    console.error("[FLEET][RETAILERS]", retailersError);
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Fleet Operations
      </h1>

      <div className="grid gap-4 md:grid-cols-2">
        {(vehicles ?? []).map((vehicle: any) => {
          const zoneOrders = (orders ?? []).filter(
            (order: any) => {
              const retailer = (retailers ?? []).find(
                (r: any) =>
                  r.mobile === order.mobile
              );

              return (
                retailer?.zone ===
                vehicle.zone
              );
            }
          );

          let demandKg = 0;

          zoneOrders.forEach((order: any) => {
            const requestedWeight = Number(
              order.requested_weight ?? 0
            );

            const birds = Number(
              order.birds ?? 0
            );

            const avgWeight = Number(
              order.average_weight ?? 0
            );

            if (requestedWeight > 0) {
              demandKg += requestedWeight;
            } else if (
              birds > 0 &&
              avgWeight > 0
            ) {
              demandKg += birds * avgWeight;
            }
          });

          const capacityKg = Number(
            vehicle.capacity_kg ?? 0
          );

          return (
            <div
              key={vehicle.id}
              className="rounded-xl border bg-white p-6 shadow-sm"
            >
              <h2 className="mb-3 text-xl font-bold">
                {String(vehicle.zone).toUpperCase()}{" "}
                Zone
              </h2>

              <p>
                <strong>Vehicle:</strong>{" "}
                {vehicle.vehicle_number}
              </p>

              <p>
                <strong>Capacity:</strong>{" "}
                {capacityKg} Kg
              </p>

              <p>
                <strong>Driver:</strong>{" "}
                {vehicle.assigned_driver ??
                  "Not Assigned"}
              </p>

              <p>
                <strong>Orders:</strong>{" "}
                {zoneOrders.length}
              </p>

              <p>
                <strong>Demand:</strong>{" "}
                {Math.round(demandKg)} Kg
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {vehicle.status}
              </p>

              <div
                className={`mt-3 rounded p-2 ${
                  demandKg <= capacityKg
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {demandKg <= capacityKg
                  ? "Vehicle Capacity Sufficient"
                  : "Additional Vehicle Required"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}