import {MAX_SUPPORTED_VERSIONS} from './constants.mts'
import {getRelevantReleases} from './getRelevantReleases.mts'
import type {Release} from './types.mts'

const BASE_RELEASE_OBJECT: Omit<Release, 'version'> = {
  created: '2026-09-10T09:55:49.846Z',
  modified: '2026-09-10T09:55:49.846Z',
  published: null,
  deprecated: null,
  unpublished: null,
}

const createReleases = (versions: Array<Release['version']>) =>
  versions.map(version => ({
    version,
    ...BASE_RELEASE_OBJECT,
  }))

const extractVersions = (group: Release[]) => group.map(({version}) => version)

describe('getRelevantReleases', () => {
  it('should return only the relevant releases from an array of all releases (ordered)', () => {
    const releaseVersions = [
      '1.29.0',
      '1.28.0',
      '1.27.1',
      '1.27.0',
      '1.26.0',
      '1.25.1',
      '1.25.0',
      '1.24.0',
    ]
    const releases = createReleases(releaseVersions)

    expect(
      getRelevantReleases(releases, '1.29.0', MAX_SUPPORTED_VERSIONS).map(
        extractVersions,
      ),
    ).toEqual([
      ['1.29.0'], // Current
      ['1.28.0'], // Deprecated
      [
        '1.27.1', // Unpublished
        '1.27.0', // Unpublished
      ],
    ])
  })

  it('should return only the relevant releases from an array of all releases (unordered)', () => {
    const releaseVersions = [
      '1.25.0',
      '1.27.1',
      '1.29.0',
      '1.24.0',
      '1.28.0',
      '1.26.0',
      '1.25.1',
      '1.27.0',
    ]
    const releases = createReleases(releaseVersions)

    expect(
      getRelevantReleases(releases, '1.29.0', MAX_SUPPORTED_VERSIONS).map(
        extractVersions,
      ),
    ).toEqual([
      ['1.29.0'], // Current
      ['1.28.0'], // Deprecated
      [
        '1.27.1', // Unpublished
        '1.27.0', // Unpublished
      ],
    ])
  })

  it('should return less releases if input releases are <= max relevant releases', () => {
    const releaseVersions = ['1.28.0', '1.27.0', '1.29.0']
    const releases = createReleases(releaseVersions)

    expect(
      getRelevantReleases(releases, '1.29.0', MAX_SUPPORTED_VERSIONS).map(
        extractVersions,
      ),
    ).toEqual([
      ['1.29.0'], // Current
      ['1.28.0'], // Deprecated
      ['1.27.0'], // Unpublished
    ])
  })

  it('should filter out upcoming releases', () => {
    const releaseVersions = ['1.30.0', '1.29.1', '1.29.0']
    const releases = createReleases(releaseVersions)

    expect(
      getRelevantReleases(releases, '1.29.0', MAX_SUPPORTED_VERSIONS).map(
        extractVersions,
      ),
    ).toEqual([['1.29.0']])
  })

  it('should throw when current release is not found in input releases', () => {
    const releaseVersions = [
      '1.30.0',
      '1.29.1',
      '1.28.0',
      '1.27.0',
      '1.26.0',
      '1.25.1',
      '1.25.0',
      '1.24.0',
    ]
    const releases = createReleases(releaseVersions)

    expect(() =>
      getRelevantReleases(releases, '1.29.0', MAX_SUPPORTED_VERSIONS),
    ).toThrow(
      'Cannot find the current release based on the provided store release number',
    )
    expect(() =>
      getRelevantReleases([], '1.29.0', MAX_SUPPORTED_VERSIONS),
    ).toThrow(
      'Cannot find the current release based on the provided store release number',
    )
  })

  it('should handle major bumps', () => {
    const releaseVersions = [
      '1.1.0',
      '1.0.0',
      '0.99.0',
      '0.98.1',
      '0.98.0',
      '0.97.0',
      '0.96.0',
      '0.95.1',
      '0.95.0',
    ]
    const releases = createReleases(releaseVersions)

    expect(
      getRelevantReleases(releases, '1.1.0', MAX_SUPPORTED_VERSIONS).map(
        extractVersions,
      ),
    ).toEqual([['1.1.0'], ['1.0.0'], ['0.99.0']])
  })

  it('should join all patch releases of a minor release', () => {
    const releaseVersions = [
      '1.30.0',
      '1.29.1',
      '1.29.0',
      '1.28.0',
      '1.27.0',
      '1.26.0',
      '1.25.1',
      '1.25.0',
      '1.24.0',
    ]
    const releases = createReleases(releaseVersions)

    expect(
      getRelevantReleases(releases, '1.30.0', MAX_SUPPORTED_VERSIONS).map(
        extractVersions,
      ),
    ).toEqual([['1.30.0'], ['1.29.1', '1.29.0'], ['1.28.0']])

    expect(
      getRelevantReleases(releases, '1.30.0', MAX_SUPPORTED_VERSIONS).map(
        extractVersions,
      ),
    ).toHaveLength(MAX_SUPPORTED_VERSIONS + 1) // + 1 to unpublish

    expect(
      getRelevantReleases(releases, '1.29.0', MAX_SUPPORTED_VERSIONS).map(
        extractVersions,
      ),
    ).toEqual([['1.29.0'], ['1.28.0'], ['1.27.0']])

    expect(
      getRelevantReleases(releases, '1.29.0', MAX_SUPPORTED_VERSIONS).map(
        extractVersions,
      ),
    ).toHaveLength(MAX_SUPPORTED_VERSIONS + 1) // + 1 to unpublish
  })

  it('should add/decrease releases based on maxSupportedReleases', () => {
    const releaseVersions = [
      '1.30.0',
      '1.29.1',
      '1.29.0',
      '1.28.0',
      '1.27.0',
      '1.26.0',
      '1.25.1',
      '1.25.0',
      '1.24.0',
    ]
    const releases = createReleases(releaseVersions)

    expect(
      getRelevantReleases(releases, '1.30.0', 1).map(extractVersions),
    ).toEqual([['1.30.0'], ['1.29.1', '1.29.0']])

    expect(
      getRelevantReleases(releases, '1.30.0', 1).map(extractVersions),
    ).toHaveLength(1 + 1)

    expect(
      getRelevantReleases(releases, '1.30.0', 4).map(extractVersions),
    ).toEqual([
      ['1.30.0'],
      ['1.29.1', '1.29.0'],
      ['1.28.0'],
      ['1.27.0'],
      ['1.26.0'],
    ])
    expect(
      getRelevantReleases(releases, '1.30.0', 4).map(extractVersions),
    ).toHaveLength(4 + 1)
  })
})
