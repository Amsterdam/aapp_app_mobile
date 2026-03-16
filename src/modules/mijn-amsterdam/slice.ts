import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ReduxKey} from '@/store/types/reduxKey'
import {type RootState} from '@/store/types/rootState'

export type MijnAmsterdamState = {
  isLoggedIn: boolean
  profileName?: string
  shouldShowBanner: boolean
}

const initialState: MijnAmsterdamState = {
  isLoggedIn: false,
  profileName: undefined,
  shouldShowBanner: true,
}

export const mijnAmsterdamSlice = createSlice({
  name: ReduxKey.mijnAmsterdam,
  initialState,
  reducers: {
    setIsLoggedIn: (
      state,
      {
        payload: {isLoggedIn, profileName},
      }: PayloadAction<{isLoggedIn: boolean; profileName?: string}>,
    ) => {
      state.isLoggedIn = isLoggedIn

      if (isLoggedIn) {
        state.profileName = profileName
        state.shouldShowBanner = false
      } else {
        state.profileName = undefined
        state.shouldShowBanner = initialState.shouldShowBanner
      }
    },
    setShouldShowBanner: (
      state,
      {payload: shouldShowBanner}: PayloadAction<boolean>,
    ) => {
      state.shouldShowBanner = shouldShowBanner
    },
  },
})

export const {setIsLoggedIn, setShouldShowBanner} = mijnAmsterdamSlice.actions

export const selectIsLoggedIn = (state: RootState) =>
  state[ReduxKey.mijnAmsterdam].isLoggedIn

export const selectProfileName = (state: RootState) =>
  state[ReduxKey.mijnAmsterdam].profileName

export const selectShouldShowBanner = (state: RootState) =>
  state[ReduxKey.mijnAmsterdam].shouldShowBanner
