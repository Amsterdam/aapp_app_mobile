import {getHighestReleaseVersion} from './getHighestReleaseVersion.mts'

describe('getHighestReleaseVersion', () => {
  it('should return the highest version in a provided array', () => {
    expect(getHighestReleaseVersion(['1.29.0', '1.99.0'])).toBe('1.99.0')
    expect(getHighestReleaseVersion(['1.29.0'])).toBe('1.29.0')
    expect(getHighestReleaseVersion(['1.29.0', '1.19.0'])).toBe('1.29.0')
    expect(getHighestReleaseVersion(['1.29.0', '1.29.1'])).toBe('1.29.1')
    expect(getHighestReleaseVersion(['1.29.0', '0.29.0'])).toBe('1.29.0')
    expect(getHighestReleaseVersion(['1.29.0', '1.29.0'])).toBe('1.29.0')
  })

  it('should throw when an entry in the provided array is not valid', () => {
    expect(() => getHighestReleaseVersion(['1.99'])).toThrow()
    expect(() => getHighestReleaseVersion([''])).toThrow()
    expect(() => getHighestReleaseVersion([])).toThrow()
    expect(() =>
      getHighestReleaseVersion([undefined as unknown as string]),
    ).toThrow()
    expect(() =>
      getHighestReleaseVersion([null as unknown as string]),
    ).toThrow()
    expect(() => getHighestReleaseVersion([123 as unknown as string])).toThrow()
  })
})
