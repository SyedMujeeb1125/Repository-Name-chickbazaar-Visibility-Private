import React from "react";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  current: string;
  navigation: any;
};

export default function BottomNav({
  current,
  navigation,
}: Props) {

  return (

    <View style={styles.container}>

      <NavItem
  icon="🏠"
  title="Home"
  active={current === "Dashboard"}
  onPress={() => {
    navigation.navigate("Home", {
      screen: "Dashboard",
    });
  }}
/>

<NavItem
  icon="📦"
  title="Orders"
  active={current === "MyOrders"}
  onPress={() =>
    navigation.navigate("MyOrders")
  }
/>
       
      <TouchableOpacity
        style={styles.centerButton}
        onPress={() =>
          navigation.navigate("PlaceOrder")
        }
      >

        <Text style={styles.centerIcon}>
          🐔
        </Text>

      </TouchableOpacity>

      <NavItem
        icon="💳"
        title="Bills"
        active={current==="Outstanding"}
        onPress={() =>
          navigation.navigate("Outstanding")
        }
      />

      <NavItem
        icon="👤"
        title="Profile"
        active={current==="Profile"}
        onPress={() =>
          navigation.navigate("Profile")
        }
      />

    </View>

  );

}

function NavItem({
  icon,
  title,
  active,
  onPress,
}:any){

  return(

    <TouchableOpacity
      style={styles.item}
      onPress={onPress}
    >

      <Text
        style={[
          styles.icon,
          active && styles.active,
        ]}
      >
        {icon}
      </Text>

      <Text
        style={[
          styles.text,
          active && styles.active,
        ]}
      >
        {title}
      </Text>

    </TouchableOpacity>

  );

}

const styles=StyleSheet.create({

container:{
height:78,
backgroundColor:"#FFFFFF",
flexDirection:"row",
justifyContent:"space-around",
alignItems:"center",
borderTopWidth:1,
borderTopColor:"#E5E7EB",
},

item:{
alignItems:"center",
flex:1,
},

icon:{
fontSize:24,
},

text:{
fontSize:12,
marginTop:4,
color:"#64748B",
},

active:{
color:"#F97316",
},

centerButton:{
width:72,
height:72,
borderRadius:36,
backgroundColor:"#F97316",
justifyContent:"center",
alignItems:"center",
marginTop:-34,
elevation:8,
},

centerIcon:{
fontSize:34,
},

});