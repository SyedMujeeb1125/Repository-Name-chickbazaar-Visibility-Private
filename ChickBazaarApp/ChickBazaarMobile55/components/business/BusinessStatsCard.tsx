import React from "react";

import {
    StyleSheet,
    Text,
    View,
} from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type Props = {
  todayPurchase: number;
  monthlyPurchase: number;
  lifetimePurchase: number;
};

function formatAmount(amount: number) {

  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(1)}Cr`;
  }

  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)}L`;
  }

  if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(1)}K`;
  }

  return `₹${amount}`;

}

function StatItem({
  icon,
  color,
  title,
  value,
}: any) {

  return (

    <View style={styles.item}>

      <View
        style={[
          styles.iconCircle,
          {
            backgroundColor: `${color}15`,
          },
        ]}
      >

        <MaterialCommunityIcons
          name={icon}
          size={24}
          color={color}
        />

      </View>

      <Text style={styles.title}>
        {title}
      </Text>

      <Text
        style={[
          styles.value,
          {
            color,
          },
        ]}
      >
        {value}
      </Text>

    </View>

  );

}

export default function BusinessStatsCard({
  todayPurchase,
  monthlyPurchase,
  lifetimePurchase,
}: Props) {

  return (

    <View style={styles.card}>

      <Text style={styles.heading}>
        Business Statistics
      </Text>

      <View style={styles.row}>

        <StatItem
          icon="calendar-today"
          color="#2563EB"
          title="Today"
          value={formatAmount(todayPurchase)}
        />

        <StatItem
          icon="calendar-month"
          color="#F97316"
          title="This Month"
          value={formatAmount(monthlyPurchase)}
        />

        <StatItem
          icon="trophy-outline"
          color="#16A34A"
          title="Lifetime"
          value={formatAmount(lifetimePurchase)}
        />

      </View>

    </View>

  );

}

const styles = StyleSheet.create({

  card: {

    backgroundColor:"#FFFFFF",

    borderRadius: 26,

    padding:22,

    marginBottom:22,

    shadowColor:"#000",

    shadowOpacity:0.08,

    shadowRadius:14,

    shadowOffset:{
      width:0,
      height:8,
    },

    elevation:6,

  },

  heading:{
    fontSize:22,
    fontWeight:"800",
    color:"#0F172A",
    marginBottom:22,
  },

  row:{
    flexDirection:"row",
    justifyContent:"space-between",
  },

  item:{
    flex:1,
    alignItems:"center",
  },

  iconCircle:{
    width:54,
    height:54,
    borderRadius:27,
    justifyContent:"center",
    alignItems:"center",
  },

  title:{
    marginTop:10,
    color:"#64748B",
    fontSize:13,
    fontWeight:"700",
  },

  value:{
    marginTop:8,
    fontSize:18,
    fontWeight:"800",
    textAlign:"center",
  },

});
