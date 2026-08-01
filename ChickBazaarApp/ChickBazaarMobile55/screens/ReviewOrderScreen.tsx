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

          <Text
  numberOfLines={1}
  style={styles.shopName}
>
            {selectedShop?.shop_name}
          </Text>

          <Text
  numberOfLines={2}
  style={styles.shopAddress}
>
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
      Delivery
    </Text>

    <Text style={styles.valueSmall}>
  {deliveryPriority === "tomorrow"
    ? "Tomorrow Morning"
    : "Today"}
</Text>

  </View>

  

  <View style={styles.row}>

    <Text style={styles.label}>
      Quantity
    </Text>

    <Text style={styles.valueSmall}>
      <Text style={styles.valueSmall}>
  {quantity} Kg
</Text>
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
  Applicable Rate
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

    <Text style={styles.advanceText}>
  ₹{advanceRequired}
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

        

        <View style={styles.buttonContainer}>

  <CBButton
    title={`PAY ₹${advanceRequired} & PLACE ORDER`}
    onPress={() =>
      navigation.navigate("PaymentCheckout", {
        retailerId: route.params.retailerId,
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
      })
    }
  />

  <View style={{ height: 12 }} />

  <CBButton
  title="MODIFY ORDER"
  variant="outline"
  onPress={() => navigation.goBack()}
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
    marginBottom: 10,
  },

  sectionTitle: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },

  shopName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },

  shopAddress: {
    marginTop: 2,
    fontSize: 15,
    color: "#64748B",
    lineHeight: 22,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
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

  buttonContainer: {
  marginTop: 8,
  marginBottom: 12,
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