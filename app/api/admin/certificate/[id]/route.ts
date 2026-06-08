import { readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { readDb } from "@/lib/storage";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;
  const db = await readDb();
  const retailer = db.retailers.find((item) => item.id === id);

  if (!retailer) {
    return NextResponse.json({ message: "Retailer not found." }, { status: 404 });
  }

  const bytes = await readFile(retailer.gstCertificatePath);
  const fileName = path.basename(retailer.gstCertificatePath);

  return new NextResponse(bytes, {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="${fileName}"`
    }
  });
}
