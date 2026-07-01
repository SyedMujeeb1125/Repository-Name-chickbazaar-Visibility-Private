export interface FarmInventory {
  id: string;

  farmId: string;

  availableBirds: number;

  reservedBirds: number;

  averageWeight: number;

  procurementPrice: number;

  createdAt: string;
}