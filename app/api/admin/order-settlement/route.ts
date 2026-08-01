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

    const orderId = String(
      formData.get("orderId") ?? ""
    ).trim();

    const actualWeight = Number(
      formData.get("actualWeight") ?? 0
    );

    const ratePerKg = Number(
      formData.get("ratePerKg") ?? 0
    );

    if (!orderId) {
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

    if (actualWeight <= 0 || ratePerKg <= 0) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Actual weight and rate per kg must be greater than zero.",
        },
        {
          status: 400,
        }
      );
    }

    const finalAmount =
      actualWeight * ratePerKg;

    const {
      data: order,
      error: orderError,
    } = await supabaseAdmin
      .from("orders")
      .select(
        "payment_amount, mobile, order_number"
      )
      .eq("id", orderId)
      .maybeSingle();

    if (orderError) {
      console.error(
        "[SETTLEMENT][ORDER]",
        orderError
      );

      return NextResponse.json(
        {
          success: false,
          message:
            orderError.message,
        },
        {
          status: 500,
        }
      );
    }

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message: "Order not found.",
        },
        {
          status: 404,
        }
      );
    }

    const advancePaid = Number(
      order.payment_amount ?? 0
    );

    const outstandingAmount =
      finalAmount - advancePaid;

    const {
      data: retailer,
      error: retailerError,
    } = await supabaseAdmin
      .from("retailers")
      .select(
        "id, available_credit"
      )
      .eq(
        "mobile",
        order.mobile
      )
      .maybeSingle();

    if (retailerError) {
      console.error(
        "[SETTLEMENT][RETAILER]",
        retailerError
      );

      return NextResponse.json(
        {
          success: false,
          message:
            retailerError.message,
        },
        {
          status: 500,
        }
      );
    }

    const {
      error: updateError,
    } = await supabaseAdmin
      .from("orders")
      .update({
        actual_weight:
          actualWeight,
        rate_per_kg:
          ratePerKg,
        final_amount:
          finalAmount,
        outstanding_amount:
          outstandingAmount,
      })
      .eq("id", orderId);

    if (updateError) {
      console.error(
        "[SETTLEMENT][UPDATE_ORDER]",
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

    if (retailer) {
      const {
        error: ledgerError,
      } = await supabaseAdmin
        .from("retailer_ledger")
        .insert({
          retailer_id:
            retailer.id,
          order_id:
            orderId,
          debit:
            finalAmount,
          credit: 0,
          remarks: `Settlement - ${order.order_number}`,
          created_at:
            new Date().toISOString(),
        });

      if (ledgerError) {
        console.error(
          "[SETTLEMENT][LEDGER]",
          ledgerError
        );
      }
    }

    const {
      data: existingInvoice,
      error: invoiceLookupError,
    } = await supabaseAdmin
      .from("invoices")
      .select("id")
      .eq("order_id", orderId)
      .maybeSingle();

    if (invoiceLookupError) {
      console.error(
        "[SETTLEMENT][INVOICE_LOOKUP]",
        invoiceLookupError
      );

      return NextResponse.json(
        {
          success: false,
          message:
            invoiceLookupError.message,
        },
        {
          status: 500,
        }
      );
    }

    if (!existingInvoice) {
      const invoiceNumber =
        `CB-INV-${Date.now()}`;

      const {
        error: invoiceError,
      } = await supabaseAdmin
        .from("invoices")
        .insert({
          invoice_number:
            invoiceNumber,
          order_id:
            orderId,
          retailer_id:
            retailer?.id ??
            null,
          retailer_name:
            order.mobile,
          order_number:
            order.order_number,
          amount:
            finalAmount,
          actual_weight:
            actualWeight,
          rate_per_kg:
            ratePerKg,
          status:
            "unpaid",
          remarks: `Invoice generated for ${order.order_number}`,
        });

      if (invoiceError) {
        console.error(
          "[SETTLEMENT][INVOICE]",
          invoiceError
        );

        return NextResponse.json(
          {
            success: false,
            message:
              invoiceError.message,
          },
          {
            status: 500,
          }
        );
      }
    }

    // -------- CONTINUES IN PART 2 --------
        if (retailer) {
      const {
        data: retailerInfo,
        error: retailerInfoError,
      } = await supabaseAdmin
        .from("retailers")
        .select("available_credit")
        .eq("id", retailer.id)
        .maybeSingle();

      if (retailerInfoError) {
        console.error(
          "[SETTLEMENT][RETAILER_CREDIT]",
          retailerInfoError
        );

        return NextResponse.json(
          {
            success: false,
            message:
              retailerInfoError.message,
          },
          {
            status: 500,
          }
        );
      }

      const currentCredit =
        Number(
          retailerInfo?.available_credit ??
            0
        );

      const {
        error: creditUpdateError,
      } = await supabaseAdmin
        .from("retailers")
        .update({
          available_credit:
            Math.max(
              0,
              currentCredit -
                outstandingAmount
            ),
        })
        .eq(
          "id",
          retailer.id
        );

      if (creditUpdateError) {
        console.error(
          "[SETTLEMENT][UPDATE_CREDIT]",
          creditUpdateError
        );

        return NextResponse.json(
          {
            success: false,
            message:
              creditUpdateError.message,
          },
          {
            status: 500,
          }
        );
      }
    }

    // INVENTORY DEDUCTION

    const {
      data: orderData,
      error: inventoryOrderError,
    } = await supabaseAdmin
      .from("orders")
      .select(
        "assigned_farm,birds,average_weight"
      )
      .eq("id", orderId)
      .maybeSingle();

    if (inventoryOrderError) {
      console.error(
        "[SETTLEMENT][ORDER_INVENTORY]",
        inventoryOrderError
      );
    }

    if (
      orderData?.assigned_farm &&
      Number(orderData.birds) > 0
    ) {
      const {
        data: farm,
        error: farmError,
      } = await supabaseAdmin
        .from("farm_partners")
        .select("id")
        .eq(
          "farm_name",
          orderData.assigned_farm
        )
        .maybeSingle();

      if (farmError) {
        console.error(
          "[SETTLEMENT][FARM]",
          farmError
        );
      }

      if (farm) {
        const {
          data: inventory,
          error: inventoryError,
        } = await supabaseAdmin
          .from("farm_inventory")
          .select(
            "id,bird_count"
          )
          .eq(
            "farm_id",
            farm.id
          )
          .eq(
            "weight_category",
            orderData.average_weight
          )
          .maybeSingle();

        if (inventoryError) {
          console.error(
            "[SETTLEMENT][INVENTORY]",
            inventoryError
          );
        }

        if (inventory) {
          const currentBirds =
            Number(
              inventory.bird_count ??
                0
            );

          const birdsUsed =
            Number(
              orderData.birds
            );

          if (
            currentBirds >=
            birdsUsed
          ) {
            const {
              error:
                inventoryUpdateError,
            } =
              await supabaseAdmin
                .from(
                  "farm_inventory"
                )
                .update({
                  bird_count:
                    currentBirds -
                    birdsUsed,
                })
                .eq(
                  "id",
                  inventory.id
                );

            if (
              inventoryUpdateError
            ) {
              console.error(
                "[SETTLEMENT][INVENTORY_UPDATE]",
                inventoryUpdateError
              );
            }
          } else {
            console.error(
              "[SETTLEMENT] Insufficient inventory for farm:",
              farm.id
            );
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      finalAmount,
      outstandingAmount,
      message:
        "Settlement completed successfully.",
    });
  } catch (error) {
    console.error(
      "[SETTLEMENT]",
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