import React from "react";

import {
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import Card from "../ui/Card";

type Props = {

  frequency: string;

  quantity: number;

  autoConfirm: boolean;

  nextDelivery?: string;

  weekdays?: number[];

  dayOfMonth?: number;

  onToggleAutoConfirm?: () => void;

  onEdit: () => void;

  onDelete: () => void;

};

const DAY_NAMES = [

  "Sun",

  "Mon",

  "Tue",

  "Wed",

  "Thu",

  "Fri",

  "Sat",

];

export default function ScheduleCard({

  frequency,

  quantity,

  autoConfirm,

  nextDelivery,

  weekdays = [],

  dayOfMonth,

  onToggleAutoConfirm,

  onEdit,

  onDelete,

}: Props) {

  let scheduleText =
    "Every Day";

  if (
    frequency === "Weekly" &&
    weekdays.length > 0
  ) {

    scheduleText =
      weekdays
        .map(
          (day) =>
            DAY_NAMES[day]
        )
        .join(" • ");

  } else if (
    frequency === "Monthly" &&
    dayOfMonth
  ) {

    scheduleText =
      `Day ${dayOfMonth}`;

  }

  return (

    <Card>

      <View style={styles.header}>

        <View>

          <Text style={styles.frequency}>
            {frequency}
          </Text>

          <Text style={styles.next}>
            Next Delivery
          </Text>

          <Text style={styles.date}>
            {nextDelivery ?? "--"}
          </Text>

          <Text style={styles.schedule}>
            {scheduleText}
          </Text>

        </View>

        <MaterialCommunityIcons
          name="calendar-check"
          size={32}
          color="#F97316"
        />

      </View>

      <View style={styles.divider} />

      <View style={styles.row}>

        <Text style={styles.label}>
          Quantity
        </Text>

        <Text style={styles.value}>
          {quantity} KG
        </Text>

      </View>

      <View style={styles.row}>

        <Text style={styles.label}>
          Auto Confirm
        </Text>

        <Switch
  value={autoConfirm}
  onValueChange={() =>
    onToggleAutoConfirm?.()
  }
/>

      </View>

      <View style={styles.buttonRow}>

        <TouchableOpacity
          style={styles.editButton}
          onPress={onEdit}
        >

          <MaterialCommunityIcons
            name="pencil"
            size={18}
            color="#FFFFFF"
          />

          <Text style={styles.buttonText}>
            Edit
          </Text>

        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={onDelete}
        >

          <MaterialCommunityIcons
            name="delete-outline"
            size={18}
            color="#DC2626"
          />

          <Text style={styles.deleteText}>
            Delete
          </Text>

        </TouchableOpacity>

      </View>

    </Card>

  );

}

const styles = StyleSheet.create({

  header: {

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

  },

  frequency: {

    fontSize: 22,

    fontWeight: "800",

    color: "#0F172A",

  },

  next: {

    marginTop: 8,

    fontSize: 13,

    color: "#64748B",

  },

  date: {

    marginTop: 2,

    fontWeight: "700",

    color: "#F97316",

  },

  schedule: {

    marginTop: 6,

    fontSize: 13,

    color: "#64748B",

    fontWeight: "600",

  },

  divider: {

    height: 1,

    backgroundColor: "#E2E8F0",

    marginVertical: 18,

  },

  row: {

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    marginBottom: 16,

  },

  label: {

    fontSize: 15,

    color: "#64748B",

  },

  value: {

    fontSize: 18,

    fontWeight: "800",

    color: "#0F172A",

  },

  buttonRow: {

    flexDirection: "row",

    marginTop: 12,

  },

  editButton: {

    flex: 1,

    backgroundColor: "#F97316",

    borderRadius: 14,

    height: 48,

    justifyContent: "center",

    alignItems: "center",

    flexDirection: "row",

    marginRight: 8,

  },

  deleteButton: {

    flex: 1,

    borderWidth: 1,

    borderColor: "#DC2626",

    borderRadius: 14,

    height: 48,

    justifyContent: "center",

    alignItems: "center",

    flexDirection: "row",

  },

  buttonText: {

    marginLeft: 6,

    color: "#FFFFFF",

    fontWeight: "700",

  },

  deleteText: {

    marginLeft: 6,

    color: "#DC2626",

    fontWeight: "700",

  },

});