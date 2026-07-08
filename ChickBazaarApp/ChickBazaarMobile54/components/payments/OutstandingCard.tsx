import React from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import Card from "../ui/Card";

type Props = {
  outstanding: number;
  creditLimit: number;
};

export default function OutstandingCard({
  outstanding,
  creditLimit,
}: Props) {

  const available =
    Math.max(creditLimit - outstanding, 0);

  const usedPercentage =
    creditLimit > 0
      ? Math.round(
          (outstanding / creditLimit) * 100
        )
      : 0;

  return (

    <Card>

      <Text style={styles.heading}>
        Outstanding Balance
      </Text>

      <Text style={styles.amount}>
        ₹
        {outstanding.toLocaleString()}
      </Text>

      <View style={styles.progressBackground}>

        <View
          style={[
            styles.progressFill,
            {
              width: `${Math.min(
                usedPercentage,
                100
              )}%`,
            },
          ]}
        />

      </View>

      <View style={styles.row}>

        <View>

          <Text style={styles.label}>
            Available Credit
          </Text>

          <Text style={styles.value}>
            ₹
            {available.toLocaleString()}
          </Text>

        </View>

        <View>

          <Text style={styles.label}>
            Credit Used
          </Text>

          <Text style={styles.value}>
            {usedPercentage}%
          </Text>

        </View>

      </View>

    </Card>

  );

}

const styles = StyleSheet.create({

heading:{
fontSize:18,
fontWeight:"700",
color:"#0F172A",
},

amount:{
fontSize:34,
fontWeight:"700",
color:"#EF4444",
marginVertical:16,
},

progressBackground:{
height:10,
backgroundColor:"#E2E8F0",
borderRadius:6,
overflow:"hidden",
},

progressFill:{
height:10,
backgroundColor:"#F97316",
},

row:{
marginTop:18,
flexDirection:"row",
justifyContent:"space-between",
},

label:{
color:"#64748B",
fontSize:13,
},

value:{
marginTop:6,
fontWeight:"700",
fontSize:18,
},

});