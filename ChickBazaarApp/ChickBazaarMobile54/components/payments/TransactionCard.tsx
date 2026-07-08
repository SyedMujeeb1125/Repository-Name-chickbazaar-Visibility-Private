import React from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import Card from "../ui/Card";

type Props = {
  title: string;
  amount: number;
  date: string;
  type: "credit" | "debit";
};

export default function TransactionCard({
  title,
  amount,
  date,
  type,
}: Props) {

  return (

    <Card>

      <View style={styles.row}>

        <View>

          <Text style={styles.title}>
            {title}
          </Text>

          <Text style={styles.date}>
            {date}
          </Text>

        </View>

        <Text
          style={[
            styles.amount,
            {
              color:
                type === "credit"
                  ? "#16A34A"
                  : "#EF4444",
            },
          ]}
        >
          {type === "credit"
            ? "+"
            : "-"}
          ₹
          {amount.toLocaleString()}
        </Text>

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

title:{
fontWeight:"700",
fontSize:16,
},

date:{
marginTop:6,
color:"#64748B",
},

amount:{
fontWeight:"700",
fontSize:20,
},

});