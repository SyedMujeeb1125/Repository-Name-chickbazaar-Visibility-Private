import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

type Props = {
  title: string;
};

export default function SectionTitle({
  title,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 14,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0F172A",
  },
});
