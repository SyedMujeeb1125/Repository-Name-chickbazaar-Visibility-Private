import crypto from "crypto";
import type {
  ChickBazaarDb,
  FarmPartnerRecord,
  OrderRecord,
  RetailerRecord,
  SubmissionStatus
} from "@/lib/types";

const db: ChickBazaarDb = {
  orders: [],
  retailers: [],
  farmPartners: [],
  otps: []
};

export function createId(prefix: string) {
  return `${prefix}_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`;
}

export async function readDb(): Promise<ChickBazaarDb> {
  return db;
}

export async function writeDb(_: ChickBazaarDb) {
  return;
}

export async function addOrder(order: OrderRecord) {
  db.orders.unshift(order);
}

export async function addRetailer(retailer: RetailerRecord) {
  db.retailers.unshift(retailer);
}

export async function addFarmPartner(farmPartner: FarmPartnerRecord) {
  db.farmPartners.unshift(farmPartner);
}

export async function saveUploadedFile(file: File, prefix: string) {
  return `${prefix}_${Date.now()}_${file.name}`;
}

export async function updateRecordStatus(
  collection: "orders" | "retailers" | "farmPartners",
  id: string,
  status: SubmissionStatus
) {
  const record = db[collection].find((item) => item.id === id);

  if (!record) {
    return false;
  }

  record.status = status;
  return true;
}