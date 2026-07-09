import React from "react";

import {
  View,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import { Colors } from "../../theme/colors";

export default function CBLoading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="large"
        color={Colors.primary}
      />
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 40,
    },
  });
