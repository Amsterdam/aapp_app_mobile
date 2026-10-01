import {TSESTree} from '@typescript-eslint/utils'
import {createRule} from './utils/createRule.mts'

const messages = {
  noNavigationHooksInScreens:
    'Derive the properties returned from {{hook}} directly from the Screen component.',
}

const TRIGGER_HOOKS = new Set(['useRoute', 'useNavigation'])
const SCREEN_FILE_EXTENSION = '.screen.tsx'
const TRIGGER_HOOK_REGEX = new RegExp(
  String.raw`\b(?:${[...TRIGGER_HOOKS].join('|')})\b`,
)

export const rule = createRule({
  name: 'no-navigation-hooks-in-screens',
  meta: {
    docs: {
      description:
        'Derive route- and navigation related properties from the Screen component directly rather than from hooks.',
    },
    messages,
    type: 'suggestion',
    schema: [],
    defaultOptions: [],
  },
  create: context => {
    const filename = context.physicalFilename ?? context.filename

    if (!filename.endsWith(SCREEN_FILE_EXTENSION)) {
      return {}
    }

    const checkNode = (expression: TSESTree.Expression) => {
      if (
        expression.type === TSESTree.AST_NODE_TYPES.CallExpression &&
        expression.callee.type === TSESTree.AST_NODE_TYPES.Identifier &&
        TRIGGER_HOOKS.has(expression.callee.name)
      ) {
        context.report({
          messageId: 'noNavigationHooksInScreens',
          data: {hook: expression.callee.name},
          node: expression.callee.parent,
        })
      }
    }

    return {
      ImportDeclaration: (node: TSESTree.ImportDeclaration) => {
        const [source] = TRIGGER_HOOK_REGEX.exec(node.source.value) ?? []

        if (source) {
          context.report({
            messageId: 'noNavigationHooksInScreens',
            data: {hook: source},
            node,
          })
        }
      },
      ExpressionStatement: ({expression}) => checkNode(expression),
      CallExpression: expression => checkNode(expression),
    }
  },
})
