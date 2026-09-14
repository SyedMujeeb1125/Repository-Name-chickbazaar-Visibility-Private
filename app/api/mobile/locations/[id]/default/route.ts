import { NextResponse } from "next/server";

import { getMobileAuthenticatedRetailer } from "@/lib/retailer";
import {
  getLocationById,
  setDefaultLocation,
} from "@/lib/location";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Location ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    const mobile = getMobileAuthenticatedRetailer(request);

    if (!mobile) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        {
          status: 401,
        }
      );
    }

    const location = await getLocationById(id);

    if (!location || location.retailer_mobile !== mobile) {
      return NextResponse.json(
        {
          success: false,
          message: "Location not found.",
        },
        {
          status: 404,
        }
      );
    }

    const success = await setDefaultLocation(id);

    if (!success) {
      console.error("[LOCATION][DEFAULT]", id);

      return NextResponse.json(
        {
          success: false,
          message: "Unable to set default location.",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("[LOCATION][DEFAULT]", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error.",
      },
      {
        status: 500,
      }
    );
  }
}
