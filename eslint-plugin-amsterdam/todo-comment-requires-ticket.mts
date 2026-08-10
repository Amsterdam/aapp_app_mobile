import {TSESTree} from '@typescript-eslint/utils'
import {createRule} from './utils/createRule.mts'
import type {NoOptions} from './utils/noOptions'

const messages = {
  todoCommentRequiresTicket:
    'Comments containing TODO must also include a ticket number in the form AM-123 or am-123.',
}

type MessageIds = keyof typeof messages

const todoMarker = 'TODO'
const ticketPattern = /\b(?:AM|am)-\d+\b/

const hasTodoWithoutTicket = (comment: TSESTree.Comment) => {
  const commentText = comment.value.trim()

  return commentText.includes(todoMarker) && !ticketPattern.test(commentText)
}

export const rule = createRule<NoOptions, MessageIds>({
  name: 'todo-comment-requires-ticket',
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Require TODO comments to include a ticket number in the form AM-123 or am-123',
    },
    schema: [],
    messages,
  },
  defaultOptions: [],
  create: context => ({
    Program: () => {
      for (const comment of context.sourceCode.getAllComments()) {
        if (!hasTodoWithoutTicket(comment)) {
          continue
        }

        context.report({
          loc: comment.loc,
          messageId: 'todoCommentRequiresTicket',
        })
      }
    },
  }),
})
