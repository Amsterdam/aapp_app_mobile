import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ReduxKey} from '@/store/types/reduxKey'
import {type RootState} from '@/store/types/rootState'

export type CityPassState = {
  accessTokenExpiration?: string
  /**
   * Whether the automatic logout alert has been dismissed by the user
   */
  isAutomaticLogoutAlertDismissed?: boolean
  /**
   * Whether the user is been logged in and registered in the city-pass backend.
   */
  isCityPassOwnerRegistered: boolean
  /**
   * Whether the user is still completing the login steps
   */
  isLoginStepsActive: boolean
  refreshTokenExpiration?: string
  /**
   * Determines whether any screen before the login screen should be skipped so the user automatically navigates to the login screen.
   */
  shouldShowLoginScreen: boolean
  /**
   * The index of the city-passes to start displaying
   */
  startIndex: number
}

const initialState: CityPassState = {
  isCityPassOwnerRegistered: false,
  isLoginStepsActive: false,
  shouldShowLoginScreen: false,
  startIndex: 0,
  accessTokenExpiration: undefined,
  refreshTokenExpiration: undefined,
  isAutomaticLogoutAlertDismissed: false,
}

export const cityPassSlice = createSlice({
  name: ReduxKey.cityPass,
  initialState,
  reducers: {
    setIsCityPassOwnerRegistered: (
      state,
      {payload}: PayloadAction<boolean>,
    ) => {
      state.isCityPassOwnerRegistered = payload
    },
    setLoginStepsActive: (state, {payload}: PayloadAction<boolean>) => {
      state.isLoginStepsActive = payload
    },
    setShouldShowLoginScreen: (state, {payload}: PayloadAction<boolean>) => {
      state.shouldShowLoginScreen = payload
    },
    setStartIndex: (state, {payload}: PayloadAction<number | undefined>) => {
      state.startIndex = payload ?? 0
    },
    setTokenExpiration: (
      state,
      {
        payload,
      }: PayloadAction<{
        accessTokenExpiration?: string
        refreshTokenExpiration?: string
      }>,
    ) => {
      const {accessTokenExpiration, refreshTokenExpiration} = payload

      if (accessTokenExpiration) {
        state.accessTokenExpiration = accessTokenExpiration
      }

      if (refreshTokenExpiration) {
        state.refreshTokenExpiration = refreshTokenExpiration
      }
    },
    setIsAutomaticLogoutAlertDismissed: (
      state,
      {payload}: PayloadAction<boolean>,
    ) => {
      state.isAutomaticLogoutAlertDismissed = payload
    },
  },
})

export const {
  setIsCityPassOwnerRegistered,
  setLoginStepsActive,
  setShouldShowLoginScreen: setShouldShowLoginScreenAction,

  setStartIndex,
  setTokenExpiration,
  setIsAutomaticLogoutAlertDismissed,
} = cityPassSlice.actions

export const selectIsCityPassOwnerRegistered = (state: RootState) =>
  state[ReduxKey.cityPass].isCityPassOwnerRegistered

export const selectIsLoginStepsActive = (state: RootState) =>
  state[ReduxKey.cityPass].isLoginStepsActive

export const selectStartIndex = (state: RootState) =>
  state[ReduxKey.cityPass].startIndex

export const selectShouldShowLoginScreen = (state: RootState) =>
  state[ReduxKey.cityPass].shouldShowLoginScreen

export const selectAccessTokenExpiration = (state: RootState) =>
  state[ReduxKey.cityPass].accessTokenExpiration

export const selectRefreshTokenExpiration = (state: RootState) =>
  state[ReduxKey.cityPass].refreshTokenExpiration

export const selectIsAutomaticLogoutAlertDismissed = (state: RootState) =>
  state[ReduxKey.cityPass].isAutomaticLogoutAlertDismissed
