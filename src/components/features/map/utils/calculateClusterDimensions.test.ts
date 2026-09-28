import {calculateClusterDimensions} from '@/components/features/map/utils/calculateClusterDimensions'

describe('calculateClusterDimensions', () => {
  it('should return an integer.', () => {
    const count = 2
    const result = calculateClusterDimensions(count)

    expect(result).toBe(40)
  })

  it.each([
    [
      'more than 10 as compared to a number less than 10',
      {dimension1: 2, dimension2: 12, expected: 50},
    ],
    [
      'more than 100 as compared to a number less than 100 but more than 10',
      {dimension1: 72, dimension2: 112, expected: 60},
    ],
    [
      'more than 1000 as compared to a number less than 1000 but more than 100',
      {dimension1: 720, dimension2: 1112, expected: 70},
    ],
  ])(
    'should return a higher number when count is %s.',
    (_, {dimension1, dimension2, expected}) => {
      const result1 = calculateClusterDimensions(dimension1)
      const result2 = calculateClusterDimensions(dimension2)

      expect(result2).toBeGreaterThan(result1)
      expect(result2).toBe(expected)
    },
  )

  it('should return a higher number with padding.', () => {
    const padding = 12
    const result = calculateClusterDimensions(2, padding)

    expect(result).toBe(52)
  })

  it('should return a higher number with padding and when count is more than 10 as compared to a number less than 10.', () => {
    const padding = 12
    const result1 = calculateClusterDimensions(2, padding)
    const result2 = calculateClusterDimensions(12, padding)

    expect(result2).toBeGreaterThan(result1)
    expect(result2).toBe(62)
  })
})
