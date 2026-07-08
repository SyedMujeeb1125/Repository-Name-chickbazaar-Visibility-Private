import React from "react";
import {
  Text,
  StyleSheet,
  View,
} from "react-native";

import { Colors } from "../../theme/colors";
import { Radius } from "../../theme/radius";

type Variant =
  | "success"
  | "warning"
  | "danger"
  | "primary";

type Props = {
  title: string;
  variant?: Variant;
};

export default function CBBadge({
  title,
  variant = "primary",
}: Props) {
  const background =
    variant === "success"
      ? Colors.success
      : variant === "warning"
      ? Colors.warning
      : variant === "danger"
      ? Colors.danger
      : Colors.primary;

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor:
            background,
        },
      ]}
    >
      <Text style={styles.text}>
        {title}
      </Text>
    </View>
  );
}

const styles =
  StyleSheet.create({
    badge: {
      alignSelf: "flex-start",
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: Radius.xl,
    },

    text: {
      color: "#FFFFFF",
      fontSize: 12,
      fontWeight: "700",
    },
  });