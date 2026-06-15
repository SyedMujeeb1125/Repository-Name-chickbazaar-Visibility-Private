import { readDb } from "@/lib/storage";

export default async function InventoryPage() {
  const db = await readDb();

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

            {db.farmPartners
              .filter(
                (farm) =>
                  farm.status ===
                  "approved"
              )
              .map((farm) => (
                <option
                  key={farm.id}
                  value={farm.id}
                >
                  {farm.farmName}
                </option>
              ))}
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
          className="mt-4 rounded bg-orange px-4 py-3 font-semibold text-white"
        >
          Save Inventory
        </button>
      </form>

      <div className="rounded-xl border bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">
          Existing Inventory
        </h2>

        {db.farmInventory.map((item) => {
  const farm =
    db.farmPartners.find(
      (f) => f.id === item.farmId
    );

  return (
    <div
      key={item.id}
      className="border-b py-3"
    >
      <p>
        Farm:
        {" "}
        {farm?.farmName ||
          "Unknown Farm"}
      </p>

      <p>
        Date:
        {" "}
        {item.inventoryDate}
      </p>

      <p>
        Weight:
        {" "}
        {item.weightCategory}
      </p>

      <p>
        Birds:
        {" "}
        {item.birdCount}
      </p>

      <p>
        Price:
        ₹
        {item.procurementPrice}
      </p>
    </div>
  );
})}
      </div>
    </div>
  );
}