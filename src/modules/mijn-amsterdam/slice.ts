import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ReduxKey} from '@/store/types/reduxKey'
import {type RootState} from '@/store/types/rootState'

export type MijnAmsterdamState = {
  isLoggedIn: boolean
  shouldShowBanner?: boolean
}

const initialState: MijnAmsterdamState = {
  isLoggedIn: false,
  shouldShowBanner: undefined,
}

export const mijnAmsterdamSlice = createSlice({
  name: ReduxKey.mijnAmsterdam,
  initialState,
  reducers: {
    setIsLoggedIn: (state, {payload: isLoggedIn}: PayloadAction<boolean>) => {
      state.isLoggedIn = isLoggedIn
    },
  },
})

export const {setIsLoggedIn} = mijnAmsterdamSlice.actions

export const selectIsLoggedIn = (state: RootState) =>
  state[ReduxKey.mijnAmsterdam].isLoggedIn
