import type {ReduxDispatch} from '@/hooks/redux/types'
import type {RootState} from '@/store/types/rootState'
import {
  resetAccessToken,
  resetLoggedInUsername,
  selectBoatChargingOpenIdConnectConfig,
} from '@/modules/boat-charging/slice'
import {signOutFromOpenIdConnect} from '@/modules/boat-charging/utils/openIdConnect'

export const logout = (dispatch: ReduxDispatch, state: RootState) => {
  const config = selectBoatChargingOpenIdConnectConfig(state)

  dispatch(resetAccessToken())
  dispatch(resetLoggedInUsername())

  if (config) {
    return signOutFromOpenIdConnect(config)
  }

  return Promise.resolve()
}
