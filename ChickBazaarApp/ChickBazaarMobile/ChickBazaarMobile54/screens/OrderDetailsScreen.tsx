import React, {
  useEffect,
  useState,
} from "react";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

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
      <SafeAreaView
        style={styles.loadingContainer}
      >
        <Text>
          Loading...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={styles.safeArea}
    >
      <ScrollView
        contentContainerStyle={
          styles.container
        }
        showsVerticalScrollIndicator={
          false
        }
      >
        <View
          style={styles.orderCard}
        >
          <Text
            style={styles.orderNumber}
          >
            {order.orderNumber}
          </Text>

          <View
            style={styles.badge}
          >
            <Text
              style={
                styles.badgeText
              }
            >
              {order.status}
            </Text>
          </View>

          <Text
            style={styles.info}
          >
            ⚖️ Weight:
            {" "}
            {order.requestedWeight}
            kg
          </Text>

          <Text
            style={styles.info}
          >
            💰 Amount: ₹
            {
              order.estimatedAmount
            }
          </Text>

          <Text
            style={styles.info}
          >
            📅 Delivery:
            {" "}
            {
              order.deliveryDate
            }
          </Text>
        </View>

        <View
          style={styles.card}
        >
          <Text
            style={
              styles.cardTitle
            }
          >
            🏡 Assigned Farm
          </Text>

          <Text
            style={
              styles.cardValue
            }
          >
            {order.assignedFarm ||
              "Not Assigned"}
          </Text>
        </View>

        <View
          style={styles.card}
        >
          <Text
            style={
              styles.cardTitle
            }
          >
            🚚 Driver
          </Text>

          <Text
            style={
              styles.cardValue
            }
          >
            {order.assignedDriver ||
              "Not Assigned"}
          </Text>
        </View>

        <View
          style={styles.card}
        >
          <Text
            style={
              styles.cardTitle
            }
          >
            🚛 Vehicle
          </Text>

          <Text
            style={
              styles.cardValue
            }
          >
            {order.assignedVehicle ||
              "Not Assigned"}
          </Text>
        </View>

        <View
          style={styles.card}
        >
          <Text
            style={
              styles.cardTitle
            }
          >
            📍 Tracking Notes
          </Text>

          <Text
            style={
              styles.cardValue
            }
          >
            {order.trackingNotes ||
              "No updates yet"}
          </Text>
        </View>
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

    loadingContainer: {
      flex: 1,
      justifyContent:
        "center",
      alignItems:
        "center",
    },

    container: {
      padding: 20,
      paddingBottom: 40,
    },

    orderCard: {
      backgroundColor:
        "#F97316",
      borderRadius: 20,
      padding: 20,
      marginBottom: 18,
    },

    orderNumber: {
      fontSize: 22,
      fontWeight: "700",
      color: "#FFFFFF",
      marginBottom: 10,
    },

    badge: {
      alignSelf: "flex-start",
      backgroundColor:
        "#FFFFFF",
      borderRadius: 20,
      paddingHorizontal: 12,
      paddingVertical: 5,
      marginBottom: 12,
    },

    badgeText: {
      color: "#F97316",
      fontWeight: "700",
      textTransform:
        "capitalize",
    },

    info: {
      color: "#FFFFFF",
      fontSize: 15,
      marginBottom: 6,
    },

    card: {
      backgroundColor:
        "#FFFFFF",
      borderRadius: 18,
      padding: 18,
      marginBottom: 12,
      elevation: 2,
    },

    cardTitle: {
      fontSize: 16,
      fontWeight: "700",
      color: "#0F172A",
      marginBottom: 8,
    },

    cardValue: {
      fontSize: 15,
      color: "#475569",
    },
  });