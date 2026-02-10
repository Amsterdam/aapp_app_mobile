import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ReduxKey} from '@/store/types/reduxKey'
import {type RootState} from '@/store/types/rootState'

export type MijnAmsterdamState = {
  isLoggedIn: boolean
}

const initialState: MijnAmsterdamState = {
  isLoggedIn: false,
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
