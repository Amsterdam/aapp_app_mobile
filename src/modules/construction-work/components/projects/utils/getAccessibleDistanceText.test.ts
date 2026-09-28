import {getAccessibleDistanceText} from '@/modules/construction-work/components/projects/utils/getAccessibleDistanceText'

describe('getAccessibleDistanceText', () => {
  it('handles normal value', () => {
    expect(getAccessibleDistanceText(999)).toBe('999 meter vanaf uw adres')
  })
  it('returns nothing if param is undefined', () => {
    expect(getAccessibleDistanceText(undefined)).toBeUndefined()
  })
  it('handles all zero values', () => {
    expect(getAccessibleDistanceText(0)).toBe('0 meter vanaf uw adres')
  })
})
