import React, {
  useState
} from "react";

import OrderTypeSelector from "../components/place-order/OrderTypeSelector";


import SelectedShopCard from "../components/place-order/SelectedShopCard";

import LiveEstimateCard from "../components/place-order/LiveEstimateCard";

import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";


import BottomSheet from "../components/ui/BottomSheet";


import BirdPreferenceCard from "../components/place-order/BirdPreferenceCard";
import AppHeader from "../components/ui/AppHeader";

import LiveRateBanner from "../components/place-order/LiveRateBanner";

import QuantitySelector from "../components/place-order/QuantitySelector";


import NotesCard from "../components/place-order/NotesCard";

import StickyFooter from "../components/place-order/StickyFooter";



import CustomQuantityModal from "../components/place-order/CustomQuantityModal";


import {
  estimateBirdCount,
  estimateWeight,
} from "../utils/orderCalculations";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  Colors,
  Typography
} from "../theme";




import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function PlaceOrderScreen({
  navigation,
  route,
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
] = useState<any>("closest");

const [
  selectedShop,
  setSelectedShop,
] = useState<any>(null);

  const [orderType, setOrderType] =
  useState<"weight" | "birds">("weight");

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

  const [showAdvanced, setShowAdvanced] =
  useState(false);

  const [showShopSheet, setShowShopSheet] =
  useState(false);
  
  const [quantityModalVisible, setQuantityModalVisible] =
  useState(false);

  const tabBarHeight = useBottomTabBarHeight();

  // ======================================================
// CHICKBAZAAR ORDER WINDOW
// ======================================================

const currentHour = new Date().getHours();

const isRegular = currentHour < 11;

const isExpress =
  currentHour >= 11 &&
  currentHour < 18;

const isTomorrow =
  currentHour >= 18;

// ======================================================
// ORDER ESTIMATION
// ======================================================

const estimatedAmount =
  Number(requestedWeight || 0) *
  todayRate;

// ======================================================
// BUSINESS RULE
// Every order requires ₹500 advance.
// ======================================================

const advanceRequired = 500;

// ======================================================
// LIVE ESTIMATION
// ======================================================

// ======================================================
// BIRD PREFERENCE SUMMARY
// ======================================================


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

      deliveryPriority:
  isRegular
    ? "regular"
    : isExpress
    ? "express"
    : "tomorrow",

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
  <SafeAreaView style={styles.safeArea}>
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : undefined
      }
    >
      <ScrollView
  showsVerticalScrollIndicator={false}
  contentContainerStyle={[
    styles.container,
    {
      paddingBottom: tabBarHeight + 120,
    },
  ]}
>

        <AppHeader
  title={
    isRegular
      ? "Regular Order"
      : isExpress
      ? "Express Order"
      : "Tomorrow's Order"
  }
  subtitle={
    isRegular
      ? "Order before 11:00 AM for regular delivery."
      : isExpress
      ? "Express delivery available until 6:00 PM."
      : "Book today for tomorrow's fresh delivery."
  }
/>

{isExpress && (

  <View style={styles.emergencyBanner}>

    <Text style={styles.emergencyTitle}>
      ⚡ Emergency Delivery Request
    </Text>

    <Text style={styles.emergencyText}>
      We'll try our best to arrange today's delivery based on farm, vehicle and captain availability.
    </Text>

  </View>

)}

{isTomorrow && (

  <View style={styles.tomorrowBanner}>

    <Text style={styles.tomorrowTitle}>
      📅 Tomorrow's Delivery
    </Text>

    <Text style={styles.tomorrowText}>
      Your order will be scheduled for tomorrow's first available delivery slot.
    </Text>

  </View>

)}

        <LiveRateBanner
          rate={todayRate}
        />

        <SelectedShopCard
  shop={selectedShop}
  canChange={shops.length > 1}
  onChange={() =>
    setShowShopSheet(true)
  }
/>

<OrderTypeSelector
  value={orderType}
  onChange={setOrderType}
/>

<QuantitySelector
  orderType={orderType}
  value={
    orderType === "weight"
      ? Number(requestedWeight || 0)
      : Number(birds || 0)
  }
  onSelect={(qty: number) => {

    if (orderType === "weight") {

      setRequestedWeight(String(qty));

    } else {

      setBirds(String(qty));

    }

  }}
  onIncrease={() => {

    if (orderType === "weight") {

      const current =
        Number(requestedWeight || 0);

      const step =
        current >= 200 ? 50 : 10;

      setRequestedWeight(
        String(current + step)
      );

    } else {

      setBirds(
        String(Number(birds || 0) + 10)
      );

    }

  }}
  onDecrease={() => {

    if (orderType === "weight") {

      const current =
        Number(requestedWeight || 0);

      const step =
        current > 200 ? 50 : 10;

      setRequestedWeight(
        String(
          Math.max(
            0,
            current - step
          )
        )
      );

    } else {

      setBirds(
        String(
          Math.max(
            0,
            Number(birds || 0) - 10
          )
        )
      );

    }

  }}
  onEdit={() => {
    setQuantityModalVisible(true);
  }}
/>

<LiveEstimateCard
  orderType={orderType}
  quantity={
    orderType === "weight"
      ? Number(requestedWeight || 0)
      : Number(birds || 0)
  }
  estimatedBirds={estimatedBirds}
  estimatedWeight={estimatedWeight}
  estimatedAmount={estimatedAmount}
  todayRate={todayRate}
/>

<TouchableOpacity
  style={styles.customizeCard}
  onPress={() =>
    setShowAdvanced(!showAdvanced)
  }
>

  <View>

    <Text style={styles.customizeTitle}>
      ✨ Additional Preferences
    </Text>

    <Text style={styles.customizeSubtitle}>
      Customize bird preference,
delivery slot
and special instructions.
    </Text>

  </View>

  <Text style={styles.arrow}>
    {showAdvanced ? "▲" : "▼"}
  </Text>

</TouchableOpacity>

{showAdvanced && (
  <>

    <BirdPreferenceCard
      onChange={setBirdPreferences}
    />

    <View style={styles.deliverySlotCard}>

      <Text style={styles.deliverySlotTitle}>
        Delivery Slot
      </Text>

      <Text style={styles.deliverySlotSubtitle}>
        Choose your preferred delivery time.
      </Text>

      <TouchableOpacity
        style={styles.slotItem}
      >
        <Text style={styles.slotText}>
          🚚 Next Available
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.slotItem}
      >
        <Text style={styles.slotText}>
          🕑 2:00 PM – 4:00 PM
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.slotItem}
      >
        <Text style={styles.slotText}>
          🕓 4:00 PM – 6:00 PM
        </Text>
      </TouchableOpacity>

    </View>

    <View style={styles.termsCard}>

      <Text style={styles.termsTitle}>
        Commercial Terms
      </Text>

      <Text style={styles.term}>
        ✓ ₹500 Advance Payment
      </Text>

      <Text style={styles.term}>
        ✓ Actual Weight Billing
      </Text>

      <Text style={styles.term}>
        ✓ Bill-to-Bill Settlement
      </Text>

      <Text style={styles.term}>
        ✓ Delivery Slot Confirmation
      </Text>

    </View>

    <NotesCard
      value={notes}
      onChange={setNotes}
    />

  </>
)}

      </ScrollView>

<BottomSheet
  visible={showShopSheet}
  title="Choose Delivery Shop"
  selectedId={selectedShop?.id}
  items={shops.map((shop) => ({
    id: shop.id,
    title: shop.shopName,
    subtitle: shop.address,
  }))}
  onClose={() =>
    setShowShopSheet(false)
  }
  onSelect={(id) => {

    const shop = shops.find(
      (item) => item.id === id
    );

    if (shop) {
      setSelectedShop(shop);
    }

  }}
/>

<StickyFooter
  amount={estimatedAmount}
  onReview={reviewOrder}
/>

    </KeyboardAvoidingView>
    <CustomQuantityModal
  visible={quantityModalVisible}
  weight={Number(requestedWeight || 0)}
  birds={Number(birds || 0)}
  onClose={() => setQuantityModalVisible(false)}
  onApply={(weight, birdCount) => {
    if (orderType === "weight") {
      setRequestedWeight(String(weight));
      setBirds(String(birdCount));
    } else {
      setBirds(String(birdCount));
      setRequestedWeight(String(weight));
    }

    setQuantityModalVisible(false);
  }}
/>
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

    shopName:{
  color:"#0F172A",
  fontSize:22,
  fontWeight:"700",
},

shopInfo: {
  color: "#64748B",
  marginTop: 6,
  fontSize: 15,
},
card: {
  backgroundColor: "#FFFFFF",
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
customizeCard:{
  backgroundColor:"#FFFFFF",
  borderRadius:18,
  padding:18,
  marginTop:20,
  marginBottom:10,
  flexDirection:"row",
  justifyContent:"space-between",
  alignItems:"center",
  borderWidth:1,
  borderColor:"#E2E8F0",
},

customizeTitle:{
  fontSize:17,
  fontWeight:"700",
  color:"#0F172A",
},

customizeSubtitle:{
  marginTop:6,
  fontSize:14,
  color:"#64748B",
  lineHeight:20,
},

arrow:{
  fontSize:22,
  color:"#F97316",
  fontWeight:"700",
},

emergencyBanner: {

  backgroundColor: "#FFF7ED",

  borderRadius: 18,

  padding: 18,

  marginBottom: 18,

  borderLeftWidth: 5,

  borderLeftColor: "#F97316",

},

emergencyTitle: {

  fontSize: 18,

  fontWeight: "800",

  color: "#9A3412",

},

emergencyText: {

  marginTop: 8,

  fontSize: 14,

  lineHeight: 22,

  color: "#7C2D12",

},

tomorrowBanner: {

  backgroundColor: "#ECFDF5",

  borderRadius: 18,

  padding: 18,

  marginBottom: 18,

  borderLeftWidth: 5,

  borderLeftColor: "#16A34A",

},

tomorrowTitle: {

  fontSize: 18,

  fontWeight: "800",

  color: "#166534",

},

tomorrowText: {

  marginTop: 8,

  fontSize: 14,

  lineHeight: 22,

  color: "#166534",

},

deliverySlotCard: {

  backgroundColor: "#FFFFFF",

  borderRadius: 20,

  padding: 18,

  marginBottom: 20,

},

deliverySlotTitle: {

  fontSize: 18,

  fontWeight: "800",

  color: "#0F172A",

},

deliverySlotSubtitle: {

  marginTop: 6,

  color: "#64748B",

  marginBottom: 18,

},

slotItem: {

  backgroundColor: "#F8FAFC",

  borderRadius: 14,

  paddingVertical: 14,

  paddingHorizontal: 16,

  marginBottom: 12,

  borderWidth: 1,

  borderColor: "#E2E8F0",

},

slotText: {

  fontSize: 15,

  fontWeight: "600",

  color: "#0F172A",

},

termsCard: {

  backgroundColor: "#FFF7ED",

  borderRadius: 20,

  padding: 18,

  marginBottom: 20,

},

termsTitle: {

  fontSize: 18,

  fontWeight: "800",

  color: "#9A3412",

  marginBottom: 14,

},

term: {

  fontSize: 14,

  color: "#7C2D12",

  marginBottom: 10,

},
  });