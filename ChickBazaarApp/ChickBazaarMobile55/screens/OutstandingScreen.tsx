import React, {
  useEffect,
  useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import OutstandingCard from "../components/payments/OutstandingCard";
import TransactionCard from "../components/payments/TransactionCard";

export default function OutstandingScreen({
  navigation,
}: any) {

  const [retailer, setRetailer] =
    useState<any>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {

    try {

      const mobile =
        await AsyncStorage.getItem(
          "retailerMobile"
        );

      const response =
        await fetch(
          `https://www.chickbazaar.com/api/mobile/outstanding?mobile=${mobile}`
        );

      const data =
        await response.json();

      setRetailer(data);

    } catch (err) {

      console.log(err);

    }

  }

  if (!retailer) {

    return (

      <SafeAreaView
        style={styles.loadingContainer}
      >

        <MaterialCommunityIcons
          name="wallet-outline"
          size={60}
          color="#F97316"
        />

        <Text style={styles.loadingTitle}>
          Loading Business
        </Text>

        <Text style={styles.loadingText}>
          Please wait while we fetch your
          business information.
        </Text>

      </SafeAreaView>

    );

  }

  const outstanding =
    Number(retailer.outstanding || 0);

  const totalOrders =
    Number(
      retailer.totalOrders ??
      retailer.orders ??
      retailer.orderCount ??
      0
    );

  const purchasedKg =
    Number(
      retailer.totalKg ??
      retailer.purchasedKg ??
      retailer.totalQuantity ??
      0
    );

  const totalPaid =
    Number(
      retailer.totalPaid ??
      retailer.amountPaid ??
      0
    );

  return (

    <SafeAreaView
  style={styles.safeArea}
  edges={["top"]}
>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >

        <Text style={styles.title}>
          Business Overview
        </Text>

        <Text style={styles.subtitle}>
          Track your outstanding balance,
          payments and purchase history.
        </Text>

        <OutstandingCard
          outstanding={outstanding}
          creditLimit={outstanding}
        />

        <View style={styles.kpiGrid}>

          <View style={styles.kpiCard}>

            <View style={styles.iconCircle}>

              <MaterialCommunityIcons
                name="currency-inr"
                size={24}
                color="#F97316"
              />

            </View>

            <Text style={styles.kpiValue}>
              ₹{outstanding.toLocaleString()}
            </Text>

            <Text style={styles.kpiLabel}>
              Outstanding
            </Text>

          </View>

          <View style={styles.kpiCard}>

            <View style={styles.iconCircle}>

              <MaterialCommunityIcons
                name="basket-check"
                size={24}
                color="#2563EB"
              />

            </View>

            <Text style={styles.kpiValue}>
              {totalOrders}
            </Text>

            <Text style={styles.kpiLabel}>
              Orders
            </Text>

          </View>

        </View>

        <View style={styles.kpiGrid}>

          <View style={styles.kpiCard}>

            <View style={styles.iconCircle}>

              <MaterialCommunityIcons
                name="food-drumstick"
                size={24}
                color="#16A34A"
              />

            </View>

            <Text style={styles.kpiValue}>
              {purchasedKg.toLocaleString()} kg
            </Text>

            <Text style={styles.kpiLabel}>
              Purchased
            </Text>

          </View>

          <View style={styles.kpiCard}>

            <View style={styles.iconCircle}>

              <MaterialCommunityIcons
                name="cash-check"
                size={24}
                color="#7C3AED"
              />

            </View>

            <Text style={styles.kpiValue}>
              ₹{totalPaid.toLocaleString()}
            </Text>

            <Text style={styles.kpiLabel}>
              Total Paid
            </Text>

          </View>

        </View>

                <Text style={styles.sectionHeading}>
          Quick Actions
        </Text>

        <View style={styles.actionRow}>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() =>
              navigation.navigate("Payments")
            }
          >

            <View
              style={[
                styles.actionIcon,
                {
                  backgroundColor: "#FFF7ED",
                },
              ]}
            >

              <MaterialCommunityIcons
                name="cash-multiple"
                size={28}
                color="#F97316"
              />

            </View>

            <Text style={styles.actionTitle}>
              Payments
            </Text>

            <Text style={styles.actionSubtitle}>
              View payment history
            </Text>

          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() =>
              navigation.navigate("Activity")
            }
          >

            <View
              style={[
                styles.actionIcon,
                {
                  backgroundColor: "#EFF6FF",
                },
              ]}
            >

              <MaterialCommunityIcons
                name="history"
                size={28}
                color="#2563EB"
              />

            </View>

            <Text style={styles.actionTitle}>
              Activity
            </Text>

            <Text style={styles.actionSubtitle}>
              Orders & invoices
            </Text>

          </TouchableOpacity>

        </View>

        <Text style={styles.sectionHeading}>
          Recent Transactions
        </Text>

        {retailer.transactions?.length > 0 ? (

          retailer.transactions.map(
            (transaction: any) => (

              <TransactionCard
                key={transaction.id}
                title={transaction.title}
                amount={transaction.amount}
                date={transaction.date}
                type={transaction.type}
              />

            )
          )

        ) : (

          <View style={styles.emptyCard}>

            <View style={styles.emptyIcon}>

              <MaterialCommunityIcons
                name="file-document-outline"
                size={46}
                color="#CBD5E1"
              />

            </View>

            <Text style={styles.emptyTitle}>
              No Business Activity Yet
            </Text>

            <Text style={styles.emptyText}>
              Your invoices, payments and
              transaction history will
              automatically appear here as
              you start ordering from
              ChickBazaar.
            </Text>

          </View>

        )}

      </ScrollView>

    </SafeAreaView>

  );

}

const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    backgroundColor: "#F8FAFC",
  },

  loadingTitle: {
    marginTop: 18,
    fontSize: 24,
    fontWeight: "800",
    color: "#0F172A",
  },

  loadingText: {
    marginTop: 8,
    textAlign: "center",
    color: "#64748B",
    fontSize: 15,
    lineHeight: 22,
  },

  container: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 160,
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#0F172A",
  },

  subtitle: {
    marginTop: 6,
    marginBottom: 24,
    color: "#64748B",
    fontSize: 16,
    lineHeight: 24,
  },

  sectionHeading: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0F172A",
    marginTop: 8,
    marginBottom: 14,
  },

  kpiGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  kpiCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 4,
  },

  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#F8FAFC",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },

  kpiValue: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0F172A",
    textAlign: "center",
  },

  kpiLabel: {
    marginTop: 6,
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
  },

  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 26,
  },

  actionCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    paddingVertical: 24,
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 4,
  },

  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },

  actionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },

  actionSubtitle: {
    marginTop: 6,
    fontSize: 13,
    color: "#64748B",
    textAlign: "center",
    paddingHorizontal: 10,
  },

  emptyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingVertical: 42,
    paddingHorizontal: 24,
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 4,
  },

  emptyIcon: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#334155",
    textAlign: "center",
  },

  emptyText: {
    marginTop: 10,
    textAlign: "center",
    color: "#94A3B8",
    fontSize: 15,
    lineHeight: 22,
  },

});