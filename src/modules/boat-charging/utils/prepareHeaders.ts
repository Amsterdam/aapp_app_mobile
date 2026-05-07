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

  let accessToken = selectBoatChargingAccessToken(state)

  const accessTokenExpiration = selectBoatChargingAccessTokenExpiration(state)
  const expiration = accessTokenExpiration ? dayjs(accessTokenExpiration) : null

  const nowPlusMinute = dayjs().add(1, 'minute')

  const shouldRefresh =
    Boolean(accessToken) &&
    Boolean(expiration?.isValid()) &&
    Boolean(expiration?.isBefore(nowPlusMinute))

  if (shouldRefresh) {
    const newAccessToken = await refreshAccessToken(dispatch, state, () => null)

    accessToken = newAccessToken
  }

  if (accessToken) {
    headers.set('Access-Token', accessToken)
  }

  return headers
}
