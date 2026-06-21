export function getBangaloreZone(
  latitude?: number,
  longitude?: number
) {
  if (!latitude || !longitude) {
    return "central";
  }

  if (latitude > 13.08) {
    return "north";
  }

  if (latitude < 12.90) {
    return "south";
  }

  if (longitude > 77.68) {
    return "east";
  }

  if (longitude < 77.52) {
    return "west";
  }

  return "central";
}