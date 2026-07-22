import React from "react";

import {
    StyleSheet,
    Switch,
    Text,
    View,
} from "react-native";

import Card from "../ui/Card";

type Props = {

  value: boolean;

  onChange: (
    value: boolean
  ) => void;

};

export default function AutoConfirmCard({

  value,

  onChange,

}: Props) {

  return (

    <Card>

      <View style={styles.row}>

        <View style={styles.content}>

          <Text style={styles.heading}>
            Auto Confirm
          </Text>

          <Text style={styles.description}>
            Automatically confirm tomorrow's order without asking for approval.
          </Text>

        </View>

        <Switch
          value={value}
          onValueChange={onChange}
        />

      </View>

    </Card>

  );

}

const styles = StyleSheet.create({

  row: {

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

  },

  content: {

    flex: 1,

    marginRight: 16,

  },

  heading: {

    fontSize: 18,

    fontWeight: "800",

    color: "#0F172A",

  },

  description: {

    marginTop: 8,

    fontSize: 14,

    color: "#64748B",

    lineHeight: 20,

  },

});