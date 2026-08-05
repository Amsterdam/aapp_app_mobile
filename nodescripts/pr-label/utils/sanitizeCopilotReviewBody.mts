import {
  DETAILS_CLOSE_TAG,
  DETAILS_OPEN_TAG,
  REVIEWED_CHANGES_HEADING,
} from '../constants.mts'

export const sanitizeCopilotReviewBody = (reviewBody: string): string => {
  const reviewLines = reviewBody.replaceAll('\r\n', '\n').split('\n')
  const reviewedChangesLineIndex = reviewLines.findIndex(
    line =>
      line.trim().toLowerCase() === REVIEWED_CHANGES_HEADING.toLowerCase(),
  )
  const linesBeforeReviewedChanges =
    reviewedChangesLineIndex === -1
      ? reviewLines
      : reviewLines.slice(0, reviewedChangesLineIndex)

  const sanitizedLines: string[] = []
  let isInsideDetailsBlock = false

  for (const line of linesBeforeReviewedChanges) {
    const trimmedLine = line.trim()
    const isOpeningDetailsTag = trimmedLine === DETAILS_OPEN_TAG
    const isClosingDetailsTag = trimmedLine === DETAILS_CLOSE_TAG

    if (isOpeningDetailsTag) {
      isInsideDetailsBlock = true
    }

    if (isClosingDetailsTag) {
      isInsideDetailsBlock = false
    }

    if (!isOpeningDetailsTag && !isClosingDetailsTag && !isInsideDetailsBlock) {
      sanitizedLines.push(line)
    }
  }

  return sanitizedLines.join('\n').trim()
}