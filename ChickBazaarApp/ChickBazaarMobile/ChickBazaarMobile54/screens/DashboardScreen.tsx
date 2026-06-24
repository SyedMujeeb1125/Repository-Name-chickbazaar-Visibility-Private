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
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";

export default function DashboardScreen({
  navigation,
}: any) {
  const [dashboard, setDashboard] =
    useState<any>(null);

  useEffect(() => {
    loadDashboard();

    const timer = setInterval(() => {
      loadDashboard();
    }, 30000);

    return () =>
      clearInterval(timer);
  }, []);

  async function loadDashboard() {
    const mobile =
      await AsyncStorage.getItem(
        "retailerMobile"
      );

    const response =
      await fetch(
        `https://www.chickbazaar.com/api/mobile/dashboard?mobile=${mobile}`
      );

    const data =
      await response.json();

    setDashboard(data);
  }

  return (
    <SafeAreaView
      style={styles.safeArea}
    >
      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.container
        }
      >
        <Image
          source={require("../assets/logo.png")}
          style={styles.logo}
        />

        <Text style={styles.welcome}>
          Welcome Back
        </Text>

        <Text style={styles.shopName}>
  {dashboard?.shopName ||
    "Retailer"}
</Text>

<View
  style={styles.statCard}
>
  <Text
    style={styles.statLabel}
  >
    Today's Live Rate
  </Text>

  <Text
    style={styles.statValue}
  >
    ₹
    {(
      dashboard?.todayRate ||
      0
    ).toLocaleString()}
    {" "} / KG
  </Text>
</View>

<View
  style={styles.creditCard}
>
          <Text
            style={
              styles.creditTitle
            }
          >
            Available Credit
          </Text>

          <Text
            style={
              styles.creditAmount
            }
          >
            ₹
            {(
              dashboard?.availableCredit ||
              0
            ).toLocaleString()}
          </Text>
        </View>

        <View
          style={styles.statsRow}
        >
          <View
            style={
              styles.statCard
            }
          >
            <Text
              style={
                styles.statLabel
              }
            >
              Orders
            </Text>

            <Text
              style={
                styles.statValue
              }
            >
              {dashboard?.totalOrders ||
                0}
            </Text>
          </View>

          <View
            style={
              styles.statCard
            }
          >
            <Text
              style={
                styles.statLabel
              }
            >
              Pending
            </Text>

            <Text
              style={
                styles.statValue
              }
            >
              {dashboard?.pendingOrders ||
                0}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.menuCard}
          onPress={() =>
            navigation.navigate(
              "PlaceOrder"
            )
          }
        >
          <Text
            style={
              styles.menuText
            }
          >
            📦 Order Chicken
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuCard}
          onPress={() =>
            navigation.navigate(
              "MyOrders"
            )
          }
        >
          <Text
            style={
              styles.menuText
            }
          >
            📋 My Orders
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuCard}
          onPress={() =>
            navigation.navigate(
              "Outstanding"
            )
          }
        >
          <Text
            style={
              styles.menuText
            }
          >
            💳 Outstanding
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuCard}
          onPress={() =>
            navigation.navigate(
              "Payments"
            )
          }
        >
          <Text
            style={
              styles.menuText
            }
          >
            💰 Payments
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuCard}
          onPress={() =>
            navigation.navigate(
              "Profile"
            )
          }
        >
          <Text
            style={
              styles.menuText
            }
          >
            👤 Profile
          </Text>
        </TouchableOpacity>
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

    container: {
      padding: 20,
      paddingBottom: 40,
    },

    logo: {
      width: 220,
      height: 90,
      resizeMode: "contain",
      alignSelf: "center",
      marginBottom: 10,
    },

    welcome: {
      fontSize: 16,
      color: "#64748B",
      textAlign: "center",
    },

    shopName: {
      fontSize: 26,
      fontWeight: "700",
      textAlign: "center",
      marginBottom: 20,
      color: "#0F172A",
    },

    creditCard: {
      backgroundColor:
        "#F97316",
      borderRadius: 20,
      padding: 20,
      marginBottom: 15,
    },

    creditTitle: {
      color: "#FFF",
      fontSize: 14,
    },

    creditAmount: {
      color: "#FFF",
      fontSize: 32,
      fontWeight: "700",
      marginTop: 5,
    },

    statsRow: {
      flexDirection: "row",
      justifyContent:
        "space-between",
      marginBottom: 20,
    },

    statCard: {
      width: "48%",
      backgroundColor:
        "#FFF",
      borderRadius: 16,
      padding: 18,
      elevation: 2,
    },

    statLabel: {
      color: "#64748B",
      fontSize: 14,
    },

    statValue: {
      fontSize: 28,
      fontWeight: "700",
      color: "#0F172A",
      marginTop: 8,
    },

    menuCard: {
      backgroundColor:
        "#FFF",
      borderRadius: 16,
      padding: 18,
      marginBottom: 12,
      elevation: 2,
    },

    menuText: {
      fontSize: 16,
      fontWeight: "600",
      color: "#0F172A",
    },
  });