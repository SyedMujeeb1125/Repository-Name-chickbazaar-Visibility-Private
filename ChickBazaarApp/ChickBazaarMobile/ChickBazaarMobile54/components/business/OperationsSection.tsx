import React from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

type Props = {
  activeOrders: number;
  captain?: string;
  eta?: string;
};

export default function OperationsSection({
  activeOrders,
  captain,
  eta,
}: Props) {

  if (activeOrders === 0) {
    return null;
  }

  return (

    <View style={styles.card}>

      <Text style={styles.heading}>
        Today's Delivery
      </Text>

      <View style={styles.divider} />

      <View style={styles.row}>
        <Text style={styles.label}>
          Orders
        </Text>

        <Text style={styles.value}>
          {activeOrders}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>
          Captain
        </Text>

        <Text style={styles.value}>
          {captain || "Not Assigned"}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>
          ETA
        </Text>

        <Text style={styles.value}>
          {eta || "--"}
        </Text>
      </View>

      <View style={styles.statusBox}>
        <Text style={styles.status}>
          🚚 Your order is being prepared for delivery.
        </Text>
      </View>

    </View>

  );

}

const styles = StyleSheet.create({

card:{
backgroundColor:"#FFFFFF",
borderRadius:22,
padding:20,
marginBottom:22,
elevation:3,
},

heading:{
fontSize:22,
fontWeight:"800",
color:"#0F172A",
},

divider:{
height:1,
backgroundColor:"#EEF2F7",
marginVertical:18,
},

row:{
flexDirection:"row",
justifyContent:"space-between",
marginBottom:14,
},

label:{
color:"#64748B",
fontSize:15,
},

value:{
fontWeight:"700",
fontSize:16,
color:"#0F172A",
},

statusBox:{
marginTop:10,
backgroundColor:"#FFF7ED",
padding:16,
borderRadius:16,
},

status:{
color:"#EA580C",
fontWeight:"600",
},

});