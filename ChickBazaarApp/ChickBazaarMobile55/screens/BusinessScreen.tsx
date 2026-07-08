import React from "react";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import FinancialSummaryCard from "../components/business/FinancialSummaryCard";

import BusinessStatsCard from "../components/business/BusinessStatsCard";

import BusinessQuickActions from "../components/business/BusinessQuickActions";

import RecentTransactionsCard from "../components/business/RecentTransactionsCard";

import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";


import {
  ScrollView,
  StyleSheet,
  Text
} from "react-native";

export default function BusinessScreen({
  navigation,
}: any) {

  const tabBarHeight =
    useBottomTabBarHeight();

  return (

    <SafeAreaView
      style={styles.safeArea}
    >

      <ScrollView
  showsVerticalScrollIndicator={false}
  contentContainerStyle={[
    styles.container,
    {
      paddingBottom: tabBarHeight + 24,
    },
  ]}
>

        <Text style={styles.title}>
          Business
        </Text>

        <Text style={styles.subtitle}>
          Financial overview of your account.
        </Text>

        <FinancialSummaryCard
  outstanding={130000}
  creditLimit={200000}
  availableCredit={70000}
/>

<BusinessStatsCard
  todayPurchase={25000}
  monthlyPurchase={580000}
  lifetimePurchase={7245000}
/>

<BusinessQuickActions

  onInvoices={() =>
    navigation.navigate("Invoices")
  }

  onPayments={() =>
    navigation.navigate("Payments")
  }

  onLedger={() =>
    navigation.navigate("Ledger")
  }

  onAnalytics={() =>
    navigation.navigate("Analytics")
  }

/>

<RecentTransactionsCard
  transactions={[
    {
      id: "1",
      icon: "cash-check",
      title: "Payment Received",
      subtitle: "Online Payment",
      amount: "₹25,000",
      time: "10:30 AM",
    },
    {
      id: "2",
      icon: "file-document-outline",
      title: "Invoice Generated",
      subtitle: "INV-2026-001245",
      time: "Yesterday",
    },
    {
      id: "3",
      icon: "book-open-page-variant",
      title: "Ledger Updated",
      subtitle: "Purchase Entry",
      amount: "₹18,450",
      time: "2 Days Ago",
    },
  ]}
/>

      </ScrollView>

    </SafeAreaView>

  );

}

const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  container: {
    padding: 18,
    paddingBottom: 40,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#0F172A",
  },

  subtitle: {
    marginTop: 6,
    marginBottom: 24,
    fontSize: 15,
    color: "#64748B",
  },

});