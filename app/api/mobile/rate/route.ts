import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data: rate, error } = await supabase
      .from("daily_rates")
      .select("rate, created_at")
      .order("created_at", {
        ascending: false,
      })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("[LIVE_RATE]", error);

      return NextResponse.json(
        {
          rate: 0,
          date: null,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      rate: Number(rate?.rate ?? 0),
      date: rate?.created_at ?? null,
    });
  } catch (error) {
    console.error("[LIVE_RATE]", error);

    return NextResponse.json(
      {
        rate: 0,
        date: null,
      },
      {
        status: 500,
      }
    );
  }
}