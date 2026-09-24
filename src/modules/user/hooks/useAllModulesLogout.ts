import {useCallback} from 'react'
import type {ModuleSlug} from '@/modules/generated/slugs.generated'
import type {ModuleClientConfig} from '@/modules/types'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useStore} from '@/hooks/redux/useStore'
import {clientModules} from '@/modules/modules'

export const useAllModulesLogout = () => {
  const store = useStore()
  const dispatch = useDispatch()

  return useCallback(() => {
    const modulesWithLogout = clientModules.filter(
      (
        module,
      ): module is Omit<ModuleClientConfig, 'logout'> & {
        logout: NonNullable<ModuleClientConfig['logout']>
      } => 'logout' in module && module.logout !== undefined,
    )

    return Promise.all(
      modulesWithLogout.map(
        module =>
          new Promise<{error?: Error; module: ModuleSlug; ok: boolean}>(
            resolve =>
              module
                .logout(dispatch, store.getState())
                // eslint-disable-next-line sonarjs/no-nested-functions
                .then(ok => resolve({ok, module: module.slug}))
                // eslint-disable-next-line sonarjs/no-nested-functions
                .catch(error =>
                  resolve({
                    ok: false,
                    module: module.slug,
                    error:
                      error instanceof Error ? error : new Error(String(error)),
                  }),
                ),
          ),
      ),
    )
  }, [dispatch, store])
}
