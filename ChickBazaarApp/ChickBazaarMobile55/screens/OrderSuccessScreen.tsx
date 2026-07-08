import React from "react";

import { SafeAreaView } from "react-native-safe-area-context";

import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

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
    estimatedAmount,
    deliveryDate,
  } = route.params ?? {};

  return (

    <SafeAreaView style={styles.container}>

      <View style={styles.content}>

        <CBHeader
          title="Order Placed Successfully"
          subtitle="We're preparing your healthy live broiler chicken."
        />

        {/* Success Card */}

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
            {orderId || "Generating Order ID..."}
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

        {/* Delivery Card */}

        <CBCard>

          <View style={styles.sectionHeader}>

            <MaterialCommunityIcons
              name="truck-delivery-outline"
              size={22}
              color="#F97316"
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
              2:00 PM – 4:00 PM
            </Text>

          </View>

        </CBCard>

        {/* Estimated Bill */}

        <CBCard>

          <View style={styles.sectionHeader}>

            <MaterialCommunityIcons
              name="cash-multiple"
              size={22}
              color="#F97316"
            />

            <Text style={styles.sectionTitle}>
              Estimated Bill
            </Text>

          </View>

          <CBAmount
            amount={estimatedAmount || 0}
            size={34}
          />

          <Text style={styles.billNote}>
            Final invoice will be generated
            after the actual delivery weight
            is recorded.
          </Text>

        </CBCard>         {/* Information Card */}

        <CBCard>

          <View style={styles.infoRow}>

            <MaterialCommunityIcons
              name="information-outline"
              size={22}
              color="#2563EB"
            />

            <Text style={styles.infoTitle}>
              What's Next?
            </Text>

          </View>

          <Text style={styles.infoText}>
            Our operations team is preparing your
            healthy live broiler chicken.
          </Text>

          <Text style={styles.infoText}>
            You can track your order anytime from
            the Dashboard or Orders screen.
          </Text>

        </CBCard>

        <View style={styles.buttonContainer}>

          <CBButton
            title="Track Order"
            onPress={() =>
              navigation.navigate("MyOrders")
            }
          />

          <View style={{ height: 14 }} />

          <CBButton
            title="Back to Dashboard"
            onPress={() =>
              navigation.navigate("Dashboard")
            }
          />

        </View>

      </View>

    </SafeAreaView>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  content: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
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
    fontSize: 21,
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
    marginBottom: 18,
  },

  sectionTitle: {
    marginLeft: 10,
    fontSize: 19,
    fontWeight: "700",
    color: "#0F172A",
  },

  deliveryBox: {
    backgroundColor: "#FFF7ED",
    borderRadius: 20,
    padding: 18,
    alignItems: "center",
  },

  deliveryDay: {
    fontSize: 26,
    fontWeight: "800",
    color: "#EA580C",
  },

  deliveryTime: {
    marginTop: 6,
    fontSize: 17,
    fontWeight: "600",
    color: "#475569",
  },

  billNote: {
    marginTop: 14,
    fontSize: 14,
    color: "#64748B",
    lineHeight: 22,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  infoTitle: {
    marginLeft: 10,
    fontSize: 19,
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
    marginTop: 12,
    marginBottom: 24,
  },

});