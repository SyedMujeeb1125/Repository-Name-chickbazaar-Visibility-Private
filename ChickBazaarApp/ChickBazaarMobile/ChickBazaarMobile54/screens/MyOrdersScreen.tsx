import React, {
  useEffect,
  useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

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

  function renderStatus(
    currentStatus: string
  ) {
    const currentIndex =
      statuses.indexOf(
        currentStatus
      );

    return statuses.map(
      (status, index) => (
        <View
          key={status}
          style={
            styles.statusRow
          }
        >
          <Text
            style={
              styles.statusIcon
            }
          >
            {index <=
            currentIndex
              ? "🟠"
              : "⚪"}
          </Text>

          <Text
            style={{
              fontWeight:
                index ===
                currentIndex
                  ? "700"
                  : "400",
              color:
                "#334155",
            }}
          >
            {status
              .charAt(0)
              .toUpperCase() +
              status.slice(1)}
          </Text>
        </View>
      )
    );
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
                <Text
                  style={
                    styles.orderNumber
                  }
                >
                  {
                    item.orderNumber
                  }
                </Text>

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

              <Text
                style={
                  styles.detail
                }
              >
                ⚖️ Weight:
                {" "}
                {
                  item.requestedWeight
                }
                kg
              </Text>

              <Text
                style={
                  styles.detail
                }
              >
                💰 Amount:
                ₹
                {item.estimatedAmount ||
                  0}
              </Text>

              <Text style={styles.detail}>
  📅 Ordered:
  {" "}
  {new Date(
    item.createdAt
  ).toLocaleDateString()}
</Text>

<Text style={styles.detail}>
  🚚 Delivery:
  {" "}
  {item.deliveryDate || "Today"}
</Text>

{!!item.shopName && (
  <Text style={styles.detail}>
    🏪 Shop:
    {" "}
    {item.shopName}
  </Text>
)}

              <View
                style={
                  styles.statusContainer
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

    statusRow: {
      flexDirection: "row",
      alignItems:
        "center",
      marginBottom: 4,
    },

    statusIcon: {
      marginRight: 8,
    },
  });