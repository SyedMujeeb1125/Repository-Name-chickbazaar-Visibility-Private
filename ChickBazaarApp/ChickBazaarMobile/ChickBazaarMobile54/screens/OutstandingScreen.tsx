import React, {
  useEffect,
  useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import OutstandingCard from "../components/payments/OutstandingCard";

import TransactionCard from "../components/payments/TransactionCard";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function OutstandingScreen() {
  const [retailer, setRetailer] =
    useState<any>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const mobile =
      await AsyncStorage.getItem(
        "retailerMobile"
      );

    const response =
      await fetch(
  `https://www.chickbazaar.com/api/mobile/outstanding?mobile=${mobile}`
)

    const data =
      await response.json();

    setRetailer(data);
  }

  if (!retailer) {
    return (
      <SafeAreaView
        style={styles.loadingContainer}
      >
        <Text>Loading...</Text>
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
        <Text style={styles.title}>
          Credit Summary
        </Text>

        <OutstandingCard
  outstanding={outstanding}
  creditLimit={creditLimit}
/>

        <View style={styles.card}>

  <Text style={styles.label}>
    Credit Limit
  </Text>

  <Text style={styles.value}>
    ₹{creditLimit.toLocaleString()}
  </Text>

  <View style={styles.divider} />

  <Text style={styles.label}>
    Credit Category
  </Text>

  <Text style={styles.categoryValue}>
    {(retailer.creditCategory || "NEW").toUpperCase()}
  </Text>

</View>
<Text style={styles.sectionTitle}>
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

  <View style={styles.card}>

    <Text style={styles.label}>
      No transactions available
    </Text>

  </View>

)}

                
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

    title: {
      fontSize: 30,
      fontWeight: "700",
      color: "#0F172A",
      marginBottom: 20,
    },

    topCard: {
      backgroundColor:
        "#F97316",
      borderRadius: 22,
      padding: 22,
      marginBottom: 18,
    },

    topCardTitle: {
      color: "#FFF",
      fontSize: 14,
    },

    topCardAmount: {
      color: "#FFF",
      fontSize: 32,
      fontWeight: "700",
      marginTop: 8,
    },

    categoryBadge: {
      alignSelf:
        "flex-start",
      backgroundColor:
        "#FFF",
      borderRadius: 20,
      paddingHorizontal: 12,
      paddingVertical: 5,
      marginTop: 12,
    },

    categoryText: {
      color: "#F97316",
      fontWeight: "700",
    },

    card: {
      backgroundColor:
        "#FFFFFF",
      borderRadius: 18,
      padding: 18,
      marginBottom: 12,
      elevation: 2,
    },

    label: {
      fontSize: 15,
      color: "#64748B",
    },

    value: {
      fontSize: 26,
      fontWeight: "700",
      color: "#0F172A",
      marginTop: 8,
    },

    divider: {
  height: 1,
  backgroundColor: "#E2E8F0",
  marginVertical: 16,
},

categoryValue: {
  marginTop: 8,
  fontSize: 20,
  fontWeight: "700",
  color: "#F97316",
},

sectionTitle: {
  fontSize: 22,
  fontWeight: "700",
  color: "#0F172A",
  marginTop: 24,
  marginBottom: 12,
},
  });