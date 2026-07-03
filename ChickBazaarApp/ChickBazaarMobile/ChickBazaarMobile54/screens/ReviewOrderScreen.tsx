import React from "react";

import { SafeAreaView } from "react-native-safe-area-context";

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import CBHeader from "../components/common/CBHeader";
import CBCard from "../components/common/CBCard";
import CBButton from "../components/common/CBButton";
import CBAmount from "../components/common/CBAmount";

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
      >
        <CBHeader
          title="Review Order"
          subtitle="Please verify all details before proceeding."
        />

        <CBCard>
          <Text style={styles.sectionTitle}>
🏪 Delivery Shop
</Text>

          <Text style={styles.value}>
            {selectedShop?.shopName}
          </Text>

          <Text style={styles.sub}>
            {selectedShop?.address}
          </Text>
        </CBCard>

        <CBCard>
          <Text style={styles.sectionTitle}>
📦 Order Summary
</Text>

          <View style={styles.row}>
            <Text style={styles.label}>
              Order Type
            </Text>

            <Text style={styles.valueSmall}>
              {orderType === "birds"
                ? "By Birds"
                : "By Weight"}
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
              Delivery Priority
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
              {fulfilmentPreference || "Closest Match"}
            </Text>
          </View>
        </CBCard>

        <CBCard>
          <Text style={styles.sectionTitle}>
💰 Payment Summary
</Text>

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
              Estimated Amount
            </Text>

            <CBAmount
              amount={estimatedAmount}
            />
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>
              Advance Required
            </Text>

            <CBAmount
              amount={advanceRequired}
            />
          </View>
          <View
style={{
height:1,
backgroundColor:"#E2E8F0",
marginVertical:18,
}}
/>

<View
style={styles.row}
>

<Text
style={{
fontSize:18,
fontWeight:"700",
}}
>
Estimated Total
</Text>

<CBAmount
amount={estimatedAmount}
size={30}
/>

</View>
        </CBCard>

        <CBCard>

<Text style={styles.sectionTitle}>
🚚 Delivery Details
</Text>

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
{deliveryPriority}
</Text>

</View>

<View style={styles.row}>

<Text style={styles.label}>
Fulfilment
</Text>

<Text style={styles.valueSmall}>
{fulfilmentPreference}
</Text>

</View>

</CBCard>

        {!!notes && (
          <CBCard>
            <Text style={styles.sectionTitle}>
              Notes
            </Text>

            <Text>{notes}</Text>
          </CBCard>
        )}

        <View style={styles.buttonRow}>
          <View style={styles.backButton}>
            <CBButton
              title="Back"
              onPress={() =>
                navigation.goBack()
              }
            />
          </View>

          <View style={styles.nextButton}>
            <CBButton
              title="Continue to Payment"
              onPress={() =>
                navigation.navigate(
                  "Payments",
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

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
  },

  label: {
    color: "#64748B",
    fontSize: 15,
  },

  value: {
    fontSize: 20,
    fontWeight: "700",
  },

  valueSmall: {
    fontSize: 16,
    fontWeight: "600",
  },

  sub: {
    marginTop: 5,
    color: "#64748B",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  buttonRow: {
    flexDirection: "row",
    marginTop: 10,
  },

  backButton: {
    flex: 1,
    marginRight: 8,
  },

  nextButton: {
    flex: 2,
  },
});