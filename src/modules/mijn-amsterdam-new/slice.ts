import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ReduxKey} from '@/store/types/reduxKey'
import {type RootState} from '@/store/types/rootState'

export type MijnAmsterdamState = {
  codeVerifier?: string
  isLoggedIn: boolean
  profileName?: string
  shouldShowBanner: boolean
}

const initialState: MijnAmsterdamState = {
  isLoggedIn: false,
  profileName: undefined,
  shouldShowBanner: true,
  codeVerifier: undefined,
}

export const mijnAmsterdamNewSlice = createSlice({
  name: ReduxKey.mijnAmsterdamNew,
  initialState,
  reducers: {
    setIsLoggedIn: (
      state,
      {
        payload: {isLoggedIn, profileName},
      }: PayloadAction<{isLoggedIn: boolean; profileName?: string}>,
    ) => {
      if (state.isLoggedIn && isLoggedIn === false) {
        // If previous logged in state is true and now becomes false, banner should show again.
        state.shouldShowBanner = true
      }

      state.isLoggedIn = isLoggedIn

      if (isLoggedIn) {
        state.profileName = profileName
        state.shouldShowBanner = false
      } else {
        state.profileName = undefined
      }
    },
    setShouldShowBanner: (
      state,
      {payload: shouldShowBanner}: PayloadAction<boolean>,
    ) => {
      state.shouldShowBanner = shouldShowBanner
    },
    setCodeVerifier: (
      state,
      {payload: codeVerifier}: PayloadAction<string | undefined>,
    ) => {
      state.codeVerifier = codeVerifier
    },
    reset: () => initialState,
  },
})

export const {setIsLoggedIn, setShouldShowBanner, setCodeVerifier} =
  mijnAmsterdamNewSlice.actions

export const selectIsLoggedIn = (state: RootState) =>
  state[ReduxKey.mijnAmsterdamNew].isLoggedIn

export const selectProfileName = (state: RootState) =>
  state[ReduxKey.mijnAmsterdamNew].profileName

export const selectShouldShowBanner = (state: RootState) =>
  state[ReduxKey.mijnAmsterdamNew].shouldShowBanner

export const selectCodeVerifier = (state: RootState) =>
  state[ReduxKey.mijnAmsterdamNew].codeVerifier
