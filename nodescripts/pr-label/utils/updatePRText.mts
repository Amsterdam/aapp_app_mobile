import {getReviews} from './getReviews.mts'
import {octokit, context} from './octokit.mts'
import {sanitizeCopilotReviewBody} from './sanitizeCopilotReviewBody.mts'
import type {PackageConfig} from './config.mts'

export const updatePRText = async (
  pullNumber: number,
  review: Awaited<ReturnType<typeof getReviews>>[number] | undefined,
  config: Required<PackageConfig>,
): Promise<void> => {
  if (config.prDescriptionUpdateEnabled) {
    const reviewBody = review?.body?.trim()

    if (!reviewBody) {
      return
    }

    const sanitizedReviewBody = sanitizeCopilotReviewBody(reviewBody)

    if (!sanitizedReviewBody) {
      return
    }

    const pullRequest = await octokit.rest.pulls.get({
      owner: context.repo.owner,
      repo: context.repo.repo,
      pull_number: pullNumber,
    })

    const currentBody = pullRequest.data.body ?? ''
    const updatedBody = currentBody
      .replaceAll('\r\n', '\n')
      .replace(
        `${config.prDescriptionCopilotSectionBefore}\n\n${config.prDescriptionCopilotSectionAfter}\n`,
        `${config.prDescriptionCopilotSectionBefore}\n\n${sanitizedReviewBody}\n\n${config.prDescriptionCopilotSectionAfter}\n`,
      )

    if (updatedBody === currentBody) {
      return
    }

    await octokit.rest.pulls.update({
      owner: context.repo.owner,
      repo: context.repo.repo,
      pull_number: pullNumber,
      body: updatedBody,
    })
  }
}
