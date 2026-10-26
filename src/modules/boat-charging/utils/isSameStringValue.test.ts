import {isSameStringValue} from '@/modules/boat-charging/utils/isSameStringValue'

describe('isSameStringValue', () => {
  it.each([
    ['1234 AB', '1234AB'],
    ['1234ab', '1234 ab'],
    ['1234 Ab', '1234 aB'],
  ])('should strip whitespace and casing', (a, b) => {
    expect(isSameStringValue(a, b)).toBeTruthy()
  })

  it.each([
    ['1234BA', '1234AB'],
    ['1234ab', '1234 cb'],
    ['1234Ab', '1234 BB'],
    ['1111aa', '2222aa'],
  ])('should return false for non similar inputs', (a, b) => {
    expect(isSameStringValue(a, b)).not.toBeTruthy()
  })

  it('should return true for similar number string values', () => {
    expect(isSameStringValue('1', String(1))).toBeTruthy()
  })
})
