import { NextResponse } from "next/server";

import { setDefaultLocation } from "@/lib/location";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const success =
    await setDefaultLocation(id);

  if (!success) {
    return NextResponse.json(
      {
        message:
          "Unable to set default location.",
      },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json({
    success: true,
  });
}