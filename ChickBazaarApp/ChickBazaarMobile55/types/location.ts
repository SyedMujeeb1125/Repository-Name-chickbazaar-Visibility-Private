/**
 * --------------------------------------------------------
 * ChickBazaar Location Models
 * --------------------------------------------------------
 */

export interface GeoPoint {

  latitude: number;

  longitude: number;

  accuracy?: number;

}

export interface AddressLocation {

  id?: string;

  addressName: string;

  contactPerson: string;

  mobile: string;

  formattedAddress: string;

  addressLine1: string;

  addressLine2?: string;

  landmark?: string;

  city: string;

  district?: string;

  state: string;

  country: string;

  pincode: string;

  latitude: number;

  longitude: number;

  googlePlaceId?: string;

  plusCode?: string;

  accuracy?: number;

  isDefault: boolean;

  verified: boolean;

}

export interface PlaceSuggestion {

  id: string;

  description: string;

}

export interface ServiceArea {

  city: string;

  state: string;

  enabled: boolean;

}