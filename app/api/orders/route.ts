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
  const required = ["shopName", "ownerName", "mobile", "email", "address", "birds", "averageWeight", "deliveryDate"];

  for (const key of required) {
    if (!value(formData, key)) {
      return NextResponse.json({ message: `${key} is required.` }, { status: 400 });
    }
  }
  const latitude = Number(formData.get("latitude") || 0);
const longitude = Number(formData.get("longitude") || 0);

const db = await readDb();

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

requestedWeight: Number(
  formData.get("requestedWeight") || 0
),
 ratePerKg: Number(todayRate?.rate || 0),
  assignedFarm:
  nearestFarm?.farm.farmName || "",
  trackingNotes: "",

  latitude,
  longitude,

  shopName: value(formData, "shopName"),
  deliveryShopName: value(
  formData,
  "deliveryShopName"
),
  ownerName: value(formData, "ownerName"),
  mobile: value(formData, "mobile"),
  email: value(formData, "email"),
  address: value(formData, "address"),
  birds: value(formData, "birds"),
  averageWeight: value(formData, "averageWeight"),
  deliveryDate: value(formData, "deliveryDate"),
  notes: value(formData, "notes")
};

  await addOrder(order);
  return NextResponse.json({ message: "Order saved.", id: order.id });
}
