import { readDb } from "@/lib/storage";

export default async function DriverPage() {
  const db = await readDb();

  const driverName = "Ramesh";

  const myOrders = db.orders.filter(
    (o: any) =>
      o.assignedDriver === driverName &&
      [
        "new",
        "confirmed",
        "allocated",
        "procured",
        "dispatched",
      ].includes(o.status)
  );

  const myVehicle = db.vehicles.find(
  (v: any) => v.assignedDriver === driverName
);

  return (
  <div className="p-6">
    <h1>Driver Dashboard</h1>

    <p>Total Orders: {db.orders.length}</p>

    <p>Driver Orders: {myOrders.length}</p>

    <p>Vehicle: {myVehicle?.vehicleNumber || "-"}</p>

    <p>Zone: {myVehicle?.zone || "-"}</p>
  </div>
);
}