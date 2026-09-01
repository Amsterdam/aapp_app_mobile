export const isFiniteNumber = (
  value: number | null | undefined,
): value is number => typeof value === 'number' && Number.isFinite(value)
