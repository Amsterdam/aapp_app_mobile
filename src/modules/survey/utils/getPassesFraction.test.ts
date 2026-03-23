import {getPassesFraction} from '@/modules/survey/utils/getPassesFraction'

describe('getPassesFraction', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('returns false and does not call Math.random when fraction is undefined', () => {
    const randomSpy = jest.spyOn(Math, 'random')

    expect(getPassesFraction(undefined)).toBe(false)
    expect(randomSpy).not.toHaveBeenCalled()
  })

  it('returns false and does not call Math.random when fraction is 0', () => {
    const randomSpy = jest.spyOn(Math, 'random')

    expect(getPassesFraction(0)).toBe(false)
    expect(randomSpy).not.toHaveBeenCalled()
  })

  it('clamps negative fractions to 0 (always false)', () => {
    const randomSpy = jest.spyOn(Math, 'random')

    expect(getPassesFraction(-1)).toBe(false)
    expect(randomSpy).not.toHaveBeenCalled()
  })

  it('treats NaN as 0 (always false) and does not call Math.random', () => {
    const randomSpy = jest.spyOn(Math, 'random')

    expect(getPassesFraction(Number.NaN)).toBe(false)
    expect(randomSpy).not.toHaveBeenCalled()
  })

  it('returns true for fraction 1', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.999999)

    expect(getPassesFraction(1)).toBe(true)
  })

  it('clamps fractions > 1 to 1 (always true)', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.42)

    expect(getPassesFraction(2)).toBe(true)
    expect(getPassesFraction(Number.POSITIVE_INFINITY)).toBe(true)
  })

  it('returns true when Math.random() is strictly less than chance', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.49)

    expect(getPassesFraction(0.5)).toBe(true)
  })

  it('returns false when Math.random() equals chance (strict < comparison)', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.5)

    expect(getPassesFraction(0.5)).toBe(false)
  })
})
