import {execSync} from 'node:child_process'
import {TSESTree} from '@typescript-eslint/utils'
import {createRule} from './utils/createRule.mts'
import type {NoOptions} from './utils/noOptions'

const messages = {
  todoCommentForCurrentBranchMustBeResolved:
    'Comments containing TODO with the current branch ticket must be resolved and removed from this branch.',
}

type MessageIds = keyof typeof messages

const todoMarker = 'TODO'
const branchTicketPattern = /\bam-\d+\b/gi

type BranchSettings = {
  currentBranchName?: unknown
}

const normalizeTicketCode = (ticketCode: string) => ticketCode.toLowerCase()

const extractTicketCodes = (text: string) =>
  [...text.matchAll(branchTicketPattern)].map(([ticketCode]) =>
    normalizeTicketCode(ticketCode),
  )

const getGitBranchName = () => {
  try {
    // eslint-disable-next-line sonarjs/no-os-command-from-path
    return execSync('git branch --show-current', {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
  } catch {
    return undefined
  }
}

const getBranchNameFromSettings = (settings: BranchSettings) => {
  if (typeof settings.currentBranchName !== 'string') {
    return undefined
  }

  return settings.currentBranchName.trim() || undefined
}

const getEnvironmentVariables = (): NodeJS.ProcessEnv | undefined => {
  const processObject = globalThis.process

  return processObject?.env
}

const getCurrentBranchName = (settings: BranchSettings) => {
  const branchNameFromSettings = getBranchNameFromSettings(settings)

  if (branchNameFromSettings) {
    return branchNameFromSettings
  }

  const environmentVariables = getEnvironmentVariables()
  const branchNameFromEnvironment = [
    environmentVariables?.GITHUB_HEAD_REF,
    environmentVariables?.GITHUB_REF_NAME,
    environmentVariables?.CI_COMMIT_REF_NAME,
    environmentVariables?.BRANCH_NAME,
  ].find(
    (branchName): branchName is string =>
      typeof branchName === 'string' && branchName.trim().length > 0,
  )

  return branchNameFromEnvironment ?? getGitBranchName()
}

const getCurrentBranchTicketCodes = (settings: BranchSettings) => {
  const currentBranchName = getCurrentBranchName(settings)

  return currentBranchName ? extractTicketCodes(currentBranchName) : []
}

const hasTodoForCurrentBranchTicket = (
  comment: TSESTree.Comment,
  currentBranchTicketCodes: string[],
) => {
  const commentText = comment.value.trim()

  if (!commentText.includes(todoMarker)) {
    return false
  }

  const commentTicketCodes = extractTicketCodes(commentText)

  if (commentTicketCodes.length === 0) {
    return false
  }

  return commentTicketCodes.some(commentTicketCode =>
    currentBranchTicketCodes.includes(commentTicketCode),
  )
}

export const rule = createRule<NoOptions, MessageIds>({
  name: 'todo-comment-for-current-branch-must-be-resolved',
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Forbid TODO comments with ticket codes that are present in the current branch name.',
    },
    schema: [],
    messages,
  },
  defaultOptions: [],
  create: context => {
    const currentBranchTicketCodes = getCurrentBranchTicketCodes(
      context.settings,
    )

    return {
      Program: () => {
        for (const comment of context.sourceCode.getAllComments()) {
          if (
            hasTodoForCurrentBranchTicket(comment, currentBranchTicketCodes)
          ) {
            context.report({
              loc: comment.loc,
              messageId: 'todoCommentForCurrentBranchMustBeResolved',
            })
          }
        }
      },
    }
  },
})
