import {TSESLint, TSESTree} from '@typescript-eslint/utils'
import {createRule} from './utils/createRule.mts'

const messages = {
  noTypeImportForFunctionComponent:
    'Use a value import for function component "{{name}}".',
}

type Options = []
type MessageIds = keyof typeof messages
type ComponentImportSpecifier =
  | TSESTree.ImportDefaultSpecifier
  | TSESTree.ImportSpecifier
type NamedImportSpecifier = TSESTree.ImportSpecifier
type TrackedImport = {
  declaration: TSESTree.ImportDeclaration
  specifier: ComponentImportSpecifier
}

const getJsxIdentifierName = (
  node: TSESTree.JSXTagNameExpression | null | undefined,
): string | null => {
  if (!node) {
    return null
  }

  if (node.type === TSESTree.AST_NODE_TYPES.JSXIdentifier) {
    return node.name
  }

  if (node.type === TSESTree.AST_NODE_TYPES.JSXMemberExpression) {
    return getJsxIdentifierName(node.object)
  }

  return null
}

const getImportName = (specifier: TSESTree.ImportClause): string | null => {
  if (specifier.type === TSESTree.AST_NODE_TYPES.ImportDefaultSpecifier) {
    return 'default'
  }

  if (specifier.type === TSESTree.AST_NODE_TYPES.ImportSpecifier) {
    return specifier.imported.type === TSESTree.AST_NODE_TYPES.Identifier
      ? specifier.imported.name
      : null
  }

  return null
}

const isTypeOnlyImport = (
  node: TSESTree.ImportDeclaration,
  specifier: TSESTree.ImportClause,
): boolean =>
  node.importKind === 'type' ||
  ('importKind' in specifier && specifier.importKind === 'type')

const isComponentImport = (
  specifier: TSESTree.ImportClause,
): specifier is ComponentImportSpecifier => {
  const importName = getImportName(specifier)

  return (
    (specifier.type === TSESTree.AST_NODE_TYPES.ImportDefaultSpecifier ||
      specifier.type === TSESTree.AST_NODE_TYPES.ImportSpecifier) &&
    Boolean(importName && /^[A-Z]/.test(specifier.local.name))
  )
}

const isNamedImportSpecifier = (
  specifier: TSESTree.ImportClause,
): specifier is NamedImportSpecifier =>
  specifier.type === TSESTree.AST_NODE_TYPES.ImportSpecifier

const renderImportSpecifier = (
  specifier: ComponentImportSpecifier | NamedImportSpecifier,
  sourceCode: Readonly<TSESLint.SourceCode>,
  isTypeOnly = false,
): string => {
  if (specifier.type === TSESTree.AST_NODE_TYPES.ImportDefaultSpecifier) {
    return specifier.local.name
  }

  const importedName = sourceCode.getText(specifier.imported)
  const renderedImportName =
    importedName === specifier.local.name
      ? importedName
      : `${importedName} as ${specifier.local.name}`

  return isTypeOnly ? `type ${renderedImportName}` : renderedImportName
}

const buildImportDeclaration = (
  specifiers: readonly TSESTree.ImportClause[],
  sourceText: string,
  importKind: 'type' | 'value',
  sourceCode: Readonly<TSESLint.SourceCode>,
  typeOnlySpecifiers: readonly NamedImportSpecifier[] = [],
): string => {
  const defaultSpecifier = specifiers.find(
    specifier =>
      specifier.type === TSESTree.AST_NODE_TYPES.ImportDefaultSpecifier,
  )
  const namedSpecifiers = specifiers.filter(isNamedImportSpecifier)
  const clauses: string[] = []
  const typeOnlySpecifierSet = new Set(typeOnlySpecifiers)

  if (defaultSpecifier) {
    clauses.push(defaultSpecifier.local.name)
  }

  if (namedSpecifiers.length > 0) {
    clauses.push(
      `{${namedSpecifiers
        .map(specifier =>
          renderImportSpecifier(
            specifier,
            sourceCode,
            typeOnlySpecifierSet.has(specifier),
          ),
        )
        .join(', ')}}`,
    )
  }

  const importPrefix = importKind === 'type' ? 'import type ' : 'import '

  return `${importPrefix}${clauses.join(', ')} from ${sourceText}`
}

const createFix = (
  fixer: TSESLint.RuleFixer,
  declaration: TSESTree.ImportDeclaration,
  offendingSpecifiers: readonly ComponentImportSpecifier[],
  sourceCode: Readonly<TSESLint.SourceCode>,
): TSESLint.RuleFix | TSESLint.RuleFix[] | null => {
  if (offendingSpecifiers.length === 0) {
    return null
  }

  if (declaration.importKind !== 'type') {
    return offendingSpecifiers.map(specifier =>
      fixer.replaceText(
        specifier,
        renderImportSpecifier(specifier, sourceCode),
      ),
    )
  }

  const offendingNamedSpecifiers = new Set(
    offendingSpecifiers.filter(isNamedImportSpecifier),
  )
  const remainingSpecifiers: NamedImportSpecifier[] =
    declaration.specifiers.filter(
      (specifier): specifier is NamedImportSpecifier =>
        isNamedImportSpecifier(specifier) &&
        !offendingNamedSpecifiers.has(specifier),
    )
  const sourceText = sourceCode.getText(declaration.source)

  if (remainingSpecifiers.length === 0) {
    return fixer.replaceText(
      declaration,
      buildImportDeclaration(
        offendingSpecifiers,
        sourceText,
        'value',
        sourceCode,
      ),
    )
  }

  return fixer.replaceText(
    declaration,
    buildImportDeclaration(
      [...offendingSpecifiers, ...remainingSpecifiers],
      sourceText,
      'value',
      sourceCode,
      remainingSpecifiers,
    ),
  )
}

export const rule = createRule<Options, MessageIds>({
  name: 'no-type-import-for-function-component',
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow type-only imports for JSX components that are used as values',
    },
    fixable: 'code',
    messages,
    schema: [],
  },
  defaultOptions: [],

  create: context => {
    const sourceCode = context.sourceCode
    const typeOnlyComponentImports = new Map<string, TrackedImport>()
    const usedComponentNames = new Set<string>()

    const markTypeOnlyComponentUsage = (node: TSESTree.JSXOpeningElement) => {
      const componentName = getJsxIdentifierName(node.name)

      if (!componentName || !typeOnlyComponentImports.has(componentName)) {
        return
      }

      usedComponentNames.add(componentName)
    }

    return {
      ImportDeclaration: (node: TSESTree.ImportDeclaration) => {
        for (const specifier of node.specifiers) {
          if (
            !isTypeOnlyImport(node, specifier) ||
            !isComponentImport(specifier)
          ) {
            continue
          }

          typeOnlyComponentImports.set(specifier.local.name, {
            declaration: node,
            specifier,
          })
        }
      },
      JSXOpeningElement: markTypeOnlyComponentUsage,
      'Program:exit': () => {
        const offendingImportsByDeclaration = new Map<
          TSESTree.ImportDeclaration,
          ComponentImportSpecifier[]
        >()

        for (const componentName of usedComponentNames) {
          const trackedImport = typeOnlyComponentImports.get(componentName)

          if (!trackedImport) {
            continue
          }

          const declarationSpecifiers =
            offendingImportsByDeclaration.get(trackedImport.declaration) ?? []

          declarationSpecifiers.push(trackedImport.specifier)
          offendingImportsByDeclaration.set(
            trackedImport.declaration,
            declarationSpecifiers,
          )
        }

        for (const [
          declaration,
          offendingSpecifiers,
        ] of offendingImportsByDeclaration) {
          for (const specifier of offendingSpecifiers) {
            context.report({
              node: specifier,
              messageId: 'noTypeImportForFunctionComponent',
              data: {name: specifier.local.name},
              fix: fixer =>
                createFix(fixer, declaration, offendingSpecifiers, sourceCode),
            })
          }
        }
      },
    }
  },
})
