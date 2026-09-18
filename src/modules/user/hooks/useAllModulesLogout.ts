import {useCallback} from 'react'
import type {ModuleSlug} from '@/modules/generated/slugs.generated'
import type {ModuleClientConfig} from '@/modules/types'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useStore} from '@/hooks/redux/useStore'
import {useIsLoggedIn} from '@/modules/generated/useIsLoggedIn.generated'
import {clientModules} from '@/modules/modules'

export const useAllModulesLogout = () => {
  const store = useStore()
  const dispatch = useDispatch()

  const loggedInModules = (Object.keys(useIsLoggedIn) as ModuleSlug[])
    .map(slug => clientModules.find(module => module.slug === slug))
    .filter((module): module is ModuleClientConfig => {
      if (!!module && 'slug' in module) {
        const {isLoggedIn} = useIsLoggedIn[
          module.slug as keyof typeof useIsLoggedIn
        ]?.() ?? {isLoggedIn: false}

        return isLoggedIn
      }

      return false
    })

  return useCallback(
    () =>
      Promise.all(
        loggedInModules.map(
          module =>
            new Promise<{error?: Error; module: ModuleSlug; ok: boolean}>(
              resolve => {
                if (!module.logout) {
                  return resolve({ok: true, module: module.slug})
                }

                return (
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
                          error instanceof Error
                            ? error
                            : new Error(String(error)),
                      }),
                    )
                )
              },
            ),
        ),
      ),
    [dispatch, store, loggedInModules],
  )
}
