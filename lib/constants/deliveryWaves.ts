/**
 * --------------------------------------------------------
 * ChickBazaar Delivery Waves
 * --------------------------------------------------------
 * Production Configuration
 *
 * Shared by:
 * - Website
 * - Mobile
 * - Backend
 * - Admin
 * --------------------------------------------------------
 */

import {
  DeliveryType,
  DeliveryWave,
  DeliveryWaveStatus,
} from "../types/delivery";

/**
 * Standard Delivery Waves
 */
export const DELIVERY_WAVES: DeliveryWave[] = [

  {
    id: "W1",

    name: "WAVE_1",

    label: "06:00 AM – 08:00 AM",

    type: DeliveryType.STANDARD,

    startTime: "06:00",

    endTime: "08:00",

    lastOrderTime: "05:00",

    maxCapacityKg: 12000,

    bookedKg: 0,

    remainingKg: 12000,

    totalOrders: 0,

    vehicleCount: 0,

    captainCount: 0,

    status: DeliveryWaveStatus.OPEN,

    available: true,
  },

  {
    id: "W2",

    name: "WAVE_2",

    label: "08:00 AM – 10:00 AM",

    type: DeliveryType.STANDARD,

    startTime: "08:00",

    endTime: "10:00",

    lastOrderTime: "07:00",

    maxCapacityKg: 15000,

    bookedKg: 0,

    remainingKg: 15000,

    totalOrders: 0,

    vehicleCount: 0,

    captainCount: 0,

    status: DeliveryWaveStatus.OPEN,

    available: true,
  },

  {
    id: "W3",

    name: "WAVE_3",

    label: "10:00 AM – 12:00 PM",

    type: DeliveryType.STANDARD,

    startTime: "10:00",

    endTime: "12:00",

    lastOrderTime: "09:00",

    maxCapacityKg: 12000,

    bookedKg: 0,

    remainingKg: 12000,

    totalOrders: 0,

    vehicleCount: 0,

    captainCount: 0,

    status: DeliveryWaveStatus.OPEN,

    available: true,
  },

  {
    id: "W4",

    name: "WAVE_4",

    label: "12:00 PM – 02:00 PM",

    type: DeliveryType.STANDARD,

    startTime: "12:00",

    endTime: "14:00",

    lastOrderTime: "11:00",

    maxCapacityKg: 10000,

    bookedKg: 0,

    remainingKg: 10000,

    totalOrders: 0,

    vehicleCount: 0,

    captainCount: 0,

    status: DeliveryWaveStatus.OPEN,

    available: true,
  },

];

/**
 * Express Delivery
 */
export const EXPRESS_WAVE: DeliveryWave = {

  id: "EXP",

  name: "EXPRESS",

  label: "Express Delivery (2–3 Hours)",

  type: DeliveryType.EXPRESS,

  startTime: "07:00",

  endTime: "17:00",

  lastOrderTime: "17:00",

  maxCapacityKg: 999999,

  bookedKg: 0,

  remainingKg: 999999,

  totalOrders: 0,

  vehicleCount: 0,

  captainCount: 0,

  status: DeliveryWaveStatus.OPEN,

  available: true,

};

/**
 * Capacity Thresholds
 */
export const DELIVERY_CAPACITY = {

  /**
   * Remaining capacity <= 50%
   */
  LIMITED_PERCENTAGE: 50,

  /**
   * Remaining capacity <= 15%
   */
  ALMOST_FULL_PERCENTAGE: 15,

  /**
   * Remaining capacity == 0%
   */
  FULL_PERCENTAGE: 0,

};

/**
 * UI Labels
 */
export const DELIVERY_LABELS = {

  AVAILABLE: "Available",

  LIMITED: "Filling Fast",

  ALMOST_FULL: "Almost Full",

  FULL: "Full",

  CLOSED: "Closed",

};

/**
 * Express Delivery Message
 */
export const EXPRESS_MESSAGE =
  "Estimated delivery within 2–3 hours, subject to bird availability, vehicle availability and route feasibility.";

/**
 * Production Planning Defaults
 */
export const PLANNING_DEFAULTS = {

  AVG_BIRD_WEIGHT_KG: 1.8,

  VEHICLE_CAPACITY_KG: 1800,

  MAX_DELIVERIES_PER_CAPTAIN: 25,

};