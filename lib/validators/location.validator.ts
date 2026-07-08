import { z } from "zod";

export const createLocationSchema = z.object({
  retailerMobile: z.string().min(10),

  shopName: z.string().min(2),

  contactPerson: z.string().min(2),

  mobile: z.string().min(10),

  address: z.string().min(5),

  addressLine1: z.string().optional(),

  addressLine2: z.string().optional(),

  landmark: z.string().optional(),

  city: z.string().optional(),

  district: z.string().optional(),

  state: z.string().optional(),

  country: z.string().optional(),

  pincode: z
    .string()
    .regex(/^\d{6}$/)
    .optional(),

  latitude: z.number().optional(),

  longitude: z.number().optional(),

  googlePlaceId: z.string().optional(),

  formattedAddress: z.string().optional(),

  plusCode: z.string().optional(),

  accuracy: z.number().optional(),

  confidenceScore: z.number().optional(),

  isDefault: z.boolean().optional(),
});

export const updateLocationSchema =
  createLocationSchema.partial();