import {useCallback} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {useUnsetCode} from '@/modules/access-code/hooks/useUnsetCode'
import {
  selectIsLoginStepsActive,
  setLoginStepsActive,
} from '@/modules/access-code/slice'
import {AccessCodeType} from '@/modules/access-code/types'

export const useLoginSteps = () => {
  const dispatch = useDispatch()
  const isLoginStepsActive = useSelector(selectIsLoginStepsActive)
  const unsetCodeConfirmed = useUnsetCode(AccessCodeType.codeConfirmed)

  const setIsLoginStepsActive = useCallback(
    (isActive: boolean) => {
      dispatch(setLoginStepsActive(isActive))

      if (!isActive) {
        unsetCodeConfirmed()
      }
    },
    [dispatch, unsetCodeConfirmed],
  )

  return {isLoginStepsActive, setIsLoginStepsActive}
}
