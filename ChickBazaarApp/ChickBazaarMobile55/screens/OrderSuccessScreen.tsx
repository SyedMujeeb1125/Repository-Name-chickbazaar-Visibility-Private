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
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <CBHeader
          title="Order Placed Successfully"
          subtitle="We're preparing your healthy live broiler chicken."
        />

        {/* Success */}
        <CBCard>
          <View style={styles.successCircle}>
            <MaterialCommunityIcons
              name="check"
              size={58}
              color="#16A34A"
            />
          </View>

          <Text style={styles.successTitle}>
            Order Confirmed
          </Text>

          <Text style={styles.orderId}>
  {orderNumber || orderId}
</Text>

          <View style={styles.statusBadge}>
            <MaterialCommunityIcons
              name="food-drumstick"
              size={18}
              color="#EA580C"
            />

            <Text style={styles.statusText}>
              Healthy Live Broiler Chicken
            </Text>
          </View>
        </CBCard>

        {/* Delivery */}
        <CBCard style={styles.cardSpacing}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons
              name="truck-fast"
              size={24}
              color="#EA580C"
            />

            <Text style={styles.sectionTitle}>
              Expected Delivery
            </Text>
          </View>

          <View style={styles.deliveryBox}>
            <Text style={styles.deliveryDay}>
              {deliveryDate || "Today"}
            </Text>

            <Text style={styles.deliveryTime}>
              Standard Delivery
            </Text>
          </View>
        </CBCard>

        {/* Bill */}
        <CBCard style={styles.cardSpacing}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons
              name="cash-multiple"
              size={24}
              color="#16A34A"
            />

            <Text style={styles.sectionTitle}>
              Estimated Bill
            </Text>
          </View>

          <CBAmount amount={estimatedAmount} />

          <View
  style={{
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  }}
>
  <Text
    style={{
      fontSize: 15,
      color: "#64748B",
      marginBottom: 4,
    }}
  >
    Advance Paid
  </Text>

  <Text
    style={{
      fontSize: 20,
      fontWeight: "800",
      color: "#16A34A",
    }}
  >
    ₹{advancePaid.toLocaleString()}
  </Text>
</View>

          <Text style={styles.billNote}>
            Final amount will be calculated after actual weight at delivery.
          </Text>
        </CBCard>

        {/* Information */}
        <CBCard style={styles.cardSpacing}>
          <View style={styles.infoRow}>
            <MaterialCommunityIcons
              name="information"
              size={24}
              color="#2563EB"
            />

            <Text style={styles.infoTitle}>
              What Happens Next?
            </Text>
          </View>

          <Text style={styles.infoText}>
            • Your order has been received successfully.
          </Text>

          <Text style={styles.infoText}>
            • Our operations team will allocate the nearest farm.
          </Text>

          <Text style={styles.infoText}>
            • You'll receive live tracking once the vehicle is assigned.
          </Text>

          <Text style={styles.infoText}>
            • Final billing will be based on actual delivered weight.
          </Text>
        </CBCard>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
  <CBButton
  title="Track My Order"
  onPress={() =>
    navigation.navigate("Orders", {
      screen: "OrderDetails",
      params: {
        orderId,
      },
    })
  }
/>

  <View style={{ height: 12 }} />

  <CBButton
    title="Back to Home"
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
    padding: 20,
    paddingBottom: 40,
  },

  cardSpacing: {
    marginTop: 16,
  },

  successCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#DCFCE7",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },

  successTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0F172A",
    textAlign: "center",
  },

  orderId: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "700",
    color: "#334155",
    textAlign: "center",
  },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF7ED",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 18,
    alignSelf: "center",
    marginTop: 20,
  },

  statusText: {
    marginLeft: 8,
    color: "#9A3412",
    fontWeight: "700",
    fontSize: 15,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  sectionTitle: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },

  deliveryBox: {
    backgroundColor: "#FFF7ED",
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
  },

  deliveryDay: {
    fontSize: 24,
    fontWeight: "800",
    color: "#EA580C",
  },

  deliveryTime: {
    marginTop: 6,
    fontSize: 16,
    color: "#475569",
    fontWeight: "600",
  },

  billNote: {
    marginTop: 12,
    fontSize: 14,
    color: "#64748B",
    lineHeight: 22,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  infoTitle: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },

  infoText: {
    fontSize: 15,
    color: "#64748B",
    lineHeight: 24,
    marginBottom: 10,
  },

  buttonContainer: {
    marginTop: 24,
    marginBottom: 30,
  },
});