import * as core from '@actions/core'

import {addLabels} from './addLabels.mts'
import {checkCodeReviewed} from './checkCodeReviewed.mts'
import {checkCopilotReady} from './checkCopilotReady.mts'
import {getChangedFiles} from './getChangedFiles.mts'
import {getLabelsAlreadyOnPullRequest} from './getLabelsAlreadyOnPullRequest.mts'
import {getPullRequestNumber} from './getPullRequestNumber.mts'
import {getReviews} from './getReviews.mts'
import {getTouchedFilesLabels} from './getTouchedFilesLabels.mts'
import {isCopilotLogin} from './isCopilotLogin.mts'
import {updatePRText} from './updatePRText.mts'
import type {PackageConfig} from './config.mts'

export const main = async (config: Required<PackageConfig>) => {
  const pullNumber = getPullRequestNumber()
  const changedFiles = await getChangedFiles(pullNumber)

  const alreadyOnPr = await getLabelsAlreadyOnPullRequest(pullNumber)

  core.info(`Changed files: ${changedFiles.join(', ')}`)

  const touchFilesLabels = getTouchedFilesLabels(changedFiles, config)

  await addLabels(pullNumber, touchFilesLabels)

  const reviews = await getReviews(pullNumber)
  const firstCopilotReview = reviews.find(review =>
    isCopilotLogin(review.user?.login, config),
  )

  await updatePRText(pullNumber, firstCopilotReview, config)

  await checkCopilotReady(firstCopilotReview, pullNumber, alreadyOnPr, config)
  await checkCodeReviewed(reviews, pullNumber, alreadyOnPr, config)
}
