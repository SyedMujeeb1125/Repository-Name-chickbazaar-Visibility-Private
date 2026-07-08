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

  const creditLimit =
    Number(retailer.creditLimit || 0);

  const availableCredit =
    Number(retailer.availableCredit || 0);

  const outstanding =
    Number(retailer.outstanding || 0);

  return (

    <SafeAreaView style={styles.safeArea}>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >

        <Text style={styles.title}>
          Business
        </Text>

        <Text style={styles.subtitle}>
          Manage your credit, payments and
          business account.
        </Text>

        <OutstandingCard
          outstanding={outstanding}
          creditLimit={creditLimit}
        />

        {/* Credit Overview */}

        <View style={styles.card}>

          <View style={styles.sectionHeader}>

            <MaterialCommunityIcons
              name="credit-card-outline"
              size={22}
              color="#F97316"
            />

            <Text style={styles.sectionTitle}>
              Credit Overview
            </Text>

          </View>

          <View style={styles.summaryRow}>

            <View style={styles.summaryItem}>

              <Text style={styles.summaryLabel}>
                Available Credit
              </Text>

              <Text
                style={[
                  styles.summaryValue,
                  {
                    color: "#16A34A",
                  },
                ]}
              >
                ₹{availableCredit.toLocaleString()}
              </Text>

            </View>

            <View style={styles.summaryDivider} />

            <View style={styles.summaryItem}>

              <Text style={styles.summaryLabel}>
                Credit Limit
              </Text>

              <Text style={styles.summaryValue}>
                ₹{creditLimit.toLocaleString()}
              </Text>

            </View>

          </View>

          <View style={styles.categoryBox}>

            <MaterialCommunityIcons
              name="shield-check"
              size={20}
              color="#F97316"
            />

            <Text style={styles.categoryText}>
              Credit Category :
            </Text>

            <Text style={styles.categoryValue}>
              {(retailer.creditCategory || "NEW").toUpperCase()}
            </Text>

          </View>

        </View>

        {/* Quick Actions */}

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

            <MaterialCommunityIcons
              name="cash-multiple"
              size={34}
              color="#F97316"
            />

            <Text style={styles.actionTitle}>
              Payments
            </Text>

          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() =>
              navigation.navigate("Activity")
            }
          >

            <MaterialCommunityIcons
              name="history"
              size={34}
              color="#2563EB"
            />

            <Text style={styles.actionTitle}>
              Activity
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

            <MaterialCommunityIcons
              name="file-document-outline"
              size={42}
              color="#CBD5E1"
            />

            <Text style={styles.emptyTitle}>
              No Transactions Yet
            </Text>

            <Text style={styles.emptyText}>
              Your payment and invoice
              history will appear here.
            </Text>

          </View>

        )}

      </ScrollView>

    </SafeAreaView>

  );

} const styles = StyleSheet.create({

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
    paddingTop: 16,
    paddingBottom: 40,
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

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 22,
    marginBottom: 22,

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 14,
    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 5,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  sectionTitle: {
    marginLeft: 10,
    fontSize: 19,
    fontWeight: "700",
    color: "#0F172A",
  },

  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  summaryItem: {
    flex: 1,
    alignItems: "center",
  },

  summaryDivider: {
    width: 1,
    height: 60,
    backgroundColor: "#E2E8F0",
    marginHorizontal: 10,
  },

  summaryLabel: {
    color: "#64748B",
    fontSize: 14,
  },

  summaryValue: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: "800",
    color: "#0F172A",
  },

  categoryBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF7ED",
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },

  categoryText: {
    marginLeft: 10,
    color: "#7C2D12",
    fontSize: 15,
    fontWeight: "600",
  },

  categoryValue: {
    marginLeft: 6,
    color: "#EA580C",
    fontSize: 16,
    fontWeight: "800",
  },

  sectionHeading: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 14,
  },

  actionRow: {
    flexDirection: "row",
    marginBottom: 26,
  },

  actionCard: {
    flex: 1,
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

  actionTitle: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },

  emptyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingVertical: 40,
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

  emptyTitle: {
    marginTop: 16,
    fontSize: 20,
    fontWeight: "700",
    color: "#334155",
  },

  emptyText: {
    marginTop: 10,
    textAlign: "center",
    color: "#94A3B8",
    fontSize: 15,
    lineHeight: 22,
  },

});