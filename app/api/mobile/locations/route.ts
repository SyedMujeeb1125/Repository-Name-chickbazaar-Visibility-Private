import { NextResponse } from "next/server";

import {
  createLocation,
  getRetailerLocations,
  validateCoordinates,
  validatePincode,
} from "@/lib/location";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const mobile = searchParams.get("mobile");

  if (!mobile) {
    return NextResponse.json(
      { message: "Mobile is required." },
      { status: 400 }
    );
  }

  const locations =
    await getRetailerLocations(mobile);

  return NextResponse.json(locations);
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.retailerMobile) {
    return NextResponse.json(
      {
        message:
          "Retailer mobile is required.",
      },
      { status: 400 }
    );
  }

  if (
    body.latitude !== undefined &&
    body.longitude !== undefined &&
    !validateCoordinates(
      Number(body.latitude),
      Number(body.longitude)
    )
  ) {
    return NextResponse.json(
      {
        message:
          "Invalid coordinates.",
      },
      { status: 400 }
    );
  }

  if (
    !validatePincode(body.pincode)
  ) {
    return NextResponse.json(
      {
        message:
          "Invalid pincode.",
      },
      { status: 400 }
    );
  }

  const location =
    await createLocation(body);

  if (!location) {
    return NextResponse.json(
      {
        message:
          "Unable to create location.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json(location, {
    status: 201,
  });
}