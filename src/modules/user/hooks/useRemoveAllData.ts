import {useState, useCallback} from 'react'
import {Alert} from 'react-native'
import type {ModuleServerConfig} from '@/modules/types'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useStore} from '@/hooks/redux/useStore'
import {ModuleSlug} from '@/modules/generated/slugs.generated'
import {allModules, clientModules} from '@/modules/modules'
import {useAllModulesLogout} from '@/modules/user/hooks/useAllModulesLogout'
import {UserRouteName} from '@/modules/user/routes'
import {baseApi} from '@/services/baseApi'
import {useUnregisterDeviceMutation} from '@/services/deviceRegistration.service'
import {persistor} from '@/store/persistor'
import {selectCachedServerModules} from '@/store/slices/modules'
import {baseFunctionalitySlicesConfig} from '@/store/store'
import {ReduxKey} from '@/store/types/reduxKey'
import {removeAllSecureItems} from '@/utils/secureStorage'

const SECURE_ITEMS_REMOVAL_ERROR =
  'Verwijderen van opgeslagen wachtwoorden en toegangscodes'

const findModuleTitle = (
  slug: ModuleSlug,
  cachedServerModules: ModuleServerConfig[],
) =>
  cachedServerModules?.find(module => module.moduleSlug === slug)?.title ?? slug

export const useRemoveAllData = () => {
  const [isRemoving, setIsRemoving] = useState(false)
  const navigation = useNavigation()
  const [unregisterDevice] = useUnregisterDeviceMutation()
  const dispatch = useDispatch()
  const allModulesLogout = useAllModulesLogout()
  const store = useStore()

  const removeAllData = useCallback(async () => {
    const state = store.getState()
    const cachedServerModules = selectCachedServerModules(state) ?? []

    const moduleSlugsWithLogoutError = (await allModulesLogout())
      .filter(module => !module.ok)
      .map(module => module.module)

    const hasLogoutErrors = moduleSlugsWithLogoutError.length > 0

    const logoutErrors = moduleSlugsWithLogoutError.map(slug => {
      const moduleName = findModuleTitle(slug, cachedServerModules)

      return `Uitloggen bij ${moduleName}`
    })

    const moduleSlugsWithUnregisterError = (
      await Promise.all(
        clientModules.map(async module =>
          module.unregister?.(dispatch, state).then(result => {
            if (result) {
              return undefined
            } else {
              return module.slug
            }
          }),
        ),
      )
    ).filter((slug): slug is ModuleSlug => !!slug)

    const moduleSlugsWithErrors = new Set([
      ...moduleSlugsWithLogoutError,
      ...moduleSlugsWithUnregisterError,
    ])
    const hasModulesWithErrors = moduleSlugsWithErrors.size > 0

    const unregisterErrors = moduleSlugsWithUnregisterError.map(slug => {
      const moduleName = findModuleTitle(slug, cachedServerModules)

      return `Verwijderen van gegevens bij ${moduleName}`
    })

    const otherErrors = [
      await unregisterDevice()
        .unwrap()
        .then(() => undefined)
        .catch(() => 'Afmelden voor meldingen'),
      !hasLogoutErrors
        ? await removeAllSecureItems()
            .then(() => undefined)
            .catch(() => SECURE_ITEMS_REMOVAL_ERROR)
        : SECURE_ITEMS_REMOVAL_ERROR,
    ]

    allModules.forEach(module => {
      if (!moduleSlugsWithErrors.has(module.slug)) {
        module.reduxConfigs?.forEach(config =>
          dispatch(config.slice.actions.reset()),
        )
      }
    })
    baseFunctionalitySlicesConfig.forEach(config => {
      if (
        hasModulesWithErrors &&
        [
          ReduxKey.modules, // this slice is kept to be able to show the modules name upon retry
          ReduxKey.environment, // this slice is kept to stay on the same environment, so a retry is still possible
        ].includes(config.key)
      ) {
        return
      }

      dispatch(config.slice.actions.reset())
    })

    const errors = [
      ...logoutErrors,
      ...unregisterErrors,
      ...otherErrors,
    ].filter(Boolean)

    dispatch(baseApi.util.resetApiState())

    // make sure the persisted state is up to date with all the resets, so no unintended data remains
    await persistor.flush()

    setIsRemoving(false)
    navigation.getParent()?.reset({
      routes: [
        {
          name: ModuleSlug.user,
          params: {
            screen: UserRouteName.removeAllDataResult,
            params: {
              success: errors.length === 0,
              errors,
            },
          },
        },
      ],
    })
  }, [allModulesLogout, dispatch, navigation, store, unregisterDevice])
  const requestRemoveAllData = useCallback(() => {
    setIsRemoving(true)
    Alert.alert(
      'Weet u zeker?',
      'Als u doorgaat, verwijderen we uw persoonlijke instellingen.',
      [
        {
          text: 'Annuleren',
          style: 'cancel',
          onPress: () => {
            setIsRemoving(false)
          },
        },
        {
          text: 'Verwijderen',
          style: 'destructive',
          onPress: () => {
            void removeAllData()
          },
        },
      ],
      {cancelable: true, onDismiss: () => setIsRemoving(false)},
    )
  }, [removeAllData])

  return {
    isRemoving,
    requestRemoveAllData,
  }
}
