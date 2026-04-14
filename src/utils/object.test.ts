import {
  filterOutUndefinedProperties,
  getPropertyFromMaybeError,
  getPropertyFromMaybeObject,
  isEmptyObject,
  isErrorObject,
} from '@/utils/object'

describe('isEmptyObject', () => {
  test('true for empty object', () => {
    expect(isEmptyObject({})).toBe(true)
  })
  test('false for non-empty object', () => {
    expect(isEmptyObject({a: 1})).toBe(false)
  })
})

describe('isErrorObject', () => {
  test('true for error', () => {
    expect(isErrorObject(new Error('a'))).toBe(true)
  })
  test('false for regular object', () => {
    expect(isErrorObject({})).toBe(false)
    expect(isErrorObject({a: 1})).toBe(false)
  })
  test('false for array', () => {
    expect(isErrorObject([])).toBe(false)
    expect(isErrorObject([1, 2, 3])).toBe(false)
  })
  test('false for function', () => {
    expect(isErrorObject(() => null)).toBe(false)
  })
  test('false for null', () => {
    expect(isErrorObject(null)).toBe(false)
  })
  test('false for non object types', () => {
    expect(isErrorObject(undefined)).toBe(false)
    expect(isErrorObject(1)).toBe(false)
    expect(isErrorObject('a')).toBe(false)
  })
})

describe('getPropertyFromMaybeError', () => {
  test('undefined if not an Error', () => {
    expect(getPropertyFromMaybeError({}, 'foo')).toBe(undefined)
    expect(getPropertyFromMaybeError(null, 'foo')).toBe(undefined)
    expect(getPropertyFromMaybeError(true, 'foo')).toBe(undefined)
  })
  test('undefined if property does not exist', () => {
    const error = new Error('foo')

    expect(getPropertyFromMaybeError(error, 'foo')).toBe(undefined)
  })
  test('return value if property does exist', () => {
    const error = new Error('foo')

    // @ts-ignore
    error.foo = 'bar'
    expect(getPropertyFromMaybeError(error, 'foo')).toBe('bar')
  })
})

describe('getPropertyFromMaybeObject', () => {
  test('undefined if not an object', () => {
    expect(getPropertyFromMaybeObject([], 'foo')).toBe(undefined)
    expect(getPropertyFromMaybeObject(null, 'foo')).toBe(undefined)
    expect(getPropertyFromMaybeObject(true, 'foo')).toBe(undefined)
  })
  test('undefined if property does not exist', () => {
    const obj = {bar: 1}

    expect(getPropertyFromMaybeObject(obj, 'foo')).toBe(undefined)
  })
  test('return value if property does exist', () => {
    const obj = {foo: 1}

    expect(getPropertyFromMaybeObject(obj, 'foo')).toBe(1)
  })
})

describe('filterOutUndefinedProperties', () => {
  test('should filter out undefined properties', () => {
    expect(filterOutUndefinedProperties({})).toStrictEqual({})
    expect(
      filterOutUndefinedProperties({something: 3, other: undefined}),
    ).toStrictEqual({something: 3})
  })
  test('should work with undefined input', () => {
    expect(filterOutUndefinedProperties(undefined)).toStrictEqual(undefined)
  })
})
