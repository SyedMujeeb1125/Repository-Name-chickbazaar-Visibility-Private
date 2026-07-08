import { supabase } from "@/lib/supabase";

import {
  CreateLocationRequest,
  UpdateLocationRequest,
} from "@/lib/location.types";

export function validateCoordinates(
  latitude: number,
  longitude: number
) {
  return (
    latitude >= -90 &&
    latitude <= 90 &&
    longitude >= -180 &&
    longitude <= 180
  );
}

export function validatePincode(
  pincode?: string
) {
  if (!pincode) return true;

  return /^\d{6}$/.test(pincode);
}

export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371;

  const dLat =
    ((lat2 - lat1) * Math.PI) / 180;

  const dLon =
    ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) *
      Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  return (
    R *
    (2 *
      Math.atan2(
        Math.sqrt(a),
        Math.sqrt(1 - a)
      ))
  );
}

export function detectServiceZone(
  latitude: number,
  longitude: number
) {
  // Placeholder.
  // Will later use polygons.

  return "outside";
}

export async function getRetailerLocations(
  retailerMobile: string
) {
  const { data, error } =
    await supabase
      .from("retailer_locations")
      .select("*")
      .eq(
        "retailer_mobile",
        retailerMobile
      )
      .order("created_at");

  if (error) {
    console.error(
      "Location fetch error:",
      error
    );

    return [];
  }

  return data || [];
}
export async function getLocationById(
  id: string
) {
  const { data, error } = await supabase
    .from("retailer_locations")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(
      "Location fetch error:",
      error
    );

    return null;
  }

  return data;
}

export async function createLocation(
  location: CreateLocationRequest
) {
  const { data, error } = await supabase
    .from("retailer_locations")
    .insert(location)
    .select()
    .single();

  if (error) {
    console.error(
      "Location create error:",
      error
    );

    return null;
  }

  return data;
}

export async function updateLocation(
  id: string,
  updates: UpdateLocationRequest
) {
  const { data, error } = await supabase
    .from("retailer_locations")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(
      "Location update error:",
      error
    );

    return null;
  }

  return data;
}

export async function deleteLocation(
  id: string
) {
  const { error } = await supabase
    .from("retailer_locations")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(
      "Location delete error:",
      error
    );

    return false;
  }

  return true;
}

export async function setDefaultLocation(
  locationId: string
) {
  const location = await getLocationById(locationId);

  if (!location) {
    return false;
  }

  const retailerMobile =
    location.retailer_mobile;

  const { error: resetError } =
    await supabase
      .from("retailer_locations")
      .update({
        is_default: false,
      })
      .eq(
        "retailer_mobile",
        retailerMobile
      );

  if (resetError) {
    console.error(
      "Default reset error:",
      resetError
    );

    return false;
  }

  const { error } = await supabase
    .from("retailer_locations")
    .update({
      is_default: true,
    })
    .eq("id", locationId);

  if (error) {
    console.error(
      "Default update error:",
      error
    );

    return false;
  }

  return true;
}