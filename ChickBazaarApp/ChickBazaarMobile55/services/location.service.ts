import * as Location from "expo-location";

import {
    GeoPoint,
} from "../types/location";

class LocationService {

  /**
   * Request location permission
   */

  async requestPermission() {

    const permission =
      await Location.requestForegroundPermissionsAsync();

    return permission;

  }

  /**
   * Check permission status
   */

  async hasPermission() {

    const permission =
      await Location.getForegroundPermissionsAsync();

    return permission.granted;

  }

  /**
   * Get current GPS location
   */

  async getCurrentLocation(): Promise<GeoPoint> {

    const granted =
      await this.hasPermission();

    if (!granted) {

      const permission =
        await this.requestPermission();

      if (!permission.granted) {

        throw new Error(
          "Location permission denied."
        );

      }

    }

    const location =
      await Location.getCurrentPositionAsync({

        accuracy:
          Location.Accuracy.High,

      });

    return {

      latitude:
        location.coords.latitude,

      longitude:
        location.coords.longitude,

      accuracy:
        location.coords.accuracy ?? undefined,

    };

  }

  /**
   * Reverse geocode coordinates
   */

  async reverseGeocode(
    latitude: number,
    longitude: number
  ) {

    const result =
      await Location.reverseGeocodeAsync({

        latitude,

        longitude,

      });

    return result[0] ?? null;

  }
    /**
   * Calculate distance between two coordinates
   * Returns distance in KM
   */

  calculateDistance(

    start: GeoPoint,

    end: GeoPoint

  ) {

    const toRadians = (value: number) =>
      (value * Math.PI) / 180;

    const earthRadius = 6371;

    const dLat =
      toRadians(
        end.latitude -
          start.latitude
      );

    const dLon =
      toRadians(
        end.longitude -
          start.longitude
      );

    const lat1 =
      toRadians(start.latitude);

    const lat2 =
      toRadians(end.latitude);

    const a =

      Math.sin(dLat / 2) *
        Math.sin(dLat / 2) +

      Math.cos(lat1) *

        Math.cos(lat2) *

        Math.sin(dLon / 2) *

        Math.sin(dLon / 2);

    const c =
      2 *
      Math.atan2(
        Math.sqrt(a),
        Math.sqrt(1 - a)
      );

    return Number(
      (
        earthRadius *
        c
      ).toFixed(2)
    );

  }

  /**
   * Check whether location
   * is inside supported city
   */

  isWithinServiceArea(

    city?: string

  ) {

    if (!city) {

      return false;

    }

    const supportedCities = [

      "Bengaluru",

      "Bangalore",

    ];

    return supportedCities.includes(
      city.trim()
    );

  }

}

export default new LocationService();