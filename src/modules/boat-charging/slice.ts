import {createSlice, type PayloadAction} from '@reduxjs/toolkit'
import {useCallback} from 'react'
import type {
  BoatChargingLocation,
  BoatChargingOIDCConfigResponse,
} from '@/modules/boat-charging/types'
import type {SelectedChargingSocket} from '@/modules/boat-charging/utils/selectedChargingSocket'
import type {RootState} from '@/store/types/rootState'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {serializeSelectedChargingSocket} from '@/modules/boat-charging/utils/selectedChargingSocket'
import {ReduxKey} from '@/store/types/reduxKey'
import {dayjs} from '@/utils/datetime/dayjs'

export type BoatChargingState = {
  accessToken?: {accessToken: string; accessTokenExpiration: string}
  lastApprovedTermsVersionWhileLoggedIn?: number
  lastGuestSessionId?: string
  loggedInUsername?: string
  newSessionFormValues?: {
    approvedTerms?: boolean
    didVerifyEmail?: boolean
    email?: string
    socketNumber?: string
    stationId?: string
  }
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
      state.newSessionFormValues = undefined
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
    setNewSessionEmail: (state, {payload: email}: PayloadAction<string>) => {
      state.newSessionFormValues = {
        ...state.newSessionFormValues,
        email,
        didVerifyEmail: false,
        approvedTerms: false,
      }
    },
    setNewSessionDidVerifyEmail: (
      state,
      {payload: didVerifyEmail}: PayloadAction<boolean>,
    ) => {
      state.newSessionFormValues = {
        ...state.newSessionFormValues,
        didVerifyEmail,
        approvedTerms: false,
      }
    },
    setNewSessionApprovedTerms: (
      state,
      {payload: approvedTerms}: PayloadAction<boolean>,
    ) => {
      state.newSessionFormValues = {
        ...state.newSessionFormValues,
        approvedTerms,
      }
    },
    setNewSessionSelectedChargingSocket: (
      state,
      {payload}: PayloadAction<SelectedChargingSocket>,
    ) => {
      state.newSessionFormValues = {
        ...state.newSessionFormValues,
        socketNumber: payload.socketNumber,
        stationId: payload.stationId,
        didVerifyEmail: false,
        approvedTerms: false,
      }
    },
    resetNewSessionFormValues: state => {
      state.newSessionFormValues = undefined
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

export const selectGuestSessionFormValues = (state: RootState) =>
  state[ReduxKey.boatCharging].newSessionFormValues

export const selectLastApprovedTermsVersionWhileLoggedIn = (state: RootState) =>
  state[ReduxKey.boatCharging].lastApprovedTermsVersionWhileLoggedIn

export const useNewSessionFormValues = () => {
  const {
    setNewSessionEmail,
    setNewSessionSelectedChargingSocket,
    setNewSessionApprovedTerms,
    setNewSessionDidVerifyEmail,
    resetNewSessionFormValues,
  } = boatChargingSlice.actions

  const dispatch = useDispatch()

  const guestSessionFormValues = useSelector(selectGuestSessionFormValues) || {}
  const selectedChargingSocket =
    guestSessionFormValues.stationId && guestSessionFormValues.socketNumber
      ? serializeSelectedChargingSocket({
          stationId: guestSessionFormValues.stationId,
          socketNumber: guestSessionFormValues.socketNumber,
        })
      : undefined

  const setGuestEmail = (email: string) => dispatch(setNewSessionEmail(email))
  const setSelectedChargingSocket = (payload: SelectedChargingSocket) =>
    dispatch(setNewSessionSelectedChargingSocket(payload))
  const setApprovedTerms = (approvedTerms: boolean) =>
    dispatch(setNewSessionApprovedTerms(approvedTerms))
  const setDidVerifyEmail = (didVerifyEmail: boolean) =>
    dispatch(setNewSessionDidVerifyEmail(didVerifyEmail))
  const resetForm = () => dispatch(resetNewSessionFormValues())

  return {
    ...guestSessionFormValues,
    selectedChargingSocket,
    setGuestEmail,
    setSelectedChargingSocket,
    resetForm,
    setApprovedTerms,
    setDidVerifyEmail,
  }
}
