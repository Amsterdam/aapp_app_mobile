import {TSESTree} from '@typescript-eslint/utils'
import {createRule} from './utils/createRule.mts'

const messages = {
  noHooksInScreens:
    'Derive the properties returned from {{hook}} directly from the Screen component.',
}

const TRIGGER_HOOKS = new Set(['useRoute', 'useNavigation'])
const SCREEN_FILE_EXTENSION = '.screen.tsx'
const TRIGGER_HOOK_REGEX = new RegExp(
  String.raw`\b(?:${[...TRIGGER_HOOKS].join('|')})\b`,
)

const isExpressionWithBody = (
  expression: TSESTree.Expression | null,
): expression is
  | TSESTree.ArrowFunctionExpressionWithBlockBody
  | TSESTree.ArrowFunctionExpressionWithExpressionBody
  | TSESTree.FunctionExpression =>
  !!expression &&
  [
    TSESTree.AST_NODE_TYPES.ArrowFunctionExpression,
    TSESTree.AST_NODE_TYPES.FunctionExpression,
    TSESTree.AST_NODE_TYPES.FunctionDeclaration,
  ].includes(expression.type)

const extractExpressionBlockStatements = (
  node: TSESTree.ExportNamedDeclaration,
): TSESTree.Statement[] => {
  if (
    node.declaration?.type !== TSESTree.AST_NODE_TYPES.VariableDeclaration &&
    node.declaration?.type !== TSESTree.AST_NODE_TYPES.FunctionDeclaration
  ) {
    return []
  }

  if (node.declaration.type === TSESTree.AST_NODE_TYPES.VariableDeclaration) {
    const expression = node.declaration.declarations[0].init

    if (!expression || !isExpressionWithBody(expression)) {
      return []
    }

    const {body} =
      expression.body.type === TSESTree.AST_NODE_TYPES.BlockStatement
        ? expression.body
        : {body: []}

    return body
  }

  return node.declaration.body.body
}

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
  },
  create: context => {
    const filename = context.physicalFilename ?? context.filename

    if (!filename.endsWith(SCREEN_FILE_EXTENSION)) {
      return {}
    }

    return {
      ImportDeclaration: (node: TSESTree.ImportDeclaration) => {
        const [source] =
          new RegExp(TRIGGER_HOOK_REGEX).exec(node.source.value) ?? []

        if (source) {
          context.report({
            messageId: 'noHooksInScreens',
            data: {hook: source},
            node,
          })
        }
      },
      ExportNamedDeclaration: (node: TSESTree.ExportNamedDeclaration) => {
        const body = extractExpressionBlockStatements(node)

        for (const statement of body) {
          if (statement.type !== TSESTree.AST_NODE_TYPES.VariableDeclaration) {
            continue
          }

          statement.declarations.forEach(declaration => {
            if (
              declaration.init?.type !==
                TSESTree.AST_NODE_TYPES.CallExpression ||
              declaration.init?.callee.type !==
                TSESTree.AST_NODE_TYPES.Identifier
            ) {
              return
            }

            if (TRIGGER_HOOKS.has(declaration.init.callee.name)) {
              context.report({
                messageId: 'noHooksInScreens',
                data: {hook: declaration.init.callee.name},
                node: declaration.parent,
              })
            }
          })
        }
      },
    }
  },
})
