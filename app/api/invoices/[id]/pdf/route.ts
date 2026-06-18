import { PDFDocument, StandardFonts } from "pdf-lib";
import { getInvoices } from "@/lib/storage";

export async function GET(
  request: Request,
  { params }: {
    params: Promise<{ id: string }>
  }
) {
  const { id } = await params;

  const invoices = await getInvoices();

  const invoice = invoices.find(
    (i: any) => i.id === id
  );

  if (!invoice) {
    return new Response(
      "Invoice not found",
      { status: 404 }
    );
  }

  const pdfDoc =
    await PDFDocument.create();

  const page =
    pdfDoc.addPage([595, 842]);

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
    font
  }
);

page.drawText(
  "FruitGlobe International Pvt Ltd",
  {
    x: 50,
    y: 765,
    size: 12,
    font
  }
);

page.drawText(
  "----------------------------------------------------",
  {
    x: 50,
    y: 745,
    size: 10,
    font
  }
);

page.drawText(
  `Invoice No: ${invoice.invoice_number}`,
  {
    x: 50,
    y: 715,
    size: 12,
    font
  }
);

page.drawText(
  `Date: ${new Date(
    invoice.created_at
  ).toLocaleDateString()}`,
  {
    x: 350,
    y: 715,
    size: 12,
    font
  }
);

page.drawText(
  `Retailer: ${invoice.retailer_name}`,
  {
    x: 50,
    y: 680,
    size: 12,
    font
  }
);

page.drawText(
  `Order No: ${invoice.order_number}`,
  {
    x: 50,
    y: 650,
    size: 12,
    font
  }
);

page.drawText(
  "----------------------------------------------------",
  {
    x: 50,
    y: 625,
    size: 10,
    font
  }
);

page.drawText(
  `Actual Weight: ${invoice.actual_weight} Kg`,
  {
    x: 50,
    y: 590,
    size: 12,
    font
  }
);

page.drawText(
  `Rate Per Kg: INR ${invoice.rate_per_kg}`,
  {
    x: 50,
    y: 560,
    size: 12,
    font
  }
);

page.drawText(
  "----------------------------------------------------",
  {
    x: 50,
    y: 535,
    size: 10,
    font
  }
);

page.drawText(
  `TOTAL AMOUNT: INR ${invoice.amount}`,
  {
    x: 50,
    y: 500,
    size: 16,
    font
  }
);

page.drawText(
  "Authorized Signatory",
  {
    x: 50,
    y: 420,
    size: 12,
    font
  }
);

page.drawText(
  "ChickBazaar",
  {
    x: 50,
    y: 400,
    size: 12,
    font
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
        `attachment; filename=${invoice.invoice_number}.pdf`
    }
  }
);
}