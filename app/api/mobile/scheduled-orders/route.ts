import { NextRequest, NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";

import { createId } from "@/lib/storage";

export async function GET(
  request: NextRequest
) {

  try {

    const mobile =
      request.nextUrl.searchParams.get(
        "mobile"
      );

    if (!mobile) {

      return NextResponse.json(
        {
          success: false,
          message:
            "Mobile number is required.",
        },
        {
          status: 400,
        }
      );

    }

    const {
      data: retailer,
      error: retailerError,
    } = await supabase

      .from("retailers")

      .select("id")

      .eq("mobile", mobile)

      .single();

    if (
      retailerError ||
      !retailer
    ) {

      return NextResponse.json(
        {
          success: false,
          message:
            "Retailer not found.",
        },
        {
          status: 404,
        }
      );

    }

    const {
      data: schedules,
      error,
    } = await supabase

      .from("scheduled_orders")

      .select("*")

      .eq(
        "retailer_id",
        retailer.id
      )

      .eq(
        "is_active",
        true
      )

      .order(
        "created_at",
        {
          ascending: true,
        }
      );

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

    const schedulesWithDays =
      await Promise.all(

        (schedules ?? []).map(
          async (
            schedule: any
          ) => {

            const {
              data: days,
            } = await supabase

              .from(
                "scheduled_order_days"
              )

              .select(
                "weekday"
              )

              .eq(
                "schedule_id",
                schedule.id
              )

              .order(
                "weekday",
                {
                  ascending:
                    true,
                }
              );

            return {

              ...schedule,

              weekdays:
                (days ?? []).map(
                  (
                    d: any
                  ) =>
                    d.weekday
                ),

            };

          }
        )

      );

    return NextResponse.json({

      success: true,

      schedules:
        schedulesWithDays,

    });

  } catch (error) {

    console.error(error);

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

export async function POST(
  request: NextRequest
) {

    try {

    const body =
      await request.json();

    const {

      mobile,

      frequency,

      weekdays,

      dayOfMonth,

      quantityKg,

      autoConfirm,

    } = body;

    if (
      !mobile ||
      !frequency ||
      !quantityKg
    ) {

      return NextResponse.json(
        {
          success: false,
          message:
            "Missing required fields.",
        },
        {
          status: 400,
        }
      );

    }

    const {
      data: retailer,
      error: retailerError,
    } = await supabase

      .from("retailers")

      .select("id")

      .eq("mobile", mobile)

      .single();

    if (
      retailerError ||
      !retailer
    ) {

      return NextResponse.json(
        {
          success: false,
          message:
            "Retailer not found.",
        },
        {
          status: 404,
        }
      );

    }

    const {
      data,
      error,
    } = await supabase

      .from(
        "scheduled_orders"
      )

      .insert({

        id:
          createId("schedule"),

        retailer_id:
          retailer.id,

        frequency,

        weekday: null,

        day_of_month:
          dayOfMonth ?? null,

        quantity_kg:
          quantityKg,

        auto_confirm:
          autoConfirm ?? false,

        is_active: true,

        created_at:
          new Date().toISOString(),

        updated_at:
          new Date().toISOString(),

      })

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

    // -------------------------------------
    // Save weekdays
    // -------------------------------------

    if (
      Array.isArray(
        weekdays
      ) &&
      weekdays.length > 0
    ) {

      const rows =
        weekdays.map(
          (
            day: number
          ) => ({

            id:
              createId(
                "schedule-day"
              ),

            schedule_id:
              data.id,

            weekday:
              day,

            created_at:
              new Date().toISOString(),

          })
        );

      const {
        error: weekdayError,
      } = await supabase

        .from(
          "scheduled_order_days"
        )

        .insert(rows);

      if (
        weekdayError
      ) {

        return NextResponse.json(
          {
            success: false,
            message:
              weekdayError.message,
          },
          {
            status: 500,
          }
        );

      }

    }

    return NextResponse.json({

      success: true,

      schedule: data,

    });

  } catch (error) {

    console.error(error);

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

export async function PUT(
  request: NextRequest
) {

    try {

    const body =
      await request.json();

    const {

      id,

      frequency,

      weekdays,

      dayOfMonth,

      quantityKg,

      autoConfirm,

    } = body;

    const {
      error,
    } = await supabase

      .from("scheduled_orders")

      .update({

        frequency,

        weekday: null,

        day_of_month:
          dayOfMonth ?? null,

        quantity_kg:
          quantityKg,

        auto_confirm:
          autoConfirm ?? false,

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

    await supabase

      .from(
        "scheduled_order_days"
      )

      .delete()

      .eq(
        "schedule_id",
        id
      );

    if (
      Array.isArray(
        weekdays
      ) &&
      weekdays.length > 0
    ) {

      const rows =
        weekdays.map(
          (
            day: number
          ) => ({

            id:
              createId(
                "schedule-day"
              ),

            schedule_id:
              id,

            weekday:
              day,

            created_at:
              new Date().toISOString(),

          })
        );

      await supabase

        .from(
          "scheduled_order_days"
        )

        .insert(rows);

    }

    return NextResponse.json({

      success: true,

    });

  } catch (error) {

    console.error(error);

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
  request: NextRequest
) {

  try {

    const body =
      await request.json();

    const { id } =
      body;

    const {
      error,
    } = await supabase

      .from(
        "scheduled_orders"
      )

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

  } catch (error) {

    console.error(error);

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