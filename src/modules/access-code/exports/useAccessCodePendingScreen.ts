import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type ComponentProps,
} from 'react'
import type {createStackNavigator} from '@/app/navigation/createStackNavigator'
import type {NavigateTo} from '@/app/navigation/types'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {
  selectPendingScreen,
  setPendingScreen as setSlicePendingScreen,
} from '@/modules/access-code/slice'
import type {ModuleSlug} from '@/modules/generated/slugs.generated'

type ScreenListeners = Pick<
  ComponentProps<ReturnType<typeof createStackNavigator>['Navigator']>,
  'screenListeners'
>

type UseAccessCodePendingScreenReturn = {
  /** Clears the pending screen without navigating to it. */
  clearPendingScreen: () => void
  /**
   * Returns `screenListeners` prop that clears the `pendingScreen` when its screen
   * receives focus. Other focused screens leave the destination unchanged.
   * Spread this prop into the module's navigator; merge `screenListeners`
   * manually if the navigator already defines listeners.
   *
   * @example
   * ```tsx
   * <Stack.Navigator
   *   {...clearPendingScreenOnScreenFocus}
   *   screenOptions={screenOptions}>
   *   {screens}
   * </Stack.Navigator>
   * ```
   */
  clearPendingScreenOnScreenFocus: ScreenListeners
  /** The pending screen where to resume after access-code verification. */
  pendingScreen: NavigateTo | undefined
  /** Stores the pending screen without navigating to it. */
  setPendingScreen: (screen: NavigateTo) => void
}

/**
 * Reads and updates the pending screen to resume after an access-code flow.
 * This hook does not navigate or choose which screen opens.
 *
 * Only the module-root instance should provide `moduleSlug`. That instance
 * clears the destination on `beforeRemove`, except when a `REPLACE` action
 * targets the same module, such as a post-login restart of its access-code flow.
 * Spread the returned focus-listener props into the module's navigator to
 * consume the destination once its screen receives focus.
 *
 * **Other consumers should omit `moduleSlug` to read or update the destination
 * without clearing it when their own screen is removed.**
 *
 * @param moduleSlug The module route to preserve during same-module replacement.
 * Provide it only from the component registered as that module's root screen.
 * @param onClearPendingScreen A stable callback for discarding associated
 * temporary state when the destination is consumed or abandoned.
 */
export const useAccessCodePendingScreen = (
  moduleSlug?: ModuleSlug,
  onClearPendingScreen?: () => void,
): UseAccessCodePendingScreenReturn => {
  const dispatch = useDispatch()
  const pendingScreen = useSelector(selectPendingScreen)
  const navigation = useNavigation()
  const preservePendingScreenOnUnmount = useRef(false)

  const setPendingScreen = useCallback(
    (screen: NavigateTo) => {
      dispatch(setSlicePendingScreen(screen))
    },
    [dispatch],
  )

  const clearPendingScreen = useCallback(() => {
    dispatch(setSlicePendingScreen(undefined))
    onClearPendingScreen?.()
  }, [dispatch, onClearPendingScreen])

  const clearPendingScreenOnScreenFocus = useMemo<ScreenListeners>(
    () => ({
      screenListeners: ({route}) => ({
        focus: () => {
          if (route.name === pendingScreen?.[0].toString()) {
            clearPendingScreen()
          }
        },
      }),
    }),
    [clearPendingScreen, pendingScreen],
  )

  useEffect(() => {
    if (moduleSlug === undefined) {
      return
    }

    preservePendingScreenOnUnmount.current = false

    const unsubscribe = navigation.addListener('beforeRemove', event => {
      const {type, payload} = event.data.action
      const routeName =
        payload && 'name' in payload
          ? (payload.name as string | undefined)
          : undefined

      if (type === 'REPLACE' && routeName === moduleSlug.toString()) {
        // Don't clear the pending screen if the module is being replaced by a fresh instance of itself.”
        preservePendingScreenOnUnmount.current = true

        return
      }

      preservePendingScreenOnUnmount.current = false

      clearPendingScreen()
    })

    return () => {
      unsubscribe()

      if (!preservePendingScreenOnUnmount.current) {
        clearPendingScreen()
      }
    }
  }, [navigation, clearPendingScreen, moduleSlug])

  return {
    pendingScreen,
    setPendingScreen,
    clearPendingScreen,
    clearPendingScreenOnScreenFocus,
  }
}
