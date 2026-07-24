import {TSESTree} from '@typescript-eslint/utils'
import {createRule} from './utils/createRule.mts'
import type {NoOptions} from './utils/noOptions'

const messages = {
  conditionErrorFalsey:
    'Potentially falsey value in logical AND expression. Please use boolean cast (!!).',
}

type MessageIds = keyof typeof messages

export const rule = createRule<NoOptions, MessageIds>({
  name: 'jsx-strict-logical-expression',
  meta: {
    type: 'problem',
    docs: {
      description: 'Forbid non-boolean falsey values in inline expressions',
    },
    fixable: 'code',
    messages,
    schema: [],
  },
  defaultOptions: [],

  create: context => {
    const reportIdentifier = (
      node: TSESTree.Identifier,
      fixNode: TSESTree.Expression,
    ) => {
      context.report({
        node,
        messageId: 'conditionErrorFalsey',
        fix: fixer => fixer.insertTextBefore(fixNode, '!!'),
      })
    }

    const checkLogicalExpression = (
      expressionNode: TSESTree.LogicalExpression,
      checkRightNode: boolean,
    ) => {
      let leftNode = expressionNode.left

      if (
        leftNode.type === TSESTree.AST_NODE_TYPES.MemberExpression &&
        leftNode.property.type !== TSESTree.AST_NODE_TYPES.PrivateIdentifier
      ) {
        leftNode = leftNode.property
      }

      if (leftNode.type === TSESTree.AST_NODE_TYPES.LogicalExpression) {
        checkLogicalExpression(leftNode, true)

        return
      }

      if (leftNode.type === TSESTree.AST_NODE_TYPES.Identifier) {
        reportIdentifier(leftNode, expressionNode.left)
      }

      if (checkRightNode) {
        let rightNode = expressionNode.right

        if (
          rightNode.type === TSESTree.AST_NODE_TYPES.MemberExpression &&
          rightNode.property.type !== TSESTree.AST_NODE_TYPES.PrivateIdentifier
        ) {
          rightNode = rightNode.property
        }

        if (rightNode.type === TSESTree.AST_NODE_TYPES.Identifier) {
          reportIdentifier(rightNode, expressionNode.right)
        }
      }
    }

    const checkJSXExpression = (node: TSESTree.JSXExpressionContainer) => {
      if (
        node.expression.type === TSESTree.AST_NODE_TYPES.LogicalExpression &&
        node.expression.operator === '&&'
      ) {
        checkLogicalExpression(node.expression, false)
      }
    }

    return {
      JSXExpressionContainer: checkJSXExpression,
    }
  },
})
