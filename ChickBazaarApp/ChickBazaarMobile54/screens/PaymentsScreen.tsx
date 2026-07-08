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
} from "react-native";

export default function PaymentsScreen() {
  const [payments, setPayments] =
    useState<any[]>([]);

  useEffect(() => {
    loadPayments();
  }, []);

  async function loadPayments() {
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

    setPayments(data);
  }

  return (
    <SafeAreaView
      style={styles.safeArea}
    >
      <View
        style={styles.container}
      >
        <Text style={styles.title}>
          Payment History
        </Text>

        <FlatList
          data={payments}
          showsVerticalScrollIndicator={
            false
          }
          keyExtractor={(item) =>
            item.id
          }
          ListEmptyComponent={
            <View
              style={
                styles.emptyCard
              }
            >
              <Text
                style={
                  styles.emptyText
                }
              >
                No payments found
              </Text>
            </View>
          }
          renderItem={({
            item,
          }) => (
            <View
              style={styles.card}
            >
              <View
                style={
                  styles.headerRow
                }
              >
                <Text
                  style={
                    styles.amount
                  }
                >
                  ₹
                  {Number(
                    item.credit || 0
                  ).toLocaleString()}
                </Text>

                <View
                  style={
                    styles.modeBadge
                  }
                >
                  <Text
                    style={
                      styles.modeText
                    }
                  >
                    {item.payment_mode ||
                      "N/A"}
                  </Text>
                </View>
              </View>

              <Text
                style={
                  styles.date
                }
              >
                📅{" "}
                {new Date(
                  item.created_at
                ).toLocaleString()}
              </Text>

              <Text
                style={
                  styles.reference
                }
              >
                🔖 Ref:
                {" "}
                {item.reference_number ||
                  "-"}
              </Text>

              <Text
                style={
                  styles.remarks
                }
              >
                📝{" "}
                {item.remarks ||
                  "No remarks"}
              </Text>
            </View>
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
      borderRadius: 18,
      padding: 18,
      marginBottom: 14,
      elevation: 2,
    },

    headerRow: {
      flexDirection: "row",
      justifyContent:
        "space-between",
      alignItems:
        "center",
      marginBottom: 10,
    },

    amount: {
      fontSize: 28,
      fontWeight: "700",
      color: "#16A34A",
    },

    modeBadge: {
      backgroundColor:
        "#F97316",
      borderRadius: 20,
      paddingHorizontal: 10,
      paddingVertical: 5,
    },

    modeText: {
      color: "#FFF",
      fontWeight: "700",
      fontSize: 12,
    },

    date: {
      color: "#475569",
      marginBottom: 6,
    },

    reference: {
      color: "#475569",
      marginBottom: 6,
    },

    remarks: {
      color: "#334155",
    },

    emptyCard: {
      backgroundColor:
        "#FFFFFF",
      padding: 30,
      borderRadius: 18,
      alignItems:
        "center",
    },

    emptyText: {
      color: "#64748B",
      fontSize: 16,
    },
  });