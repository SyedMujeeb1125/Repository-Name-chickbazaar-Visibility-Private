import { NextResponse } from "next/server";

import {
  getTodayRate,
  getTomorrowRate,
} from "@/lib/rate-service";

import {
  getBusinessPhase,
} from "@/lib/business/businessEngine";

import { BusinessPhase } from "@/lib/types/business";

export async function GET() {
  try {
    const now = new Date();

    const phase = getBusinessPhase(now);

    const today = await getTodayRate(now);

    const tomorrow = await getTomorrowRate(now);

    const visibleRate =
      phase === BusinessPhase.BOOKING
        ? Number(tomorrow?.rate ?? 0)
        : Number(today?.rate ?? 0);

    const effectiveDate =
      phase === BusinessPhase.BOOKING
        ? tomorrow?.effective_date
        : today?.effective_date;

    return NextResponse.json({
      success: true,

      phase,

      rate: visibleRate,

      todayRate: Number(today?.rate ?? 0),

      tomorrowRate:
        phase === BusinessPhase.BOOKING
          ? Number(tomorrow?.rate ?? 0)
          : null,

      effectiveDate,

      publishedAt: "19:00",
    });
  } catch (error) {
    console.error("[LIVE_RATE]", error);

    return NextResponse.json(
      {
        success: false,
        rate: 0,
      },
      { status: 500 }
    );
  }
}
