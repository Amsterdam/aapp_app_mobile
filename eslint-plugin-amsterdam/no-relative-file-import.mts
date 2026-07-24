import path from 'node:path'
import {TSESLint, TSESTree} from '@typescript-eslint/utils'
import moduleVisitorImport from 'eslint-module-utils/moduleVisitor'
import pkgUpImport from 'eslint-module-utils/pkgUp'
import {createRule} from './utils/createRule.mts'
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

type Options = []

const messages = {
  noRelativeFileImport: 'No relative file import',
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

export const rule = createRule<Options, MessageIds>({
  name: 'no-relative-file-import',
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow relative file imports',
    },
    messages,
    fixable: 'code',
    schema: [],
  },
  defaultOptions: [],
  create: context =>
    moduleVisitor(
      (source: Node) => {
        if (!isStringLiteral(source)) {
          return
        }

        const filename = context.physicalFilename ?? context.filename
        const fileDir = path.dirname(filename)
        const filePath = path.join(fileDir, source.value)
        const packageJsonFilePath = pkgUp({cwd: fileDir})

        if (!packageJsonFilePath) {
          return
        }

        const packageJsonPath = path.dirname(packageJsonFilePath)
        const result = filePath.replace(packageJsonPath + '/src', '@')

        if (source.value.startsWith('.') && result.startsWith('@')) {
          const literalSource = source as unknown as TSESTree.StringLiteral

          context.report({
            node: literalSource,
            messageId: 'noRelativeFileImport',
            fix: fixer =>
              fixer.replaceText(
                literalSource,
                source.raw.replace(source.value, result),
              ),
          })
        }
      },
      {commonjs: true},
    ) as TSESLint.RuleListener,
})
