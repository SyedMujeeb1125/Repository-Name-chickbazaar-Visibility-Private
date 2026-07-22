import React from "react";

import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import Card from "../ui/Card";

type Props = {

  selected: number[];

  onChange: (
    days: number[]
  ) => void;

};

const DAYS = [

  { id: 1, label: "M" },
  { id: 2, label: "T" },
  { id: 3, label: "W" },
  { id: 4, label: "T" },
  { id: 5, label: "F" },
  { id: 6, label: "S" },
  { id: 0, label: "S" },

];

export default function WeekdaySelector({

  selected,

  onChange,

}: Props) {

  function toggle(day: number) {

    if (selected.includes(day)) {

      onChange(
        selected.filter(
          (d) => d !== day
        )
      );

      return;

    }

    onChange([
      ...selected,
      day,
    ]);

  }

  return (

    <Card>

      <Text style={styles.heading}>
        Delivery Days
      </Text>

      <View style={styles.row}>

        {DAYS.map((day) => {

          const active =
            selected.includes(day.id);

          return (

            <TouchableOpacity
              key={day.id}
              onPress={() =>
                toggle(day.id)
              }
              style={[
                styles.day,
                active &&
                  styles.activeDay,
              ]}
            >

              <Text
                style={[
                  styles.text,
                  active &&
                    styles.activeText,
                ]}
              >
                {day.label}
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

  day: {

    width: 42,

    height: 42,

    borderRadius: 21,

    borderWidth: 1,

    borderColor: "#CBD5E1",

    justifyContent: "center",

    alignItems: "center",

  },

  activeDay: {

    backgroundColor: "#F97316",

    borderColor: "#F97316",

  },

  text: {

    fontWeight: "800",

    color: "#475569",

  },

  activeText: {

    color: "#FFFFFF",

  },

});