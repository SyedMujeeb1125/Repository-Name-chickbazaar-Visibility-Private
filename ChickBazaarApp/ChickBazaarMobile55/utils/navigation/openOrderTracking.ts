import { NavigationProp } from "@react-navigation/native";

export function openOrderTracking(
  navigation: NavigationProp<any>,
  order: any,
  currentDelivery?: any
) {
  if (!order?.id) {
    return;
  }

  const rawStatus =
    currentDelivery?.status ??
    order.status;

  const statusMap: Record<string, string> = {
    new: "order_confirmed",
    confirmed: "order_confirmed",
    allocated: "farm_allocated",
    preparing: "preparing",
    vehicle_assigned: "vehicle_assigned",
    out_for_delivery: "out_for_delivery",
    delivered: "delivered",
    cancelled: "delivered",
  };
  console.log("===== ORDER TRACKING =====");
console.log("ORDER:", order);
console.log("CURRENT DELIVERY:", currentDelivery);
  navigation.navigate("OrderTracking", {
    orderId:
      order.orderNumber ??
      order.order_number ??
      order.id,

    status:
      statusMap[rawStatus] ??
      "order_confirmed",

    requestedWeight:
  order.requestedWeight ??
  order.requested_weight ??
  order.weight ??
  currentDelivery?.requestedWeight ??
  0,

estimatedBirds:
  order.birds ??
  order.estimatedBirds ??
  order.estimated_birds ??
  currentDelivery?.estimatedBirds ??
  0,

estimatedInvoice:
  order.estimatedAmount ??
  order.estimated_amount ??
  currentDelivery?.estimatedAmount ??
  0,

deliverySlot:
  order.deliverySlot ??
  order.delivery_window ??
  currentDelivery?.deliveryWindow ??
  "6:00 AM – 8:00 AM",

captainName:
  order.driverName ??
  order.driver_name ??
  currentDelivery?.captain ??
  "",

captainPhone:
  order.driverPhone ??
  order.driver_phone ??
  currentDelivery?.driverPhone ??
  "",

vehicleNumber:
  order.assigned_vehicle ??
  order.vehicleNumber ??
  currentDelivery?.vehicle ??
  "",
  });
}