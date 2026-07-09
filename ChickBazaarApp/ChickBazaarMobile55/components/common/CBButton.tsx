import React from "react";

import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import {
  Colors,
  Radius,
  Typography,
} from "../../theme";

type Props = {
  title: string;
  onPress: () => void;

  disabled?: boolean;

  loading?: boolean;
};

export default function CBButton({
  title,
  onPress,
  disabled = false,
  loading = false,
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      disabled={
        disabled || loading
      }
      style={[
        styles.button,
        disabled &&
          styles.disabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color="#FFF"
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

      borderRadius:
        Radius.lg,

      justifyContent:
        "center",

      alignItems:
        "center",

      backgroundColor:
        Colors.primary,

      shadowColor:
        Colors.shadow,

      shadowOpacity: 0.12,

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

      fontWeight:
        Typography.bold,

      fontSize:
        Typography.body,

      letterSpacing: 0.5,
    },
  });
