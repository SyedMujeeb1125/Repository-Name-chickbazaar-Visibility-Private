import React, {
  useEffect,
  useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import DateTimePicker from "@react-native-community/datetimepicker";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

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

export default function PlaceOrderScreen() {
  const [retailer, setRetailer] =
    useState<any>(null);

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

    const weightSlabs = [
  "1.5",
  "2.0",
  "2.5",
  "3.0",
];

  useEffect(() => {
    loadRetailer();
    loadRate();
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
          <Text style={styles.title}>
            Order Chicken
          </Text>

          {retailer && (
            <View
              style={
                styles.retailerCard
              }
            >
              <Text
                style={
                  styles.shopName
                }
              >
                {retailer.shopName}
              </Text>

              <Text
                style={
                  styles.shopInfo
                }
              >
                👤{" "}
                {retailer.ownerName}
              </Text>

              <Text
                style={
                  styles.shopInfo
                }
              >
                📱{" "}
                {retailer.mobile}
              </Text>

              <Text
                style={
                  styles.shopInfo
                }
              >
                Credit Category:{" "}
                {creditCategory}
              </Text>

              <Text
                style={
                  styles.shopInfo
                }
              >
                Available Credit:
                ₹
                {(
                  retailer?.availableCredit ||
                  0
                ).toLocaleString()}
              </Text>
            </View>
          )}

          <View style={styles.card}>
            <Text
  style={styles.label}
>
  Today's Live Rate
</Text>

            <Text
              style={
                styles.rateText
              }
            >
              ₹{todayRate}/KG
            </Text>

            <Text
              style={[
                styles.label,
                {
                  marginTop: 20,
                },
              ]}
            >
              Order Type
            </Text>

            <View
              style={
                styles.toggleRow
              }
            >
              <TouchableOpacity
  style={{
    marginRight: 30,
  }}
  onPress={() =>
    setOrderType(
      "weight"
    )
  }
>
                <Text>
                  {orderType ===
                  "weight"
                    ? "🔘 Weight"
                    : "⚪ Weight"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  setOrderType(
                    "birds"
                  )
                }
              >
                <Text>
                  {orderType ===
                  "birds"
                    ? "🔘 Birds"
                    : "⚪ Birds"}
                </Text>
              </TouchableOpacity>
            </View>

            {orderType ===
            "weight" ? (
              <>

                <Text
  style={styles.label}
>
  Required Weight
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
            color: "#FFF",
          },
        ]}
      >
        {item} KG
      </Text>
    </TouchableOpacity>
  ))}
</View>

<TextInput
  style={styles.input}
  placeholder="Or enter custom weight"
  value={requestedWeight}
  onChangeText={
    setRequestedWeight
  }
  keyboardType="numeric"
/>
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
              </>
            )}

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

            <View
              style={
                styles.summaryCard
              }
            >
              <Text>
                Estimated Amount:
                ₹
                {estimatedAmount.toLocaleString()}
              </Text>

              <Text>
                Advance Required:
                ₹
                {advanceRequired.toLocaleString()}
              </Text>
            </View>

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

          <TouchableOpacity
            style={styles.button}
            onPress={submitOrder}
          >
            <Text
              style={
                styles.buttonText
              }
            >
              Place Order
            </Text>
          </TouchableOpacity>
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

weightRow: {
  flexDirection: "row",
  flexWrap: "wrap",
  marginBottom: 12,
},

weightChip: {
  borderWidth: 1,
  borderColor: "#F97316",
  borderRadius: 20,
  paddingHorizontal: 15,
  paddingVertical: 8,
  marginRight: 8,
  marginBottom: 8,
},

weightChipActive: {
  backgroundColor: "#F97316",
},

weightChipText: {
  color: "#F97316",
  fontWeight: "600",
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
  });