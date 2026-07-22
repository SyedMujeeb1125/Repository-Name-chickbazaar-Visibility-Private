import React from "react";

import {
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import PrimaryButton from "../ui/PrimaryButton";

type Props = {
  weight: number;
  rate: number;
  amount: number;
  deliveredAt?: string;
  loading?: boolean;
  onRepeat: () => void;
  onChangeQuantity: () => void;
};

export default function TomorrowOrderCard({
  weight,
  rate,
  amount,
  deliveredAt,
  loading = false,
  onRepeat,
  onChangeQuantity,
}: Props) {

  const tomorrow = new Date();

  tomorrow.setDate(
    tomorrow.getDate() + 1
  );

  const weekday =
    tomorrow.toLocaleDateString(
      "en-IN",
      {
        weekday: "long",
      }
    );

  const formattedDate =
    tomorrow.toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );


  return (

  <View style={styles.card}>

    <Image
      source={require("../../assets/live-broiler.png")}
      resizeMode="contain"
      style={styles.chicken}
    />

    <View style={styles.content}>

      <View style={styles.badge}>

        <MaterialCommunityIcons
          name="truck-delivery-outline"
          size={16}
          color="#F97316"
        />

        <Text style={styles.badgeText}>
          TOMORROW'S DELIVERY
        </Text>

      </View>

      <Text style={styles.title}>
  Confirm Tomorrow's Order
</Text>

      <Text style={styles.date}>
        {weekday}
      </Text>

      <Text style={styles.subDate}>
        {formattedDate}
      </Text>

      <View style={styles.summaryCard}>

  <Text style={styles.summaryHeading}>
    Yesterday's Order
  </Text>

  <View style={styles.summaryRow}>

    <View style={styles.summaryLeft}>

      <MaterialCommunityIcons
        name="scale-bathroom"
        size={18}
        color="#64748B"
      />

      <Text style={styles.label}>
        Quantity
      </Text>

    </View>

    <Text style={styles.value}>
      {weight} KG
    </Text>

  </View>

  <View style={styles.summaryRow}>

    <View style={styles.summaryLeft}>

      <MaterialCommunityIcons
        name="currency-inr"
        size={18}
        color="#64748B"
      />

      <Text style={styles.label}>
        Today's Rate
      </Text>

    </View>

    <Text style={styles.value}>
      ₹{rate}/kg
    </Text>

  </View>

  <View style={styles.divider} />

  <View style={styles.summaryRow}>

    <Text style={styles.totalLabel}>
      Estimated Total
    </Text>

    <Text style={styles.amount}>
      ₹{amount.toLocaleString("en-IN")}
    </Text>

  </View>

</View>

      <View style={styles.deliveryCard}>

        <MaterialCommunityIcons
          name="clock-outline"
          size={18}
          color="#16A34A"
        />

        <View style={{ marginLeft: 10, flex: 1 }}>

          <Text style={styles.deliveryTitle}>
            Expected Delivery
          </Text>

          <Text style={styles.deliverySubtitle}>
            Tomorrow • Early Morning (6:00 AM – 8:00 AM)
          </Text>

        </View>

      </View>

      <View style={styles.recommendationCard}>

  <View style={styles.recommendationHeader}>

    <MaterialCommunityIcons
      name="lightbulb-on-outline"
      size={20}
      color="#F59E0B"
    />

    <Text style={styles.recommendationTitle}>
      Smart Recommendation
    </Text>

  </View>

  <Text style={styles.recommendationText}>
    Yesterday's order quantity is suggested for tomorrow. If you expect higher or lower customer demand, you can change the quantity before confirming.
  </Text>

</View>

      <View style={styles.buttonContainer}>

        <PrimaryButton
  title={
    loading
      ? "PLACING..."
      : "Confirm Tomorrow's Order"
  }
          loading={loading}
          disabled={loading}
          onPress={onRepeat}
        />

      </View>

      <PrimaryButton
  title="Change Quantity"
        variant="outline"
        onPress={onChangeQuantity}
      />

      <Text style={styles.footerNote}>
  You can place or modify tomorrow's order until the daily booking cut-off time.
</Text>

    </View>

  </View>

);

}



const styles = StyleSheet.create({

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 18,
    flexDirection: "row",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 8,
  },

  chicken: {
    width: 95,
    height: 120,
    marginRight: 16,
    alignSelf: "center",
  },

  content: {
    flex: 1,
  },

  badge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#FFF7ED",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  badgeText: {
    marginLeft: 6,
    color: "#F97316",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  title: {
    marginTop: 12,
    fontSize: 22,
    fontWeight: "900",
    color: "#0F172A",
  },

  date: {
    marginTop: 6,
    fontSize: 15,
    fontWeight: "700",
    color: "#334155",
  },

  subDate: {
    marginTop: 2,
    fontSize: 13,
    color: "#64748B",
  },

  summaryCard: {
    marginTop: 18,
    backgroundColor: "#FFF7ED",
    borderRadius: 18,
    padding: 14,
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  label: {
    fontSize: 14,
    color: "#64748B",
  },

  value: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0F172A",
  },

  amount: {
    fontSize: 20,
    fontWeight: "900",
    color: "#F97316",
  },

  deliveryCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    padding: 14,
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  deliveryTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#0F172A",
  },

  deliverySubtitle: {
    marginTop: 3,
    fontSize: 13,
    color: "#64748B",
    lineHeight: 18,
  },

  recommendationRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 18,
  },

  recommendationText: {
    marginLeft: 8,
    flex: 1,
    fontSize: 13,
    color: "#475569",
    fontWeight: "600",
    lineHeight: 20,
  },

  buttonContainer: {
    marginTop: 22,
    marginBottom: 12,
  },

  summaryHeading: {
  fontSize: 15,
  fontWeight: "800",
  color: "#0F172A",
  marginBottom: 14,
},

summaryLeft: {
  flexDirection: "row",
  alignItems: "center",
},

divider: {
  height: 1,
  backgroundColor: "#FED7AA",
  marginVertical: 12,
},

totalLabel: {
  fontSize: 15,
  fontWeight: "800",
  color: "#0F172A",
},

recommendationCard: {
  marginTop: 18,
  backgroundColor: "#FEFCE8",
  borderRadius: 16,
  padding: 14,
  borderWidth: 1,
  borderColor: "#FDE68A",
},

recommendationHeader: {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 8,
},

recommendationTitle: {
  marginLeft: 8,
  fontSize: 14,
  fontWeight: "800",
  color: "#92400E",
},

footerNote: {
  marginTop: 14,
  textAlign: "center",
  fontSize: 12,
  color: "#64748B",
  lineHeight: 18,
},

});