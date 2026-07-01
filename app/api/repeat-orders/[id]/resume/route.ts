import { NextResponse } from "next/server";

import { resumeRepeatOrder } from "@/lib/planning/repeat-orders";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await resumeRepeatOrder(id);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Unable to resume repeat order.",
      },
      {
        status: 500,
      }
    );
  }
}