/**
 * Omits properties that have type `never`. Utilizes key-remapping introduced in
 * TS4.1.
 *
 * @source https://stackoverflow.com/a/68416189/8703312
 *
 * @example
 *   type A = { x: never; y: string; }
 *   OmitNever<A> // => { y: string; }
 */
type OmitNever<T extends Record<string, unknown>> = {
  [K in keyof T as T[K] extends never ? never : K]: T[K]
}

/**
 * Constructs a Record type that only includes shared properties between `A` and
 * `B`. If the value of a key is different in `A` and `B`, `Common<A, B>` attempts
 * to choose a type that is assignable to the types of both values.
 *
 * Note that this is NOT equivalent to `A & B`.
 *
 * @source https://stackoverflow.com/a/68416189/8703312
 *
 * @example
 *   type A = { x: string; y: string; }
 *   type B = { y: string; z: string }
 *   type C = { y: string | number; }
 *
 *   A & B        // => { x: string; y: string; z: string; }
 *   Common<A, B> // => { y: string; }
 *   Common<B, C> // => { y: string; }
 */
export type Common<A, B> = OmitNever<Pick<A & B, keyof A & keyof B>>

/**
 * Make selected properties in a type required
 */
export type RequirePick<T, K extends keyof T> = T & Required<Pick<T, K>>

declare const $Empty: unique symbol
/**
 * The `EmptyObject` type in TypeScript represents an object with no properties.
 * @property {never}  - The `EmptyObject` type is defined as an object type with a single property
 * `[]` that is optional and can never have a value. This type essentially represents an empty
 * object with no properties.
 */
export type EmptyObject = {
  readonly [$Empty]?: never
}
