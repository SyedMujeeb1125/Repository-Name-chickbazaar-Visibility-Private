import React, { useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import CBCard from "../common/CBCard";

export type FulfilmentPreference =
  | "closest"
  | "strict"
  | "contact";

type Props = {
  onChange?: (
    value: FulfilmentPreference
  ) => void;
};

export default function FulfilmentPreferenceCard({
  onChange,
}: Props) {

  const [selected, setSelected] =
    useState<FulfilmentPreference>(
      "closest"
    );

  function choose(
    value: FulfilmentPreference
  ) {

    setSelected(value);

    onChange?.(value);

  }

  return (

    <CBCard>

      <Text style={styles.title}>
        🚚 Order Fulfilment Preference
      </Text>

      <Option
        active={
          selected === "closest"
        }
        title="Closest Match (Recommended)"
        subtitle="We'll prioritise your preferred bird sizes. If an exact match isn't available, we'll supply the closest available sizes while maintaining quality and freshness."
        onPress={() =>
          choose("closest")
        }
      />

      <Option
        active={
          selected === "strict"
        }
        title="Strict Size Match"
        subtitle="Deliver only if the selected bird sizes are available."
        onPress={() =>
          choose("strict")
        }
      />

      <Option
        active={
          selected === "contact"
        }
        title="Contact Before Substitution"
        subtitle="If the requested bird sizes aren't available, please call me before making any changes."
        onPress={() =>
          choose("contact")
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

      <Text
        style={styles.heading}
      >
        {active ? "🔘" : "⚪"} {title}
      </Text>

      <Text
        style={styles.subtitle}
      >
        {subtitle}
      </Text>

    </TouchableOpacity>

  );

}

const styles =
StyleSheet.create({

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