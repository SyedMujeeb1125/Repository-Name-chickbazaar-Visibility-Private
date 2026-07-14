import React from "react";

import {
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  getDeliveryHeader,
  getTodayDate,
  getTomorrowDate,
} from "../../utils/dateHelpers";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import PrimaryButton from "../ui/PrimaryButton";

type Props = {
  hasOrderToday: boolean;

  deliveryStatus?: string;

  driverName?: string;

  eta?: string;

  isDelivered?: boolean;

  onPlaceOrder: () => void;

  onTrackOrder: () => void;

  onRepeatOrder?: () => void;

  onChangeQuantity?: () => void;
};

export default function DashboardHero({

  hasOrderToday,

  deliveryStatus,

  driverName,

  eta,

  isDelivered = false,

  onPlaceOrder,

  onTrackOrder,

  onRepeatOrder,

  onChangeQuantity,

}: Props) {

  console.log("hasOrderToday =", hasOrderToday);

  const hour = new Date().getHours();

  const today = getDeliveryHeader(
  getTodayDate()
);

const tomorrow = getDeliveryHeader(
  getTomorrowDate()
);

  const isRegular = hour < 11;

  const isExpress =
    hour >= 11 && hour < 18;

  const isTomorrow =
    hour >= 18;

  if (!hasOrderToday) {

    let title =
      "PLACE TODAY'S ORDER";

    let button =
      "PLACE ORDER";

    let badge =
      "READY TO ORDER";

    let badgeColor =
      "#16A34A";

    let description =
      "Healthy live broiler chicken delivered directly from verified farms.";

    if (isExpress) {

  title =
    "PLACE TODAY'S ORDER";

  button =
    "PLACE ORDER";

  badge =
    "EXPRESS DELIVERY";

  badgeColor =
    "#F97316";

  description =
    "Need birds urgently? Express delivery is available with additional charges.";

}

    if (isTomorrow) {

      title =
        "BOOK FOR TOMORROW";

      button =
        "BOOK NOW";

      badge =
        "TOMORROW DELIVERY";

      badgeColor =
        "#2563EB";

      description =
        "Reserve tomorrow's delivery slot today for uninterrupted business.";

    }

    return (

      <View style={styles.card}>

        <View style={styles.heroRow}>

          <Image
            source={require("../../assets/live-broiler.png")}
            resizeMode="contain"
            style={styles.chicken}
          />

          <View style={styles.content}>

            <View
              style={[
                styles.badge,
                {
                  borderColor: badgeColor,
                },
              ]}
            >

              <MaterialCommunityIcons
                name="check-decagram"
                size={16}
                color={badgeColor}
              />

              <Text
                style={[
                  styles.badgeText,
                  {
                    color: badgeColor,
                  },
                ]}
              >
                {badge}
              </Text>

            </View>

            <Text style={styles.title}>
              {title}
            </Text>

            <Text
  style={{
    marginTop: 8,
    fontSize: 14,
    color: "#64748B",
    fontWeight: "500",
  }}
>
  Order in less than a minute.
</Text>

                        <View style={styles.featureRow}>
  <MaterialCommunityIcons
    name="check"
    size={18}
    color="#16A34A"
  />
  <Text style={styles.featureText}>
    Live Broiler Chicken
  </Text>
</View>

<View style={styles.featureRow}>
  <MaterialCommunityIcons
    name="check"
    size={18}
    color="#16A34A"
  />
  <Text style={styles.featureText}>
    Healthy Feed
  </Text>
</View>

<View style={styles.featureRow}>
  <MaterialCommunityIcons
    name="check"
    size={18}
    color="#16A34A"
  />
  <Text style={styles.featureText}>
    Same-Day Delivery
  </Text>
</View>

            <View style={styles.buttonContainer}>

              <PrimaryButton
  title={button}
  onPress={onPlaceOrder}
  style={{
    width: "95%",
    alignSelf: "center",
  }}
/>

            </View>

          </View>

        </View>

      </View>

    );

  }

  return (

    <View style={styles.card}>

      <View style={styles.deliveryHeader}>

        <Image
          source={require("../../assets/live-broiler.png")}
          resizeMode="contain"
          style={styles.deliveryChicken}
        />

        <View style={{ flex: 1 }}>

          <View>

  <Text style={styles.deliveryTitle}>
  Today's Order
</Text>

  <Text style={styles.deliveryDate}>
    {today.weekday}
  </Text>

  <Text style={styles.deliverySubDate}>
    {today.formattedDate}
  </Text>

</View>

          <Text style={styles.deliveryStatus}>
            {deliveryStatus || "Confirmed"}
          </Text>

        </View>

      </View>

      <View style={styles.divider} />

      <View style={styles.infoRow}>

        <MaterialCommunityIcons
          name="account-circle-outline"
          size={22}
          color="#64748B"
        />

        <Text style={styles.infoLabel}>
          Delivery Captain
        </Text>

        <Text style={styles.infoValue}>
          {driverName || "Assigning..."}
        </Text>

      </View>

      <View style={styles.infoRow}>

        <MaterialCommunityIcons
          name="clock-outline"
          size={22}
          color="#64748B"
        />

        <Text style={styles.infoLabel}>
          ETA
        </Text>

        <Text style={styles.infoValue}>
          {eta || "--"}
        </Text>

      </View>
            <View style={styles.infoRow}>

        <MaterialCommunityIcons
          name="truck-delivery-outline"
          size={22}
          color="#64748B"
        />

        <Text style={styles.infoLabel}>
          Status
        </Text>

        <Text
          style={[
            styles.infoValue,
            {
              color: "#16A34A",
            },
          ]}
        >
          {deliveryStatus || "Order Confirmed"}
        </Text>

      </View>

      <View style={styles.buttonContainer}>

        <PrimaryButton
  title="TRACK ORDER"
  onPress={onTrackOrder}
  style={{
    width: "95%",
    alignSelf: "center",
  }}
/>

      </View>

    </View>

  );

}

const styles = StyleSheet.create({

  card: {
  backgroundColor: "#FFFFFF",
  borderRadius: 26,

  paddingTop: 16,
  paddingHorizontal: 16,
  paddingBottom: 8,

  marginBottom: 8,

  shadowColor: "#000",
  shadowOpacity: 0.08,
  shadowRadius: 16,
  shadowOffset: {
    width: 0,
    height: 8,
  },
  elevation: 8,
},

  heroRow: {

    flexDirection: "row",

    alignItems: "center",

  },

  chicken: {

    width: 130,

    height: 165,

    marginRight: 6,

  },

  content: {

    flex: 1,

  },

  badge: {

    flexDirection: "row",

    alignItems: "center",

    alignSelf: "flex-start",

    borderWidth: 1,

    borderRadius: 20,

    paddingHorizontal: 10,

    paddingVertical: 5,

    marginBottom: 12,

  },

  badgeText: {

    marginLeft: 6,

    fontSize: 14,

    fontWeight: "700",

  },

  title: {

    fontSize: 20,

    fontWeight: "900",

    color: "#0F172A",

  },

  description: {

    marginTop: 8,

    fontSize: 14,

    lineHeight: 20,

    color: "#64748B",

  },

  featureRow: {

    flexDirection: "row",

    alignItems: "center",

    marginTop: 12,

  },

  featureText: {

    marginLeft: 8,

    fontSize: 14,

    color: "#334155",

    fontWeight: "600",

  },

  buttonContainer: {

    marginTop: 10,

  },

  deliveryHeader: {

    flexDirection: "row",

    alignItems: "center",

  },

  deliveryChicken: {

    width: 65,

    height: 82,

    marginRight: 12,

  },

  deliveryTitle: {

    fontSize: 18,

    fontWeight: "900",

    color: "#0F172A",

  },

  deliveryStatus: {

    marginTop: 5,

    fontSize: 15,

    fontWeight: "700",

    color: "#16A34A",

  },

  divider: {

    height: 1,

    backgroundColor: "#E2E8F0",

    marginVertical: 10,

  },

  infoRow: {

    flexDirection: "row",

    alignItems: "center",

    marginBottom: 8,

  },

  infoLabel: {

    marginLeft: 10,

    color: "#64748B",

    fontSize: 15,

    flex: 1,

  },

  infoValue: {

    fontSize: 15,

    fontWeight: "800",

    color: "#0F172A",

  },

  deliveryDate: {

  marginTop: 4,

  fontSize: 14,

  fontWeight: "700",

  color: "#334155",

},

deliverySubDate: {

  marginTop: 0,

  fontSize: 13,

  color: "#64748B",

},

});
