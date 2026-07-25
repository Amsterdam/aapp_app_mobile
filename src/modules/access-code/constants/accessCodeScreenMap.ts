import {TransitionPresets} from '@react-navigation/stack'
import type {StackFactory} from '@/modules/access-code/types'
import type {ComponentProps} from 'react'
import {FORGOT_CODE_SCREEN} from '@/modules/access-code/constants/forgotAccessCodeScreenConfig'
import {AccessCodeGateStateName} from '@/modules/access-code/hooks/useAccessCodeGateState'
import {AccessCodeRouteName} from '@/modules/access-code/routes'
import {AccessCodeScreen} from '@/modules/access-code/screens/AccessCode.screen'
import {AccessCodeInvalidScreen} from '@/modules/access-code/screens/AccessCodeInvalid.screen'
import {BiometricsPermissionScreen} from '@/modules/access-code/screens/BiometricsPermission.screen'
import {ConfirmAccessCodeScreen} from '@/modules/access-code/screens/ConfirmAccessCode.screen'
import {SetAccessCodeScreen} from '@/modules/access-code/screens/SetAccessCode.screen'

enum AccessCodeGateRouteName {
  fallback = 'AccessCodeGateFallback',
  loading = 'AccessCodeGateLoading',
}

export const ACCESS_CODE_SCREEN_MAP: Record<
  Exclude<AccessCodeGateStateName, 'allowed'>,
  ComponentProps<StackFactory['Screen']>
> = {
  [AccessCodeGateStateName.biometricsPermission]: {
    component: BiometricsPermissionScreen,
    name: AccessCodeRouteName.biometricsPermission,
    options: {
      headerTitle: 'Sneller toegang',
    },
  },
  [AccessCodeGateStateName.forgotCode]: {
    component: FORGOT_CODE_SCREEN.component,
    name: AccessCodeRouteName.forgotAccessCode,
    options: {headerTitle: 'Toegangscode vergeten'},
  },
  [AccessCodeGateStateName.invalid]: {
    component: AccessCodeInvalidScreen,
    name: AccessCodeRouteName.accessCodeInvalid,
  },
  [AccessCodeGateStateName.accessCode]: {
    component: AccessCodeScreen as never,
    name: AccessCodeRouteName.accessCode,
    options: {
      headerTitle: 'Toegangscode invoeren',
      ...TransitionPresets.ModalFadeTransition,
    },
  },
  [AccessCodeGateStateName.setup]: {
    component: SetAccessCodeScreen as never,
    name: AccessCodeRouteName.setAccessCode,
    options: {
      headerTitle: 'Toegangscode kiezen',
    },
  },
  [AccessCodeGateStateName.confirm]: {
    component: ConfirmAccessCodeScreen as never,
    name: AccessCodeRouteName.confirmAccessCode,
    options: {
      headerTitle: 'Toegangscode herhalen',
    },
  },
  [AccessCodeGateStateName.loading]: {
    children: () => null,
    name: AccessCodeGateRouteName.loading,
    options: {
      ...TransitionPresets.ModalFadeTransition,
    },
  },
  [AccessCodeGateStateName.fallback]: {
    children: () => null,
    name: AccessCodeGateRouteName.fallback,
    options: {
      ...TransitionPresets.ModalFadeTransition,
    },
  },
}
