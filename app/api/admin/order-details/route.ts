import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { updateOrderDetails } from "@/lib/storage";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json(
      { message: "Unauthorized." },
      { status: 401 }
    );
  }

  const formData = await request.formData();

  const id = String(formData.get("id") || "");

  const paymentStatus = String(
    formData.get("paymentStatus") || ""
  );

  const assignedFarm = String(
    formData.get("assignedFarm") || ""
  );

  const trackingNotes = String(
    formData.get("trackingNotes") || ""
  );

  if (!id) {
    return NextResponse.json(
      { message: "Order ID required." },
      { status: 400 }
    );
  }

  const paymentType = String(
  formData.get("paymentType") || ""
);

const ratePerKg = Number(
  formData.get("ratePerKg") || 0
);

const actualWeight = Number(
  formData.get("actualWeight") || 0
);

const finalAmount = Number(
  formData.get("finalAmount") || 0
);

const ok = await updateOrderDetails(id, {
  paymentStatus,
  assignedFarm,
  trackingNotes,

  paymentType,
  ratePerKg,
  actualWeight,
  finalAmount
});

  if (!ok) {
    return NextResponse.json(
      { message: "Unable to update order." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    message: "Order updated."
  });
}