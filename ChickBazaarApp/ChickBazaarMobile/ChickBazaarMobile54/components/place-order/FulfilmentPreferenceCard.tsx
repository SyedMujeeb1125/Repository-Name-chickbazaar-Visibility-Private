import React, { useState } from "react";

import {
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import CBCard from "../common/CBCard";

import {
  Colors,
  Typography,
  Spacing,
} from "../../theme";

export type FulfilmentPreference =
  | "closest"
  | "strict"
  | "contact";

type Props = {
  value?: FulfilmentPreference;

  onChange?: (
    value: FulfilmentPreference
  ) => void;
};

export default function FulfilmentPreferenceCard({
  value = "closest",
  onChange,
}: Props) {

  const [selected, setSelected] =
    useState(value);

  function choose(
    option: FulfilmentPreference
  ) {

    setSelected(option);

    onChange?.(option);

  }

  return (

    <CBCard>

      <Text style={styles.title}>
        Fulfilment Preference
      </Text>

      <Option
        active={
          selected === "closest"
        }
        title="Closest Match"
        subtitle="We'll deliver the nearest available bird size while maintaining freshness."
        onPress={() =>
          choose("closest")
        }
      />

      <Option
        active={
          selected === "strict"
        }
        title="Strict Size Match"
        subtitle="Deliver only if the requested bird size is available."
        onPress={() =>
          choose("strict")
        }
      />

      <Option
        active={
          selected === "contact"
        }
        title="Call Before Change"
        subtitle="Contact me before substituting bird size."
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
      onPress={onPress}
      style={[
        styles.option,
        active &&
          styles.active,
      ]}
    >

      <Text style={styles.heading}>
        {active ? "🟠" : "⚪"} {title}
      </Text>

      <Text style={styles.subtitle}>
        {subtitle}
      </Text>

    </TouchableOpacity>

  );

}

const styles =
StyleSheet.create({

title:{
fontSize:Typography.h3,
fontWeight:Typography.bold,
color:Colors.text,
marginBottom:Spacing.md,
},

option:{
borderWidth:1,
borderColor:Colors.border,
borderRadius:12,
padding:16,
marginBottom:12,
},

active:{
backgroundColor:Colors.primaryLight,
borderColor:Colors.primary,
},

heading:{
fontSize:Typography.body,
fontWeight:Typography.bold,
color:Colors.text,
},

subtitle:{
marginTop:6,
fontSize:Typography.small,
color:Colors.subtitle,
lineHeight:20,
},

});