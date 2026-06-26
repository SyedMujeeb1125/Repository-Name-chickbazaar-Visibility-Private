import React from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import CBCard from "../common/CBCard";
import CBSection from "../common/CBSection";

import { Colors } from "../../theme/colors";

type Props = {
  rate: number;
};

export default function LiveRateCard({
  rate,
}: Props) {
  return (
    <CBCard>
      <CBSection title="Today's Live Rate" />

      <Text style={styles.rate}>
        ₹ {rate.toFixed(2)} / KG
      </Text>

      <Text style={styles.note}>
        Live procurement rate
      </Text>
    </CBCard>
  );
}

const styles = StyleSheet.create({
  rate: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.primary,
  },

  note: {
    marginTop: 8,
    color: Colors.subtitle,
  },
});