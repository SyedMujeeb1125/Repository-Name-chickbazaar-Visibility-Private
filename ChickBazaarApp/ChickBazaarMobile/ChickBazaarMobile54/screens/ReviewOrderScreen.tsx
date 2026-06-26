import React from "react";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";

import CBHeader from "../components/common/CBHeader";
import CBCard from "../components/common/CBCard";
import CBButton from "../components/common/CBButton";

import CBAmount from "../components/common/CBAmount";

export default function ReviewOrderScreen({
  navigation,
  route,
}: any) {

  const {
    retailer,
    selectedShop,
    todayRate,
    quantity,
    estimatedAmount,
    advanceRequired,
    deliveryDate,
    notes,
  } = route.params;

  return (

    <SafeAreaView
      style={styles.container}
    >

      <ScrollView
        contentContainerStyle={{
          padding:20,
        }}
      >

        <CBHeader

          title="Review Order"

          subtitle="Please verify before placing order"

        />

        <CBCard>

          <Text style={styles.label}>
            Delivery Shop
          </Text>

          <Text style={styles.value}>
            {selectedShop.shopName}
          </Text>

          <Text style={styles.sub}>
            {selectedShop.address}
          </Text>

        </CBCard>

        <CBCard>

          <Text style={styles.label}>
            Quantity
          </Text>

          <Text style={styles.value}>
            {quantity} KG
          </Text>

        </CBCard>

        <CBCard>

          <Text style={styles.label}>
            Today's Rate
          </Text>

          <CBAmount
            amount={todayRate}
            size={28}
          />

        </CBCard>

        <CBCard>

          <Text style={styles.label}>
            Estimated Amount
          </Text>

          <CBAmount
            amount={estimatedAmount}
          />

          <Text
            style={{
              marginTop:15,
            }}
          >
            Advance Required
          </Text>

          <CBAmount
            amount={advanceRequired}
          />

        </CBCard>

        <CBCard>

          <Text style={styles.label}>
            Delivery Date
          </Text>

          <Text style={styles.value}>
            {deliveryDate}
          </Text>

        </CBCard>

        {!!notes && (

          <CBCard>

            <Text style={styles.label}>
              Notes
            </Text>

            <Text>
              {notes}
            </Text>

          </CBCard>

        )}

        <CBButton

          title="Proceed to Payment"

          onPress={() => {

            navigation.navigate(
              "Payments",
              route.params
            );

          }}

        />

      </ScrollView>

    </SafeAreaView>

  );

}

const styles =
StyleSheet.create({

container:{
flex:1,
backgroundColor:"#F8FAFC",
},

label:{
fontWeight:"700",
marginBottom:8,
},

value:{
fontSize:20,
fontWeight:"700",
},

sub:{
marginTop:5,
color:"#64748B",
},

});