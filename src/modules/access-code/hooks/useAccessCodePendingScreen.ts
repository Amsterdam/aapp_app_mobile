import {useCallback} from 'react'
import type {NavigateTo} from '@/app/navigation/types'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {
  selectPendingScreen,
  setPendingScreen,
} from '@/modules/access-code/slice'

export const useAccessCodePendingScreen = (
  fallbackPendingScreen?: NavigateTo,
) => {
  const pendingScreen = useSelector(selectPendingScreen)
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const destination = pendingScreen ?? fallbackPendingScreen

  const navigateToPendingScreen = useCallback(() => {
    if (destination) {
      const [route, props = {}] = Array.isArray(destination)
        ? destination
        : [destination]

      // @ts-expect-error - This is a valid navigation route, but somehow it does not understand the params type
      navigation.popTo(route, {...props})
      dispatch(setPendingScreen(undefined))
    }
  }, [navigation, destination, dispatch])

  const addPendingScreen = useCallback(
    (screen: NavigateTo) => {
      dispatch(setPendingScreen(screen))
    },
    [dispatch],
  )

  return {pendingScreen, navigateToPendingScreen, addPendingScreen}
}
