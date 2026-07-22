import React from "react";
import {
  StyleSheet,
  View,
  type DimensionValue,
} from "react-native";

function SkeletonBlock({
  height,
  width = "100%",
}: {
  height: number;
  width?: DimensionValue;
}) {
  return (
    <View
      style={[
        styles.block,
        {
          height,
          width,
        },
      ]}
    />
  );
}

function SkeletonCard() {
  return (
    <View style={styles.card}>
      <SkeletonBlock height={24} width="55%" />

      <View style={{ height: 18 }} />

      <SkeletonBlock height={16} />

      <View style={{ height: 10 }} />

      <SkeletonBlock height={16} width="70%" />
    </View>
  );
}

export default function OrderDetailsSkeleton() {
  return (
    <View style={styles.container}>
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 18,
  },

  block: {
    borderRadius: 8,
    backgroundColor: "#E5E7EB",
  },
});