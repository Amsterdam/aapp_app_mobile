import * as core from '@actions/core'

import {HTTP_STATUS_UNPROCESSABLE_ENTITY} from '../constants.mts'
import {octokit, context} from './octokit.mts'

export const ensureRepoLabelExists = async (
  labelName: string,
  color: string,
  description: string,
) => {
  try {
    await octokit.rest.issues.createLabel({
      owner: context.repo.owner,
      repo: context.repo.repo,
      name: labelName,
      color,
      description,
    })
    core.info(`Created missing label: ${labelName}`)
  } catch (e: unknown) {
    const status = (e as {status?: number})?.status

    // 422 = already exists / validation error
    if (status === HTTP_STATUS_UNPROCESSABLE_ENTITY) {
      return
    }

    throw e
  }
}