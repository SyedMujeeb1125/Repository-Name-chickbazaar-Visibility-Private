import { NextResponse } from "next/server";

import { getLoggedInRetailerMobile } from "@/lib/retailer";
import { supabase } from "@/lib/supabase";

import {
  createRepeatOrder,
  getRepeatOrders,
} from "@/lib/planning/repeat-orders";

export async function GET() {
  try {
    const mobile =
      await getLoggedInRetailerMobile();

    if (!mobile) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { data: retailer } =
      await supabase
        .from("retailers")
        .select("id")
        .eq("mobile", mobile)
        .single();

    if (!retailer) {
      return NextResponse.json(
        { message: "Retailer not found." },
        { status: 404 }
      );
    }

    const orders =
      await getRepeatOrders(retailer.id);

    return NextResponse.json(orders);

  } catch (error) {

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Unable to load repeat orders.",
      },
      {
        status: 500,
      }
    );

  }
}

export async function POST(
  request: Request
) {
  try {

    const mobile =
      await getLoggedInRetailerMobile();

    if (!mobile) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { data: retailer } =
      await supabase
        .from("retailers")
        .select("id")
        .eq("mobile", mobile)
        .single();

    if (!retailer) {
      return NextResponse.json(
        { message: "Retailer not found." },
        { status: 404 }
      );
    }

    const body =
      await request.json();

    const order =
      await createRepeatOrder({
        ...body,
        retailerId: retailer.id,
      });

    return NextResponse.json(
      order,
      {
        status: 201,
      }
    );

  } catch (error) {

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Unable to create repeat order.",
      },
      {
        status: 500,
      }
    );

  }
}