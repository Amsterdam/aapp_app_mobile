import type {Alerts} from '@/modules/boat-charging/alerts'
import {VignetInvalidReasons} from '@/modules/boat-charging/types'

export const vignetInvalidReasonToAlertMap: Record<
  VignetInvalidReasons,
  Alerts
> = {
  [VignetInvalidReasons.notFound]: 'vignetInvalidFailed',
  [VignetInvalidReasons.cancelled]: 'vignetInvalidFailed',
  [VignetInvalidReasons.expired]: 'vignetExpiredFailed',
  [VignetInvalidReasons.onlyEnvironmentTypeAllowed]:
    'vignetNotApplicableFailed',
  [VignetInvalidReasons.mismatch]: 'vignetInvalidFailed',
}
