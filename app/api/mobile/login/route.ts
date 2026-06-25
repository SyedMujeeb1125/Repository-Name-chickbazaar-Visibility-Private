import { NextResponse } from "next/server";
import {
  readDb,
  retailerPrimaryShopExists,
  addRetailerLocation,
  createId,
} from "@/lib/storage";

export async function POST(
  request: Request
) {
  const body = await request.json();

  const mobile = String(
    body.mobile || ""
  );

  const db = await readDb();

  const retailer =
    db.retailers.find(
      (r: any) =>
        r.mobile === mobile
    );

  if (!retailer) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Retailer not found",
      },
      {
        status: 404,
      }
    );
  }
  const shopExists =
  await retailerPrimaryShopExists(
    retailer.mobile
  );

  console.log(
  "LOGIN RETAILER:",
  retailer.mobile
);

console.log(
  "SHOP EXISTS:",
  shopExists
);

if (!shopExists) {
  console.log(
  "CREATING PRIMARY SHOP..."
);
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
  console.log(
  "PRIMARY SHOP CREATED"
);
}

  return NextResponse.json({
    success: true,
    retailer,
  });
}