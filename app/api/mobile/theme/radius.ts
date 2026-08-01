export const Radius = Object.freeze({
  sm: 8,

  md: 12,

  lg: 18,

  xl: 24,
} as const);

export type RadiusName = keyof typeof Radius;