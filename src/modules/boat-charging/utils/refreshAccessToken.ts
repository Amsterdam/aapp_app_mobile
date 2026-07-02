import {type ReduxDispatch} from '@/hooks/redux/types'
import {
  boatChargingSlice,
  selectBoatChargingOpenIdConnectConfig,
} from '@/modules/boat-charging/slice'
import {refreshOpenIdConnectAccessToken} from '@/modules/boat-charging/utils/openIdConnect'
import {devLog, devError} from '@/processes/development'
import {type RootState} from '@/store/types/rootState'

const TOKEN_REFRESH_FAILED_MESSAGE = 'Token refresh failed'

export const refreshAccessToken = (
  dispatch: ReduxDispatch,
  state: RootState,
  failRetry: (e?: unknown) => void,
): Promise<string> =>
  new Promise((resolve, reject) => {
    const openIdConnectConfig = selectBoatChargingOpenIdConnectConfig(state)

    if (!openIdConnectConfig) {
      devError(undefined, TOKEN_REFRESH_FAILED_MESSAGE, {
        code: 'MISSING_OPENID_CONNECT_CONFIG',
      })
      failRetry('Refresh failed')
      reject(new Error(TOKEN_REFRESH_FAILED_MESSAGE))

      return
    }

    void refreshOpenIdConnectAccessToken(openIdConnectConfig).then(
      ({accessToken, accessTokenExpirationInSeconds}) => {
        dispatch(
          boatChargingSlice.actions.setAccessToken({
            accessToken,
            accessTokenExpiration: accessTokenExpirationInSeconds,
          }),
        )
        devLog('Token boatCharging account successful refreshed')
        resolve(accessToken)
      },
      error => {
        devError(undefined, TOKEN_REFRESH_FAILED_MESSAGE, error)

        failRetry('Refresh failed')
        reject(new Error(TOKEN_REFRESH_FAILED_MESSAGE))
      },
    )
  })
