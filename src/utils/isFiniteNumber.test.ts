import {isFiniteNumber} from '@/utils/isFiniteNumber'

describe('isFiniteNumber', () => {
  it('returns false for null and undefined', () => {
    expect(isFiniteNumber(null)).toBe(false)
    expect(isFiniteNumber(undefined)).toBe(false)
  })

  it('returns true for finite numbers', () => {
    expect(isFiniteNumber(0)).toBe(true)
    expect(isFiniteNumber(-0)).toBe(true)
    expect(isFiniteNumber(1)).toBe(true)
    expect(isFiniteNumber(-1)).toBe(true)
    expect(isFiniteNumber(1.5)).toBe(true)
    expect(isFiniteNumber(Number.MAX_SAFE_INTEGER)).toBe(true)
    expect(isFiniteNumber(Number.MIN_SAFE_INTEGER)).toBe(true)
  })

  it('returns false for non-finite numbers', () => {
    expect(isFiniteNumber(Number.NaN)).toBe(false)
    expect(isFiniteNumber(Number.POSITIVE_INFINITY)).toBe(false)
    expect(isFiniteNumber(Number.NEGATIVE_INFINITY)).toBe(false)
  })
})
