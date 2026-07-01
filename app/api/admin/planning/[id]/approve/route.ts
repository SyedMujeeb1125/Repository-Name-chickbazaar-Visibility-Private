import { NextResponse } from "next/server";
import { approvePlanningRun } from "@/lib/planning/planning-runs";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function POST(
  request: Request,
  { params }: Props
) {
  try {
    const { id } = await params;

    await approvePlanningRun(id);

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Unable to approve planning run.",
      },
      {
        status: 500,
      }
    );
  }
}