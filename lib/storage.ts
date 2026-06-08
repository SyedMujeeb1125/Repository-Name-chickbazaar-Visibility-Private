import { mkdir, readFile, rename, writeFile } from "fs/promises";
import path from "path";
import crypto from "crypto";
import type {
  ChickBazaarDb,
  FarmPartnerRecord,
  OrderRecord,
  RetailerRecord,
  SubmissionStatus
} from "@/lib/types";

const dataDir = path.join(process.cwd(), "data");
const uploadDir = path.join(dataDir, "uploads");
const dbPath = path.join(dataDir, "chickbazaar-db.json");

const emptyDb: ChickBazaarDb = {
  orders: [],
  retailers: [],
  farmPartners: [],
  otps: []
};

async function ensureDataDir() {
  await mkdir(uploadDir, { recursive: true });
}

export function createId(prefix: string) {
  return `${prefix}_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`;
}

export async function readDb(): Promise<ChickBazaarDb> {
  await ensureDataDir();
  try {
    const raw = await readFile(dbPath, "utf8");
    return { ...emptyDb, ...JSON.parse(raw) };
  } catch {
    await writeDb(emptyDb);
    return { ...emptyDb };
  }
}

export async function writeDb(db: ChickBazaarDb) {
  await ensureDataDir();
  const tmpPath = `${dbPath}.tmp`;
  await writeFile(tmpPath, JSON.stringify(db, null, 2));
  await rename(tmpPath, dbPath);
}

export async function addOrder(order: OrderRecord) {
  const db = await readDb();
  db.orders.unshift(order);
  await writeDb(db);
}

export async function addRetailer(retailer: RetailerRecord) {
  const db = await readDb();
  db.retailers.unshift(retailer);
  await writeDb(db);
}

export async function addFarmPartner(farmPartner: FarmPartnerRecord) {
  const db = await readDb();
  db.farmPartners.unshift(farmPartner);
  await writeDb(db);
}

export async function saveUploadedFile(file: File, prefix: string) {
  await ensureDataDir();
  const extension = path.extname(file.name || "").slice(0, 16) || ".bin";
  const safeName = `${createId(prefix)}${extension}`;
  const targetPath = path.join(uploadDir, safeName);
  const bytes = Buffer.from(await file.arrayBuffer());
  await writeFile(targetPath, bytes);
  return targetPath;
}

export async function updateRecordStatus(
  collection: "orders" | "retailers" | "farmPartners",
  id: string,
  status: SubmissionStatus
) {
  const db = await readDb();
  const record = db[collection].find((item) => item.id === id);
  if (!record) {
    return false;
  }
  record.status = status;
  await writeDb(db);
  return true;
}
