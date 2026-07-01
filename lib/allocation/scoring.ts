export type FarmCandidate = {
  id: string;
  farmId: string;
  zone: string;
  availableBirds: number;
  procurementPrice: number;
};

export type AllocationRequest = {
  retailerZone: string;
  birdsRequired: number;
};

export function scoreFarm(
  farm: FarmCandidate,
  request: AllocationRequest
) {
  let score = 0;

  // Inventory
  score += Math.min(
    farm.availableBirds /
      Math.max(request.birdsRequired, 1),
    1
  ) * 40;

  // Same zone
  if (farm.zone === request.retailerZone) {
    score += 30;
  }

  // Lower procurement price gets a bonus
  score += Math.max(
    0,
    20 - farm.procurementPrice / 10
  );

  return score;
}

export function chooseBestFarm(
  farms: FarmCandidate[],
  request: AllocationRequest
) {
  return farms
    .map((farm) => ({
      farm,
      score: scoreFarm(
        farm,
        request
      ),
    }))
    .sort(
      (a, b) => b.score - a.score
    )[0];
}