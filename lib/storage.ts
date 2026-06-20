import crypto from "crypto";
import { supabase } from "./supabase";
import type {
  ChickBazaarDb,
  FarmPartnerRecord,
  OrderRecord,
  RetailerRecord,
  RetailerLocationRecord,
  OrderStatus,
  PartnerStatus
} from "@/lib/types";

export function createId(prefix: string) {
  return `${prefix}_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`;
}

export async function readDb(): Promise<ChickBazaarDb> {
  const [
  orders,
  retailers,
  retailerLocations,
  farmPartners,
  farmInventory,
  otps
] = await Promise.all([
  supabase.from("orders").select("*"),
  supabase.from("retailers").select("*"),

  supabase
    .from("retailer_locations")
    .select("*"),

  supabase.from("farm_partners").select("*"),
  supabase
  .from("farm_inventory")
  .select("*"),
  supabase.from("otps").select("*")
]);



  return {
    orders: (orders.data || []).map((o: any) => ({
  id: o.id,

  orderNumber: o.order_number,

  createdAt: o.created_at,
  status: o.status,

  paymentStatus: o.payment_status,
paymentAmount: o.payment_amount,
razorpayOrderId: o.razorpay_order_id,
razorpayPaymentId: o.razorpay_payment_id,

paymentType: o.payment_type,
requestedWeight: o.requested_weight,
ratePerKg: o.rate_per_kg,
actualWeight: o.actual_weight,
finalAmount: o.final_amount,
estimatedAmount:
  o.estimated_amount,

advancePercentage:
  o.advance_percentage,

advanceRequired:
  o.advance_required,

assignedFarm: o.assigned_farm,
trackingNotes: o.tracking_notes,

  shopName: o.shop_name,
  ownerName: o.owner_name,
  mobile: o.mobile,
  email: o.email,
  address: o.address,

  birds: o.birds,
  averageWeight: o.average_weight,
  deliveryDate: o.delivery_date,

  notes: o.notes,

  latitude: o.latitude,
  longitude: o.longitude
})),

farmInventory:
  (farmInventory.data || []).map(
    (i: any) => ({
      id: i.id,

      farmId: i.farm_id,

      inventoryDate:
        i.inventory_date,

      weightCategory:
        i.weight_category,

      birdCount:
        i.bird_count,

      procurementPrice:
        i.procurement_price,

      createdAt:
        i.created_at
    })
  ),
    retailers: (retailers.data || []).map((r: any) => ({
  id: r.id,
  createdAt: r.created_at,
  status: r.status,
  creditCategory: r.credit_category,

  creditLimit: r.credit_limit,
  availableCredit: r.available_credit,

  shopName: r.shop_name,
  ownerName: r.owner_name,
  mobile: r.mobile,
  email: r.email,
  address: r.address,

  gst: r.gst,
  gstCertificatePath: r.gst_certificate_path,

  latitude: r.latitude,
  longitude: r.longitude
})),

retailerLocations:
  (retailerLocations.data || []).map(
    (r: any) => ({
      id: r.id,

      retailerMobile:
        r.retailer_mobile,

      shopName:
        r.shop_name,

      contactPerson:
        r.contact_person,

      mobile:
        r.mobile,

      address:
        r.address,

      latitude:
        r.latitude,

      longitude:
        r.longitude,

      createdAt:
        r.created_at
    })
  ),

farmPartners: (farmPartners.data || []).map((f: any) => ({
  id: f.id,
  createdAt: f.created_at,
  status: f.status,

  farmName: f.farm_name,
  contactPerson: f.contact_person,
  mobile: f.mobile,
  email: f.email,

  location: f.location,
  dailyCapacity: f.daily_capacity,
  averageBirdWeight: f.average_bird_weight,

  message: f.message,

  latitude: f.latitude,
  longitude: f.longitude
})),
    otps: otps.data || []
  };
}

export async function writeDb(_: ChickBazaarDb) {
  return;
}
export async function getAllocations() {
  const { data } = await supabase
    .from("farm_allocations")
    .select("*")
    .order("created_at", {
      ascending: false
    });

  return data || [];
}

export async function addOrder(order: OrderRecord) {
  await supabase.from("orders").insert({
  id: order.id,

  order_number: order.orderNumber,

  created_at: order.createdAt,

  status: order.status,

  payment_status: order.paymentStatus,
payment_amount: order.paymentAmount,

razorpay_order_id: order.razorpayOrderId,
razorpay_payment_id: order.razorpayPaymentId,

payment_type: order.paymentType,
requested_weight: order.requestedWeight,
rate_per_kg: order.ratePerKg,
actual_weight: order.actualWeight,
final_amount: order.finalAmount,
estimated_amount:
  order.estimatedAmount,

advance_percentage:
  order.advancePercentage,

advance_required:
  order.advanceRequired,

assigned_farm: order.assignedFarm,
tracking_notes: order.trackingNotes,

  shop_name: order.shopName,
  owner_name: order.ownerName,
  mobile: order.mobile,
  email: order.email,
  address: order.address,

  birds: order.birds,
  average_weight: order.averageWeight,
  delivery_date: order.deliveryDate,

  notes: order.notes,

  latitude: order.latitude,
  longitude: order.longitude
});
}

export async function addRetailer(retailer: RetailerRecord) {
  await supabase.from("retailers").insert({
  id: retailer.id,
  created_at: retailer.createdAt,
  status: retailer.status,
  credit_category: retailer.creditCategory,

  shop_name: retailer.shopName,
  owner_name: retailer.ownerName,
  mobile: retailer.mobile,
  email: retailer.email,
  address: retailer.address,

  gst: retailer.gst,
  gst_certificate_path: retailer.gstCertificatePath,

  latitude: retailer.latitude,
  longitude: retailer.longitude
});
}
export async function getFulfillments() {
  const { data } = await supabase
    .from("farm_fulfillments")
    .select("*")
    .order("created_at", {
      ascending: false
    });

  return data || [];
}

export async function addFarmPartner(farmPartner: FarmPartnerRecord) {
  await supabase.from("farm_partners").insert({
  id: farmPartner.id,
  created_at: farmPartner.createdAt,
  status: farmPartner.status,

  farm_name: farmPartner.farmName,
  contact_person: farmPartner.contactPerson,
  mobile: farmPartner.mobile,
  email: farmPartner.email,

  location: farmPartner.location,
  daily_capacity: farmPartner.dailyCapacity,
  average_bird_weight: farmPartner.averageBirdWeight,

  message: farmPartner.message,

  latitude: farmPartner.latitude,
  longitude: farmPartner.longitude
});
}

export async function getRetailerLedger() {
  const { data } = await supabase
    .from("retailer_ledger")
    .select("*")
    .order("created_at", {
      ascending: false
    });

  return data || [];
}

export async function addLedgerEntry(
  retailerId: string,
  orderId: string,
  debit: number,
  credit: number,
  remarks: string
) {
  const { error } = await supabase
    .from("retailer_ledger")
    .insert({
      retailer_id: retailerId,
      order_id: orderId,
      debit,
      credit,
      remarks
    });

  return !error;
}

export async function recordRetailerPayment({
  retailer_id,
  amount,
  remarks,
}: {
  retailer_id: string;
  amount: number;
  remarks?: string;
}) {
  const { data, error } = await supabase
    .from("retailer_ledger")
    .insert([
      {
        retailer_id,
        credit: amount,
        debit: 0,
        remarks: remarks || "Payment Received",
      },
    ])
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function getRetailerOutstanding(
  retailerId: string
) {
  const { data, error } = await supabase
    .from("retailer_ledger")
    .select("*")
    .eq("retailer_id", retailerId);

  if (error) throw error;

  const totalDebit = data.reduce(
    (sum, row) => sum + Number(row.debit || 0),
    0
  );

  const totalCredit = data.reduce(
    (sum, row) => sum + Number(row.credit || 0),
    0
  );

  return {
    totalDebit,
    totalCredit,
    outstanding: totalDebit - totalCredit,
  };
}
export async function getRetailerPayments(
  retailerId: string
) {
  const { data, error } = await supabase
    .from("retailer_ledger")
    .select("*")
    .eq("retailer_id", retailerId)
    .gt("credit", 0)
    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  return data || [];
}
export async function addOrderStatusHistory(
  orderId: string,
  status: string,
  remarks?: string
) {
  const { error } = await supabase
    .from("order_status_history")
    .insert([
      {
        order_id: orderId,
        status,
        remarks,
      },
    ]);

  if (error) throw error;
}
export async function getOrderStatusHistory(
  orderId: string
) {
  const { data, error } = await supabase
    .from("order_status_history")
    .select("*")
    .eq("order_id", orderId)
    .order("created_at");

  if (error) throw error;

  return data || [];
}

export async function saveUploadedFile(file: File, prefix: string) {
  return `${prefix}_${Date.now()}_${file.name}`;
}
export async function createInvoice({
  invoiceNumber,
  orderId,
  retailerId,
  retailerName,
  orderNumber,
  actualWeight,
  ratePerKg,
  amount,
  remarks
}: {
  invoiceNumber: string;
  orderId: string;
  retailerId: string;
  retailerName: string;
  orderNumber: string;
  actualWeight: number;
  ratePerKg: number;
  amount: number;
  remarks?: string;
}) {
  const { error } = await supabase
    .from("invoices")
    .insert({
      invoice_number: invoiceNumber,
      order_id: orderId,
      retailer_id: retailerId,
      retailer_name: retailerName,
      order_number: orderNumber,
      actual_weight: actualWeight,
      rate_per_kg: ratePerKg,
      amount,
      remarks
    });

  if (error) throw error;
}
export function generateInvoiceNumber() {
  return `INV-${new Date().getFullYear()}-${Date.now()
    .toString()
    .slice(-6)}`;
}

export async function updateRecordStatus(
  collection: "orders" | "retailers" | "farmPartners",
  id: string,
  status: OrderStatus | PartnerStatus
) {
  let table = "";

  if (collection === "orders") table = "orders";
  if (collection === "retailers") table = "retailers";
  if (collection === "farmPartners") table = "farm_partners";

  const { error } = await supabase
    .from(table)
    .update({ status })
    .eq("id", id);

  return !error;
}
export async function getInvoices() {
  const { data, error } =
    await supabase
      .from("invoices")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

  if (error) {
    throw error;
  }

  return data || [];
}
export async function ledgerDebitExists(
  orderId: string
) {
  const { data } = await supabase
    .from("retailer_ledger")
    .select("id")
    .eq("order_id", orderId)
    .gt("debit", 0)
    .limit(1);

  return (data?.length || 0) > 0;
}
export async function invoiceExists(
  orderId: string
) {
  const { data } = await supabase
    .from("invoices")
    .select("id")
    .eq("order_id", orderId)
    .limit(1);

  return (data?.length || 0) > 0;
}
export async function updateOrderDetails(
  id: string,
  updates: {
    paymentStatus?: string;
    paymentAmount?: number;

    razorpayOrderId?: string;
    razorpayPaymentId?: string;

    assignedFarm?: string;
    trackingNotes?: string;

    paymentType?: string;
    requestedWeight?: number;
    ratePerKg?: number;
    actualWeight?: number;
    finalAmount?: number;
  }
  
) {
  const { error } = await supabase
    .from("orders")
    .update({
      payment_status: updates.paymentStatus,
      payment_amount: updates.paymentAmount,

      razorpay_order_id:
        updates.razorpayOrderId,

      razorpay_payment_id:
        updates.razorpayPaymentId,

      assigned_farm:
        updates.assignedFarm,

      tracking_notes:
        updates.trackingNotes,

      payment_type:
        updates.paymentType,

      requested_weight:
        updates.requestedWeight,

      rate_per_kg:
        updates.ratePerKg,

      actual_weight:
        updates.actualWeight,

      final_amount:
        updates.finalAmount
    })
    .eq("id", id);

  
  return !error;
}
export async function getTodayRate() {
  const { data } = await supabase
    .from("daily_rates")
    .select("*")
    .order("created_at", {
      ascending: false
    })
    .limit(1)
    .single();

  return data;
}

export async function addRetailerLocation(
  location: RetailerLocationRecord
) {
  await supabase
    .from("retailer_locations")
    .insert({
      id: location.id,

      retailer_mobile:
        location.retailerMobile,

      shop_name:
        location.shopName,

      contact_person:
        location.contactPerson,

      mobile:
        location.mobile,

      address:
        location.address,

      latitude:
        location.latitude,

      longitude:
        location.longitude,

      created_at:
        location.createdAt
    });
}

export async function updateRetailerCategory(
  retailerId: string,
  category:
    | "new"
    | "trusted"
    | "premium"
) {
  let creditLimit = 0;

  if (category === "trusted") {
    creditLimit = 50000;
  }

  if (category === "premium") {
    creditLimit = 100000;
  }

  const { error } = await supabase
    .from("retailers")
    .update({
      credit_category: category,
      credit_limit: creditLimit,
      available_credit: creditLimit
    })
    .eq("id", retailerId);

  return !error;
}