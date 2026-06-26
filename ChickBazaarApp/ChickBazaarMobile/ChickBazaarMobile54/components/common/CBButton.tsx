import React from "react";

import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

import { Colors } from "../../theme/colors";
import { Radius } from "../../theme/radius";

type Props = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

export default function CBButton({
  title,
  onPress,
  disabled = false,
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        disabled && {
          opacity: 0.5,
        },
      ]}
    >
      <Text style={styles.text}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    padding: 18,
    borderRadius: Radius.lg,
  },

  text: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
});