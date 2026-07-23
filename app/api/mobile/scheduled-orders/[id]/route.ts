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

    const { id } =
      await context.params;

    const body =
      await request.json();

    const {
      frequency,
      weekday,
      dayOfMonth,
      quantityKg,
      autoConfirm,
      isActive,
    } = body;

    const {
      data,
      error,
    } = await supabase

      .from("scheduled_orders")

      .update({

        frequency,

        weekday:
          weekday ?? null,

        day_of_month:
          dayOfMonth ?? null,

        quantity_kg:
          quantityKg,

        auto_confirm:
          autoConfirm,

        is_active:
          isActive,

        updated_at:
          new Date().toISOString(),

      })

      .eq("id", id)

      .select()

      .single();

    if (error) {

      return NextResponse.json(
        {
          success: false,
          message:
            error.message,
        },
        {
          status: 500,
        }
      );

    }

    return NextResponse.json({

      success: true,

      schedule: data,

    });

  } catch (error) {

    return NextResponse.json(
      {
        success: false,
        message:
          "Internal Server Error.",
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

    const { id } =
      await context.params;

    const { error } =
      await supabase

        .from("scheduled_orders")

        .update({

          is_active: false,

          updated_at:
            new Date().toISOString(),

        })

        .eq("id", id);

    if (error) {

      return NextResponse.json(
        {
          success: false,
          message:
            error.message,
        },
        {
          status: 500,
        }
      );

    }

    return NextResponse.json({

      success: true,

    });

  } catch {

    return NextResponse.json(
      {
        success: false,
        message:
          "Internal Server Error.",
      },
      {
        status: 500,
      }
    );

  }

}