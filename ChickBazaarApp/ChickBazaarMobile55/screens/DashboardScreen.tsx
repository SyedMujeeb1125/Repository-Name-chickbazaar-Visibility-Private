import React, {
  useEffect,
  useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  Alert,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

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

    const [placingRepeatOrder, setPlacingRepeatOrder] =
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
    `http://10.144.143.74:3000/api/mobile/dashboard?mobile=${mobile}`
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

  async function repeatOrderNow() {

  try {

    setPlacingRepeatOrder(true);

    const mobile =
      await AsyncStorage.getItem(
        "retailerMobile"
      );

    if (!mobile) {
      return;
    }

    const response =
      await fetch(
        "http://10.144.143.74:3000/api/mobile/repeat-order",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({

            mobile,

            weight:
              dashboard.repeatOrder.weight,

          }),

        }
      );

    const result =
      await response.json();

    console.log(
      "Repeat Order Result:",
      result
    );

    if (result.success) {

  await loadDashboard();

  Alert.alert(
    "Order Placed",
    "Your repeat order has been placed successfully."
  );

} else {

  Alert.alert(
    "Unable to Place Order",
    result.message || "Please try again."
  );

}

  } catch (err) {

  console.log(err);

}

finally {

  setPlacingRepeatOrder(false);

}

}

  if (loading) {
    return <LoadingView />;
  }

  const currentHour =
    new Date().getHours();

  let dashboardState =
    DashboardState.NO_ORDER;

  if (dashboard?.currentDelivery) {

    switch (
      dashboard.currentDelivery.status
    ) {

      case "new":
      case "confirmed":
        dashboardState =
          DashboardState.ORDER_CONFIRMED;
        break;

      case "allocated":
        dashboardState =
          DashboardState.FARM_ALLOCATED;
        break;

      case "preparing":
        dashboardState =
          DashboardState.PREPARING;
        break;

      case "vehicle_assigned":
        dashboardState =
          DashboardState.VEHICLE_ASSIGNED;
        break;

      case "out_for_delivery":
        dashboardState =
          DashboardState.OUT_FOR_DELIVERY;
        break;

      case "delivered":
      case "completed":
        dashboardState =
          DashboardState.DELIVERED;
        break;

      default:
        dashboardState =
          DashboardState.NO_ORDER;

    }

  } else if (
    currentHour >= 11 &&
    currentHour < 18
  ) {

    dashboardState =
      DashboardState.AFTER_CUTOFF;

  }

  if (
  dashboard?.repeatOrder?.available
) {

  dashboardState =
    DashboardState.REPEAT_ORDER_AVAILABLE;

}

console.log(
  "Repeat Order:",
  dashboard?.repeatOrder
);

console.log(
  "Dashboard State:",
  dashboardState
);

  return (

    <SafeAreaView
  style={styles.safeArea}
  edges={["top"]}
>

      <ImageBackground
        source={require("../assets/dashboard-bg.png")}
        resizeMode="cover"
        style={{ flex: 1 }}
        imageStyle={{
          opacity: 0.50,
        }}
      >

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            styles.container
          }
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
              navigation.navigate(
                "Activity"
              )
            }
          />

          <LiveRateCard
            rate={Number(
              dashboard?.todayRate ||
                150
            )}
          />

          <DashboardHeroRenderer
  state={dashboardState}

  repeatOrder={dashboard?.repeatOrder}

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

  onRepeatOrder={repeatOrderNow}

  placingRepeatOrder={
  placingRepeatOrder
}

  onChangeQuantity={() =>
    navigation.navigate("Order")
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
                dashboard?.invoiceAmount ||
                0
              }
              amountPaid={
                dashboard?.amountPaid ||
                0
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
            onOrderPress={(
              orderId
            ) =>
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
          visible={
            drawerVisible
          }
          shopName={
            dashboard?.shopName ||
            "Retailer"
          }
          retailerId={
            dashboard?.retailerId ||
            "CB-000001"
          }

          onClose={() =>
            setDrawerVisible(
              false
            )
          }

          onDashboard={() =>
            setDrawerVisible(
              false
            )
          }

          onShops={() => {

            setDrawerVisible(
              false
            );

            navigation.navigate(
              "Profile",
              {
                screen:
                  "MyShops",
              }
            );

          }}

          onOrders={() => {

            setDrawerVisible(
              false
            );

            navigation.navigate(
              "Orders"
            );

          }}

          onBusiness={() => {

            setDrawerVisible(
              false
            );

            navigation.navigate(
              "Business"
            );

          }}

          onPayments={() => {

            setDrawerVisible(
              false
            );

            navigation.navigate(
              "Business"
            );

          }}

          onNotifications={() => {

            setDrawerVisible(
              false
            );

            navigation.navigate(
              "Activity"
            );

          }}

          onProfile={() => {

            setDrawerVisible(
              false
            );

            navigation.navigate(
              "Profile"
            );

          }}

          onHelp={() =>
            setDrawerVisible(
              false
            )
          }

          onSettings={() =>
            setDrawerVisible(
              false
            )
          }

          onLogout={async () => {

            setDrawerVisible(
              false
            );

            await logout();

          }}
        />

      </ImageBackground>

    </SafeAreaView>

  );

}

const styles =
  StyleSheet.create({

    safeArea: {
      flex: 1,
      backgroundColor:
        "#FFF8F2",
    },

    container: {
      paddingHorizontal: 10,
      paddingTop: 10,
      paddingBottom: 120,
    },

  });