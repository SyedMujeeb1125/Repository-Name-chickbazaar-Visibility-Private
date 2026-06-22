import { PDFDocument, StandardFonts } from "pdf-lib";
import { supabase } from "@/lib/supabase";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  const { id } = await params;

  const { data: payment } =
    await supabase
      .from("retailer_ledger")
      .select("*")
      .eq("id", id)
      .single();

  if (!payment) {
    return new Response(
      "Receipt not found",
      {
        status: 404,
      }
    );
  }

  const { data: retailer } =
    await supabase
      .from("retailers")
      .select("shop_name")
      .eq(
        "id",
        payment.retailer_id
      )
      .single();

  const pdfDoc =
    await PDFDocument.create();

  const page =
    pdfDoc.addPage([
      595,
      842,
    ]);

  const font =
    await pdfDoc.embedFont(
      StandardFonts.Helvetica
    );

  page.drawText(
    "CHICKBAZAAR",
    {
      x: 50,
      y: 790,
      size: 22,
      font,
    }
  );

  page.drawText(
    "FruitGlobe International Pvt Ltd",
    {
      x: 50,
      y: 765,
      size: 12,
      font,
    }
  );

  page.drawText(
    `Receipt No: ${payment.id}`,
    {
      x: 50,
      y: 720,
      size: 12,
      font,
    }
  );

  page.drawText(
    `Date: ${new Date(
      payment.created_at
    ).toLocaleDateString()}`,
    {
      x: 350,
      y: 720,
      size: 12,
      font,
    }
  );

  page.drawText(
    `Retailer: ${
      retailer?.shop_name ||
      "Retailer"
    }`,
    {
      x: 50,
      y: 680,
      size: 12,
      font,
    }
  );

  page.drawText(
    `Amount Received: Rs. ${payment.credit}`,
    {
      x: 50,
      y: 640,
      size: 14,
      font,
    }
  );

  page.drawText(
    `Payment Mode: ${
      payment.payment_mode ||
      "-"
    }`,
    {
      x: 50,
      y: 600,
      size: 12,
      font,
    }
  );

  page.drawText(
    `Reference No: ${
      payment.reference_number ||
      "-"
    }`,
    {
      x: 50,
      y: 570,
      size: 12,
      font,
    }
  );

  page.drawText(
    `Received By: ${
      payment.received_by ||
      "-"
    }`,
    {
      x: 50,
      y: 540,
      size: 12,
      font,
    }
  );

  page.drawText(
    `Remarks: ${
      payment.remarks || "-"
    }`,
    {
      x: 50,
      y: 500,
      size: 12,
      font,
    }
  );

  page.drawText(
    "Authorized Signatory",
    {
      x: 50,
      y: 400,
      size: 12,
      font,
    }
  );

  page.drawText(
    "ChickBazaar",
    {
      x: 50,
      y: 380,
      size: 12,
      font,
    }
  );

  const pdfBytes =
    await pdfDoc.save();

  return new Response(
    Buffer.from(pdfBytes),
    {
      headers: {
        "Content-Type":
          "application/pdf",

        "Content-Disposition":
          `attachment; filename=receipt-${payment.id}.pdf`,
      },
    }
  );
}