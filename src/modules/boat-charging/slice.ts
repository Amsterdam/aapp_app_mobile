import {createSlice, type PayloadAction} from '@reduxjs/toolkit'
import {useCallback} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import type {
  BoatChargingLocation,
  BoatChargingOIDCConfigResponse,
  BoatChargingSession,
  NewSessionFormValues,
} from '@/modules/boat-charging/types'
import {ReduxKey} from '@/store/types/reduxKey'
import type {RootState} from '@/store/types/rootState'
import {dayjs} from '@/utils/datetime/dayjs'

export type BoatChargingState = {
  accessToken?: {accessToken: string; accessTokenExpiration: string}
  completedSessionSeenIds?: string[]
  guestSessionIds?: Array<BoatChargingSession['id']>
  lastApprovedTermsVersionWhileLoggedIn?: string
  loggedInUsername?: string
  openIdConnectConfig?: BoatChargingOIDCConfigResponse
  selectedBoatChargingPointId?: BoatChargingLocation['id']
  /**
   * Used to temporarily store session form values when the user logs in mid-flow
   */
  sessionDraft?: NewSessionFormValues
  /**
   * Used in sign up flow and forgot password flow, this username cannot be considered as logged in
   */
  temporaryUsername?: string
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
    setBoatChargingTemporaryUsername: (
      state,
      {payload}: PayloadAction<string | undefined>,
    ) => {
      state.temporaryUsername = payload
    },
    setBoatChargingOpenIdConnectConfig: (
      state,
      {payload}: PayloadAction<BoatChargingOIDCConfigResponse>,
    ) => {
      state.openIdConnectConfig = payload
    },
    setLastApprovedTermsVersionWhileLoggedIn: (
      state,
      {payload: version}: PayloadAction<string>,
    ) => {
      state.lastApprovedTermsVersionWhileLoggedIn = version
    },
    addGuestSessionId: (
      state,
      {payload: sessionId}: PayloadAction<BoatChargingSession['id']>,
    ) => {
      if (!state.guestSessionIds?.includes(sessionId)) {
        state.guestSessionIds = [...(state.guestSessionIds ?? []), sessionId]
      }
    },
    removeGuestSessionId: (
      state,
      {payload: sessionId}: PayloadAction<BoatChargingSession['id']>,
    ) => {
      if (state.guestSessionIds?.includes(sessionId)) {
        state.guestSessionIds = state.guestSessionIds.filter(
          guestSessionId => guestSessionId !== sessionId,
        )
      }
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
    setSessionDraft: (
      state,
      {payload: sessionDraft}: PayloadAction<NewSessionFormValues | undefined>,
    ) => {
      state.sessionDraft = sessionDraft
    },
    reset: () => initialState,
  },
})

export const {
  setSelectedBoatChargingPointId,
  resetSelectedBoatChargingPointId,
  setAccessToken,
  removeAccount,
  setBoatChargingTemporaryUsername,
  setBoatChargingOpenIdConnectConfig,
  setBoatChargingLoggedInUsername,
  setLastApprovedTermsVersionWhileLoggedIn,
  addGuestSessionId,
  removeGuestSessionId,
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

export const selectBoatChargingTemporaryUsername = (
  state: RootState,
): string | undefined => state[ReduxKey.boatCharging].temporaryUsername

export const selectBoatChargingGuestSessionIds = (state: RootState) =>
  state[ReduxKey.boatCharging].guestSessionIds

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

const selectSessionDraft = (state: RootState) =>
  state[ReduxKey.boatCharging].sessionDraft

export const useSessionDraft = () => {
  const sessionDraft = useSelector(selectSessionDraft)
  const dispatch = useDispatch()

  const setSessionDraft = useCallback(
    (draft: NewSessionFormValues) =>
      dispatch(boatChargingSlice.actions.setSessionDraft(draft)),
    [dispatch],
  )

  const clearSessionDraft = useCallback(
    () => dispatch(boatChargingSlice.actions.setSessionDraft(undefined)),
    [dispatch],
  )

  return {sessionDraft, setSessionDraft, clearSessionDraft}
}
