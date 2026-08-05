import * as core from '@actions/core'

import {context} from './octokit.mts'

export const getPullRequestNumber = (): number => {
  const pullRequest = context.payload.pull_request

  if (!pullRequest) {
    core.setFailed('No pull request found in GitHub context.')
    process.exit(1)
  }

  return pullRequest.number
}
