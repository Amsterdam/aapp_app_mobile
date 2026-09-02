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

jest.mock('./hasTeamReview.mts', () => ({
  hasTeamReview: jest.fn(),
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
import {checkCodeReviewed} from './checkCodeReviewed.mts'
import {hasTeamReview} from './hasTeamReview.mts'
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
  reviewerUsernames: ['reviewer'],
  prDescriptionUpdateEnabled: true,
  ...overrides,
})

const mockInfo = jest.mocked(core.info)
const mockAddLabels = jest.mocked(addLabels)
const mockHasTeamReview = jest.mocked(hasTeamReview)
const mockRemoveLabel = jest.mocked(octokit.rest.issues.removeLabel)

describe('checkCodeReviewed', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockHasTeamReview.mockReturnValue(false)
  })

  it('adds the Code reviewed label when a team review is present and the label is missing', async () => {
    const config = createConfig()
    const reviews = [{state: 'APPROVED', user: {login: 'reviewer'}}] as never

    mockHasTeamReview.mockReturnValue(true)

    await checkCodeReviewed(reviews, 42, new Set<string>(), config)

    expect(mockHasTeamReview).toHaveBeenCalledWith(reviews, config)
    expect(mockInfo).toHaveBeenCalledWith(
      'PR has been reviewed by a team member.',
    )
    expect(mockAddLabels).toHaveBeenCalledWith(42, [
      {
        name: 'Code reviewed',
        color: '#05b103',
        description: 'PR has been reviewed by a team member.',
      },
    ])
    expect(mockRemoveLabel).not.toHaveBeenCalled()
  })

  it('does not add the label again when it is already on the pull request', async () => {
    const config = createConfig()

    mockHasTeamReview.mockReturnValue(true)

    await checkCodeReviewed(
      [{state: 'APPROVED', user: {login: 'reviewer'}}] as never,
      42,
      new Set<string>(['Code reviewed']),
      config,
    )

    expect(mockAddLabels).not.toHaveBeenCalled()
    expect(mockRemoveLabel).not.toHaveBeenCalled()
  })

  it('removes the label when there is no team review and the label is already on the pull request', async () => {
    const config = createConfig()

    await checkCodeReviewed(
      [{state: 'COMMENTED', user: {login: 'reviewer'}}] as never,
      42,
      new Set<string>(['Code reviewed']),
      config,
    )

    expect(mockRemoveLabel).toHaveBeenCalledWith({
      owner: 'Amsterdam',
      repo: 'aapp_app_mobile',
      issue_number: 42,
      name: 'Code reviewed',
    })
    expect(mockAddLabels).not.toHaveBeenCalled()
  })

  it('does nothing when there is no team review and the label is not on the pull request', async () => {
    const config = createConfig()

    await checkCodeReviewed(
      [{state: 'COMMENTED', user: {login: 'external-user'}}] as never,
      42,
      new Set<string>(),
      config,
    )

    expect(mockHasTeamReview).toHaveBeenCalledWith(
      [{state: 'COMMENTED', user: {login: 'external-user'}}],
      config,
    )
    expect(mockAddLabels).not.toHaveBeenCalled()
    expect(mockRemoveLabel).not.toHaveBeenCalled()
  })

  it('skips all code reviewed checks when the feature is disabled', async () => {
    const config = createConfig({codeReviewedEnabled: false})

    await checkCodeReviewed(
      [{state: 'APPROVED', user: {login: 'reviewer'}}] as never,
      42,
      new Set<string>(),
      config,
    )

    expect(mockHasTeamReview).not.toHaveBeenCalled()
    expect(mockAddLabels).not.toHaveBeenCalled()
    expect(mockRemoveLabel).not.toHaveBeenCalled()
  })

  it.each([undefined, null])(
    'forwards %p reviews to hasTeamReview',
    async reviews => {
      const config = createConfig()

      mockHasTeamReview.mockReturnValue(true)

      await checkCodeReviewed(reviews as never, 42, new Set<string>(), config)

      expect(mockHasTeamReview).toHaveBeenCalledWith(reviews, config)
      expect(mockAddLabels).toHaveBeenCalledWith(42, [
        {
          name: 'Code reviewed',
          color: '#05b103',
          description: 'PR has been reviewed by a team member.',
        },
      ])
    },
  )

  it.each([undefined, null])(
    'passes through %p pullNumber to downstream label operations',
    async pullNumber => {
      const config = createConfig()

      mockHasTeamReview.mockReturnValue(true)

      await checkCodeReviewed(
        [{state: 'APPROVED', user: {login: 'reviewer'}}] as never,
        pullNumber as never,
        new Set<string>(),
        config,
      )

      expect(mockAddLabels).toHaveBeenCalledWith(pullNumber, [
        {
          name: 'Code reviewed',
          color: '#05b103',
          description: 'PR has been reviewed by a team member.',
        },
      ])
    },
  )

  it.each([undefined, null])(
    'rejects when alreadyOnPr is %p',
    async alreadyOnPr => {
      const config = createConfig()

      await expect(
        checkCodeReviewed(
          [{state: 'APPROVED', user: {login: 'reviewer'}}] as never,
          42,
          alreadyOnPr as never,
          config,
        ),
      ).rejects.toThrow()
    },
  )

  it.each([undefined, null])(
    'treats %p codeReviewedEnabled as disabled',
    async codeReviewedEnabled => {
      const config = createConfig({
        codeReviewedEnabled: codeReviewedEnabled as never,
      })

      await checkCodeReviewed(
        [{state: 'APPROVED', user: {login: 'reviewer'}}] as never,
        42,
        new Set<string>(),
        config,
      )

      expect(mockHasTeamReview).not.toHaveBeenCalled()
      expect(mockAddLabels).not.toHaveBeenCalled()
      expect(mockRemoveLabel).not.toHaveBeenCalled()
    },
  )

  it.each([undefined, null])(
    'forwards %p codeReviewedLabel and codeReviewedColor when adding the label',
    async nullishValue => {
      const config = createConfig({
        codeReviewedColor: nullishValue as never,
        codeReviewedLabel: nullishValue as never,
      })

      mockHasTeamReview.mockReturnValue(true)

      await checkCodeReviewed(
        [{state: 'APPROVED', user: {login: 'reviewer'}}] as never,
        42,
        new Set<string>(),
        config,
      )

      expect(mockAddLabels).toHaveBeenCalledWith(42, [
        {
          name: nullishValue,
          color: nullishValue,
          description: 'PR has been reviewed by a team member.',
        },
      ])
    },
  )

  it.each([undefined, null])(
    'forwards %p codeReviewedLabel when removing the label',
    async codeReviewedLabel => {
      const config = createConfig({
        codeReviewedLabel: codeReviewedLabel as never,
      })

      await checkCodeReviewed(
        [{state: 'COMMENTED', user: {login: 'reviewer'}}] as never,
        42,
        new Set<string>([codeReviewedLabel as never]),
        config,
      )

      expect(mockRemoveLabel).toHaveBeenCalledWith({
        owner: 'Amsterdam',
        repo: 'aapp_app_mobile',
        issue_number: 42,
        name: codeReviewedLabel,
      })
    },
  )

  it.each([undefined, null])(
    'passes through %p reviewerUsernames to hasTeamReview',
    async reviewerUsernames => {
      const config = createConfig({
        reviewerUsernames: reviewerUsernames as never,
      })

      await checkCodeReviewed(
        [{state: 'APPROVED', user: {login: 'reviewer'}}] as never,
        42,
        new Set<string>(),
        config,
      )

      expect(mockHasTeamReview).toHaveBeenCalledWith(
        [{state: 'APPROVED', user: {login: 'reviewer'}}],
        config,
      )
    },
  )

  it.each([undefined, null])('rejects when config is %p', async config => {
    await expect(
      checkCodeReviewed(
        [{state: 'APPROVED', user: {login: 'reviewer'}}] as never,
        42,
        new Set<string>(),
        config as never,
      ),
    ).rejects.toThrow()
  })
})
