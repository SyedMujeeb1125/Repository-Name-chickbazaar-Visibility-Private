import React from "react";

import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type Props = {
  onInvoices: () => void;
  onPayments: () => void;
  onLedger: () => void;
  onAnalytics: () => void;
};

function ActionCard({
  icon,
  title,
  color,
  onPress,
}: any) {

  return (

    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={onPress}
    >

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
          size={28}
          color={color}
        />

      </View>

      <Text style={styles.title}>
        {title}
      </Text>

    </TouchableOpacity>

  );

}

export default function BusinessQuickActions({
  onInvoices,
  onPayments,
  onLedger,
  onAnalytics,
}: Props) {

  return (

    <View style={styles.container}>

      <Text style={styles.heading}>
        Quick Actions
      </Text>

      <View style={styles.grid}>

        <ActionCard
          icon="file-document-outline"
          title="Invoices"
          color="#2563EB"
          onPress={onInvoices}
        />

        <ActionCard
          icon="cash-check"
          title="Payments"
          color="#16A34A"
          onPress={onPayments}
        />

        <ActionCard
          icon="book-open-page-variant"
          title="Ledger"
          color="#F97316"
          onPress={onLedger}
        />

        <ActionCard
          icon="chart-line"
          title="Analytics"
          color="#9333EA"
          onPress={onAnalytics}
        />

      </View>

    </View>

  );

}

const styles = StyleSheet.create({

  container:{
    marginBottom:24,
  },

  heading:{
    fontSize:22,
    fontWeight:"800",
    color:"#0F172A",
    marginBottom:18,
  },

  grid:{
    flexDirection:"row",
    flexWrap:"wrap",
    justifyContent:"space-between",
  },

  card:{
    width:"48%",
    backgroundColor:"#FFFFFF",
    borderRadius:22,
    paddingVertical:24,
    alignItems:"center",
    marginBottom:16,

    shadowColor:"#000",
    shadowOpacity:0.08,
    shadowRadius:12,
    shadowOffset:{
      width:0,
      height:6,
    },

    elevation:5,
  },

  iconCircle:{
    width:62,
    height:62,
    borderRadius:31,
    justifyContent:"center",
    alignItems:"center",
  },

  title:{
    marginTop:16,
    fontSize:16,
    fontWeight:"700",
    color:"#0F172A",
  },

});