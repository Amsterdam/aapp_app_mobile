import * as core from '@actions/core'
import {addLabels} from './addLabels.mts'
import {getOpenCopilotReviewComments} from './getOpenCopilotReviewComments.mts'
import {context, octokit} from './octokit.mts'
import type {PackageConfig} from './config.mts'

export const checkCopilotReady = async (
  firstCopilotReview:
    | Awaited<ReturnType<typeof octokit.rest.pulls.listReviews>>['data'][number]
    | undefined,
  pullNumber: number,
  alreadyOnPr: Set<string>,
  config: Required<PackageConfig>,
): Promise<void> => {
  if (config.copilotReadyEnabled) {
    const isReviewedByCopilot = !!firstCopilotReview
    const openCopilotReviewComments = await getOpenCopilotReviewComments(
      pullNumber,
      config,
    )

    if (isReviewedByCopilot && openCopilotReviewComments === 0) {
      if (!alreadyOnPr.has(config.copilotReadyLabel)) {
        core.info(`Adding labels to PR: ${config.copilotReadyLabel}`)
        await addLabels(pullNumber, [
          {
            name: config.copilotReadyLabel,
            color: config.copilotReadyColor,
            description: 'Copilot review completed with no open comments.',
          },
        ])
      }
    } else if (alreadyOnPr.has(config.copilotReadyLabel)) {
      core.info(`Removing label from PR: ${config.copilotReadyLabel}`)
      await octokit.rest.issues.removeLabel({
        owner: context.repo.owner,
        repo: context.repo.repo,
        issue_number: pullNumber,
        name: config.copilotReadyLabel,
      })
    }
  }
}
