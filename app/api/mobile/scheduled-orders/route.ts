import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(
  request: NextRequest
) {
  try {
    const mobile =
      request.nextUrl.searchParams.get("mobile");

    if (!mobile) {
      return NextResponse.json(
        {
          success: false,
          message: "Mobile number is required.",
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
      .maybeSingle();

    if (retailerError) {
      console.error(
        "[SCHEDULE][GET][RETAILER]",
        retailerError
      );

      return NextResponse.json(
        {
          success: false,
          message: "Unable to fetch retailer.",
        },
        {
          status: 500,
        }
      );
    }

    if (!retailer) {
      return NextResponse.json(
        {
          success: false,
          message: "Retailer not found.",
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
      .eq("retailer_id", retailer.id)
      .eq("is_active", true)
      .order("created_at", {
        ascending: true,
      });

    if (error) {
      console.error(
        "[SCHEDULE][GET]",
        error
      );

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

    const schedulesWithDays =
      await Promise.all(
        (schedules ?? []).map(
          async (schedule: any) => {
            const {
              data: days,
              error: daysError,
            } = await supabase
              .from(
                "scheduled_order_days"
              )
              .select("weekday")
              .eq(
                "schedule_id",
                schedule.id
              )
              .order("weekday", {
                ascending: true,
              });

            if (daysError) {
              console.error(
                "[SCHEDULE][DAYS]",
                daysError
              );
            }

            return {
              ...schedule,
              weekdays:
                (days ?? []).map(
                  (d: any) =>
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

    console.error(
      "[SCHEDULE][GET]",
      error
    );

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

    if (!frequency) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Frequency is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !quantityKg ||
      Number(quantityKg) <= 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid quantity.",
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
      .maybeSingle();

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

    const scheduleId =
      crypto.randomUUID();

    const {
      data,
      error,
    } = await supabase
      .from(
        "scheduled_orders"
      )
      .insert({
        id: scheduleId,

        retailer_id:
          retailer.id,

        frequency,

        weekday: null,

        day_of_month:
          dayOfMonth ?? null,

        quantity_kg:
          Number(quantityKg),

        auto_confirm:
          Boolean(autoConfirm),

        is_active: true,

        created_at:
          new Date().toISOString(),

        updated_at:
          new Date().toISOString(),

      })
      .select()
      .single();

    if (error) {
      console.error(
        "[SCHEDULE][CREATE]",
        error
      );

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

    // ===== CONTINUE WITH PART 2 =====

        // ----------------------------------
    // Save weekdays
    // ----------------------------------

    if (
      Array.isArray(weekdays) &&
      weekdays.length > 0
    ) {
      const rows = weekdays.map(
        (day: number) => ({
          id: crypto.randomUUID(),

          schedule_id:
            scheduleId,

          weekday: day,

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

      if (weekdayError) {
        console.error(
          "[SCHEDULE][CREATE][DAYS]",
          weekdayError
        );

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

    console.error(
      "[SCHEDULE][CREATE]",
      error
    );

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

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Schedule ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!frequency) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Frequency is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !quantityKg ||
      Number(quantityKg) <= 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid quantity.",
        },
        {
          status: 400,
        }
      );
    }

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
          Number(quantityKg),

        auto_confirm:
          Boolean(autoConfirm),

        updated_at:
          new Date().toISOString(),

      })
      .eq("id", id);

    if (error) {
      console.error(
        "[SCHEDULE][UPDATE]",
        error
      );

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

    const {
      error: deleteError,
    } = await supabase
      .from(
        "scheduled_order_days"
      )
      .delete()
      .eq(
        "schedule_id",
        id
      );

    if (deleteError) {
      console.error(
        "[SCHEDULE][UPDATE][DELETE_DAYS]",
        deleteError
      );
    }

    if (
      Array.isArray(weekdays) &&
      weekdays.length > 0
    ) {
      const rows =
        weekdays.map(
          (
            day: number
          ) => ({
            id:
              crypto.randomUUID(),

            schedule_id:
              id,

            weekday:
              day,

            created_at:
              new Date().toISOString(),
          })
        );

      const {
        error: insertError,
      } = await supabase
        .from(
          "scheduled_order_days"
        )
        .insert(rows);

      if (insertError) {
        console.error(
          "[SCHEDULE][UPDATE][INSERT_DAYS]",
          insertError
        );

        return NextResponse.json(
          {
            success: false,
            message:
              insertError.message,
          },
          {
            status: 500,
          }
        );
      }
    }

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    console.error(
      "[SCHEDULE][UPDATE]",
      error
    );

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

    const { id } = body;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Schedule ID is required.",
        },
        {
          status: 400,
        }
      );
    }

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
      console.error(
        "[SCHEDULE][DELETE]",
        error
      );

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

    console.error(
      "[SCHEDULE][DELETE]",
      error
    );

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