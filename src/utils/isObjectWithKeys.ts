export const isObjectWithKeys = <T extends Record<string, unknown>>(
  value: unknown,
  keys: (keyof T)[],
): value is T =>
  typeof value === 'object' &&
  value !== null &&
  keys.every(key => Object.keys(value).includes(key as string))
