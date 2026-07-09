import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  title: string;
};

export default function EmptyState({
  title,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>📭</Text>

      <Text style={styles.title}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 30,
  },

  icon: {
    fontSize: 40,
    marginBottom: 10,
  },

  title: {
    color: "#64748B",
    fontSize: 16,
  },
});
