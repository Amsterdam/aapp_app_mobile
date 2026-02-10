import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ReduxKey} from '@/store/types/reduxKey'
import {type RootState} from '@/store/types/rootState'

export type MijnAmsterdamState = {
  isLoggedIn: boolean
  shouldShowBanner: boolean
}

const initialState: MijnAmsterdamState = {
  isLoggedIn: false,
  shouldShowBanner: true,
}

export const mijnAmsterdamSlice = createSlice({
  name: ReduxKey.mijnAmsterdam,
  initialState,
  reducers: {
    setIsLoggedIn: (state, {payload: isLoggedIn}: PayloadAction<boolean>) => {
      state.isLoggedIn = isLoggedIn

      if (isLoggedIn) {
        state.shouldShowBanner = false
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

export const selectShouldShowBanner = (state: RootState) =>
  state[ReduxKey.mijnAmsterdam].shouldShowBanner
