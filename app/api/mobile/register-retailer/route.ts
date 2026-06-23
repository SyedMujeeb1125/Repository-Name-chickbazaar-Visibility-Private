import { NextResponse } from "next/server";
import {
  addRetailer,
  createId,
} from "@/lib/storage";

export async function POST(
  request: Request
) {
  const body = await request.json();

  const retailer = {
    id: createId("retailer"),

    createdAt:
      new Date().toISOString(),

    status: "new",

    creditCategory: "new",

    shopName:
      body.shopName,

    ownerName:
      body.ownerName,

    mobile:
      body.mobile,

    email:
      body.email || "",

    address:
      body.address,

    gst: "",

    latitude:
      body.latitude,

    longitude:
      body.longitude,
  };

  try {
  await addRetailer(
    retailer as any
  );

  return NextResponse.json({
    success: true,
    retailerId: retailer.id,
  });
} catch (error: any) {
  return NextResponse.json(
    {
      success: false,
      error: String(error),
    },
    { status: 500 }
  );
}
}