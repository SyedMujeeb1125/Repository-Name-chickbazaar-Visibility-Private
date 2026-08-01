import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

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
    const formData = await request.formData();

    const id = String(
      formData.get("id") ?? ""
    ).trim();

    const paymentStatus = String(
      formData.get("paymentStatus") ?? ""
    ).trim();

    const assignedFarm = String(
      formData.get("assignedFarm") ?? ""
    ).trim();

    const trackingNotes = String(
      formData.get("trackingNotes") ?? ""
    ).trim();

    const paymentType = String(
      formData.get("paymentType") ?? ""
    ).trim();

    const ratePerKg = Number(
      formData.get("ratePerKg") ?? 0
    );

    const actualWeight = Number(
      formData.get("actualWeight") ?? 0
    );

    const finalAmount = Number(
      formData.get("finalAmount") ?? 0
    );

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Order ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    const { error } = await supabaseAdmin
      .from("orders")
      .update({
        payment_status: paymentStatus || null,
        assigned_farm: assignedFarm || null,
        tracking_notes: trackingNotes || null,
        payment_type: paymentType || null,
        rate_per_kg: ratePerKg || null,
        actual_weight: actualWeight || null,
        final_amount: finalAmount || null,
      })
      .eq("id", id);

    if (error) {
      console.error(
        "[UPDATE_ORDER]",
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

    return NextResponse.json({
      success: true,
      message: "Order updated successfully.",
    });
  } catch (error) {
    console.error(
      "[UPDATE_ORDER]",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error.",
      },
      {
        status: 500,
      }
    );
  }
}