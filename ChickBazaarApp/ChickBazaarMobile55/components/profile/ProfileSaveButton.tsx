import React from "react";

import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
} from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type Props = {
  loading?: boolean;
  title?: string;
  onPress: () => void;
};

export default function ProfileSaveButton({
  loading = false,
  title = "SAVE CHANGES",
  onPress,
}: Props) {

  return (

    <TouchableOpacity
      activeOpacity={0.9}
      disabled={loading}
      style={[
        styles.button,
        loading &&
          styles.disabled,
      ]}
      onPress={onPress}
    >

      {loading ? (

        <ActivityIndicator
          color="#FFFFFF"
        />

      ) : (

        <MaterialCommunityIcons
          name="content-save"
          size={20}
          color="#FFFFFF"
        />

      )}

      <Text style={styles.text}>

        {loading
          ? "Saving..."
          : title}

      </Text>

    </TouchableOpacity>

  );

}

const styles = StyleSheet.create({

  button: {

    height: 58,

    borderRadius: 16,

    backgroundColor: "#F97316",

    flexDirection: "row",

    justifyContent: "center",

    alignItems: "center",

    marginTop: 12,

    shadowColor: "#F97316",

    shadowOpacity: 0.30,

    shadowRadius: 12,

    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 8,

  },

  disabled: {

    backgroundColor: "#CBD5E1",

  },

  text: {

    marginLeft: 10,

    color: "#FFFFFF",

    fontSize: 17,

    fontWeight: "800",

    letterSpacing: 0.3,

  },

});
