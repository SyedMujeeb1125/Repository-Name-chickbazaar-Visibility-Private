import React from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import Card from "../ui/Card";

type Props = {
  icon: string;
  title: string;
  message: string;
  time: string;
  unread?: boolean;
};

export default function NotificationCard({
  icon,
  title,
  message,
  time,
  unread = false,
}: Props) {

  return (

    <Card>

      <View style={styles.row}>

        <View style={styles.iconContainer}>
          <Text style={styles.icon}>
            {icon}
          </Text>
        </View>

        <View style={styles.content}>

          <View style={styles.header}>

            <Text style={styles.title}>
              {title}
            </Text>

            <Text style={styles.time}>
              {time}
            </Text>

          </View>

          <Text style={styles.message}>
            {message}
          </Text>

        </View>

      </View>

      {unread && (
        <View style={styles.unreadDot} />
      )}

    </Card>

  );

}

const styles = StyleSheet.create({

row:{
flexDirection:"row",
},

iconContainer:{
width:48,
height:48,
borderRadius:24,
backgroundColor:"#FFF7ED",
justifyContent:"center",
alignItems:"center",
marginRight:14,
},

icon:{
fontSize:24,
},

content:{
flex:1,
},

header:{
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center",
},

title:{
fontWeight:"700",
fontSize:16,
color:"#0F172A",
},

time:{
fontSize:12,
color:"#94A3B8",
},

message:{
marginTop:6,
color:"#64748B",
lineHeight:20,
},

unreadDot:{
width:10,
height:10,
borderRadius:5,
backgroundColor:"#F97316",
position:"absolute",
top:18,
right:18,
},

});