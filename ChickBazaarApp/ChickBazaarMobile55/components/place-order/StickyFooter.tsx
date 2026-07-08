import React from "react";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type Props = {
  amount: number;
  onReview: () => void;
};

function formatAmount(amount: number) {

  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(1)}Cr`;
  }

  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)}L`;
  }

  return `₹${amount.toLocaleString()}`;

}

export default function StickyFooter({

  amount,

  onReview,

}: Props) {

  const disabled =
    amount <= 0;

  return (

    <View style={styles.container}>

      <View style={styles.summaryRow}>

        <View>

          <Text style={styles.label}>
            Estimated Total
          </Text>

          <Text style={styles.amount}>
            {formatAmount(amount)}
          </Text>

        </View>

        <View style={styles.advanceCard}>

          <MaterialCommunityIcons
            name="cash-check"
            size={20}
            color="#16A34A"
          />

          <Text style={styles.advanceTitle}>
            Advance
          </Text>

          <Text style={styles.advanceValue}>
            ₹500
          </Text>

        </View>

      </View>

      <View style={styles.infoCard}>

        <View style={styles.infoRow}>

          <MaterialCommunityIcons
            name="check-circle"
            size={18}
            color="#16A34A"
          />

          <Text style={styles.infoText}>
            Fixed ₹500 advance payment
          </Text>

        </View>

        <View style={styles.infoRow}>

          <MaterialCommunityIcons
            name="check-circle"
            size={18}
            color="#16A34A"
          />

          <Text style={styles.infoText}>
            Bill-to-Bill settlement
          </Text>

        </View>

      </View>

      <TouchableOpacity

        activeOpacity={0.9}

        disabled={disabled}

        onPress={onReview}

        style={[
          styles.button,
          disabled &&
            styles.buttonDisabled,
        ]}

      >

        <Text
          style={[
            styles.buttonText,
            disabled &&
              styles.buttonTextDisabled,
          ]}
        >

          REVIEW ORDER

        </Text>

      </TouchableOpacity>

    </View>

  );

}

const styles = StyleSheet.create({

  container: {

    backgroundColor: "#FFFFFF",

    paddingHorizontal: 20,

    paddingTop: 16,

    paddingBottom: 20,

    borderTopLeftRadius: 28,

    borderTopRightRadius: 28,

    shadowColor: "#000",

    shadowOpacity: 0.12,

    shadowRadius: 18,

    shadowOffset: {
      width: 0,
      height: -4,
    },

    elevation: 20,

  },

  summaryRow: {

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

  },

  label: {

    color: "#64748B",

    fontSize: 13,

    fontWeight: "700",

  },

  amount: {

    marginTop: 4,

    color: "#F97316",

    fontSize: 30,

    fontWeight: "900",

  },

  advanceCard: {

    width: 94,

    height: 94,

    borderRadius: 20,

    backgroundColor: "#ECFDF5",

    justifyContent: "center",

    alignItems: "center",

  },

  advanceTitle: {

    marginTop: 6,

    fontSize: 12,

    color: "#64748B",

    fontWeight: "700",

  },

  advanceValue: {

    marginTop: 2,

    fontSize: 22,

    fontWeight: "900",

    color: "#16A34A",

  },

  infoCard: {

    marginTop: 16,

    marginBottom: 18,

    backgroundColor: "#FFF7ED",

    borderRadius: 18,

    padding: 14,

  },

  infoRow: {

    flexDirection: "row",

    alignItems: "center",

    marginVertical: 4,

  },

  infoText: {

    marginLeft: 10,

    fontSize: 14,

    color: "#7C2D12",

    fontWeight: "600",

  },

  button: {

    height: 58,

    borderRadius: 18,

    backgroundColor: "#F97316",

    justifyContent: "center",

    alignItems: "center",

  },

  buttonDisabled: {

    backgroundColor: "#CBD5E1",

  },

  buttonText: {

    color: "#FFFFFF",

    fontSize: 17,

    fontWeight: "900",

    letterSpacing: 0.5,

  },

  buttonTextDisabled: {

    color: "#FFFFFF",

  },

});