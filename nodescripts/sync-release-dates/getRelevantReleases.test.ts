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

    expect(getRelevantReleases(releases, '1.29.0')).toEqual([
      {...BASE_RELEASE_OBJECT, version: '1.29.0'}, // Current
      {...BASE_RELEASE_OBJECT, version: '1.28.0'}, // Previous
      {...BASE_RELEASE_OBJECT, version: '1.27.1'}, // Deprecated
      {...BASE_RELEASE_OBJECT, version: '1.27.0'}, // Unpublished
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

    expect(getRelevantReleases(releases, '1.29.0')).toEqual([
      {...BASE_RELEASE_OBJECT, version: '1.29.0'}, // Current
      {...BASE_RELEASE_OBJECT, version: '1.28.0'}, // Previous
      {...BASE_RELEASE_OBJECT, version: '1.27.1'}, // Deprecated
      {...BASE_RELEASE_OBJECT, version: '1.27.0'}, // Unpublished
    ])
  })

  it('should return less releases if input releases are <= max relevant releases', () => {
    const releaseVersions = ['1.28.0', '1.27.0', '1.29.0']
    const releases = createReleases(releaseVersions)

    expect(getRelevantReleases(releases, '1.29.0')).toEqual([
      {...BASE_RELEASE_OBJECT, version: '1.29.0'},
      {...BASE_RELEASE_OBJECT, version: '1.28.0'},
      {...BASE_RELEASE_OBJECT, version: '1.27.0'},
    ])
  })

  it('should filter out upcoming releases', () => {
    const releaseVersions = ['1.30.0', '1.29.1', '1.29.0']
    const releases = createReleases(releaseVersions)

    expect(getRelevantReleases(releases, '1.29.0')).toEqual([
      {...BASE_RELEASE_OBJECT, version: '1.29.0'},
    ])
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

    expect(() => getRelevantReleases(releases, '1.29.0')).toThrow(
      'Cannot find the current release based on the provided store release number',
    )
    expect(() => getRelevantReleases([], '1.29.0')).toThrow(
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

    expect(getRelevantReleases(releases, '1.1.0')).toEqual([
      {...BASE_RELEASE_OBJECT, version: '1.1.0'},
      {...BASE_RELEASE_OBJECT, version: '1.0.0'},
      {...BASE_RELEASE_OBJECT, version: '0.99.0'},
      {...BASE_RELEASE_OBJECT, version: '0.98.1'},
    ])
  })
})
