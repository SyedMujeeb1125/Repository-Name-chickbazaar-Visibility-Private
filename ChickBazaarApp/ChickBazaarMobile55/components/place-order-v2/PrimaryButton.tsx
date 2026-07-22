import React from "react";

import {
    StyleSheet,
    Text,
    TouchableOpacity,
} from "react-native";

type Props = {
  title: string;

  onPress: () => void;

  disabled?: boolean;
};

export default function PrimaryButton({
  title,
  onPress,
  disabled,
}: Props) {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.button,
        disabled &&
          styles.disabled,
      ]}
    >
      <Text
        style={styles.text}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles =
  StyleSheet.create({

    button: {

      height: 58,

      borderRadius: 18,

      backgroundColor:
        "#F97316",

      justifyContent:
        "center",

      alignItems:
        "center",

    },

    disabled: {

      opacity: 0.45,

    },

    text: {

      color: "#FFF",

      fontWeight: "700",

      fontSize: 17,

    },

});