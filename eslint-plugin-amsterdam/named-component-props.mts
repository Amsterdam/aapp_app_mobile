import {TSESLint, TSESTree} from '@typescript-eslint/utils'
import {createRule} from './utils/createRule.mts'

const messages = {
  noCombinedTypeForComponentProps:
    'Use a single named props type for component "{{name}}" instead of an inline or combined type annotation.',
}

type Options = []
type MessageIds = keyof typeof messages
type DisallowedComponentPropsType =
  | TSESTree.TSIntersectionType
  | TSESTree.TSUnionType
  | TSESTree.TSTypeLiteral
type FunctionLikeComponentNode =
  | TSESTree.ArrowFunctionExpression
  | TSESTree.FunctionDeclaration
  | TSESTree.FunctionExpression
type ReportTarget = FunctionLikeComponentNode | TSESTree.VariableDeclarator
type TypeNameDeclaration =
  | TSESTree.TSInterfaceDeclaration
  | TSESTree.TSTypeAliasDeclaration
type ComponentDeclarationNode =
  | TSESTree.ExportDefaultDeclaration
  | TSESTree.ExportNamedDeclaration
  | TSESTree.FunctionDeclaration
  | TSESTree.VariableDeclaration

const reactFunctionComponentTypeNames = new Set(['FC', 'FunctionComponent'])

const isDisallowedComponentPropsType = (
  node: TSESTree.TypeNode | undefined,
): node is DisallowedComponentPropsType =>
  node?.type === TSESTree.AST_NODE_TYPES.TSIntersectionType ||
  node?.type === TSESTree.AST_NODE_TYPES.TSUnionType ||
  node?.type === TSESTree.AST_NODE_TYPES.TSTypeLiteral

const isComponentName = (name: string): boolean => /^[A-Z]/.test(name)

const isScopeBoundary = (
  node: TSESTree.Node | undefined,
): node is TSESTree.Program | TSESTree.BlockStatement =>
  node?.type === TSESTree.AST_NODE_TYPES.Program ||
  node?.type === TSESTree.AST_NODE_TYPES.BlockStatement

const isExportDeclaration = (
  node: TSESTree.Node | undefined,
): node is
  | TSESTree.ExportDefaultDeclaration
  | TSESTree.ExportNamedDeclaration =>
  node?.type === TSESTree.AST_NODE_TYPES.ExportDefaultDeclaration ||
  node?.type === TSESTree.AST_NODE_TYPES.ExportNamedDeclaration

const isTypeNameDeclaration = (
  node: TSESTree.Node,
): node is TypeNameDeclaration =>
  node.type === TSESTree.AST_NODE_TYPES.TSInterfaceDeclaration ||
  node.type === TSESTree.AST_NODE_TYPES.TSTypeAliasDeclaration

const getTypeDeclarationName = (node: TSESTree.Node): string | null => {
  if (isTypeNameDeclaration(node)) {
    return node.id.name
  }

  if (isExportDeclaration(node) && node.declaration) {
    return isTypeNameDeclaration(node.declaration)
      ? node.declaration.id.name
      : null
  }

  return null
}

const scopeHasTypeWithName = (
  boundaryNode: TSESTree.Program | TSESTree.BlockStatement,
  typeName: string,
): boolean =>
  boundaryNode.body.some(
    statement => getTypeDeclarationName(statement) === typeName,
  )

const getPropsTypeName = (
  boundaryNode: TSESTree.Program | TSESTree.BlockStatement,
  componentName: string,
  isExportedComponent: boolean,
): string | null => {
  if (isExportedComponent && !scopeHasTypeWithName(boundaryNode, 'Props')) {
    return 'Props'
  }

  const componentPropsTypeName = `${componentName}Props`

  return scopeHasTypeWithName(boundaryNode, componentPropsTypeName)
    ? null
    : componentPropsTypeName
}

const isReactFunctionComponentReference = (
  node: TSESTree.TSTypeReference,
): boolean => {
  if (node.typeName.type === TSESTree.AST_NODE_TYPES.Identifier) {
    return reactFunctionComponentTypeNames.has(node.typeName.name)
  }

  if (node.typeName.type === TSESTree.AST_NODE_TYPES.ThisExpression) {
    return false
  }

  return (
    node.typeName.left.type === TSESTree.AST_NODE_TYPES.Identifier &&
    node.typeName.left.name === 'React' &&
    reactFunctionComponentTypeNames.has(node.typeName.right.name)
  )
}

const getComponentNameFromFunction = (
  node: FunctionLikeComponentNode,
): string | null => {
  if (node.type === TSESTree.AST_NODE_TYPES.FunctionDeclaration && node.id) {
    return isComponentName(node.id.name) ? node.id.name : null
  }

  if (
    node.parent?.type === TSESTree.AST_NODE_TYPES.VariableDeclarator &&
    node.parent.id.type === TSESTree.AST_NODE_TYPES.Identifier &&
    isComponentName(node.parent.id.name)
  ) {
    return node.parent.id.name
  }

  return null
}

const hasTypeAnnotation = (
  node: TSESTree.Parameter,
): node is Exclude<TSESTree.Parameter, TSESTree.TSParameterProperty> & {
  typeAnnotation: TSESTree.TSTypeAnnotation
} => 'typeAnnotation' in node && node.typeAnnotation != null

const getComponentDeclarationNode = (
  node: ReportTarget,
): ComponentDeclarationNode | null => {
  if (node.type === TSESTree.AST_NODE_TYPES.FunctionDeclaration) {
    return isExportDeclaration(node.parent) ? node.parent : node
  }

  const variableDeclarator =
    node.type === TSESTree.AST_NODE_TYPES.VariableDeclarator
      ? node
      : node.parent?.type === TSESTree.AST_NODE_TYPES.VariableDeclarator
        ? node.parent
        : null

  if (
    !variableDeclarator ||
    variableDeclarator.parent?.type !==
      TSESTree.AST_NODE_TYPES.VariableDeclaration
  ) {
    return null
  }

  return isExportDeclaration(variableDeclarator.parent.parent)
    ? variableDeclarator.parent.parent
    : variableDeclarator.parent
}

const getDeclarationBoundary = (
  declarationNode: ComponentDeclarationNode,
): TSESTree.Program | TSESTree.BlockStatement | null =>
  isScopeBoundary(declarationNode.parent) ? declarationNode.parent : null

const isExportedComponentDeclaration = (
  declarationNode: ComponentDeclarationNode,
): boolean => isExportDeclaration(declarationNode)

const getIndentation = (node: TSESTree.Node): string =>
  ' '.repeat(node.loc.start.column)

const getInsertionIndex = (
  sourceCode: Readonly<TSESLint.SourceCode>,
  declarationNode: ComponentDeclarationNode,
): number => {
  const leadingComments = sourceCode.getCommentsBefore(declarationNode)

  if (leadingComments.length === 0) {
    return declarationNode.range[0]
  }

  let insertionComment = leadingComments.at(-1)

  if (!insertionComment) {
    return declarationNode.range[0]
  }

  let nextStartLine = declarationNode.loc.start.line

  for (let index = leadingComments.length - 1; index >= 0; index -= 1) {
    const comment = leadingComments[index]

    if (comment.loc.end.line + 1 < nextStartLine) {
      break
    }

    insertionComment = comment
    nextStartLine = comment.loc.start.line
  }

  return insertionComment.range[0]
}

const getTypeParameterDeclaration = (
  targetNode: ReportTarget,
): TSESTree.TSTypeParameterDeclaration | undefined => {
  if ('typeParameters' in targetNode && targetNode.typeParameters) {
    return targetNode.typeParameters
  }

  if (
    targetNode.type === TSESTree.AST_NODE_TYPES.VariableDeclarator &&
    targetNode.init &&
    'typeParameters' in targetNode.init &&
    targetNode.init.typeParameters
  ) {
    return targetNode.init.typeParameters
  }

  return undefined
}

const getTypeParameterDeclarationText = (
  sourceCode: Readonly<TSESLint.SourceCode>,
  targetNode: ReportTarget,
): string => {
  const typeParameterDeclaration = getTypeParameterDeclaration(targetNode)

  return typeParameterDeclaration
    ? sourceCode.getText(typeParameterDeclaration)
    : ''
}

const getTypeParameterUsageText = (targetNode: ReportTarget): string => {
  const typeParameterDeclaration = getTypeParameterDeclaration(targetNode)

  if (
    !typeParameterDeclaration ||
    typeParameterDeclaration.params.length === 0
  ) {
    return ''
  }

  return `<${typeParameterDeclaration.params.map(param => param.name.name).join(', ')}>`
}

const createFix = (
  fixer: TSESLint.RuleFixer,
  sourceCode: Readonly<TSESLint.SourceCode>,
  targetNode: ReportTarget,
  componentName: string,
  propsTypeNode: DisallowedComponentPropsType,
): TSESLint.RuleFix[] | null => {
  const declarationNode = getComponentDeclarationNode(targetNode)

  if (!declarationNode) {
    return null
  }

  const boundaryNode = getDeclarationBoundary(declarationNode)

  if (!boundaryNode) {
    return null
  }

  const propsTypeName = getPropsTypeName(
    boundaryNode,
    componentName,
    isExportedComponentDeclaration(declarationNode),
  )

  if (!propsTypeName) {
    return null
  }

  const indentation = getIndentation(declarationNode)
  const insertionIndex = getInsertionIndex(sourceCode, declarationNode)
  const propsTypeText = sourceCode.getText(propsTypeNode)
  const typeParameterDeclarationText = getTypeParameterDeclarationText(
    sourceCode,
    targetNode,
  )
  const typeParameterUsageText = getTypeParameterUsageText(targetNode)

  return [
    fixer.insertTextBeforeRange(
      [insertionIndex, insertionIndex],
      `${indentation}type ${propsTypeName}${typeParameterDeclarationText} = ${propsTypeText}\n`,
    ),
    fixer.replaceText(
      propsTypeNode,
      `${propsTypeName}${typeParameterUsageText}`,
    ),
  ]
}

const reportIfCombinedPropsAnnotation = (
  node: FunctionLikeComponentNode,
  context: Readonly<
    import('@typescript-eslint/utils').TSESLint.RuleContext<MessageIds, Options>
  >,
): void => {
  const componentName = getComponentNameFromFunction(node)

  if (!componentName) {
    return
  }

  const [propsParameter] = node.params

  if (!propsParameter || !hasTypeAnnotation(propsParameter)) {
    return
  }

  const propsType = propsParameter.typeAnnotation.typeAnnotation

  if (!isDisallowedComponentPropsType(propsType)) {
    return
  }

  context.report({
    node: propsType,
    messageId: 'noCombinedTypeForComponentProps',
    data: {name: componentName},
    fix: fixer =>
      createFix(fixer, context.sourceCode, node, componentName, propsType),
  })
}

const reportIfCombinedReactFunctionComponentProps = (
  node: TSESTree.VariableDeclarator,
  context: Readonly<
    import('@typescript-eslint/utils').TSESLint.RuleContext<MessageIds, Options>
  >,
): void => {
  if (
    node.id.type !== TSESTree.AST_NODE_TYPES.Identifier ||
    !isComponentName(node.id.name) ||
    !node.id.typeAnnotation
  ) {
    return
  }

  const componentName = node.id.name
  const annotatedType = node.id.typeAnnotation.typeAnnotation

  if (
    annotatedType.type !== TSESTree.AST_NODE_TYPES.TSTypeReference ||
    !isReactFunctionComponentReference(annotatedType)
  ) {
    return
  }

  const propsType = annotatedType.typeArguments?.params[0]

  if (!isDisallowedComponentPropsType(propsType)) {
    return
  }

  context.report({
    node: propsType,
    messageId: 'noCombinedTypeForComponentProps',
    data: {name: componentName},
    fix: fixer =>
      createFix(fixer, context.sourceCode, node, componentName, propsType),
  })
}

export const rule = createRule<Options, MessageIds>({
  name: 'named-component-props',
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Disallow inline object, union, or intersection prop type annotations on React component boundaries',
    },
    fixable: 'code',
    messages,
    schema: [],
  },
  defaultOptions: [],
  create: context => ({
    ArrowFunctionExpression: node => {
      reportIfCombinedPropsAnnotation(node, context)
    },
    FunctionDeclaration: node => {
      reportIfCombinedPropsAnnotation(node, context)
    },
    FunctionExpression: node => {
      reportIfCombinedPropsAnnotation(node, context)
    },
    VariableDeclarator: node => {
      reportIfCombinedReactFunctionComponentProps(node, context)
    },
  }),
})
