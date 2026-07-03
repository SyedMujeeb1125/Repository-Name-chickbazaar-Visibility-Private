import React from "react";

import {
  Text,
  StyleSheet,
} from "react-native";

type Props = {
  title: string;
};

export default function SectionTitle({
  title,
}: Props) {
  return (
    <Text style={styles.title}>
      {title}
    </Text>
  );
}

const styles = StyleSheet.create({

title:{
fontSize:20,
fontWeight:"700",
color:"#0F172A",
marginBottom:14,
marginTop:10,
}

});