import {useAccessCodeBiometrics} from '@/modules/access-code/hooks/useAccessCodeBiometrics'
import {useEnterAccessCode} from '@/modules/access-code/hooks/useEnterAccessCode'
import {useGetSecureAccessCode} from '@/modules/access-code/hooks/useGetSecureAccessCode'

export enum AccessCodeGateStateName {
  accessCode = 'accessCode',
  allowed = 'allowed',
  biometricsPermission = 'biometricsPermission',
  fallback = 'fallback',
  forgotCode = 'forgotCode',
  invalid = 'invalid',
  loading = 'loading',
  setup = 'setup',
}

export const useAccessCodeGateState = (
  hasForgotScreen: boolean | undefined,
  isLoginStepsActive: boolean | undefined,
): AccessCodeGateStateName => {
  const {accessCode, isLoading} = useGetSecureAccessCode()
  const {attemptsLeft, isCodeValid, isForgotCode} = useEnterAccessCode()
  const {isEnrolled, useBiometrics} = useAccessCodeBiometrics()

  if (useBiometrics === undefined && isEnrolled && isCodeValid) {
    return AccessCodeGateStateName.biometricsPermission
  }

  if (isCodeValid) {
    return AccessCodeGateStateName.allowed
  }

  if (isLoading) {
    return AccessCodeGateStateName.loading
  }

  if (isForgotCode && hasForgotScreen) {
    return AccessCodeGateStateName.forgotCode
  }

  if (!accessCode || isLoginStepsActive) {
    return AccessCodeGateStateName.setup
  }

  if (attemptsLeft > 0) {
    return AccessCodeGateStateName.accessCode
  }

  if (attemptsLeft === 0) {
    return AccessCodeGateStateName.invalid
  }

  return AccessCodeGateStateName.fallback
}
