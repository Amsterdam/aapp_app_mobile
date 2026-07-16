import {ModuleSlug} from '@/modules/generated/slugs.generated'
import {useGetCachedServerModule} from '@/store/slices/modules'

export const useIsModuleActive = (module: ModuleSlug) => {
  const {cachedServerModule, isInactive} = useGetCachedServerModule(module)

  return Boolean(cachedServerModule && !isInactive)
}
