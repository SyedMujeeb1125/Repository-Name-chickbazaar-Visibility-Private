import React, {
  useCallback,
  useEffect,
  useState,
} from "react";

import { useFocusEffect } from "@react-navigation/native";

import {
  Alert,
  ImageBackground,
  RefreshControl,
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

import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "../config/api";
import Api from "../services/api";
import SessionService from "../services/session";


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

const [refreshing, setRefreshing] =
  useState(false);

const { logout } =
  useAuth();

  useEffect(() => {
  loadDashboard(true);

  const timer = setInterval(() => {
    loadDashboard(false);
  }, 60000);


  return () => clearInterval(timer);
}, []);

  useFocusEffect(
  useCallback(() => {
    loadDashboard(false);
  }, [])
);

  async function loadDashboard(
  showLoader = false
) {
  
  if (showLoader) {
    setLoading(true);
  }

  
  try {
    const retailer =
      await SessionService.getRetailer<{
        mobile: string;
      }>();

    if (!retailer?.mobile) {
            return;
    }


    const data =
      await Api.get<any>(
        `${API.DASHBOARD.GET}?mobile=${encodeURIComponent(
          retailer.mobile
        )}`
      );

    

    setDashboard(data);

    if (data?.retailerId) {
  await AsyncStorage.setItem(
    "retailerId",
    data.retailerId
  );
}
  } catch (error) {
    
    const message =
  error instanceof Error
    ? error.message.toLowerCase()
    : "";

  if (
    message.includes("network") ||
    message.includes("fetch")
  ) {
    Alert.alert(
      "No Internet Connection",
      "Please check your internet connection and pull down to refresh."
    );
  } else if (
    message.includes("timeout")
  ) {
    Alert.alert(
      "Request Timed Out",
      "The server is taking longer than expected. Please try again."
    );
  } else {
    Alert.alert(
      "Unable to Load Dashboard",
      "Something went wrong. Please try again."
    );
  }
} finally {
    if (showLoader) {
      setLoading(false);
    }
  }
}

  async function repeatOrderNow() {

  try {

    setPlacingRepeatOrder(true);

    const retailer =
  await SessionService.getRetailer<{
    mobile: string;
  }>();

const mobile = retailer?.mobile;

if (!mobile) {
  return;
}

    const result =
  await Api.post<any>(
    "/mobile/repeat-order",
    {
      mobile,
      weight:
        dashboard.repeatOrder.weight,
    }
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

  } catch (error) {
  Alert.alert(
    "Unable to Place Order",
    "Please try again."
  );
}

finally {

  setPlacingRepeatOrder(false);

}

}

const onRefresh = async () => {
  try {
    setRefreshing(true);
    await loadDashboard(false);
  } finally {
    setRefreshing(false);
  }
};

  if (loading) {
    return <LoadingView />;
  }

  const dashboardState = dashboard?.businessStatus;

  const currentHour = new Date().getHours();

const rateMode =
  currentHour >= 19
    ? "tomorrow"
    : currentHour <= 17
    ? "today"
    : "publishing";

const deliveryDate =
  rateMode === "tomorrow"
    ? "Tomorrow's Delivery"
    : "Today's Delivery";

const updatedAt =
  rateMode === "publishing"
    ? "Publishing at 7:00 PM"
    : "Updated • 7:00 PM";

    const activeOrder = dashboard?.recentOrders?.find(
  (order: any) =>
    order.order_number === dashboard?.currentDelivery?.orderNumber
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
  contentContainerStyle={styles.container}
  refreshControl={
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      colors={["#F97316"]}
      tintColor="#F97316"
    />
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
  mode={rateMode}
  rate={
    rateMode === "tomorrow"
      ? Number(dashboard?.tomorrowRate ?? dashboard?.todayRate ?? 150)
      : Number(dashboard?.todayRate ?? 150)
  }
/>

          <DashboardHeroRenderer
  state={dashboardState}

  account={dashboard?.account}

  repeatOrder={dashboard?.repeatOrder}

  deliveryStatus={
    dashboard?.currentDelivery?.status
  }

  orderWeight={
    dashboard?.currentDelivery?.requestedWeight ??
    activeOrder?.requested_weight
  }

  rate={
    activeOrder?.rate_per_kg
  }

  estimatedAmount={
    dashboard?.currentDelivery?.estimatedAmount ??
    activeOrder?.estimated_amount
  }

  deliveryWindow={
    dashboard?.currentDelivery?.deliveryWindow ??
    "Today's Delivery"
  }

  driverName={
    dashboard?.currentDelivery?.captain
  }

  driverPhone={
    dashboard?.currentDelivery?.driverPhone
  }

  vehicleNumber={
    dashboard?.currentDelivery?.vehicle ??
    activeOrder?.assigned_vehicle
  }

  eta={
    dashboard?.currentDelivery?.eta
  }

  onPlaceOrder={() =>
    navigation.navigate("Order")
  }

  onTrackOrder={() => {
    if (activeOrder?.id) {
      navigation.navigate("OrderDetails", {
        orderId: activeOrder.id,
      });
    } else {
      navigation.navigate("Orders");
    }
  }}

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
    invoiceAmount={
      dashboard?.account?.currentBill ?? 0
    }
    amountPaid={
      dashboard?.account?.amountPaid ?? 0
    }
    outstanding={
      dashboard?.account?.balanceDue ?? 0
    }
  />
</View>

<View
  style={{
    marginTop: 28,
  }}
>
  <QuickActionsSection
    onShops={() =>
      navigation.navigate("Profile", {
        screen: "MyShops",
      })
    }
    onOrders={() =>
      navigation.navigate("Orders")
    }
    onBills={() =>
      navigation.navigate("Business")
    }
    onProfile={() =>
      navigation.navigate("Profile")
    }
  />
</View>

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