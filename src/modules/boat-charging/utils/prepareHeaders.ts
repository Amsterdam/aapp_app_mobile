import type {RootState} from '@/store/types/rootState'
import {
  selectBoatChargingAccessToken,
  selectBoatChargingAccessTokenExpiration,
} from '@/modules/boat-charging/slice'
import {refreshAccessToken} from '@/modules/boat-charging/utils/refreshAccessToken'
import {PrepareHeaders} from '@/services/types'
import {dayjs} from '@/utils/datetime/dayjs'

export const prepareHeaders: PrepareHeaders = async (
  headers,
  {dispatch, getState},
) => {
  const state = getState() as RootState

  const accessTokenExpiration = selectBoatChargingAccessTokenExpiration(state)

  let accessToken = selectBoatChargingAccessToken(state)

  const nowPlusMinute = dayjs().add(1, 'minute')

  if (dayjs(accessTokenExpiration).isBefore(nowPlusMinute)) {
    const newAccessToken = await refreshAccessToken(dispatch, state, () => null)

    accessToken = newAccessToken
  }

  if (accessToken) {
    headers.set('Access-Token', accessToken)
  }

  return headers
}
