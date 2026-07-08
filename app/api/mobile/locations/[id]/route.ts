import { NextResponse } from "next/server";

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
  const { id } = await params;

  const location = await getLocationById(id);

  if (!location) {
    return NextResponse.json(
      { message: "Location not found." },
      { status: 404 }
    );
  }

  return NextResponse.json(location);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

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
      { message: "Invalid coordinates." },
      { status: 400 }
    );
  }

  if (!validatePincode(body.pincode)) {
    return NextResponse.json(
      { message: "Invalid pincode." },
      { status: 400 }
    );
  }

  const updated = await updateLocation(
    id,
    body
  );

  if (!updated) {
    return NextResponse.json(
      { message: "Unable to update location." },
      { status: 500 }
    );
  }

  return NextResponse.json(updated);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const success =
    await deleteLocation(id);

  if (!success) {
    return NextResponse.json(
      { message: "Unable to delete location." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
  });
}