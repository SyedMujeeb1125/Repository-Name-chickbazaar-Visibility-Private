export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";

import { getLoggedInRetailerMobile } from "@/lib/retailer";
import { readDb } from "@/lib/storage";

import RepeatOrderSummary from "@/components/planning/RepeatOrderSummary";
import RepeatOrderList from "@/components/planning/RepeatOrderList";
import RepeatOrderCalendar from "@/components/planning/RepeatOrderCalendar";

export default async function RepeatOrdersPage() {
  const mobile =
    await getLoggedInRetailerMobile();

  if (!mobile) {
    redirect("/login");
  }

  const db = await readDb();

  const retailer =
    db.retailers.find(
      (r: any) =>
        r.mobile === mobile
    );

  if (!retailer) {
    redirect("/login");
  }

  // Temporary until Supabase is connected
  const repeatOrders: any[] = [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">

      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

        <div>

          <h1 className="text-4xl font-extrabold text-navy">

            Repeat Orders

          </h1>

          <p className="mt-2 text-slate-500">

            Automate your daily, weekly and monthly
            chicken procurement.

          </p>

        </div>

        <a
          href="/repeat-orders/new"
          className="rounded-xl bg-orange px-6 py-4 text-center font-bold text-white"
        >
          + Create Repeat Order
        </a>

      </div>

      <div className="mt-8">

        <RepeatOrderSummary
          orders={repeatOrders}
        />

      </div>

      <div className="mt-10">

        <RepeatOrderCalendar
          orders={repeatOrders}
        />

      </div>

      <div className="mt-10">

        <RepeatOrderList
          orders={repeatOrders}
        />

      </div>

    </div>
  );
}