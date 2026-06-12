import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminDashboard, type AdminDashboardData } from "@/components/admin-dashboard";
import { isAdminAuthenticated } from "@/lib/auth";
import { readDb, getTodayRate } from "@/lib/storage";

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

  const todayRate = await getTodayRate();

  const dashboardData: AdminDashboardData = {
    orders: data.orders,
    retailers: data.retailers,
    farmPartners: data.farmPartners
  };

  return (
  <AdminDashboard
    data={dashboardData}
    todayRate={todayRate}
  />
);
}