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
    value: number
  ) => void;

};

export default function QuantityCard({

  value,

  onChange,

}: Props) {

  return (

    <Card>

      <Text style={styles.heading}>
        Quantity (KG)
      </Text>

      <TextInput
        keyboardType="numeric"
        value={String(value)}
        onChangeText={(text) =>
          onChange(
            Number(text) || 0
          )
        }
        placeholder="Enter quantity"
        style={styles.input}
      />

      <Text style={styles.note}>
        This quantity will be used for
        every scheduled delivery.
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

    color: "#0F172A",

    backgroundColor: "#FFFFFF",

  },

  note: {

    marginTop: 12,

    fontSize: 13,

    color: "#64748B",

    lineHeight: 20,

  },

});