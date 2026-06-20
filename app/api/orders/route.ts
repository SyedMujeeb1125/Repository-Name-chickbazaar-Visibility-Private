import { NextResponse } from "next/server";
import {
  addOrder,
  createId,
  readDb,
  getTodayRate
} from "@/lib/storage";
import type { OrderRecord } from "@/lib/types";

function value(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c =
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

  return R * c;
}
export async function POST(request: Request) {
  const formData = await request.formData();
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

const db = await readDb();
const retailer = db.retailers.find(
  (r: any) =>
    r.mobile ===
    value(formData, "mobile")
);

const todayRate = await getTodayRate();

const nearestFarm =
  db.farmPartners
    .filter(
      (farm) =>
        farm.latitude &&
        farm.longitude
    )
    .map((farm) => ({
      farm,
      distance: calculateDistance(
        latitude,
        longitude,
        Number(farm.latitude),
        Number(farm.longitude)
      )
    }))
    .sort(
      (a, b) =>
        a.distance - b.distance
    )[0];
   const requestedWeight = Number(
  formData.get("requestedWeight") || 0
);

const ratePerKg = Number(
  todayRate?.rate || 0
);

const estimatedAmount =
  requestedWeight * ratePerKg;

const category =
  retailer?.creditCategory ||
  "new";

const advancePercentage =
  category === "premium"
    ? 0
    : category === "trusted"
    ? 10
    : 20;
 const availableCredit =
  Number(
    (retailer as any)?.availableCredit || 0
  );

if (
  category !== "new" &&
  estimatedAmount >
    availableCredit
) {
  return NextResponse.json(
    {
      message:
        `Credit limit exceeded. Available Credit: ₹${availableCredit}`
    },
    { status: 400 }
  );
}   

const advanceRequired =
  Math.round(
    (estimatedAmount *
      advancePercentage) /
      100
  ); 
  const order: OrderRecord = {
  id: createId("order"),

  orderNumber: `CB-${new Date().getFullYear()}-${Date.now()
    .toString()
    .slice(-6)}`,

  createdAt: new Date().toISOString(),

  status: "new",

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
  nearestFarm?.farm.farmName || "",
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