import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Card from "../ui/Card";

type OrderStatus =
  | "new"
  | "confirmed"
  | "allocated"
  | "preparing"
  | "vehicle_assigned"
  | "out_for_delivery"
  | "delivered";

type Props = {
  status?: string;
};

const steps = [
  {
    key: "new",
    title: "Order Placed",
    icon: "clipboard-check-outline",
  },
  {
    key: "confirmed",
    title: "Order Confirmed",
    icon: "check-decagram-outline",
  },
  {
    key: "allocated",
    title: "Farm Allocated",
    icon: "warehouse",
  },
  {
    key: "preparing",
    title: "Preparing Order",
    icon: "package-variant-closed",
  },
  {
    key: "vehicle_assigned",
    title: "Vehicle Assigned",
    icon: "truck-outline",
  },
  {
    key: "out_for_delivery",
    title: "Out For Delivery",
    icon: "truck-fast-outline",
  },
  {
    key: "delivered",
    title: "Delivered",
    icon: "check-circle-outline",
  },
];

export default function OrderTimelineCard({
  status = "new",
}: Props) {
  const currentIndex = steps.findIndex(
    s => s.key === status
  );

  return (
    <Card>
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="timeline-clock-outline"
          size={24}
          color="#F97316"
        />

        <Text style={styles.title}>
          Order Timeline
        </Text>
      </View>

      {steps.map((step, index) => {
        const completed = index <= currentIndex;

        return (
          <View
            key={step.key}
            style={styles.row}
          >
            <View style={styles.left}>
              <View
                style={[
                  styles.circle,
                  completed && styles.activeCircle,
                ]}
              >
                <MaterialCommunityIcons
                  name={step.icon as any}
                  size={18}
                  color={
                    completed
                      ? "#FFFFFF"
                      : "#94A3B8"
                  }
                />
              </View>

              {index !== steps.length - 1 && (
                <View
                  style={[
                    styles.line,
                    completed && styles.activeLine,
                  ]}
                />
              )}
            </View>

            <View style={styles.content}>
              <Text
                style={[
                  styles.stepTitle,
                  completed &&
                    styles.stepTitleActive,
                ]}
              >
                {step.title}
              </Text>

              <Text style={styles.stepSubtitle}>
                {completed
                  ? "Completed"
                  : "Waiting"}
              </Text>
            </View>
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
    marginBottom: 20,
  },

  title: {
    marginLeft: 10,
    fontSize: 22,
    fontWeight: "700",
    color: "#0F172A",
  },

  row: {
    flexDirection: "row",
  },

  left: {
    alignItems: "center",
    width: 42,
  },

  circle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
  },

  activeCircle: {
    backgroundColor: "#F97316",
  },

  line: {
    width: 2,
    flex: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 4,
  },

  activeLine: {
    backgroundColor: "#F97316",
  },

  content: {
    flex: 1,
    paddingBottom: 24,
    paddingLeft: 12,
  },

  stepTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#94A3B8",
  },

  stepTitleActive: {
    color: "#0F172A",
  },

  stepSubtitle: {
    marginTop: 4,
    color: "#64748B",
    fontSize: 14,
  },
});