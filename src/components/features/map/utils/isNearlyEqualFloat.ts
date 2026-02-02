export const isNearlyEqualFloat = (
  a: number,
  b: number,
  decimalPoint: number,
) => Math.abs(a - b) < Number(`1e-${decimalPoint}`)
