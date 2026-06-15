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

export async function saveUploadedFile(file: File, prefix: string) {
  return `${prefix}_${Date.now()}_${file.name}`;
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
) 
 {
  const { error } = await supabase
    .from("orders")
    .update({
  payment_status: updates.paymentStatus,
  payment_amount: updates.paymentAmount,

  razorpay_order_id: updates.razorpayOrderId,
  razorpay_payment_id: updates.razorpayPaymentId,

  payment_type: updates.paymentType,
  requested_weight: updates.requestedWeight,
  rate_per_kg: updates.ratePerKg,
  actual_weight: updates.actualWeight,
  final_amount: updates.finalAmount,

  assigned_farm: updates.assignedFarm,
  tracking_notes: updates.trackingNotes
})
    .eq("id", id);

  return !error;
} export async function getTodayRate() {
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