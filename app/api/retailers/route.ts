import { NextResponse } from "next/server";
import { addRetailer, createId, saveUploadedFile } from "@/lib/storage";
import type { RetailerRecord } from "@/lib/types";

function value(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const certificate = formData.get("gstCertificate");
  const required = ["shopName", "ownerName", "mobile", "email", "address", "gst", "password", "confirmPassword"];

  for (const key of required) {
    if (!value(formData, key)) {
      return NextResponse.json({ message: `${key} is required.` }, { status: 400 });
    }
  }

  if (value(formData, "password") !== value(formData, "confirmPassword")) {
    return NextResponse.json({ message: "Passwords do not match." }, { status: 400 });
  }

  if (!(certificate instanceof File) || certificate.size === 0) {
    return NextResponse.json({ message: "GST certificate is required." }, { status: 400 });
  }

  const retailer: RetailerRecord = {
    id: createId("retailer"),
    createdAt: new Date().toISOString(),
    status: "new",
    shopName: value(formData, "shopName"),
    ownerName: value(formData, "ownerName"),
    mobile: value(formData, "mobile"),
    email: value(formData, "email"),
    address: value(formData, "address"),
    gst: value(formData, "gst").toUpperCase(),
    gstCertificatePath: await saveUploadedFile(certificate, "gst")
  };

  await addRetailer(retailer);
  return NextResponse.json({ message: "Retailer registration saved.", id: retailer.id });
}
