import { readDb } from "@/lib/storage";

export default async function DriverPage() {
  const db = await readDb();

  return (
    <div className="p-6">
      <h1>Driver Dashboard</h1>

      <p>Orders: {db.orders.length}</p>

      <p>Vehicles: {db.vehicles.length}</p>
    </div>
  );
}