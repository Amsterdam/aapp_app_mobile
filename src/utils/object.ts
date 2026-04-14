export const isEmptyObject = (
  value: Record<string | number | symbol, unknown>,
) => {
  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      return false
    }
  }

  return true
}

/**
 * Check whether the input is an error object
 */
export const isErrorObject = (maybeError: unknown) =>
  maybeError?.constructor === Error

/**
 * Get the value of a specific property of an error object, if it actually is an error.
 */
export const getPropertyFromMaybeError = <T>(
  maybeError: unknown,
  property: string,
) => {
  if (!isErrorObject(maybeError)) {
    return
  }

  return (maybeError as Record<string, unknown>)[property] as T
}

/**
 * Get the value of a specific property of an object, if it actually is an object.
 */
export const getPropertyFromMaybeObject = <T>(
  maybeObject: unknown,
  property: string,
) => {
  if (
    !maybeObject ||
    typeof maybeObject !== 'object' ||
    Array.isArray(maybeObject)
  ) {
    return
  }

  return (maybeObject as Record<string, unknown>)[property] as T
}

/**
 * Filters out properties that are undefined from an object
 */
export const filterOutUndefinedProperties = <
  T extends string | number | symbol,
  S,
>(
  input?: Partial<Record<T, S | undefined>>,
): Record<T, S> | undefined => {
  if (!input) {
    return
  }

  return (Object.keys(input) as T[])
    .filter(key => input[key] !== undefined)
    .reduce<Record<T, S>>(
      (acc, key) => ({...acc, [key]: input[key]}),
      {} as Record<T, S>,
    )
}

/**
 * Groups an array based on a key that can be set in the getKey callback
 * @param items
 * @param getKey
 * @returns
 */
export const groupByKey = <T>(
  items: T[],
  getKey: (item: T) => string | undefined | null,
): Record<string, T[]> =>
  items.reduce<Record<string, T[]>>((acc, item) => {
    const key = getKey(item)

    if (!key) return acc

    if (!acc[key]) {
      acc[key] = []
    }

    acc[key].push(item)

    return acc
  }, {})
