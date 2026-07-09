export const calculateOffsetFactor = (index: number, total: number): number =>
  ((index + 0.5) / total) * 4 - 2
