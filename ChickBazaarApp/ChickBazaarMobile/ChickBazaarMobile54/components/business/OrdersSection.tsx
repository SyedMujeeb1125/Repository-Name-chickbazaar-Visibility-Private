import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

type Props = {
  orders: any[];
  onOrderPress: (id: string) => void;
};

export default function OrdersSection({
  orders,
  onOrderPress,
}: Props) {

  return (

    <View style={styles.container}>

      <Text style={styles.heading}>
        Recent Orders
      </Text>

      {orders.length === 0 ? (

        <View style={styles.emptyCard}>

          <Text style={styles.emptyText}>
            No recent orders found.
          </Text>

        </View>

      ) : (

        orders.slice(0, 5).map((order) => (

          <TouchableOpacity
            key={order.id}
            style={styles.card}
            activeOpacity={0.8}
            onPress={() =>
              onOrderPress(order.id)
            }
          >

            <View style={styles.topRow}>

              <View>

                <Text style={styles.orderNo}>
                  {order.order_number ??
                    order.orderNumber}
                </Text>

                <Text style={styles.date}>
                  {new Date(
                    order.created_at ??
                    order.createdAt
                  ).toLocaleDateString()}
                </Text>

              </View>

              <View style={styles.statusBadge}>

                <Text style={styles.statusText}>
                  {String(order.status)
                    .replace("_"," ")
                    .toUpperCase()}
                </Text>

              </View>

            </View>

            <View style={styles.divider} />

            <View style={styles.bottomRow}>

              <View>

                <Text style={styles.label}>
                  Quantity
                </Text>

                <Text style={styles.value}>
                  {order.requestedWeight ??
                    0} kg
                </Text>

              </View>

              <View>

                <Text style={styles.label}>
                  Amount
                </Text>

                <Text style={styles.amount}>
                  ₹
                  {Number(
                    order.final_amount ??
                    order.finalAmount ??
                    order.estimated_amount ??
                    order.estimatedAmount ??
                    0
                  ).toLocaleString()}
                </Text>

              </View>

            </View>

            <Text style={styles.view}>
              View Details →
            </Text>

          </TouchableOpacity>

        ))

      )}

    </View>

  );

}

const styles = StyleSheet.create({

container:{
marginBottom:20,
},

heading:{
fontSize:22,
fontWeight:"800",
marginBottom:18,
color:"#0F172A",
},

card:{
backgroundColor:"#FFFFFF",
borderRadius:22,
padding:20,
marginBottom:16,
elevation:3,
},

topRow:{
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center",
},

orderNo:{
fontSize:18,
fontWeight:"800",
color:"#0F172A",
},

date:{
marginTop:5,
fontSize:13,
color:"#64748B",
},

statusBadge:{
backgroundColor:"#FFF4EC",
paddingHorizontal:12,
paddingVertical:6,
borderRadius:20,
},

statusText:{
color:"#F97316",
fontWeight:"700",
fontSize:12,
},

divider:{
height:1,
backgroundColor:"#EEF2F7",
marginVertical:16,
},

bottomRow:{
flexDirection:"row",
justifyContent:"space-between",
},

label:{
fontSize:13,
color:"#64748B",
},

value:{
marginTop:4,
fontWeight:"700",
fontSize:16,
},

amount:{
marginTop:4,
fontWeight:"800",
fontSize:18,
color:"#16A34A",
},

view:{
marginTop:18,
color:"#2563EB",
fontWeight:"700",
},

emptyCard:{
backgroundColor:"#FFFFFF",
padding:30,
borderRadius:22,
alignItems:"center",
},

emptyText:{
color:"#94A3B8",
fontSize:15,
},

});