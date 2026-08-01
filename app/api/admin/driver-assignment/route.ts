import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { isAdminAuthenticated } from "@/lib/auth";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized.",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const form = await request.formData();

    const orderId = String(
      form.get("orderId") ?? ""
    ).trim();

    const vehicleId = String(
      form.get("vehicleId") ?? ""
    ).trim();

    if (!orderId || !vehicleId) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Order and vehicle are required.",
        },
        {
          status: 400,
        }
      );
    }

    const {
      data: vehicle,
      error: vehicleError,
    } = await supabaseAdmin
      .from("vehicles")
      .select(
        "assigned_driver, vehicle_number"
      )
      .eq("id", vehicleId)
      .maybeSingle();

    if (vehicleError) {
      console.error(
        "[DRIVER_ASSIGNMENT][VEHICLE]",
        vehicleError
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Failed to fetch vehicle.",
        },
        {
          status: 500,
        }
      );
    }

    if (!vehicle) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Vehicle not found.",
        },
        {
          status: 404,
        }
      );
    }

    const {
      error: updateError,
    } = await supabaseAdmin
      .from("orders")
      .update({
        assigned_driver:
          vehicle.assigned_driver,
        assigned_vehicle:
          vehicle.vehicle_number,
        status: "allocated",
      })
      .eq("id", orderId);

    if (updateError) {
      console.error(
        "[DRIVER_ASSIGNMENT][ORDER]",
        updateError
      );

      return NextResponse.json(
        {
          success: false,
          message:
            updateError.message,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.redirect(
      new URL(
        "/admin/driver-assignment",
        request.url
      ),
      303
    );
  } catch (error) {
    console.error(
      "[DRIVER_ASSIGNMENT]",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Internal server error.",
      },
      {
        status: 500,
      }
    );
  }
}