import {formatKWH} from '@/modules/boat-charging/utils/formatKWH'

describe('formatKWH', () => {
  it('should return empty string if kwh is nullish or NaN', () => {
    expect(formatKWH(null)).toBe('')
    expect(formatKWH(undefined)).toBe('')
    expect(formatKWH(Number('t'))).toBe('')
  })

  it('should return formatted kWh for typical and edge values', () => {
    expect(formatKWH(0)).toBe('0 kWh')
    expect(formatKWH(12)).toBe('12 kWh')
    expect(formatKWH(3.7)).toBe('3,7 kWh')
    expect(formatKWH(123456789.01)).toBe('123.456.789,01 kWh')
    expect(formatKWH(-1.5)).toBe('-1,5 kWh')
  })
})
