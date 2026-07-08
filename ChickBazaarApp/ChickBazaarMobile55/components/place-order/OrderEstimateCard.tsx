import React from "react";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import {
  StyleSheet,
  Text,
  View,
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

      <View style={styles.header}>

        <MaterialCommunityIcons
          name="clipboard-text-outline"
          size={24}
          color="#F97316"
        />

        <Text style={styles.title}>
          Order Summary
        </Text>

      </View>

      {orderType === "weight" ? (

        <>
          <Row
            icon="weight-kilogram"
            label="Weight"
            value={`${requestedWeight} KG`}
          />

          <Row
            icon="food-drumstick"
            label="Estimated Birds"
            value={`${estimatedBirds}`}
          />
        </>

      ) : (

        <>
          <Row
            icon="food-drumstick"
            label="Birds"
            value={`${birdCount}`}
          />

          <Row
            icon="weight-kilogram"
            label="Estimated Weight"
            value={`${estimatedWeight} KG`}
          />
        </>

      )}

      <Row
        icon="cash"
        label="Today's Rate"
        value={`₹${rate}/kg`}
      />

      <View style={styles.divider} />

      <View style={styles.totalSection}>

        <Text style={styles.totalLabel}>
          Estimated Total
        </Text>

        <Text style={styles.totalValue}>
          ₹{estimatedAmount.toLocaleString()}
        </Text>

      </View>

    </CBCard>

  );

}

function Row({
  icon,
  label,
  value,
}:{
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  label:string;
  value:string;
}){

  return(

    <View style={styles.row}>

      <View style={styles.left}>

        <MaterialCommunityIcons
          name={icon}
          size={20}
          color="#64748B"
        />

        <Text style={styles.label}>
          {label}
        </Text>

      </View>

      <Text style={styles.value}>
        {value}
      </Text>

    </View>

  );

}
const styles = StyleSheet.create({

  header: {

    flexDirection: "row",

    alignItems: "center",

    marginBottom: 20,

  },

  title: {

    marginLeft: 10,

    fontSize: 22,

    fontWeight: "800",

    color: "#0F172A",

  },

  row: {

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    paddingVertical: 12,

  },

  left: {

    flexDirection: "row",

    alignItems: "center",

    flex: 1,

  },

  label: {

    marginLeft: 10,

    fontSize: 15,

    color: "#64748B",

    fontWeight: "600",

  },

  value: {

    fontSize: 16,

    fontWeight: "800",

    color: "#0F172A",

  },

  divider: {

    height: 1,

    backgroundColor: "#E2E8F0",

    marginVertical: 18,

  },

  totalSection: {

    alignItems: "center",

    paddingVertical: 6,

  },

  totalLabel: {

    fontSize: 15,

    color: "#64748B",

    fontWeight: "600",

  },

  totalValue: {

    marginTop: 8,

    fontSize: 38,

    fontWeight: "900",

    color: "#F97316",

  },

});