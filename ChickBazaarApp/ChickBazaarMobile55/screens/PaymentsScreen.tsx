import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function PaymentsScreen() {

  const [payments, setPayments] =
    useState<any[]>([]);

  useEffect(() => {
    loadPayments();
  }, []);

  async function loadPayments() {

    try {

      const mobile =
        await AsyncStorage.getItem(
          "retailerMobile"
        );

      const response =
        await fetch(
          `https://www.chickbazaar.com/api/mobile/payments?mobile=${mobile}`
        );

      const data =
        await response.json();

      setPayments(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (error) {

      console.log(error);

      setPayments([]);

    }

  }

  const totalPaid =
    useMemo(() => {

      return payments.reduce(
        (
          total,
          payment
        ) =>
          total +
          Number(
            payment.credit || 0
          ),
        0
      );

    }, [payments]);

  return (

    <SafeAreaView
  style={styles.safeArea}
  edges={["top"]}
>

      <View
        style={styles.container}
      >

        <Text
          style={styles.title}
        >
          Payments
        </Text>

        <Text
          style={styles.subtitle}
        >
          View all payments received
          and transaction history.
        </Text>

        <View
          style={styles.summaryCard}
        >

          <View
            style={styles.summaryLeft}
          >

            <View
              style={styles.summaryIcon}
            >

              <MaterialCommunityIcons
                name="cash-check"
                size={26}
                color="#F97316"
              />

            </View>

            <View>

              <Text
                style={
                  styles.summaryLabel
                }
              >
                Total Payments
              </Text>

              <Text
                style={
                  styles.summaryAmount
                }
              >
                ₹
                {totalPaid.toLocaleString()}
              </Text>

            </View>

          </View>

          <View
            style={
              styles.summaryRight
            }
          >

            <Text
              style={
                styles.summaryCount
              }
            >
              {payments.length}
            </Text>

            <Text
              style={
                styles.summaryCountLabel
              }
            >
              Transactions
            </Text>

          </View>

        </View>

        <FlatList
  data={payments}
  showsVerticalScrollIndicator={false}
  keyExtractor={(item, index) =>
  String(item.id ?? index)
}
  contentContainerStyle={styles.listContent}
  ListEmptyComponent={

    <View style={styles.emptyCard}>

      <View style={styles.emptyIcon}>

        <MaterialCommunityIcons
          name="cash-remove"
          size={42}
          color="#CBD5E1"
        />

      </View>

      <Text style={styles.emptyTitle}>
        No Payments Yet
      </Text>

      <Text style={styles.emptyText}>
        Your payment history will appear
        here once your first payment is
        recorded.
      </Text>

    </View>

  }
  renderItem={({ item }) => (

    <View style={styles.card}>

      <View style={styles.headerRow}>

        <View style={styles.leftSection}>

          <View style={styles.iconCircle}>

            <MaterialCommunityIcons
              name="cash-check"
              size={24}
              color="#16A34A"
            />

          </View>

          <View>

            <Text style={styles.amount}>
              ₹
              {Number(
                item.credit || 0
              ).toLocaleString("en-IN")}
            </Text>

            <Text style={styles.date}>
              item.created_at
  ? new Date(item.created_at).toLocaleString()
  : "-"
            </Text>

          </View>

        </View>

        <View style={styles.modeBadge}>

          <Text style={styles.modeText}>
            {(item.payment_mode ||
              "N/A").toUpperCase()}
          </Text>

        </View>

      </View>

      <View style={styles.divider} />

      <View style={styles.infoRow}>

        <MaterialCommunityIcons
          name="barcode"
          size={18}
          color="#64748B"
        />

        <Text style={styles.infoText}>
          Ref:{" "}
          {item.reference_number ||
            "-"}
        </Text>

      </View>

      <View style={styles.infoRow}>

        <MaterialCommunityIcons
          name="text-box-outline"
          size={18}
          color="#64748B"
        />

        <Text style={styles.infoText}>
          {item.remarks ||
            "No remarks available"}
        </Text>

      </View>

    </View>

  )}
/>

</View>

    </SafeAreaView>

  );

}

const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 18,
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#0F172A",
  },

  subtitle: {
    marginTop: 6,
    marginBottom: 24,
    fontSize: 16,
    color: "#64748B",
    lineHeight: 24,
  },

  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    marginBottom: 22,
    flexDirection: "row",
    justifyContent: "space-between",
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

  summaryLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  summaryIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FFF7ED",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  summaryLabel: {
    fontSize: 14,
    color: "#64748B",
  },

  summaryAmount: {
    marginTop: 4,
    fontSize: 28,
    fontWeight: "800",
    color: "#16A34A",
  },

  summaryRight: {
    alignItems: "center",
  },

  summaryCount: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0F172A",
  },

  summaryCountLabel: {
    marginTop: 4,
    fontSize: 13,
    color: "#64748B",
  },

  listContent: {
    paddingBottom: 24,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 18,
    marginBottom: 14,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 4,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#ECFDF5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  amount: {
    fontSize: 24,
    fontWeight: "800",
    color: "#16A34A",
  },

  date: {
    marginTop: 4,
    fontSize: 13,
    color: "#64748B",
  },

  modeBadge: {
    backgroundColor: "#FFF7ED",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
  },

  modeText: {
    color: "#EA580C",
    fontWeight: "700",
    fontSize: 12,
  },

  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 16,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  infoText: {
    marginLeft: 10,
    flex: 1,
    fontSize: 14,
    color: "#475569",
  },

  emptyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingVertical: 44,
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
  },

  emptyText: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 15,
    color: "#94A3B8",
    lineHeight: 22,
  },

});