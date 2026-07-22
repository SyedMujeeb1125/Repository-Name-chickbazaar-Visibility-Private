import React from "react";

import {
    StyleSheet,
    Text,
    TextInput,
} from "react-native";

import Card from "../ui/Card";

type Props = {

  value: number;

  onChange: (
    day: number
  ) => void;

};

export default function MonthlySelector({

  value,

  onChange,

}: Props) {

  return (

    <Card>

      <Text style={styles.heading}>
        Day of Month
      </Text>

      <TextInput
        keyboardType="number-pad"
        placeholder="1 - 31"
        value={
          value
            ? String(value)
            : ""
        }
        onChangeText={(text) => {

          const day =
            Number(text);

          if (
            day >= 1 &&
            day <= 31
          ) {

            onChange(day);

          } else if (
            text === ""
          ) {

            onChange(0);

          }

        }}
        style={styles.input}
      />

      <Text style={styles.note}>
        Example: 1 means the first day of every month.
      </Text>

    </Card>

  );

}

const styles = StyleSheet.create({

  heading: {

    fontSize: 18,

    fontWeight: "800",

    color: "#0F172A",

    marginBottom: 16,

  },

  input: {

    height: 54,

    borderWidth: 1,

    borderColor: "#CBD5E1",

    borderRadius: 14,

    paddingHorizontal: 16,

    fontSize: 18,

    fontWeight: "700",

    backgroundColor: "#FFFFFF",

    color: "#0F172A",

  },

  note: {

    marginTop: 12,

    fontSize: 13,

    color: "#64748B",

    lineHeight: 20,

  },

});