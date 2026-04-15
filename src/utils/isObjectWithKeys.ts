import type {Primitives, StringToPrimitive} from '@/types/primitives'

export const isObjectWithKeys = <
  T extends Record<keyof T, Primitives | Array<Primitives>>,
>(
  value: unknown,
  keys: T,
): value is {
  [K in keyof T]: T[K] extends Primitives
    ? StringToPrimitive<T[K]>
    : T[K] extends Array<Primitives>
      ? StringToPrimitive<T[K][number]>
      : never
} =>
  isObject(value) &&
  isObject(keys) &&
  Object.entries(keys).every(([key, type]) =>
    Object.hasOwn(value, key) && Array.isArray(type)
      ? type.includes(typeof value[key])
      : typeof value[key] === type,
  )

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null
