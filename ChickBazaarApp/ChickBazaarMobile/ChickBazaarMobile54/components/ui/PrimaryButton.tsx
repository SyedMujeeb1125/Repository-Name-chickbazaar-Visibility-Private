import React from "react";

import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import {
  Colors,
  Radius,
  Spacing,
  Typography,
} from "../../theme";

type Props = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
};

export default function PrimaryButton({
  title,
  onPress,
  loading = false,
  disabled = false,
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      disabled={
        disabled || loading
      }
      onPress={onPress}
      style={[
        styles.button,
        disabled &&
          styles.disabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color="#FFFFFF"
        />
      ) : (
        <Text
          style={styles.text}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles =
  StyleSheet.create({
    button: {
      height: 56,

      backgroundColor:
        Colors.primary,

      borderRadius:
        Radius.lg,

      justifyContent:
        "center",

      alignItems:
        "center",

      shadowColor:
        Colors.shadow,

      shadowOpacity: 0.15,

      shadowRadius: 8,

      shadowOffset: {
        width: 0,
        height: 4,
      },

      elevation: 4,
    },

    disabled: {
      opacity: 0.5,
    },

    text: {
      color: Colors.white,

      fontSize:
        Typography.body,

      fontWeight:
        Typography.bold,

      letterSpacing: 0.5,
    },
  });