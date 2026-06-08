import { NextResponse } from "next/server";
import { addFarmPartner, createId } from "@/lib/storage";
import type { FarmPartnerRecord } from "@/lib/types";

function value(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const required = [
    "farmName",
    "contactPerson",
    "mobile",
    "email",
    "location",
    "dailyCapacity",
    "averageBirdWeight",
    "message"
  ];

  for (const key of required) {
    if (!value(formData, key)) {
      return NextResponse.json({ message: `${key} is required.` }, { status: 400 });
    }
  }

  const farmPartner: FarmPartnerRecord = {
    id: createId("farm"),
    createdAt: new Date().toISOString(),
    status: "new",
    farmName: value(formData, "farmName"),
    contactPerson: value(formData, "contactPerson"),
    mobile: value(formData, "mobile"),
    email: value(formData, "email"),
    location: value(formData, "location"),
    dailyCapacity: value(formData, "dailyCapacity"),
    averageBirdWeight: value(formData, "averageBirdWeight"),
    message: value(formData, "message")
  };

  await addFarmPartner(farmPartner);
  return NextResponse.json({ message: "Farm partner request saved.", id: farmPartner.id });
}
