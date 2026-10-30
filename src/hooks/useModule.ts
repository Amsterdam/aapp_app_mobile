import {useModules} from '@/hooks/useModules'
import type {ModuleSlug} from '@/modules/generated/slugs.generated'

export const useModule = (moduleSlug: ModuleSlug) => {
  const {enabledModules} = useModules()
  const module = enabledModules?.find(m => m.slug === moduleSlug)

  return module
}
