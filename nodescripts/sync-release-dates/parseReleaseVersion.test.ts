import {parseReleaseVersion} from './parseReleaseVersion.mts'

describe('parseReleaseVersion', () => {
  it('should parse release version strings into major, minor, and patch numbers', () => {
    expect(parseReleaseVersion('1.1.1')).toEqual({major: 1, minor: 1, patch: 1})
    expect(parseReleaseVersion('0.0.0')).toEqual({major: 0, minor: 0, patch: 0})
    expect(parseReleaseVersion('0.0.1')).toEqual({major: 0, minor: 0, patch: 1})
    expect(parseReleaseVersion('999999.9.9')).toEqual({
      major: 999999,
      minor: 9,
      patch: 9,
    })
  })

  it.each([
    '1.1',
    '0.0.0.0',
    '999',
    'o12dF.a.4fsd',
    'test',
    '',
    undefined,
    null,
    123,
  ])('should throw when receiving an invalid version number string', input => {
    expect(() => parseReleaseVersion(input as unknown as string)).toThrow(
      `Invalid release version: ${input}`,
    )
  })
})
