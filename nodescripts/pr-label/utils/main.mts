import * as core from '@actions/core'

import {
  MODULE_LABEL_PREFIX,
  MODULE_LABEL_COLOR,
  GENERAL_LABEL_COLOR,
  COPILOT_READY_LABEL,
  COPILOT_READY_LABEL_COLOR,
  REVIEWED_LABEL,
  REVIEWED_LABEL_COLOR,
} from '../constants.mts'
import {addLabels} from './addLabels.mts'
import {getChangedFiles} from './getChangedFiles.mts'
import {getLabelsAlreadyOnPullRequest} from './getLabelsAlreadyOnPullRequest.mts'
import {getOpenCopilotReviewComments} from './getOpenCopilotReviewComments.mts'
import {getPullRequestNumber} from './getPullRequestNumber.mts'
import {getReviews} from './getReviews.mts'
import {getTouchedGeneralLabels} from './getTouchedGeneralLabels.mts'
import {getTouchedModuleNames} from './getTouchedModuleNames.mts'
import {hasTeamReview} from './hasTeamReview.mts'
import {isCopilotLogin} from './isCopilotLogin.mts'
import {octokit, context} from './octokit.mts'
import {updatePRText} from './updatePRText.mts'

export const main = async () => {
  const pullNumber = getPullRequestNumber()
  const changedFiles = await getChangedFiles(pullNumber)

  const alreadyOnPr = await getLabelsAlreadyOnPullRequest(pullNumber)

  core.info(`Changed files: ${changedFiles.join(', ')}`)

  const moduleNames = getTouchedModuleNames(changedFiles)

  if (moduleNames.length === 0) {
    core.info(
      'No changes detected under src/modules/*; skipping module labels.',
    )
  } else {
    const labelsToAdd = moduleNames
      .map(name => `${MODULE_LABEL_PREFIX}${name}`)
      .filter(label => !alreadyOnPr.has(label))

    await addLabels(
      pullNumber,
      labelsToAdd,
      MODULE_LABEL_COLOR,
      'Module touched based on changed src/modules folder(s).',
    )
  }

  const generalNames = getTouchedGeneralLabels(changedFiles)

  if (generalNames.length === 0) {
    core.info(
      'No changes detected in pipelines/, .github/*, android/, ios/, or dependency lockfiles; skipping general labels.',
    )
  } else {
    const labelsToAdd = generalNames.filter(label => !alreadyOnPr.has(label))

    await addLabels(
      pullNumber,
      labelsToAdd,
      GENERAL_LABEL_COLOR,
      'Auto-added label, based on modified files.',
    )
  }

  const openCopilotReviewComments =
    await getOpenCopilotReviewComments(pullNumber)

  const reviews = await getReviews(pullNumber)
  const firstCopilotReview = reviews.find(review =>
    isCopilotLogin(review.user?.login),
  )

  await updatePRText(pullNumber, firstCopilotReview)
  const isReviewedByCopilot = !!firstCopilotReview
  const isReviewedByTeam = hasTeamReview(reviews)

  if (isReviewedByCopilot && openCopilotReviewComments === 0) {
    if (!alreadyOnPr.has(COPILOT_READY_LABEL)) {
      core.info(`Adding labels to PR: ${COPILOT_READY_LABEL}`)
      await addLabels(
        pullNumber,
        [COPILOT_READY_LABEL],
        COPILOT_READY_LABEL_COLOR,
        'Copilot review completed with no open comments.',
      )
    }
  } else if (alreadyOnPr.has(COPILOT_READY_LABEL)) {
    core.info(`Removing label from PR: ${COPILOT_READY_LABEL}`)
    await octokit.rest.issues.removeLabel({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: pullNumber,
      name: COPILOT_READY_LABEL,
    })
  }

  if (isReviewedByTeam) {
    core.info('PR has been reviewed by a team member.')

    if (!alreadyOnPr.has(REVIEWED_LABEL)) {
      await addLabels(
        pullNumber,
        [REVIEWED_LABEL],
        REVIEWED_LABEL_COLOR,
        'PR has been reviewed by a team member.',
      )
    }
  } else if (alreadyOnPr.has(REVIEWED_LABEL)) {
    await octokit.rest.issues.removeLabel({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: pullNumber,
      name: REVIEWED_LABEL,
    })
  }
}
