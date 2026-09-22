import type {ReduxDispatch} from '@/hooks/redux/types'
import type {RootState} from '@/store/types/rootState'
import {boatChargingApi} from '@/modules/boat-charging/service'
import {
  boatChargingSlice,
  selectBoatChargingOpenIdConnectConfig,
} from '@/modules/boat-charging/slice'
import {signOutFromOpenIdConnect} from '@/modules/boat-charging/utils/openIdConnect'
import {devError} from '@/processes/development'

export const logout = async (dispatch: ReduxDispatch, state: RootState) => {
  try {
    const config = selectBoatChargingOpenIdConnectConfig(state)

    if (config) {
      await signOutFromOpenIdConnect(config)
    }

    dispatch(boatChargingSlice.actions.reset())
    dispatch(
      boatChargingApi.util.invalidateTags([
        'BoatChargingSessions',
        'BoatChargingOpenIdConnectConfig',
      ]),
    )

    return true
  } catch (error) {
    devError(error)
    throw error
  }
}
