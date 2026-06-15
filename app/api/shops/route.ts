import { NextResponse } from "next/server";
import {
  addRetailerLocation,
  createId
} from "@/lib/storage";

export async function POST(
  request: Request
) {
  const formData =
    await request.formData();

  await addRetailerLocation({
    id: createId("shop"),

    retailerMobile:
      String(
        formData.get(
          "retailerMobile"
        ) || ""
      ),

    shopName:
      String(
        formData.get("shopName")
      ),

    contactPerson:
      String(
        formData.get(
          "contactPerson"
        ) || ""
      ),

    mobile:
      String(
        formData.get("mobile") ||
          ""
      ),

    address:
      String(
        formData.get("address")
      ),

    latitude: Number(
      formData.get("latitude")
    ),

    longitude: Number(
      formData.get("longitude")
    ),

    createdAt:
      new Date().toISOString()
  });

  return NextResponse.json({
    success: true
  });
}