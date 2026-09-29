import fs from 'node:fs'
import path from 'node:path'
import {TSESLint, TSESTree} from '@typescript-eslint/utils'
import moduleVisitorImport from 'eslint-module-utils/moduleVisitor'
import pkgUpImport from 'eslint-module-utils/pkgUp'
import {createRule} from './utils/createRule.mts'
import type {NoOptions} from './utils/noOptions'
import type {Literal, Node} from 'estree'

type ModuleVisitor = (
  visitor: (source: Node, importer: unknown) => unknown,
  options?: {
    amd?: boolean
    commonjs?: boolean
    esmodule?: boolean
    ignore?: string[]
  },
) => object

type PackageJsonPathLookup = (options?: {cwd?: string}) => string | null

type DefaultExport<TValue> = TValue | {default: TValue}

const messages = {
  noCrossModuleImport:
    'Imports between modules are not allowed (from "{{sourceModuleName}}" to "{{targetModuleName}}")',
}

type MessageIds = keyof typeof messages

const hasDefaultExport = <TValue,>(
  value: unknown,
): value is {default: TValue} =>
  typeof value === 'object' && value !== null && 'default' in value

const resolveDefaultExport = <TValue,>(value: DefaultExport<TValue>): TValue =>
  hasDefaultExport<TValue>(value) ? value.default : value

const moduleVisitor = resolveDefaultExport(
  moduleVisitorImport as unknown as DefaultExport<ModuleVisitor>,
)
const pkgUp = resolveDefaultExport(
  pkgUpImport as unknown as DefaultExport<PackageJsonPathLookup>,
)

const isStringLiteral = (
  source: Node,
): source is Literal & {raw: string; value: string} =>
  source.type === 'Literal' &&
  typeof source.value === 'string' &&
  typeof source.raw === 'string'

const toUnixPath = (value: string): string => value.replaceAll('\\\\', '/')

const getModuleNames = (sourceModulesDirectoryPath: string): Set<string> => {
  if (!fs.existsSync(sourceModulesDirectoryPath)) {
    return new Set()
  }

  const folderNames = fs
    .readdirSync(sourceModulesDirectoryPath)
    .filter(folderName => {
      const folderPath = path.join(sourceModulesDirectoryPath, folderName)

      return (
        fs.existsSync(folderPath) &&
        fs.statSync(folderPath).isDirectory() &&
        fs.existsSync(path.join(folderPath, 'index.ts'))
      )
    })

  return new Set(folderNames)
}

const getSourceModuleName = (
  filePath: string,
  sourceModulesDirectoryPath: string,
  moduleNames: Set<string>,
): string | null => {
  const relativePath = path.relative(sourceModulesDirectoryPath, filePath)

  if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
    return null
  }

  const [possibleModuleName] = relativePath.split(path.sep)

  if (moduleNames.has(possibleModuleName)) {
    return possibleModuleName
  }

  return null
}

const isAllowedModulePublicImport = (
  resolvedImportPath: string,
  sourceModulesDirectoryPath: string,
  targetModuleName: string,
): boolean => {
  const targetModuleDirectoryPath = path.join(
    sourceModulesDirectoryPath,
    targetModuleName,
  )
  const relativeImportPath = path.relative(
    targetModuleDirectoryPath,
    resolvedImportPath,
  )

  if (relativeImportPath.startsWith('..') || path.isAbsolute(relativeImportPath)) {
    return false
  }

  return [
    relativeImportPath === 'exports',
    relativeImportPath.startsWith(`exports${path.sep}`),
    relativeImportPath === 'routes',
    relativeImportPath === 'routes.ts',
    relativeImportPath === 'routes.tsx',
  ].some(Boolean)
}

const resolveImportPath = (
  sourceValue: string,
  sourceFileDirectoryPath: string,
  sourceDirectoryPath: string,
): string | null => {
  if (sourceValue.startsWith('.')) {
    return path.resolve(sourceFileDirectoryPath, sourceValue)
  }

  if (sourceValue.startsWith('@/')) {
    return path.resolve(sourceDirectoryPath, sourceValue.replace('@/',''))
  }

  return null
}

export const rule = createRule<NoOptions, MessageIds>({
  name: 'no-cross-module-import',
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow imports from one module into another module',
    },
    messages,
    schema: [],
  },
  defaultOptions: [],
  create: context =>
    moduleVisitor(
      (source: Node) => {
        if (!isStringLiteral(source)) {
          return
        }

        const currentFilePath = context.physicalFilename ?? context.filename
        const currentFileDirectoryPath = path.dirname(currentFilePath)
        const packageJsonFilePath = pkgUp({cwd: currentFileDirectoryPath})

        if (!packageJsonFilePath) {
          return
        }

        const packageDirectoryPath = path.dirname(packageJsonFilePath)
        const sourceDirectoryPath = path.join(packageDirectoryPath, 'src')
        const sourceModulesDirectoryPath = path.join(sourceDirectoryPath, 'modules')
        const moduleNames = getModuleNames(sourceModulesDirectoryPath)

        const sourceModuleName = getSourceModuleName(
          currentFilePath,
          sourceModulesDirectoryPath,
          moduleNames,
        )

        if (!sourceModuleName) {
          return
        }

        const resolvedImportPath = resolveImportPath(
          source.value,
          currentFileDirectoryPath,
          sourceDirectoryPath,
        )

        if (!resolvedImportPath) {
          return
        }

        const targetModuleName = getSourceModuleName(
          resolvedImportPath,
          sourceModulesDirectoryPath,
          moduleNames,
        )

        if (!targetModuleName || sourceModuleName === targetModuleName) {
          return
        }

        if (
          isAllowedModulePublicImport(
            resolvedImportPath,
            sourceModulesDirectoryPath,
            targetModuleName,
          )
        ) {
          return
        }

        context.report({
          node: source as unknown as TSESTree.StringLiteral,
          messageId: 'noCrossModuleImport',
          data: {
            sourceModuleName: toUnixPath(sourceModuleName),
            targetModuleName: toUnixPath(targetModuleName),
          },
        })
      },
      {commonjs: true},
    ) as TSESLint.RuleListener,
})