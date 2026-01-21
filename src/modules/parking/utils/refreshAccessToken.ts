import {type ReduxDispatch} from '@/hooks/redux/types'
import {alerts} from '@/modules/parking/alerts'
import {parkingApi} from '@/modules/parking/service'
import {parkingSlice} from '@/modules/parking/slice'
import {ParkingEndpointName, ParkingPermitScope} from '@/modules/parking/types'
import {getSecureParkingAccount} from '@/modules/parking/utils/getSecureParkingAccount'
import {logout} from '@/modules/parking/utils/logout'
import {devLog, devError} from '@/processes/development'
import {type RootState} from '@/store/types/rootState'

export const refreshAccessToken = (
  reportCode: string,
  scope: ParkingPermitScope,
  dispatch: ReduxDispatch,
  state: RootState,
  failRetry: (e?: unknown) => void,
): Promise<string> =>
  new Promise(async (resolve, reject) => {
    if (!reportCode) {
      devError('No account provided')
      reject(new Error('No account provided'))

      return
    }

    const secureAccount = await getSecureParkingAccount(reportCode, scope)

    if (!secureAccount) {
      devError('No pin found for account')
      reject(new Error('No pin found for account'))
      void logout(true, dispatch, state)

      return
    }

    dispatch(
      parkingApi.endpoints[ParkingEndpointName.login].initiate({
        pin: secureAccount.pin,
        report_code: secureAccount.reportCode,
      }),
    )
      .unwrap()
      .then(
        ({access_token, access_token_expiration}) => {
          dispatch(
            parkingSlice.actions.setAccessToken({
              accessToken: access_token,
              accessTokenExpiration: access_token_expiration,
              reportCode: secureAccount.reportCode,
            }),
          )
          devLog('Token parking account successful refreshed')
          failRetry('New token, so old request should fail')
          resolve(access_token)
        },
        ({data, status}: {data?: {code?: string}; status?: number}) => {
          if (status === 401 && data?.code === 'SSP_BAD_CREDENTIALS') {
            void logout(false, dispatch, state)
            devError(
              'Token refresh failed, because of bad credentials, you are now logged out',
            )
          } else if (status === 401 && data?.code === 'SSP_ACCOUNT_INACTIVE') {
            void logout(
              false,
              dispatch,
              state,
              alerts.loginAccountInactiveFailed,
            )
            devError(
              'Token refresh failed, because account is inactive, you are now logged out',
            )
          } else if (status === 401 && data?.code === 'SSP_ACCOUNT_BLOCKED') {
            void logout(
              false,
              dispatch,
              state,
              alerts.loginAccountBlockedFailed,
            )
            devError(
              'Token refresh failed, because account is blocked, you are now logged out',
            )
          }

          failRetry('Refresh failed')
          reject(new Error('Token refresh failed'))
        },
      )
  })
