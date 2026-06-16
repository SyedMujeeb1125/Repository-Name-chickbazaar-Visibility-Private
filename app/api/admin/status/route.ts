import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import {
  updateRecordStatus,
  addLedgerEntry,
  readDb
} from "@/lib/storage";
import type {
  OrderStatus,
  PartnerStatus
} from "@/lib/types";

const collections = ["orders", "retailers", "farmPartners"] as const;
const statuses = [
  "new",
  "confirmed",
  "procured",
  "dispatched",
  "delivered",
  "completed",
  "cancelled",
  "approved",
  "blocked",
  "rejected"
];

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const formData = await request.formData();
  const collection = String(formData.get("collection") || "") as (typeof collections)[number];
  const id = String(formData.get("id") || "");
  const status = String(
  formData.get("status") || ""
) as
  | OrderStatus
  | PartnerStatus;

  if (!collections.includes(collection) || !id || !statuses.includes(
  status as any
)) {
    return NextResponse.json({ message: "Invalid status update." }, { status: 400 });
  }

  const ok = await updateRecordStatus(collection, id, status);
  if (
  ok &&
  collection === "orders" &&
  status === "completed"
) {
  const db = await readDb();

  const order = db.orders.find(
    (o: any) => o.id === id
  );

  const retailer =
    db.retailers.find(
      (r: any) =>
        r.mobile ===
        order?.mobile
    );

  if (
    order &&
    retailer &&
    order.finalAmount
  ) {
    await addLedgerEntry(
      retailer.id,
      order.id,
      Number(
        order.finalAmount
      ),
      0,
      `Order ${
        order.orderNumber ||
        order.id
      }`
    );
  }
}
  if (!ok) {
    return NextResponse.json({ message: "Record not found." }, { status: 404 });
  }

  return NextResponse.json({ message: "Status updated." });
}
