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

    const farmId = String(
      formData.get("farmId") ?? ""
    ).trim();

    const farmName = String(
      formData.get("farmName") ?? ""
    ).trim();

    const weightCategory = String(
      formData.get("weightCategory") ?? ""
    ).trim();

    const allocatedBirds = Number(
      formData.get("allocatedBirds") ?? 0
    );

    const orderId =
      String(
        formData.get("orderId") ?? ""
      ).trim() || null;

    const allocationDate =
      String(
        formData.get("allocationDate") ?? ""
      ).trim() ||
      new Date()
        .toISOString()
        .slice(0, 10);

    if (
      !farmId ||
      !farmName ||
      !weightCategory ||
      !Number.isInteger(
        allocatedBirds
      ) ||
      allocatedBirds <= 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Farm, weight category, and a positive whole bird count are required.",
        },
        {
          status: 400,
        }
      );
    }

    const {
      data,
      error,
    } = await supabaseAdmin.rpc(
      "reserve_farm_inventory",
      {
        p_farm_id: farmId,
        p_farm_name: farmName,
        p_weight_category:
          weightCategory,
        p_allocated_birds:
          allocatedBirds,
        p_order_id: orderId,
        p_allocation_date:
          allocationDate,
      }
    );

    if (error) {
      console.error(
        "[RESERVE_FARM_INVENTORY]",
        error
      );

      const conflict =
        error.message.includes(
          "Insufficient"
        ) ||
        error.message.includes(
          "not found"
        );

      return NextResponse.json(
        {
          success: false,
          message:
            error.message,
        },
        {
          status: conflict
            ? 409
            : 500,
        }
      );
    }

    return NextResponse.json({
      success: true,
      allocationId: data,
      message:
        "Inventory reserved and allocation created.",
    });
  } catch (error) {
    console.error(
      "[RESERVE_FARM_INVENTORY]",
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