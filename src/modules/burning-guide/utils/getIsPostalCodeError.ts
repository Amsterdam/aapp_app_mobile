export const getIsPostalCodeError = (error: unknown): boolean =>
  !!error &&
  typeof error === 'object' &&
  'data' in error &&
  !!error.data &&
  typeof error.data === 'object' &&
  'postal_code' in error.data
