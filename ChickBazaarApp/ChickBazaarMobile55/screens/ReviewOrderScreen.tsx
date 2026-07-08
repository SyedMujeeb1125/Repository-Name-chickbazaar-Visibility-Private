import React from "react";

import { SafeAreaView } from "react-native-safe-area-context";

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import CBAmount from "../components/common/CBAmount";
import CBButton from "../components/common/CBButton";
import CBCard from "../components/common/CBCard";
import CBHeader from "../components/common/CBHeader";

export default function ReviewOrderScreen({
  navigation,
  route,
}: any) {
  const {
    selectedShop,
    todayRate,
    quantity,
    estimatedAmount,
    advanceRequired,
    deliveryDate,
    notes,
    orderType,
    deliveryPriority,
    fulfilmentPreference,
  } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <CBHeader
          title="Review Order"
          subtitle="Please verify everything before placing your order."
        />

        {/* Order Status */}

        <CBCard>
          <View style={styles.statusRow}>
            <MaterialCommunityIcons
              name="clipboard-check-outline"
              size={28}
              color="#F97316"
            />

            <View style={styles.statusContent}>
              <Text style={styles.statusTitle}>
                Almost Done!
              </Text>

              <Text style={styles.statusSubtitle}>
                Review your order details carefully.
                Once confirmed, we'll immediately
                start processing your order.
              </Text>
            </View>
          </View>
        </CBCard>

        {/* Delivery Shop */}

        <CBCard>

          <View style={styles.sectionHeader}>

            <MaterialCommunityIcons
              name="storefront-outline"
              size={20}
              color="#F97316"
            />

            <Text style={styles.sectionTitle}>
              Delivery Shop
            </Text>

          </View>

          <Text style={styles.shopName}>
            {selectedShop?.shopName}
          </Text>

          <Text style={styles.shopAddress}>
            {selectedShop?.address}
          </Text>

        </CBCard>

        {/* Order Summary */}

<CBCard>

  <View style={styles.sectionHeader}>

    <MaterialCommunityIcons
      name="package-variant-closed"
      size={20}
      color="#F97316"
    />

    <Text style={styles.sectionTitle}>
      Order Summary
    </Text>

  </View>

  <View style={styles.row}>

    <Text style={styles.label}>
      Order Window
    </Text>

    <Text style={styles.valueSmall}>
      {deliveryPriority === "express"
        ? "⚡ Express Order"
        : deliveryPriority === "tomorrow"
        ? "📅 Tomorrow Order"
        : "🟢 Regular Order"}
    </Text>

  </View>

  <View style={styles.row}>

    <Text style={styles.label}>
      Order By
    </Text>

    <Text style={styles.valueSmall}>
      {orderType === "birds"
        ? "Bird Count"
        : "Weight"}
    </Text>

  </View>

  <View style={styles.row}>

    <Text style={styles.label}>
      Quantity
    </Text>

    <Text style={styles.valueSmall}>
      {orderType === "birds"
        ? `${quantity} Birds`
        : `${quantity} KG`}
    </Text>

  </View>

  <View style={styles.row}>

    <Text style={styles.label}>
      Delivery Date
    </Text>

    <Text style={styles.valueSmall}>
      {deliveryDate}
    </Text>

  </View>

</CBCard>

        {/* Invoice Estimate */}

<CBCard>

  <View style={styles.sectionHeader}>

    <MaterialCommunityIcons
      name="file-document-outline"
      size={20}
      color="#F97316"
    />

    <Text style={styles.sectionTitle}>
      Invoice Estimate
    </Text>

  </View>

  <View style={styles.row}>

    <Text style={styles.label}>
      Today's Rate
    </Text>

    <CBAmount
      amount={todayRate}
      size={22}
    />

  </View>

  <View style={styles.row}>

    <Text style={styles.label}>
      Estimated Invoice
    </Text>

    <CBAmount
      amount={estimatedAmount}
    />

  </View>

  <View style={styles.row}>

    <Text style={styles.label}>
      Advance Required
    </Text>

    <Text
      style={styles.advanceText}
    >
      ₹500
    </Text>

  </View>

  <View style={styles.divider} />

  <View style={styles.row}>

    <Text style={styles.balanceLabel}>
      Balance After Delivery
    </Text>

    <CBAmount
      amount={
        Math.max(
          estimatedAmount - 500,
          0
        )
      }
      size={26}
    />

  </View>

  <Text style={styles.balanceNote}>
    *Final invoice will be generated
    using the actual delivered weight.
  </Text>

</CBCard>         {/* Delivery Details */}

        <CBCard>

          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons
              name="truck-delivery-outline"
              size={20}
              color="#F97316"
            />

            <Text style={styles.sectionTitle}>
              Delivery Details
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>
              Delivery Date
            </Text>

            <Text style={styles.valueSmall}>
              {deliveryDate}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>
              Priority
            </Text>

            <Text style={styles.valueSmall}>
              {deliveryPriority || "Standard"}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>
              Fulfilment
            </Text>

            <Text style={styles.valueSmall}>
              {fulfilmentPreference || "Closest Farm"}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>
              Estimated Arrival
            </Text>

            <Text style={styles.valueSmall}>
              10:30 AM - 11:30 AM
            </Text>
          </View>

        </CBCard>

        {!!notes && (

          <CBCard>

            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons
                name="note-text-outline"
                size={20}
                color="#F97316"
              />

              <Text style={styles.sectionTitle}>
                Additional Instructions
              </Text>
            </View>

            <View style={styles.notesBox}>
              <Text style={styles.notesText}>
                {notes}
              </Text>
            </View>

          </CBCard>

        )}

        {/* Bill-to-Bill Settlement */}

<CBCard>

  <View style={styles.sectionHeader}>

    <MaterialCommunityIcons
      name="cash-check"
      size={20}
      color="#F97316"
    />

    <Text style={styles.sectionTitle}>
      Bill-to-Bill Settlement
    </Text>

  </View>

  <View style={styles.ruleRow}>

    <MaterialCommunityIcons
      name="check-circle"
      size={18}
      color="#16A34A"
    />

    <Text style={styles.ruleText}>
      ₹500 advance will be collected now.
    </Text>

  </View>

  <View style={styles.ruleRow}>

    <MaterialCommunityIcons
      name="check-circle"
      size={18}
      color="#16A34A"
    />

    <Text style={styles.ruleText}>
      Remaining amount is payable after delivery based on actual weight.
    </Text>

  </View>

  <View style={styles.ruleRow}>

    <MaterialCommunityIcons
      name="check-circle"
      size={18}
      color="#16A34A"
    />

    <Text style={styles.ruleText}>
      Previous invoice must be settled before placing the next order.
    </Text>

  </View>

  <View style={styles.ruleRow}>

    <MaterialCommunityIcons
      name="shield-check"
      size={18}
      color="#16A34A"
    />

    <Text style={styles.ruleText}>
      Secure online payment powered by Razorpay.
    </Text>

  </View>

</CBCard>

        <View style={styles.buttonRow}>

          <View style={styles.backButton}>
            <CBButton
              title="Modify Order"
              onPress={() => navigation.goBack()}
            />
          </View>

          <View style={styles.nextButton}>
            <CBButton
              title="PAY ₹500 & PLACE ORDER"
              onPress={() =>
                navigation.navigate(
  "PaymentCheckout",
  route.params
)
              }
            />
          </View>

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

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  statusContent: {
    flex: 1,
    marginLeft: 16,
  },

  statusTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0F172A",
  },

  statusSubtitle: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 21,
    color: "#64748B",
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  sectionTitle: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },

  shopName: {
    fontSize: 20,
    fontWeight: "700",
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
    marginBottom: 18,
  },

  label: {
    fontSize: 15,
    color: "#64748B",
    fontWeight: "500",
  },

  valueSmall: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 18,
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  totalLabel: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
  },

  notesBox: {
    backgroundColor: "#FFF7ED",
    borderRadius: 16,
    padding: 16,
  },

  notesText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#9A3412",
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  infoText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    lineHeight: 22,
    color: "#9A3412",
  },

  buttonRow: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 20,
  },

  backButton: {
    flex: 1,
    marginRight: 10,
  },

  nextButton: {
    flex: 2,
  },

  advanceText: {

  fontSize: 22,

  fontWeight: "900",

  color: "#16A34A",

},

balanceLabel: {

  fontSize: 17,

  fontWeight: "800",

  color: "#0F172A",

},

balanceNote: {

  marginTop: 14,

  color: "#64748B",

  fontSize: 13,

  lineHeight: 20,

},

ruleRow: {

  flexDirection: "row",

  alignItems: "flex-start",

  marginBottom: 14,

},

ruleText: {

  flex: 1,

  marginLeft: 12,

  fontSize: 14,

  lineHeight: 22,

  color: "#334155",

},

});