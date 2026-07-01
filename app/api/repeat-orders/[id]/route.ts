import { NextResponse } from "next/server";

import {
  pauseRepeatOrder,
  resumeRepeatOrder,
  deleteRepeatOrder,
} from "@/lib/planning/repeat-orders";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(
  request: Request,
  { params }: Props
) {
  try {
    const { id } = await params;

    const body = await request.json();

    switch (body.action) {
      case "pause":
        await pauseRepeatOrder(id);
        break;

      case "resume":
        await resumeRepeatOrder(id);
        break;

      default:
        return NextResponse.json(
          {
            message: "Invalid action.",
          },
          {
            status: 400,
          }
        );
    }

    return NextResponse.json({
      success: true,
    });

  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Unable to update repeat order.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: Props
) {
  try {
    const { id } = await params;

    await deleteRepeatOrder(id);

    return NextResponse.json({
      success: true,
    });

  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Unable to delete repeat order.",
      },
      {
        status: 500,
      }
    );
  }
}