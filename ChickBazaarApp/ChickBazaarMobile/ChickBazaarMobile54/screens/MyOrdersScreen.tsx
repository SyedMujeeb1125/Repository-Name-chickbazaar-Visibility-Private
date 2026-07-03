import React, {
  useEffect,
  useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import OrderProgress from "../components/orders/OrderProgress";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function MyOrdersScreen({
  navigation,
}: any) {
  const [orders, setOrders] =
    useState<any[]>([]);

  useEffect(() => {
    loadOrders();

    const timer =
      setInterval(() => {
        loadOrders();
      }, 30000);

    return () =>
      clearInterval(timer);
  }, []);

  async function loadOrders() {
    const mobile =
      await AsyncStorage.getItem(
        "retailerMobile"
      );

    const response =
      await fetch(
        `https://www.chickbazaar.com/api/mobile/my-orders?mobile=${mobile}`
      );

    const data =
      await response.json();

    setOrders(data);
  }

  return (
    <SafeAreaView
      style={
        styles.safeArea
      }
    >
      <View
        style={
          styles.container
        }
      >
        <Text
          style={
            styles.title
          }
        >
          My Orders
        </Text>

        <FlatList
          data={orders}
          showsVerticalScrollIndicator={
            false
          }
          keyExtractor={(
            item
          ) => item.id}
          renderItem={({
            item,
          }) => (
            <TouchableOpacity
              style={
                styles.card
              }
              onPress={() =>
                navigation.navigate(
                  "OrderDetails",
                  {
                    orderId:
                      item.id,
                  }
                )
              }
            >
              <View
                style={
                  styles.headerRow
                }
              >
                <View>

  <Text
    style={styles.orderNumber}
  >
    {item.orderNumber}
  </Text>

  <Text
    style={styles.orderDate}
  >
    {new Date(
      item.createdAt
    ).toLocaleDateString()}
  </Text>

</View>

                <View
  style={[
    styles.badge,
    item.status === "delivered"
      ? styles.badgeGreen
      : item.status === "dispatched"
      ? styles.badgeBlue
      : styles.badgeOrange,
  ]}
>
  <Text
    style={styles.badgeText}
  >
    {item.status}
  </Text>
</View>
              </View>

              <Text style={styles.detail}>

{item.orderBy === "birds"
  ? `🐔 ${item.birds} Birds`
  : `⚖ ${item.requestedWeight} KG`}

</Text>

              <View style={styles.amountRow}>

<Text style={styles.amountLabel}>
Estimated Bill
</Text>

<Text style={styles.amountValue}>

₹
{Number(
item.estimatedAmount || 0
).toLocaleString()}

</Text>

</View>

              <Text style={styles.deliveryText}>

🚚 Delivery

{" "}

{item.deliveryDate || "Today"}

</Text>

{!!item.shopName && (

<View style={styles.shopRow}>

<Text style={styles.shopLabel}>
Shop
</Text>

<Text style={styles.shopValue}>
{item.shopName}
</Text>

</View>

)}

              <View style={styles.statusContainer}>

  <OrderProgress
    status={item.status}
  />

</View>
            </TouchableOpacity>
          )}
        />
      </View>
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
      flex: 1,
      padding: 20,
    },

    title: {
      fontSize: 30,
      fontWeight: "700",
      color: "#0F172A",
      marginBottom: 20,
    },

    card: {
      backgroundColor:
        "#FFFFFF",
      borderRadius: 20,
      padding: 18,
      marginBottom: 16,
      elevation: 3,
    },

    headerRow: {
      flexDirection: "row",
      justifyContent:
        "space-between",
      alignItems:
        "center",
      marginBottom: 12,
    },

    orderNumber: {
      fontSize: 18,
      fontWeight: "700",
      color: "#0F172A",
    },

    badge: {
  paddingHorizontal: 10,
  paddingVertical: 5,
  borderRadius: 20,
},

badgeOrange: {
  backgroundColor: "#F97316",
},

badgeBlue: {
  backgroundColor: "#2563EB",
},

badgeGreen: {
  backgroundColor: "#16A34A",
},

    badgeText: {
      color: "#FFF",
      fontSize: 12,
      fontWeight: "700",
      textTransform:
        "capitalize",
    },

    detail: {
      fontSize: 15,
      color: "#475569",
      marginBottom: 6,
    },

    statusContainer: {
      marginTop: 12,
      borderTopWidth: 1,
      borderTopColor:
        "#E2E8F0",
      paddingTop: 12,
    },

    orderDate: {
  marginTop: 4,
  fontSize: 13,
  color: "#94A3B8",
},

deliveryText: {
  marginTop: 10,
  fontWeight: "600",
  color: "#2563EB",
},

amountRow: {
  marginTop: 10,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
},

amountLabel: {
  color: "#64748B",
  fontSize: 14,
},

amountValue: {
  fontSize: 24,
  fontWeight: "700",
  color: "#F97316",
},

shopRow: {
  marginTop: 8,
  flexDirection: "row",
  justifyContent: "space-between",
},

shopLabel: {
  color: "#64748B",
},

shopValue: {
  fontWeight: "700",
  color: "#0F172A",
},
  });