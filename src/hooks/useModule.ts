import type {ModuleSlug} from '@/modules/slugs'
import {useModules} from '@/hooks/useModules'

export const useModule = (moduleSlug: ModuleSlug) => {
  const {enabledModules} = useModules()
  const module = enabledModules?.find(m => m.slug === moduleSlug)

  return module
}
