import { redirect } from "next/navigation";
import { getLoggedInRetailerMobile } from "@/lib/retailer";
import { readDb } from "@/lib/storage";

export default async function ProfilePage() {
  const mobile = await getLoggedInRetailerMobile();

  if (!mobile) {
    redirect("/login");
  }

  const db = await readDb();

  const retailer = db.retailers.find(
    (r: any) => r.mobile === mobile
  );

  if (!retailer) {
    redirect("/login");
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-extrabold text-navy">
        My Profile
      </h1>

      <div className="mt-6 rounded-lg border bg-white p-6">
        <div className="grid gap-4">
          <p><strong>Shop Name:</strong> {retailer.shopName}</p>
          <p><strong>Owner:</strong> {retailer.ownerName}</p>
          <p><strong>Mobile:</strong> {retailer.mobile}</p>
          <p><strong>Email:</strong> {retailer.email}</p>
          <p><strong>Address:</strong> {retailer.address}</p>
          <p><strong>GST:</strong> {retailer.gst}</p>
          <p><strong>Status:</strong> {retailer.status}</p>
        </div>
      </div>
    </div>
  );
}