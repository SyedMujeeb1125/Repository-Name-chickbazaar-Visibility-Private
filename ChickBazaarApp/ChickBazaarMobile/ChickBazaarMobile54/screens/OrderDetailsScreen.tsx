import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function OrderDetailsScreen({
  route,
}: any) {
  const { orderId } = route.params;

  const [order, setOrder] =
    useState<any>(null);

  useEffect(() => {
    loadOrder();
  }, []);

  async function loadOrder() {
    const response =
      await fetch(
        `https://www.chickbazaar.com/api/mobile/order-details?orderId=${orderId}`
      );

    const data =
      await response.json();

    setOrder(data);
  }

  if (!order) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={
        styles.container
      }
    >
      <Text style={styles.title}>
        {order.orderNumber}
      </Text>

      <Text>
        Status: {order.status}
      </Text>

      <Text>
        Requested Weight:{" "}
        {order.requestedWeight} kg
      </Text>

      <Text>
        Estimated Amount: ₹
        {order.estimatedAmount}
      </Text>

      <Text>
        Delivery Date:{" "}
        {order.deliveryDate}
      </Text>

      <Text style={styles.section}>
        Farm
      </Text>

      <Text>
        {order.assignedFarm ||
          "Not Assigned"}
      </Text>

      <Text style={styles.section}>
        Driver
      </Text>

      <Text>
        {order.assignedDriver ||
          "Not Assigned"}
      </Text>

      <Text style={styles.section}>
        Vehicle
      </Text>

      <Text>
        {order.assignedVehicle ||
          "Not Assigned"}
      </Text>

      <Text style={styles.section}>
        Tracking Notes
      </Text>

      <Text>
        {order.trackingNotes ||
          "No updates yet"}
      </Text>
    </ScrollView>
  );
}

const styles =
  StyleSheet.create({
    container: {
      padding: 20,
    },

    title: {
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 20,
    },

    section: {
      marginTop: 20,
      fontWeight: "bold",
      fontSize: 16,
    },
  });