import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import Card from "../ui/Card";

type Props = {
  quantity: number;
  orderType: "weight" | "birds";
  estimatedAmount: number;
  onConfirm: () => void;
  onModify: () => void;
};

export default function TomorrowOrderCard({
  quantity,
  orderType,
  estimatedAmount,
  onConfirm,
  onModify,
}: Props) {

  return (

    <Card>

      <Text style={styles.heading}>
        🌅 Tomorrow's Order
      </Text>

      <Text style={styles.subHeading}>
        Based on your recent orders
      </Text>

      <View style={styles.summary}>

        <Text style={styles.quantity}>

          {quantity}

          {" "}

          {orderType === "weight"
            ? "KG"
            : "Birds"}

        </Text>

        <Text style={styles.amount}>
          ₹{estimatedAmount.toLocaleString()}
        </Text>

      </View>

      <View style={styles.buttonRow}>

        <TouchableOpacity
          style={styles.confirmButton}
          onPress={onConfirm}
        >

          <Text style={styles.buttonText}>
            ✓ Confirm
          </Text>

        </TouchableOpacity>

        <TouchableOpacity
          style={styles.modifyButton}
          onPress={onModify}
        >

          <Text style={styles.modifyText}>
            Modify
          </Text>

        </TouchableOpacity>

      </View>

    </Card>

  );

}

const styles = StyleSheet.create({

heading:{
fontSize:20,
fontWeight:"700",
color:"#0F172A",
},

subHeading:{
marginTop:4,
color:"#64748B",
},

summary:{
marginVertical:20,
},

quantity:{
fontSize:34,
fontWeight:"700",
color:"#F97316",
},

amount:{
marginTop:6,
fontSize:18,
fontWeight:"600",
},

buttonRow:{
flexDirection:"row",
},

confirmButton:{
flex:1,
backgroundColor:"#F97316",
paddingVertical:14,
borderRadius:14,
alignItems:"center",
marginRight:8,
},

modifyButton:{
flex:1,
borderWidth:1,
borderColor:"#F97316",
paddingVertical:14,
borderRadius:14,
alignItems:"center",
},

buttonText:{
color:"#FFF",
fontWeight:"700",
},

modifyText:{
color:"#F97316",
fontWeight:"700",
},

});
