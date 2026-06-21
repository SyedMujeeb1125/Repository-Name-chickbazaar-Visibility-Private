import { NextResponse } from "next/server";
import {
  updateOrderDetails,
  updateRecordStatus
} from "@/lib/storage";

export async function POST(
  request: Request
) {
  const formData =
    await request.formData();

  const orderId = String(
    formData.get("orderId")
  );

  const actualWeight = Number(
    formData.get("actualWeight")
  );

  await updateOrderDetails(
    orderId,
    {
      actualWeight
    }
  );

  await updateRecordStatus(
    "orders",
    orderId,
    "delivered"
  );

  return NextResponse.redirect(
    new URL(
      "/driver",
      request.url
    )
  );
}