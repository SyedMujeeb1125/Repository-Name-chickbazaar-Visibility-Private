import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {

  try {

    const body = await request.json();

    const {
      mobile,
      weight,
    } = body;

    if (!mobile || !weight) {

      return NextResponse.json(
        {
          message: "Missing required fields.",
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
      .select("*")
      .eq("mobile", mobile)
      .single();

    if (retailerError || !retailer) {

      return NextResponse.json(
        {
          message: "Retailer not found.",
        },
        {
          status: 404,
        }
      );

    }

    const {
      data: rate,
    } = await supabase
      .from("daily_rates")
      .select("rate")
      .order("created_at", {
        ascending: false,
      })
      .limit(1)
      .single();

    const todayRate =
      Number(rate?.rate || 0);

    const estimatedAmount =
      todayRate * Number(weight);

    const orderNumber =
      `CB-${new Date().getFullYear()}-${Date.now().toString().slice(-6)}`;

    const {
      data,
      error,
    } = await supabase
      .from("orders")
      .insert({

  id: `order_${Date.now()}_${Math.random()
    .toString(36)
    .substring(2, 10)}`,

  order_number: orderNumber,

  created_at: new Date().toISOString(),

  status: "new",

  shop_name: retailer.shop_name,

  owner_name: retailer.owner_name,

  mobile: retailer.mobile,

  email: retailer.email,

  address: retailer.address,

  birds: "0",

  average_weight: "",

  delivery_date: new Date().toISOString().split("T")[0],

  notes: "",

  payment_status: "pending",

  payment_amount: 0,

  requested_weight: Number(weight),

  rate_per_kg: todayRate,

  estimated_amount: estimatedAmount,

  payment_type: "advance",

})
      .select()
      .single();

    if (error) {

      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );

    }

    return NextResponse.json({

      success: true,

      order: data,

    });

  } catch (error) {

    return NextResponse.json(
      {
        message: "Something went wrong.",
      },
      {
        status: 500,
      }
    );

  }

}