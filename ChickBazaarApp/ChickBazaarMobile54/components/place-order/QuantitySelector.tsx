import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import Card from "../ui/Card";

type Props = {
  orderType: "weight" | "birds";
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onSelect: (value: number) => void;
};

export default function QuantitySelector({
  orderType,
  value,
  onIncrease,
  onDecrease,
  onSelect,
}: Props) {

  const presets =
    orderType === "weight"
      ? [100, 200, 500, 1000]
      : [50, 100, 250, 500];

  return (

    <Card>

      <Text style={styles.heading}>
        {orderType === "weight"
          ? "⚖ Quantity"
          : "🐔 Birds"}
      </Text>

      <Text style={styles.subHeading}>
        Quick Select
      </Text>

      <View style={styles.grid}>

        {presets.map((item) => (

          <TouchableOpacity
            key={item}
            style={[
              styles.preset,

              value === item &&
                styles.selectedPreset,
            ]}
            onPress={() =>
              onSelect(item)
            }
          >

            <Text
              style={[
                styles.presetText,

                value === item &&
                  styles.selectedText,
              ]}
            >

              {item}

              {orderType === "weight"
                ? " KG"
                : ""}

            </Text>

          </TouchableOpacity>

        ))}

      </View>

      <View style={styles.divider} />

      <Text style={styles.subHeading}>
        Fine Tune
      </Text>

      <View style={styles.adjustRow}>

        <TouchableOpacity
          style={styles.adjustButton}
          onPress={onDecrease}
        >
          <Text style={styles.adjustText}>
            {orderType === "weight"
              ? "-10"
              : "-5"}
          </Text>
        </TouchableOpacity>

        <View style={styles.center}>

          <Text style={styles.value}>
            {value}
          </Text>

          <Text style={styles.unit}>
            {orderType === "weight"
              ? "KG"
              : "Birds"}
          </Text>

        </View>

        <TouchableOpacity
          style={styles.adjustButton}
          onPress={onIncrease}
        >
          <Text style={styles.adjustText}>
            {orderType === "weight"
              ? "+10"
              : "+5"}
          </Text>
        </TouchableOpacity>

      </View>

    </Card>

  );

}

const styles = StyleSheet.create({

heading:{
fontSize:22,
fontWeight:"800",
marginBottom:18,
},

subHeading:{
fontSize:15,
fontWeight:"600",
color:"#64748B",
marginBottom:12,
},

grid:{
flexDirection:"row",
flexWrap:"wrap",
justifyContent:"space-between",
},

preset:{
width:"48%",
backgroundColor:"#F8FAFC",
paddingVertical:16,
borderRadius:16,
alignItems:"center",
marginBottom:12,
borderWidth:1,
borderColor:"#E2E8F0",
},

selectedPreset:{
backgroundColor:"#F97316",
borderColor:"#F97316",
},

presetText:{
fontWeight:"700",
fontSize:16,
color:"#0F172A",
},

selectedText:{
color:"#FFFFFF",
},

divider:{
height:1,
backgroundColor:"#EEF2F7",
marginVertical:18,
},

adjustRow:{
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center",
},

adjustButton:{
width:70,
height:54,
backgroundColor:"#F97316",
borderRadius:16,
justifyContent:"center",
alignItems:"center",
},

adjustText:{
color:"#FFF",
fontSize:20,
fontWeight:"700",
},

center:{
alignItems:"center",
},

value:{
fontSize:34,
fontWeight:"800",
color:"#0F172A",
},

unit:{
marginTop:4,
fontSize:15,
color:"#64748B",
},

});