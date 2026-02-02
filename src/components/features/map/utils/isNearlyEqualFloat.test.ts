import {isNearlyEqualFloat} from '@/components/features/map/utils/isNearlyEqualFloat'

describe('isNearlyEqualFloat', () => {
  it('should return true if floating point numbers are equal to given decimal point.', () => {
    expect(isNearlyEqualFloat(0.000081, 0.000089, 5)).toBeTruthy()
    expect(isNearlyEqualFloat(0.0000081, 0.0000089, 6)).toBeTruthy()
    expect(isNearlyEqualFloat(0.071, 0.079, 2)).toBeTruthy()
    expect(isNearlyEqualFloat(0.51, 0.59, 1)).toBeTruthy()
    expect(isNearlyEqualFloat(2.1, 2.3, 0)).toBeTruthy()
  })

  it('should return false if floating point numbers are not equal to given decimal point.', () => {
    expect(isNearlyEqualFloat(0.0002, 0.0001, 4)).toBeFalsy()
    expect(isNearlyEqualFloat(0.00001, 0.00009, 5)).toBeFalsy()
    expect(isNearlyEqualFloat(0.01, 0.02, 2)).toBeFalsy()
    expect(isNearlyEqualFloat(0.1, 0.2, 1)).toBeFalsy()
    expect(isNearlyEqualFloat(1.1, 2.1, 1)).toBeFalsy()
  })
})
