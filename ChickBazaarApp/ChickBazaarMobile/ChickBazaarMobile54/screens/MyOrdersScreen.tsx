import React, {
  useEffect,
  useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const statuses = [
  "new",
  "confirmed",
  "procured",
  "dispatched",
  "delivered",
];

export default function MyOrdersScreen({
  navigation,
}: any) {
  const [orders, setOrders] =
    useState<any[]>([]);

  useEffect(() => {
  loadOrders();

  const timer = setInterval(() => {
    loadOrders();
  }, 30000);

  return () => clearInterval(timer);
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

  function renderStatus(
  currentStatus: string
) {
  const currentIndex =
    statuses.indexOf(
      currentStatus
    );

  return statuses.map(
    (status, index) => {
      let icon = "⚪";

      if (status === "new")
        icon = "🟡";

      if (status === "confirmed")
        icon = "🟠";

      if (status === "procured")
        icon = "🔵";

      if (status === "dispatched")
        icon = "🟣";

      if (status === "delivered")
        icon = "🟢";

      return (
        <Text
          key={status}
          style={{
            fontSize: 14,
            marginTop: 3,
            fontWeight:
              index === currentIndex
                ? "bold"
                : "normal",
          }}
        >
          {index <= currentIndex
            ? icon
            : "⚪"}{" "}
          {status
            .charAt(0)
            .toUpperCase() +
            status.slice(1)}
        </Text>
      );
    }
  );
}

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        My Orders
      </Text>

      <FlatList
        data={orders}
        keyExtractor={(item) =>
          item.id
        }
        renderItem={({ item }) => (
          <TouchableOpacity
  style={styles.card}
  onPress={() =>
    navigation.navigate(
      "OrderDetails",
      {
        orderId: item.id,
      }
    )
  }
>
            <Text
              style={
                styles.orderNumber
              }
            >
              {item.orderNumber}
            </Text>

            <Text>
              Weight:{" "}
              {item.requestedWeight}
              kg
            </Text>

            <Text>
              Amount: ₹
              {item.estimatedAmount ||
                0}
            </Text>

            <Text>
              Date:{" "}
              {new Date(
                item.createdAt
              ).toLocaleDateString()}
            </Text>

            <View
              style={
                styles.statusBox
              }
            >
              {renderStatus(
                item.status
              )}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#fff",
    },

    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
    },

    card: {
      padding: 15,
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 10,
      marginBottom: 12,
    },

    orderNumber: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 8,
    },

    statusBox: {
      marginTop: 10,
    },
  });