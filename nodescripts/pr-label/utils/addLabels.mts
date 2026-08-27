import * as core from '@actions/core'

import {ensureRepoLabelExists} from './ensureRepoLabelExists.mts'
import {octokit, context} from './octokit.mts'
import type {Label} from './types'

export const addLabels = async (pullNumber: number, labels: Label[]) => {
  if (labels.length === 0) {
    core.info('No new labels to add.')
  } else {
    const labelNames = labels.map(label => label.name)

    core.info(`Ensuring labels exist: ${labelNames.join(', ')}`)

    for (const {name, color, description} of labels) {
      await ensureRepoLabelExists(
        name,
        color,
        description ?? 'Auto-added label, based on modified files.',
      )
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
