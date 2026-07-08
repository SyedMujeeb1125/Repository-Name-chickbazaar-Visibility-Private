import React from "react";

import {
  View,
  StyleSheet,
} from "react-native";

type Props = {
  current: number;
  total: number;
};

export default function ProgressBar({
  current,
  total,
}: Props) {

  const percentage =
    (current / total) * 100;

  return (

    <View style={styles.track}>

      <View
        style={[
          styles.progress,
          {
            width: `${percentage}%`,
          },
        ]}
      />

    </View>

  );

}

const styles = StyleSheet.create({

track:{
height:8,
backgroundColor:"#E5E7EB",
borderRadius:10,
overflow:"hidden",
marginTop:12,
},

progress:{
height:8,
backgroundColor:"#F97316",
},

});