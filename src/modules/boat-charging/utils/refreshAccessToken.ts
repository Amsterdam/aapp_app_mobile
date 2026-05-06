import {type ReduxDispatch} from '@/hooks/redux/types'
import {boatChargingApi} from '@/modules/boat-charging/service'
import {boatChargingSlice} from '@/modules/boat-charging/slice'
import {BoatChargingEndpointName} from '@/modules/boat-charging/types'
import {devLog, devError} from '@/processes/development'
import {type RootState} from '@/store/types/rootState'

export const refreshAccessToken = (
  dispatch: ReduxDispatch,
  _state: RootState,
  failRetry: (e?: unknown) => void,
): Promise<string> =>
  new Promise((resolve, reject) => {
    dispatch(
      boatChargingApi.endpoints[BoatChargingEndpointName.guestLogin].initiate(),
    )
      .unwrap()
      .then(
        ({access_token, expires_in}) => {
          dispatch(
            boatChargingSlice.actions.setAccessToken({
              accessToken: access_token,
              accessTokenExpiration: expires_in,
            }),
          )
          devLog('Token boatCharging account successful refreshed')
          failRetry('New token, so old request should fail')
          resolve(access_token)
        },
        ({data, status}: {data?: {code?: string}; status?: number}) => {
          devError(status, 'Token refresh failed', data)

          failRetry('Refresh failed')
          reject(new Error('Token refresh failed'))
        },
      )
  })
