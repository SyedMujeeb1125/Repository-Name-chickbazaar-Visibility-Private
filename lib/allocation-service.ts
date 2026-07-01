import { getFarmPartners } from "@/lib/farm-service";
import { getVehicleByZone } from "@/lib/vehicle-service";

function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c =
    2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

export async function allocateOrder({
  latitude,
  longitude,
  zone,
}: {
  latitude: number;
  longitude: number;
  zone: string;
}) {
  const farms = await getFarmPartners();

  const eligibleFarms = farms.filter(
    (farm: any) =>
      farm.status === "approved" &&
      farm.latitude &&
      farm.longitude
  );

  const nearestFarm = eligibleFarms
    .map((farm: any) => ({
      farm,
      distance: calculateDistance(
        latitude,
        longitude,
        Number(farm.latitude),
        Number(farm.longitude)
      ),
    }))
    .sort((a, b) => a.distance - b.distance)[0];

  const vehicle = await getVehicleByZone(zone);

  return {
    assignedFarm: nearestFarm?.farm?.farm_name || "",
    assignedVehicle: vehicle?.vehicle_number || "",
    assignedDriver: vehicle?.assigned_driver || "",
  };
}