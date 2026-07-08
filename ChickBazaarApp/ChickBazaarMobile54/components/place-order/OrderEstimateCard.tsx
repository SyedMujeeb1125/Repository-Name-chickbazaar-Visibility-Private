import React from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import CBCard from "../common/CBCard";

type Props = {
  orderType: "weight" | "birds";
  requestedWeight: number;
  estimatedBirds: number;
  birdCount: number;
  estimatedWeight: number;
  rate: number;
  estimatedAmount: number;
  advanceAmount: number;
};

export default function OrderEstimateCard({
  orderType,
  requestedWeight,
  estimatedBirds,
  birdCount,
  estimatedWeight,
  rate,
  estimatedAmount,
  advanceAmount,
}: Props) {
  return (
    <CBCard>

      <Text style={styles.title}>
        📊 Live Order Estimate
      </Text>

      {orderType === "weight" ? (
        <>
          <Row
            label="Requested Weight"
            value={`${requestedWeight} KG`}
          />

          <Row
            label="Estimated Birds"
            value={`≈ ${estimatedBirds}`}
          />
        </>
      ) : (
        <>
          <Row
            label="Requested Birds"
            value={`${birdCount}`}
          />

          <Row
            label="Estimated Weight"
            value={`≈ ${estimatedWeight} KG`}
          />
        </>
      )}

      <Row
        label="Today's Rate"
        value={`₹${rate}/KG`}
      />

      <Row
        label="Estimated Amount"
        value={`₹${estimatedAmount.toLocaleString()}`}
      />

      <Row
        label="Advance Required"
        value={`₹${advanceAmount.toLocaleString()}`}
        highlight
      />

    </CBCard>
  );
}

function Row({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>
        {label}
      </Text>

      <Text
        style={[
          styles.value,
          highlight && styles.highlight,
        ]}
      >
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({

  title:{
    fontSize:18,
    fontWeight:"700",
    marginBottom:15,
  },

  row:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginBottom:12,
  },

  label:{
    color:"#64748B",
    fontSize:15,
  },

  value:{
    fontWeight:"700",
    fontSize:15,
    color:"#111827",
  },

  highlight:{
    color:"#F97316",
    fontSize:17,
  },

});