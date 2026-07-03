import React, {
  useEffect,
  useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  ScrollView,
  StyleSheet,
} from "react-native";

import DashboardHeader from "../components/dashboard/DashboardHeader";

import DashboardHero from "../components/dashboard/DashboardHero";
import LiveRateCard from "../components/dashboard/LiveRateCard";
import BusinessSummaryCard from "../components/dashboard/BusinessSummaryCard";

import TomorrowOrderCard from "../components/dashboard/TomorrowOrderCard";

import OperationsSection from "../components/business/OperationsSection";

import QuickActionsSection from "../components/business/QuickActionsSection";

import OrdersSection from "../components/business/OrdersSection";

import LoadingView from "../components/ui/LoadingView";

export default function DashboardScreen({
  navigation,
}: any) {
  const [dashboard, setDashboard] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadDashboard();

    const timer = setInterval(
      loadDashboard,
      30000
    );

    return () =>
      clearInterval(timer);
  }, []);

  async function loadDashboard() {
    try {
      const mobile =
        await AsyncStorage.getItem(
          "retailerMobile"
        );

      const response =
        await fetch(
          `https://www.chickbazaar.com/api/mobile/dashboard?mobile=${mobile}`
        );

      const data =
        await response.json();

      setDashboard(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <LoadingView />;
  }

  return (
    <SafeAreaView
      style={styles.safeArea}
    >
      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.container
        }
      >
        <DashboardHeader
  shopName={dashboard?.shopName || "Retailer"}
  address={dashboard?.address}
/>

<LiveRateCard
  rate={Number(
    dashboard?.todayRate || 0
  )}
/>

<DashboardHero
  hasOrderToday={false}
  deliveryStatus={
    dashboard?.currentDelivery?.status
  }
  driverName={
    dashboard?.currentDelivery?.captain
  }
  eta={
    dashboard?.currentDelivery?.eta
  }
  onPlaceOrder={() =>
    navigation.navigate("PlaceOrder")
  }
  onTrackOrder={() =>
    navigation.navigate("MyOrders")
  }
/>

<QuickActionsSection
  onShops={() =>
    navigation.navigate("MyShops")
  }
  onOrders={() =>
    navigation.navigate("MyOrders")
  }
  onBills={() =>
    navigation.navigate("Outstanding")
  }
  onProfile={() =>
    navigation.navigate("Profile")
  }
/>

<OperationsSection
  activeOrders={
    dashboard?.pendingOrders || 0
  }
  captain={
    dashboard?.currentDelivery?.captain
  }
  eta={
    dashboard?.currentDelivery?.eta
  }
/>

<BusinessSummaryCard
  activeOrders={
    dashboard?.pendingOrders || 0
  }
  pendingBills={
    dashboard?.outstanding || 0
  }
  availableCredit={
    dashboard?.availableCredit || 0
  }
/>

<OrdersSection
  orders={
    dashboard?.recentOrders || []
  }
  onOrderPress={(orderId) =>
    navigation.navigate(
      "OrderDetails",
      {
        orderId,
      }
    )
  }
/>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles =
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor:
        "#F8FAFC",
    },

    container: {
      padding: 20,
      paddingBottom: 40,
    },
  });