import React from "react";

import {
  Text,
  StyleSheet,
} from "react-native";

import { Colors } from "../../theme/colors";

type Props = {
  title: string;
};

export default function CBSection({
  title,
}: Props) {
  return (
    <Text style={styles.title}>
      {title}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 12,
  },
});