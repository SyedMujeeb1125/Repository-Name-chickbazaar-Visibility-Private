import { NextResponse } from "next/server";

import {
  createId,
  addRetailerLocation
} from "@/lib/storage";

export async function POST(
  request: Request
) {
  const body =
    await request.json();

  await addRetailerLocation({
    id: createId(
      "shop"
    ),

    retailerMobile:
      body.mobile,

    shopName:
      body.shopName,

    contactPerson:
      body.ownerName,

    mobile:
      body.mobile,

    address:
      body.address,

    createdAt:
      new Date().toISOString()
  });

  return NextResponse.json({
    success: true
  });
}