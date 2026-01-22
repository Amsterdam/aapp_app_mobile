import {useCallback} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {
  selectIsRecentlyLoggedOut,
  setIsRecentlyLoggedOutAction,
} from '@/modules/parking/slice'

export const useIsRecentlyLoggedOut = () => {
  const dispatch = useDispatch()
  const isRecentlyLoggedOut = useSelector(selectIsRecentlyLoggedOut)

  const setIsRecentlyLoggedOut = useCallback(
    (value: boolean) => {
      dispatch(setIsRecentlyLoggedOutAction(value))
    },
    [dispatch],
  )

  return {isRecentlyLoggedOut, setIsRecentlyLoggedOut}
}
