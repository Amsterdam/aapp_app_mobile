import type {Alerts} from '@/modules/boat-charging/alerts'
import {VignetteInvalidReasons} from '@/modules/boat-charging/types'

export const vignetteInvalidReasonToAlertMap: Record<
  VignetteInvalidReasons,
  Alerts
> = {
  [VignetteInvalidReasons.notFound]: 'vignetteInvalidFailed',
  [VignetteInvalidReasons.cancelled]: 'vignetteInvalidFailed',
  [VignetteInvalidReasons.expired]: 'vignetteExpiredFailed',
  [VignetteInvalidReasons.onlyEnvironmentTypeAllowed]:
    'vignetteNotApplicableFailed',
  [VignetteInvalidReasons.mismatch]: 'vignetteInvalidFailed',
}
