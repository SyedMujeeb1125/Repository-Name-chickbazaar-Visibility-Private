import React from "react";

import {
  TextInput,
  StyleSheet,
  TextInputProps,
} from "react-native";

import {
  Colors,
  Radius,
  Spacing,
  Typography,
} from "../../theme";

export default function CBInput(
  props: TextInputProps
) {
  return (
    <TextInput
      {...props}
      placeholderTextColor={
        Colors.muted
      }
      style={[
        styles.input,
        props.style,
      ]}
    />
  );
}

const styles =
  StyleSheet.create({
    input: {
      height: 54,

      borderWidth: 1,

      borderColor:
        Colors.border,

      borderRadius:
        Radius.md,

      backgroundColor:
        Colors.surface,

      paddingHorizontal:
        Spacing.md,

      fontSize:
        Typography.body,

      color:
        Colors.text,

      marginBottom:
        Spacing.md,
    },
  });
