/**
 * A util that takes two Sets (queues) and combines them, preserving the inherent sequence of the first when merging into the second
 * @param previousSet
 * @param nextSet
 * @returns The merged and ordered Set (queue)
 * @example
 * ```ts
 * const setA = new Set([3, 4, 5, 1, 2])
 * const setB = new Set([6, 1, 2, 3, 4])
 * const mergedSet = mergeAndOrderQueue(setA, setB)
 * console.log(mergedSet)
 * > Set(5) { 6, 3, 4, 1, 2 } // '6' is added and put in front, '5' is removed as it is no longer part of the new Set.
 * ```
 */
export const mergeAndOrderQueue = <T>(previousSet: Set<T>, nextSet: Set<T>) => {
  const mergedSet = mergeSets(previousSet, nextSet)
  const prevFirstItem = previousSet.values().next().value

  if (prevFirstItem && mergedSet.delete(prevFirstItem)) {
    // If the previous first item still exists in the set, if should be added again to the end of the queue
    mergedSet.add(prevFirstItem)
  }

  return mergedSet
}

const mergeSets = <T>(previousSet: Set<T>, nextSet: Set<T>) => {
  const difference = [...nextSet].filter(el => !previousSet.has(el))
  const prevFiltered = [...previousSet].filter(h => nextSet.has(h))

  return new Set([...difference, ...prevFiltered])
}
