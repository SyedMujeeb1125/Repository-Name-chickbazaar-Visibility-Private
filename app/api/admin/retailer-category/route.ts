import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { updateRetailerCategory } from "@/lib/storage";

export async function POST(
  request: Request
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const formData: any =
  await request.formData();

  const retailerId = String(
    formData.get("retailerId") || ""
  );

  const category = String(
    formData.get("category") || ""
  ) as
    | "new"
    | "trusted"
    | "premium";

  const ok =
    await updateRetailerCategory(
      retailerId,
      category
    );

  return NextResponse.json({
    success: ok,
  });
}