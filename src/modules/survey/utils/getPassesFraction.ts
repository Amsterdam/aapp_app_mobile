export const getPassesFraction = (fraction?: number) => {
  const chance =
    typeof fraction === 'number' ? Math.min(1, Math.max(0, fraction)) : 0
  // eslint-disable-next-line sonarjs/pseudo-random -- Used for UI sampling (not security-sensitive)
  const passesFraction = chance > 0 && Math.random() < chance

  return passesFraction
}
