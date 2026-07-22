import React, { useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";

import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { processAdvancePayment } from "../services/payment";

export default function PaymentCheckoutScreen({
  navigation,
  route,
}: any) {

  const {

    selectedShop,

    todayRate,

    quantity,

    estimatedAmount,

    advanceRequired = 500,

    deliveryDate,

    deliverySlot,

    orderType,

    notes,

    retailerId,

  } = route.params;

  const [processing, setProcessing] =
    useState(false);

  async function handlePayment() {

    if (processing) {
      return;
    }

    try {

      setProcessing(true);

      
      
  if (!retailerId) {
  Alert.alert(
    "Unable to Place Order",
    "Retailer information is missing. Please login again."
  );
  return;
}

const result = await processAdvancePayment({
  retailerId,
  amount: advanceRequired,
  orderData: {
    selectedShop,
    todayRate,
    quantity,
    estimatedAmount,
    deliveryDate,
    deliverySlot,
    orderType,
    notes,
  },
});

        if (!result.success) {

        Alert.alert(
          "Payment Failed",
          result.message ??
            "Unable to process payment."
        );

        return;

      }

      navigation.replace("OrderSuccess", {
    orderId: result.orderId,
    orderNumber: result.orderNumber,
    estimatedAmount,
    deliveryDate,
    advancePaid: advanceRequired,
});

    } catch (error) {
  Alert.alert(
    "Something went wrong",
    error instanceof Error
      ? error.message
      : "Please try again."
  );
} finally {

      setProcessing(false);

    }

  }

  return (

    <SafeAreaView
      style={styles.container}
    >

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.content
        }
      >

        <Text style={styles.title}>
          Secure Payment
        </Text>

        <Text style={styles.subtitle}>
          Powered securely by Razorpay
        </Text>

        {/* Security Banner */}

        <View style={styles.banner}>

          <MaterialCommunityIcons
            name="shield-check"
            size={42}
            color="#16A34A"
          />

          <View
            style={{
              marginLeft: 16,
              flex: 1,
            }}
          >

            <Text style={styles.bannerTitle}>
              Secure Checkout
            </Text>

            <Text style={styles.bannerText}>
              Your payment is encrypted
              and processed securely
              through Razorpay.
            </Text>

          </View>

        </View>

        {/* Delivery Shop */}

        <View style={styles.card}>

          <Text style={styles.cardTitle}>
            Delivery Shop
          </Text>

          <Text style={styles.shopName}>
  {selectedShop?.shop_name ??
    selectedShop?.shopName ??
    "Selected Shop"}
</Text>

          <Text style={styles.shopAddress}>
            {selectedShop?.address}
          </Text>

        </View>

        {/* Invoice Estimate */}

        <View style={styles.card}>

          <Text style={styles.cardTitle}>
            Invoice Estimate
          </Text>

          <Row
    label="Applicable Rate"
            value={`₹${todayRate}/kg`}
          />

          <Row
            label="Quantity"
            value={
              orderType === "birds"
                ? `${quantity} Birds`
                : `${quantity} KG`
            }
          />

          <Row
            label="Delivery Date"
            value={deliveryDate}
          />

          <Row
            label="Delivery Slot"
            value={
              deliverySlot ??
              "Next Available"
            }
          />

          <View style={styles.divider} />

          <Row
            label="Estimated Invoice"
            value={`₹${estimatedAmount.toLocaleString()}`}
            highlight
          />
                  </View>

        {/* Advance Payment */}

        <View style={styles.advanceCard}>

          <View style={styles.advanceHeader}>

            <MaterialCommunityIcons
              name="cash-check"
              size={28}
              color="#16A34A"
            />

            <View style={{ marginLeft: 14 }}>

              <Text style={styles.advanceTitle}>
                Advance Payment
              </Text>

              <Text style={styles.advanceSubtitle}>
                Pay now to confirm your order
              </Text>

            </View>

          </View>

          <Text style={styles.advanceAmount}>
            ₹{advanceRequired.toLocaleString()}
          </Text>

        </View>

        {/* Bill to Bill Settlement */}

        <View style={styles.card}>

          <Text style={styles.cardTitle}>
            Bill-to-Bill Settlement
          </Text>

          <Rule
    text={`₹${advanceRequired} advance is collected while placing the order.`}
/>

          <Rule
            text="Final invoice is generated after actual delivery weight."
          />

          <Rule
            text="Remaining balance is payable after delivery."
          />

          <Rule
            text="Previous invoice must be cleared before placing the next order."
          />

        </View>

        {/* Payment Security */}

        <View style={styles.card}>

          <Text style={styles.cardTitle}>
            Payment Security
          </Text>

          <Rule
            text="256-bit SSL encrypted payment."
          />

          <Rule
            text="Powered securely by Razorpay."
          />

          <Rule
            text="Your banking details are never stored on ChickBazaar."
          />

        </View>

        <TouchableOpacity

          activeOpacity={0.9}

          disabled={processing}

          style={[
            styles.payButton,
            processing &&
              styles.payButtonDisabled,
          ]}

          onPress={handlePayment}

        >

          {processing ? (

            <ActivityIndicator
              color="#FFFFFF"
            />

          ) : (

            <MaterialCommunityIcons
              name="lock"
              size={20}
              color="#FFFFFF"
            />

          )}

          <Text style={styles.payButtonText}>
  {processing
    ? "Processing Payment..."
    : `PAY ₹${advanceRequired.toLocaleString()}`}
</Text>

        </TouchableOpacity>

      </ScrollView>

      {processing && (

        <View style={styles.overlay}>

          <View style={styles.processingCard}>

            <ActivityIndicator
              size="large"
              color="#F97316"
            />

            <Text style={styles.processingTitle}>
              Processing Payment
            </Text>

            <Text style={styles.processingSubtitle}>
              Please don't close or refresh the app until payment is complete.
            </Text>

            <Text style={styles.processingSmall}>
              Verifying payment and creating
              your order...
            </Text>

          </View>

        </View>

      )}
          </SafeAreaView>

  );

}

function Row({

  label,

  value,

  highlight,

}: {

  label: string;

  value: string;

  highlight?: boolean;

}) {

  return (

    <View style={styles.row}>

      <Text style={styles.label}>
        {label}
      </Text>

      <Text
        style={[
          styles.value,
          highlight &&
            styles.highlight,
        ]}
      >
        {value}
      </Text>

    </View>

  );

}

function Rule({

  text,

}: {

  text: string;

}) {

  return (

    <View style={styles.ruleRow}>

      <MaterialCommunityIcons
        name="check-circle"
        size={18}
        color="#16A34A"
      />

      <Text style={styles.ruleText}>
        {text}
      </Text>

    </View>

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

  title: {
    fontSize: 30,
    fontWeight: "900",
    color: "#0F172A",
  },

  subtitle: {
    marginTop: 4,
    marginBottom: 24,
    fontSize: 15,
    color: "#64748B",
  },

  banner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECFDF5",
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
  },

  bannerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#166534",
  },

  bannerText: {
    marginTop: 4,
    color: "#166534",
    lineHeight: 21,
    fontSize: 14,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 20,
    marginBottom: 20,

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 5,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 18,
  },

  shopName: {
    fontSize: 19,
    fontWeight: "800",
    color: "#0F172A",
  },

  shopAddress: {
    marginTop: 6,
    fontSize: 15,
    color: "#64748B",
    lineHeight: 22,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  label: {
    fontSize: 15,
    color: "#64748B",
    fontWeight: "600",
  },

  value: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0F172A",
  },

  highlight: {
    color: "#F97316",
    fontSize: 20,
    fontWeight: "900",
  },

  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 18,
  },

  advanceCard: {
    backgroundColor: "#FFF7ED",
    borderRadius: 22,
    padding: 20,
    marginBottom: 20,
  },

  advanceHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  advanceTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#9A3412",
  },

  advanceSubtitle: {
    marginTop: 4,
    color: "#7C2D12",
    fontSize: 14,
  },

  advanceAmount: {
    marginTop: 18,
    fontSize: 42,
    fontWeight: "900",
    color: "#16A34A",
    textAlign: "center",
  },

  ruleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 14,
  },

  ruleText: {
    flex: 1,
    marginLeft: 12,
    color: "#334155",
    fontSize: 14,
    lineHeight: 22,
  },

  payButton: {
    height: 60,
    borderRadius: 18,
    backgroundColor: "#F97316",

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    marginTop: 8,
    marginBottom: 30,

    shadowColor: "#F97316",
    shadowOpacity: 0.30,
    shadowRadius: 14,
    shadowOffset: {
      width: 0,
      height: 8,
    },

    elevation: 10,
  },

  payButtonDisabled: {
    backgroundColor: "#CBD5E1",
  },

  payButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
    marginLeft: 10,
    letterSpacing: 0.4,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(15,23,42,0.45)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  processingCard: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: "center",
  },

  processingTitle: {
    marginTop: 18,
    fontSize: 22,
    fontWeight: "800",
    color: "#0F172A",
  },

  processingSubtitle: {
    marginTop: 8,
    fontSize: 15,
    color: "#334155",
    textAlign: "center",
  },

  processingSmall: {
    marginTop: 16,
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 22,
  },

});