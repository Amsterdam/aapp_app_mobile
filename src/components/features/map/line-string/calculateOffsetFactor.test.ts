import {calculateOffsetFactor} from '@/components/features/map/line-string/calculateOffsetFactor'

describe('calculateOffsetFactor', () => {
  it('should return 0 when index is the middle position in an odd-sized collection.', () => {
    const result = calculateOffsetFactor(1, 3)

    expect(result).toBe(0)
  })

  it('should return a negative factor for the first index.', () => {
    const result = calculateOffsetFactor(0, 4)

    expect(result).toBe(-1.5)
  })

  it('should return -0.5 when index is 2 of 4.', () => {
    const result = calculateOffsetFactor(1, 4)

    expect(result).toBe(-0.5)
  })

  it('should return a positive factor for the third of 4.', () => {
    const result = calculateOffsetFactor(2, 4)

    expect(result).toBe(0.5)
  })
  it('should return a positive factor for the last index.', () => {
    const result = calculateOffsetFactor(3, 4)

    expect(result).toBe(1.5)
  })

  it('should return Infinity when total is 0.', () => {
    const result = calculateOffsetFactor(0, 0)

    expect(result).toBe(Infinity)
  })

  it('should return Infinity when total is null.', () => {
    const total = null as unknown as number

    const result = calculateOffsetFactor(0, total)

    expect(result).toBe(Infinity)
  })

  it('should return NaN when total is undefined.', () => {
    const total = undefined as unknown as number

    const result = calculateOffsetFactor(0, total)

    expect(result).toBeNaN()
  })

  it('should return NaN when index is undefined.', () => {
    const index = undefined as unknown as number

    const result = calculateOffsetFactor(index, 4)

    expect(result).toBeNaN()
  })
})
