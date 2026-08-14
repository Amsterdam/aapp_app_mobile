import {createSlice, type PayloadAction} from '@reduxjs/toolkit'
import {useCallback} from 'react'
import type {NavigateTo} from '@/app/navigation/types'
import type {
  BoatChargingLocation,
  BoatChargingOIDCConfigResponse,
} from '@/modules/boat-charging/types'
import type {RootState} from '@/store/types/rootState'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {ReduxKey} from '@/store/types/reduxKey'
import {dayjs} from '@/utils/datetime/dayjs'

export type BoatChargingState = {
  accessToken?: {accessToken: string; accessTokenExpiration: string}
  completedSessionSeenIds?: string[]
  lastApprovedTermsVersionWhileLoggedIn?: number
  lastGuestSessionId?: string
  loggedInUsername?: string
  openIdConnectConfig?: BoatChargingOIDCConfigResponse
  /**
   * Used for when access code flow gets triggered mid-stack
   */
  pendingScreen?: NavigateTo
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
          .add(payload.accessTokenExpiration, 'second')
          .toISOString(),
      }
    },
    removeAccount: state => {
      state.accessToken = undefined
      state.loggedInUsername = undefined
      state.lastApprovedTermsVersionWhileLoggedIn = undefined
    },
    setBoatChargingLoggedInUsername: (
      state,
      {payload}: PayloadAction<string>,
    ) => {
      state.loggedInUsername = payload
    },
    setBoatChargingOpenIdConnectConfig: (
      state,
      {payload}: PayloadAction<BoatChargingOIDCConfigResponse>,
    ) => {
      state.openIdConnectConfig = payload
    },
    setLastApprovedTermsVersionWhileLoggedIn: (
      state,
      {payload: version}: PayloadAction<number>,
    ) => {
      state.lastApprovedTermsVersionWhileLoggedIn = version
    },
    setLastGuestSessionId: (
      state,
      {payload: sessionId}: PayloadAction<string | undefined>,
    ) => {
      state.lastGuestSessionId = sessionId
    },
    setPendingScreen: (
      state,
      {payload}: PayloadAction<NavigateTo | undefined>,
    ) => {
      state.pendingScreen = payload
    },
    addCompletedSessionSeenId: (
      state,
      {payload: sessionId}: PayloadAction<string>,
    ) => {
      state.completedSessionSeenIds = [
        ...(state.completedSessionSeenIds ?? []),
        sessionId,
      ]
    },
  },
})

export const {
  setSelectedBoatChargingPointId,
  resetSelectedBoatChargingPointId,
  setAccessToken,
  removeAccount,
  setBoatChargingOpenIdConnectConfig,
  setBoatChargingLoggedInUsername,
  setLastApprovedTermsVersionWhileLoggedIn,
  setLastGuestSessionId,
  setPendingScreen,
  addCompletedSessionSeenId,
} = boatChargingSlice.actions

export const selectSelectedBoatChargingPointId = (state: RootState) =>
  state[ReduxKey.boatCharging].selectedBoatChargingPointId

export const selectBoatChargingAccessToken = (state: RootState) =>
  state[ReduxKey.boatCharging].accessToken?.accessToken

export const selectBoatChargingAccessTokenExpiration = (state: RootState) =>
  state[ReduxKey.boatCharging].accessToken?.accessTokenExpiration

export const selectBoatChargingOpenIdConnectConfig = (
  state: RootState,
): BoatChargingOIDCConfigResponse | undefined =>
  state[ReduxKey.boatCharging].openIdConnectConfig

export const selectBoatChargingLoggedInUsername = (
  state: RootState,
): string | undefined => state[ReduxKey.boatCharging].loggedInUsername

export const selectBoatChargingLastGuestSessionId = (
  state: RootState,
): string | undefined => state[ReduxKey.boatCharging].lastGuestSessionId

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

export const selectLastApprovedTermsVersionWhileLoggedIn = (state: RootState) =>
  state[ReduxKey.boatCharging].lastApprovedTermsVersionWhileLoggedIn

export const selectCompletedSessionSeenIds = (state: RootState) =>
  state[ReduxKey.boatCharging].completedSessionSeenIds ?? []

export const selectPendingScreen = (state: RootState) =>
  state[ReduxKey.boatCharging].pendingScreen
