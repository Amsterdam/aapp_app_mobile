import {groupMinorReleases} from './groupMinorReleases.mts'
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

describe('groupMinorReleases', () => {
  it('should group minor releases', () => {
    const releases = [
      '1.29.1',
      '1.29.0',
      '1.28.1',
      '1.28.0',
      '1.27.0',
      '1.26.0',
    ]

    expect(
      groupMinorReleases(createReleases(releases)).map(extractVersions),
    ).toEqual([
      ['1.29.1', '1.29.0'],
      ['1.28.1', '1.28.0'],
      ['1.27.0'],
      ['1.26.0'],
    ])
  })

  it('should sort release groups', () => {
    const releases = [
      '1.28.1',
      '1.29.1',
      '1.26.0',
      '1.27.0',
      '1.29.0',
      '1.28.0',
    ]

    expect(
      groupMinorReleases(createReleases(releases)).map(extractVersions),
    ).toEqual([
      ['1.29.1', '1.29.0'],
      ['1.28.1', '1.28.0'],
      ['1.27.0'],
      ['1.26.0'],
    ])
  })

  it('should handle major bumps', () => {
    const releases = ['1.1.1', '1.1.0', '1.0.0', '0.99.1', '0.99.0', '0.98.0']

    expect(
      groupMinorReleases(createReleases(releases)).map(extractVersions),
    ).toEqual([['1.1.1', '1.1.0'], ['1.0.0'], ['0.99.1', '0.99.0'], ['0.98.0']])
  })
})
