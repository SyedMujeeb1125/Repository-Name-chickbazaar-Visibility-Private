import { NextResponse } from "next/server";
import { getTodayRate } from "@/lib/rate-service";
import type { OrderRecord } from "@/lib/types";
import { getOrderPolicy } from "@/lib/order-policy";
import { supabase } from "@/lib/supabase";
import { allocateOrder } from "@/lib/allocation-service";
import {
  addOrder,
  createId
} from "@/lib/storage";

function value(formData: any, key: string) {
  return String(formData.get(key) || "").trim();
}
export async function POST(request: Request) {
  const formData: any =
  await request.formData();
  const orderBy = String(
  formData.get("orderBy") || "weight"
);

if (
  orderBy === "weight" &&
  !value(formData, "requestedWeight")
) {
  return NextResponse.json(
    {
      message:
        "Requested Weight is required."
    },
    { status: 400 }
  );
}

if (
  orderBy === "birds" &&
  !value(formData, "birds")
) {
  return NextResponse.json(
    {
      message:
        "Bird count is required."
    },
    { status: 400 }
  );
}
  const required = [
  "shopName",
  "ownerName",
  "mobile",
  "email",
  "address",
  "deliveryDate"
];

  for (const key of required) {
    if (!value(formData, key)) {
      return NextResponse.json({ message: `${key} is required.` }, { status: 400 });
    }
  }
  const latitude = Number(formData.get("latitude") || 0);
const longitude = Number(formData.get("longitude") || 0);

const { data: retailer } = await supabase
  .from("retailers")
  .select("*")
  .eq("mobile", value(formData, "mobile"))
  .single();

if (!retailer) {
  return NextResponse.json(
    {
      message: "Retailer not found.",
    },
    { status: 404 }
  );
}
const policy =
  await getOrderPolicy(retailer);

if (!policy.allowed) {
  return NextResponse.json(
    {
      message: policy.message,
    },
    { status: 400 }
  );
}

const zone =
  retailer?.zone || "central";

  const allocation = await allocateOrder({
  latitude,
  longitude,
  zone,
});


   const requestedWeight = Number(
  formData.get("requestedWeight") || 0
);
const todayRate = await getTodayRate();
const ratePerKg = Number(
  todayRate?.rate || 0
);

const estimatedAmount =
  requestedWeight * ratePerKg;

const advancePercentage = 0;

const advanceRequired =
  policy.bookingAmount;
  const order: OrderRecord = {
  id: createId("order"),

  orderNumber: `CB-${new Date().getFullYear()}-${Date.now()
    .toString()
    .slice(-6)}`,

  createdAt: new Date().toISOString(),

  status: "new",

  zone,

  assignedDriver:
  allocation.assignedDriver,

assignedVehicle:
  allocation.assignedVehicle,

  paymentStatus: "pending",
  paymentAmount: 0,

  paymentType:
  value(formData, "paymentType") as
    | "advance"
    | "actual_weight",

requestedWeight,

ratePerKg,

estimatedAmount,

advancePercentage,

advanceRequired,
  assignedFarm:
  allocation.assignedFarm,
  trackingNotes: "",

  latitude,
  longitude,

  shopName: value(formData, "shopName"),
  ownerName: value(formData, "ownerName"),
  mobile: value(formData, "mobile"),
  email: value(formData, "email"),
  address: value(formData, "address"),
  birds:
  orderBy === "birds"
    ? value(formData, "birds")
    : "0",
  averageWeight: value(formData, "averageWeight"),
  deliveryDate: value(formData, "deliveryDate"),
  notes: value(formData, "notes")
};

  await addOrder(order);
  return NextResponse.json({ message: "Order saved.", id: order.id });
}