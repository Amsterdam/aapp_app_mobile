import * as core from '@actions/core'
import {addLabels} from './addLabels.mts'
import {hasTeamReview} from './hasTeamReview.mts'
import {context, octokit} from './octokit.mts'
import type {PackageConfig} from './config.mts'

export const checkCodeReviewed = async (
  reviews: Awaited<ReturnType<typeof octokit.rest.pulls.listReviews>>['data'],
  pullNumber: number,
  alreadyOnPr: Set<string>,
  config: Required<PackageConfig>,
): Promise<void> => {
  if (config.codeReviewedEnabled) {
    const isReviewedByTeam = hasTeamReview(reviews, config)

    if (isReviewedByTeam) {
      core.info('PR has been reviewed by a team member.')

      if (!alreadyOnPr.has(config.codeReviewedLabel)) {
        await addLabels(pullNumber, [
          {
            name: config.codeReviewedLabel,
            color: config.codeReviewedColor,
            description: 'PR has been reviewed by a team member.',
          },
        ])
      }
    } else if (alreadyOnPr.has(config.codeReviewedLabel)) {
      await octokit.rest.issues.removeLabel({
        owner: context.repo.owner,
        repo: context.repo.repo,
        issue_number: pullNumber,
        name: config.codeReviewedLabel,
      })
    }
  }
}
