import { getLoggedInRetailerMobile } from "@/lib/retailer";
import { readDb, getTodayRate } from "@/lib/storage";

const orderSteps = [
  "new",
  "confirmed",
  "procured",
  "dispatched",
  "delivered",
  "completed",
];

export async function getDashboard() {
  const mobile = await getLoggedInRetailerMobile();

  if (!mobile) {
    return null;
  }

  const db = await readDb();

  const todayRate = await getTodayRate();

  const retailer = db.retailers.find(
    (r: any) => r.mobile === mobile
  );

  const myOrders = db.orders
    .filter(
      (o: any) => o.mobile === mobile
    )
    .sort(
      (a: any, b: any) =>
        new Date(
          b.createdAt || b.id
        ).getTime() -
        new Date(
          a.createdAt || a.id
        ).getTime()
    );

  const totalOrders = myOrders.length;

  const pendingOrders = myOrders.filter(
    (o: any) =>
      [
        "new",
        "confirmed",
        "procured",
        "dispatched",
      ].includes(o.status)
  ).length;

  const completedOrders =
    myOrders.filter((o: any) =>
      ["delivered", "completed"].includes(
        o.status
      )
    ).length;

  const outstanding =
    myOrders.reduce(
      (sum: number, o: any) =>
        sum +
        Number(
          o.outstandingAmount || 0
        ),
      0
    );

  return {
    mobile,

    retailer,

    todayRate,

    myOrders,

    metrics: {
      totalOrders,

      pendingOrders,

      completedOrders,

      outstanding,

      creditCategory:
        retailer?.creditCategory ||
        "New",
    },

    orderSteps,
  };
}