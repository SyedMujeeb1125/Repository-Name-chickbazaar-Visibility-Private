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
  ledgerDebitExists
} from "@/lib/storage";
import type {
  OrderStatus,
  PartnerStatus
} from "@/lib/types";

const collections = ["orders", "retailers", "farmPartners"] as const;
const statuses = [
  "new",
  "confirmed",
  "procured",
  "dispatched",
  "delivered",
  "completed",
  "cancelled",
  "approved",
  "blocked",
  "rejected"
];

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const formData = await request.formData();
  const collection = String(formData.get("collection") || "") as (typeof collections)[number];
  const id = String(formData.get("id") || "");
  const status = String(
  formData.get("status") || ""
) as
  | OrderStatus
  | PartnerStatus;

  if (!collections.includes(collection) || !id || !statuses.includes(
  status as any
)) {
    return NextResponse.json({ message: "Invalid status update." }, { status: 400 });
  }

  const ok = await updateRecordStatus(collection, id, status);
  if (ok && collection === "orders") {
  console.log(
    "History Insert:",
    id,
    status
  );

  await addOrderStatusHistory(
    id,
    status,
    "Status updated by admin"
  );

  console.log(
    "History Insert Complete"
  );
}
  if (
  ok &&
  collection === "orders" &&
  status === "completed"
) {
  const db = await readDb();

  const order = db.orders.find(
    (o: any) => o.id === id
  );

  const retailer =
    db.retailers.find(
      (r: any) =>
        r.mobile ===
        order?.mobile
    );

    console.log("ORDER", order);
    console.log("RETAILER", retailer);
    console.log("FINAL AMOUNT", order?.finalAmount);

  if (
    order &&
    retailer &&
    order.finalAmount
  )
  
     
  {
    console.log("ENTERED INVOICE BLOCK");
    try {
  await createInvoice({
    invoiceNumber:
      generateInvoiceNumber(),

    orderId: order.id,

    retailerId: retailer.id,

    retailerName:
      retailer.shopName,

    orderNumber:
      order.orderNumber || order.id,

    actualWeight:
      Number(order.actualWeight || 0),

    ratePerKg:
      Number(order.ratePerKg || 0),

    amount:
      Number(order.finalAmount || 0),

    remarks:
      "Auto generated on completion"
  });

  console.log("INVOICE CREATED");
} catch (error) {
  console.error(
    "INVOICE ERROR",
    error
  );
}
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

  console.log("LEDGER CREATED");
} catch (error) {
  console.error(
    "LEDGER ERROR",
    error
  );
};
  }
}
  if (!ok) {
    return NextResponse.json({ message: "Record not found." }, { status: 404 });
    
  }

  

  return NextResponse.json({ message: "Status updated." });
}
