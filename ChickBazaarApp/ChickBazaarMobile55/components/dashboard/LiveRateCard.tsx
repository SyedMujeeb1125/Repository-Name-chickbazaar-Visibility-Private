import React from "react";

import {
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type Props = {

  rate: number;

};

export default function LiveRateCard({

  rate,

}: Props) {

  const now = new Date();

  const hour = now.getHours();

  let title =
    "LIVE BROILER RATE";

  let validTill =
    "Valid till 11:00 AM";

  let badge =
    "TODAY'S RATE";

  if (
    hour >= 11 &&
    hour < 18
  ) {

    title =
      "EXPRESS BROILER RATE";

    validTill =
      "Valid till 6:00 PM";

      badge =
      "EXPRESS";

  }

  if (hour >= 18) {

  title =
    "TOMORROW DELIVERY";

  validTill =
    "Book now for tomorrow's healthy live broiler chicken delivery.";

  badge =
    "BOOK NOW";

}

  return (

    <View style={styles.card}>

      <Image
  source={require("../../assets/live-rate-chicken.png")}
  resizeMode="contain"
  style={styles.heroImage}
/>

      <View style={styles.pattern1} />

      <View style={styles.pattern2} />

      <View style={styles.badge}>

        <MaterialCommunityIcons

          name="currency-inr"

          size={14}

          color="#FFF"

        />

        <Text style={styles.badgeText}>

          {badge}

        </Text>

      </View>

      <Text style={styles.title}>

        {title}

      </Text>

      {hour < 18 ? (

        <>

          <View style={styles.rateRow}>

            <Text style={styles.rate}>

              ₹{rate}

            </Text>

            <Text style={styles.unit}>

              /kg

            </Text>

          </View>

          <View
  style={{
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  }}
>
  <MaterialCommunityIcons
    name="clock-outline"
    size={18}
    color="#FFFFFF"
  />

  <View style={{ marginLeft: 8 }}>

    <Text
      style={{
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "700",
      }}
    >
      Order before 11:00 AM
    </Text>

    <Text
      style={{
        color: "rgba(255,255,255,0.9)",
        fontSize: 13,
        marginTop: 2,
      }}
    >
      ✓ Same-Day Delivery
    </Text>

  </View>
</View>


          
        </>

      ) : (

        <>

          <MaterialCommunityIcons

            name="calendar"

            size={48}

            color="rgba(255,255,255,0.9)"

          />

          <Text style={styles.closedText}>

  {validTill}

</Text>

<Text
  style={{
    color: "#FFF",
    textAlign: "center",
    marginTop: 10,
    fontSize: 13,
    opacity: 0.9,
  }}
>
  Order opens again tomorrow before 9:00 AM.
</Text>

        </>

      )}

    </View>

  );

}
const styles = StyleSheet.create({

  card: {

  overflow: "hidden",

  backgroundColor: "#F97316",

  borderRadius: 26,

  paddingHorizontal: 22,

  paddingTop: 16,

  paddingBottom: 16,

  marginBottom: 18,

    shadowColor: "#F97316",

    shadowOpacity: 0.28,

    shadowRadius: 18,

    shadowOffset: {
      width: 0,
      height: 10,
    },

    elevation: 12,

  },

  pattern1: {

    position: "absolute",

    right: -50,

    top: -40,

    width: 150,

    height: 150,

    borderRadius: 75,

    backgroundColor: "rgba(255,255,255,0.08)",

  },

  pattern2: {

    position: "absolute",

    right: 40,

    bottom: -70,

    width: 120,

    height: 120,

    borderRadius: 60,

    backgroundColor: "rgba(255,255,255,0.05)",

  },

  badge: {

    alignSelf: "flex-start",

    flexDirection: "row",

    alignItems: "center",

    backgroundColor: "rgba(255,255,255,0.18)",

    borderRadius: 18,

    paddingHorizontal: 10,

    paddingVertical: 4,

  },

  badgeText: {

    color: "#FFFFFF",

    fontSize: 11,

    fontWeight: "800",

    marginLeft: 6,

    letterSpacing: 0.8,

  },

  title: {

    marginTop: 10,

    color: "#FFFFFF",

    fontSize: 15,

    fontWeight: "700",

    letterSpacing: 0.6,

  },

  rateRow: {

  flexDirection: "row",

  alignItems: "flex-end",

  marginTop: 14,

  marginBottom: 8,

},

  rate: {

    color: "#FFFFFF",

    fontSize: 42,

    fontWeight: "900",

    lineHeight: 46,

  },

  unit: {

    color: "#FFFFFF",

    fontSize: 18,

    fontWeight: "700",

    marginBottom: 5,

    marginLeft: 6,

  },

  marketRow: {

    flexDirection: "row",

    alignItems: "center",

    marginTop: 14,

  },

  marketText: {

    marginLeft: 8,

    color: "#FFFFFF",

    fontSize: 14,

    fontWeight: "700",

  },

  timerCard: {

    flexDirection: "row",

    alignItems: "center",

    marginTop: 8,

    backgroundColor: "rgba(255,255,255,0.16)",

    borderRadius: 16,

    paddingHorizontal: 12,

    paddingVertical: 8,

  },

  timerTitle: {

    color: "rgba(255,255,255,0.9)",

    fontSize: 12,

    fontWeight: "600",

  },

  timer: {

    marginTop: 2,

    color: "#FFFFFF",

    fontSize: 18,

    fontWeight: "900",

    letterSpacing: 1,

  },

  validity: {

    marginTop: 8,

    color: "rgba(255,255,255,0.92)",

    fontSize: 12,

    fontWeight: "600",

  },

  closedText: {

    marginTop: 20,

    color: "#FFFFFF",

    textAlign: "center",

    fontSize: 14,

    lineHeight: 24,

    fontWeight: "700",

  },

  heroImage: {

  position: "absolute",

  right: -10,

  top: -70,

  width: 215,

  height: 320,

},

});
