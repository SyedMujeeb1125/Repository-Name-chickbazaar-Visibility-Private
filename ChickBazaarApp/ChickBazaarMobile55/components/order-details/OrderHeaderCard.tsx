import React from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import Card from "../ui/Card";

type Props = {
  orderNumber: string;
  status: string;
  orderDate: string;
};

export default function OrderHeaderCard({
  orderNumber,
  status,
  orderDate,
}: Props) {

  const badgeColor =
    status === "delivered"
      ? "#16A34A"
      : status === "dispatched"
      ? "#2563EB"
      : "#F97316";

  return (

    <Card>

      <View style={styles.row}>

        <View>

          <Text style={styles.orderNumber}>
            {orderNumber}
          </Text>

          <Text style={styles.date}>
            {new Date(orderDate).toLocaleDateString()}
          </Text>

        </View>

        <View
          style={[
            styles.badge,
            {
              backgroundColor: badgeColor,
            },
          ]}
        >

          <Text style={styles.badgeText}>
            {status.toUpperCase()}
          </Text>

        </View>

      </View>

    </Card>

  );

}

const styles = StyleSheet.create({

row:{
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center",
},

orderNumber:{
fontSize:22,
fontWeight:"700",
color:"#0F172A",
},

date:{
marginTop:6,
color:"#64748B",
},

badge:{
paddingHorizontal:14,
paddingVertical:8,
borderRadius:20,
},

badgeText:{
color:"#FFF",
fontWeight:"700",
fontSize:12,
},

});
