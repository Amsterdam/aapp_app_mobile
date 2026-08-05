import * as core from '@actions/core'

import {ensureRepoLabelExists} from './ensureRepoLabelExists.mts'
import {octokit, context} from './octokit.mts'

export const addLabels = async (
  pullNumber: number,
  labelNames: string[],
  color: string,
  description: string,
) => {
  if (labelNames.length === 0) {
    core.info('No new labels to add.')
  } else {
    core.info(`Ensuring labels exist: ${labelNames.join(', ')}`)

    for (const label of labelNames) {
      await ensureRepoLabelExists(label, color, description)
    }

    core.info(`Adding labels to PR: ${labelNames.join(', ')}`)
    await octokit.rest.issues.addLabels({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: pullNumber,
      labels: labelNames,
    })
  }
}