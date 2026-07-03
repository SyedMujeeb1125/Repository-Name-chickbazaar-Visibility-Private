import React from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

type Props = {
  activeOrders: number;
  pendingBills: number;
  availableCredit: number;
};

export default function BusinessSummaryCard({
  activeOrders,
  pendingBills,
  availableCredit,
}: Props) {

  return (

    <View style={styles.container}>

      <Text style={styles.heading}>
        Business Summary
      </Text>

      <View style={styles.grid}>

        <SummaryCard
          value={String(activeOrders)}
          title="Total Orders"
          color="#F97316"
        />

        <SummaryCard
          value={`₹${pendingBills.toLocaleString()}`}
          title="Outstanding"
          color="#DC2626"
        />

        <SummaryCard
          value={`₹${availableCredit.toLocaleString()}`}
          title="Available Credit"
          color="#16A34A"
        />

      </View>

    </View>

  );

}

function SummaryCard({
  value,
  title,
  color,
}: any) {

  return (

    <View style={styles.card}>

      <Text
        style={[
          styles.value,
          { color },
        ]}
      >
        {value}
      </Text>

      <Text style={styles.title}>
        {title}
      </Text>

    </View>

  );

}

const styles = StyleSheet.create({

  container:{
    marginBottom:22,
  },

  heading:{
    fontSize:22,
    fontWeight:"800",
    color:"#0F172A",
    marginBottom:18,
  },

  grid:{
    flexDirection:"row",
    justifyContent:"space-between",
  },

  card:{
    width:"31%",
    backgroundColor:"#FFFFFF",
    borderRadius:20,
    paddingVertical:24,
    paddingHorizontal:10,
    alignItems:"center",
    elevation:3,
  },

  value:{
    fontSize:22,
    fontWeight:"800",
  },

  title:{
    marginTop:10,
    textAlign:"center",
    color:"#64748B",
    fontSize:13,
    lineHeight:18,
  },

});