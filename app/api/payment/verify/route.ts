import crypto from "crypto";
import { NextResponse } from "next/server";
import {
  updateOrderDetails,
  createInvoice,
  generateInvoiceNumber,
  readDb,
  invoiceExists,
} from "@/lib/storage";
import { config } from "@/lib/config";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      orderId,
      paymentAmount,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = body;

    // ============================================
    // DEVELOPMENT MODE (No Razorpay Required)
    // ============================================

    if (config.bypassPayments) {
      if (orderId) {
        await updateOrderDetails(orderId, {
          paymentStatus: "paid",
          paymentAmount: Number(paymentAmount || 0),
          razorpayOrderId: "DEV_ORDER",
          razorpayPaymentId: "DEV_PAYMENT",
        });

        const db = await readDb();

        const order = db.orders.find(
          (o: any) => o.id === orderId
        );

        const retailer = db.retailers.find(
          (r: any) => r.mobile === order?.mobile
        );

        if (order && retailer) {
          const alreadyExists =
            await invoiceExists(order.id);

          if (!alreadyExists) {
            await createInvoice({
              invoiceNumber:
                generateInvoiceNumber(),

              orderId: order.id,

              retailerId:
                retailer.id || "",

              retailerName:
                retailer.shopName || "",

              orderNumber:
                order.orderNumber || order.id,

              actualWeight:
                order.requestedWeight || 0,

              ratePerKg:
                order.ratePerKg || 0,

              amount:
                Number(paymentAmount || 0),

              remarks:
                "Development Payment",
            });
          }
        }
      }

      return NextResponse.json({
        verified: true,
        development: true,
        paymentId: "DEV_PAYMENT",
        message:
          "Development payment bypass successful",
      });
    }

    // ============================================
    // REAL RAZORPAY VERIFICATION
    // ============================================

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return NextResponse.json(
        {
          message: "Missing payment details",
        },
        {
          status: 400,
        }
      );
    }

    const secret =
      process.env.RAZORPAY_KEY_SECRET;

    if (!secret) {
      return NextResponse.json(
        {
          message:
            "Razorpay secret missing",
        },
        {
          status: 500,
        }
      );
    }

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(
        `${razorpay_order_id}|${razorpay_payment_id}`
      )
      .digest("hex");

    const verified =
      expectedSignature ===
      razorpay_signature;

    if (verified && orderId) {
      await updateOrderDetails(orderId, {
        paymentStatus: "paid",

        paymentAmount:
          Number(paymentAmount || 0),

        razorpayOrderId:
          razorpay_order_id,

        razorpayPaymentId:
          razorpay_payment_id,
      });

      const db = await readDb();

      const order = db.orders.find(
        (o: any) => o.id === orderId
      );

      const retailer = db.retailers.find(
        (r: any) =>
          r.mobile === order?.mobile
      );

      if (order && retailer) {
        const alreadyExists =
          await invoiceExists(order.id);

        if (!alreadyExists) {
          await createInvoice({
            invoiceNumber:
              generateInvoiceNumber(),

            orderId:
              order.id,

            retailerId:
              retailer.id || "",

            retailerName:
              retailer.shopName || "",

            orderNumber:
              order.orderNumber ||
              order.id,

            actualWeight:
              order.requestedWeight ||
              0,

            ratePerKg:
              order.ratePerKg || 0,

            amount:
              Number(paymentAmount || 0),

            remarks:
              "Advance Payment Receipt",
          });
        }
      }
    }

    return NextResponse.json({
      verified,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message:
          "Verification failed",
      },
      {
        status: 500,
      }
    );
  }
}