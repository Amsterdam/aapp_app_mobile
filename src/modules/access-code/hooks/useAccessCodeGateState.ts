import {useAccessCodeBiometrics} from '@/modules/access-code/hooks/useAccessCodeBiometrics'
import {useEnterAccessCode} from '@/modules/access-code/hooks/useEnterAccessCode'
import {useGetSecureAccessCode} from '@/modules/access-code/hooks/useGetSecureAccessCode'

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

export const ACCESS_CODE_CONFIGURED_STATES: ReadonlySet<AccessCodeGateStateName> =
  new Set([
    AccessCodeGateStateName.accessCode,
    AccessCodeGateStateName.allowed,
    AccessCodeGateStateName.biometricsPermission,
  ])

export const ACCESS_CODE_PENDING_STATES: ReadonlySet<AccessCodeGateStateName> =
  new Set([
    AccessCodeGateStateName.setup,
    AccessCodeGateStateName.invalid,
    AccessCodeGateStateName.forgotCode,
    AccessCodeGateStateName.confirm,
    AccessCodeGateStateName.fallback,
  ])

export const useAccessCodeGateState = (
  isLoginStepsActive: boolean | undefined,
): AccessCodeGateStateName => {
  const {accessCode, isLoading: isLoadingAccessCode} = useGetSecureAccessCode()
  const {attemptsLeft, isCodeValid, isForgotCode} = useEnterAccessCode()
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
