import React from "react";

import {
    StyleSheet,
    Text,
    View,
} from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type Transaction = {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  amount?: string;
  time: string;
};

type Props = {
  transactions: Transaction[];
};

export default function RecentTransactionsCard({
  transactions,
}: Props) {

  return (

    <View style={styles.card}>

      <Text style={styles.heading}>
        Recent Transactions
      </Text>

      {transactions.length === 0 ? (

        <View style={styles.emptyContainer}>

          <MaterialCommunityIcons
            name="cash-remove"
            size={56}
            color="#CBD5E1"
          />

          <Text style={styles.emptyTitle}>
            No Transactions Yet
          </Text>

          <Text style={styles.emptyText}>
            Your payments and invoices will appear here.
          </Text>

        </View>

      ) : (

        transactions.map((item) => (

          <View
            key={item.id}
            style={styles.row}
          >

            <View style={styles.iconCircle}>

              <MaterialCommunityIcons
                name={item.icon as any}
                size={24}
                color="#F97316"
              />

            </View>

            <View style={styles.content}>

              <Text style={styles.title}>
                {item.title}
              </Text>

              <Text style={styles.subtitle}>
                {item.subtitle}
              </Text>

            </View>

            <View
              style={{
                alignItems:"flex-end",
              }}
            >

              {!!item.amount && (

                <Text style={styles.amount}>
                  {item.amount}
                </Text>

              )}

              <Text style={styles.time}>
                {item.time}
              </Text>

            </View>

          </View>

        ))

      )}

    </View>

  );

}

const styles = StyleSheet.create({

  card:{
    backgroundColor:"#FFFFFF",
    borderRadius:24,
    padding:22,
    marginBottom:30,

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
    alignItems:"center",
    paddingVertical:14,
    borderBottomWidth:1,
    borderBottomColor:"#F1F5F9",
  },

  iconCircle:{
    width:48,
    height:48,
    borderRadius:24,
    backgroundColor:"#FFF7ED",
    justifyContent:"center",
    alignItems:"center",
    marginRight:14,
  },

  content:{
    flex:1,
  },

  title:{
    fontSize:16,
    fontWeight:"700",
    color:"#0F172A",
  },

  subtitle:{
    marginTop:4,
    color:"#64748B",
    fontSize:13,
  },

  amount:{
    fontSize:15,
    fontWeight:"800",
    color:"#16A34A",
  },

  time:{
    marginTop:4,
    color:"#94A3B8",
    fontSize:12,
  },

  emptyContainer:{
    alignItems:"center",
    paddingVertical:30,
  },

  emptyTitle:{
    marginTop:16,
    fontSize:20,
    fontWeight:"800",
    color:"#0F172A",
  },

  emptyText:{
    marginTop:8,
    textAlign:"center",
    color:"#64748B",
    lineHeight:22,
  },

});