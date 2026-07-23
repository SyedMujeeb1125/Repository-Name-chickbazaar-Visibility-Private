import React from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";

const STATUSES = [
  "new",
  "confirmed",
  "allocated",
  "preparing",
  "vehicle_assigned",
  "out_for_delivery",
  "delivered",
] as const;

const LABELS = [
  "NEW",
  "CONF",
  "ALLOC",
  "PREP",
  "VEH",
  "OUT",
  "DONE",
];

type Props = {
  status: string;
};

export default function OrderProgress({
  status,
}: Props) {
  const currentIndex =
    STATUSES.indexOf(
      status as (typeof STATUSES)[number]
    );

  return (
    <View>
      <View style={styles.progressRow}>
        {STATUSES.map((item, index) => (
          <React.Fragment key={item}>
            <View
              style={[
                styles.dot,
                index <= currentIndex &&
                  styles.activeDot,
              ]}
            />

            {index < STATUSES.length - 1 && (
              <View
                style={[
                  styles.line,
                  index < currentIndex &&
                    styles.activeLine,
                ]}
              />
            )}
          </React.Fragment>
        ))}
      </View>

      <View style={styles.labelRow}>
        {LABELS.map((label) => (
          <Text
            key={label}
            style={styles.label}
          >
            {label}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#CBD5E1",
  },

  activeDot: {
    backgroundColor: "#F97316",
  },

  line: {
    flex: 1,
    height: 3,
    backgroundColor: "#CBD5E1",
  },

  activeLine: {
    backgroundColor: "#F97316",
  },

  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  label: {
    flex: 1,
    textAlign: "center",
    fontSize: 10,
    color: "#64748B",
    fontWeight: "600",
  },
});