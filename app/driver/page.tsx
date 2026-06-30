import { readDb } from "@/lib/storage";

export default async function DriverPage() {
  const db = await readDb();

  return (
    <pre>
      {JSON.stringify(db.orders.slice(0, 5), null, 2)}
    </pre>
  );
}