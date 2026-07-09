import React from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import Card from "../ui/Card";

type Props = {
  quantity: number;
  orderType: "weight" | "birds";
  amount: number;
};

export default function OrderSummaryCard({
  quantity,
  orderType,
  amount,
}: Props) {

  return (

    <Card>

      <Text style={styles.heading}>
        📦 Order Summary
      </Text>

      <View style={styles.row}>

        <Text style={styles.label}>
          Quantity
        </Text>

        <Text style={styles.value}>
          {quantity}
          {" "}
          {orderType === "weight"
            ? "KG"
            : "Birds"}
        </Text>

      </View>

      <View style={styles.divider}/>

      <View style={styles.row}>

        <Text style={styles.label}>
          Estimated Bill
        </Text>

        <Text style={styles.amount}>
          ₹
          {amount.toLocaleString()}
        </Text>

      </View>

    </Card>

  );

}

const styles = StyleSheet.create({

heading:{
fontSize:18,
fontWeight:"700",
marginBottom:18,
},

row:{
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center",
},

label:{
color:"#64748B",
},

value:{
fontWeight:"700",
fontSize:18,
},

amount:{
fontWeight:"700",
fontSize:28,
color:"#F97316",
},

divider:{
height:1,
backgroundColor:"#E2E8F0",
marginVertical:16,
},

});
