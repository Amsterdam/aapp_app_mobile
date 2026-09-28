import {getParallaxScrollingOffset} from '@/modules/city-pass/utils/getParallaxScrollingOffset'

describe('getParallaxScrollingOffset', () => {
  it.each([
    [
      '(windowWidth - cardWidth) if nextCardVisibleFractionOfAvailableSpace is 1',
      {windowWidth: 1000, nextCardVisibleFractionOfAvailableSpace: 1},
      700,
    ],
    [
      'half of (windowWidth - cardWidth) if nextCardVisibleFractionOfAvailableSpace is 0',
      {windowWidth: 1000, nextCardVisibleFractionOfAvailableSpace: 0},
      350,
    ],
    [
      '0 if windowWidth and cardWidth are equal',
      {windowWidth: 300, nextCardVisibleFractionOfAvailableSpace: 0.2},
      0,
    ],
  ])(
    'should return %s',
    (
      _,
      {windowWidth, nextCardVisibleFractionOfAvailableSpace},
      expectedResult,
    ) => {
      const cardWidth = 300

      const result = getParallaxScrollingOffset(
        windowWidth,
        cardWidth,
        nextCardVisibleFractionOfAvailableSpace,
      )

      expect(result).toBe(expectedResult)
    },
  )
})
