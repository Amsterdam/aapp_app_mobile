import type {ModuleSlug} from '@/modules/generated/slugs.generated'
import type {ComponentType} from 'react'
import {preRenderComponents} from '@/modules/generated/preRenderComponents.generated'
import {Module} from '@/modules/types'
import {mergeComponentsWithEnabledModules} from '@/utils/mergeComponentsWithEnabledModules'

type Props = {
  enabledModules?: Module[]
}

/**
 * Renders all PreRenderComponents, which are components for preprocessing purposes at the app's root level.
 * If `renderBeforeServerModules` is true, the component will be rendered before the server modules are fetched.
 */
export const PreRenderComponents = ({enabledModules}: Props) =>
  mergeComponentsWithEnabledModules(
    preRenderComponents,
    undefined,
    (
      slug: ModuleSlug,
      enabledModuleSlugs: Set<ModuleSlug>,
      Component: ComponentType & {renderBeforeServerModules?: boolean},
    ) =>
      (enabledModules
        ? enabledModuleSlugs.has(slug)
        : (Component?.renderBeforeServerModules ?? false)) && !!Component,
  )
