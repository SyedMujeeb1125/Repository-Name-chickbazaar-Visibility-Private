import crypto from "crypto";
import { supabase } from "./supabase";
import type {
  ChickBazaarDb,
  FarmPartnerRecord,
  OrderRecord,
  RetailerRecord,
  SubmissionStatus
} from "@/lib/types";

export function createId(prefix: string) {
  return `${prefix}_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`;
}

export async function readDb(): Promise<ChickBazaarDb> {
  const [orders, retailers, farmPartners, otps] = await Promise.all([
    supabase.from("orders").select("*"),
    supabase.from("retailers").select("*"),
    supabase.from("farm_partners").select("*"),
    supabase.from("otps").select("*")
  ]);

  return {
    orders: orders.data || [],
    retailers: retailers.data || [],
    farmPartners: farmPartners.data || [],
    otps: otps.data || []
  };
}

export async function writeDb(_: ChickBazaarDb) {
  return;
}

export async function addOrder(order: OrderRecord) {
  await supabase.from("orders").insert({
    id: order.id,
    created_at: order.createdAt,
    status: order.status,
    shop_name: order.shopName,
    owner_name: order.ownerName,
    mobile: order.mobile,
    email: order.email,
    address: order.address,
    birds: order.birds,
    average_weight: order.averageWeight,
    delivery_date: order.deliveryDate,
    notes: order.notes
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
    gst_certificate_path: retailer.gstCertificatePath
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
    message: farmPartner.message
  });
}

export async function saveUploadedFile(file: File, prefix: string) {
  return `${prefix}_${Date.now()}_${file.name}`;
}

export async function updateRecordStatus(
  collection: "orders" | "retailers" | "farmPartners",
  id: string,
  status: SubmissionStatus
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