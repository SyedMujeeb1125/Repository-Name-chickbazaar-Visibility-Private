import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function RatesPage() {
  const {
    data,
    error,
  } = await supabase
    .from("daily_rates")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error("[RATES]", error);
  }

  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

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
          Effective Date
        </label>

        <input
          type="date"
          name="effective_date"
          defaultValue={today}
          required
          className="mb-4 w-full rounded-lg border p-3"
        />

        <label className="mb-2 block font-semibold">
          Chicken Rate (?/Kg)
        </label>

        <input
          type="number"
          name="rate"
          min="1"
          step="0.01"
          required
          className="w-full rounded-lg border p-3"
        />

        <button
          type="submit"
          className="mt-4 rounded bg-orange px-5 py-3 font-semibold text-white"
        >
          Publish Rate
        </button>
      </form>

      <div className="rounded-xl border bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">
          Rate History
        </h2>

        {(data ?? []).map((rate: any) => (
          <div
            key={rate.id}
            className="flex justify-between border-b py-3 last:border-0"
          >
            <span>
              ?{Number(rate.rate).toLocaleString("en-IN")}/Kg
            </span>

            <span>
              {rate.effective_date
                ? new Date(
                    `${rate.effective_date}T00:00:00`
                  ).toLocaleDateString("en-IN")
                : new Date(
                    rate.created_at
                  ).toLocaleDateString("en-IN")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
