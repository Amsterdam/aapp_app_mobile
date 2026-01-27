import type {Dirent} from 'node:fs'
import type {CodeGenConfig} from 'nodescripts/codegen/types.mts'

const inputDir = 'src/modules'
const defaultResultImports = ['import { ModuleSlug } from "@/modules/slugs";']
const defaultSatisfies = 'Partial<Record<ModuleSlug, React.ComponentType>>'
const moduleBasedResult = (path: Dirent<string>, name: string): string =>
  `[ModuleSlug["${path.name}"]]: ${name}`

export const capitalizeString = (s: string) =>
  s ? s.charAt(0).toUpperCase() + s.slice(1) : ''

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
        result: moduleBasedResult,
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
        result: moduleBasedResult,
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
        result: moduleBasedResult,
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
        result: moduleBasedResult,
        resultImports: defaultResultImports,
        satisfies: defaultSatisfies,
      },
    ],
  },
  {
    inputDir: 'assets/images/map',
    match: '\\.png$',
    type: 'file',
    output: 'src/components/features/map/marker/markers.generated.ts',
    imports: [
      {
        import: 'none',
        exportName: 'MARKER_IMAGES',
        optional: true,
        resultImports: [
          'import { MarkerVariant } from "@/components/features/map/marker/markers";',
        ],
        satisfies: 'Record<MarkerVariant, {uri: string}>',
        result: (path: Dirent<string>): string => {
          const file = path.name.replace(/\.png$/, '')
          const markerVariant = file.replaceAll(/_([a-z])/g, p =>
            capitalizeString(p[1]),
          )

          return `[MarkerVariant["${markerVariant}"]]: {uri: '${file}'}`
        },
      },
    ],
  },
]
