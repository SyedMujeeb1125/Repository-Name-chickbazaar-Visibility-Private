import React, {
    useState,
} from "react";

import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
} from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import LocationService from "../../services/location.service";

import {
    GeoPoint,
} from "../../types/location";

type Props = {

  onLocationSelected: (
    location: GeoPoint
  ) => void;

};

export default function CurrentLocationButton({

  onLocationSelected,

}: Props) {

  const [

    loading,

    setLoading,

  ] = useState(false);

  async function handlePress() {

    try {

      setLoading(true);

      const location =
        await LocationService.getCurrentLocation();

      onLocationSelected(
        location
      );

    } catch (error: any) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  }

  return (

    <TouchableOpacity

      activeOpacity={0.9}

      style={styles.button}

      disabled={loading}

      onPress={handlePress}

    >

      {loading ? (

        <ActivityIndicator
          color="#FFFFFF"
        />

      ) : (

        <MaterialCommunityIcons

          name="crosshairs-gps"

          size={22}

          color="#FFFFFF"

        />

      )}

      <Text style={styles.text}>

        {loading

          ? "Getting Location..."

          : "Use Current Location"}

      </Text>

    </TouchableOpacity>

  );

}
const styles = StyleSheet.create({

  button: {

    height: 58,

    borderRadius: 16,

    backgroundColor: "#16A34A",

    flexDirection: "row",

    justifyContent: "center",

    alignItems: "center",

    marginTop: 12,

    shadowColor: "#16A34A",

    shadowOpacity: 0.25,

    shadowRadius: 12,

    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 8,

  },

  text: {

    marginLeft: 10,

    color: "#FFFFFF",

    fontSize: 16,

    fontWeight: "800",

    letterSpacing: 0.3,

  },

});