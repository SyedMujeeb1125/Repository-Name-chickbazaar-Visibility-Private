import React from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import Card from "../ui/Card";

type Props = {
  orderType: "weight" | "birds";
  quantity: number;
  estimatedBirds: number;
  estimatedWeight: number;
  estimatedAmount: number;
  todayRate: number;
};

export default function LiveEstimateCard({
  orderType,
  quantity,
  estimatedBirds,
  estimatedWeight,
  estimatedAmount,
  todayRate,
}: Props) {

  return (

    <Card>

      <Text style={styles.heading}>
  Order Summary
</Text>

      <View style={styles.row}>
        <Text style={styles.label}>
          Quantity
        </Text>

        <Text style={styles.value}>
          {quantity}{" "}
          {orderType === "weight"
            ? "KG"
            : "Birds"}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>
          Estimated
        </Text>

        <Text style={styles.value}>
          {orderType === "weight"
            ? `≈ ${estimatedBirds} Birds`
            : `≈ ${estimatedWeight} KG`}
        </Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <Text style={styles.bill}>
  Total Estimated Amount
</Text>
<View style={styles.infoBox}>
  <Text style={styles.infoText}>
    Final amount will be calculated
    based on actual delivery weight.
  </Text>
</View>

        <Text style={styles.amount}>
          ₹{estimatedAmount.toLocaleString()}
        </Text>
      </View>

    </Card>

  );

}

const styles = StyleSheet.create({

heading:{
fontSize:20,
fontWeight:"800",
marginBottom:18,
},

row:{
flexDirection:"row",
justifyContent:"space-between",
marginBottom:12,
},

label:{
fontSize:15,
color:"#64748B",
},

value:{
fontSize:15,
fontWeight:"700",
color:"#0F172A",
},

divider:{
height:1,
backgroundColor:"#EEF2F7",
marginVertical:16,
},

bill:{
fontSize:18,
fontWeight:"700",
},

amount:{
fontSize:28,
fontWeight:"800",
color:"#F97316",
},

infoBox:{
  backgroundColor:"#FFF7ED",
  borderRadius:12,
  padding:14,
  marginTop:18,
},

infoText:{
  color:"#EA580C",
  fontSize:13,
  lineHeight:20,
},

});