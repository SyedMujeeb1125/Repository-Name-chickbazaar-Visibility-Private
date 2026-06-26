"use client";

import { useState } from "react";

type Props = {
  latitudeName?: string;
  longitudeName?: string;
};

export function LocationPicker({
  latitudeName = "latitude",
  longitudeName = "longitude"
}: Props) {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [loading, setLoading] = useState(false);

  function getLocation() {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported.");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude.toString());
        setLongitude(position.coords.longitude.toString());
        setLoading(false);
      },
      () => {
        alert("Unable to get location.");
        setLoading(false);
      }
    );
  }

  return (
    <div className="mt-4 rounded-lg border p-4">
      <button
        type="button"
        onClick={getLocation}
        className="rounded-md bg-orange px-4 py-2 text-white"
      >
        {loading ? "Getting Location..." : "📍 Use Current Location"}
      </button>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">
            Latitude
          </label>

          <input
            name={latitudeName}
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            className="w-full rounded-md border p-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Longitude
          </label>

          <input
            name={longitudeName}
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            className="w-full rounded-md border p-2"
          />
        </div>
      </div>
    </div>
  );
}