import { readDb } from "@/lib/storage";
import { AdminFarmsList } from "@/components/admin-farms-list";

export default async function FarmsPage() {
  const db = await readDb();

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Farm Partners
      </h1>

      <AdminFarmsList
        farms={db.farmPartners}
      />
    </div>
  );
}