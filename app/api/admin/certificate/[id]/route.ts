import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { readDb } from "@/lib/storage";
import { supabaseAdmin } from "@/lib/supabase";

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

  const certificatePath =
  retailer.gstCertificatePath;

if (!certificatePath) {
  return NextResponse.json(
    {
      message:
        "GST certificate not found"
    },
    { status: 404 }
  );
}

const { data, error } = await supabaseAdmin.storage
  .from("gst-certificates")
  .download(certificatePath);

if (error || !data) {
  return NextResponse.json(
    { message: "GST certificate could not be downloaded." },
    { status: 404 }
  );
}

const bytes = await data.arrayBuffer();
const fileName = certificatePath.split("/").pop() || "gst-certificate";

  return new NextResponse(bytes, {
    headers: {
      "Content-Type": data.type || "application/octet-stream",
      "Content-Disposition": `attachment; filename="${fileName}"`
    }
  });
}
