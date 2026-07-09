import React from "react";

import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

import {
  Colors,
  Radius,
  Typography,
} from "../../theme";

type Props = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: "solid" | "outline";
};

export default function PrimaryButton({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = "solid",
}: Props) {

  const outline =
    variant === "outline";

  return (

    <TouchableOpacity
      activeOpacity={0.9}
      disabled={
        disabled || loading
      }
      onPress={onPress}
      style={[
        styles.button,

        outline &&
          styles.outlineButton,

        disabled &&
          styles.disabled,
      ]}
    >

      {loading ? (

        <ActivityIndicator
          color={
            outline
              ? Colors.primary
              : "#FFFFFF"
          }
        />

      ) : (

        <Text
          style={[
            styles.text,

            outline &&
              styles.outlineText,
          ]}
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

    outlineButton: {

      backgroundColor:
        "#FFFFFF",

      borderWidth: 2,

      borderColor:
        Colors.primary,

      elevation: 0,

      shadowOpacity: 0,

    },

    disabled: {

      opacity: 0.5,

    },

    text: {

      color:
        Colors.white,

      fontSize:
        Typography.body,

      fontWeight:
        Typography.bold,

      letterSpacing: 0.5,

    },

    outlineText: {

      color:
        Colors.primary,

    },

  });