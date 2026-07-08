import React from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

type Props = {
  rate: number;
};

export default function LiveRateCard({
  rate,
}: Props) {
  return (
    <View style={styles.card}>

      <View style={styles.left}>

        <Text style={styles.title}>
          Today's Rate
        </Text>

        <View style={styles.rateRow}>
          <Text style={styles.rate}>
            ₹{rate}
          </Text>

          <Text style={styles.unit}>
            /kg
          </Text>
        </View>

        <Text style={styles.validity}>
          Valid till 6:00 AM tomorrow
        </Text>

      </View>

      <View style={styles.graphContainer}>
        <Text style={styles.graph}>
          📈
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: "#FF6B00",
    borderRadius: 24,
    padding: 22,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 4,
  },

  left: {
    flex: 1,
  },

  title: {
    color: "#FFF",
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 12,
  },

  rateRow: {
    flexDirection: "row",
    alignItems: "flex-end",
  },

  rate: {
    color: "#FFF",
    fontSize: 48,
    fontWeight: "800",
  },

  unit: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 6,
    marginLeft: 4,
  },

  validity: {
    marginTop: 14,
    color: "#FFE8D6",
    fontSize: 15,
  },

  graphContainer: {
    width: 90,
    justifyContent: "center",
    alignItems: "center",
  },

  graph: {
    fontSize: 48,
  },

});