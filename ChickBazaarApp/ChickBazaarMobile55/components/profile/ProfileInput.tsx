import React from "react";

import {
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    View,
} from "react-native";

type Props = TextInputProps & {
  label: string;
  error?: string;
};

export default function ProfileInput({
  label,
  error,
  style,
  ...props
}: Props) {

  return (

    <View style={styles.container}>

      <Text style={styles.label}>
        {label}
      </Text>

      <TextInput
        style={[
          styles.input,
          style,
        ]}
        placeholderTextColor="#94A3B8"
        {...props}
      />

      {error ? (

        <Text style={styles.error}>
          {error}
        </Text>

      ) : null}

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    marginBottom: 18,
  },

  label: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "700",
    color: "#334155",
  },

  input: {

    height: 54,

    borderRadius: 14,

    borderWidth: 1,

    borderColor: "#E2E8F0",

    backgroundColor: "#FFFFFF",

    paddingHorizontal: 16,

    fontSize: 15,

    color: "#0F172A",

  },

  error: {

    marginTop: 6,

    color: "#DC2626",

    fontSize: 13,

    fontWeight: "600",

  },

});
