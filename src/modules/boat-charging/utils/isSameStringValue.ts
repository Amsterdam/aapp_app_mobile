const normalizeString = (string: string) =>
  string.replaceAll(' ', '').toUpperCase()

export const isSameStringValue = (a: string, b: string) =>
  normalizeString(a) === normalizeString(b)
