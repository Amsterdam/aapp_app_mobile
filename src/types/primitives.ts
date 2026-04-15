export type Primitives =
  | 'string'
  | 'number'
  | 'bigint'
  | 'boolean'
  | 'symbol'
  | 'undefined'
  | 'object'
  | 'function'

export type StringToPrimitive<T extends Primitives> = T extends 'string'
  ? string
  : T extends 'number'
    ? number
    : T extends 'bigint'
      ? bigint
      : T extends 'boolean'
        ? boolean
        : T extends 'symbol'
          ? symbol
          : T extends 'undefined'
            ? undefined
            : T extends 'object'
              ? object
              : T extends 'function'
                ? // eslint-disable-next-line @typescript-eslint/ban-types
                  Function
                : never
