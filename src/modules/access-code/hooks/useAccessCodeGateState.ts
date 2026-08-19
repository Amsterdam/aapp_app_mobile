import type {ModuleSlug} from '@/modules/generated/slugs.generated'
import {useAccessCodeBiometrics} from '@/modules/access-code/hooks/useAccessCodeBiometrics'
import {useEnterAccessCode} from '@/modules/access-code/hooks/useEnterAccessCode'
import {useGetSecureAccessCode} from '@/modules/access-code/hooks/useGetSecureAccessCode'
import {useLoginSteps} from '@/modules/access-code/hooks/useLoginSteps'

export enum AccessCodeGateStateName {
  accessCode = 'accessCode',
  allowed = 'allowed',
  biometricsPermission = 'biometricsPermission',
  confirm = 'confirm',
  fallback = 'fallback',
  forgotCode = 'forgotCode',
  invalid = 'invalid',
  loading = 'loading',
  setup = 'setup',
}

export const useAccessCodeGateState = (
  module: ModuleSlug,
): AccessCodeGateStateName => {
  const {accessCode, isLoading: isLoadingAccessCode} = useGetSecureAccessCode()
  const {attemptsLeft, isCodeValid, isForgotCode} = useEnterAccessCode()
  const {isLoginStepsActive} = useLoginSteps(module)
  const {
    isEnrolled,
    useBiometrics,
    isLoading: isLoadingBiometrics,
  } = useAccessCodeBiometrics()

  if (isLoadingAccessCode || isLoadingBiometrics) {
    return AccessCodeGateStateName.loading
  }

  if (useBiometrics === undefined && isEnrolled && isCodeValid) {
    return AccessCodeGateStateName.biometricsPermission
  }

  if (isCodeValid) {
    return AccessCodeGateStateName.allowed
  }

  if (isForgotCode) {
    return AccessCodeGateStateName.forgotCode
  }

  if (!accessCode || isLoginStepsActive) {
    return AccessCodeGateStateName.setup
  }

  if (attemptsLeft > 0) {
    return AccessCodeGateStateName.accessCode
  }

  if (attemptsLeft <= 0) {
    return AccessCodeGateStateName.invalid
  }

  return AccessCodeGateStateName.fallback
}
