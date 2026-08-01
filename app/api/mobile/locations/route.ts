import { NextResponse } from "next/server";

import {
  createLocation,
  getRetailerLocations,
  validateCoordinates,
  validatePincode,
} from "@/lib/location";

export async function GET(request: Request) {
  try {

    const { searchParams } =
      new URL(request.url);

    const mobile =
      searchParams.get("mobile");

    if (!mobile) {
      return NextResponse.json(
        {
          success: false,
          message: "Mobile is required.",
        },
        {
          status: 400,
        }
      );
    }

    const locations =
      await getRetailerLocations(mobile);

    return NextResponse.json(
      locations ?? []
    );

  } catch (error) {

    console.error(
      "[LOCATIONS][GET]",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Internal Server Error.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: Request) {
  try {

    const body =
      await request.json();

    if (!body.retailerMobile) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Retailer mobile is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !body.shopName ||
      typeof body.shopName !== "string"
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Shop name is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !body.address ||
      typeof body.address !== "string"
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Address is required.",
        },
        {
          status: 400,
        }
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
          success: false,
          message:
            "Invalid coordinates.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      body.pincode !== undefined &&
      !validatePincode(body.pincode)
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid pincode.",
        },
        {
          status: 400,
        }
      );
    }

    const location =
      await createLocation(body);

    if (!location) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Unable to create location.",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(
      location,
      {
        status: 201,
      }
    );

  } catch (error) {

    console.error(
      "[LOCATIONS][CREATE]",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Internal Server Error.",
      },
      {
        status: 500,
      }
    );
  }
}