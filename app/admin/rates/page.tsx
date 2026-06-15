import { supabase } from "@/lib/supabase";

export default async function RatesPage() {
  const { data } = await supabase
    .from("daily_rates")
    .select("*")
    .order("created_at", {
      ascending: false
    });

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Daily Rate Management
      </h1>

      <form
        action="/api/admin/rates"
        method="POST"
        className="mb-8 rounded-xl border bg-white p-6"
      >
        <label className="mb-2 block font-semibold">
          Today's Live Chicken Rate (₹/Kg)
        </label>

        <input
          type="number"
          name="rate"
          required
          className="w-full rounded-lg border p-3"
        />

        <button
          type="submit"
          className="mt-4 rounded bg-orange px-5 py-3 font-semibold text-white"
        >
          Save Rate
        </button>
      </form>

      <div className="rounded-xl border bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">
          Rate History
        </h2>

        {data?.map((rate: any) => (
          <div
            key={rate.id}
            className="flex justify-between border-b py-3"
          >
            <span>
              ₹{rate.rate}/Kg
            </span>

            <span>
              {new Date(
                rate.created_at
              ).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}