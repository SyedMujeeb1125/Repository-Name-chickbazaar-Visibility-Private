import React from "react";

import {
    StyleSheet,
    Text,
    View,
} from "react-native";

type Props = {
  status?: string;
};

const STEPS = [
  {
    key: "new",
    label: "Order Confirmed",
  },
  {
    key: "allocated",
    label: "Farm Allocated",
  },
  {
    key: "preparing",
    label: "Preparing Birds",
  },
  {
    key: "vehicle_assigned",
    label: "Vehicle Assigned",
  },
  {
    key: "out_for_delivery",
    label: "Out For Delivery",
  },
  {
    key: "delivered",
    label: "Delivered",
  },
];

export default function OrderTimeline({
  status,
}: Props) {

  const current =
    STEPS.findIndex(
      (s) => s.key === status
    );

  return (
    <View style={styles.container}>

      {STEPS.map((step, index) => {

        const done =
          index < current;

        const active =
          index === current;

        return (

          <View
            key={step.key}
            style={styles.row}
          >

            <View
              style={[
                styles.dot,

                done &&
                  styles.done,

                active &&
                  styles.active,
              ]}
            />

            <Text
              style={[
                styles.label,

                done &&
                  styles.doneText,

                active &&
                  styles.activeText,
              ]}
            >
              {step.label}
            </Text>

          </View>

        );

      })}

    </View>
  );

}

const styles = StyleSheet.create({

  container: {
    marginTop: 18,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#CBD5E1",
    marginRight: 12,
  },

  done: {
    backgroundColor: "#16A34A",
  },

  active: {
    backgroundColor: "#F97316",
  },

  label: {
    fontSize: 14,
    color: "#64748B",
  },

  doneText: {
    color: "#16A34A",
    fontWeight: "700",
  },

  activeText: {
    color: "#F97316",
    fontWeight: "800",
  },

});