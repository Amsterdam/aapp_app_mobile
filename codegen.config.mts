import type {CodeGenConfig} from './nodescripts/codegen/types.mts'
import type {Dirent} from 'node:fs'

const inputDir = 'src/modules'
const defaultResultImports = ['import { ModuleSlug } from "@/modules/slugs";']
const defaultSatisfies = 'Partial<Record<ModuleSlug, React.ComponentType>>'
const moduleBasedResultFunction = (
  path: Dirent<string>,
  name: string,
): string => `[ModuleSlug["${path.name}"]]: ${name}`

export const config: CodeGenConfig = [
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
    match: 'PreRenderComponent.tsx',
    output: 'src/modules/generated/preRenderComponents.generated.ts',
    imports: [
      {
        import: 'PreRenderComponent',
        exportName: 'preRenderComponents',
        optional: true,
        result: 'objectFunction',
        resultFunction: moduleBasedResultFunction,
        resultImports: defaultResultImports,
        satisfies: defaultSatisfies,
      },
    ],
  },
  {
    inputDir,
    match: 'PostRenderComponent.tsx',
    output: 'src/modules/generated/postRenderComponents.generated.ts',
    imports: [
      {
        import: 'PostRenderComponent',
        exportName: 'postRenderComponents',
        optional: true,
        result: 'objectFunction',
        resultFunction: moduleBasedResultFunction,
        resultImports: defaultResultImports,
        satisfies: defaultSatisfies,
      },
    ],
  },
  {
    inputDir,
    match: 'HeaderComponent.tsx',
    output: 'src/modules/generated/headerComponents.generated.ts',
    imports: [
      {
        import: 'HeaderComponent',
        exportName: 'headerComponents',
        optional: true,
        result: 'objectFunction',
        resultFunction: moduleBasedResultFunction,
        resultImports: defaultResultImports,
        satisfies: defaultSatisfies,
      },
    ],
  },
  {
    inputDir,
    match: 'ActionButton.tsx',
    output: 'src/modules/generated/actionButtons.generated.ts',
    imports: [
      {
        import: 'ActionButton',
        exportName: 'actionButtons',
        optional: true,
        result: 'objectFunction',
        resultFunction: moduleBasedResultFunction,
        resultImports: defaultResultImports,
        satisfies: defaultSatisfies,
      },
    ],
  },
  {
    inputDir,
    match: 'useIsLoggedIn.ts',
    output: 'src/modules/generated/useIsLoggedIn.generated.ts',
    imports: [
      {
        import: 'useIsLoggedIn',
        exportName: 'useIsLoggedIn',
        optional: true,
        result: 'objectFunction',
        resultFunction: moduleBasedResultFunction,
        resultImports: defaultResultImports,
        satisfies:
          'Partial<Record<ModuleSlug, () => {isLoading?: boolean; isLoggedIn: boolean, refetch?: () => void}>>',
      },
    ],
  },
  {
    inputDir,
    match: 'Account.tsx',
    output: 'src/modules/generated/account.generated.ts',
    imports: [
      {
        import: 'Account',
        exportName: 'Account',
        optional: true,
        result: 'objectFunction',
        resultFunction: moduleBasedResultFunction,
        resultImports: defaultResultImports,
        satisfies: defaultSatisfies,
      },
    ],
  },
]
