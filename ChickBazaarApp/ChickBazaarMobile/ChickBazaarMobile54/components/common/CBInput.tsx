import React from "react";
import {
  TextInput,
  StyleSheet,
  TextInputProps,
} from "react-native";

import { Colors } from "../../theme/colors";
import { Radius } from "../../theme/radius";

type Props = TextInputProps;

export default function CBInput(props: Props) {
  return (
    <TextInput
      {...props}
      placeholderTextColor={Colors.subtitle}
      style={[
        styles.input,
        props.style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    padding: 14,
    fontSize: 16,
    backgroundColor: Colors.white,
    color: Colors.text,
    marginBottom: 14,
  },
});