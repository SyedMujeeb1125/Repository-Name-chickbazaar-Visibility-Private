import { NextResponse } from "next/server";
import {
  readDb,
  getTodayRate
} from "@/lib/storage";

export async function GET(
  request: Request
) {
  const { searchParams } =
    new URL(request.url);

  const mobile =
    searchParams.get("mobile");

  if (!mobile) {
    return NextResponse.json(null);
  }

  const db = await readDb();

  const retailer =
    db.retailers.find(
      (r: any) =>
        r.mobile === mobile
    );

  const orders =
    db.orders.filter(
      (o: any) =>
        o.mobile === mobile
    );

  const pendingOrders =
    orders.filter(
      (o: any) =>
        o.status !==
          "delivered" &&
        o.status !==
          "completed" &&
        o.status !==
          "cancelled"
    );

    const todayRate =
  await getTodayRate();

  return NextResponse.json({
  shopName:
    retailer?.shopName || "",

  totalOrders:
    orders.length,

  pendingOrders:
    pendingOrders.length,

  availableCredit:
    (retailer as any)
      ?.availableCredit || 0,

  todayRate:
    Number(
      todayRate?.rate || 0
    ),
});
}