import React from "react";

import {
  View,
  StyleSheet,
} from "react-native";

import { Colors } from "../../theme/colors";

export default function CBDivider() {
  return <View style={styles.divider} />;
}

const styles =
  StyleSheet.create({
    divider: {
      height: 1,
      backgroundColor:
        Colors.border,
      marginVertical: 16,
    },
  });
