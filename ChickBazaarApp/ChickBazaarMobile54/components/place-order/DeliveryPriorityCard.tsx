import React, { useState } from "react";

import {
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import CBCard from "../common/CBCard";

export type DeliveryPriority =
  | "standard"
  | "earliest"
  | "scheduled";

type Props = {
  onChange?: (
    value: DeliveryPriority
  ) => void;
};

export default function DeliveryPriorityCard({
  onChange,
}: Props) {

  const [selected, setSelected] =
    useState<DeliveryPriority>(
      "standard"
    );

  function choose(
    value: DeliveryPriority
  ) {

    setSelected(value);

    onChange?.(value);

  }

  return (

    <CBCard>

      <Text style={styles.title}>
        🚚 Delivery Priority
      </Text>

      <Option
        active={
          selected === "standard"
        }
        title="Standard (Recommended)"
        subtitle="Best balance of speed and availability."
        onPress={() =>
          choose("standard")
        }
      />

      <Option
        active={
          selected === "earliest"
        }
        title="Earliest Possible"
        subtitle="Dispatch as soon as birds are ready."
        onPress={() =>
          choose("earliest")
        }
      />

      <Option
        active={
          selected === "scheduled"
        }
        title="Scheduled Delivery"
        subtitle="Deliver during the selected delivery slot."
        onPress={() =>
          choose("scheduled")
        }
      />

    </CBCard>

  );

}

function Option({
  active,
  title,
  subtitle,
  onPress,
}: any) {

  return (

    <TouchableOpacity
      style={styles.option}
      onPress={onPress}
    >

      <Text style={styles.heading}>
        {active ? "🔘" : "⚪"} {title}
      </Text>

      <Text style={styles.subtitle}>
        {subtitle}
      </Text>

    </TouchableOpacity>

  );

}

const styles = StyleSheet.create({

title:{
fontSize:18,
fontWeight:"700",
marginBottom:15,
},

option:{
marginBottom:20,
},

heading:{
fontWeight:"700",
fontSize:16,
marginBottom:5,
},

subtitle:{
color:"#64748B",
lineHeight:20,
},

});