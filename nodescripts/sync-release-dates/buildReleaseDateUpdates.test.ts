import {buildReleaseDateUpdates} from './buildReleaseDateUpdates.mts'
import {WEEK} from './constants.mts'
import type {Release} from './types.mts'

const BASE_RELEASE_OBJECT: Omit<Release, 'version'> = {
  created: '2026-09-10T09:55:49.846Z',
  modified: '2026-09-10T09:55:49.846Z',
  published: null,
  deprecated: null,
  unpublished: null,
}

const createReleases = (versions: Array<Release['version']>) =>
  Array.from<Release>({length: versions.length}).map((_, index) => ({
    version: versions[index],
    ...BASE_RELEASE_OBJECT,
  }))

describe('buildReleaseDateUpdates', () => {
  const nowRounded = Number((Date.now() / 1000).toFixed(0)) * 1000

  it('should return a record with version keys and dates to update as values', () => {
    const releases = createReleases(['1.29.0', '1.28.0', '1.27.1', '1.27.0'])

    expect(buildReleaseDateUpdates(releases, '1.29.0')).toEqual({
      '1.29.0': {published: new Date(nowRounded)},
      '1.27.1': {deprecated: new Date(nowRounded + WEEK)},
      '1.27.0': {unpublished: new Date(nowRounded)},
    })
  })

  it('should return a record with 3 or less update entries, regardless of releases length', () => {
    const releases = createReleases([
      '1.29.0',
      '1.28.0',
      '1.27.1',
      '1.27.0',
      '1.26.0',
      '1.25.0',
      '1.24.1',
      '1.24.0',
    ])

    expect(buildReleaseDateUpdates(releases, '1.29.0')).toEqual({
      '1.29.0': {published: new Date(nowRounded)},
      '1.24.1': {deprecated: new Date(nowRounded + WEEK)},
      '1.24.0': {unpublished: new Date(nowRounded)},
    })

    const shortReleases = createReleases(['1.29.0', '1.28.0'])

    expect(buildReleaseDateUpdates(shortReleases, '1.29.0')).toEqual({
      '1.29.0': {
        published: new Date(nowRounded),
      },
      '1.28.0': {unpublished: new Date(nowRounded)},
    })

    expect(
      buildReleaseDateUpdates(
        [{...BASE_RELEASE_OBJECT, version: '1.29.0'}],
        '1.29.0',
      ),
    ).toEqual({
      '1.29.0': {
        published: new Date(nowRounded),
      },
    })
  })
})
