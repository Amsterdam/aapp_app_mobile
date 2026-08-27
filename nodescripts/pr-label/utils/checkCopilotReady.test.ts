jest.mock(
  '@actions/core',
  () => ({
    info: jest.fn(),
  }),
  {virtual: true},
)

jest.mock('./addLabels.mts', () => ({
  addLabels: jest.fn(),
}))

jest.mock('./getOpenCopilotReviewComments.mts', () => ({
  getOpenCopilotReviewComments: jest.fn(),
}))

jest.mock('./octokit.mts', () => ({
  context: {
    repo: {
      owner: 'Amsterdam',
      repo: 'aapp_app_mobile',
    },
  },
  octokit: {
    rest: {
      issues: {
        removeLabel: jest.fn(),
      },
      pulls: {
        listReviews: jest.fn(),
      },
    },
  },
}))

import * as core from '@actions/core'
import {addLabels} from './addLabels.mts'
import {checkCopilotReady} from './checkCopilotReady.mts'
import {getOpenCopilotReviewComments} from './getOpenCopilotReviewComments.mts'
import {octokit} from './octokit.mts'
import type {PackageConfig} from './config.mts'

const createConfig = (
  overrides: Partial<Required<PackageConfig>> = {},
): Required<PackageConfig> => ({
  codeReviewedColor: '#05b103',
  codeReviewedEnabled: true,
  codeReviewedLabel: 'Code reviewed',
  copilotLogins: ['github-copilot[bot]'],
  copilotReadyColor: '#05b103',
  copilotReadyEnabled: true,
  copilotReadyLabel: 'Copilot ready',
  labels: {},
  prDescriptionCopilotSectionAfter: '## Test instructions',
  prDescriptionCopilotSectionBefore: '# Changes',
  reviewerUsernames: [],
  prDescriptionUpdateEnabled: true,
  ...overrides,
})

const mockInfo = jest.mocked(core.info)
const mockAddLabels = jest.mocked(addLabels)
const mockGetOpenCopilotReviewComments = jest.mocked(
  getOpenCopilotReviewComments,
)
const mockRemoveLabel = jest.mocked(octokit.rest.issues.removeLabel)

describe('checkCopilotReady', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockGetOpenCopilotReviewComments.mockResolvedValue(0)
  })

  it('adds the Copilot ready label when Copilot reviewed and there are no open comments', async () => {
    const config = createConfig()

    await checkCopilotReady({id: 1} as never, 42, new Set<string>(), config)

    expect(mockGetOpenCopilotReviewComments).toHaveBeenCalledWith(42, config)
    expect(mockInfo).toHaveBeenCalledWith('Adding labels to PR: Copilot ready')
    expect(mockAddLabels).toHaveBeenCalledWith(42, [
      {
        name: 'Copilot ready',
        color: '#05b103',
        description: 'Copilot review completed with no open comments.',
      },
    ])
    expect(mockRemoveLabel).not.toHaveBeenCalled()
  })

  it('does not add the label again when it is already on the pull request', async () => {
    const config = createConfig()

    await checkCopilotReady(
      {id: 1} as never,
      42,
      new Set<string>(['Copilot ready']),
      config,
    )

    expect(mockAddLabels).not.toHaveBeenCalled()
    expect(mockRemoveLabel).not.toHaveBeenCalled()
  })

  it('removes the label when Copilot still has open review comments', async () => {
    const config = createConfig()

    mockGetOpenCopilotReviewComments.mockResolvedValue(2)

    await checkCopilotReady(
      {id: 1} as never,
      42,
      new Set<string>(['Copilot ready']),
      config,
    )

    expect(mockInfo).toHaveBeenCalledWith(
      'Removing label from PR: Copilot ready',
    )
    expect(mockRemoveLabel).toHaveBeenCalledWith({
      owner: 'Amsterdam',
      repo: 'aapp_app_mobile',
      issue_number: 42,
      name: 'Copilot ready',
    })
    expect(mockAddLabels).not.toHaveBeenCalled()
  })

  it.each([undefined, null])(
    'treats %p firstCopilotReview as not reviewed and removes an existing label',
    async firstCopilotReview => {
      const config = createConfig()

      await checkCopilotReady(
        firstCopilotReview as never,
        42,
        new Set<string>(['Copilot ready']),
        config,
      )

      expect(mockRemoveLabel).toHaveBeenCalledWith({
        owner: 'Amsterdam',
        repo: 'aapp_app_mobile',
        issue_number: 42,
        name: 'Copilot ready',
      })
      expect(mockAddLabels).not.toHaveBeenCalled()
    },
  )

  it('does nothing when Copilot has not reviewed and the label is not on the pull request', async () => {
    const config = createConfig()

    await checkCopilotReady(undefined, 42, new Set<string>(), config)

    expect(mockGetOpenCopilotReviewComments).toHaveBeenCalledWith(42, config)
    expect(mockAddLabels).not.toHaveBeenCalled()
    expect(mockRemoveLabel).not.toHaveBeenCalled()
  })

  it('skips all Copilot ready checks when the feature is disabled', async () => {
    const config = createConfig({copilotReadyEnabled: false})

    await checkCopilotReady({id: 1} as never, 42, new Set<string>(), config)

    expect(mockInfo).not.toHaveBeenCalled()
    expect(mockGetOpenCopilotReviewComments).not.toHaveBeenCalled()
    expect(mockAddLabels).not.toHaveBeenCalled()
    expect(mockRemoveLabel).not.toHaveBeenCalled()
  })

  it.each([undefined, null])(
    'passes through %p pullNumber to dependent calls',
    async pullNumber => {
      const config = createConfig()

      await checkCopilotReady(
        {id: 1} as never,
        pullNumber as never,
        new Set<string>(),
        config,
      )

      expect(mockGetOpenCopilotReviewComments).toHaveBeenCalledWith(
        pullNumber,
        config,
      )
      expect(mockAddLabels).toHaveBeenCalledWith(pullNumber, [
        {
          name: 'Copilot ready',
          color: '#05b103',
          description: 'Copilot review completed with no open comments.',
        },
      ])
    },
  )

  it.each([undefined, null])(
    'rejects when alreadyOnPr is %p',
    async alreadyOnPr => {
      const config = createConfig()

      await expect(
        checkCopilotReady({id: 1} as never, 42, alreadyOnPr as never, config),
      ).rejects.toThrow()
    },
  )

  it.each([undefined, null])(
    'treats %p copilotReadyEnabled as disabled',
    async copilotReadyEnabled => {
      const config = createConfig({
        copilotReadyEnabled: copilotReadyEnabled as never,
      })

      await checkCopilotReady({id: 1} as never, 42, new Set<string>(), config)

      expect(mockGetOpenCopilotReviewComments).not.toHaveBeenCalled()
      expect(mockAddLabels).not.toHaveBeenCalled()
      expect(mockRemoveLabel).not.toHaveBeenCalled()
    },
  )

  it.each([undefined, null])(
    'forwards %p copilotReadyLabel and copilotReadyColor when adding the label',
    async nullishValue => {
      const config = createConfig({
        copilotReadyColor: nullishValue as never,
        copilotReadyLabel: nullishValue as never,
      })

      await checkCopilotReady({id: 1} as never, 42, new Set<string>(), config)

      expect(mockInfo).toHaveBeenCalledWith(
        `Adding labels to PR: ${String(nullishValue)}`,
      )
      expect(mockAddLabels).toHaveBeenCalledWith(42, [
        {
          name: nullishValue,
          color: nullishValue,
          description: 'Copilot review completed with no open comments.',
        },
      ])
    },
  )

  it.each([undefined, null])('rejects when config is %p', async config => {
    await expect(
      checkCopilotReady(
        {id: 1} as never,
        42,
        new Set<string>(),
        config as never,
      ),
    ).rejects.toThrow()
  })
})
