import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getMobileAuthenticatedRetailer } from "@/lib/retailer";

type Context = {
  params: Promise<{
    id: string;
  }>;
};

async function getAuthenticatedRetailer(request: NextRequest) {
  const mobile = getMobileAuthenticatedRetailer(request);

  if (!mobile) {
    return {
      mobile: null,
      retailer: null,
      response: NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        {
          status: 401,
        }
      ),
    };
  }

  const {
    data: retailer,
    error,
  } = await supabase
    .from("retailers")
    .select("id")
    .eq("mobile", mobile)
    .maybeSingle();

  if (error || !retailer) {
    return {
      mobile,
      retailer: null,
      response: NextResponse.json(
        {
          success: false,
          message: "Retailer not found.",
        },
        {
          status: 404,
        }
      ),
    };
  }

  return {
    mobile,
    retailer,
    response: null,
  };
}

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

    const auth = await getAuthenticatedRetailer(request);

    if (auth.response) {
      return auth.response;
    }

    const retailer = auth.retailer!;

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
      .eq("retailer_id", retailer.id)
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

    const auth = await getAuthenticatedRetailer(request);

    if (auth.response) {
      return auth.response;
    }

    const retailer = auth.retailer!;

    const { data, error } = await supabase
      .from("scheduled_orders")
      .update({
        is_active: false,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .eq("retailer_id", retailer.id)
      .select("id")
      .maybeSingle();

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
