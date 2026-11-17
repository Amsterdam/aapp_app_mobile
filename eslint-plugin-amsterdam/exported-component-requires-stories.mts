import fileSystem from 'node:fs'
import path from 'node:path'
import {TSESTree} from '@typescript-eslint/utils'
import {createRule} from './utils/createRule.mts'

const messages = {
  missingStoriesFile:
    'Add a stories file for component "{{name}}" in "{{storyFile}}".',
}

type Options = []
type MessageIds = keyof typeof messages

const isPascalCaseComponentName = (name: string): boolean => /^[A-Z]/.test(name)

const hasJSXInExpression = (node: TSESTree.Node | null): boolean => {
  if (!node) {
    return false
  }

  switch (node.type) {
    case TSESTree.AST_NODE_TYPES.JSXElement:
    case TSESTree.AST_NODE_TYPES.JSXFragment:
      return true
    case TSESTree.AST_NODE_TYPES.ConditionalExpression:
      return (
        hasJSXInExpression(node.consequent) ||
        hasJSXInExpression(node.alternate)
      )
    case TSESTree.AST_NODE_TYPES.LogicalExpression:
      return hasJSXInExpression(node.left) || hasJSXInExpression(node.right)
    case TSESTree.AST_NODE_TYPES.SequenceExpression:
      return node.expressions.some(hasJSXInExpression)
    case TSESTree.AST_NODE_TYPES.TSAsExpression:
    case TSESTree.AST_NODE_TYPES.TSSatisfiesExpression:
    case TSESTree.AST_NODE_TYPES.TSTypeAssertion:
    case TSESTree.AST_NODE_TYPES.TSNonNullExpression:
      return hasJSXInExpression(node.expression)
    default:
      return false
  }
}

const hasJSXInReturnedStatement = (node: TSESTree.Statement): boolean => {
  switch (node.type) {
    case TSESTree.AST_NODE_TYPES.ReturnStatement:
      return hasJSXInExpression(node.argument)
    case TSESTree.AST_NODE_TYPES.BlockStatement:
      return node.body.some(hasJSXInReturnedStatement)
    case TSESTree.AST_NODE_TYPES.IfStatement:
      return (
        hasJSXInReturnedStatement(node.consequent) ||
        (node.alternate !== null && hasJSXInReturnedStatement(node.alternate))
      )
    case TSESTree.AST_NODE_TYPES.SwitchStatement:
      return node.cases.some(switchCase =>
        switchCase.consequent.some(hasJSXInReturnedStatement),
      )
    case TSESTree.AST_NODE_TYPES.TryStatement:
      return (
        hasJSXInReturnedStatement(node.block) ||
        (node.handler !== null &&
          hasJSXInReturnedStatement(node.handler.body)) ||
        (node.finalizer !== null && hasJSXInReturnedStatement(node.finalizer))
      )
    case TSESTree.AST_NODE_TYPES.DoWhileStatement:
    case TSESTree.AST_NODE_TYPES.ForInStatement:
    case TSESTree.AST_NODE_TYPES.ForOfStatement:
    case TSESTree.AST_NODE_TYPES.ForStatement:
    case TSESTree.AST_NODE_TYPES.WhileStatement:
      return hasJSXInReturnedStatement(node.body)
    case TSESTree.AST_NODE_TYPES.LabeledStatement:
      return hasJSXInReturnedStatement(node.body)
    default:
      return false
  }
}

const functionReturnsJSX = (
  functionExpression:
    | TSESTree.ArrowFunctionExpression
    | TSESTree.FunctionExpression,
): boolean =>
  functionExpression.body.type === TSESTree.AST_NODE_TYPES.BlockStatement
    ? functionExpression.body.body.some(hasJSXInReturnedStatement)
    : hasJSXInExpression(functionExpression.body)

const isMemoCall = (callExpression: TSESTree.CallExpression): boolean => {
  const {callee} = callExpression

  return (
    (callee.type === TSESTree.AST_NODE_TYPES.Identifier &&
      callee.name === 'memo') ||
    (callee.type === TSESTree.AST_NODE_TYPES.MemberExpression &&
      !callee.computed &&
      callee.object.type === TSESTree.AST_NODE_TYPES.Identifier &&
      callee.object.name === 'React' &&
      callee.property.type === TSESTree.AST_NODE_TYPES.Identifier &&
      callee.property.name === 'memo')
  )
}

const componentReturnsJSX = (
  node: TSESTree.Node | null | undefined,
): boolean => {
  if (
    node?.type === TSESTree.AST_NODE_TYPES.ArrowFunctionExpression ||
    node?.type === TSESTree.AST_NODE_TYPES.FunctionExpression
  ) {
    return functionReturnsJSX(node)
  }

  return (
    node?.type === TSESTree.AST_NODE_TYPES.CallExpression &&
    isMemoCall(node) &&
    componentReturnsJSX(node.arguments[0])
  )
}

export const rule = createRule<Options, MessageIds>({
  name: 'exported-component-requires-stories',
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Require a stories file for exported components that return JSX.',
    },
    schema: [],
    messages,
    defaultOptions: [],
  },
  create: context => {
    const filename = context.physicalFilename ?? context.filename

    if (!filename.endsWith('.tsx') || filename.endsWith('.stories.tsx')) {
      return {}
    }

    const storyFilePath = path.join(
      path.dirname(filename),
      `${path.basename(filename, '.tsx')}.stories.tsx`,
    )

    if (fileSystem.existsSync(storyFilePath)) {
      return {}
    }

    return {
      ExportNamedDeclaration: node => {
        if (
          node.declaration?.type !== TSESTree.AST_NODE_TYPES.VariableDeclaration
        ) {
          return
        }

        for (const variableDeclarator of node.declaration.declarations) {
          if (
            variableDeclarator.id.type !== TSESTree.AST_NODE_TYPES.Identifier ||
            !isPascalCaseComponentName(variableDeclarator.id.name) ||
            !componentReturnsJSX(variableDeclarator.init)
          ) {
            continue
          }

          context.report({
            node: variableDeclarator.id,
            messageId: 'missingStoriesFile',
            data: {
              name: variableDeclarator.id.name,
              storyFile: path.basename(storyFilePath),
            },
          })
        }
      },
    }
  },
})
