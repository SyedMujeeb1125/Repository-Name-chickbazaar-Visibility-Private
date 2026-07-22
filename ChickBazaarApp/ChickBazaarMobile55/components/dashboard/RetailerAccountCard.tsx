import React from "react";

import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type Props = {

  invoiceAmount: number;

  amountPaid: number;

  outstanding: number;

};

export default function RetailerAccountCard({

  invoiceAmount,

  amountPaid,

  outstanding,

}: Props) {

  return (

    <View style={styles.card}>

      <View style={styles.header}>

        <MaterialCommunityIcons
          name="file-document-outline"
          size={22}
          color="#F97316"
        />

        <Text style={styles.title}>
          BUSINESS SUMMARY
        </Text>

      </View>

      <View style={styles.divider} />

      <View style={styles.row}>

        <Text style={styles.label}>
          Today's Invoice
        </Text>

        <Text style={styles.value}>
          ₹{invoiceAmount.toLocaleString()}
        </Text>

      </View>

      <View style={styles.row}>

        <Text style={styles.label}>
          Amount Paid
        </Text>

        <Text style={styles.value}>
          ₹{amountPaid.toLocaleString()}
        </Text>

      </View>

      <View style={styles.row}>

        <Text style={styles.outstandingLabel}>
          Outstanding
        </Text>

        <Text
          style={[
            styles.outstanding,

            {
              color:
                outstanding > 0
                  ? "#DC2626"
                  : "#16A34A",
            },
          ]}
        >
          ₹{outstanding.toLocaleString()}
        </Text>

      </View>

    </View>

  );

}

const styles = StyleSheet.create({

  card:{

    backgroundColor:"#FFFFFF",

    borderRadius:24,

    padding:20,

    shadowColor:"#000",

    shadowOpacity:0.05,

    shadowRadius:10,

    shadowOffset:{
      width:0,
      height:4,
    },

    elevation:3,

  },

  header:{

    flexDirection:"row",

    alignItems:"center",

  },

  title:{

    marginLeft:8,

    fontSize:16,

    fontWeight:"800",

    color:"#0F172A",

  },

  divider:{

    height:1,

    backgroundColor:"#E2E8F0",

    marginVertical:18,

  },

  row:{

    flexDirection:"row",

    justifyContent:"space-between",

    marginBottom:18,

  },

  label:{

    color:"#64748B",

    fontSize:14,

  },

  value:{

    color:"#0F172A",

    fontWeight:"700",

    fontSize:15,

  },

  outstandingLabel:{

    color:"#0F172A",

    fontSize:16,

    fontWeight:"800",

  },

  outstanding:{

    fontSize:20,

    fontWeight:"900",

  },

});