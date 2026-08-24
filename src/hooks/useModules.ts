import {useMemo} from 'react'
import {useSelector} from '@/hooks/redux/useSelector'
import {useAppState} from '@/hooks/useAppState'
import {clientModules} from '@/modules/modules'
import {postProcessModules} from '@/modules/utils/modules'
import {useGetReleaseQuery} from '@/services/modules.service'
import {
  selectAuthorizedModules,
  selectCachedServerModules,
  selectDisabledModules,
} from '@/store/slices/modules'

/**
 * Handles the request for the server-side module configuration and returns various postprocessed lists of modules, not including core modules. It also returns the modules disabled by the user, plus the loading/error state of the endpoint and a refetch method.
 */
export const useModules = () => {
  const {
    data: release,
    error,
    isLoading,
    isSuccess,
    refetch,
  } = useGetReleaseQuery()
  const serverModules = release?.modules
  const userDisabledModulesBySlug = useSelector(selectDisabledModules)
  const authorizedModulesBySlug = useSelector(
    selectAuthorizedModules,
    (a: string[], b: string[]) =>
      a.length === b.length &&
      a.every((value: string, index) => value === b[index]),
  )
  const cachedServerModules = useSelector(selectCachedServerModules)
  const postProcessedModules = useMemo(() => {
    if (!serverModules) {
      if (cachedServerModules) {
        return postProcessModules(
          clientModules,
          userDisabledModulesBySlug,
          authorizedModulesBySlug,
          cachedServerModules,
        )
      }

      return
    }

    return postProcessModules(
      clientModules,
      userDisabledModulesBySlug,
      authorizedModulesBySlug,
      serverModules,
    )
  }, [
    serverModules,
    userDisabledModulesBySlug,
    authorizedModulesBySlug,
    cachedServerModules,
  ])

  useAppState({
    onForeground: () => {
      void refetch()
    },
  })

  // This prevents the situation where an empty modules array is returned when isLoading is false.
  // TODO We should fix this later by handling the async nature of requests in a better way.
  const modulesLoading =
    isLoading ||
    (isSuccess && postProcessedModules?.allModulesDangerous.length === 0)

  return {
    userDisabledModulesBySlug,
    modulesLoading,
    modulesError: error,
    refetchModules: refetch,
    ...postProcessedModules,
  }
}
