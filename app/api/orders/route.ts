import { NextResponse } from "next/server";
import { addOrder, createId } from "@/lib/storage";
import type { OrderRecord } from "@/lib/types";

function value(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const required = ["shopName", "ownerName", "mobile", "email", "address", "birds", "averageWeight", "deliveryDate"];

  for (const key of required) {
    if (!value(formData, key)) {
      return NextResponse.json({ message: `${key} is required.` }, { status: 400 });
    }
  }

  const order: OrderRecord = {
    id: createId("order"),
    createdAt: new Date().toISOString(),
    status: "new",
    shopName: value(formData, "shopName"),
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
