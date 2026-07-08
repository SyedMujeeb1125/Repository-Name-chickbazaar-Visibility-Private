import {
  DEFAULT_AVERAGE_BIRD_WEIGHT,
} from "../constants/business";

export function estimateBirdCount(
  weightKg: number
) {
  if (weightKg <= 0) {
    return 0;
  }

  return Math.round(
    weightKg /
      DEFAULT_AVERAGE_BIRD_WEIGHT
  );
}

export function estimateWeight(
  birdCount: number
) {
  if (birdCount <= 0) {
    return 0;
  }

  return (
    birdCount *
    DEFAULT_AVERAGE_BIRD_WEIGHT
  );
}

export function calculateEstimatedAmount(
  weight: number,
  rate: number
) {
  return weight * rate;
}