export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";

import { getDashboard } from "@/lib/dashboard";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import TodayRateCard from "@/components/dashboard/TodayRateCard";
import DashboardMetrics from "@/components/dashboard/DashboardMetrics";
import QuickActions from "@/components/dashboard/QuickActions";
import NotificationsCard from "@/components/dashboard/NotificationsCard";
import RecentOrders from "@/components/dashboard/RecentOrders";

export default async function DashboardPage() {
  const dashboard =
    await getDashboard();

  if (!dashboard) {
    redirect("/login");
  }

  const {
    retailer,
    todayRate,
    metrics,
    myOrders,
  } = dashboard;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">

      {/* Header */}

      <DashboardHeader
        retailerName={
          retailer?.ownerName ||
          retailer?.shopName ||
          "Retailer"
        }
      />

      {/* Approval Status */}

      {retailer?.status === "new" ? (
        <div className="mt-6 rounded-xl border border-yellow-300 bg-yellow-50 p-5">

          <h2 className="font-bold text-yellow-800">
            Account Under Review
          </h2>

          <p className="mt-2 text-yellow-700">
            Your retailer profile is currently
            under verification.

            Ordering will become available
            immediately after approval.
          </p>

        </div>
      ) : (
        <div className="mt-6 rounded-xl border border-green-300 bg-green-50 p-5">

          <h2 className="font-bold text-green-700">
            Approved Retailer
          </h2>

          <p className="mt-2 text-green-700">
            Your account is active.

            Welcome to ChickBazaar.
          </p>

        </div>
      )}

      {/* Today's Rate */}

      <div className="mt-8">

        <TodayRateCard
          rate={Number(
            todayRate?.rate || 0
          )}
        />

      </div>

      {/* Dashboard Metrics */}

      <div className="mt-8">

        <DashboardMetrics
          metrics={[
            {
              title: "Orders",

              value:
                metrics.totalOrders,

              color: "bg-navy",
            },

            {
              title: "Pending",

              value:
                metrics.pendingOrders,

              color: "bg-orange",
            },

            {
              title: "Completed",

              value:
                metrics.completedOrders,

              color: "bg-green-600",
            },

            {
              title: "Outstanding",

              value:
                `₹${metrics.outstanding}`,

              color: "bg-red-600",
            },

            {
              title: "Credit",

              value:
                metrics.creditCategory,

              color: "bg-purple-600",
            },
          ]}
        />

      </div>

      {/* Quick Actions */}

      <div className="mt-10">

        <QuickActions />

      </div>

      {/* Notifications */}

      <div className="mt-10">

        <NotificationsCard />

      </div>

      {/* Recent Orders */}

      <div className="mt-10">

        <RecentOrders
          orders={myOrders}
        />

      </div>
      {/* Tomorrow's Delivery */}

      <div className="mt-10">

        <div className="rounded-2xl border bg-white p-6 shadow">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-bold">
                Tomorrow's Delivery
              </h2>

              <p className="mt-2 text-slate-500">
                Your next scheduled delivery
              </p>

            </div>

            <span className="rounded-full bg-green-100 px-4 py-2 font-semibold text-green-700">
              Active
            </span>

          </div>

          {myOrders.length === 0 ? (

            <div className="mt-8 rounded-xl bg-slate-50 p-8 text-center">

              <p className="text-lg font-semibold">
                No orders available
              </p>

              <p className="mt-2 text-slate-500">
                Place your first order before
                11:59 PM for tomorrow's delivery.
              </p>

            </div>

          ) : (

            <div className="mt-8 grid gap-6 md:grid-cols-3">

              <div className="rounded-xl bg-orange p-6 text-white">

                <p className="text-sm uppercase">
                  Delivery Date
                </p>

                <h3 className="mt-3 text-2xl font-bold">

                  {myOrders[0].deliveryDate ||
                    "-"}

                </h3>

              </div>

              <div className="rounded-xl bg-green-600 p-6 text-white">

                <p className="text-sm uppercase">
                  Requested Weight
                </p>

                <h3 className="mt-3 text-2xl font-bold">

                  {myOrders[0]
                    .requestedWeight || 0} KG

                </h3>

              </div>

              <div className="rounded-xl bg-navy p-6 text-white">

                <p className="text-sm uppercase">
                  Order Status
                </p>

                <h3 className="mt-3 text-2xl font-bold">

                  {String(
                    myOrders[0].status || ""
                  ).toUpperCase()}

                </h3>

              </div>

            </div>

          )}

        </div>

      </div>

      {/* Financial Summary */}

      <div className="mt-10">

        <div className="grid gap-6 lg:grid-cols-2">

          <div className="rounded-2xl border bg-white p-6 shadow">

            <h2 className="text-xl font-bold">
              Financial Summary
            </h2>

            <div className="mt-6 space-y-4">

              <div className="flex justify-between">

                <span>
                  Outstanding
                </span>

                <strong>
                  ₹{metrics.outstanding}
                </strong>

              </div>

              <div className="flex justify-between">

                <span>
                  Credit Category
                </span>

                <strong>
                  {metrics.creditCategory}
                </strong>

              </div>

              <div className="flex justify-between">

                <span>
                  Today's Rate
                </span>

                <strong>

                  ₹
                  {todayRate?.rate || 0}
                  /kg

                </strong>

              </div>

            </div>

          </div>

          <div className="rounded-2xl border bg-white p-6 shadow">

            <h2 className="text-xl font-bold">
              Retailer Information
            </h2>

            <div className="mt-6 space-y-4">

              <div>

                <p className="text-sm text-slate-500">
                  Shop Name
                </p>

                <p className="font-semibold">
                  {retailer?.shopName}
                </p>

              </div>

              <div>

                <p className="text-sm text-slate-500">
                  Owner
                </p>

                <p className="font-semibold">
                  {retailer?.ownerName}
                </p>

              </div>

              <div>

                <p className="text-sm text-slate-500">
                  Mobile
                </p>

                <p className="font-semibold">
                  {retailer?.mobile}
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>      {/* Support */}

      <div className="mt-10">

        <div className="rounded-2xl bg-gradient-to-r from-orange to-orange/80 p-8 text-white shadow-lg">

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div>

              <h2 className="text-3xl font-bold">
                Need Help?
              </h2>

              <p className="mt-2 max-w-xl text-orange-50">
                Our operations team is available to help you with
                ordering, payments, deliveries and account support.
              </p>

            </div>

            <div className="flex gap-4">

              <a
                href="tel:+919353956243"
                className="rounded-lg bg-white px-6 py-3 font-bold text-orange shadow hover:bg-slate-100"
              >
                Call Support
              </a>

              <a
                href="https://wa.me/919353956243"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg bg-green-600 px-6 py-3 font-bold text-white shadow hover:bg-green-700"
              >
                WhatsApp
              </a>

            </div>

          </div>

        </div>

      </div>

      {/* Footer */}

      <div className="mt-12 border-t pt-6">

        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">

          <p className="text-sm text-slate-500">
            © 2026 ChickBazaar. All rights reserved.
          </p>

          <p className="text-sm text-slate-500">
            Powered by FruitGlobe International Pvt. Ltd.
          </p>

        </div>

      </div>

    </div>
  );
}