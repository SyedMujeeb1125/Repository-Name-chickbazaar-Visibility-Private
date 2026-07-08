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
  View,
} from "react-native";

import { useAuth } from "../context/AuthContext";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardHeroRenderer from "../components/dashboard/DashboardHeroRenderer";
import LiveRateCard from "../components/dashboard/LiveRateCard";
import RetailerAccountCard from "../components/dashboard/RetailerAccountCard";

import OrdersSection from "../components/business/OrdersSection";
import QuickActionsSection from "../components/business/QuickActionsSection";

import SideDrawer from "../components/navigation/SideDrawer";

import LoadingView from "../components/ui/LoadingView";

import {
  DashboardState,
} from "../utils/dashboard";

export default function DashboardScreen({
  navigation,
}: any) {

  const [dashboard, setDashboard] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  const [drawerVisible, setDrawerVisible] =
    useState(false);

  const { logout } =
    useAuth();

  useEffect(() => {

    loadDashboard();

    const timer =
      setInterval(
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

      if (!mobile) {

        return;

      }

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

  const currentHour =
    new Date().getHours();

  let dashboardState =
    DashboardState.NO_ORDER;

  if (
    dashboard?.currentDelivery
  ) {

    dashboardState =
      DashboardState.ORDER_CONFIRMED;

  }

  else if (
    currentHour >= 11 &&
    currentHour < 18
  ) {

    dashboardState =
      DashboardState.AFTER_CUTOFF;

  }

  console.log("================================");
console.log("dashboard =", JSON.stringify(dashboard, null, 2));
console.log("currentDelivery =", dashboard?.currentDelivery);
console.log("dashboardState =", dashboardState);
console.log("================================");

    return (

    <SafeAreaView style={styles.safeArea}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >

        <DashboardHeader
          shopName={
            dashboard?.shopName ||
            "Retailer"
          }
          address={
            dashboard?.address ||
            "HSR Layout"
          }
          notificationCount={3}
          orderStatus={
            currentHour < 11
              ? "regular"
              : currentHour < 18
              ? "express"
              : "tomorrow"
          }
          onMenuPress={() =>
            setDrawerVisible(true)
          }
          onNotificationPress={() =>
            navigation.navigate("Activity")
          }
        />

        <LiveRateCard
          rate={Number(
            dashboard?.todayRate || 150
          )}
        />

        <DashboardHeroRenderer
          state={dashboardState}
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
            navigation.navigate("Order")
          }
          onTrackOrder={() =>
            navigation.navigate("Orders")
          }
        />

        <View
          style={{
            marginTop: 20,
          }}
        >

          <RetailerAccountCard
            advancePaid={500}
            invoiceAmount={
              dashboard?.invoiceAmount || 0
            }
            amountPaid={
              dashboard?.amountPaid || 0
            }
            paymentStatus={
              dashboard?.paymentStatus ||
              "Paid"
            }
            onViewDetails={() =>
              navigation.navigate(
                "Business"
              )
            }
          />

        </View>

        <QuickActionsSection
          onShops={() =>
            navigation.navigate(
              "Profile",
              {
                screen: "MyShops",
              }
            )
          }
          onOrders={() =>
            navigation.navigate(
              "Orders"
            )
          }
          onBills={() =>
            navigation.navigate(
              "Business"
            )
          }
          onProfile={() =>
            navigation.navigate(
              "Profile"
            )
          }
        />

        <OrdersSection
          orders={
            dashboard?.recentOrders ||
            []
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

      <SideDrawer
        visible={drawerVisible}
        shopName={
          dashboard?.shopName ||
          "Retailer"
        }
        retailerId={
          dashboard?.retailerId ||
          "CB-000001"
        }

        onClose={() =>
          setDrawerVisible(false)
        }

        onDashboard={() =>
          setDrawerVisible(false)
        }

        onShops={() => {
          setDrawerVisible(false);

          navigation.navigate(
            "Profile",
            {
              screen: "MyShops",
            }
          );
        }}

        onOrders={() => {
          setDrawerVisible(false);

          navigation.navigate(
            "Orders"
          );
        }}

        onBusiness={() => {
          setDrawerVisible(false);

          navigation.navigate(
            "Business"
          );
        }}

        onPayments={() => {
          setDrawerVisible(false);

          navigation.navigate(
            "Business"
          );
        }}

        onNotifications={() => {
          setDrawerVisible(false);

          navigation.navigate(
            "Activity"
          );
        }}

        onProfile={() => {
          setDrawerVisible(false);

          navigation.navigate(
            "Profile"
          );
        }}

        onHelp={() =>
          setDrawerVisible(false)
        }

        onSettings={() =>
          setDrawerVisible(false)
        }

        onLogout={async () => {

          setDrawerVisible(false);

          await logout();

        }}
      />

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
      paddingHorizontal: 18,
      paddingTop: 12,
      paddingBottom: 120,
    },

  });