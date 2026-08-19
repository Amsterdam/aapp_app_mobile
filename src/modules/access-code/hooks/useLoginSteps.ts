import {useCallback} from 'react'
import type {ModuleSlug} from '@/modules/generated/slugs.generated'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {useUnsetCode} from '@/modules/access-code/hooks/useUnsetCode'
import {
  selectIsLoginStepsActive,
  setLoginStepsActive,
} from '@/modules/access-code/slice'
import {AccessCodeType} from '@/modules/access-code/types'

export const useLoginSteps = (module: ModuleSlug) => {
  const isLoginStepsActive = useSelector(state =>
    selectIsLoginStepsActive(state, module),
  )
  const dispatch = useDispatch()
  const unsetCodeConfirmed = useUnsetCode(AccessCodeType.codeConfirmed)

  const setIsLoginStepsActive = useCallback(
    (isActive: boolean) => {
      dispatch(setLoginStepsActive([module, isActive]))

      if (!isActive) {
        unsetCodeConfirmed()
      }
    },
    [dispatch, module, unsetCodeConfirmed],
  )

  return {
    isLoginStepsActive,
    setIsLoginStepsActive,
  }
}
