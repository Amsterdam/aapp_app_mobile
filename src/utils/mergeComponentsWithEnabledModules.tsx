import type {ModuleSlug} from '@/modules/generated/slugs.generated'
import type {ComponentType} from 'react'
import {Module} from '@/modules/types'

export type FilterFunction<T extends ComponentType> = (
  slug: ModuleSlug,
  enabledModuleSlugs: Set<ModuleSlug>,
  Component: T,
) => boolean

export const defaultFilterFunction = <T extends ComponentType>(
  slug: ModuleSlug,
  enabledModuleSlugs: Set<ModuleSlug>,
  _Component: T,
) => enabledModuleSlugs?.has(slug) && !!_Component

export const mergeComponentsWithEnabledModules = <T extends ComponentType>(
  components: Partial<Record<ModuleSlug, T>>,
  enabledModules: Module[] = [],
  filter: FilterFunction<T> = defaultFilterFunction,
) => {
  const enabledModuleSlugs = enabledModules?.map(m => m.slug)
  const moduleSlugs = new Set(enabledModuleSlugs)

  return (Object.entries(components) as [ModuleSlug, T][])
    .filter(([slug, Component]) => filter(slug, moduleSlugs, Component))
    .sort(
      ([slugA], [slugB]) =>
        enabledModuleSlugs.indexOf(slugA) - enabledModuleSlugs.indexOf(slugB),
    )
    .map(([slug, Component]: [ModuleSlug, ComponentType]) => (
      <Component key={slug} />
    ))
}
