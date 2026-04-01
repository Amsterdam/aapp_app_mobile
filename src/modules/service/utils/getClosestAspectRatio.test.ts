import {getClosestAspectRatio} from '@/modules/service/utils/getClosestAspectRatio'

describe('getClosestAspectRatio', () => {
  it('should return extraWide for aspect ratios beyond 2.022', () => {
    expect(getClosestAspectRatio(Number.MAX_VALUE, 1)).toBe('extraWide')
    expect(getClosestAspectRatio(2.022, 1)).toBe('extraWide')
    expect(getClosestAspectRatio(2.021, 1)).not.toBe('extraWide')
  })

  it('should return wide for aspect ratios between 1.514 and 2.021', () => {
    expect(getClosestAspectRatio(2.022, 1)).not.toBe('wide')
    expect(getClosestAspectRatio(2.021, 1)).toBe('wide')
    expect(getClosestAspectRatio(1.514, 1)).toBe('wide')
    expect(getClosestAspectRatio(1.513, 1)).not.toBe('wide')
  })

  it('should return narrow for aspect ratios between 1.125 and 1.513', () => {
    expect(getClosestAspectRatio(1.514, 1)).not.toBe('narrow')
    expect(getClosestAspectRatio(1.513, 1)).toBe('narrow')
    expect(getClosestAspectRatio(1.125, 1)).toBe('narrow')
    expect(getClosestAspectRatio(1.124, 1)).not.toBe('narrow')
  })

  it('should return square for aspect ratios between 0.875 and 1.124', () => {
    expect(getClosestAspectRatio(1.125, 1)).not.toBe('square')
    expect(getClosestAspectRatio(1.124, 1)).toBe('square')
    expect(getClosestAspectRatio(0.875, 1)).toBe('square')
    expect(getClosestAspectRatio(0.874, 1)).not.toBe('square')
  })

  it('should return portrait for aspect ratios between 0.626 and 0.874', () => {
    expect(getClosestAspectRatio(0.875, 1)).not.toBe('portrait')
    expect(getClosestAspectRatio(0.874, 1)).toBe('portrait')
    expect(getClosestAspectRatio(0.626, 1)).toBe('portrait')
    expect(getClosestAspectRatio(0.625, 1)).not.toBe('portrait')
  })

  it('should return tight for aspect ratios below 0.625', () => {
    expect(getClosestAspectRatio(0.626, 1)).not.toBe('tight')
    expect(getClosestAspectRatio(0.625, 1)).toBe('tight')
    expect(getClosestAspectRatio(Number.MIN_VALUE, 1)).toBe('tight')
  })
})
