import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import {
  updateRecordStatus,
  addLedgerEntry,
  readDb,
  addOrderStatusHistory,
  createInvoice,
  generateInvoiceNumber,
  invoiceExists,
  ledgerDebitExists,
} from "@/lib/storage";
import type {
  OrderStatus,
  PartnerStatus,
} from "@/lib/types";

const collections = [
  "orders",
  "retailers",
  "farmPartners",
] as const;

const statuses = [
  "new",
  "confirmed",
  "allocated",
  "preparing",
  "vehicle_assigned",
  "out_for_delivery",
  "delivered",
  "cancelled",
  "approved",
  "blocked",
  "rejected",
];

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json(
      { message: "Unauthorized." },
      { status: 401 }
    );
  }

  const formData: any = await request.formData();

  const collection = String(
    formData.get("collection") || ""
  ) as (typeof collections)[number];

  const id = String(formData.get("id") || "");

  const status = String(
    formData.get("status") || ""
  ) as OrderStatus | PartnerStatus;

  if (
    !collections.includes(collection) ||
    !id ||
    !statuses.includes(status as any)
  ) {
    return NextResponse.json(
      { message: "Invalid status update." },
      { status: 400 }
    );
  }

  const ok = await updateRecordStatus(
    collection,
    id,
    status
  );

  if (!ok) {
    return NextResponse.json(
      { message: "Record not found." },
      { status: 404 }
    );
  }

  // -----------------------------------------
  // Order Status History
  // -----------------------------------------

  if (collection === "orders") {
    await addOrderStatusHistory(
      id,
      status,
      "Status updated by admin"
    );
  }

  // -----------------------------------------
  // Auto Invoice + Ledger on Delivery
  // -----------------------------------------

  if (
    collection === "orders" &&
    status === "delivered"
  ) {
    const db = await readDb();

    const order = db.orders.find(
      (o: any) => o.id === id
    );

    const retailer = db.retailers.find(
      (r: any) => r.mobile === order?.mobile
    );

    if (
      order &&
      retailer &&
      Number(order.finalAmount || 0) > 0
    ) {
      // Invoice

      const hasInvoice =
        await invoiceExists(order.id);

      if (!hasInvoice) {
        try {
          await createInvoice({
            invoiceNumber:
              generateInvoiceNumber(),

            orderId: order.id,

            retailerId: retailer.id,

            retailerName:
              retailer.shopName,

            orderNumber:
              order.orderNumber ||
              order.id,

            actualWeight: Number(
              order.actualWeight || 0
            ),

            ratePerKg: Number(
              order.ratePerKg || 0
            ),

            amount: Number(
              order.finalAmount || 0
            ),

            remarks:
              "Auto generated on delivery",
          });
        } catch (error) {
          console.error(
            "INVOICE ERROR",
            error
          );
        }
      }

      // Ledger

      const hasDebit =
        await ledgerDebitExists(order.id);

      if (!hasDebit) {
        try {
          await addLedgerEntry(
            retailer.id,
            order.id,
            Number(order.finalAmount),
            0,
            `Order ${
              order.orderNumber ||
              order.id
            }`
          );
        } catch (error) {
          console.error(
            "LEDGER ERROR",
            error
          );
        }
      }
    }
  }

  return NextResponse.json({
    message: "Status updated.",
  });
}