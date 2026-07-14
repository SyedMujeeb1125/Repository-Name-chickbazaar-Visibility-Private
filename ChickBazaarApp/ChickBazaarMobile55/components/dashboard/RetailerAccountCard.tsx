import React from "react";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type Props = {
  invoiceAmount: number;

  amountPaid: number;

  advancePaid: number;

  paymentStatus:
  | "Ready to Order"
  | "Advance Received"
  | "Payment Pending"
  | "Paid";

  onViewDetails: () => void;
};

function formatAmount(amount: number) {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(1)}Cr`;
  }

  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)}L`;
  }

  if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(1)}K`;
  }

  return `₹${amount.toLocaleString()}`;
}

export default function RetailerAccountCard({
  invoiceAmount,
  amountPaid,
  advancePaid,
  paymentStatus,
  onViewDetails,
}: Props) {

  const balance =
    Math.max(
      invoiceAmount - amountPaid,
      0
    );

  const statusColor =
  paymentStatus === "Paid"
    ? "#16A34A"
    : paymentStatus === "Advance Received"
    ? "#2563EB"
    : paymentStatus === "Payment Pending"
    ? "#F97316"
    : "#64748B";

  const statusText = paymentStatus;

  return (

    <View style={styles.container}>

      <View style={styles.header}>

        <Text style={styles.heading}>
          Retailer Account
        </Text>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onViewDetails}
        >

          <Text style={styles.viewAll}>
            View Bill →
          </Text>

        </TouchableOpacity>

      </View>

      <View style={styles.card}>

        <Text style={styles.billTitle}>
          Current Bill
        </Text>

        <Text style={styles.billAmount}>
          {invoiceAmount > 0
            ? formatAmount(invoiceAmount)
            : "Bill will be generated after delivery"}
        </Text>

        <Divider />

        <Row
          icon="cash-check"
          label="Advance Paid"
          value={formatAmount(advancePaid)}
          valueColor="#16A34A"
        />

        <Divider />

        <Row
          icon="wallet-outline"
          label="Balance Due"
          value={formatAmount(balance)}
          valueColor={
            balance > 0
              ? "#F97316"
              : "#16A34A"
          }
        />

        <Divider />

        <Row
          icon="file-document-outline"
          label="Payment Type"
          value="Advance + Final Payment"
        />

        <Divider />

        <View style={styles.statusCard}>

          <MaterialCommunityIcons
  name={
    paymentStatus === "Paid"
      ? "check-circle"
      : paymentStatus === "Advance Received"
      ? "cash-check"
      : paymentStatus === "Payment Pending"
      ? "clock-outline"
      : "clipboard-check-outline"
  }
  size={22}
  color={statusColor}
/>

          <Text
            style={[
              styles.status,
              {
                color: statusColor,
              },
            ]}
          >
            {statusText}
          </Text>

        </View>

        <View style={styles.footer}>

          <MaterialCommunityIcons
            name="information-outline"
            size={16}
            color="#64748B"
          />

          <Text style={styles.footerText}>
            Remaining amount is payable during delivery.
          </Text>

        </View>

      </View>

    </View>

  );

}

function Divider() {
  return (
    <View style={styles.divider} />
  );
}

function Row({
  icon,
  label,
  value,
  valueColor = "#0F172A",
}: any) {

  return (

    <View style={styles.row}>

      <View style={styles.left}>

        <MaterialCommunityIcons
          name={icon}
          size={20}
          color="#F97316"
        />

        <Text style={styles.label}>
          {label}
        </Text>

      </View>

      <Text
        style={[
          styles.value,
          {
            color: valueColor,
          },
        ]}
      >
        {value}
      </Text>

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    marginBottom: 22,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  heading: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0F172A",
  },

  viewAll: {
    color: "#F97316",
    fontWeight: "700",
    fontSize: 14,
  },

  card: {
    backgroundColor: "#FFFFFF",

    borderRadius: 26,

    padding: 22,

    shadowColor: "#000",

    shadowOpacity: 0.08,

    shadowRadius: 14,

    shadowOffset: {
      width: 0,
      height: 8,
    },

    elevation: 6,
  },

  billTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#64748B",
    textAlign: "center",
  },

  billAmount: {
    fontSize: 34,
    fontWeight: "900",
    color: "#0F172A",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 20,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  label: {
    marginLeft: 12,
    fontSize: 15,
    color: "#64748B",
    fontWeight: "600",
  },

  value: {
    fontSize: 16,
    fontWeight: "800",
  },

  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
  },

  statusCard: {
    marginTop: 18,

    backgroundColor: "#FFF7ED",

    borderRadius: 18,

    paddingVertical: 14,

    paddingHorizontal: 18,

    flexDirection: "row",

    justifyContent: "center",

    alignItems: "center",

    borderWidth: 1,

    borderColor: "#FED7AA",
  },

  status: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "800",
  },

  footer: {
    marginTop: 18,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    borderTopWidth: 1,

    borderTopColor: "#E2E8F0",

    paddingTop: 16,
  },

  footerText: {
    marginLeft: 6,
    color: "#64748B",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
    flex: 1,
  },

});