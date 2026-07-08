import React from "react";

import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from "react-native";

type Shop = {
  id?: string;
  shopName: string;
  address: string;
};

type Props = {
  shop: Shop;
  selected: boolean;
  onPress: () => void;
};

export default function ShopCard({
  shop,
  selected,
  onPress,
}: Props) {

  return (

    <TouchableOpacity
      style={[
        styles.card,
        selected && styles.selected,
      ]}
      onPress={onPress}
    >

      <Text style={styles.name}>
        🏪 {shop.shopName}
      </Text>

      <Text style={styles.address}>
        📍 {shop.address}
      </Text>

      {selected && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            Selected
          </Text>
        </View>
      )}

    </TouchableOpacity>

  );

}

const styles = StyleSheet.create({

card:{
backgroundColor:"#FFF",
borderRadius:18,
padding:18,
marginBottom:16,
borderWidth:1,
borderColor:"#E5E7EB",
},

selected:{
borderColor:"#F97316",
backgroundColor:"#FFF7ED",
},

name:{
fontSize:18,
fontWeight:"700",
marginBottom:8,
},

address:{
color:"#64748B",
},

badge:{
marginTop:15,
alignSelf:"flex-start",
backgroundColor:"#F97316",
paddingHorizontal:12,
paddingVertical:5,
borderRadius:20,
},

badgeText:{
color:"#FFF",
fontWeight:"700",
fontSize:12,
},

});