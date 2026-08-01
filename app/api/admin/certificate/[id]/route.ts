import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(
  _request: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
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
    const { id } = await params;

    const {
      data: retailer,
      error: retailerError,
    } = await supabaseAdmin
      .from("retailers")
      .select("gst_certificate_path")
      .eq("id", id)
      .maybeSingle();

    if (retailerError) {
      console.error(
        "[DOWNLOAD_GST][RETAILER]",
        retailerError
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Failed to fetch retailer.",
        },
        {
          status: 500,
        }
      );
    }

    if (!retailer) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Retailer not found.",
        },
        {
          status: 404,
        }
      );
    }

    const certificatePath =
      retailer.gst_certificate_path;

    if (!certificatePath) {
      return NextResponse.json(
        {
          success: false,
          message:
            "GST certificate not found.",
        },
        {
          status: 404,
        }
      );
    }

    const {
      data: file,
      error: downloadError,
    } = await supabaseAdmin.storage
      .from("gst-certificates")
      .download(
        certificatePath
      );

    if (
      downloadError ||
      !file
    ) {
      console.error(
        "[DOWNLOAD_GST][STORAGE]",
        downloadError
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "GST certificate could not be downloaded.",
        },
        {
          status: 404,
        }
      );
    }

    const bytes =
      await file.arrayBuffer();

    const fileName =
      certificatePath
        .split("/")
        .pop() ??
      "gst-certificate";

    return new NextResponse(
      bytes,
      {
        headers: {
          "Content-Type":
            file.type ||
            "application/octet-stream",
          "Content-Disposition": `attachment; filename="${fileName}"`,
        },
      }
    );
  } catch (error) {
    console.error(
      "[DOWNLOAD_GST]",
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