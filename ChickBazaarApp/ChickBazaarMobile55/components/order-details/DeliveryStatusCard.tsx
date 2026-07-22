import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Card from "../ui/Card";

type Props = {
  status: string;
  eta?: string;
};

const STATUS = {
  new: 0,
  confirmed: 1,
  allocated: 2,
  preparing: 2,
  vehicle_assigned: 3,
  out_for_delivery: 4,
  delivered: 5,
} as const;

const STEPS = [
  "NEW",
  "CONF",
  "PREP",
  "VEH",
  "OUT",
  "DONE",
];

function getMessage(status: string) {
  switch (status) {
    case "new":
      return "Your order has been received and is awaiting confirmation.";

    case "confirmed":
      return "Your order has been confirmed and is being processed.";

    case "allocated":
    case "preparing":
      return "Healthy live birds are being prepared for dispatch.";

    case "vehicle_assigned":
      return "Vehicle has been assigned and will depart shortly.";

    case "out_for_delivery":
      return "Your order is on the way to your shop.";

    case "delivered":
      return "Your order has been delivered successfully.";

    default:
      return "We're processing your order.";
  }
}

export default function DeliveryStatusCard({
  status,
  eta,
}: Props) {
  const current = STATUS[status as keyof typeof STATUS] ?? 0;

  return (
    <Card>
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="truck-fast"
          size={24}
          color="#F97316"
        />

        <Text style={styles.title}>
          Delivery Progress
        </Text>
      </View>

      <View style={styles.timeline}>
        {STEPS.map((step, index) => (
          <React.Fragment key={step}>
            <View
              style={[
                styles.circle,
                index <= current && styles.activeCircle,
              ]}
            >
              {index <= current && (
                <MaterialCommunityIcons
                  name="check"
                  size={12}
                  color="#FFFFFF"
                />
              )}
            </View>

            {index !== STEPS.length - 1 && (
              <View
                style={[
                  styles.line,
                  index < current && styles.activeLine,
                ]}
              />
            )}
          </React.Fragment>
        ))}
      </View>

      <View style={styles.labels}>
        {STEPS.map((step) => (
          <Text key={step} style={styles.stepLabel}>
            {step}
          </Text>
        ))}
      </View>

      <View style={styles.messageCard}>
        <MaterialCommunityIcons
          name="information"
          size={20}
          color="#F97316"
        />

        <View style={{ flex: 1 }}>
          <Text style={styles.message}>
            {getMessage(status)}
          </Text>

          {!!eta && (
            <Text style={styles.eta}>
              Estimated Arrival: {eta}
            </Text>
          )}
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22,
  },

  title: {
    marginLeft: 10,
    fontSize: 22,
    fontWeight: "700",
    color: "#0F172A",
  },

  timeline: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#CBD5E1",
    justifyContent: "center",
    alignItems: "center",
  },

  activeCircle: {
    backgroundColor: "#16A34A",
  },

  line: {
    flex: 1,
    height: 3,
    backgroundColor: "#CBD5E1",
  },

  activeLine: {
    backgroundColor: "#16A34A",
  },

  labels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  stepLabel: {
    width: 36,
    textAlign: "center",
    fontSize: 11,
    fontWeight: "700",
    color: "#64748B",
  },

  messageCard: {
    marginTop: 24,
    flexDirection: "row",
    backgroundColor: "#FFF7ED",
    borderRadius: 14,
    padding: 14,
  },

  message: {
    marginLeft: 10,
    color: "#7C2D12",
    fontSize: 15,
    lineHeight: 22,
  },

  eta: {
    marginTop: 8,
    marginLeft: 10,
    color: "#EA580C",
    fontWeight: "700",
  },
});