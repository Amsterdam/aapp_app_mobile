import type {SerializedError} from '@reduxjs/toolkit'
import type {FetchBaseQueryError} from '@reduxjs/toolkit/query'
import type {AlertProps} from '@/components/ui/feedback/alert/Alert.types'
import {alerts} from '@/modules/parking/alerts'

export const getLoginFailedAlert = (
  error: FetchBaseQueryError | SerializedError | undefined,
): AlertProps | undefined => {
  if (!error) {
    return undefined
  }

  const errorCode =
    'data' in error &&
    error.data &&
    typeof error.data === 'object' &&
    'code' in error.data &&
    error.data.code

  if (errorCode === 'SSP_BAD_CREDENTIALS') {
    return alerts.loginForbiddenFailed
  } else if (errorCode === 'SSP_ACCOUNT_INACTIVE') {
    return alerts.loginAccountInactiveFailed
  } else if (errorCode === 'SSP_ACCOUNT_BLOCKED') {
    return alerts.loginAccountBlockedFailed
  } else {
    return alerts.loginFailed
  }
}
