import {createSlice, type PayloadAction} from '@reduxjs/toolkit'
import {useCallback} from 'react'
import type {
  BoatChargingLocation,
  BoatChargingOIDCConfigResponse,
  ChargingStation,
} from '@/modules/boat-charging/types'
import type {RootState} from '@/store/types/rootState'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {ReduxKey} from '@/store/types/reduxKey'
import {dayjs} from '@/utils/datetime/dayjs'

export type BoatChargingState = {
  accessToken?: {accessToken: string; accessTokenExpiration: string}
  guestSessionFormValues?: {email?: string; socketId?: ChargingStation['id']}
  lastApprovedTermsVersionWhileLoggedIn?: number
  loggedInUsername?: string
  openIdConnectConfig?: BoatChargingOIDCConfigResponse
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
      state.guestSessionFormValues = undefined
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
    setGuestSessionEmail: (state, {payload: email}: PayloadAction<string>) => {
      state.guestSessionFormValues = {
        ...state.guestSessionFormValues,
        email,
      }
    },
    setGuestSessionSocketId: (
      state,
      {payload: socketId}: PayloadAction<ChargingStation['id']>,
    ) => {
      state.guestSessionFormValues = {
        ...state.guestSessionFormValues,
        socketId,
      }
    },
    resetGuestSessionFormValues: state => {
      state.guestSessionFormValues = undefined
    },
    setLastApprovedTermsVersionWhileLoggedIn: (
      state,
      {payload: version}: PayloadAction<number>,
    ) => {
      state.lastApprovedTermsVersionWhileLoggedIn = version
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

export const selectGuestSessionFormValues = (state: RootState) =>
  state[ReduxKey.boatCharging].guestSessionFormValues

export const selectLastApprovedTermsVersionWhileLoggedIn = (state: RootState) =>
  state[ReduxKey.boatCharging].lastApprovedTermsVersionWhileLoggedIn

export const useGuestSessionFormValues = () => {
  const {
    setGuestSessionEmail,
    setGuestSessionSocketId,
    resetGuestSessionFormValues,
  } = boatChargingSlice.actions

  const dispatch = useDispatch()

  const guestSessionFormValues = useSelector(selectGuestSessionFormValues) || {}

  const setGuestEmail = (email: string) => dispatch(setGuestSessionEmail(email))
  const setSocketId = (socketId: ChargingStation['id']) =>
    dispatch(setGuestSessionSocketId(socketId))
  const resetForm = () => dispatch(resetGuestSessionFormValues())

  return {
    ...guestSessionFormValues,
    setGuestEmail,
    setSocketId,
    resetForm,
  }
}
