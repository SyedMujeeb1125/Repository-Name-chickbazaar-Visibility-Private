import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Card from "../ui/Card";

type Props = {
  farmName?: string;
  farmContact?: string;
};

export default function AssignedFarmCard({
  farmName,
  farmContact,
}: Props) {
  return (
    <Card>
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="home-group"
          size={24}
          color="#16A34A"
        />

        <Text style={styles.title}>
          Assigned Farm
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Farm</Text>
        <Text style={styles.value}>
          {farmName || "Awaiting allocation"}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Contact</Text>
        <Text style={styles.value}>
          {farmContact || "-"}
        </Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  label: {
    color: "#64748B",
    fontSize: 15,
  },
  value: {
    color: "#0F172A",
    fontSize: 15,
    fontWeight: "600",
  },
});