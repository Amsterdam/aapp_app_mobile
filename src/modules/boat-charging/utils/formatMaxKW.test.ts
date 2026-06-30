import {formatMaxKW} from '@/modules/boat-charging/utils/formatMaxKW'

describe('formatMaxKW', () => {
  it('should return empty string if maxKw is falsy', () => {
    expect(formatMaxKW(null)).toBe('')
    expect(formatMaxKW(undefined as unknown as null)).toBe('')
    expect(formatMaxKW(0)).toBe('')
    expect(formatMaxKW(Number('t'))).toBe('')
  })

  it('should return formatted max kw', () => {
    expect(formatMaxKW(22)).toBe('22.0 kW')
    expect(formatMaxKW(3.7)).toBe('3.7 kW')
    expect(formatMaxKW(3.71)).toBe('3.7 kW')
    expect(formatMaxKW(0.71)).toBe('0.7 kW')
  })
})
