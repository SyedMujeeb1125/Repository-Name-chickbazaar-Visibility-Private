import { supabase } from "@/lib/supabase";

export default async function InventoryPage() {
  // ---------------------------------
  // Farms
  // ---------------------------------

  const {
    data: farms,
    error: farmsError,
  } = await supabase
    .from("farm_partners")
    .select(`
      id,
      farm_name,
      status
    `)
    .eq("status", "approved")
    .order("farm_name");

  if (farmsError) {
    console.error(
      "[INVENTORY][FARMS]",
      farmsError
    );
  }

  // ---------------------------------
  // Inventory
  // ---------------------------------

  const {
    data: inventory,
    error: inventoryError,
  } = await supabase
    .from("farm_inventory")
    .select(`
      id,
      farm_id,
      inventory_date,
      weight_category,
      bird_count,
      procurement_price
    `)
    .order("inventory_date", {
      ascending: false,
    });

  if (inventoryError) {
    console.error(
      "[INVENTORY]",
      inventoryError
    );
  }

  return (
    <div>

      <h1 className="mb-6 text-3xl font-bold">
        Farm Inventory
      </h1>

      <form
        action="/api/admin/inventory"
        method="POST"
        className="mb-6 rounded-xl border bg-white p-6"
      >
        <div className="grid gap-4 md:grid-cols-2">

          <select
            name="farmId"
            required
            className="rounded border p-3"
          >
            <option value="">
              Select Farm
            </option>

            {(farms ?? []).map(
              (farm: any) => (
                <option
                  key={farm.id}
                  value={farm.id}
                >
                  {farm.farm_name}
                </option>
              )
            )}

          </select>

          <input
            type="date"
            name="inventoryDate"
            required
            className="rounded border p-3"
          />

          <select
            name="weightCategory"
            required
            className="rounded border p-3"
          >
            <option value="">
              Select Weight
            </option>

            <option value="1.5 Kg">
              1.5 Kg
            </option>

            <option value="1.8 Kg">
              1.8 Kg
            </option>

            <option value="2.0 Kg">
              2.0 Kg
            </option>

            <option value="2.2 Kg">
              2.2 Kg
            </option>

          </select>

          <input
            type="number"
            name="birdCount"
            placeholder="Bird Count"
            required
            className="rounded border p-3"
          />

          <input
            type="number"
            step="0.01"
            name="procurementPrice"
            placeholder="Procurement Price"
            required
            className="rounded border p-3"
          />

        </div>

        <button
          type="submit"
          className="mt-4 rounded bg-orange px-4 py-3 font-semibold text-white"
        >
          Save Inventory
        </button>

      </form>

      <div className="rounded-xl border bg-white p-6">

        <h2 className="mb-4 text-xl font-bold">
          Existing Inventory
        </h2>

        {(inventory ?? []).length === 0 ? (

          <p>
            No inventory found.
          </p>

        ) : (

          (inventory ?? []).map(
            (item: any) => {

              const farm =
                (farms ?? []).find(
                  (f: any) =>
                    f.id ===
                    item.farm_id
                );

              return (
                <div
                  key={item.id}
                  className="border-b py-3"
                >
                  <p>
                    Farm:{" "}
                    {farm?.farm_name ??
                      "Unknown Farm"}
                  </p>

                  <p>
                    Date:{" "}
                    {item.inventory_date}
                  </p>

                  <p>
                    Weight:{" "}
                    {item.weight_category}
                  </p>

                  <p>
                    Birds:{" "}
                    {item.bird_count}
                  </p>

                  <p>
                    Price: ₹
                    {Number(
                      item.procurement_price ?? 0
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </p>

                </div>
              );

            }
          )

        )}

      </div>

    </div>
  );
}