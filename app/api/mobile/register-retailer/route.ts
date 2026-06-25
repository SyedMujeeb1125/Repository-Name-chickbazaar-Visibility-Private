import { NextResponse } from "next/server";
import {
  addRetailer,
  addRetailerLocation,
  retailerPrimaryShopExists,
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

  const shopExists =
  await retailerPrimaryShopExists(
    retailer.mobile
  );

if (!shopExists) {
  await addRetailerLocation({
    id: createId("shop"),

    retailerMobile:
      retailer.mobile,

    shopName:
      retailer.shopName,

    contactPerson:
      retailer.ownerName,

    mobile:
      retailer.mobile,

    address:
      retailer.address,

    latitude:
      retailer.latitude,

    longitude:
      retailer.longitude,

    createdAt:
      new Date().toISOString(),
  });
}
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