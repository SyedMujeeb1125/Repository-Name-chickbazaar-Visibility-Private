import React, { useEffect, useState } from "react";
import {
    Keyboard,
    KeyboardAvoidingView,
    Modal,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";

interface CustomQuantityModalProps {
  visible: boolean;
  weight: number;
  birds: number;
  onClose: () => void;
  onApply: (weight: number, birds: number) => void;
}

const KG_PER_BIRD = 1.5;
const MIN_WEIGHT = 10;
const MAX_WEIGHT = 5000;
const MIN_BIRDS = 1;
const MAX_BIRDS = 5000;

export default function CustomQuantityModal({
  visible,
  weight,
  birds,
  onClose,
  onApply,
}: CustomQuantityModalProps) {
  const [customWeight, setCustomWeight] = useState(weight.toString());
  const [customBirds, setCustomBirds] = useState(birds.toString());

  const [weightError, setWeightError] = useState("");
  const [birdError, setBirdError] = useState("");

  useEffect(() => {
    if (visible) {
      setCustomWeight(weight.toString());
      setCustomBirds(birds.toString());
      setWeightError("");
      setBirdError("");
    }
  }, [visible, weight, birds]);

  const onWeightChange = (value: string) => {
    const numeric = value.replace(/[^0-9]/g, "");
    setCustomWeight(numeric);

    if (!numeric) {
      setCustomBirds("");
      return;
    }

    const weightValue = Number(numeric);
    const estimatedBirds = Math.round(weightValue / KG_PER_BIRD);

    setCustomBirds(estimatedBirds.toString());
  };

  const onBirdChange = (value: string) => {
    const numeric = value.replace(/[^0-9]/g, "");
    setCustomBirds(numeric);

    if (!numeric) {
      setCustomWeight("");
      return;
    }

    const birdValue = Number(numeric);
    const estimatedWeight = Math.round(birdValue * KG_PER_BIRD);

    setCustomWeight(estimatedWeight.toString());
  };

  const validate = () => {
    let valid = true;

    setWeightError("");
    setBirdError("");

    const weightValue = Number(customWeight);
    const birdValue = Number(customBirds);

    if (
      isNaN(weightValue) ||
      weightValue < MIN_WEIGHT ||
      weightValue > MAX_WEIGHT
    ) {
      setWeightError(
        `Weight must be between ${MIN_WEIGHT} and ${MAX_WEIGHT} KG`
      );
      valid = false;
    }

    if (
      isNaN(birdValue) ||
      birdValue < MIN_BIRDS ||
      birdValue > MAX_BIRDS
    ) {
      setBirdError(
        `Bird count must be between ${MIN_BIRDS} and ${MAX_BIRDS}`
      );
      valid = false;
    }

    return valid;
  };

  const handleApply = () => {
    if (!validate()) return;

    onApply(Number(customWeight), Number(customBirds));
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.overlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={styles.keyboardContainer}
          >
            <View style={styles.container}>
              <Text style={styles.title}>Custom Quantity</Text>

              <Text style={styles.subtitle}>
                Enter your required quantity.
              </Text>

              <View style={styles.section}>
                <Text style={styles.label}>Weight (KG)</Text>

                <TextInput
                  style={styles.input}
                  value={customWeight}
                  onChangeText={onWeightChange}
                  keyboardType="numeric"
                  placeholder="Enter Weight"
                />

                {!!weightError && (
                  <Text style={styles.error}>{weightError}</Text>
                )}
              </View>

              <View style={styles.section}>
                <Text style={styles.label}>Bird Count</Text>

                <TextInput
                  style={styles.input}
                  value={customBirds}
                  onChangeText={onBirdChange}
                  keyboardType="numeric"
                  placeholder="Enter Birds"
                />

                {!!birdError && (
                  <Text style={styles.error}>{birdError}</Text>
                )}
              </View>

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={onClose}
                >
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.applyButton}
                  onPress={handleApply}
                >
                  <Text style={styles.applyText}>Apply</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },

  keyboardContainer: {
    width: "100%",
  },

  container: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },

  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1F2937",
  },

  subtitle: {
    marginTop: 6,
    fontSize: 15,
    color: "#6B7280",
    marginBottom: 24,
  },

  section: {
    marginBottom: 20,
  },

  label: {
    fontSize: 15,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 8,
  },

  input: {
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 16,
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },

  error: {
    marginTop: 6,
    color: "#DC2626",
    fontSize: 13,
  },

  buttonRow: {
    flexDirection: "row",
    marginTop: 8,
  },

  cancelButton: {
    flex: 1,
    height: 54,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  applyButton: {
    flex: 1,
    height: 54,
    borderRadius: 16,
    backgroundColor: "#F97316",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },

  cancelText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#374151",
  },

  applyText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFF",
  },
});
