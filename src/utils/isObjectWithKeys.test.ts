import type {Primitives} from '@/types/primitives'
import {isObjectWithKeys} from '@/utils/isObjectWithKeys'

describe('isObjectWithKeys', () => {
  it('should return true for a valid object', () => {
    const value = {a: 'test', b: 123}
    const keys = {a: 'string', b: 'number'} as const

    expect(isObjectWithKeys(value, keys)).toBe(true)
  })
  it('should return true for a valid object with array', () => {
    const value = {a: 'test', b: 123}
    const keys = {a: ['string', 'number'] as Primitives[], b: 'number'} as const

    expect(isObjectWithKeys(value, keys)).toBe(true)
  })

  it('should return false for an invalid object', () => {
    const value = {a: 'test', b: 'invalid'}
    const keys = {a: 'string', b: 'number'} as const

    expect(isObjectWithKeys(value, keys)).toBe(false)
  })

  it('should return false for null value', () => {
    const value = null as unknown as Record<string, unknown>
    const keys = {a: 'string'} as const

    expect(isObjectWithKeys(value, keys)).toBe(false)
  })

  it('should return false for undefined value', () => {
    const value = undefined as unknown as Record<string, unknown>
    const keys = {a: 'string'} as const

    expect(isObjectWithKeys(value, keys)).toBe(false)
  })

  it('should return false for null keys', () => {
    const value = {a: 'test'}
    const keys = null

    //@ts-expect-error
    expect(isObjectWithKeys(value, keys)).toBe(false)
  })

  it('should return false for undefined keys', () => {
    const value = {a: 'test'}
    const keys = undefined as unknown as Record<string, 'string' | 'number'>

    expect(isObjectWithKeys(value, keys)).toBe(false)
  })
})
