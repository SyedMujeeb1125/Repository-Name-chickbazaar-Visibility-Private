import { supabase } from "@/lib/supabase";
import { AdminFarmsList } from "@/components/admin-farms-list";

export default async function FarmsPage() {
  const {
    data: farms,
    error,
  } = await supabase
    .from("farm_partners")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error(
      "[ADMIN_FARMS]",
      error
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Farm Partners
      </h1>

      <AdminFarmsList
        farms={farms ?? []}
      />
    </div>
  );
}