import { NextResponse } from "next/server";

import { getMobileAuthenticatedRetailer } from "@/lib/retailer";
import {
  deleteLocation,
  getLocationById,
  updateLocation,
  validateCoordinates,
  validatePincode,
} from "@/lib/location";

export async function GET(
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

    return NextResponse.json(location);
  } catch (error) {
    console.error("[LOCATION][GET]", error);

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

export async function PATCH(
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

    const body = await request.json();

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
          message: "Invalid coordinates.",
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
          message: "Invalid pincode.",
        },
        {
          status: 400,
        }
      );
    }

    const updated = await updateLocation(id, body);

    if (!updated) {
      return NextResponse.json(
        {
          success: false,
          message: "Unable to update location.",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("[LOCATION][PATCH]", error);

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

export async function DELETE(
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

    const success = await deleteLocation(id);

    if (!success) {
      return NextResponse.json(
        {
          success: false,
          message: "Unable to delete location.",
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
    console.error("[LOCATION][DELETE]", error);

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
