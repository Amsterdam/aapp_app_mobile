import {useCallback} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {
  selectShouldShowLoginScreen,
  setShouldShowLoginScreenAction,
} from '@/modules/parking/slice'

export const useShouldShowLoginScreen = () => {
  const dispatch = useDispatch()
  const shouldShowLoginScreen = useSelector(selectShouldShowLoginScreen)

  const setShouldShowLoginScreen = useCallback(
    (shouldShow: boolean) => {
      dispatch(setShouldShowLoginScreenAction(shouldShow))
    },
    [dispatch],
  )

  return {shouldShowLoginScreen, setShouldShowLoginScreen}
}
