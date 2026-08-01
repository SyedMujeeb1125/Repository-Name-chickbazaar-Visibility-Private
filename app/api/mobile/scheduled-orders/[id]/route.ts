import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

type Context = {
  params: Promise<{
    id: string;
  }>;
};

export async function PUT(
  request: NextRequest,
  context: Context
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Schedule ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    const body = await request.json();

    const {
      frequency,
      weekday,
      dayOfMonth,
      quantityKg,
      autoConfirm,
      isActive,
    } = body;

    if (!frequency) {
      return NextResponse.json(
        {
          success: false,
          message: "Frequency is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!quantityKg || Number(quantityKg) <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid quantity.",
        },
        {
          status: 400,
        }
      );
    }

    const { data, error } = await supabase
      .from("scheduled_orders")
      .update({
        frequency,

        weekday: weekday ?? null,

        day_of_month: dayOfMonth ?? null,

        quantity_kg: Number(quantityKg),

        auto_confirm: Boolean(autoConfirm),

        is_active: Boolean(isActive),

        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .maybeSingle();

    if (error) {
      console.error("[SCHEDULE][UPDATE]", error);

      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }

    if (!data) {
      return NextResponse.json(
        {
          success: false,
          message: "Schedule not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      schedule: data,
    });

  } catch (error) {

    console.error("[SCHEDULE][UPDATE]", error);

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
  request: NextRequest,
  context: Context
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Schedule ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    const { error } = await supabase
      .from("scheduled_orders")
      .update({
        is_active: false,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      console.error("[SCHEDULE][DELETE]", error);

      return NextResponse.json(
        {
          success: false,
          message: error.message,
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

    console.error("[SCHEDULE][DELETE]", error);

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