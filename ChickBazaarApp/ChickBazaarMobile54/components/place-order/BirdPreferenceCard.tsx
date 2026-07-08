import React, { useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
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
        🐔 Bird Size Preference
      </Text>

      <TouchableOpacity
        style={styles.radio}
        onPress={() =>
          setMode("none")
        }
      >
        <Text>
          {mode === "none"
            ? "◉"
            : "○"}{" "}
          No Preference
          (Recommended)
        </Text>
      </TouchableOpacity>

      <Text
        style={styles.info}
      >
        Faster farm allocation
        and quicker delivery.
      </Text>

      <TouchableOpacity
        style={styles.radio}
        onPress={() =>
          setMode("preferred")
        }
      >
        <Text>
          {mode ===
          "preferred"
            ? "◉"
            : "○"}{" "}
          Select Preferred
          Bird Sizes
        </Text>
      </TouchableOpacity>

      {mode ===
        "preferred" && (

        <>

          {birds.map(
            (
              bird,
              index
            ) => (

              <View
                key={bird.weight}
                style={styles.row}
              >

                <TouchableOpacity
                  style={{
                    flex: 1,
                  }}
                  onPress={() =>
                    updateBird(
                      index,
                      {
                        selected:
                          !bird.selected,
                      }
                    )
                  }
                >

                  <Text>

                    {bird.selected
                      ? "☑"
                      : "☐"}

                    {" "}

                    {bird.weight}
                    {" "}KG

                  </Text>

                </TouchableOpacity>

                {bird.selected && (

                  <View
                    style={
                      styles.counter
                    }
                  >

                    <TouchableOpacity
                      style={
                        styles.button
                      }
                      onPress={() =>
                        updateBird(
                          index,
                          {
                            quantity:
                              Math.max(
                                0,
                                bird.quantity -
                                  1
                              ),
                          }
                        )
                      }
                    >
                      <Text>
                        −
                      </Text>
                    </TouchableOpacity>

                    <Text
                      style={
                        styles.qty
                      }
                    >
                      {bird.quantity}
                    </Text>

                    <TouchableOpacity
                      style={
                        styles.button
                      }
                      onPress={() =>
                        updateBird(
                          index,
                          {
                            quantity:
                              bird.quantity +
                              1,
                          }
                        )
                      }
                    >
                      <Text>
                        +
                      </Text>
                    </TouchableOpacity>

                  </View>

                )}

              </View>

            )
          )}

        </>

      )}

    </CBCard>

  );

}

const styles =
StyleSheet.create({

heading:{
fontSize:18,
fontWeight:"700",
marginBottom:15,
},

radio:{
marginBottom:8,
},

info:{
fontSize:13,
color:"#64748B",
marginBottom:15,
},

row:{
flexDirection:"row",
alignItems:"center",
marginBottom:12,
},

counter:{
flexDirection:"row",
alignItems:"center",
},

button:{
width:32,
height:32,
borderRadius:16,
backgroundColor:"#F3F4F6",
justifyContent:"center",
alignItems:"center",
},

qty:{
marginHorizontal:15,
fontWeight:"700",
},

});