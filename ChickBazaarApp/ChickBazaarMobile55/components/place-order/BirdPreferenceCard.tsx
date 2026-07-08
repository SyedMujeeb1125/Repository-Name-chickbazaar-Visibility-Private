import React, { useState } from "react";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import CBCard from "../common/CBCard";

type BirdRow = {
  weight: number;
  selected: boolean;
  quantity: number;
};

type Props = {
  onChange?: (birds: BirdRow[]) => void;
};

export default function BirdPreferenceCard({
  onChange,
}: Props) {

  const [mode, setMode] = useState<
    "none" | "preferred"
  >("none");

  const [birds, setBirds] = useState<BirdRow[]>([
    {
      weight: 1.5,
      selected: false,
      quantity: 0,
    },
    {
      weight: 2.0,
      selected: false,
      quantity: 0,
    },
    {
      weight: 2.5,
      selected: false,
      quantity: 0,
    },
    {
      weight: 3.0,
      selected: false,
      quantity: 0,
    },
    {
      weight: 3.5,
      selected: false,
      quantity: 0,
    },
  ]);

  function updateBird(
    index: number,
    changes: Partial<BirdRow>
  ) {

    const updated = [...birds];

    updated[index] = {
      ...updated[index],
      ...changes,
    };

    setBirds(updated);

    onChange?.(updated);

  }

  return (

    <CBCard>

      <Text style={styles.heading}>
        Bird Preference
      </Text>

      <Text style={styles.subHeading}>
        Select your preferred bird size or allow automatic farm allocation.
      </Text>

      <TouchableOpacity

        activeOpacity={0.9}

        style={[
          styles.modeCard,
          mode === "none" &&
            styles.activeCard,
        ]}

        onPress={() =>
          setMode("none")
        }

      >

        <View style={styles.modeHeader}>

          <MaterialCommunityIcons

            name="check-decagram"

            size={24}

            color={
              mode === "none"
                ? "#F97316"
                : "#94A3B8"
            }

          />

          <Text style={styles.modeTitle}>
            No Preference
          </Text>

        </View>

        <Text style={styles.modeDescription}>
          Faster farm allocation and quickest delivery.
        </Text>

      </TouchableOpacity>

      <TouchableOpacity

        activeOpacity={0.9}

        style={[
          styles.modeCard,
          mode === "preferred" &&
            styles.activeCard,
        ]}

        onPress={() =>
          setMode("preferred")
        }

      >

        <View style={styles.modeHeader}>

          <MaterialCommunityIcons

            name="food-drumstick"

            size={24}

            color={
              mode === "preferred"
                ? "#F97316"
                : "#94A3B8"
            }

          />

          <Text style={styles.modeTitle}>
            Choose Bird Sizes
          </Text>

        </View>

        <Text style={styles.modeDescription}>
          Select one or more preferred weight ranges.
        </Text>

      </TouchableOpacity>
            {mode === "preferred" && (

        <View style={styles.list}>

          {birds.map((bird, index) => (

            <TouchableOpacity

              key={bird.weight}

              activeOpacity={0.9}

              style={[
                styles.birdCard,
                bird.selected &&
                  styles.selectedBirdCard,
              ]}

              onPress={() =>
                updateBird(index, {
                  selected:
                    !bird.selected,
                })
              }

            >

              <View style={styles.birdInfo}>

                <MaterialCommunityIcons

                  name="food-drumstick"

                  size={26}

                  color={
                    bird.selected
                      ? "#F97316"
                      : "#94A3B8"
                  }

                />

                <View
                  style={{
                    marginLeft: 14,
                    flex: 1,
                  }}
                >

                  <Text
                    style={styles.weight}
                  >
                    {bird.weight} KG
                  </Text>

                  <Text
                    style={styles.weightDesc}
                  >
                    Average bird weight
                  </Text>

                </View>

              </View>

              {bird.selected ? (

                <View
                  style={styles.counter}
                >

                  <TouchableOpacity

                    style={
                      styles.counterButton
                    }

                    onPress={() =>
                      updateBird(index, {
                        quantity:
                          Math.max(
                            0,
                            bird.quantity - 1
                          ),
                      })
                    }

                  >

                    <MaterialCommunityIcons
                      name="minus"
                      size={18}
                      color="#F97316"
                    />

                  </TouchableOpacity>

                  <Text
                    style={styles.qty}
                  >
                    {bird.quantity}
                  </Text>

                  <TouchableOpacity

                    style={
                      styles.counterButton
                    }

                    onPress={() =>
                      updateBird(index, {
                        quantity:
                          bird.quantity + 1,
                      })
                    }

                  >

                    <MaterialCommunityIcons
                      name="plus"
                      size={18}
                      color="#F97316"
                    />

                  </TouchableOpacity>

                </View>

              ) : (

                <MaterialCommunityIcons
                  name="chevron-right"
                  size={22}
                  color="#CBD5E1"
                />

              )}

            </TouchableOpacity>

          ))}

        </View>

      )}

    </CBCard>

  );

}
const styles = StyleSheet.create({

  heading: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 8,
  },

  subHeading: {
    fontSize: 14,
    color: "#64748B",
    lineHeight: 22,
    marginBottom: 22,
  },

  modeCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
  },

  activeCard: {
    backgroundColor: "#FFF7ED",
    borderColor: "#F97316",
  },

  modeHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  modeTitle: {
    marginLeft: 12,
    fontSize: 17,
    fontWeight: "800",
    color: "#0F172A",
  },

  modeDescription: {
    marginTop: 10,
    marginLeft: 36,
    fontSize: 14,
    lineHeight: 20,
    color: "#64748B",
  },

  list: {
    marginTop: 10,
  },

  birdCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  selectedBirdCard: {
    backgroundColor: "#FFF7ED",
    borderColor: "#F97316",
    borderWidth: 2,
  },

  birdInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  weight: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
  },

  weightDesc: {
    marginTop: 4,
    fontSize: 13,
    color: "#64748B",
  },

  counter: {
    flexDirection: "row",
    alignItems: "center",
  },

  counterButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#F97316",
    justifyContent: "center",
    alignItems: "center",
  },

  qty: {
    width: 42,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
  },

});