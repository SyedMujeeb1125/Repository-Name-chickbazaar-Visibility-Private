import React, {
  useEffect,
  useState,
} from "react";

import OrderTypeSelector
from "../components/place-order/OrderTypeSelector";

import AsyncStorage from "@react-native-async-storage/async-storage";

import DateTimePicker from "@react-native-community/datetimepicker";

import CBButton from "../components/common/CBButton";

import OrderEstimateCard from "../components/place-order/OrderEstimateCard";

import BirdPreferenceCard from "../components/place-order/BirdPreferenceCard";

import FulfilmentPreferenceCard
from "../components/place-order/FulfilmentPreferenceCard";

import DeliveryPriorityCard from "../components/place-order/DeliveryPriorityCard";

import {
  DEFAULT_WEIGHT_OPTIONS,
} from "../constants/business";

import {
  estimateBirdCount,
  estimateWeight,
} from "../utils/orderCalculations";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  Colors,
  Radius,
  Spacing,
  Typography,
} from "../theme";

import CBCard from "../components/common/CBCard";

import CBHeader from "../components/common/CBHeader";

import CBInput from "../components/common/CBInput";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

export default function PlaceOrderScreen({
  navigation,
}: any) {
  const [retailer, setRetailer] =
    useState<any>(null);

    const [shops, setShops] =
  useState<any[]>([]);

  const [birdPreferences, setBirdPreferences] =
  useState<any[]>([]);

  const [
deliveryPriority,
setDeliveryPriority,
] = useState("standard");

  const [
  fulfilmentPreference,
  setFulfilmentPreference,
] = useState("closest");

const [
  selectedShop,
  setSelectedShop,
] = useState<any>(null);

  const [orderType, setOrderType] =
    useState("weight");

  const [
    requestedWeight,
    setRequestedWeight,
  ] = useState("");

  const [birds, setBirds] =
    useState("");

  const [notes, setNotes] =
    useState("");

  const [todayRate, setTodayRate] =
    useState(0);

  const [deliveryDate, setDeliveryDate] =
    useState(
      new Date()
        .toISOString()
        .split("T")[0]
    );

    const [showDatePicker, setShowDatePicker] =
  useState(false);

    const weightSlabs =
  DEFAULT_WEIGHT_OPTIONS.map(
    (item) => String(item)
  );

  useEffect(() => {
  loadRetailer();
  loadRate();
  loadShops();
}, []);

  async function loadRetailer() {
    const mobile =
      await AsyncStorage.getItem(
        "retailerMobile"
      );

    const response =
      await fetch(
        `https://www.chickbazaar.com/api/mobile/profile?mobile=${mobile}`
      );

    const data =
      await response.json();

    setRetailer(data);
  }

  async function loadShops() {
  const mobile =
    await AsyncStorage.getItem(
      "retailerMobile"
    );

  const response =
    await fetch(
      `https://www.chickbazaar.com/api/mobile/shops?mobile=${mobile}`
    );

  const data =
    await response.json();

  setShops(data);

  if (data.length > 0) {
    setSelectedShop(data[0]);
  }
}
function chooseShop() {
  if (shops.length <= 1) {
    return;
  }

  Alert.alert(
    "Select Delivery Shop",
    "",
    shops.map((shop) => ({
      text: shop.shopName,
      onPress: () =>
        setSelectedShop(shop),
    }))
  );
}

  async function loadRate() {
    try {
      const response =
        await fetch(
          "https://www.chickbazaar.com/api/mobile/rate"
        );

      const data =
        await response.json();

      setTodayRate(
        Number(data.rate || 0)
      );
    } catch {}
  }

  const creditCategory =
    retailer?.creditCategory ||
    "new";

  const estimatedAmount =
    Number(requestedWeight || 0) *
    todayRate;

  const advancePercentage =
    creditCategory === "premium"
      ? 0
      : creditCategory ===
        "trusted"
      ? 10
      : 20;

  const advanceRequired =
    Math.round(
      (estimatedAmount *
        advancePercentage) /
        100
    );

    const estimatedBirds =
  estimateBirdCount(
    Number(requestedWeight || 0)
  );

const estimatedWeight =
  estimateWeight(
    Number(birds || 0)
  );
const selectedBirds =
  birdPreferences
    .filter((x) => x.selected)
    .reduce(
      (sum, x) => sum + x.quantity,
      0
    );

const selectedWeight =
  birdPreferences
    .filter((x) => x.selected)
    .reduce(
      (sum, x) =>
        sum + x.quantity * x.weight,
      0
    );
    function reviewOrder() {

  if (!retailer) {

    Alert.alert(
      "Retailer not loaded"
    );

    return;

  }

  if (!selectedShop) {

    Alert.alert(
      "Please select a shop"
    );

    return;

  }

  const quantity =
    orderType === "weight"
      ? Number(requestedWeight)
      : Number(birds);

  if (quantity <= 0) {

    Alert.alert(
      "Please enter quantity"
    );

    return;

  }

  navigation.navigate(
    "ReviewOrder",
    {

      retailer,

      selectedShop,

      todayRate,

      quantity,

      estimatedAmount,

      advanceRequired,

      deliveryDate,

      deliveryPriority,

      notes,

      fulfilmentPreference,

      orderType,

      requestedWeight,

      birds,

    }
  );

}

  async function submitOrder() {
    try {
      if (
        orderType ===
          "weight" &&
        !requestedWeight
      ) {
        Alert.alert(
          "Error",
          "Please enter weight"
        );
        return;
      }

      if (
        orderType ===
          "birds" &&
        !birds
      ) {
        Alert.alert(
          "Error",
          "Please enter bird count"
        );
        return;
      }

      if (!retailer) {
        Alert.alert(
          "Error",
          "Retailer not loaded"
        );
        return;
      }

      const formData =
        new FormData();

      formData.append(
        "orderBy",
        orderType
      );

      formData.append(
        "shopName",
        retailer.shopName
      );

      formData.append(
        "ownerName",
        retailer.ownerName
      );

      formData.append(
        "mobile",
        retailer.mobile
      );

      formData.append(
        "email",
        retailer.email
      );

      formData.append(
        "address",
        retailer.address
      );

      formData.append(
        "requestedWeight",
        requestedWeight
      );

      formData.append(
        "birds",
        birds
      );

      formData.append(
        "paymentType",
        "advance"
      );

      formData.append(
        "deliveryDate",
        deliveryDate
      );

      formData.append(
        "latitude",
        String(
          retailer.latitude || 0
        )
      );

      formData.append(
        "longitude",
        String(
          retailer.longitude || 0
        )
      );

      formData.append(
        "notes",
        notes
      );

      const response =
        await fetch(
          "https://www.chickbazaar.com/api/orders",
          {
            method: "POST",
            body: formData,
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        Alert.alert(
          "Error",
          data.message ||
            "Unable to place order"
        );
        return;
      }

      Alert.alert(
        "Success",
        "Order placed successfully"
      );

      setRequestedWeight("");
      setBirds("");
      setNotes("");
    } catch (error: any) {
      Alert.alert(
        "Error",
        String(error)
      );
    }
  }

  return (
    <SafeAreaView
      style={styles.safeArea}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : undefined
        }
      >
        <ScrollView
          showsVerticalScrollIndicator={
            false
          }
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={
            styles.container
          }
        >
          <CBHeader
  title="Place Order"
  subtitle="Fresh live birds delivered to your shop"
/>

<CBCard
  style={styles.rateCard}
>
  <Text
    style={styles.rateLabel}
  >
    TODAY'S LIVE RATE
  </Text>

  <Text
    style={styles.rateValue}
  >
    ₹
    {todayRate.toLocaleString()}
    / KG
  </Text>

  <Text
    style={styles.rateSubtitle}
  >
    Updated Today
  </Text>
</CBCard>

          {retailer && (
  <CBCard
  style={styles.retailerCard}
>
    <View style={styles.retailerHeader}>
      <Text style={styles.shopName}>
        🏪 {retailer.shopName}
      </Text>
    </View>

    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>Owner</Text>
      <Text style={styles.infoValue}>
        {retailer.ownerName}
      </Text>
    </View>

    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>Credit Category</Text>
      <View style={styles.creditBadge}>
        <Text style={styles.creditBadgeText}>
          {creditCategory.toUpperCase()}
        </Text>
      </View>
    </View>

    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>Available Credit</Text>
      <Text style={styles.creditValue}>
        ₹{(retailer.availableCredit || 0).toLocaleString()}
      </Text>
    </View>
  </CBCard>
)}
          {selectedShop && (
  <CBCard>
<TouchableOpacity
  onPress={chooseShop}
>
    <Text style={styles.label}>
      Deliver To
    </Text>

    <Text
      style={{
        fontSize: 18,
        fontWeight: "700",
        marginTop: 8,
      }}
    >
      🏪 {selectedShop.shopName}
{shops.length > 1 ? " ▼" : ""}
    </Text>

    <Text
      style={{
        color: "#64748B",
        marginTop: 6,
      }}
    >
      📍 {selectedShop.address}
    </Text>
  </TouchableOpacity>
</CBCard>
)}

          <View style={styles.card}>

            <OrderTypeSelector
  value={
    orderType as
      "weight" | "birds"
  }
  onChange={setOrderType}
/>

            {orderType ===
            "weight" ? (
              <>

                <Text style={styles.sectionHeading}>
  Enter Weight
</Text>

<View style={styles.weightRow}>
  {weightSlabs.map((item) => (
    <TouchableOpacity
      key={item}
      style={[
        styles.weightChip,
        requestedWeight === item &&
          styles.weightChipActive,
      ]}
      onPress={() =>
        setRequestedWeight(item)
      }
    >
      <Text
        style={[
          styles.weightChipText,
          requestedWeight === item && {
            color: "#FFFFFF",
          },
        ]}
      >
        {item} kg
      </Text>
    </TouchableOpacity>
  ))}
</View>

<CBInput
  placeholder="Enter Custom Weight"
  value={requestedWeight}
  onChangeText={setRequestedWeight}
  keyboardType="numeric"
/>

{Number(requestedWeight) > 0 && (
  <View style={styles.infoBox}>
    <Text style={styles.infoTitle}>
      Estimated Birds
    </Text>

    <Text style={styles.infoValue}>
      ≈ {estimatedBirds} Birds
    </Text>

    <Text style={styles.infoSubtitle}>
      Based on average 2.0 KG live bird
    </Text>
  </View>
)}

              </>
            ) : (
              <>
                <Text
                  style={
                    styles.label
                  }
                >
                  Number of Birds
                </Text>

                <TextInput
                  style={
                    styles.input
                  }
                  placeholder="Bird Count"
                  value={birds}
                  onChangeText={
                    setBirds
                  }
                  keyboardType="numeric"
                />
                {Number(birds) > 0 && (
  <Text
    style={{
      marginTop: 10,
      color: "#64748B",
      fontSize: 14,
    }}
  >
    Estimated Weight: ≈ {estimatedWeight} KG{"\n"}
    (Based on average 2.0 KG live bird)
  </Text>
)}
              </>
            )}
<BirdPreferenceCard
  onChange={setBirdPreferences}
/>

<FulfilmentPreferenceCard
  value={
    fulfilmentPreference as
      any
  }
  onChange={
    setFulfilmentPreference
  }
/>

<DeliveryPriorityCard
  onChange={setDeliveryPriority}
/>
            <Text
  style={styles.label}
>
  Preferred Delivery Date
</Text>

<TouchableOpacity
  style={styles.input}
  onPress={() =>
    setShowDatePicker(true)
  }
>
  <Text>
    {deliveryDate}
  </Text>
</TouchableOpacity>

{showDatePicker && (
  <DateTimePicker
    value={
      new Date(deliveryDate)
    }
    mode="date"
    minimumDate={
      new Date()
    }
    onChange={(
      event,
      selectedDate
    ) => {
      setShowDatePicker(
        false
      );

      if (selectedDate) {
        setDeliveryDate(
          selectedDate
            .toISOString()
            .split("T")[0]
        );
      }
    }}
  />
)}
{birdPreferences.some(
  (x) => x.selected
) && (

<View
  style={{
    backgroundColor:"#FEF3C7",
    padding:15,
    borderRadius:12,
    marginBottom:15,
  }}
>

<Text
style={{
fontWeight:"700",
marginBottom:6,
}}
>
Bird Preference Summary
</Text>

<Text>
Selected Birds: {selectedBirds}
</Text>

<Text>
Estimated Weight: {selectedWeight.toFixed(1)} KG
</Text>

</View>

)}
            <OrderEstimateCard

  orderType={
    orderType as
      "weight" | "birds"
  }

  requestedWeight={
    Number(requestedWeight)
  }

  estimatedBirds={
    estimatedBirds
  }

  birdCount={
    Number(birds)
  }

  estimatedWeight={
    estimatedWeight
  }

  rate={todayRate}

  estimatedAmount={
    estimatedAmount
  }

  advanceAmount={
    advanceRequired
  }

/>

            <Text
  style={styles.label}
>
  Notes (Optional)
</Text>

            <TextInput
              style={
                styles.notesInput
              }
              multiline
              value={notes}
              onChangeText={
                setNotes
              }
              placeholder="Delivery instructions (optional)"
            />
          </View>

          <CBButton
  title="Review Order"
  onPress={reviewOrder}
/>
        </ScrollView>
      </KeyboardAvoidingView>
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
      padding: 20,
      paddingBottom: 40,
    },

    headerCard: {
  backgroundColor: "#FFFFFF",
  borderRadius: 20,
  padding: 18,
  marginBottom: 20,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
},

rateCard: {
  backgroundColor: "#F97316",
  borderRadius: 20,
  padding: 20,
  marginBottom: 20,
},

rateLabel: {
  color: "#FFFFFF",
  fontSize: 13,
  fontWeight: "600",
},

rateValue: {
  color: "#FFFFFF",
  fontSize: 34,
  fontWeight: "700",
  marginTop: 8,
},

rateSubtitle: {
  color: "#FFEDD5",
  marginTop: 6,
  fontSize: 13,
},

sectionHeading: {
  fontSize: 18,
  fontWeight: "700",
  color: "#0F172A",
  marginBottom: 12,
  marginTop: 12,
},

weightRow: {
  flexDirection: "row",
  flexWrap: "wrap",
  marginBottom: 14,
},

infoBox: {
  backgroundColor: "#FFF7ED",
  borderRadius: 12,
  padding: 16,
  marginTop: 14,
  marginBottom: 18,
},

infoTitle: {
  fontSize: 15,
  fontWeight: "700",
  color: "#0F172A",
},

infoSubtitle: {
  marginTop: 6,
  fontSize: 13,
  color: "#64748B",
},

greeting: {
  fontSize: 14,
  color: "#64748B",
},

rateBadge: {
  backgroundColor: "#F97316",
  paddingHorizontal: 16,
  paddingVertical: 12,
  borderRadius: 16,
},

rateBadgeLabel: {
  color: "#FFF",
  fontSize: 12,
},

rateBadgeValue: {
  color: "#FFF",
  fontWeight: "700",
  fontSize: 20,
},

    title: {
      fontSize: 28,
      fontWeight: "700",
      marginBottom: 20,
      color: "#0F172A",
    },

    retailerCard: {
      backgroundColor:
        "#F97316",
      borderRadius: 20,
      padding: 20,
      marginBottom: 20,
    },

    shopName: {
      color: "#FFF",
      fontSize: 22,
      fontWeight: "700",
    },

    shopInfo: {
      color: "#FFF",
      marginTop: 4,
    },

    card: {
      backgroundColor:
        "#FFF",
      borderRadius: 18,
      padding: 18,
      marginBottom: 20,
    },

    label: {
      fontWeight: "600",
      marginBottom: 8,
      marginTop: 12,
    },

    rateText: {
      fontSize: 24,
      fontWeight: "700",
      color: "#F97316",
    },

    toggleRow: {
  flexDirection: "row",
  marginBottom: 20,
},

weightChip: {
  height: 42,
  minWidth: 78,
  paddingHorizontal: 18,
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 12,
  borderWidth: 1,
  borderColor: Colors.border,
  backgroundColor: Colors.white,
  marginRight: 10,
  marginBottom: 10,
},

weightChipActive: {
  backgroundColor: Colors.primary,
  borderColor: Colors.primary,
},

weightChipText: {
  fontSize: 14,
  fontWeight: Typography.bold,
  color: Colors.text,
},

    input: {
      borderWidth: 1,
      borderColor:
        "#E2E8F0",
      borderRadius: 12,
      padding: 14,
      backgroundColor:
        "#F8FAFC",
    },

    summaryCard: {
      backgroundColor:
        "#F8FAFC",
      borderRadius: 12,
      padding: 15,
      marginTop: 15,
    },

    notesInput: {
      borderWidth: 1,
      borderColor:
        "#E2E8F0",
      borderRadius: 12,
      padding: 14,
      minHeight: 100,
      textAlignVertical:
        "top",
      backgroundColor:
        "#F8FAFC",
    },

    button: {
      backgroundColor:
        "#F97316",
      padding: 18,
      borderRadius: 16,
    },

    buttonText: {
      color: "#FFF",
      textAlign: "center",
      fontWeight: "700",
      fontSize: 16,
    },
    retailerHeader: {
  marginBottom: 16,
},

infoRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingVertical: 10,
  borderTopWidth: 1,
  borderTopColor: "rgba(255,255,255,0.2)",
},

infoLabel: {
  color: "#FFF",
  fontSize: 14,
},

infoValue: {
  color: "#FFF",
  fontWeight: "600",
  fontSize: 16,
},

creditBadge: {
  backgroundColor: "#FFFFFF",
  paddingHorizontal: 10,
  paddingVertical: 5,
  borderRadius: 20,
},

creditBadgeText: {
  color: "#F97316",
  fontWeight: "700",
  fontSize: 12,
},

creditValue: {
  color: "#FFF",
  fontWeight: "700",
  fontSize: 20,
},
  });