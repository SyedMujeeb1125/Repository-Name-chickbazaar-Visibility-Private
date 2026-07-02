import { NextResponse } from "next/server";
import { getTodayRate } from "@/lib/rate-service";
import type { OrderRecord } from "@/lib/types";
import { getOrderPolicy } from "@/lib/order-policy";
import { supabase } from "@/lib/supabase";
import { allocateOrder } from "@/lib/allocation-service";
import {
  addOrder,
  createId,
} from "@/lib/storage";

function value(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

export async function POST(request: Request) {
  console.log("========== NEW ORDER ==========");

  const formData = await request.formData();

  console.log(
    "Form Data:",
    Object.fromEntries(formData.entries())
  );

  const orderBy =
  (formData.get("orderBy") === "birds"
    ? "birds"
    : "weight") as "weight" | "birds";

  if (
    orderBy === "weight" &&
    !value(formData, "requestedWeight")
  ) {
    return NextResponse.json(
      {
        message: "Requested Weight is required.",
      },
      { status: 400 }
    );
  }

  if (
    orderBy === "birds" &&
    !value(formData, "birds")
  ) {
    return NextResponse.json(
      {
        message: "Bird count is required.",
      },
      { status: 400 }
    );
  }

  const required = [
    "shopName",
    "ownerName",
    "mobile",
    "email",
    "address",
    "deliveryDate",
  ];

  for (const key of required) {
    if (!value(formData, key)) {
      return NextResponse.json(
        {
          message: `${key} is required.`,
        },
        { status: 400 }
      );
    }
  }

  const latitude = Number(
    formData.get("latitude") || 0
  );

  const longitude = Number(
    formData.get("longitude") || 0
  );

  const mobile = value(
    formData,
    "mobile"
  );

  console.log(
    "Mobile from form:",
    mobile
  );

  const { data: retailer, error } =
    await supabase
      .from("retailers")
      .select("*")
      .eq("mobile", mobile)
      .maybeSingle();

  console.log(
    "Retailer:",
    retailer
  );

  console.log(
    "Error:",
    error
  );

  if (!retailer) {
    return NextResponse.json(
      {
        message: "Retailer not found.",
        error,
      },
      { status: 404 }
    );
  }

  const policy =
    await getOrderPolicy(
      retailer
    );

  if (!policy.allowed) {
    return NextResponse.json(
      {
        message: policy.message,
      },
      { status: 400 }
    );
  }

  const zone =
    retailer.zone ||
    "central";

  const allocation =
    await allocateOrder({
      latitude,
      longitude,
      zone,
    });

  const requestedWeight = Number(
    formData.get(
      "requestedWeight"
    ) || 0
  );

  const birds = Number(
    formData.get("birds") || 0
  );

  const averageWeight = Number(
    formData.get(
      "averageWeight"
    ) || 0
  );

  const todayRate =
    await getTodayRate();

  const ratePerKg = Number(
    todayRate?.rate || 0
  );

  const estimatedWeight =
    orderBy === "weight"
      ? requestedWeight
      : birds *
        averageWeight;

  const estimatedAmount =
    estimatedWeight *
    ratePerKg;

  const advancePercentage = 0;

  const advanceRequired =
    policy.bookingAmount;

  const order: OrderRecord = {
    id: createId("order"),

    orderNumber: `CB-${new Date()
      .getFullYear()}-${Date.now()
      .toString()
      .slice(-6)}`,

    createdAt:
      new Date().toISOString(),

    status: "new",

    orderBy,

    zone,

    assignedDriver:
      allocation.assignedDriver,

    assignedVehicle:
      allocation.assignedVehicle,

    assignedFarm:
      allocation.assignedFarm,

    paymentStatus:
      "pending",

    paymentAmount: 0,

    paymentType:
      value(
        formData,
        "paymentType"
      ) as
        | "advance"
        | "actual_weight",

    requestedWeight,

    birds:
      orderBy === "birds"
        ? birds
        : 0,

    averageWeight,

    ratePerKg,

    estimatedAmount,

    advancePercentage,

    advanceRequired,

    trackingNotes: "",

    latitude,

    longitude,

    shopName: value(
      formData,
      "shopName"
    ),

    ownerName: value(
      formData,
      "ownerName"
    ),

    mobile: value(
      formData,
      "mobile"
    ),

    email: value(
      formData,
      "email"
    ),

    address: value(
      formData,
      "address"
    ),

    deliveryDate: value(
      formData,
      "deliveryDate"
    ),

    notes: value(
      formData,
      "notes"
    ),
  };

  await addOrder(order);

  return NextResponse.json({
    success: true,
    id: order.id,
    orderNumber:
      order.orderNumber,
    advanceRequired:
      order.advanceRequired,
    estimatedAmount:
      order.estimatedAmount,
  });
}