import { NextResponse } from "next/server";
import { recordRetailerPayment } from "@/lib/storage";

export async function POST(
  req: Request
) {
  try {
    const formData: any =
  await req.formData();

    const retailer_id = String(
      formData.get("retailer_id") || ""
    );

    const amount = Number(
      formData.get("amount") || 0
    );

    const remarks = String(
      formData.get("remarks") || ""
    );

    const payment_mode = String(
  formData.get("payment_mode") || ""
);

const reference_number = String(
  formData.get("reference_number") || ""
);

const received_by = String(
  formData.get("received_by") || ""
);

    if (
      !retailer_id ||
      amount <= 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid payment details",
        },
        {
          status: 400,
        }
      );
    }

    await recordRetailerPayment({
  retailer_id,
  amount,
  remarks,
  payment_mode,
  reference_number,
  received_by,
});

    return NextResponse.redirect(
      new URL(
        "/admin/collections",
        req.url
      )
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}