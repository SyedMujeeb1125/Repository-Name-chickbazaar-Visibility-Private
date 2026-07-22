import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  RefreshControl,
  ScrollView,
  StyleSheet,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import StatusBanner from "../components/common/StatusBanner";

import DeliveryAddressCard from "../components/order-details/DeliveryAddressCard";
import DeliveryPartnerCard from "../components/order-details/DeliveryPartnerCard";
import DeliveryStatusCard from "../components/order-details/DeliveryStatusCard";
import InvoiceCard from "../components/order-details/InvoiceCard";
import LiveTrackingCard from "../components/order-details/LiveTrackingCard";
import NeedHelpCard from "../components/order-details/NeedHelpCard";
import OrderActionCard from "../components/order-details/OrderActionCard";
import OrderDetailsSkeleton from "../components/order-details/OrderDetailsSkeleton";
import OrderHeaderCard from "../components/order-details/OrderHeaderCard";
import OrderSummaryCard from "../components/order-details/OrderSummaryCard";
import OrderTimelineCard from "../components/order-details/OrderTimelineCard";
import PaymentSummaryCard from "../components/order-details/PaymentSummaryCard";

export default function OrderDetailsScreen({
  route,
}: any) {
  const { orderId } = route.params;

  const [order, setOrder] = useState<any>(null);

  const [refreshing, setRefreshing] =
    useState(false);

  const intervalRef =
    useRef<ReturnType<typeof setInterval> | null>(
      null
    );

  useEffect(() => {
    loadOrder();

    intervalRef.current = setInterval(() => {
      loadOrder();
    }, 15000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  async function loadOrder(
    showLoader = false
  ) {
    try {
      if (showLoader) {
        setRefreshing(true);
      }

      const response = await fetch(
        `https://www.chickbazaar.com/api/mobile/order-details?orderId=${orderId}`
      );

      const data = await response.json();

      setOrder(data);

      if (
        data.status === "delivered" &&
        intervalRef.current
      ) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    } catch (error) {
      console.log(
        "Failed to load order",
        error
      );
    } finally {
      if (showLoader) {
        setRefreshing(false);
      }
    }
  }

  async function onRefresh() {
    await loadOrder(true);
  }

  if (!order) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <OrderDetailsSkeleton />
      </SafeAreaView>
    );
  }

  const status = order.status;

  const banners: Record<string, any> = {
    new: {
      icon: "clipboard-check-outline",
      title: "Order Received",
      message:
        "We've received your order and will confirm it shortly.",
      color: "#2563EB",
    },

    confirmed: {
      icon: "check-decagram",
      title: "Order Confirmed",
      message:
        "Your order has been confirmed.",
      color: "#16A34A",
    },

    allocated: {
      icon: "warehouse",
      title: "Farm Allocated",
      message:
        "Your order has been allocated to a farm.",
      color: "#8B5CF6",
    },

    preparing: {
      icon: "package-variant",
      title: "Preparing Order",
      message:
        "We're preparing your order.",
      color: "#F97316",
    },

    vehicle_assigned: {
      icon: "truck-outline",
      title: "Driver Assigned",
      message:
        "A delivery partner has been assigned.",
      color: "#EA580C",
    },

    out_for_delivery: {
      icon: "truck-fast",
      title: "Out For Delivery",
      message:
        "Your order is on the way.",
      color: "#2563EB",
    },

    delivered: {
      icon: "check-circle",
      title: "Delivered",
      message:
        "Thank you for ordering with ChickBazaar.",
      color: "#16A34A",
    },
  };

  const statusBanner =
    banners[status] ?? {
      icon: "information",
      title: "Order Status",
      message: status,
      color: "#64748B",
    };

  const showDeliveryProgress =
    status !== "delivered";

  const showTimeline =
    status !== "delivered";

  const showDriver =
    [
      "vehicle_assigned",
      "out_for_delivery",
      "delivered",
    ].includes(status);

  const showTracking =
    status === "out_for_delivery";

  const showInvoice =
    status === "delivered";

  const canCancel =
    status === "new" ||
    status === "confirmed";

  return (
    <SafeAreaView
      style={styles.safeArea}
    >
      <ScrollView
        contentContainerStyle={
          styles.container
        }
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#F97316"]}
            tintColor="#F97316"
          />
        }
      >
        <OrderHeaderCard
          orderNumber={order.orderNumber}
          status={status}
          orderDate={order.createdAt}
        />

        <StatusBanner
          icon={statusBanner.icon}
          title={statusBanner.title}
          message={statusBanner.message}
          color={statusBanner.color}
        />

        <OrderSummaryCard
          quantity={order.requestedWeight}
          orderType="weight"
          amount={order.estimatedAmount}
        />

                {showDeliveryProgress && (
          <DeliveryStatusCard
            status={status}
            eta="Calculating..."
          />
        )}

        {showTimeline && (
          <OrderTimelineCard
            status={status}
          />
        )}

        <PaymentSummaryCard
          ratePerKg={order.ratePerKg}
          quantity={order.requestedWeight}
          estimatedAmount={order.estimatedAmount}
          paidAmount={order.paidAmount ?? 0}
        />

        {showDriver && (
          <DeliveryPartnerCard
            driverName={order.assignedDriver?.name}
            driverPhone={order.assignedDriver?.phone}
            vehicleNumber={order.assignedVehicle?.vehicleNumber}
          />
        )}

        {showTracking && (
          <LiveTrackingCard
            status={status}
            driverName={order.assignedDriver?.name}
            vehicleNumber={order.assignedVehicle?.vehicleNumber}
            latitude={order.driverLatitude}
            longitude={order.driverLongitude}
          />
        )}

        <DeliveryAddressCard
          address={order.address}
          latitude={order.latitude}
          longitude={order.longitude}
        />

        {showInvoice && (
          <InvoiceCard
            paymentStatus={order.paymentStatus}
            estimatedAmount={order.estimatedAmount}
            finalAmount={order.finalAmount}
            paidAmount={order.totalPaid}
            actualWeight={order.actualWeight}
          />
        )}

        <NeedHelpCard
          supportPhone="9353956243"
          supportWhatsapp="9353956243"
        />

        <OrderActionCard
          status={status}
          canCancel={canCancel}
          driverPhone={order.assignedDriver?.phone}
          onCancel={() => {}}
          onInvoice={() => {}}
          onReorder={() => {}}
        />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  container: {
    padding: 20,
    paddingBottom: 40,
  },
});