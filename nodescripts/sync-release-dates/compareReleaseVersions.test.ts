import {compareReleaseVersions} from './compareReleaseVersions.mts'
import type {ParsedReleaseVersion} from './types.mts'

describe('compareReleaseVersions', () => {
  it('should return 0 for equal versions', () => {
    expect(
      compareReleaseVersions(
        {major: 1, minor: 29, patch: 0},
        {major: 1, minor: 29, patch: 0},
      ),
    ).toBe(0)
  })
  it('should return 1 for newer releases (left side), regardless of major/minor/patch', () => {
    expect(
      compareReleaseVersions(
        {major: 1, minor: 29, patch: 1},
        {major: 1, minor: 29, patch: 0},
      ),
    ).toBe(1)

    expect(
      compareReleaseVersions(
        {major: 1, minor: 29, patch: 0},
        {major: 1, minor: 28, patch: 0},
      ),
    ).toBe(1)

    expect(
      compareReleaseVersions(
        {major: 1, minor: 29, patch: 0},
        {major: 0, minor: 29, patch: 0},
      ),
    ).toBe(1)
  })

  it('should return -1 for older releases (left side), regardless of major/minor/patch', () => {
    expect(
      compareReleaseVersions(
        {major: 1, minor: 29, patch: 0},
        {major: 1, minor: 29, patch: 1},
      ),
    ).toBe(-1)

    expect(
      compareReleaseVersions(
        {major: 1, minor: 28, patch: 0},
        {major: 1, minor: 29, patch: 0},
      ),
    ).toBe(-1)

    expect(
      compareReleaseVersions(
        {major: 0, minor: 29, patch: 0},
        {major: 1, minor: 29, patch: 0},
      ),
    ).toBe(-1)
  })

  it('should return 1 for major release bump', () => {
    expect(
      compareReleaseVersions(
        {major: 1, minor: 0, patch: 0},
        {major: 0, minor: 99, patch: 99},
      ),
    ).toBe(1)
  })

  it('should return NaN for invalid entries', () => {
    expect(
      compareReleaseVersions(undefined as unknown as ParsedReleaseVersion, {
        major: 0,
        minor: 99,
        patch: 0,
      }),
    ).toBeNaN()
    expect(
      compareReleaseVersions(
        {
          major: 0,
          minor: 99,
          patch: 0,
        },
        null as unknown as ParsedReleaseVersion,
      ),
    ).toBeNaN()
    expect(
      compareReleaseVersions(
        'test' as unknown as ParsedReleaseVersion,
        null as unknown as ParsedReleaseVersion,
      ),
    ).toBeNaN()
  })
})
