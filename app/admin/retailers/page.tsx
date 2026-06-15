import { readDb } from "@/lib/storage";
import { AdminRetailersList } from "@/components/admin-retailers-list";

export default async function RetailersPage() {
  const db = await readDb();

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Retailers
      </h1>

      <AdminRetailersList
        retailers={db.retailers}
        retailerLocations={
          db.retailerLocations
        }
      />
    </div>
  );
}