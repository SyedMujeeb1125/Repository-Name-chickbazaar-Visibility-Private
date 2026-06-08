import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminDashboard, type AdminDashboardData } from "@/components/admin-dashboard";
import { isAdminAuthenticated } from "@/lib/auth";
import { readDb } from "@/lib/storage";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Manage ChickBazaar submissions."
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const data = await readDb();
  const dashboardData: AdminDashboardData = {
    orders: data.orders,
    farmPartners: data.farmPartners,
    retailers: data.retailers.map((retailer) => ({
      id: retailer.id,
      createdAt: retailer.createdAt,
      status: retailer.status,
      shopName: retailer.shopName,
      ownerName: retailer.ownerName,
      mobile: retailer.mobile,
      email: retailer.email,
      address: retailer.address,
      gst: retailer.gst
    }))
  };

  return <AdminDashboard data={dashboardData} />;
}
