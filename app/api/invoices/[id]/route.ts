import { NextResponse } from "next/server";
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
    return NextResponse.json(
      { message: "Invoice not found" },
      { status: 404 }
    );
  }

  const content = `
CHICKBAZAAR
FruitGlobe International Pvt Ltd

Invoice Number:
${invoice.invoice_number}

Retailer:
${invoice.retailer_name}

Order:
${invoice.order_number}

Amount:
₹${invoice.amount}

Date:
${new Date(
  invoice.created_at
).toLocaleDateString()}
`;

  return new NextResponse(
    content,
    {
      headers: {
        "Content-Type":
          "text/plain",
        "Content-Disposition":
          `attachment; filename=${invoice.invoice_number}.txt`
      }
    }
  );
}