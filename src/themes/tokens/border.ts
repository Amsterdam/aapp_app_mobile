export type BorderTokens = typeof borderTokens

export const borderTokens = {
  width: {
    sm: 1,
    md: 2,
    lg: 3,
    xl: 4,
  },
  radius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
  },
} as const
