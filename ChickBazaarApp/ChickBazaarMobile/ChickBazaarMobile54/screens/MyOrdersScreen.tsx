import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";

export default function MyOrdersScreen() {
  const [orders, setOrders] =
    useState<any[]>([]);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    const response =
      await fetch(
        "https://www.chickbazaar.com/api/mobile/my-orders?mobile=9353956243"
      );

    const data =
      await response.json();

    setOrders(data);
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
          <View style={styles.card}>
            <Text>
              {item.orderNumber}
            </Text>

            <Text>
              Status:
              {" "}
              {item.status}
            </Text>

            <Text>
              Weight:
              {" "}
              {item.requestedWeight}
              kg
            </Text>
          </View>
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
      marginBottom: 10,
    },
  });