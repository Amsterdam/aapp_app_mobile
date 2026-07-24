import {TSESTree} from '@typescript-eslint/utils'
import {createRule} from './utils/createRule.mts'
import type {NoOptions} from './utils/noOptions'

const messages = {
  noSpreading: 'Explicit spreading is forbidden',
}

type MessageIds = keyof typeof messages
type SpreadableProperty = TSESTree.Property & {
  computed: false
  key: TSESTree.Identifier
  value: TSESTree.Identifier
}

const isSpreadableProperty = (
  property: TSESTree.ObjectLiteralElementLike,
): property is SpreadableProperty =>
  property.type === TSESTree.AST_NODE_TYPES.Property &&
  property.computed === false &&
  property.key.type === TSESTree.AST_NODE_TYPES.Identifier &&
  property.value.type === TSESTree.AST_NODE_TYPES.Identifier

export const rule = createRule<NoOptions, MessageIds>({
  name: 'jsx-no-explicit-spread',
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow JSX explicit spreading',
    },
    messages,
    fixable: 'code',
    schema: [],
  },
  defaultOptions: [],
  create: context => ({
    JSXSpreadAttribute: node => {
      if (node.argument.type !== TSESTree.AST_NODE_TYPES.ObjectExpression) {
        return
      }

      if (!node.argument.properties.every(isSpreadableProperty)) {
        return
      }

      const replacement = node.argument.properties
        .map(property => `${property.key.name}={${property.value.name}}`)
        .join(' ')

      context.report({
        node,
        messageId: 'noSpreading',
        fix: fixer => fixer.replaceText(node, replacement),
      })
    },
  }),
})
