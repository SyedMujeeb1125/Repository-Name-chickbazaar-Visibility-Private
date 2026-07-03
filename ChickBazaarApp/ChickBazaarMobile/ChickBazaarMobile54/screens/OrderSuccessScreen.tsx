import React from "react";

import { SafeAreaView } from "react-native-safe-area-context";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import CBButton from "../components/common/CBButton";
import CBCard from "../components/common/CBCard";
import CBHeader from "../components/common/CBHeader";
import CBAmount from "../components/common/CBAmount";

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
  title="Order Successful"
  subtitle="Your order has been received successfully."
/>

        <CBCard>

  <View style={styles.successCircle}>
    <Text style={styles.successIcon}>
      ✓
    </Text>
  </View>

  <Text style={styles.successTitle}>
    Order Confirmed
  </Text>

  <Text style={styles.orderId}>
    {orderId || "Generating Order ID..."}
  </Text>

  <View style={styles.divider} />

  <View style={styles.row}>
    <Text style={styles.label}>
      Estimated Amount
    </Text>

    <CBAmount
      amount={estimatedAmount || 0}
      size={26}
    />
  </View>

  <View style={styles.row}>
    <Text style={styles.label}>
      Expected Delivery
    </Text>

    <Text style={styles.value}>
      {deliveryDate || "-"}
    </Text>
  </View>

  <View style={styles.divider} />

  <Text style={styles.message}>
    Thank you for choosing ChickBazaar.
    You can track your order anytime
    from My Orders.
  </Text>

</CBCard>

        <View style={styles.buttonContainer}>
          <CBButton
            title="Track Order"
            onPress={() =>
              navigation.navigate("MyOrders")
            }
          />

          <View style={{ height: 12 }} />

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

  orderId: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },

  label: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 6,
  },

  value: {
    fontSize: 18,
    fontWeight: "700",
  },

  buttonContainer: {
    marginBottom: 20,
  },

  successCircle: {
  width: 90,
  height: 90,
  borderRadius: 45,
  backgroundColor: "#DCFCE7",
  justifyContent: "center",
  alignItems: "center",
  alignSelf: "center",
  marginBottom: 20,
},

successIcon: {
  fontSize: 42,
  color: "#16A34A",
  fontWeight: "700",
},

successTitle: {
  fontSize: 26,
  fontWeight: "700",
  textAlign: "center",
  color: "#0F172A",
  marginBottom: 8,
},

divider: {
  height: 1,
  backgroundColor: "#E2E8F0",
  marginVertical: 20,
},

row: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 16,
},

message: {
  textAlign: "center",
  color: "#64748B",
  lineHeight: 22,
  fontSize: 15,
},
});