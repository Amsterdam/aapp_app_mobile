import {useCallback} from 'react'
import type {NavigateTo} from '@/app/navigation/types'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {
  selectPendingScreen,
  setPendingScreen as setSlicePendingScreen,
} from '@/modules/access-code/slice'

export const useAccessCodePendingScreen = () => {
  const dispatch = useDispatch()
  const pendingScreen = useSelector(selectPendingScreen)

  const setPendingScreen = useCallback(
    (screen: NavigateTo) => {
      dispatch(setSlicePendingScreen(screen))
    },
    [dispatch],
  )

  const clearPendingScreen = useCallback(() => {
    if (!pendingScreen) {
      return
    }

    dispatch(setSlicePendingScreen(undefined))
  }, [dispatch, pendingScreen])

  return {
    pendingScreen,
    setPendingScreen,
    clearPendingScreen,
  }
}
