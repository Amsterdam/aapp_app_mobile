import {CHANGES_HEADING, TEST_INSTRUCTIONS_HEADING} from '../constants.mts'
import {getReviews} from './getReviews.mts'
import {octokit, context} from './octokit.mts'
import {sanitizeCopilotReviewBody} from './sanitizeCopilotReviewBody.mts'

export const updatePRText = async (
  pullNumber: number,
  review: Awaited<ReturnType<typeof getReviews>>[number] | undefined,
): Promise<void> => {
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
      `${CHANGES_HEADING}\n\n${TEST_INSTRUCTIONS_HEADING}\n`,
      `${CHANGES_HEADING}\n\n${sanitizedReviewBody}\n\n${TEST_INSTRUCTIONS_HEADING}\n`,
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
