import type {CodeGenConfig} from './nodescripts/codegen/types.mts'
import type {Dirent} from 'node:fs'

const inputDir = 'src/modules'
const defaultResultImports = ['import { ModuleSlug } from "@/modules/slugs";']
const defaultSatisfies = 'Partial<Record<ModuleSlug, React.ComponentType>>'
const moduleBasedResult = (path: Dirent<string>, name: string): string =>
  `[ModuleSlug["${path.name}"]]: ${name}`
const excludedModuleDirectories = ['generated', 'utils']
const generateModuleSlugs = (directories: Dirent<string>[]) => `export enum ModuleSlug {
${directories
  .map(directory => `  '${directory.name}' = '${directory.name}',`)
  .join('\n')}
}
`

export const config: CodeGenConfig = [
  {
    type: 'directories',
    inputDir,
    output: 'src/modules/slugs.ts',
    excludeDirectories: excludedModuleDirectories,
    result: generateModuleSlugs,
  },
  {
    inputDir,
    match: 'screenConfig.ts',
    output: 'src/modules/generated/modals.generated.ts',
    imports: [
      {
        import: 'modals',
        exportName: 'modals',
        optional: true,
        result: 'spreadObject',
      },
    ],
  },
  {
    inputDir,
    match: 'Stack.tsx',
    output: 'src/modules/generated/stacks.generated.ts',
    imports: [
      {
        import: 'ModuleStack',
        exportName: 'stacks',
        optional: false,
        result: moduleBasedResult,
        resultImports: defaultResultImports,
        satisfies: 'Record<ModuleSlug, React.ComponentType>',
      },
    ],
  },
  {
    inputDir,
    match: 'routes.ts',
    output: 'src/modules/generated/moduleStackParams.generated.ts',
    imports: [
      {
        import: 'ModuleStackParams',
        exportName: 'ModuleStackParams',
        optional: false,
        result: 'typeIntersection',
      },
    ],
  },
  {
    inputDir,
    match: 'routes.ts',
    output: 'src/modules/generated/moduleModalParams.generated.ts',
    imports: [
      {
        import: 'ModuleModalParams',
        exportName: 'ModalParams',
        optional: true,
        result: 'typeIntersection',
      },
    ],
  },
  {
    inputDir,
    match: 'components/PreRenderComponent.tsx',
    output: 'src/modules/generated/preRenderComponents.generated.ts',
    imports: [
      {
        import: 'PreRenderComponent',
        exportName: 'preRenderComponents',
        optional: true,
        result: moduleBasedResult,
        resultImports: defaultResultImports,
        satisfies: defaultSatisfies,
      },
    ],
  },
  {
    inputDir,
    match: 'components/PostRenderComponent.tsx',
    output: 'src/modules/generated/postRenderComponents.generated.ts',
    imports: [
      {
        import: 'PostRenderComponent',
        exportName: 'postRenderComponents',
        optional: true,
        result: moduleBasedResult,
        resultImports: defaultResultImports,
        satisfies: defaultSatisfies,
      },
    ],
  },
  {
    inputDir,
    match: 'components/HeaderComponent.tsx',
    output: 'src/modules/generated/headerComponents.generated.ts',
    imports: [
      {
        import: 'HeaderComponent',
        exportName: 'headerComponents',
        optional: true,
        result: moduleBasedResult,
        resultImports: defaultResultImports,
        satisfies: defaultSatisfies,
      },
    ],
  },
  {
    inputDir,
    match: 'components/ActionButton.tsx',
    output: 'src/modules/generated/actionButtons.generated.ts',
    imports: [
      {
        import: 'ActionButton',
        exportName: 'actionButtons',
        optional: true,
        result: moduleBasedResult,
        resultImports: defaultResultImports,
        satisfies: defaultSatisfies,
      },
    ],
  },
  {
    inputDir,
    match: 'hooks/useIsLoggedIn.ts',
    output: 'src/modules/generated/useIsLoggedIn.generated.ts',
    imports: [
      {
        import: 'useIsLoggedIn',
        exportName: 'useIsLoggedIn',
        optional: true,
        result: moduleBasedResult,
        resultImports: defaultResultImports,
        satisfies:
          'Partial<Record<ModuleSlug, () => {isLoading?: boolean; isLoggedIn: boolean, refetch?: () => void}>>',
      },
    ],
  },
  {
    inputDir,
    match: 'components/Account.tsx',
    output: 'src/modules/generated/account.generated.ts',
    imports: [
      {
        import: 'Account',
        exportName: 'Account',
        optional: true,
        result: moduleBasedResult,
        resultImports: defaultResultImports,
        satisfies: defaultSatisfies,
      },
    ],
  },
  {
    inputDir,
    match: 'components/ModuleIcon.tsx',
    output: 'src/modules/generated/moduleIcons.generated.ts',
    imports: [
      {
        import: 'ModuleIcon',
        exportName: 'moduleIcons',
        optional: true,
        result: moduleBasedResult,
        resultImports: defaultResultImports,
        satisfies: defaultSatisfies,
      },
    ],
  },
  {
    inputDir,
    match: 'index.ts',
    output: 'src/modules/generated/clientModules.generated.ts',
    imports: [
      {
        import: 'clientModule',
        exportName: 'clientModules',
        optional: true,
        result: 'array',
      },
    ],
  },
  {
    inputDir,
    match: 'index.ts',
    output: 'src/modules/generated/coreModules.generated.ts',
    imports: [
      {
        import: 'coreModule',
        exportName: 'coreModules',
        optional: true,
        result: 'array',
      },
    ],
  },
]
