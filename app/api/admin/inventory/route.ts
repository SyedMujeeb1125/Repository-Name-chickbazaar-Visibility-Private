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

    const inventoryDate = String(
      formData.get("inventoryDate") ?? ""
    ).trim();

    const weightCategory = String(
      formData.get("weightCategory") ?? ""
    ).trim();

    const birdCount = Number(
      formData.get("birdCount") ?? 0
    );

    const procurementPrice = Number(
      formData.get("procurementPrice") ?? 0
    );

    if (
      !farmId ||
      !inventoryDate ||
      !weightCategory ||
      birdCount <= 0 ||
      procurementPrice < 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid inventory data.",
        },
        {
          status: 400,
        }
      );
    }

    const {
      data: existing,
      error: fetchError,
    } = await supabaseAdmin
      .from("farm_inventory")
      .select(
        "id, bird_count"
      )
      .eq("farm_id", farmId)
      .eq(
        "inventory_date",
        inventoryDate
      )
      .eq(
        "weight_category",
        weightCategory
      )
      .maybeSingle();

    if (fetchError) {
      console.error(
        "[FARM_INVENTORY][FETCH]",
        fetchError
      );

      return NextResponse.json(
        {
          success: false,
          message:
            fetchError.message,
        },
        {
          status: 500,
        }
      );
    }

    if (existing) {
      const {
        data,
        error: updateError,
      } = await supabaseAdmin
        .from("farm_inventory")
        .update({
          bird_count:
            Number(
              existing.bird_count ?? 0
            ) + birdCount,
          procurement_price:
            procurementPrice,
        })
        .eq("id", existing.id)
        .select()
        .maybeSingle();

      if (updateError) {
        console.error(
          "[FARM_INVENTORY][UPDATE]",
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

      return NextResponse.json({
        success: true,
        message:
          "Inventory updated successfully.",
        data,
      });
    }

    const {
      data,
      error: insertError,
    } = await supabaseAdmin
      .from("farm_inventory")
      .insert({
        farm_id: farmId,
        inventory_date:
          inventoryDate,
        weight_category:
          weightCategory,
        bird_count: birdCount,
        procurement_price:
          procurementPrice,
      })
      .select()
      .maybeSingle();

    if (insertError) {
      console.error(
        "[FARM_INVENTORY][INSERT]",
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

    return NextResponse.json({
      success: true,
      message:
        "Inventory created successfully.",
      data,
    });
  } catch (error) {
    console.error(
      "[FARM_INVENTORY]",
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