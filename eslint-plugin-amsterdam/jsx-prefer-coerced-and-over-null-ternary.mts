import {TSESTree} from '@typescript-eslint/utils'
import {createRule} from './utils/createRule.mts'
import type {NoOptions} from './utils/noOptions'

const messages = {
  preferCoercedAnd:
    'Prefer a coerced logical AND expression over a ternary that returns null in JSX.',
}

type MessageIds = keyof typeof messages

const requiresParenthesesAfterDoubleBang = (node: TSESTree.Expression) =>
  ![
    TSESTree.AST_NODE_TYPES.Identifier,
    TSESTree.AST_NODE_TYPES.MemberExpression,
    TSESTree.AST_NODE_TYPES.CallExpression,
    TSESTree.AST_NODE_TYPES.ChainExpression,
    TSESTree.AST_NODE_TYPES.ThisExpression,
    TSESTree.AST_NODE_TYPES.Literal,
  ].includes(node.type)

const requiresParenthesesAsAndRightOperand = (node: TSESTree.Expression) =>
  node.type === TSESTree.AST_NODE_TYPES.ConditionalExpression

export const rule = createRule<NoOptions, MessageIds>({
  name: 'jsx-prefer-coerced-and-over-null-ternary',
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Prefer coerced logical AND in JSX over a ternary expression returning null',
    },
    fixable: 'code',
    messages,
    schema: [],
  },
  defaultOptions: [],

  create: context => {
    const {sourceCode} = context

    const isNullLiteral = (expression: TSESTree.Expression) =>
      expression.type === TSESTree.AST_NODE_TYPES.Literal &&
      expression.value === null

    const isWrappedInParentheses = (sourceText: string) => {
      const trimmedSourceText = sourceText.trim()

      if (
        !trimmedSourceText.startsWith('(') ||
        !trimmedSourceText.endsWith(')')
      ) {
        return false
      }

      let parenthesesDepth = 0

      for (
        let characterIndex = 0;
        characterIndex < trimmedSourceText.length;
        characterIndex += 1
      ) {
        const character = trimmedSourceText[characterIndex]

        if (character === '(') {
          parenthesesDepth += 1
          continue
        }

        if (character === ')') {
          parenthesesDepth -= 1

          // The outer opening parenthesis must only close at the final character.
          if (
            parenthesesDepth === 0 &&
            characterIndex < trimmedSourceText.length - 1
          ) {
            return false
          }

          if (parenthesesDepth < 0) {
            return false
          }
        }
      }

      return parenthesesDepth === 0
    }

    const isInsideJsxAttribute = (node: TSESTree.Node | undefined) => {
      let currentNode = node

      while (currentNode) {
        if (currentNode.type === TSESTree.AST_NODE_TYPES.JSXAttribute) {
          return true
        }

        currentNode = currentNode.parent
      }

      return false
    }

    const checkJSXExpression = (node: TSESTree.JSXExpressionContainer) => {
      if (isInsideJsxAttribute(node.parent)) {
        return
      }

      const expression = node.expression

      if (expression.type !== TSESTree.AST_NODE_TYPES.ConditionalExpression) {
        return
      }

      if (!isNullLiteral(expression.alternate)) {
        return
      }

      context.report({
        node: expression,
        messageId: 'preferCoercedAnd',
        fix: fixer => {
          const testSourceText = sourceCode.getText(expression.test)
          const consequentSourceText = sourceCode.getText(expression.consequent)
          const shouldPreserveLogicalAndTest =
            expression.test.type ===
              TSESTree.AST_NODE_TYPES.LogicalExpression &&
            expression.test.operator === '&&'
          const coercedCondition = shouldPreserveLogicalAndTest
            ? testSourceText
            : requiresParenthesesAfterDoubleBang(expression.test)
              ? `!!(${testSourceText})`
              : `!!${testSourceText}`
          const andRightOperand = requiresParenthesesAsAndRightOperand(
            expression.consequent,
          )
            ? isWrappedInParentheses(consequentSourceText)
              ? consequentSourceText
              : `(${consequentSourceText})`
            : consequentSourceText

          return fixer.replaceText(
            expression,
            `${coercedCondition} && ${andRightOperand}`,
          )
        },
      })
    }

    return {
      JSXExpressionContainer: checkJSXExpression,
    }
  },
})
