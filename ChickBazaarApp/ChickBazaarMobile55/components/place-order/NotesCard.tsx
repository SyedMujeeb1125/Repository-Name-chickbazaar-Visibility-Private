import React from "react";

import {
  Text,
  TextInput,
  StyleSheet,
} from "react-native";

import Card from "../ui/Card";

type Props = {
  value: string;
  onChange: (text: string) => void;
};

export default function NotesCard({
  value,
  onChange,
}: Props) {
  return (
    <Card>

      <Text style={styles.heading}>
        📝 Delivery Notes
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Special delivery instructions..."
        placeholderTextColor="#94A3B8"
        multiline
        numberOfLines={4}
        textAlignVertical="top"
        value={value}
        onChangeText={onChange}
      />

      <Text style={styles.helper}>
        Optional: Gate number, landmark, unloading instructions, contact person, etc.
      </Text>

    </Card>
  );
}

const styles = StyleSheet.create({

  heading: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 16,
  },

  input: {
    minHeight: 110,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 14,
    padding: 14,
    fontSize: 15,
    color: "#0F172A",
    backgroundColor: "#FFFFFF",
  },

  helper: {
    marginTop: 10,
    fontSize: 12,
    color: "#64748B",
    lineHeight: 18,
  },

});