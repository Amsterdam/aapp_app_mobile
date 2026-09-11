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
  versions.map(version => ({
    version,
    ...BASE_RELEASE_OBJECT,
  }))

describe('buildReleaseDateUpdates', () => {
  const nowRounded = Date.parse('2026-09-10T10:00:00.000Z')

  beforeAll(() => {
    jest.useFakeTimers()
    jest.setSystemTime(nowRounded)
  })
  afterAll(() => {
    jest.useRealTimers()
  })

  it('should return a record with version keys and dates to update as values', () => {
    const releases = createReleases(['1.29.0', '1.28.0', '1.27.1', '1.27.0'])

    expect(buildReleaseDateUpdates(releases, '1.29.0')).toEqual({
      '1.29.0': {published: new Date(nowRounded)},
      '1.27.1': {deprecated: new Date(nowRounded + WEEK)},
      '1.27.0': {unpublished: new Date(nowRounded)},
    })
  })

  it('should return a record with 3 entries, selecting versions based on MAX_SUPPORTED_VERSIONS from first index', () => {
    const releases = createReleases([
      '1.29.0', // expected published
      '1.28.0',
      '1.27.1', // expected deprecated
      '1.27.0', // expected unpublished
      '1.26.0',
      '1.25.0',
      '1.24.1',
      '1.24.0',
    ])

    expect(buildReleaseDateUpdates(releases, '1.29.0')).toEqual({
      '1.29.0': {published: new Date(nowRounded)},
      '1.27.1': {deprecated: new Date(nowRounded + WEEK)},
      '1.27.0': {unpublished: new Date(nowRounded)},
    })
  })

  it('should not return unpublished or deprecated updates if release array is not long enough', () => {
    const shortReleases = createReleases(['1.29.0', '1.28.0', '1.27.1'])

    expect(buildReleaseDateUpdates(shortReleases, '1.29.0')).toEqual({
      '1.29.0': {
        published: new Date(nowRounded),
      },
      '1.27.1': {deprecated: new Date(nowRounded + WEEK)},
    })

    const shorterReleases = createReleases(['1.29.0', '1.28.0'])

    expect(buildReleaseDateUpdates(shorterReleases, '1.29.0')).toEqual({
      '1.29.0': {
        published: new Date(nowRounded),
      },
    })

    const singleRelease = createReleases(['1.29.0'])

    expect(buildReleaseDateUpdates(singleRelease, '1.29.0')).toEqual({
      '1.29.0': {
        published: new Date(nowRounded),
      },
    })
  })
})
