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
          title="🎉 Order Placed Successfully"
          subtitle="Your order has been received."
        />

        <CBCard>

          <Text style={styles.orderId}>
            {orderId || "Order ID will be assigned"}
          </Text>

          <Text style={styles.label}>
            Expected Delivery
          </Text>

          <Text style={styles.value}>
            {deliveryDate || "-"}
          </Text>

          <Text style={[styles.label, { marginTop: 20 }]}>
            Estimated Amount
          </Text>

          <CBAmount amount={estimatedAmount || 0} />

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
});