import React from "react";
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
} from "react-native";

export default function LoadingView() {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="large"
        color="#F97316"
      />

      <Text style={styles.text}>
        Loading...
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    marginTop: 12,
    color: "#64748B",
  },
});
