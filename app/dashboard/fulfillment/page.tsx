import {
  getAllocations
} from "@/lib/storage";

export default async function FulfillmentPage() {
  const allocations =
    await getAllocations();

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Farm Fulfillment
      </h1>

      {allocations.map(
        (allocation: any) => (
          <div
            key={allocation.id}
            className="mb-4 rounded-xl border bg-white p-5"
          >
            <p className="font-bold">
              {allocation.farm_name}
            </p>

            <p>
              Weight:
              {" "}
              {
                allocation.weight_category
              }
            </p>

            <p>
              Requested:
              {" "}
              {
                allocation.allocated_birds
              }
              {" "}
              Birds
            </p>

            <form
              action="/api/farm/fulfillment"
              method="POST"
              className="mt-3"
            >
              <input
                type="hidden"
                name="allocationId"
                value={
                  allocation.id
                }
              />

              <input
                type="hidden"
                name="farmId"
                value={
                  allocation.farm_id
                }
              />

              <input
                type="number"
                name="acceptedBirds"
                defaultValue={
                  allocation.allocated_birds
                }
                className="rounded border p-2"
              />

              <select
                name="status"
                className="ml-2 rounded border p-2"
              >
                <option value="accepted">
                  Accept Full
                </option>

                <option value="partial">
                  Accept Partial
                </option>

                <option value="declined">
                  Decline
                </option>
              </select>

              <button
                type="submit"
                className="ml-2 rounded bg-green-600 px-4 py-2 text-white"
              >
                Submit
              </button>
            </form>
          </div>
        )
      )}
    </div>
  );
}