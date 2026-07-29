import {TSESTree} from '@typescript-eslint/utils'
import {createRule} from './utils/createRule.mts'
import type {NoOptions} from './utils/noOptions'

const messages = {
  preferMultilineEslintTestString:
    'Write multiline ESLint test fixture strings as multiline template literals instead of using newline escape sequences.',
}

type MessageIds = keyof typeof messages

const hasStringKey = (property: TSESTree.Property, keyName: string) => {
  if (!property.computed) {
    if (property.key.type === TSESTree.AST_NODE_TYPES.Identifier) {
      return property.key.name === keyName
    }

    if (property.key.type === TSESTree.AST_NODE_TYPES.Literal) {
      return property.key.value === keyName
    }
  }

  return false
}

const isFixtureProperty = (property: TSESTree.Property) =>
  hasStringKey(property, 'code') || hasStringKey(property, 'output')

const isRuleTesterRunCallee = (callee: TSESTree.Expression) => {
  if (callee.type !== TSESTree.AST_NODE_TYPES.MemberExpression) {
    return false
  }

  if (callee.computed) {
    return false
  }

  if (callee.object.type !== TSESTree.AST_NODE_TYPES.Identifier) {
    return false
  }

  return (
    callee.object.name === 'ruleTester' &&
    callee.property.type === TSESTree.AST_NODE_TYPES.Identifier &&
    callee.property.name === 'run'
  )
}

const isSupportedFixtureValue = (
  node: TSESTree.Node,
): node is TSESTree.Literal | TSESTree.TemplateLiteral =>
  node.type === TSESTree.AST_NODE_TYPES.Literal ||
  node.type === TSESTree.AST_NODE_TYPES.TemplateLiteral

const isRuleTesterRunCall = (node: TSESTree.Node | undefined): boolean => {
  let currentNode = node

  while (currentNode) {
    if (
      currentNode.type === TSESTree.AST_NODE_TYPES.CallExpression &&
      isRuleTesterRunCallee(currentNode.callee)
    ) {
      return true
    }

    currentNode = currentNode.parent
  }

  return false
}

const escapeTemplateLiteralText = (text: string) =>
  text.replaceAll('\\', '\\\\').replaceAll('`', '\\`').replaceAll('${', '\\${')

const usesEscapedNewline = (
  node: TSESTree.Literal | TSESTree.TemplateLiteral,
  sourceCode: Readonly<{getText(node: TSESTree.Node): string}>,
) => {
  if (
    node.type === TSESTree.AST_NODE_TYPES.Literal &&
    typeof node.value === 'string'
  ) {
    return (
      node.value.includes('\n') &&
      sourceCode.getText(node).includes(String.raw`\n`)
    )
  }

  if (
    node.type === TSESTree.AST_NODE_TYPES.TemplateLiteral &&
    node.expressions.length === 0
  ) {
    const quasi = node.quasis[0]

    return (
      quasi.value.cooked?.includes('\n') === true &&
      quasi.value.raw.includes(String.raw`\n`)
    )
  }

  return false
}

const buildTemplateLiteral = (text: string) =>
  `\`${escapeTemplateLiteralText(text)}\``

export const rule = createRule<NoOptions, MessageIds>({
  name: 'prefer-multiline-eslint-test-strings',
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Prefer multiline template literals for multiline RuleTester code and output fixtures',
    },
    fixable: 'code',
    schema: [],
    messages,
  },
  defaultOptions: [],
  create: context => ({
    Property: node => {
      if (!isFixtureProperty(node) || !isRuleTesterRunCall(node.parent)) {
        return
      }

      if (!isSupportedFixtureValue(node.value)) {
        return
      }

      if (!usesEscapedNewline(node.value, context.sourceCode)) {
        return
      }

      const multilineText =
        node.value.type === TSESTree.AST_NODE_TYPES.Literal
          ? node.value.value
          : node.value.quasis[0].value.cooked

      if (typeof multilineText !== 'string') {
        return
      }

      context.report({
        node: node.value,
        messageId: 'preferMultilineEslintTestString',
        fix: fixer =>
          fixer.replaceText(node.value, buildTemplateLiteral(multilineText)),
      })
    },
  }),
})
