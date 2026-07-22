import React from "react";

import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import Card from "../ui/Card";

type Frequency =
  | "Daily"
  | "Weekly"
  | "Monthly";

type Props = {

  value: Frequency;

  onChange: (
    value: Frequency
  ) => void;

};

const OPTIONS: Frequency[] = [

  "Daily",

  "Weekly",

  "Monthly",

];

export default function FrequencySelector({

  value,

  onChange,

}: Props) {

  return (

    <Card>

      <Text style={styles.heading}>
        Schedule Frequency
      </Text>

      <View style={styles.row}>

        {OPTIONS.map((item) => {

          const active =
            value === item;

          return (

            <TouchableOpacity
              key={item}
              style={[
                styles.option,
                active &&
                  styles.activeOption,
              ]}
              onPress={() =>
                onChange(item)
              }
            >

              <Text
                style={[
                  styles.text,
                  active &&
                    styles.activeText,
                ]}
              >
                {item}
              </Text>

            </TouchableOpacity>

          );

        })}

      </View>

    </Card>

  );

}

const styles = StyleSheet.create({

  heading: {

    fontSize: 18,

    fontWeight: "800",

    color: "#0F172A",

    marginBottom: 18,

  },

  row: {

    flexDirection: "row",

    justifyContent: "space-between",

  },

  option: {

    flex: 1,

    height: 46,

    borderRadius: 14,

    borderWidth: 1,

    borderColor: "#CBD5E1",

    justifyContent: "center",

    alignItems: "center",

    marginHorizontal: 4,

  },

  activeOption: {

    backgroundColor: "#F97316",

    borderColor: "#F97316",

  },

  text: {

    color: "#475569",

    fontWeight: "700",

  },

  activeText: {

    color: "#FFFFFF",

  },

});