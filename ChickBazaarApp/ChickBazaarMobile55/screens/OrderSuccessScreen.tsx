import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CBAmount from "../components/common/CBAmount";
import CBButton from "../components/common/CBButton";
import CBCard from "../components/common/CBCard";
import CBHeader from "../components/common/CBHeader";
import { openOrderTracking } from "../utils/navigation/openOrderTracking";

export default function OrderSuccessScreen({
  navigation,
  route,
}: any) {
  const {
    orderId,
    orderNumber,
    estimatedAmount = 0,
    deliveryDate,
    advancePaid = 0,
  } = route.params ?? {};

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <CBHeader
          title="Order Confirmed"
          subtitle="Your order has been placed successfully."
        />

        {/* Success */}
        <CBCard>

          <View style={styles.successCircle}>
            <MaterialCommunityIcons
              name="check"
              size={46}
              color="#16A34A"
            />
          </View>

          <Text style={styles.successTitle}>
            Order Confirmed
          </Text>

          <Text style={styles.orderNumberLabel}>
            Order Number
          </Text>

          <Text style={styles.orderId}>
            {orderNumber || orderId}
          </Text>

        </CBCard>

        {/* Delivery */}

        <CBCard style={styles.cardSpacing}>

          <View style={styles.sectionHeader}>

            <MaterialCommunityIcons
              name="truck-fast"
              size={22}
              color="#F97316"
            />

            <Text style={styles.sectionTitle}>
              Delivery
            </Text>

          </View>

          <View style={styles.deliveryBox}>

            <Text style={styles.deliveryDay}>
              {deliveryDate || "Tomorrow Morning"}
            </Text>

            <Text style={styles.deliveryTime}>
              6:00 AM – 8:00 AM
            </Text>

          </View>

        </CBCard>

        {/* Invoice */}

        <CBCard style={styles.cardSpacing}>

          <View style={styles.sectionHeader}>

            <MaterialCommunityIcons
              name="cash-multiple"
              size={22}
              color="#16A34A"
            />

            <Text style={styles.sectionTitle}>
              Invoice Summary
            </Text>

          </View>

          <CBAmount
  amount={estimatedAmount}
  size={30}
/>

          <View
            style={{
              marginTop: 14,
              paddingTop: 14,
              borderTopWidth: 1,
              borderTopColor: "#E5E7EB",
            }}
          >

            <Text
              style={{
                fontSize: 14,
                color: "#64748B",
                marginBottom: 4,
              }}
            >
              Advance Paid
            </Text>

            <Text
              style={{
                fontSize: 22,
                fontWeight: "800",
                color: "#16A34A",
              }}
            >
              ₹{advancePaid.toLocaleString()}
            </Text>

          </View>

        </CBCard>

        {/* Buttons */}

        <View style={styles.buttonContainer}>

          <CBButton
  title="TRACK ORDER"
  onPress={() =>
    openOrderTracking(
      navigation,
      {
        id: orderId,
        estimatedAmount,
      },
      {
        status: "confirmed",
      }
    )
  }
/>

          <View style={{ height: 12 }} />

          <CBButton
            title="BACK TO DASHBOARD"
            variant="outline"
            onPress={() => navigation.popToTop()}
          />

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  content: {
    padding: 16,
    paddingBottom: 24,
  },

  cardSpacing: {
    marginTop: 12,
  },

  successCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#DCFCE7",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },

  successTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#111827",
    textAlign: "center",
  },

  orderNumberLabel: {
    marginTop: 10,
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    fontWeight: "600",
  },

  orderId: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
    textAlign: "center",
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  sectionTitle: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  deliveryBox: {
    backgroundColor: "#FFF7ED",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: "center",
  },

  deliveryDay: {
    fontSize: 22,
    fontWeight: "800",
    color: "#EA580C",
  },

  deliveryTime: {
    marginTop: 4,
    fontSize: 15,
    fontWeight: "600",
    color: "#475569",
  },

  billNote: {
    marginTop: 10,
    fontSize: 13,
    lineHeight: 18,
    color: "#64748B",
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  infoTitle: {
    marginLeft: 10,
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },

  infoText: {
    fontSize: 14,
    color: "#64748B",
    lineHeight: 22,
    marginBottom: 8,
  },

  buttonContainer: {
    marginTop: 18,
    marginBottom: 20,
  },
});