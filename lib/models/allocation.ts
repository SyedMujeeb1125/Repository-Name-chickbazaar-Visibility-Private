export interface Allocation {
  id: string;

  orderId: string;

  farmId: string;

  birdsAllocated: number;

  allocatedAt: string;

  status:
    | "allocated"
    | "accepted"
    | "completed";
}