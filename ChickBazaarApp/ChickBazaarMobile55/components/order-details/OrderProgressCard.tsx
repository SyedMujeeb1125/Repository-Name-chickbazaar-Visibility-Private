import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Card from "../ui/Card";

type Props = {
  status: string;
};

const steps = [
  { key: "new", label: "Order Confirmed" },
  { key: "confirmed", label: "Payment Verified" },
  { key: "allocated", label: "Preparing Live Birds" },
  { key: "vehicle_assigned", label: "Vehicle Assigned" },
  { key: "out_for_delivery", label: "Out for Delivery" },
  { key: "delivered", label: "Delivered" },
];

const statusOrder: Record<string, number> = {
  new: 0,
  confirmed: 1,
  allocated: 2,
  preparing: 2,
  vehicle_assigned: 3,
  out_for_delivery: 4,
  delivered: 5,
};

export default function OrderProgressCard({
  status,
}: Props) {
  const currentStep = statusOrder[status] ?? 0;

  return (
    <Card>
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="progress-check"
          size={24}
          color="#F97316"
        />

        <Text style={styles.title}>
          Order Progress
        </Text>
      </View>

      {steps.map((step, index) => {
        const completed = index <= currentStep;

        return (
          <View key={step.key} style={styles.row}>
            <MaterialCommunityIcons
              name={
                completed
                  ? "check-circle"
                  : "checkbox-blank-circle-outline"
              }
              size={22}
              color={completed ? "#16A34A" : "#CBD5E1"}
            />

            <Text
              style={[
                styles.stepText,
                completed && styles.completedText,
              ]}
            >
              {step.label}
            </Text>
          </View>
        );
      })}
    </Card>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  title: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  stepText: {
    marginLeft: 12,
    fontSize: 16,
    color: "#64748B",
  },

  completedText: {
    color: "#0F172A",
    fontWeight: "700",
  },
});