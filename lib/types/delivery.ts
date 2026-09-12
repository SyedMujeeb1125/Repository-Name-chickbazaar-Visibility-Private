/**
 * --------------------------------------------------------
 * ChickBazaar Delivery Types
 * --------------------------------------------------------
 * Shared between:
 * - Website
 * - Mobile App
 * - Backend APIs
 * --------------------------------------------------------
 */

export enum DeliveryType {
  STANDARD = "STANDARD",
  EXPRESS = "EXPRESS",
}

export enum DeliveryWaveStatus {
  OPEN = "OPEN",
  LIMITED = "LIMITED",
  FULL = "FULL",
  CLOSED = "CLOSED",
}

export interface DeliveryWave {

  /**
   * Unique Wave ID
   * Example:
   * W1
   * W2
   * EXP
   */
  id: string;

  /**
   * Internal Name
   */
  name: string;

  /**
   * Display Name
   * Example:
   * 6:00 AM – 8:00 AM
   */
  label: string;

  /**
   * Standard / Express
   */
  type: DeliveryType;

  /**
   * Start Time
   * HH:mm
   */
  startTime: string;

  /**
   * End Time
   * HH:mm
   */
  endTime: string;

  /**
   * Last order accepted
   * Example
   * 05:00
   */
  lastOrderTime: string;

  /**
   * Maximum capacity in KG
   */
  maxCapacityKg: number;

  /**
   * Current booked KG
   */
  bookedKg: number;

  /**
   * Remaining KG
   */
  remainingKg: number;

  /**
   * Number of Orders
   */
  totalOrders: number;

  /**
   * Active Vehicles
   */
  vehicleCount: number;

  /**
   * Active Captains
   */
  captainCount: number;

  /**
   * Status
   */
  status: DeliveryWaveStatus;

  /**
   * Can retailer select?
   */
  available: boolean;
}

export interface DeliverySelection {

  deliveryDate: string;

  deliveryType: DeliveryType;

  wave: DeliveryWave | null;

}

export interface DeliveryAvailability {

  businessOpen: boolean;

  expressAvailable: boolean;

  bookingOpen: boolean;

  waves: DeliveryWave[];

}

export interface DeliveryCapacity {

  totalCapacityKg: number;

  bookedKg: number;

  remainingKg: number;

  utilizationPercentage: number;

}

export interface DeliveryEstimate {

  estimatedBirds: number;

  estimatedArrival: string;

  estimatedInvoice: number;

}