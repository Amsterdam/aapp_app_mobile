export const sortEntriesByKeyFirst = <T>(
  entries: [string, T][],
  firstKey?: string,
) => {
  if (!firstKey) {
    return entries
  }

  return [...entries].sort(([keyA], [keyB]) => {
    if (keyA === firstKey) {
      return -1
    }

    if (keyB === firstKey) {
      return 1
    }

    return 0
  })
}
