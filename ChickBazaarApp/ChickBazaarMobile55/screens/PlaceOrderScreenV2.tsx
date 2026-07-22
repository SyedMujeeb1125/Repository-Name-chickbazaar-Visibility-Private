import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import DeliveryShopSection from "../components/place-order-v2/DeliveryShopSection";
import EstimateSection from "../components/place-order-v2/EstimateSection";
import LiveRateSection from "../components/place-order-v2/LiveRateSection";
import OrderMethodSection, {
  OrderMethod,
} from "../components/place-order-v2/OrderMethodSection";
import QuantitySection from "../components/place-order-v2/QuantitySection";
import ReviewBar from "../components/place-order-v2/ReviewBar";
import BottomSheet from "../components/ui/BottomSheet";

import { getTodayRate } from "../services/rateService";
import { getShops } from "../services/shopService";

export default function PlaceOrderScreenV2({ navigation }: any) {
  const [selectedShop, setSelectedShop] = useState<any>(null);
  const [showShopSheet, setShowShopSheet] = useState(false);

  const [todayRate, setTodayRate] = useState(0);
  const [method, setMethod] = useState<OrderMethod>("weight");
  const [quantity, setQuantity] = useState(100);
  const [shops, setShops] = useState<any[]>([]);

  const ORDER_CUTOFF_HOUR = 19;

const now = new Date();

const deliveryDate = new Date(now);

if (now.getHours() >= ORDER_CUTOFF_HOUR) {
  deliveryDate.setDate(deliveryDate.getDate() + 1);
}

const formattedDeliveryDate =
  deliveryDate.toISOString().split("T")[0];

  const [fulfilmentPreference] = useState("closest");

  const advanceRequired = 500;

  const currentHour = new Date().getHours();

  const deliveryPriority =
    currentHour < 11
      ? "regular"
      : currentHour < 18
      ? "express"
      : "tomorrow";

  const estimatedAmount = quantity * todayRate;

  useEffect(() => {
    async function loadData() {
      try {
        const mobile = await AsyncStorage.getItem("retailerMobile");

        if (!mobile) {
          return;
        }

        // Load Shops
        const shopsResponse = await getShops(mobile);

        const shopList =
          shopsResponse?.shops ??
          shopsResponse?.data ??
          shopsResponse ??
          [];

        setShops(shopList);

        if (shopList.length > 0) {
          setSelectedShop(shopList[0]);
        }

        // Load Live Rate separately
        try {
          const rateResponse = await getTodayRate();

          const rate = Number(
            rateResponse?.todayRate ??
              rateResponse?.rate ??
              rateResponse?.price ??
              0
          );

          setTodayRate(rate);

          console.log("Today's Rate:", rate);
        } catch (error) {
          console.log("Rate API failed:", error);
          setTodayRate(0);
        }

        console.log("Shops:", shopList);
      } catch (error) {
        console.error("Failed to load place order data", error);
      }
    }

    loadData();
  }, []);

  const reviewOrder = async () => {
  if (!selectedShop) {
    return;
  }

  const retailerId =
    await AsyncStorage.getItem("retailerId");

  navigation.navigate("ReviewOrder", {
    selectedShop,
    todayRate,
    quantity,
    estimatedAmount,
    advanceRequired,
    deliveryDate: formattedDeliveryDate,
    notes: "",
    orderType: method,
    deliveryPriority,
    fulfilmentPreference,
    retailerId,
  });
};

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Place Order</Text>

          <Text style={styles.subtitle}>
  {currentHour >= ORDER_CUTOFF_HOUR
    ? "Book healthy live broiler chicken for tomorrow's delivery."
    : "Order healthy live broiler chicken for today's delivery."}
</Text>
        </View>

        <LiveRateSection
          rate={todayRate}
          lastUpdated="Updated just now"
        />

        <DeliveryShopSection
          shopName={
            selectedShop?.shop_name ??
            selectedShop?.shopName ??
            "Select Delivery Shop"
          }
          address={
            selectedShop?.address ??
            "No shop selected"
          }
          onChange={() => setShowShopSheet(true)}
        />

        <OrderMethodSection
          value={method}
          onChange={setMethod}
        />

        <QuantitySection
          selected={quantity}
          onSelect={setQuantity}
        />

        <EstimateSection
          quantity={quantity}
          rate={todayRate}
          estimatedAmount={estimatedAmount}
        />

        <View style={{ height: 120 }} />
      </ScrollView>

      <BottomSheet
        visible={showShopSheet}
        title="Choose Delivery Shop"
        selectedId={selectedShop?.id}
        items={shops.map((shop) => ({
          id: shop.id,
          title: shop.shop_name ?? shop.shopName,
          subtitle: shop.address,
        }))}
        onClose={() => setShowShopSheet(false)}
        onSelect={(id) => {
          const shop = shops.find(
            (item) => item.id === id
          );

          if (shop) {
            setSelectedShop(shop);
          }

          setShowShopSheet(false);
        }}
      />

      <ReviewBar
  amount={estimatedAmount}
  onPress={reviewOrder}
/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  content: {
    padding: 20,
    paddingBottom: 30,
  },

  header: {
    marginBottom: 24,
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#111827",
  },

  subtitle: {
    marginTop: 8,
    fontSize: 16,
    color: "#6B7280",
    lineHeight: 24,
  },
});