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
    "REGULAR";

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
      "TODAY CLOSED";

    validTill =
      "Tomorrow's rate available before 9:00 AM";

    badge =
      "TOMORROW";

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

          name="chart-line"

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

          <View style={styles.marketRow}>

  <MaterialCommunityIcons

    name="food-drumstick"

    size={18}

    color="#FFFFFF"

  />

  <Text style={styles.marketText}>

    Healthy Live Broiler Chicken

  </Text>

</View>

          <View style={styles.timerCard}>

            <MaterialCommunityIcons

              name="clock-outline"

              size={18}

              color="#FFF"

            />

            <View style={{marginLeft:10}}>

              <Text style={styles.timerTitle}>

  Order Before 9:00 AM

</Text>

<Text style={styles.timer}>

  Same-Day Delivery

</Text>

            </View>

          </View>

          <Text style={styles.validity}>

            {validTill}

          </Text>

        </>

      ) : (

        <>

          <MaterialCommunityIcons

            name="calendar"

            size={64}

            color="rgba(255,255,255,0.9)"

          />

          <Text style={styles.closedText}>

            {validTill}

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

    paddingHorizontal: 20,

    paddingVertical: 14,

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

    marginTop: 10,

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

    marginTop: 8,

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

    marginTop: 12,

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

    fontSize: 16,

    lineHeight: 24,

    fontWeight: "700",

  },

  heroImage: {
  position: "absolute",
  right: 1,
  top: -65,
  width: 200,
  height: 300,
  opacity: 1.80,
},

});
