const {TSESTree} = require('@typescript-eslint/utils')

const messages = {
  preferCoercedAnd:
    'Prefer a coerced logical AND expression over a ternary that returns null in JSX.',
}

/**
 * @param {import('@typescript-eslint/types').TSESTree.Expression} node
 */
const requiresParenthesesAfterDoubleBang = node =>
  ![
    TSESTree.AST_NODE_TYPES.Identifier,
    TSESTree.AST_NODE_TYPES.MemberExpression,
    TSESTree.AST_NODE_TYPES.CallExpression,
    TSESTree.AST_NODE_TYPES.ChainExpression,
    TSESTree.AST_NODE_TYPES.ThisExpression,
    TSESTree.AST_NODE_TYPES.Literal,
  ].includes(node.type)

/**
 * @param {import('@typescript-eslint/types').TSESTree.Expression} node
 */
const requiresParenthesesAsAndRightOperand = node =>
  node.type === TSESTree.AST_NODE_TYPES.ConditionalExpression

// @ts-check
/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  name: 'jsx-prefer-coerced-and-over-null-ternary',
  meta: {
    docs: {
      description:
        'Prefer coerced logical AND in JSX over a ternary expression returning null',
      recommended: 'error',
    },
    fixable: 'code',
    type: 'suggestion',
    messages,
  },

  create: context => {
    const {sourceCode} = context

    /**
     * @param {import('@typescript-eslint/types').TSESTree.Expression} expression
     */
    const isNullLiteral = expression =>
      expression.type === TSESTree.AST_NODE_TYPES.Literal &&
      expression.value === null

    /**
     * @param {string} sourceText
     */
    const isWrappedInParentheses = sourceText => {
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
        } else if (character === ')') {
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

    /**
     * @param {import('@typescript-eslint/types').TSESTree.Node | undefined} node
     */
    const isInsideJsxAttribute = node => {
      let currentNode = node

      while (currentNode) {
        if (currentNode.type === TSESTree.AST_NODE_TYPES.JSXAttribute) {
          return true
        }

        currentNode = currentNode.parent
      }

      return false
    }

    /**
     * @param {import('@typescript-eslint/types').TSESTree.JSXExpressionContainer} node
     */
    const checkJSXExpression = node => {
      if (isInsideJsxAttribute(node.parent)) {
        return
      }

      if (
        node.expression.type !== TSESTree.AST_NODE_TYPES.ConditionalExpression
      ) {
        return
      }

      if (!isNullLiteral(node.expression.alternate)) {
        return
      }

      context.report({
        node: node.expression,
        messageId: 'preferCoercedAnd',
        fix: fixer => {
          const testSourceText = sourceCode.getText(node.expression.test)
          const consequentSourceText = sourceCode.getText(
            node.expression.consequent,
          )
          const shouldPreserveLogicalAndTest =
            node.expression.test.type ===
              TSESTree.AST_NODE_TYPES.LogicalExpression &&
            node.expression.test.operator === '&&'
          const coercedCondition = shouldPreserveLogicalAndTest
            ? testSourceText
            : requiresParenthesesAfterDoubleBang(node.expression.test)
              ? `!!(${testSourceText})`
              : `!!${testSourceText}`
          const andRightOperand = requiresParenthesesAsAndRightOperand(
            node.expression.consequent,
          )
            ? isWrappedInParentheses(consequentSourceText)
              ? consequentSourceText
              : `(${consequentSourceText})`
            : consequentSourceText

          return fixer.replaceText(
            node.expression,
            `${coercedCondition} && ${andRightOperand}`,
          )
        },
      })
    }

    return {
      JSXExpressionContainer: checkJSXExpression,
    }
  },
}
