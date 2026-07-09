import React from "react";

import DateTimePicker from "@react-native-community/datetimepicker";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import Card from "../ui/Card";
import PrimaryButton from "../ui/PrimaryButton";

type Props = {
  value: string;
  showPicker: boolean;
  onOpen: () => void;
  onClose: () => void;
  onChange: (date: string) => void;
};

export default function DeliveryDateCard({
  value,
  showPicker,
  onOpen,
  onClose,
  onChange,
}: Props) {
  return (
    <Card>

      <Text style={styles.heading}>
        📅 Delivery Date
      </Text>

      <PrimaryButton
        title={value}
        onPress={onOpen}
      />

      {showPicker && (
        <DateTimePicker
          value={new Date(value)}
          mode="date"
          display="default"
          minimumDate={new Date()}
          onChange={(_, date) => {

            onClose();

            if (date) {

              onChange(
                date
                  .toISOString()
                  .split("T")[0]
              );

            }

          }}
        />
      )}

    </Card>
  );
}

const styles = StyleSheet.create({

  heading: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
    color: "#0F172A",
  },

});
