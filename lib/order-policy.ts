import { supabase } from "@/lib/supabase";

export interface OrderPolicyResult {
  allowed: boolean;
  message?: string;

  partnerStatus: string;

  bookingAmount: number;

  maxUnpaidInvoices: number;

  unpaidInvoices: number;
}

export async function getOrderPolicy(
  retailer: any
): Promise<OrderPolicyResult> {

  const { data: settings } =
    await supabase
      .from("platform_settings")
      .select("*")
      .eq("id", 1)
      .single();

  const bookingAmount =
    Number(
      settings?.booking_amount || 500
    );

  const partnerStatus =
    retailer?.partner_status ||
    "partner";

  const { count } =
    await supabase
      .from("invoices")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq(
        "retailer_mobile",
        retailer.mobile
      )
      .neq(
        "payment_status",
        "paid"
      );

  const unpaidInvoices =
    count || 0;

  const maxUnpaidInvoices =
    partnerStatus ===
    "trusted_partner"
      ? Number(
          settings?.trusted_partner_max_unpaid_invoices ||
            2
        )
      : Number(
          settings?.partner_max_unpaid_invoices ||
            1
        );

  if (
    unpaidInvoices >=
    maxUnpaidInvoices
  ) {
    return {
      allowed: false,

      message:
        "Please clear your previous invoice before placing another order.",

      partnerStatus,

      bookingAmount:
        partnerStatus ===
        "trusted_partner"
          ? 0
          : bookingAmount,

      maxUnpaidInvoices,

      unpaidInvoices,
    };
  }

  return {
    allowed: true,

    partnerStatus,

    bookingAmount:
      partnerStatus ===
      "trusted_partner"
        ? 0
        : bookingAmount,

    maxUnpaidInvoices,

    unpaidInvoices,
  };
}