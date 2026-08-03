import {useCallback, useEffect} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {useAccessCode} from '@/modules/access-code/hooks/useAccessCode'
import {useAccessCodeError} from '@/modules/access-code/hooks/useAccessCodeError'
import {useGetSecureAccessCode} from '@/modules/access-code/hooks/useGetSecureAccessCode'
import {
  selectAttemptsLeft,
  selectCodeEntered,
  selectIsEnteringCode,
  accessCodeSlice,
  resetAttemptsLeft,
  setIsCodeValid,
  setAttemptsLeft,
  setError,
  selectCodeValidTimestamp,
  selectIsForgotCode,
} from '@/modules/access-code/slice'
import {AccessCodeType} from '@/modules/access-code/types'
import {getIsAccessCodeWithinDuration} from '@/modules/access-code/utils/getIsAccessCodeWithinDuration'

export const useEnterAccessCode = () => {
  const dispatch = useDispatch()
  const attemptsLeft = useSelector(selectAttemptsLeft)
  const codeEntered = useSelector(selectCodeEntered)
  const isEnteringCode = useSelector(selectIsEnteringCode)
  const isForgotCode = useSelector(selectIsForgotCode)
  const {accessCode: secureAccessCode, isLoading: secureAccessCodeIsLoading} =
    useGetSecureAccessCode()
  const codeValidTimestamp = useSelector(selectCodeValidTimestamp)
  const {codeLength, setCode} = useAccessCode()
  const {resetError} = useAccessCodeError()

  const isCodeValid = getIsAccessCodeWithinDuration(codeValidTimestamp)

  const setIsEnteringCode = useCallback(
    (isEntering: boolean) =>
      dispatch(accessCodeSlice.actions.setIsEnteringCode(isEntering)),
    [dispatch],
  )
  const onAccessCodeEntered = useCallback(
    (withBiometrics = false) => {
      if (isCodeValid || secureAccessCodeIsLoading) {
        return
      }

      if (codeEntered.join('') === secureAccessCode || withBiometrics) {
        dispatch(resetAttemptsLeft())
        dispatch(setIsCodeValid(true))
        setCode({code: [], type: AccessCodeType.codeEntered})
        resetError()
      } else {
        dispatch(setAttemptsLeft(attemptsLeft - 1))
        dispatch(
          setError(
            `Toegangscode is onjuist. Nog ${attemptsLeft - 1} pogingen over.`,
          ),
        )
        setCode({code: [], type: AccessCodeType.codeEntered})
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [codeEntered, dispatch, resetError, secureAccessCode],
  )

  const onExtendAccessCodeValidity = useCallback(() => {
    if (!getIsAccessCodeWithinDuration(codeValidTimestamp)) {
      return
    }

    dispatch(setIsCodeValid(true))
  }, [codeValidTimestamp, dispatch])

  const setIsForgotCode = useCallback(
    (forgot: boolean) =>
      dispatch(accessCodeSlice.actions.setIsForgotCode(forgot)),
    [dispatch],
  )

  useEffect(() => {
    if (codeEntered.length !== codeLength) {
      return
    }

    onAccessCodeEntered()
  }, [codeEntered.length, codeLength, onAccessCodeEntered])

  return {
    attemptsLeft,
    codeEntered,
    isEnteringCode,
    isForgotCode,
    isCodeValid,
    hasAccessCode: !!secureAccessCode,
    isLoading: secureAccessCodeIsLoading,
    onAccessCodeEntered,
    onExtendAccessCodeValidity,
    setIsEnteringCode,
    setIsForgotCode,
  }
}
