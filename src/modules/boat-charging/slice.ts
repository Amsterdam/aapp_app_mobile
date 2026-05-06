import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {useCallback} from 'react'
import type {BoatChargingLocation} from '@/modules/boat-charging/types'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {ReduxKey} from '@/store/types/reduxKey'
import {RootState} from '@/store/types/rootState'
import {dayjs} from '@/utils/datetime/dayjs'

export type BoatChargingState = {
  accessToken?: {accessToken: string; accessTokenExpiration: string}
  selectedBoatChargingPointId?: BoatChargingLocation['id']
}

const initialState: BoatChargingState = {}

export const boatChargingSlice = createSlice({
  name: ReduxKey.boatCharging,
  initialState,
  reducers: {
    setSelectedBoatChargingPointId: (
      state,
      {payload: id}: PayloadAction<BoatChargingLocation['id']>,
    ) => {
      state.selectedBoatChargingPointId = id
    },
    resetSelectedBoatChargingPointId: state => {
      state.selectedBoatChargingPointId = undefined
    },
    setAccessToken: (
      state,
      {
        payload,
      }: PayloadAction<{
        accessToken: string
        accessTokenExpiration: number
      }>,
    ) => {
      state.accessToken = {
        accessToken: payload.accessToken,
        accessTokenExpiration: dayjs()
          .add(payload.accessTokenExpiration, 'millisecond')
          .toISOString(),
      }
    },
  },
})

export const {
  setSelectedBoatChargingPointId,
  resetSelectedBoatChargingPointId,
  setAccessToken,
} = boatChargingSlice.actions

export const selectSelectedBoatChargingPointId = (state: RootState) =>
  state[ReduxKey.boatCharging].selectedBoatChargingPointId

export const selectBoatChargingAccessToken = (state: RootState) =>
  state[ReduxKey.boatCharging].accessToken?.accessToken

export const selectBoatChargingAccessTokenExpiration = (state: RootState) =>
  state[ReduxKey.boatCharging].accessToken?.accessTokenExpiration

export const useSelectedBoatChargingPointId = () =>
  useSelector(selectSelectedBoatChargingPointId)

export const useSetBoatChargingAccessToken = () => {
  const dispatch = useDispatch()

  return useCallback(
    (token: string, expiration: number) =>
      dispatch(
        boatChargingSlice.actions.setAccessToken({
          accessToken: token,
          accessTokenExpiration: expiration,
        }),
      ),
    [dispatch],
  )
}
