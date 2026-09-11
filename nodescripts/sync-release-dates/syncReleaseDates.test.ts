import {env} from 'node:process'
import {syncReleaseDates} from './syncReleaseDates.mts'
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

const setRequiredEnvironmentVariables = ({
  dryRun,
  iosVersionLive,
  iosVersionReview,
  androidVersionLive,
  androidVersionReview,
}: {
  androidVersionLive: string
  androidVersionReview: string
  dryRun: string
  iosVersionLive: string
  iosVersionReview: string
}) => {
  env.DRY_RUN = dryRun
  env.IOS_VERSION_NUMBER_LIVE = iosVersionLive
  env.IOS_VERSION_NUMBER_REVIEW = iosVersionReview
  env.ANDROID_VERSION_NUMBER_LIVE = androidVersionLive
  env.ANDROID_VERSION_NUMBER_REVIEW = androidVersionReview

  env.INTERNAL_API_KEY_ONTW = 'internal-api-key-ontw'
  env.INTERNAL_API_KEY_TEST = 'internal-api-key-test'
  env.INTERNAL_API_KEY_ACC = 'internal-api-key-acc'
  env.INTERNAL_API_KEY_PROD = 'internal-api-key-prod'
}

const restoreEnvironment = (originalEnvironment: NodeJS.ProcessEnv) => {
  Object.keys(env).forEach(environmentKey => {
    delete env[environmentKey]
  })
  Object.assign(env, originalEnvironment)
}

const getFetchCallUrl = (callIndex: number) => {
  const fetchMock = global.fetch as jest.MockedFunction<typeof fetch>
  const call = fetchMock.mock.calls[callIndex]

  if (!call) {
    return ''
  }

  const [input] = call

  if (typeof input === 'string') {
    return input
  }

  if (input instanceof URL) {
    return input.toString()
  }

  return input.url
}

describe('syncReleaseDates', () => {
  const originalEnvironment = {...env}

  beforeEach(() => {
    restoreEnvironment(originalEnvironment)
    setRequiredEnvironmentVariables({
      dryRun: 'false',
      iosVersionLive: '1.29.0',
      iosVersionReview: '1.29.0',
      androidVersionLive: '1.29.0',
      androidVersionReview: '1.29.0',
    })

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      statusText: 'OK',
      json: () => ({status: 'ok'}),
    })

    jest.spyOn(console, 'log').mockImplementation(() => undefined)
  })

  afterEach(() => {
    jest.restoreAllMocks()
    restoreEnvironment(originalEnvironment)
  })

  it('should patch publish, deprecate and unpublish updates for a normal rollout', async () => {
    const releases = createReleases(['1.29.0', '1.28.0', '1.27.1', '1.27.0'])

    await syncReleaseDates({releases})

    const fetchMock = global.fetch as jest.MockedFunction<typeof fetch>

    expect(fetchMock).toHaveBeenCalledTimes(3)

    expect(getFetchCallUrl(0)).toContain('/release/1.29.0')
    expect(getFetchCallUrl(1)).toContain('/release/1.27.1')
    expect(getFetchCallUrl(2)).toContain('/release/1.27.0')
  })

  it('should patch only the unpublish update when one store review version is higher than live', async () => {
    setRequiredEnvironmentVariables({
      dryRun: 'false',
      iosVersionLive: '1.29.0',
      iosVersionReview: '1.30.0',
      androidVersionLive: '1.29.0',
      androidVersionReview: '1.29.0',
    })

    const releases = createReleases(['1.30.0', '1.29.0', '1.28.0', '1.27.0'])

    await syncReleaseDates({releases, environment: 'test'})

    const fetchMock = global.fetch as jest.MockedFunction<typeof fetch>

    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(getFetchCallUrl(0)).toContain('/release/1.27.0')
  })

  it('should not patch when current release already has a published date', async () => {
    const releases = [
      {
        ...BASE_RELEASE_OBJECT,
        version: '1.29.0',
        published: '2026-09-10T10:00:00.000Z',
      },
      {...BASE_RELEASE_OBJECT, version: '1.28.0'},
      {...BASE_RELEASE_OBJECT, version: '1.27.1'},
      {...BASE_RELEASE_OBJECT, version: '1.27.0'},
    ]

    await syncReleaseDates({releases, environment: 'acc'})

    expect(global.fetch).not.toHaveBeenCalled()
  })

  it('should not patch in dry run mode', async () => {
    setRequiredEnvironmentVariables({
      dryRun: 'true',
      iosVersionLive: '1.29.0',
      iosVersionReview: '1.29.0',
      androidVersionLive: '1.29.0',
      androidVersionReview: '1.29.0',
    })

    const releases = createReleases(['1.29.0', '1.28.0', '1.27.1', '1.27.0'])

    await syncReleaseDates({releases, environment: 'prod'})

    expect(global.fetch).not.toHaveBeenCalled()
  })

  it('should default to ontw when environment is undefined', async () => {
    const releases = createReleases(['1.29.0', '1.28.0', '1.27.1', '1.27.0'])

    await syncReleaseDates({releases})

    const fetchMock = global.fetch as jest.MockedFunction<typeof fetch>

    expect(fetchMock).toHaveBeenCalled()
    expect(getFetchCallUrl(0)).toContain('https://ontw.app.amsterdam.nl')
  })

  it('should reject when environment is null and patching is required', async () => {
    const releases = createReleases(['1.29.0', '1.28.0', '1.27.1', '1.27.0'])

    await expect(
      syncReleaseDates({
        releases,
        environment: null as unknown as 'ontw',
      }),
    ).rejects.toBeInstanceOf(TypeError)
  })

  it('should reject when releases is undefined', async () => {
    await expect(
      syncReleaseDates({
        releases: undefined as unknown as Release[],
        environment: 'ontw',
      }),
    ).rejects.toBeInstanceOf(TypeError)
  })

  it('should reject when releases is null', async () => {
    await expect(
      syncReleaseDates({
        releases: null as unknown as Release[],
        environment: 'ontw',
      }),
    ).rejects.toBeInstanceOf(TypeError)
  })

  it('should throw when releases list is empty', async () => {
    await expect(
      syncReleaseDates({
        releases: [],
        environment: 'ontw',
      }),
    ).rejects.toThrow(
      'Cannot find the current release based on the provided store release number',
    )
  })
})
