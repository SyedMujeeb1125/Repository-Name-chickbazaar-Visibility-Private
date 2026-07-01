export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";

import { getLoggedInRetailerMobile } from "@/lib/retailer";
import { supabase } from "@/lib/supabase";

import { getRepeatOrders } from "@/lib/planning/repeat-orders";

import RepeatOrderSummary from "@/components/planning/RepeatOrderSummary";
import RepeatOrderCalendar from "@/components/planning/RepeatOrderCalendar";
import RepeatOrderList from "@/components/planning/RepeatOrderList";

export default async function RepeatOrdersPage() {

  const mobile =
    await getLoggedInRetailerMobile();

  if (!mobile) {
    redirect("/login");
  }

  const { data: retailer } =
    await supabase
      .from("retailers")
      .select("id, shop_name")
      .eq("mobile", mobile)
      .single();

  if (!retailer) {
    redirect("/login");
  }

  const repeatOrders =
    await getRepeatOrders(
      retailer.id
    );

  return (

    <div className="mx-auto max-w-7xl px-4 py-10">

      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

        <div>

          <h1 className="text-4xl font-extrabold text-navy">

            Repeat Orders

          </h1>

          <p className="mt-2 text-slate-500">

            Automate your daily procurement.

          </p>

        </div>

        <a
          href="/repeat-orders/new"
          className="rounded-xl bg-orange px-6 py-4 font-bold text-white"
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