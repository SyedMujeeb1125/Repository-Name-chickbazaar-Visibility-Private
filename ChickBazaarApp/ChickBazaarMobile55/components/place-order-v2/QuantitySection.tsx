import React, { useState } from "react";

import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import QuantityChip from "./QuantityChip";
import SectionCard from "./SectionCard";
import SectionHeader from "./SectionHeader";

type Props = {
  selected: number;
  onSelect: (value: number) => void;
};

const quantities = [
  100,
  150,
  200,
  300,
  500,
];

export default function QuantitySection({
  selected,
  onSelect,
}: Props) {
  const [showCustomModal, setShowCustomModal] =
    useState(false);

  const [customWeight, setCustomWeight] =
    useState("");

  const submitCustomWeight = () => {
    const value = Number(customWeight);

    if (!value || value < 100) {
      return;
    }

    onSelect(value);

    setCustomWeight("");

    setShowCustomModal(false);
  };

  return (
    <>
      <SectionCard>
        <SectionHeader
          title="Order Quantity"
          subtitle="Choose a quantity or enter a custom amount."
        />

        <View style={styles.container}>
          {quantities.map((item) => (
            <QuantityChip
              key={item}
              label={`${item} kg`}
              selected={selected === item}
              onPress={() => onSelect(item)}
            />
          ))}

          <QuantityChip
            label={
              quantities.includes(selected)
                ? "Custom"
                : `${selected} kg`
            }
            selected={
              !quantities.includes(selected)
            }
            onPress={() =>
              setShowCustomModal(true)
            }
          />
        </View>
      </SectionCard>

      <Modal
        visible={showCustomModal}
        transparent
        animationType="fade"
      >
        <View style={styles.overlay}>
          <View style={styles.modal}>

            <Text style={styles.modalTitle}>
              Enter Custom Weight
            </Text>

            <Text style={styles.modalSubtitle}>
              Minimum order is 100 Kg
            </Text>

            <TextInput
              value={customWeight}
              onChangeText={setCustomWeight}
              keyboardType="numeric"
              placeholder="Example: 125"
              style={styles.input}
            />

            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.85}
              onPress={submitCustomWeight}
            >
              <Text style={styles.buttonText}>
                Continue
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setShowCustomModal(false);
                setCustomWeight("");
              }}
            >
              <Text style={styles.cancel}>
                Cancel
              </Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  modal: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },

  modalSubtitle: {
    marginTop: 6,
    marginBottom: 18,
    fontSize: 14,
    color: "#6B7280",
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#111827",
    backgroundColor: "#F9FAFB",
  },

  button: {
    marginTop: 18,
    height: 52,
    borderRadius: 14,
    backgroundColor: "#F97316",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  cancel: {
    marginTop: 16,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "600",
    color: "#6B7280",
  },
});