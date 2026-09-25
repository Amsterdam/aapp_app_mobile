import {TSESTree} from '@typescript-eslint/utils'
import {createRule} from './utils/createRule.mts'
import type {NoOptions} from './utils/noOptions'

const messages = {
  mixedAsyncStyles:
    'This {{currentStyle}} usage is mixed with {{otherStyles}} in the same block. Prefer a single async style per block.',
}

type MessageIds = keyof typeof messages
type AsyncStyle = 'async/await' | 'Promise constructor' | 'promise chaining'

const asyncStyleOrder: AsyncStyle[] = [
  'async/await',
  'Promise constructor',
  'promise chaining',
]

type AsyncUsage = {
  reportNode: TSESTree.Node
  style: AsyncStyle
}

type TrackedScope = {
  usages: AsyncUsage[]
}

const promiseChainingMethods = new Set(['then', 'catch', 'finally'])

const isTrackedBlockStatement = (node: TSESTree.BlockStatement) =>
  node.parent?.type === TSESTree.AST_NODE_TYPES.FunctionDeclaration ||
  node.parent?.type === TSESTree.AST_NODE_TYPES.FunctionExpression ||
  node.parent?.type === TSESTree.AST_NODE_TYPES.ArrowFunctionExpression

const formatStyles = (styles: AsyncStyle[]) => {
  if (styles.length === 1) {
    return styles[0]
  }

  if (styles.length === 2) {
    return `${styles[0]} and ${styles[1]}`
  }

  return `${styles.slice(0, -1).join(', ')}, and ${styles.at(-1)}`
}

const sortAsyncStyles = (styles: AsyncStyle[]) =>
  [...styles].sort(
    (leftStyle, rightStyle) =>
      asyncStyleOrder.indexOf(leftStyle) - asyncStyleOrder.indexOf(rightStyle),
  )

// eslint-disable-next-line sonarjs/cognitive-complexity
const getAsyncUsage = (node: TSESTree.Node): AsyncUsage | null => {
  if (node.type === TSESTree.AST_NODE_TYPES.AwaitExpression) {
    return {
      reportNode: node,
      style: 'async/await',
    }
  }

  if (node.type === TSESTree.AST_NODE_TYPES.NewExpression) {
    const isPromiseConstructor =
      node.callee.type === TSESTree.AST_NODE_TYPES.Identifier &&
      node.callee.name === 'Promise'

    if (!isPromiseConstructor) {
      return null
    }

    const isDirectlyAwaited =
      node.parent?.type === TSESTree.AST_NODE_TYPES.AwaitExpression &&
      node.parent.argument === node

    if (isDirectlyAwaited) {
      return null
    }

    return {
      reportNode: node.callee,
      style: 'Promise constructor',
    }
  }

  if (node.type === TSESTree.AST_NODE_TYPES.CallExpression) {
    if (node.callee.type !== TSESTree.AST_NODE_TYPES.MemberExpression) {
      return null
    }

    if (node.callee.computed) {
      return null
    }

    if (node.callee.property.type !== TSESTree.AST_NODE_TYPES.Identifier) {
      return null
    }

    if (!promiseChainingMethods.has(node.callee.property.name)) {
      return null
    }

    return {
      reportNode: node.callee.property,
      style: 'promise chaining',
    }
  }

  return null
}

export const rule = createRule<NoOptions, MessageIds>({
  name: 'no-mixed-async-styles',
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Warn when a block mixes async/await, Promise constructors, and promise chaining',
    },
    schema: [],
    messages,
  },
  defaultOptions: [],
  create: context => {
    const scopeStack: TrackedScope[] = []

    const reportMixedAsyncStyles = (usages: AsyncUsage[]) => {
      const styles = sortAsyncStyles([
        ...new Set(usages.map(({style}) => style)),
      ])

      if (styles.length < 2) {
        return
      }

      for (const usage of usages) {
        const otherStyles = styles.filter(style => style !== usage.style)

        context.report({
          node: usage.reportNode,
          messageId: 'mixedAsyncStyles',
          data: {
            currentStyle: usage.style,
            otherStyles: formatStyles(otherStyles),
          },
        })
      }
    }

    const enterTrackedScope = () => {
      scopeStack.push({usages: []})
    }

    const exitTrackedScope = () => {
      const trackedScope = scopeStack.pop()

      if (trackedScope === undefined) {
        return
      }

      reportMixedAsyncStyles(trackedScope.usages)
    }

    const trackAsyncUsage = (node: TSESTree.Node) => {
      const trackedScope = scopeStack.at(-1)

      if (trackedScope === undefined) {
        return
      }

      const asyncUsage = getAsyncUsage(node)

      if (asyncUsage === null) {
        return
      }

      trackedScope.usages.push(asyncUsage)
    }

    return {
      Program: enterTrackedScope,
      'Program:exit': exitTrackedScope,
      BlockStatement: node => {
        if (isTrackedBlockStatement(node)) {
          enterTrackedScope()
        }
      },
      'BlockStatement:exit': node => {
        if (isTrackedBlockStatement(node)) {
          exitTrackedScope()
        }
      },
      AwaitExpression: trackAsyncUsage,
      CallExpression: trackAsyncUsage,
      NewExpression: trackAsyncUsage,
    }
  },
})
